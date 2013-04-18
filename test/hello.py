
import urwid

def edi(button, (edit, text)):
    text.set_text(str(edit.edit_text))
    return

def open_dlg(button):
    edit = urwid.Edit(':')
    bt = urwid.Button('bt')
    text = urwid.Text('orZ:')
    urwid.connect_signal(bt, 'click', edi, (edit, text))
    pile = urwid.Pile([edit, bt, text])
    pile = urwid.Filler(pile)
    l = len(base.contents)
    base.contents[l:] = [(pile, base.options())]

bt = urwid.Button('open')
urwid.connect_signal(bt, 'click', open_dlg)
bt = urwid.Filler(bt)
base = urwid.Columns([bt])

loop = urwid.MainLoop(base)
loop.run()
