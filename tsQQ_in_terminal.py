#coding=utf-8

import qq.runqq as runqq
import time
import qq.qzone as qzone

if __name__ == "__main__":
    Q = runqq.runqq()
    Q.run()
    Q.pro_msg = runqq.process_msg_daemon(runqq.msg_queue, Q.qq)
    Q.pro_msg.setDaemon(True)
    Q.pro_msg.start()
    qz = qzone.qzone(Q.qq)
    #print qz.dispose_shuoshuo('我寂寞装逼迷人-test @2596600470')
    import random
    for i in xrange(1000):
        print qz.comment_shuoshuo(None, '我寂寞装逼迷人-我的电话是' + str(random.randint(10000000, 99999999)))
        if i < 20:
            time.sleep(2)
        else:
            time.sleep(30)
    exit()
    while  1:
        time.sleep(10)
        runqq.msg_queue.join()
