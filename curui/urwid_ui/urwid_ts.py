import urwid

choices = {'friend', 'friend2', 'yukangle', '1', '2', '3'}
group_list = {
        'friend'   : {'tom', 'jimi', 'marry'},
        'friend2'  : {'burenshi', 'nimei'},
        'yukangle' : {'atupal', 'fy', 'wsq'},
        '1'        : {'1', '11', '111'},
        '2'        : {'2', '222', '2222'},
        '3'        : {'3', '33', '333'}
        }

def menu(title, choices):
    body = [urwid.Text(title), urwid.Divider()]
    for c in choices:
        button = urwid.Button(c)
        urwid.connect_signal(button, 'click', group_chosen, c)
        body.append(urwid.AttrMap(button, None, focus_map = 'reversed'))
    return urwid.ListBox(urwid.SimpleFocusListWalker(body))

def group_chosen(button, choice):
    response = urwid.Text(['You are chose', choice, '\n'])
    done = urwid.Button('ok')
    urwid.connect_signal(done, 'click', exit_program)
    main.original_widget = urwid.Filler(urwid.Pile([response, urwid.AttrMap(done, None, focus_map='reserved')]))

def  exit_program(button):
    raise urwid.ExitMainLoop()

main = urwid.Padding(menu('friend', choices), left = 2, right = 2)
top = urwid.Overlay(main, urwid.SolidFill(u'\N{MEDIUM SHADE}'),
        align = 'left', width = ('relative', 20),
        valign = 'top', height = ('relative', 90),
        min_width = 20, min_height = 9)
urwid.MainLoop(top, palette = [('reversed', 'standout', '')]).run()
