
import urwid

base = urwid.Columns([])

text_dlg_pile = urwid.Pile([])
for t in xrange(5):
    text_dlg = urwid.Text(str(t))
    text_dlg_pile.contents[len(text_dlg_pile.contents):]=[(text_dlg, text_dlg_pile.options())]

input_dlg = urwid.Edit(":")
text_dlg_pile.contents[len(text_dlg_pile.contents):]=[(input_dlg, text_dlg_pile.options())]

send = urwid.Button('send')
text_dlg_pile.contents[len(text_dlg_pile.contents):]=[(send, text_dlg_pile.options())]

cancel = urwid.Button('cancel')
text_dlg_pile.contents[len(text_dlg_pile.contents):]=[(cancel, text_dlg_pile.options())]

new_line_dlg = urwid.Filler(text_dlg_pile)


base.contents =[(new_line_dlg, base.options()), (urwid.Filler(urwid.Button('asdf')), base.options())]

loop = urwid.MainLoop(base)
loop.run()

