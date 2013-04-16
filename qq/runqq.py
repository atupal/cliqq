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
        self.locale_message = open('res/message.dat', 'aw')

    def run(self):
        while 1:
            msg = self.msg_queue.get()
            print msg[0], ':', msg[1]
            self.locale_message.write(str(msg[0]) + ':' + str(msg[1]) + '\n')
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

class runqq(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.lock = threading.Condition()
    def run(self):
        #user = raw_input('QQ:')
        #pwd = getpass.getpass('password: ')
        import os
        user = os.environ['QQ']
        pwd = os.environ['QQ_PASSWD']
        self.qq = webqq(user, pwd, msg_queue)
        self.qq.getSafeCode()
        self.qq.loginGet()
        self.qq.loginPost()
        self.qq.getGroupList()
        self.qq.getFriend()

        self.qq.setDaemon(True)
        self.qq.start()


        self.pro_msg = process_msg_daemon(msg_queue)
        self.pro_msg.setDaemon(True)
        self.pro_msg.start()
        #while 1:
        #    msg_queue.join()
