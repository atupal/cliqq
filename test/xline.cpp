
#include <X11/Xlib.h>
#include <assert.h>
#include <unistd.h>

#define NIL (0)

int main() {
    Display *dsp = XOpenDisplay(NIL);

    int blackColor = BlackPixel(dsp, DefaultScreen(dsp));
    int whiteColor = WhitePixel(dsp, DefaultScreen(dsp));

    Window win = XCreateSimpleWindow(dsp, DefaultRootWindow(dsp), 0, 0,
                    200, 100, 0, blackColor, blackColor);

    XSelectInput(dsp, win, StructureNotifyMask);

    XMapWindow(dsp, win);

    GC gc = XCreateGC(dsp, win, 0, NIL);

    XSetForeground(dsp, gc, whiteColor);

    for (;;) {
        XEvent e;
        XNextEvent(dsp, &e);
        if (e.type == MapNotify) 
            break;
    }

    XDrawLine(dsp, win, gc, 10, 60, 180, 20);
    XFlush(dsp);
    sleep(3);

    return 0;
}


