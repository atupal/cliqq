Jx().$package(alloy.app["app" + alloy.config.__eqqid] = alloy.app.eqq = new alloy.businessClass.App(alloy.portal.getAllConfig(alloy.config.__eqqid)), function(a) {
	var b = a.dom,
		c = a.event,
		e = this,
		i, k, n, h, o, m, d, v = function() {
			if (!h) {
				var l = b.node("ul", {
					id: "loginStatePanel",
					"class": "EQQ_statePanel"
				});
				alloy.layout.getDesktop().body.appendChild(l);
				h = new alloy.layout.PopupBox({
					noCatchMouseUp: !0,
					container: l,
					html: '                    <li class="EQQ_statePanel_li" id="login_SetOnline" state="online"><div class="EQQ_stateSelect_icon EQQ_online"></div><div class="EQQ_stateSelect_text">\u6211\u5728\u7ebf\u4e0a</div></li>                    <li class="EQQ_statePanel_li" id="login_SetCallme" state="callme"><div class="EQQ_stateSelect_icon EQQ_callme"></div><div class="EQQ_stateSelect_text">Q\u6211\u5427</div></li>                    <li class="EQQ_statePanel_li" id="login_SetAway" state="away"><div class="EQQ_stateSelect_icon EQQ_away"></div><div class="EQQ_stateSelect_text">\u79bb\u5f00</div></li>                    <li class="EQQ_statePanel_li" id="login_SetBusy" state="busy"><div class="EQQ_stateSelect_icon EQQ_busy"></div><div class="EQQ_stateSelect_text">\u5fd9\u788c</div></li>                    <li class="EQQ_statePanel_li" id="login_SetSilent" state="silent"><div class="EQQ_stateSelect_icon EQQ_silent"></div><div class="EQQ_stateSelect_text">\u8bf7\u52ff\u6253\u6270</div></li>                    <li class="EQQ_statePanel_li" id="login_SetHidden" state="hidden"><div class="EQQ_stateSelect_icon EQQ_hidden"></div><div class="EQQ_stateSelect_text">\u9690\u8eab</div></li>                '
				});
				var l = b.id("login_SetOnline"),
					f = b.id("login_SetCallme"),
					j = b.id("login_SetAway"),
					d = b.id("login_SetBusy"),
					e = b.id("login_SetSilent"),
					g = b.id("login_SetHidden");
				b.id("login_SetOffline");
				l = [l, f, j, d, e, g];
				a.array.forEach(l, function(b) {
					c.on(b, "mouseover", s)
				});
				a.array.forEach(l, function(b) {
					c.on(b, "mouseout", t)
				});
				a.array.forEach(l, function(b) {
					c.on(b, "click", u)
				})
			}
		},
		s = function() {
			b.setStyle(this, "backgroundColor", "#cbe7fc")
		},
		t = function() {
			b.setStyle(this, "backgroundColor", "transparent")
		},
		u = function(a) {
			a.preventDefault();
			a = this.getAttribute("state");
			alloy.portal.setTryLoginState(a);
			b.setClass(n, "EQQ_myStateShow EQQ_" + a)
		},
		p = function(a) {
			if (!d) {
				var f = '\t\t\t\t\t<div id="loginArea" class="loginArea" style="display:block;">\t\t\t\t\t\t<img id="accountAvatar" class="accountAvatar" title="" src="' + alloy.CONST.CDN_URL + 'style/images/avatar.png" />\t\t\t\t\t\t<div id="accountNick" class="accountNick" title=""></div>\t\t\t\t\t\t<div id="loginAccount" class="loginAccount" title=""></div>\t\t\t\t\t\t<div id="loginIcon" class="loginIcon" appId="eqq" title="\u767b\u5f55QQ">                            <div title="\u9009\u62e9\u5728\u7ebf\u72b6\u6001" class="EQQ_myState" id="loginState" style="display:block;" >                                <div class="EQQ_myStateShow EQQ_online" id="loginStateShow">\u72b6\u6001</div>                                <div class="EQQ_myStateDown">\u4e0b</div>                            </div>                        </div>\t\t\t\t\t\t<div id="loginIcon_disable" class="loginIconClicked" appId="eqq" style="display:none"></div>\t\t\t\t\t\t<div class="offlineTips">\u60a8\u5904\u4e8e\u79bb\u7ebf\u72b6\u6001</div>\t\t\t\t\t</div>\t\t\t\t\t\t<div id="loginLoadingArea" class="loginArea_Logining" style="display:none;">\t\t\t\t\t\t\t<div id="EQQlogin_Logining">\u8f7d\u5165\u4e2d...</div>\t\t\t\t\t\t<div id="EQQ_Logining_feedback"><a href="http://support.qq.com/write.shtml?guest=1&fid=513" target="_blank">\t\t\t\t\t\t\t<span class="warnning_yellow">&nbsp;</span>\u53cd\u9988\u767b\u5f55\u5efa\u8bae</a></div>\t\t\t\t\t</div>\t\t\t\t\t',
					j = {
						appId: e.option.id,
						title: "QQ",
						isTask: !0,
						taskType: e.option.taskType,
						modeSwitch: !0,
						doubleClickModeSwitch: !1,
						dragable: !0,
						resize: !0,
						isFixedZIndex: !1,
						width: a.width || 260,
						height: a.height || 550,
						minWidth: a.minWidth || 245,
						hasCloseButton: !0,
						hasMinButton: !0,
						hasMaxButton: !1,
						hasPinUpButton: !1,
						bodyBorder: 0,
						x: a.x,
						y: a.y,
						dragProxy: !0
					};
				if (!a.width && j.width < 260) j.width = 260;
				d = alloy.windowFactory.createWindow("EqqWindow", j);
				d.setBg("url(" + alloy.CONST.CDN_URL + "pubapps/0/50/images/bg1.png) repeat-x #e8ecf1");
				d.close = g.onClose;
				d.setHtml(f);
				e.window = d;
				k = b.id("loginState");
				n = b.id("loginStateShow");
				a = b.id("loginIcon");
				b.id("loginIcon_disable");
				c.on(a, "click", g.onClickAppStartButton);
				c.on(k, "click", g.onLoginStateButtonClick);
				c.addObserver(d, "dragStart", g.onDragStart);
				c.addObserver(d, "dragEnd", g.onDragEnd);
				c.removeObserver(alloy.layout, "desktopResize", e.onWindowResize);
				c.addObserver(alloy.layout, "desktopResize", e.onWindowResize);
				c.removeObserver(alloy.portal, "selfInfoReady", g.onSelfInfoReady);
				c.addObserver(alloy.portal, "selfInfoReady", g.onSelfInfoReady);
				c.addObserver(d, "resize", e.onNoneWindowResize);
				e.onWindowResize();
				a = d.getSelfDomObj();
				a.setAttribute("customacceptdrop", "1");
				alloy.desktopManager.getDragController().addDropTarget({
					el: a,
					level: 999
				})
			}
			d.setCurrent();
			g.onSelfInfoReady(alloy.portal.getPortalSelf())
		},
		q = function() {
			if (WebqCore.getCoreFlag()) EQQ.reLogin(o);
			else {
				var a = b.id("loginArea"),
					f = b.id("loginLoadingArea");
				f && a && (b.show(f), b.hide(a));
				WebqCore.api.loadCore()
			}
		},
		w = function() {
			var a = b.id("loginIcon"),
				f = b.id("loginIcon_disable");
			a && f && (b.show(a), b.hide(f))
		};
	this.onWindowResize = function() {
		var a = alloy.layout.getAvailableHeight(),
			b = alloy.layout.getAvailableWidth(),
			j = alloy.layout.getAreaHeight("top");
		j == 0 ? d.getHeight() + 45 <= a && (j = 45) : j = 0;
		d.setTop(j);
		d.setLeft(b - d.getWidth());
		c.notifyObservers(d, "resize", d.getBodySize())
	};
	this.onNoneWindowResize = function() {
		var a = b.id("loginArea"),
			f = b.id("loginLoadingArea");
		a && f && (b.setStyle(a, "height", parseInt(b.getStyle(d.body, "height")) - 2 + "px"), b.setStyle(f, "height", parseInt(b.getStyle(d.body, "height")) - 2 + "px"))
	};
	var g = {
		onLoginStateButtonClick: function(a) {
			a.stopPropagation();
			var f = b.getClientXY(this);
			f[1] += 16;
			if (h && h.isShow()) h && h.hide();
			else {
				h || v();
				if (f) {
					var a = h.getWidth(),
						c = h.getHeight(),
						d = alloy.layout.getClientWidth(),
						e = alloy.layout.getClientHeight(),
						g = f[0],
						f = f[1];
					g < 2 && (g = 2);
					f < 2 && (f = 2);
					g > d - a - 2 && (g = d - a - 2);
					f > e - c - 2 && (f = e - c - 2);
					h.setXY(g, f)
				}
				h.setZIndex(alloy.layout.getTopZIndex(3));
				h.show()
			}
		},
		onClickAppStartButton: function() {
			if (a.cookie.get("ptwebqq")) q();
			else {
				var d = alloy.layout.showLoginWindow(alloy.config.__eqqid, !0, alloy.portal.getTryLoginState()),
					f = b.id("loginIcon"),
					e = b.id("loginIcon_disable");
				f && e && (b.hide(f), b.show(e));
				c.addObserver(d, "close", w)
			}
		},
		onRunFirst: function() {},
		onRun: function(b) {
			o = b.loginState;
			var c = alloy.portal.getLoginLevel();
			c === alloy.CONST.LOGIN_LEVEL_NONE ? alloy.layout.showLoginWindow(alloy.config.__eqqid, !0, alloy.portal.getTryLoginState()) : c === alloy.CONST.LOGIN_LEVEL_NOCHAT ? p(b) : a.cookie.get("ptwebqq") ? (p(b), b.directLogin && q()) : alloy.layout.showLoginWindow(alloy.config.__eqqid, !0, alloy.portal.getTryLoginState())
		},
		onSelfInfoReady: function(a) {
			if (e.isRunning() && a) {
				var c = b.id("accountAvatar"),
					d = b.id("accountNick"),
					g = b.id("loginAccount");
				if (c && d && g) c.src = alloy.util.getUserAvatar(a.uin, 1) + "&t=" + (new Date).getTime(), d.innerHTML = a.htmlNick, d.setAttribute("title", a.nick), g.innerHTML = "(" + a.uiuin + ")"
			}
		},
		onClose: function() {
			alloy.portal.setTryLoginState(null);
			typeof EQQ != "undefined" && EQQ.getIsLogin() ? (WebqCore.api.log("eqq-close"), alloy.util.report2im("qqpanel|exitqq"), i ? (i.setWindowCentered(), i.setCurrent()) : i = alloy.layout.confirm("\u60a8\u786e\u8ba4\u8981\u5173\u95ed QQ \u5417\uff1f", function() {
				EQQ.setIsLogin(!1);
				alloy.portal.setLoginLevel(alloy.CONST.LOGIN_LEVEL_NOCHAT);
				WebqCore.api.ifDataReady.set(!1);
				EQQ.executeExit();
				WebqCore.api.log("eqq-close-ok");
				alloy.util.report2im("qqpanel|exitqq|ok");
				EQQ.eqqTips && EQQ.hideEQQtips();
				r()
			}, {
				windowType: "EqqWindow",
				onCancel: function() {
					WebqCore.api.log("eqq-close-cancel");
					alloy.util.report2im("qqpanel|exitqq|cancel")
				},
				onClose: function() {
					i = null
				}
			})) : r()
		},
		onDragStart: function() {
			m = d.getBodySize();
			c.removeObserver(alloy.layout, "desktopResize", e.onWindowResize)
		},
		onDragEnd: function() {
			var a = d.getBodySize();
			if (!m || !(m.width == a.width && m.height == a.height)) {
				var a = d.getBodyWidth(),
					b = d.getBodyHeight();
				d.getBoxStatus();
				var c = alloy.portal.getAllConfig(50);
				c.selfConfig = c.selfConfig || {};
				c.selfConfig.width = a;
				c.selfConfig.height = b;
				c = {};
				c.width = a;
				c.height = b;
				alloy.rpcService.sendSetConfig({
					data: {
						r: {
							appid: 50,
							value: c
						}
					}
				})
			}
		}
	},
		r = function() {
			c.removeObserver(alloy.layout, "desktopResize", e.onWindowResize);
			c.removeObserver(alloy.portal, "selfInfoReady", g.onSelfInfoReady);
			try {
				delete window.frames.EQQ_ProxySendIframe
			} catch (a) {}
			var b = window.frames.iframe_fflist;
			if (b) EQQ.View.MainPanel.flex = null, b.document.write(""), document.getElementById("iframe_fflist").src = alloy.CONST.MAIN_URL + "domain.html";
			b = e.window.getSelfDomObj();
			alloy.desktopManager.getDragController().removeDropTarget(b);
			e.destroy();
			c.notifyObservers(e.window, "close", e.window);
			e.window.destroy();
			d = null;
			typeof EQQ != "undefined" && EQQ.stopBeat();
			typeof CollectGarbage != "undefined" && CollectGarbage();
			WebqCore.setCoreFlag(!1)
		};
	this.createWindow = function() {};
	this.getWindow = function() {
		return e.window
	};
	c.addObserver(this, "runFirst", g.onRunFirst);
	c.addObserver(e, "run", g.onRun);
	c.addObserver(e, "exit", g.onClose)
});
WebqCore = {
	register: function(a, b) {
		this.$__modules = this.$__modules || {};
		this.$__modules[a] = this.$__modules[a] || [];
		this.$__modules[a].push(b)
	},
	load: function(a) {
		delete Jx.PACKAGES[a];
		var b = this.$__modules[a];
		if (b) for (var c = 0; c < b.length; c++) Jx().$package(a, b[c])
	},
	linkNameSpace: function(a, b) {
		var c, e, i = a.split("."),
			k = window;
		for (c = 0; c < i.length - 1; c += 1) e = i[c], k[e] = k[e] || {}, k = k[i[c]];
		k[i[c]] = b
	},
	init: function() {
		this.setCoreFlag(!0);
		if (typeof EQQ != "undefined") for (var a in EQQ) EQQ.hasOwnProperty(a) && delete EQQ[a];
		EQQ = {};
		var b, c;
		for (c = ["EQQ_ProxySendIframe", "EQQ_StatePanel", "miniCard", "EQQ_Container", "EQQ_facePanel", "sendOptionPanel"]; a = c.pop();)(b = Jx().dom.id(a)) && b.parentNode.removeChild(b);
		this.load("EQQ.Global");
		this.load("EQQ.Adapter");
		this.load("EQQ.Extend");
		this.load("EQQ");
		this.load("EQQ.util");
		this.load("EQQ.RPCService");
		this.load("EQQ.Model.BuddyList");
		this.load("EQQ.Model.ChatMsg");
		this.load("EQQ.View.MainPanel");
		this.load("EQQ.View.MainPanelFlex");
		this.load("EQQ.Presenter.MainPanel");
		this.load("EQQ.View.ChatBox");
		this.load("EQQ.Presenter.ChatBox");
		this.load("EQQ.TaskBar");
		this.load("EQQ.businessClass");
		EQQ.loginEQQ()
	},
	CORELOADED: !1,
	setCoreFlag: function(a) {
		this.CORELOADED = a
	},
	getCoreFlag: function() {
		return this.CORELOADED
	}
};
WebqCore.api = {
	queue: [],
	module_queue: {},
	loadedJsArr: {},
	require: {
		chat: [!1, "eqq.chat.js", "unlock", function() {
			alloy.portal.speedTest.sRTS(12, "start", new Date);
			alloy.util.report2h("loadChatJs", "start")
		}, function() {
			alloy.util.report2h("loadChatJs", "end_loadChatJs", "ok");
			WebqCore.load("EQQ.View.ChatBox");
			WebqCore.load("EQQ.Presenter.ChatBox");
			WebqCore.load("EQQ.TaskBar");
			WebqCore.load("EQQ.businessClass");
			EQQ.Presenter.ChatBox.init();
			try {
				EQQ.TaskBar.init()
			} catch (a) {}
			alloy.portal.speedTest.sRTS(12, "end", new Date, !0)
		}],
		core: [!1, "eqq.all.js", "unlock", function() {
			alloy.portal.speedTest.sRTS(11, "start", new Date);
			alloy.portal.speedTest.sRTS(9, "start", new Date);
			alloy.util.report2h("loadEqqAllJs", "start")
		}, function() {
			alloy.portal.speedTest.sRTS(9, "end", new Date, !0);
			WebqCore.init();
			alloy.util.report2h("loadEqqAllJs", "end_loadEqqAllJs")
		}],
		updateGroupTitle: [!0, "eqq.chat.js", "unlock", function() {}, function() {}],
		exitGroup: [!0, "eqq.chat.js", "unlock"],
		sendMsg: [!0, "eqq.chat.js", "unlock"],
		updateGroupMemberCard: [!0, "eqq.chat.js", "unlock"],
		getSelf: [!0, "eqq.all.js", "unlock"],
		getGroupByCode: [!0, "eqq.all.js", "unlock"],
		getUserByUin: [!0, "eqq.all.js", "unlock"],
		getGroupByGid: [!0, "eqq.all.js", "unlock"],
		setSendKey: [!1, "eqq.chat.js", "unlock", function() {}, function() {}]
	},
	ifDataReady: function() {
		var a = !1;
		return {
			set: function(b) {
				a = b
			},
			get: function() {
				return a
			}
		}
	}(),
	loadJs: function(a) {
		var b = this;
		b.require[a][3]();
		b.require[a][2] == "unlock" && (b.require[a][2] = "lock", b.loadedJsArr[b.require[a][1]] ? (b.require[a][0] = !0, b.require[a][4]()) : (Jx().http.loadScript(alloy.util.getAppRoot(alloy.config.__eqqid) + b.require[a][1] + "?t=" + alloy.CONST.UPDATE_TIME_STAMP, {
			query: "",
			onSuccess: function() {
				b.require[a][0] || (b.require[a][0] = !0, b.require[a][4](), b.loadedJsArr[b.require[a][1]] = !0)
			},
			onError: function() {}
		}), setTimeout(function() {
			b.require[a][0] || (b.require[a][2] = "unlock")
		}, 15E3)))
	},
	loadCore: function() {
		this.require.core[0] ? WebqCore.init() : this.loadJs("core")
	},
	call: function(a) {
		this.ifDataReady.get() ? this.require[a[0]][0] ? this.__api[a[0]].apply({}, a[1]) : (this.module_queue[a[0]] = this.module_queue[a[0]] || [], this.module_queue[a[0]].push(a), this.loadJs(a[0])) : (this.queue = this.queue || [], this.queue.push(a))
	},
	makeCall: function(a) {
		for (var b, a = a ? this.module_queue[a] : this.queue; b = a.pop();) this.call(b)
	},
	__api: {
		chat: function(a, b, c) {
			a == "group" ? EQQ.Presenter.ChatBox.chatWithGroup(b, "show") : a == "single" ? EQQ.Presenter.ChatBox.chatWithUser(b, "show") : a == "discu" && EQQ.Presenter.ChatBox.chatWithDiscu(b, "show");
			c && c(b)
		},
		getChatBox: function(a) {
			return typeof EQQ.Presenter.ChatBox != "undefined" && typeof EQQ.Presenter.ChatBox.View != "undefined" ? EQQ.Presenter.ChatBox.getChatBox(a) : !1
		},
		updateGroupTitle: function(a, b) {
			typeof EQQ.Presenter.ChatBox != "undefined" && typeof EQQ.Presenter.ChatBox.View != "undefined" && EQQ.Presenter.ChatBox.updateGroupTitle(a, b)
		},
		updateGroupMemberCard: function(a, b) {
			typeof EQQ.Presenter.ChatBox != "undefined" && typeof EQQ.Presenter.ChatBox.View != "undefined" && EQQ.Presenter.ChatBox.updateGroupMemberCard(a, b)
		},
		exitGroup: function(a) {
			try {
				EQQ.Presenter.ChatBox.closeByGroup(a)
			} catch (b) {}
			EQQ.Presenter.MainPanel.removeGroup(a)
		},
		sendMsg: function(a, b) {
			EQQ.Model.ChatMsg.sendMsg({
				type: "single",
				to: a,
				content: b,
				face: EQQ.Model.BuddyList.getSelf().face
			})
		},
		getSelf: function(a) {
			a(EQQ.Model.BuddyList.getSelf())
		},
		getUserByUin: function(a, b) {
			b(EQQ.Model.BuddyList.getUserByUin(a))
		},
		getGroupByCode: function(a, b) {
			b(EQQ.Model.BuddyList.getGroupByCode(a))
		},
		getGroupByGid: function(a, b) {
			b(EQQ.Model.BuddyList.getGroupByGid(a))
		},
		setSendKey: function(a) {
			EQQ.View.ChatBox.setSendKey(a)
		}
	},
	log: function(a) {
		alloy.rpcService.formSend("http://tj.qstatic.com/log", {
			method: "POST",
			data: {
				j: a
			}
		})
	}
};