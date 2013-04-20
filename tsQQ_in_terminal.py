#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
#  file   : license.py
#  author : atupal
#
#  Copyright 2013 atupal [HUST university uniquestudio algorithm group] <me@atupal.org>
#
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#
#  site: http://atupal.org

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
