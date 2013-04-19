import urllib2
import cookielib

class request:
    def __init__(self):
        pass

    def sendR(self, url = None, refefer = None, cookie = None, data = None):
        if url is None:
            url = raw_input('url:')
        if refefer is None:
            refefer = raw_input('refefer:')
        if cookie is None:
            cookie = raw_input('cookie:')
        if data is None:
            data = raw_input('data:')

        req = urllib2.Request(url)

        self.cookies = cookielib.MozillaCookieJar()
        self.opener = urllib2.build_opener(
                urllib2.HTTPHandler(),
                urllib2.HTTPSHandler(),
                urllib2.HTTPCookieProcessor(self.cookies),
                )

        if data != '':
            req.add_data(data)
        if cookie != '':
            req.add_header('Cookie', cookie)
        if refefer != '':
            req.add_header('Referer', refefer)

        return self.opener.open(req).read()


if __name__ == "__main__":
    print request().sendR()


