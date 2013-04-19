cliqq
=====
a idea: a cli qq use text dialog.

language
=====
python

plan
=====
- [ ]在命令行下使用QQ,包括gui版的,使用urwid框架写基于curses的gui
- [x]基本的发送接收消息(包括群讨论组临时会话)
- [ ]在terminal中显示图片,表情,(验证码已经实现)
- [ ]接收发送文件
- [ ]浏览QQ空间,发表说说日志

usage
=====
命令行模式: 在项目的根目录下执行 `python qq/runqq.py`
ui模式:在项目的根目录下执行 `python `main.py

依赖
==
- urwid
- imaging
