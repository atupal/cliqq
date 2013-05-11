
import urwid

class dialog_box(urwid.WidgetPlaceholder):
    def __init__(self, box, main_ui):
        super(dialog_box, self).__init__(box)
        self.main_ui = main_ui
    def keypress(self, size, key):
        if key == 'esc':
            raise urwid.ExitMainLoop()
        else:
            super(dialog_box, self).keypress(size, key)

