(function() {
	WebqCore.register("EQQ.Global", function() {
		this.initGlobal = function() {
			EQQ.vfwebqq = alloy.portal.getVfWebQQ()
		}
	})
})();
(function() {
	WebqCore.register("EQQ.Adapter", function(d) {
		this.proxysend = function(e, c) {
			alloy.rpcService.send(e, {
				context: null,
				method: c.method || "GET",
				data: {
					r: d.json.stringify(c.param)
				},
				onSuccess: c.onSuccess,
				onError: c.onError,
				onTimeout: c.onTimeout
			})
		};
		EQQ.BASE_CONST = alloy.CONST
	})
})();
(function() {
	WebqCore.register("EQQ.Extend", function() {
		this.cgi_module = function(d, e) {
			return function(c) {
				e.onError = e.errback ||
				function() {};
				e.onTimeout = e.timeback ||
				function() {};
				c = c ||
				function() {};
				e.onSuccess = function(d) {
					e.callback(d, c)
				};
				EQQ.Adapter.proxysend(d, e)
			}
		};
		this.cgi_module_d = function(d, e) {
			return function(c) {
				e.onError = e.errback ||
				function() {};
				e.onTimeout = e.timeback ||
				function() {};
				c = c ||
				function() {};
				e.onSuccess = function(d) {
					e.callback(d, c)
				};
				EQQ.RPCService.send(d, e)
			}
		};
		this.require = function(d, e) {
			for (var c = d.length, o = d.length, k = function() {
					c--;
					c == 0 && e()
				}, g = 0; g < o; g++) d[g](k)
		}
	})
})();
(function() {
	WebqCore.register("EQQ", function(d) {
		var e = this,
			c = d.dom,
			o = d.event,
			k = d.cookie,
			g = !1,
			a = {},
			h, w = 0,
			f, m, r, n = !1,
			y = !1,
			p, u;
		u = window.location.host;
		d.out(">>dName: " + u);
		this.showLogin = function() {
			alloy.portal.getLoginLevel();
			k.get("ptwebqq") ? EQQ.init2({
				panel: {
					mainPanel: alloy.app.eqq.getWindow().body
				}
			}) : alloy.layout.showLoginWindow("eqq", !0)
		};
		var j = {
			onExit: function() {
				alloy.layout.confirm("\u60a8\u786e\u8ba4\u8981\u5173\u95ed Q+ Web \u5417\uff1f", function() {
					e.executeExit()
				}, {
					windowType: "EqqWindow",
					modal: !0
				})
			},
			onNeedLogin: function() {
				alloy.layout.showLoginWindow("eqq")
			}
		};
		this.CONST = {
			MAIN_DOMAIN: "qq.com",
			EQQ_SERVER_URL: "http://" + u + "/",
			CONN_SERVER_DOMAIN: "http://d.web2.qq.com/",
			CONN_SERVER_DOMAINS: ["http://d.web2.qq.com/"],
			CONN_PROXY_URLS: ["http://d.web2.qq.com/proxy.html?v=20110331002"],
			CONN_SERVER_DOMAIN2: "http://" + u + "/",
			CONN_PROXY_URL: "http://d.web2.qq.com/proxy.html?v=20110331002",
			CHAT_PIC_SERVER: "http://" + u + "/",
			AVATAR_SERVER_DOMAIN: "http://qun.qq.com/",
			AVATAR_SERVER_DOMAINS: ["http://face1.qun.qq.com/", "http://face2.qun.qq.com/", "http://face3.qun.qq.com/", "http://face4.qun.qq.com/", "http://face5.qun.qq.com/", "http://face6.qun.qq.com/", "http://face7.qun.qq.com/", "http://face8.qun.qq.com/", "http://face9.qun.qq.com/", "http://face10.qun.qq.com/", "http://face11.qun.qq.com/"],
			SYSTEM_FACE_URL: "http://0.web.qstatic.com/webqqpic/style/face/",
			LOGIN_PROTECT_FINISH_URL: "./login_protect.html",
			UPLOAD_CUSTOM_FACE_SERVER: "http://up.web2.qq.com/cgi-bin/cface_upload",
			DOWNLOAD_CHAT_LOG_SERVER: "http://sns.qq.com/buddy_state/feed/save_chat.php",
			FILE_SERVER: "http://file1.web.qq.com/",
			OFFLINE_FILE_SERVER: "http://weboffline.ftn.qq.com:80/ftn_access/",
			QZONE_SERVER_DOMAIN: "http://qzone.qq.com/",
			QZONE_USER_SERVER_DOMAIN: "http://user.qzone.qq.com/",
			QQ_GROUP_URL: "http://qun.qq.com/air/",
			MAX_LOGIN_AMOUNT: 1,
			MAX_FAIL_AMOUNT: 2,
			Z_INDEX_BASE: 3E3,
			LOAD_AVATAR_AMOUNT: 50,
			TRANSFER_TABLE: [14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 50, 51, 96, 53, 54, 73, 74, 75, 76, 77, 78, 55, 56, 57, 58, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 32, 113, 114, 115, 63, 64, 59, 33, 34, 116, 36, 37, 38, 91, 92, 93, 29, 117, 72, 45, 42, 39, 62, 46, 47, 71, 95, 118, 119, 120, 121, 122, 123, 124, 27, 21, 23, 25, 26, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 52, 24, 22, 20, 60, 61, 89, 90, 31, 94, 65, 35, 66, 67, 68, 69, 70, 15, 16, 17, 18, 19, 28, 30, 40, 41, 43, 44, 48, 49],
			T_TRANSFER_TABLE: {
				14: 0,
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
				7: 7,
				8: 8,
				9: 9,
				10: 10,
				11: 11,
				12: 12,
				13: 13,
				0: 14,
				50: 15,
				51: 16,
				96: 17,
				53: 18,
				54: 19,
				73: 20,
				74: 21,
				75: 22,
				76: 23,
				77: 24,
				78: 25,
				55: 26,
				56: 27,
				57: 28,
				58: 29,
				79: 30,
				80: 31,
				81: 32,
				82: 33,
				83: 34,
				84: 35,
				85: 36,
				86: 37,
				87: 38,
				88: 39,
				97: 40,
				98: 41,
				99: 42,
				100: 43,
				101: 44,
				102: 45,
				103: 46,
				104: 47,
				105: 48,
				106: 49,
				107: 50,
				108: 51,
				109: 52,
				110: 53,
				111: 54,
				112: 55,
				32: 56,
				113: 57,
				114: 58,
				115: 59,
				63: 60,
				64: 61,
				59: 62,
				33: 63,
				34: 64,
				116: 65,
				36: 66,
				37: 67,
				38: 68,
				91: 69,
				92: 70,
				93: 71,
				29: 72,
				117: 73,
				72: 74,
				45: 75,
				42: 76,
				39: 77,
				62: 78,
				46: 79,
				47: 80,
				71: 81,
				95: 82,
				118: 83,
				119: 84,
				120: 85,
				121: 86,
				122: 87,
				123: 88,
				124: 89,
				27: 90,
				21: 91,
				23: 92,
				25: 93,
				26: 94,
				125: 95,
				126: 96,
				127: 97,
				128: 98,
				129: 99,
				130: 100,
				131: 101,
				132: 102,
				133: 103,
				134: 104,
				52: 105,
				24: 106,
				22: 107,
				20: 108,
				60: 109,
				61: 110,
				89: 111,
				90: 112,
				31: 113,
				94: 114,
				65: 115,
				35: 116,
				66: 117,
				67: 118,
				68: 119,
				69: 120,
				70: 121,
				15: 122,
				16: 123,
				17: 124,
				18: 125,
				19: 126,
				28: 127,
				30: 128,
				40: 129,
				41: 130,
				43: 131,
				44: 132,
				48: 133,
				49: 134
			},
			WEBQQMSGTIPS: "\n\u3010\u63d0\u793a\uff1a\u6b64\u7528\u6237\u6b63\u5728\u4f7f\u7528Q+ Web\uff1ahttp://" + alloy.CONST.DOMAIN + "/\u3011"
		};
		this.hash = {
			onlineStatus: {
				callme: "callme",
				online: "online",
				away: "away",
				busy: "busy",
				silent: "silent",
				hidden: "hidden",
				offline: "offline"
			},
			onlineStatusText: {
				callme: "Q\u6211\u5427",
				online: "\u5728\u7ebf",
				away: "\u79bb\u5f00",
				busy: "\u5fd9\u788c",
				silent: "\u9759\u97f3",
				hidden: "\u9690\u8eab",
				offline: "\u79bb\u7ebf"
			},
			clientType: {
				1: "PC",
				2: "PC",
				3: "PC",
				4: "PC",
				5: "PC",
				6: "PC",
				10: "PC",
				21: "Phone",
				22: "Phone",
				23: "Phone",
				24: "Phone",
				41: "WebQQ",
				42: "QQforPad",
				1E4: "PC"
			},
			clientTypeText2readableText: {
				QQforPad: "QQ for Pad"
			},
			clientTypeText: {
				1: "PC",
				2: "PC",
				3: "PC",
				4: "PC",
				5: "PC",
				6: "PC",
				10: "PC",
				21: "\u624b\u673aQQ",
				22: "\u624b\u673aQQ",
				23: "\u624b\u673aQQ",
				24: "\u624b\u673aQQ",
				41: "WebQQ",
				42: "QQforPad",
				1E4: "PC"
			},
			userClassType: {
				online: "online",
				stranger: "stranger",
				blacklist: "blacklist"
			}
		};
		document.domain = this.CONST.MAIN_DOMAIN;
		o.on(document, "keydown", function(b) {
			b.keyCode === 27 && b.preventDefault()
		});
		this.init2 = function(i) {
			g = !1;
			a = {};
			m = f = null;
			y = !1;
			this.panel = i.panel || {};
			N = 0;
			W = !1;
			P = 0;
			o.addObserver(alloy.portal, "exit", x);
			o.addObserver(alloy.portal, "DesktopSwitch", v);
			o.addObserver(EQQ, "LoginSuccess", b);
			o.addObserver(e, "LoginFailure", da);
			o.addObserver(e, "VerifyLoginProtectSuccess", A);
			o.addObserver(e, "exit", j.onExit);
			o.addObserver(e, "needLogin", j.onNeedLogin);
			o.addObserver(EQQ.RPCService, "NotLogin", D);
			o.addObserver(EQQ.RPCService, "NotReLogin", K);
			o.addObserver(EQQ, "ReLinkStop", E);
			o.addObserver(EQQ.RPCService, "FailCountOverMax", C);
			o.addObserver(EQQ, "ReLinkSuccess", l);
			o.addObserver(EQQ, "ReLinkFailure", C);
			o.addObserver(EQQ, "UinNotInWhitelist", B);
			o.addObserver(EQQ, "UinInBlacklist", q);
			o.addObserver(EQQ, "Overload", F);
			o.addObserver(EQQ, "PtwebqqFail", G);
			o.addObserver(EQQ, "EQQLoginSuccess", Q);
			o.addObserver(EQQ.RPCService, "LogoutSuccess", L);
			o.addObserver(EQQ.RPCService, "PollComplete", R);
			o.addObserver(EQQ.RPCService, "CheckProtectSuccess", H);
			o.addObserver(alloy.portal, "UACReady", I);
			e.createContainer();
			EQQ.RPCService.init();
			EQQ.Presenter.MainPanel.init();
			try {
				EQQ.Presenter.ChatBox.init(), EQQ.TaskBar.init()
			} catch (s) {}
			EQQ.Model.BuddyList.init();
			EQQ.Model.ChatMsg.init();
			!Number(d.cookie.get("hideusehttpstips")) && !alloy.config.getHttpsSetting() && EQQ.Presenter.MainPanel.View.showUseHttpsTips();
			EQQ.Presenter.MainPanel.getCookieTips();
			EQQ.Presenter.MainPanel.show();
			i = alloy.portal.getTryLoginState() || "";
			e.login(i)
		};
		this.loginEQQ = function() {
			this.showLogin()
		};
		this.getDefaultState = function() {
			return EQQ.hash.onlineStatus[d.string.mapQuery(window.location.search).login_state || "offline"]
		};
		this.getUserDefaultAvatar = function(b) {
			b = b || 40;
			return alloy.CONST.CDN_URL + "style/images/avatar_default_" + b + "_" + b + ".gif"
		};
		this.getFaceServer = function(b) {
			return EQQ.CONST.AVATAR_SERVER_DOMAINS[b % 10]
		};
		this.getUserAvatar = function(b, i, a) {
			i = "&vfwebqq=" + alloy.portal.getVfWebQQ();
			a && (i = "");
			return EQQ.getFaceServer(b) + "cgi/svr/face/getface?cache=0&type=1&fid=0&uin=" + b + i
		};
		this.getGroupAvatar = function(b) {
			return EQQ.getFaceServer(b) + "cgi/svr/face/getface?cache=0&type=4&fid=0&uin=" + b + "&vfwebqq=" + alloy.portal.getVfWebQQ()
		};
		this.getQzoneUrl = function(b) {
			return EQQ.CONST.QZONE_USER_SERVER_DOMAIN + b
		};
		this.getSendMailUrl = function(b) {
			return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + b + "@qq.com"
		};
		this.createContainer = function() {
			this.document = c.getDoc();
			this.container = c.node("div", {
				id: "EQQ_Container",
				"class": "EQQ_Container"
			});
			this.container.innerHTML = '\t\t\t<div id="EQQ_MsgBox" class="EQQ_msgBox">\t\t\t\t<div class="EQQ_titleInMsgBox">\t\t\t\t\t<div class="EQQ_titleTextInMsgBox">\u6d88\u606f\u76d2\u5b50</div>\t\t\t\t\t<div id="EQQ_ViewMainPanelButtonInMsgBox" class="EQQ_viewMainPanelButtonInMsgBox" title="\u70b9\u51fb\u67e5\u770b\u597d\u53cb\u5217\u8868">\u597d\u53cb\u5217\u8868</div>\t\t\t\t</div>\t\t\t\t<div id="EQQ_MessageList" class="EQQ_messageList">\t\t\t\t</div>\t\t\t\t<div id="EQQ_IgnoreAllMsgButtonInMsgBox" class="EQQ_ignoreAllMsgButtonInMsgBox" title="\u70b9\u51fb\u5ffd\u7565\u5168\u90e8\u6d88\u606f">\u5ffd\u7565\u5168\u90e8</div>\t\t\t</div>\t\t\t<div id="EQQ_LoginBox" class="EQQ_LoginBox">\t\t\t\t<div class="EQQ_LoginBox_Title">\t\t\t\t\t<div id="EQQ_LoginBox_CloseButton" class="EQQ_LoginBox_CloseButton" title="\u5173\u95ed">X</div>\t\t\t\t\t<div class="EQQ_LoginBox_TitleText">WebQQ\u767b\u5f55\u4fdd\u62a4</div>\t\t\t\t</div>\t\t\t\t<iframe id="EQQ_LoginBox_Iframe" class="EQQ_LoginBox_Iframe" src="' + alloy.CONST.MAIN_URL + 'domain.html" frameborder="no" scrolling="no"></iframe>\t\t\t</div>\t\t';
			this.document.body.appendChild(this.container)
		};
		this.getCookieSkey = function() {
			return d.cookie.get("skey", EQQ.CONST.MAIN_DOMAIN)
		};
		this.getCookiePtWebQQ = function() {
			return d.cookie.get("ptwebqq", EQQ.CONST.MAIN_DOMAIN)
		};
		this.getVfWebQQ = function() {
			return f
		};
		this.setVfWebQQ = function(b) {
			f = b;
			alloy.portal.setVfWebQQ(b)
		};
		this.getPsessionid = function() {
			return m
		};
		this.getClientKey = function() {
			return r
		};
		this.dna_result_key = "";
		this.login = function(b) {
			EQQ.Presenter.MainPanel.showLogin();
			this.loginStart = (new Date).getTime();
			b = {
				status: b || "online",
				ptwebqq: alloy.portal.getPtwebqq(),
				passwd_sig: this.dna_result_key
			};
			EQQ.RPCService.sendLogin(b)
		};
		var z = function() {
				var b = alloy.config.configList.chatboxMode,
					i = alloy.config.configList.isNotNeedCtrlKey;
				EQQ.initChatboxMode(b);
				EQQ.initSendMsgKey(i);
				alloy.portal.getLoginLevel() > 2 && o.notifyObservers(EQQ, "eqqUacChange", {
					chatboxMode: b,
					isNotNeedCtrlKey: i
				})
			},
			I = function() {
				z()
			},
			H = function(b) {
				b.type == "nop" && EQQ.Presenter.MainPanel.toggleShow()
			},
			A = function(b) {
				if (b) e.dna_result_key = b, EQQ.Presenter.MainPanel.toggleShow()
			},
			x = function() {
				EQQ && EQQ.executeExit()
			},
			v = function(b) {
				o.notifyObservers(EQQ, "DesktopSwitch", b)
			};
		this.executeExit = function() {
			try {
				EQQ.View.ChatBox.onExitHotkey()
			} catch (b) {}
			d.cookie.remove("ptwebqq", alloy.CONST.MAIN_DOMAIN);
			o.notifyObservers(EQQ, "CloseWebQQ");
			o.removeObserver(alloy.portal, "DesktopSwitch", v);
			o.removeObserver(alloy.portal, "UACReady", I);
			try {
				EQQ.View.ChatBox.removeChatLogOptionPanel()
			} catch (i) {}
			p = {};
			alloy.notifier.unregister("eqq");
			alloy.messageSystem.removeNotificationsBySource(50);
			EQQ.stopPoll();
			EQQ.logout();
			alloy.portal.removeExitConfirm()
		};
		this.logout = function() {
			d.out("EQQLOGOUT", null, 2);
			EQQ.setIsLogin(!1);
			EQQ.RPCService.sendLogout()
		};
		this.reLogin = function(b) {
			var i = EQQ.Model.BuddyList.getSelf(),
				a = "offline",
				s = "online";
			if (i) a = i.state, s = i.oldState || "online";
			a == "offline" && (a = s == "offline" ? "online" : s);
			this.login(b || a)
		};
		var B = function() {
				window.location = alloy.CONST.MAIN_URL + "overload.html"
			},
			q = function() {},
			F = function() {
				window.location = alloy.CONST.MAIN_URL + "overload.html"
			},
			G = function() {
				d.out("onPtwebqqFail");
				da({
					text: "\u767b\u5f55\u5931\u8d25"
				});
				alloy.layout.showLoginWindow("eqq", !0, null, "\u9a8c\u8bc1\u4fe1\u606f\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01")
			},
			t = function() {
				var b = {
					status: EQQ.Model.BuddyList.getSelf().state,
					ptwebqq: alloy.portal.getPtwebqq(),
					passwd_sig: e.dna_result_key
				};
				try {
					d.cookie.set("uin", alloy.portal.getOriginalUin(), alloy.CONST.MAIN_DOMAIN), d.cookie.set("skey", alloy.portal.getSkey(), alloy.CONST.MAIN_DOMAIN), d.cookie.set("ptwebqq", alloy.portal.getPtwebqq(), alloy.CONST.MAIN_DOMAIN)
				} catch (i) {}
				EQQ.RPCService.sendReLink(b)
			},
			J = e.showEQQtips = function(b) {
				if (!e.eqqTips) {
					var a = e.eqqTips = new d.ui.Bubble({
						closeOnHide: !0
					});
					a.setTitle(b.title);
					a.setContent(b.content);
					a.showButton("ok", "\u767b\u5f55", !0);
					a.showButton("next", "\u53d6\u6d88");
					o.addObserver(a, "onBubbleOkBtnClick", function() {
						b.callback && b.callback();
						e.eqqTips = null
					});
					o.addObserver(a, "onBubbleClose", function() {
						e.eqqTips = null
					});
					o.addObserver(a, "onBubbleNextBtnClick", function() {
						i();
						b.cancle && b.cancle()
					});
					var s = alloy.taskBar.getTaskItem(50, 50);
					a.show({
						pointerPosition: "bottom right",
						pointerOffset: 15,
						pointerSize: [18, 12],
						target: s.getDom()
					})
				}
			},
			i = e.hideEQQtips = function() {
				if (e.eqqTips) e.eqqTips.close(), e.eqqTips = null
			},
			l = function(b) {
				w = 0;
				e.setVfWebQQ(b.vfwebqq);
				m = b.psessionid;
				i();
				this.startPoll();
				z();
				b = EQQ.Model.BuddyList.getSelf().state;
				o.notifyObservers(EQQ.Model.BuddyList, "SelfStateChange", b)
			},
			E = function() {
				e.stopPoll();
				i();
				o.notifyObservers(e, "SelfOffline", {
					message: "\u8eab\u4efd\u9a8c\u8bc1\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55",
					action: "relogin"
				})
			},
			C = function(b) {
				e.stopPoll();
				d.out("reLinkRetryCount: " + w);
				w >= 2 && (J({
					title: "\u8fde\u63a5\u4e2d\u65ad",
					content: "\u56e0\u7f51\u7edc\u6216\u5176\u4ed6\u539f\u56e0\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u6b63\u5728\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55...",
					callback: function() {
						h && clearTimeout(h);
						t()
					},
					cancle: function() {
						h && clearTimeout(h);
						EQQ.View.MainPanel.setSelfState("offline")
					}
				}), o.notifyObservers(EQQ.Model.BuddyList, "SelfStateChange", "offline"));
				b && b.hasOwnProperty("t") ? h = setTimeout(function() {
					t()
				}, (parseInt(b.t) || 0) * 1E3) : b || (h = setTimeout(function() {
					t()
				}, 1E4));
				w++
			},
			D = function() {
				o.notifyObservers(e, "SelfOffline", {
					message: "\u4f60\u7684\u767b\u5f55\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002",
					action: "relogin"
				})
			},
			K = function() {
				o.notifyObservers(e, "SelfOffline", {
					message: "\u56e0\u7f51\u7edc\u6216\u5176\u4ed6\u539f\u56e0\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002",
					action: "relogin"
				})
			},
			L = function() {
				o.notifyObservers(EQQ, "exitSuccess")
			},
			R = function() {
				EQQ.getIsLogin() && typeof EQQ !== "undefined" && EQQ.keepPoll()
			},
			Q = function() {
				var b = alloy.app.eqq.getRunOption();
				if (b && b.directChat) {
					var i = b.directChatType,
						a = b.directChat;
					setTimeout(function() {
						EQQ.handleNotification(a, i) || WebqCore.api.call(["chat", [i, a]])
					}, 500);
					delete b.directChat;
					delete b.directChatType
				}
			},
			O = function(b, i) {
				for (var a = i + "password error", s = "", j = [];;) if (s.length <= a.length) {
					if (s += b, s.length == a.length) break
				} else {
					s = s.slice(0, a.length);
					break
				}
				for (var d = 0; d < s.length; d++) j[d] = s.charCodeAt(d) ^ a.charCodeAt(d);
				a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
				s = "";
				for (d = 0; d < j.length; d++) s += a[j[d] >> 4 & 15], s += a[j[d] & 15];
				return s
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
				z();
				i();
				d.debug(">>>EQQ.js - onLoginSuccess")
			};
		this.start = function() {
			var b = [alloy.portal.getUin() + "", d.cookie.get("ptwebqq")],
				b = O(b[0], b[1]);
			EQQ.h1 = b;
			this.mode = "master";
			d.out("start: " + EQQ);
			EQQ.Global.initGlobal();
			EQQ.Model.BuddyList.reset();
			EQQ.Presenter.MainPanel.View.showPullData();
			alloy.util.report2h("eqqGetData", "start");
			alloy.portal.speedTest.sRTS(14, "start", new Date);
			alloy.portal.speedTest.sRTS(15, "start", new Date);
			EQQ.Extend.require([EQQ.Model.BuddyList.sendGetBuddyList({
				h: "hello"
			}), EQQ.Model.BuddyList.sendGetGroupList()], function() {
				WebqCore.api.ifDataReady.set(!0);
				p = {};
				o.addObserver(EQQ, "MessageReceive", ja);
				alloy.notifier.register("eqq", null, ka);
				EQQ.startPoll();
				EQQ.Model.BuddyList.sendGetDiscuList(function() {
					o.notifyObservers(alloy.portal, "BeforeGetRecentList");
					EQQ.Model.BuddyList.sendGetRecentList({})()
				});
				alloy.rpcService.sendGetSignature(alloy.portal.getUin());
				alloy.portal.setLoginLevel(alloy.CONST.LOGIN_LEVEL_ALL);
				setTimeout(function() {
					WebqCore.api.makeCall()
				}, 13);
				alloy.util.report2h("eqqGetData", "end_eqqGetData", "ok");
				alloy.portal.speedTest.sRTS(11, "end", new Date, !0);
				o.notifyObservers(EQQ, "EQQLoginSuccess");
				o.notifyObservers(alloy.portal, "EQQLoginSuccess");
				setTimeout(function() {
					WebqCore.api.call(["chat", []])
				}, 12E4)
			});
			if (!g) g = !0, this.timer = window.setInterval(ea, 6E4)
		};
		this.handleNotification = function(b, i) {
			var a = b + i;
			if (p[a] && p[a].length) {
				for (var a = p[a] || [], s = !1, j; j = a.pop();) s ? alloy.messageSystem.handleNotification(j) : s = alloy.messageSystem.handleNotification(j);
				return s
			} else return !1
		};
		var s = function(b, i) {
				var a, s;
				s = {
					uin: i,
					title: b.uiuin || i,
					content: "",
					count: 1,
					t: new Date,
					type: b.type,
					time: b.time || d.date.format(new Date, "YYYY-MM-DD hh:mm:ss"),
					extra: {}
				};
				a = {
					from: 50,
					type: "Unkown",
					body: s
				};
				switch (b.type) {
				case "single":
					var j = !1;
					b.attach && b.attach.type == "shake" && (j = !0);
					var c = WebqCore.api.__api.getChatBox(i),
						l = !1,
						f = !1;
					(l = !! c) && (f = c === EQQ.Presenter.ChatBox.getCurrent());
					if (j) if (c && c.isShow() && c.desktopIndex == alloy.desktopManager.getCurrentDesktopIndex() && alloy.layout.getIsFocusOnDesktop()) c.setCurrent(), c.shake();
					else if (!c && alloy.layout.getIsFocusOnDesktop()) {
						WebqCore.api.call(["chat", ["single", i, function(b) {
							b = WebqCore.api.__api.getChatBox(b);
							b.show();
							b.setCurrent();
							b.shake()
						}]]);
						a = null;
						break
					}
					a.type = "SingleChat";
					s.title = b.sender ? b.sender.htmlShowName || i : i;
					s.content = EQQ.util.trimChatMsg(b);
					s.extra = {
						isChatBoxOpen: l,
						isChatBoxCurrent: f,
						attachType: !d.isUndefined(b.attach) && !d.isUndefined(b.attach.type) && b.attach.type.indexOf("file") > -1 ? "file" : ""
					};
					break;
				case "group":
					c = WebqCore.api.__api.getChatBox(i);
					f = l = !1;
					(l = !! c) && (f = c === EQQ.Presenter.ChatBox.getCurrent());
					if (!EQQ.Model.BuddyList.isGroupPrompt(i)) {
						a = null;
						break
					}
					a.type = "GroupChat";
					j = EQQ.Model.BuddyList.getGroupByGid(i);
					s.code = j.code;
					s.title = j ? j.htmlShowName || i : i;
					s.content = EQQ.util.trimChatMsg(b);
					s.extra = {
						isChatBoxOpen: l,
						isChatBoxCurrent: f
					};
					break;
				case "discu":
					c = WebqCore.api.__api.getChatBox(i);
					f = l = !1;
					(l = !! c) && (f = c === EQQ.Presenter.ChatBox.getCurrent());
					if (!EQQ.Model.BuddyList.isDiscuPrompt(i)) {
						a = null;
						break
					}
					a.type = "DiscuChat";
					j = EQQ.Model.BuddyList.getDiscuById(i);
					s.title = j ? j.htmlName || i : i;
					s.content = EQQ.util.trimChatMsg(b);
					s.extra = {
						isChatBoxOpen: l,
						isChatBoxCurrent: f
					};
					break;
				case "add_buddy":
					a.type = "BuddyAdd";
					s.content = b.content;
					s.title = b.title;
					s.extra = b.opt;
					break;
				case "join_group":
					a.type = "GroupJoin";
					s.content = b.content;
					s.title = b.title;
					s.extra = b.opt;
					break;
				default:
					a = null
				}
				return a
			},
			ja = function(b) {
				var i, a = b.uin || b.gid || b.did,
					j;
				for (j in b.msgList) {
					var d = b.msgList[j];
					if (!a) a = d.from_uin;
					var c = a + d.type,
						l = !1;
					/(single)|(group)|(discu)/.test(d.type) && (l = !0, p[c] || (p[c] = []));
					if (i = s(d, a)) {
						if (l) i.body.count = p[c].length + 1;
						var f;
						EQQ.Presenter.ChatBox && (f = EQQ.Presenter.ChatBox.getCurrent());
						if (alloy.layout.getIsFocusOnDesktop() && f && f.uin == a && f.isShow()) i.body.extra.isChatBoxCurrent = !0;
						i = alloy.messageSystem.notify(i);
						l && p[c].push(i)
					} else if (l) c = d.type, l = a + c, e.handleNotification(a, c), p[l] = null
				}
			},
			ka = function(b) {
				var i = b.body,
					a = i.uin,
					s = i.type,
					j = a + s;
				e.handleNotification(a, s);
				p[j] = null;
				switch (b.type) {
				case "SingleChat":
					WebqCore.api.call(["chat", ["single", i.uin]]);
					break;
				case "GroupChat":
					d.profile("EQQ.onNotifyHasHandled - group.code: " + i.code);
					WebqCore.api.call(["chat", ["group", i.code]]);
					break;
				case "DiscuChat":
					d.profile("EQQ.onNotifyHasHandled - group.code: " + i.uin);
					WebqCore.api.call(["chat", ["discu", i.uin]]);
					break;
				case "BuddyAdd":
					alloy.portal.runApp("buddyAdder", i.extra);
					break;
				case "GroupJoin":
					alloy.portal.runApp("groupSystemMsg", i.extra)
				}
			},
			da = function(b) {
				EQQ.setIsLogin(!1);
				d.out("\u5bf9\u4e0d\u8d77\uff0c\u767b\u5f55\u5931\u8d25\uff01");
				alloy.portal.setLoginLevel(alloy.CONST.LOGIN_LEVEL_NOCHAT);
				EQQ.Presenter.MainPanel.showReLoginPanel(b.text)
			},
			M = 0,
			ea = function() {
				M > 240 && (M = 0);
				o.notifyObservers(EQQ, "NotifyBeat_1");
				M % 2 == 0 && o.notifyObservers(EQQ, "NotifyBeat_2");
				M % 5 == 0 && (o.notifyObservers(EQQ, "NotifyBeat_5"), M % 10 == 0 && (o.notifyObservers(EQQ, "NotifyBeat_10"), M % 30 == 0 && (o.notifyObservers(EQQ, "NotifyBeat_30"), M % 60 == 0 && (o.notifyObservers(EQQ, "NotifyBeat_60"), M % 120 == 0 && (o.notifyObservers(EQQ, "NotifyBeat_120"), M % 240 == 0 && o.notifyObservers(EQQ, "NotifyBeat_240"))))));
				M++
			},
			aa, N = 0,
			W = !1,
			P = 0;
		this.startBeat2 = function() {
			W = !0;
			N = 0;
			aa = window.setInterval(la, 250);
			d.out(">>>>>>>>>: startBeat2")
		};
		this.stopBeat = function() {
			this.stopBeat2();
			window.clearInterval(this.timer);
			this.timer = null
		};
		this.stopBeat2 = function() {
			W = !1;
			window.clearInterval(aa);
			N = 0;
			aa = null;
			d.out(">>>>>>>>>: stopBeat2")
		};
		this.isStartBeat2 = function() {
			return W
		};
		this.addNeedBeat2 = function(b) {
			a[b] || (a[b] = !0, P++);
			EQQ.isStartBeat2() || EQQ.startBeat2()
		};
		this.removeNeedBeat2 = function(b) {
			a[b] && (P > 0 && P--, delete a[b]);
			P === 0 && EQQ.stopBeat2()
		};
		var la = function() {
				N > 5E3 && (N = 0);
				o.notifyObservers(EQQ, "NotifyBeat_250");
				N % 2 == 0 && (o.notifyObservers(EQQ, "NotifyBeat_500"), N % 6 == 0 && o.notifyObservers(EQQ, "NotifyBeat_1000"), N % 10 == 0 && (o.notifyObservers(EQQ, "NotifyBeat_3000"), N % 20 == 0 && o.notifyObservers(EQQ, "NotifyBeat_5000")));
				N++
			};
		this.startPoll = function() {
			this.setNeedPollFlag(!0);
			this.keepPoll();
			EQQ.RPCService.pollWatcher.startWatch()
		};
		this.keepPoll = function() {
			this.getNeedPollFlag() && EQQ.RPCService.sendPoll()
		};
		this.setNeedPollFlag = function(b) {
			return y = b
		};
		this.getNeedPollFlag = function() {
			return y
		};
		this.stopPoll = function() {
			this.setNeedPollFlag(!1);
			EQQ.RPCService.pollWatcher.stopWatch()
		};
		this.setIsLogin = function(b) {
			n = b
		};
		this.getIsLogin = function() {
			return n
		};
		this.getChatboxMode = function() {
			return e.chatboxMode ? e.chatboxMode : "free"
		};
		this.getSendMsgKey = function() {
			return e.isNotNeedCtrlKey
		};
		this.setSendMsgKey = function(b) {
			e.isNotNeedCtrlKey = b;
			alloy.rpcService.sendSetConfig({
				context: this,
				data: {
					retype: 1,
					r: {
						appid: qqweb.config.__eqqid,
						value: {
							isNotNeedCtrlKey: b
						}
					}
				}
			});
			alloy.hotkeyManager.setSendHotKey(b)
		};
		this.initSendMsgKey = function(b) {
			e.isNotNeedCtrlKey = b
		};
		this.initChatboxMode = function(b) {
			e.chatboxMode = b
		};
		this.setChatboxMode = function(b) {
			e.chatboxMode = b;
			alloy.rpcService.sendSetConfig({
				context: this,
				data: {
					retype: 1,
					r: {
						appid: qqweb.config.__eqqid,
						value: {
							chatboxMode: b
						}
					}
				}
			})
		};
		this.getLoadLoginScript = function() {
			return this.isLoadEqqScript
		};
		this.setLoadLoginScript = function(b) {
			this.isLoadEqqScript = b
		};
		this.videoNotify = function(b) {
			d.profile("videoNotify", "video");
			var i = b.type,
				a = b.uin;
			if (i && a) switch (i) {
			case "msg":
				EQQ.Presenter.ChatBox.appendVideoMsg(b.uin, b.context);
				break;
			case "setVideoId":
				d.profile("setVideoId" + b.context, "video");
				EQQ.Presenter.ChatBox.setVideoId(a, b.context);
				break;
			case "pop":
				EQQ.Presenter.ChatBox.popVideoWindow(a);
				break;
			case "inner":
				EQQ.Presenter.ChatBox.innerVideoWindow(a);
				break;
			case "close":
				b.context && EQQ.Presenter.ChatBox.appendVideoMsg(b.uin, b.context), EQQ.Presenter.ChatBox.closeVideo(b.uin)
			}
		};
		this.sendMsg = function(b, i) {
			EQQ.Model.ChatMsg.sendMsg({
				type: "single",
				to: b,
				content: [i],
				isIgnoreHistory: !0
			})
		}
	})
})();
(function() {
	WebqCore.register("EQQ.util", function(d) {
		var e = d.dom,
			c = d.string,
			o = {},
			k = 1,
			g = function(e, g) {
				var y = null;
				if (e.from_uin && e.msg_id && e.raw_time && (y = String(e.from_uin) + String(e.msg_id) + String(e.raw_time), o[y] && (d.isUndefined(e.attach) || !d.isUndefined(e.attach) && e.content[0][0] != "rfile"))) return o[y];
				var p = "";
				if (g) for (var u = 0; u < e.content.length; u++) {
					var j = e.content[u];
					if (j[0] === "face") p += a(j[1]);
					else if (j[0] === "cface") p += e.type == "group" || e.type == "discu" ? w(j[2]) : w(j[1]);
					else if (j[0] === "cface_idx") p += e.type == "group" || e.type == "discu" ? w(j[2]) : w(j[1]);
					else if (j[0] !== "pic_id" && j[0] !== "image") if (j[0] === "offpic") {
						var z = EQQ.Model.ChatMsg.getSendPicUrlByFilePath(j[1]);
						z != "" && (p += '<img src="' + z + '" id="cface_' + k+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />')
					} else j[0] === "rffile" ? p += '<div class="msgFileBox">\u60a8\u62d2\u7edd\u63a5\u6536"' + c.encodeHtmlSimple(j[1]) + '",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "agfile" ? p += '<div class="msgFileBox">\u60a8\u540c\u610f\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '".</div>' : j[0] === "sendfile" ? p += '<div class="msgFileBox">\u60a8\u53d1\u9001\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u7ed9\u5bf9\u65b9.</div>' : j[0] === "sendofffile" || j[0] === "sendofffileerror" || j[0] === "refuseofffile" || j[0] === "nextofffile" || j[0] === "canceloffupload" || j[0] === "notifyagreeofffile" || j[0] === "notifyrefuseofffile" ? p += '<div class="msgFileBox">' + c.encodeHtmlSimple(j[1]) + "</div>" : j[0] === "uploadingofffile" ? (p += '<div class="msgFileBox">' + c.encodeHtmlSimple(j[1]), p += '<span class="fileAct">', p += '<a href="#" id="cancal_uploadOffFile_' + e.attach.ts + '">[\u53d6\u6d88]</a>', p += "</span></div>") : j[0] === "transtimeout" ? p += '<div class="msgFileBox">\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u8d85\u65f6,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "refusedbyclient" ? p += '<div class="msgFileBox">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "transok" ? p += '<div class="msgFileBox">\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u4f20\u8f93\u6210\u529f.</div>' : j[0] === "transerror" ? p += '<div class="msgFileBox">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u6216\u4f20\u8f93\u9519\u8bef,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : d.isArray(j) || (p += f(c.encodeHtmlSimple(f(j, 1)), 2))
				} else {
					var u = e.sender_uin || e.from_uin,
						z = e.from_uin || 0,
						I = [],
						H, A, x;
					for (x = e.content[0][0] !== "font" ? 0 : 1; x < e.content.length; x++) if (j = e.content[x], d.isString(j) && j.substr(0, 4) === "\u3000  \u3000") e.content[0] = [], j = "", d.platform.iPad && (j = "\u4f46\u60a8\u4f7f\u7528\u7684\u8bbe\u5907\u4e0d\u652f\u6301\u89c6\u9891\u901a\u8bdd\u529f\u80fd\u3002"), p += '<div class="msgFileBox">\u5bf9\u65b9\u5411\u60a8\u53d1\u8d77\u89c6\u9891\u9080\u8bf7\u3002' + j + "</div>";
					else if (j[0] === "video") p += '<div class="msgFileBox">' + j[1] + "</div>";
					else if (j[0] === "face") p += a(j[1]);
					else if (j[0] === "cface") if (I.push(j), e.type == "group" || e.type == "discu") {
						var v = e.group_code || EQQ.Model.BuddyList.decodeDid(e.did),
							j = j[1],
							B = e.sender_uin,
							q = e.raw_time,
							F = e.group_code ? 0 : 1,
							G = j.server.toString().split(":"),
							j = '<img src="' + EQQ.CONST.CHAT_PIC_SERVER + "cgi-bin/get_group_pic?type=" + F + "&gid=" + v + "&uin=" + B + "&rip=" + G[0] + "&rport=" + G[1] + "&fid=" + j.file_id + "&pic=" + encodeURIComponent(j.name) + "&vfwebqq=" + alloy.portal.getVfWebQQ() + "&t=" + q + '" id="_cface_' + k+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />';
						p += j
					} else p += h(e.msg_id, j[1], u), alloy.util.report2m(133157), alloy.util.report2m(133158);
					else j[0] === "cface_idx" ? e.type == "group" || e.type == "discu" ? (v = e.group_code || EQQ.Model.BuddyList.decodeDid(e.did), j = I[j[1]][1], B = Math.round((new Date).getTime() / 1E3), j = '<img src="' + EQQ.CONST.AVATAR_SERVER_DOMAIN + "cgi/svr/chatimg/get?pic=" + encodeURIComponent(j.name) + "&gid=" + v + "&time=" + B + '" id="_cface_' + k+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />', p += j) : p += h(e.msg_id, I[j[1]][1], u) : j[0] === "pic_id" ? (v = EQQ.Model.BuddyList.getUserByUin(u), !v.type || v.type == "groupBuddy" ? A = !0 : H = j[1]) : j[0] === "image" ? A ? p += "\u3010\u56fe\u7247\u3011\uff08\u5bf9\u65b9\u53d1\u9001\u4e86\u4e00\u5f20\u56fe\u7247\uff0cQ+ Web\u4e34\u65f6\u4f1a\u8bdd\u6682\u4e0d\u652f\u6301\u63a5\u6536\uff09" : (p += '<img rdata="image" src="' + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_image2?lcid=" + e.msg_id + "&guid={" + H + "}" + j[2] + "." + j[1] + "&to=" + u + "&count=1&time=1&psessionid=" + EQQ.getPsessionid() + "&clientid=" + EQQ.Model.ChatMsg.getClientidFromRpc() + '" id="_cface_' + k+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />', alloy.util.report2m(133153), alloy.util.report2m(133154)) : j[0] === "offpic" ? (p += j[1].success == 1 ? '<img rdata="offpic" src="' + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_offpic2?file_path=" + encodeURIComponent(j[1].file_path) + "&f_uin=" + z + "&clientid=" + EQQ.Model.ChatMsg.getClientidFromRpc() + "&psessionid=" + EQQ.getPsessionid() + '" id="_cface_' + k+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />' : '<img src="' + alloy.CONST.CDN_URL + 'style/images/img_error.gif" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\u63a5\u6536\u9519\u8bef\u6216\u4e0d\u5b58\u5728" />', alloy.util.report2m(133167)) : j[0] === "rfile" ? (v = e.from_uin + "_" + j[2], B = EQQ.Model.ChatMsg.getFilesList(), p += '<div class="msgFileBox">\u5bf9\u65b9\u7ed9\u60a8\u53d1\u9001\u6587\u4ef6:<br />', p += '<span class="icon_' + m(j[1]) + '">&nbsp;</span>' + c.encodeHtmlSimple(j[1]), p += '<span class="fileAct">', B[v].isread ? p += "&nbsp;[\u540c\u610f][\u62d2\u7edd]" : (p += '&nbsp;<a id="agree_' + v + '" href="#">[\u540c\u610f]</a>', p += '&nbsp;<a id="refuse_' + v + '" href="#">[\u62d2\u7edd]</a>'), p += "</span>", p += "</div>") : j[0] === "rffile" ? p += '<div class="msgFileBox">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "rtfile" ? p += '<div class="msgFileBox">\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u8d85\u65f6,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "wrfile" ? p += '<div class="msgFileBox">\u5bf9\u65b9\u5df2\u540c\u610f\u63a5\u6536"' + c.encodeHtmlSimple(j[1]) + '",\u5f00\u59cb\u4f20\u8f93\u6587\u4ef6.</div>' : j[0] === "wrffile" ? p += '<div class="msgFileBox">\u5bf9\u65b9\u62d2\u7edd\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "cvideo" ? (p += c.encodeHtmlSimple(j[1]), p += '&nbsp;<a id="video_' + e.attach.from_uin + "_" + e.attach.msg_id + '" fromuin="' + e.attach.from_uin + '" href="###">\u53d1\u8d77\u89c6\u9891</a>') : (j[0] === "video" ? j = c.encodeHtmlSimple(j[1]) : j[0] === "offfile" ? (j = e, v = j.attach.from_uin + "_" + j.attach.msg_id, B = d.date.format(new Date(j.attach.expire_time * 1E3), "YYYY-MM-DD"), q = '<div class="msgFileBox">\u5bf9\u65b9\u7ed9\u60a8\u53d1\u9001\u79bb\u7ebf\u6587\u4ef6:<br />', q += '<span class="icon_' + m(j.attach.name) + '">&nbsp;</span>' + c.encodeHtmlSimple(j.attach.name) + "(" + B + "\u5230\u671f)", q += '<span class="fileAct">', q += '&nbsp;<a id="agree_' + v + '" href="#" fuin="' + j.from_uin + '" rkey="' + j.attach.rkey + '">[\u63a5\u6536]</a>', q += '&nbsp;<a id="next_' + v + '" href="#" fuin="' + j.from_uin + '" rkey="' + j.attach.rkey + '">[\u4e0b\u6b21\u63a5\u6536]</a>', q += '&nbsp;<a id="refuse_' + v + '" href="#">[\u62d2\u7edd]</a>', q += "</span>", q += "</div>", j = q) : j = j[0] === "shake" ? '<div class="msgFileBox">' + c.encodeHtmlSimple(j[1]) + "</div>" : f(c.encodeHtmlSimple(f(j, 1)), 2), p += j)
				}
				p = p.replace(/\r\n|\r|\n/ig, "<br />");
				y && (o[y] = p);
				return p
			},
			a = function(a) {
				return '<img class="EQQ_faceImg" src="' + EQQ.CONST.SYSTEM_FACE_URL + EQQ.CONST.T_TRANSFER_TABLE[a] + '.gif" />'
			},
			h = function(a, d, c, e) {
				return '<img rdata="cface" src="' + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_cface2?lcid=" + a + "&guid=" + encodeURIComponent(d) + "&to=" + c + "&count=" + (e || 5) + "&time=1&clientid=" + EQQ.RPCService.getClientId() + "&psessionid=" + EQQ.getPsessionid() + '" id="_cface_' + k+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />'
			},
			w = function(a) {
				return '<img src="' + EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/?cmd=2&bd=" + a + '" id="_cface_' + k+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />'
			},
			f = function(a, d) {
				if (d === 2) var c = /\[url\][\s\S]+?\[(\/|&#47;)url\]/g,
					a = a.replace(c, function(a) {
						a = a.replace(/(\[url\]|\[(\/|&#47;)url\])/g, "");
						return '<a href="' + a.replace(/^www\./, function(a) {
							return "http://" + a
						}) + '" class="chatLink" target="_blank"><span class="msgLink">' + a + "</span></a>"
					});
				else c = /(http[s]?|ftp|(www\.)){1}[\w\.\/\?=%&@:#;\*\$\[\]\(\){}'"\-]+([0-9a-zA-Z\/#])+?/g, a = a.replace(c, function(a) {
					return "[url]" + a + "[/url]"
				});
				return a
			};
		this.transUrl = f;
		var m = function(a) {
				if (!(typeof a == "undefined" || a == "")) {
					a = a.split(".");
					a = a[a.length - 1].toLowerCase();
					switch (a) {
					case "excel":
					case "xls":
					case "xlsx":
						a = "excel";
						break;
					case "doc":
					case "docx":
						a = "word";
						break;
					case "ppt":
					case "pptx":
						a = "ppt";
						break;
					case "bmp":
					case "png":
					case "gif":
					case "jpeg":
					case "jpg":
					case "ico":
						a = "pic";
						break;
					case "tga":
					case "tif":
					case "psd":
					case "tiff":
						a = "pic";
						break;
					case "mov":
					case "avi":
					case "mpeg":
					case "mpg":
					case "ra":
					case "rm":
					case "rmvb":
					case "qt":
					case "asf":
					case "wmv":
					case "swf":
					case "flv":
					case "mp4":
						a = "media";
						break;
					case "mp3":
					case "wav":
					case "mid":
						a = "music";
						break;
					case "arj":
					case "rar":
					case "zip":
					case "jar":
					case "7z":
					case "tar":
					case "uc2":
					case "gz":
					case "lha":
					case "ace":
					case "tgz":
						a = "rar-zip";
						break;
					case "txt":
					case "text":
						a = "share-txt";
						break;
					case "pdf":
						a = "pdf16";
						break;
					case "com":
						a = "exe16";
						break;
					default:
						a = "others"
					}
					return a
				}
			};
		this.translateFontStyle = function(a) {
			if (a[0] === "font") {
				var c = a[1].style,
					e = d.string.encodeHtmlAttributeSimple(a[1].name + ""),
					e = (e = e.match(/\u5b8b\u4f53|\u9ed1\u4f53|\u96b6\u4e66|\u5fae\u8f6f\u96c5\u9ed1|\u6977\u4f53_GB2312|\u5e7c\u5706|Arial Black|Arial|Verdana|Times New Roman/)) ? e[0] : "\u5b8b\u4f53",
					f = a[1].color.match(/([0-9a-f]{6})/),
					f = f ? f[0] : "000";
				return "color:#" + f + ";font-family:" + e + ";font-size:" + Number(a[1].size) + "pt;font-weight:" + (c[0] ? "bold" : "normal") + ";font-style:" + (c[1] ? "italic" : "normal") + ";text-decoration:" + (c[2] ? "underline" : "none") + ";"
			} else return ""
		};
		this.translateChatMsg = g;
		this.trimChatMsg = function(a) {
			var a = g(a),
				a = a.replace(/^(<br \/>|&nbsp;)+/ig, ""),
				a = a.replace(/(<a([^>]+)>|<\/a>)/ig, ""),
				a = a.replace(/<div class="msgFileBox">([\s\S]+?)<\/div>/ig, function(a) {
					a = a.replace(/(<span([\s\S]+?)<\/span>)+?/ig, "");
					a = a.replace(/(:<br \/>)+?/ig, ":");
					return a.replace(/(<div([^>]+?)>|<\/div>)+/ig, "")
				}),
				d = a.indexOf("<br />");
			d != -1 && (a = a.substr(0, d));
			a = a.replace(/(&nbsp;)+$/ig, "");
			return a = a.replace(/<img.*?\/?>/ig, function(a) {
				return /class="EQQ_faceImg"/.test(a) ? a : '<img src="' + alloy.CONST.CDN_URL + 'style/images/image_icon.png?t=20111011001" />'
			})
		};
		this.transResendMsg = function(a) {
			for (var a = d.json.parse(a.content), e = "", f = 0; f < a.length; f++) {
				var g = a[f];
				if (d.isArray(g)) if (g[0] == "face") e += "[\u56fe\u7247]";
				else {
					if (g[0] == "cface" || g[0] == "offpic") e += "[\u56fe\u7247]"
				} else g == "\n" || g == " " || (e += g)
			}
			e = e.replace(EQQ.CONST.WEBQQMSGTIPS, "");
			e.length > 20 && (e = c.cutByBytes(e.toString(), 20) + "...");
			return c.encodeHtmlSimple(e)
		};
		this.Marquee = new d.Class({
			init: function(a) {
				var d = this;
				this.speed = a.speed || 40;
				this.stopTime = a.stopTime || 3E3;
				this.lineHeight = a.lineHeight || 20;
				this.target = a.target;
				this.intervaler = this.lineTimer = this.timer = null;
				this.scrollHeight = this.lineHeight;
				this.isStop = !1;
				this._onTimeRun = function() {
					d.scrollOneLine()
				}
			},
			scrollOneLine: function() {
				if (this.scrollHeight > 0) {
					this.scrollHeight--;
					var a = this.target.style.top.match(/-?\d+/),
						a = !a ? 0 : parseInt(a[0]);
					this.target.style.top = --a + "px";
					this.lineTimer = setTimeout(this._onTimeRun, this.speed)
				} else this.isStop || this.update()
			},
			stop: function() {
				this.timer && clearTimeout(this.timer)
			},
			stopAll: function() {
				this.stop();
				this.lineTimer && clearTimeout(this.lineTimer)
			},
			reset: function() {
				this.target.style.top = "0px"
			},
			update: function() {
				if (!this.isStop) {
					this.timer && clearTimeout(this.timer);
					this.scrollHeight = this.lineHeight;
					var a = this.target.style.top.match(/\d+/),
						d = e.getScrollHeight(this.target);
					if (a && d && (a = parseInt(a[0]), a >= d)) {
						this.target.style.top = this.lineHeight + "px";
						this.scrollOneLine();
						return
					}
					this.timer = setTimeout(this._onTimeRun, this.stopTime)
				}
			},
			walkOnLastLine: function() {
				this._onTimeRun()
			}
		})
	})
})();
(function() {
	WebqCore.register("EQQ.RPCService", function(d) {
		function e() {
			var a = this;
			this.pollRequst = void 0;
			this.POLLTICK = 0;
			this._check = function() {
				a.check()
			}
		}
		var c = this,
			o = this,
			k = d.event;
		(new Date).getTime();
		var g = 0,
			a = String(d.random(0, 99)) + String((new Date).getTime() % 1E6),
			h = 0,
			w = !1,
			f = 0,
			m = EQQ.CONST.CONN_SERVER_DOMAINS[0],
			r, n = function() {
				return function(a, d) {
					try {
						if (arguments.length == 2) return !d || arguments.callee(a);
						else {
							var c = alloy.portal.getUin();
							if (a.status) var e = [c, a.status, a.responseText.replace(/[\r\t\n\s]/g, "") + ":", decodeURIComponent(a.data), a.uri].join("$");
							else a = a.o, e = [c, a.status, a.responseText.replace(/[\r\t\n\s]/g, "") + ":", decodeURIComponent(a.data), a.uri].join("$");
							alloy.rpcService.formSend("http://tj.qstatic.com/log", {
								method: "POST",
								data: {
									r: e.replace(/,"/g, ":").replace(/[{"}]/g, "")
								}
							})
						}
					} catch (f) {}
				}
			},
			n = n(),
			y = function() {
				g++;
				d.out("onFail: " + g);
				g > 4 && (g = 0, k.notifyObservers(c, "FailCountOverMax"))
			},
			p = [];
		this.onAjaxFrameLoad = function() {
			d.out((void 0).readyState, null, 1);
			if (r = window.frames.EQQ_ProxySendIframe.ajax) {
				w = !1;
				for (var a = 0; a < p.length; ++a) {
					var c = 0 % EQQ.CONST.CONN_PROXY_URLS.length,
						e = p[a].url;
					if (e.indexOf(EQQ.CONST.CONN_SERVER_DOMAINS[c]) == -1) e = e.replace(/http:\/\/.*.com\//, ""), p[a].url = EQQ.CONST.CONN_SERVER_DOMAINS[c] + e;
					e = p[a].url;
					c = p[a].option;
					try {
						return u(e, c)
					} catch (f) {
						d.out("eqq ajax\u4ee3\u7406\u51fa\u9519\uff1a" + e + " " + EQQ.CONST.CONN_PROXY_URL);
						if (!c.onError) break;
						e = {};
						e.arguments = c.arguments || {};
						c.onError.call(c.context, e)
					}
				}
			} else a = EQQ.CONST.CONN_PROXY_URLS[0], a += (/\?/.test(a) ? "&" : "?") + "callback=2", (void 0).setAttribute("src", a)
		};
		var u = function(j, c) {
				c = c || {};
				c.cacheTime = c.cacheTime || 0;
				c.onSuccess = c.onSuccess ||
				function() {};
				c.onError = c.onError ||
				function() {};
				c.onTimeout = c.onTimeout ||
				function() {};
				c.onComplete = c.onComplete ||
				function() {};
				var e = {
					method: c.method || "GET",
					enctype: c.enctype || "",
					data: c.data || {},
					arguments: c.arguments || {},
					context: c.context || null,
					timeout: c.timeout,
					onSuccess: function(a) {
						var j = {},
							e = !1;
						a.responseText = a.responseText || "-";
						try {
							j = d.json.parse(a.responseText)
						} catch (f) {
							a.responseText += ":BJF:", e = !0, d.out("JSON\u683c\u5f0f\u51fa\u9519:" + f)
						} finally {
							j.arguments = c.arguments || {}, j.o = a, c.onSuccess.call(c.context, j, e)
						}
					},
					onError: function(a) {
						c.onError.call(c.context, a)
					},
					onTimeout: function() {
						var a = {};
						a.arguments = c.arguments || {};
						c.onTimeout.call(c.context, a)
					},
					onComplete: function() {
						var a = {};
						a.arguments = c.arguments || {};
						c.onComplete.call(c.context, a)
					}
				};
				e.data.clientid = a;
				e.data.psessionid = EQQ.getPsessionid();
				if (w) e.onError();
				else {
					alloy.portal.recoverCookie();
					e.data = d.string.toQueryString(e.data);
					if (e.method == "GET") {
						var f = e.data;
						c.cacheTime === 0 && (f += f ? "&t=" + (new Date).getTime() : "t=" + (new Date).getTime());
						if (f) {
							var g = alloy.portal.getVfWebQQ();
							g && !/channel/ig.test(j) && (f += "&vfwebqq=" + g);
							j = j + "?" + f
						}
						e.data = null
					} else e.contentType = "application/x-www-form-urlencoded", j.indexOf("?");
					return r(j, e)
				}
			};
		this._proxy = function(d, c, e) {
			var f = EQQ.CONST.CONN_PROXY_URLS[0];
			if (!c.data) c.data = {};
			c.data.clientid = a;
			c.data.psessionid = EQQ.getPsessionid();
			e = alloy.config.getHttpsSetting();
			alloy.rpcService.eqqSend(d, c, f, e)
		};
		e.prototype = {
			pollStop: function() {
				d.out("PollWatcher: a poll Over...");
				this.pollRequst = null;
				this.POLLTICK = 0;
				this.timer = null
			},
			check: function() {
				d.out("PollWatcher: check...");
				this.pollRequst == null && (d.out("Oooops, somethingWrong..."), this.POLLTICK++, this.POLLTICK == 1 && setTimeout(this._check, 5E3));
				if (this.POLLTICK == 2) d.out("Oooops, send..."), alloy.rpcService.formSend("http://tj.qstatic.com/log", {
					method: "POST",
					data: {
						j: "unwanted-poll-stop"
					}
				}), this.POLLTICK = 0
			},
			startWatch: function() {
				d.out("PollWatcher: start...");
				try {
					k.addObserver(EQQ, "NotifyBeat_2", this._check)
				} catch (a) {}
				this.POLLTICK = 0
			},
			stopWatch: function() {
				d.out("PollWatcher: stop...");
				try {
					k.removeObserver(EQQ, "NotifyBeat_2", this._check)
				} catch (a) {}
				this.POLLTICK = 0
			}
		};
		this.pollWatcher = new e;
		this.init = function() {};
		this.getClientId = function() {
			return a
		};
		this.send = this._proxy;
		this.sendLogin = function(c) {
			if (window.webTop) c.v = Number(webTop.version) + 1E4;
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/login2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: this.sendLoginSuccess,
				onError: this.sendLoginError,
				onTimeout: this.sendLoginTimeout
			});
			alloy.util.report2h("eqqLoginCgi", "start");
			alloy.portal.speedTest.sRTS(16, "start", new Date)
		};
		this.sendLoginSuccess = function(a, c) {
			switch (a.retcode) {
			case 0:
				f = 1;
				k.notifyObservers(EQQ, "LoginSuccess", a.result);
				alloy.portal.speedTest.sRTS(4, "start", new Date);
				alloy.portal.speedTest.sRTS(5, "start", new Date);
				break;
			case 103:
				k.notifyObservers(this, "NotLogin", a.result);
				break;
			case 106:
				k.notifyObservers(EQQ, "UinNotInWhitelist", a.result);
				break;
			case 111:
				k.notifyObservers(EQQ, "UinInBlacklist", a.result);
				break;
			case 112:
				k.notifyObservers(EQQ, "Overload", a.result);
				break;
			case 1E5:
			case 100001:
			case 100002:
				k.notifyObservers(EQQ, "PtwebqqFail", a.result);
				break;
			default:
				d.out("\u672a\u77e5\u767b\u5f55\u5931\u8d25"), k.notifyObservers(EQQ, "LoginFailure", {
					text: "\u8fde\u63a5\u5931\u8d25"
				}), d.out("[sendLogin] error: " + a.retcode), n(a, !c)
			}
			alloy.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", ["ok"][a.retcode] || a.retcode);
			n(a, c);
			alloy.portal.speedTest.sRTS(16, "end", new Date, !0)
		};
		this.sendLoginError = function(a) {
			d.out("sendLoginError");
			k.notifyObservers(EQQ, "LoginFailure", {
				text: "\u8fde\u63a5\u5931\u8d25"
			});
			alloy.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", "error");
			n(a)
		};
		this.sendLoginTimeout = function(a) {
			d.out("sendLoginError");
			k.notifyObservers(EQQ, "LoginFailure", {
				text: "\u8fde\u63a5\u5931\u8d25"
			});
			alloy.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", "timeout");
			n(a)
		};
		this.sendLogout = function(a) {
			a = a || {};
			a.ids = EQQ.Model.ChatMsg.getMessageRead();
			this.send(m + "channel/logout2", {
				context: this,
				data: a,
				onSuccess: function(a) {
					a.retcode === 0 || a.retcode === 100 ? (f = 0, k.notifyObservers(this, "LogoutSuccess", a.result), d.out(":LogoutSuccess...")) : d.out("[SendLogout] error: " + a.retcode)
				}
			})
		};
		this.sendReLink = function(j) {
			if (window.webTop) j.v = Number(webTop.version) + 1E4;
			j.clientid = a;
			j.psessionid = EQQ.getPsessionid();
			if (c._state) j.status = c._state;
			this.send(m + "channel/login2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(j)
				},
				onSuccess: this.sendReLinkSuccess,
				onError: this.sendReLinkError,
				onTimeout: this.sendReLinkTimeout
			})
		};
		this.sendReLinkSuccess = function(a, c) {
			switch (a.retcode) {
			case 0:
				f = 1;
				k.notifyObservers(EQQ, "ReLinkSuccess", a.result);
				break;
			case 103:
				k.notifyObservers(this, "NotReLogin", a.result);
				break;
			case 113:
			case 115:
			case 112:
				k.notifyObservers(EQQ, "ReLinkFailure", a);
				break;
			default:
				k.notifyObservers(EQQ, "ReLinkStop"), n(a, !c)
			}
			n(a, c)
		};
		this.sendReLinkError = function(a) {
			d.out("sendReLinkError");
			k.notifyObservers(EQQ, "ReLinkFailure");
			n(a)
		};
		this.sendReLinkTimeout = function(a) {
			d.out("sendReLinkTimeout");
			k.notifyObservers(EQQ, "ReLinkFailure");
			n(a)
		};
		this.sendGetOnlineBuddies = function() {
			this.send(m + "channel/get_online_buddies2", {
				context: this,
				data: {},
				onSuccess: function(a, c) {
					a.retcode === 0 ? k.notifyObservers(this, "GetOnlineBuddiesSuccess", a.result) : n(a, !c);
					n(a, c)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/send_buddy_msg2", {
				context: this,
				cacheTime: 0,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, e) {
					a.retcode === 0 ? k.notifyObservers(this, "SendMsgSuccess", a.result) : (d.out("[sendMsg] error: " + a.retcode + "-" + a.errmsg), k.notifyObservers(this, "SendMsgError", {
						uin: c.to,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendMsg,
						cbParam: c
					}), n(a, !e));
					n(a, e)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendGroupMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/send_qun_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, e) {
					a.retcode === 0 ? k.notifyObservers(this, "SendGroupMsgSuccess", a.result) : (d.out("[sendGroupMsg] error: " + a.retcode + "-" + a.errmsg), k.notifyObservers(this, "SendMsgError", {
						uin: c.group_uin,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendGroupMsg,
						cbParam: c
					}), n(a, !e));
					n(a, e)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendPoll = function(e) {
			e = e || {};
			e = e.data || {};
			alloy.portal.isLocked() && alloy.portal.revertLockCookie();
			e.clientid = a;
			e.psessionid = EQQ.getPsessionid();
			e.key = alloy.portal.getSecretKey();
			if (h < f) h++, e.ids = EQQ.Model.ChatMsg.getMessageRead(), c.pollWatcher.pollRequst = this.send(m + "channel/poll2", {
				context: this,
				cacheTime: 0,
				method: "POST",
				data: {
					r: d.json.stringify(e)
				},
				timeout: 9E4,
				onSuccess: this.sendPollSuccess,
				onError: this.sendPollError,
				onTimeout: this.sendPollTimeout
			});
			alloy.portal.isLocked() && alloy.portal.saveAndDelLockCookie()
		};
		this.sendPollSuccess = function(a, e) {
			c.pollWatcher.pollStop();
			(new Date).getTime();
			h--;
			if (a.retcode === 0 || a.retcode === 102) {
				g = 0;
				try {
					k.notifyObservers(this, "PollSuccess", a.result)
				} catch (f) {
					d.out("PollSuccess, but [PollSuccess notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1)
				}
				try {
					k.notifyObservers(this, "PollComplete")
				} catch (m) {
					d.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1)
				}
			} else if (a.retcode === 100) k.notifyObservers(this, "NotReLogin");
			else if (a.retcode === 120) k.notifyObservers(EQQ, "ReLinkFailure", a);
			else if (a.retcode === 121) k.notifyObservers(EQQ, "ReLinkFailure", a);
			else if (a.retcode === 116) alloy.portal.setPtwebqq(a.p), k.notifyObservers(this, "PollComplete");
			else {
				try {
					k.notifyObservers(o, "PollComplete")
				} catch (r) {
					d.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1)
				}
				a.retcode != 109 && a.retcode != 110 && y()
			}
			n(a, e)
		};
		this.sendPollTimeout = function() {
			c.pollWatcher.pollStop();
			h--;
			try {
				k.notifyObservers(this, "PollComplete")
			} catch (a) {
				d.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1)
			}
			y()
		};
		this.sendPollError = function(a) {
			this.sendPollTimeout(a);
			n(a)
		};
		this.sendChangeStatus = function(a) {
			a = a || {
				newstatus: "hidden"
			};
			this.send(m + "channel/change_status2", {
				context: this,
				data: a,
				arguments: a,
				onSuccess: function(a, d) {
					if (a.retcode === 0) k.notifyObservers(this, "ChangeStatusSuccess", a.arguments.newstatus), c._state = a.arguments.newstatus;
					a.retcode === 108 ? k.notifyObservers(this, "NotReLogin", a.result) : n(a, !d);
					n(a, d)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendShakeWindow = function(a) {
			a = a || {
				newstatus: "hidden"
			};
			this.send(m + "channel/shake2", {
				context: this,
				data: a,
				arguments: a,
				onSuccess: function(c, d) {
					c.retcode === 0 ? k.notifyObservers(this, "ShakeWindowSuccess", a.to_uin) : (k.notifyObservers(this, "ShakeWindowFail", a.to_uin), n(c, !d));
					n(c, d)
				},
				onError: function(c) {
					k.notifyObservers(this, "ShakeWindowFail", a.to_uin);
					n(c)
				}
			})
		};
		this.sendGetSessionSignature = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/get_c2cmsg_sig2", {
				context: this,
				data: c,
				arguments: c,
				onSuccess: function(a, d) {
					if (a.retcode === 0) {
						var e = a.result;
						e.id = c.service_type === 0 ? c.id : EQQ.Model.BuddyList.encodeDid(c.id);
						e.uin = c.to_uin;
						k.notifyObservers(this, "GetSessionSignatureSuccess", e)
					} else n(a, !d);
					n(a, d)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendGroupBuddyMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/send_sess_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, d) {
					a.retcode === 0 ? k.notifyObservers(this, "SendMsgSuccess", a.result) : (k.notifyObservers(this, "SendMsgError", {
						uin: c.to,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendGroupBuddyMsg,
						cbParam: c
					}), n(a, !d));
					n(a, d)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendGetCustomFaceList = function() {
			alloy.portal.recoverCookie();
			d.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/", {
				query: "cmd=1?t=" + (new Date).getTime() + "&vfwebqq=" + alloy.portal.getVfWebQQ(),
				onSuccess: function() {
					typeof custom_face !== "undefined" ? k.notifyObservers(c, "SendGetCustomFaceListSuccess", custom_face) : c.sendGetCustomFaceList()
				}
			})
		};
		this.sendDeleteCustomFace = function(a) {
			alloy.portal.recoverCookie();
			d.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/", {
				query: "cmd=12&bd=" + a.img + "&vfwebqq=" + alloy.portal.getVfWebQQ(),
				onSuccess: function() {
					typeof cface_delete_result !== "undefined" && k.notifyObservers(c, "SendDeleteCustomFaceSuccess", a.callback ||
					function() {})
				}
			})
		};
		this.sendGetGroupCustomFaceKey = function(a) {
			this.send(m + "channel/get_gface_sig2", {
				context: this,
				arguments: a.arguments,
				onSuccess: function(c, d) {
					c.retcode === 0 ? k.notifyObservers(this, "SendGetGroupCustomFaceKeySuccess", c) : (k.notifyObservers(this, "SendGetGroupCustomFaceKeyError", {
						uin: a.to,
						retcode: c.retcode,
						errmsg: c.errmsg
					}), n(c, !d));
					n(c, d)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendGetGroupCustomFaceInfo = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/send_qun_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, d) {
					a.retcode === 0 ? k.notifyObservers(this, "SendGetGroupCustomFaceInfoSuccess", a) : (k.notifyObservers(this, "SendMsgError", {
						uin: c.group_uin,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendGetGroupCustomFaceInfo,
						cbParam: c
					}), n(a, !d));
					n(a, d)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendGetOfflinePicUrl = function(a) {
			this.send(m + "channel/apply_offline_pic_dl2", {
				context: this,
				data: a,
				onSuccess: function(a, c) {
					a.retcode === 0 ? (k.notifyObservers(this, "sendGetOfflinePicUrlSuccess", a), alloy.util.report2m(133173)) : (k.notifyObservers(this, "getSendPicUrlError", a), d.out("[sendGetOfflinePicUrlError] error: "), n(a, !c), alloy.util.report2m(133174));
					n(a, c)
				},
				onError: function(a) {
					n(a);
					alloy.util.report2m(133174)
				}
			})
		};
		this.sendRefuseFile = function(a) {
			this.send(m + "channel/refuse_file2", {
				context: this,
				data: a,
				onSuccess: function() {}
			})
		};
		this.sendGetMyAvatarFlag = function(a) {
			a = a || {};
			a.type = 1;
			a.psessionid = EQQ.getPsessionid();
			a.clientid = EQQ.RPCService.getClientId();
			this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/query_user_flag", {
				context: this,
				method: "GET",
				data: a,
				arguments: {},
				onSuccess: function(a) {
					a.retcode === 0 ? k.notifyObservers(this, "GetMyAvatarFlagSuccess", a) : k.notifyObservers(this, "GetMyAvatarFlagError", a)
				},
				onError: function(a) {
					k.notifyObservers(this, "GetMyAvatarFlagError", a)
				}
			})
		};
		this.sendDeleteMyAvatarFlag = function(a) {
			a = a || {};
			a.vfwebqq = alloy.portal.getVfWebQQ();
			a.type = 1;
			a.img_id = 0;
			a.psessionid = EQQ.getPsessionid();
			a.clientid = EQQ.RPCService.getClientId();
			this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/del_chead", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(a)
				},
				arguments: {},
				onSuccess: function(a) {
					a.retcode === 0 ? k.notifyObservers(this, "DeleteMyAvatarFlagSuccess", a) : k.notifyObservers(this, "DeleteMyAvatarFlagError", a)
				},
				onError: function(a) {
					k.notifyObservers(this, "DeleteMyAvatarFlagError", a)
				}
			})
		};
		this.sendGroupRequestJoin = function(a, c, d, e) {
			a = a || {};
			this.send(m + "channel/op_group_join_req", {
				context: this,
				data: a,
				arguments: c || {},
				onSuccess: d ||
				function() {},
				onError: e ||
				function() {}
			})
		};
		this.sendGetDiscuList = function(a) {
			a = {};
			a.clientid = EQQ.RPCService.getClientId();
			a.psessionid = EQQ.getPsessionid();
			a.vfwebqq = alloy.portal.getVfWebQQ();
			this.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_discu_list", {
				context: c,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					a.retcode === 0 ? (func(), getDiscuListSuccess()) : d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				},
				onError: function() {
					d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				}
			})
		};
		this.sendDiscuMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/send_discu_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, e) {
					a.retcode === 0 ? a.result.error == 3 ? k.notifyObservers(this, "DiscuNotExist", c) : k.notifyObservers(this, "SendDiscuMsgSuccess", a.result) : (d.out("[sendDiscuMsg] error: " + a.retcode + "-" + a.errmsg), k.notifyObservers(this, "SendMsgError", {
						uin: EQQ.Model.BuddyList.encodeDid(c.did),
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendDiscuMsg,
						cbParam: c
					}), n(a, !e));
					n(a, e)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendGetDiscuSessionSignature = function(a) {
			this.send(m + "channel/get_session_sig3", {
				context: this,
				data: {
					did: a.group_uin,
					to_uin: a.to_uin
				},
				arguments: {
					group_uin: a.group_uin,
					to_uin: a.to_uin
				},
				onSuccess: function(a, c) {
					a.retcode === 0 ? k.notifyObservers(this, "GetDiscuSessionSignatureSuccess", a) : n(a, !c);
					n(a, c)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendDiscuBuddyMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			c.service_type = 1;
			this.send(m + "channel/send_sess_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, d) {
					a.retcode === 0 ? k.notifyObservers(this, "SendMsgSuccess", a.result) : (k.notifyObservers(this, "SendMsgError", {
						uin: c.to,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendDiscuBuddyMsg,
						cbParam: c
					}), n(a, !d));
					n(a, d)
				},
				onError: function(a) {
					n(a)
				}
			})
		};
		this.sendRefuseOffFile = function(a) {
			a.psessionid = EQQ.getPsessionid();
			a.clientid = EQQ.RPCService.getClientId();
			this.send(m + "channel/notify_offfile2", {
				context: this,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					a.retcode === 0 ? (k.notifyObservers(this, "RefuseOffFileSuccess", a), d.out("RefuseOffFileSuccess.")) : d.out("RefuseOffFileFail.")
				},
				onError: function() {
					d.out("RefuseOffFileFail. onError")
				}
			})
		};
		this.sendOffFileMsg = function(c, e) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/send_offfile2", {
				context: this,
				cacheTime: 0,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				arguments: c,
				onSuccess: e ||
				function(a) {
					a.retcode === 0 ? k.notifyObservers(this, "SendOffFileMsgSuccess", a.result) : d.out("[SendOffFileMsgSuccess] error: " + a.retcode + "-" + a.errmsg)
				},
				onError: e ||
				function() {}
			})
		};
		this.sendTyping = function(c, d, e) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(m + "channel/input_notify2", {
				context: this,
				data: c,
				arguments: c,
				onSuccess: d ||
				function() {},
				onError: e ||
				function() {}
			})
		}
	})
})();
(function() {
	WebqCore.register("EQQ.Model.BuddyList", function(d) {
		var e = this,
			c = d.event,
			o = d.dom,
			k = d.string,
			g, a, h, w, f, m, r, n, y, p, u, j, z, I, H, A, x, v = [],
			B = [],
			q = 0,
			F = new d.Class({
				init: function(b) {
					this.uin = b.uin;
					this.ruin = b.ruin;
					this.uiuin = b.uiuin;
					this.allow = b.allow;
					this.face = b.face;
					this.age = b.age;
					this.gender = b.gender;
					this.vip = b.vip || !1;
					this.clientType = b.clientType || "10000";
					this.setAvatar(EQQ.getUserAvatar(this.uin));
					this.setNick(b.nick || b.ruin || b.uin);
					this.setState(b.state || EQQ.hash.onlineStatus.offline);
					this.did = b.did || "";
					this.chatSession = {};
					this.setClassId(b.classId || 0)
				},
				setUiUin: function(b) {
					this.uiuin = b
				},
				setClientType: function(b) {
					this.clientType = b || "10000"
				},
				setAvatar: function(b) {
					this.avatarUrl = b;
					c.notifyObservers(EQQ.Model.BuddyList, "AvatarChange", this)
				},
				getAvatar: function() {
					return EQQ.getUserAvatar(this.uin)
				},
				setNick: function(b) {
					if (!b && this.ruin) b = this.ruin;
					this.nick = d.string.toSingleLine(b);
					this.htmlNick = d.string.encodeHtmlSimple(this.nick);
					this.titleNick = this.nick;
					this.updateNames()
				},
				setMarkName: function(b) {
					this.markName = d.string.toSingleLine(b.toString());
					this.htmlMarkName = d.string.encodeHtmlSimple(this.markName.toString());
					this.titleMarkName = d.string.encodeHtmlAttributeSimple(this.markName.toString());
					this.updateNames()
				},
				updateNames: function() {
					this.updateShowName();
					this.updateAllName();
					c.notifyObservers(EQQ.Model.BuddyList, "UserNameChange", this);
					c.notifyObservers(alloy.taskBar, "UpdateTaskName", {
						appId: "5_0",
						id: this.uin,
						name: this.markName || this.nick
					})
				},
				updateShowName: function() {
					this.showName = (this.markName || this.nick || this.ruin || this.uin) + "";
					this.htmlShowName = d.string.encodeHtmlSimple(this.showName.toString());
					this.titleShowName = d.string.encodeHtmlAttributeSimple(this.showName.toString())
				},
				updateAllName: function() {
					var b = this.allName = "";
					this.markName ? (b = this.markName + "(" + this.nick + ")", this.allName = this.markName + "(" + this.nick + ")") : this.allName = b = this.nick;
					this.htmlAllName = d.string.encodeHtmlSimple(this.allName);
					this.titleAllName = d.string.encodeHtmlAttributeSimple(b)
				},
				setClassId: function(b) {
					this.classId = b
				},
				setSignature: function(b) {
					if (b != void 0) this.signature = b, this.htmlSignature = d.string.encodeHtmlSimple(b), this.titleSignature = d.string.encodeHtmlAttributeSimple(b);
					c.notifyObservers(EQQ.Model.BuddyList, "UserSignatureChange", this)
				},
				getUiUin: function() {
					return this.uiuin || this.uin
				},
				getSignature: function() {
					this.signature != void 0 ? this.setSignature() : alloy.rpcService.sendGetSignature(this.uin)
				},
				setQQLevel: function(b) {
					if (b != void 0) this.level = b;
					c.notifyObservers(EQQ.Model.BuddyList, "UserQQLevelChange", this)
				},
				getQQLevel: function() {
					this.level != void 0 ? this.setQQLevel() : alloy.rpcService.sendGetQQLevel(this.uin)
				},
				setState: function(b) {
					this.state = b
				},
				getState: function() {
					return this.state
				},
				setFace: function(b) {
					this.face = b
				},
				setGender: function(b) {
					this.gender = b
				},
				setAllow: function(b) {
					this.allow = b
				},
				setUsercard: function(b, a) {
					this.usercard = this.usercard || {};
					this.usercard[b] = {
						title: a,
						htmlAttribute: d.string.encodeHtmlAttributeSimple(a),
						html: d.string.encodeHtmlSimple(a)
					};
					c.notifyObservers(EQQ.Model.BuddyList, "UserCardChange", this.usercard)
				},
				getUsercard: function(b) {
					this.usercard = this.usercard || {};
					return this.usercard[b]
				}
			}),
			G = new d.Class({
				init: function(b) {
					this.gid = b.gid;
					this.code = b.code;
					this.mask = String(b.mask);
					this.preMask = String(this.mask);
					this.setName(b.name);
					this.setMarkName(b.markName);
					this.setType(b.type);
					this.hasManageAuthority = this.isLoadInfo = !1;
					this.uin2members = {};
					this.level = 0
				},
				setMask: function(b) {
					this.preMask = String(this.mask);
					this.mask = String(b);
					c.notifyObservers(EQQ.Model.BuddyList, "SingleGroupMaskChange", this)
				},
				setName: function(b) {
					this.name = d.string.toSingleLine(b);
					this.htmlName = d.string.encodeHtmlSimple(b);
					this.titleName = d.string.encodeHtmlAttributeSimple(b);
					this.updateNames()
				},
				setMarkName: function(b) {
					if (typeof b == "undefined" || b == "") return !1;
					this.markName = d.string.toSingleLine(b);
					this.htmlMarkName = d.string.encodeHtmlSimple(b);
					this.titleMarkName = d.string.encodeHtmlAttributeSimple(b);
					this.updateNames()
				},
				updateNames: function() {
					this.updateShowName();
					this.updateAllName();
					c.notifyObservers(EQQ.Model.BuddyList, "GroupNameChange", this);
					c.notifyObservers(alloy.taskBar, "UpdateTaskName", {
						appId: "5_0",
						id: this.gid,
						name: this.markName || this.name
					})
				},
				updateShowName: function() {
					this.showName = this.markName || this.name || String(this.code);
					this.htmlShowName = d.string.encodeHtmlSimple(this.showName);
					this.titleShowName = d.string.encodeHtmlAttributeSimple(this.showName)
				},
				updateAllName: function() {
					var b = "";
					this.allName = "";
					this.markName ? (b = this.markName + "(" + this.name + ")", this.allName = this.markName + "(" + this.name + ")") : (b = this.name, this.allName = this.name + "<" + this.code + ">");
					this.htmlAllName = d.string.encodeHtmlSimple(this.allName);
					this.titleAllName = d.string.encodeHtmlAttributeSimple(b)
				},
				type2text: {
					commonGroup: "\u666e\u901a\u7fa4",
					seniorGroup: "\u9ad8\u7ea7\u7fa4",
					superGroup: "\u8d85\u7ea7\u7fa4",
					expireSuperGroup: "\u8fc7\u671f\u7684\u8d85\u7ea7\u7fa4",
					enterpriseGroup: "\u4f01\u4e1a\u7fa4",
					forbiddenGroup: "\u7981\u7528"
				},
				setType: function(b) {
					this.type = b;
					this.typeText = this.type2text[b] || "\u5176\u4ed6\u7c7b\u578b\u7fa4";
					this.htmlTypeText = d.string.encodeHtmlSimple(this.typeText);
					this.titleTypeText = d.string.encodeHtmlAttributeSimple(this.typeText)
				},
				setLevel: function(b) {
					this.level = b || 0
				},
				setAnnouncement: function(b) {
					if (typeof b != "undefined") this.announcement = b, this.htmlAnnouncement = d.string.encodeHtmlSimple(b), this.titleAnnouncement = d.string.encodeHtmlAttributeSimple(b), c.notifyObservers(e, "GroupAnnouncementChange", this)
				},
				upAnnouncement: function(b) {
					if (typeof b != "undefined") this.announcement = b, this.htmlAnnouncement = d.string.encodeHtmlSimple(b), this.titleAnnouncement = d.string.encodeHtmlAttributeSimple(b), c.notifyObservers(e, "GroupAnnouncementChange", this)
				},
				updateMembers: function(b, a) {
					if (b) this.members = b, this.onlineMemberCount = a, this.uin2members[b.uin] = b;
					c.notifyObservers(e, "GroupMembersChange", this)
				},
				updateMemberState: function(b) {
					for (var a = b.stats, b = this.members, i = 0, d = {}, l = [], i = 0; i < a.length; i++) d[a[i].uin] = a[i].stat;
					a = b.length;
					for (i = 0; i < a; i++) {
						var f = b[i].info,
							h = f.uin;
						d[h] = d[h] || 20;
						if (f.gstate != d[h] && h != g) l.push({
							uin: h,
							stat: d[h],
							oldStat: f.gstate
						}), f.gstate = d[h]
					}
					c.notifyObservers(e, "GroupMemberStateChange", {
						t: this,
						arg: l
					})
				},
				updateMemberCard: function(b) {
					var a = this.members,
						i = !1,
						l;
					for (l in a) {
						var f = a[l];
						if (f.uin == b.uin) {
							b.card == "" ? (this.members[l].usercard = d.string.encodeHtmlSimple(f.nick), this.members[l].info.setUsercard(this.code, f.nick)) : (this.members[l].usercard = d.string.encodeHtmlSimple(b.card), this.members[l].info.setUsercard(this.code, b.card));
							i = !0;
							break
						}
					}
					i && c.notifyObservers(e, "GroupMemberCardChange", {
						gid: this.gid,
						gcode: this.code,
						uin: b.uin
					})
				},
				getMenberByUin: function(b) {
					return this.uin2members[b]
				}
			}),
			t = {
				onSelfInfoReady: function(b) {
					if (e.getSelf()) {
						var a = e.getSelf();
						a.setNick(b.nick);
						a.setFace(b.face);
						a.setGender(b.gender);
						a.setAllow(b.allow);
						a.setUiUin(b.uiuin);
						a.vip = b.vip;
						a.age = b.age
					} else e.setSelf(b)
				},
				onSelfInfoChanged: function(b) {
					var a = e.getSelf();
					a.setNick(b.nick);
					a.setGender(b.gender)
				},
				onGetUserInfoSuccess: function(b) {
					var a = b.result;
					if (a) {
						var i = e.getUserByUin(b.arguments.uin);
						if (i) i.setNick(a.nick), i.setFace(a.face), i.setGender(a.gender), i.setAllow(a.allow);
						else {
							b = {
								uin: b.arguments.uin,
								allow: a.allow,
								nick: a.nick,
								face: a.face,
								ruin: a.ruin,
								gender: a.gender
							};
							if (alloy.portal.getUin() == b.uin) b.uiuin = alloy.portal.getCookiePTUiUin();
							i = e.createUser(b);
							e.addStranger(i)
						}
						c.notifyObservers(e, "GetUserInfoSuccess", i)
					}
				},
				onGetUserInfoError: function() {},
				onGetBuddySignatureSuccess: function(b) {
					var a = b.result,
						i;
					i = a.length == 0 ? "" : a[0].lnick;
					a.length != 0 && a[0].uin == alloy.portal.getUin() && e.setSelfSignature(a[0].lnick);
					(b = e.getUserByUin(b.arguments.uin)) && b.setSignature(i);
					c.notifyObservers(e, "GetBuddySignatureSuccess", b)
				},
				onGetMultiBuddySignatureSuccess: function(b) {
					var b = b.result,
						a;
					for (a in b) {
						var i = e.getUserByUin(b[a].tuin);
						i && i.setSignature(b[a].lnick)
					}
				},
				onChangeGroupMaskSuccess: function(b) {
					b.uin == e.getSelfUin() ? (x = b.mask, c.notifyObservers(e, "GroupMaskChange", x)) : e.getGroupByGid(b.uin).setMask(b.mask)
				},
				onGetQQLevelSuccess: function(b) {
					var a = e.getUserByUin(b.arguments.uin);
					a && a.setQQLevel(b.result)
				},
				onGetGroupMaskConfigSuccess: function(b) {
					for (var a in b) {
						var i = parseInt(b[a]);
						a === "global" && (x = i, c.notifyObservers(e, "GroupMaskChange", x))
					}
				},
				onGetOnlineBuddiesSuccess: function(b) {
					e.setAllBuddyState(b)
				},
				onGetSessionSignatureSuccess: function(b) {
					e.setGroupBuddySessionSignature(b)
				},
				onBuddyStatusChange: function(b) {
					e.setState(b.uin, b.status, b.client_type)
				},
				onBuddyListChange: function(b) {
					if (b.removed_friends && b.removed_friends.length > 0) for (var a in b.removed_friends) e.removeBuddy(b.removed_friends[a].uin)
				},
				onGetSelfSignatureSuccess: function(b) {
					e.setSelfSignature(b)
				},
				onGetBuddyListSuccess: function(b) {
					for (var a = b.categories || [], i = !1, c = 0; c < a.length; c++) a[c].index == 0 && (i = !0);
					i || a.unshift({
						index: 0,
						name: "\u6211\u7684\u597d\u53cb"
					});
					e.isBuddyList = !0;
					e.setBuddyClass(b);
					e.setBuddyList(b);
					EQQ.RPCService.sendGetOnlineBuddies()
				},
				GetBuddyListError: function(b) {
					b.retcode == 50 ? (d.dom.id("EQQ_ReLoginPanel_inner").style.height = "66px", b = "\u597d\u53cb\u62c9\u53d6\u5931\u8d25\uff0c\u60a8\u53ef\u80fd\u662f\u975e\u6cd5\u8f6f\u4ef6\u7684\u53d7\u5bb3\u8005\uff01") : b = "\u62c9\u53d6\u5931\u8d25";
					c.notifyObservers(EQQ, "LoginFailure", {
						text: b
					})
				},
				onGetGroupListSuccess: function(b) {
					e.isGroupList = !0;
					for (var a = b.gmasklist || [], i = 0, c = 0; c < a.length; c++) {
						var d = a[c];
						if (d.gid === 1E3) i = d.mask;
						else for (var l = 0; l < b.gnamelist.length; l++) if (b.gnamelist[l].gid === d.gid) {
							b.gnamelist[l].mask = d.mask;
							break
						}
					}
					e.setGroupList(b);
					e.setGroupMask(i)
				},
				GetGroupListError: function() {
					c.notifyObservers(EQQ, "LoginFailure", {
						text: "\u62c9\u53d6\u5931\u8d25"
					})
				},
				onGetGroupInfoSuccess: function(b) {
					e.setGroupInfo(b)
				},
				onGetRecentListSuccess: function(b) {
					e.setRecentList(b)
				},
				onPollSuccess: function(b) {
					if (b) for (var a = 0; a < b.length; a++) {
						var i = b[a];
						switch (i.poll_type) {
						case "buddies_status_change":
							t.onBuddyStatusChange(i.value);
							break;
						case "buddylist_change":
							t.onBuddyListChange(i.value)
						}
					}
				},
				onLoginSuccess: function(b) {
					var a = e.getSelfUin();
					e.setState(a, b.status, "QQWeb");
					EQQ.index = b.index;
					EQQ.port = b.port
				},
				onAddANewBuddy: function(b) {
					var a = b.gid,
						i = b.newstate,
						l = b.markname;
					alloy.rpcService.sendGetUserInfo(b.tuin, null, null, function(b) {
						if (b.retcode === 0) {
							var f = b.result,
								b = b.arguments.uin,
								g = e.getUserByUin(b);
							g ? (g.classId == EQQ.hash.userClassType.stranger && (d.array.remove(n, g), c.notifyObservers(e, "RemoveBuddy", {
								classObj: {
									index: EQQ.hash.userClassType.stranger
								},
								user: g
							})), g.setNick(f.nick), g.setFace(f.face), g.setGender(f.gender), g.setClassId(a)) : g = e.createUser({
								uin: b,
								allow: f.allow,
								nick: f.nick,
								face: f.face,
								gender: f.gender,
								ruin: f.ruin,
								classId: a
							});
							g.setState(i.status);
							e.addBuddy(g);
							EQQ.Model.BuddyList.getClassById(a).count += 1;
							f = EQQ.Model.BuddyList.getClassByUin(g.uin);
							f.list[i.status].unshift(g);
							i.status != EQQ.hash.onlineStatus.offline && (f.onlineCount++, j.push({
								uin: b,
								state: i.status,
								clientType: i.client_type
							}));
							c.notifyObservers(EQQ.Model.BuddyList, "AddBuddy", {
								user: g,
								newstate: i,
								markname: l
							})
						}
					})
				},
				onAddNewGroupToModel: function(b) {
					var a = e.getGroupByCode(b);
					if (!d.isUndefined(a) && a) return !0;
					alloy.rpcService.sendGetGroupPublicInfo(b, b, EQQ.Model.BuddyList.onGetGroupPublicSuccess, function() {})
				}
			};
		this.init = function() {
			a = [];
			h = {};
			w = [];
			f = {};
			m = [];
			r = {};
			n = [];
			y = {};
			p = [];
			u = {};
			r = {};
			j = [];
			z = [];
			H = {};
			A = {};
			v = [];
			B = [];
			q = 0;
			c.addObserver(alloy.portal, "SelfInfoChanged", t.onSelfInfoChanged);
			c.addObserver(alloy.rpcService, "GetUserInfoSuccess", t.onGetUserInfoSuccess);
			c.addObserver(alloy.rpcService, "GetUserInfoError", t.onGetUserInfoError);
			c.addObserver(alloy.rpcService, "GetGroupInfoSuccess", t.onGetGroupInfoSuccess);
			c.addObserver(alloy.rpcService, "GetQQLevelSuccess", t.onGetQQLevelSuccess);
			c.addObserver(alloy.rpcService, "GetBuddySignatureSuccess", t.onGetBuddySignatureSuccess);
			c.addObserver(alloy.rpcService, "GetMultiBuddySignatureSuccess", t.onGetMultiBuddySignatureSuccess);
			c.addObserver(EQQ, "LoginSuccess", t.onLoginSuccess);
			c.addObserver(EQQ.RPCService, "GetOnlineBuddiesSuccess", t.onGetOnlineBuddiesSuccess);
			c.addObserver(EQQ.RPCService, "GetSelfSignatureSuccess", t.onGetSelfSignatureSuccess);
			c.addObserver(EQQ.RPCService, "GetSessionSignatureSuccess", t.onGetSessionSignatureSuccess);
			c.addObserver(EQQ.RPCService, "PollSuccess", t.onPollSuccess);
			c.addObserver(e, "AddANewBuddy", t.onAddANewBuddy);
			c.addObserver(e, "BuddyStatusChange", t.onBuddyStatusChange);
			c.addObserver(alloy.portal, "selfInfoReady", t.onSelfInfoReady);
			c.addObserver(e, "AddNewGroupToModel", t.onAddNewGroupToModel);
			c.addObserver(e, "ReloadGroupInfo", this.onReloadGroupInfo);
			c.addObserver(EQQ.RPCService, "GetDiscuSessionSignatureSuccess", Q);
			c.addObserver(EQQ.RPCService, "DiscuNotExist", O)
		};
		this.reset = function() {
			g = 0;
			a = [];
			h = {};
			w = [];
			f = {};
			m = [];
			r = {};
			n = [];
			y = {};
			p = [];
			u = {};
			r = {};
			j = [];
			z = [];
			H = {};
			A = {};
			v = [];
			B = [];
			q = 0;
			this.setSelf({
				uin: alloy.portal.getUin()
			})
		};
		this.sendGetBuddyList = function(b) {
			b = b || {};
			b.hash = EQQ.h1;
			b.vfwebqq = EQQ.vfwebqq;
			return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL + "get_user_friends2", {
				context: this,
				method: "POST",
				param: b,
				callback: function(b, a) {
					b.retcode === 0 ? (t.onGetBuddyListSuccess(b.result), a(b)) : t.GetBuddyListError(b);
					alloy.util.report2h("eqqGetData", "end_BuddyList", ["ok"][b.retcode] || b.retcode);
					alloy.portal.speedTest.sRTS(14, "end", new Date, !0)
				},
				errback: function(b) {
					t.GetBuddyListError(b);
					alloy.util.report2h("eqqGetData", "end_BuddyList", "error")
				},
				timeback: function(b) {
					t.GetBuddyListError(b);
					qqweb.util.report2h("eqqGetData", "end_BuddyList", "timeout")
				}
			})
		};
		this.sendGetGroupList = function(b) {
			b = b || {};
			b.vfwebqq = EQQ.vfwebqq;
			return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL + "get_group_name_list_mask2", {
				context: this,
				method: "POST",
				param: b,
				callback: function(b, a) {
					b.retcode === 0 ? (t.onGetGroupListSuccess(b.result), a(b)) : t.GetGroupListError(b);
					alloy.util.report2h("eqqGetData", "end_GroupList", ["ok"][b.retcode] || b.retcode);
					alloy.portal.speedTest.sRTS(15, "end", new Date, !0)
				},
				errback: function(b) {
					t.GetGroupListError(b);
					alloy.util.report2h("eqqGetData", "end_GroupList", "error")
				},
				timeback: function(b) {
					t.GetGroupListError(b);
					qqweb.util.report2h("eqqGetData", "end_GroupList", "timeout")
				}
			})
		};
		this.sendGetRecentList = function(b) {
			b = b || {};
			b.vfwebqq = EQQ.vfwebqq;
			b.clientid = EQQ.RPCService.getClientId();
			b.psessionid = EQQ.getPsessionid();
			return EQQ.Extend.cgi_module_d(EQQ.BASE_CONST.CONN_SERVER_DOMAIN2 + "channel/get_recent_list2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(b)
				},
				callback: function(b) {
					if (b.retcode === 0) t.onGetRecentListSuccess(b.result)
				},
				errback: function() {}
			})
		};
		this.getUserSignature = function(b) {
			(b = this.getUserByUin(b)) && b.getSignature()
		};
		this.getMultiUserSignture = function(b) {
			var a = [],
				i;
			for (i in b) {
				var c = this.getUserByUin(b[i]);
				typeof c.signature === "undefined" ? a.push(b[i]) : c.setSignature()
			}
			a.length && alloy.rpcService.sendGetMultiSignature("[" + a.toString() + "]")
		};
		this.sendGetQQLevel = function(b) {
			(b = this.getUserByUin(b)) && b.getQQLevel()
		};
		this.setSelf = function(b) {
			this.createUser({
				uin: b.uin || null,
				allow: b.allow || null,
				nick: b.nick || null,
				face: b.face || 0,
				age: b.age || null,
				gender: b.gender || null,
				vip: b.vip || null
			});
			this.setSelfUin(b.uin);
			var a = EQQ.getDefaultState();
			this.setState(b.uin, a, "QQWeb");
			c.notifyObservers(this, "SelfInfoChange", this.getSelf())
		};
		this.getSelf = function() {
			return this.getUserByUin(this.getSelfUin())
		};
		this.getSelfState = function() {
			var b = this.getSelf();
			if (b) return b.state
		};
		this.setSelfUin = function(b) {
			g = b || 0
		};
		this.getSelfUin = function() {
			return g
		};
		this.setSelfSignature = function(b) {
			this.getUserByUin(this.getSelfUin()).setSignature(b);
			c.notifyObservers(this, "SelfSignatureChange", this.getSelf())
		};
		this.sendChangeStatus = function(b) {
			EQQ.RPCService.sendChangeStatus({
				newstatus: b
			})
		};
		this.sendChangeGroupMask = function(b) {
			var a = {
				cAll: b.type === "global" ? b.mask : x,
				idx: EQQ.index,
				port: EQQ.port
			},
				i;
			for (i in z) {
				var c = z[i];
				a[c.gid] = b.type === "single" && b.uin === c.gid ? b.mask : c.mask
			}
			qqweb.rpcService.sendMessageFilterConfig({
				onSuccess: function() {
					t.onChangeGroupMaskSuccess({
						uin: b.uin,
						mask: b.mask
					})
				},
				context: this,
				data: {
					retype: 1,
					app: "EQQ",
					itemlist: '{"groupmask":' + d.json.stringify(a) + "}"
				}
			})
		};
		this.setBuddyClass = function(b) {
			a = b.categories;
			for (b = 0; b < a.length; b++) {
				var i = a[b];
				i.caculateName = i.name;
				i.htmlName = d.string.encodeHtmlSimple(i.name);
				i.titleName = d.string.encodeHtmlAttributeSimple(i.name);
				i.count = 0;
				i.onlineCount = 0;
				i.list = {
					callme: [],
					online: [],
					away: [],
					busy: [],
					silent: [],
					offline: []
				};
				h[i.index] = i
			}
			c.notifyObservers(this, "BuddyClassChange", this.getClassList())
		};
		this.getClassList = function() {
			return a
		};
		this.setAllBuddyState = function(b) {
			j = [];
			for (var a = this.getSelfUin(), i = 0; i < b.length; i++) {
				var d = b[i];
				d.uin != a && this.setState(d.uin, d.status, d.client_type)
			}
			c.notifyObservers(this, "AllOnlineBuddyReady", this.getOnlineBuddy());
			c.notifyObservers(this, "AllClassOnlineBuddyReady", this.getClassList())
		};
		this.removeBuddy = function(b) {
			var a = this.getUserByUin(b);
			if (a) {
				r[b] = null;
				f[b] = null;
				delete r[b];
				delete f[b];
				d.array.remove(m, a);
				var i = this.getClassById(a.classId);
				if (i && i.list) {
					if (d.array.remove(i.list[a.getState()], a), i.count--, a.getState() != EQQ.hash.onlineStatus.offline) {
						i.onlineCount--;
						for (var l = this.getOnlineBuddy(), g = 0; g < l.length; g++) l[g].uin == b && l.splice(g, 1)
					}
				} else a.classId == EQQ.hash.userClassType.stranger && (d.array.remove(n, a), i = {
					index: EQQ.hash.userClassType.stranger
				});
				EQQ.Model.ChatMsg.removeMessageBoxUserList(b);
				c.notifyObservers(e, "RemoveBuddy", {
					classObj: i,
					user: a
				})
			}
		};
		this.sendRemoveBuddy = function(b, a) {
			alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "delete_friend", {
				method: "POST",
				data: {
					tuin: b,
					delType: a ? 2 : 1,
					vfwebqq: alloy.portal.getVfWebQQ()
				},
				context: e,
				onSuccess: function(a) {
					a.retcode === 0 ? e.removeBuddy(b) : (c.notifyObservers(e, "ManageError", "del"), d.out("\u5220\u9664\u597d\u53cb\u5931\u8d25"))
				},
				onError: function() {
					c.notifyObservers(e, "ManageError", "del");
					d.out("\u5220\u9664\u597d\u53cb\u5931\u8d25")
				}
			})
		};
		this.moveBuddyClass = function(b, a) {
			var i = this.getUserByUin(b);
			if (i) {
				var l = function() {
						var d = this.getClassByUin(b),
							l = this.getClassById(a);
						l.list[i.getState()].unshift(i);
						l.count++;
						for (var f = d.list[i.state], g = 0; g < f.length; g++) f[g].uin == b && f.splice(g, 1);
						d.count--;
						i.setClassId(a);
						i.getState() != EQQ.hash.onlineStatus.offline && (l.onlineCount++, d.onlineCount--);
						c.notifyObservers(e, "MoveBuddyClass", {
							oldClass: d,
							newClass: l,
							user: i
						})
					};
				alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "modify_friend_group", {
					method: "POST",
					data: {
						tuin: b,
						newid: a,
						vfwebqq: alloy.portal.getVfWebQQ()
					},
					context: e,
					onSuccess: function(b) {
						b.retcode === 0 ? l.call(e) : (c.notifyObservers(e, "ManageError", "mod"), d.out("\u79fb\u52a8\u597d\u53cb\u5206\u7ec4\u5931\u8d25"))
					},
					onError: function() {
						c.notifyObservers(e, "ManageError", "mod");
						d.out("\u79fb\u52a8\u597d\u53cb\u5206\u7ec4\u5931\u8d25")
					}
				})
			}
		};
		this.setUserMarkName = function(b, a) {
			var i = this.getUserByUin(b);
			i && alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "change_mark_name2", {
				method: "POST",
				data: {
					tuin: b,
					markname: a,
					vfwebqq: alloy.portal.getVfWebQQ()
				},
				context: e,
				onSuccess: function(b) {
					b.retcode === 0 ? i.setMarkName(a) : (c.notifyObservers(e, "ManageError", "mark"), d.out("\u4fee\u6539\u5907\u6ce8\u5931\u8d25"))
				},
				onError: function() {
					c.notifyObservers(e, "ManageError", "mark");
					d.out("\u4fee\u6539\u5907\u6ce8\u5931\u8d25")
				}
			})
		};
		this.setState = function(b, a, i) {
			var d = this.getUserByUin(b);
			if (d && d.state !== a) {
				var e = d.state;
				d.setState(a);
				d.clientType = i;
				if (b == this.getSelfUin()) c.notifyObservers(this, "SelfStateChange", this.getSelfState()), c.notifyObservers(alloy.taskBar, "EQQSelfStateChange", {
					state: this.getSelfState()
				});
				else if (d.classId !== EQQ.hash.userClassType.stranger && d.classId !== EQQ.hash.userClassType.balck) {
					var l = this.getClassByUin(d.uin);
					l.list[d.state].unshift(d);
					for (var d = l.list[e], f = 0; f < d.length; f++) if (d[f].uin == b) {
						d.splice(f, 1);
						break
					}
					d = EQQ.hash.onlineStatus.offline;
					if (e == d || a == d) {
						l.onlineCount = l.count - l.list[d].length;
						if (a == d) for (a = 0; a < j.length; a++) {
							if (j[a].uin == b) {
								j.splice(a, 1);
								break
							}
						} else j.push({
							uin: b,
							state: a,
							clientType: i
						});
						c.notifyObservers(this, "OnlineBuddyChange", b)
					}
					c.notifyObservers(this, "BuddyStateChange", b)
				}
			}
		};
		this.setSelfState = function(b) {
			var a = this.getSelf();
			a && (a.state = b);
			c.notifyObservers(alloy.taskBar, "EQQSelfStateChange", {
				state: b
			})
		};
		this.getState = function(b) {
			return (b = this.getUserByUin(b)) ? b.getState() : null
		};
		this.getOnlineBuddy = function() {
			return j
		};
		this.addUser = function(b) {
			f[b.uin] || (f[b.uin] = b, w.push(b));
			return b
		};
		this.addBuddy = function(b) {
			if (!r[b.uin]) b.type = "buddy", r[b.uin] = b, m.push(b);
			return b
		};
		this.createUser = function(b) {
			b = new F(b);
			this.addUser(b);
			return b
		};
		this.addStranger = function(b) {
			y[b.uin] || (y[b.uin] = b, n.push(b));
			return b
		};
		this.addBlack = function(b) {
			if (!u[b.uin]) b.type = "black", u[b.uin] = b, p.push(b);
			return b
		};
		this.getStrangerList = function() {
			return n
		};
		this.setStrangerList = function(b) {
			return n = b
		};
		this.setBuddyList = function(b) {
			m = [];
			var a = b.friends,
				i = this.getSelfUin(),
				d = b.vipinfo || [],
				e = {},
				l;
			for (l in d) e[d[l].u] = d[l].vip_level;
			for (d = 0; d < a.length; d++) a[d].uin != i && (l = b.info[d], l = this.createUser({
				uin: l.uin,
				allow: l.allow,
				nick: l.nick,
				face: l.face,
				age: l.age,
				gender: l.gender,
				vip: l.vip || e[l.uin],
				ruin: l.ruin,
				classId: this.getClassById(a[d].categories) ? a[d].categories : 0
			}), this.addBuddy(l));
			if (b = b.marknames) for (d = 0; d < b.length; d++)(l = this.getUserByUin(b[d].uin)) && l.setMarkName(b[d].markname);
			for (d = 0; d < m.length; d++) m[d].uin != this.getSelfUin() && (b = this.getClassById(m[d].classId), b.list[m[d].state] || (b.list[m[d].state] = []), b.list[m[d].state].push(m[d]), b.count++);
			c.notifyObservers(this, "BuddyListChange", this.getBuddyList())
		};
		this.getBuddyList = function() {
			return m
		};
		this.addNewBuddy = function() {};
		this.searchBuddy = function(b, a) {
			var b = String(b).toLowerCase(),
				i = [],
				c = [];
			if (b.length > 0) for (var d = 0; d < m.length; d++) {
				var e = m[d];
				if (String(e.nick).toLowerCase().indexOf(b) > -1 && String(e.nick) != "undefined" || String(e.markName).toLowerCase().indexOf(b) > -1 && String(e.markName) != "undefined") String(e.nick).toLowerCase() == b || String(e.markName).toLowerCase() == b ? c.push(e) : i.push(e);
				if (i.length + c.length >= a) break
			}
			Array.prototype.push.apply(c, i);
			return c
		};
		this.isUser = function(b) {
			return Boolean(f[b])
		};
		this.isBuddy = function(b) {
			return r[b]
		};
		this.getBuddyByUin = function(b) {
			return r[b]
		};
		this.isStranger = function(b) {
			return y[b]
		};
		this.isBlack = function(b) {
			return u[b]
		};
		this.getUserByUin = function(b) {
			if (f) return f[b]
		};
		this.getClassIdByUin = function(b) {
			return f[b].classId
		};
		this.getClassByUin = function(b) {
			return this.getClassById(this.getClassIdByUin(b))
		};
		this.getClassById = function(b) {
			return h[b]
		};
		this.addGroup = function(b) {
			A[b.code] || (A[b.code] = H[b.gid] = b, z.push(b));
			return b
		};
		this.removeGroup = function(b) {
			if (!d.isUndefined(A[b])) {
				var a = A[b].gid;
				delete A[b];
				delete H[a];
				for (var i in z) z[i].code == b && delete z[i]
			}
		};
		this.onGetGroupPublicSuccess = function(b) {
			b.retcode != 0 && d.error("onGetGroupPublic error:" + b.retcode);
			var b = b.result.ginfo,
				a = "commonGroup";
			b.flag & 16 ? a = "seniorGroup" : b.flag & 33554432 ? a = "superGroup" : b.flag & 2 ? a = "forbiddenGroup" : b.flag & 256 ? a = "enterpriseGroup" : b.flag & 67108864 && (a = "expireSuperGroup");
			b = new G({
				gid: b.gid,
				code: b.code,
				type: a,
				name: b.name,
				markName: b.name,
				mask: "0"
			});
			e.addGroup(b);
			c.notifyObservers(e, "AddNewGroupToList", b)
		};
		this.setGroupList = function(b) {
			var a = b.gnamelist,
				b = b.gmarklist || [];
			z = [];
			for (var i = 0; i < a.length; i++) {
				var d = a[i],
					e = "commonGroup";
				d.flag & 16 ? e = "seniorGroup" : d.flag & 33554432 ? e = "superGroup" : d.flag & 2 ? e = "forbiddenGroup" : d.flag & 256 ? e = "enterpriseGroup" : d.flag & 67108864 && (e = "expireSuperGroup");
				var l;
				a: {
					l = void 0;
					for (l in b) if (b[l].uin == d.gid) {
						l = b[l].markname;
						break a
					}
					l = ""
				}
				this.addGroup(new G({
					gid: d.gid,
					code: d.code,
					type: e,
					name: d.name,
					markName: l,
					mask: d.mask || "0"
				}))
			}
			c.notifyObservers(this, "GroupListChange", this.getGroupList())
		};
		this.setGroupMask = function(b) {
			x = b;
			c.notifyObservers(this, "GroupMaskChange", x)
		};
		this.getGroupMask = function() {
			return x
		};
		this.getGroupList = function() {
			return z
		};
		this.setRecentList = function(b) {
			for (var a in b) if (b[a].type == 2) b[a].uin = this.encodeDid(b[a].uin);
			I = b;
			c.notifyObservers(this, "RecentListChange", this.getRecentList())
		};
		this.getRecentList = function() {
			return I
		};
		this.setGroupInfo = function(b) {
			for (var a = b.ginfo, i = b.minfo, e = b.stats, l = {}, f = e.length; f--;) l[e[f].uin] = e[f];
			e = b.cards || [];
			f = this.getGroupByCode(a.code);
			f.setLevel(a.level);
			var g = this.getSelfUin();
			f.setAnnouncement(a.memo || " ");
			var h = b.vipinfo || [],
				b = {},
				k;
			for (k in h) b[h[k].u] = h[k].vip_level;
			k = a.members;
			for (var h = [], E = !1, j = 0, m = 0; m < k.length; m++) {
				var n = "common";
				k[m].mflag & 1 ? (n = "manager", k[m].muin === g && (E = !0)) : k[m].mflag & 2 && (n = "manager2", k[m].muin === g && (E = !0));
				k[m].muin == a.owner && (n = "master", k[m].muin === g && (E = !0));
				var r = k[m].muin,
					D = (i[m].nick || i[m].ruin || "") + "",
					o = i[m].nick;
				o == "" && (o = (i[m].ruin || r) + "");
				var C = l[r] && l[r].stat || 20,
					p = l[r] && l[r].client_type || 1E4;
				(C != 20 || r === g) && j++;
				for (var K = D, w = D, q = 0; q < e.length; q++) if (e[q].muin == r) {
					o = e[q].card;
					break
				}
				if (q = this.getUserByUin(k[m].muin)) {
					alloy.util.code2state(C);
					if (q.uin != g) q.gstate = C;
					if (b[r]) q.vip = b[r];
					q.type === "groupBuddy" || q.uin === g ? (C = o ? o : q.showName, q.setUsercard(a.code, C)) : o = o === D ? q.showName : o;
					q.setClientType(p)
				} else q = this.createUser({
					uin: r,
					nick: D,
					clientType: p,
					vip: b[r],
					state: alloy.util.code2state(C)
				}), q.type = "groupBuddy", q.setClassId(EQQ.hash.userClassType.stranger), q.group = f, q.gstate = C;
				C = o ? o : q.showName;
				q.setUsercard(a.code, C);
				h[m] = {
					uin: r,
					flag: n,
					gcode: a.code,
					nick: D,
					htmlNick: d.string.encodeHtmlSimple(D),
					titleNick: D,
					showName: K,
					htmlShowName: d.string.encodeHtmlSimple(K),
					titleShowName: d.string.encodeHtmlAttributeSimple(K),
					allName: w,
					htmlAllName: d.string.encodeHtmlSimple(w),
					titleAllName: w,
					usercard: d.string.encodeHtmlSimple(o)
				};
				h[m].info = q;
				f.uin2members[r] = h[m]
			}
			f.isLoadInfo = !0;
			f.hasManageAuthority = E;
			f.updateMembers(h, j);
			c.notifyObservers(this, "GroupInfoChange", f)
		};
		this.setMemberState = function(b) {
			this.getGroupByCode(b.gcode).updateMemberState(b)
		};
		this.sendGetGroupInfo = function(b) {
			b.vfwebqq = alloy.portal.getVfWebQQ();
			alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "get_group_info_ext2", {
				context: e,
				data: b,
				arguments: b,
				onSuccess: function(b) {
					b.retcode === 0 ? e.setGroupInfo(b.result) : d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				},
				onError: function() {
					d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				}
			})
		};
		this.sendGetMultiGroupInfo = function(b, a) {
			b.vfwebqq = alloy.portal.getVfWebQQ();
			alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "get_group_info", {
				context: e,
				data: b,
				arguments: b,
				onSuccess: function(b) {
					b.retcode === 0 ? a ? a(b) : c.notifyObservers(e, "GetMultiGroupInfoSuccess", b) : d.out("\u83b7\u53d6\u7fa4\u4fe1\u606f\u5931\u8d25")
				},
				onError: function() {
					d.out("\u83b7\u53d6\u7fa4\u4fe1\u606f\u5931\u8d25")
				}
			})
		};
		this.sendGetGroupNewestState = function(b) {
			b.vfwebqq = alloy.portal.getVfWebQQ();
			alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "get_group_member_stat2", {
				context: e,
				data: b,
				arguments: b,
				onSuccess: function(b) {
					if (b.retcode === 0) e.onGetGroupNewestStateSuc(b.result);
					else d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				},
				onError: function() {
					d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				}
			})
		};
		this.onGetGroupNewestStateSuc = function(b) {
			this.setMemberState(b)
		};
		this.getGroupByCode = function(b) {
			return A[b]
		};
		this.getGroupByGid = function(b) {
			return H[b]
		};
		this.getGroupInfo = function(b) {
			var a = this.getGroupByCode(b);
			if (a.isLoadInfo) return a.updateMembers(), a.upAnnouncement(a.announcement), c.notifyObservers(this, "GroupInfoChange", a), a;
			else this.sendGetGroupInfo({
				gcode: b
			})
		};
		var J = function(b) {
				var a = b.arguments.gcode;
				if (d.isArray(a)) c = e.getGroupByCode(a), l = b.result ? b.result.memo || " " : " ", c.setAnnouncement(l);
				else for (var i in a) {
					var c = a[i],
						c = e.getGroupByCode(c),
						l = b.result ? b.result.memo || " " : " ";
					c.setAnnouncement(l)
				}
			};
		this.getGroupAnnouncement = function(b) {
			var a = e.getGroupByCode(b);
			if (typeof a.announcement == "undefined") this.sendGetMultiGroupInfo({
				gcode: "[" + b + "]",
				retainKey: "memo"
			}, J);
			else return a
		};
		var i = function(b) {
				if (b.result) for (var a in b.result) {
					var i = b.result[a];
					e.getGroupByCode(i.gcode).setAnnouncement(i.memo || " ")
				}
			};
		this.getMultiGroupAnnounce = function(b) {
			var a = [],
				c;
			for (c in b) typeof e.getGroupByCode(b[c]).announcement == "undefined" && a.push(b[c]);
			a.length && this.sendGetMultiGroupInfo({
				gcode: "[" + a.toString() + "]",
				retainKey: "memo,gcode"
			}, i)
		};
		this.onReloadGroupInfo = function(b) {
			var a = this.getGroupByCode(b);
			if (d.isUndefined(a) || !a) return !1;
			this.sendGetGroupInfo({
				gcode: b
			})
		};
		this.sendGetSessionSignature = function(b) {
			EQQ.RPCService.sendGetSessionSignature(b)
		};
		this.setGroupBuddySessionSignature = function(b) {
			var a = this.getUserByUin(b.uin),
				i = b.id;
			if (b.type === 0) a.chatSession[i] = b.value, c.notifyObservers(this, "GroupBuddySessionSignatureChange", a.uin)
		};
		this.sendGetUserInfo = function(b) {
			alloy.rpcService.sendGetUserInfo_with_code(b)
		};
		this.isGroupPrompt = function(b) {
			b = this.getGroupByGid(b);
			x = parseInt(x);
			switch (x) {
			case 0:
				switch (parseInt(b.mask)) {
				case 0:
					return !0;
				case 1:
					return !1;
				case 2:
					return !1
				}
				break;
			case 1:
				return !0;
			case 2:
				return !1;
			case 3:
				return !1
			}
		};
		var l = new d.Class({
			init: function(b) {
				this.did = b.did;
				this.mask = String(b.mask || 0);
				this.preMask = String(this.mask);
				this.setName(b.name);
				this.isLoadInfo = !1;
				this.members = [];
				this.owner = "";
				this.notSetName = !1;
				this.hadModified = !0
			},
			setName: function(b) {
				this.notSetName = d.isUndefined(b) || b == "" ? !0 : !1;
				this.name = b = b || "\u666e\u901a\u8ba8\u8bba\u7ec4";
				this.htmlName = d.string.encodeHtmlSimple(b.toString());
				this.titleName = d.string.encodeHtmlAttributeSimple(b.toString());
				this.setTopic(b);
				c.notifyObservers(alloy.taskBar, "UpdateTaskName", {
					appId: "5_0",
					id: this.did,
					name: this.name
				})
			},
			setTopic: function(b) {
				if (d.isUndefined(b)) return !1;
				this.topic = b;
				this.htmlTopic = d.string.encodeHtmlSimple(b);
				this.titleTopic = d.string.encodeHtmlAttributeSimple(b)
			},
			addMember: function(b) {
				this.members.push(b);
				var a = e.getUserByUin(b.uin);
				if (a) {
					if (a.type == "stranger") a.setNick(b.nick || b.uin.toString()), a.did = this.did
				} else a = e.createUser({
					uin: b.uin,
					allow: !0,
					nick: b.nick || b.uin.toString(),
					face: "",
					gender: "",
					state: b.status,
					ruin: b.ruin,
					did: this.did
				}), a.type = "groupBuddy", e.addStranger(a)
			},
			setMembers: function(b) {
				this.members = b;
				for (var a in b) {
					var i = b[a],
						c = e.getUserByUin(i.uin);
					if (c) {
						if (c.type == "stranger") c.setNick(i.nick || i.uin.toString()), c.did = this.did
					} else c = e.createUser({
						uin: i.uin,
						allow: !0,
						nick: i.nick || i.uin.toString(),
						face: "",
						gender: "",
						state: i.status,
						ruin: i.ruin,
						did: this.did
					}), c.type = "groupBuddy", e.addStranger(c)
				}
			},
			updateMembers: function(b) {
				var a = this.members,
					i;
				for (i in a) {
					var c = a[i];
					if (b[c.uin]) c.vip = b[c.uin].vip
				}
			},
			getMemberList: function() {},
			modifyMemberStatus: function(b) {
				var a = [],
					i = [],
					c;
				for (c in b) {
					var e = b[c];
					i[e.uin] = e
				}
				b = alloy.portal.getPortalSelf("uin");
				for (c in this.members) {
					var e = this.members[c],
						l = i[e.uin];
					if (!d.isUndefined(l) && l.status != e.status) l.old_status = e.status, e.status = b == e.uin && l.status == "offline" ? "hidden" : l.status, a.push(l);
					if (d.isUndefined(l) && e.status != "offline") l = {
						uin: e.uin,
						old_status: e.status,
						status: b == e.uin ? "hidden" : "offline",
						client_type: e.client_type
					}, e.status = "offline", a.push(l)
				}
				return a
			},
			setOwner: function(b) {
				this.owner = b
			},
			setIsLoadInfo: function(b) {
				this.isLoadInfo = b || !1
			},
			setMask: function(b) {
				this.preMask = String(this.mask);
				this.mask = String(b);
				c.notifyObservers(EQQ.Model.BuddyList, "SingleDiscuMaskChange", this)
			},
			setHadModified: function(b) {
				this.hadModified = b
			},
			getMemberByUin: function(b) {
				var a = this.members,
					i;
				for (i in a) if (a[i].uin == b) return a[i];
				return null
			}
		});
		this.encodeDid = function(b) {
			return "d" + b
		};
		this.decodeDid = function(b) {
			return b.substring(1)
		};
		this.addDiscu = function(b) {
			B[b.did] || (b = new l(b), B[b.did] = b, v.push(b))
		};
		this.removeDiscu = function(b) {
			if (B[b.did]) {
				delete B[b.did];
				for (var a in v) if (v[a].did == b.did) {
					v.splice(a, 1);
					break
				}
			}
		};
		this.getDiscuById = function(b) {
			return B[b]
		};
		this.getDiscuList = function() {
			return v
		};
		this.sendGetDiscuList = function(b) {
			var a = {};
			a.clientid = EQQ.RPCService.getClientId();
			a.psessionid = EQQ.getPsessionid();
			a.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_discu_list_new2", {
				context: e,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					d.isUndefined(b) || b();
					if (a.retcode === 0) {
						var i = a.result,
							a = i.dnamelist,
							l = i.dmasklist,
							i = [],
							f;
						for (f in l) {
							var g = l[f];
							i[g.did] = g.mask
						}
						for (f in a) l = a[f], l.mask = i[l.did] || 0, l.did = e.encodeDid(l.did), e.addDiscu(l);
						c.notifyObservers(e, "DiscuListChange", e.getDiscuList())
					} else E()
				},
				onError: function() {
					E();
					d.isUndefined(b) || b()
				}
			})
		};
		var E = function() {
				d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u5217\u8868\u5931\u8d25");
				q < 1 ? (q++, d.error("\u7b2c" + q + "\u91cd\u62c9\u8ba8\u8bba\u7ec4\u5217\u8868"), e.sendGetDiscuList()) : c.notifyObservers(EQQ, "GetDiscuListFail", {
					text: "\u83b7\u53d6\u8ba8\u8bba\u7ec4\u5217\u8868\u5931\u8d25"
				})
			};
		this.getDiscuInfo = function(b) {
			var a = this.getDiscuById(b);
			!d.isUndefined(a) && a.isLoadInfo ? c.notifyObservers(this, "DiscuInfoChange", a) : C(b)
		};
		this.refreshDiscuInfo = function(b) {
			C(b)
		};
		var C = function(b, a, i) {
				var c = {};
				c.did = e.decodeDid(b);
				c.clientid = EQQ.RPCService.getClientId();
				c.psessionid = EQQ.getPsessionid();
				c.vfwebqq = alloy.portal.getVfWebQQ();
				EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_discu_info", {
					context: e,
					data: c,
					arguments: c,
					onSuccess: a ||
					function(b) {
						b.retcode === 0 ? b.result.error == 3 ? O(c) : e.sendGetDiscuInfoSuccess(b) : d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u4fe1\u606f\u5931\u8d25")
					},
					onError: i ||
					function() {
						d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u4fe1\u606f\u5931\u8d25")
					}
				})
			};
		this.sendGetDiscuInfo = C;
		this.sendGetDiscuInfoSuccess = function(b) {
			var a = e.encodeDid(b.arguments.did),
				i = this.getDiscuById(a),
				l = b.result.mem_info,
				f = b.result.mem_status,
				g = [],
				h;
			for (h in f) {
				var E = f[h];
				g[E.uin] = E.status
			}
			var f = alloy.portal.getPortalSelf("uin"),
				E = [],
				j = [];
			for (h in l) {
				var m = l[h],
					n = this.getUserByUin(m.uin);
				if (n) m.markName = n.markName, m.htmlMarkName = n.htmlMarkName, m.vip = n.vip;
				(d.isUndefined(m.vip) || m.vip === !1) && j.push(m.uin);
				m.status = g[m.uin] || (m.uin == f ? "hidden" : "offline");
				m.name = m.nick;
				m.htmlName = k.encodeHtmlSimple(m.nick);
				m.titleName = k.encodeHtmlAttributeSimple(m.nick);
				E.push(m)
			}
			i.setName(b.result.info.discu_name);
			i.setMembers(E);
			i.setOwner(b.result.info.discu_owner);
			i.setIsLoadInfo(!0);
			c.notifyObservers(this, "DiscuInfoChange", i);
			j.length && alloy.rpcService.sendBatchGetVipInfo(j, {
				did: a
			}, L, null)
		};
		var D, K = function(b, a) {
				D = alloy.layout.messagebox('<div style="width:100%; height:100%; line-height:30px;">\t\t\t\t\t\t<div style ="text-align: left; padding-left: 10px;">\t\t\t\t\t\t\t<div>\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7\u6267\u884c\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5728\u8f93\u5165\u6846\u8f93\u5165\u4e0b\u56fe\u4e2d\u7684\u9a8c\u8bc1\u7801</div>\t\t\t\t\t\t\t<div>\u9a8c\u8bc1\u7801:&nbsp&nbsp<input id="eqq_verify_input_code" type="text" style="vertical-align:middle;" /></div>\t\t\t\t\t\t\t<img style="float:left;margin-right:10px" id="eqq_verify_img_code" src="" />\t\t\t\t\t\t\t<a style="display:inline;line-height:60px;" id="eqq_verify_a_code" alt="\u770b\u4e0d\u6e05\u6362\u4e00\u5f20" href="#">\u770b\u4e0d\u6e05\u6362\u4e00\u5f20</a>\t\t\t\t\t\t\t<div id="eqq_verify_img_code_wrong" style="display:none;color:red;width:65px;">\u9a8c\u8bc1\u7801\u9519\u8bef</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>', {
					title: "\u8eab\u4efd\u9a8c\u8bc1",
					resize: !0,
					width: 380,
					height: 123,
					hasOkButton: !0,
					windowType: "EqqWindow",
					isSetCentered: !0
				});
				var i = o.id("eqq_verify_img_code"),
					e = o.id("eqq_verify_a_code"),
					l = o.id("eqq_verify_input_code"),
					f = null;
				c.on(i, "load", function() {
					f = d.cookie.get("verifysession", alloy.CONST.MAIN_DOMAIN)
				});
				c.on(e, "click", function(b) {
					b.preventDefault();
					o.id("eqq_verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random()
				});
				c.addObserver(D, "clickOkButton", function() {
					var i = l.value;
					if (i && f) return a(b, i, f), !1;
					l.focus();
					o.id("eqq_verify_input_code").innerHTML = "\u8bf7\u5148\u8f93\u5165\u9a8c\u8bc1\u7801\uff01";
					return !1
				});
				l.focus();
				c.on(l, "keydown", function(b) {
					b.keyCode == 13 && c.notifyObservers(D, "clickOkButton") && setTimeout(function() {
						D.close()
					}, 0)
				});
				o.id("eqq_verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random()
			},
			L = function(b) {
				if (b.retcode == 0 && b.arguments && b.arguments.did) {
					var a = b.arguments.did,
						i = e.getDiscuById(a),
						d = {},
						b = b.result.vipinfo,
						l;
					for (l in b) {
						var f = b[l];
						d[f.u] = {
							vip: f.vip_level,
							uin: f.u
						};
						var g = e.getUserByUin(f.u);
						g && (g.vip = f.vip_level)
					}
					i && i.updateMembers(d);
					c.notifyObservers(e, "BatchGetDiscuVipInfoSuccess", {
						list: d,
						did: a
					})
				}
			};
		this.createDiscu = function(b) {
			b = b || [];
			if (b.length < 2) return !1;
			var a = [],
				i = [],
				c = [],
				d;
			for (d in b) {
				var e = b[d];
				e.uin = e.uin.toString();
				e.gid && e.gid.length > 3 ? (i.push(e.uin), c.push(e.gid.toString())) : a.push(e.uin)
			}
			R({
				discu_name: "",
				mem_list: a,
				mem_list_u: i,
				mem_list_g: c
			})
		};
		var R = e.sendCreateDiscu = function(b, a, i) {
				b = b || {};
				b.code = a;
				b.verifysession = i;
				b.clientid = EQQ.RPCService.getClientId();
				b.psessionid = EQQ.getPsessionid();
				b.vfwebqq = alloy.portal.getVfWebQQ();
				EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/create_discu", {
					context: e,
					method: "POST",
					data: {
						r: d.json.stringify(b)
					},
					arguments: b,
					onSuccess: function(a) {
						if (a.retcode === 0) {
							var i = !1;
							!d.isUndefined(a.result.result) && a.result.result > 0 && (i = !0);
							setTimeout(function() {
								try {
									D && D.close()
								} catch (b) {}
							}, 0);
							i ? (alloy.layout.alert("\u521b\u5efa\u8ba8\u8bba\u7ec4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
								windowType: "EqqWindow"
							}), d.error("\u521b\u5efa\u8ba8\u8bba\u7ec4\u5931\u8d25")) : e.sendCreateDiscuSuccess(a)
						} else a.retcode === 1E3 ? K(b, function(b, a, i) {
							e.sendCreateDiscu(b, a, i)
						}) : a.retcode === 1001 ? (o.id("eqq_verify_img_code_wrong").style.display = "inline", o.id("eqq_verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random(), o.id("eqq_verify_input_code").value = "", o.id("eqq_verify_input_code").focus()) : (setTimeout(function() {
							try {
								D && D.close()
							} catch (b) {}
						}, 0), alloy.layout.alert("\u521b\u5efa\u8ba8\u8bba\u7ec4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
							windowType: "EqqWindow"
						}), d.error("\u521b\u5efa\u8ba8\u8bba\u7ec4\u5931\u8d25"))
					},
					onError: function() {
						alloy.layout.alert("\u521b\u5efa\u8ba8\u8bba\u7ec4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
							windowType: "EqqWindow"
						});
						d.error("\u521b\u5efa\u8ba8\u8bba\u7ec4\u5931\u8d25")
					}
				})
			};
		this.sendCreateDiscuSuccess = function(b) {
			b = e.encodeDid(b.result.did);
			e.addDiscu({
				did: b,
				name: ""
			});
			var a = e.getDiscuById(b);
			a.setHadModified(!1);
			c.notifyObservers(e, "AddNewDiscuToList", a);
			c.notifyObservers(e, "ToStartDiscuChat", b)
		};
		this.sendModifyDiscuTopic = function(b) {
			b.did = e.decodeDid(b.did);
			b = b || {};
			b.dtype = 1;
			b.clientid = EQQ.RPCService.getClientId();
			b.psessionid = EQQ.getPsessionid();
			b.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/modify_discu_info", {
				context: e,
				method: "POST",
				data: {
					r: d.json.stringify(b)
				},
				arguments: b,
				onSuccess: function(a) {
					if (a.retcode === 0) if (!d.isUndefined(a.result.error) && a.result.error == 2) alloy.layout.alert("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u5931\u8d25.", null, {
						windowType: "EqqWindow"
					}), d.error("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u5931\u8d25,\u6709\u810f\u8bcd"), a = e.encodeDid(b.did), a = e.getDiscuById(a), c.notifyObservers(e, "ModifyDiscuTopicSuccess", a), alloy.util.report2qqweb("dicussionsmask|titlebar|theme|false");
					else if (!d.isUndefined(a.result.error) && a.result.error == 1) O(b);
					else {
						d.info("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u6210\u529f");
						var a = b,
							i = e.encodeDid(a.did),
							i = e.getDiscuById(i);
						i.setName(a.discu_name);
						i.setHadModified(!0);
						c.notifyObservers(e, "ModifyDiscuTopicSuccess", i);
						alloy.util.report2qqweb("dicussionsmask|titlebar|theme|ture")
					} else alloy.layout.alert("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u5931\u8d25.", null, {
						windowType: "EqqWindow"
					}), d.error("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u5931\u8d25")
				},
				onError: function() {
					d.error("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u5931\u8d25")
				}
			})
		};
		this.sendQuitDisc = function(b) {
			var b = b || {},
				a = b.did;
			b.did = e.decodeDid(b.did);
			b.clientid = EQQ.RPCService.getClientId();
			b.psessionid = EQQ.getPsessionid();
			b.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/quit_discu", {
				context: e,
				data: b,
				arguments: b,
				onSuccess: function(b) {
					b.retcode === 0 ? (b = {
						did: a
					}, e.removeDiscu(b), c.notifyObservers(e, "QuitDiscuSuccess", b)) : (alloy.layout.alert("\u9000\u51fa\u8ba8\u8bba\u7ec4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
						windowType: "EqqWindow"
					}), d.error("\u9000\u51fa\u8ba8\u8bba\u7ec4\u5931\u8d25"))
				},
				onError: function() {
					alloy.layout.alert("\u9000\u51fa\u8ba8\u8bba\u7ec4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!");
					d.error("\u9000\u51fa\u8ba8\u8bba\u7ec4\u5931\u8d25")
				}
			})
		};
		this.modifyDiscuMembers = function(b, a) {
			b = b || [];
			if (b.length < 1) return !1;
			var i = [],
				c = [],
				d = [],
				l;
			for (l in b) {
				var f = b[l];
				f.uin = f.uin.toString();
				f.gid && f.gid.length > 3 ? (c.push(f.uin), d.push(f.gid.toString())) : i.push(f.uin)
			}
			a.mem_list = i;
			a.mem_list_u = c;
			a.mem_list_g = d;
			e.sendModifyMember(a)
		};
		this.sendModifyMember = function(b) {
			var b = b || {},
				a = b.did;
			b.did = e.decodeDid(b.did);
			b.clientid = EQQ.RPCService.getClientId();
			b.psessionid = EQQ.getPsessionid();
			b.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/change_discu_mem", {
				context: e,
				method: "POST",
				data: {
					r: d.json.stringify(b)
				},
				arguments: b,
				onSuccess: function(b) {
					b.retcode === 0 ? (C(a), d.info("\u4fee\u6539\u8ba8\u8bba\u7ec4\u6210\u5458\u6210\u529f")) : (alloy.layout.alert("\u9080\u8bf7\u6210\u5458\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
						windowType: "EqqWindow"
					}), d.error("\u4fee\u6539\u8ba8\u8bba\u7ec4\u6210\u5458\u5931\u8d25"))
				},
				onError: function() {
					alloy.layout.alert("\u9080\u8bf7\u6210\u5458\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
						windowType: "EqqWindow"
					});
					d.error("\u4fee\u6539\u8ba8\u8bba\u7ec4\u6210\u5458\u5931\u8d25")
				}
			})
		};
		this.sendGetDiscuMemberStatus = function(b) {
			b = b || {};
			b.did = e.decodeDid(b.did);
			b.clientid = EQQ.RPCService.getClientId();
			b.psessionid = EQQ.getPsessionid();
			b.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_discu_status_info", {
				context: e,
				data: b,
				arguments: b,
				onSuccess: function(b) {
					b.retcode === 0 ? e.getDiscuMemberStatusSuccess(b) : d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u6210\u5458\u72b6\u6001\u5931\u8d25")
				},
				onError: function() {
					d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u6210\u5458\u72b6\u6001\u5931\u8d25")
				}
			})
		};
		this.getDiscuMemberStatusSuccess = function(b) {
			var a = e.encodeDid(b.arguments.did),
				b = e.getDiscuById(a).modifyMemberStatus(b.result.mem_status);
			b.length > 0 && c.notifyObservers(e, "GetDiscuMemberStatusSuccess", {
				did: a,
				list: b
			})
		};
		this.isDiscuPrompt = function(b) {
			b = this.getDiscuById(b);
			switch (parseInt(b.mask)) {
			case 0:
				return !0;
			case 1:
				return !1;
			case 2:
				return !1
			}
		};
		this.sendChangeDiscuMask = function(b) {
			for (var a = {
				idx: EQQ.index,
				port: EQQ.port
			}, i = 0; i < v.length; i++) {
				var c = v[i],
					l = e.decodeDid(c.did);
				a[l] = b.uin == c.did ? b.mask.toString() : c.mask.toString()
			}
			qqweb.rpcService.sendMessageFilterConfig({
				onSuccess: function() {
					var a = {
						uin: b.uin,
						mask: b.mask
					};
					e.getDiscuById(a.uin).setMask(a.mask)
				},
				context: this,
				data: {
					retype: 1,
					app: "EQQ",
					itemlist: '{"discumask":' + d.json.stringify(a) + "}"
				}
			})
		};
		this.getAndAddDiscu = function(b) {
			b = {
				did: b.did,
				name: b.name
			};
			e.addDiscu(b);
			b = e.getDiscuById(b.did);
			c.notifyObservers(e, "AddNewDiscuToList", b);
			c.notifyObservers(e, "AddDiscuByMsgSuccess", b)
		};
		this.sendGetDiscuSessionSignature = function(b) {
			var a = this.decodeDid(this.getUserByUin(b).did);
			EQQ.RPCService.sendGetDiscuSessionSignature({
				group_uin: a,
				to_uin: b
			})
		};
		var Q = function(b) {
				var a = e.getUserByUin(b.arguments.to_uin);
				if (b.result.verify_sig.type === 0 && b.result.group_sig.type === 0) a.chatSession = b.result, c.notifyObservers(e, "GroupBuddySessionSignatureChange", a.uin)
			},
			O = function(b) {
				alloy.layout.alert("\u8ba8\u8bba\u7ec4\u88ab\u5220\u9664!", null, {
					windowType: "EqqWindow"
				});
				b.did = e.encodeDid(b.did);
				e.removeDiscu(b);
				c.notifyObservers(e, "QuitDiscuSuccess", b)
			}
	})
})();
(function() {
	WebqCore.register("EQQ.Model.ChatMsg", function(d) {
		var e = this,
			c = d.event,
			o = d.string,
			k = {},
			g = [],
			a = [],
			h = {},
			w = [],
			f = {},
			m = [],
			r = {},
			n = null,
			y = [],
			p = null,
			u = {},
			j = {},
			z = {},
			I = [],
			H = {},
			A = 0,
			x, v = 0,
			B;
		x = (new Date).getTime();
		x = (x - x % 1E3) / 1E3;
		x = x % 1E4 * 1E4;
		var q = function() {
				A++;
				return x + A
			},
			F = function(a) {
				d.isNumber(a) && (a *= 1E3);
				return d.date.format(new Date(a), "YYYY-MM-DD hh:mm:ss")
			},
			G = function(a) {
				if (d.isString(a.content[1]) && a.content[1].substr(0, 4) === "\u3000  \u3000") {
					RegExp(/(\?.*)\s?$/).test(decodeURIComponent(a.content[1]));
					var l = d.string.mapQuery(RegExp.$1).vk;
					if (!e.uinToVideo) e.uinToVideo = [];
					a = a.from_uin;
					e.uinToVideo[a] = {
						k: l
					};
					c.notifyObservers(e, "AskForVideo", {
						uin: a,
						k: l
					})
				}
			};
		this.init = function() {
			k = {};
			a = [];
			h = {};
			w = [];
			f = {};
			p = null;
			u = {};
			j = {};
			z = {};
			H = {};
			v = A = 0;
			B = null;
			c.addObserver(EQQ.RPCService, "SendMsgSuccess", d.bind(this.onSendMsgSuccess, this));
			c.addObserver(EQQ.RPCService, "PollSuccess", d.bind(this.onPollSuccess, this));
			c.addObserver(EQQ.RPCService, "SendMsgError", d.bind(this.onSendMsgError, this));
			c.addObserver(EQQ.RPCService, "SendGetGroupCustomFaceKeySuccess", d.bind(this.onSendGetGroupCustomFaceKeySuccess, this));
			c.addObserver(EQQ.RPCService, "sendGetOfflinePicUrlSuccess", d.bind(this.onGetOfflinePicUrlSuccess, this));
			c.addObserver(EQQ.RPCService, "getSendPicUrlError", d.bind(this.onSetSendPicUrlError, this));
			c.addObserver(EQQ.Model.BuddyList, "AddDiscuByMsgSuccess", d.bind(this.onAddDiscuByMsgSuccess, this))
		};
		this.getMsgId = q;
		this.setGroupCustomFaceKey = function(a) {
			v = d.now();
			B = {
				key: a.gface_key,
				signature: a.gface_sig
			}
		};
		this.getGroupCustomFaceKey = function() {
			return B
		};
		this.isGroupCustomFaceKeyTimeout = function() {
			return d.now() - v > 432E6
		};
		this.sendGetGroupCustomFaceKey = function(a) {
			EQQ.RPCService.sendGetGroupCustomFaceKey({
				arguments: {
					msg: a
				}
			})
		};
		this.onSendGetGroupCustomFaceKeySuccess = function(a) {
			var c = a.arguments.msg;
			this.setGroupCustomFaceKey(a.result);
			this.sendGetGroupCustomFaceInfo(c)
		};
		this.sendGetGroupCustomFaceInfo = function(a) {
			for (var e = this.getGroupCustomFaceKey(), f = 0; f < a.content.length; f++) {
				var g = a.content[f];
				g[0] === "face" && (g[1] = EQQ.CONST.TRANSFER_TABLE[g[1]])
			}
			if (a.type == "discu") return this.sendDiscuCustomFaceInfo(a), !0;
			EQQ.RPCService.sendGetGroupCustomFaceInfo({
				group_uin: a.to,
				group_code: EQQ.Model.BuddyList.getGroupByGid(a.to).code,
				key: e.key,
				sig: e.signature,
				content: d.json.stringify(a.content)
			});
			e = q();
			f = EQQ.Model.BuddyList.getSelf();
			e = {
				type: a.type,
				from_uin: 0,
				sender_uin: f.uin,
				sender: f,
				time: F(new Date),
				content: a.content,
				msg_id: e,
				group_code: EQQ.Model.BuddyList.getGroupByGid(a.to).code
			};
			c.notifyObservers(this, "GroupMessageListChange", {
				gid: a.to,
				msgList: [e]
			})
		};
		this.sendDiscuCustomFaceInfo = function(a) {
			var e = EQQ.Model.BuddyList.getDiscuById(a.to);
			e && J(e, a.content);
			e = this.getGroupCustomFaceKey();
			EQQ.RPCService.sendDiscuMsg({
				did: EQQ.Model.BuddyList.decodeDid(a.to),
				key: e.key,
				sig: e.signature,
				content: d.json.stringify(a.content)
			});
			var e = q(),
				f = EQQ.Model.BuddyList.getSelf(),
				e = {
					type: a.type,
					from_uin: 0,
					sender_uin: f.uin,
					sender: f,
					time: F(new Date),
					content: a.content,
					msg_id: e,
					did: a.to
				};
			c.notifyObservers(this, "DiscuMessageListChange", {
				did: a.to,
				msgList: [e]
			})
		};
		this.callbackSendPic = function(a) {
			if (a.filesize > 1048576) a.retcode = "100", a.maxFileSize = "1MB", c.notifyObservers(this, "uploadSendPicError", a);
			else if (a.retcode != 0) c.notifyObservers(this, "uploadSendPicError", a);
			else {
				u[a.filepath] = a;
				var d = EQQ.Model.BuddyList.getSelf();
				EQQ.RPCService.sendGetOfflinePicUrl({
					f_uin: d.uin,
					file_path: a.filepath,
					clientid: e.getClientidFromRpc()
				});
				alloy.util.report2m(133171)
			}
		};
		this.onGetOfflinePicUrlSuccess = function(a) {
			u[a.result.file_path].fileurl = a.result.url;
			if (u[a.result.file_path]) a.fileid = u[a.result.file_path].fileid;
			c.notifyObservers(this, "GetSendPicUrlSuccess", a)
		};
		this.onSetSendPicUrlError = function(a) {
			if (u[a.result.file_path]) a.fileid = u[a.result.file_path].fileid;
			c.notifyObservers(this, "getSendPicUrlError", a)
		};
		this.getSendPicUrlByFilePath = function(a) {
			return typeof u[a] == "undefined" ? "" : u[a].fileurl
		};
		this.callbackSendPicGroup = function(a) {
			if (a.ret === 0) {
				var d = /[A-Fa-f0-9]{32}\.[A-Za-z]{3}/,
					e = a.msg;
				e.length > 36 && (e = e.substring(0, 36));
				c.notifyObservers(this, "getSendPicGroupSuccess", e)
			} else a.ret === 4 ? (d = /[A-Fa-f0-9]{32}\.[A-Za-z]{3}/, e = a.msg, e.length > 36 ? (e = e.substring(0, 36), d.test(e) ? c.notifyObservers(this, "getSendPicGroupSuccess", e) : c.notifyObservers(this, "sendPicGroupError", a)) : c.notifyObservers(this, "sendPicGroupError", a)) : c.notifyObservers(this, "sendPicGroupError", a)
		};
		this.sendMsg = function(a) {
			var e = q(),
				f = "",
				f = {},
				a = a || {};
			a.type = a.type || "single";
			for (var g = typeof a.attach != "undefined" && a.attach ? a.attach : "", h = EQQ.Model.BuddyList.getSelf(), f = 0; f < a.content.length; f++) {
				var j = a.content[f];
				j[0] === "face" && (j[1] = EQQ.CONST.TRANSFER_TABLE[j[1]])
			}
			f = d.json.stringify(a.content);
			if (a.type === "group") f = {
				group_uin: a.to,
				content: f,
				msg_id: e
			}, EQQ.RPCService.sendGroupMsg(f), e = {
				type: a.type,
				from_uin: 0,
				sender_uin: h.uin,
				sender: h,
				time: F(new Date),
				content: a.content,
				msg_id: e,
				group_code: EQQ.Model.BuddyList.getGroupByGid(a.to).code
			}, c.notifyObservers(this, "GroupMessageListChange", {
				gid: a.to,
				msgList: [e]
			});
			else if (a.type === "discu")(g = EQQ.Model.BuddyList.getDiscuById(a.to)) && J(g, a.content), f = {
				did: EQQ.Model.BuddyList.decodeDid(a.to),
				content: f,
				msg_id: e
			}, EQQ.RPCService.sendDiscuMsg(f), e = {
				type: a.type,
				from_uin: 0,
				sender_uin: h.uin,
				sender: h,
				time: F(new Date),
				content: a.content,
				msg_id: e,
				did: a.to
			}, c.notifyObservers(this, "DiscuMessageListChange", {
				did: a.to,
				msgList: [e]
			});
			else {
				j = EQQ.Model.BuddyList.getUserByUin(a.to);
				if (j.type === "groupBuddy") {
					var m = j.currentId,
						f = {
							to: a.to,
							group_sig: j.chatSession[m],
							face: a.face,
							content: f,
							msg_id: e,
							service_type: isNaN(m) ? 1 : 0
						};
					EQQ.RPCService.sendGroupBuddyMsg(f)
				} else f = {
					to: a.to,
					face: a.face,
					content: f,
					msg_id: e
				}, EQQ.RPCService.sendMsg(f);
				e = {
					type: a.type,
					from_uin: 0,
					sender_uin: h.uin,
					sender: h,
					time: F(new Date),
					content: a.content,
					msg_id: e,
					attach: g
				};
				a.isIgnoreHistory || c.notifyObservers(this, "MessageListChange", {
					uin: a.to,
					msgList: [e]
				})
			}
			a.isIgnoreHistory || (k[a.to] ? k[a.to].msgList.push(e) : k[a.to] = {
				last: 0,
				msgList: [e]
			})
		};
		this.addMsgToList = function(a) {
			var d = EQQ.Model.BuddyList.getSelf(),
				e = q(),
				d = {
					type: a.type,
					from_uin: a.from_uin,
					sender_uin: d.uin,
					sender: d,
					time: F(new Date),
					content: a.content,
					msg_id: e,
					attach: typeof a.attach != "undefined" && a.attach ? a.attach : ""
				};
			c.notifyObservers(this, "MessageListChange", {
				uin: a.to,
				msgList: [d]
			});
			k[a.to] ? k[a.to].msgList.push(d) : k[a.to] = {
				last: 0,
				msgList: [d]
			}
		};
		this.onSendMsgSuccess = function(a) {
			c.notifyObservers(this, "SendMsgError", a)
		};
		this.onSendMsgError = function(a) {
			c.notifyObservers(this, "SendMsgError", a)
		};
		this.getMsgHistory = function(a) {
			k[a] && c.notifyObservers(this, "MessageListChange", {
				uin: a,
				msgList: k[a].msgList
			})
		};
		this.getGroupMsgHistory = function(a) {
			k[a] && c.notifyObservers(this, "GroupMessageListChange", {
				gid: a,
				msgList: k[a].msgList
			})
		};
		this.clearChatLog = function(a) {
			k[a] && (k[a] = {
				last: 0,
				msgList: []
			})
		};
		this.receiveMsg = function(a) {
			var e = a.from_uin,
				f = !1,
				g = 0,
				h = typeof a.attach != "undefined" && a.attach ? a.attach : "",
				h = {
					type: "single",
					from_uin: e,
					sender_uin: e,
					sender: EQQ.Model.BuddyList.getUserByUin(e),
					msg_id: a.msg_id,
					content: a.content,
					time: F(a.time),
					raw_time: a.time,
					attach: h
				};
			if (k[e]) {
				for (var j = k[e].msgList, m = j.length, a = 0; a < m; a++) if (j[a].msg_id == h.msg_id) {
					f = !0;
					d.out("\u53d1\u73b0\u91cd\u590d\u4e2a\u4eba\u6d88\u606f\uff0cmsg_id\uff1a" + h.msg_id);
					break
				}
				f || (j.push(h), g++)
			} else k[e] = {
				last: 0,
				msgList: []
			}, k[e].msgList.push(h), g++;
			H[e] = h.msg_id;
			f = {
				last: 0,
				msgList: []
			};
			if (g > 0) {
				for (a = 0; a < g; a++) f.msgList.push(k[e].msgList[k[e].msgList.length - (g - a)]);
				k[e].last = 0;
				c.notifyObservers(this, "MessageListChange", {
					uin: e,
					msgList: f.msgList
				});
				c.notifyObservers(EQQ, "MessageReceive", {
					uin: e,
					msgList: f.msgList
				});
				c.notifyObservers(this, "StopTyping", e)
			}
		};
		this.receiveSystemMsg = function(a) {
			var d;
			switch (a.type) {
			case "added_buddy_sig":
			case "added_buddy_nosig":
				d = "\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb";
				break;
			case "verify_pass_add":
				d = "\u63a5\u53d7\u4e86\u60a8\u7684\u8bf7\u6c42\uff0c\u5e76\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb";
				var e = {
					uin: a.from_uin,
					status: alloy.util.code2state(a.stat),
					client_type: a.client_type
				};
				c.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {
					tuin: a.from_uin,
					gid: a.group_id,
					newstate: e
				});
				break;
			case "verify_pass":
				d = "\u63a5\u53d7\u4e86\u60a8\u7684\u8bf7\u6c42";
				e = {
					uin: a.from_uin,
					status: alloy.util.code2state(a.stat),
					client_type: a.client_type
				};
				c.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {
					tuin: a.from_uin,
					gid: 0,
					newstate: e
				});
				break;
			case "verify_required":
				d = "\u8bf7\u6c42\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb\uff0c\u9644\u52a0\u4fe1\u606f(" + (a.msg || "\u65e0") + ")";
				break;
			case "verify_rejected":
				d = "\u62d2\u7edd\u4e86\u60a8\u7684\u8bf7\u6c42\uff0c\u9644\u52a0\u4fe1\u606f(" + (a.msg || "\u65e0") + ")";
				break;
			default:
				d = a.type
			}
			c.notifyObservers(EQQ, "MessageReceive", {
				msgList: [{
					type: "add_buddy",
					sender: {
						htmlShowName: String(a.account)
					},
					from_uin: a.from_uin,
					title: a.uiuin || a.account,
					content: d,
					msg_id: a.seq,
					opt: {
						uin: a.from_uin,
						account: a.account,
						nick: a.uiuin || a.account,
						allow: a.allow,
						type: a.type,
						msg: a.msg,
						gid: a.group_id,
						uiuin: a.uiuin
					}
				}]
			})
		};
		this.receiveSysGroupMsg = function(a) {
			var d, e = alloy.portal.getUin();
			switch (a.type) {
			case "group_join":
				d = e == a.new_member ? "\u60a8\u5df2\u7ecf\u52a0\u5165\u7fa4" + a.t_gcode : a.t_new_member + "\u5df2\u52a0\u5165\u7fa4" + a.t_gcode + "\u3002";
				break;
			case "group_leave":
				a.op_type == 1 ? d = e == a.admin_uin ? "\u60a8\u5df2\u7ecf\u6210\u529f\u5730\u89e3\u6563\u4e86\u7fa4" + a.t_gcode : "\u7fa4" + a.t_gcode + "\u5df2\u7ecf\u88ab\u89e3\u6563" : a.op_type == 2 ? e != a.old_member && (d = a.t_old_member + "\u9000\u51fa\u7fa4" + a.t_gcode + "\u3002") : a.op_type == 3 && (d = e == a.old_member ? "\u60a8\u5df2\u7ecf\u88ab\u79fb\u9664\u51fa\u7fa4" + a.t_gcode : a.t_old_member + "\u5df2\u88ab\u7ba1\u7406\u5458\u79fb\u9664\u51fa\u7fa4" + a.t_gcode + "\u3002");
				a.type = a.type + "_" + a.op_type;
				break;
			case "group_request_join":
				d = a.t_request_uin + "\u7533\u8bf7\u52a0\u5165\u7fa4" + a.t_gcode;
				break;
			case "group_request_join_agree":
				d = "\u7ba1\u7406\u5458\u5df2\u540c\u610f\u60a8\u52a0\u5165\u7fa4" + a.t_gcode;
				break;
			case "group_request_join_deny":
				d = "\u7ba1\u7406\u5458\u5df2\u62d2\u7edd\u60a8\u52a0\u5165\u7fa4" + a.t_gcode;
				break;
			case "group_admin_op":
				if (a.op_type == 0 || a.op_type == 2) d = e == a.uin ? "\u60a8\u5df2\u7ecf\u88ab\u53d6\u6d88\u7fa4" + a.t_gcode + "\u7684\u7ba1\u7406\u5458\u8eab\u4efd\u3002" : a.t_uin + "\u5df2\u7ecf\u88ab\u53d6\u6d88\u7fa4" + a.t_gcode + "\u7684\u7ba1\u7406\u5458\u8eab\u4efd\u3002";
				else if (a.op_type == 1 || a.op_type == 3) d = e == a.uin ? "\u60a8\u5df2\u6210\u4e3a\u7fa4" + a.t_gcode + "\u7684\u7ba1\u7406\u5458\u3002" : a.t_uin + "\u5df2\u6210\u4e3a\u7fa4" + a.t_gcode + "\u7684\u7ba1\u7406\u5458\u3002";
				else if (a.op_type == 255) if (e == a.old_uin) d = "\u60a8\u5df2\u7ecf\u6210\u529f\u5c06\u7fa4" + a.t_gcode + "\u7684\u7fa4\u4e3b\u8eab\u4efd\u8f6c\u8ba9\u7ed9" + a.t_new_uin + "\u3002";
				else if (e == a.new_uin) d = a.t_gcode + "\u7684\u7fa4\u4e3b" + a.t_old_uin + "\u5df2\u7ecf\u5c06\u8be5\u7fa4\u8f6c\u8ba9\u7ed9\u60a8\uff0c\u73b0\u5728\u60a8\u4e3a\u8be5\u7fa4\u7fa4\u4e3b\u3002";
				else return !1;
				a.type = a.type + "_" + a.op_type;
				break;
			case "group_create":
				d = "\u60a8\u5df2\u7ecf\u6210\u529f\u521b\u5efa\u7fa4" + a.t_gcode;
				break;
			default:
				return !1
			}
			c.notifyObservers(EQQ, "MessageReceive", {
				msgList: [{
					type: "join_group",
					sender: {
						htmlShowName: String(a.from_uin)
					},
					from_uin: a.from_uin + "_" + a.type,
					title: "\u7fa4\u7cfb\u7edf\u6d88\u606f",
					content: d,
					msg_id: a.msg_id,
					opt: {
						uin: a.from_uin || 0,
						nick: a.from_uin,
						allow: a.allow,
						type: a.type,
						msg: a.msg || "",
						gid: a.from_uin,
						value: a
					}
				}]
			})
		};
		this.receiveGroupMsg = function(a) {
			var e = a.from_uin,
				f = !1,
				g = 0,
				h = {
					type: "group",
					from_uin: e,
					sender_uin: a.send_uin,
					sender: EQQ.Model.BuddyList.getUserByUin(a.send_uin),
					msg_id: a.msg_id,
					content: a.content,
					group_code: EQQ.Model.BuddyList.getGroupByGid(e).code,
					time: F(a.time),
					raw_time: a.time
				};
			if (k[e]) {
				for (var a = k[e].msgList.length, j = 0; j < a; j++) {
					var m = k[e].msgList[j];
					if (h.sender_uin == m.sender_uin && m.msg_id == h.msg_id) {
						f = !0;
						d.out("\u53d1\u73b0\u91cd\u590d\u7fa4\u6d88\u606f\uff0cmsg_id\uff1a" + h.msg_id);
						break
					}
				}
				f || (k[e].msgList.push(h), g++)
			} else k[e] = {
				last: 0,
				msgList: []
			}, k[e].msgList.push(h), g++;
			H[e] = h.msg_id;
			f = k[e].msgList;
			a = f.length;
			h = [];
			if (g > 0) {
				for (j = g; j > 0; j--) h.push(f[a - j]);
				k[e].last = 0;
				c.notifyObservers(this, "GroupMessageListChange", {
					gid: e,
					msgList: h
				});
				c.notifyObservers(EQQ, "MessageReceive", {
					gid: e,
					msgList: h
				})
			}
		};
		this.addMessageBoxUserList = function(i) {
			var e = h[i.from_uin];
			e ? d.array.remove(a, e) : c.notifyObservers(this, "flexStartJump", i.from_uin);
			h[i.from_uin] = i;
			a.push(i);
			c.notifyObservers(this, "MessageBoxUserListChange", this.getMessageBoxUserList())
		};
		this.getMessageBoxUserList = function() {
			return a
		};
		this.removeMessageBoxUserList = function(i) {
			var e = h[i];
			e && d.array.remove(a, e);
			delete h[i];
			c.notifyObservers(this, "flexStopJump", i);
			c.notifyObservers(this, "MessageBoxUserListChange", this.getMessageBoxUserList())
		};
		this.addMessageBoxGroupList = function(a) {
			var e = f[a.from_uin];
			e && d.array.remove(w, e);
			f[a.from_uin] = a;
			w.push(a);
			c.notifyObservers(this, "MessageBoxGroupListChange", this.getMessageBoxGroupList())
		};
		this.getMessageBoxGroupList = function() {
			return w
		};
		this.removeMessageBoxGroupList = function(a) {
			var e = f[a];
			e && d.array.remove(w, e);
			delete f[a];
			c.notifyObservers(this, "MessageBoxGroupListChange", this.getMessageBoxGroupList())
		};
		this.preloadGroupMessageImages = function(a, c) {
			var c = c || 0,
				e = a.content,
				f = a.send_uin,
				g = "",
				g = "",
				h = null,
				k = a.group_code || EQQ.Model.BuddyList.decodeDid(a.did),
				j = a.time,
				m = "",
				n = !0;
			a.did && (n = !1);
			for (var b = function() {
					h = null;
					d.out("preload-image-success!");
					n && alloy.rpcService.reportQstatic("Monitor|Group|imgperload|Succeed")
				}, s = function() {
					h = null;
					d.out("preload-image-error!");
					n && alloy.rpcService.reportQstatic("Monitor|Group|imgperload|Failed")
				}, r = 0, o = e.length; r < o; r++) if (e[r][0] === "cface") m = e[r][1], g = m.server.toString().split(":"), g = EQQ.CONST.CHAT_PIC_SERVER + "cgi-bin/get_group_pic?type=" + c + "&gid=" + k + "&uin=" + f + "&rip=" + g[0] + "&rport=" + g[1] + "&fid=" + m.file_id + "&pic=" + m.name + "&vfwebqq=" + alloy.portal.getVfWebQQ() + "&t=" + j, h = new Image, h.src = g, h.onload = b, h.onerror = s
		};
		this.onPollSuccess = function(a) {
			if (a) {
				a.sort(function(a, c) {
					return (a.value && a.value.time || 0) < (c.value && c.value.time || 0) ? 1 : -1
				});
				for (var e = a.length - 1; e >= 0; e--) {
					var f = a[e];
					switch (f.poll_type) {
					case "message":
						f = f.value;
						EQQ.Model.BuddyList.isUser(f.from_uin) ? this.receiveBuddyMsg(f) : f.msg_type === 9 ? this.receiveStrangerMsg(f) : (f.msg_type === 31 || f.msg_type === 140) && this.receiveGroupBuddyMsg(f);
						break;
					case "shake_message":
						d.out("\u6536\u5230\u6296\u52a8\u6d88\u606f");
						this.receiveShakeMsg(f.value);
						break;
					case "sess_message":
						f = f.value;
						this.receiveGroupBuddyMsg(f);
						break;
					case "group_message":
						f = f.value;
						this.addMessageBoxGroupList(f);
						this.preloadGroupMessageImages(f);
						this.receiveGroupMsg(f);
						break;
					case "kick_message":
						d.out("\u8e22\u7ebf\u901a\u77e5\uff1a" + f.value);
						var f = f.value,
							g = "\u60a8\u7684\u5e10\u53f7\u5728\u53e6\u4e00\u5730\u70b9\u767b\u5f55\uff0c\u60a8\u5df2\u88ab\u8feb\u4e0b\u7ebf\u3002\u5982\u6709\u7591\u95ee\uff0c\u8bf7\u767b\u5f55:safe.qq.com\u4e86\u89e3\u66f4\u591a\u3002";
						if (f.show_reason !== 0) g = f.reason;
						c.notifyObservers(EQQ, "SelfOffline", {
							message: g,
							action: "none"
						});
						break;
					case "file_message":
						d.out("\u6587\u4ef6\u4fe1\u9053\u901a\u77e5" + f.value);
						this.receiveFile(f.value);
						break;
					case "system_message":
						d.out("\u6536\u5230\u7cfb\u7edf\u6d88\u606f" + f.value);
						this.receiveSystemMsg(f.value);
						c.notifyObservers(EQQ, "SystemMessageRecive", f.value);
						break;
					case "filesrv_transfer":
						d.out("\u6587\u4ef6\u4f20\u8f93\u6d88\u606f" + f.value);
						this.receiveTransferMsg(f.value);
						break;
					case "tips":
						d.out("\u6536\u5230tips\u6d88\u606f" + f.value);
						this.receiveTipsMsg(f.value);
						break;
					case "sys_g_msg":
						d.out("\u6536\u5230\u7fa4\u7cfb\u7edf\u6d88\u606f" + f.value);
						this.receiveSysGroupMsg(f.value);
						break;
					case "av_request":
						d.out("\u6536\u5230\u89c6\u9891\u8bf7\u6c42" + f.value);
						this.receiveVideoMsg(f.value);
						break;
					case "discu_message":
						d.out("\u6536\u5230\u8ba8\u8bba\u7ec4\u6d88\u606f" + f.value);
						this.receiveDiscuMsg(f.value);
						break;
					case "push_offfile":
						d.out("\u6536\u5230\u79bb\u7ebf\u6587\u4ef6\u6d88\u606f" + f.value);
						this.receiveOffFile(f.value);
						break;
					case "notify_offfile":
						d.out("\u6536\u5230\u79bb\u7ebf\u6587\u4ef6\u5bf9\u65b9\u884c\u4e3a\u6d88\u606f" + f.value);
						this.receiveNotifyOffFile(f.value);
						break;
					case "input_notify":
						this.receiveInputNotify(f.value)
					}
				}
			}
		};
		this.receiveShakeMsg = function(a) {
			if (EQQ.Model.BuddyList.getSelf().state != "silent" && EQQ.Model.BuddyList.getUserByUin(a.from_uin)) a.content = [
				["shake", "\u5bf9\u65b9\u7ed9\u60a8\u53d1\u9001\u4e86\u4e00\u4e2a\u7a97\u53e3\u6296\u52a8\u3002"]
			], a.attach = {
				type: "shake"
			}, a.time = +new Date / 1E3, this.addMessageBoxUserList(a), this.receiveMsg(a)
		};
		this.receiveBuddyMsg = function(a) {
			G(a);
			this.addMessageBoxUserList(a);
			this.receiveMsg(a)
		};
		this.receiveStrangerMsg = function(a) {
			var f = a.from_uin,
				g = {
					uin: f
				},
				h = EQQ.Model.BuddyList.isStranger(f),
				k = function() {
					if (!h) {
						var f = EQQ.Model.BuddyList.createUser(g);
						f.type = "stranger";
						EQQ.Model.BuddyList.addStranger(f);
						f.setClassId(EQQ.hash.userClassType.stranger);
						EQQ.Model.BuddyList.setState(f.uin, "online", "10000");
						c.notifyObservers(e, "NewStranger", f)
					}
					G(a);
					e.addMessageBoxUserList(a);
					e.receiveMsg(a);
					d.out("receiveStrangerMsg")
				};
			h ? k() : alloy.rpcService.sendGetUserInfo_with_code(f, "", "", function(a) {
				if (a.retcode === 0) g = a.result;
				k()
			}, function() {
				k()
			})
		};
		this.receiveGroupBuddyMsg = function(a) {
			var f = a.from_uin,
				g, h = {
					uin: f
				},
				k = EQQ.Model.BuddyList.isUser(f),
				j = function() {
					k ? g = EQQ.Model.BuddyList.getUserByUin(f) : (g = EQQ.Model.BuddyList.createUser(h), g.type = "groupBuddy", EQQ.Model.BuddyList.addStranger(g), g.setClassId(EQQ.hash.userClassType.stranger), EQQ.Model.BuddyList.setState(g.uin, "online", "10000"), c.notifyObservers(e, "NewStranger", g), EQQ.Model.BuddyList.sendGetUserInfo(f));
					if ("service_type" in a) if (a.service_type === 0) g.currentId = a.id;
					else if (a.service_type === 1) g.currentId = EQQ.Model.BuddyList.encodeDid(a.id);
					G(a);
					e.addMessageBoxUserList(a);
					e.receiveMsg(a);
					d.out("receiveGroupBuddyMsg")
				};
			k ? j() : alloy.rpcService.sendGetUserInfo_with_code(f, "", "", function(a) {
				if (a.retcode === 0) h = a.result;
				j()
			}, function() {
				j()
			})
		};
		this.getMessagePointer = function(a) {
			return H[a] || 0
		};
		this.getCustomFaceList = function() {
			return p
		};
		this.getSendPicList = function() {
			return u
		};
		this.loadCustomFaceList = function() {
			c.addObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", t);
			EQQ.RPCService.sendGetCustomFaceList()
		};
		var t = function(a) {
				p = d.array.bubbleSort(a.data, function(a, c) {
					if (a && c) return a[1] - c[1]
				});
				c.notifyObservers(e, "GetCustomFaceListSuccess", p);
				c.removeObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", t)
			};
		this.deleteCustomFace = function(a) {
			EQQ.RPCService.sendDeleteCustomFace(a)
		};
		this.getClientidFromRpc = function() {
			return EQQ.RPCService.getClientId()
		};
		this.sendFile = function(a) {
			var c = [
				["sendfile", a.filename]
			],
				d = {
					type: "sendfile",
					name: a.filename,
					from_uin: a.to_uin,
					time: (new Date).getTime(),
					isread: !0,
					session_id: a.lcid
				};
			j[a.to_uin + "_" + a.lcid] = d;
			e.addMsgToList({
				type: "single",
				from_uin: 0,
				to: a.to_uin,
				content: c,
				attach: d
			})
		};
		this.receiveFile = function(a) {
			if (a.mode === "recv") {
				var d = [
					["rfile", a.name, a.session_id]
				];
				a.content = d;
				a.attach = {
					type: "rfile",
					name: a.name,
					from_uin: a.from_uin,
					time: a.time,
					isread: !1,
					session_id: a.session_id,
					msg_type: a.msg_type
				};
				var e = a.from_uin + "_" + a.session_id;
				j[e] ? j[e] = a.attach : (j[e] = a.attach, this.fileMsgToJumpUserList(a), this.receiveMsg(a));
				alloy.util.report2m(133161)
			} else if (a.mode === "refuse") {
				if (a.type !== 161) {
					if (a.cancel_type == 2 && (z[a.session_id] = !0, d = parseInt(a.session_id, 10).toString(2), d.length >= 12)) d = d.substr(d.length - 12, 12), a.session_id = parseInt(d, 2).toString(10);
					var e = a.from_uin + "_" + a.session_id,
						f = j[e];
					if (typeof f == "undefined") return !1;
					if (f.isFinished) return !1;
					else j[e].isFinished = !0;
					d = [
						["rffile", f.name]
					];
					f.type = "rffile";
					if (a.cancel_type == 2) d = [
						["wrffile", f.name]
					], f.type = "wrffile";
					else if (a.cancel_type == 3) d = [
						["rtfile", f.name]
					], f.type = "rtfile";
					a.content = d;
					a.attach = f;
					this.fileMsgToJumpUserList(a);
					this.receiveMsg(a);
					a.cancel_type != 2 && c.notifyObservers(this, "fromCancenFile", e);
					alloy.util.report2m(133178)
				}
			} else if (a.mode === "send_ack") {
				d = parseInt(a.session_id, 10).toString(2);
				if (d.length < 12) return !1;
				d = d.substr(d.length - 12, 12);
				a.session_id = parseInt(d, 2).toString(10);
				e = a.from_uin + "_" + a.session_id;
				f = j[e];
				d = [
					["wrfile", f.name, f.session_id]
				];
				a.content = d;
				a.attach = {
					type: "wrfile",
					name: f.name,
					from_uin: f.from_uin,
					time: a.time,
					session_id: a.session_id
				};
				this.fileMsgToJumpUserList(a);
				this.receiveMsg(a);
				alloy.util.report2m(133179)
			}
		};
		this.receiveVideoMsg = function(a) {
			a.content = [
				["cvideo", "\u5bf9\u65b9\u6b63\u5728\u4f7f\u7528QQ\u5ba2\u6237\u7aef\u5411\u60a8\u53d1\u8d77\u89c6\u9891\u9080\u8bf7\uff0cQ+ Web\u6682\u65f6\u4e0d\u80fd\u54cd\u5e94\u5ba2\u6237\u7aef\u89c6\u9891\u9080\u8bf7\uff0c\u4f46\u60a8\u53ef\u4ee5\u4e3b\u52a8\u53d1\u8d77\u89c6\u9891\u3002"]
			];
			a.attach = {
				type: "cvideo",
				from_uin: a.from_uin,
				msg_id: a.msg_id,
				isCvideo: !0
			};
			this.fileMsgToJumpUserList(a);
			this.receiveMsg(a);
			EQQ.sendMsg(a.from_uin, "     \u5bf9\u65b9\u6b63\u5728\u4f7f\u7528Q+ Web\u4e0d\u80fd\u54cd\u5e94\u60a8\u7684\u89c6\u9891\u9080\u8bf7\uff0c\u4f46\u5bf9\u65b9\u53ef\u4ee5\u4e3b\u52a8\u53d1\u8d77\uff08\u60a8\u9700\u8981\u70b9\u51fb\u9080\u8bf7\u94fe\u63a5\u8df3\u8f6c\u81f3Q+ Web\u4e0e\u597d\u53cb\u8fdb\u884c\u89c6\u9891\u4f1a\u8bdd\uff09\u3002");
			qqweb.util.report2im("mining|c2w|invite")
		};
		this.agreeReceiveFile = function(a) {
			var c = [
				["agfile", a.name, a.session_id]
			];
			a.type = "agfile";
			e.addMsgToList({
				type: "single",
				from_uin: 0,
				to: a.from_uin,
				content: c,
				attach: a
			})
		};
		this.refuseReceiveFile = function(a) {
			var c = [
				["rffile", a.name, a.session_id]
			];
			a.type = "rffile";
			e.addMsgToList({
				type: "single",
				from_uin: 0,
				to: a.from_uin,
				content: c,
				attach: a
			});
			j[a.from_uin + "_" + a.session_id].isFinished = !0;
			c = e.getClientidFromRpc();
			EQQ.RPCService.sendRefuseFile({
				to: a.from_uin,
				lcid: a.session_id,
				clientid: c
			})
		};
		this.getFilesList = function() {
			return j
		};
		this.fileMsgToJumpUserList = function(a) {
			if (a.cancel_type && a.cancel_type == 2) return this.addMessageBoxUserList(a), !0;
			if (typeof a.msg_type === "undefined" && !a.msg_type) {
				var c = j[a.from_uin + "_" + a.session_id];
				if (typeof c.msg_type === "undefined" && !c.msg_type) return !1;
				a.msg_type = c.msg_type
			}
			c = EQQ.Model.BuddyList.isBuddy(a.from_uin);
			a.msg_type === 9 ? c ? this.addMessageBoxUserList(a) : this.receiveStrangerFileMsg(a) : a.msg_type === 10 ? c && this.receiveStrangerFileMsg(a) : a.msg_type === 31 && this.receiveGroupBuddyFileMsg(a)
		};
		this.receiveStrangerFileMsg = function(a) {
			var e = a.from_uin;
			EQQ.Model.BuddyList.isStranger(e) || (e = EQQ.Model.BuddyList.createUser({
				uin: e
			}), EQQ.Model.BuddyList.addStranger(e), e.setClassId(EQQ.hash.userClassType.stranger), EQQ.Model.BuddyList.setState(e.uin, "online", "unknown"), c.notifyObservers(this, "NewStranger", e));
			this.addMessageBoxUserList(a);
			d.out("receiveStrangerFileMsg")
		};
		this.receiveGroupBuddyFileMsg = function(a) {
			var e = a.from_uin;
			if (!EQQ.Model.BuddyList.isStranger(e)) {
				var f = EQQ.Model.BuddyList.createUser({
					uin: e
				});
				EQQ.Model.BuddyList.addStranger(f);
				f.type = "groupBuddy";
				f.setClassId(EQQ.hash.userClassType.stranger);
				EQQ.Model.BuddyList.setState(f.uin, "online", "unknown");
				c.notifyObservers(this, "NewStranger", f);
				EQQ.Model.BuddyList.sendGetUserInfo(e)
			}
			this.addMessageBoxUserList(a);
			d.out("receiveGroupBuddyFileMsg, finish")
		};
		this.receiveTransferMsg = function(a) {
			var c = a.file_infos[0];
			if (c.file_name != "") {
				var d = "",
					f = "";
				if (c.file_status == 51) d = [
					["transtimeout", c.file_name, a.lc_id]
				], f = {
					type: "transtimeout",
					name: c.file_name,
					isread: !0
				};
				else if (c.file_status == 50) d = [
					["transerror", c.file_name, a.lc_id]
				], f = {
					type: "transerror",
					name: c.file_name,
					isread: !0
				};
				else if (c.file_status == 53) d = [
					["refusedbyclient", c.file_name, a.lc_id]
				], f = {
					type: "refusedbyclient",
					name: c.file_name,
					isread: !0
				};
				else if (c.file_status == 0) d = [
					["transok", c.file_name, a.lc_id]
				], f = {
					type: "transok",
					name: c.file_name,
					isread: !0
				}, alloy.util.report2m(133176), a.operation == 1 ? alloy.util.report2m(133152) : a.operation == 2 && alloy.util.report2m(133165);
				else return c.file_status != 10 && alloy.util.report2m(133177), !1;
				c = j[a.from_uin + "_" + a.lc_id] || {};
				if (c.isFinished || typeof z[a.session_id] != "undefined" && z[a.session_id] === !0) return !1;
				else c.isFinished = !0;
				e.addMsgToList({
					type: "single",
					from_uin: 0,
					to: a.to_uin,
					content: d,
					attach: f
				})
			}
		};
		this.receiveOffFile = function(a) {
			a.msg_type = 9;
			a.content = [
				["offfile", "\u5bf9\u65b9\u7ed9\u4f60\u53d1\u9001\u79bb\u7ebf\u6587\u4ef6\u3002"]
			];
			a.attach = a;
			a.attach.type = "offfile";
			this.fileMsgToJumpUserList(a);
			this.receiveMsg(a)
		};
		this.callbackSendOffFile = function(a) {
			if (d.isUndefined(a.fileid)) return !1;
			var f = "",
				g = "sendofffileerror",
				h = a.fileid.split("_");
			a.to_uin = h[0];
			var f = a.filename.replace(/\\/g, "/").split("/"),
				k = f[f.length - 1],
				k = d.string.encodeHtmlSimple(k);
			a.retcode === 0 ? (f = "\u6587\u4ef6\u201c" + k + "\u201d(" + (a.filesize < 1024 ? a.filesize + "\u5b57\u8282" : a.filesize / 1024 < 1024 ? Math.round(a.filesize / 1024 * 100) / 100 + "KB" : a.filesize / 1048576 < 1024 ? Math.round(a.filesize / 1048576 * 100) / 100 + "MB" : Math.round(a.filesize / 1073741824 * 100) / 100 + "MB") + ")\u5df2\u6210\u529f\u4e0a\u4f20\u81f3\u670d\u52a1\u5668\uff0c\u6211\u4eec\u5c06\u4e3a\u60a8\u7684\u597d\u53cb\u4fdd\u5b587\u5929\u3002", g = "sendofffile", EQQ.RPCService.sendOffFileMsg({
				to: a.to_uin,
				file_path: a.filepath,
				filename: k,
				to_uin: a.to_uin
			}, this.sendOffFileMsgRes), alloy.util.report2m(153300)) : a.retcode === -30008 ? (f = "\u4eca\u65e5\u79bb\u7ebf\u6587\u4ef6\u5bb9\u91cf\u4e0d\u8db3\uff0c\u670d\u52a1\u5668\u62d2\u7edd\u4e86\u60a8\u53d1\u9001\u79bb\u7ebf\u201c" + k + "\u201d\u7684\u8bf7\u6c42\u3002", alloy.util.report2m(153301), alloy.util.report2m(153302)) : a.retcode === -30012 || a.retcode === -30013 || a.retcode === -30002 ? (f = "\u4eca\u65e5\u79bb\u7ebf\u6587\u4ef6\u5bb9\u91cf\u4e0d\u8db3\uff0c\u670d\u52a1\u5668\u62d2\u7edd\u4e86\u60a8\u53d1\u9001\u79bb\u7ebf\u201c" + k + "\u201d\u7684\u8bf7\u6c42\u3002", alloy.util.report2m(153301), alloy.util.report2m(153302)) : a.retcode === -30001 ? (f = "\u79bb\u7ebf\u6587\u4ef6\u53d1\u9001\u6b21\u6570\u8d85\u51fa\u6bcf\u65e5\u9650\u5236\uff0c\u670d\u52a1\u5668\u62d2\u7edd\u4e86\u60a8\u53d1\u9001\u79bb\u7ebf\u201c" + k + "\u201d\u7684\u8bf7\u6c42\u3002", alloy.util.report2m(153301), alloy.util.report2m(153303)) : (f = a.retcode === -30003 ? "\u79bb\u7ebf\u6587\u4ef6\u201c" + k + "\u201d\u8d85\u51fa\u6700\u5927\u4e0a\u4f20\u9650\u5236\u3002" : "\u6587\u4ef6\u201c" + k + "\u201d\u4f20\u8f93\u5931\u8d25\u3002", alloy.util.report2m(153301));
			f = [
				[g, f]
			];
			g = {
				type: g,
				name: a.filename,
				from_uin: a.to_uin,
				time: (new Date).getTime()
			};
			f = {
				type: "single",
				from_uin: 0,
				to: a.to_uin,
				content: f,
				attach: g
			};
			e.addMsgToList(f);
			c.notifyObservers(this, "OffFileUploaded", {
				ts: h[1],
				uin: h[0]
			})
		};
		this.sendOffFileMsgRes = function() {
			return !1
		};
		this.receiveNotifyOffFile = function(a) {
			var c = "",
				d = "";
			a.action == 1 ? (c = '\u5bf9\u65b9\u5df2\u6210\u529f\u63a5\u6536\u4e86\u60a8\u53d1\u9001\u7684\u79bb\u7ebf\u6587\u4ef6"' + a.filename + '"\u3002', d = "notifyagreeofffile") : (c = '\u5bf9\u65b9\u62d2\u7edd\u63a5\u6536\u60a8\u53d1\u9001\u7684\u79bb\u7ebf\u6587\u4ef6"' + a.filename + '"\u3002', d = "notifyrefuseofffile");
			c = [
				[d, c]
			];
			d = {
				type: d,
				name: a.filename,
				from_uin: a.from_uin,
				time: (new Date).getTime()
			};
			e.addMsgToList({
				type: "single",
				from_uin: 0,
				to: a.from_uin,
				content: c,
				attach: d
			})
		};
		this.receiveInputNotify = function(a) {
			c.notifyObservers(e, "BuddyTyping", a.from_uin)
		};
		this.receiveTipsMsg = function(a) {
			if ((a.url || "").indexOf("run=mySignature") === -1) return !1;
			var d = a.txt3.replace("\r\n", ":");
			a.content = d;
			a.type = "mysigntips";
			d = {
				type: "mysigntips",
				sender: {
					htmlShowName: String(a.from_uin)
				},
				from_uin: a.from_uin,
				allow: 1,
				content: d,
				msg_id: a.msg_id,
				opt: {
					uin: a.from_uin,
					nick: a.from_uin,
					msg_id: a.msg_id,
					type: "mysigntips"
				}
			};
			a.aMag = d;
			c.notifyObservers(EQQ, "MessageReceive", {
				msgList: [d]
			})
		};
		this.getMoreLog = function(a) {
			qqweb.rpcService.sendGetGroupLogByTime({
				c: a.total,
				gid: a.gid,
				gcode: a.gcode,
				uk: a.uin,
				tt: a.time,
				m: a.precount
			}, this.getMoreLogSuccess, this.getMoreLogError)
		};
		this.getMoreLogSuccess = function(a) {
			c.notifyObservers(EQQ.Model.ChatMsg, "GetMoreLogSuccess", a)
		};
		this.getMoreLogError = function(a) {
			c.notifyObservers(EQQ.Model.ChatMsg, "GetMoreLogError", a);
			d.error("getMoreLogError")
		};
		this.receiveDiscuMsg = function(a) {
			a.did = EQQ.Model.BuddyList.encodeDid(a.did);
			var c = EQQ.Model.BuddyList.getDiscuById(a.did);
			if (c) this.addMessageBoxDiscuList(a), this.preloadGroupMessageImages(a, 1), this.parseDiscuMsg(a), J(c, a.content);
			else {
				y[a.did] = y[a.did] || [];
				y[a.did].push(a);
				for (var c = {
					did: a.did
				}, e = "", f = 0; f < a.content.length; f++) {
					var g = a.content[f];
					if (d.isArray(g)) if (g[0] == "face") {
						e = "[\u8868\u60c5]";
						break
					} else {
						if (g[0] == "cface") {
							e = "[\u56fe\u7247]";
							break
						}
					} else {
						e = o.cutByBytes(g.toString(), 20);
						break
					}
				}
				c.name = e;
				EQQ.Model.BuddyList.getAndAddDiscu(c)
			}
		};
		this.parseDiscuMsg = function(a) {
			var e = a.did,
				f = !1,
				g = 0,
				h = {
					type: "discu",
					from_uin: e,
					sender_uin: a.send_uin,
					sender: EQQ.Model.BuddyList.getUserByUin(a.send_uin),
					msg_id: a.msg_id,
					content: a.content,
					did: e,
					time: F(a.time),
					raw_time: a.time
				};
			if (k[e]) {
				for (var j = k[e].msgList.length, m = 0; m < j; m++) {
					var r = k[e].msgList[m];
					if (h.sender_uin == r.sender_uin && r.msg_id == h.msg_id) {
						f = !0;
						d.out("\u53d1\u73b0\u91cd\u590ddiscu\u6d88\u606f\uff0cmsg_id\uff1a" + h.msg_id);
						break
					}
				}
				f || (k[e].msgList.push(h), g++)
			} else k[e] = {
				last: 0,
				msgList: []
			}, k[e].msgList.push(h), g++;
			H[e] = h.msg_id;
			f = k[e].msgList;
			j = f.length;
			h = [];
			if (g > 0) {
				for (m = g; m > 0; m--) h.push(f[j - m]);
				k[e].last = 0;
				c.notifyObservers(this, "DiscuMessageListChange", {
					did: e,
					msgList: h
				});
				c.notifyObservers(EQQ, "MessageReceive", {
					did: e,
					msgList: h
				})
			}
			n != null && n != a.info_seq && c.notifyObservers(this, "ServerDiscuInfochange", {
				did: e
			});
			n = a.info_seq
		};
		this.addMessageBoxDiscuList = function(a) {
			var e = r[a.did];
			e && d.array.remove(m, e);
			r[a.did] = a;
			m.push(a);
			c.notifyObservers(this, "MessageBoxDiscuListChange", this.getMessageBoxDiscuList())
		};
		this.getMessageBoxDiscuList = function() {
			return m
		};
		this.removeMessageBoxDiscuList = function(a) {
			var e = r[a];
			e && d.array.remove(m, e);
			delete r[a];
			c.notifyObservers(this, "MessageBoxDiscuListChange", this.getMessageBoxDiscuList())
		};
		this.getDiscuMsgHistory = function(a) {
			k[a] && c.notifyObservers(this, "DiscuMessageListChange", {
				did: a,
				msgList: k[a].msgList
			})
		};
		this.onAddDiscuByMsgSuccess = function(a) {
			var a = y[a.did],
				c;
			for (c in a) {
				var d = a[c];
				d.did = EQQ.Model.BuddyList.decodeDid(d.did);
				this.receiveDiscuMsg(d)
			}
		};
		var J = function(a, c) {
				if (!a.notSetName || a.hadModified) return !1;
				for (var e = {
					did: a.did
				}, f = "", g = 0; g < c.length; g++) {
					var h = c[g];
					if (d.isArray(h)) if (h[0] == "face") {
						f = "[\u8868\u60c5]";
						break
					} else {
						if (h[0] == "cface") {
							f = "[\u56fe\u7247]";
							break
						}
					} else if (!(h == "\n" || h == " ")) {
						f = o.cutByBytes(h.toString(), 20);
						break
					}
				}
				e.discu_name = f;
				EQQ.Model.BuddyList.sendModifyDiscuTopic(e)
			};
		this.setMessageRead = function(a) {
			I = I.concat(a)
		};
		this.getMessageRead = function() {
			var a = [].concat(I);
			I = [];
			return a
		};
		this.saveHtmlMsg = function(a, c) {
			g[a] = g[a] || [];
			g[a].push(c)
		};
		this.getHtmlMsg = function(a) {
			return d.isUndefined(g[a]) ? "" : g[a].join("")
		}
	})
})();
(function() {
	var d = {
		statePanel: '<li class="EQQ_statePanel_li" id="EQQ_SetOnline" state="online"><div class="EQQ_stateSelect_icon EQQ_online"></div><div class="EQQ_stateSelect_text">\u6211\u5728\u7ebf\u4e0a</div></li>                    <li class="EQQ_statePanel_li" id="EQQ_SetCallme" state="callme"><div class="EQQ_stateSelect_icon EQQ_callme"></div><div class="EQQ_stateSelect_text">Q\u6211\u5427</div></li>                    <li class="EQQ_statePanel_li" id="EQQ_SetAway" state="away"><div class="EQQ_stateSelect_icon EQQ_away"></div><div class="EQQ_stateSelect_text">\u79bb\u5f00</div></li>                    <li class="EQQ_statePanel_li" id="EQQ_SetBusy" state="busy"><div class="EQQ_stateSelect_icon EQQ_busy"></div><div class="EQQ_stateSelect_text">\u5fd9\u788c</div></li>                    <li class="EQQ_statePanel_li" id="EQQ_SetSilent" state="silent"><div class="EQQ_stateSelect_icon EQQ_silent"></div><div class="EQQ_stateSelect_text">\u8bf7\u52ff\u6253\u6270</div></li>                    <li class="EQQ_statePanel_li" id="EQQ_SetHidden" state="hidden"><div class="EQQ_stateSelect_icon EQQ_hidden"></div><div class="EQQ_stateSelect_text">\u9690\u8eab</div></li>                    <li class="EQQ_statePanel_li" id="EQQ_SetOffline" state="offline"><div class="EQQ_stateSelect_icon EQQ_offline"></div><div class="EQQ_stateSelect_text">\u79bb\u7ebf</div></li>                    <li class="EQQ_statePanel_li EQQ_SetSound statusBar_sound_open" id="EQQ_SetSound"><div class="EQQ_stateSelect_icon EQQ_SetSound_icon"></div><div class="EQQ_stateSelect_text">\u9759\u97f3</div></li>',
		groupMaskPanel: '<a id="GroupMask_Costom" state="0" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>\u4f7f\u7528\u7fa4\u81ea\u8eab\u7684\u6d88\u606f\u8bbe\u7f6e</a>\t\t\t\t\t\t<a id="GroupMask_Prompt" state="1" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>\u6240\u6709\u7fa4\u63a5\u6536\u5e76\u63d0\u793a\u6d88\u606f</a>\t\t\t\t\t\t<a id="GroupMask_NoPrompt" state="2" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>\u6240\u6709\u7fa4\u63a5\u6536\u4e0d\u63d0\u793a\u6d88\u606f</a>\t\t\t\t\t\t<a id="GroupMask_Mask" state="3" class="simpleMenuItem" href="###"><div class="selectedIcon"></div>\u6240\u6709\u7fa4\u5b8c\u5168\u963b\u6b62\u7fa4\u6d88\u606f</a>',
		miniCardPanel: '<div class="panel_1_outer">\t\t\t\t<div class="panel_1_inner">\t\t\t\t\t<div class="panel_1_container"></div>\t\t\t\t\t<div id="miniCardBody" class="panel_1_content">\t\t\t\t\t\t<img id="miniCard_avatar" class="miniCard_avatar" />\t\t\t\t\t\t<div class="miniCard_name">\t\t\t\t\t\t\t<div id="miniCard_name_inner" class="miniCard_name_inner"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="miniCard_signature" class="miniCard_signature">\t\t\t\t\t\t\t<div id="miniCard_signature_inner" class="miniCard_signature_inner"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="miniCard_clientType_innerWrapper" class ="miniCard_clientType_innerWrapper"><div class ="miniCard_clientTypeIcon"></div><div id="miniCard_clientType_inner" class="miniCard_clientType_inner"></div></div>\t\t\t\t\t\t<div id="miniCard_level" class="miniCard_level"></div>\t\t\t\t\t\t<div id="miniCard_level_upinfo" class="miniCard_level_upinfo"></div>\t\t\t\t\t\t<div id="miniCard_quickLink" class="miniCard_quickLink">\t\t\t\t\t\t\t<a id="miniCard_video" class="miniCard_video" type="video" title="\u5f00\u59cb\u89c6\u9891\u4f1a\u8bdd" hidefocus target="_blank" href="###"></a>\t\t\t\t\t\t\t<a id="miniCard_qzone" class="miniCard_qzone" type="qzone" title="\u8bbf\u95eeQQ\u7a7a\u95f4" hidefocus target="_blank" href="###"></a>\t\t\t\t\t\t\t<a id="miniCard_qmail" class="miniCard_qmail" type="qmail" title="\u53d1\u9001\u90ae\u4ef6" hidefocus target="_blank" href="###"></a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="miniCard_buddyOption_tabHead" class="buddyOption_tabHead">\t\t\t\t\t\t\t<div id="miniCard_userDetails" class="buddyOption_tabHead_div">\u8be6\u7ec6\u8d44\u6599</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="miniCard_buddyOption_tabBody" class="buddyOption_tabBody">\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t</div>',
		myPanel: '<div id="EQQ_MyPanel" class="EQQ_myPanel">                    <img id="EQQ_MyAvatar" class="EQQ_myAvatar"/>                    <div id="EQQ_myInfo" class="EQQ_myInfo">                        <div id="EQQ_MyState" class="EQQ_myState" title="\u6211\u7684\u72b6\u6001">                            <div id="EQQ_MyStateShow" class="EQQ_myStateShow EQQ_offline">\u72b6\u6001</div>                            <div class="EQQ_myStateDown">\u4e0b</div>                        </div>                        <div id="EQQ_MyNick" class="EQQ_myNick" title=""></div>                        <\!--div id="EQQ_MyPanel_ExitButton" title="\u9000\u51fa">\u9000\u51fa</div--\>                    </div>                    <div id="EQQ_myService" class="EQQ_myService">                        <div id="EQQ_mySignature_wraper" class="EQQ_mySignature_wraper"><input id="EQQ_MySignature" class="EQQ_mySignature" type="text" title="" /></div>                    </div>            </div>            <div id="eqqMypanelToolbar" class="eqq_mypanel_toolbar">                <a href="###" title="QQ\u7a7a\u95f4" appId="16" report="qzone" class="eqq_mypanel_toolbar_button"><span class="eqq_mypanel_toolbar_icon eqq_mypanel_toolbar_qzone"></span></a>                <a href="###" title="QQ\u90ae\u7bb1" appId="17" report="mail" class="eqq_mypanel_toolbar_button "><span class="eqq_mypanel_toolbar_icon eqq_mypanel_toolbar_mail"></span></a>                <a href="###" title="\u817e\u8baf\u5fae\u535a" appId="2" report="weibo" class="eqq_mypanel_toolbar_button "><span class="eqq_mypanel_toolbar_icon eqq_mypanel_toolbar_weibo"></span></a>                <a href="###" title="\u6211\u7684\u8d44\u8baf" appId="14" report="news" class="eqq_mypanel_toolbar_button "><span class="eqq_mypanel_toolbar_icon eqq_mypanel_toolbar_news"></span></a>                <a href="###" title="QQ\u94b1\u5305" appId="4333" report="money" class="eqq_mypanel_toolbar_button "><span class="eqq_mypanel_toolbar_icon eqq_mypanel_toolbar_money"></span></a>                <a href="###" title="\u817e\u8baf\u670b\u53cb" appId="21" report="pengyou" class="eqq_mypanel_toolbar_button "><span class="eqq_mypanel_toolbar_icon eqq_mypanel_toolbar_pengyou"></span></a>                <a href="###" title="\u7f51\u7edc\u786c\u76d8" appId="13" report="harddisk" class="eqq_mypanel_toolbar_button "><span class="eqq_mypanel_toolbar_icon eqq_mypanel_toolbar_harddisk" ' + (Jet().platform.iPad ? ' style="opacity:0.3;" ' : "") + " ></span></a>            </div>",
		mainPanelHeader: '<div class="EQQ_title">\t\t\t\t<div id="EQQ_PinDownButton" class="EQQ_PinDownButton" title="\u9489\u4f4f/\u6536\u8d77">\u9489\u4f4f/\u6536\u8d77</div>\t\t\t\t<div id="EQQ_CloseButton" class="EQQ_CloseButton" title="\u9690\u85cf\u597d\u53cb\u5217\u8868">\u6700\u5c0f\u5316</div>\t\t\t\t<div id="EQQ_MinButton" class="EQQ_MinButton" title="\u8bbe\u7f6e">\u8bbe\u7f6e</div>\t\t\t\t<a class="EQQ_FeedbackButton2" href="http://support.qq.com/portal/discuss_pdt/420_1.html" target="_blank">\u53cd\u9988</a>\t\t\t\t<div id="EQQ_SettingButton" class="EQQ_settingButton" title="\u8bbe\u7f6eQ+ Web">\t\t\t\t\t<div class="EQQ_settingButtonIcon">\u4e0b</div>\t\t\t\t\t<div>\u8bbe\u7f6e</div>\t\t\t\t</div>\t\t\t\t<div class="EQQ_titleText" href="#" target="_blank" title="\u8054\u7cfb\u4eba">\u8054\u7cfb\u4eba</div>\t\t\t\t<div class="EQQ_betaText" title="1.0.10.12"></div>\t\t\t</div>\t\t\t<div id="EQQ_YellowTips" class="EQQ_YellowTips">\t\t\t\t<div id="EQQ_YellowTips_CloseButton" class="EQQ_YellowTips_CloseButton" title="\u5173\u95ed\u63d0\u793a">X</div>\t\t\t\t<a class="EQQ_YellowTips_Link" href="http://survey.qq.com/cgi-bin/submitsurvey?id=2473&qpage=1&page=1&rm=dnN4k1bBG" target="_blank">\u9080\u8bf7\u53c2\u4e0eQ+ Web\u7528\u6237\u8c03\u67e5</a>\t\t\t</div>            <div id="EQQ_UseHttpsTips" class="EQQ_YellowTips EQQ_UseHttpsTips">                <div id="EQQ_UseHttpsTips_CloseButton" class="EQQ_YellowTips_CloseButton" title="\u5173\u95ed\u63d0\u793a">X</div>                \u5efa\u8bae\u60a8\u804a\u5929\u4f7f\u7528Https\u5b89\u5168\u94fe\u63a5\u3002<a id="EQQ_UseHttpsTips_Link" class="EQQ_UseHttpsTips_Link" href="###" target="_blank">\u7acb\u5373\u8bbe\u7f6e</a>            </div>',
		mainPanelFooter: '<div>                    <div id="EQQ_Logining">\u53d1\u8d77\u8fde\u63a5...</div>                </div>                <div id="EQQ_Logining_feedback"><a href="http://support.qq.com/write.shtml?guest=1&fid=513" target="_blank">                    <span class="warnning_yellow">&nbsp;</span>\u53cd\u9988\u767b\u5f55\u5efa\u8bae</a></div>                <div id="EQQ_ReLoginPanel">                    <div id="EQQ_ReLoginPanel_inner"><div style="display:inline;" id="EQQ_ReLoginButton_text">\u767b\u5f55\u5931\u8d25</div>\uff0c<span id="EQQ_ReLoginButton">\u91cd\u8bd5</span></div>                </div>',
		searchReaultPanel: '<div id="EQQ_SearchResultPanel" class="EQQ_SearchResultPanel-1">                <div class="EQQ_SearchResultItem" title="">Kevity1(666666)</div>                <div class="EQQ_SearchResultItemHover" title="">Kevity2(666666)</div>                <div class="EQQ_SearchResultItem" title="">Kevity3(66666)</div>            </div>',
		searchReaultPanelFlex: '<div id="EQQ_SearchResultPanel_iframeWrap" class="EQQ_SearchResultPanel_iframeWrap">                <div id="EQQ_SearchResultPanel" class="EQQ_SearchResultPanel">                    <div class="EQQ_SearchResultItem" title="">Kevity1(666666)</div>                    <div class="EQQ_SearchResultItemHover" title="">Kevity2(666666)</div>                    <div class="EQQ_SearchResultItem" title="">Kevity3(66666)</div>                </div>                <iframe class="EQQ_SearchResultPanel_iframe"></iframe>            </div>',
		buddyListBody: "",
		buddyListBodyFlex: '<iframe id="iframe_fflist" width="100%" height="100%"  border="0" frameborder="0" style="border:0;overflow:hidden;" allowtransparency="true" src="' + qqweb.CONST.MAIN_URL + 'swf/fflist.html?t=20111011001"></iframe>    <\!--<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%" id="fflist" align="middle">    <param name="movie" value="./module/eqq/swf/fflist.swf" />    <param name="quality" value="high" />    <param name="play" value="true" />    <param name="loop" value="true" />    <param name="wmode" value="transparent" />    <param name="scale" value="showall" />    <param name="menu" value="true" />    <param name="devicefont" value="false" />    <param name="salign" value="" />    <param name="allowScriptAccess" value="always" />    <embed wmode="transparent" src="./module/eqq/swf/fflist.swf" width="100%" height="100%" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"type="application/x-shockwave-flash"></embed></object--\>',
		mainPanelBody: '<div id="EQQ_LoginSuccess">\t\t\t\t<div id="EQQ_SearchBar" class="EQQ_SearchBar">\t\t\t\t\t<input id="EQQ_SearchBox" class="EQQ_SearchBox" name="" type="text" value="\u641c\u7d22\u597d\u53cb..." title="\u641c\u7d22\u597d\u53cb..." />\t\t\t\t\t<div id="EQQ_SearchButton" class="EQQ_SearchButton" title="\u641c\u7d22...">\u641c\u7d22\u6309\u94ae</div>\t\t\t\t</div>\t\t\t\t<%=searchReaultPanel%>\t\t\t\t<ul class="EQQ_tab">\t\t\t\t\t<li id="EQQ_TabBuddyList" class="EQQ_tabBuddyList" title="\u8054\u7cfb\u4eba"><a href="###" id="EQQ_TabBuddyList_MenuIcon" class="EQQ_tabmenu_icon"></a><div class="EQQ_tabBuddyList_icon tab_icon"></div></li>\t\t\t\t\t<li id="EQQ_TabGroupList" class="EQQ_tabGroupList" title="\u7fa4/\u8ba8\u8bba\u7ec4"><a href="###" id="EQQ_TabGroupList_MenuIcon" class="EQQ_tabmenu_icon"></a><div class="EQQ_tabGroupList_icon tab_icon"></div></li>\t\t\t\t\t<li id="EQQ_TabRecentList" class="EQQ_tabRecentList" title="\u6700\u8fd1\u8054\u7cfb\u4eba"><a href="###" id="EQQ_TabRecentList_MenuIcon" class="EQQ_tabmenu_icon"></a><div class="EQQ_tabRecentList_icon tab_icon"></div></li>\t\t\t\t</ul>\t\t\t\t<div id="EQQ_ListContainer">\t\t\t\t\t<div id="EQQ_buddyListPanel" class="EQQ_buddyListPanel ">\t\t\t\t\t\t<div id="EQQ_buddyList" class="EQQ_buddyList">\t\t\t\t\t\t<%=buddyListBody%>                        </div>\t\t\t\t\t\t<div id="EQQ_buddyListPanelBottom" class="EQQ_ListBottom">\t\t\t\t\t\t\t\t<a href="" id="EQQ_findBuddy" class="searchBuddy" target="_blank"><div class="searchBuddy_div"></div>\u67e5\u627e</a>\t\t\t\t\t\t\t\t<a href="" id="EQQ_buddyManage" class="buddy_manage_icon" target="_blank"><div class="buddy_manage_icon_div"></div>\u597d\u53cb\u7ba1\u7406</a>                                <a href="" id="EQQ_messageManage" class="message_manage_icon" target="_blank"><div class="message_manage_icon_div"></div>\u6d88\u606f\u7ba1\u7406</a>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div id="EQQ_groupListPanel" class="EQQ_groupListPanel ">\t\t\t\t\t\t<ul id="EQQ_groupTab" class="EQQ_groupTab"><li id="EQQ_groupTabGroup" class="seled">QQ\u7fa4</li><li id="EQQ_groupTabDiscu">\u8ba8\u8bba\u7ec4</li></ul>\t\t\t\t\t\t<div id="EQQ_groupBox" class="EQQ_groupBox">\t\t\t\t\t\t\t<div id="EQQ_groupListOuter" class="EQQ_groupListOuter"><div id="EQQ_groupListInner" class="EQQ_groupListInner"></div></div>\t\t\t\t\t\t\t<div id="EQQ_groupListPanelBottom" class="EQQ_ListBottom">\t\t\t\t\t\t\t\t<a id="EQQ_createGroupButton" class="createGroup" href="http://qun.qq.com/air/create" target="_blank" title="\u521b\u5efa\u7fa4"><div class="createGroup_div"></div>\u521b\u5efa</a>\t\t\t\t\t\t\t\t<a id="EQQ_searchGroupButton" class="searchGroup" href="http://qun.qq.com/air/search" target="_blank" title="\u67e5\u627e\u7fa4"><div class="searchGroup_div"></div>\u67e5\u627e</a>\t\t\t\t\t\t\t\t<div id="EQQ_ListBottom_maskButton"><div class="accept_div"></div>\u7fa4\u5c4f\u853d</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="EQQ_discuBox" class="EQQ_groupBox" style="display:none">\t\t\t\t\t\t\t<div id="EQQ_discuListOuter" class="EQQ_groupListOuter">\t\t\t\t\t\t\t\t<div id="EQQ_discuListInner" class="EQQ_groupListInner"></div>\t\t\t\t\t\t\t\t<div id="EQQ_discuListFail" class="EQQ_groupListInner EQQ_failBox">\t\t\t\t\t\t\t\t\t<div id="EQQ_discuReLogin_text" style="display: inline;">\u767b\u5f55\u5931\u8d25,<a href="#">\u91cd\u8bd5</a></div>   \t\t\t\t\t\t\t\t\t<div id="EQQ_discuReLogining_text" class="EQQ_discuReLogining_text">Loading...</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div id="EQQ_discuCreate" class="EQQ_discuCreate">\t\t\t\t\t\t\t\t\t<div class="EQQ_discuCreate_text">\u8ba8\u8bba\u7ec4\u80fd\u8f7b\u677e\u53d1\u8d77\u591a\u4eba\u4f1a\u8bdd</div>\t\t\t\t\t\t\t\t\t<div class="EQQ_discuCreate_button_container">\t\t\t\t\t\t\t\t\t\t<a id="EQQ_discuCreate_button" class="createGroup" href="#" target="_blank" title="\u521b\u5efa\u8ba8\u8bba\u7ec4"></a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="EQQ_discuListPanelBottom" class="EQQ_ListBottom">\t\t\t\t\t\t\t\t<a id="EQQ_createDiscuButton" class="createGroup" href="#" target="_blank" title="\u521b\u5efa\u8ba8\u8bba\u7ec4"><div class="createGroup_div"></div>\u521b\u5efa\u8ba8\u8bba\u7ec4</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div id="EQQ_recentListPanel" class="EQQ_recentListPanel "><div id="EQQ_recentList" class="EQQ_recentList"></div></div>\t\t\t\t</div>\t\t\t</div>'
	},
		e = function(c) {
			var d = c.dom,
				a = c.event,
				e = c.string,
				o = !1;
			this.createDiscu = function(a) {
				a.preventDefault();
				alloy.portal.runApp("selectBuddy", {
					windowType: "EqqWindow",
					title: "\u521b\u5efa\u8ba8\u8bba\u7ec4",
					isAddSelf: !0,
					maxBuddy: 20,
					onSelected: EQQ.Model.BuddyList.createDiscu
				})
			};
			this.onDiscuListClick = function(d) {
				d = d.getAttribute("did");
				a.notifyObservers(this, "StartDiscuChat", d);
				pgvSendClick({
					hottag: "web2qq.qqpanel.discu.sendmsg"
				});
				alloy.util.report2im("qqpanel|dicussions|sendmsg")
			};
			this.getNewNode = function(a, c) {
				var c = c || !1,
					k = "",
					n = c ? "EQQ_RecentList_State_" + a.did : "EQQ_discuList_State_" + a.did,
					o = c ? "EQQ_RecentDiscuList_State_" + a.did : "EQQ_discuList_Name_" + a.did;
				parseInt(a.mask) > 0 && (k = " EQQ_GroupMask_State");
				k = e.template('\t\t\t\t<div class="EQQ_GroupList_AvatarContainer">\t\t\t\t\t<div class="EQQ_discuList_Avatar"></div>\t\t\t\t\t<div class="EQQ_GroupList_State ' + k + '" id="' + n + '" title="\u8ba8\u8bba\u7ec4\u5c4f\u853d"></div>\t\t\t\t</div>\t\t\t\t<div class="EQQ_GroupList_RightContainer" title="<%=titleName%>">\t\t\t\t\t<div id="' + o + '" class="EQQ_GroupList_Name"><%=htmlName%></div>\t\t\t\t</div>\t\t\t', a);
				n = d.node("div", {
					id: c ? "EQQ_Recent_" + a.did : "EQQ_Discu_" + a.did,
					did: a.did,
					"class": "EQQ_GroupList_Group"
				});
				n.innerHTML = k;
				return n
			};
			this.removeDiscu = function(c) {
				var e = d.id("EQQ_Discu_" + c);
				if (e && (a.off(e), e.parentNode)) {
					var h = e.parentNode;
					h.removeChild(e)
				}
				if (c = d.id("EQQ_Recent_" + c)) if (a.off(c), c.parentNode) h = c.parentNode, h.removeChild(c);
				(h = d.id("EQQ_discuListInner")) && h.innerHTML == "" && this.showCreatePanel()
			};
			this.discuJumpUp = function(a) {
				o = !0;
				for (var c = 0; c < a.length; c++) {
					var e = d.id("EQQ_Discu_" + a[c]);
					e && d.addClass(e, "EQQ_jumpUpInGroupList")
				}
			};
			this.discuJumpDown = function(a) {
				o = !1;
				for (var c = 0; c < a.length; c++) {
					var e = d.id("EQQ_Discu_" + a[c]);
					e && d.removeClass(e, "EQQ_jumpUpInGroupList")
				}
			};
			this.discuJumpAvatar = function(a) {
				o ? this.discuJumpDown(a) : this.discuJumpUp(a)
			};
			this.onCreateDiscu = function(a, d) {
				a.preventDefault();
				alloy.portal.runApp("selectBuddy", {
					title: "\u521b\u5efa\u8ba8\u8bba\u7ec4",
					isAddSelef: !0,
					maxBuddy: 20,
					windowType: "EqqWindow",
					onSelected: EQQ.Model.BuddyList.createDiscu
				});
				c.isUndefined(d) && alloy.util.report2im("qqpanel|dicussions|create")
			};
			this.updateDiscuName = function(a) {
				var c = d.id("EQQ_discuList_Name_" + a.did);
				c.parentNode.title = a.titleName;
				c.innerHTML = a.htmlName;
				if (c = d.id("EQQ_RecentDiscuList_State_" + a.did)) c.parentNode.title = a.titleName, c.innerHTML = a.htmlName
			};
			this.setDiscuListMaskState = function(a, c) {
				var e = d.id("EQQ_discuList_State_" + a),
					h = d.id("EQQ_RecentList_State_" + a);
				parseInt(c) > 0 ? (e && d.addClass(e, "EQQ_GroupMask_State"), h && d.addClass(h, "EQQ_GroupMask_State")) : (e && d.removeClass(e, "EQQ_GroupMask_State"), h && d.removeClass(h, "EQQ_GroupMask_State"))
			};
			this.onDiscuListContextMenu = function(a) {
				a.preventDefault();
				alloy.layout.showContextMenu({
					x: a.clientX,
					y: a.clientY
				}, {
					width: 150,
					items: this.discuGlobalMenuConfig
				});
				qqweb.util.report2qqweb("contextmenu|dicussions|all")
			};
			this.onDiscuContextMenu = function(a, c) {
				a.preventDefault();
				a.stopPropagation();
				alloy.layout.showContextMenu({
					x: a.clientX,
					y: a.clientY
				}, {
					width: 180,
					argument: c,
					items: this.discuMenuConfig,
					beforeShow: this.setDiscuMaskItemState
				})
			};
			this.setDiscuMaskItemState = function(a) {
				var c = a.getArgument(),
					c = EQQ.Model.BuddyList.getDiscuById(c),
					d = 2,
					a = [a.getItemAt(d++), a.getItemAt(d++), a.getItemAt(d++)],
					c = c.mask,
					e;
				for (e in a) a[e].option.argument.state == c ? a[e].setIcon({
					style: "background: url(./style/images/eqq_sprite.gif) no-repeat 5px -33px;"
				}) : a[e].setIcon(null)
			};
			this.onDiscuMaskItemClick = function(a, c, d) {
				a = c.option.argument;
				d = d.getArgument();
				EQQ.Model.BuddyList.sendChangeDiscuMask({
					type: "single",
					uin: d,
					mask: a.state
				});
				qqweb.util.report2qqweb("contextmenu|dicussions|" + a.flag)
			};
			this.showReloadDiscuList = function() {
				this.EQQ_discuListInner.innerHTML = "";
				var c = d.id("EQQ_discuListFail"),
					e = d.id("EQQ_discuReLogin_text"),
					h = d.id("EQQ_discuReLogining_text");
				d.show(c);
				d.show(e);
				d.hide(h);
				a.off(c, "click");
				a.on(c, "click", function(a) {
					a.preventDefault();
					a.stopPropagation();
					EQQ.Model.BuddyList.sendGetDiscuList();
					d.show(h);
					d.hide(e)
				});
				this.hideCreatePanel()
			};
			this.hideReloadDiscuList = function() {
				var a = d.id("EQQ_discuListFail");
				d.isShow(a) && d.hide(a)
			};
			this.showCreatePanel = function() {
				var a = d.id("EQQ_discuCreate");
				d.isShow(a) || d.show(a)
			};
			this.hideCreatePanel = function() {
				var a = d.id("EQQ_discuCreate");
				d.isShow(a) && d.hide(a)
			}
		},
		c = function(c) {
			var g = this,
				a = c.dom,
				h = c.event,
				o = c.string,
				f = !1,
				m = !1,
				r = !1,
				n = !1,
				y = {},
				p = [],
				u = [],
				j = [],
				z = [],
				I = [],
				H = {},
				A = 0,
				x = 160,
				v = "0",
				B = alloy.layout.getPanel("desktop").body,
				q, F, G = [],
				t = !1,
				J = !1,
				i = "single",
				l = "",
				E = !1,
				C;
			EQQ.avatarMouseoverTimer = null;
			var D = {},
				K = !1;
			e.apply(this, [c]);
			var L = function(a, b, c) {
					a = b.option.argument;
					a.type == "single" ? (c = c.getArgument(), c = EQQ.Model.BuddyList.getGroupByCode(c).gid, c = {
						type: a.type,
						uin: c,
						mask: a.state + ""
					}) : c = {
						type: a.type,
						uin: EQQ.Model.BuddyList.getSelfUin(),
						mask: a.state + ""
					};
					EQQ.Model.BuddyList.sendChangeGroupMask(c);
					qqweb.util.report2qqweb("contextmenu|group|" + a.flag)
				},
				R = [{
					text: "\u53d1\u9001\u5373\u65f6\u6d88\u606f",
					onClick: function(a, b, c) {
						a = c.getArgument();
						h.notifyObservers(g, "StartChat", a);
						qqweb.util.report2qqweb("contextmenu|contancts|sendmsg")
					}
				}, {
					text: "\u53d1\u9001\u7535\u5b50\u90ae\u4ef6",
					onClick: function(a, b, c) {
						a = c.getArgument();
						qqweb.rpcService.sendGetFriendUin2(a, 3, function(a) {
							qqweb.portal.runApp("6", {
								url: EQQ.getSendMailUrl(a.result.account)
							});
							qqweb.util.report2qqweb("contextmenu|contancts|mail")
						})
					}
				}, {
					type: "separator"
				}, {
					text: "\u8bbf\u95eeQQ\u7a7a\u95f4",
					onClick: function(a, b, c) {
						a = c.getArgument();
						qqweb.rpcService.sendGetFriendUin2(a, 2, function(a) {
							qqweb.portal.runApp("6", {
								url: EQQ.getQzoneUrl(a.result.account)
							});
							qqweb.util.report2qqweb("contextmenu|contancts|qzone")
						})
					}
				}, {
					text: "\u521b\u5efa\u684c\u9762\u8054\u7cfb\u4eba",
					onClick: function(a, b, c) {
						a = c.getArgument();
						alloy.desktopContact.addContactIcon({
							t: "uin",
							id: Number(a)
						});
						qqweb.util.report2qqweb("contextmenu|contancts|adddeskcontanct")
					}
				}, {
					type: "separator"
				}, {
					text: "\u79fb\u52a8\u8054\u7cfb\u4eba\u81f3",
					type: "submenu",
					beforeShow: function(a) {
						var b = a.parentMenu.getArgument();
						h.notifyObservers(g, "GetSingleMenuClassItems", {
							u: b,
							f: function(c) {
								a.clearItems();
								for (var d = 0; d < c.length; d++) {
									var e = c[d];
									(function() {
										var a = e.classId;
										e.onClick = function() {
											h.notifyObservers(g, "MoveBuddyClass", {
												uin: b,
												classId: a
											})
										}
									})();
									a.addItem(e)
								}
							}
						})
					},
					items: []
				}, {
					text: "\u5220\u9664\u597d\u53cb",
					onClick: function(a, b, c) {
						a = c.getArgument();
						h.notifyObservers(g, "RemoveBuddyConfirm", a);
						qqweb.util.report2qqweb("contextmenu|contancts|delete")
					}
				}, {
					text: "\u4fee\u6539\u5907\u6ce8",
					onClick: function(a, b, c) {
						a = c.getArgument();
						g.setUserMarkName(a);
						qqweb.util.report2qqweb("contextmenu|contancts|changename")
					}
				}, {
					text: "\u9690\u8eab\u8bbe\u7f6e",
					onClick: function() {
						qqweb.portal.runApp("5", {});
						qqweb.util.report2qqweb("contextmenu|contancts|manage")
					}
				}, {
					type: "separator"
				}, {
					text: "\u6d88\u606f\u8bb0\u5f55",
					onClick: function(a, b, c) {
						a = c.getArgument();
						qqweb.portal.runApp("chatLogViewer", a);
						qqweb.util.report2qqweb("contextmenu|contancts|chats")
					}
				}, {
					text: "\u67e5\u770b\u8d44\u6599",
					onClick: function(a, b, c) {
						a = c.getArgument();
						qqweb.portal.runApp("userDetails", a);
						qqweb.util.report2qqweb("contextmenu|contancts|profile")
					}
				}],
				Q = [{
					text: "\u5934\u50cf\u663e\u793a",
					type: "submenu",
					icon: {
						className: "eqq_header_switch_icon"
					},
					beforeShow: function(a) {
						Y() ? (a.getItemAt(0).setIcon({
							className: "eqq_cxmenu_check_icon"
						}), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
							className: "eqq_cxmenu_check_icon"
						}))
					},
					items: [{
						text: "\u5927\u5934\u50cf",
						onClick: function() {
							g.ifFlexReady ? g.setFlexBigHead(!0) : T("single", !0);
							S("single", !0);
							qqweb.util.report2qqweb("contextmenu|contancts|largeicon")
						}
					}, {
						text: "\u5c0f\u5934\u50cf",
						onClick: function() {
							g.ifFlexReady ? g.setFlexBigHead(!1) : T("single", !1);
							S("single", !1);
							qqweb.util.report2qqweb("contextmenu|contancts|normalicon")
						}
					}]
				}, {
					text: "\u663e\u793a\u5728\u7ebf\u8054\u7cfb\u4eba",
					onClick: function(b, c) {
						K ? (a.removeClass(g.EQQ_buddyListPanel, "show_only_online_buddy"), c.setText("\u663e\u793a\u5728\u7ebf\u8054\u7cfb\u4eba"), K = !1) : (a.addClass(g.EQQ_buddyListPanel, "show_only_online_buddy"), c.setText("\u663e\u793a\u6240\u6709\u8054\u7cfb\u4eba"), K = !0);
						qqweb.util.report2qqweb("contextmenu|contancts|onlineonly")
					}
				}, {
					text: "\u597d\u53cb\u6279\u91cf\u7ba1\u7406",
					onClick: function() {
						qqweb.portal.runApp("5", {});
						qqweb.util.report2qqweb("contextmenu|contancts|manage")
					}
				}, {
					text: "\u67e5\u627e/\u6dfb\u52a0\u597d\u53cb",
					onClick: function() {
						qqweb.portal.runApp("buddyFinder", {});
						qqweb.util.report2qqweb("contextmenu|contancts|add")
					}
				}],
				O = [{
					text: "\u53d1\u9001\u7fa4\u6d88\u606f",
					onClick: function(a, b, c) {
						a = c.getArgument();
						h.notifyObservers(g, "StartGroupChat", a);
						qqweb.util.report2qqweb("contextmenu|group|sendmsg")
					}
				}, {
					type: "separator"
				}, {
					text: "\u8bbf\u95ee\u7fa4\u793e\u533a",
					onClick: function(a, b, c) {
						a = c.getArgument();
						D[a] ? (qqweb.portal.openInWebBrowser({
							url: EQQ.CONST.QQ_GROUP_URL + D[a],
							title: b.option.title
						}), qqweb.util.report2qqweb("contextmenu|group|qun")) : qqweb.rpcService.sendGetFriendUin2(a, 4, function(a) {
							qqweb.portal.openInWebBrowser({
								url: EQQ.CONST.QQ_GROUP_URL + a.result.account,
								title: b.option.title
							});
							qqweb.util.report2qqweb("contextmenu|group|qun")
						})
					}
				}, {
					text: "\u67e5\u770b\u7fa4\u8d44\u6599",
					onClick: function(a, b, c) {
						a = c.getArgument();
						a = {
							gid: EQQ.Model.BuddyList.getGroupByCode(a).gid,
							gcode: a,
							from: "groupDetail"
						};
						qqweb.portal.runApp("groupDetails", a);
						qqweb.util.report2qqweb("contextmenu|group|profile")
					}
				}, {
					text: "\u67e5\u770b\u6d88\u606f\u8bb0\u5f55",
					onClick: function(a, b, c) {
						a = c.getArgument();
						a = {
							gid: EQQ.Model.BuddyList.getGroupByCode(a).gid,
							gcode: a,
							from: "group"
						};
						qqweb.portal.runApp("chatLogViewer", a);
						qqweb.util.report2qqweb("contextmenu|group|chats")
					}
				}, {
					type: "separator"
				}, {
					text: "\u63a5\u6536\u5e76\u63d0\u793a\u7fa4\u6d88\u606f",
					argument: {
						type: "single",
						state: 0,
						flag: "single|withalert"
					},
					onClick: L
				}, {
					text: "\u63a5\u6536\u4e0d\u63d0\u793a\u7fa4\u6d88\u606f",
					argument: {
						type: "single",
						state: 1,
						flag: "single|withoutalert"
					},
					onClick: L
				}, {
					text: "\u5b8c\u5168\u963b\u6b62\u7fa4\u6d88\u606f",
					argument: {
						type: "single",
						state: 2,
						flag: "single|block"
					},
					onClick: L
				}, {
					type: "separator"
				}, {
					text: "\u521b\u5efa\u684c\u9762\u8054\u7cfb\u4eba",
					onClick: function(a, b, c) {
						a = c.getArgument();
						b = EQQ.Model.BuddyList.getGroupByCode(a).gid;
						alloy.desktopContact.addContactIcon({
							t: "gid",
							id: Number(a),
							gid: b
						});
						qqweb.util.report2qqweb("contextmenu|group|adddeskcontanct")
					}
				}, {
					text: "\u9000\u51fa\u8be5\u7fa4",
					onClick: function(a, b, c) {
						var d = c.getArgument();
						qqweb.layout.confirm("\u60a8\u771f\u7684\u8981\u9000\u51fa\u8be5\u7fa4\u5417?(\u9000\u7fa4\u901a\u77e5\u4ec5\u7ba1\u7406\u5458\u53ef\u89c1)", function() {
							qqweb.rpcService.sendQuitGroup({
								gcode: d
							});
							qqweb.util.report2qqweb("contextmenu|group|quit")
						}, {
							windowType: "EqqWindow"
						})
					}
				}],
				b = [{
					text: "\u5934\u50cf\u663e\u793a",
					type: "submenu",
					icon: {
						className: "eqq_header_switch_icon"
					},
					beforeShow: function(a) {
						Z() ? (a.getItemAt(0).setIcon({
							className: "eqq_cxmenu_check_icon"
						}), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
							className: "eqq_cxmenu_check_icon"
						}))
					},
					items: [{
						text: "\u5927\u5934\u50cf",
						onClick: function() {
							T("group", !0);
							S("group", !0);
							qqweb.util.report2qqweb("contextmenu|group|largeicon")
						}
					}, {
						text: "\u5c0f\u5934\u50cf",
						onClick: function() {
							T("group", !1);
							S("group", !1);
							qqweb.util.report2qqweb("contextmenu|group|normalicon")
						}
					}]
				}, {
					text: "\u8bbf\u95ee\u6211\u7684\u7fa4\u4e3b\u9875",
					link: EQQ.CONST.QQ_GROUP_URL,
					onClick: function(a, b) {
						a.preventDefault();
						qqweb.portal.openInWebBrowser({
							url: b.option.link,
							title: b.option.title
						});
						qqweb.util.report2qqweb("contextmenu|group|all|qun")
					}
				}, {
					type: "separator"
				}, {
					text: "\u4f7f\u7528\u7fa4\u81ea\u8eab\u7684\u6d88\u606f\u8bbe\u7f6e",
					argument: {
						type: "global",
						state: 0,
						flag: "all|self"
					},
					onClick: L
				}, {
					text: "\u6240\u6709\u7fa4\u63a5\u6536\u5e76\u63d0\u793a\u6d88\u606f",
					argument: {
						type: "global",
						state: 1,
						flag: "all|withalert"
					},
					onClick: L
				}, {
					text: "\u6240\u6709\u7fa4\u63a5\u6536\u4e0d\u63d0\u793a\u6d88\u606f",
					argument: {
						type: "global",
						state: 2,
						flag: "all|withoutalert"
					},
					onClick: L
				}, {
					text: "\u6240\u6709\u7fa4\u5b8c\u5168\u963b\u6b62\u7fa4\u6d88\u606f",
					argument: {
						type: "global",
						state: 3,
						flag: "all|block"
					},
					onClick: L
				}, {
					type: "separator"
				}, {
					text: "\u67e5\u627e\u6dfb\u52a0\u7fa4",
					link: EQQ.CONST.QQ_GROUP_URL + "search",
					onClick: function(a, b) {
						a.preventDefault();
						qqweb.portal.openInWebBrowser({
							url: b.option.link,
							title: b.option.title
						});
						qqweb.util.report2qqweb("contextmenu|group|search")
					}
				}, {
					text: "\u521b\u5efa\u4e00\u4e2a\u7fa4",
					link: EQQ.CONST.QQ_GROUP_URL + "create",
					onClick: function(a, b) {
						a.preventDefault();
						qqweb.portal.openInWebBrowser({
							url: b.option.link,
							title: b.option.title
						});
						qqweb.util.report2qqweb("contextmenu|group|create")
					}
				}],
				s = [{
					text: "\u5934\u50cf\u663e\u793a",
					type: "submenu",
					icon: {
						className: "eqq_header_switch_icon"
					},
					beforeShow: function(a) {
						$() ? (a.getItemAt(0).setIcon({
							className: "eqq_cxmenu_check_icon"
						}), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
							className: "eqq_cxmenu_check_icon"
						}))
					},
					items: [{
						text: "\u5927\u5934\u50cf",
						onClick: function() {
							T("recent", !0);
							S("recent", !0);
							qqweb.util.report2qqweb("contextmenu|recent|largeicon")
						}
					}, {
						text: "\u5c0f\u5934\u50cf",
						onClick: function() {
							T("recent", !1);
							S("recent", !1);
							qqweb.util.report2qqweb("contextmenu|recent|normalicon")
						}
					}]
				}];
			this.discuMenuConfig = [{
				text: "\u53d1\u9001\u8ba8\u8bba\u7ec4\u6d88\u606f",
				onClick: function(a, b, c) {
					a = c.getArgument();
					h.notifyObservers(g, "StartDiscuChat", a);
					alloy.util.report2im("contextmenu|dicussions|sendmsg")
				}
			}, {
				type: "separator"
			}, {
				text: "\u63a5\u6536\u5e76\u63d0\u793a\u8ba8\u8bba\u7ec4\u6d88\u606f",
				argument: {
					type: "single",
					state: 0,
					flag: "single|withalert"
				},
				onClick: function(a, b, c) {
					g.onDiscuMaskItemClick(a, b, c)
				}
			}, {
				text: "\u63a5\u6536\u4e0d\u63d0\u793a\u8ba8\u8bba\u7ec4\u6d88\u606f",
				argument: {
					type: "single",
					state: 1,
					flag: "single|withoutalert"
				},
				onClick: function(a, b, c) {
					g.onDiscuMaskItemClick(a, b, c)
				}
			}, {
				text: "\u5b8c\u5168\u963b\u6b62\u8ba8\u8bba\u7ec4\u6d88\u606f",
				argument: {
					type: "single",
					state: 2,
					flag: "single|block"
				},
				onClick: function(a, b, c) {
					g.onDiscuMaskItemClick(a, b, c)
				}
			}, {
				type: "separator"
			}, {
				text: "\u9000\u51fa\u8be5\u8ba8\u8bba\u7ec4",
				onClick: function(a, b, c) {
					var d = c.getArgument();
					qqweb.layout.confirm("\u60a8\u771f\u7684\u8981\u9000\u51fa\u8be5\u8ba8\u8bba\u7ec4\u5417?", function() {
						h.notifyObservers(EQQ, "QuitDiscu", {
							did: d
						});
						qqweb.util.report2qqweb("contextmenu|dicussions|quit")
					}, {
						windowType: "EqqWindow"
					})
				}
			}];
			this.discuGlobalMenuConfig = [{
				text: "\u5934\u50cf\u663e\u793a",
				type: "submenu",
				icon: {
					className: "eqq_header_switch_icon"
				},
				beforeShow: function(a) {
					Z() ? (a.getItemAt(0).setIcon({
						className: "eqq_cxmenu_check_icon"
					}), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
						className: "eqq_cxmenu_check_icon"
					}))
				},
				items: [{
					text: "\u5927\u5934\u50cf",
					onClick: function() {
						T("group", !0);
						S("group", !0);
						qqweb.util.report2qqweb("contextmenu|dicussions|largeicon")
					}
				}, {
					text: "\u5c0f\u5934\u50cf",
					onClick: function() {
						T("group", !1);
						S("group", !1);
						qqweb.util.report2qqweb("contextmenu|dicussions|normalicon")
					}
				}]
			}, {
				text: "\u521b\u5efa\u8ba8\u8bba\u7ec4",
				onClick: function(a) {
					a.preventDefault();
					g.onCreateDiscu(a, "contextmenu");
					alloy.util.report2im("contextmenu|dicussions|create")
				}
			}];
			this.createContextMenu = function() {
				h.addObserver(qqweb.rpcService, "sendQuitGroupSuccess", Da)
			};
			this.setUserMarkName = function(a) {
				var b = EQQ.Model.BuddyList.getBuddyByUin(a),
					d = function(a, b) {
						var fa = String(a.value);
						if (c.string.byteLength(fa, 3) > b) a.value = c.string.cutRight(fa, 1), d(a, b)
					},
					e = alloy.layout.confirm('<div style="text-align: left;margin-top: 15px;margin-left: 20px;">\u8bf7\u8f93\u5165\u5907\u6ce8\u59d3\u540d\uff1a\t\t\t\t\t\t\t\t</div><div style="text-align: left;margin-left: 20px;"><input style="width:318px;margin-top: 5px;                                height: 20px;text-align: left;float: left;" \t\t\t\t\t\t\t\tclass="confirm_markname" type="text" value="' + (b && b.markName || "") + '" /></div>', function() {
						var b = c.dom.mini(".confirm_markname", this.Window.container)[0];
						h.notifyObservers(g, "SetUserMarkName", {
							uin: a,
							markname: b.value
						})
					}, {
						title: "\u4fee\u6539\u5907\u6ce8\u59d3\u540d",
						height: 90,
						width: 365,
						modal: !1,
						windowType: "EqqWindow"
					}),
					f = c.dom.mini(".confirm_markname", e.container)[0];
				h.on(f, "keyup", function(a) {
					d(f, 24);
					a.keyCode == 13 && (h.notifyObservers(e, "clickOkButton") && setTimeout(function() {
						e.close()
					}, 0), h.off(f))
				});
				f.focus()
			};
			var ja = function(a) {
					a.preventDefault();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						items: Q
					});
					qqweb.util.report2qqweb("contextmenu|contancts|all")
				},
				ka = function(a) {
					a.preventDefault();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						width: 180,
						beforeShow: qa,
						items: b
					});
					qqweb.util.report2qqweb("contextmenu|group|all")
				},
				da = function(a) {
					a.preventDefault();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						width: 150,
						items: s
					})
				},
				M = function(a) {
					switch (EQQ.Model.BuddyList.getUserByUin(a.getArgument()).classId) {
					case EQQ.hash.userClassType.stranger:
						a.refresh();
						a.removeItemAt(6);
						a.removeItemAt(7);
						a.getItemAt(6).setText("\u4ece\u8be5\u7ec4\u5220\u9664");
						break;
					default:
						a.refresh()
					}
				},
				ea = function(a) {
					a.preventDefault();
					a.stopPropagation();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						argument: parseInt(this.getAttribute("uin")),
						items: R,
						beforeShow: M
					});
					qqweb.util.report2qqweb("contextmenu|contancts|person")
				},
				aa = function(a) {
					a.preventDefault();
					a.stopPropagation();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						argument: parseInt(this.getAttribute("uin")),
						items: R,
						beforeShow: M
					});
					qqweb.util.report2qqweb("contextmenu|recent|person")
				},
				N = function(a) {
					a.preventDefault();
					a.stopPropagation();
					var b = this.getAttribute("code");
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						argument: b,
						width: 150,
						items: O,
						beforeShow: pa
					});
					qqweb.util.report2qqweb("contextmenu|group|single")
				},
				W = function(a) {
					a.preventDefault();
					a.stopPropagation();
					var b = this.getAttribute("code");
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						argument: b,
						width: 150,
						items: O,
						beforeShow: pa
					});
					qqweb.util.report2qqweb("contextmenu|recent|single")
				},
				P = function(c) {
					c.preventDefault();
					c.stopPropagation();
					c = a.getClientXY(this);
					c = {
						x: c[0],
						y: c[1] + 28,
						offset: 0
					};
					switch (i) {
					case "single":
						alloy.layout.showContextMenu(c, {
							items: Q
						});
						qqweb.util.report2qqweb("qqpanel|contacts|tabmenu|menu");
						break;
					case "group":
						alloy.layout.showContextMenu(c, {
							width: 180,
							beforeShow: qa,
							items: b
						});
						qqweb.util.report2qqweb("qqpanel|groups|tabmenu|menu");
						break;
					case "recent":
						alloy.layout.showContextMenu(c, {
							width: 150,
							items: s
						}), qqweb.util.report2qqweb("qqpanel|recent|tabmenu|menu")
					}
				},
				la = function(b) {
					b.preventDefault();
					b = a.getClientXY(this);
					b[0] = b[0];
					b[1] -= g.statePanel ? g.statePanel.getHeight() : 176;
					ga(b);
					alloy.util.report2im("contextmenu|statechange")
				},
				Da = function(a) {
					WebqCore.api.call(["exitGroup", [a.arguments.gcode]])
				},
				pa = function(a) {
					var b = a.getArgument(),
						b = EQQ.Model.BuddyList.getGroupByCode(b),
						c = 6,
						a = [a.getItemAt(c++), a.getItemAt(c++), a.getItemAt(c++)],
						b = b.mask,
						d;
					for (d in a) a[d].option.argument.state == b ? a[d].setIcon({
						className: "eqq_cxmenu_check_icon"
					}) : a[d].setIcon(null)
				},
				qa = function(a) {
					var b = 3,
						a = [a.getItemAt(b++), a.getItemAt(b++), a.getItemAt(b++), a.getItemAt(b++)],
						b = EQQ.Model.BuddyList.getGroupMask(),
						c;
					for (c in a) a[c].option.argument.state == b ? a[c].setIcon({
						className: "eqq_cxmenu_check_icon"
					}) : a[c].setIcon(null)
				},
				S = this.setBigHead = function(a, b) {
					var c = alloy.config.configList.useBigHead;
					switch (a) {
					case "single":
						b ? c |= 1 : c &= -2;
						break;
					case "group":
						b ? (c |= 2, t || (t = !0, sa())) : c &= -3;
						break;
					case "recent":
						b ? (c |= 4, J || (J = !0, ta())) : c &= -5
					}
					EQQ.Presenter.MainPanel.saveBigHeadSetting(c)
				},
				T = function(b, c) {
					var d;
					switch (b) {
					case "single":
						d = g.EQQ_buddyListPanel;
						break;
					case "group":
						d = g.EQQ_groupListPanel;
						break;
					case "recent":
						d = g.EQQ_recentListPanel
					}
					d && (c ? a.addClass(d, "EQQ_List_BigHead") : (a.removeClass(d, "EQQ_List_BigHead"), b == "single" && ma()))
				},
				ra = function() {
					Y() ? g.ifFlexReady ? g.setFlexBigHead(!0) : a.addClass(g.EQQ_buddyListPanel, "EQQ_List_BigHead") : g.ifFlexReady ? g.setFlexBigHead(!1) : a.removeClass(g.EQQ_buddyListPanel, "EQQ_List_BigHead");
					Z() ? a.addClass(g.EQQ_groupListPanel, "EQQ_List_BigHead") : a.removeClass(g.EQQ_groupListPanel, "EQQ_List_BigHead");
					$() ? a.addClass(g.EQQ_recentListPanel, "EQQ_List_BigHead") : a.removeClass(g.EQQ_recentListPanel, "EQQ_List_BigHead")
				},
				Y = this.isBuddyListUseBigHead = function() {
					return alloy.config.configList.useBigHead & 1
				},
				Z = function() {
					return alloy.config.configList.useBigHead & 2
				},
				$ = function() {
					return alloy.config.configList.useBigHead & 4
				},
				Ea = function() {
					var a = this.getAttribute("state");
					g.setSelfState(a);
					pgvSendClick({
						hottag: "web2qq.corner.topright." + a
					})
				},
				ua = function() {
					a.setStyle(this, "backgroundColor", "#cbe7fc")
				},
				va = function() {
					a.setStyle(this, "backgroundColor", "transparent")
				},
				Fa = function() {
					a.removeClass(g.EQQ_MyState, "hover")
				},
				Ga = function() {
					a.addClass(g.EQQ_MyState, "hover")
				},
				Ha = function() {},
				wa = function(a) {
					g.toggleStatePanel(a)
				},
				ga = wa,
				Ia = function(b) {
					b.stopPropagation();
					b = a.getClientXY(g.EQQ_MyState);
					b[1] += 16;
					ga(b);
					alloy.util.report2im("personalinfo|statechange")
				},
				Ja = function() {
					var a = this.getAttribute("classIndex");
					g.toggleClass(a)
				},
				Ka = function(a) {
					a.preventDefault();
					alloy.sound.isMute() ? (alloy.sound.setMute(!1), alloy.util.report2im("personalinfo|setting|sound")) : (alloy.sound.setMute(!0), alloy.util.report2im("personalinfo|setting|mute"))
				},
				xa = function(b) {
					g.EQQ_SetSound && (b ? a.replaceClass(g.EQQ_SetSound, "statusBar_sound_open", "statusBar_sound_mute") : a.replaceClass(g.EQQ_SetSound, "statusBar_sound_mute", "statusBar_sound_open"))
				},
				U = function() {
					a.setStyle(this, "backgroundColor", "#cbe7fc")
				},
				V = function() {
					a.setStyle(this, "backgroundColor", "transparent")
				},
				ha = function() {
					var b = this.getAttribute("uin");
					if (b) {
						if (EQQ.avatarMouseoverTimer) clearTimeout(EQQ.avatarMouseoverTimer), EQQ.avatarMouseoverTimer = null;
						var c = a.getClientXY(this);
						c[0] -= 218;
						c[1] -= 5;
						g.showMiniCardPanel(b, c);
						h.notifyObservers(g, "AvatarMouseover", b)
					}
				},
				ia = function() {
					EQQ.avatarMouseoverTimer = window.setTimeout(ya, 500)
				},
				ya = function() {
					g.hideMiniCardPanel()
				},
				La = function() {
					if (EQQ.avatarMouseoverTimer) clearTimeout(EQQ.avatarMouseoverTimer), EQQ.avatarMouseoverTimer = null
				},
				Ma = function() {
					EQQ.avatarMouseoverTimer = window.setTimeout(ya, 500)
				},
				Na = function() {
					alloy.portal.runApp("userDetails", g.miniCardPanel.uin);
					pgvSendClick({
						hottag: "web2qq.minicard.contacts.more"
					});
					alloy.util.report2im("minicard|contacts|more")
				},
				Oa = function(a) {
					a.preventDefault();
					var b = this.getAttribute("href"),
						c = /\d+/,
						a = parseInt(b.match(c)[0]);
					alloy.rpcService.sendGetFriendUin2(a, 2, function(a) {
						C = a.result.account;
						alloy.portal.runApp("6", {
							url: b.replace(c, C)
						})
					});
					pgvSendClick({
						hottag: "web2qq.minicard.contacts.qzone"
					});
					alloy.util.report2im("minicard|contacts|qzone")
				},
				Pa = function(a) {
					a.preventDefault();
					var b = this.getAttribute("href"),
						c = /\d+/,
						a = parseInt(b.match(c)[0]);
					a == alloy.portal.getUin() ? alloy.portal.runApp("17", {
						url: b
					}) : alloy.rpcService.sendGetFriendUin2(a, 3, function(a) {
						C = a.result.account;
						alloy.portal.runApp("6", {
							url: b.replace(c, C)
						})
					});
					pgvSendClick({
						hottag: "web2qq.minicard.contacts.qqmail"
					});
					alloy.util.report2im("minicard|contacts|email")
				},
				Qa = function(a) {
					a.preventDefault();
					a = this.getAttribute("uin");
					h.notifyObservers(g, "AskVideo", {
						uin: a
					});
					h.notifyObservers(g, "StartChat", a)
				},
				X = function(a) {
					a.stopPropagation()
				},
				na = function(a) {
					a.preventDefault();
					a.stopPropagation();
					a = this.getAttribute("uin");
					h.notifyObservers(g, "StartChat", a)
				},
				za = function() {
					var a = this.getAttribute("code");
					h.notifyObservers(g, "StartGroupChat", a)
				},
				Ra = function(a) {
					a.preventDefault();
					a.stopPropagation();
					pgvSendClick({
						hottag: "WEB2QQ.QQPANEL.QUN.GROUPSEEK"
					});
					alloy.util.report2im("qqpanel|groups|seek");
					qqweb.portal.runApp("buddyFinder", {
						from: "group"
					})
				},
				Sa = function() {
					a.addClass(this, "EQQ_MySignature_hover")
				},
				Ta = function() {
					a.removeClass(this, "EQQ_MySignature_hover")
				},
				Ua = function(b) {
					b.preventDefault();
					if (!E) E = !0, l = g.EQQ_MySignature.value, h.on(g.EQQ_MySignature, "blur", oa), a.addClass(g.EQQ_MySignature_wraper, "EQQ_MySignature_edit"), g.EQQ_MySignature.focus(), g.EQQ_MySignature.select(), pgvSendClick({
						hottag: "web2qq.corner.topright.personalmsg"
					})
				},
				Aa = function() {
					E = !1;
					h.off(g.EQQ_MySignature, "blur", oa);
					a.removeClass(g.EQQ_MySignature_wraper, "EQQ_MySignature_edit");
					g.EQQ_MySignature.blur()
				},
				oa = function() {
					Aa();
					g.EQQ_MySignature.value == l ? g.EQQ_MySignature.title = l : (g.EQQ_MySignature.title = "\u7b7e\u540d\u66f4\u65b0\u4e2d:" + g.EQQ_MySignature.value, alloy.rpcService.sendSetSignature(g.EQQ_MySignature.value), alloy.util.report2im("personalinfo|personalmsg|personalmsgedit"))
				},
				Wa = function(a) {
					switch (a.keyCode) {
					case 13:
						oa();
						break;
					case 27:
						a.stopPropagation();
						Aa();
						g.EQQ_MySignature.title = l;
						g.EQQ_MySignature.value = l;
						break;
					default:
						Va()
					}
				},
				Va = function() {
					Ba(this, 150)
				},
				Ba = function(a, b) {
					var d = String(a.value);
					if (d.replace(/[^\x00-\xff]/g, "aaa").length > b) a.value = c.string.cutRight(d, 1), Ba(a, b)
				},
				Xa = function() {
					var a = parseInt(this.getAttribute("uin"), 10);
					a && (alloy.portal.runApp("userDetails", a), alloy.util.report2im("personalinfo|icon"))
				},
				Ya = function(a) {
					var b = a.target;
					b.tagName == "SPAN" ? b = b.parentNode : b.tagName != "A" && (b = null);
					if (b) {
						var c = b.getAttribute("appId");
						c && (a.preventDefault(), alloy.portal.runApp(c, {}), alloy.util.report2im("personalinfo|icon|" + b.getAttribute("target")))
					}
				};
			this.init = function() {
				G = [];
				n = r = m = f = !1;
				y = {};
				p = [];
				u = [];
				j = [];
				z = [];
				I = [];
				H = {};
				A = 0;
				F = q = null;
				g.ifFlexReady = !1;
				h.notifyObservers(g, "AddPObservers");
				h.addObserver(alloy.sound, "SoundMuteChange", xa);
				h.addObserver(alloy.app.eqq.window, "resize", c.bind(this.onEqqResize, this));
				c.browser.ie !== 7 && h.addObserver(alloy.app.eqq.window, "dragEnd", Ca);
				this.contactDragController = alloy.desktopManager.getDragController();
				this.EQQ_Container = a.id("EQQ_Container");
				this.EQQ_MainPanel = a.id("EQQ_MainPanel");
				this.EQQ_MyPanel = a.id("EQQ_MyPanel");
				this.EQQ_MyAvatar = a.id("EQQ_MyAvatar");
				this.EQQ_MyNick = a.id("EQQ_MyNick");
				this.EQQ_MyState = a.id("EQQ_MyState");
				this.EQQ_MyStateShow = a.id("EQQ_MyStateShow");
				this.EQQ_MySignature = a.id("EQQ_MySignature");
				this.EQQ_MySignature_wraper = a.id("EQQ_mySignature_wraper");
				this.EQQ_myService = a.id("EQQ_myService");
				this.EQQ_myInfo = a.id("EQQ_myInfo");
				var b = a.id("eqqMypanelToolbar");
				this.EQQ_MyState.title = "\u66f4\u6539\u5728\u7ebf\u72b6\u6001";
				h.on(b, "click", Ya);
				h.on(this.EQQ_MyAvatar, "mouseover", ha);
				h.on(this.EQQ_MyAvatar, "mouseout", ia);
				h.on(this.EQQ_MyAvatar, "click", Xa);
				h.on(this.EQQ_MySignature_wraper, "mouseover", Sa);
				h.on(this.EQQ_MySignature_wraper, "mouseout", Ta);
				h.on(this.EQQ_MySignature, "click", Ua);
				h.on(this.EQQ_MySignature, "keyup", Wa);
				h.off(this.EQQ_MyState, "click");
				h.on(this.EQQ_MyState, "click", Ia);
				this.EQQ_YellowTips = a.id("EQQ_YellowTips");
				h.on(this.EQQ_YellowTips, "click", this.onYellowTipsClick);
				this.EQQ_LoginSuccess = a.id("EQQ_LoginSuccess");
				this.EQQ_UseHttpsTips = a.id("EQQ_UseHttpsTips");
				this.EQQ_UseHttpsTips_Link = a.id("EQQ_UseHttpsTips_Link");
				h.on(this.EQQ_UseHttpsTips, "click", this.onUseHttpsTipsClick);
				h.on(this.EQQ_UseHttpsTips_Link, "click", this.onUseHttpsTipsLinkClick);
				this.EQQ_SearchBar = a.id("EQQ_SearchBar");
				this.EQQ_SearchBox = a.id("EQQ_SearchBox");
				this.EQQ_SearchButton = a.id("EQQ_SearchButton");
				this.EQQ_SearchResultPanel = a.id("EQQ_SearchResultPanel");
				this.EQQ_SearchResultPanel_iframeWrap = a.id("EQQ_SearchResultPanel_iframeWrap");
				h.on(this.EQQ_SearchBox, "mouseover", this.onSearchBoxMouseover);
				h.on(this.EQQ_SearchBox, "mouseout", this.onSearchBoxMouseout);
				h.on(this.EQQ_SearchBox, "focus", this.onSearchBoxFocus);
				h.on(this.EQQ_SearchBox, "blur", this.onSearchBoxBlur);
				h.on(this.EQQ_SearchBox, "keyup", this.onSearchBoxKeyup);
				h.on(this.EQQ_SearchBox, "keydown", this.onSearchBoxKeydown);
				h.on(this.EQQ_SearchBox, "click", c.bind(this.startSearch, this));
				h.on(this.EQQ_SearchButton, "click", c.bind(function() {
					if (q) g.hideSearchResult(), h.notifyObservers(g, "StartChat", q.uin), q = null, g.EQQ_SearchBox.value = "\u641c\u7d22\u597d\u53cb...", g.EQQ_SearchBox.blur(), pgvSendClick({
						hottag: "web2qq.qqpanel.searchcontacts"
					}), alloy.util.report2im("qqpanel|searchcontacts")
				}, this));
				this.EQQ_Logining = a.id("EQQ_Logining");
				this.EQQ_Logining_Container = this.EQQ_Logining.parentNode;
				this.EQQ_Logining_feedback = a.id("EQQ_Logining_feedback");
				this.EQQ_ReLoginPanel = a.id("EQQ_ReLoginPanel");
				this.EQQ_ReLoginButton = a.id("EQQ_ReLoginButton");
				this.EQQ_ReLoginButton_text = a.id("EQQ_ReLoginButton_text");
				h.on(this.EQQ_ReLoginButton, "click", this.onReLoginButtonClick);
				this.EQQ_TabBuddyList = a.id("EQQ_TabBuddyList");
				this.EQQ_TabGroupList = a.id("EQQ_TabGroupList");
				this.EQQ_TabRecentList = a.id("EQQ_TabRecentList");
				var b = a.id("EQQ_TabBuddyList_MenuIcon"),
					d = a.id("EQQ_TabGroupList_MenuIcon"),
					e = a.id("EQQ_TabRecentList_MenuIcon");
				h.on(b, "click", P);
				h.on(d, "click", P);
				h.on(e, "click", P);
				this.EQQ_ListContainer = a.id("EQQ_ListContainer");
				this.EQQ_buddyListPanel = a.id("EQQ_buddyListPanel");
				this.EQQ_buddyListPanelBottom = a.id("EQQ_buddyListPanelBottom");
				this.EQQ_groupListOuter = a.id("EQQ_groupListOuter");
				this.EQQ_groupListPanelBottom = a.id("EQQ_groupListPanelBottom");
				c.platform.iPad && new c.ui.TouchScroller(this.EQQ_buddyListPanel);
				this.EQQ_buddyList = a.id("EQQ_buddyList");
				h.on(this.EQQ_buddyList, "mousedown", X);
				h.on(this.EQQ_buddyListPanel, "scroll", ba);
				this.EQQ_createGroupButton = a.id("EQQ_createGroupButton");
				this.EQQ_searchGroupButton = a.id("EQQ_searchGroupButton");
				h.on(this.EQQ_createGroupButton, "click", alloy.util.observer.openInWebBrowser);
				h.on(this.EQQ_createGroupButton, "click", function() {
					pgvSendClick({
						hottag: "WEB2QQ.QQPANEL.QUN.CREATE"
					});
					alloy.util.report2im("qqpanel|groups|create")
				});
				h.on(this.EQQ_searchGroupButton, "click", Ra);
				this.EQQ_ListBottom_maskButton = a.id("EQQ_ListBottom_maskButton");
				h.on(this.EQQ_ListBottom_maskButton, "click", Za);
				this.EQQ_groupListPanel = a.id("EQQ_groupListPanel");
				this.EQQ_groupListInner = a.id("EQQ_groupListInner");
				c.platform.iPad && new c.ui.TouchScroller(this.EQQ_groupListInner.parentNode);
				h.on(this.EQQ_groupListInner, "mousedown", X);
				this.EQQ_groupTabGroup = a.id("EQQ_groupTabGroup");
				this.EQQ_groupTabDiscu = a.id("EQQ_groupTabDiscu");
				this.EQQ_groupBox = a.id("EQQ_groupBox");
				this.EQQ_discuBox = a.id("EQQ_discuBox");
				h.on(this.EQQ_groupTabGroup, "click", function() {
					a.addClass(g.EQQ_groupTabGroup, "seled");
					a.removeClass(g.EQQ_groupTabDiscu, "seled");
					a.show(g.EQQ_groupBox);
					a.hide(g.EQQ_discuBox);
					alloy.util.report2im("qqpanel|groups|tab")
				});
				h.on(this.EQQ_groupTabDiscu, "click", function() {
					a.removeClass(g.EQQ_groupTabGroup, "seled");
					a.addClass(g.EQQ_groupTabDiscu, "seled");
					a.hide(g.EQQ_groupBox);
					a.show(g.EQQ_discuBox);
					alloy.util.report2im("qqpanel|dicussions|tab")
				});
				this.EQQ_discuListOuter = a.id("EQQ_discuListOuter");
				this.EQQ_discuListInner = a.id("EQQ_discuListInner");
				this.EQQ_discuListPanelBottom = a.id("EQQ_discuListPanelBottom");
				this.EQQ_createDiscuButton = a.id("EQQ_createDiscuButton");
				h.on(this.EQQ_createDiscuButton, "click", this.onCreateDiscu);
				this.EQQ_discuCreate_button = a.id("EQQ_discuCreate_button");
				h.on(this.EQQ_discuCreate_button, "click", this.onCreateDiscu);
				c.platform.iPad && new c.ui.TouchScroller(this.EQQ_discuListInner.parentNode);
				this.EQQ_recentListPanel = a.id("EQQ_recentListPanel");
				c.platform.iPad && new c.ui.TouchScroller(this.EQQ_recentListPanel);
				this.EQQ_recentList = a.id("EQQ_recentList");
				h.on(this.EQQ_recentList, "mousedown", X);
				this.EQQ_findBuddy = a.id("EQQ_findBuddy");
				this.EQQ_buddyManage = a.id("EQQ_buddyManage");
				this.EQQ_messageManage = a.id("EQQ_messageManage");
				c.browser.mobileSafari && a.hide(this.EQQ_buddyManage);
				h.on(this.EQQ_findBuddy, "click", function(a) {
					a.preventDefault();
					a.stopPropagation();
					pgvSendClick({
						hottag: "WEB2QQ.QQPANEL.CONTACTS.SEEK"
					});
					alloy.util.report2im("qqpanel|contacts|seek");
					alloy.portal.runApp("buddyFinder", {})
				});
				h.on(this.EQQ_buddyManage, "click", function(a) {
					a.preventDefault();
					a.stopPropagation();
					pgvSendClick({
						hottag: "WEB2QQ.QQPANEL.CONTACTS.MANAGE"
					});
					alloy.util.report2im("qqpanel|contacts|manage");
					alloy.portal.runApp("5", {})
				});
				h.on(this.EQQ_messageManage, "click", function(a) {
					a.preventDefault();
					a.stopPropagation();
					pgvSendClick({
						hottag: "WEB2QQ.QQPANEL.CONTACTS.MSGMGR"
					});
					alloy.util.report2im("qqpanel|contacts|msgmgr");
					alloy.portal.runApp("messageManager", {})
				});
				this.mainTab = new c.ui.Tab;
				this.mainTab.add({
					trigger: this.EQQ_TabBuddyList,
					sheet: this.EQQ_buddyListPanel
				});
				this.mainTab.add({
					trigger: this.EQQ_TabGroupList,
					sheet: this.EQQ_groupListPanel
				});
				this.mainTab.add({
					trigger: this.EQQ_TabRecentList,
					sheet: this.EQQ_recentListPanel
				});
				this.mainTab.config.triggerEvent = "click";
				this.mainTab.config.slideEnabled = !1;
				this.mainTab.init();
				h.addObserver(this.mainTab, "show", function(a) {
					switch (this.indexOf(a)) {
					case 0:
						i = "single";
						pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.CONTACTS.CONTACTSLIST"
						});
						alloy.util.report2im("qqpanel|contacts|list");
						break;
					case 1:
						i = "group";
						!t && Z() && (t = !0, sa());
						pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.QUN.QUNLIST"
						});
						alloy.util.report2im("qqpanel|groups|list");
						break;
					case 2:
						i = "recent", !J && $() && (J = !0, ta()), pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.RECENT.RECENTLIST"
						}), alloy.util.report2im("qqpanel|recent|list")
					}
				});
				h.on(this.EQQ_buddyListPanel, "contextmenu", ja);
				h.on(this.EQQ_groupBox, "contextmenu", ka);
				h.on(this.EQQ_discuBox, "contextmenu", c.bind(this.onDiscuListContextMenu, this));
				h.on(this.EQQ_recentListPanel, "contextmenu", da);
				h.on(this.EQQ_buddyListPanelBottom, "contextmenu", X);
				h.on(this.EQQ_groupListPanelBottom, "contextmenu", X);
				h.on(this.EQQ_discuListPanelBottom, "contextmenu", X);
				b = alloy.taskBar.getTaskItem(50, 50);
				h.on(b.getDom(), "contextmenu", la);
				this.onEqqResize(alloy.app.eqq.window.getBodySize());
				this.onWindowResize();
				a.show(this.EQQ_MyState);
				ra();
				h.addObserver(EQQ, "eqqUacChange", ra)
			};
			this.createStatePanelDom = function() {
				var b, e = d.statePanel;
				c.browser.ie == 7 ? (b = a.node("div", {
					id: "EQQ_StatePanel",
					"class": "EQQ_statePanel_warp"
				}), e = '<ul class="EQQ_statePanel EQQ_statePanel_ul">' + e + '</ul><iframe class="ui_maskBgIframe"></iframe>') : b = a.node("ul", {
					id: "EQQ_StatePanel",
					"class": "EQQ_statePanel"
				});
				b.innerHTML = e;
				B.appendChild(b);
				this.statePanel = new alloy.layout.PopupBox({
					noCatchMouseUp: !0,
					container: b
				});
				h.addObserver(this.statePanel, "hide", Fa);
				h.addObserver(this.statePanel, "show", Ga);
				this.EQQ_SetOnline = a.id("EQQ_SetOnline");
				this.EQQ_SetCallme = a.id("EQQ_SetCallme");
				this.EQQ_SetAway = a.id("EQQ_SetAway");
				this.EQQ_SetBusy = a.id("EQQ_SetBusy");
				this.EQQ_SetSilent = a.id("EQQ_SetSilent");
				this.EQQ_SetHidden = a.id("EQQ_SetHidden");
				this.EQQ_SetOffline = a.id("EQQ_SetOffline");
				this.EQQ_SetSound = a.id("EQQ_SetSound");
				h.on(this.EQQ_SetSound, "mouseover", ua);
				h.on(this.EQQ_SetSound, "mouseout", va);
				h.on(this.EQQ_SetSound, "click", Ka);
				b = [this.EQQ_SetOnline, this.EQQ_SetCallme, this.EQQ_SetAway, this.EQQ_SetBusy, this.EQQ_SetSilent, this.EQQ_SetHidden, this.EQQ_SetOffline];
				c.array.forEach(b, function(a) {
					h.on(a, "mouseover", ua)
				});
				c.array.forEach(b, function(a) {
					h.on(a, "mouseout", va)
				});
				c.array.forEach(b, function(a) {
					h.on(a, "click", Ea)
				})
			};
			this.createGroupMaskPanelDom = function() {
				var b = a.id("groupMaskPanelMenu");
				b || (b = a.node("div", {
					"class": "groupMaskPanel",
					id: "groupMaskPanelMenu"
				}));
				B.appendChild(b);
				g.groupMaskPanel = new alloy.layout.PopupBox({
					container: b,
					html: d.groupMaskPanel
				});
				this.costomDom = a.id("GroupMask_Costom");
				this.promptDom = a.id("GroupMask_Prompt");
				this.noPromptDom = a.id("GroupMask_NoPrompt");
				this.maskDom = a.id("GroupMask_Mask");
				c.array.forEach([this.costomDom, this.promptDom, this.noPromptDom, this.maskDom], function(a) {
					h.on(a, "click", $a)
				});
				this.setGroupMaskState(v)
			};
			var $a = function(a) {
					a.preventDefault();
					v = a = parseInt(this.getAttribute("state"));
					h.notifyObservers(g, "SetGroupMaskState", a);
					switch (a) {
					case "0":
					case 0:
						pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.MESSAGESETTING.QUNSELF"
						});
						alloy.util.report2im("qqpanel|groups|msgsetting|self");
						break;
					case "1":
					case 1:
						pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHALERTS"
						});
						alloy.util.report2im("qqpanel|groups|msgsetting|withalert");
						break;
					case "2":
					case 2:
						pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.MESSAGESETTING.WIDTHOUTALERTS"
						});
						alloy.util.report2im("qqpanel|groups|msgsetting|withoutalert");
						break;
					case "3":
					case 3:
						pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.MESSAGESETTING.BLOCK"
						}), alloy.util.report2im("qqpanel|groups|msgsetting|block")
					}
				};
			this.setGroupMaskState = function(b) {
				a.removeClass(this.costomDom, "simpleMenuItemSelected");
				a.removeClass(this.promptDom, "simpleMenuItemSelected");
				a.removeClass(this.noPromptDom, "simpleMenuItemSelected");
				a.removeClass(this.maskDom, "simpleMenuItemSelected");
				b = parseInt(b);
				switch (b) {
				case 0:
					a.addClass(this.costomDom, "simpleMenuItemSelected");
					break;
				case 1:
					a.addClass(this.promptDom, "simpleMenuItemSelected");
					break;
				case 2:
					a.addClass(this.noPromptDom, "simpleMenuItemSelected");
					break;
				case 3:
					a.addClass(this.maskDom, "simpleMenuItemSelected")
				}
			};
			this.setGroupListMaskState = function(b, c) {
				var d = a.id("EQQ_GroupList_State_" + b),
					e = a.id("EQQ_RecentList_State_" + b);
				c ? (d && a.removeClass(d, "EQQ_GroupMask_State"), e && a.removeClass(e, "EQQ_GroupMask_State")) : (d && a.addClass(d, "EQQ_GroupMask_State"), e && a.addClass(e, "EQQ_GroupMask_State"))
			};
			var Za = function(b) {
					b.stopPropagation();
					alloy.util.report2im("qqpanel|groups|msgsetting");
					b = a.getClientXY(g.EQQ_ListBottom_maskButton);
					g.toggleGroupMaskStatePanel(b)
				};
			this.toggleGroupMaskStatePanel = function(a) {
				this.groupMaskPanel && this.groupMaskPanel.isShow() ? this.hideGroupMaskStatePanel() : this.showGroupMaskStatePanel(a)
			};
			this.showGroupMaskStatePanel = function(a) {
				this.groupMaskPanel || this.createGroupMaskPanelDom();
				if (a) {
					var b = this.groupMaskPanel.getWidth(),
						c = this.groupMaskPanel.getHeight(),
						d = alloy.layout.getClientWidth(),
						e = alloy.layout.getClientHeight(),
						f = a[0],
						a = a[1] - 100;
					f < 2 && (f = 2);
					a < 2 && (a = 2);
					f > d - b - 2 && (f = d - b - 2);
					a > e - c - 2 && (a = e - c - 2);
					this.groupMaskPanel.setXY(f, a)
				}
				this.groupMaskPanel.setZIndex(alloy.layout.getTopZIndex(3));
				this.groupMaskPanel.show()
			};
			this.hideGroupMaskStatePanel = function() {
				this.groupMaskPanel && this.groupMaskPanel.hide()
			};
			this.createMiniCardPanelDom = function() {
				var b = a.node("div", {
					id: "miniCard",
					"class": "panel_1"
				});
				b.innerHTML = d.miniCardPanel;
				B.appendChild(b);
				var e = a.id("miniCard_avatar"),
					f = a.id("miniCard_name_inner"),
					i = a.id("miniCard_signature"),
					j = a.id("miniCard_signature_inner"),
					m = a.id("miniCard_clientType_inner"),
					l = a.id("miniCard_clientType_innerWrapper"),
					n = a.id("miniCard_level"),
					o = a.id("miniCard_level_upinfo"),
					s = a.id("miniCard_qzone"),
					p = a.id("miniCard_qmail"),
					r = a.id("miniCard_video");
				c.platform.iPad && a.hide(r);
				var q = a.id("miniCard_userDetails");
				h.on(b, "mouseover", La);
				h.on(b, "mouseout", Ma);
				h.on(q, "click", Na);
				h.on(s, "click", Oa);
				h.on(p, "click", Pa);
				h.on(r, "click", Qa);
				this.miniCardPanel = new alloy.layout.Panel({
					container: b,
					body: a.id("miniCardBody"),
					html: ""
				});
				this.miniCardPanel.setInfo = function(b) {
					this.uin = b.uin;
					var d = b.uin == alloy.portal.getUin();
					e.src = EQQ.getUserDefaultAvatar();
					e.src = b.avatarUrl;
					d ? (q.innerHTML = "\u4fee\u6539\u8d44\u6599", e.src = alloy.util.getUserAvatar(b.uin, 1) + "&t=" + (new Date).getTime(), a.hide(r)) : (q.innerHTML = "\u8be6\u7ec6\u8d44\u6599", a.show(r));
					c.platform.iPad && a.hide(r);
					f.innerHTML = b.htmlAllName;
					f.title = b.allName;
					j.innerHTML = "";
					n.innerHTML = "";
					o.innerHTML = "";
					s.href = EQQ.getQzoneUrl(b.uin);
					p.title = b.uin == alloy.portal.getUin() ? "\u8fdb\u5165\u90ae\u7bb1" : "\u53d1\u9001\u90ae\u4ef6";
					p.href = EQQ.getSendMailUrl(b.uin);
					r.setAttribute("uin", b.uin);
					d || b.clientType == "1" || b.clientType == "10000" || b.type == "stranger" || !b.clientType ? (l.className = "miniCard_clientType_innerWrapper", i.style.display = "block") : (l.className = "miniCard_clientType_" + EQQ.hash.clientType[b.clientType || "10000"], d = EQQ.hash.clientTypeText[b.clientType || "10000"], d = EQQ.hash.clientTypeText2readableText[d] || d, m.innerHTML = d + "\u767b\u5f55\u4e2d", i.style.display = "none");
					h.notifyObservers(g, "MiniCardShow", b)
				};
				this.miniCardPanel.setSignature = function(a) {
					j.innerHTML = a.htmlSignature;
					j.title = a.signature
				};
				this.miniCardPanel.setClientType = function(a) {
					if (this.uin == a.uin) a.clientType == "1" ? (l.className = "miniCard_clientType_" + EQQ.hash.clientType[a.clientType || "10000"], m.innerHTML = EQQ.hash.clientTypeText[a.clientType || "10000"] + "\u767b\u5f55\u4e2d", i.style.display = "none") : (l.className = "miniCard_clientType_innerWrapper", i.style.display = "block")
				};
				this.miniCardPanel.setQQLevel = function(a) {
					for (var b = a.level, c = b.level, d = parseInt(c / 64), e = parseInt(c % 64 / 16), fa = parseInt(c % 64 % 16 / 4), f = c % 64 % 16 % 4, h = "", g = 0; g < d; g++) h += '<div class="miniCard_level_div qqLevel_queen"></div>';
					for (g = 0; g < e; g++) h += '<div class="miniCard_level_div qqLevel_sun"></div>';
					for (g = 0; g < fa; g++) h += '<div class="miniCard_level_div qqLevel_moon"></div>';
					for (g = 0; g < f; g++) h += '<div class="miniCard_level_div qqLevel_star"></div>';
					n.innerHTML = h;
					n.title = "\u7b49\u7ea7: " + c;
					if (a.uin == alloy.portal.getUin()) o.innerHTML = '<div class="miniCard_level_upinfo_div" title="\u6d3b\u8dc3\u5929\u6570\uff1a' + b.days + '"><span class="icon days"></span>' + b.days + '\u5929</div><div class="miniCard_level_upinfo_div" title="\u8ddd\u5347\u7ea7\u5230' + (c + 1) + "\u7ea7\u8fd8\u6709" + b.remainDays + '\u5929"><span class="icon remainDays"></span>' + b.remainDays + "\u5929</div>"
				}
			};
			this.showMiniCardPanel = function(a, b) {
				this.miniCardPanel || this.createMiniCardPanelDom();
				if (b) {
					var c = this.miniCardPanel.getWidth() + 10,
						d = this.miniCardPanel.getHeight() + 10,
						e = alloy.layout.getClientWidth(),
						f = alloy.layout.getClientHeight(),
						h = b[0],
						g = b[1];
					h < 2 && (h = 2);
					g < 2 && (g = 2);
					h > e - c - 2 && (h = e - c - 2);
					g > f - d - 2 && (g = f - d - 2);
					this.miniCardPanel.setXY(h, g)
				}
				this.miniCardPanel.setInfo(EQQ.Model.BuddyList.getUserByUin(a), a);
				this.miniCardPanel.setZIndex(alloy.layout.getTopZIndex(3));
				this.miniCardPanel.show()
			};
			this.hideMiniCardPanel = function() {
				if (this.miniCardPanel) {
					var b = a.id("miniCard_buddyOption_tabBody");
					a.setStyle(b, "display", "none");
					this.miniCardPanel.hide()
				}
			};
			this.setNoneFlashStyle = function() {
				a.addClass(this.EQQ_buddyList, "EQQ_buddyList_noneFlash")
			};
			this.getHtml = function() {
				return d.myPanel + '<div id="EQQ_MainPanel" class="EQQ_mainPanel">' + d.mainPanelHeader + c.string.template(d.mainPanelBody, {
					searchReaultPanel: d.searchReaultPanel,
					buddyListBody: d.buddyListBody
				}) + d.mainPanelFooter + "</div>"
			};
			this.createDom = function() {
				var a = this.getHtml(),
					b = alloy.app.eqq.getWindow();
				b.setHtml(a);
				b.setBg("url(" + alloy.CONST.CDN_URL + "pubapps/0/50/images/bg2.png) repeat-x #DFEEF6");
				this.createContextMenu()
			};
			this.onYellowTipsClick = function() {
				g.hideYellowTips();
				h.notifyObservers(g, "CloseYellowTipsFinish")
			};
			this.showYellowTips = function() {
				x += 20;
				this.onWindowResize();
				a.show(this.EQQ_YellowTips)
			};
			this.hideYellowTips = function() {
				a.hide(this.EQQ_YellowTips);
				x -= 20;
				this.onWindowResize()
			};
			this.onUseHttpsTipsClick = function() {
				a.hide(this);
				c.cookie.set("hideusehttpstips", 1, alloy.CONST.DOMAIN, "/", 87600)
			};
			this.onUseHttpsTipsLinkClick = function(a) {
				a.preventDefault();
				alloy.system.runApp("notifySetting")
			};
			this.showUseHttpsTips = function() {
				a.show(this.EQQ_UseHttpsTips)
			};
			this.onEqqResize = function(b) {
				var c = b.width,
					b = b.height - 50;
				b < 5 && (b = 5);
				var d = b - 5 - 92;
				a.setStyle(this.EQQ_myInfo, "width", c - 65 + "px");
				a.setStyle(this.EQQ_MyNick, "width", c - 95 + "px");
				a.setStyle(this.EQQ_myService, "width", c - 65 + "px");
				a.setStyle(this.EQQ_ListContainer, "height", d + "px");
				a.setStyle(this.EQQ_Logining_Container, "height", b - 2 + "px");
				a.setStyle(this.EQQ_ReLoginPanel, "height", b - 2 + "px");
				a.setStyle(this.EQQ_buddyListPanel, "height", d - 25 + "px");
				a.setStyle(this.EQQ_groupListOuter, "height", d - 55 + "px");
				a.setStyle(this.EQQ_discuListOuter, "height", d - 55 + "px");
				a.setStyle(this.EQQ_groupBox, "height", d - 30 + "px");
				a.setStyle(this.EQQ_discuBox, "height", d - 30 + "px");
				ma()
			};
			this.onWindowResize = function() {};
			this.onSearchBoxMouseover = function() {
				a.setClass(this, "EQQ_SearchBoxHover")
			};
			this.onSearchBoxMouseout = function() {
				a.setClass(this, "EQQ_SearchBox")
			};
			this.onSearchBoxFocus = function() {
				h.off(g.EQQ_SearchBox, "mouseover", g.onSearchBoxMouseover);
				h.off(g.EQQ_SearchBox, "mouseout", g.onSearchBoxMouseout);
				a.setClass(this, "EQQ_SearchBoxFocus");
				a.setClass(g.EQQ_SearchButton, "EQQ_SearchButton EQQ_SearchButtonHightLight");
				g.clearSearchBox(this);
				this.select();
				g.startSearch()
			};
			this.onSearchBoxBlur = function() {
				h.on(g.EQQ_SearchBox, "mouseover", g.onSearchBoxMouseover);
				h.on(g.EQQ_SearchBox, "mouseout", g.onSearchBoxMouseout);
				a.setClass(this, "EQQ_SearchBox");
				a.setClass(g.EQQ_SearchButton, "EQQ_SearchButton");
				g.resetSearchBox(this)
			};
			this.resetSearchBox = function(a) {
				if (a.value == "") a.value = "\u641c\u7d22\u597d\u53cb..."
			};
			this.clearSearchBox = function(a) {
				if (c.string.trim(a.value) == "\u641c\u7d22\u597d\u53cb...") a.value = ""
			};
			this.onSearchButtonClick = function() {
				g.startSearch()
			};
			this.onSearchBoxKeyup = function(a) {
				a.stopPropagation();
				g.EQQ_SearchBox.value ? a.keyCode != 38 && a.keyCode != 40 && g.startSearch() : g.hideSearchResult()
			};
			this.onSearchBoxKeydown = function(b) {
				switch (b.keyCode) {
				case 13:
					if (q) b.preventDefault(), g.hideSearchResult(), h.notifyObservers(g, "StartChat", q.uin), q = null, g.EQQ_SearchBox.value = "\u641c\u7d22\u597d\u53cb...", g.EQQ_SearchBox.blur(), pgvSendClick({
						hottag: "web2qq.qqpanel.searchcontacts"
					}), alloy.util.report2im("qqpanel|searchcontacts");
					break;
				case 38:
					A > 0 && (b = a.id("EQQ_SearchResultItem_" + q.uin), a.removeClass(b, "EQQ_SearchResultItemHover"), A--, q = F[A], (b = a.id("EQQ_SearchResultItem_" + q.uin)) && a.addClass(b, "EQQ_SearchResultItemHover"));
					break;
				case 40:
					A < F.length - 1 && (b = a.id("EQQ_SearchResultItem_" + q.uin), a.removeClass(b, "EQQ_SearchResultItemHover"), A++, q = F[A], (b = a.id("EQQ_SearchResultItem_" + q.uin)) && a.addClass(b, "EQQ_SearchResultItemHover"))
				}
			};
			this.startSearch = function() {
				this.clearSearchBox(this.EQQ_SearchBox);
				h.notifyObservers(this, "Search", this.EQQ_SearchBox.value)
			};
			this.showSearchResult = function(b) {
				if (this.EQQ_SearchBox.value) {
					F = b;
					var d = a.getRelativeXY(this.EQQ_SearchBox, this.EQQ_MainPanel);
					a.setStyle(this.EQQ_SearchResultPanel, "left", d[0] + "px");
					a.setStyle(this.EQQ_SearchResultPanel, "top", d[1] + 26 + "px");
					a.setStyle(this.EQQ_SearchResultPanel, "width", alloy.app.eqq.window.getBodySize().width - 5 + "px");
					a.show(this.EQQ_SearchResultPanel);
					this.EQQ_SearchResultPanel.innerHTML = "";
					if (b.length == 0) q = A = null, this.EQQ_SearchResultPanel.innerHTML = '<div class="EQQ_SearchResultNo">\u6ca1\u6709\u627e\u5230\u76f8\u5173\u597d\u53cb</div>';
					else {
						A = 0;
						q = b[0];
						for (d = 0; d < b.length; d++) {
							var e = b[d],
								f = a.node("div");
							a.setClass(f, "EQQ_SearchResultItem");
							f.id = "EQQ_SearchResultItem_" + e.uin;
							f.setAttribute("uin", e.uin);
							f.innerHTML = e.htmlAllName;
							f.title = e.allName;
							this.EQQ_SearchResultPanel.appendChild(f);
							d == 0 && a.addClass(f, "EQQ_SearchResultItemHover");
							h.on(f, "mouseover", this.onSearchResultMouseover);
							h.on(f, "mouseout", this.onSearchResultMouseout);
							h.on(f, "mousedown", this.onSearchResultClick)
						}
					}
					h.on(document, "mousedown", c.bind(this.hideSearchResult, this))
				}
			};
			this.hideSearchResult = function() {
				a.hide(this.EQQ_SearchResultPanel);
				h.off(document, "mousedown")
			};
			this.onSearchResultMouseover = function() {
				a.addClass(this, "EQQ_SearchResultItemHover")
			};
			this.onSearchResultMouseout = function() {
				a.removeClass(this, "EQQ_SearchResultItemHover")
			};
			this.onSearchResultClick = function() {
				var a = this.getAttribute("uin");
				g.hideSearchResult();
				h.notifyObservers(g, "StartChat", a);
				q = null;
				g.EQQ_SearchBox.value = "\u641c\u7d22\u597d\u53cb...";
				g.EQQ_SearchBox.blur();
				pgvSendClick({
					hottag: "web2qq.qqpanel.searchcontacts"
				});
				alloy.util.report2im("qqpanel|searchcontacts")
			};
			this.show = function() {
				a.show(this.EQQ_MainPanel)
			};
			this.hide = function() {
				a.hide(this.EQQ_MainPanel)
			};
			this.updateSelftAvatar = function() {
				var a = alloy.portal.getUin();
				this.EQQ_MyAvatar.src = alloy.util.getUserAvatar(a, 1) + "&t=" + (new Date).getTime()
			};
			this.updateSelfInfoChange = function(a) {
				this.EQQ_MyAvatar.src = alloy.util.getUserAvatar(a.uin, 1) + "&t=" + (new Date).getTime();
				this.EQQ_MyAvatar.title = "\u4fee\u6539\u8d44\u6599";
				this.EQQ_MyAvatar.setAttribute("uin", a.uin);
				this.EQQ_MyNick.innerHTML = a.htmlNick;
				this.EQQ_MyNick.title = a.titleNick + "<" + a.uiuin + ">"
			};
			this.updateSelfStateChange = function(b) {
				a.setClass(this.EQQ_MyStateShow, "EQQ_myStateShow EQQ_" + b);
				b === "offline" ? a.addClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline") : a.removeClass(this.EQQ_MyAvatar, "EQQ_myAvatar_offline")
			};
			this.updateSelfSignatureChange = function(a) {
				(l = a = a.signature) || (a = "\u70b9\u51fb\u7f16\u8f91\u7b7e\u540d");
				this.EQQ_MySignature.value = a;
				this.EQQ_MySignature.title = a
			};
			this.createBuddyClass = function(a) {
				this.addOnlineBuddyClass();
				for (var b = 0; b < a.length; b++) this.addBuddyClass(a[b]);
				this.addStrangerBuddyClass();
				this.addBlackListBuddyClass()
			};
			this.addOnlineBuddyClass = function() {
				var a = {};
				a.index = EQQ.hash.userClassType.online;
				a.name = "\u5728\u7ebf\u597d\u53cb";
				a.htmlName = c.string.toHtml(a.name);
				a.titleName = c.string.encodeHtmlSimple(a.name);
				a.count = 0;
				a.onlineCount = 0;
				a.list = {
					callme: [],
					online: [],
					away: [],
					busy: [],
					silent: [],
					offline: []
				};
				this.addBuddyClass(a)
			};
			this.addStrangerBuddyClass = function() {
				var a = {};
				a.index = EQQ.hash.userClassType.stranger;
				a.name = "\u964c\u751f\u4eba";
				a.htmlName = c.string.toHtml(a.name);
				a.titleName = c.string.encodeHtmlSimple(a.name);
				a.count = 0;
				a.onlineCount = 0;
				a.list = {
					callme: [],
					online: [],
					away: [],
					busy: [],
					silent: [],
					offline: []
				};
				this.addBuddyClass(a)
			};
			this.addBlackListBuddyClass = function() {
				var a = {};
				a.index = EQQ.hash.userClassType.blacklist;
				a.name = "\u9ed1\u540d\u5355";
				a.htmlName = c.string.toHtml(a.name);
				a.titleName = c.string.encodeHtmlSimple(a.name);
				a.count = 0;
				a.onlineCount = 0;
				a.list = {
					callme: [],
					online: [],
					away: [],
					busy: [],
					silent: [],
					offline: []
				};
				this.addBuddyClass(a)
			};
			var Ca = function(b) {
					for (var b = b.width, c = G.length; --c >= 0;) {
						var d = G[c].el = G[c].el || a.id("EQQ_Class_" + G[c].index + "_className"),
							e = G[c].len,
							f = G[c].html,
							h = G[c].html_short;
						if (b <= 200) d.innerHTML = h;
						else if (b > e + 20) d.innerHTML = f
					}
				};
			this.addBuddyClass = function(b, d) {
				var e, f;
				e = a.node("div", {
					id: "EQQ_listClassHead_" + b.index,
					classIndex: b.index
				});
				f = b.index == EQQ.hash.userClassType.online ? '\t\t\t\t\t<div class="EQQ_listClassHeadIcon">icon</div>\t\t\t\t\t<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">\t\t\t\t\t\t<div class="EQQ_Class_className" id="EQQ_Class_<%=index%>_className"><%=cut_htmlName%></div>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>]\t\t\t\t\t</div>\t\t\t\t' : '\t\t\t\t\t<div class="EQQ_listClassHeadIcon">icon</div>\t\t\t\t\t<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">\t\t\t\t\t\t<div class="EQQ_Class_className" id="EQQ_Class_<%=index%>_className"><%=cut_htmlName%>&nbsp;</div>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>/<span id="EQQ_Class_<%=index%>_Counter"><%=count%></span>]\t\t\t\t\t</div>\t\t\t\t';
				b.cut_htmlName = b.htmlName;
				if (b.caculateName) {
					var g = o.getCharWidth(b.caculateName + ("[" + b.onlineCount + "/" + (b.count || 1) + "]"), 12);
					if (g > 120) g = {
						index: b.index,
						len: g,
						html: b.cut_htmlName
					}, b.cut_htmlName = '<div class="mainpanel_limit_class_width_outer"><div class="mainpanel_limit_class_width_inner">' + b.htmlName + "</div></div>...", g.html_short = b.cut_htmlName, G.push(g)
				}
				f = c.string.template(f, b);
				e.innerHTML = f;
				d ? this.EQQ_buddyList.insertBefore(e, d) : this.EQQ_buddyList.appendChild(e);
				h.on(e, "click", Ja);
				g = a.node("div", {
					id: "EQQ_listClassBody_" + b.index,
					"class": "EQQ_listClassBody"
				});
				f = c.string.template('\t\t\t\t<div id="EQQ_Class_<%=index%>_callme" class="EQQ_callmeBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_online" class="EQQ_onlineBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_busy" class="EQQ_busyBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_away" class="EQQ_awayBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_silent" class="EQQ_silentBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_offline" class="EQQ_offlineBuddy"></div>\t\t\t', b);
				g.innerHTML = f;
				this.EQQ_buddyList.insertBefore(g, e.nextSibling);
				this.collapsedClass(b.index)
			};
			this.hideLogin = function() {
				a.hide(this.EQQ_Logining_Container);
				a.hide(this.EQQ_Logining_feedback);
				a.hide(this.EQQ_ReLoginPanel);
				a.show(this.EQQ_LoginSuccess);
				a.setStyle(this.EQQ_LoginSuccess, "height", "100%");
				var b = {
					height: alloy.app.eqq.window.getBodySize().height,
					width: alloy.app.eqq.window.getBodySize().width
				};
				this.onEqqResize(b);
				c.browser.ie !== 7 && Ca(b)
			};
			this.showLogin = function(b) {
				a.show(this.EQQ_Logining_Container);
				this.EQQ_Logining.innerHTML = b || "\u53d1\u8d77\u8fde\u63a5...";
				a.show(this.EQQ_Logining_feedback);
				a.hide(this.EQQ_ReLoginPanel);
				a.hide(this.EQQ_LoginSuccess);
				a.setStyle(this.EQQ_LoginSuccess, "height", "0px")
			};
			this.showPullData = function() {
				a.show(this.EQQ_Logining_Container);
				this.EQQ_Logining.innerHTML = "\u62c9\u53d6\u6570\u636e..."
			};
			this.clearBuddyList = function() {
				this.EQQ_buddyList.innerHTML = ""
			};
			this.createBuddyList = function(a) {
				c.timedChunk(a, this.addBuddy, this, !1, function() {
					h.notifyObservers(g, "BuddyListReady")
				})
			};
			this.getClassExpandFlag = function(a) {
				return y[a]
			};
			this.setClassExpandFlag = function(a, b) {
				return y[a] = b
			};
			this.getClassAvatarLoadFlag = function(a) {
				return H[a]
			};
			this.setClassAvatarLoadFlag = function(a, b) {
				return H[a] = b
			};
			this.toggleClass = function(a) {
				y[a] ? this.collapsedClass(a) : this.expandClass(a)
			};
			this.collapsedClass = function(b) {
				var c = a.id("EQQ_listClassHead_" + b),
					d = a.id("EQQ_listClassBody_" + b);
				b == EQQ.hash.userClassType.online ? (a.setClass(c, "EQQ_onlineClassHeadCollapsed"), a.removeClass(c, "expand_online")) : (a.setClass(c, "EQQ_listClassHeadCollapsed"), a.removeClass(c, "expand"));
				a.setStyle(d, "height", "0");
				this.setClassExpandFlag(b, !1)
			};
			this.expandClass = function(b) {
				var d = a.id("EQQ_listClassHead_" + b),
					e = a.id("EQQ_listClassBody_" + b);
				b == EQQ.hash.userClassType.online ? (a.setClass(d, "EQQ_onlineClassHeadExpand"), a.addClass(d, "expand_online")) : (a.setClass(d, "EQQ_listClassHeadExpand"), a.addClass(d, "expand"));
				a.setStyle(e, "height", "auto");
				this.setClassExpandFlag(b, !0);
				c.out("index: " + b);
				ca()
			};
			var ca = this.loadBuddyListAvatar = function() {
					for (var b = g.EQQ_buddyListPanel, d = parseInt(a.getStyle(b, "height"), 10), b = a.getXY(b)[1], e = 0; e < p.length;) {
						var f = p[e],
							h = f.imgEl,
							i = f.classId,
							j = a.getXY(h)[1] - b;
						g.getClassExpandFlag(i) && h && j > 0 && j < d ? (c.out("checkAndLoadAvatar & loadAvatar containerHeight: " + d + ", imgTop2:" + j), h.src = EQQ.getUserAvatar(f.uin), p.splice(e, 1)) : e++
					}
					if (Y()) {
						b = g.EQQ_buddyListPanel;
						d = parseInt(a.getStyle(b, "height"), 10);
						b = a.getXY(b)[1];
						for (e = 0; e < u.length;) i = u[e], f = i.el, h = i.uin, i = i.classId, j = a.getXY(f)[1] - b, g.getClassExpandFlag(i) && f && j > 0 && j < d ? (f.hasSign || EQQ.Model.BuddyList.getUserSignature(h), u.splice(e, 1)) : e++
					}
				},
				ba = function() {
					ma()
				},
				ma = function() {
					if (ba.timer) window.clearTimeout(ba.timer), ba.timer = null;
					ba.timer = window.setTimeout(ca, 500)
				},
				sa = function() {
					for (var a = [], b; b = j.shift();) {
						var c = b.gcode;
						b.el.hasSign || a.push(c)
					}
					a.length && EQQ.Model.BuddyList.getMultiGroupAnnounce(a)
				},
				ta = function() {
					for (var a = [], b; b = z.shift();) {
						var c = b.el;
						b = b.uin;
						c.hasSign || a.push(b)
					}
					a.length && EQQ.Model.BuddyList.getMultiUserSignture(a);
					for (a = []; b = I.shift();) c = b.el, b = b.gcode, c.hasSign || a.push(b);
					a.length && EQQ.Model.BuddyList.getMultiGroupAnnounce(a)
				};
			this.addBuddy = function(b) {
				if (b) {
					var d = EQQ.hash.clientTypeText[b.clientType] || "PC",
						e = c.string.template('\t\t\t\t\t<div class="EQQ_BuddyList_ClientType" uin="<%=uin%>" id="EQQ_BuddyList_ClientType_Title_<%=uin%>" title="' + EQQ.hash.clientTypeText[b.clientType || "PC"] + '">\t\t\t\t\t\t<div id="EQQ_BuddyList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_' + EQQ.hash.clientType[b.clientType || "10000"] + '"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id="EQQ_BuddyList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="' + EQQ.hash.onlineStatusText[b.state] + '">\t\t\t\t\t\t<img id="EQQ_BuddyList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="' + alloy.CONST.CDN_URL + 'style/images/avatar_default_20_20.gif" />\t\t\t\t\t\t<div class="EQQ_BuddyList_State"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id="EQQ_BuddyList_RightContainer_<%=uin%>" class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - ' + (d === "PC" ? "" : d) + EQQ.hash.onlineStatusText[b.state] + '">\t\t\t\t\t\t<div id="EQQ_BuddyList_Nick_<%=uin%>"  class="EQQ_BuddyList_Nick <%=vip?"EQQ_Vip_Nick":""%>"><%=htmlShowName%></div>\t\t\t\t\t\t<div id="EQQ_BuddyList_Sign_<%=uin%>" title="" class="EQQ_BuddyList_Sign"></div>\t\t\t\t\t</div>\t\t\t\t', b),
						f = a.id("EQQ_Class_" + b.classId + "_" + b.state);
					a.show(f);
					d = a.node("div", {
						id: "EQQ_Buddy_" + b.uin,
						"class": "EQQ_BuddyList_Buddy",
						uin: b.uin,
						fileId: b.uin,
						uid: "buddy_uin_" + b.uin,
						from: "buddy",
						type: "uin"
					});
					d.innerHTML = e;
					f.appendChild(d);
					h.on(d, "mouseover", U);
					h.on(d, "mouseout", V);
					h.on(d, "click", function(a) {
						na.apply(this, [a]);
						pgvSendClick({
							hottag: "web2qq.qqpanel.contacts.sendmsg"
						});
						alloy.util.report2im("qqpanel|contacts|sendmsg")
					});
					h.on(d, "contextmenu", ea);
					e = a.id("EQQ_BuddyList_AvatarContainer_" + b.uin);
					h.on(e, "mouseover", ha);
					h.on(e, "mouseout", ia);
					c.platform.iPad || g.contactDragController.addDragClass(d);
					d = a.id("EQQ_BuddyList_Avatar_" + b.uin);
					this.getClassExpandFlag(b.classId) ? (c.out("addBuddy & loadAvatar"), d.src = EQQ.getUserAvatar(b.uin)) : p.push({
						uin: b.uin,
						imgEl: d,
						classId: b.classId
					});
					Y() && this.getClassExpandFlag(b.classId) ? EQQ.Model.BuddyList.getUserSignature(b.uin) : (d = a.id("EQQ_BuddyList_Sign_" + b.uin), u.push({
						uin: b.uin,
						el: d,
						classId: b.classId
					}))
				}
			};
			this.removeBuddyConfirm = function(a) {
				var b = '            <div style="margin-left: 20px;">            <div style="text-align: left;">\u60a8\u786e\u5b9a\u8981\u5220\u9664\u4ee5\u4e0b\u8054\u7cfb\u4eba\u5417\uff1f            </div>            <img class="confirm_avatar" style="cursor: pointer;float:left;" title="' + a.htmlAllName + '"src="' + a.avatarUrl + '" />            <span style="float:left;margin-left:10px;"><a class="confirm_htmlAllName" href="#" onclick="return false;">' + a.htmlAllName + '</a></span>            <div style="text-align: left;clear:both;line-height:30px;">            <input style="margin-right:5px;margin-top:10px;*margin-top:5px;display:block;float:left;" type="checkbox" class="confirm_remove_select" />            <span style="cursor: pointer;height:12px;line-height:12px;*height:14px;*line-height:14px;margin-top:10px;float: left;display: block;"             class="confirm_select">\u5c06\u6211\u4ece\u5bf9\u65b9\u7684\u5217\u8868\u4e2d\u5220\u9664</span></div>            </div>';
				a.classId == EQQ.hash.userClassType.stranger && (b = '            <div style="margin-left: 20px;">            <div style="text-align: left;">\u60a8\u786e\u5b9a\u8981\u5220\u9664\u6b64\u8054\u7cfb\u4eba\uff0c\u540c\u65f6\u5c06\u81ea\u5df1\u4ece\u5bf9\u65b9\u5217\u8868\u5220\u9664\u5417\uff1f            </div>            <img class="confirm_avatar" style="cursor: pointer;float:left;" title="' + a.htmlAllName + '"src="' + a.avatarUrl + '" />            <span style="float:left;margin-left:10px;"><a class="confirm_htmlAllName" href="#" onclick="return false;">' + a.htmlAllName + '</a></span>            <div style="text-align: left;clear:both;line-height:30px;">            <input style="display:none;" type="checkbox" checked="checked" class="confirm_remove_select" />            <span style="display:none;" class="confirm_select">\u5c06\u6211\u4ece\u5bf9\u65b9\u7684\u5217\u8868\u4e2d\u5220\u9664</span></div>            </div>');
				var d = alloy.layout.confirm(b, function() {
					var b = c.dom.mini(".confirm_remove_select", this.Window.container)[0];
					h.notifyObservers(g, "RemoveBuddy", {
						uin: a.uin,
						check: b.checked
					})
				}, {
					title: "\u5220\u9664\u597d\u53cb",
					height: 100,
					width: 365,
					modal: !1,
					level: 0,
					windowType: "EqqWindow"
				});
				h.eventProxy(d.container, {
					".confirm_select click": function() {
						var a = c.dom.mini(".confirm_remove_select", d.container)[0];
						if (a) a.checked = a.checked ? !1 : !0
					},
					".confirm_htmlAllName,.confirm_avatar click": function() {
						alloy.portal.runApp("userDetails", a.uin)
					}
				})
			};
			this.removeBuddy = function(b) {
				var c = a.id("EQQ_Buddy_" + b);
				if (c) {
					h.off(c, "mouseover");
					h.off(c, "mouseout");
					h.off(c, "click");
					h.off(c, "contextmenu");
					if (b = a.id("EQQ_BuddyList_AvatarContainer_" + b)) h.off(b, "mouseover"), h.off(b, "mouseout");
					c.parentNode && c.parentNode.removeChild(c);
					return !0
				} else return !1
			};
			this.addOnlineBuddy = function(b) {
				if (b) {
					var d = c.string.template('\t\t\t\t\t<div class="EQQ_BuddyList_ClientType" uin="<%=uin%>" id="EQQ_OnlineBuddyList_ClientType_Title_<%=uin%>" title="' + EQQ.hash.clientTypeText[b.clientType] + '">\t\t\t\t\t\t<div id="EQQ_OnlineBuddyList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_' + EQQ.hash.clientType[b.clientType || "10000"] + '"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id="EQQ_OnlineBuddyList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="' + EQQ.hash.onlineStatusText[b.state] + '">\t\t\t\t\t\t<img id="EQQ_OnlineBuddyList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="' + alloy.CONST.CDN_URL + 'style/images/avatar_default_20_20.gif" />\t\t\t\t\t\t<div class="EQQ_BuddyList_State"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - ' + (EQQ.hash.clientTypeText[b.clientType || "pc"] === "PC" ? "" : EQQ.hash.clientTypeText[b.clientType || "pc"]) + EQQ.hash.onlineStatusText[b.state] + '">\t\t\t\t\t\t<div class="EQQ_BuddyList_Nick <%=vip?"EQQ_Vip_Nick":""%>" ><%=htmlShowName%></div>                        <div id="EQQ_OnlineBuddyList_Sign_<%=uin%>" title="" class="EQQ_BuddyList_Sign"></div>\t\t\t\t\t</div>\t\t\t\t', b),
						e = a.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_" + b.state);
					a.setStyle(e, "display", "block");
					var f = a.node("div", {
						id: "EQQ_OnlineBuddy_" + b.uin,
						uin: b.uin,
						fileId: b.uin,
						uid: "online_uin_" + b.uin,
						from: "buddy",
						type: "uin"
					});
					f.innerHTML = d;
					e.appendChild(f);
					h.on(f, "mouseover", U);
					h.on(f, "mouseout", V);
					h.on(f, "click", function(a) {
						na.apply(this, [a]);
						pgvSendClick({
							hottag: "web2qq.qqpanel.contacts.sendmsg"
						});
						alloy.util.report2im("qqpanel|contacts|sendmsg")
					});
					h.on(f, "contextmenu", ea);
					a.addClass(f, "EQQ_BuddyList_Buddy");
					d = a.id("EQQ_OnlineBuddyList_AvatarContainer_" + b.uin);
					h.on(d, "mouseover", ha);
					h.on(d, "mouseout", ia);
					c.platform.iPad || g.contactDragController.addDragClass(f);
					d = a.id("EQQ_OnlineBuddyList_Avatar_" + b.uin);
					f = EQQ.hash.userClassType.online;
					this.getClassExpandFlag(f) ? (c.out("addOnlineBuddy & loadAvatar"), d.src = EQQ.getUserAvatar(b.uin)) : p.push({
						uin: b.uin,
						imgEl: d,
						classId: f
					});
					Y() && this.getClassExpandFlag(f) ? EQQ.Model.BuddyList.getUserSignature(b.uin) : (d = a.id("EQQ_OnlineBuddyList_Sign_" + b.uin), u.push({
						uin: b.uin,
						el: d,
						classId: f
					}))
				}
				ca()
			};
			this.removeOnlineBuddy = function(b) {
				var c = a.id("EQQ_OnlineBuddy_" + b.uin);
				if (c) {
					h.off(c, "mouseover");
					h.off(c, "mouseout");
					h.off(c, "click");
					h.off(c, "contextmenu");
					if (b = a.id("EQQ_OnlineBuddyList_AvatarContainer_" + b.uin)) h.off(b, "mouseover"), h.off(b, "mouseout");
					c.parentNode && c.parentNode.removeChild(c);
					return !0
				} else return !1
			};
			this.updateOnlineBuddyClass = function(b) {
				b = b.length;
				a.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_OnlineCounter").innerHTML = b
			};
			this.updateBuddySignature = function(b) {
				if (b) {
					var c = a.id("EQQ_OnlineBuddyList_Sign_" + b.uin),
						d = a.id("EQQ_BuddyList_Sign_" + b.uin),
						e = a.id("EQQ_RecentList_Sign_" + b.uin);
					if (c && !c.hasSign) c.innerHTML = b.htmlSignature, c.title = b.titleSignature, c.hasSign = !0;
					if (d && !d.hasSign) d.innerHTML = b.htmlSignature, d.title = b.titleSignature, d.hasSign = !0;
					if (e && !e.hasSign) e.innerHTML = b.htmlSignature, e.title = b.titleSignature, e.hasSign = !0
				}
			};
			this.updateGroupAnnouncement = function(b) {
				var c = a.id("EQQ_GroupList_Bulletin_" + b.gid),
					d = a.id("EQQ_GroupRecentList_Bulletin_" + b.gid);
				if (c && !c.hasSign) c.innerHTML = b.htmlAnnouncement, c.title = b.titleAnnouncement, c.hasSign = !0;
				if (d && !d.hasSign) d.innerHTML = b.htmlAnnouncement, d.title = b.titleAnnouncement, d.hasSign = !0
			};
			this.jumpUp = function(b) {
				f = !0;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Buddy_" + b[c]);
					d && a.addClass(d, "EQQ_jumpUpInBuddyList")
				}
			};
			this.jumpDown = function(b) {
				f = !1;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Buddy_" + b[c]);
					d && a.removeClass(d, "EQQ_jumpUpInBuddyList")
				}
			};
			this.jumpAvatar = function(a) {
				f ? this.jumpDown(a) : this.jumpUp(a)
			};
			this.flickerClassHide = function(b) {
				n = !0;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_listClassHead_" + b[c]);
					a.addClass(d, "EQQ_flickerHideInBuddyList")
				}
			};
			this.flickerClassShow = function(b, c) {
				c || (n = !1);
				for (var d = 0; d < b.length; d++) {
					var e = a.id("EQQ_listClassHead_" + b[d]);
					a.removeClass(e, "EQQ_flickerHideInBuddyList")
				}
			};
			this.flickerClass = function(a) {
				n ? this.flickerClassShow(a) : this.flickerClassHide(a)
			};
			this.groupJumpUp = function(b) {
				m = !0;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Group_" + b[c]);
					d && a.addClass(d, "EQQ_jumpUpInGroupList")
				}
			};
			this.groupJumpDown = function(b) {
				m = !1;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Group_" + b[c]);
					d && a.removeClass(d, "EQQ_jumpUpInGroupList")
				}
			};
			this.groupJumpAvatar = function(a) {
				m ? this.groupJumpDown(a) : this.groupJumpUp(a)
			};
			this.recentJumpUp = function(b) {
				r = !0;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Recent_" + b[c]);
					d && (a.addClass(d, "EQQ_jumpUpInBuddyList"), a.addClass(d, "EQQ_jumpUpInGroupList"))
				}
			};
			this.recentJumpDown = function(b) {
				r = !1;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Recent_" + b[c]);
					d && (a.removeClass(d, "EQQ_jumpUpInBuddyList"), a.removeClass(d, "EQQ_jumpUpInGroupList"))
				}
			};
			this.recentJumpAvatar = function(a) {
				r ? this.recentJumpDown(a) : this.recentJumpUp(a)
			};
			this.moveBuddy = function(b) {
				var c = a.id("EQQ_Buddy_" + b.uin),
					d = a.id("EQQ_Class_" + b.classId + "_" + b.state);
				if (d && c) {
					a.setStyle(d, "display", "block");
					var e = c.parentNode;
					d.insertBefore(c, d.firstChild);
					var c = a.id("EQQ_BuddyList_AvatarContainer_" + b.uin),
						d = a.id("EQQ_BuddyList_RightContainer_" + b.uin),
						f = a.id("EQQ_RecentList_AvatarContainer_" + b.uin),
						h = a.id("EQQ_RecentList_RightContainer_" + b.uin),
						g = EQQ.hash.clientTypeText[b.clientType] || "PC",
						g = g === "PC" ? "" : g;
					if (c) c.title = EQQ.hash.onlineStatusText[b.state];
					if (d) d.title = b.allName + " - " + g + EQQ.hash.onlineStatusText[b.state];
					if (f) f.title = EQQ.hash.onlineStatusText[b.state];
					if (h) h.title = b.allName + " - " + g + EQQ.hash.onlineStatusText[b.state];
					e.childNodes.length == 0 && a.setStyle(e, "display", "none")
				}
				ca()
			};
			this.moveOnlineBuddy = function(b) {
				var c = a.id("EQQ_OnlineBuddy_" + b.uin);
				if ((b = a.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_" + b.state)) && c) {
					a.setStyle(b, "display", "block");
					var d = c.parentNode;
					b.insertBefore(c, b.firstChild);
					d.childNodes.length == 0 && a.setStyle(d, "display", "none")
				}
				ca()
			};
			this.updateClientType = function(b) {
				var c = EQQ.hash.clientType[b.clientType],
					d = EQQ.hash.clientTypeText[b.clientType] || "PC",
					e = a.id("EQQ_BuddyList_ClientType_" + b.uin) || {},
					f = a.id("EQQ_BuddyList_ClientType_Title_" + b.uin) || {};
				e.className = "EQQ_BuddyList_ClientType_" + c;
				f.title = d;
				e = a.id("EQQ_OnlineBuddyList_ClientType_" + b.uin) || {};
				f = a.id("EQQ_OnlineBuddyList_ClientType_Title_" + b.uin) || {};
				e.className = "EQQ_BuddyList_ClientType_" + c;
				f.title = d
			};
			this.updateBuddyClassOnlineBuddy = function(b) {
				a.id("EQQ_Class_" + b.index + "_OnlineCounter").innerHTML = b.onlineCount
			};
			this.updateRecentState = function(b) {
				var c = a.id("EQQ_Recent_" + b.uin);
				if (c) {
					c.className = "";
					a.addClass(c, "EQQ_BuddyList_Buddy");
					a.addClass(c, "EQQ_" + EQQ.hash.onlineStatus[b.state] + "Buddy");
					var c = EQQ.hash.clientType[b.clientType],
						d = EQQ.hash.clientTypeText[b.clientType] || "PC",
						e = a.id("EQQ_RecentList_ClientType_" + b.uin) || {},
						b = a.id("EQQ_RecentList_ClientType_Title_" + b.uin) || {};
					e.className = "EQQ_BuddyList_ClientType_" + c;
					b.title = d
				}
			};
			this.updateBuddyClassCount = function(b) {
				a.id("EQQ_Class_" + b.index + "_Counter").innerHTML = b.count
			};
			this.updateStrangerClassOnlineCount = function(b) {
				a.id("EQQ_Class_" + EQQ.hash.userClassType.stranger + "_OnlineCounter").innerHTML = b
			};
			this.updateStrangerClassCount = function(b) {
				b = b.length;
				a.id("EQQ_Class_" + EQQ.hash.userClassType.stranger + "_Counter").innerHTML = b
			};
			this.setUserName = function(b) {
				var c = b.uin,
					d = a.id("EQQ_BuddyList_Nick_" + c),
					e = a.id("EQQ_BuddyList_RightContainer_" + c),
					f = a.id("EQQ_OnlineBuddy_" + c),
					c = a.id("EQQ_RecentList_Nick_" + c);
				if (d && e) d.innerHTML = b.htmlShowName, e.title = b.allName;
				if (f && (d = a.mini(".EQQ_BuddyList_Nick", f)[0])) d.innerHTML = b.htmlShowName;
				if (c) c.innerHTML = b.htmlShowName, c.title = b.allName
			};
			this.setGroupMask = function(b) {
				v = b;
				switch (b) {
				case "0":
				case 0:
					a.id("EQQ_ListBottom_maskButton").className = "accept";
					a.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
					break;
				case "1":
				case 1:
					a.id("EQQ_ListBottom_maskButton").className = "accept";
					a.id("EQQ_ListBottom_maskButton").childNodes[0].className = "accept_div";
					break;
				case "2":
				case 2:
					a.id("EQQ_ListBottom_maskButton").className = "mask";
					a.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div";
					break;
				case "3":
				case 3:
					a.id("EQQ_ListBottom_maskButton").className = "mask", a.id("EQQ_ListBottom_maskButton").childNodes[0].className = "mask_div"
				}
				g.groupMaskPanel && g.setGroupMaskState(v)
			};
			this.showReLoginPanel = function(b) {
				this.EQQ_ReLoginButton_text.innerHTML = b;
				a.hide(this.EQQ_Logining_Container);
				a.hide(this.EQQ_Logining_feedback);
				a.show(this.EQQ_ReLoginPanel);
				a.hide(this.EQQ_LoginSuccess)
			};
			this.onReLoginButtonClick = function() {
				a.show(g.EQQ_Logining_Container);
				a.show(g.EQQ_Logining_feedback);
				a.hide(g.EQQ_ReLoginPanel);
				a.hide(g.EQQ_LoginSuccess);
				h.notifyObservers(g, "ReLogin")
			};
			this.createGroupList = function(a) {
				this.EQQ_groupListInner.innerHTML = "";
				for (var b = 0; b < a.length; b++) this.addGroup(a[b])
			};
			this.addGroup = function(b) {
				var d = '\t\t\t\t<div class="EQQ_GroupList_AvatarContainer" title="">\t\t\t\t\t<img id="EQQ_GroupList_Avatar_' + b.gid + '" class="EQQ_GroupList_Avatar" src="' + EQQ.getGroupAvatar(b.code) + '" />\t\t\t\t\t<div class="EQQ_GroupList_State" id="EQQ_GroupList_State_' + b.gid + '" title="\u7fa4\u5c4f\u853d"></div>\t\t\t\t</div>\t\t\t\t<div class="EQQ_GroupList_RightContainer">\t\t\t\t\t<div id="EQQ_GroupList_Name_' + b.gid + '"  title="<%=titleAllName%> - <%=titleTypeText%>" class="EQQ_GroupList_Name"><%=htmlShowName%></div>\t\t\t\t\t<div id="EQQ_GroupList_Bulletin_' + b.gid + '" title="" class="EQQ_GroupList_Bulletin"></div>\t\t\t\t</div>\t\t\t',
					d = c.string.template(d, b),
					e = a.node("div", {
						id: "EQQ_Group_" + b.gid,
						code: b.code,
						gid: b.gid,
						fileId: b.code,
						uid: "group_gid_" + b.code,
						from: "buddy",
						type: "gid"
					});
				e.innerHTML = d;
				this.EQQ_groupListInner.appendChild(e);
				c.platform.iPad || g.contactDragController.addDragClass(e);
				h.on(e, "mouseover", U);
				h.on(e, "mouseout", V);
				h.on(e, "click", function(a) {
					za.apply(this, [a]);
					pgvSendClick({
						hottag: "web2qq.qqpanel.qun.sendmsg"
					});
					alloy.util.report2im("qqpanel|groups|sendmsg")
				});
				h.on(e, "contextmenu", N);
				a.addClass(e, "EQQ_GroupList_Group");
				i === "group" && Z() ? EQQ.Model.BuddyList.getGroupAnnouncement(b.code) : (d = a.id("EQQ_GroupList_Bulletin_" + b.gid), j.push({
					gcode: b.code,
					el: d
				}))
			};
			this.updateGroupMarkName = function(b) {
				var c = a.id("EQQ_GroupList_Name_" + b.gid);
				if (c) c.innerHTML = b.htmlShowName;
				if (c = a.id("EQQ_GroupRecentList_Name_" + b.gid)) c.innerHTML = b.htmlShowName
			};
			this.addDiscu = function(a) {
				a = this.getNewNode(a);
				this.EQQ_discuListInner.appendChild(a);
				h.on(a, "mouseover", U);
				h.on(a, "mouseout", V);
				h.on(a, "click", function() {
					g.onDiscuListClick(this)
				});
				h.on(a, "contextmenu", function(a) {
					var b = this.getAttribute("did");
					g.onDiscuContextMenu(a, b)
				});
				this.hideReloadDiscuList();
				this.hideCreatePanel()
			};
			this.createDiscuList = function(a) {
				this.EQQ_discuListInner.innerHTML = "";
				a.length == 0 && this.showCreatePanel();
				for (var b in a) this.addDiscu(a[b])
			};
			this.createRecentList = function(a) {
				this.EQQ_recentList.innerHTML = "";
				for (var b = 0; b < a.length; b++) this.addRecent(a[b])
			};
			this.addRecent = function(b) {
				if (b.content) if (b.type == 0) {
					var b = b.content,
						d = a.id("EQQ_Recent_" + b.uin);
					if (d) return !1;
					var d = EQQ.hash.clientTypeText[b.clientType] || "PC",
						d = c.string.template('\t\t\t\t\t\t<div class="EQQ_RecentList_ClientType" uin="<%=uin%>" id="EQQ_RecentList_ClientType_Title_<%=uin%>" title="' + EQQ.hash.clientTypeText[b.clientType || "PC"] + '">\t\t\t\t\t\t\t<div id="EQQ_RecentList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_' + EQQ.hash.clientType[b.clientType || "10000"] + '"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="EQQ_RecentList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="' + EQQ.hash.onlineStatusText[b.state] + '">\t\t\t\t\t\t\t<img id="EQQ_RecentList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="' + alloy.CONST.CDN_URL + 'style/images/avatar_default_20_20.gif" />\t\t\t\t\t\t\t<div class="EQQ_BuddyList_State"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="EQQ_RecentList_RightContainer_<%=uin%>" class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - ' + (d === "PC" ? "" : d) + EQQ.hash.onlineStatusText[b.state] + '">\t\t\t\t\t\t\t<div id="EQQ_RecentList_Nick_<%=uin%>" class="EQQ_BuddyList_Nick <%=vip?"EQQ_Vip_Nick":""%>" ><%=htmlShowName%></div>                            <div id="EQQ_RecentList_Sign_<%=uin%>" title="" class="EQQ_BuddyList_Sign"></div>\t\t\t\t\t\t</div>\t\t\t\t\t', b),
						e = a.node("div", {
							id: "EQQ_Recent_" + b.uin,
							uin: b.uin,
							uin: b.uin,
							fileId: b.uin,
							uid: "recent_uin_" + b.uin,
							from: "buddy",
							type: "uin"
						});
					e.innerHTML = d;
					this.EQQ_recentList.insertBefore(e, this.EQQ_recentList.firstChild);
					h.on(e, "mouseover", U);
					h.on(e, "mouseout", V);
					h.on(e, "click", function(a) {
						na.apply(this, [a]);
						pgvSendClick({
							hottag: "web2qq.qqpanel.recent.sendC2Cmsg"
						});
						alloy.util.report2im("qqpanel|recent|sendC2Cmsg")
					});
					h.on(e, "contextmenu", aa);
					c.platform.iPad || g.contactDragController.addDragClass(e);
					d = a.id("EQQ_RecentList_AvatarContainer_" + b.uin);
					h.on(d, "mouseover", ha);
					h.on(d, "mouseout", ia);
					a.addClass(e, "EQQ_BuddyList_Buddy");
					a.addClass(e, "EQQ_" + EQQ.hash.onlineStatus[b.state] + "Buddy");
					d = a.id("EQQ_RecentList_Avatar_" + b.uin);
					if (b.uin && d) d.src = EQQ.getUserAvatar(b.uin);
					i === "recent" && $() ? EQQ.Model.BuddyList.getUserSignature(b.uin) : (d = a.id("EQQ_RecentList_Sign_" + b.uin), z.push({
						uin: b.uin,
						el: d
					}))
				} else if (b.type == 1) {
					b = b.content;
					if (d = a.id("EQQ_Recent_" + b.gid)) return !1;
					d = '\t\t\t\t\t<div class="EQQ_GroupList_AvatarContainer" title="">\t\t\t\t\t\t<img id="EQQ_GroupList_Avatar_' + b.gid + '" class="EQQ_GroupList_Avatar" src="' + EQQ.getGroupAvatar(b.code) + '" />\t\t\t\t\t\t<div class="EQQ_GroupList_State" id="EQQ_RecentList_State_' + b.gid + '" title="\u7fa4\u5c4f\u853d"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="EQQ_GroupList_RightContainer" title="<%=titleAllName%> - <%=titleTypeText%>">\t\t\t\t\t\t<div id="EQQ_GroupRecentList_Name_' + b.gid + '" class="EQQ_GroupList_Name"><%=htmlShowName%></div>                        <div id="EQQ_GroupRecentList_Bulletin_' + b.gid + '" title="" class="EQQ_GroupList_Bulletin"></div>\t\t\t\t\t</div>\t\t\t\t';
					d = c.string.template(d, b);
					e = a.node("div", {
						id: "EQQ_Recent_" + b.gid,
						code: b.code,
						gid: b.gid,
						fileId: b.code,
						uid: "recent_gid_" + b.code,
						from: "buddy",
						type: "gid"
					});
					e.innerHTML = d;
					this.EQQ_recentList.insertBefore(e, this.EQQ_recentList.firstChild);
					c.platform.iPad || g.contactDragController.addDragClass(e);
					h.on(e, "mouseover", U);
					h.on(e, "mouseout", V);
					h.on(e, "click", function(a) {
						za.apply(this, [a]);
						pgvSendClick({
							hottag: "web2qq.qqpanel.recent.sendqunmsg"
						});
						alloy.util.report2im("qqpanel|recent|sendgroupsmsg")
					});
					h.on(e, "contextmenu", W);
					a.addClass(e, "EQQ_GroupList_Group");
					i === "recent" && $() ? EQQ.Model.BuddyList.getGroupAnnouncement(b.code) : (d = a.id("EQQ_GroupRecentList_Bulletin_" + b.gid), I.push({
						gcode: b.code,
						el: d
					}))
				} else if (b.type == 2) {
					b = b.content;
					if (d = a.id("EQQ_Recent_" + b.did)) return !1;
					b = this.getNewNode(b, !0);
					this.EQQ_recentList.insertBefore(b, this.EQQ_recentList.firstChild);
					h.on(b, "mouseover", U);
					h.on(b, "mouseout", V);
					h.on(b, "click", function() {
						g.onDiscuListClick(this)
					});
					h.on(b, "contextmenu", function(a) {
						var b = this.getAttribute("did");
						g.onDiscuContextMenu(a, b)
					})
				}
			};
			this.removeRecentBuddy = function(b) {
				var c = a.id("EQQ_Recent_" + b.uin);
				if (c) {
					h.off(c, "mouseover");
					h.off(c, "mouseout");
					h.off(c, "click");
					h.off(c, "contextmenu");
					if (b = a.id("EQQ_RecentList_AvatarContainer_" + b.uin)) h.off(b, "mouseover"), h.off(b, "mouseout");
					c.parentNode && c.parentNode.removeChild(c)
				}
			};
			this.updateRecentByBuddy = function(b) {
				var c = a.id("EQQ_Recent_" + b.uin);
				c ? this.EQQ_recentList.insertBefore(c, this.EQQ_recentList.firstChild) : this.addRecent({
					type: 0,
					content: b
				})
			};
			this.updateRecentByGroup = function(b) {
				var c = a.id("EQQ_Recent_" + b.gid);
				c ? this.EQQ_recentList.insertBefore(c, this.EQQ_recentList.firstChild) : this.addRecent({
					type: 1,
					content: b
				})
			};
			this.updateRecentByDiscu = function(b) {
				var c = a.id("EQQ_Recent_" + b.did);
				c ? this.EQQ_recentList.insertBefore(c, this.EQQ_recentList.firstChild) : this.addRecent({
					type: 2,
					content: b
				})
			};
			this.setMode = function(b) {
				switch (b) {
				case "master":
					ga = wa;
					a.removeClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
					this.EQQ_MyState.title = "\u66f4\u6539\u5728\u7ebf\u72b6\u6001";
					break;
				case "slave":
					ga = Ha, a.addClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect"), this.EQQ_MyState.title = "Q+ Web\u73b0\u5728\u5904\u4e8e\u8f85\u6a21\u5f0f\uff0c\u8bf7\u4ece\u5ba2\u6237\u7aefQQ\u4fee\u6539\u60a8\u7684\u5728\u7ebf\u72b6\u6001\u3002"
				}
			};
			this.toggleStatePanel = function(a) {
				this.statePanel && this.statePanel.isShow() ? this.hideStatePanel() : this.showStatePanel(a)
			};
			this.showStatePanel = function(b) {
				a.id("EQQ_StatePanel") || this.createStatePanelDom();
				if (b) {
					var c = this.statePanel.getWidth(),
						d = this.statePanel.getHeight(),
						e = alloy.layout.getClientWidth(),
						f = alloy.layout.getClientHeight(),
						h = b[0],
						b = b[1];
					h < 2 && (h = 2);
					b < 2 && (b = 2);
					h > e - c - 2 && (h = e - c - 2);
					b > f - d - 2 && (b = f - d - 2);
					this.statePanel.setXY(h, b)
				}
				this.statePanel.setZIndex(alloy.layout.getTopZIndex(3));
				this.statePanel.show();
				xa(alloy.sound.isMute())
			};
			this.hideStatePanel = function() {
				this.statePanel && this.statePanel.hide()
			};
			this.setSelfState = function(a) {
				h.notifyObservers(this, "SelfStateChange", a);
				this.updateSelfStateChange(a)
			};
			this.removeGroup = function(b) {
				var d = EQQ.Model.BuddyList.getGroupByCode(b),
					b = d.gid;
				c.out(d);
				var e = a.id("EQQ_Group_" + b);
				if (e && (h.off(e), e.parentNode)) d = e.parentNode, d.removeChild(e);
				c.out(e);
				if (b = a.id("EQQ_Recent_" + b)) if (h.off(b), b.parentNode) d = b.parentNode, d.removeChild(b);
				c.out(b)
			}
		};
	WebqCore.register("EQQ.View.MainPanel", c);
	var o;
	o = Jx().extend(function(e) {
		c.call(this, e);
		var g = this,
			a = e.dom,
			h = e.event;
		this.moveBuddyClass = function(a, c) {
			h.notifyObservers(g, "MoveBuddyClass", {
				uin: a,
				classId: c
			})
		};
		this.flexRemoveBuddyConfirm = function(a) {
			h.notifyObservers(g, "RemoveBuddyConfirm", a)
		};
		this.getHtml = function() {
			return d.myPanel + '<div id="EQQ_MainPanel" class="EQQ_mainPanel">' + d.mainPanelHeader + e.string.template(d.mainPanelBody, {
				searchReaultPanel: d.searchReaultPanelFlex,
				buddyListBody: d.buddyListBodyFlex
			}) + d.mainPanelFooter + "</div>"
		};
		this.viewQzone = function(a) {
			qqweb.rpcService.sendGetFriendUin2(a, 2, function(a) {
				qqweb.portal.runApp("6", {
					url: EQQ.CONST.QZONE_USER_SERVER_DOMAIN + a.result.account
				});
				qqweb.util.report2qqweb("contextmenu|contancts|qzone")
			});
			return !0
		};
		this.sendQMail = function(a) {
			qqweb.rpcService.sendGetFriendUin2(a, 3, function(a) {
				qqweb.portal.runApp("6", {
					url: EQQ.getSendMailUrl(a.result.account)
				});
				qqweb.util.report2qqweb("contextmenu|contancts|mail")
			});
			return !0
		};
		this.chatFromFlashMenu = function(a) {
			h.notifyObservers(g, "StartChat", a);
			qqweb.util.report2qqweb("contextmenu|contancts|sendmsg");
			return !0
		};
		this.viewDetailFromFlashMenu = function(a) {
			qqweb.portal.runApp("userDetails", a);
			qqweb.util.report2qqweb("contextmenu|contancts|profile");
			return !0
		};
		this.viewLogFromFlashMenu = function(a) {
			qqweb.portal.runApp("chatLogViewer", a);
			qqweb.util.report2qqweb("contextmenu|contancts|chats");
			return !0
		};
		this.ManageFriendFromFlashMenu = function() {
			qqweb.portal.runApp("5", {});
			qqweb.util.report2qqweb("contextmenu|contancts|manage");
			return !0
		};
		this.findFriendFromFlashMenu = function() {
			qqweb.portal.runApp("buddyFinder", {});
			qqweb.util.report2qqweb("contextmenu|contancts|add");
			return !0
		};
		this.onAvatarMouseover = function(c, d) {
			if (c && d) {
				if (EQQ.avatarMouseoverTimer) clearTimeout(EQQ.avatarMouseoverTimer), EQQ.avatarMouseoverTimer = null;
				var e = a.getClientXY(g.EQQ_buddyList);
				e[0] -= 218;
				e[1] += d.y;
				g.showMiniCardPanel(c, e);
				h.notifyObservers(g, "AvatarMouseover", c)
			}
		};
		this.onFlexException = function() {
			e.out("Flex-Exception");
			g.flex = window.frames.iframe_fflist.document.getElementById("fflist");
			g.ifFlexReady = !0;
			h.notifyObservers(EQQ, "LoginFailure", {
				text: "\u62c9\u53d6\u5931\u8d25"
			})
		};
		this.buddyListReady = function() {
			g.flex = window.frames.iframe_fflist.document.getElementById("fflist");
			g.ifFlexReady = !0;
			h.notifyObservers(g, "BuddyListReady");
			this.setFlexBigHead(this.isBuddyListUseBigHead())
		};
		var o = function() {
				g.hideMiniCardPanel()
			};
		this.onAvatarMouseout = function() {
			EQQ.avatarMouseoverTimer = window.setTimeout(o, 500)
		};
		this.onBuddyListClick = function(a) {
			h.notifyObservers(g, "StartChat", a)
		};
		this.showSearchResult = function(c) {
			if (this.EQQ_SearchBox.value) {
				var d = a.getRelativeXY(this.EQQ_SearchBox, this.EQQ_MainPanel);
				a.setStyle(this.EQQ_SearchResultPanel_iframeWrap, "left", d[0] + "px");
				a.setStyle(this.EQQ_SearchResultPanel_iframeWrap, "top", d[1] + 26 + "px");
				a.setStyle(this.EQQ_SearchResultPanel_iframeWrap, "width", alloy.app.eqq.window.getBodySize().width - 5 + "px");
				a.setStyle(this.EQQ_SearchResultPanel, "width", alloy.app.eqq.window.getBodySize().width - 7 + "px");
				a.show(this.EQQ_SearchResultPanel);
				a.show(this.EQQ_SearchResultPanel_iframeWrap);
				this.EQQ_SearchResultPanel.innerHTML = "";
				if (c.length == 0) this.EQQ_SearchResultPanel.innerHTML = '<div class="EQQ_SearchResultNo">\u6ca1\u6709\u627e\u5230\u76f8\u5173\u597d\u53cb</div>';
				else for (d = 0; d < c.length; d++) {
					var g = c[d],
						n = a.node("div");
					a.setClass(n, "EQQ_SearchResultItem");
					n.id = "EQQ_SearchResultItem_" + g.uin;
					n.setAttribute("uin", g.uin);
					n.innerHTML = g.htmlAllName;
					n.title = g.allName;
					this.EQQ_SearchResultPanel.appendChild(n);
					d == 0 && a.addClass(n, "EQQ_SearchResultItemHover");
					h.on(n, "mouseover", this.onSearchResultMouseover);
					h.on(n, "mouseout", this.onSearchResultMouseout);
					h.on(n, "mousedown", this.onSearchResultClick)
				}
				h.on(document, "mousedown", e.bind(this.hideSearchResult, this))
			}
		};
		this.hideSearchResult = function() {
			a.hide(this.EQQ_SearchResultPanel_iframeWrap);
			h.off(document, "mousedown")
		};
		this.createBuddyClass = function() {};
		this.addBuddyClass = function(c, d) {
			var g, n;
			g = a.node("div", {
				id: "EQQ_listClassHead_" + c.index,
				classIndex: c.index
			});
			n = c.index == EQQ.hash.userClassType.online ? '                    <div class="EQQ_listClassHeadIcon">icon</div>                    <div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">                        <%=htmlName%>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>]                    </div>                ' : '                    <div class="EQQ_listClassHeadIcon">icon</div>                    <div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">                        <%=htmlName%>&nbsp;[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>/<span id="EQQ_Class_<%=index%>_Counter"><%=count%></span>]                    </div>                ';
			n = e.string.template(n, c);
			g.innerHTML = n;
			d ? this.EQQ_buddyList.insertBefore(g, d) : this.EQQ_buddyList.appendChild(g);
			h.on(g, "click", onClassHeadElClick);
			var o = a.node("div", {
				id: "EQQ_listClassBody_" + c.index,
				"class": "EQQ_listClassBody"
			});
			n = e.string.template('                <div id="EQQ_Class_<%=index%>_callme" class="EQQ_callmeBuddy"></div>                <div id="EQQ_Class_<%=index%>_online" class="EQQ_onlineBuddy"></div>                <div id="EQQ_Class_<%=index%>_busy" class="EQQ_busyBuddy"></div>                <div id="EQQ_Class_<%=index%>_away" class="EQQ_awayBuddy"></div>                <div id="EQQ_Class_<%=index%>_silent" class="EQQ_silentBuddy"></div>                <div id="EQQ_Class_<%=index%>_offline" class="EQQ_offlineBuddy"></div>            ', c);
			o.innerHTML = n;
			this.EQQ_buddyList.insertBefore(o, g.nextSibling);
			this.collapsedClass(c.index)
		};
		this.showPullData = function() {};
		this.clearBuddyList = function() {
			g.ifFlexReady && this.flex.clearBuddyList()
		};
		this.createBuddyList = function() {};
		this.collapsedClass = function(c) {
			var d = a.id("EQQ_listClassHead_" + c),
				e = a.id("EQQ_listClassBody_" + c);
			c == EQQ.hash.userClassType.online ? a.setClass(d, "EQQ_onlineClassHeadCollapsed") : a.setClass(d, "EQQ_listClassHeadCollapsed");
			a.setStyle(e, "height", "0");
			this.setClassExpandFlag(c, !1)
		};
		this.expandClass = function(c) {
			var d = a.id("EQQ_listClassHead_" + c),
				h = a.id("EQQ_listClassBody_" + c);
			c == EQQ.hash.userClassType.online ? a.setClass(d, "EQQ_onlineClassHeadExpand") : a.setClass(d, "EQQ_listClassHeadExpand");
			a.setStyle(h, "height", "auto");
			this.setClassExpandFlag(c, !0);
			e.out("index: " + c);
			g.loadBuddyListAvatar()
		};
		this.onBuddyStateChange = function(a) {
			if (g.ifFlexReady) this.flex.onBuddyStateChange(a)
		};
		this.moveBuddyClassCallBack = function(a, c, d) {
			g.ifFlexReady && this.flex.moveBuddyClass({
				uin: a.uin,
				markname: a.markName,
				clientType: a.clientType,
				state: a.state,
				nick: a.nick
			}, c, d)
		};
		this.removeBuddyCallBack = function(a, c) {
			g.ifFlexReady && this.flex.removeBuddy({
				uin: a.uin,
				markname: a.markName,
				clientType: a.clientType,
				state: a.state,
				nick: a.nick,
				classId: c
			})
		};
		this.onOnlineBuddyChange = function(a) {
			if (g.ifFlexReady) this.flex.onOnlineBuddyChange(a)
		};
		this.addBuddy = function(a) {
			a = {
				classId: a.classId,
				uin: a.uin,
				clientType: a.clientType,
				state: a.state,
				nick: a.nick
			};
			g.ifFlexReady && this.flex.addBuddy(a)
		};
		this.addOnlineBuddy = function(a) {
			a = {
				uin: a.uin,
				clientType: a.clientType,
				state: a.state,
				nick: a.nick
			};
			g.ifFlexReady && this.flex.addOnlineBuddy(a)
		};
		this.removeOnlineBuddy = function(a) {
			g.ifFlexReady && this.flex.removeOnlineBuddy(a.uin)
		};
		this.updateOnlineBuddyClass = function(a) {
			g.ifFlexReady && this.flex.updateOnlineBuddyClass(a.length)
		};
		this.flexStartJump = function(a) {
			g.ifFlexReady && this.flex.startjump(a)
		};
		this.flexStopJump = function(a) {
			g.ifFlexReady && this.flex.stopjump(a)
		};
		this.jumpUp = function() {};
		this.jumpDown = function() {};
		this.jumpAvatar = function() {};
		this.flickerClassHide = function() {};
		this.flickerClassShow = function() {};
		this.flickerClass = function() {};
		this.moveBuddy = function(a) {
			a = {
				uin: a.uin,
				state: a.state
			};
			g.ifFlexReady && this.flex.moveBuddy(a)
		};
		this.moveOnlineBuddy = function(a) {
			a = {
				uin: a.uin,
				state: a.state
			};
			g.ifFlexReady && this.flex.moveOnlineBuddy(a)
		};
		this.updateClientType = function(a) {
			a = {
				uin: a.uin,
				clientType: a.clientType
			};
			g.ifFlexReady && this.flex.updateClientType(a)
		};
		this.updateBuddyClassOnlineBuddy = function(a) {
			a = {
				index: a.index,
				onlineCount: a.onlineCount
			};
			g.ifFlexReady && this.flex.updateBuddyClassOnlineBuddy(a)
		};
		this.updateBuddyClassCount = function(a) {
			a = {
				index: a.index,
				count: a.count
			};
			g.ifFlexReady && this.flex.updateBuddyClassCount(a)
		};
		this.updateStrangerClassOnlineCount = function(a) {
			g.ifFlexReady && this.flex.updateStrangerClassOnlineCount(a)
		};
		this.updateStrangerClassCount = function(a) {
			g.ifFlexReady && this.flex.updateStrangerClassCount(a.length)
		};
		this.setUserName = function(a) {
			a.markName && (a = {
				uin: a.uin,
				nick: a.markName
			}, g.ifFlexReady ? this.flex.setUserName(a) : recent.type == 2 && (a = this.getNewNode(recent.content, !0), this.EQQ_recentList.insertBefore(a, this.EQQ_recentList.firstChild), h.on(a, "mouseover", onListMouseover), h.on(a, "mouseout", onListMouseout), h.on(a, "click", function() {
				g.onDiscuListClick(this)
			}), h.on(a, "contextmenu", function(a) {
				var c = this.getAttribute("did");
				g.onDiscuContextMenu(a, c)
			})))
		};
		this.setUseBigHead = function(a) {
			this.setBigHead("single", a)
		};
		this.setFlexBigHead = function(a) {
			a ? this.flex.viewBigHead() : this.flex.viewSmallHead()
		}
	}, c);
	WebqCore.register("EQQ.View.MainPanelFlex", o)
})();
(function() {
	WebqCore.register("EQQ.Presenter.MainPanel", function(d) {
		var e = this,
			c = d.event,
			o = !1,
			k = [],
			g = [],
			a = [],
			h = [],
			w = [],
			f = !0,
			m = !1,
			r = !1,
			n = !1;
		this.init = function() {
			o = !1;
			k = [];
			g = [];
			a = [];
			h = [];
			w = [];
			f = !0;
			n = r = m = !1;
			this.View = EQQ.View.MainPanel;
			this.View.createDom(this.getContainer());
			c.addObserver(EQQ, "CloseWebQQ", d.bind(this.onCloseWebQQ, this));
			c.addObserver(EQQ, "SelfOffline", d.bind(this.onSelfOffline, this));
			c.addObserver(EQQ, "LoginSuccess", z);
			c.addObserver(EQQ, "LoginFailure", d.bind(I, this));
			c.addObserver(EQQ, "PtwebqqFail", d.bind(H, this));
			c.addObserver(EQQ.RPCService, "ChangeStatusSuccess", d.bind(x, this));
			c.addObserver(alloy.portal, "UserAvatarChanged", d.bind(this.onUserAvatarChanged, this));
			c.addObserver(alloy.portal, "selfInfoReady", d.bind(this.onSelfInfoReady, this));
			c.addObserver(alloy.rpcService, "SetBuddySignatureSuccess", d.bind(this.onSetBuddySignatureSuccess, this));
			c.addObserver(alloy.rpcService, "ManageError", d.bind(this.onManageError, this));
			c.addObserver(EQQ.Model.BuddyList, "ManageError", d.bind(this.onManageError, this));
			c.addObserver(alloy.rpcService, "SetBuddySignatureError", d.bind(this.onSetBuddySignatureError, this));
			c.addObserver(EQQ.Model.BuddyList, "SelfInfoChange", d.bind(this.onSelfInfoChange, this));
			c.addObserver(EQQ.Model.BuddyList, "SelfStateChange", d.bind(this.updateSelfStateChange, this));
			c.addObserver(EQQ.Model.BuddyList, "SelfSignatureChange", d.bind(this.handleSelfSignatureChange, this));
			c.addObserver(EQQ.Model.BuddyList, "UserSignatureChange", y);
			c.addObserver(EQQ.Model.BuddyList, "UserQQLevelChange", p);
			c.addObserver(EQQ.Model.BuddyList, "GroupAnnouncementChange", u);
			c.addObserver(EQQ.Model.BuddyList, "LoginFail", d.bind(this.onLoginFail, this));
			c.addObserver(EQQ.Model.BuddyList, "GetUserInfoSuccess", d.bind(this.onGetUserInfoSuccess, this));
			c.addObserver(EQQ.Model.BuddyList, "BuddyClassChange", d.bind(this.onBuddyClassChange, this));
			c.addObserver(EQQ.Model.BuddyList, "BuddyClassMove", d.bind(this.onBuddyClassMove, this));
			c.addObserver(EQQ.Model.BuddyList, "AllClassOnlineBuddyReady", d.bind(this.onAllClassOnlineBuddyReady, this));
			c.addObserver(this.View, "SendGetRecentList", B);
			c.addObserver(EQQ.Model.BuddyList, "GroupNameChange", this.onOnGroupNameChange);
			c.addObserver(EQQ.Model.BuddyList, "AddBuddy", d.bind(this.onAddANewBuddy, this));
			c.addObserver(EQQ.Model.BuddyList, "RemoveBuddy", d.bind(this.onRemoveBuddy, this));
			c.addObserver(EQQ.Model.BuddyList, "MoveBuddyClass", d.bind(this.onMoveBuddyClass, this));
			c.addObserver(EQQ.Model.BuddyList, "GroupListChange", d.bind(this.onGroupListChange, this));
			c.addObserver(EQQ.Model.BuddyList, "AddNewGroupToList", d.bind(this.onAddNewGroupToList, this));
			c.addObserver(EQQ.Model.BuddyList, "GroupMaskChange", d.bind(this.onGroupMaskChange, this));
			c.addObserver(EQQ.Model.BuddyList, "SingleGroupMaskChange", d.bind(this.onSingleGroupMaskChange, this));
			c.addObserver(EQQ.Model.BuddyList, "RecentListChange", d.bind(this.onRecentListChange, this));
			c.addObserver(EQQ.Model.ChatMsg, "NewStranger", d.bind(this.onNewStranger, this));
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxUserListChange", d.bind(this.onMessageBoxUserListChange, this));
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxGroupListChange", d.bind(this.onMessageBoxGroupListChange, this));
			c.addObserver(EQQ.Model.ChatMsg, "MessageListChange", d.bind(this.onMessageListChange, this));
			c.addObserver(EQQ.Model.ChatMsg, "GroupMessageListChange", d.bind(this.onGroupMessageListChange, this));
			c.addObserver(this.View, "StartChat", F);
			c.addObserver(this.View, "AskVideo", G);
			c.addObserver(this.View, "StartGroupChat", t);
			c.addObserver(this.View, "StartDiscuChat", C);
			c.addObserver(this.View, "SelfStateChange", d.bind(this.onViewSelfStateChange, this));
			c.addObserver(this.View, "SetGroupMaskState", q);
			c.addObserver(this.View, "AddPObservers", d.bind(this.onAddPObservers, this));
			c.addObserver(this.View, "ExitPortal", d.bind(this.onExitPortal, this));
			c.addObserver(this.View, "CloseWebQQ", d.bind(J, this));
			c.addObserver(this.View, "MinMainPanel", d.bind(i, this));
			c.addObserver(this.View, "ReLogin", d.bind(l, this));
			c.addObserver(this.View, "MoveBuddyClass", d.bind(this.moveBuddyClass, this));
			c.addObserver(this.View, "RemoveBuddy", d.bind(this.removeBuddy, this));
			c.addObserver(this.View, "SetUserMarkName", d.bind(this.setUserMarkName, this));
			c.addObserver(this.View, "RemoveBuddyConfirm", d.bind(this.removeBuddyConfirm, this));
			c.addObserver(this.View, "GetSingleMenuClassItems", d.bind(this.getSingleMenuClassItems, this));
			c.addObserver(this.View, "Search", d.bind(this.onSearch, this));
			c.addObserver(this.View, "BuddyListReady", d.bind(this.onBuddyListDomReady, this));
			c.addObserver(this.View, "CloseYellowTipsFinish", d.bind(this.onCloseYellowTipsFinish, this));
			c.addObserver(this.View, "MiniCardShow", j);
			c.addObserver(EQQ.Model.BuddyList, "DiscuListChange", d.bind(this.onDiscuListChange, this));
			c.addObserver(EQQ.Model.BuddyList, "AddNewDiscuToList", d.bind(this.onAddNewDiscuToList, this));
			c.addObserver(EQQ.Model.BuddyList, "ToStartDiscuChat", C);
			c.addObserver(EQQ.Model.BuddyList, "ModifyDiscuTopicSuccess", D);
			c.addObserver(EQQ, "QuitDiscu", K);
			c.addObserver(EQQ.Model.BuddyList, "QuitDiscuSuccess", L);
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxDiscuListChange", d.bind(this.onMessageBoxDiscuListChange, this));
			c.addObserver(EQQ.Model.BuddyList, "SingleDiscuMaskChange", R);
			c.addObserver(EQQ.Model.ChatMsg, "ServerDiscuInfochange", Q);
			c.addObserver(EQQ.Model.BuddyList, "DiscuInfoChange", D);
			c.addObserver(EQQ.Model.ChatMsg, "DiscuMessageListChange", d.bind(this.onDiscuMessageListChange, this));
			c.addObserver(EQQ, "GetDiscuListFail", O);
			this.View.init();
			this.View.setNoneFlashStyle && this.View.setNoneFlashStyle()
		};
		this.onAddPObservers = function() {
			f = !1;
			c.addObserver(EQQ.Model.BuddyList, "BuddyListChange", d.bind(this.onBuddyListChange, this));
			c.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", d.bind(this.onBuddyStateChange, this));
			c.addObserver(EQQ.Model.BuddyList, "OnlineBuddyChange", d.bind(this.onOnlineBuddyChange, this))
		};
		this.onBuddyListDomReady = function() {
			if (!m) {
				if (f) this.onAddPObservers();
				c.addObserver(EQQ.Model.BuddyList, "UserNameChange", d.bind(this.onUserNameChange, this));
				m = !0
			}
			r = !0
		};
		this.getContainer = function() {
			return EQQ.panel.mainPanel
		};
		var y = function(a) {
				e.View.miniCardPanel && (d.out("onUserSignatureChange 33:" + a.uin), e.View.miniCardPanel.setSignature(a));
				e.View.updateBuddySignature(a)
			},
			p = function(a) {
				e.View.miniCardPanel && (d.out("onUserQQLevelChange 33:" + a.uin), e.View.miniCardPanel.setQQLevel(a))
			},
			u = function(a) {
				e.View.updateGroupAnnouncement(a)
			},
			j = function(a) {
				a && (EQQ.Model.BuddyList.getUserSignature(a.uin), EQQ.Model.BuddyList.sendGetQQLevel(a.uin))
			};
		this.showYellowTips = function() {
			this.View.showYellowTips()
		};
		this.hideYellowTips = function() {
			this.View.hideYellowTips()
		};
		this.onCloseYellowTipsFinish = function() {
			this.setCookieTips("hide")
		};
		this.getCookieTips = function() {
			return d.cookie.get("is_close_tips", EQQ.CONST.MAIN_DOMAIN)
		};
		this.setCookieTips = function(a) {
			d.cookie.set("is_close_tips", a, EQQ.CONST.MAIN_DOMAIN, null, 120)
		};
		this.onSearch = function(a) {
			this.View.showSearchResult(EQQ.Model.BuddyList.searchBuddy(a, 5))
		};
		this.showMiniCardPanel = function(a, c) {
			this.View.showMiniCardPanel(a, c)
		};
		this.hideMiniCardPanel = function() {
			this.View.hideMiniCardPanel()
		};
		this.onLoginFail = function() {
			alloy.layout.alert("\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5", null, {
				windowType: "EqqWindow"
			})
		};
		this.onSelfInfoChange = function(a) {
			this.View.updateSelfInfoChange(a)
		};
		this.onSelfInfoReady = function(a) {
			this.View.updateSelfInfoChange(a)
		};
		this.onSetBuddySignatureSuccess = function(a) {
			EQQ.Model.BuddyList.getSelf().setSignature(a);
			this.handleSelfSignatureChange({
				signature: a
			});
			alloy.util.report2im("personalinfo|personalmsg|personalmsgsucceed")
		};
		this.onManageError = function(a) {
			alloy.layout.alert({
				mark: "\u4fee\u6539\u5907\u6ce8",
				mod: "\u79fb\u52a8\u5206\u7ec4",
				del: "\u5220\u9664\u597d\u53cb"
			}[a] + "\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5", null, {
				windowType: "EqqWindow"
			});
			switch (a) {
			case "mark":
				qqweb.util.report2qqweb("contextmenu|contancts|changenamefail");
				break;
			case "del":
				qqweb.util.report2qqweb("contextmenu|contancts|deletefail");
				break;
			case "mod":
				qqweb.util.report2qqweb("contextmenu|contancts|movefail")
			}
		};
		this.onSetBuddySignatureError = function() {
			alloy.layout.alert("\u7b7e\u540d\u4fee\u6539\u5931\u8d25", null, {
				windowType: "EqqWindow"
			})
		};
		this.onUserAvatarChanged = function() {
			this.View.updateSelftAvatar()
		};
		this.onOnGroupNameChange = function(a) {
			typeof e.View != "undefined" && e.View.updateGroupMarkName(a)
		};
		this.updateSelfStateChange = function(a) {
			this.View.updateSelfStateChange(a)
		};
		this.handleSelfSignatureChange = function(a) {
			this.View.updateSelfSignatureChange(a)
		};
		this.onSelfOffline = function(a) {
			var c = EQQ.Model.BuddyList.getSelf();
			r = n = !1;
			EQQ.stopPoll();
			if (c) c.oldState = c.state, c.state = "offline";
			this.updateSelfStateChange("offline");
			a.action == "relogin" ? A(a.message) : EQQ.showEQQtips({
				title: "\u8fde\u63a5\u4e2d\u65ad",
				content: a.message,
				callback: function() {
					EQQ.reLogin()
				}
			})
		};
		var z = function() {},
			I = function() {
				this.updateSelfStateChange("offline")
			},
			H = function() {
				this.updateSelfStateChange("offline")
			},
			A = function(a) {
				EQQ.hideEQQtips();
				alloy.layout.showLoginWindow("eqq", !0, null, a)
			},
			x = function(a) {
				EQQ.Model.BuddyList.setSelfState(a)
			};
		this.onBuddyClassChange = function(a) {
			this.clearBuddyList();
			this.View.createBuddyClass(a);
			this.View.hideLogin()
		};
		this.onAllClassOnlineBuddyReady = function() {
			n || (n = !0, this.onBuddyClassListReady())
		};
		this.onBuddyClassListReady = function() {
			EQQ.loginEnd = (new Date).getTime();
			var a = EQQ.loginEnd - EQQ.loginStart;
			a /= 1E3;
			d.out("time: " + a)
		};
		this.onBuddyListChange = function(a) {
			r || (this.updateAllBuddyClassCount(EQQ.Model.BuddyList.getClassList()), this.createBuddyList(a))
		};
		this.onGroupListChange = function(a) {
			this.View.createGroupList(a)
		};
		this.onAddNewGroupToList = function(a) {
			this.View.addGroup(a)
		};
		this.moveBuddyClass = function(a) {
			EQQ.Model.BuddyList.moveBuddyClass(a.uin, a.classId);
			qqweb.util.report2qqweb("contextmenu|contancts|move")
		};
		this.onMoveBuddyClass = function(a) {
			a && (this.View.updateBuddyClassCount(a.oldClass), this.View.updateBuddyClassOnlineBuddy(a.oldClass), this.View.updateBuddyClassCount(a.newClass), this.View.updateBuddyClassOnlineBuddy(a.newClass), this.View.removeBuddy(a.user.uin), this.View.addBuddy(a.user))
		};
		this.removeBuddy = function(a) {
			EQQ.Model.BuddyList.sendRemoveBuddy(a.uin, a.check)
		};
		this.removeBuddyConfirm = function(a) {
			this.View.removeBuddyConfirm(EQQ.Model.BuddyList.getUserByUin(a))
		};
		this.onRemoveBuddy = function(a) {
			var c = a.classObj,
				d = a.user;
			this.View.removeBuddy(d.uin);
			d.classId == EQQ.hash.userClassType.stranger ? (c = EQQ.Model.BuddyList.getStrangerList(), this.View.updateStrangerClassOnlineCount(c.length), this.View.updateStrangerClassCount(c)) : (this.View.updateBuddyClassCount(c), d.getState() != EQQ.hash.onlineStatus.offline && (this.View.removeOnlineBuddy(d), this.View.updateOnlineBuddyClass(EQQ.Model.BuddyList.getOnlineBuddy()), this.View.updateBuddyClassOnlineBuddy(c)));
			this.View.removeRecentBuddy(a.user)
		};
		this.setUserMarkName = function(a) {
			EQQ.Model.BuddyList.setUserMarkName(a.uin, a.markname)
		};
		this.onAddANewBuddy = function(a) {
			var c = a.user;
			this.View.addBuddy(c);
			var d = EQQ.Model.BuddyList.getClassById(c.classId);
			this.View.updateBuddyClassCount(d);
			var e = EQQ.Model.BuddyList.getBuddyByUin(c.uin);
			a.markname && e.setMarkName(a.markname);
			c.getState() != EQQ.hash.onlineStatus.offline && (this.View.addOnlineBuddy(e), this.View.updateOnlineBuddyClass(EQQ.Model.BuddyList.getOnlineBuddy()), this.View.updateBuddyClassOnlineBuddy(d))
		};
		this.onBuddyStateChange = function(a) {
			a = EQQ.Model.BuddyList.getUserByUin(a);
			this.View.moveBuddy(a);
			this.View.moveOnlineBuddy(a);
			this.View.updateClientType(a);
			this.View.updateRecentState(a);
			this.View.miniCardPanel && this.View.miniCardPanel.setClientType(a)
		};
		this.onOnlineBuddyChange = function(a) {
			var c = EQQ.Model.BuddyList.getUserByUin(a),
				a = EQQ.Model.BuddyList.getClassByUin(a),
				d = EQQ.hash.onlineStatus.offline,
				e = EQQ.Model.BuddyList.getOnlineBuddy();
			this.View.updateBuddyClassOnlineBuddy(a);
			this.View.updateOnlineBuddyClass(e);
			c.state == d ? this.View.removeOnlineBuddy(c) : this.View.addOnlineBuddy(c)
		};
		this.onRecentListChange = function(a) {
			for (var c = [], d = a.length - 1; d >= 0; d--) {
				if (a[d].type == 0) a[d].content = EQQ.Model.BuddyList.getBuddyByUin(a[d].uin);
				else if (a[d].type == 1) a[d].content = EQQ.Model.BuddyList.getGroupByGid(a[d].uin);
				else if (a[d].type == 2) a[d].content = EQQ.Model.BuddyList.getDiscuById(a[d].uin);
				c.push(a[d])
			}
			this.View.createRecentList(c)
		};
		this.onUserNameChange = function(a) {
			this.View.setUserName(a)
		};
		this.onGroupMaskChange = function(a) {
			for (var c = EQQ.Model.BuddyList.getGroupList(), d = 0; d < c.length; d++) {
				var e = c[d],
					f = EQQ.Model.BuddyList.isGroupPrompt(e.gid);
				this.View.setGroupListMaskState(e.gid, f)
			}
			this.View.setGroupMask(a)
		};
		this.onSingleGroupMaskChange = function(a) {
			var c = EQQ.Model.BuddyList.isGroupPrompt(a.gid);
			this.View.setGroupListMaskState(a.gid, c)
		};
		this.onGetUserInfoSuccess = function() {};
		this.onNewStranger = function(a) {
			var c = EQQ.Model.BuddyList.getStrangerList();
			this.View.updateStrangerClassOnlineCount(c.length);
			this.View.updateStrangerClassCount(c);
			this.View.addBuddy(a)
		};
		this.updateAllBuddyClassCount = function(a) {
			for (var c = 0; c < a.length; c++) this.updateBuddyClassCount(a[c])
		};
		this.updateBuddyClassCount = function(a) {
			this.View.updateBuddyClassCount(a)
		};
		this.createBuddyList = function(a) {
			this.View.createBuddyList(a)
		};
		this.updateRecentByBuddy = function(a) {
			this.View.updateRecentByBuddy(a)
		};
		this.updateRecentByGroup = function(a) {
			this.View.updateRecentByGroup(a)
		};
		this.updateRecentByDiscu = function(a) {
			this.View.updateRecentByDiscu(a)
		};
		this.onFlexStartJump = function(a) {
			this.View.flexStartJump(a)
		};
		this.onFlexStopJump = function(a) {
			this.View.flexStopJump(a)
		};
		var v = function() {
				var a = alloy.windowManager.getCurrentWindow();
				return d.isUndefined(a) || !a ? 0 : !d.isUndefined(a.option) && a.option && !d.isUndefined(a.option.userOrGroup) ? a.option.userOrGroup.uin || a.option.userOrGroup.gid || a.option.userOrGroup.did || 0 : 0
			};
		this.onMessageBoxUserListChange = function(b) {
			EQQ.Model.BuddyList.getSelf();
			var d = v();
			this.View.jumpDown(k);
			this.View.flickerClassShow(a);
			k = [];
			g = [];
			a = [];
			for (var e = 0; e < b.length; e++) d != b[e].from_uin && (k.push(b[e].from_uin), EQQ.Model.BuddyList.getSelfState() == "callme" && F(b[e].from_uin));
			k.length !== 0 && (EQQ.addNeedBeat2("mainPanel"), c.addObserver(EQQ, "NotifyBeat_250", E))
		};
		this.onMessageBoxGroupListChange = function(a) {
			EQQ.Model.BuddyList.getSelf();
			var d = v();
			this.View.jumpDown(h);
			h = [];
			for (var e = 0; e < a.length; e++) d != a[e].from_uin && EQQ.Model.BuddyList.isGroupPrompt(a[e].from_uin) && h.push(a[e].from_uin), EQQ.Model.BuddyList.getSelfState() == "callme" && EQQ.Model.BuddyList.isGroupPrompt(a[e].from_uin) && t(a[e].group_code);
			h.length !== 0 && (EQQ.addNeedBeat2("mainPanel"), c.addObserver(EQQ, "NotifyBeat_250", E))
		};
		this.onMessageListChange = function(a) {
			(a = EQQ.Model.BuddyList.getBuddyByUin(a.uin)) && this.View.updateRecentByBuddy(a)
		};
		this.onGroupMessageListChange = function(a) {
			(a = EQQ.Model.BuddyList.getGroupByGid(a.gid)) && this.View.updateRecentByGroup(a)
		};
		this.onDiscuMessageListChange = function(a) {
			(a = EQQ.Model.BuddyList.getDiscuById(a.did)) && this.View.updateRecentByDiscu(a)
		};
		var B = function() {
				EQQ.Model.BuddyList.sendGetRecentList()()
			},
			q = function(a) {
				EQQ.Model.BuddyList.sendChangeGroupMask({
					type: "global",
					uin: EQQ.Model.BuddyList.getSelfUin(),
					mask: a
				})
			},
			F = function(a) {
				EQQ.handleNotification(a, "single") || WebqCore.api.call(["chat", ["single", a]])
			},
			G = function(a) {
				a = a.uin;
				if (!EQQ.Model.ChatMsg.uinToVideo) EQQ.Model.ChatMsg.uinToVideo = [];
				EQQ.Model.ChatMsg.uinToVideo[a] = {};
				c.notifyObservers(e, "AskVideo", {
					uin: a
				})
			},
			t = function(a) {
				var c = EQQ.Model.BuddyList.getGroupByCode(a).gid;
				EQQ.handleNotification(c, "group") || WebqCore.api.call(["chat", ["group", a]])
			};
		this.collapsedAllClass = function() {
			for (var a = EQQ.Model.BuddyList.getClassList(), c = 0; c < a.length; c++) this.View.collapsedClass(a[c].index)
		};
		var J = function() {
				EQQ.exit()
			},
			i = function() {
				this.hide()
			},
			l = function() {
				EQQ.reLogin()
			};
		this.onExitPortal = function() {
			alloy.portal.exit()
		};
		this.onCloseWebQQ = function() {
			r = n = !1;
			this.hide();
			this.View.showLogin()
		};
		this.clearBuddyList = function() {
			this.View.clearBuddyList()
		};
		this.showLogin = function() {
			this.View.showLogin()
		};
		this.show = function() {
			o = !0;
			this.View.show()
		};
		this.hide = function() {
			o = !1;
			this.View.hide()
		};
		this.toggleShow = function() {
			o ? this.hide() : this.show()
		};
		this.showReLoginPanel = function(a) {
			this.View.showReLoginPanel(a)
		};
		var E = function() {
				e.View.flickerClassShow(a, !0);
				g = [];
				a = [];
				var b = k.concat(h, w);
				b.length === 0 && (c.removeObserver(EQQ, "NotifyBeat_250", E), EQQ.removeNeedBeat2("mainPanel"));
				for (var f = 0; f < k.length; f++) {
					var i = k[f],
						j = EQQ.Model.BuddyList.getClassIdByUin(i);
					e.View.getClassExpandFlag(j) ? g.push(i) : d.array.indexOf(a, j) == -1 && a.push(j)
				}
				k.length > 0 && e.View.jumpAvatar(k);
				a.length > 0 && e.View.flickerClass(a);
				h.length > 0 && e.View.groupJumpAvatar(h);
				b.length > 0 && e.View.recentJumpAvatar(b);
				w.length > 0 && e.View.discuJumpAvatar(w)
			};
		this.onViewSelfStateChange = function(a) {
			var c = "offline",
				e = EQQ.Model.BuddyList.getSelf();
			if (e) c = e.state;
			d.out("==onViewSelfStateChange, self: " + a + ", old: " + c);
			c == "offline" && a != "offline" ? EQQ.login(a) : EQQ.Model.BuddyList.sendChangeStatus(a);
			a == "offline" && (r = n = !1, EQQ.stopPoll())
		};
		this.removeGroup = function(a) {
			e.View.removeGroup(a);
			EQQ.Model.BuddyList.removeGroup(a)
		};
		this.removeDiscu = function(a) {
			e.View.removeDiscu(a)
		};
		var C = function(a) {
				EQQ.handleNotification(a, "discu") || WebqCore.api.call(["chat", ["discu", a]])
			};
		this.onDiscuListChange = function(a) {
			this.View.createDiscuList(a)
		};
		this.onAddNewDiscuToList = function(a) {
			this.View.addDiscu(a)
		};
		var D = function(a) {
				e.View.updateDiscuName(a)
			},
			K = function(a) {
				EQQ.Model.BuddyList.sendQuitDisc(a)
			},
			L = function(a) {
				e.removeDiscu(a.did)
			};
		this.onMessageBoxDiscuListChange = function(a) {
			EQQ.Model.BuddyList.getSelf();
			var d = v();
			this.View.discuJumpDown(w);
			w = [];
			for (var e = 0; e < a.length; e++) {
				var f = a[e];
				d != f.did && EQQ.Model.BuddyList.isDiscuPrompt(f.did) && w.push(f.did);
				EQQ.Model.BuddyList.getSelfState() == "callme" && EQQ.Model.BuddyList.isDiscuPrompt(f.did) && C(f.did)
			}
			w.length !== 0 && (EQQ.addNeedBeat2("mainPanel"), c.addObserver(EQQ, "NotifyBeat_250", E))
		};
		var R = function(a) {
				e.View.setDiscuListMaskState(a.did, a.mask)
			},
			Q = function(a) {
				EQQ.Model.BuddyList.refreshDiscuInfo(a.did)
			},
			O = function() {
				e.View.showReloadDiscuList()
			};
		this.saveBigHeadSetting = function(a) {
			alloy.config.configList.useBigHead = a;
			alloy.rpcService.sendSetConfig({
				data: {
					r: {
						appid: 50,
						value: {
							useBigHead: a
						}
					}
				}
			})
		};
		this.getSingleMenuClassItems = function(a) {
			for (var c = EQQ.Model.BuddyList.getBuddyByUin(a.u), d = EQQ.Model.BuddyList.getClassList(), e = [], f = 0; f < d.length; f++) c.classId != d[f].index && e.push({
				text: d[f].htmlName,
				classId: d[f].index
			});
			a.f(e)
		}
	})
})();
(function() {
	WebqCore.register("EQQ.TaskBar", function(d) {
		var e = this,
			c = d.event;
		this.init = function() {
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxUserListChange", d.bind(this.onMessageBoxUserListChange, this));
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxGroupListChange", d.bind(this.onMessageBoxGroupListChange, this));
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxDiscuListChange", d.bind(this.onMessageBoxDiscuListChange, this));
			c.addObserver(alloy.taskBar, "TaskBarNotifyBeatStart", k);
			c.addObserver(alloy.taskBar, "TaskBarNotifyBeatStop", g);
			c.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", a)
		};
		this.onGetUserInfoSuccess = function(a) {
			e.getTask(a.uin) && EQQ.Model.BuddyList.isStranger(a.uin) && e.View.updateBuddyName(a)
		};
		this.onBuddyMarkNameChange = function() {};
		this.onMessageBoxUserListChange = function(a) {
			for (var d in a) c.notifyObservers(alloy.taskBar, "NotifyTaskItem", {
				appId: "5_0",
				id: a[d].from_uin
			})
		};
		this.onMessageBoxGroupListChange = function(a) {
			for (var d in a) c.notifyObservers(alloy.taskBar, "NotifyTaskItem", {
				appId: "5_0",
				id: a[d].from_uin
			})
		};
		var o = function() {
				c.notifyObservers(alloy.taskBar, "NotifyBeat_250")
			};
		this.onMessageBoxDiscuListChange = function(a) {
			for (var d in a) c.notifyObservers(alloy.taskBar, "NotifyTaskItem", {
				appId: "5_0",
				id: a[d].did
			})
		};
		var k = function() {
				EQQ.addNeedBeat2("taskBar");
				c.addObserver(EQQ, "NotifyBeat_250", o)
			},
			g = function() {
				EQQ.removeNeedBeat2("taskBar");
				c.removeObserver(EQQ, "NotifyBeat_250", o)
			},
			a = function(a) {
				var d = EQQ.Model.BuddyList.getUserByUin(a);
				d && (c.notifyObservers(alloy.taskBar, "UpdateTaskTitle", {
					appId: "5_0",
					id: a,
					title: (d.markName || d.nick) + " - " + EQQ.hash.onlineStatusText[d.state]
				}), c.notifyObservers(alloy.taskBar, "EQQBuddyStateChange", {
					id: a,
					state: d.state
				}))
			}
	})
})();