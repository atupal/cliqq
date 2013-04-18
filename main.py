
import qq.runqq as runqq
import curui.urwid_ui.QQ_UI as ui

if __name__ == "__main__":
    Q = runqq.runqq()
    Q.setDaemon(True)
    U = ui.QQ_UI(Q)
    U.begin()
    while 1:
        t = raw_input()
        print t
