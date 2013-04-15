
import sys
import urwid

class DialogExit(Exception):
    pass

class DialogDisplay:
    palette = [
            ('body', 'black', 'light gray', 'standout'),
            ('border', 'black', 'dark blue'),
            ('shadow', 'white', 'black'),
            ('selectable', 'black', 'dark cyan'),
            ('focus', 'white', 'dark blue', 'bold'),
            ('focustext', 'light gray', 'dark blue'),]

    def __init__(self, text, height, width, body = None):
        width = int(width)
        if width <= 0:
            width = ('relative', 80)
        height = int(height)
        if height <= 0:
            height = ('relative', 80)

        self.body = body
        if not body:
            body = urwid.Filler(urwid.Divider(), 'top')

        self.frame = urwid.Frame( body, focus_part = 'footer' )

        if text is not None:
            self.frame.header = urwid.Pile( [urwid.Text(text),
                    urwid.Divider()] )

            w = self.frame

            w = urwid.Columns( [w, ('fixed', 2, urwid.AttrWrap(
                urwid.Filler(urwid.Text(('border', '  ')), 'top')
                , 'shadow'))] )

            w = urwid.Padding(w, 'center', width)
            w = urwid.Filler(w, 'middle', height)
            w = urwid.AttrWrap(w, 'border')

            self.view = w

    def add_buttons(self, buttons):
        l = []
        for name, exitcode in buttons:
            b = urwid.Button(name, self.button_press)
            b.exitcode = exitcode
            b = urwid.AttrWrap(b, 'selectable', 'focus')
            l.append(b)

        self.buttons = urwid.GridFlow(l, 10, 3, 1, 'center')
        self.frame.footer = urwid.Pile([urwid.Divider(), self.buttons], focus_item = 1)

    def button_press(self, button):
        raise DialogExit(button.exitcode)

    def main(self):
        self.loop = urwid.MainLoop(self.view, self.palette)
        try:
            self.loop.run()
        except DialogExit, e:
            return self.on_exit( e.args[0] )

    def on_exit(self, exitcode):
        return exitcode, ''

if __name__ == '__main__':
    dialog = DialogDisplay('dialog', 80, 80)
    dialog.main()
