
import urwid

def  exit_on_q(key):
    if key in ('q', 'Q'):
        raise urwid.ExitMainLoop()

palette = [
        ('banner', 'black', 'light gray', '', '#ffa', '#60d'),
        ('streak', 'black', 'dark red','', 'g50', '#60a'),
        ('inside', '', '', '', 'g38', '#808'),
        ('outside', '', '', '', 'g27', '#a06'),
        ('bg', 'black', 'dark blue', '', 'g7', '#d06'),
        ]

placeholder = urwid.SolidFill()
loop = urwid.MainLoop(placeholder, palette, unhandled_input = exit_on_q)
loop.screen.set_terminal_properties(colors = 256)
loop.widget = urwid.AttrMap(placeholder, 'bg')
loop.widget.original_widget = urwid.Filler(urwid.Pile([]))

div = urwid.Divider()
outside = urwid.AttrMap(div, 'outside')
inside = urwid.AttrMap(div, 'inside')
txt = urwid.Text(('banner', 'Hello sdf'), align = 'center')
streak = urwid.AttrMap(txt, 'streak')
pile = loop.widget.base_widget
for item in [outside, inside, streak, inside, outside]:
    pile.contents.append((item, pile.options()))

loop.run()
