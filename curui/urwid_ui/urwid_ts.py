#coding=utf-8

import urwid
import sys
reload(sys)
sys.setdefaultencoding('utf-8')



choices = {'friend', 'friend2', 'yukangle', '1', '2', '3'}
group_list = {
        'friend'   : {'tom', 'jimi', 'marry'},
        'friend2'  : {'burenshi', 'nimei'},
        'yukangle' : {'atupal', 'fy', 'wsq'},
        '1'        : {'1', '11', '111'},
        '2'        : {'2', '222', '2222'},
        '3'        : {'3', '33', '333'}
        }

class top():
    def __init__(self, Q):
        self.flag = 0
        self.choices = set()
        Q.start()
        while not Q.qq.success_login:
            pass
        for i in Q.qq.categories:
            self.choices.add(str(i['name']))
    def line_dialog(self, uid, Text = None):
        text = urwid.Text(uid, align = 'center', wrap='clip')
        for i in Text:
            text.set_text(text.text + '\n' + i)
        return text

    def menu(self, title, choices):
        self.body = [urwid.Text(title), urwid.Divider()]
        for c in self.choices:
            button = urwid.Button(c)
            urwid.connect_signal(button, 'click', self.group_chosen, c)
            self.body.append(urwid.AttrMap(button, None, focus_map = 'reversed'))
        open_line = urwid.Button('open_line')
        urwid.connect_signal(open_line, 'click', self.open_dialog)
        self.body.append(urwid.Divider())
        self.body.append(open_line)
        return urwid.ListBox(urwid.SimpleFocusListWalker(self.body))

    def group_chosen(self, button, choice):
        response = urwid.Text(['You are chose', choice, '\n'])
        done = urwid.Button('ok')
        urwid.connect_signal(done, 'click', self.exit_program)
        self.main.original_widget = urwid.Filler(urwid.Pile([response, urwid.AttrMap(done, None, focus_map='reserved')]))

    def  exit_program(self, button):
        raise urwid.ExitMainLoop()

    def open_dialog(self, button):
        if self.flag:
            return
        text = self.line_dialog(uid = '123', Text = ['11241234', 'q234'])
        #self.body.append(text)
        #self.main.original_widget = urwid.Columns([urwid.Filler(urwid.Padding(urwid.ListBox(urwid.SimpleFocusListWalker(self.body)), left = 2, right = 2)), text])
        cancel = urwid.Button('cancel')
        send = urwid.Button('send')
        self.main.original_widget = urwid.Filler(urwid.Pile([text, urwid.Divider(), urwid.Edit('content: '), cancel, send]))
        urwid.connect_signal(cancel, 'click', self.begin)
        urwid.connect_signal(send, 'click', self.begin)
        self.flag = 1

    def begin(self):
        self.flag = 0
        self.main = urwid.Padding(self.menu('friend', choices), left = 2, right = 2)
        self.left_bar = urwid.Overlay(self.main, urwid.SolidFill(u'\N{MEDIUM SHADE}'),
                align = 'left', width = ('relative', 40),
                valign = 'top', height = ('relative', 90),
                min_width = 20, min_height = 9)
        #left_bar = urwid.Pile([left_bar, open_line])
        urwid.MainLoop(self.left_bar, palette = [('reversed', 'standout', '')]).run()
