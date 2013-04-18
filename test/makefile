# $@  表示目标文件
# $^  表示所有的依赖文件
# $<  表示第一个依赖文件
# $?  表示比目标还要新的依赖文件列表
#
#
a.out:xline.cpp
	g++ xline.cpp `pkg-config --cflags --libs x11`
