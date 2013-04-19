Jx().$package(alloy.app.bubbleTip = new alloy.businessClass.App(alloy.portal.getSystemConfig("bubbleTip")), function(d) {
	var h = d.dom,
		b = d.event,
		c = [{
			id: 1,
			title: "\u66f4\u6362\u684c\u9762\u4e3b\u9898",
			content: "\u8ba9\u60a8\u7684Web QQ\u684c\u9762\uff0c\u548c\u4f60\u4e00\u8d77\u968f\u5fc3\u800c\u53d8\u3002\u70b9\u51fb\u4e3b\u9898\u56fe\u6807\u9009\u62e9\u559c\u6b22\u7684\u684c\u9762\u5427\u3002",
			okBtn: "\u77e5\u9053\u5566",
			nextBtn: "\u4e0b\u4e00\u6761",
			pointerPosition: "bottom right",
			target: "themeSettingButton",
			beforeShow: null,
			report: ["Themesettingbubble", "Themesettingknow", "Themesettingcancle", "Themesettingnext"]
		}, {
			id: 2,
			title: "\u4e00\u952e\u8bb0\u5fc6",
			content: "\u53ea\u8981\u8f7b\u8f7b\u4e00\u70b9\uff0c\u5c31\u7b97\u6362\u53f0\u7535\u8111\u767b\u9646\u4f60\u7684Web QQ\uff0c\u4e5f\u80fd\u8f7b\u677e\u8bb0\u5fc6\u5f53\u524d\u5e03\u5c40\u3002",
			okBtn: "\u77e5\u9053\u5566",
			nextBtn: "\u4e0b\u4e00\u6761",
			pointerPosition: "bottom right",
			target: "layoutSaverButton",
			beforeShow: null,
			report: ["Layoutsaverbubble", "Layoutsaverknow", "Layoutsavercancle", "Layoutsavernext"]
		}, {
			id: 4,
			title: "\u6dfb\u52a0\u81ea\u5b9a\u4e49\u5e94\u7528",
			content: "\u70b9\u51fb\u84dd\u8272\u5149\u6807\uff0c\u4efb\u4f55\u5fc3\u4eea\u7f51\u7ad9\u53ef\u76f4\u63a5\u4fdd\u5b58\u5728\u4f60\u7684Web QQ\u5e94\u7528\u680f\u4e2d\u3002",
			okBtn: "\u8c22\u8c22\u9605\u8bfb",
			pointerPosition: "top right",
			position: [5, 140],
			pointerOffset: 35,
			beforeShow: function(a) {
				alloy.portal.openInWebBrowser({
					callback: a
				})
			},
			report: ["Addfavoritebubble", "Addfavoriteknow", "Addfavoritecancle", "Addfavoritenext"]
		}],
		f, g, e, i, j, o = {
			onBubbleClose: function() {
				n(g);
				var a = f[g];
				a && k(a.report[2])
			},
			onBubbleOkBtnClick: function() {
				this.hide();
				if (g == f.length - 1) {
					for (var a = 0, b = f.length; a < b; a++) {
						var c = f[a];
						i |= c.id;
						j |= c.id
					}
					m()
				} else n(g);
				(c = f[g]) && k(c.report[1])
			},
			onBubbleNextBtnClick: function() {
				var a = f[g];
				a && k(a.report[3]);
				p()
			},
			onPortalReady: function() {
				alloy.portal.getUin() && p()
			}
		},
		k = function(a) {
			d.isUndefined(pgvSendClick) || pgvSendClick({
				hottag: "web2qq.portal.teach." + a
			})
		},
		n = function(a) {
			a = f[a];
			a.id & i ? j |= a.id : i |= a.id;
			m()
		},
		m = function() {
			d.cookie.set("bubbletip", i + "|" + j, "qq.com", "/", 744)
		},
		p = function() {
			if (!(f.length < 1)) {
				g++;
				var a = f[g];
				if (a) {
					e.setContainerStyle("left", "-10000px");
					e.setTitle(a.title + '<span class="bubble_tip_count">' + (g + 1) + "/" + f.length + "</span>");
					e.setContent(a.content);
					a.okBtn ? e.showButton("ok", a.okBtn) : e.hideButton("ok");
					g == f.length - 1 ? e.hideButton("next") : a.nextBtn ? e.showButton("next", a.nextBtn) : e.hideButton("next");
					var b = {};
					b.pointerPosition = a.pointerPosition;
					b.pointerOffset = a.pointerOffset;
					b.target = a.target ? h.id(a.target) : null;
					b.position = a.position;
					a.beforeShow ? a.beforeShow(function() {
						e.show(b);
						k(a.report[0])
					}) : (e.show(b), k(a.report[0]))
				}
			}
		},
		r = function() {
			if (d.platform.iPad && !d.cookie.get("ipadbubbletip")) {
				var a = alloy.layout.getDesktop(),
					a = new Bubble({
						bubbleParent: a.body,
						zIndex: alloy.layout.getTopZIndex(3)
					});
				a.setTitle("\u6dfb\u52a0Q+ Web\u81f3\u4e3b\u5c4f\u5e55");
				a.setContent("\u9009\u62e9\u3010\u6dfb\u52a0\u81f3\u4e3b\u5c4f\u5e55\u3011\u5373\u53ef\u5c06Q+ Web\u6dfb\u52a0\u81f3\u4e3b\u5c4f\u5e55");
				a.showButton("ok", "\u77e5\u9053\u5566");
				a.show({
					pointerPosition: "top right",
					position: [20, 10]
				});
				var c = function() {
						this.close();
						d.cookie.set("ipadbubbletip", "1", location.host, "/", 744)
					};
				b.addObserver(a, "onBubbleClose", c);
				b.addObserver(a, "onBubbleOkBtnClick", c)
			}
		};
	this.createBubble = function(a, b) {
		return new d.ui.Bubble({
			bubbleParent: a || qqweb.layout.getDesktop().body,
			zIndex: b || qqweb.layout.getTopZIndex(3)
		})
	};
	b.addObserver(this, "runFirst", function() {
		r();
		var a = alloy.layout.getDesktop();
		e = new d.ui.Bubble({
			bubbleParent: a.body,
			zIndex: alloy.layout.getTopZIndex(3)
		});
		(a = d.cookie.get("bubbletip")) ? (a = a.split("|"), i = parseInt(a[0]), j = parseInt(a[1])) : j = i = 0;
		f = [];
		for (var a = 0, h = c.length; a < h; a++) c[a].id & i && c[a].id & j || f.push(c[a]);
		g = -1;
		b.addObserver(e, "onBubbleClose", o.onBubbleClose);
		b.addObserver(e, "onBubbleOkBtnClick", o.onBubbleOkBtnClick);
		b.addObserver(e, "onBubbleNextBtnClick", o.onBubbleNextBtnClick)
	});
	b.addObserver(this, "run", function() {})
});
Jx().$package(alloy.app.tips = new alloy.businessClass.App(alloy.portal.getSystemConfig("tips")), function(d) {
	var h = this,
		b = d.dom,
		c = d.event,
		f = d.string,
		g = alloy.layout.getDesktop().body,
		e = !1,
		i = !1,
		j = !1,
		o = !1,
		k, n = -1,
		m, p, r, a = {},
		u = 0,
		q, v, w, x = function(l) {
			var l = l || "webos",
				d = b.node("div", {
					id: l + "_tipsBox",
					"class": l == "webos" ? "webos_tips" : "webos_tips_top"
				});
			d.innerHTML = '\t\t\t<div class="webos_tipsBox_icon"></div>\t\t\t<a id="' + l + '_tipsBox_closeButton" class="window_action_button window_close webos_tipsBox_closeButton" href="###">X</a>\t\t\t<div id="' + l + '_tipsBox_content" class="webos_tipsBox_content"></div>\t\t';
			l == "webos" ? (m = d, g.appendChild(m), p = b.id("webos_tipsBox_content"), r = b.id("webos_tipsBox_closeButton"), c.on(r, "click", s.onCloseButtonClick)) : (a.container = d, g.appendChild(d), b.hide(d), a.content = b.id(l + "_tipsBox_content"), a.button = b.id(l + "_tipsBox_closeButton"), c.on(a.button, "click", function() {
				b.hide(a.container)
			}))
		},
		z = function() {
			if (d.browser.ie && !(d.browser.ie > 7) && d.cookie.get("close_ie_tips") != 1) {
				var a = b.node("div", {
					id: "ietips_tipsBox",
					"class": "webos_tips ie_tips"
				});
				a.innerHTML = '            <div class="webos_tipsBox_icon"></div>            <div id="ietips_tipsBox_content" class="webos_tipsBox_content">\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\uff0c\u5f71\u54cd\u7f51\u9875\u6027\u80fd\uff0c\u5efa\u8bae\u60a8\u6362\u7528<a href="http://download.tech.qq.com/soft/1/2/83068/index.shtml" target="_blank">IE9</a>\u3001<a href="http://download.tech.qq.com/soft/1/2/45974/index.shtml" target="_blank">\u8c37\u6b4c</a>\u3001\u6216<a href="http://download.tech.qq.com/soft/1/2/41301/index.shtml" target="_blank">\u706b\u72d0</a>\u6d4f\u89c8\u5668\u3002&nbsp;&nbsp;<a id="ietips_tips_know" href="###" target="_blank">\u6211\u77e5\u9053\u4e86</a>            </div>        ';
				g.appendChild(a);
				var e = b.id("ietips_tips_know");
				c.on(e, "click", function(f) {
					f.preventDefault();
					d.cookie.set("close_ie_tips", 1, alloy.CONST.DOMAIN, "/", 168);
					b.hide(a);
					c.off(e);
					a.parentNode.removeChild(a)
				})
			}
		};
	this.showEQQTipsDom = function(l) {
		a.content.innerHTML = l || "";
		b.show(a.container)
	};
	this.hideEQQTipsDom = function() {
		b.hide(a.container)
	};
	var t = function() {
			k = b.id("taskbar_popup_container");
			b.setXY(k, b.getClientWidth() - 315, b.getClientHeight() - 240);
			b.setStyle(k, "zIndex", alloy.layout.getTopZIndex(3))
		},
		A = function() {
			var a = b.id("taskbar_popup_is_show_tip_icon");
			b.getClass(a) == "taskbar_popup_is_show_tip_icon" ? (b.setClass(a, "taskbar_popup_is_show_tip_icon_selected"), h.setIsShowTip("true"), i = !0, pgvSendClick({
				hottag: "WEB2QQ.TIPS.RESTORETIPS.ALL"
			}), alloy.util.report2qqweb("tips|restore")) : (b.setClass(a, "taskbar_popup_is_show_tip_icon"), h.setIsShowTip("false"), i = !1, pgvSendClick({
				hottag: "WEB2QQ.TIPS.CANCELTIPS.ALL"
			}), alloy.util.report2qqweb("tips|cancel"))
		},
		B = function(a) {
			a.stopPropagation();
			a.preventDefault();
			parent.alloy.portal.openInWebBrowser({
				url: "http://webqq.qzone.qq.com",
				title: "\u5b98\u65b9\u535a\u5ba2",
				isOpenNewTab: !0
			});
			alloy.util.report2qqweb("tips|officialblog")
		},
		C = function(a) {
			a.stopPropagation();
			a.preventDefault();
			parent.alloy.portal.openInWebBrowser({
				url: "http://t.qq.com/Web_QQ",
				title: "\u5b98\u65b9\u5fae\u535a",
				isOpenNewTab: !0
			});
			alloy.util.report2qqweb("tips|officialmicroblog")
		},
		D = function() {
			b.addClass(q, "taskbar_popup_dynamic_content_hover")
		},
		E = function() {
			b.removeClass(q, "taskbar_popup_dynamic_content_hover")
		},
		F = function() {
			var a = '\t\t\t\t<div class="taskbar_popup_head">\t\t\t\t<span class="taskbar_popup_title">Q+ Web \u70ed\u70b9</span><a class="taskbar_popup_close_btn" id="taskbar_popup_close_btn"></a>\t\t\t\t</div>\t\t\t\t<div class="taskbar_popup_body">\t\t\t\t<div class="taskbar_popup_dynamic_content" id="taskbar_popup_dynamic_content">\t\t\t\t<img id="taskbar_popup_image" class="taskbar_popup_illustration" onerror="this.style.visibility=\'hidden\'" src="' + alloy.CONST.CDN_URL + 'style/images/webqq.jpg" />\t\t\t\t<p class="taskbar_popup_content" id="taskbar_popup_content"><br />\u521b\u9020\u65e0\u6240\u4e0d\u5728\u7684\u7f51\u7edc\u670d\u52a1\uff0c<br /><br />\t\t\t\t\u968f\u5fc3\u6240\u6b32\u7684\u4e2a\u4eba\u5316\u5728\u7ebf\u751f\u6d3b\uff01<br /><br />\t\t\t\t</p><p id="taskbar_popup_subject" class="taskbar_popup_subject">\u2014\u2014\u70ed\u7231\u751f\u6d3b\uff0c\u70ed\u7231Q+ Web</p>\t\t\t\t</div>\t\t\t\t<div class="taskbar_popup_bottom_bar">\t\t\t\t<div id="taskbar_popup_is_show_tip"><span id="taskbar_popup_is_show_tip_icon" class="taskbar_popup_is_show_tip_icon_selected"></span><span class="taskbar_popup_is_show_tip">\u81ea\u52a8\u63d0\u793a</span></div>\t\t\t\t<div id="taskbar_popup_link_list" class="taskbar_popup_link_list"><a id="taskbar_popup_link_mb" href="http://t.qq.com/Web_QQ" target="_blank">\u5b98\u65b9\u5fae\u535a</a><span>&nbsp;|&nbsp;</span><a id="taskbar_popup_link_blog" href="http://webqq.qzone.qq.com" target="_blank">\u5b98\u65b9\u535a\u5ba2</a></div>\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div class="taskbar_popup_bottom"></div>';
			d.browser.ie && (a += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');
			var e = b.node("div", {
				id: "taskbar_popup_container",
				"class": "taskbar_popup_container"
			});
			e.innerHTML = a;
			g.appendChild(e);
			c.on(b.id("taskbar_popup_close_btn"), "click", h.clickCloseBtn);
			c.on(b.id("taskbar_popup_is_show_tip"), "click", A);
			q = b.id("taskbar_popup_dynamic_content");
			c.on(q, "mouseover", D);
			c.on(q, "mouseout", E);
			v = b.id("taskbar_popup_link_mb");
			w = b.id("taskbar_popup_link_blog");
			c.on(v, "click", C);
			c.on(w, "click", B)
		},
		s = {
			onRunFirst: function() {
				d.profile("Tips Create");
				c.addObserver(alloy.rpcService, "GetTipsInfoSuccess", s.onGetTipsInfoSuccess);
				setInterval(function() {
					e ? n = 0 : n++;
					alloy.rpcService.sendGetTipsInfo({
						tp: 1,
						id: u,
						rc: n
					})
				}, 6E4);
				F();
				x("webos_eqq");
				z();
				alloy.portal.getLoginLevel() > 1 ? h.initIsShowTip(alloy.config.configList.isShowTip) : c.addObserver(alloy.portal, "UACReady", function() {
					alloy.portal.getLoginLevel() > 1 && h.initIsShowTip(alloy.config.configList.isShowTip)
				});
				d.profile("Tips CreateFinish")
			},
			onRun: function() {},
			onCloseButtonClick: function(a) {
				a.preventDefault();
				h.hideTips()
			},
			onGetTipsInfoSuccess: function(a) {
				if (a.c == 0) if (a.r.tp == 1) {
					u = a.r.id;
					var b = a.r.c;
					h.setTipsHtml(b);
					h.showTips()
				} else if (a.r.tp == 2) {
					var c = a.r.sb,
						b = a.r.c;
					h.setNewsTipsHtml(b, c, a.r.purl, a.r.curl);
					i && (j = !0, setTimeout(function() {
						j && (j = !1)
					}, 1E4))
				}
			}
		};
	this.setIsShowTip = function(a) {
		alloy.rpcService.sendSetConfig({
			context: this,
			data: {
				retype: 1,
				r: {
					appid: 0,
					value: {
						isShowTip: a
					}
				}
			}
		})
	};
	var y = function() {
			var a = {
				tp: 2,
				uin: alloy.portal.getUin(),
				id: 0
			};
			alloy.rpcService.sendGetTipsInfo(a);
			o = !0
		};
	c.addObserver(this, "run", s.onRun);
	c.addObserver(this, "runFirst", s.onRunFirst);
	this.setTips = function(a) {
		this.setTipsHtml(f.encodeHtmlSimple(a))
	};
	this.setTipsHtml = function(a) {
		a = String(a);
		m || x();
		p.innerHTML = a;
		p.title = f.decodeHtmlSimple(a.replace(/<[^>]+>/g, ""))
	};
	this.setNewsTipsHtml = function(a, d, e, f) {
		var g = b.id("taskbar_popup_content"),
			h = b.id("taskbar_popup_subject");
		b.id("taskbar_popup_image").src = alloy.CONST.CDN_URL + "webqq_ann/" + e;
		g.innerHTML = a.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />");
		h.innerHTML = d;
		a = function() {
			f.substr(0, 4) != "app:" ? alloy.portal.openInWebBrowser({
				url: f,
				isHideBar: !1,
				title: "Q+ Web \u70ed\u70b9"
			}) : alloy.portal.runApp(f.substr(4));
			pgvSendClick({
				hottag: "WEB2QQ.TIPS.SWITCHTIPS.ALL"
			});
			alloy.util.report2qqweb("tips|switch")
		};
		c.on(g, "click", a);
		c.on(h, "click", a)
	};
	this.showTips = function() {
		n = 0;
		e = !0;
		b.setStyle(m, "zIndex", alloy.layout.getTopZIndex(3));
		b.show(m)
	};
	this.hideTips = function() {
		e = !1;
		b.hide(m)
	};
	this.showNews = function() {
		t();
		b.show(k);
		c.on(window, "resize", t);
		alloy.portal.getLoginLevel() > 1 ? b.show(b.id("taskbar_popup_is_show_tip")) : b.hide(b.id("taskbar_popup_is_show_tip"));
		o || (y(), o = !0)
	};
	this.clickCloseBtn = function(a) {
		a.stopPropagation();
		a.preventDefault();
		h.hideNews();
		j && (j = !1);
		pgvSendClick({
			hottag: "WEB2QQ.TIPS.SHUTTIPS.ALL"
		});
		alloy.util.report2qqweb("tips|shut")
	};
	this.hideNews = function() {
		b.hide(k);
		c.off(window, "resize", t)
	};
	this.initIsShowTip = function(a) {
		setTimeout(y, 5E3);
		var c = b.id("taskbar_popup_is_show_tip_icon");
		a == "false" ? (b.setClass(c, "taskbar_popup_is_show_tip_icon"), i = !1) : (b.setClass(c, "taskbar_popup_is_show_tip_icon_selected"), i = !0)
	}
});