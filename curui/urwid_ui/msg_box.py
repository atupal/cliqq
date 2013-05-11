
import urwid

class msg_box(urwid.WidgetPlaceholder):
    def __init__(self, box, main_ui):
        super(msg_box, self).__init__(box)
        self.main_ui = main_ui

