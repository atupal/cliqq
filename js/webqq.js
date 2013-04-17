(function() {
	WebqCore.register("EQQ.Global", function() {
		this.initGlobal = function() {
			EQQ.vfwebqq = alloy.portal.getVfWebQQ()
		}
	})
})();
(function() {
	WebqCore.register("EQQ.Adapter", function(d) {
		this.proxysend = function(b, c) {
			alloy.rpcService.send(b, {
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
		this.cgi_module = function(d, b) {
			return function(c) {
				b.onError = b.errback ||
				function() {};
				b.onTimeout = b.timeback ||
				function() {};
				c = c ||
				function() {};
				b.onSuccess = function(d) {
					b.callback(d, c)
				};
				EQQ.Adapter.proxysend(d, b)
			}
		};
		this.cgi_module_d = function(d, b) {
			return function(c) {
				b.onError = b.errback ||
				function() {};
				b.onTimeout = b.timeback ||
				function() {};
				c = c ||
				function() {};
				b.onSuccess = function(d) {
					b.callback(d, c)
				};
				EQQ.RPCService.send(d, b)
			}
		};
		this.require = function(d, b) {
			for (var c = d.length, n = d.length, l = function() {
					c--;
					c == 0 && b()
				}, g = 0; g < n; g++) d[g](l)
		}
	})
})();
(function() {
	WebqCore.register("EQQ", function(d) {
		var b = this,
			c = d.dom,
			n = d.event,
			l = d.cookie,
			g = !1,
			a = {},
			h, w = 0,
			f, q, t, m = !1,
			x = !1,
			o, u;
		u = window.location.host;
		d.out(">>dName: " + u);
		this.showLogin = function() {
			alloy.portal.getLoginLevel();
			l.get("ptwebqq") ? EQQ.init2({
				panel: {
					mainPanel: alloy.app.eqq.getWindow().body
				}
			}) : alloy.layout.showLoginWindow("eqq", !0)
		};
		var j = {
			onExit: function() {
				alloy.layout.confirm("\u60a8\u786e\u8ba4\u8981\u5173\u95ed Q+ Web \u5417\uff1f", function() {
					b.executeExit()
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
		n.on(document, "keydown", function(i) {
			i.keyCode === 27 && i.preventDefault()
		});
		this.init2 = function(i) {
			g = !1;
			a = {};
			q = f = null;
			x = !1;
			this.panel = i.panel || {};
			O = 0;
			Y = !1;
			V = 0;
			n.addObserver(alloy.portal, "exit", y);
			n.addObserver(alloy.portal, "DesktopSwitch", v);
			n.addObserver(EQQ, "LoginSuccess", Q);
			n.addObserver(b, "LoginFailure", D);
			n.addObserver(b, "VerifyLoginProtectSuccess", A);
			n.addObserver(b, "exit", j.onExit);
			n.addObserver(b, "needLogin", j.onNeedLogin);
			n.addObserver(EQQ.RPCService, "NotLogin", G);
			n.addObserver(EQQ.RPCService, "NotReLogin", J);
			n.addObserver(EQQ, "ReLinkStop", B);
			n.addObserver(EQQ.RPCService, "FailCountOverMax", H);
			n.addObserver(EQQ, "ReLinkSuccess", k);
			n.addObserver(EQQ, "ReLinkFailure", H);
			n.addObserver(EQQ, "UinNotInWhitelist", C);
			n.addObserver(EQQ, "UinInBlacklist", s);
			n.addObserver(EQQ, "Overload", E);
			n.addObserver(EQQ, "PtwebqqFail", F);
			n.addObserver(EQQ, "EQQLoginSuccess", R);
			n.addObserver(EQQ.RPCService, "LogoutSuccess", M);
			n.addObserver(EQQ.RPCService, "PollComplete", S);
			n.addObserver(EQQ.RPCService, "CheckProtectSuccess", I);
			n.addObserver(alloy.portal, "UACReady", K);
			b.createContainer();
			EQQ.RPCService.init();
			EQQ.Presenter.MainPanel.init();
			try {
				EQQ.Presenter.ChatBox.init(), EQQ.TaskBar.init()
			} catch (e) {}
			EQQ.Model.BuddyList.init();
			EQQ.Model.ChatMsg.init();
			!Number(d.cookie.get("hideusehttpstips")) && !alloy.config.getHttpsSetting() && EQQ.Presenter.MainPanel.View.showUseHttpsTips();
			EQQ.Presenter.MainPanel.getCookieTips();
			EQQ.Presenter.MainPanel.show();
			i = alloy.portal.getTryLoginState() || "";
			b.login(i)
		};
		this.loginEQQ = function() {
			this.showLogin()
		};
		this.getDefaultState = function() {
			return EQQ.hash.onlineStatus[d.string.mapQuery(window.location.search).login_state || "offline"]
		};
		this.getUserDefaultAvatar = function(i) {
			i = i || 40;
			return alloy.CONST.CDN_URL + "style/images/avatar_default_" + i + "_" + i + ".gif"
		};
		this.getFaceServer = function(i) {
			return EQQ.CONST.AVATAR_SERVER_DOMAINS[i % 10]
		};
		this.getUserAvatar = function(i, e, p) {
			e = "&vfwebqq=" + alloy.portal.getVfWebQQ();
			p && (e = "");
			return EQQ.getFaceServer(i) + "cgi/svr/face/getface?cache=0&type=1&fid=0&uin=" + i + e
		};
		this.getGroupAvatar = function(i) {
			return EQQ.getFaceServer(i) + "cgi/svr/face/getface?cache=0&type=4&fid=0&uin=" + i + "&vfwebqq=" + alloy.portal.getVfWebQQ()
		};
		this.getQzoneUrl = function(i) {
			return EQQ.CONST.QZONE_USER_SERVER_DOMAIN + i
		};
		this.getSendMailUrl = function(i) {
			return "http://mail.qq.com/cgi-bin/login?Fun=clientwrite&vm=pt&email=" + i + "@qq.com"
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
		this.setVfWebQQ = function(i) {
			f = i;
			alloy.portal.setVfWebQQ(i)
		};
		this.getPsessionid = function() {
			return q
		};
		this.getClientKey = function() {
			return t
		};
		this.dna_result_key = "";
		this.login = function(i) {
			EQQ.Presenter.MainPanel.showLogin();
			this.loginStart = (new Date).getTime();
			i = {
				status: i || "online",
				ptwebqq: alloy.portal.getPtwebqq(),
				passwd_sig: this.dna_result_key
			};
			EQQ.RPCService.sendLogin(i)
		};
		var z = function() {
				var i = alloy.config.configList.chatboxMode,
					e = alloy.config.configList.isNotNeedCtrlKey;
				EQQ.initChatboxMode(i);
				EQQ.initSendMsgKey(e);
				alloy.portal.getLoginLevel() > 2 && n.notifyObservers(EQQ, "eqqUacChange", {
					chatboxMode: i,
					isNotNeedCtrlKey: e
				})
			},
			K = function() {
				z()
			},
			I = function(i) {
				i.type == "nop" && EQQ.Presenter.MainPanel.toggleShow()
			},
			A = function(i) {
				if (i) b.dna_result_key = i, EQQ.Presenter.MainPanel.toggleShow()
			},
			y = function() {
				EQQ && EQQ.executeExit()
			},
			v = function(i) {
				n.notifyObservers(EQQ, "DesktopSwitch", i)
			};
		this.executeExit = function() {
			try {
				EQQ.View.ChatBox.onExitHotkey()
			} catch (i) {}
			d.cookie.remove("ptwebqq", alloy.CONST.MAIN_DOMAIN);
			n.notifyObservers(EQQ, "CloseWebQQ");
			n.removeObserver(alloy.portal, "DesktopSwitch", v);
			n.removeObserver(alloy.portal, "UACReady", K);
			try {
				EQQ.View.ChatBox.removeChatLogOptionPanel()
			} catch (e) {}
			o = {};
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
		this.reLogin = function(i) {
			var e = EQQ.Model.BuddyList.getSelf(),
				p = "offline",
				a = "online";
			if (e) p = e.state, a = e.oldState || "online";
			p == "offline" && (p = a == "offline" ? "online" : a);
			this.login(i || p)
		};
		var C = function() {
				window.location = alloy.CONST.MAIN_URL + "overload.html"
			},
			s = function() {},
			E = function() {
				window.location = alloy.CONST.MAIN_URL + "overload.html"
			},
			F = function() {
				d.out("onPtwebqqFail");
				D({
					text: "\u767b\u5f55\u5931\u8d25"
				});
				alloy.layout.showLoginWindow("eqq", !0, null, "\u9a8c\u8bc1\u4fe1\u606f\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01")
			},
			r = function() {
				var i = {
					status: EQQ.Model.BuddyList.getSelf().state,
					ptwebqq: alloy.portal.getPtwebqq(),
					passwd_sig: b.dna_result_key
				};
				try {
					d.cookie.set("uin", alloy.portal.getOriginalUin(), alloy.CONST.MAIN_DOMAIN), d.cookie.set("skey", alloy.portal.getSkey(), alloy.CONST.MAIN_DOMAIN), d.cookie.set("ptwebqq", alloy.portal.getPtwebqq(), alloy.CONST.MAIN_DOMAIN)
				} catch (e) {}
				EQQ.RPCService.sendReLink(i)
			},
			N = b.showEQQtips = function(i) {
				if (!b.eqqTips) {
					var p = b.eqqTips = new d.ui.Bubble({
						closeOnHide: !0
					});
					p.setTitle(i.title);
					p.setContent(i.content);
					p.showButton("ok", "\u767b\u5f55", !0);
					p.showButton("next", "\u53d6\u6d88");
					n.addObserver(p, "onBubbleOkBtnClick", function() {
						i.callback && i.callback();
						b.eqqTips = null
					});
					n.addObserver(p, "onBubbleClose", function() {
						b.eqqTips = null
					});
					n.addObserver(p, "onBubbleNextBtnClick", function() {
						e();
						i.cancle && i.cancle()
					});
					var a = alloy.taskBar.getTaskItem(50, 50);
					p.show({
						pointerPosition: "bottom right",
						pointerOffset: 15,
						pointerSize: [18, 12],
						target: a.getDom()
					})
				}
			},
			e = b.hideEQQtips = function() {
				if (b.eqqTips) b.eqqTips.close(), b.eqqTips = null
			},
			k = function(i) {
				w = 0;
				b.setVfWebQQ(i.vfwebqq);
				q = i.psessionid;
				e();
				this.startPoll();
				z();
				i = EQQ.Model.BuddyList.getSelf().state;
				n.notifyObservers(EQQ.Model.BuddyList, "SelfStateChange", i)
			},
			B = function() {
				b.stopPoll();
				e();
				n.notifyObservers(b, "SelfOffline", {
					message: "\u8eab\u4efd\u9a8c\u8bc1\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55",
					action: "relogin"
				})
			},
			H = function(i) {
				b.stopPoll();
				d.out("reLinkRetryCount: " + w);
				w >= 2 && (N({
					title: "\u8fde\u63a5\u4e2d\u65ad",
					content: "\u56e0\u7f51\u7edc\u6216\u5176\u4ed6\u539f\u56e0\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u6b63\u5728\u5c1d\u8bd5\u91cd\u65b0\u767b\u5f55...",
					callback: function() {
						h && clearTimeout(h);
						r()
					},
					cancle: function() {
						h && clearTimeout(h);
						EQQ.View.MainPanel.setSelfState("offline")
					}
				}), n.notifyObservers(EQQ.Model.BuddyList, "SelfStateChange", "offline"));
				i && i.hasOwnProperty("t") ? h = setTimeout(function() {
					r()
				}, (parseInt(i.t) || 0) * 1E3) : i || (h = setTimeout(function() {
					r()
				}, 1E4));
				w++
			},
			G = function() {
				n.notifyObservers(b, "SelfOffline", {
					message: "\u4f60\u7684\u767b\u5f55\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002",
					action: "relogin"
				})
			},
			J = function() {
				n.notifyObservers(b, "SelfOffline", {
					message: "\u56e0\u7f51\u7edc\u6216\u5176\u4ed6\u539f\u56e0\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002",
					action: "relogin"
				})
			},
			M = function() {
				n.notifyObservers(EQQ, "exitSuccess")
			},
			S = function() {
				EQQ.getIsLogin() && typeof EQQ !== "undefined" && EQQ.keepPoll()
			},
			R = function() {
				var i = alloy.app.eqq.getRunOption();
				if (i && i.directChat) {
					var e = i.directChatType,
						p = i.directChat;
					setTimeout(function() {
						EQQ.handleNotification(p, e) || WebqCore.api.call(["chat", [e, p]])
					}, 500);
					delete i.directChat;
					delete i.directChatType
				}
			},
			Q = function(i) {
				d.out("\u767b\u5f55\u7b2c\u4e00\u6b65\u6210\u529f");
				w = 0;
				b.setVfWebQQ(i.vfwebqq);
				q = i.psessionid;
				t = i.clientkey;
				EQQ.setIsLogin(!0);
				n.notifyObservers(alloy.portal, "GetLoginInfoSuccess");
				b.start(i);
				z();
				e();
				d.debug(">>>EQQ.js - onLoginSuccess")
			};
		this.start = function() {
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
				o = {};
				n.addObserver(EQQ, "MessageReceive", i);
				alloy.notifier.register("eqq", null, p);
				EQQ.startPoll();
				EQQ.Model.BuddyList.sendGetDiscuList(function() {
					n.notifyObservers(alloy.portal, "BeforeGetRecentList");
					EQQ.Model.BuddyList.sendGetRecentList({})()
				});
				alloy.rpcService.sendGetSignature(alloy.portal.getUin());
				alloy.portal.setLoginLevel(alloy.CONST.LOGIN_LEVEL_ALL);
				setTimeout(function() {
					WebqCore.api.makeCall()
				}, 13);
				alloy.util.report2h("eqqGetData", "end_eqqGetData", "ok");
				alloy.portal.speedTest.sRTS(11, "end", new Date, !0);
				n.notifyObservers(EQQ, "EQQLoginSuccess");
				n.notifyObservers(alloy.portal, "EQQLoginSuccess");
				setTimeout(function() {
					WebqCore.api.call(["chat", []])
				}, 12E4)
			});
			if (!g) g = !0, this.timer = window.setInterval(ha, 6E4)
		};
		this.handleNotification = function(i, e) {
			var p = i + e;
			if (o[p] && o[p].length) {
				for (var p = o[p] || [], a = !1, j; j = p.pop();) a ? alloy.messageSystem.handleNotification(j) : a = alloy.messageSystem.handleNotification(j);
				return a
			} else return !1
		};
		var P = function(i, p) {
				var e, a;
				a = {
					uin: p,
					title: i.uiuin || p,
					content: "",
					count: 1,
					t: new Date,
					type: i.type,
					time: i.time || d.date.format(new Date, "YYYY-MM-DD hh:mm:ss"),
					extra: {}
				};
				e = {
					from: 50,
					type: "Unkown",
					body: a
				};
				switch (i.type) {
				case "single":
					var j = !1;
					i.attach && i.attach.type == "shake" && (j = !0);
					var c = WebqCore.api.__api.getChatBox(p),
						D = !1,
						k = !1;
					(D = !! c) && (k = c === EQQ.Presenter.ChatBox.getCurrent());
					if (j) if (c && c.isShow() && c.desktopIndex == alloy.desktopManager.getCurrentDesktopIndex() && alloy.layout.getIsFocusOnDesktop()) c.setCurrent(), c.shake();
					else if (!c && alloy.layout.getIsFocusOnDesktop()) {
						WebqCore.api.call(["chat", ["single", p, function(i) {
							i = WebqCore.api.__api.getChatBox(i);
							i.show();
							i.setCurrent();
							i.shake()
						}]]);
						e = null;
						break
					}
					e.type = "SingleChat";
					a.title = i.sender ? i.sender.htmlShowName || p : p;
					a.content = EQQ.util.trimChatMsg(i);
					a.extra = {
						isChatBoxOpen: D,
						isChatBoxCurrent: k,
						attachType: !d.isUndefined(i.attach) && !d.isUndefined(i.attach.type) && i.attach.type.indexOf("file") > -1 ? "file" : ""
					};
					break;
				case "group":
					c = WebqCore.api.__api.getChatBox(p);
					k = D = !1;
					(D = !! c) && (k = c === EQQ.Presenter.ChatBox.getCurrent());
					if (!EQQ.Model.BuddyList.isGroupPrompt(p)) {
						e = null;
						break
					}
					e.type = "GroupChat";
					j = EQQ.Model.BuddyList.getGroupByGid(p);
					a.code = j.code;
					a.title = j ? j.htmlShowName || p : p;
					a.content = EQQ.util.trimChatMsg(i);
					a.extra = {
						isChatBoxOpen: D,
						isChatBoxCurrent: k
					};
					break;
				case "discu":
					c = WebqCore.api.__api.getChatBox(p);
					k = D = !1;
					(D = !! c) && (k = c === EQQ.Presenter.ChatBox.getCurrent());
					if (!EQQ.Model.BuddyList.isDiscuPrompt(p)) {
						e = null;
						break
					}
					e.type = "DiscuChat";
					j = EQQ.Model.BuddyList.getDiscuById(p);
					a.title = j ? j.htmlName || p : p;
					a.content = EQQ.util.trimChatMsg(i);
					a.extra = {
						isChatBoxOpen: D,
						isChatBoxCurrent: k
					};
					break;
				case "add_buddy":
					e.type = "BuddyAdd";
					a.content = i.content;
					a.title = i.title;
					a.extra = i.opt;
					break;
				case "join_group":
					e.type = "GroupJoin";
					a.content = i.content;
					a.title = i.title;
					a.extra = i.opt;
					break;
				default:
					e = null
				}
				return e
			},
			i = function(i) {
				var p, e = i.uin || i.gid || i.did,
					a;
				for (a in i.msgList) {
					var j = i.msgList[a];
					if (!e) e = j.from_uin;
					var d = e + j.type,
						c = !1;
					/(single)|(group)|(discu)/.test(j.type) && (c = !0, o[d] || (o[d] = []));
					if (p = P(j, e)) {
						if (c) p.body.count = o[d].length + 1;
						var D;
						EQQ.Presenter.ChatBox && (D = EQQ.Presenter.ChatBox.getCurrent());
						if (alloy.layout.getIsFocusOnDesktop() && D && D.uin == e && D.isShow()) p.body.extra.isChatBoxCurrent = !0;
						p = alloy.messageSystem.notify(p);
						c && o[d].push(p)
					} else if (c) d = j.type, c = e + d, b.handleNotification(e, d), o[c] = null
				}
			},
			p = function(i) {
				var p = i.body,
					e = p.uin,
					a = p.type,
					j = e + a;
				b.handleNotification(e, a);
				o[j] = null;
				switch (i.type) {
				case "SingleChat":
					WebqCore.api.call(["chat", ["single", p.uin]]);
					break;
				case "GroupChat":
					d.profile("EQQ.onNotifyHasHandled - group.code: " + p.code);
					WebqCore.api.call(["chat", ["group", p.code]]);
					break;
				case "DiscuChat":
					d.profile("EQQ.onNotifyHasHandled - group.code: " + p.uin);
					WebqCore.api.call(["chat", ["discu", p.uin]]);
					break;
				case "BuddyAdd":
					alloy.portal.runApp("buddyAdder", p.extra);
					break;
				case "GroupJoin":
					alloy.portal.runApp("groupSystemMsg", p.extra)
				}
			},
			D = function(i) {
				EQQ.setIsLogin(!1);
				d.out("\u5bf9\u4e0d\u8d77\uff0c\u767b\u5f55\u5931\u8d25\uff01");
				alloy.portal.setLoginLevel(alloy.CONST.LOGIN_LEVEL_NOCHAT);
				EQQ.Presenter.MainPanel.showReLoginPanel(i.text)
			},
			L = 0,
			ha = function() {
				L > 240 && (L = 0);
				n.notifyObservers(EQQ, "NotifyBeat_1");
				L % 2 == 0 && n.notifyObservers(EQQ, "NotifyBeat_2");
				L % 5 == 0 && (n.notifyObservers(EQQ, "NotifyBeat_5"), L % 10 == 0 && (n.notifyObservers(EQQ, "NotifyBeat_10"), L % 30 == 0 && (n.notifyObservers(EQQ, "NotifyBeat_30"), L % 60 == 0 && (n.notifyObservers(EQQ, "NotifyBeat_60"), L % 120 == 0 && (n.notifyObservers(EQQ, "NotifyBeat_120"), L % 240 == 0 && n.notifyObservers(EQQ, "NotifyBeat_240"))))));
				L++
			},
			Z, O = 0,
			Y = !1,
			V = 0;
		this.startBeat2 = function() {
			Y = !0;
			O = 0;
			Z = window.setInterval(ca, 250);
			d.out(">>>>>>>>>: startBeat2")
		};
		this.stopBeat = function() {
			this.stopBeat2();
			window.clearInterval(this.timer);
			this.timer = null
		};
		this.stopBeat2 = function() {
			Y = !1;
			window.clearInterval(Z);
			O = 0;
			Z = null;
			d.out(">>>>>>>>>: stopBeat2")
		};
		this.isStartBeat2 = function() {
			return Y
		};
		this.addNeedBeat2 = function(i) {
			a[i] || (a[i] = !0, V++);
			EQQ.isStartBeat2() || EQQ.startBeat2()
		};
		this.removeNeedBeat2 = function(i) {
			a[i] && (V > 0 && V--, delete a[i]);
			V === 0 && EQQ.stopBeat2()
		};
		var ca = function() {
				O > 5E3 && (O = 0);
				n.notifyObservers(EQQ, "NotifyBeat_250");
				O % 2 == 0 && (n.notifyObservers(EQQ, "NotifyBeat_500"), O % 6 == 0 && n.notifyObservers(EQQ, "NotifyBeat_1000"), O % 10 == 0 && (n.notifyObservers(EQQ, "NotifyBeat_3000"), O % 20 == 0 && n.notifyObservers(EQQ, "NotifyBeat_5000")));
				O++
			};
		this.startPoll = function() {
			this.setNeedPollFlag(!0);
			this.keepPoll();
			EQQ.RPCService.pollWatcher.startWatch()
		};
		this.keepPoll = function() {
			this.getNeedPollFlag() && EQQ.RPCService.sendPoll()
		};
		this.setNeedPollFlag = function(i) {
			return x = i
		};
		this.getNeedPollFlag = function() {
			return x
		};
		this.stopPoll = function() {
			this.setNeedPollFlag(!1);
			EQQ.RPCService.pollWatcher.stopWatch()
		};
		this.setIsLogin = function(i) {
			m = i
		};
		this.getIsLogin = function() {
			return m
		};
		this.getChatboxMode = function() {
			return b.chatboxMode ? b.chatboxMode : "free"
		};
		this.getSendMsgKey = function() {
			return b.isNotNeedCtrlKey
		};
		this.setSendMsgKey = function(i) {
			b.isNotNeedCtrlKey = i;
			alloy.rpcService.sendSetConfig({
				context: this,
				data: {
					retype: 1,
					r: {
						appid: qqweb.config.__eqqid,
						value: {
							isNotNeedCtrlKey: i
						}
					}
				}
			});
			alloy.hotkeyManager.setSendHotKey(i)
		};
		this.initSendMsgKey = function(i) {
			b.isNotNeedCtrlKey = i
		};
		this.initChatboxMode = function(i) {
			b.chatboxMode = i
		};
		this.setChatboxMode = function(i) {
			b.chatboxMode = i;
			alloy.rpcService.sendSetConfig({
				context: this,
				data: {
					retype: 1,
					r: {
						appid: qqweb.config.__eqqid,
						value: {
							chatboxMode: i
						}
					}
				}
			})
		};
		this.getLoadLoginScript = function() {
			return this.isLoadEqqScript
		};
		this.setLoadLoginScript = function(i) {
			this.isLoadEqqScript = i
		};
		this.videoNotify = function(i) {
			d.profile("videoNotify", "video");
			var p = i.type,
				e = i.uin;
			if (p && e) switch (p) {
			case "msg":
				EQQ.Presenter.ChatBox.appendVideoMsg(i.uin, i.context);
				break;
			case "setVideoId":
				d.profile("setVideoId" + i.context, "video");
				EQQ.Presenter.ChatBox.setVideoId(e, i.context);
				break;
			case "pop":
				EQQ.Presenter.ChatBox.popVideoWindow(e);
				break;
			case "inner":
				EQQ.Presenter.ChatBox.innerVideoWindow(e);
				break;
			case "close":
				i.context && EQQ.Presenter.ChatBox.appendVideoMsg(i.uin, i.context), EQQ.Presenter.ChatBox.closeVideo(i.uin)
			}
		};
		this.sendMsg = function(i, p) {
			EQQ.Model.ChatMsg.sendMsg({
				type: "single",
				to: i,
				content: [p],
				isIgnoreHistory: !0
			})
		}
	})
})();
(function() {
	WebqCore.register("EQQ.util", function(d) {
		var b = d.dom,
			c = d.string,
			n = {},
			l = 1,
			g = function(b, g) {
				var x = null;
				if (b.from_uin && b.msg_id && b.raw_time && (x = String(b.from_uin) + String(b.msg_id) + String(b.raw_time), n[x] && (d.isUndefined(b.attach) || !d.isUndefined(b.attach) && b.content[0][0] != "rfile"))) return n[x];
				var o = "";
				if (g) for (var u = 0; u < b.content.length; u++) {
					var j = b.content[u];
					if (j[0] === "face") o += a(j[1]);
					else if (j[0] === "cface") o += b.type == "group" || b.type == "discu" ? w(j[2]) : w(j[1]);
					else if (j[0] === "cface_idx") o += b.type == "group" || b.type == "discu" ? w(j[2]) : w(j[1]);
					else if (j[0] !== "pic_id" && j[0] !== "image") if (j[0] === "offpic") {
						var z = EQQ.Model.ChatMsg.getSendPicUrlByFilePath(j[1]);
						z != "" && (o += '<img src="' + z + '" id="cface_' + l+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />')
					} else j[0] === "rffile" ? o += '<div class="msgFileBox">\u60a8\u62d2\u7edd\u63a5\u6536"' + c.encodeHtmlSimple(j[1]) + '",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "agfile" ? o += '<div class="msgFileBox">\u60a8\u540c\u610f\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '".</div>' : j[0] === "sendfile" ? o += '<div class="msgFileBox">\u60a8\u53d1\u9001\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u7ed9\u5bf9\u65b9.</div>' : j[0] === "sendofffile" || j[0] === "sendofffileerror" || j[0] === "refuseofffile" || j[0] === "nextofffile" || j[0] === "canceloffupload" || j[0] === "notifyagreeofffile" || j[0] === "notifyrefuseofffile" ? o += '<div class="msgFileBox">' + c.encodeHtmlSimple(j[1]) + "</div>" : j[0] === "uploadingofffile" ? (o += '<div class="msgFileBox">' + c.encodeHtmlSimple(j[1]), o += '<span class="fileAct">', o += '<a href="#" id="cancal_uploadOffFile_' + b.attach.ts + '">[\u53d6\u6d88]</a>', o += "</span></div>") : j[0] === "transtimeout" ? o += '<div class="msgFileBox">\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u8d85\u65f6,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "refusedbyclient" ? o += '<div class="msgFileBox">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "transok" ? o += '<div class="msgFileBox">\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u4f20\u8f93\u6210\u529f.</div>' : j[0] === "transerror" ? o += '<div class="msgFileBox">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u6216\u4f20\u8f93\u9519\u8bef,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : d.isArray(j) || (o += f(c.encodeHtmlSimple(f(j, 1)), 2))
				} else {
					var u = b.sender_uin || b.from_uin,
						z = b.from_uin || 0,
						K = [],
						I, A, y;
					for (y = b.content[0][0] !== "font" ? 0 : 1; y < b.content.length; y++) if (j = b.content[y], d.isString(j) && j.substr(0, 4) === "\u3000  \u3000") b.content[0] = [], j = "", d.platform.iPad && (j = "\u4f46\u60a8\u4f7f\u7528\u7684\u8bbe\u5907\u4e0d\u652f\u6301\u89c6\u9891\u901a\u8bdd\u529f\u80fd\u3002"), o += '<div class="msgFileBox">\u5bf9\u65b9\u5411\u60a8\u53d1\u8d77\u89c6\u9891\u9080\u8bf7\u3002' + j + "</div>";
					else if (j[0] === "video") o += '<div class="msgFileBox">' + j[1] + "</div>";
					else if (j[0] === "face") o += a(j[1]);
					else if (j[0] === "cface") if (K.push(j), b.type == "group" || b.type == "discu") {
						var v = b.group_code || EQQ.Model.BuddyList.decodeDid(b.did),
							j = j[1],
							C = b.sender_uin,
							s = b.raw_time,
							E = b.group_code ? 0 : 1,
							F = j.server.toString().split(":"),
							j = '<img src="' + EQQ.CONST.CHAT_PIC_SERVER + "cgi-bin/get_group_pic?type=" + E + "&gid=" + v + "&uin=" + C + "&rip=" + F[0] + "&rport=" + F[1] + "&fid=" + j.file_id + "&pic=" + encodeURIComponent(j.name) + "&vfwebqq=" + alloy.portal.getVfWebQQ() + "&t=" + s + '" id="_cface_' + l+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />';
						o += j
					} else o += h(b.msg_id, j[1], u), alloy.util.report2m(133157), alloy.util.report2m(133158);
					else j[0] === "cface_idx" ? b.type == "group" || b.type == "discu" ? (v = b.group_code || EQQ.Model.BuddyList.decodeDid(b.did), j = K[j[1]][1], C = Math.round((new Date).getTime() / 1E3), j = '<img src="' + EQQ.CONST.AVATAR_SERVER_DOMAIN + "cgi/svr/chatimg/get?pic=" + encodeURIComponent(j.name) + "&gid=" + v + "&time=" + C + '" id="_cface_' + l+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />', o += j) : o += h(b.msg_id, K[j[1]][1], u) : j[0] === "pic_id" ? (v = EQQ.Model.BuddyList.getUserByUin(u), !v.type || v.type == "groupBuddy" ? A = !0 : I = j[1]) : j[0] === "image" ? A ? o += "\u3010\u56fe\u7247\u3011\uff08\u5bf9\u65b9\u53d1\u9001\u4e86\u4e00\u5f20\u56fe\u7247\uff0cQ+ Web\u4e34\u65f6\u4f1a\u8bdd\u6682\u4e0d\u652f\u6301\u63a5\u6536\uff09" : (o += '<img rdata="image" src="' + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_image2?lcid=" + b.msg_id + "&guid={" + I + "}" + j[2] + "." + j[1] + "&to=" + u + "&count=1&time=1&psessionid=" + EQQ.getPsessionid() + "&clientid=" + EQQ.Model.ChatMsg.getClientidFromRpc() + '" id="_cface_' + l+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />', alloy.util.report2m(133153), alloy.util.report2m(133154)) : j[0] === "offpic" ? (o += j[1].success == 1 ? '<img rdata="offpic" src="' + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_offpic2?file_path=" + encodeURIComponent(j[1].file_path) + "&f_uin=" + z + "&clientid=" + EQQ.Model.ChatMsg.getClientidFromRpc() + "&psessionid=" + EQQ.getPsessionid() + '" id="_cface_' + l+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />' : '<img src="' + alloy.CONST.CDN_URL + 'style/images/img_error.gif" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5\u63a5\u6536\u9519\u8bef\u6216\u4e0d\u5b58\u5728" />', alloy.util.report2m(133167)) : j[0] === "rfile" ? (v = b.from_uin + "_" + j[2], C = EQQ.Model.ChatMsg.getFilesList(), o += '<div class="msgFileBox">\u5bf9\u65b9\u7ed9\u60a8\u53d1\u9001\u6587\u4ef6:<br />', o += '<span class="icon_' + q(j[1]) + '">&nbsp;</span>' + c.encodeHtmlSimple(j[1]), o += '<span class="fileAct">', C[v].isread ? o += "&nbsp;[\u540c\u610f][\u62d2\u7edd]" : (o += '&nbsp;<a id="agree_' + v + '" href="#">[\u540c\u610f]</a>', o += '&nbsp;<a id="refuse_' + v + '" href="#">[\u62d2\u7edd]</a>'), o += "</span>", o += "</div>") : j[0] === "rffile" ? o += '<div class="msgFileBox">\u5bf9\u65b9\u53d6\u6d88\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "rtfile" ? o += '<div class="msgFileBox">\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '"\u8d85\u65f6,\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "wrfile" ? o += '<div class="msgFileBox">\u5bf9\u65b9\u5df2\u540c\u610f\u63a5\u6536"' + c.encodeHtmlSimple(j[1]) + '",\u5f00\u59cb\u4f20\u8f93\u6587\u4ef6.</div>' : j[0] === "wrffile" ? o += '<div class="msgFileBox">\u5bf9\u65b9\u62d2\u7edd\u4e86\u63a5\u6536\u6587\u4ef6"' + c.encodeHtmlSimple(j[1]) + '",\u6587\u4ef6\u4f20\u8f93\u5931\u8d25.</div>' : j[0] === "cvideo" ? (o += c.encodeHtmlSimple(j[1]), o += '&nbsp;<a id="video_' + b.attach.from_uin + "_" + b.attach.msg_id + '" fromuin="' + b.attach.from_uin + '" href="###">\u53d1\u8d77\u89c6\u9891</a>') : (j[0] === "video" ? j = c.encodeHtmlSimple(j[1]) : j[0] === "offfile" ? (j = b, v = j.attach.from_uin + "_" + j.attach.msg_id, C = d.date.format(new Date(j.attach.expire_time * 1E3), "YYYY-MM-DD"), s = '<div class="msgFileBox">\u5bf9\u65b9\u7ed9\u60a8\u53d1\u9001\u79bb\u7ebf\u6587\u4ef6:<br />', s += '<span class="icon_' + q(j.attach.name) + '">&nbsp;</span>' + c.encodeHtmlSimple(j.attach.name) + "(" + C + "\u5230\u671f)", s += '<span class="fileAct">', s += '&nbsp;<a id="agree_' + v + '" href="#" fuin="' + j.from_uin + '" rkey="' + j.attach.rkey + '">[\u63a5\u6536]</a>', s += '&nbsp;<a id="next_' + v + '" href="#" fuin="' + j.from_uin + '" rkey="' + j.attach.rkey + '">[\u4e0b\u6b21\u63a5\u6536]</a>', s += '&nbsp;<a id="refuse_' + v + '" href="#">[\u62d2\u7edd]</a>', s += "</span>", s += "</div>", j = s) : j = j[0] === "shake" ? '<div class="msgFileBox">' + c.encodeHtmlSimple(j[1]) + "</div>" : f(c.encodeHtmlSimple(f(j, 1)), 2), o += j)
				}
				o = o.replace(/\r\n|\r|\n/ig, "<br />");
				x && (n[x] = o);
				return o
			},
			a = function(a) {
				return '<img class="EQQ_faceImg" src="' + EQQ.CONST.SYSTEM_FACE_URL + EQQ.CONST.T_TRANSFER_TABLE[a] + '.gif" />'
			},
			h = function(a, d, c, b) {
				return '<img rdata="cface" src="' + EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_cface2?lcid=" + a + "&guid=" + encodeURIComponent(d) + "&to=" + c + "&count=" + (b || 5) + "&time=1&clientid=" + EQQ.RPCService.getClientId() + "&psessionid=" + EQQ.getPsessionid() + '" id="_cface_' + l+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />'
			},
			w = function(a) {
				return '<img src="' + EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/?cmd=2&bd=" + a + '" id="_cface_' + l+++'" title="\u56fe\u7247\u6216\u81ea\u5b9a\u4e49\u8868\u60c5" />'
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
		var q = function(a) {
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
					b = d.string.encodeHtmlAttributeSimple(a[1].name + ""),
					b = (b = b.match(/\u5b8b\u4f53|\u9ed1\u4f53|\u96b6\u4e66|\u5fae\u8f6f\u96c5\u9ed1|\u6977\u4f53_GB2312|\u5e7c\u5706|Arial Black|Arial|Verdana|Times New Roman/)) ? b[0] : "\u5b8b\u4f53",
					f = a[1].color.match(/([0-9a-f]{6})/),
					f = f ? f[0] : "000";
				return "color:#" + f + ";font-family:" + b + ";font-size:" + Number(a[1].size) + "pt;font-weight:" + (c[0] ? "bold" : "normal") + ";font-style:" + (c[1] ? "italic" : "normal") + ";text-decoration:" + (c[2] ? "underline" : "none") + ";"
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
			for (var a = d.json.parse(a.content), b = "", f = 0; f < a.length; f++) {
				var g = a[f];
				if (d.isArray(g)) if (g[0] == "face") b += "[\u56fe\u7247]";
				else {
					if (g[0] == "cface" || g[0] == "offpic") b += "[\u56fe\u7247]"
				} else g == "\n" || g == " " || (b += g)
			}
			b = b.replace(EQQ.CONST.WEBQQMSGTIPS, "");
			b.length > 20 && (b = c.cutByBytes(b.toString(), 20) + "...");
			return c.encodeHtmlSimple(b)
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
						d = b.getScrollHeight(this.target);
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
		function b() {
			var a = this;
			this.pollRequst = void 0;
			this.POLLTICK = 0;
			this._check = function() {
				a.check()
			}
		}
		var c = this,
			n = this,
			l = d.event;
		(new Date).getTime();
		var g = 0,
			a = String(d.random(0, 99)) + String((new Date).getTime() % 1E6),
			h = 0,
			w = !1,
			f = 0,
			q = EQQ.CONST.CONN_SERVER_DOMAINS[0],
			t, m = function() {
				return function(a, d) {
					try {
						if (arguments.length == 2) return !d || arguments.callee(a);
						else {
							var c = alloy.portal.getUin();
							if (a.status) var b = [c, a.status, a.responseText.replace(/[\r\t\n\s]/g, "") + ":", decodeURIComponent(a.data), a.uri].join("$");
							else a = a.o, b = [c, a.status, a.responseText.replace(/[\r\t\n\s]/g, "") + ":", decodeURIComponent(a.data), a.uri].join("$");
							alloy.rpcService.formSend("http://tj.qstatic.com/log", {
								method: "POST",
								data: {
									r: b.replace(/,"/g, ":").replace(/[{"}]/g, "")
								}
							})
						}
					} catch (f) {}
				}
			},
			m = m(),
			x = function() {
				g++;
				d.out("onFail: " + g);
				g > 4 && (g = 0, l.notifyObservers(c, "FailCountOverMax"))
			},
			o = [];
		this.onAjaxFrameLoad = function() {
			d.out((void 0).readyState, null, 1);
			if (t = window.frames.EQQ_ProxySendIframe.ajax) {
				w = !1;
				for (var a = 0; a < o.length; ++a) {
					var c = 0 % EQQ.CONST.CONN_PROXY_URLS.length,
						b = o[a].url;
					if (b.indexOf(EQQ.CONST.CONN_SERVER_DOMAINS[c]) == -1) b = b.replace(/http:\/\/.*.com\//, ""), o[a].url = EQQ.CONST.CONN_SERVER_DOMAINS[c] + b;
					b = o[a].url;
					c = o[a].option;
					try {
						return u(b, c)
					} catch (f) {
						d.out("eqq ajax\u4ee3\u7406\u51fa\u9519\uff1a" + b + " " + EQQ.CONST.CONN_PROXY_URL);
						if (!c.onError) break;
						b = {};
						b.arguments = c.arguments || {};
						c.onError.call(c.context, b)
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
				var b = {
					method: c.method || "GET",
					enctype: c.enctype || "",
					data: c.data || {},
					arguments: c.arguments || {},
					context: c.context || null,
					timeout: c.timeout,
					onSuccess: function(a) {
						var j = {},
							b = !1;
						a.responseText = a.responseText || "-";
						try {
							j = d.json.parse(a.responseText)
						} catch (f) {
							a.responseText += ":BJF:", b = !0, d.out("JSON\u683c\u5f0f\u51fa\u9519:" + f)
						} finally {
							j.arguments = c.arguments || {}, j.o = a, c.onSuccess.call(c.context, j, b)
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
				b.data.clientid = a;
				b.data.psessionid = EQQ.getPsessionid();
				if (w) b.onError();
				else {
					alloy.portal.recoverCookie();
					b.data = d.string.toQueryString(b.data);
					if (b.method == "GET") {
						var f = b.data;
						c.cacheTime === 0 && (f += f ? "&t=" + (new Date).getTime() : "t=" + (new Date).getTime());
						if (f) {
							var g = alloy.portal.getVfWebQQ();
							g && !/channel/ig.test(j) && (f += "&vfwebqq=" + g);
							j = j + "?" + f
						}
						b.data = null
					} else b.contentType = "application/x-www-form-urlencoded", j.indexOf("?");
					return t(j, b)
				}
			};
		this._proxy = function(c, d, b) {
			var f = EQQ.CONST.CONN_PROXY_URLS[0];
			if (!d.data) d.data = {};
			d.data.clientid = a;
			d.data.psessionid = EQQ.getPsessionid();
			b = alloy.config.getHttpsSetting();
			alloy.rpcService.eqqSend(c, d, f, b)
		};
		b.prototype = {
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
					l.addObserver(EQQ, "NotifyBeat_2", this._check)
				} catch (a) {}
				this.POLLTICK = 0
			},
			stopWatch: function() {
				d.out("PollWatcher: stop...");
				try {
					l.removeObserver(EQQ, "NotifyBeat_2", this._check)
				} catch (a) {}
				this.POLLTICK = 0
			}
		};
		this.pollWatcher = new b;
		this.init = function() {};
		this.getClientId = function() {
			return a
		};
		this.send = this._proxy;
		this.sendLogin = function(c) {
			if (window.webTop) c.v = Number(webTop.version) + 1E4;
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(q + "channel/login2", {
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
				l.notifyObservers(EQQ, "LoginSuccess", a.result);
				alloy.portal.speedTest.sRTS(4, "start", new Date);
				alloy.portal.speedTest.sRTS(5, "start", new Date);
				break;
			case 103:
				l.notifyObservers(this, "NotLogin", a.result);
				break;
			case 106:
				l.notifyObservers(EQQ, "UinNotInWhitelist", a.result);
				break;
			case 111:
				l.notifyObservers(EQQ, "UinInBlacklist", a.result);
				break;
			case 112:
				l.notifyObservers(EQQ, "Overload", a.result);
				break;
			case 1E5:
			case 100001:
			case 100002:
				l.notifyObservers(EQQ, "PtwebqqFail", a.result);
				break;
			default:
				d.out("\u672a\u77e5\u767b\u5f55\u5931\u8d25"), l.notifyObservers(EQQ, "LoginFailure", {
					text: "\u8fde\u63a5\u5931\u8d25"
				}), d.out("[sendLogin] error: " + a.retcode), m(a, !c)
			}
			alloy.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", ["ok"][a.retcode] || a.retcode);
			m(a, c);
			alloy.portal.speedTest.sRTS(16, "end", new Date, !0)
		};
		this.sendLoginError = function(a) {
			d.out("sendLoginError");
			l.notifyObservers(EQQ, "LoginFailure", {
				text: "\u8fde\u63a5\u5931\u8d25"
			});
			alloy.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", "error");
			m(a)
		};
		this.sendLoginTimeout = function(a) {
			d.out("sendLoginError");
			l.notifyObservers(EQQ, "LoginFailure", {
				text: "\u8fde\u63a5\u5931\u8d25"
			});
			alloy.util.report2h("eqqLoginCgi", "end_eqqLoginCgi", "timeout");
			m(a)
		};
		this.sendLogout = function(a) {
			a = a || {};
			a.ids = EQQ.Model.ChatMsg.getMessageRead();
			this.send(q + "channel/logout2", {
				context: this,
				data: a,
				onSuccess: function(a) {
					a.retcode === 0 || a.retcode === 100 ? (f = 0, l.notifyObservers(this, "LogoutSuccess", a.result), d.out(":LogoutSuccess...")) : d.out("[SendLogout] error: " + a.retcode)
				}
			})
		};
		this.sendReLink = function(j) {
			if (window.webTop) j.v = Number(webTop.version) + 1E4;
			j.clientid = a;
			j.psessionid = EQQ.getPsessionid();
			if (c._state) j.status = c._state;
			this.send(q + "channel/login2", {
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
				l.notifyObservers(EQQ, "ReLinkSuccess", a.result);
				break;
			case 103:
				l.notifyObservers(this, "NotReLogin", a.result);
				break;
			case 113:
			case 115:
			case 112:
				l.notifyObservers(EQQ, "ReLinkFailure", a);
				break;
			default:
				l.notifyObservers(EQQ, "ReLinkStop"), m(a, !c)
			}
			m(a, c)
		};
		this.sendReLinkError = function(a) {
			d.out("sendReLinkError");
			l.notifyObservers(EQQ, "ReLinkFailure");
			m(a)
		};
		this.sendReLinkTimeout = function(a) {
			d.out("sendReLinkTimeout");
			l.notifyObservers(EQQ, "ReLinkFailure");
			m(a)
		};
		this.sendGetOnlineBuddies = function() {
			this.send(q + "channel/get_online_buddies2", {
				context: this,
				data: {},
				onSuccess: function(a, c) {
					a.retcode === 0 ? l.notifyObservers(this, "GetOnlineBuddiesSuccess", a.result) : m(a, !c);
					m(a, c)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(q + "channel/send_buddy_msg2", {
				context: this,
				cacheTime: 0,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, b) {
					a.retcode === 0 ? l.notifyObservers(this, "SendMsgSuccess", a.result) : (d.out("[sendMsg] error: " + a.retcode + "-" + a.errmsg), l.notifyObservers(this, "SendMsgError", {
						uin: c.to,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendMsg,
						cbParam: c
					}), m(a, !b));
					m(a, b)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendGroupMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(q + "channel/send_qun_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, b) {
					a.retcode === 0 ? l.notifyObservers(this, "SendGroupMsgSuccess", a.result) : (d.out("[sendGroupMsg] error: " + a.retcode + "-" + a.errmsg), l.notifyObservers(this, "SendMsgError", {
						uin: c.group_uin,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendGroupMsg,
						cbParam: c
					}), m(a, !b));
					m(a, b)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendPoll = function(b) {
			b = b || {};
			b = b.data || {};
			alloy.portal.isLocked() && alloy.portal.revertLockCookie();
			b.clientid = a;
			b.psessionid = EQQ.getPsessionid();
			b.key = alloy.portal.getSecretKey();
			if (h < f) h++, b.ids = EQQ.Model.ChatMsg.getMessageRead(), c.pollWatcher.pollRequst = this.send(q + "channel/poll2", {
				context: this,
				cacheTime: 0,
				method: "POST",
				data: {
					r: d.json.stringify(b)
				},
				timeout: 9E4,
				onSuccess: this.sendPollSuccess,
				onError: this.sendPollError,
				onTimeout: this.sendPollTimeout
			});
			alloy.portal.isLocked() && alloy.portal.saveAndDelLockCookie()
		};
		this.sendPollSuccess = function(a, b) {
			c.pollWatcher.pollStop();
			(new Date).getTime();
			h--;
			if (a.retcode === 0 || a.retcode === 102) {
				g = 0;
				try {
					l.notifyObservers(this, "PollSuccess", a.result)
				} catch (f) {
					d.out("PollSuccess, but [PollSuccess notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1)
				}
				try {
					l.notifyObservers(this, "PollComplete")
				} catch (q) {
					d.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1)
				}
			} else if (a.retcode === 100) l.notifyObservers(this, "NotReLogin");
			else if (a.retcode === 120) l.notifyObservers(EQQ, "ReLinkFailure", a);
			else if (a.retcode === 121) l.notifyObservers(EQQ, "ReLinkFailure", a);
			else if (a.retcode === 116) alloy.portal.setPtwebqq(a.p), l.notifyObservers(this, "PollComplete");
			else {
				try {
					l.notifyObservers(n, "PollComplete")
				} catch (t) {
					d.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1)
				}
				a.retcode != 109 && a.retcode != 110 && x()
			}
			m(a, b)
		};
		this.sendPollTimeout = function() {
			c.pollWatcher.pollStop();
			h--;
			try {
				l.notifyObservers(this, "PollComplete")
			} catch (a) {
				d.out("PollComplete, but [PollComplete notify] error!!!!!!!!!!!!!!!!!!!!!!!!", 1)
			}
			x()
		};
		this.sendPollError = function(a) {
			this.sendPollTimeout(a);
			m(a)
		};
		this.sendChangeStatus = function(a) {
			a = a || {
				newstatus: "hidden"
			};
			this.send(q + "channel/change_status2", {
				context: this,
				data: a,
				arguments: a,
				onSuccess: function(a, d) {
					if (a.retcode === 0) l.notifyObservers(this, "ChangeStatusSuccess", a.arguments.newstatus), c._state = a.arguments.newstatus;
					a.retcode === 108 ? l.notifyObservers(this, "NotReLogin", a.result) : m(a, !d);
					m(a, d)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendShakeWindow = function(a) {
			a = a || {
				newstatus: "hidden"
			};
			this.send(q + "channel/shake2", {
				context: this,
				data: a,
				arguments: a,
				onSuccess: function(c, d) {
					c.retcode === 0 ? l.notifyObservers(this, "ShakeWindowSuccess", a.to_uin) : (l.notifyObservers(this, "ShakeWindowFail", a.to_uin), m(c, !d));
					m(c, d)
				},
				onError: function(c) {
					l.notifyObservers(this, "ShakeWindowFail", a.to_uin);
					m(c)
				}
			})
		};
		this.sendGetSessionSignature = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(q + "channel/get_c2cmsg_sig2", {
				context: this,
				data: c,
				arguments: c,
				onSuccess: function(a, d) {
					if (a.retcode === 0) {
						var b = a.result;
						b.id = c.service_type === 0 ? c.id : EQQ.Model.BuddyList.encodeDid(c.id);
						b.uin = c.to_uin;
						l.notifyObservers(this, "GetSessionSignatureSuccess", b)
					} else m(a, !d);
					m(a, d)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendGroupBuddyMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(q + "channel/send_sess_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, d) {
					a.retcode === 0 ? l.notifyObservers(this, "SendMsgSuccess", a.result) : (l.notifyObservers(this, "SendMsgError", {
						uin: c.to,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendGroupBuddyMsg,
						cbParam: c
					}), m(a, !d));
					m(a, d)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendGetCustomFaceList = function() {
			alloy.portal.recoverCookie();
			d.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/", {
				query: "cmd=1?t=" + (new Date).getTime() + "&vfwebqq=" + alloy.portal.getVfWebQQ(),
				onSuccess: function() {
					typeof custom_face !== "undefined" ? l.notifyObservers(c, "SendGetCustomFaceListSuccess", custom_face) : c.sendGetCustomFaceList()
				}
			})
		};
		this.sendDeleteCustomFace = function(a) {
			alloy.portal.recoverCookie();
			d.http.loadScript(EQQ.CONST.CONN_SERVER_DOMAIN2 + "cgi-bin/webqq_app/", {
				query: "cmd=12&bd=" + a.img + "&vfwebqq=" + alloy.portal.getVfWebQQ(),
				onSuccess: function() {
					typeof cface_delete_result !== "undefined" && l.notifyObservers(c, "SendDeleteCustomFaceSuccess", a.callback ||
					function() {})
				}
			})
		};
		this.sendGetGroupCustomFaceKey = function(a) {
			this.send(q + "channel/get_gface_sig2", {
				context: this,
				arguments: a.arguments,
				onSuccess: function(c, d) {
					c.retcode === 0 ? l.notifyObservers(this, "SendGetGroupCustomFaceKeySuccess", c) : (l.notifyObservers(this, "SendGetGroupCustomFaceKeyError", {
						uin: a.to,
						retcode: c.retcode,
						errmsg: c.errmsg
					}), m(c, !d));
					m(c, d)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendGetGroupCustomFaceInfo = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(q + "channel/send_qun_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, d) {
					a.retcode === 0 ? l.notifyObservers(this, "SendGetGroupCustomFaceInfoSuccess", a) : (l.notifyObservers(this, "SendMsgError", {
						uin: c.group_uin,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendGetGroupCustomFaceInfo,
						cbParam: c
					}), m(a, !d));
					m(a, d)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendGetOfflinePicUrl = function(a) {
			this.send(q + "channel/apply_offline_pic_dl2", {
				context: this,
				data: a,
				onSuccess: function(a, c) {
					a.retcode === 0 ? (l.notifyObservers(this, "sendGetOfflinePicUrlSuccess", a), alloy.util.report2m(133173)) : (l.notifyObservers(this, "getSendPicUrlError", a), d.out("[sendGetOfflinePicUrlError] error: "), m(a, !c), alloy.util.report2m(133174));
					m(a, c)
				},
				onError: function(a) {
					m(a);
					alloy.util.report2m(133174)
				}
			})
		};
		this.sendRefuseFile = function(a) {
			this.send(q + "channel/refuse_file2", {
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
					a.retcode === 0 ? l.notifyObservers(this, "GetMyAvatarFlagSuccess", a) : l.notifyObservers(this, "GetMyAvatarFlagError", a)
				},
				onError: function(a) {
					l.notifyObservers(this, "GetMyAvatarFlagError", a)
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
					a.retcode === 0 ? l.notifyObservers(this, "DeleteMyAvatarFlagSuccess", a) : l.notifyObservers(this, "DeleteMyAvatarFlagError", a)
				},
				onError: function(a) {
					l.notifyObservers(this, "DeleteMyAvatarFlagError", a)
				}
			})
		};
		this.sendGroupRequestJoin = function(a, c, d, b) {
			a = a || {};
			this.send(q + "channel/op_group_join_req", {
				context: this,
				data: a,
				arguments: c || {},
				onSuccess: d ||
				function() {},
				onError: b ||
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
			this.send(q + "channel/send_discu_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, b) {
					a.retcode === 0 ? a.result.error == 3 ? l.notifyObservers(this, "DiscuNotExist", c) : l.notifyObservers(this, "SendDiscuMsgSuccess", a.result) : (d.out("[sendDiscuMsg] error: " + a.retcode + "-" + a.errmsg), l.notifyObservers(this, "SendMsgError", {
						uin: EQQ.Model.BuddyList.encodeDid(c.did),
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendDiscuMsg,
						cbParam: c
					}), m(a, !b));
					m(a, b)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendGetDiscuSessionSignature = function(a) {
			this.send(q + "channel/get_session_sig3", {
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
					a.retcode === 0 ? l.notifyObservers(this, "GetDiscuSessionSignatureSuccess", a) : m(a, !c);
					m(a, c)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendDiscuBuddyMsg = function(c) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			c.service_type = 1;
			this.send(q + "channel/send_sess_msg2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				onSuccess: function(a, d) {
					a.retcode === 0 ? l.notifyObservers(this, "SendMsgSuccess", a.result) : (l.notifyObservers(this, "SendMsgError", {
						uin: c.to,
						retcode: a.retcode,
						errmsg: a.errmsg,
						callback: EQQ.RPCService.sendDiscuBuddyMsg,
						cbParam: c
					}), m(a, !d));
					m(a, d)
				},
				onError: function(a) {
					m(a)
				}
			})
		};
		this.sendRefuseOffFile = function(a) {
			a.psessionid = EQQ.getPsessionid();
			a.clientid = EQQ.RPCService.getClientId();
			this.send(q + "channel/notify_offfile2", {
				context: this,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					a.retcode === 0 ? (l.notifyObservers(this, "RefuseOffFileSuccess", a), d.out("RefuseOffFileSuccess.")) : d.out("RefuseOffFileFail.")
				},
				onError: function() {
					d.out("RefuseOffFileFail. onError")
				}
			})
		};
		this.sendOffFileMsg = function(c, b) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(q + "channel/send_offfile2", {
				context: this,
				cacheTime: 0,
				method: "POST",
				data: {
					r: d.json.stringify(c)
				},
				arguments: c,
				onSuccess: b ||
				function(a) {
					a.retcode === 0 ? l.notifyObservers(this, "SendOffFileMsgSuccess", a.result) : d.out("[SendOffFileMsgSuccess] error: " + a.retcode + "-" + a.errmsg)
				},
				onError: b ||
				function() {}
			})
		};
		this.sendTyping = function(c, d, b) {
			c.clientid = a;
			c.psessionid = EQQ.getPsessionid();
			this.send(q + "channel/input_notify2", {
				context: this,
				data: c,
				arguments: c,
				onSuccess: d ||
				function() {},
				onError: b ||
				function() {}
			})
		}
	})
})();
(function() {
	WebqCore.register("EQQ.Model.BuddyList", function(d) {
		var b = this,
			c = d.event,
			n = d.dom,
			l = d.string,
			g, a, h, w, f, q, t, m, x, o, u, j, z, K, I, A, y, v = [],
			C = [],
			s = 0,
			E = new d.Class({
				init: function(i) {
					this.uin = i.uin;
					this.ruin = i.ruin;
					this.uiuin = i.uiuin;
					this.allow = i.allow;
					this.face = i.face;
					this.age = i.age;
					this.gender = i.gender;
					this.vip = i.vip || !1;
					this.clientType = i.clientType || "10000";
					this.setAvatar(EQQ.getUserAvatar(this.uin));
					this.setNick(i.nick || i.ruin || i.uin);
					this.setState(i.state || EQQ.hash.onlineStatus.offline);
					this.did = i.did || "";
					this.chatSession = {};
					this.setClassId(i.classId || 0)
				},
				setUiUin: function(i) {
					this.uiuin = i
				},
				setClientType: function(i) {
					this.clientType = i || "10000"
				},
				setAvatar: function(i) {
					this.avatarUrl = i;
					c.notifyObservers(EQQ.Model.BuddyList, "AvatarChange", this)
				},
				getAvatar: function() {
					return EQQ.getUserAvatar(this.uin)
				},
				setNick: function(i) {
					if (!i && this.ruin) i = this.ruin;
					this.nick = d.string.toSingleLine(i);
					this.htmlNick = d.string.encodeHtmlSimple(this.nick);
					this.titleNick = this.nick;
					this.updateNames()
				},
				setMarkName: function(i) {
					this.markName = d.string.toSingleLine(i.toString());
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
					var i = this.allName = "";
					this.markName ? (i = this.markName + "(" + this.nick + ")", this.allName = this.markName + "(" + this.nick + ")") : this.allName = i = this.nick;
					this.htmlAllName = d.string.encodeHtmlSimple(this.allName);
					this.titleAllName = d.string.encodeHtmlAttributeSimple(i)
				},
				setClassId: function(i) {
					this.classId = i
				},
				setSignature: function(i) {
					if (i != void 0) this.signature = i, this.htmlSignature = d.string.encodeHtmlSimple(i), this.titleSignature = d.string.encodeHtmlAttributeSimple(i);
					c.notifyObservers(EQQ.Model.BuddyList, "UserSignatureChange", this)
				},
				getUiUin: function() {
					return this.uiuin || this.uin
				},
				getSignature: function() {
					this.signature != void 0 ? this.setSignature() : alloy.rpcService.sendGetSignature(this.uin)
				},
				setQQLevel: function(i) {
					if (i != void 0) this.level = i;
					c.notifyObservers(EQQ.Model.BuddyList, "UserQQLevelChange", this)
				},
				getQQLevel: function() {
					this.level != void 0 ? this.setQQLevel() : alloy.rpcService.sendGetQQLevel(this.uin)
				},
				setState: function(i) {
					this.state = i
				},
				getState: function() {
					return this.state
				},
				setFace: function(i) {
					this.face = i
				},
				setGender: function(i) {
					this.gender = i
				},
				setAllow: function(i) {
					this.allow = i
				},
				setUsercard: function(i, a) {
					this.usercard = this.usercard || {};
					this.usercard[i] = {
						title: a,
						htmlAttribute: d.string.encodeHtmlAttributeSimple(a),
						html: d.string.encodeHtmlSimple(a)
					};
					c.notifyObservers(EQQ.Model.BuddyList, "UserCardChange", this.usercard)
				},
				getUsercard: function(i) {
					this.usercard = this.usercard || {};
					return this.usercard[i]
				}
			}),
			F = new d.Class({
				init: function(i) {
					this.gid = i.gid;
					this.code = i.code;
					this.mask = String(i.mask);
					this.preMask = String(this.mask);
					this.setName(i.name);
					this.setMarkName(i.markName);
					this.setType(i.type);
					this.hasManageAuthority = this.isLoadInfo = !1;
					this.uin2members = {};
					this.level = 0
				},
				setMask: function(i) {
					this.preMask = String(this.mask);
					this.mask = String(i);
					c.notifyObservers(EQQ.Model.BuddyList, "SingleGroupMaskChange", this)
				},
				setName: function(i) {
					this.name = d.string.toSingleLine(i);
					this.htmlName = d.string.encodeHtmlSimple(i);
					this.titleName = d.string.encodeHtmlAttributeSimple(i);
					this.updateNames()
				},
				setMarkName: function(i) {
					if (typeof i == "undefined" || i == "") return !1;
					this.markName = d.string.toSingleLine(i);
					this.htmlMarkName = d.string.encodeHtmlSimple(i);
					this.titleMarkName = d.string.encodeHtmlAttributeSimple(i);
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
					var i = "";
					this.allName = "";
					this.markName ? (i = this.markName + "(" + this.name + ")", this.allName = this.markName + "(" + this.name + ")") : (i = this.name, this.allName = this.name + "<" + this.code + ">");
					this.htmlAllName = d.string.encodeHtmlSimple(this.allName);
					this.titleAllName = d.string.encodeHtmlAttributeSimple(i)
				},
				type2text: {
					commonGroup: "\u666e\u901a\u7fa4",
					seniorGroup: "\u9ad8\u7ea7\u7fa4",
					superGroup: "\u8d85\u7ea7\u7fa4",
					expireSuperGroup: "\u8fc7\u671f\u7684\u8d85\u7ea7\u7fa4",
					enterpriseGroup: "\u4f01\u4e1a\u7fa4",
					forbiddenGroup: "\u7981\u7528"
				},
				setType: function(i) {
					this.type = i;
					this.typeText = this.type2text[i] || "\u5176\u4ed6\u7c7b\u578b\u7fa4";
					this.htmlTypeText = d.string.encodeHtmlSimple(this.typeText);
					this.titleTypeText = d.string.encodeHtmlAttributeSimple(this.typeText)
				},
				setLevel: function(i) {
					this.level = i || 0
				},
				setAnnouncement: function(i) {
					if (typeof i != "undefined") this.announcement = i, this.htmlAnnouncement = d.string.encodeHtmlSimple(i), this.titleAnnouncement = d.string.encodeHtmlAttributeSimple(i), c.notifyObservers(b, "GroupAnnouncementChange", this)
				},
				upAnnouncement: function(i) {
					if (typeof i != "undefined") this.announcement = i, this.htmlAnnouncement = d.string.encodeHtmlSimple(i), this.titleAnnouncement = d.string.encodeHtmlAttributeSimple(i), c.notifyObservers(b, "GroupAnnouncementChange", this)
				},
				updateMembers: function(i, a) {
					if (i) this.members = i, this.onlineMemberCount = a, this.uin2members[i.uin] = i;
					c.notifyObservers(b, "GroupMembersChange", this)
				},
				updateMemberState: function(i) {
					for (var a = i.stats, i = this.members, e = 0, d = {}, k = [], e = 0; e < a.length; e++) d[a[e].uin] = a[e].stat;
					a = i.length;
					for (e = 0; e < a; e++) {
						var f = i[e].info,
							h = f.uin;
						d[h] = d[h] || 20;
						if (f.gstate != d[h] && h != g) k.push({
							uin: h,
							stat: d[h],
							oldStat: f.gstate
						}), f.gstate = d[h]
					}
					c.notifyObservers(b, "GroupMemberStateChange", {
						t: this,
						arg: k
					})
				},
				updateMemberCard: function(i) {
					var a = this.members,
						e = !1,
						k;
					for (k in a) {
						var f = a[k];
						if (f.uin == i.uin) {
							i.card == "" ? (this.members[k].usercard = d.string.encodeHtmlSimple(f.nick), this.members[k].info.setUsercard(this.code, f.nick)) : (this.members[k].usercard = d.string.encodeHtmlSimple(i.card), this.members[k].info.setUsercard(this.code, i.card));
							e = !0;
							break
						}
					}
					e && c.notifyObservers(b, "GroupMemberCardChange", {
						gid: this.gid,
						gcode: this.code,
						uin: i.uin
					})
				},
				getMenberByUin: function(i) {
					return this.uin2members[i]
				}
			}),
			r = {
				onSelfInfoReady: function(i) {
					if (b.getSelf()) {
						var a = b.getSelf();
						a.setNick(i.nick);
						a.setFace(i.face);
						a.setGender(i.gender);
						a.setAllow(i.allow);
						a.setUiUin(i.uiuin);
						a.vip = i.vip;
						a.age = i.age
					} else b.setSelf(i)
				},
				onSelfInfoChanged: function(i) {
					var a = b.getSelf();
					a.setNick(i.nick);
					a.setGender(i.gender)
				},
				onGetUserInfoSuccess: function(i) {
					var a = i.result;
					if (a) {
						var e = b.getUserByUin(i.arguments.uin);
						if (e) e.setNick(a.nick), e.setFace(a.face), e.setGender(a.gender), e.setAllow(a.allow);
						else {
							i = {
								uin: i.arguments.uin,
								allow: a.allow,
								nick: a.nick,
								face: a.face,
								ruin: a.ruin,
								gender: a.gender
							};
							if (alloy.portal.getUin() == i.uin) i.uiuin = alloy.portal.getCookiePTUiUin();
							e = b.createUser(i);
							b.addStranger(e)
						}
						c.notifyObservers(b, "GetUserInfoSuccess", e)
					}
				},
				onGetUserInfoError: function() {},
				onGetBuddySignatureSuccess: function(a) {
					var e = a.result,
						d;
					d = e.length == 0 ? "" : e[0].lnick;
					e.length != 0 && e[0].uin == alloy.portal.getUin() && b.setSelfSignature(e[0].lnick);
					(a = b.getUserByUin(a.arguments.uin)) && a.setSignature(d);
					c.notifyObservers(b, "GetBuddySignatureSuccess", a)
				},
				onGetMultiBuddySignatureSuccess: function(a) {
					var a = a.result,
						e;
					for (e in a) {
						var c = b.getUserByUin(a[e].tuin);
						c && c.setSignature(a[e].lnick)
					}
				},
				onChangeGroupMaskSuccess: function(a) {
					a.uin == b.getSelfUin() ? (y = a.mask, c.notifyObservers(b, "GroupMaskChange", y)) : b.getGroupByGid(a.uin).setMask(a.mask)
				},
				onGetQQLevelSuccess: function(a) {
					var e = b.getUserByUin(a.arguments.uin);
					e && e.setQQLevel(a.result)
				},
				onGetGroupMaskConfigSuccess: function(a) {
					for (var e in a) {
						var d = parseInt(a[e]);
						e === "global" && (y = d, c.notifyObservers(b, "GroupMaskChange", y))
					}
				},
				onGetOnlineBuddiesSuccess: function(a) {
					b.setAllBuddyState(a)
				},
				onGetSessionSignatureSuccess: function(a) {
					b.setGroupBuddySessionSignature(a)
				},
				onBuddyStatusChange: function(a) {
					b.setState(a.uin, a.status, a.client_type)
				},
				onBuddyListChange: function(a) {
					if (a.removed_friends && a.removed_friends.length > 0) for (var e in a.removed_friends) b.removeBuddy(a.removed_friends[e].uin)
				},
				onGetSelfSignatureSuccess: function(a) {
					b.setSelfSignature(a)
				},
				onGetBuddyListSuccess: function(a) {
					for (var e = a.categories || [], c = !1, d = 0; d < e.length; d++) e[d].index == 0 && (c = !0);
					c || e.unshift({
						index: 0,
						name: "\u6211\u7684\u597d\u53cb"
					});
					b.isBuddyList = !0;
					b.setBuddyClass(a);
					b.setBuddyList(a);
					EQQ.RPCService.sendGetOnlineBuddies()
				},
				GetBuddyListError: function(a) {
					a.retcode == 50 ? (d.dom.id("EQQ_ReLoginPanel_inner").style.height = "66px", a = "\u597d\u53cb\u62c9\u53d6\u5931\u8d25\uff0c\u60a8\u53ef\u80fd\u662f\u975e\u6cd5\u8f6f\u4ef6\u7684\u53d7\u5bb3\u8005\uff01") : a = "\u62c9\u53d6\u5931\u8d25";
					c.notifyObservers(EQQ, "LoginFailure", {
						text: a
					})
				},
				onGetGroupListSuccess: function(a) {
					b.isGroupList = !0;
					for (var e = a.gmasklist || [], c = 0, d = 0; d < e.length; d++) {
						var k = e[d];
						if (k.gid === 1E3) c = k.mask;
						else for (var f = 0; f < a.gnamelist.length; f++) if (a.gnamelist[f].gid === k.gid) {
							a.gnamelist[f].mask = k.mask;
							break
						}
					}
					b.setGroupList(a);
					b.setGroupMask(c)
				},
				GetGroupListError: function() {
					c.notifyObservers(EQQ, "LoginFailure", {
						text: "\u62c9\u53d6\u5931\u8d25"
					})
				},
				onGetGroupInfoSuccess: function(a) {
					b.setGroupInfo(a)
				},
				onGetRecentListSuccess: function(a) {
					b.setRecentList(a)
				},
				onPollSuccess: function(a) {
					if (a) for (var e = 0; e < a.length; e++) {
						var c = a[e];
						switch (c.poll_type) {
						case "buddies_status_change":
							r.onBuddyStatusChange(c.value);
							break;
						case "buddylist_change":
							r.onBuddyListChange(c.value)
						}
					}
				},
				onLoginSuccess: function(a) {
					var e = b.getSelfUin();
					b.setState(e, a.status, "QQWeb");
					EQQ.index = a.index;
					EQQ.port = a.port
				},
				onAddANewBuddy: function(a) {
					var e = a.gid,
						k = a.newstate,
						f = a.markname;
					alloy.rpcService.sendGetUserInfo(a.tuin, null, null, function(a) {
						if (a.retcode === 0) {
							var i = a.result,
								a = a.arguments.uin,
								g = b.getUserByUin(a);
							g ? (g.classId == EQQ.hash.userClassType.stranger && (d.array.remove(m, g), c.notifyObservers(b, "RemoveBuddy", {
								classObj: {
									index: EQQ.hash.userClassType.stranger
								},
								user: g
							})), g.setNick(i.nick), g.setFace(i.face), g.setGender(i.gender), g.setClassId(e)) : g = b.createUser({
								uin: a,
								allow: i.allow,
								nick: i.nick,
								face: i.face,
								gender: i.gender,
								ruin: i.ruin,
								classId: e
							});
							g.setState(k.status);
							b.addBuddy(g);
							EQQ.Model.BuddyList.getClassById(e).count += 1;
							i = EQQ.Model.BuddyList.getClassByUin(g.uin);
							i.list[k.status].unshift(g);
							k.status != EQQ.hash.onlineStatus.offline && (i.onlineCount++, j.push({
								uin: a,
								state: k.status,
								clientType: k.client_type
							}));
							c.notifyObservers(EQQ.Model.BuddyList, "AddBuddy", {
								user: g,
								newstate: k,
								markname: f
							})
						}
					})
				},
				onAddNewGroupToModel: function(a) {
					var e = b.getGroupByCode(a);
					if (!d.isUndefined(e) && e) return !0;
					alloy.rpcService.sendGetGroupPublicInfo(a, a, EQQ.Model.BuddyList.onGetGroupPublicSuccess, function() {})
				}
			},
			N = function(a, e) {
				for (var c = [], d = 0; d < a.length; d++) c[d] = a.charAt(d) - 0;
				for (var b = 0, k = -1, d = 0; d < c.length; d++) {
					b += c[d];
					b %= e.length;
					var f = 0;
					if (b + 4 > e.length) for (var g = 4 + b - e.length, h = 0; h < 4; h++) f |= h < g ? (e.charCodeAt(b + h) & 255) << (3 - h) * 8 : (e.charCodeAt(h - g) & 255) << (3 - h) * 8;
					else for (h = 0; h < 4; h++) f |= (e.charCodeAt(b + h) & 255) << (3 - h) * 8;
					k ^= f
				}
				c = [];
				c[0] = k >> 24 & 255;
				c[1] = k >> 16 & 255;
				c[2] = k >> 8 & 255;
				c[3] = k & 255;
				k = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
				d = "";
				for (b = 0; b < c.length; b++) d += k[c[b] >> 4 & 15], d += k[c[b] & 15];
				return d
			};
		this.init = function() {
			a = [];
			h = {};
			w = [];
			f = {};
			q = [];
			t = {};
			m = [];
			x = {};
			o = [];
			u = {};
			t = {};
			j = [];
			z = [];
			I = {};
			A = {};
			v = [];
			C = [];
			s = 0;
			c.addObserver(alloy.portal, "SelfInfoChanged", r.onSelfInfoChanged);
			c.addObserver(alloy.rpcService, "GetUserInfoSuccess", r.onGetUserInfoSuccess);
			c.addObserver(alloy.rpcService, "GetUserInfoError", r.onGetUserInfoError);
			c.addObserver(alloy.rpcService, "GetGroupInfoSuccess", r.onGetGroupInfoSuccess);
			c.addObserver(alloy.rpcService, "GetQQLevelSuccess", r.onGetQQLevelSuccess);
			c.addObserver(alloy.rpcService, "GetBuddySignatureSuccess", r.onGetBuddySignatureSuccess);
			c.addObserver(alloy.rpcService, "GetMultiBuddySignatureSuccess", r.onGetMultiBuddySignatureSuccess);
			c.addObserver(EQQ, "LoginSuccess", r.onLoginSuccess);
			c.addObserver(EQQ.RPCService, "GetOnlineBuddiesSuccess", r.onGetOnlineBuddiesSuccess);
			c.addObserver(EQQ.RPCService, "GetSelfSignatureSuccess", r.onGetSelfSignatureSuccess);
			c.addObserver(EQQ.RPCService, "GetSessionSignatureSuccess", r.onGetSessionSignatureSuccess);
			c.addObserver(EQQ.RPCService, "PollSuccess", r.onPollSuccess);
			c.addObserver(b, "AddANewBuddy", r.onAddANewBuddy);
			c.addObserver(b, "BuddyStatusChange", r.onBuddyStatusChange);
			c.addObserver(alloy.portal, "selfInfoReady", r.onSelfInfoReady);
			c.addObserver(b, "AddNewGroupToModel", r.onAddNewGroupToModel);
			c.addObserver(b, "ReloadGroupInfo", this.onReloadGroupInfo);
			c.addObserver(EQQ.RPCService, "GetDiscuSessionSignatureSuccess", Q);
			c.addObserver(EQQ.RPCService, "DiscuNotExist", P)
		};
		this.reset = function() {
			g = 0;
			a = [];
			h = {};
			w = [];
			f = {};
			q = [];
			t = {};
			m = [];
			x = {};
			o = [];
			u = {};
			t = {};
			j = [];
			z = [];
			I = {};
			A = {};
			v = [];
			C = [];
			s = 0;
			this.setSelf({
				uin: alloy.portal.getUin()
			})
		};
		this.sendGetBuddyList = function(a) {
			var e = [alloy.portal.getUin() + "", d.cookie.get("ptwebqq")],
				e = N(e[0], e[1]),
				a = a || {};
			a.hash = e;
			a.vfwebqq = EQQ.vfwebqq;
			return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL + "get_user_friends2", {
				context: this,
				method: "POST",
				param: a,
				callback: function(a, i) {
					a.retcode === 0 ? (r.onGetBuddyListSuccess(a.result), i(a)) : r.GetBuddyListError(a);
					alloy.util.report2h("eqqGetData", "end_BuddyList", ["ok"][a.retcode] || a.retcode);
					alloy.portal.speedTest.sRTS(14, "end", new Date, !0)
				},
				errback: function(a) {
					r.GetBuddyListError(a);
					alloy.util.report2h("eqqGetData", "end_BuddyList", "error")
				},
				timeback: function(a) {
					r.GetBuddyListError(a);
					qqweb.util.report2h("eqqGetData", "end_BuddyList", "timeout")
				}
			})
		};
		this.sendGetGroupList = function(a) {
			a = a || {};
			a.vfwebqq = EQQ.vfwebqq;
			return EQQ.Extend.cgi_module(EQQ.BASE_CONST.API_SERVER_URL + "get_group_name_list_sk2", {
				context: this,
				method: "POST",
				param: a,
				callback: function(a, i) {
					a.retcode === 0 ? (r.onGetGroupListSuccess(a.result), i(a)) : r.GetGroupListError(a);
					alloy.util.report2h("eqqGetData", "end_GroupList", ["ok"][a.retcode] || a.retcode);
					alloy.portal.speedTest.sRTS(15, "end", new Date, !0)
				},
				errback: function(a) {
					r.GetGroupListError(a);
					alloy.util.report2h("eqqGetData", "end_GroupList", "error")
				},
				timeback: function(a) {
					r.GetGroupListError(a);
					qqweb.util.report2h("eqqGetData", "end_GroupList", "timeout")
				}
			})
		};
		this.sendGetRecentList = function(a) {
			a = a || {};
			a.vfwebqq = EQQ.vfwebqq;
			a.clientid = EQQ.RPCService.getClientId();
			a.psessionid = EQQ.getPsessionid();
			return EQQ.Extend.cgi_module_d(EQQ.BASE_CONST.CONN_SERVER_DOMAIN2 + "channel/get_recent_list2", {
				context: this,
				method: "POST",
				data: {
					r: d.json.stringify(a)
				},
				callback: function(a) {
					if (a.retcode === 0) r.onGetRecentListSuccess(a.result)
				},
				errback: function() {}
			})
		};
		this.getUserSignature = function(a) {
			(a = this.getUserByUin(a)) && a.getSignature()
		};
		this.getMultiUserSignture = function(a) {
			var e = [],
				c;
			for (c in a) {
				var d = this.getUserByUin(a[c]);
				typeof d.signature === "undefined" ? e.push(a[c]) : d.setSignature()
			}
			e.length && alloy.rpcService.sendGetMultiSignature("[" + e.toString() + "]")
		};
		this.sendGetQQLevel = function(a) {
			(a = this.getUserByUin(a)) && a.getQQLevel()
		};
		this.setSelf = function(a) {
			this.createUser({
				uin: a.uin || null,
				allow: a.allow || null,
				nick: a.nick || null,
				face: a.face || 0,
				age: a.age || null,
				gender: a.gender || null,
				vip: a.vip || null
			});
			this.setSelfUin(a.uin);
			var e = EQQ.getDefaultState();
			this.setState(a.uin, e, "QQWeb");
			c.notifyObservers(this, "SelfInfoChange", this.getSelf())
		};
		this.getSelf = function() {
			return this.getUserByUin(this.getSelfUin())
		};
		this.getSelfState = function() {
			var a = this.getSelf();
			if (a) return a.state
		};
		this.setSelfUin = function(a) {
			g = a || 0
		};
		this.getSelfUin = function() {
			return g
		};
		this.setSelfSignature = function(a) {
			this.getUserByUin(this.getSelfUin()).setSignature(a);
			c.notifyObservers(this, "SelfSignatureChange", this.getSelf())
		};
		this.sendChangeStatus = function(a) {
			EQQ.RPCService.sendChangeStatus({
				newstatus: a
			})
		};
		this.sendChangeGroupMask = function(a) {
			var e = {
				cAll: a.type === "global" ? a.mask : y,
				idx: EQQ.index,
				port: EQQ.port
			},
				c;
			for (c in z) {
				var b = z[c];
				e[b.gid] = a.type === "single" && a.uin === b.gid ? a.mask : b.mask
			}
			qqweb.rpcService.sendMessageFilterConfig({
				onSuccess: function() {
					r.onChangeGroupMaskSuccess({
						uin: a.uin,
						mask: a.mask
					})
				},
				context: this,
				data: {
					retype: 1,
					app: "EQQ",
					itemlist: '{"groupmask":' + d.json.stringify(e) + "}"
				}
			})
		};
		this.setBuddyClass = function(i) {
			a = i.categories;
			for (i = 0; i < a.length; i++) {
				var e = a[i];
				e.caculateName = e.name;
				e.htmlName = d.string.encodeHtmlSimple(e.name);
				e.titleName = d.string.encodeHtmlAttributeSimple(e.name);
				e.count = 0;
				e.onlineCount = 0;
				e.list = {
					callme: [],
					online: [],
					away: [],
					busy: [],
					silent: [],
					offline: []
				};
				h[e.index] = e
			}
			c.notifyObservers(this, "BuddyClassChange", this.getClassList())
		};
		this.getClassList = function() {
			return a
		};
		this.setAllBuddyState = function(a) {
			j = [];
			for (var e = this.getSelfUin(), d = 0; d < a.length; d++) {
				var b = a[d];
				b.uin != e && this.setState(b.uin, b.status, b.client_type)
			}
			c.notifyObservers(this, "AllOnlineBuddyReady", this.getOnlineBuddy());
			c.notifyObservers(this, "AllClassOnlineBuddyReady", this.getClassList())
		};
		this.removeBuddy = function(a) {
			var e = this.getUserByUin(a);
			if (e) {
				t[a] = null;
				f[a] = null;
				delete t[a];
				delete f[a];
				d.array.remove(q, e);
				var k = this.getClassById(e.classId);
				if (k && k.list) {
					if (d.array.remove(k.list[e.getState()], e), k.count--, e.getState() != EQQ.hash.onlineStatus.offline) {
						k.onlineCount--;
						for (var g = this.getOnlineBuddy(), h = 0; h < g.length; h++) g[h].uin == a && g.splice(h, 1)
					}
				} else e.classId == EQQ.hash.userClassType.stranger && (d.array.remove(m, e), k = {
					index: EQQ.hash.userClassType.stranger
				});
				EQQ.Model.ChatMsg.removeMessageBoxUserList(a);
				c.notifyObservers(b, "RemoveBuddy", {
					classObj: k,
					user: e
				})
			}
		};
		this.sendRemoveBuddy = function(a, e) {
			alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "delete_friend", {
				method: "POST",
				data: {
					tuin: a,
					delType: e ? 2 : 1,
					vfwebqq: alloy.portal.getVfWebQQ()
				},
				context: b,
				onSuccess: function(e) {
					e.retcode === 0 ? b.removeBuddy(a) : (c.notifyObservers(b, "ManageError", "del"), d.out("\u5220\u9664\u597d\u53cb\u5931\u8d25"))
				},
				onError: function() {
					c.notifyObservers(b, "ManageError", "del");
					d.out("\u5220\u9664\u597d\u53cb\u5931\u8d25")
				}
			})
		};
		this.moveBuddyClass = function(a, e) {
			var k = this.getUserByUin(a);
			if (k) {
				var f = function() {
						var d = this.getClassByUin(a),
							f = this.getClassById(e);
						f.list[k.getState()].unshift(k);
						f.count++;
						for (var g = d.list[k.state], h = 0; h < g.length; h++) g[h].uin == a && g.splice(h, 1);
						d.count--;
						k.setClassId(e);
						k.getState() != EQQ.hash.onlineStatus.offline && (f.onlineCount++, d.onlineCount--);
						c.notifyObservers(b, "MoveBuddyClass", {
							oldClass: d,
							newClass: f,
							user: k
						})
					};
				alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "modify_friend_group", {
					method: "POST",
					data: {
						tuin: a,
						newid: e,
						vfwebqq: alloy.portal.getVfWebQQ()
					},
					context: b,
					onSuccess: function(a) {
						a.retcode === 0 ? f.call(b) : (c.notifyObservers(b, "ManageError", "mod"), d.out("\u79fb\u52a8\u597d\u53cb\u5206\u7ec4\u5931\u8d25"))
					},
					onError: function() {
						c.notifyObservers(b, "ManageError", "mod");
						d.out("\u79fb\u52a8\u597d\u53cb\u5206\u7ec4\u5931\u8d25")
					}
				})
			}
		};
		this.setUserMarkName = function(a, e) {
			var k = this.getUserByUin(a);
			k && alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "change_mark_name2", {
				method: "POST",
				data: {
					tuin: a,
					markname: e,
					vfwebqq: alloy.portal.getVfWebQQ()
				},
				context: b,
				onSuccess: function(a) {
					a.retcode === 0 ? k.setMarkName(e) : (c.notifyObservers(b, "ManageError", "mark"), d.out("\u4fee\u6539\u5907\u6ce8\u5931\u8d25"))
				},
				onError: function() {
					c.notifyObservers(b, "ManageError", "mark");
					d.out("\u4fee\u6539\u5907\u6ce8\u5931\u8d25")
				}
			})
		};
		this.setState = function(a, e, d) {
			var b = this.getUserByUin(a);
			if (b && b.state !== e) {
				var k = b.state;
				b.setState(e);
				b.clientType = d;
				if (a == this.getSelfUin()) c.notifyObservers(this, "SelfStateChange", this.getSelfState()), c.notifyObservers(alloy.taskBar, "EQQSelfStateChange", {
					state: this.getSelfState()
				});
				else if (b.classId !== EQQ.hash.userClassType.stranger && b.classId !== EQQ.hash.userClassType.balck) {
					var f = this.getClassByUin(b.uin);
					f.list[b.state].unshift(b);
					for (var b = f.list[k], g = 0; g < b.length; g++) if (b[g].uin == a) {
						b.splice(g, 1);
						break
					}
					b = EQQ.hash.onlineStatus.offline;
					if (k == b || e == b) {
						f.onlineCount = f.count - f.list[b].length;
						if (e == b) for (e = 0; e < j.length; e++) {
							if (j[e].uin == a) {
								j.splice(e, 1);
								break
							}
						} else j.push({
							uin: a,
							state: e,
							clientType: d
						});
						c.notifyObservers(this, "OnlineBuddyChange", a)
					}
					c.notifyObservers(this, "BuddyStateChange", a)
				}
			}
		};
		this.setSelfState = function(a) {
			var e = this.getSelf();
			e && (e.state = a);
			c.notifyObservers(alloy.taskBar, "EQQSelfStateChange", {
				state: a
			})
		};
		this.getState = function(a) {
			return (a = this.getUserByUin(a)) ? a.getState() : null
		};
		this.getOnlineBuddy = function() {
			return j
		};
		this.addUser = function(a) {
			f[a.uin] || (f[a.uin] = a, w.push(a));
			return a
		};
		this.addBuddy = function(a) {
			if (!t[a.uin]) a.type = "buddy", t[a.uin] = a, q.push(a);
			return a
		};
		this.createUser = function(a) {
			a = new E(a);
			this.addUser(a);
			return a
		};
		this.addStranger = function(a) {
			x[a.uin] || (x[a.uin] = a, m.push(a));
			return a
		};
		this.addBlack = function(a) {
			if (!u[a.uin]) a.type = "black", u[a.uin] = a, o.push(a);
			return a
		};
		this.getStrangerList = function() {
			return m
		};
		this.setStrangerList = function(a) {
			return m = a
		};
		this.setBuddyList = function(a) {
			q = [];
			var e = a.friends,
				d = this.getSelfUin(),
				b = a.vipinfo || [],
				k = {},
				f;
			for (f in b) k[b[f].u] = b[f].vip_level;
			for (b = 0; b < e.length; b++) e[b].uin != d && (f = a.info[b], f = this.createUser({
				uin: f.uin,
				allow: f.allow,
				nick: f.nick,
				face: f.face,
				age: f.age,
				gender: f.gender,
				vip: f.vip || k[f.uin],
				ruin: f.ruin,
				classId: this.getClassById(e[b].categories) ? e[b].categories : 0
			}), this.addBuddy(f));
			if (a = a.marknames) for (b = 0; b < a.length; b++)(f = this.getUserByUin(a[b].uin)) && f.setMarkName(a[b].markname);
			for (b = 0; b < q.length; b++) q[b].uin != this.getSelfUin() && (a = this.getClassById(q[b].classId), a.list[q[b].state] || (a.list[q[b].state] = []), a.list[q[b].state].push(q[b]), a.count++);
			c.notifyObservers(this, "BuddyListChange", this.getBuddyList())
		};
		this.getBuddyList = function() {
			return q
		};
		this.addNewBuddy = function() {};
		this.searchBuddy = function(a, e) {
			var a = String(a).toLowerCase(),
				c = [],
				d = [];
			if (a.length > 0) for (var b = 0; b < q.length; b++) {
				var k = q[b];
				if (String(k.nick).toLowerCase().indexOf(a) > -1 && String(k.nick) != "undefined" || String(k.markName).toLowerCase().indexOf(a) > -1 && String(k.markName) != "undefined") String(k.nick).toLowerCase() == a || String(k.markName).toLowerCase() == a ? d.push(k) : c.push(k);
				if (c.length + d.length >= e) break
			}
			Array.prototype.push.apply(d, c);
			return d
		};
		this.isUser = function(a) {
			return Boolean(f[a])
		};
		this.isBuddy = function(a) {
			return t[a]
		};
		this.getBuddyByUin = function(a) {
			return t[a]
		};
		this.isStranger = function(a) {
			return x[a]
		};
		this.isBlack = function(a) {
			return u[a]
		};
		this.getUserByUin = function(a) {
			if (f) return f[a]
		};
		this.getClassIdByUin = function(a) {
			return f[a].classId
		};
		this.getClassByUin = function(a) {
			return this.getClassById(this.getClassIdByUin(a))
		};
		this.getClassById = function(a) {
			return h[a]
		};
		this.addGroup = function(a) {
			A[a.code] || (A[a.code] = I[a.gid] = a, z.push(a));
			return a
		};
		this.removeGroup = function(a) {
			if (!d.isUndefined(A[a])) {
				var e = A[a].gid;
				delete A[a];
				delete I[e];
				for (var c in z) z[c].code == a && delete z[c]
			}
		};
		this.onGetGroupPublicSuccess = function(a) {
			a.retcode != 0 && d.error("onGetGroupPublic error:" + a.retcode);
			var a = a.result.ginfo,
				e = "commonGroup";
			a.flag & 16 ? e = "seniorGroup" : a.flag & 33554432 ? e = "superGroup" : a.flag & 2 ? e = "forbiddenGroup" : a.flag & 256 ? e = "enterpriseGroup" : a.flag & 67108864 && (e = "expireSuperGroup");
			a = new F({
				gid: a.gid,
				code: a.code,
				type: e,
				name: a.name,
				markName: a.name,
				mask: "0"
			});
			b.addGroup(a);
			c.notifyObservers(b, "AddNewGroupToList", a)
		};
		this.setGroupList = function(a) {
			var e = a.gnamelist,
				a = a.gmarklist || [];
			z = [];
			for (var d = 0; d < e.length; d++) {
				var b = e[d],
					k = "commonGroup";
				b.flag & 16 ? k = "seniorGroup" : b.flag & 33554432 ? k = "superGroup" : b.flag & 2 ? k = "forbiddenGroup" : b.flag & 256 ? k = "enterpriseGroup" : b.flag & 67108864 && (k = "expireSuperGroup");
				var f;
				a: {
					f = void 0;
					for (f in a) if (a[f].uin == b.gid) {
						f = a[f].markname;
						break a
					}
					f = ""
				}
				this.addGroup(new F({
					gid: b.gid,
					code: b.code,
					type: k,
					name: b.name,
					markName: f,
					mask: b.mask || "0"
				}))
			}
			c.notifyObservers(this, "GroupListChange", this.getGroupList())
		};
		this.setGroupMask = function(a) {
			y = a;
			c.notifyObservers(this, "GroupMaskChange", y)
		};
		this.getGroupMask = function() {
			return y
		};
		this.getGroupList = function() {
			return z
		};
		this.setRecentList = function(a) {
			for (var e in a) if (a[e].type == 2) a[e].uin = this.encodeDid(a[e].uin);
			K = a;
			c.notifyObservers(this, "RecentListChange", this.getRecentList())
		};
		this.getRecentList = function() {
			return K
		};
		this.setGroupInfo = function(a) {
			for (var e = a.ginfo, b = a.minfo, k = a.stats, f = {}, g = k.length; g--;) f[k[g].uin] = k[g];
			k = a.cards || [];
			g = this.getGroupByCode(e.code);
			g.setLevel(e.level);
			var h = this.getSelfUin();
			g.setAnnouncement(e.memo || " ");
			var l = a.vipinfo || [],
				a = {},
				B;
			for (B in l) a[l[B].u] = l[B].vip_level;
			B = e.members;
			for (var l = [], j = !1, q = 0, m = 0; m < B.length; m++) {
				var t = "common";
				B[m].mflag & 1 ? (t = "manager", B[m].muin === h && (j = !0)) : B[m].mflag & 2 && (t = "manager2", B[m].muin === h && (j = !0));
				B[m].muin == e.owner && (t = "master", B[m].muin === h && (j = !0));
				var n = B[m].muin,
					G = (b[m].nick || b[m].ruin || "") + "",
					o = b[m].nick;
				o == "" && (o = (b[m].ruin || n) + "");
				var H = f[n] && f[n].stat || 20,
					J = f[n] && f[n].client_type || 1E4;
				(H != 20 || n === h) && q++;
				for (var w = G, s = G, r = 0; r < k.length; r++) if (k[r].muin == n) {
					o = k[r].card;
					break
				}
				if (r = this.getUserByUin(B[m].muin)) {
					alloy.util.code2state(H);
					if (r.uin != h) r.gstate = H;
					if (a[n]) r.vip = a[n];
					r.type === "groupBuddy" || r.uin === h ? (H = o ? o : r.showName, r.setUsercard(e.code, H)) : o = o === G ? r.showName : o;
					r.setClientType(J)
				} else r = this.createUser({
					uin: n,
					nick: G,
					clientType: J,
					vip: a[n],
					state: alloy.util.code2state(H)
				}), r.type = "groupBuddy", r.setClassId(EQQ.hash.userClassType.stranger), r.group = g, r.gstate = H;
				H = o ? o : r.showName;
				r.setUsercard(e.code, H);
				l[m] = {
					uin: n,
					flag: t,
					gcode: e.code,
					nick: G,
					htmlNick: d.string.encodeHtmlSimple(G),
					titleNick: G,
					showName: w,
					htmlShowName: d.string.encodeHtmlSimple(w),
					titleShowName: d.string.encodeHtmlAttributeSimple(w),
					allName: s,
					htmlAllName: d.string.encodeHtmlSimple(s),
					titleAllName: s,
					usercard: d.string.encodeHtmlSimple(o)
				};
				l[m].info = r;
				g.uin2members[n] = l[m]
			}
			g.isLoadInfo = !0;
			g.hasManageAuthority = j;
			g.updateMembers(l, q);
			c.notifyObservers(this, "GroupInfoChange", g)
		};
		this.setMemberState = function(a) {
			this.getGroupByCode(a.gcode).updateMemberState(a)
		};
		this.sendGetGroupInfo = function(a) {
			a.vfwebqq = alloy.portal.getVfWebQQ();
			alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "get_group_info_ext2", {
				context: b,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					a.retcode === 0 ? b.setGroupInfo(a.result) : d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				},
				onError: function() {
					d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				}
			})
		};
		this.sendGetMultiGroupInfo = function(a, e) {
			a.vfwebqq = alloy.portal.getVfWebQQ();
			alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "get_group_info", {
				context: b,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					a.retcode === 0 ? e ? e(a) : c.notifyObservers(b, "GetMultiGroupInfoSuccess", a) : d.out("\u83b7\u53d6\u7fa4\u4fe1\u606f\u5931\u8d25")
				},
				onError: function() {
					d.out("\u83b7\u53d6\u7fa4\u4fe1\u606f\u5931\u8d25")
				}
			})
		};
		this.sendGetGroupNewestState = function(a) {
			a.vfwebqq = alloy.portal.getVfWebQQ();
			alloy.rpcService.send(alloy.CONST.API_SERVER_URL + "get_group_member_stat2", {
				context: b,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					if (a.retcode === 0) b.onGetGroupNewestStateSuc(a.result);
					else d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				},
				onError: function() {
					d.out("\u83b7\u53d6\u7fa4\u6700\u65b0\u4fe1\u606f\u5931\u8d25")
				}
			})
		};
		this.onGetGroupNewestStateSuc = function(a) {
			this.setMemberState(a)
		};
		this.getGroupByCode = function(a) {
			return A[a]
		};
		this.getGroupByGid = function(a) {
			return I[a]
		};
		this.getGroupInfo = function(a) {
			var e = this.getGroupByCode(a);
			if (e.isLoadInfo) return e.updateMembers(), e.upAnnouncement(e.announcement), c.notifyObservers(this, "GroupInfoChange", e), e;
			else this.sendGetGroupInfo({
				gcode: a
			})
		};
		var e = function(a) {
				var e = a.arguments.gcode;
				if (d.isArray(e)) k = b.getGroupByCode(e), f = a.result ? a.result.memo || " " : " ", k.setAnnouncement(f);
				else for (var c in e) {
					var k = e[c],
						k = b.getGroupByCode(k),
						f = a.result ? a.result.memo || " " : " ";
					k.setAnnouncement(f)
				}
			};
		this.getGroupAnnouncement = function(a) {
			var c = b.getGroupByCode(a);
			if (typeof c.announcement == "undefined") this.sendGetMultiGroupInfo({
				gcode: "[" + a + "]",
				retainKey: "memo"
			}, e);
			else return c
		};
		var k = function(a) {
				if (a.result) for (var e in a.result) {
					var c = a.result[e];
					b.getGroupByCode(c.gcode).setAnnouncement(c.memo || " ")
				}
			};
		this.getMultiGroupAnnounce = function(a) {
			var e = [],
				c;
			for (c in a) typeof b.getGroupByCode(a[c]).announcement == "undefined" && e.push(a[c]);
			e.length && this.sendGetMultiGroupInfo({
				gcode: "[" + e.toString() + "]",
				retainKey: "memo,gcode"
			}, k)
		};
		this.onReloadGroupInfo = function(a) {
			var e = this.getGroupByCode(a);
			if (d.isUndefined(e) || !e) return !1;
			this.sendGetGroupInfo({
				gcode: a
			})
		};
		this.sendGetSessionSignature = function(a) {
			EQQ.RPCService.sendGetSessionSignature(a)
		};
		this.setGroupBuddySessionSignature = function(a) {
			var e = this.getUserByUin(a.uin),
				d = a.id;
			if (a.type === 0) e.chatSession[d] = a.value, c.notifyObservers(this, "GroupBuddySessionSignatureChange", e.uin)
		};
		this.sendGetUserInfo = function(a) {
			alloy.rpcService.sendGetUserInfo_with_code(a)
		};
		this.isGroupPrompt = function(a) {
			a = this.getGroupByGid(a);
			y = parseInt(y);
			switch (y) {
			case 0:
				switch (parseInt(a.mask)) {
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
		var B = new d.Class({
			init: function(a) {
				this.did = a.did;
				this.mask = String(a.mask || 0);
				this.preMask = String(this.mask);
				this.setName(a.name);
				this.isLoadInfo = !1;
				this.members = [];
				this.owner = "";
				this.notSetName = !1;
				this.hadModified = !0
			},
			setName: function(a) {
				this.notSetName = d.isUndefined(a) || a == "" ? !0 : !1;
				this.name = a = a || "\u666e\u901a\u8ba8\u8bba\u7ec4";
				this.htmlName = d.string.encodeHtmlSimple(a.toString());
				this.titleName = d.string.encodeHtmlAttributeSimple(a.toString());
				this.setTopic(a);
				c.notifyObservers(alloy.taskBar, "UpdateTaskName", {
					appId: "5_0",
					id: this.did,
					name: this.name
				})
			},
			setTopic: function(a) {
				if (d.isUndefined(a)) return !1;
				this.topic = a;
				this.htmlTopic = d.string.encodeHtmlSimple(a);
				this.titleTopic = d.string.encodeHtmlAttributeSimple(a)
			},
			addMember: function(a) {
				this.members.push(a);
				var e = b.getUserByUin(a.uin);
				if (e) {
					if (e.type == "stranger") e.setNick(a.nick || a.uin.toString()), e.did = this.did
				} else e = b.createUser({
					uin: a.uin,
					allow: !0,
					nick: a.nick || a.uin.toString(),
					face: "",
					gender: "",
					state: a.status,
					ruin: a.ruin,
					did: this.did
				}), e.type = "groupBuddy", b.addStranger(e)
			},
			setMembers: function(a) {
				this.members = a;
				for (var e in a) {
					var c = a[e],
						d = b.getUserByUin(c.uin);
					if (d) {
						if (d.type == "stranger") d.setNick(c.nick || c.uin.toString()), d.did = this.did
					} else d = b.createUser({
						uin: c.uin,
						allow: !0,
						nick: c.nick || c.uin.toString(),
						face: "",
						gender: "",
						state: c.status,
						ruin: c.ruin,
						did: this.did
					}), d.type = "groupBuddy", b.addStranger(d)
				}
			},
			updateMembers: function(a) {
				var e = this.members,
					c;
				for (c in e) {
					var d = e[c];
					if (a[d.uin]) d.vip = a[d.uin].vip
				}
			},
			getMemberList: function() {},
			modifyMemberStatus: function(a) {
				var e = [],
					c = [],
					b;
				for (b in a) {
					var k = a[b];
					c[k.uin] = k
				}
				a = alloy.portal.getPortalSelf("uin");
				for (b in this.members) {
					var k = this.members[b],
						f = c[k.uin];
					if (!d.isUndefined(f) && f.status != k.status) f.old_status = k.status, k.status = a == k.uin && f.status == "offline" ? "hidden" : f.status, e.push(f);
					if (d.isUndefined(f) && k.status != "offline") f = {
						uin: k.uin,
						old_status: k.status,
						status: a == k.uin ? "hidden" : "offline",
						client_type: k.client_type
					}, k.status = "offline", e.push(f)
				}
				return e
			},
			setOwner: function(a) {
				this.owner = a
			},
			setIsLoadInfo: function(a) {
				this.isLoadInfo = a || !1
			},
			setMask: function(a) {
				this.preMask = String(this.mask);
				this.mask = String(a);
				c.notifyObservers(EQQ.Model.BuddyList, "SingleDiscuMaskChange", this)
			},
			setHadModified: function(a) {
				this.hadModified = a
			},
			getMemberByUin: function(a) {
				var e = this.members,
					c;
				for (c in e) if (e[c].uin == a) return e[c];
				return null
			}
		});
		this.encodeDid = function(a) {
			return "d" + a
		};
		this.decodeDid = function(a) {
			return a.substring(1)
		};
		this.addDiscu = function(a) {
			C[a.did] || (a = new B(a), C[a.did] = a, v.push(a))
		};
		this.removeDiscu = function(a) {
			if (C[a.did]) {
				delete C[a.did];
				for (var e in v) if (v[e].did == a.did) {
					v.splice(e, 1);
					break
				}
			}
		};
		this.getDiscuById = function(a) {
			return C[a]
		};
		this.getDiscuList = function() {
			return v
		};
		this.sendGetDiscuList = function(a) {
			var e = {};
			e.clientid = EQQ.RPCService.getClientId();
			e.psessionid = EQQ.getPsessionid();
			e.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_discu_list_new2", {
				context: b,
				data: e,
				arguments: e,
				onSuccess: function(e) {
					d.isUndefined(a) || a();
					if (e.retcode === 0) {
						var k = e.result,
							e = k.dnamelist,
							p = k.dmasklist,
							k = [],
							f;
						for (f in p) {
							var g = p[f];
							k[g.did] = g.mask
						}
						for (f in e) p = e[f], p.mask = k[p.did] || 0, p.did = b.encodeDid(p.did), b.addDiscu(p);
						c.notifyObservers(b, "DiscuListChange", b.getDiscuList())
					} else H()
				},
				onError: function() {
					H();
					d.isUndefined(a) || a()
				}
			})
		};
		var H = function() {
				d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u5217\u8868\u5931\u8d25");
				s < 1 ? (s++, d.error("\u7b2c" + s + "\u91cd\u62c9\u8ba8\u8bba\u7ec4\u5217\u8868"), b.sendGetDiscuList()) : c.notifyObservers(EQQ, "GetDiscuListFail", {
					text: "\u83b7\u53d6\u8ba8\u8bba\u7ec4\u5217\u8868\u5931\u8d25"
				})
			};
		this.getDiscuInfo = function(a) {
			var e = this.getDiscuById(a);
			!d.isUndefined(e) && e.isLoadInfo ? c.notifyObservers(this, "DiscuInfoChange", e) : G(a)
		};
		this.refreshDiscuInfo = function(a) {
			G(a)
		};
		var G = function(a, e, c) {
				var k = {};
				k.did = b.decodeDid(a);
				k.clientid = EQQ.RPCService.getClientId();
				k.psessionid = EQQ.getPsessionid();
				k.vfwebqq = alloy.portal.getVfWebQQ();
				EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_discu_info", {
					context: b,
					data: k,
					arguments: k,
					onSuccess: e ||
					function(a) {
						a.retcode === 0 ? a.result.error == 3 ? P(k) : b.sendGetDiscuInfoSuccess(a) : d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u4fe1\u606f\u5931\u8d25")
					},
					onError: c ||
					function() {
						d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u4fe1\u606f\u5931\u8d25")
					}
				})
			};
		this.sendGetDiscuInfo = G;
		this.sendGetDiscuInfoSuccess = function(a) {
			var e = b.encodeDid(a.arguments.did),
				k = this.getDiscuById(e),
				f = a.result.mem_info,
				g = a.result.mem_status,
				h = [],
				B;
			for (B in g) {
				var j = g[B];
				h[j.uin] = j.status
			}
			var g = alloy.portal.getPortalSelf("uin"),
				j = [],
				q = [];
			for (B in f) {
				var m = f[B],
					n = this.getUserByUin(m.uin);
				if (n) m.markName = n.markName, m.htmlMarkName = n.htmlMarkName, m.vip = n.vip;
				(d.isUndefined(m.vip) || m.vip === !1) && q.push(m.uin);
				m.status = h[m.uin] || (m.uin == g ? "hidden" : "offline");
				m.name = m.nick;
				m.htmlName = l.encodeHtmlSimple(m.nick);
				m.titleName = l.encodeHtmlAttributeSimple(m.nick);
				j.push(m)
			}
			k.setName(a.result.info.discu_name);
			k.setMembers(j);
			k.setOwner(a.result.info.discu_owner);
			k.setIsLoadInfo(!0);
			c.notifyObservers(this, "DiscuInfoChange", k);
			q.length && alloy.rpcService.sendBatchGetVipInfo(q, {
				did: e
			}, S, null)
		};
		var J, M = function(a, e) {
				J = alloy.layout.messagebox('<div style="width:100%; height:100%; line-height:30px;">\t\t\t\t\t\t<div style ="text-align: left; padding-left: 10px;">\t\t\t\t\t\t\t<div>\u4e3a\u4e86\u60a8\u7684\u8d26\u53f7\u5b89\u5168\uff0c\u8bf7\u6267\u884c\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5728\u8f93\u5165\u6846\u8f93\u5165\u4e0b\u56fe\u4e2d\u7684\u9a8c\u8bc1\u7801</div>\t\t\t\t\t\t\t<div>\u9a8c\u8bc1\u7801:&nbsp&nbsp<input id="eqq_verify_input_code" type="text" style="vertical-align:middle;" /></div>\t\t\t\t\t\t\t<img style="float:left;margin-right:10px" id="eqq_verify_img_code" src="" />\t\t\t\t\t\t\t<a style="display:inline;line-height:60px;" id="eqq_verify_a_code" alt="\u770b\u4e0d\u6e05\u6362\u4e00\u5f20" href="#">\u770b\u4e0d\u6e05\u6362\u4e00\u5f20</a>\t\t\t\t\t\t\t<div id="eqq_verify_img_code_wrong" style="display:none;color:red;width:65px;">\u9a8c\u8bc1\u7801\u9519\u8bef</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>', {
					title: "\u8eab\u4efd\u9a8c\u8bc1",
					resize: !0,
					width: 380,
					height: 123,
					hasOkButton: !0,
					windowType: "EqqWindow",
					isSetCentered: !0
				});
				var b = n.id("eqq_verify_img_code"),
					k = n.id("eqq_verify_a_code"),
					f = n.id("eqq_verify_input_code"),
					g = null;
				c.on(b, "load", function() {
					g = d.cookie.get("verifysession", alloy.CONST.MAIN_DOMAIN)
				});
				c.on(k, "click", function(a) {
					a.preventDefault();
					n.id("eqq_verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random()
				});
				c.addObserver(J, "clickOkButton", function() {
					var c = f.value;
					if (c && g) return e(a, c, g), !1;
					f.focus();
					n.id("eqq_verify_input_code").innerHTML = "\u8bf7\u5148\u8f93\u5165\u9a8c\u8bc1\u7801\uff01";
					return !1
				});
				f.focus();
				c.on(f, "keydown", function(a) {
					a.keyCode == 13 && c.notifyObservers(J, "clickOkButton") && setTimeout(function() {
						J.close()
					}, 0)
				});
				n.id("eqq_verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random()
			},
			S = function(a) {
				if (a.retcode == 0 && a.arguments && a.arguments.did) {
					var e = a.arguments.did,
						d = b.getDiscuById(e),
						k = {},
						a = a.result.vipinfo,
						f;
					for (f in a) {
						var g = a[f];
						k[g.u] = {
							vip: g.vip_level,
							uin: g.u
						};
						var h = b.getUserByUin(g.u);
						h && (h.vip = g.vip_level)
					}
					d && d.updateMembers(k);
					c.notifyObservers(b, "BatchGetDiscuVipInfoSuccess", {
						list: k,
						did: e
					})
				}
			};
		this.createDiscu = function(a) {
			a = a || [];
			if (a.length < 2) return !1;
			var e = [],
				c = [],
				d = [],
				b;
			for (b in a) {
				var k = a[b];
				k.uin = k.uin.toString();
				k.gid && k.gid.length > 3 ? (c.push(k.uin), d.push(k.gid.toString())) : e.push(k.uin)
			}
			R({
				discu_name: "",
				mem_list: e,
				mem_list_u: c,
				mem_list_g: d
			})
		};
		var R = b.sendCreateDiscu = function(a, e, c) {
				a = a || {};
				a.code = e;
				a.verifysession = c;
				a.clientid = EQQ.RPCService.getClientId();
				a.psessionid = EQQ.getPsessionid();
				a.vfwebqq = alloy.portal.getVfWebQQ();
				EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/create_discu", {
					context: b,
					method: "POST",
					data: {
						r: d.json.stringify(a)
					},
					arguments: a,
					onSuccess: function(e) {
						if (e.retcode === 0) {
							var c = !1;
							!d.isUndefined(e.result.result) && e.result.result > 0 && (c = !0);
							setTimeout(function() {
								try {
									J && J.close()
								} catch (a) {}
							}, 0);
							c ? (alloy.layout.alert("\u521b\u5efa\u8ba8\u8bba\u7ec4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
								windowType: "EqqWindow"
							}), d.error("\u521b\u5efa\u8ba8\u8bba\u7ec4\u5931\u8d25")) : b.sendCreateDiscuSuccess(e)
						} else e.retcode === 1E3 ? M(a, function(a, e, c) {
							b.sendCreateDiscu(a, e, c)
						}) : e.retcode === 1001 ? (n.id("eqq_verify_img_code_wrong").style.display = "inline", n.id("eqq_verify_img_code").src = "http://captcha.qq.com/getimage?aid=1003901&" + Math.random(), n.id("eqq_verify_input_code").value = "", n.id("eqq_verify_input_code").focus()) : (setTimeout(function() {
							try {
								J && J.close()
							} catch (a) {}
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
		this.sendCreateDiscuSuccess = function(a) {
			a = b.encodeDid(a.result.did);
			b.addDiscu({
				did: a,
				name: ""
			});
			var e = b.getDiscuById(a);
			e.setHadModified(!1);
			c.notifyObservers(b, "AddNewDiscuToList", e);
			c.notifyObservers(b, "ToStartDiscuChat", a)
		};
		this.sendModifyDiscuTopic = function(a) {
			a.did = b.decodeDid(a.did);
			a = a || {};
			a.dtype = 1;
			a.clientid = EQQ.RPCService.getClientId();
			a.psessionid = EQQ.getPsessionid();
			a.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/modify_discu_info", {
				context: b,
				method: "POST",
				data: {
					r: d.json.stringify(a)
				},
				arguments: a,
				onSuccess: function(e) {
					if (e.retcode === 0) if (!d.isUndefined(e.result.error) && e.result.error == 2) alloy.layout.alert("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u5931\u8d25.", null, {
						windowType: "EqqWindow"
					}), d.error("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u5931\u8d25,\u6709\u810f\u8bcd"), e = b.encodeDid(a.did), e = b.getDiscuById(e), c.notifyObservers(b, "ModifyDiscuTopicSuccess", e), alloy.util.report2qqweb("dicussionsmask|titlebar|theme|false");
					else if (!d.isUndefined(e.result.error) && e.result.error == 1) P(a);
					else {
						d.info("\u4fee\u6539\u8ba8\u8bba\u7ec4\u4e3b\u9898\u6210\u529f");
						var e = a,
							k = b.encodeDid(e.did),
							k = b.getDiscuById(k);
						k.setName(e.discu_name);
						k.setHadModified(!0);
						c.notifyObservers(b, "ModifyDiscuTopicSuccess", k);
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
		this.sendQuitDisc = function(a) {
			var a = a || {},
				e = a.did;
			a.did = b.decodeDid(a.did);
			a.clientid = EQQ.RPCService.getClientId();
			a.psessionid = EQQ.getPsessionid();
			a.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/quit_discu", {
				context: b,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					a.retcode === 0 ? (a = {
						did: e
					}, b.removeDiscu(a), c.notifyObservers(b, "QuitDiscuSuccess", a)) : (alloy.layout.alert("\u9000\u51fa\u8ba8\u8bba\u7ec4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
						windowType: "EqqWindow"
					}), d.error("\u9000\u51fa\u8ba8\u8bba\u7ec4\u5931\u8d25"))
				},
				onError: function() {
					alloy.layout.alert("\u9000\u51fa\u8ba8\u8bba\u7ec4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!");
					d.error("\u9000\u51fa\u8ba8\u8bba\u7ec4\u5931\u8d25")
				}
			})
		};
		this.modifyDiscuMembers = function(a, e) {
			a = a || [];
			if (a.length < 1) return !1;
			var c = [],
				d = [],
				k = [],
				f;
			for (f in a) {
				var g = a[f];
				g.uin = g.uin.toString();
				g.gid && g.gid.length > 3 ? (d.push(g.uin), k.push(g.gid.toString())) : c.push(g.uin)
			}
			e.mem_list = c;
			e.mem_list_u = d;
			e.mem_list_g = k;
			b.sendModifyMember(e)
		};
		this.sendModifyMember = function(a) {
			var a = a || {},
				e = a.did;
			a.did = b.decodeDid(a.did);
			a.clientid = EQQ.RPCService.getClientId();
			a.psessionid = EQQ.getPsessionid();
			a.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/change_discu_mem", {
				context: b,
				method: "POST",
				data: {
					r: d.json.stringify(a)
				},
				arguments: a,
				onSuccess: function(a) {
					a.retcode === 0 ? (G(e), d.info("\u4fee\u6539\u8ba8\u8bba\u7ec4\u6210\u5458\u6210\u529f")) : (alloy.layout.alert("\u9080\u8bf7\u6210\u5458\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!", null, {
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
		this.sendGetDiscuMemberStatus = function(a) {
			a = a || {};
			a.did = b.decodeDid(a.did);
			a.clientid = EQQ.RPCService.getClientId();
			a.psessionid = EQQ.getPsessionid();
			a.vfwebqq = alloy.portal.getVfWebQQ();
			EQQ.RPCService.send(EQQ.CONST.CONN_SERVER_DOMAIN + "channel/get_discu_status_info", {
				context: b,
				data: a,
				arguments: a,
				onSuccess: function(a) {
					a.retcode === 0 ? b.getDiscuMemberStatusSuccess(a) : d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u6210\u5458\u72b6\u6001\u5931\u8d25")
				},
				onError: function() {
					d.error("\u83b7\u53d6\u8ba8\u8bba\u7ec4\u6210\u5458\u72b6\u6001\u5931\u8d25")
				}
			})
		};
		this.getDiscuMemberStatusSuccess = function(a) {
			var e = b.encodeDid(a.arguments.did),
				a = b.getDiscuById(e).modifyMemberStatus(a.result.mem_status);
			a.length > 0 && c.notifyObservers(b, "GetDiscuMemberStatusSuccess", {
				did: e,
				list: a
			})
		};
		this.isDiscuPrompt = function(a) {
			a = this.getDiscuById(a);
			switch (parseInt(a.mask)) {
			case 0:
				return !0;
			case 1:
				return !1;
			case 2:
				return !1
			}
		};
		this.sendChangeDiscuMask = function(a) {
			for (var e = {
				idx: EQQ.index,
				port: EQQ.port
			}, c = 0; c < v.length; c++) {
				var k = v[c],
					f = b.decodeDid(k.did);
				e[f] = a.uin == k.did ? a.mask.toString() : k.mask.toString()
			}
			qqweb.rpcService.sendMessageFilterConfig({
				onSuccess: function() {
					var e = {
						uin: a.uin,
						mask: a.mask
					};
					b.getDiscuById(e.uin).setMask(e.mask)
				},
				context: this,
				data: {
					retype: 1,
					app: "EQQ",
					itemlist: '{"discumask":' + d.json.stringify(e) + "}"
				}
			})
		};
		this.getAndAddDiscu = function(a) {
			a = {
				did: a.did,
				name: a.name
			};
			b.addDiscu(a);
			a = b.getDiscuById(a.did);
			c.notifyObservers(b, "AddNewDiscuToList", a);
			c.notifyObservers(b, "AddDiscuByMsgSuccess", a)
		};
		this.sendGetDiscuSessionSignature = function(a) {
			var e = this.decodeDid(this.getUserByUin(a).did);
			EQQ.RPCService.sendGetDiscuSessionSignature({
				group_uin: e,
				to_uin: a
			})
		};
		var Q = function(a) {
				var e = b.getUserByUin(a.arguments.to_uin);
				if (a.result.verify_sig.type === 0 && a.result.group_sig.type === 0) e.chatSession = a.result, c.notifyObservers(b, "GroupBuddySessionSignatureChange", e.uin)
			},
			P = function(a) {
				alloy.layout.alert("\u8ba8\u8bba\u7ec4\u88ab\u5220\u9664!", null, {
					windowType: "EqqWindow"
				});
				a.did = b.encodeDid(a.did);
				b.removeDiscu(a);
				c.notifyObservers(b, "QuitDiscuSuccess", a)
			}
	})
})();
(function() {
	WebqCore.register("EQQ.Model.ChatMsg", function(d) {
		var b = this,
			c = d.event,
			n = d.string,
			l = {},
			g = [],
			a = [],
			h = {},
			w = [],
			f = {},
			q = [],
			t = {},
			m = null,
			x = [],
			o = null,
			u = {},
			j = {},
			z = {},
			K = [],
			I = {},
			A = 0,
			y, v = 0,
			C;
		y = (new Date).getTime();
		y = (y - y % 1E3) / 1E3;
		y = y % 1E4 * 1E4;
		var s = function() {
				A++;
				return y + A
			},
			E = function(a) {
				d.isNumber(a) && (a *= 1E3);
				return d.date.format(new Date(a), "YYYY-MM-DD hh:mm:ss")
			},
			F = function(a) {
				if (d.isString(a.content[1]) && a.content[1].substr(0, 4) === "\u3000  \u3000") {
					RegExp(/(\?.*)\s?$/).test(decodeURIComponent(a.content[1]));
					var k = d.string.mapQuery(RegExp.$1).vk;
					if (!b.uinToVideo) b.uinToVideo = [];
					a = a.from_uin;
					b.uinToVideo[a] = {
						k: k
					};
					c.notifyObservers(b, "AskForVideo", {
						uin: a,
						k: k
					})
				}
			};
		this.init = function() {
			l = {};
			a = [];
			h = {};
			w = [];
			f = {};
			o = null;
			u = {};
			j = {};
			z = {};
			I = {};
			v = A = 0;
			C = null;
			c.addObserver(EQQ.RPCService, "SendMsgSuccess", d.bind(this.onSendMsgSuccess, this));
			c.addObserver(EQQ.RPCService, "PollSuccess", d.bind(this.onPollSuccess, this));
			c.addObserver(EQQ.RPCService, "SendMsgError", d.bind(this.onSendMsgError, this));
			c.addObserver(EQQ.RPCService, "SendGetGroupCustomFaceKeySuccess", d.bind(this.onSendGetGroupCustomFaceKeySuccess, this));
			c.addObserver(EQQ.RPCService, "sendGetOfflinePicUrlSuccess", d.bind(this.onGetOfflinePicUrlSuccess, this));
			c.addObserver(EQQ.RPCService, "getSendPicUrlError", d.bind(this.onSetSendPicUrlError, this));
			c.addObserver(EQQ.Model.BuddyList, "AddDiscuByMsgSuccess", d.bind(this.onAddDiscuByMsgSuccess, this))
		};
		this.getMsgId = s;
		this.setGroupCustomFaceKey = function(a) {
			v = d.now();
			C = {
				key: a.gface_key,
				signature: a.gface_sig
			}
		};
		this.getGroupCustomFaceKey = function() {
			return C
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
			for (var b = this.getGroupCustomFaceKey(), f = 0; f < a.content.length; f++) {
				var g = a.content[f];
				g[0] === "face" && (g[1] = EQQ.CONST.TRANSFER_TABLE[g[1]])
			}
			if (a.type == "discu") return this.sendDiscuCustomFaceInfo(a), !0;
			EQQ.RPCService.sendGetGroupCustomFaceInfo({
				group_uin: a.to,
				group_code: EQQ.Model.BuddyList.getGroupByGid(a.to).code,
				key: b.key,
				sig: b.signature,
				content: d.json.stringify(a.content)
			});
			b = s();
			f = EQQ.Model.BuddyList.getSelf();
			b = {
				type: a.type,
				from_uin: 0,
				sender_uin: f.uin,
				sender: f,
				time: E(new Date),
				content: a.content,
				msg_id: b,
				group_code: EQQ.Model.BuddyList.getGroupByGid(a.to).code
			};
			c.notifyObservers(this, "GroupMessageListChange", {
				gid: a.to,
				msgList: [b]
			})
		};
		this.sendDiscuCustomFaceInfo = function(a) {
			var b = EQQ.Model.BuddyList.getDiscuById(a.to);
			b && N(b, a.content);
			b = this.getGroupCustomFaceKey();
			EQQ.RPCService.sendDiscuMsg({
				did: EQQ.Model.BuddyList.decodeDid(a.to),
				key: b.key,
				sig: b.signature,
				content: d.json.stringify(a.content)
			});
			var b = s(),
				f = EQQ.Model.BuddyList.getSelf(),
				b = {
					type: a.type,
					from_uin: 0,
					sender_uin: f.uin,
					sender: f,
					time: E(new Date),
					content: a.content,
					msg_id: b,
					did: a.to
				};
			c.notifyObservers(this, "DiscuMessageListChange", {
				did: a.to,
				msgList: [b]
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
					clientid: b.getClientidFromRpc()
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
					b = a.msg;
				b.length > 36 && (b = b.substring(0, 36));
				c.notifyObservers(this, "getSendPicGroupSuccess", b)
			} else a.ret === 4 ? (d = /[A-Fa-f0-9]{32}\.[A-Za-z]{3}/, b = a.msg, b.length > 36 ? (b = b.substring(0, 36), d.test(b) ? c.notifyObservers(this, "getSendPicGroupSuccess", b) : c.notifyObservers(this, "sendPicGroupError", a)) : c.notifyObservers(this, "sendPicGroupError", a)) : c.notifyObservers(this, "sendPicGroupError", a)
		};
		this.sendMsg = function(a) {
			var b = s(),
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
				msg_id: b
			}, EQQ.RPCService.sendGroupMsg(f), b = {
				type: a.type,
				from_uin: 0,
				sender_uin: h.uin,
				sender: h,
				time: E(new Date),
				content: a.content,
				msg_id: b,
				group_code: EQQ.Model.BuddyList.getGroupByGid(a.to).code
			}, c.notifyObservers(this, "GroupMessageListChange", {
				gid: a.to,
				msgList: [b]
			});
			else if (a.type === "discu")(g = EQQ.Model.BuddyList.getDiscuById(a.to)) && N(g, a.content), f = {
				did: EQQ.Model.BuddyList.decodeDid(a.to),
				content: f,
				msg_id: b
			}, EQQ.RPCService.sendDiscuMsg(f), b = {
				type: a.type,
				from_uin: 0,
				sender_uin: h.uin,
				sender: h,
				time: E(new Date),
				content: a.content,
				msg_id: b,
				did: a.to
			}, c.notifyObservers(this, "DiscuMessageListChange", {
				did: a.to,
				msgList: [b]
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
							msg_id: b,
							service_type: isNaN(m) ? 1 : 0
						};
					EQQ.RPCService.sendGroupBuddyMsg(f)
				} else f = {
					to: a.to,
					face: a.face,
					content: f,
					msg_id: b
				}, EQQ.RPCService.sendMsg(f);
				b = {
					type: a.type,
					from_uin: 0,
					sender_uin: h.uin,
					sender: h,
					time: E(new Date),
					content: a.content,
					msg_id: b,
					attach: g
				};
				a.isIgnoreHistory || c.notifyObservers(this, "MessageListChange", {
					uin: a.to,
					msgList: [b]
				})
			}
			a.isIgnoreHistory || (l[a.to] ? l[a.to].msgList.push(b) : l[a.to] = {
				last: 0,
				msgList: [b]
			})
		};
		this.addMsgToList = function(a) {
			var b = EQQ.Model.BuddyList.getSelf(),
				d = s(),
				b = {
					type: a.type,
					from_uin: a.from_uin,
					sender_uin: b.uin,
					sender: b,
					time: E(new Date),
					content: a.content,
					msg_id: d,
					attach: typeof a.attach != "undefined" && a.attach ? a.attach : ""
				};
			c.notifyObservers(this, "MessageListChange", {
				uin: a.to,
				msgList: [b]
			});
			l[a.to] ? l[a.to].msgList.push(b) : l[a.to] = {
				last: 0,
				msgList: [b]
			}
		};
		this.onSendMsgSuccess = function(a) {
			c.notifyObservers(this, "SendMsgError", a)
		};
		this.onSendMsgError = function(a) {
			c.notifyObservers(this, "SendMsgError", a)
		};
		this.getMsgHistory = function(a) {
			l[a] && c.notifyObservers(this, "MessageListChange", {
				uin: a,
				msgList: l[a].msgList
			})
		};
		this.getGroupMsgHistory = function(a) {
			l[a] && c.notifyObservers(this, "GroupMessageListChange", {
				gid: a,
				msgList: l[a].msgList
			})
		};
		this.clearChatLog = function(a) {
			l[a] && (l[a] = {
				last: 0,
				msgList: []
			})
		};
		this.receiveMsg = function(a) {
			var b = a.from_uin,
				f = !1,
				g = 0,
				h = typeof a.attach != "undefined" && a.attach ? a.attach : "",
				h = {
					type: "single",
					from_uin: b,
					sender_uin: b,
					sender: EQQ.Model.BuddyList.getUserByUin(b),
					msg_id: a.msg_id,
					content: a.content,
					time: E(a.time),
					raw_time: a.time,
					attach: h
				};
			if (l[b]) {
				for (var j = l[b].msgList, m = j.length, a = 0; a < m; a++) if (j[a].msg_id == h.msg_id) {
					f = !0;
					d.out("\u53d1\u73b0\u91cd\u590d\u4e2a\u4eba\u6d88\u606f\uff0cmsg_id\uff1a" + h.msg_id);
					break
				}
				f || (j.push(h), g++)
			} else l[b] = {
				last: 0,
				msgList: []
			}, l[b].msgList.push(h), g++;
			I[b] = h.msg_id;
			f = {
				last: 0,
				msgList: []
			};
			if (g > 0) {
				for (a = 0; a < g; a++) f.msgList.push(l[b].msgList[l[b].msgList.length - (g - a)]);
				l[b].last = 0;
				c.notifyObservers(this, "MessageListChange", {
					uin: b,
					msgList: f.msgList
				});
				c.notifyObservers(EQQ, "MessageReceive", {
					uin: b,
					msgList: f.msgList
				});
				c.notifyObservers(this, "StopTyping", b)
			}
		};
		this.receiveSystemMsg = function(a) {
			var b;
			switch (a.type) {
			case "added_buddy_sig":
			case "added_buddy_nosig":
				b = "\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb";
				break;
			case "verify_pass_add":
				b = "\u63a5\u53d7\u4e86\u60a8\u7684\u8bf7\u6c42\uff0c\u5e76\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb";
				var d = {
					uin: a.from_uin,
					status: alloy.util.code2state(a.stat),
					client_type: a.client_type
				};
				c.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {
					tuin: a.from_uin,
					gid: a.group_id,
					newstate: d
				});
				break;
			case "verify_pass":
				b = "\u63a5\u53d7\u4e86\u60a8\u7684\u8bf7\u6c42";
				d = {
					uin: a.from_uin,
					status: alloy.util.code2state(a.stat),
					client_type: a.client_type
				};
				c.notifyObservers(EQQ.Model.BuddyList, "AddANewBuddy", {
					tuin: a.from_uin,
					gid: 0,
					newstate: d
				});
				break;
			case "verify_required":
				b = "\u8bf7\u6c42\u6dfb\u52a0\u60a8\u4e3a\u597d\u53cb\uff0c\u9644\u52a0\u4fe1\u606f(" + (a.msg || "\u65e0") + ")";
				break;
			case "verify_rejected":
				b = "\u62d2\u7edd\u4e86\u60a8\u7684\u8bf7\u6c42\uff0c\u9644\u52a0\u4fe1\u606f(" + (a.msg || "\u65e0") + ")";
				break;
			default:
				b = a.type
			}
			c.notifyObservers(EQQ, "MessageReceive", {
				msgList: [{
					type: "add_buddy",
					sender: {
						htmlShowName: String(a.account)
					},
					from_uin: a.from_uin,
					title: a.uiuin || a.account,
					content: b,
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
			var b, d = alloy.portal.getUin();
			switch (a.type) {
			case "group_join":
				b = d == a.new_member ? "\u60a8\u5df2\u7ecf\u52a0\u5165\u7fa4" + a.t_gcode : a.t_new_member + "\u5df2\u52a0\u5165\u7fa4" + a.t_gcode + "\u3002";
				break;
			case "group_leave":
				a.op_type == 1 ? b = d == a.admin_uin ? "\u60a8\u5df2\u7ecf\u6210\u529f\u5730\u89e3\u6563\u4e86\u7fa4" + a.t_gcode : "\u7fa4" + a.t_gcode + "\u5df2\u7ecf\u88ab\u89e3\u6563" : a.op_type == 2 ? d != a.old_member && (b = a.t_old_member + "\u9000\u51fa\u7fa4" + a.t_gcode + "\u3002") : a.op_type == 3 && (b = d == a.old_member ? "\u60a8\u5df2\u7ecf\u88ab\u79fb\u9664\u51fa\u7fa4" + a.t_gcode : a.t_old_member + "\u5df2\u88ab\u7ba1\u7406\u5458\u79fb\u9664\u51fa\u7fa4" + a.t_gcode + "\u3002");
				a.type = a.type + "_" + a.op_type;
				break;
			case "group_request_join":
				b = a.t_request_uin + "\u7533\u8bf7\u52a0\u5165\u7fa4" + a.t_gcode;
				break;
			case "group_request_join_agree":
				b = "\u7ba1\u7406\u5458\u5df2\u540c\u610f\u60a8\u52a0\u5165\u7fa4" + a.t_gcode;
				break;
			case "group_request_join_deny":
				b = "\u7ba1\u7406\u5458\u5df2\u62d2\u7edd\u60a8\u52a0\u5165\u7fa4" + a.t_gcode;
				break;
			case "group_admin_op":
				if (a.op_type == 0 || a.op_type == 2) b = d == a.uin ? "\u60a8\u5df2\u7ecf\u88ab\u53d6\u6d88\u7fa4" + a.t_gcode + "\u7684\u7ba1\u7406\u5458\u8eab\u4efd\u3002" : a.t_uin + "\u5df2\u7ecf\u88ab\u53d6\u6d88\u7fa4" + a.t_gcode + "\u7684\u7ba1\u7406\u5458\u8eab\u4efd\u3002";
				else if (a.op_type == 1 || a.op_type == 3) b = d == a.uin ? "\u60a8\u5df2\u6210\u4e3a\u7fa4" + a.t_gcode + "\u7684\u7ba1\u7406\u5458\u3002" : a.t_uin + "\u5df2\u6210\u4e3a\u7fa4" + a.t_gcode + "\u7684\u7ba1\u7406\u5458\u3002";
				else if (a.op_type == 255) if (d == a.old_uin) b = "\u60a8\u5df2\u7ecf\u6210\u529f\u5c06\u7fa4" + a.t_gcode + "\u7684\u7fa4\u4e3b\u8eab\u4efd\u8f6c\u8ba9\u7ed9" + a.t_new_uin + "\u3002";
				else if (d == a.new_uin) b = a.t_gcode + "\u7684\u7fa4\u4e3b" + a.t_old_uin + "\u5df2\u7ecf\u5c06\u8be5\u7fa4\u8f6c\u8ba9\u7ed9\u60a8\uff0c\u73b0\u5728\u60a8\u4e3a\u8be5\u7fa4\u7fa4\u4e3b\u3002";
				else return !1;
				a.type = a.type + "_" + a.op_type;
				break;
			case "group_create":
				b = "\u60a8\u5df2\u7ecf\u6210\u529f\u521b\u5efa\u7fa4" + a.t_gcode;
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
					content: b,
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
			var b = a.from_uin,
				f = !1,
				g = 0,
				h = {
					type: "group",
					from_uin: b,
					sender_uin: a.send_uin,
					sender: EQQ.Model.BuddyList.getUserByUin(a.send_uin),
					msg_id: a.msg_id,
					content: a.content,
					group_code: EQQ.Model.BuddyList.getGroupByGid(b).code,
					time: E(a.time),
					raw_time: a.time
				};
			if (l[b]) {
				for (var a = l[b].msgList.length, j = 0; j < a; j++) {
					var m = l[b].msgList[j];
					if (h.sender_uin == m.sender_uin && m.msg_id == h.msg_id) {
						f = !0;
						d.out("\u53d1\u73b0\u91cd\u590d\u7fa4\u6d88\u606f\uff0cmsg_id\uff1a" + h.msg_id);
						break
					}
				}
				f || (l[b].msgList.push(h), g++)
			} else l[b] = {
				last: 0,
				msgList: []
			}, l[b].msgList.push(h), g++;
			I[b] = h.msg_id;
			f = l[b].msgList;
			a = f.length;
			h = [];
			if (g > 0) {
				for (j = g; j > 0; j--) h.push(f[a - j]);
				l[b].last = 0;
				c.notifyObservers(this, "GroupMessageListChange", {
					gid: b,
					msgList: h
				});
				c.notifyObservers(EQQ, "MessageReceive", {
					gid: b,
					msgList: h
				})
			}
		};
		this.addMessageBoxUserList = function(e) {
			var b = h[e.from_uin];
			b ? d.array.remove(a, b) : c.notifyObservers(this, "flexStartJump", e.from_uin);
			h[e.from_uin] = e;
			a.push(e);
			c.notifyObservers(this, "MessageBoxUserListChange", this.getMessageBoxUserList())
		};
		this.getMessageBoxUserList = function() {
			return a
		};
		this.removeMessageBoxUserList = function(e) {
			var b = h[e];
			b && d.array.remove(a, b);
			delete h[e];
			c.notifyObservers(this, "flexStopJump", e);
			c.notifyObservers(this, "MessageBoxUserListChange", this.getMessageBoxUserList())
		};
		this.addMessageBoxGroupList = function(a) {
			var b = f[a.from_uin];
			b && d.array.remove(w, b);
			f[a.from_uin] = a;
			w.push(a);
			c.notifyObservers(this, "MessageBoxGroupListChange", this.getMessageBoxGroupList())
		};
		this.getMessageBoxGroupList = function() {
			return w
		};
		this.removeMessageBoxGroupList = function(a) {
			var b = f[a];
			b && d.array.remove(w, b);
			delete f[a];
			c.notifyObservers(this, "MessageBoxGroupListChange", this.getMessageBoxGroupList())
		};
		this.preloadGroupMessageImages = function(a, b) {
			var b = b || 0,
				c = a.content,
				f = a.send_uin,
				g = "",
				g = "",
				h = null,
				l = a.group_code || EQQ.Model.BuddyList.decodeDid(a.did),
				j = a.time,
				m = "",
				q = !0;
			a.did && (q = !1);
			for (var n = function() {
					h = null;
					d.out("preload-image-success!");
					q && alloy.rpcService.reportQstatic("Monitor|Group|imgperload|Succeed")
				}, i = function() {
					h = null;
					d.out("preload-image-error!");
					q && alloy.rpcService.reportQstatic("Monitor|Group|imgperload|Failed")
				}, p = 0, t = c.length; p < t; p++) if (c[p][0] === "cface") m = c[p][1], g = m.server.toString().split(":"), g = EQQ.CONST.CHAT_PIC_SERVER + "cgi-bin/get_group_pic?type=" + b + "&gid=" + l + "&uin=" + f + "&rip=" + g[0] + "&rport=" + g[1] + "&fid=" + m.file_id + "&pic=" + m.name + "&vfwebqq=" + alloy.portal.getVfWebQQ() + "&t=" + j, h = new Image, h.src = g, h.onload = n, h.onerror = i
		};
		this.onPollSuccess = function(a) {
			if (a) {
				a.sort(function(a, e) {
					return (a.value && a.value.time || 0) < (e.value && e.value.time || 0) ? 1 : -1
				});
				for (var b = a.length - 1; b >= 0; b--) {
					var f = a[b];
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
			F(a);
			this.addMessageBoxUserList(a);
			this.receiveMsg(a)
		};
		this.receiveStrangerMsg = function(a) {
			var f = a.from_uin,
				g = {
					uin: f
				},
				h = EQQ.Model.BuddyList.isStranger(f),
				l = function() {
					if (!h) {
						var f = EQQ.Model.BuddyList.createUser(g);
						f.type = "stranger";
						EQQ.Model.BuddyList.addStranger(f);
						f.setClassId(EQQ.hash.userClassType.stranger);
						EQQ.Model.BuddyList.setState(f.uin, "online", "10000");
						c.notifyObservers(b, "NewStranger", f)
					}
					F(a);
					b.addMessageBoxUserList(a);
					b.receiveMsg(a);
					d.out("receiveStrangerMsg")
				};
			h ? l() : alloy.rpcService.sendGetUserInfo_with_code(f, "", "", function(a) {
				if (a.retcode === 0) g = a.result;
				l()
			}, function() {
				l()
			})
		};
		this.receiveGroupBuddyMsg = function(a) {
			var f = a.from_uin,
				g, h = {
					uin: f
				},
				l = EQQ.Model.BuddyList.isUser(f),
				j = function() {
					l ? g = EQQ.Model.BuddyList.getUserByUin(f) : (g = EQQ.Model.BuddyList.createUser(h), g.type = "groupBuddy", EQQ.Model.BuddyList.addStranger(g), g.setClassId(EQQ.hash.userClassType.stranger), EQQ.Model.BuddyList.setState(g.uin, "online", "10000"), c.notifyObservers(b, "NewStranger", g), EQQ.Model.BuddyList.sendGetUserInfo(f));
					if ("service_type" in a) if (a.service_type === 0) g.currentId = a.id;
					else if (a.service_type === 1) g.currentId = EQQ.Model.BuddyList.encodeDid(a.id);
					F(a);
					b.addMessageBoxUserList(a);
					b.receiveMsg(a);
					d.out("receiveGroupBuddyMsg")
				};
			l ? j() : alloy.rpcService.sendGetUserInfo_with_code(f, "", "", function(a) {
				if (a.retcode === 0) h = a.result;
				j()
			}, function() {
				j()
			})
		};
		this.getMessagePointer = function(a) {
			return I[a] || 0
		};
		this.getCustomFaceList = function() {
			return o
		};
		this.getSendPicList = function() {
			return u
		};
		this.loadCustomFaceList = function() {
			c.addObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", r);
			EQQ.RPCService.sendGetCustomFaceList()
		};
		var r = function(a) {
				o = d.array.bubbleSort(a.data, function(a, e) {
					if (a && e) return a[1] - e[1]
				});
				c.notifyObservers(b, "GetCustomFaceListSuccess", o);
				c.removeObserver(EQQ.RPCService, "SendGetCustomFaceListSuccess", r)
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
			b.addMsgToList({
				type: "single",
				from_uin: 0,
				to: a.to_uin,
				content: c,
				attach: d
			})
		};
		this.receiveFile = function(a) {
			if (a.mode === "recv") {
				var b = [
					["rfile", a.name, a.session_id]
				];
				a.content = b;
				a.attach = {
					type: "rfile",
					name: a.name,
					from_uin: a.from_uin,
					time: a.time,
					isread: !1,
					session_id: a.session_id,
					msg_type: a.msg_type
				};
				var d = a.from_uin + "_" + a.session_id;
				j[d] ? j[d] = a.attach : (j[d] = a.attach, this.fileMsgToJumpUserList(a), this.receiveMsg(a));
				alloy.util.report2m(133161)
			} else if (a.mode === "refuse") {
				if (a.type !== 161) {
					if (a.cancel_type == 2 && (z[a.session_id] = !0, b = parseInt(a.session_id, 10).toString(2), b.length >= 12)) b = b.substr(b.length - 12, 12), a.session_id = parseInt(b, 2).toString(10);
					var d = a.from_uin + "_" + a.session_id,
						f = j[d];
					if (typeof f == "undefined") return !1;
					if (f.isFinished) return !1;
					else j[d].isFinished = !0;
					b = [
						["rffile", f.name]
					];
					f.type = "rffile";
					if (a.cancel_type == 2) b = [
						["wrffile", f.name]
					], f.type = "wrffile";
					else if (a.cancel_type == 3) b = [
						["rtfile", f.name]
					], f.type = "rtfile";
					a.content = b;
					a.attach = f;
					this.fileMsgToJumpUserList(a);
					this.receiveMsg(a);
					a.cancel_type != 2 && c.notifyObservers(this, "fromCancenFile", d);
					alloy.util.report2m(133178)
				}
			} else if (a.mode === "send_ack") {
				b = parseInt(a.session_id, 10).toString(2);
				if (b.length < 12) return !1;
				b = b.substr(b.length - 12, 12);
				a.session_id = parseInt(b, 2).toString(10);
				d = a.from_uin + "_" + a.session_id;
				f = j[d];
				b = [
					["wrfile", f.name, f.session_id]
				];
				a.content = b;
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
			b.addMsgToList({
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
			b.addMsgToList({
				type: "single",
				from_uin: 0,
				to: a.from_uin,
				content: c,
				attach: a
			});
			j[a.from_uin + "_" + a.session_id].isFinished = !0;
			c = b.getClientidFromRpc();
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
				var b = j[a.from_uin + "_" + a.session_id];
				if (typeof b.msg_type === "undefined" && !b.msg_type) return !1;
				a.msg_type = b.msg_type
			}
			b = EQQ.Model.BuddyList.isBuddy(a.from_uin);
			a.msg_type === 9 ? b ? this.addMessageBoxUserList(a) : this.receiveStrangerFileMsg(a) : a.msg_type === 10 ? b && this.receiveStrangerFileMsg(a) : a.msg_type === 31 && this.receiveGroupBuddyFileMsg(a)
		};
		this.receiveStrangerFileMsg = function(a) {
			var b = a.from_uin;
			EQQ.Model.BuddyList.isStranger(b) || (b = EQQ.Model.BuddyList.createUser({
				uin: b
			}), EQQ.Model.BuddyList.addStranger(b), b.setClassId(EQQ.hash.userClassType.stranger), EQQ.Model.BuddyList.setState(b.uin, "online", "unknown"), c.notifyObservers(this, "NewStranger", b));
			this.addMessageBoxUserList(a);
			d.out("receiveStrangerFileMsg")
		};
		this.receiveGroupBuddyFileMsg = function(a) {
			var b = a.from_uin;
			if (!EQQ.Model.BuddyList.isStranger(b)) {
				var f = EQQ.Model.BuddyList.createUser({
					uin: b
				});
				EQQ.Model.BuddyList.addStranger(f);
				f.type = "groupBuddy";
				f.setClassId(EQQ.hash.userClassType.stranger);
				EQQ.Model.BuddyList.setState(f.uin, "online", "unknown");
				c.notifyObservers(this, "NewStranger", f);
				EQQ.Model.BuddyList.sendGetUserInfo(b)
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
				b.addMsgToList({
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
				l = f[f.length - 1],
				l = d.string.encodeHtmlSimple(l);
			a.retcode === 0 ? (f = "\u6587\u4ef6\u201c" + l + "\u201d(" + (a.filesize < 1024 ? a.filesize + "\u5b57\u8282" : a.filesize / 1024 < 1024 ? Math.round(a.filesize / 1024 * 100) / 100 + "KB" : a.filesize / 1048576 < 1024 ? Math.round(a.filesize / 1048576 * 100) / 100 + "MB" : Math.round(a.filesize / 1073741824 * 100) / 100 + "MB") + ")\u5df2\u6210\u529f\u4e0a\u4f20\u81f3\u670d\u52a1\u5668\uff0c\u6211\u4eec\u5c06\u4e3a\u60a8\u7684\u597d\u53cb\u4fdd\u5b587\u5929\u3002", g = "sendofffile", EQQ.RPCService.sendOffFileMsg({
				to: a.to_uin,
				file_path: a.filepath,
				filename: l,
				to_uin: a.to_uin
			}, this.sendOffFileMsgRes), alloy.util.report2m(153300)) : a.retcode === -30008 ? (f = "\u4eca\u65e5\u79bb\u7ebf\u6587\u4ef6\u5bb9\u91cf\u4e0d\u8db3\uff0c\u670d\u52a1\u5668\u62d2\u7edd\u4e86\u60a8\u53d1\u9001\u79bb\u7ebf\u201c" + l + "\u201d\u7684\u8bf7\u6c42\u3002", alloy.util.report2m(153301), alloy.util.report2m(153302)) : a.retcode === -30012 || a.retcode === -30013 || a.retcode === -30002 ? (f = "\u4eca\u65e5\u79bb\u7ebf\u6587\u4ef6\u5bb9\u91cf\u4e0d\u8db3\uff0c\u670d\u52a1\u5668\u62d2\u7edd\u4e86\u60a8\u53d1\u9001\u79bb\u7ebf\u201c" + l + "\u201d\u7684\u8bf7\u6c42\u3002", alloy.util.report2m(153301), alloy.util.report2m(153302)) : a.retcode === -30001 ? (f = "\u79bb\u7ebf\u6587\u4ef6\u53d1\u9001\u6b21\u6570\u8d85\u51fa\u6bcf\u65e5\u9650\u5236\uff0c\u670d\u52a1\u5668\u62d2\u7edd\u4e86\u60a8\u53d1\u9001\u79bb\u7ebf\u201c" + l + "\u201d\u7684\u8bf7\u6c42\u3002", alloy.util.report2m(153301), alloy.util.report2m(153303)) : (f = a.retcode === -30003 ? "\u79bb\u7ebf\u6587\u4ef6\u201c" + l + "\u201d\u8d85\u51fa\u6700\u5927\u4e0a\u4f20\u9650\u5236\u3002" : "\u6587\u4ef6\u201c" + l + "\u201d\u4f20\u8f93\u5931\u8d25\u3002", alloy.util.report2m(153301));
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
			b.addMsgToList(f);
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
			b.addMsgToList({
				type: "single",
				from_uin: 0,
				to: a.from_uin,
				content: c,
				attach: d
			})
		};
		this.receiveInputNotify = function(a) {
			c.notifyObservers(b, "BuddyTyping", a.from_uin)
		};
		this.receiveTipsMsg = function(a) {
			if ((a.url || "").indexOf("run=mySignature") === -1) return !1;
			var b = a.txt3.replace("\r\n", ":");
			a.content = b;
			a.type = "mysigntips";
			b = {
				type: "mysigntips",
				sender: {
					htmlShowName: String(a.from_uin)
				},
				from_uin: a.from_uin,
				allow: 1,
				content: b,
				msg_id: a.msg_id,
				opt: {
					uin: a.from_uin,
					nick: a.from_uin,
					msg_id: a.msg_id,
					type: "mysigntips"
				}
			};
			a.aMag = b;
			c.notifyObservers(EQQ, "MessageReceive", {
				msgList: [b]
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
			var b = EQQ.Model.BuddyList.getDiscuById(a.did);
			if (b) this.addMessageBoxDiscuList(a), this.preloadGroupMessageImages(a, 1), this.parseDiscuMsg(a), N(b, a.content);
			else {
				x[a.did] = x[a.did] || [];
				x[a.did].push(a);
				for (var b = {
					did: a.did
				}, c = "", f = 0; f < a.content.length; f++) {
					var g = a.content[f];
					if (d.isArray(g)) if (g[0] == "face") {
						c = "[\u8868\u60c5]";
						break
					} else {
						if (g[0] == "cface") {
							c = "[\u56fe\u7247]";
							break
						}
					} else {
						c = n.cutByBytes(g.toString(), 20);
						break
					}
				}
				b.name = c;
				EQQ.Model.BuddyList.getAndAddDiscu(b)
			}
		};
		this.parseDiscuMsg = function(a) {
			var b = a.did,
				f = !1,
				g = 0,
				h = {
					type: "discu",
					from_uin: b,
					sender_uin: a.send_uin,
					sender: EQQ.Model.BuddyList.getUserByUin(a.send_uin),
					msg_id: a.msg_id,
					content: a.content,
					did: b,
					time: E(a.time),
					raw_time: a.time
				};
			if (l[b]) {
				for (var j = l[b].msgList.length, q = 0; q < j; q++) {
					var n = l[b].msgList[q];
					if (h.sender_uin == n.sender_uin && n.msg_id == h.msg_id) {
						f = !0;
						d.out("\u53d1\u73b0\u91cd\u590ddiscu\u6d88\u606f\uff0cmsg_id\uff1a" + h.msg_id);
						break
					}
				}
				f || (l[b].msgList.push(h), g++)
			} else l[b] = {
				last: 0,
				msgList: []
			}, l[b].msgList.push(h), g++;
			I[b] = h.msg_id;
			f = l[b].msgList;
			j = f.length;
			h = [];
			if (g > 0) {
				for (q = g; q > 0; q--) h.push(f[j - q]);
				l[b].last = 0;
				c.notifyObservers(this, "DiscuMessageListChange", {
					did: b,
					msgList: h
				});
				c.notifyObservers(EQQ, "MessageReceive", {
					did: b,
					msgList: h
				})
			}
			m != null && m != a.info_seq && c.notifyObservers(this, "ServerDiscuInfochange", {
				did: b
			});
			m = a.info_seq
		};
		this.addMessageBoxDiscuList = function(a) {
			var b = t[a.did];
			b && d.array.remove(q, b);
			t[a.did] = a;
			q.push(a);
			c.notifyObservers(this, "MessageBoxDiscuListChange", this.getMessageBoxDiscuList())
		};
		this.getMessageBoxDiscuList = function() {
			return q
		};
		this.removeMessageBoxDiscuList = function(a) {
			var b = t[a];
			b && d.array.remove(q, b);
			delete t[a];
			c.notifyObservers(this, "MessageBoxDiscuListChange", this.getMessageBoxDiscuList())
		};
		this.getDiscuMsgHistory = function(a) {
			l[a] && c.notifyObservers(this, "DiscuMessageListChange", {
				did: a,
				msgList: l[a].msgList
			})
		};
		this.onAddDiscuByMsgSuccess = function(a) {
			var a = x[a.did],
				b;
			for (b in a) {
				var c = a[b];
				c.did = EQQ.Model.BuddyList.decodeDid(c.did);
				this.receiveDiscuMsg(c)
			}
		};
		var N = function(a, b) {
				if (!a.notSetName || a.hadModified) return !1;
				for (var c = {
					did: a.did
				}, f = "", g = 0; g < b.length; g++) {
					var h = b[g];
					if (d.isArray(h)) if (h[0] == "face") {
						f = "[\u8868\u60c5]";
						break
					} else {
						if (h[0] == "cface") {
							f = "[\u56fe\u7247]";
							break
						}
					} else if (!(h == "\n" || h == " ")) {
						f = n.cutByBytes(h.toString(), 20);
						break
					}
				}
				c.discu_name = f;
				EQQ.Model.BuddyList.sendModifyDiscuTopic(c)
			};
		this.setMessageRead = function(a) {
			K = K.concat(a)
		};
		this.getMessageRead = function() {
			var a = [].concat(K);
			K = [];
			return a
		};
		this.saveHtmlMsg = function(a, b) {
			g[a] = g[a] || [];
			g[a].push(b)
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
		b = function(b) {
			var c = b.dom,
				a = b.event,
				d = b.string,
				n = !1;
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
			this.onDiscuListClick = function(b) {
				b = b.getAttribute("did");
				a.notifyObservers(this, "StartDiscuChat", b);
				pgvSendClick({
					hottag: "web2qq.qqpanel.discu.sendmsg"
				});
				alloy.util.report2im("qqpanel|dicussions|sendmsg")
			};
			this.getNewNode = function(a, b) {
				var b = b || !1,
					l = "",
					m = b ? "EQQ_RecentList_State_" + a.did : "EQQ_discuList_State_" + a.did,
					n = b ? "EQQ_RecentDiscuList_State_" + a.did : "EQQ_discuList_Name_" + a.did;
				parseInt(a.mask) > 0 && (l = " EQQ_GroupMask_State");
				l = d.template('\t\t\t\t<div class="EQQ_GroupList_AvatarContainer">\t\t\t\t\t<div class="EQQ_discuList_Avatar"></div>\t\t\t\t\t<div class="EQQ_GroupList_State ' + l + '" id="' + m + '" title="\u8ba8\u8bba\u7ec4\u5c4f\u853d"></div>\t\t\t\t</div>\t\t\t\t<div class="EQQ_GroupList_RightContainer" title="<%=titleName%>">\t\t\t\t\t<div id="' + n + '" class="EQQ_GroupList_Name"><%=htmlName%></div>\t\t\t\t</div>\t\t\t', a);
				m = c.node("div", {
					id: b ? "EQQ_Recent_" + a.did : "EQQ_Discu_" + a.did,
					did: a.did,
					"class": "EQQ_GroupList_Group"
				});
				m.innerHTML = l;
				return m
			};
			this.removeDiscu = function(b) {
				var d = c.id("EQQ_Discu_" + b);
				if (d && (a.off(d), d.parentNode)) {
					var h = d.parentNode;
					h.removeChild(d)
				}
				if (b = c.id("EQQ_Recent_" + b)) if (a.off(b), b.parentNode) h = b.parentNode, h.removeChild(b);
				(h = c.id("EQQ_discuListInner")) && h.innerHTML == "" && this.showCreatePanel()
			};
			this.discuJumpUp = function(a) {
				n = !0;
				for (var b = 0; b < a.length; b++) {
					var d = c.id("EQQ_Discu_" + a[b]);
					d && c.addClass(d, "EQQ_jumpUpInGroupList")
				}
			};
			this.discuJumpDown = function(a) {
				n = !1;
				for (var b = 0; b < a.length; b++) {
					var d = c.id("EQQ_Discu_" + a[b]);
					d && c.removeClass(d, "EQQ_jumpUpInGroupList")
				}
			};
			this.discuJumpAvatar = function(a) {
				n ? this.discuJumpDown(a) : this.discuJumpUp(a)
			};
			this.onCreateDiscu = function(a, c) {
				a.preventDefault();
				alloy.portal.runApp("selectBuddy", {
					title: "\u521b\u5efa\u8ba8\u8bba\u7ec4",
					isAddSelef: !0,
					maxBuddy: 20,
					windowType: "EqqWindow",
					onSelected: EQQ.Model.BuddyList.createDiscu
				});
				b.isUndefined(c) && alloy.util.report2im("qqpanel|dicussions|create")
			};
			this.updateDiscuName = function(a) {
				var b = c.id("EQQ_discuList_Name_" + a.did);
				b.parentNode.title = a.titleName;
				b.innerHTML = a.htmlName;
				if (b = c.id("EQQ_RecentDiscuList_State_" + a.did)) b.parentNode.title = a.titleName, b.innerHTML = a.htmlName
			};
			this.setDiscuListMaskState = function(a, b) {
				var d = c.id("EQQ_discuList_State_" + a),
					h = c.id("EQQ_RecentList_State_" + a);
				parseInt(b) > 0 ? (d && c.addClass(d, "EQQ_GroupMask_State"), h && c.addClass(h, "EQQ_GroupMask_State")) : (d && c.removeClass(d, "EQQ_GroupMask_State"), h && c.removeClass(h, "EQQ_GroupMask_State"))
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
			this.onDiscuContextMenu = function(a, b) {
				a.preventDefault();
				a.stopPropagation();
				alloy.layout.showContextMenu({
					x: a.clientX,
					y: a.clientY
				}, {
					width: 180,
					argument: b,
					items: this.discuMenuConfig,
					beforeShow: this.setDiscuMaskItemState
				})
			};
			this.setDiscuMaskItemState = function(a) {
				var b = a.getArgument(),
					b = EQQ.Model.BuddyList.getDiscuById(b),
					c = 2,
					a = [a.getItemAt(c++), a.getItemAt(c++), a.getItemAt(c++)],
					b = b.mask,
					d;
				for (d in a) a[d].option.argument.state == b ? a[d].setIcon({
					style: "background: url(./style/images/eqq_sprite.gif) no-repeat 5px -33px;"
				}) : a[d].setIcon(null)
			};
			this.onDiscuMaskItemClick = function(a, b, c) {
				a = b.option.argument;
				c = c.getArgument();
				EQQ.Model.BuddyList.sendChangeDiscuMask({
					type: "single",
					uin: c,
					mask: a.state
				});
				qqweb.util.report2qqweb("contextmenu|dicussions|" + a.flag)
			};
			this.showReloadDiscuList = function() {
				this.EQQ_discuListInner.innerHTML = "";
				var b = c.id("EQQ_discuListFail"),
					d = c.id("EQQ_discuReLogin_text"),
					h = c.id("EQQ_discuReLogining_text");
				c.show(b);
				c.show(d);
				c.hide(h);
				a.off(b, "click");
				a.on(b, "click", function(a) {
					a.preventDefault();
					a.stopPropagation();
					EQQ.Model.BuddyList.sendGetDiscuList();
					c.show(h);
					c.hide(d)
				});
				this.hideCreatePanel()
			};
			this.hideReloadDiscuList = function() {
				var a = c.id("EQQ_discuListFail");
				c.isShow(a) && c.hide(a)
			};
			this.showCreatePanel = function() {
				var a = c.id("EQQ_discuCreate");
				c.isShow(a) || c.show(a)
			};
			this.hideCreatePanel = function() {
				var a = c.id("EQQ_discuCreate");
				c.isShow(a) && c.hide(a)
			}
		},
		c = function(c) {
			var g = this,
				a = c.dom,
				h = c.event,
				n = c.string,
				f = !1,
				q = !1,
				t = !1,
				m = !1,
				x = {},
				o = [],
				u = [],
				j = [],
				z = [],
				K = [],
				I = {},
				A = 0,
				y = 160,
				v = "0",
				C = alloy.layout.getPanel("desktop").body,
				s, E, F = [],
				r = !1,
				N = !1,
				e = "single",
				k = "",
				B = !1,
				H;
			EQQ.avatarMouseoverTimer = null;
			var G = {},
				J = !1;
			b.apply(this, [c]);
			var M = function(a, c, b) {
					a = c.option.argument;
					a.type == "single" ? (b = b.getArgument(), b = EQQ.Model.BuddyList.getGroupByCode(b).gid, b = {
						type: a.type,
						uin: b,
						mask: a.state + ""
					}) : b = {
						type: a.type,
						uin: EQQ.Model.BuddyList.getSelfUin(),
						mask: a.state + ""
					};
					EQQ.Model.BuddyList.sendChangeGroupMask(b);
					qqweb.util.report2qqweb("contextmenu|group|" + a.flag)
				},
				S = [{
					text: "\u53d1\u9001\u5373\u65f6\u6d88\u606f",
					onClick: function(a, c, b) {
						a = b.getArgument();
						h.notifyObservers(g, "StartChat", a);
						qqweb.util.report2qqweb("contextmenu|contancts|sendmsg")
					}
				}, {
					text: "\u53d1\u9001\u7535\u5b50\u90ae\u4ef6",
					onClick: function(a, c, b) {
						a = b.getArgument();
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
					onClick: function(a, c, b) {
						a = b.getArgument();
						qqweb.rpcService.sendGetFriendUin2(a, 2, function(a) {
							qqweb.portal.runApp("6", {
								url: EQQ.getQzoneUrl(a.result.account)
							});
							qqweb.util.report2qqweb("contextmenu|contancts|qzone")
						})
					}
				}, {
					text: "\u521b\u5efa\u684c\u9762\u8054\u7cfb\u4eba",
					onClick: function(a, c, b) {
						a = b.getArgument();
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
						var c = a.parentMenu.getArgument();
						h.notifyObservers(g, "GetSingleMenuClassItems", {
							u: c,
							f: function(b) {
								a.clearItems();
								for (var d = 0; d < b.length; d++) {
									var f = b[d];
									(function() {
										var a = f.classId;
										f.onClick = function() {
											h.notifyObservers(g, "MoveBuddyClass", {
												uin: c,
												classId: a
											})
										}
									})();
									a.addItem(f)
								}
							}
						})
					},
					items: []
				}, {
					text: "\u5220\u9664\u597d\u53cb",
					onClick: function(a, c, b) {
						a = b.getArgument();
						h.notifyObservers(g, "RemoveBuddyConfirm", a);
						qqweb.util.report2qqweb("contextmenu|contancts|delete")
					}
				}, {
					text: "\u4fee\u6539\u5907\u6ce8",
					onClick: function(a, c, b) {
						a = b.getArgument();
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
					onClick: function(a, c, b) {
						a = b.getArgument();
						qqweb.portal.runApp("userDetails", a);
						qqweb.util.report2qqweb("contextmenu|contancts|profile")
					}
				}],
				R = [{
					text: "\u5934\u50cf\u663e\u793a",
					type: "submenu",
					icon: {
						className: "eqq_header_switch_icon"
					},
					beforeShow: function(a) {
						aa() ? (a.getItemAt(0).setIcon({
							className: "eqq_cxmenu_check_icon"
						}), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
							className: "eqq_cxmenu_check_icon"
						}))
					},
					items: [{
						text: "\u5927\u5934\u50cf",
						onClick: function() {
							g.ifFlexReady ? g.setFlexBigHead(!0) : U("single", !0);
							T("single", !0);
							qqweb.util.report2qqweb("contextmenu|contancts|largeicon")
						}
					}, {
						text: "\u5c0f\u5934\u50cf",
						onClick: function() {
							g.ifFlexReady ? g.setFlexBigHead(!1) : U("single", !1);
							T("single", !1);
							qqweb.util.report2qqweb("contextmenu|contancts|normalicon")
						}
					}]
				}, {
					text: "\u663e\u793a\u5728\u7ebf\u8054\u7cfb\u4eba",
					onClick: function(ea, b) {
						J ? (a.removeClass(g.EQQ_buddyListPanel, "show_only_online_buddy"), b.setText("\u663e\u793a\u5728\u7ebf\u8054\u7cfb\u4eba"), J = !1) : (a.addClass(g.EQQ_buddyListPanel, "show_only_online_buddy"), b.setText("\u663e\u793a\u6240\u6709\u8054\u7cfb\u4eba"), J = !0);
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
				Q = [{
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
						G[a] ? (qqweb.portal.openInWebBrowser({
							url: EQQ.CONST.QQ_GROUP_URL + G[a],
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
					onClick: M
				}, {
					text: "\u63a5\u6536\u4e0d\u63d0\u793a\u7fa4\u6d88\u606f",
					argument: {
						type: "single",
						state: 1,
						flag: "single|withoutalert"
					},
					onClick: M
				}, {
					text: "\u5b8c\u5168\u963b\u6b62\u7fa4\u6d88\u606f",
					argument: {
						type: "single",
						state: 2,
						flag: "single|block"
					},
					onClick: M
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
				P = [{
					text: "\u5934\u50cf\u663e\u793a",
					type: "submenu",
					icon: {
						className: "eqq_header_switch_icon"
					},
					beforeShow: function(a) {
						ba() ? (a.getItemAt(0).setIcon({
							className: "eqq_cxmenu_check_icon"
						}), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
							className: "eqq_cxmenu_check_icon"
						}))
					},
					items: [{
						text: "\u5927\u5934\u50cf",
						onClick: function() {
							U("group", !0);
							T("group", !0);
							qqweb.util.report2qqweb("contextmenu|group|largeicon")
						}
					}, {
						text: "\u5c0f\u5934\u50cf",
						onClick: function() {
							U("group", !1);
							T("group", !1);
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
					onClick: M
				}, {
					text: "\u6240\u6709\u7fa4\u63a5\u6536\u5e76\u63d0\u793a\u6d88\u606f",
					argument: {
						type: "global",
						state: 1,
						flag: "all|withalert"
					},
					onClick: M
				}, {
					text: "\u6240\u6709\u7fa4\u63a5\u6536\u4e0d\u63d0\u793a\u6d88\u606f",
					argument: {
						type: "global",
						state: 2,
						flag: "all|withoutalert"
					},
					onClick: M
				}, {
					text: "\u6240\u6709\u7fa4\u5b8c\u5168\u963b\u6b62\u7fa4\u6d88\u606f",
					argument: {
						type: "global",
						state: 3,
						flag: "all|block"
					},
					onClick: M
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
				i = [{
					text: "\u5934\u50cf\u663e\u793a",
					type: "submenu",
					icon: {
						className: "eqq_header_switch_icon"
					},
					beforeShow: function(a) {
						da() ? (a.getItemAt(0).setIcon({
							className: "eqq_cxmenu_check_icon"
						}), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
							className: "eqq_cxmenu_check_icon"
						}))
					},
					items: [{
						text: "\u5927\u5934\u50cf",
						onClick: function() {
							U("recent", !0);
							T("recent", !0);
							qqweb.util.report2qqweb("contextmenu|recent|largeicon")
						}
					}, {
						text: "\u5c0f\u5934\u50cf",
						onClick: function() {
							U("recent", !1);
							T("recent", !1);
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
					ba() ? (a.getItemAt(0).setIcon({
						className: "eqq_cxmenu_check_icon"
					}), a.getItemAt(1).setIcon()) : (a.getItemAt(0).setIcon(), a.getItemAt(1).setIcon({
						className: "eqq_cxmenu_check_icon"
					}))
				},
				items: [{
					text: "\u5927\u5934\u50cf",
					onClick: function() {
						U("group", !0);
						T("group", !0);
						qqweb.util.report2qqweb("contextmenu|dicussions|largeicon")
					}
				}, {
					text: "\u5c0f\u5934\u50cf",
					onClick: function() {
						U("group", !1);
						T("group", !1);
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
						var ea = String(a.value);
						if (c.string.byteLength(ea, 3) > b) a.value = c.string.cutRight(ea, 1), d(a, b)
					},
					f = alloy.layout.confirm('<div style="text-align: left;margin-top: 15px;margin-left: 20px;">\u8bf7\u8f93\u5165\u5907\u6ce8\u59d3\u540d\uff1a\t\t\t\t\t\t\t\t</div><div style="text-align: left;margin-left: 20px;"><input style="width:318px;margin-top: 5px;                                height: 20px;text-align: left;float: left;" \t\t\t\t\t\t\t\tclass="confirm_markname" type="text" value="' + (b && b.markName || "") + '" /></div>', function() {
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
					e = c.dom.mini(".confirm_markname", f.container)[0];
				h.on(e, "keyup", function(a) {
					d(e, 24);
					a.keyCode == 13 && (h.notifyObservers(f, "clickOkButton") && setTimeout(function() {
						f.close()
					}, 0), h.off(e))
				});
				e.focus()
			};
			var p = function(a) {
					a.preventDefault();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						items: R
					});
					qqweb.util.report2qqweb("contextmenu|contancts|all")
				},
				D = function(a) {
					a.preventDefault();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						width: 180,
						beforeShow: pa,
						items: P
					});
					qqweb.util.report2qqweb("contextmenu|group|all")
				},
				L = function(a) {
					a.preventDefault();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						width: 150,
						items: i
					})
				},
				ha = function(a) {
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
				Z = function(a) {
					a.preventDefault();
					a.stopPropagation();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						argument: parseInt(this.getAttribute("uin")),
						items: S,
						beforeShow: ha
					});
					qqweb.util.report2qqweb("contextmenu|contancts|person")
				},
				O = function(a) {
					a.preventDefault();
					a.stopPropagation();
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						argument: parseInt(this.getAttribute("uin")),
						items: S,
						beforeShow: ha
					});
					qqweb.util.report2qqweb("contextmenu|recent|person")
				},
				Y = function(a) {
					a.preventDefault();
					a.stopPropagation();
					var b = this.getAttribute("code");
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						argument: b,
						width: 150,
						items: Q,
						beforeShow: oa
					});
					qqweb.util.report2qqweb("contextmenu|group|single")
				},
				V = function(a) {
					a.preventDefault();
					a.stopPropagation();
					var b = this.getAttribute("code");
					alloy.layout.showContextMenu({
						x: a.clientX,
						y: a.clientY
					}, {
						argument: b,
						width: 150,
						items: Q,
						beforeShow: oa
					});
					qqweb.util.report2qqweb("contextmenu|recent|single")
				},
				ca = function(b) {
					b.preventDefault();
					b.stopPropagation();
					b = a.getClientXY(this);
					b = {
						x: b[0],
						y: b[1] + 28,
						offset: 0
					};
					switch (e) {
					case "single":
						alloy.layout.showContextMenu(b, {
							items: R
						});
						qqweb.util.report2qqweb("qqpanel|contacts|tabmenu|menu");
						break;
					case "group":
						alloy.layout.showContextMenu(b, {
							width: 180,
							beforeShow: pa,
							items: P
						});
						qqweb.util.report2qqweb("qqpanel|groups|tabmenu|menu");
						break;
					case "recent":
						alloy.layout.showContextMenu(b, {
							width: 150,
							items: i
						}), qqweb.util.report2qqweb("qqpanel|recent|tabmenu|menu")
					}
				},
				Ca = function(b) {
					b.preventDefault();
					b = a.getClientXY(this);
					b[0] = b[0];
					b[1] -= g.statePanel ? g.statePanel.getHeight() : 176;
					ia(b);
					alloy.util.report2im("contextmenu|statechange")
				},
				Da = function(a) {
					WebqCore.api.call(["exitGroup", [a.arguments.gcode]])
				},
				oa = function(a) {
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
				pa = function(a) {
					var b = 3,
						a = [a.getItemAt(b++), a.getItemAt(b++), a.getItemAt(b++), a.getItemAt(b++)],
						b = EQQ.Model.BuddyList.getGroupMask(),
						c;
					for (c in a) a[c].option.argument.state == b ? a[c].setIcon({
						className: "eqq_cxmenu_check_icon"
					}) : a[c].setIcon(null)
				},
				T = this.setBigHead = function(a, b) {
					var c = alloy.config.configList.useBigHead;
					switch (a) {
					case "single":
						b ? c |= 1 : c &= -2;
						break;
					case "group":
						b ? (c |= 2, r || (r = !0, ra())) : c &= -3;
						break;
					case "recent":
						b ? (c |= 4, N || (N = !0, sa())) : c &= -5
					}
					EQQ.Presenter.MainPanel.saveBigHeadSetting(c)
				},
				U = function(b, c) {
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
					d && (c ? a.addClass(d, "EQQ_List_BigHead") : (a.removeClass(d, "EQQ_List_BigHead"), b == "single" && la()))
				},
				qa = function() {
					aa() ? g.ifFlexReady ? g.setFlexBigHead(!0) : a.addClass(g.EQQ_buddyListPanel, "EQQ_List_BigHead") : g.ifFlexReady ? g.setFlexBigHead(!1) : a.removeClass(g.EQQ_buddyListPanel, "EQQ_List_BigHead");
					ba() ? a.addClass(g.EQQ_groupListPanel, "EQQ_List_BigHead") : a.removeClass(g.EQQ_groupListPanel, "EQQ_List_BigHead");
					da() ? a.addClass(g.EQQ_recentListPanel, "EQQ_List_BigHead") : a.removeClass(g.EQQ_recentListPanel, "EQQ_List_BigHead")
				},
				aa = this.isBuddyListUseBigHead = function() {
					return alloy.config.configList.useBigHead & 1
				},
				ba = function() {
					return alloy.config.configList.useBigHead & 2
				},
				da = function() {
					return alloy.config.configList.useBigHead & 4
				},
				Ea = function() {
					var a = this.getAttribute("state");
					g.setSelfState(a);
					pgvSendClick({
						hottag: "web2qq.corner.topright." + a
					})
				},
				ta = function() {
					a.setStyle(this, "backgroundColor", "#cbe7fc")
				},
				ua = function() {
					a.setStyle(this, "backgroundColor", "transparent")
				},
				Fa = function() {
					a.removeClass(g.EQQ_MyState, "hover")
				},
				Ga = function() {
					a.addClass(g.EQQ_MyState, "hover")
				},
				Ha = function() {},
				va = function(a) {
					g.toggleStatePanel(a)
				},
				ia = va,
				Ia = function(b) {
					b.stopPropagation();
					b = a.getClientXY(g.EQQ_MyState);
					b[1] += 16;
					ia(b);
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
				wa = function(b) {
					g.EQQ_SetSound && (b ? a.replaceClass(g.EQQ_SetSound, "statusBar_sound_open", "statusBar_sound_mute") : a.replaceClass(g.EQQ_SetSound, "statusBar_sound_mute", "statusBar_sound_open"))
				},
				W = function() {
					a.setStyle(this, "backgroundColor", "#cbe7fc")
				},
				X = function() {
					a.setStyle(this, "backgroundColor", "transparent")
				},
				ja = function() {
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
				ka = function() {
					EQQ.avatarMouseoverTimer = window.setTimeout(xa, 500)
				},
				xa = function() {
					g.hideMiniCardPanel()
				},
				La = function() {
					if (EQQ.avatarMouseoverTimer) clearTimeout(EQQ.avatarMouseoverTimer), EQQ.avatarMouseoverTimer = null
				},
				Ma = function() {
					EQQ.avatarMouseoverTimer = window.setTimeout(xa, 500)
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
						H = a.result.account;
						alloy.portal.runApp("6", {
							url: b.replace(c, H)
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
						H = a.result.account;
						alloy.portal.runApp("6", {
							url: b.replace(c, H)
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
				$ = function(a) {
					a.stopPropagation()
				},
				ma = function(a) {
					a.preventDefault();
					a.stopPropagation();
					a = this.getAttribute("uin");
					h.notifyObservers(g, "StartChat", a)
				},
				ya = function() {
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
					if (!B) B = !0, k = g.EQQ_MySignature.value, h.on(g.EQQ_MySignature, "blur", na), a.addClass(g.EQQ_MySignature_wraper, "EQQ_MySignature_edit"), g.EQQ_MySignature.focus(), g.EQQ_MySignature.select(), pgvSendClick({
						hottag: "web2qq.corner.topright.personalmsg"
					})
				},
				za = function() {
					B = !1;
					h.off(g.EQQ_MySignature, "blur", na);
					a.removeClass(g.EQQ_MySignature_wraper, "EQQ_MySignature_edit");
					g.EQQ_MySignature.blur()
				},
				na = function() {
					za();
					g.EQQ_MySignature.value == k ? g.EQQ_MySignature.title = k : (g.EQQ_MySignature.title = "\u7b7e\u540d\u66f4\u65b0\u4e2d:" + g.EQQ_MySignature.value, alloy.rpcService.sendSetSignature(g.EQQ_MySignature.value), alloy.util.report2im("personalinfo|personalmsg|personalmsgedit"))
				},
				Wa = function(a) {
					switch (a.keyCode) {
					case 13:
						na();
						break;
					case 27:
						a.stopPropagation();
						za();
						g.EQQ_MySignature.title = k;
						g.EQQ_MySignature.value = k;
						break;
					default:
						Va()
					}
				},
				Va = function() {
					Aa(this, 150)
				},
				Aa = function(a, b) {
					var d = String(a.value);
					if (d.replace(/[^\x00-\xff]/g, "aaa").length > b) a.value = c.string.cutRight(d, 1), Aa(a, b)
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
				F = [];
				m = t = q = f = !1;
				x = {};
				o = [];
				u = [];
				j = [];
				z = [];
				K = [];
				I = {};
				A = 0;
				E = s = null;
				g.ifFlexReady = !1;
				h.notifyObservers(g, "AddPObservers");
				h.addObserver(alloy.sound, "SoundMuteChange", wa);
				h.addObserver(alloy.app.eqq.window, "resize", c.bind(this.onEqqResize, this));
				c.browser.ie !== 7 && h.addObserver(alloy.app.eqq.window, "dragEnd", Ba);
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
				h.on(this.EQQ_MyAvatar, "mouseover", ja);
				h.on(this.EQQ_MyAvatar, "mouseout", ka);
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
					if (s) g.hideSearchResult(), h.notifyObservers(g, "StartChat", s.uin), s = null, g.EQQ_SearchBox.value = "\u641c\u7d22\u597d\u53cb...", g.EQQ_SearchBox.blur(), pgvSendClick({
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
					i = a.id("EQQ_TabRecentList_MenuIcon");
				h.on(b, "click", ca);
				h.on(d, "click", ca);
				h.on(i, "click", ca);
				this.EQQ_ListContainer = a.id("EQQ_ListContainer");
				this.EQQ_buddyListPanel = a.id("EQQ_buddyListPanel");
				this.EQQ_buddyListPanelBottom = a.id("EQQ_buddyListPanelBottom");
				this.EQQ_groupListOuter = a.id("EQQ_groupListOuter");
				this.EQQ_groupListPanelBottom = a.id("EQQ_groupListPanelBottom");
				c.platform.iPad && new c.ui.TouchScroller(this.EQQ_buddyListPanel);
				this.EQQ_buddyList = a.id("EQQ_buddyList");
				h.on(this.EQQ_buddyList, "mousedown", $);
				h.on(this.EQQ_buddyListPanel, "scroll", fa);
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
				h.on(this.EQQ_groupListInner, "mousedown", $);
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
				h.on(this.EQQ_recentList, "mousedown", $);
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
						e = "single";
						pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.CONTACTS.CONTACTSLIST"
						});
						alloy.util.report2im("qqpanel|contacts|list");
						break;
					case 1:
						e = "group";
						!r && ba() && (r = !0, ra());
						pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.QUN.QUNLIST"
						});
						alloy.util.report2im("qqpanel|groups|list");
						break;
					case 2:
						e = "recent", !N && da() && (N = !0, sa()), pgvSendClick({
							hottag: "WEB2QQ.QQPANEL.RECENT.RECENTLIST"
						}), alloy.util.report2im("qqpanel|recent|list")
					}
				});
				h.on(this.EQQ_buddyListPanel, "contextmenu", p);
				h.on(this.EQQ_groupBox, "contextmenu", D);
				h.on(this.EQQ_discuBox, "contextmenu", c.bind(this.onDiscuListContextMenu, this));
				h.on(this.EQQ_recentListPanel, "contextmenu", L);
				h.on(this.EQQ_buddyListPanelBottom, "contextmenu", $);
				h.on(this.EQQ_groupListPanelBottom, "contextmenu", $);
				h.on(this.EQQ_discuListPanelBottom, "contextmenu", $);
				b = alloy.taskBar.getTaskItem(50, 50);
				h.on(b.getDom(), "contextmenu", Ca);
				this.onEqqResize(alloy.app.eqq.window.getBodySize());
				this.onWindowResize();
				a.show(this.EQQ_MyState);
				qa();
				h.addObserver(EQQ, "eqqUacChange", qa)
			};
			this.createStatePanelDom = function() {
				var b, f = d.statePanel;
				c.browser.ie == 7 ? (b = a.node("div", {
					id: "EQQ_StatePanel",
					"class": "EQQ_statePanel_warp"
				}), f = '<ul class="EQQ_statePanel EQQ_statePanel_ul">' + f + '</ul><iframe class="ui_maskBgIframe"></iframe>') : b = a.node("ul", {
					id: "EQQ_StatePanel",
					"class": "EQQ_statePanel"
				});
				b.innerHTML = f;
				C.appendChild(b);
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
				h.on(this.EQQ_SetSound, "mouseover", ta);
				h.on(this.EQQ_SetSound, "mouseout", ua);
				h.on(this.EQQ_SetSound, "click", Ka);
				b = [this.EQQ_SetOnline, this.EQQ_SetCallme, this.EQQ_SetAway, this.EQQ_SetBusy, this.EQQ_SetSilent, this.EQQ_SetHidden, this.EQQ_SetOffline];
				c.array.forEach(b, function(a) {
					h.on(a, "mouseover", ta)
				});
				c.array.forEach(b, function(a) {
					h.on(a, "mouseout", ua)
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
				C.appendChild(b);
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
					f = a.id("EQQ_RecentList_State_" + b);
				c ? (d && a.removeClass(d, "EQQ_GroupMask_State"), f && a.removeClass(f, "EQQ_GroupMask_State")) : (d && a.addClass(d, "EQQ_GroupMask_State"), f && a.addClass(f, "EQQ_GroupMask_State"))
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
						f = alloy.layout.getClientHeight(),
						e = a[0],
						a = a[1] - 100;
					e < 2 && (e = 2);
					a < 2 && (a = 2);
					e > d - b - 2 && (e = d - b - 2);
					a > f - c - 2 && (a = f - c - 2);
					this.groupMaskPanel.setXY(e, a)
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
				C.appendChild(b);
				var f = a.id("miniCard_avatar"),
					e = a.id("miniCard_name_inner"),
					p = a.id("miniCard_signature"),
					i = a.id("miniCard_signature_inner"),
					j = a.id("miniCard_clientType_inner"),
					k = a.id("miniCard_clientType_innerWrapper"),
					m = a.id("miniCard_level"),
					n = a.id("miniCard_level_upinfo"),
					q = a.id("miniCard_qzone"),
					o = a.id("miniCard_qmail"),
					D = a.id("miniCard_video");
				c.platform.iPad && a.hide(D);
				var L = a.id("miniCard_userDetails");
				h.on(b, "mouseover", La);
				h.on(b, "mouseout", Ma);
				h.on(L, "click", Na);
				h.on(q, "click", Oa);
				h.on(o, "click", Pa);
				h.on(D, "click", Qa);
				this.miniCardPanel = new alloy.layout.Panel({
					container: b,
					body: a.id("miniCardBody"),
					html: ""
				});
				this.miniCardPanel.setInfo = function(b) {
					this.uin = b.uin;
					var d = b.uin == alloy.portal.getUin();
					f.src = EQQ.getUserDefaultAvatar();
					f.src = b.avatarUrl;
					d ? (L.innerHTML = "\u4fee\u6539\u8d44\u6599", f.src = alloy.util.getUserAvatar(b.uin, 1) + "&t=" + (new Date).getTime(), a.hide(D)) : (L.innerHTML = "\u8be6\u7ec6\u8d44\u6599", a.show(D));
					c.platform.iPad && a.hide(D);
					e.innerHTML = b.htmlAllName;
					e.title = b.allName;
					i.innerHTML = "";
					m.innerHTML = "";
					n.innerHTML = "";
					q.href = EQQ.getQzoneUrl(b.uin);
					o.title = b.uin == alloy.portal.getUin() ? "\u8fdb\u5165\u90ae\u7bb1" : "\u53d1\u9001\u90ae\u4ef6";
					o.href = EQQ.getSendMailUrl(b.uin);
					D.setAttribute("uin", b.uin);
					d || b.clientType == "1" || b.clientType == "10000" || b.type == "stranger" || !b.clientType ? (k.className = "miniCard_clientType_innerWrapper", p.style.display = "block") : (k.className = "miniCard_clientType_" + EQQ.hash.clientType[b.clientType || "10000"], d = EQQ.hash.clientTypeText[b.clientType || "10000"], d = EQQ.hash.clientTypeText2readableText[d] || d, j.innerHTML = d + "\u767b\u5f55\u4e2d", p.style.display = "none");
					h.notifyObservers(g, "MiniCardShow", b)
				};
				this.miniCardPanel.setSignature = function(a) {
					i.innerHTML = a.htmlSignature;
					i.title = a.signature
				};
				this.miniCardPanel.setClientType = function(a) {
					if (this.uin == a.uin) a.clientType == "1" ? (k.className = "miniCard_clientType_" + EQQ.hash.clientType[a.clientType || "10000"], j.innerHTML = EQQ.hash.clientTypeText[a.clientType || "10000"] + "\u767b\u5f55\u4e2d", p.style.display = "none") : (k.className = "miniCard_clientType_innerWrapper", p.style.display = "block")
				};
				this.miniCardPanel.setQQLevel = function(a) {
					for (var b = a.level, c = b.level, d = parseInt(c / 64), ea = parseInt(c % 64 / 16), f = parseInt(c % 64 % 16 / 4), e = c % 64 % 16 % 4, h = "", g = 0; g < d; g++) h += '<div class="miniCard_level_div qqLevel_queen"></div>';
					for (g = 0; g < ea; g++) h += '<div class="miniCard_level_div qqLevel_sun"></div>';
					for (g = 0; g < f; g++) h += '<div class="miniCard_level_div qqLevel_moon"></div>';
					for (g = 0; g < e; g++) h += '<div class="miniCard_level_div qqLevel_star"></div>';
					m.innerHTML = h;
					m.title = "\u7b49\u7ea7: " + c;
					if (a.uin == alloy.portal.getUin()) n.innerHTML = '<div class="miniCard_level_upinfo_div" title="\u6d3b\u8dc3\u5929\u6570\uff1a' + b.days + '"><span class="icon days"></span>' + b.days + '\u5929</div><div class="miniCard_level_upinfo_div" title="\u8ddd\u5347\u7ea7\u5230' + (c + 1) + "\u7ea7\u8fd8\u6709" + b.remainDays + '\u5929"><span class="icon remainDays"></span>' + b.remainDays + "\u5929</div>"
				}
			};
			this.showMiniCardPanel = function(a, b) {
				this.miniCardPanel || this.createMiniCardPanelDom();
				if (b) {
					var c = this.miniCardPanel.getWidth() + 10,
						d = this.miniCardPanel.getHeight() + 10,
						f = alloy.layout.getClientWidth(),
						e = alloy.layout.getClientHeight(),
						g = b[0],
						h = b[1];
					g < 2 && (g = 2);
					h < 2 && (h = 2);
					g > f - c - 2 && (g = f - c - 2);
					h > e - d - 2 && (h = e - d - 2);
					this.miniCardPanel.setXY(g, h)
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
				y += 20;
				this.onWindowResize();
				a.show(this.EQQ_YellowTips)
			};
			this.hideYellowTips = function() {
				a.hide(this.EQQ_YellowTips);
				y -= 20;
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
				la()
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
					if (s) b.preventDefault(), g.hideSearchResult(), h.notifyObservers(g, "StartChat", s.uin), s = null, g.EQQ_SearchBox.value = "\u641c\u7d22\u597d\u53cb...", g.EQQ_SearchBox.blur(), pgvSendClick({
						hottag: "web2qq.qqpanel.searchcontacts"
					}), alloy.util.report2im("qqpanel|searchcontacts");
					break;
				case 38:
					A > 0 && (b = a.id("EQQ_SearchResultItem_" + s.uin), a.removeClass(b, "EQQ_SearchResultItemHover"), A--, s = E[A], (b = a.id("EQQ_SearchResultItem_" + s.uin)) && a.addClass(b, "EQQ_SearchResultItemHover"));
					break;
				case 40:
					A < E.length - 1 && (b = a.id("EQQ_SearchResultItem_" + s.uin), a.removeClass(b, "EQQ_SearchResultItemHover"), A++, s = E[A], (b = a.id("EQQ_SearchResultItem_" + s.uin)) && a.addClass(b, "EQQ_SearchResultItemHover"))
				}
			};
			this.startSearch = function() {
				this.clearSearchBox(this.EQQ_SearchBox);
				h.notifyObservers(this, "Search", this.EQQ_SearchBox.value)
			};
			this.showSearchResult = function(b) {
				if (this.EQQ_SearchBox.value) {
					E = b;
					var d = a.getRelativeXY(this.EQQ_SearchBox, this.EQQ_MainPanel);
					a.setStyle(this.EQQ_SearchResultPanel, "left", d[0] + "px");
					a.setStyle(this.EQQ_SearchResultPanel, "top", d[1] + 26 + "px");
					a.setStyle(this.EQQ_SearchResultPanel, "width", alloy.app.eqq.window.getBodySize().width - 5 + "px");
					a.show(this.EQQ_SearchResultPanel);
					this.EQQ_SearchResultPanel.innerHTML = "";
					if (b.length == 0) s = A = null, this.EQQ_SearchResultPanel.innerHTML = '<div class="EQQ_SearchResultNo">\u6ca1\u6709\u627e\u5230\u76f8\u5173\u597d\u53cb</div>';
					else {
						A = 0;
						s = b[0];
						for (d = 0; d < b.length; d++) {
							var f = b[d],
								e = a.node("div");
							a.setClass(e, "EQQ_SearchResultItem");
							e.id = "EQQ_SearchResultItem_" + f.uin;
							e.setAttribute("uin", f.uin);
							e.innerHTML = f.htmlAllName;
							e.title = f.allName;
							this.EQQ_SearchResultPanel.appendChild(e);
							d == 0 && a.addClass(e, "EQQ_SearchResultItemHover");
							h.on(e, "mouseover", this.onSearchResultMouseover);
							h.on(e, "mouseout", this.onSearchResultMouseout);
							h.on(e, "mousedown", this.onSearchResultClick)
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
				s = null;
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
				(k = a = a.signature) || (a = "\u70b9\u51fb\u7f16\u8f91\u7b7e\u540d");
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
			var Ba = function(b) {
					for (var b = b.width, c = F.length; --c >= 0;) {
						var d = F[c].el = F[c].el || a.id("EQQ_Class_" + F[c].index + "_className"),
							f = F[c].len,
							e = F[c].html,
							g = F[c].html_short;
						if (b <= 200) d.innerHTML = g;
						else if (b > f + 20) d.innerHTML = e
					}
				};
			this.addBuddyClass = function(b, d) {
				var f, e;
				f = a.node("div", {
					id: "EQQ_listClassHead_" + b.index,
					classIndex: b.index
				});
				e = b.index == EQQ.hash.userClassType.online ? '\t\t\t\t\t<div class="EQQ_listClassHeadIcon">icon</div>\t\t\t\t\t<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">\t\t\t\t\t\t<div class="EQQ_Class_className" id="EQQ_Class_<%=index%>_className"><%=cut_htmlName%></div>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>]\t\t\t\t\t</div>\t\t\t\t' : '\t\t\t\t\t<div class="EQQ_listClassHeadIcon">icon</div>\t\t\t\t\t<div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">\t\t\t\t\t\t<div class="EQQ_Class_className" id="EQQ_Class_<%=index%>_className"><%=cut_htmlName%>&nbsp;</div>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>/<span id="EQQ_Class_<%=index%>_Counter"><%=count%></span>]\t\t\t\t\t</div>\t\t\t\t';
				b.cut_htmlName = b.htmlName;
				if (b.caculateName) {
					var g = n.getCharWidth(b.caculateName + ("[" + b.onlineCount + "/" + (b.count || 1) + "]"), 12);
					if (g > 120) g = {
						index: b.index,
						len: g,
						html: b.cut_htmlName
					}, b.cut_htmlName = '<div class="mainpanel_limit_class_width_outer"><div class="mainpanel_limit_class_width_inner">' + b.htmlName + "</div></div>...", g.html_short = b.cut_htmlName, F.push(g)
				}
				e = c.string.template(e, b);
				f.innerHTML = e;
				d ? this.EQQ_buddyList.insertBefore(f, d) : this.EQQ_buddyList.appendChild(f);
				h.on(f, "click", Ja);
				g = a.node("div", {
					id: "EQQ_listClassBody_" + b.index,
					"class": "EQQ_listClassBody"
				});
				e = c.string.template('\t\t\t\t<div id="EQQ_Class_<%=index%>_callme" class="EQQ_callmeBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_online" class="EQQ_onlineBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_busy" class="EQQ_busyBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_away" class="EQQ_awayBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_silent" class="EQQ_silentBuddy"></div>\t\t\t\t<div id="EQQ_Class_<%=index%>_offline" class="EQQ_offlineBuddy"></div>\t\t\t', b);
				g.innerHTML = e;
				this.EQQ_buddyList.insertBefore(g, f.nextSibling);
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
				c.browser.ie !== 7 && Ba(b)
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
				return x[a]
			};
			this.setClassExpandFlag = function(a, b) {
				return x[a] = b
			};
			this.getClassAvatarLoadFlag = function(a) {
				return I[a]
			};
			this.setClassAvatarLoadFlag = function(a, b) {
				return I[a] = b
			};
			this.toggleClass = function(a) {
				x[a] ? this.collapsedClass(a) : this.expandClass(a)
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
					f = a.id("EQQ_listClassBody_" + b);
				b == EQQ.hash.userClassType.online ? (a.setClass(d, "EQQ_onlineClassHeadExpand"), a.addClass(d, "expand_online")) : (a.setClass(d, "EQQ_listClassHeadExpand"), a.addClass(d, "expand"));
				a.setStyle(f, "height", "auto");
				this.setClassExpandFlag(b, !0);
				c.out("index: " + b);
				ga()
			};
			var ga = this.loadBuddyListAvatar = function() {
					for (var b = g.EQQ_buddyListPanel, d = parseInt(a.getStyle(b, "height"), 10), b = a.getXY(b)[1], f = 0; f < o.length;) {
						var e = o[f],
							h = e.imgEl,
							p = e.classId,
							i = a.getXY(h)[1] - b;
						g.getClassExpandFlag(p) && h && i > 0 && i < d ? (c.out("checkAndLoadAvatar & loadAvatar containerHeight: " + d + ", imgTop2:" + i), h.src = EQQ.getUserAvatar(e.uin), o.splice(f, 1)) : f++
					}
					if (aa()) {
						b = g.EQQ_buddyListPanel;
						d = parseInt(a.getStyle(b, "height"), 10);
						b = a.getXY(b)[1];
						for (f = 0; f < u.length;) p = u[f], e = p.el, h = p.uin, p = p.classId, i = a.getXY(e)[1] - b, g.getClassExpandFlag(p) && e && i > 0 && i < d ? (e.hasSign || EQQ.Model.BuddyList.getUserSignature(h), u.splice(f, 1)) : f++
					}
				},
				fa = function() {
					la()
				},
				la = function() {
					if (fa.timer) window.clearTimeout(fa.timer), fa.timer = null;
					fa.timer = window.setTimeout(ga, 500)
				},
				ra = function() {
					for (var a = [], b; b = j.shift();) {
						var c = b.gcode;
						b.el.hasSign || a.push(c)
					}
					a.length && EQQ.Model.BuddyList.getMultiGroupAnnounce(a)
				},
				sa = function() {
					for (var a = [], b; b = z.shift();) {
						var c = b.el;
						b = b.uin;
						c.hasSign || a.push(b)
					}
					a.length && EQQ.Model.BuddyList.getMultiUserSignture(a);
					for (a = []; b = K.shift();) c = b.el, b = b.gcode, c.hasSign || a.push(b);
					a.length && EQQ.Model.BuddyList.getMultiGroupAnnounce(a)
				};
			this.addBuddy = function(b) {
				if (b) {
					var d = EQQ.hash.clientTypeText[b.clientType] || "PC",
						f = c.string.template('\t\t\t\t\t<div class="EQQ_BuddyList_ClientType" uin="<%=uin%>" id="EQQ_BuddyList_ClientType_Title_<%=uin%>" title="' + EQQ.hash.clientTypeText[b.clientType || "PC"] + '">\t\t\t\t\t\t<div id="EQQ_BuddyList_ClientType_<%=uin%>" class="EQQ_BuddyList_ClientType_' + EQQ.hash.clientType[b.clientType || "10000"] + '"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id="EQQ_BuddyList_AvatarContainer_<%=uin%>" class="EQQ_BuddyList_AvatarContainer" uin="<%=uin%>" title="' + EQQ.hash.onlineStatusText[b.state] + '">\t\t\t\t\t\t<img id="EQQ_BuddyList_Avatar_<%=uin%>" class="EQQ_BuddyList_Avatar" src="' + alloy.CONST.CDN_URL + 'style/images/avatar_default_20_20.gif" />\t\t\t\t\t\t<div class="EQQ_BuddyList_State"></div>\t\t\t\t\t</div>\t\t\t\t\t<div id="EQQ_BuddyList_RightContainer_<%=uin%>" class="EQQ_BuddyList_RightContainer" title="<%=titleAllName%> - ' + (d === "PC" ? "" : d) + EQQ.hash.onlineStatusText[b.state] + '">\t\t\t\t\t\t<div id="EQQ_BuddyList_Nick_<%=uin%>"  class="EQQ_BuddyList_Nick <%=vip?"EQQ_Vip_Nick":""%>"><%=htmlShowName%></div>\t\t\t\t\t\t<div id="EQQ_BuddyList_Sign_<%=uin%>" title="" class="EQQ_BuddyList_Sign"></div>\t\t\t\t\t</div>\t\t\t\t', b),
						e = a.id("EQQ_Class_" + b.classId + "_" + b.state);
					a.show(e);
					d = a.node("div", {
						id: "EQQ_Buddy_" + b.uin,
						"class": "EQQ_BuddyList_Buddy",
						uin: b.uin,
						fileId: b.uin,
						uid: "buddy_uin_" + b.uin,
						from: "buddy",
						type: "uin"
					});
					d.innerHTML = f;
					e.appendChild(d);
					h.on(d, "mouseover", W);
					h.on(d, "mouseout", X);
					h.on(d, "click", function(a) {
						ma.apply(this, [a]);
						pgvSendClick({
							hottag: "web2qq.qqpanel.contacts.sendmsg"
						});
						alloy.util.report2im("qqpanel|contacts|sendmsg")
					});
					h.on(d, "contextmenu", Z);
					f = a.id("EQQ_BuddyList_AvatarContainer_" + b.uin);
					h.on(f, "mouseover", ja);
					h.on(f, "mouseout", ka);
					c.platform.iPad || g.contactDragController.addDragClass(d);
					d = a.id("EQQ_BuddyList_Avatar_" + b.uin);
					this.getClassExpandFlag(b.classId) ? (c.out("addBuddy & loadAvatar"), d.src = EQQ.getUserAvatar(b.uin)) : o.push({
						uin: b.uin,
						imgEl: d,
						classId: b.classId
					});
					aa() && this.getClassExpandFlag(b.classId) ? EQQ.Model.BuddyList.getUserSignature(b.uin) : (d = a.id("EQQ_BuddyList_Sign_" + b.uin), u.push({
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
						f = a.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_" + b.state);
					a.setStyle(f, "display", "block");
					var e = a.node("div", {
						id: "EQQ_OnlineBuddy_" + b.uin,
						uin: b.uin,
						fileId: b.uin,
						uid: "online_uin_" + b.uin,
						from: "buddy",
						type: "uin"
					});
					e.innerHTML = d;
					f.appendChild(e);
					h.on(e, "mouseover", W);
					h.on(e, "mouseout", X);
					h.on(e, "click", function(a) {
						ma.apply(this, [a]);
						pgvSendClick({
							hottag: "web2qq.qqpanel.contacts.sendmsg"
						});
						alloy.util.report2im("qqpanel|contacts|sendmsg")
					});
					h.on(e, "contextmenu", Z);
					a.addClass(e, "EQQ_BuddyList_Buddy");
					d = a.id("EQQ_OnlineBuddyList_AvatarContainer_" + b.uin);
					h.on(d, "mouseover", ja);
					h.on(d, "mouseout", ka);
					c.platform.iPad || g.contactDragController.addDragClass(e);
					d = a.id("EQQ_OnlineBuddyList_Avatar_" + b.uin);
					e = EQQ.hash.userClassType.online;
					this.getClassExpandFlag(e) ? (c.out("addOnlineBuddy & loadAvatar"), d.src = EQQ.getUserAvatar(b.uin)) : o.push({
						uin: b.uin,
						imgEl: d,
						classId: e
					});
					aa() && this.getClassExpandFlag(e) ? EQQ.Model.BuddyList.getUserSignature(b.uin) : (d = a.id("EQQ_OnlineBuddyList_Sign_" + b.uin), u.push({
						uin: b.uin,
						el: d,
						classId: e
					}))
				}
				ga()
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
						f = a.id("EQQ_RecentList_Sign_" + b.uin);
					if (c && !c.hasSign) c.innerHTML = b.htmlSignature, c.title = b.titleSignature, c.hasSign = !0;
					if (d && !d.hasSign) d.innerHTML = b.htmlSignature, d.title = b.titleSignature, d.hasSign = !0;
					if (f && !f.hasSign) f.innerHTML = b.htmlSignature, f.title = b.titleSignature, f.hasSign = !0
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
				m = !0;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_listClassHead_" + b[c]);
					a.addClass(d, "EQQ_flickerHideInBuddyList")
				}
			};
			this.flickerClassShow = function(b, c) {
				c || (m = !1);
				for (var d = 0; d < b.length; d++) {
					var f = a.id("EQQ_listClassHead_" + b[d]);
					a.removeClass(f, "EQQ_flickerHideInBuddyList")
				}
			};
			this.flickerClass = function(a) {
				m ? this.flickerClassShow(a) : this.flickerClassHide(a)
			};
			this.groupJumpUp = function(b) {
				q = !0;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Group_" + b[c]);
					d && a.addClass(d, "EQQ_jumpUpInGroupList")
				}
			};
			this.groupJumpDown = function(b) {
				q = !1;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Group_" + b[c]);
					d && a.removeClass(d, "EQQ_jumpUpInGroupList")
				}
			};
			this.groupJumpAvatar = function(a) {
				q ? this.groupJumpDown(a) : this.groupJumpUp(a)
			};
			this.recentJumpUp = function(b) {
				t = !0;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Recent_" + b[c]);
					d && (a.addClass(d, "EQQ_jumpUpInBuddyList"), a.addClass(d, "EQQ_jumpUpInGroupList"))
				}
			};
			this.recentJumpDown = function(b) {
				t = !1;
				for (var c = 0; c < b.length; c++) {
					var d = a.id("EQQ_Recent_" + b[c]);
					d && (a.removeClass(d, "EQQ_jumpUpInBuddyList"), a.removeClass(d, "EQQ_jumpUpInGroupList"))
				}
			};
			this.recentJumpAvatar = function(a) {
				t ? this.recentJumpDown(a) : this.recentJumpUp(a)
			};
			this.moveBuddy = function(b) {
				var c = a.id("EQQ_Buddy_" + b.uin),
					d = a.id("EQQ_Class_" + b.classId + "_" + b.state);
				if (d && c) {
					a.setStyle(d, "display", "block");
					var f = c.parentNode;
					d.insertBefore(c, d.firstChild);
					var c = a.id("EQQ_BuddyList_AvatarContainer_" + b.uin),
						d = a.id("EQQ_BuddyList_RightContainer_" + b.uin),
						e = a.id("EQQ_RecentList_AvatarContainer_" + b.uin),
						g = a.id("EQQ_RecentList_RightContainer_" + b.uin),
						h = EQQ.hash.clientTypeText[b.clientType] || "PC",
						h = h === "PC" ? "" : h;
					if (c) c.title = EQQ.hash.onlineStatusText[b.state];
					if (d) d.title = b.allName + " - " + h + EQQ.hash.onlineStatusText[b.state];
					if (e) e.title = EQQ.hash.onlineStatusText[b.state];
					if (g) g.title = b.allName + " - " + h + EQQ.hash.onlineStatusText[b.state];
					f.childNodes.length == 0 && a.setStyle(f, "display", "none")
				}
				ga()
			};
			this.moveOnlineBuddy = function(b) {
				var c = a.id("EQQ_OnlineBuddy_" + b.uin);
				if ((b = a.id("EQQ_Class_" + EQQ.hash.userClassType.online + "_" + b.state)) && c) {
					a.setStyle(b, "display", "block");
					var d = c.parentNode;
					b.insertBefore(c, b.firstChild);
					d.childNodes.length == 0 && a.setStyle(d, "display", "none")
				}
				ga()
			};
			this.updateClientType = function(b) {
				var c = EQQ.hash.clientType[b.clientType],
					d = EQQ.hash.clientTypeText[b.clientType] || "PC",
					f = a.id("EQQ_BuddyList_ClientType_" + b.uin) || {},
					e = a.id("EQQ_BuddyList_ClientType_Title_" + b.uin) || {};
				f.className = "EQQ_BuddyList_ClientType_" + c;
				e.title = d;
				f = a.id("EQQ_OnlineBuddyList_ClientType_" + b.uin) || {};
				e = a.id("EQQ_OnlineBuddyList_ClientType_Title_" + b.uin) || {};
				f.className = "EQQ_BuddyList_ClientType_" + c;
				e.title = d
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
						f = a.id("EQQ_RecentList_ClientType_" + b.uin) || {},
						b = a.id("EQQ_RecentList_ClientType_Title_" + b.uin) || {};
					f.className = "EQQ_BuddyList_ClientType_" + c;
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
					f = a.id("EQQ_BuddyList_RightContainer_" + c),
					e = a.id("EQQ_OnlineBuddy_" + c),
					c = a.id("EQQ_RecentList_Nick_" + c);
				if (d && f) d.innerHTML = b.htmlShowName, f.title = b.allName;
				if (e && (d = a.mini(".EQQ_BuddyList_Nick", e)[0])) d.innerHTML = b.htmlShowName;
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
					f = a.node("div", {
						id: "EQQ_Group_" + b.gid,
						code: b.code,
						gid: b.gid,
						fileId: b.code,
						uid: "group_gid_" + b.code,
						from: "buddy",
						type: "gid"
					});
				f.innerHTML = d;
				this.EQQ_groupListInner.appendChild(f);
				c.platform.iPad || g.contactDragController.addDragClass(f);
				h.on(f, "mouseover", W);
				h.on(f, "mouseout", X);
				h.on(f, "click", function(a) {
					ya.apply(this, [a]);
					pgvSendClick({
						hottag: "web2qq.qqpanel.qun.sendmsg"
					});
					alloy.util.report2im("qqpanel|groups|sendmsg")
				});
				h.on(f, "contextmenu", Y);
				a.addClass(f, "EQQ_GroupList_Group");
				e === "group" && ba() ? EQQ.Model.BuddyList.getGroupAnnouncement(b.code) : (d = a.id("EQQ_GroupList_Bulletin_" + b.gid), j.push({
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
				h.on(a, "mouseover", W);
				h.on(a, "mouseout", X);
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
						f = a.node("div", {
							id: "EQQ_Recent_" + b.uin,
							uin: b.uin,
							uin: b.uin,
							fileId: b.uin,
							uid: "recent_uin_" + b.uin,
							from: "buddy",
							type: "uin"
						});
					f.innerHTML = d;
					this.EQQ_recentList.insertBefore(f, this.EQQ_recentList.firstChild);
					h.on(f, "mouseover", W);
					h.on(f, "mouseout", X);
					h.on(f, "click", function(a) {
						ma.apply(this, [a]);
						pgvSendClick({
							hottag: "web2qq.qqpanel.recent.sendC2Cmsg"
						});
						alloy.util.report2im("qqpanel|recent|sendC2Cmsg")
					});
					h.on(f, "contextmenu", O);
					c.platform.iPad || g.contactDragController.addDragClass(f);
					d = a.id("EQQ_RecentList_AvatarContainer_" + b.uin);
					h.on(d, "mouseover", ja);
					h.on(d, "mouseout", ka);
					a.addClass(f, "EQQ_BuddyList_Buddy");
					a.addClass(f, "EQQ_" + EQQ.hash.onlineStatus[b.state] + "Buddy");
					d = a.id("EQQ_RecentList_Avatar_" + b.uin);
					if (b.uin && d) d.src = EQQ.getUserAvatar(b.uin);
					e === "recent" && da() ? EQQ.Model.BuddyList.getUserSignature(b.uin) : (d = a.id("EQQ_RecentList_Sign_" + b.uin), z.push({
						uin: b.uin,
						el: d
					}))
				} else if (b.type == 1) {
					b = b.content;
					if (d = a.id("EQQ_Recent_" + b.gid)) return !1;
					d = '\t\t\t\t\t<div class="EQQ_GroupList_AvatarContainer" title="">\t\t\t\t\t\t<img id="EQQ_GroupList_Avatar_' + b.gid + '" class="EQQ_GroupList_Avatar" src="' + EQQ.getGroupAvatar(b.code) + '" />\t\t\t\t\t\t<div class="EQQ_GroupList_State" id="EQQ_RecentList_State_' + b.gid + '" title="\u7fa4\u5c4f\u853d"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="EQQ_GroupList_RightContainer" title="<%=titleAllName%> - <%=titleTypeText%>">\t\t\t\t\t\t<div id="EQQ_GroupRecentList_Name_' + b.gid + '" class="EQQ_GroupList_Name"><%=htmlShowName%></div>                        <div id="EQQ_GroupRecentList_Bulletin_' + b.gid + '" title="" class="EQQ_GroupList_Bulletin"></div>\t\t\t\t\t</div>\t\t\t\t';
					d = c.string.template(d, b);
					f = a.node("div", {
						id: "EQQ_Recent_" + b.gid,
						code: b.code,
						gid: b.gid,
						fileId: b.code,
						uid: "recent_gid_" + b.code,
						from: "buddy",
						type: "gid"
					});
					f.innerHTML = d;
					this.EQQ_recentList.insertBefore(f, this.EQQ_recentList.firstChild);
					c.platform.iPad || g.contactDragController.addDragClass(f);
					h.on(f, "mouseover", W);
					h.on(f, "mouseout", X);
					h.on(f, "click", function(a) {
						ya.apply(this, [a]);
						pgvSendClick({
							hottag: "web2qq.qqpanel.recent.sendqunmsg"
						});
						alloy.util.report2im("qqpanel|recent|sendgroupsmsg")
					});
					h.on(f, "contextmenu", V);
					a.addClass(f, "EQQ_GroupList_Group");
					e === "recent" && da() ? EQQ.Model.BuddyList.getGroupAnnouncement(b.code) : (d = a.id("EQQ_GroupRecentList_Bulletin_" + b.gid), K.push({
						gcode: b.code,
						el: d
					}))
				} else if (b.type == 2) {
					b = b.content;
					if (d = a.id("EQQ_Recent_" + b.did)) return !1;
					b = this.getNewNode(b, !0);
					this.EQQ_recentList.insertBefore(b, this.EQQ_recentList.firstChild);
					h.on(b, "mouseover", W);
					h.on(b, "mouseout", X);
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
					ia = va;
					a.removeClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect");
					this.EQQ_MyState.title = "\u66f4\u6539\u5728\u7ebf\u72b6\u6001";
					break;
				case "slave":
					ia = Ha, a.addClass(this.EQQ_MyState, "EQQ_DisableMyStateSelect"), this.EQQ_MyState.title = "Q+ Web\u73b0\u5728\u5904\u4e8e\u8f85\u6a21\u5f0f\uff0c\u8bf7\u4ece\u5ba2\u6237\u7aefQQ\u4fee\u6539\u60a8\u7684\u5728\u7ebf\u72b6\u6001\u3002"
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
						f = alloy.layout.getClientWidth(),
						e = alloy.layout.getClientHeight(),
						g = b[0],
						b = b[1];
					g < 2 && (g = 2);
					b < 2 && (b = 2);
					g > f - c - 2 && (g = f - c - 2);
					b > e - d - 2 && (b = e - d - 2);
					this.statePanel.setXY(g, b)
				}
				this.statePanel.setZIndex(alloy.layout.getTopZIndex(3));
				this.statePanel.show();
				wa(alloy.sound.isMute())
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
				var f = a.id("EQQ_Group_" + b);
				if (f && (h.off(f), f.parentNode)) d = f.parentNode, d.removeChild(f);
				c.out(f);
				if (b = a.id("EQQ_Recent_" + b)) if (h.off(b), b.parentNode) d = b.parentNode, d.removeChild(b);
				c.out(b)
			}
		};
	WebqCore.register("EQQ.View.MainPanel", c);
	var n;
	n = Jx().extend(function(b) {
		c.call(this, b);
		var g = this,
			a = b.dom,
			h = b.event;
		this.moveBuddyClass = function(a, b) {
			h.notifyObservers(g, "MoveBuddyClass", {
				uin: a,
				classId: b
			})
		};
		this.flexRemoveBuddyConfirm = function(a) {
			h.notifyObservers(g, "RemoveBuddyConfirm", a)
		};
		this.getHtml = function() {
			return d.myPanel + '<div id="EQQ_MainPanel" class="EQQ_mainPanel">' + d.mainPanelHeader + b.string.template(d.mainPanelBody, {
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
		this.onAvatarMouseover = function(b, c) {
			if (b && c) {
				if (EQQ.avatarMouseoverTimer) clearTimeout(EQQ.avatarMouseoverTimer), EQQ.avatarMouseoverTimer = null;
				var d = a.getClientXY(g.EQQ_buddyList);
				d[0] -= 218;
				d[1] += c.y;
				g.showMiniCardPanel(b, d);
				h.notifyObservers(g, "AvatarMouseover", b)
			}
		};
		this.onFlexException = function() {
			b.out("Flex-Exception");
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
		var n = function() {
				g.hideMiniCardPanel()
			};
		this.onAvatarMouseout = function() {
			EQQ.avatarMouseoverTimer = window.setTimeout(n, 500)
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
						m = a.node("div");
					a.setClass(m, "EQQ_SearchResultItem");
					m.id = "EQQ_SearchResultItem_" + g.uin;
					m.setAttribute("uin", g.uin);
					m.innerHTML = g.htmlAllName;
					m.title = g.allName;
					this.EQQ_SearchResultPanel.appendChild(m);
					d == 0 && a.addClass(m, "EQQ_SearchResultItemHover");
					h.on(m, "mouseover", this.onSearchResultMouseover);
					h.on(m, "mouseout", this.onSearchResultMouseout);
					h.on(m, "mousedown", this.onSearchResultClick)
				}
				h.on(document, "mousedown", b.bind(this.hideSearchResult, this))
			}
		};
		this.hideSearchResult = function() {
			a.hide(this.EQQ_SearchResultPanel_iframeWrap);
			h.off(document, "mousedown")
		};
		this.createBuddyClass = function() {};
		this.addBuddyClass = function(c, d) {
			var g, m;
			g = a.node("div", {
				id: "EQQ_listClassHead_" + c.index,
				classIndex: c.index
			});
			m = c.index == EQQ.hash.userClassType.online ? '                    <div class="EQQ_listClassHeadIcon">icon</div>                    <div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">                        <%=htmlName%>[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>]                    </div>                ' : '                    <div class="EQQ_listClassHeadIcon">icon</div>                    <div class="EQQ_ClassList_RightContainer" title="<%=titleName%>">                        <%=htmlName%>&nbsp;[<span id="EQQ_Class_<%=index%>_OnlineCounter"><%=onlineCount%></span>/<span id="EQQ_Class_<%=index%>_Counter"><%=count%></span>]                    </div>                ';
			m = b.string.template(m, c);
			g.innerHTML = m;
			d ? this.EQQ_buddyList.insertBefore(g, d) : this.EQQ_buddyList.appendChild(g);
			h.on(g, "click", onClassHeadElClick);
			var n = a.node("div", {
				id: "EQQ_listClassBody_" + c.index,
				"class": "EQQ_listClassBody"
			});
			m = b.string.template('                <div id="EQQ_Class_<%=index%>_callme" class="EQQ_callmeBuddy"></div>                <div id="EQQ_Class_<%=index%>_online" class="EQQ_onlineBuddy"></div>                <div id="EQQ_Class_<%=index%>_busy" class="EQQ_busyBuddy"></div>                <div id="EQQ_Class_<%=index%>_away" class="EQQ_awayBuddy"></div>                <div id="EQQ_Class_<%=index%>_silent" class="EQQ_silentBuddy"></div>                <div id="EQQ_Class_<%=index%>_offline" class="EQQ_offlineBuddy"></div>            ', c);
			n.innerHTML = m;
			this.EQQ_buddyList.insertBefore(n, g.nextSibling);
			this.collapsedClass(c.index)
		};
		this.showPullData = function() {};
		this.clearBuddyList = function() {
			g.ifFlexReady && this.flex.clearBuddyList()
		};
		this.createBuddyList = function() {};
		this.collapsedClass = function(b) {
			var c = a.id("EQQ_listClassHead_" + b),
				d = a.id("EQQ_listClassBody_" + b);
			b == EQQ.hash.userClassType.online ? a.setClass(c, "EQQ_onlineClassHeadCollapsed") : a.setClass(c, "EQQ_listClassHeadCollapsed");
			a.setStyle(d, "height", "0");
			this.setClassExpandFlag(b, !1)
		};
		this.expandClass = function(c) {
			var d = a.id("EQQ_listClassHead_" + c),
				h = a.id("EQQ_listClassBody_" + c);
			c == EQQ.hash.userClassType.online ? a.setClass(d, "EQQ_onlineClassHeadExpand") : a.setClass(d, "EQQ_listClassHeadExpand");
			a.setStyle(h, "height", "auto");
			this.setClassExpandFlag(c, !0);
			b.out("index: " + c);
			g.loadBuddyListAvatar()
		};
		this.onBuddyStateChange = function(a) {
			if (g.ifFlexReady) this.flex.onBuddyStateChange(a)
		};
		this.moveBuddyClassCallBack = function(a, b, c) {
			g.ifFlexReady && this.flex.moveBuddyClass({
				uin: a.uin,
				markname: a.markName,
				clientType: a.clientType,
				state: a.state,
				nick: a.nick
			}, b, c)
		};
		this.removeBuddyCallBack = function(a, b) {
			g.ifFlexReady && this.flex.removeBuddy({
				uin: a.uin,
				markname: a.markName,
				clientType: a.clientType,
				state: a.state,
				nick: a.nick,
				classId: b
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
				var b = this.getAttribute("did");
				g.onDiscuContextMenu(a, b)
			})))
		};
		this.setUseBigHead = function(a) {
			this.setBigHead("single", a)
		};
		this.setFlexBigHead = function(a) {
			a ? this.flex.viewBigHead() : this.flex.viewSmallHead()
		}
	}, c);
	WebqCore.register("EQQ.View.MainPanelFlex", n)
})();
(function() {
	WebqCore.register("EQQ.Presenter.MainPanel", function(d) {
		var b = this,
			c = d.event,
			n = !1,
			l = [],
			g = [],
			a = [],
			h = [],
			w = [],
			f = !0,
			q = !1,
			t = !1,
			m = !1,
			x = !1;
		this.init = function() {
			n = !1;
			l = [];
			g = [];
			a = [];
			h = [];
			w = [];
			f = !0;
			x = m = t = q = !1;
			this.View = EQQ.View.MainPanel;
			if (d.browser.ie && d.browser.ie == 7) {
				var b = d.GetSwfVer();
				b != -1 ? (b = b.split(" ")[1].split(","), parseInt(b[0]) >= 10 ? (m = !0, this.View = EQQ.View.MainPanelFlex, c.addObserver(EQQ.Model.ChatMsg, "flexStartJump", d.bind(this.onFlexStartJump, this)), c.addObserver(EQQ.Model.ChatMsg, "flexStopJump", d.bind(this.onFlexStopJump, this))) : o()) : o()
			}
			this.View.createDom(this.getContainer());
			c.addObserver(EQQ, "CloseWebQQ", d.bind(this.onCloseWebQQ, this));
			c.addObserver(EQQ, "SelfOffline", d.bind(this.onSelfOffline, this));
			c.addObserver(EQQ, "LoginSuccess", I);
			c.addObserver(EQQ, "LoginFailure", d.bind(A, this));
			c.addObserver(EQQ, "PtwebqqFail", d.bind(y, this));
			c.addObserver(EQQ.RPCService, "ChangeStatusSuccess", d.bind(C, this));
			c.addObserver(alloy.portal, "UserAvatarChanged", d.bind(this.onUserAvatarChanged, this));
			c.addObserver(alloy.portal, "selfInfoReady", d.bind(this.onSelfInfoReady, this));
			c.addObserver(alloy.rpcService, "SetBuddySignatureSuccess", d.bind(this.onSetBuddySignatureSuccess, this));
			c.addObserver(alloy.rpcService, "ManageError", d.bind(this.onManageError, this));
			c.addObserver(EQQ.Model.BuddyList, "ManageError", d.bind(this.onManageError, this));
			c.addObserver(alloy.rpcService, "SetBuddySignatureError", d.bind(this.onSetBuddySignatureError, this));
			c.addObserver(EQQ.Model.BuddyList, "SelfInfoChange", d.bind(this.onSelfInfoChange, this));
			c.addObserver(EQQ.Model.BuddyList, "SelfStateChange", d.bind(this.updateSelfStateChange, this));
			c.addObserver(EQQ.Model.BuddyList, "SelfSignatureChange", d.bind(this.handleSelfSignatureChange, this));
			c.addObserver(EQQ.Model.BuddyList, "UserSignatureChange", u);
			c.addObserver(EQQ.Model.BuddyList, "UserQQLevelChange", j);
			c.addObserver(EQQ.Model.BuddyList, "GroupAnnouncementChange", z);
			c.addObserver(EQQ.Model.BuddyList, "LoginFail", d.bind(this.onLoginFail, this));
			c.addObserver(EQQ.Model.BuddyList, "GetUserInfoSuccess", d.bind(this.onGetUserInfoSuccess, this));
			c.addObserver(EQQ.Model.BuddyList, "BuddyClassChange", d.bind(this.onBuddyClassChange, this));
			c.addObserver(EQQ.Model.BuddyList, "BuddyClassMove", d.bind(this.onBuddyClassMove, this));
			c.addObserver(EQQ.Model.BuddyList, "AllClassOnlineBuddyReady", d.bind(this.onAllClassOnlineBuddyReady, this));
			c.addObserver(this.View, "SendGetRecentList", E);
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
			c.addObserver(this.View, "StartChat", r);
			c.addObserver(this.View, "AskVideo", N);
			c.addObserver(this.View, "StartGroupChat", e);
			c.addObserver(this.View, "StartDiscuChat", J);
			c.addObserver(this.View, "SelfStateChange", d.bind(this.onViewSelfStateChange, this));
			c.addObserver(this.View, "SetGroupMaskState", F);
			c.addObserver(this.View, "AddPObservers", d.bind(this.onAddPObservers, this));
			c.addObserver(this.View, "ExitPortal", d.bind(this.onExitPortal, this));
			c.addObserver(this.View, "CloseWebQQ", d.bind(k, this));
			c.addObserver(this.View, "MinMainPanel", d.bind(B, this));
			c.addObserver(this.View, "ReLogin", d.bind(H, this));
			c.addObserver(this.View, "MoveBuddyClass", d.bind(this.moveBuddyClass, this));
			c.addObserver(this.View, "RemoveBuddy", d.bind(this.removeBuddy, this));
			c.addObserver(this.View, "SetUserMarkName", d.bind(this.setUserMarkName, this));
			c.addObserver(this.View, "RemoveBuddyConfirm", d.bind(this.removeBuddyConfirm, this));
			c.addObserver(this.View, "GetSingleMenuClassItems", d.bind(this.getSingleMenuClassItems, this));
			c.addObserver(this.View, "Search", d.bind(this.onSearch, this));
			c.addObserver(this.View, "BuddyListReady", d.bind(this.onBuddyListDomReady, this));
			c.addObserver(this.View, "CloseYellowTipsFinish", d.bind(this.onCloseYellowTipsFinish, this));
			c.addObserver(this.View, "MiniCardShow", K);
			c.addObserver(EQQ.Model.BuddyList, "DiscuListChange", d.bind(this.onDiscuListChange, this));
			c.addObserver(EQQ.Model.BuddyList, "AddNewDiscuToList", d.bind(this.onAddNewDiscuToList, this));
			c.addObserver(EQQ.Model.BuddyList, "ToStartDiscuChat", J);
			c.addObserver(EQQ.Model.BuddyList, "ModifyDiscuTopicSuccess", M);
			c.addObserver(EQQ, "QuitDiscu", S);
			c.addObserver(EQQ.Model.BuddyList, "QuitDiscuSuccess", R);
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxDiscuListChange", d.bind(this.onMessageBoxDiscuListChange, this));
			c.addObserver(EQQ.Model.BuddyList, "SingleDiscuMaskChange", Q);
			c.addObserver(EQQ.Model.ChatMsg, "ServerDiscuInfochange", P);
			c.addObserver(EQQ.Model.BuddyList, "DiscuInfoChange", M);
			c.addObserver(EQQ.Model.ChatMsg, "DiscuMessageListChange", d.bind(this.onDiscuMessageListChange, this));
			c.addObserver(EQQ, "GetDiscuListFail", i);
			this.View.init();
			this.View.setNoneFlashStyle && this.View.setNoneFlashStyle()
		};
		var o = function() {
				alloy.windowFactory.createWindow("Window", {
					title: "\u6e29\u99a8\u63d0\u793a",
					modeSwitch: !0,
					dragable: !0,
					resize: !0,
					width: 400,
					height: 50,
					hasCloseButton: !0,
					hasOkButton: !0,
					isSetCentered: !0
				}).setHtml('<div style="width:100%; height:100%; background-color:#FFFFFF; line-height:60px;text-align:center; vertical-align:middle;">\t\t\t\t\t\t\u68c0\u6d4b\u5230\u60a8\u4e3aIE7\u5185\u6838\u7528\u6237\uff0c\u8bf7\u5b89\u88c5\u6700\u65b0<a target="_blank" href="http://get.adobe.com/flashplayer">Flash\u7248\u672c</a>\uff0c\u83b7\u5f97\u66f4\u597d\u4f53\u9a8c\uff01\t\t\t\t\t   </div>')
			};
		this.onAddPObservers = function() {
			f = !1;
			c.addObserver(EQQ.Model.BuddyList, "BuddyListChange", d.bind(this.onBuddyListChange, this));
			c.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", d.bind(this.onBuddyStateChange, this));
			c.addObserver(EQQ.Model.BuddyList, "OnlineBuddyChange", d.bind(this.onOnlineBuddyChange, this))
		};
		this.onBuddyListDomReady = function() {
			if (!q) {
				if (f) this.onAddPObservers();
				c.addObserver(EQQ.Model.BuddyList, "UserNameChange", d.bind(this.onUserNameChange, this));
				q = !0
			}
			t = !0
		};
		this.getContainer = function() {
			return EQQ.panel.mainPanel
		};
		var u = function(a) {
				b.View.miniCardPanel && (d.out("onUserSignatureChange 33:" + a.uin), b.View.miniCardPanel.setSignature(a));
				b.View.updateBuddySignature(a)
			},
			j = function(a) {
				b.View.miniCardPanel && (d.out("onUserQQLevelChange 33:" + a.uin), b.View.miniCardPanel.setQQLevel(a))
			},
			z = function(a) {
				b.View.updateGroupAnnouncement(a)
			},
			K = function(a) {
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
		this.showMiniCardPanel = function(a, b) {
			this.View.showMiniCardPanel(a, b)
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
			typeof b.View != "undefined" && b.View.updateGroupMarkName(a)
		};
		this.updateSelfStateChange = function(a) {
			this.View.updateSelfStateChange(a)
		};
		this.handleSelfSignatureChange = function(a) {
			this.View.updateSelfSignatureChange(a)
		};
		this.onSelfOffline = function(a) {
			var b = EQQ.Model.BuddyList.getSelf();
			t = x = !1;
			EQQ.stopPoll();
			if (b) b.oldState = b.state, b.state = "offline";
			this.updateSelfStateChange("offline");
			a.action == "relogin" ? v(a.message) : EQQ.showEQQtips({
				title: "\u8fde\u63a5\u4e2d\u65ad",
				content: a.message,
				callback: function() {
					EQQ.reLogin()
				}
			})
		};
		var I = function() {},
			A = function() {
				this.updateSelfStateChange("offline")
			},
			y = function() {
				this.updateSelfStateChange("offline")
			},
			v = function(a) {
				EQQ.hideEQQtips();
				alloy.layout.showLoginWindow("eqq", !0, null, a)
			},
			C = function(a) {
				EQQ.Model.BuddyList.setSelfState(a)
			};
		this.onBuddyClassChange = function(a) {
			this.clearBuddyList();
			this.View.createBuddyClass(a);
			this.View.hideLogin()
		};
		this.onAllClassOnlineBuddyReady = function() {
			x || (x = !0, this.onBuddyClassListReady())
		};
		this.onBuddyClassListReady = function() {
			EQQ.loginEnd = (new Date).getTime();
			var a = EQQ.loginEnd - EQQ.loginStart;
			a /= 1E3;
			d.out("time: " + a)
		};
		this.onBuddyListChange = function(a) {
			!t && !m && (this.updateAllBuddyClassCount(EQQ.Model.BuddyList.getClassList()), this.createBuddyList(a))
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
			a && (m ? this.View.moveBuddyClassCallBack(a.user, a.oldClass.index, a.newClass.index) : (this.View.updateBuddyClassCount(a.oldClass), this.View.updateBuddyClassOnlineBuddy(a.oldClass), this.View.updateBuddyClassCount(a.newClass), this.View.updateBuddyClassOnlineBuddy(a.newClass), this.View.removeBuddy(a.user.uin), this.View.addBuddy(a.user)))
		};
		this.removeBuddy = function(a) {
			EQQ.Model.BuddyList.sendRemoveBuddy(a.uin, a.check)
		};
		this.removeBuddyConfirm = function(a) {
			this.View.removeBuddyConfirm(EQQ.Model.BuddyList.getUserByUin(a))
		};
		this.onRemoveBuddy = function(a) {
			if (m) this.View.removeBuddyCallBack(a.user, a.classObj.index);
			else {
				var b = a.classObj,
					c = a.user;
				this.View.removeBuddy(c.uin);
				c.classId == EQQ.hash.userClassType.stranger ? (b = EQQ.Model.BuddyList.getStrangerList(), this.View.updateStrangerClassOnlineCount(b.length), this.View.updateStrangerClassCount(b)) : (this.View.updateBuddyClassCount(b), c.getState() != EQQ.hash.onlineStatus.offline && (this.View.removeOnlineBuddy(c), this.View.updateOnlineBuddyClass(EQQ.Model.BuddyList.getOnlineBuddy()), this.View.updateBuddyClassOnlineBuddy(b)))
			}
			this.View.removeRecentBuddy(a.user)
		};
		this.setUserMarkName = function(a) {
			EQQ.Model.BuddyList.setUserMarkName(a.uin, a.markname)
		};
		this.onAddANewBuddy = function(a) {
			var b = a.user;
			this.View.addBuddy(b);
			var c = EQQ.Model.BuddyList.getClassById(b.classId);
			this.View.updateBuddyClassCount(c);
			var d = EQQ.Model.BuddyList.getBuddyByUin(b.uin);
			a.markname && d.setMarkName(a.markname);
			b.getState() != EQQ.hash.onlineStatus.offline && (this.View.addOnlineBuddy(d), this.View.updateOnlineBuddyClass(EQQ.Model.BuddyList.getOnlineBuddy()), this.View.updateBuddyClassOnlineBuddy(c))
		};
		this.onBuddyStateChange = function(a) {
			m ? t && (a = EQQ.Model.BuddyList.getUserByUin(a), this.View.onBuddyStateChange({
				uin: a.uin,
				client_type: a.clientType,
				state: a.state,
				nick: a.nick
			})) : (a = EQQ.Model.BuddyList.getUserByUin(a), this.View.moveBuddy(a), this.View.moveOnlineBuddy(a), this.View.updateClientType(a), this.View.updateRecentState(a), this.View.miniCardPanel && this.View.miniCardPanel.setClientType(a))
		};
		this.onOnlineBuddyChange = function(a) {
			if (m) {
				if (t) {
					var b = EQQ.Model.BuddyList.getUserByUin(a);
					this.View.onOnlineBuddyChange({
						uin: b.uin,
						client_type: b.clientType,
						state: b.state,
						nick: b.showName
					})
				}
			} else {
				var b = EQQ.Model.BuddyList.getUserByUin(a),
					a = EQQ.Model.BuddyList.getClassByUin(a),
					c = EQQ.hash.onlineStatus.offline,
					d = EQQ.Model.BuddyList.getOnlineBuddy();
				this.View.updateBuddyClassOnlineBuddy(a);
				this.View.updateOnlineBuddyClass(d);
				b.state == c ? this.View.removeOnlineBuddy(b) : this.View.addOnlineBuddy(b)
			}
		};
		this.onRecentListChange = function(a) {
			for (var b = [], c = a.length - 1; c >= 0; c--) {
				if (a[c].type == 0) a[c].content = EQQ.Model.BuddyList.getBuddyByUin(a[c].uin);
				else if (a[c].type == 1) a[c].content = EQQ.Model.BuddyList.getGroupByGid(a[c].uin);
				else if (a[c].type == 2) a[c].content = EQQ.Model.BuddyList.getDiscuById(a[c].uin);
				b.push(a[c])
			}
			this.View.createRecentList(b)
		};
		this.onUserNameChange = function(a) {
			this.View.setUserName(a)
		};
		this.onGroupMaskChange = function(a) {
			for (var b = EQQ.Model.BuddyList.getGroupList(), c = 0; c < b.length; c++) {
				var d = b[c],
					e = EQQ.Model.BuddyList.isGroupPrompt(d.gid);
				this.View.setGroupListMaskState(d.gid, e)
			}
			this.View.setGroupMask(a)
		};
		this.onSingleGroupMaskChange = function(a) {
			var b = EQQ.Model.BuddyList.isGroupPrompt(a.gid);
			this.View.setGroupListMaskState(a.gid, b)
		};
		this.onGetUserInfoSuccess = function() {};
		this.onNewStranger = function(a) {
			var b = EQQ.Model.BuddyList.getStrangerList();
			this.View.updateStrangerClassOnlineCount(b.length);
			this.View.updateStrangerClassCount(b);
			this.View.addBuddy(a)
		};
		this.updateAllBuddyClassCount = function(a) {
			for (var b = 0; b < a.length; b++) this.updateBuddyClassCount(a[b])
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
		var s = function() {
				var a = alloy.windowManager.getCurrentWindow();
				return d.isUndefined(a) || !a ? 0 : !d.isUndefined(a.option) && a.option && !d.isUndefined(a.option.userOrGroup) ? a.option.userOrGroup.uin || a.option.userOrGroup.gid || a.option.userOrGroup.did || 0 : 0
			};
		this.onMessageBoxUserListChange = function(b) {
			EQQ.Model.BuddyList.getSelf();
			var d = s();
			this.View.jumpDown(l);
			this.View.flickerClassShow(a);
			l = [];
			g = [];
			a = [];
			for (var e = 0; e < b.length; e++) d != b[e].from_uin && (l.push(b[e].from_uin), EQQ.Model.BuddyList.getSelfState() == "callme" && r(b[e].from_uin));
			l.length !== 0 && (EQQ.addNeedBeat2("mainPanel"), c.addObserver(EQQ, "NotifyBeat_250", G))
		};
		this.onMessageBoxGroupListChange = function(a) {
			EQQ.Model.BuddyList.getSelf();
			var b = s();
			this.View.jumpDown(h);
			h = [];
			for (var d = 0; d < a.length; d++) b != a[d].from_uin && EQQ.Model.BuddyList.isGroupPrompt(a[d].from_uin) && h.push(a[d].from_uin), EQQ.Model.BuddyList.getSelfState() == "callme" && EQQ.Model.BuddyList.isGroupPrompt(a[d].from_uin) && e(a[d].group_code);
			h.length !== 0 && (EQQ.addNeedBeat2("mainPanel"), c.addObserver(EQQ, "NotifyBeat_250", G))
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
		var E = function() {
				EQQ.Model.BuddyList.sendGetRecentList()()
			},
			F = function(a) {
				EQQ.Model.BuddyList.sendChangeGroupMask({
					type: "global",
					uin: EQQ.Model.BuddyList.getSelfUin(),
					mask: a
				})
			},
			r = function(a) {
				EQQ.handleNotification(a, "single") || WebqCore.api.call(["chat", ["single", a]])
			},
			N = function(a) {
				a = a.uin;
				if (!EQQ.Model.ChatMsg.uinToVideo) EQQ.Model.ChatMsg.uinToVideo = [];
				EQQ.Model.ChatMsg.uinToVideo[a] = {};
				c.notifyObservers(b, "AskVideo", {
					uin: a
				})
			},
			e = function(a) {
				var b = EQQ.Model.BuddyList.getGroupByCode(a).gid;
				EQQ.handleNotification(b, "group") || WebqCore.api.call(["chat", ["group", a]])
			};
		this.collapsedAllClass = function() {
			for (var a = EQQ.Model.BuddyList.getClassList(), b = 0; b < a.length; b++) this.View.collapsedClass(a[b].index)
		};
		var k = function() {
				EQQ.exit()
			},
			B = function() {
				this.hide()
			},
			H = function() {
				EQQ.reLogin()
			};
		this.onExitPortal = function() {
			alloy.portal.exit()
		};
		this.onCloseWebQQ = function() {
			t = x = !1;
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
			n = !0;
			this.View.show()
		};
		this.hide = function() {
			n = !1;
			this.View.hide()
		};
		this.toggleShow = function() {
			n ? this.hide() : this.show()
		};
		this.showReLoginPanel = function(a) {
			this.View.showReLoginPanel(a)
		};
		var G = function() {
				b.View.flickerClassShow(a, !0);
				g = [];
				a = [];
				var e = l.concat(h, w);
				e.length === 0 && (c.removeObserver(EQQ, "NotifyBeat_250", G), EQQ.removeNeedBeat2("mainPanel"));
				for (var f = 0; f < l.length; f++) {
					var i = l[f],
						j = EQQ.Model.BuddyList.getClassIdByUin(i);
					b.View.getClassExpandFlag(j) ? g.push(i) : d.array.indexOf(a, j) == -1 && a.push(j)
				}
				l.length > 0 && b.View.jumpAvatar(l);
				a.length > 0 && b.View.flickerClass(a);
				h.length > 0 && b.View.groupJumpAvatar(h);
				e.length > 0 && b.View.recentJumpAvatar(e);
				w.length > 0 && b.View.discuJumpAvatar(w)
			};
		this.onViewSelfStateChange = function(a) {
			var b = "offline",
				c = EQQ.Model.BuddyList.getSelf();
			if (c) b = c.state;
			d.out("==onViewSelfStateChange, self: " + a + ", old: " + b);
			b == "offline" && a != "offline" ? EQQ.login(a) : EQQ.Model.BuddyList.sendChangeStatus(a);
			a == "offline" && (t = x = !1, EQQ.stopPoll())
		};
		this.removeGroup = function(a) {
			b.View.removeGroup(a);
			EQQ.Model.BuddyList.removeGroup(a)
		};
		this.removeDiscu = function(a) {
			b.View.removeDiscu(a)
		};
		var J = function(a) {
				EQQ.handleNotification(a, "discu") || WebqCore.api.call(["chat", ["discu", a]])
			};
		this.onDiscuListChange = function(a) {
			this.View.createDiscuList(a)
		};
		this.onAddNewDiscuToList = function(a) {
			this.View.addDiscu(a)
		};
		var M = function(a) {
				b.View.updateDiscuName(a)
			},
			S = function(a) {
				EQQ.Model.BuddyList.sendQuitDisc(a)
			},
			R = function(a) {
				b.removeDiscu(a.did)
			};
		this.onMessageBoxDiscuListChange = function(a) {
			EQQ.Model.BuddyList.getSelf();
			var b = s();
			this.View.discuJumpDown(w);
			w = [];
			for (var d = 0; d < a.length; d++) {
				var e = a[d];
				b != e.did && EQQ.Model.BuddyList.isDiscuPrompt(e.did) && w.push(e.did);
				EQQ.Model.BuddyList.getSelfState() == "callme" && EQQ.Model.BuddyList.isDiscuPrompt(e.did) && J(e.did)
			}
			w.length !== 0 && (EQQ.addNeedBeat2("mainPanel"), c.addObserver(EQQ, "NotifyBeat_250", G))
		};
		var Q = function(a) {
				b.View.setDiscuListMaskState(a.did, a.mask)
			},
			P = function(a) {
				EQQ.Model.BuddyList.refreshDiscuInfo(a.did)
			},
			i = function() {
				b.View.showReloadDiscuList()
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
			for (var b = EQQ.Model.BuddyList.getBuddyByUin(a.u), c = EQQ.Model.BuddyList.getClassList(), d = [], e = 0; e < c.length; e++) b.classId != c[e].index && d.push({
				text: c[e].htmlName,
				classId: c[e].index
			});
			a.f(d)
		}
	})
})();
(function() {
	WebqCore.register("EQQ.TaskBar", function(d) {
		var b = this,
			c = d.event;
		this.init = function() {
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxUserListChange", d.bind(this.onMessageBoxUserListChange, this));
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxGroupListChange", d.bind(this.onMessageBoxGroupListChange, this));
			c.addObserver(EQQ.Model.ChatMsg, "MessageBoxDiscuListChange", d.bind(this.onMessageBoxDiscuListChange, this));
			c.addObserver(alloy.taskBar, "TaskBarNotifyBeatStart", l);
			c.addObserver(alloy.taskBar, "TaskBarNotifyBeatStop", g);
			c.addObserver(EQQ.Model.BuddyList, "BuddyStateChange", a)
		};
		this.onGetUserInfoSuccess = function(a) {
			b.getTask(a.uin) && EQQ.Model.BuddyList.isStranger(a.uin) && b.View.updateBuddyName(a)
		};
		this.onBuddyMarkNameChange = function() {};
		this.onMessageBoxUserListChange = function(a) {
			for (var b in a) c.notifyObservers(alloy.taskBar, "NotifyTaskItem", {
				appId: "5_0",
				id: a[b].from_uin
			})
		};
		this.onMessageBoxGroupListChange = function(a) {
			for (var b in a) c.notifyObservers(alloy.taskBar, "NotifyTaskItem", {
				appId: "5_0",
				id: a[b].from_uin
			})
		};
		var n = function() {
				c.notifyObservers(alloy.taskBar, "NotifyBeat_250")
			};
		this.onMessageBoxDiscuListChange = function(a) {
			for (var b in a) c.notifyObservers(alloy.taskBar, "NotifyTaskItem", {
				appId: "5_0",
				id: a[b].did
			})
		};
		var l = function() {
				EQQ.addNeedBeat2("taskBar");
				c.addObserver(EQQ, "NotifyBeat_250", n)
			},
			g = function() {
				EQQ.removeNeedBeat2("taskBar");
				c.removeObserver(EQQ, "NotifyBeat_250", n)
			},
			a = function(a) {
				var b = EQQ.Model.BuddyList.getUserByUin(a);
				b && (c.notifyObservers(alloy.taskBar, "UpdateTaskTitle", {
					appId: "5_0",
					id: a,
					title: (b.markName || b.nick) + " - " + EQQ.hash.onlineStatusText[b.state]
				}), c.notifyObservers(alloy.taskBar, "EQQBuddyStateChange", {
					id: a,
					state: b.state
				}))
			}
	})
})();