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
    print qz.comment_shuoshuo(None, '我寂寞装逼迷人-test')
    exit()
    while  1:
        time.sleep(10)
        runqq.msg_queue.join()
