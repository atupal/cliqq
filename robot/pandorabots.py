
import urllib
import urllib2
import re

class bot:
    def __init__(self):
        self.url = 'http://lauren.vhost.pandorabots.com/pandora/talk?botid=f6d4afd83e34564d&skin=input&speak=true'
        pass

    def getMsg(self, content):
        data = 'message='+urllib.quote(content)+'&botcust2=ec9614654e165074'
        pattern = 'LaurenBot:</b></i> (.*)<br> <br>'
        ret = re.findall(pattern, urllib2.urlopen(self.url, data = data).read())[-1]
        return ret

if __name__ == "__main__":
    print bot().getMsg("My name is yu")
