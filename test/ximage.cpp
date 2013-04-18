#include <stdio.h>
#include <X11/Xlib.h>
#include <Imlib2.h>

int main(int argc, char **argv)
{
    Imlib_Image img;
    Display *dpy;
    Pixmap pix;
    Window root;
    Screen *scn;
    int width, height;
    const char *filename = NULL;

    if (argc < 2)
        goto usage;
    filename = argv[1];

    img = imlib_load_image(filename);
    if (!img) {
        fprintf(stderr, "%s:Unable to load image\n", filename);
        goto usage;
    }
    imlib_context_set_image(img);
    width = imlib_image_get_width();
    height = imlib_image_get_height();

    dpy = XOpenDisplay(NULL);
    if (!dpy)
        return 0;
    scn = DefaultScreenOfDisplay(dpy);
    root = DefaultRootWindow(dpy);

    pix = XCreatePixmap(dpy, root, width, height,
        DefaultDepthOfScreen(scn));

    imlib_context_set_display(dpy);
    imlib_context_set_visual(DefaultVisualOfScreen(scn));
    imlib_context_set_colormap(DefaultColormapOfScreen(scn));
    imlib_context_set_drawable(pix);

    imlib_render_image_on_drawable(0, 0);
    XSetWindowBackgroundPixmap(dpy, root, pix);
    XClearWindow(dpy, root);

    while (XPending(dpy)) {
        XEvent ev;
        XNextEvent(dpy, &ev);
    }
    XFreePixmap(dpy, pix);
    imlib_free_image();
    XCloseDisplay(dpy);
    return 0;
usage:
    fprintf(stderr, "usage: %s <image_file>\n", argv[0]);
    return 1;
}