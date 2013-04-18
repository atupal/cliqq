
import urwid
import time

def edi(button, pile):
    text = urwid.Text(str(time.time()), align = 'right')
    pile.contents = [(text, pile.options())] + pile.contents
    return

def open_dlg(button):
    bt = urwid.Button('bt')
    text = urwid.Text('orZ:')
    pile = urwid.Pile([text], align='top')
    urwid.connect_signal(bt, 'click', edi, pile)
    pile = urwid.Filler(urwid.Pile([pile, bt]))
    l = len(base.contents)
    base.contents[l:] = [(pile, base.options())]

bt = urwid.Button('open')
urwid.connect_signal(bt, 'click', open_dlg)
bt = urwid.Filler(bt)
base = urwid.Columns([bt])

loop = urwid.MainLoop(base)
loop.run()
