			P = function(b, i) {
				for (var a = [], s = 0; s < i.length; s++) a[s % 4] ^= i.charCodeAt(s);
				var j = ["EC", "OK"],
					d = [];
				d[0] = b >> 24 & 255 ^ j[0].charCodeAt(0);
				d[1] = b >> 16 & 255 ^ j[0].charCodeAt(1);
				d[2] = b >> 8 & 255 ^ j[1].charCodeAt(0);
				d[3] = b & 255 ^ j[1].charCodeAt(1);
				j = [];
				for (s = 0; s < 8; s++) j[s] = s % 2 == 0 ? a[s >> 1] : d[s >> 1];
				a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
				d = "";
				for (s = 0; s < j.length; s++) d += a[j[s] >> 4 & 15], d += a[j[s] & 15];
				return d
			},
			b = function(b) {
				d.out("\u767b\u5f55\u7b2c\u4e00\u6b65\u6210\u529f");
				w = 0;
				e.setVfWebQQ(b.vfwebqq);
				m = b.psessionid;
				r = b.clientkey;
				EQQ.setIsLogin(!0);
				o.notifyObservers(alloy.portal, "GetLoginInfoSuccess");
				e.start(b);
				A();
				i();
				d.debug(">>>EQQ.js - onLoginSuccess")
			};

				//b = P(b[0], b[1]);
console.log(P('1063918489', '092af9ae32e61b95a065d973387d05fca66f01d7e6aa9a40745f035e34a1a435'))
