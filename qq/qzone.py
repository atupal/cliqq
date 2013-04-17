
import urllib

class qzone():
    def __init__(self, qq):
        self.qq = qq

    def dispose_shuoshuo(self, content):
        url = 'http://qz.qq.com/cgi-bin/mobile_update_mood?g_tk=1753255923&g_ltk=5381'
        url = 'http://qz.qq.com/cgi-bin/mobile_update_mood?g_tk=1167784737&g_ltk=5381'
        referer = 'http://qz.qq.com/2596600470/fic/'
        referer = 'http://qz.qq.com/1063918489/fic/'
        #user_agent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) \
                #AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7'
        data = 'con=%E6%88%91%E5%AF%82%E5%AF%9E%E8%A3%85%E9%80%BC%E8%BF%B7%E4%BA%BA&suin=1063918489&reply=0&g_tk=1753255923&g_ltk=5381'
        data = 'con=%E6%88%91%E5%AF%82%E5%AF%9E%E8%A3%85%E9%80%BC%E8%BF%B7%E4%BA%BA&suin=1063918489&reply=0&g_tk=1167784737&g_ltk=5381'
        self.qq.request(url, referer = referer, data = data)


