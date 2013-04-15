#coding=utf-8
from login_qq import webqq
import threading
import Queue

msg_queue = Queue.Queue()
test_flag = 5

def poll2_daemon(qq):
    while 1:
        qq.poll2()

class process_msg_daemon(threading.Thread):
    def __init__(self, msg_queue):
        threading.Thread.__init__(self)
        self.msg_queue = msg_queue

    def run(self):
        while 1:
            msg = self.msg_queue.get()
            print msg[0], ':', msg[1]
            self.msg_queue.task_done()

class senf_msg_daemon(threading.Thread):
    def __init__(self, send_queue):
        threading.Thread.__init__()
        self.send_queue = send_queue

    def run(self):
        while 1:
            send = self.send_queue.get()
            print send
            self.send_queue.task_done()

def run():
    #user = raw_input('QQ:')
    #pwd = getpass.getpass('password: ')
    import os
    user = os.environ['QQ']
    pwd = os.environ['QQ_PASSWD']
    qq = webqq(user, pwd, msg_queue)
    qq.getSafeCode()
    qq.loginGet()
    qq.loginPost()
    qq.getGroupList()
    qq.getFriend()

    qq.setDaemon(True)
    qq.start()
    pro_msg = process_msg_daemon(msg_queue)
    pro_msg.setDaemon(True)
    pro_msg.start()
    while 1:
        msg_queue.join()
if __name__ == "__main__":
    run()
