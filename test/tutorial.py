
import urwid

def question():
    return urwid.Pile([urwid.Edit(('I say', u'Waht is your name'))])

def answer(name):
    return urwid.Text(('I day', u'Nice to meet you, ' + name + "\n"))

class ConversationListBox(urwid.ListBox):
    def __init__(self):
        body = urwid.SimpleFocusListWalker([question()])
        urwid.ListBox.__init__(self, body)

    def keypress(self, size, key):
        key = urwid.ListBox.keypress(self, size, key)
        if key != 'enter':
            return key
        name = self.focus[0].edit_text

        if name is None:
            raise urwid.ExitMainLoop()
        self.focus.contents[1:] = [(answer(name), self.focus.options())]
        pos = self.focus_position
        self.body.insert(pos + 1, question())
        self.focus_position = pos + 1

palette = [('I say', 'default,bold', 'default'),]
urwid.MainLoop(ConversationListBox(), palette).run()
