import urwid

def exit_on_q(key):
    if key in ('q', 'Q'):
        raise urwid.ExitMainLoop()
    print key


palette = [
        ('banner'  , '' , '' , '' , '#ffa' , '#60d')  ,
        ('streask' , '' , '' , '' , 'g50'  , '#60a')  ,
        ('inside'  , '' , '' , '' , 'g38'  , '#808')  ,
        ('outside' , '' , '' , '' , 'g27'  , '#a06')  ,
        ('bg'      , '' , '' , '' , 'g7'   , '#d06')]

placeholder = urwid.SolidFill(u'8')
loop = urwid.MainLoop(placeholder, palette, unhandled_input = exit_on_q)
loop.screen.set_terminal_properties(colors=256)
loop.widget = urwid.AttrMap(placeholder, 'bg')
loop.widget.original_widget = urwid.Filler(urwid.Pile([]))

div = urwid.Divider()
outside = urwid.AttrMap(div, 'outside')
inside = urwid.AttrMap(div, 'inside')

loop.run()
