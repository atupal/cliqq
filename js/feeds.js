var QZONE = QZONE || {},
	G_Param = {},
	g_Mode = "ofp",
	g_Parent = window,
	siDomain = "qzs.qq.com",
	g_R_Domain = "r.qzone.qq.com",
	g_Ic_Domain = "ic2.qzone.qq.com";
QZONE.FP = QZONE.FP || {};
QZONE.FP._t = window;
QZONE.ICC = {};
QZONE.ICC.changeHeight = function() {};
QZONE.FrontPage = QZONE.FrontPage || {};
QZONE.FrontPage.getRemarkList = function(callback) {
	if (typeof callback != "function") return;
	var p = QZONE.FrontPage.getRemarkList,
		_jg, sUrl = "http://" + g_R_Domain + "/cgi-bin/tfriend/friend_hat_get.cgi?" + "hat_seed=" + QZFL.widget.seed.get("hat_seed", {
			useCookie: 1
		}),
		uID = "getRemarks",
		data = {
			uin: g_iLoginUin,
			fupdate: 1
		};
	if (p._data && p._origData) {
		setTimeout(function() {
			QZFL.lang.isFunction(callback) && callback(p._data, p._origData)
		}, 0);
		return
	}
	_jg = new QZFL.JSONGetter(sUrl, uID, data, "utf-8");
	_jg.addOnSuccess(function(o) {
		if (o.code == 0) {
			o = o.data;
			p._origData = o;
			p._data = QZONE.FrontPage.getRemarkList._refactorData(o);
			QZFL.lang.isFunction(callback) && callback(p._data, p._origData)
		}
	});
	_jg.addOnError(function(o) {
		p._data = {};
		p._origData = {};
		QZFL.lang.isFunction(callback) && callback(o)
	});
	_jg.send("_Callback")
};
QZONE.FrontPage.getRemarkList._data = null;
QZONE.FrontPage.getRemarkList._origData = null;
QZONE.FrontPage.getRemarkList._refactorData = function(_o) {
	var ret = {};
	QZFL.object.each(_o, function(_t, _i) {
		_t["realname"] && (ret[_i] = _t["realname"])
	});
	return ret
};
QZONE.ICFeeds = {
	pathObj: {},
	commonFN: {
		getDom: function(id, dom) {
			var _d;
			if (typeof id != "undefined") _d = QZFL.dom.get(id);
			else if (typeof dom != "undefined") _d = dom;
			else _d = document.body;
			return _d
		},
		getFeedInfo: function(fid) {
			var s = fid.split("_");
			return {
				uin: s[1],
				appid: s[2],
				typeid: s[3],
				abstime: s[4],
				feedno: s[5],
				scope: s[6],
				ver: s[7]
			}
		},
		getParent: function(e, f) {
			var na;
			if (typeof f == "string") {
				na = f;
				if (f === "*") f = function(n) {
					return n.nodeType == 1
				};
				else f = function(n) {
					return n.nodeType == 1 && n.nodeName.toLowerCase() == na.toLowerCase()
				}
			}
			if (typeof f != "function") return e;
			while (e) {
				if (e.nodeName == "BODY") break;
				if (f(e)) break;
				e = e.parentNode
			}
			return typeof na == "string" && na != "*" ? e.nodeName.toLowerCase() == na.toLowerCase() && e : e
		},
		domData: function(elem, key, value) {
			if (elem.nodeType == 1) if (value == undefined) {
				var name = "data-" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
				if (elem != document && elem.tagName != "HTML") {
					data = $e(elem).getAttr(name);
					return data
				}
				return null
			} else elem.setAttribute("data-" + key, value)
		},
		getFeedFrameData: function(target, key) {
			if (typeof target == "string") target = $(target);
			if (target && target.nodeType == 1) {
				var feedLiElem = QZONE.ICFeeds.commonFN.getParent(target, function(e) {
					return e.tagName == "DIV" && e.className.indexOf("f_item") != -1
				});
				if (feedLiElem) return QZONE.ICFeeds.commonFN.domData(feedLiElem, key)
			} else return null
		},
		getFeedId: function(el) {
			var r = /^feed_\d+_\d+/;
			while (!r.test(el.id)) {
				el = el.parentNode;
				if (!el || el.tagName == "BODY") return null
			}
			return el.id
		},
		getAppId: function(feedId) {
			return QZONE.ICFeeds.commonFN.getFeedInfo(feedId)["appid"]
		},
		getFeedUin: function(feedId) {
			return QZONE.ICFeeds.commonFN.getFeedInfo(feedId)["uin"]
		},
		getFeedExtendNodeId: function(el) {
			var r = /^(?:h|f)ex_\d+_\d+/;
			while (!r.test(el.id)) {
				el = el.parentNode;
				if (el.tagName == "BODY") return null
			}
			return el.id
		},
		getFeedVersion: function(feedId) {
			return QZONE.ICFeeds.commonFN.getFeedInfo(feedId)["ver"]
		},
		toArray: function(l) {
			var arr2 = [];
			for (var i = 0, len = l.length; i < len; i++) arr2[i] = l[i];
			return arr2
		},
		isAuthUser: function(fid) {
			var t = QZONE.ICFeeds.FeedsTemp.Accessory.infoPool[fid];
			if (t && t.otherflag && t.otherflag.split("_")[0] == 1) return true;
			return false
		}
	},
	bootStrap: function() {
		QZONE.ICFeeds.QZ.init(undefined);
		QZONE.ICFeeds.FeedsTemp.init();
		QZONE.ICFeeds.eventCenter.init($("ifeedsContainer"));
		if (ownerProfileSummary && bua != 23) document.onclick = QZONE.ICFeeds.goQzHomeHacker;
		else if (bua == 23) document.onclick = QZONE.ICFeeds.goWithPtlogin
	},
	goWithPtlogin: function(evt) {
		var RE_home = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)$/i,
			RE_profile = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/profile/i,
			RE_blog = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/blog\/(\d+)/i,
			RE_share = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/share\/(\d+)/i,
			RE_mood = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/mood\/([^.]+)\.(\d)/i,
			RE_photo = /^http:\/\/(?:\w+\.)?user.qzone.qq.com\/(\d+)\/photo\/(.+)\/(.+)/i,
			RE_album = /^http:\/\/(?:\w+\.)?user.qzone.qq.com\/(\d+)\/photo\/(.+)/i,
			RE_main_blog = /^http:\/\/(?:\w+\.)?qzone.qq.com\/(\d+)\/blog\/(\d+)/i,
			RE_infocenter = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/infocenter/i,
			RE_fusion = /^http:\/\/(?:\w+\.)?fusion.qq.com\/go/i,
			RE_appsetup = /^http:\/\/(?:\w+\.)?rc.qzone.qq.com\/appsetup/i,
			sd;
		if (evt = evt || window.event) if (sd = evt.target || evt.srcElement) {
			if (sd.tagName == "IMG") sd = sd.parentNode;
			if (sd.tagName == "SPAN" && sd.previousSibling && sd.previousSibling.nodeValue == "@") sd = sd.parentNode;
			if (sd.tagName == "A") if (RE_home.test(sd.href) || RE_profile.test(sd.href) || RE_blog.test(sd.href) || RE_share.test(sd.href) || RE_mood.test(sd.href) || RE_photo.test(sd.href) || RE_album.test(sd.href) || RE_main_blog.test(sd.href) || RE_infocenter.test(sd.href) || RE_fusion.test(sd.href) || RE_appsetup.test(sd.href)) {
				var cu = external && external.Hummer_Contact_GetSelfUin && external.Hummer_Contact_GetSelfUin(),
					ck = external && external.Hummer_IM_GetClientKey && external.Hummer_IM_GetClientKey();
				if (cu && ck) {
					if (sd.href.indexOf("?") >= 0) sd.href += "&qz_client_replay=qq_qz";
					else sd.href += "?qz_client_replay=qq_qz";
					sd.href = "http://ptlogin2.qq.com/jump?clientuin=" + cu + "&clientkey=" + ck + "&u1=" + encodeURIComponent(sd.href)
				}
			}
		}
	},
	goQzHomeHacker: function(evt) {
		var RE_home = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)$/i,
			RE_profile = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/profile/i,
			RE_blog = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/blog\/(\d+)/i,
			RE_share = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/share\/(\d+)/i,
			RE_mood = /^http:\/\/(?:\w+\.)?user\.qzone\.qq\.com\/(\d+)\/mood\/([^.]+)\.(\d)/i,
			RE_photo = /^http:\/\/(?:\w+\.)?user.qzone.qq.com\/(\d+)\/photo\/(.+)\/(.+)/i,
			RE_album = /^http:\/\/(?:\w+\.)?user.qzone.qq.com\/(\d+)\/photo\/(.+)/i,
			RE_main_blog = /^http:\/\/(?:\w+\.)?qzone.qq.com\/(\d+)\/blog\/(\d+)/i,
			sd, u, tid, aid;
		if (evt = evt || window.event) if (sd = evt.target || evt.srcElement) {
			if (sd.tagName == "IMG") sd = sd.parentNode;
			if (sd.tagName == "A") {
				if (RE_home.test(sd.href)) {
					if (sd.innerHTML == "\u56de\u5b8c\u6574\u7248") return true;
					u = sd.href.replace(RE_home, "$1");
					sd.target = "_self";
					sd.href = "http://qz.qq.com/" + u + "/home"
				} else if (RE_profile.test(sd.href)) {
					u = sd.href.replace(RE_profile, "$1");
					sd.target = "_self";
					sd.href = "http://qz.qq.com/" + u + "/home"
				} else if (RE_blog.test(sd.href)) {
					sd.href.replace(RE_blog, function(a, b, c) {
						u = b;
						tid = c
					});
					sd.target = "_self";
					sd.href = "http://qz.qq.com/" + u + "/blog?uin=" + u + "&blogid=" + tid
				} else if (RE_share.test(sd.href)) {
					sd.href.replace(RE_share, function(a, b, c) {
						u = b;
						tid = c
					});
					sd.target = "_self";
					sd.href = "http://qz.qq.com/" + u + "/oneshare?shareid=" + tid
				} else if (RE_mood.test(sd.href)) {
					sd.href.replace(RE_mood, function(a, b, c, d) {
						u = b;
						tid = c;
						aid = d
					});
					sd.target = "_self";
					sd.href = "http://qz.qq.com/" + u + "/mood?mid=" + tid + "&source=" + aid
				} else if (RE_album.test(sd.href)) {
					sd.href.replace(RE_album, function(a, b, c) {
						u = b;
						tid = c
					});
					sd.target = "_self";
					sd.href = "http://qz.qq.com/" + u + "/photolist?aid=" + tid
				} else if (RE_photo.test(sd.href)) {
					sd.href.replace(RE_photo, function(a, b, c, d) {
						u = b;
						aid = c;
						tid = d
					});
					sd.target = "_self";
					sd.href = "http://qz.qq.com/" + u + "/photo?aid=" + aid + "&lloc=" + tid
				}
				if (RE_main_blog.test(sd.href)) {
					sd.href.replace(RE_main_blog, function(a, b, c) {
						u = b;
						tid = c
					});
					sd.target = "_self";
					sd.href = "http://qz.qq.com/" + u + "/blog?blogid=" + tid
				}
			}
		}
	},
	initNewFeeds: function(dom) {
		var p = QZONE.ICFeeds;
		QZONE.ICFeeds.QZ.init(undefined, dom)
	},
	updateFeedComment: function(eid, feedId, html) {
		if (!$("GRZOPTParserContainer")) QZFL.dom.createElementIn("div", document.body, false, {
			id: "GRZOPTParserContainer",
			style: "display:none"
		});
		var parser = $("GRZOPTParserContainer"),
			oldCommentUL;
		if (parser) {
			parser.innerHTML = html;
			oldCommentUL = $e(".feeds_comment_v2", $(feedId)).elements[0];
			if (oldCommentUL) oldCommentUL.parentNode.replaceChild($e(".feeds_comment_v2", parser).elements[0], oldCommentUL)
		}
		this.reInitFeed(feedId)
	},
	updateFeed: function(eid, fid, html) {
		this.updateFeedExtend(eid, html);
		this.reInitFeed(fid)
	},
	updateFeedExtend: function(elid, html) {
		$(elid).innerHTML = html
	},
	reInitFeed: function(feedid) {
		var d = $(feedid);
		if (d) this.initNewFeeds(d.parentNode)
	},
	eventCenter: {
		cmdPool: {
			"qz_reply": function(elem) {
				QZONE.ICFeeds.Reply.triggerCommentsClick(elem)
			},
			"qz_more": function(elem) {
				QZONE.ICFeeds.More.triggerClick(elem)
			}
		},
		init: function(dom) {
			QZFL.event.delegate(dom, "a", "click", function(e) {
				var elem = this;
				var cmd = QZONE.ICFeeds.commonFN.domData(elem, "cmd");
				var fn = QZONE.ICFeeds.eventCenter.cmdPool[cmd];
				QZFL.lang.isFunction(fn) && fn(elem)
			});
			QZFL.event.delegate(dom, ".replySubmit", "click", function(e) {
				QZONE.ICFeeds.Reply.triggerCommentsClick(this, "replySubmit")
			});
			QZFL.event.delegate(dom, ".replyCancel", "click", function(e) {
				QZONE.ICFeeds.Reply.triggerCommentsClick(this, "replyCancel")
			})
		}
	},
	QZ: {
		init: function(id, dom) {
			var p = QZONE.ICFeeds;
			QZONE.ICFeeds.FeedsGetter.filtPopup(id, dom);
			if (G_Param.myFeeds_new_cnt && bua == 23) QZONE.ICFeeds.FeedsGetter.feedsUnreadMark(G_Param.myFeeds_new_cnt);
			if (window.bua == 23) QZFL.event.delegate($("ifeedsContainer"), "div.img_box", "click", QZONE.ICFeeds.FeedsGetter.onImageView, [id]);
			p.Time.init(id, dom);
			p.More.init(id, dom);
			p.Reply.init(id, dom);
			p.FeedsTemp.User.init(id, dom);
			p.Delete.init(id, dom);
			p.Remark.init.apply(p, arguments)
		}
	},
	QZFirstPage: {
		init: function(id, dom) {
			var p = QZONE.ICFeeds;
			p.Time.init(id, dom)
		}
	},
	More: {
		BTNPool: {},
		unfold: function(feedid) {
			var elems = QZFL.dom.getElementsByClassName("comments_more_entry", "", $(feedid));
			if (elems && elems.length == 1) QZONE.ICFeeds.More.triggerClick(elems[0])
		},
		triggerClick: function(elem) {
			var F = QZONE.ICFeeds.commonFN;
			var action = F.domData(elem, "action"),
				param = F.domData(elem, "param"),
				charset = F.domData(elem, "charset");
			var feedid = QZONE.ICFeeds.commonFN.getFeedId(elem),
				fexid = QZONE.ICFeeds.commonFN.getFeedExtendNodeId(elem);
			QZONE.ICFeeds.More._more(feedid, action, param, charset, fexid)
		},
		init: function(id, dom) {
			var _d = QZONE.ICFeeds.commonFN.getDom(id, dom),
				l = QZFL.dom.getElementsByTagNameNS(_d, "qz", "more"),
				p = QZONE.ICFeeds.More;
			for (var i = l.length - 1; i >= 0; --i) {
				var fid = QZONE.ICFeeds.commonFN.getFeedId(l[i]),
					fexid = QZONE.ICFeeds.commonFN.getFeedExtendNodeId(l[i]),
					aNode;
				var action = l[i].getAttribute("action"),
					param = l[i].getAttribute("param"),
					charset = l[i].getAttribute("charset"),
					commentsurl = l[i].getAttribute("commentsurl"),
					link = l[i].getAttribute("link");
				aNode = document.createElement("A");
				aNode.className = "c_tx";
				aNode.setAttribute("alt", "replybtn");
				aNode.innerHTML = trim(l[i].innerHTML);
				p.BTNPool[fid] = {
					"fid": fid,
					"action": action,
					"param": param,
					"charset": charset,
					"fexid": fexid,
					"commentsurl": commentsurl
				};
				if (fid) {
					if (commentsurl) {
						aNode.href = commentsurl;
						aNode.target = "_blank"
					} else {
						aNode.href = "javascript:;";
						if (link == 1) aNode.onclick = function(fid) {
							return function() {
								QZONE.ICFeeds.More.moreAndReply(fid)
							}
						}(fid);
						else aNode.onclick = function(a, b, c, d, e, f) {
							return function() {
								QZONE.ICFeeds.More._more(a, b, c, d, e, f);
								return false
							}
						}(fid, action, param, charset, fexid, link)
					}
					l[i].parentNode.replaceChild(aNode, l[i])
				} else l[i].style.display = "none"
			}
			aNode = null
		},
		moreAndReply: function(fid) {
			var p = QZONE.ICFeeds.More,
				d = p.BTNPool[fid];
			if (!d || d.hasShowMore) {
				QZONE.ICFeeds.Reply.click(fid);
				return
			}
			p._more(d.fid, d.action, d.param, d.charset, d.fexid, 1)
		},
		_sending: false,
		_more: function(fid, action, param, charset, fexid, link) {
			if (QZONE.ICFeeds.More._sending) return;
			var data = {
				feedversion: QZONE.ICFeeds.commonFN.getFeedVersion(fid),
				param: param,
				ouin: g_iLoginUin,
				reqref: "feeds"
			};
			if (QZONE.ICFeeds.commonFN.isAuthUser(fid)) data.authuser = 1;
			var fs = new QZFL.FormSender(action, "post", data, charset);
			fs.fid = fid;
			fs.fexid = fexid;
			fs.onSuccess = function(o) {
				QZONE.ICFeeds.More._sending = false;
				if (o.err > 0 || o.ret > 0) g_Parent.QZFL.widget.msgbox.show(o.msg, 1, 2E3);
				else if (o.newFeedXML.indexOf("qz_metadata") < 0 && /^\s*</.test(o.newFeedXML)) {
					QZONE.ICFeeds.updateFeedComment(fs.fexid, fs.fid, o.newFeedXML);
					if (link == 1) QZONE.ICFeeds.Reply.click(fid)
				} else if (o.newFeedXML && o.newFeedXML != "") {
					var t, arr = fs.fid.split("_");
					if (o.newFeedXML && o.newFeedXML != "") t = QZONE.ICFeeds.FeedsTemp.Feeds.getHTML4XML(arr[2], arr[3], arr[6], o.newFeedXML, function(res) {
						QZONE.ICFeeds.updateFeedComment(fs.fexid, fs.fid, res.summary);
						if (link == 1) QZONE.ICFeeds.Reply.click(fid);
						setTimeout(function() {
							QZONE.ICC.changeHeight()
						}, 500)
					}, fid);
					else if (o.newFeeds) {
						t = o.newFeed;
						QZONE.ICFeeds.updateFeedComment(fs.fexid, fs.fid, t);
						setTimeout(function() {
							QZONE.ICC.changeHeight()
						}, 500)
					} else {
						if (QZONE.ICFeeds.More.BTNPool[fid].commentsurl) g_Parent.QZONE.open(QZONE.ICFeeds.More.BTNPool[fid].commentsurl);
						if (link == 1) QZONE.ICFeeds.Reply.click(fid);
						setTimeout(function() {
							QZONE.ICC.changeHeight()
						}, 500)
					}
				}
			};
			fs.onError = function(o) {
				QZONE.ICFeeds.More._sending = false;
				g_Parent.QZFL.widget.msgbox.show("\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", 1, 2E3)
			};
			QZONE.ICFeeds.More._sending = true;
			fs.send()
		}
	},
	ReplyV2: {
		sending: false,
		tempCoreParam: {},
		coreParam: {},
		editor: null,
		lastTarget: null,
		container: null,
		click: function(feedId) {
			var e = QZFL.event.getTarget(),
				fid = feedId || QZONE.ICFeeds.commonFN.getFeedId(e);
			if (!fid) return;
			var id = "icReplyBTN_" + fid;
			var p = QZONE.ICFeeds.Reply,
				pool = p.BTNPool[id];
			if (!pool) return;
			QZONE.ICFeeds.ReplyV2._clickReply.apply(QZONE.ICFeeds.ReplyV2, [pool, pool.aNode || e])
		},
		_clickReply: function(paramObj, eventObj) {
			var e = eventObj || QZFL.event.getTarget(),
				a = Array.prototype.slice.call(arguments),
				fid = QZONE.ICFeeds.commonFN.getFeedId(e);
			paramObj.feedversion = QZONE.ICFeeds.commonFN.getFeedVersion(paramObj.feedId);
			a[a.length] = e;
			if (e.id == "icReplySubmit_" + fid) {
				if (QZONE.ICFeeds.Reply.cacheParam && QZONE.ICFeeds.Reply.cacheParam[fid]) paramObj.param = QZONE.ICFeeds.Reply.cacheParam[fid];
				var fs = new QZFL.FormSender(paramObj.postURL, "post", {
					ouin: g_iLoginUin,
					content: $("icReplyInput_" + fid).value,
					param: paramObj.param,
					reqref: "feeds",
					feedversion: paramObj.feedversion,
					g_tk: QZFL.pluginsDefine && QZFL.pluginsDefine.getACSRFToken()
				}, paramObj.charset);
				fs.fid = fid;
				fs.fexid = QZONE.ICFeeds.commonFN.getFeedExtendNodeId(e), fs.onSuccess = function(o) {
					if (o.err > 0 || o.ret > 0) g_Parent.QZFL.widget.msgbox.show(o.msg, 1, 2E3);
					else {
						var t, arr = fs.fid.split("_"),
							link;
						if (o.newFeedXML && o.newFeedXML != "") if (o.err == -8 || o.ret == -8) {
							g_Parent.QZFL.widget.msgbox.show(o.msg, 1, 2E3);
							QZFL.css.addClassName($("icReplyContent_" + fid), "none");
							$("icReplyInput_" + paramObj.feedId).value = "";
							setTimeout(function() {
								QZONE.ICC.changeHeight()
							}, 500)
						} else if (o.err === 0 || o.ret === 0) if (o.newFeedXML.indexOf("qz_metadata") < 0 && /^\s*</.test(o.newFeedXML)) {
							QZONE.ICFeeds.updateFeedComment(fs.fexid, fs.fid, o.newFeedXML);
							setTimeout(function() {
								QZONE.ICC.changeHeight()
							}, 500)
						} else t = QZONE.ICFeeds.FeedsTemp.Feeds.getHTML4XML(arr[2], arr[3], arr[6], o.newFeedXML, function(res) {
							QZONE.ICFeeds.updateFeedComment(fs.fexid, fs.fid, res.summary || res.html);
							setTimeout(function() {
								QZONE.ICC.changeHeight()
							}, 500)
						}, fid);
						else g_Parent.QZFL.widget.msgbox.show(o.msg || "\u7cfb\u7edf\u7e41\u5fd9", 1, 2E3);
						else if (o.newFeeds) {
							t = o.newFeed;
							QZONE.ICFeeds.updateFeedComment(fs.fexid, fs.fid, t);
							setTimeout(function() {
								QZONE.ICC.changeHeight()
							}, 500)
						} else {
							if (QZONE.ICFeeds.More.BTNPool[fid] && QZONE.ICFeeds.More.BTNPool[fid].commentsurl) g_Parent.QZONE.open(QZONE.ICFeeds.More.BTNPool[fid].commentsurl);
							if (link == 1) QZONE.ICFeeds.Reply.click(fid);
							setTimeout(function() {
								QZONE.ICC.changeHeight()
							}, 500)
						}
						QZONE.ICFeeds.Reply.cacheParam = {}
					}
				};
				fs.onError = function(o) {
					g_Parent.QZFL.widget.msgbox.show("\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", 1, 2E3)
				};
				fs.send();
				if (QZONE && QZONE.ICFeeds && QZONE.ICFeeds.PV && typeof QZONE.ICFeeds.PV.sendAct == "function") QZONE.ICFeeds.PV.sendAct("qz_reply_" + paramObj.appid)
			} else if (e.id == "icReplyCancel_" + fid) QZFL.css.addClassName($("icReplyContent_" + fid), "none");
			else {
				QZFL.css.removeClassName($("icReplyContent_" + paramObj.feedId), "none");
				$("icReplyInput_" + paramObj.feedId).focus()
			}
		},
		_reply: function(paramObj, eventObj) {
			var p = QZONE.ICFeeds.ReplyV2,
				tmp = eventObj || QZFL.event.getTarget(),
				btnstyle, tuin, feedversion;
			p.coreParam = paramObj;
			feedversion = QZONE.ICFeeds.commonFN.getFeedVersion(p.coreParam.feedId);
			var d = $("icReplyBTN_" + p.coreParam.feedId);
			if (d) p.container = d;
			btnstyle = paramObj.btnstyle;
			if (btnstyle == 2) {
				p.container = tmp.parentNode.parentNode.parentNode;
				if (feedversion == 1) p.container = p.container.parentNode
			} else if (btnstyle == 3) p.container = tmp.parentNode;
			else if (btnstyle == 4) {
				p.container = tmp.parentNode.parentNode.parentNode.parentNode.parentNode;
				if (feedversion == 1) p.container = p.container.parentNode
			}
			tuin = paramObj.tuin || 0;
			QZONE.ICFeeds.ReplyV2.runEditor(p.container, p.coreParam)
		},
		resetLastEntry: function(isHide) {
			var p = QZONE.ICFeeds.ReplyV2;
			if (isHide || p.lastTarget && p.lastTarget != p.coreParam.feedId) {
				var _d = $("fr" + p.lastTarget);
				if (_d) _d.style.display = ""
			}
		},
		runEditor: function(container, paramObj) {
			var p = QZONE.ICFeeds.ReplyV2;
			if (QZONE.MoodEditor && typeof QZONE.MoodEditor.makeEditor == "function") QZONE.MoodEditor.makeEditor(container, paramObj)
		},
		hideEntry: function() {
			var p = QZONE.ICFeeds.ReplyV2;
			p.lastTarget = p.coreParam.feedId;
			var _d = $("fr" + p.lastTarget);
			if (_d) _d.style.display = "none";
			QZONE.ICC.changeHeight()
		},
		showEntry: function() {
			var p = QZONE.ICFeeds.ReplyV2;
			p.resetLastEntry(true);
			QZONE.ICC.changeHeight()
		},
		getAppId: function() {
			return QZONE.ICFeeds.commonFN.getAppId(QZONE.ICFeeds.ReplyV2.coreParam.feedId)
		},
		submit: function(dataObj) {
			var param = {},
				p = QZONE.ICFeeds.ReplyV2,
				url = p.coreParam.postURL;
			param.ouin = g_Parent.g_iLoginUin;
			param.param = p.coreParam.param;
			param.reqref = "feeds";
			if (QZONE.ICFeeds.commonFN.getFeedVersion(p.coreParam.feedId) == 1) param.feedversion = 1;
			if (QZONE.ICFeeds.commonFN.isAuthUser(p.coreParam.feedId)) param.authuser = 1;
			for (var k in dataObj) param[k] = dataObj[k];
			p.tempCoreParam = p.coreParam;
			p.tempParam = param;
			p.tempParam.g_tk = QZONE.FP.getACSRFToken();
			var fs = new QZFL.FormSender(url, "post", param, p.coreParam.charset);
			fs.onSuccess = p.callBackSucc;
			fs.onError = p.callBackError;
			p.sending = true;
			fs.send();
			if (QZONE && QZONE.ICFeeds && QZONE.ICFeeds.PV && typeof QZONE.ICFeeds.PV.sendAct == "function") QZONE.ICFeeds.PV.sendAct("qz_reply_" + paramObj.appid)
		},
		resubmit: function(verify) {
			var p = QZONE.ICFeeds.ReplyV2;
			if (!p.tempParam) return false;
			if (!verify) return false;
			else p.tempParam.verify = verify;
			url = p.tempCoreParam.postURL;
			p.tempParam.g_tk = QZONE.FP.getACSRFToken();
			if (QZONE.ICFeeds.commonFN.isAuthUser(p.tempParam.fid)) p.tempParam.authuser = 1;
			var fs = new QZONE.FormSender(url, "post", p.tempParam, p.coreParam.charset);
			fs.onSuccess = p.callBackSucc;
			fs.onError = p.callBackError;
			fs.send()
		},
		callBackSucc: function(o) {
			var p = QZONE.ICFeeds.ReplyV2;
			p.sending = false;
			if (p.tempCoreParam != null) p.coreParam = p.tempCoreParam;
			o.feedId = p.coreParam.feedId;
			o.fexid = p.coreParam.fexid;
			if (o.err > 0 || o.ret != 0) {
				p.Interface.disableEditor();
				if (o.needVerify) if (QZONE.FP) QZONE.FP.showVerifyBox(o.needVerify - 1, p.resubmit);
				else try {
					g_Parent.QZONE.FrontPage.showVerifyBox(o.needVerify - 1, p.resubmit)
				} catch (e) {} else if (o.ret == 1002) {
					if (QZONE.FP) QZONE.FP.showLoginBox("moodComment");
					else try {
						g_Parent.QZONE.FrontPage.showLoginBox("moodComment")
					} catch (e) {}
					p.Interface.enableEditor()
				} else {
					p.Interface.enableEditor();
					try {
						g_Parent.QZONE.widget.msgbox.show(o.msg, 1, 2E3)
					} catch (e) {}
				}
			} else {
				if (QZONE.ICFeeds.commonFN.isAuthUser(o.feedId)) {
					QZONE.ICFeeds.ReplyV2.Interface.resetEditor();
					QZONE.ICFeeds.ReplyV2.Interface.show();
					QZONE.ICFeeds.ReplyV2.addCommentCount(o.feedId);
					g_Parent.QZONE.widget.msgbox.show("\u8bc4\u8bba\u6210\u529f", 4, 3E3);
					return
				}
				p.closeFeedReplyFn(o)
			}
		},
		callBackError: function(o) {
			var p = QZONE.ICFeeds.ReplyV2;
			p.sending = false;
			g_Parent.QZONE.widget.msgbox.show("\u5bf9\u4e0d\u8d77\uff0c\u7f51\u7edc\u51fa\u73b0\u95ee\u9898\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5", 1, 2E3);
			p.Interface.enableEditor()
		},
		addCommentCount: function(fid) {
			var cnt = 0,
				cnt2, feed = $(fid),
				btn = $e(".qz_btn_reply", feed).elements[0],
				t;
			if (btn && btn.firstChild) {
				cnt = btn.firstChild.innerHTML;
				t = cnt.match(/[^(]*\((\d+)\)/);
				if (t && t[1]) cnt = parseInt(t[1], 10) + 1;
				else cnt = 1;
				btn.firstChild.innerHTML = "\u8bc4\u8bba(" + cnt + ")"
			}
			var dom_cnt2 = $e(".qz_comment_count", feed).elements[0];
			if (dom_cnt2) {
				cnt2 = parseInt(dom_cnt2.innerHTML, 10);
				dom_cnt2.innerHTML = cnt2 + 1
			}
		},
		Interface: {
			disableEditor: function() {
				QZONE.MoodEditor.disableEditor()
			},
			enableEditor: function() {
				QZONE.MoodEditor.enableEditor()
			},
			resetEditor: function() {
				QZONE.ICFeeds.ReplyV2.clear();
				QZONE.MoodEditor.resetEditor()
			},
			submit: function(userInputData) {
				QZONE.ICFeeds.ReplyV2.submit(userInputData)
			},
			show: function() {
				QZONE.ICFeeds.ReplyV2.showEntry()
			},
			hide: function() {
				QZONE.ICFeeds.ReplyV2.hideEntry()
			}
		},
		clear: function() {
			var p = QZONE.ICFeeds.ReplyV2;
			p.tempCoreParam = null;
			p.tempParam = null
		},
		resetEditor: function() {
			QZONE.ICFeeds.ReplyV2.Interface.resetEditor()
		},
		closeFeedReplyFn: function(o) {
			if (typeof o.oprType != "undefined" && o.oprType == 3) {
				g_Parent.QZONE.widget.msgbox.show(o.msg, 1, 2E3);
				QZONE.ICFeeds.ReplyV2.Interface.resetEditor();
				return
			}
			function updateFeed(fexid, html, feedId) {
				QZONE.ICFeeds.ReplyV2.Interface.resetEditor();
				QZONE.ICFeeds.updateFeedExtend(fexid, html);
				QZONE.ICFeeds.reInitFeed(feedId)
			}
			var t, arr = o.feedId.split("_");
			if (o.newFeedXML && o.newFeedXML != "") QZONE.ICFeeds.FeedsTemp.Feeds.getHTML4XML(arr[2], arr[3], arr[6], o.newFeedXML, function(res) {
				updateFeed(o.fexid, res.summary, o.feedId)
			});
			else {
				t = o.newFeed;
				updateFeed(o.fexid, t, o.feedId)
			}
		}
	},
	Reply: {
		jsFinish: false,
		index: 0,
		BTNPool: {},
		cacheParam: {},
		triggerCommentsClick: function() {
			function getParam(el) {
				var F = QZONE.ICFeeds.commonFN,
					feedid = F.getFeedId(el),
					fexid = F.getFeedExtendNodeId(el),
					version = F.domData(el, "version"),
					btnstyle = 0;
				if (version) {
					var a = version.toString().split(".");
					if (a && a.length == 2) {
						btnstyle = a[1];
						version = a[0]
					}
				}
				var param = {
					feedId: feedid,
					appid: F.getAppId(feedid),
					postURL: F.domData(el, "action"),
					param: F.domData(el, "param"),
					charset: F.domData(el, "charset"),
					fexid: fexid,
					maxLength: F.domData(el, "maxLength") || 500,
					version: version,
					config: F.domData(el, "config"),
					btnstyle: btnstyle,
					tuin: F.domData(el, "tuin")
				};
				if (!QZONE.ICFeeds.Reply.BTNPool[feedid]) QZONE.ICFeeds.Reply.BTNPool[feedid] = param;
				return param
			}
			var tmp = '<div id="icReplyContent_{id}" class="bg2 mod_comment_post none">\t\t\t\t\t<div class="mod_comment_textarea">\t\t\t\t\t\t<input id="icReplyInput_{id}" class="textinput c_tx2" type="input">\t\t\t\t\t</div>\t\t\t\t\t<p class="mod_comment_option">\t\t\t\t\t\t<span class="mod_comment_sub">\t\t\t\t\t\t\t<button class="replySubmit gb_bt gb_bt2" type="button" id="icReplySubmit_{id}">\t\t\t\t\t\t\t\t\u786e\u5b9a\t\t\t\t\t\t\t</button>\t\t\t\t\t\t\t<a class="c_tx3 replyCancel" href="javascript:;" id="icReplyCancel_{id}">\u53d6\u6d88</a>\t\t\t\t\t\t</span>\t\t\t\t\t</p>\t\t\t\t</div>';

			function openCommentInput(elem) {
				var F = QZONE.ICFeeds.commonFN;
				var link = F.domData(elem, "link"),
					more = F.domData(elem, "role"),
					feedid = F.getFeedId(elem),
					paramElement = elem;
				if (link) if (more);
				var inputEntry = QZFL.dom.getElementsByClassName("comment_default_inputentry", "div", $(feedid));
				if (inputEntry && inputEntry.length == 1) {
					var inputElem = inputEntry[0];
					if (!F.domData(inputElem, "inited")) {
						inputElem.innerHTML = format(tmp, {
							id: feedid
						});
						inputElem.id = "icReplyBTN_" + feedid;
						F.domData(inputElem, "inited", 1)
					}
					if (link) paramElement = inputElem
				}
				QZONE.ICFeeds.Reply._clickReply(getParam(paramElement), elem)
			}
			function commit(elem) {
				var F = QZONE.ICFeeds.commonFN;
				var feedid = F.getFeedId(elem);
				var inputEntry = QZFL.dom.getElementsByClassName("comment_default_inputentry", "div", $(feedid));
				if (inputEntry && inputEntry.length == 1) {
					var param = getParam(inputEntry[0]);
					QZONE.ICFeeds.Reply._clickReply(param, elem)
				}
			}
			return function(elem, cmdType) {
				if (!cmdType) openCommentInput(elem);
				else if (cmdType == "replySubmit") commit(elem);
				else if (cmdType == "replyCancel") commit(elem)
			}
		}(),
		init: function(id, dom) {
			var cfn = QZONE.ICFeeds.commonFN,
				_d = cfn.getDom(id, dom),
				paramObj, l = QZFL.dom.getElementsByTagNameNS(_d, "qz", "reply");
			for (var i = l.length - 1; i >= 0; --i) {
				var fid = cfn.getFeedId(l[i]),
					fexid = cfn.getFeedExtendNodeId(l[i]),
					aNode, appid = cfn.getAppId(fid),
					feedversion = cfn.getFeedVersion(fid);
				var defaultText = "\u6211\u4e5f\u8bf4\u4e00\u53e5...",
					action = l[i].getAttribute("action"),
					param = l[i].getAttribute("param"),
					type = l[i].getAttribute("type"),
					charset = l[i].getAttribute("charset"),
					maxLength = l[i].getAttribute("maxLength"),
					version = l[i].getAttribute("version"),
					btnstyle = 0,
					title = l[i].getAttribute("title"),
					link = type == "link",
					tuin = l[i].getAttribute("tuin"),
					config = l[i].getAttribute("config"),
					name = l[i].getAttribute("name"),
					lengthMode = l[i].getAttribute("lengthMode"),
					des = title ? title : defaultText;
				if (!tuin) tuin = 0;
				if (link) version = 6.2;
				if (title);
				if (version) {
					var a = version.toString().split(".");
					if (a.length == 2) {
						btnstyle = a[1];
						version = a[0]
					} else btnstyle = 0
				}
				paramObj = {
					"feedId": fid,
					"appid": appid,
					"postURL": action,
					"param": param,
					"type": type,
					"charset": charset,
					"fexid": fexid,
					"maxLength": maxLength,
					"version": version,
					"config": config,
					"btnstyle": btnstyle,
					"lengthMode": lengthMode,
					"tuin": tuin
				};
				var isNew = !! (l[i].parentNode.className.indexOf("feeds_comment") >= 0);
				var tmp;
				if (!version || version == 6 && (btnstyle == "2" || btnstyle == "3" || btnstyle == "4" || btnstyle == "5")) {
					aNode = document.createElement("A");
					aNode.className = "c_tx";
					aNode.setAttribute("alt", "replybtn");
					if (trim(l[i].innerHTML) == "\u56de\u590d") aNode.innerHTML = "\u56de\u590d";
					else aNode.innerHTML = "\u8bc4\u8bba"
				} else if (version == 6 && btnstyle != "1") {
					aNode = document.createElement("DIV");
					aNode.className = "mod_commnets_poster bg2";
					tmp = '<div id="icReplyContent_{id}" class="bg2 mod_comment_post none">\t\t\t\t\t\t\t\t<div class="mod_comment_textarea">\t\t\t\t\t\t\t\t\t<input id="icReplyInput_{id}" class="textinput c_tx2" type="input">\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<p class="mod_comment_option">\t\t\t\t\t\t\t\t\t<span class="mod_comment_sub">\t\t\t\t\t\t\t\t\t\t<button class="gb_bt gb_bt2" type="button" id="icReplySubmit_{id}">\u786e\u5b9a</button>\t\t\t\t\t\t\t\t\t\t<a class="c_tx3" href="javascript:;" id="icReplyCancel_{id}">\u53d6\u6d88</a>\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t</p>\t\t\t\t\t\t\t</div>';
					aNode.innerHTML = format(tmp, {
						id: fid
					});
					aNode.id = "icReplyBTN_" + fid;
					QZONE.ICFeeds.Reply.BTNPool[aNode.id] = paramObj
				} else {
					aNode = document.createElement("DIV");
					aNode.className = isNew ? "feeds_reply_mode" : "feeds_reply";
					tmp = '<div class="feeds_reply_index" id="__id__"><p class="reply_link"><a class="c_tx" alt="replybtn" style="cursor:pointer">\u56de\u590d</a></p></div>';
					aNode.innerHTML = tmp.replace("__id__", "fr" + fid)
				}
				paramObj.aNode = aNode;
				if (fid) {
					aNode.href = "javascript:;";
					name && aNode.setAttribute("name", name);
					if (link) aNode.onclick = function() {
						QZONE.ICFeeds.Reply.click();
						return false
					};
					else aNode.onclick = function(a) {
						return function() {
							if (a.aNode.innerHTML == "\u56de\u590d" || a.aNode.innerHTML == "\u8bc4\u8bba") QZONE.ICFeeds.Reply.cacheParam[a.feedId] = a.param;
							QZONE.ICFeeds.Reply._clickReply(a);
							return false
						}
					}(paramObj);
					l[i].parentNode.replaceChild(aNode, l[i])
				} else l[i].style.display = "none"
			}
			aNode = null
		},
		click: function(feedId) {
			var e = QZFL.event.getTarget(),
				fid = feedId || QZONE.ICFeeds.commonFN.getFeedId(e);
			if (!fid) return;
			var id = "icReplyBTN_" + fid;
			var p = QZONE.ICFeeds.Reply,
				pool = p.BTNPool[id];
			if (!pool) return;
			p._clickReply.apply(QZONE.ICFeeds.Reply, [pool, pool.aNode || e])
		},
		_clickReply: function(paramObj, eventObj) {
			var e = eventObj || QZFL.event.getTarget(),
				a = Array.prototype.slice.call(arguments),
				feedId = paramObj.feedId,
				appid = paramObj.appid,
				p = QZONE.ICFeeds.ReplyV2,
				p2 = QZONE.ICFeeds.Reply,
				feedversion = QZONE.ICFeeds.commonFN.getFeedVersion(feedId);
			a[a.length] = e;
			if (feedversion == 1) {
				p._clickReply.apply(p, a);
				return
			}
			if (appid == "311" || appid == "216" || appid == "202") {
				p._clickReply.apply(p, a);
				return
			}
			if (p2.jsFinish) p2._reply.apply(p2, a);
			else {
				var _l = new QZFL.JsLoader;
				_l.onload = function() {
					p2.jsFinish = true;
					p2._reply(paramObj, e)
				};
				_l.load("http://" + g_imgd + "/qzone/v5/owner2/feedreply_v2.1.js", document, "utf-8")
			}
		},
		_reply: function(paramObj, eventObj) {
			if (!FeedReplyV6) return;
			var e = eventObj || QZFL.event.getTarget();
			if (e.className.indexOf("feeds_reply_mode") >= 0);
			else if (e.getAttribute("tagName") == "A" && e.id == "feedReplayCancel6" || e.getAttribute("alt") != "replybtn") return;
			var coreParams = paramObj,
				_c = new StringBuilder,
				tmp, version, feedId, btnstyle;
			tmp = coreParams.srctarget = e;
			feedId = paramObj.feedId;
			btnstyle = paramObj.btnstyle;
			version = coreParams.version || 5;
			if (FeedReplyV6.inEdit) if (!confirm("\u60a8\u786e\u8ba4\u8981\u653e\u5f03\u6b63\u5728\u7f16\u8f91\u7684\u56de\u590d\u5417\uff1f")) {
				try {
					$("feedReplyEditor" + FeedReplyV6.version.toString()).focus()
				} catch (ex) {}
				return
			} else {
				FeedReplyV6.hideEditor();
				try {} catch (ex) {}
			}
			if (version == 6) {
				if (!FeedReplyV6.initialized || !$("divFeedReplyEditor" + version)) {
					FeedReplyV6.version = version;
					FeedReplyV6.initialize(coreParams)
				} else if (FeedReplyV6.coreParam.feedId == feedId) return;
				var targetContainer = null;
				if (tmp.className.indexOf("feeds_reply_mode") >= 0) targetContainer = tmp;
				else if (btnstyle == 2) targetContainer = tmp.parentNode.parentNode;
				else if (btnstyle == 3) targetContainer = tmp.parentNode;
				else targetContainer = tmp.parentNode.parentNode.parentNode;
				FeedReplyV6.resetTarget(targetContainer, coreParams);
				if (!FeedReplyV6.inEdit && !FeedReplyV6.Cross) {
					FeedReplyV6.Cross = false;
					if (btnstyle != 2 && btnstyle != 3) if (tmp.className.indexOf("feeds_reply_mode") < 0) tmp.parentNode.parentNode.style.display = "none"
				}
				QZFL.event.preventDefault();
				return false
			}
		}
	},
	Delete: {
		init: function(id, dom) {
			var _d = QZONE.ICFeeds.commonFN.getDom(id, dom);
			var l = QZFL.dom.getElementsByTagNameNS(_d, "qz", "delete");
			for (var i = l.length - 1; i >= 0; --i) {
				var fid = QZONE.ICFeeds.commonFN.getFeedId(l[i]);
				var aNode = document.createElement("A");
				aNode.className = "c_tx";
				aNode.innerHTML = trim(l[i].innerHTML);
				var param = l[i].getAttribute("param");
				var url = l[i].getAttribute("action");
				var title = l[i].getAttribute("title");
				if (fid) {
					aNode.href = "javascript:;";
					aNode.onclick = function(a, b, c, d, f) {
						return function() {
							QZONE.ICFeeds.Delete._delete(a, b, c, d, f);
							return false
						}
					}(fid, url, param, title, aNode);
					l[i].parentNode.replaceChild(aNode, l[i])
				} else l[i].style.display = "none"
			}
			aNode = null
		},
		_delete: function(feedId, url, p, title, nodeBtn) {
			var _m = title ? title : "\u5220\u9664\u6b64\u6761\u4fe1\u606f\u7684\u540c\u65f6\uff0c\u4e5f\u5c06\u5220\u9664\u539f\u8bc4\u8bba\u6216\u7559\u8a00\u3002\n\u662f\u5426\u786e\u8ba4\u5220\u9664\uff1f";
			var b = g_Parent;
			var _c = new b.QZFL.widget.Confirm("\u5220\u9664\u786e\u8ba4", "<div style='line-height:20px;text-align:center'>" + _m + "</div>", b.QZFL.widget.Confirm.TYPE.OK_NO);

			function getParentLi(el) {
				var r = /^qz_comment/;
				while (!r.test(el.className)) {
					el = el.parentNode;
					if (!el || el.tagName == "BODY") return null
				}
				return el
			}
			function renderFeeds(feedId, o) {
				var temp = $(feedId),
					extNode = $e(".ifeeds_list_extend,.icenter_list_extend,.qz_summary", temp),
					t, arr;
				if (extNode.elements.length == 0) {
					try {
						QZONE.console("\u8bc4\u8bba\u5220\u9664\u6210\u529f\u8fd4\u56de\uff0c\u8868\u73b0\u5220\u9664\u65f6\u51fa\u73b0\u5f02\u5e38")
					} catch (e) {}
					return
				}
				extNode = extNode.elements[0];
				if (o.newFeedXML && o.newFeedXML != "") {
					arr = feedId.split("_");
					if (/^\s*<qz_metadata>/.test(o.newFeedXML) || !/^\s*</.test(o.newFeedXML)) {
						var div = document.createElement("div");
						div.innerHTML = o.newFeedXML;
						var qz_summary = $e(".ifeeds_list_extend,.icenter_list_extend,.qz_summary", div);
						QZFL.dom.swapNode(extNode, qz_summary);
						QZONE.ICFeeds.QZ.init();
						if (QZONE.namecard) QZONE.namecard.init(qz_summary, {
							inOFP: true
						})
					} else t = QZONE.ICFeeds.FeedsTemp.Feeds.getHTML4XML(arr[2], arr[3], arr[6], o.newFeedXML, function(res) {
						extNode.innerHTML = res.summary;
						QZONE.ICFeeds.QZ.init();
						if (QZONE.namecard) QZONE.namecard.init(extNode, {
							inOFP: true
						})
					})
				} else {
					t = o.newFeed;
					extNode.innerHTML = t;
					QZONE.ICFeeds.QZ.init();
					if (QZONE.namecard) QZONE.namecard.init(extNode, {
						inOFP: true
					})
				}
			}
			_c.onConfirm = function() {
				var u, funcSucc, funcSuccV2, funcFail, ver, param = {};
				param.ouin = g_Parent.g_iLoginUin;
				param.param = p;
				param.reqref = "feeds";
				param.feedversion = ver = QZONE.ICFeeds.commonFN.getFeedVersion(feedId);
				funcSucc = function(o) {
					if (o.err == 1 || o.ret == 1) g_Parent.QZFL.widget.msgbox.show(o.msg, 1, 4E3, 300);
					else if (o.oprType == 1) {
						var temp = $(feedId);
						if (temp) {
							var list = temp.parentNode.getElementsByTagName("LI"),
								_c = 0;
							for (var i = 0, len = list.length; i < len; i++) if (list[i].className.indexOf("ifeeds_list") >= 0) _c++;
							if (_c == 1) QZFL.dom.removeElement($(feedId).parentNode.parentNode);
							else QZFL.dom.removeElement($(feedId))
						}
					} else if (o.oprType == 2) renderFeeds(feedId, o)
				};
				funcSuccV2 = function(o) {
					if (o.err == 1 || o.ret == 1) g_Parent.QZFL.widget.msgbox.show(o.msg, 1, 4E3, 300);
					else if (o.oprType == 1) {
						var temp = $(feedId),
							li = getParentLi(nodeBtn);
						if (li) QZFL.dom.removeElement(li);
						if ($e(".qz_comment_li, .qz_comment_sub_li", temp).elements.length == 0) $e(temp).getParent().getParent().remove()
					} else if (o.oprType == 2) renderFeeds(feedId, o)
				};
				funcFail = function() {
					g_Parent.QZFL.widget.msgbox.show("\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002", 1, 4E3)
				};
				var fs = new QZFL.FormSender(url, "post", param);
				fs.onSuccess = ver ? funcSuccV2 : funcSucc;
				fs.onError = funcFail;
				fs.send()
			};
			_c.show()
		}
	},
	Remark: {
		_queue: [],
		_getData: function(dom, opts) {
			var p = QZONE.ICFeeds.Remark;
			p._queue.push(dom);
			QZONE.FrontPage.getRemarkList(function(o) {
				p._callback(o, opts)
			})
		},
		init: function(dom, opts) {
			var dom = dom || $("ifeedsContainer") || $("container");
			var o = ENV.get("Friend_Remarks"),
				p = QZONE.ICFeeds.Remark;
			if (!o) p._getData(dom, opts);
			else p._makePresent(dom, o, opts)
		},
		_callback: function(o, opts) {
			var _e = ENV.get("Friend_Remarks");
			if (!_e) ENV.set("Friend_Remarks", o);
			var d, p = QZONE.ICFeeds.Remark;
			while (p._queue.length > 0) {
				d = p._queue.shift();
				if (d) QZONE.ICFeeds.Remark._makePresent(d, o, opts)
			}
		},
		_makePresent: function(dom, o, opts) {
			var _d = dom;
			var r, els;
			els = QZFL.dom.getElementsByClassName("q_des", "a", _d);
			var uin, re = /.*des_(\d{5,10}).*/,
				tmp;
			for (var i = 0; i < els.length; i++) if (tmp = re.exec(els[i].getAttribute("link"))) {
				uin = parseInt(tmp[1], 10);
				if (uin == g_iLoginUin) continue;
				r = o[uin];
				if (r && trim(r) != "") {
					if (opts && opts.maxLength > 0) r = QZFL.string.cut(r, opts.maxLength);
					els[i].innerHTML = escHTML(r);
					QZFL.css.addClassName(els[i], "c_tx")
				}
			}
		}
	},
	Time: {
		init: function(id, dom) {
			var _d = QZONE.ICFeeds.commonFN.getDom(id, dom),
				l = QZFL.dom.getElementsByClassName("f_item", "div", _d),
				p = QZONE.ICFeeds.Time,
				time, qztime, opr, nodetime, pool = QZONE.ICFeeds.FeedsTemp.Accessory.infoPool,
				data, f;
			for (var i = l.length - 1; i >= 0; --i) {
				qztime = QZFL.dom.getElementsByTagNameNS(l[i], "qz", "time");
				if (qztime && (qztime = qztime[0])) {
					time = qztime.getAttribute("abstime");
					if (!time && pool[QZONE.ICFeeds.commonFN.getFeedId(l[i])]) time = pool[QZONE.ICFeeds.commonFN.getFeedId(l[i])].abstime;
					time && (qztime.innerHTML = p.getTime(time))
				} else {
					data = pool[QZONE.ICFeeds.commonFN.getFeedId(l[i])];
					f = QZFL.dom.getElementsByClassName("feeds_tp_operate", "*", l[i]);
					if (f.length) {
						opr = f[0].firstChild;
						if (opr && data) {
							nodetime = document.createElement("span");
							nodetime.className = "qz_time c_tx3 mr8";
							nodetime.innerHTML = p.getTime(data.abstime);
							opr.parentNode.insertBefore(nodetime, opr)
						}
					}
				}
			}
		},
		getTime: function(time) {
			var tmp, _t, td = new Date,
				nowt = new Date,
				d = 3600 * 24 * 1E3,
				fix8 = 3600 * 8 * 1E3;
			var _nt = g_Parent.g_NowTime * 1E3,
				_t = time * 1E3;
			nowt.setTime(_nt);
			td.setTime(time * 1E3);
			_t = Math.floor((_nt + fix8) / d - Math.floor((_t + fix8) / d));
			if (_t < 1) tmp = timeFormatString(td, " {h}:{m}");
			else if (_t < 2) tmp = "\u6628\u5929" + timeFormatString(td, " {h}:{m}");
			else if (_t < 3) tmp = "\u524d\u5929" + timeFormatString(td, " {h}:{m}");
			else tmp = timeFormatString(td, "{M: }\u6708{d: }\u65e5").replace(/\s/g, "") + timeFormatString(td, " {h}:{m}");
			return tmp
		}
	},
	FeedsTemp: {
		init: function() {
			var getMoreFeeds = $("getMoreFeeds");
			QZFL.event.addEvent(getMoreFeeds, "click", function() {
				QZONE.ICFeeds.FeedsGetter.getMoreFeeds();
				QZFL.event.preventDefault()
			});
			if (!G_Param.hasMoreFeeds) QZFL.dom.setStyle(getMoreFeeds, "display", "none")
		},
		Feeds: {
			getHTML: function(data, temp, isArray, viewType) {
				for (var i = data.length; i--;) if (data[i] && data[i].appid == "340") data.splice(i, 1);
				var resultArr = [],
					viewType = typeof viewType != "undefined" ? viewType : G_Param["view"];
				if (viewType == 0) {
					var _arr = [],
						lastUin;
					for (var i = 0, len = data.length; i < len; i++) if (data[i]) {
						_arr.push(data[i]);
						if (data[i + 1] && data[i].ouin != data[i + 1].ouin) {
							resultArr.push(this._getHTML(_arr, temp, isArray, viewType));
							_arr = []
						} else if (!data[i + 1]) {
							resultArr.push(this._getHTML(_arr, temp, isArray, viewType));
							_arr = []
						}
					}
					if (isArray) return resultArr;
					else return resultArr.join("")
				} else return this._getHTML(data, temp, isArray, viewType)
			},
			_getIsIfFriendMap: function(uins, isFriendFlags) {
				var fmap = {};
				if (uins && isFriendFlags && uins.length && isFriendFlags.length && uins.length == isFriendFlags.length) for (var i = 0, l = uins.length; i < l; i++) fmap[uins[i]] = isFriendFlags[i];
				return fmap
			},
			_isFamousSpace: function(flag) {
				return flag && flag.split("_")[0] == 1
			},
			_getHTML: function(data, temp, isArray, viewType, isExtend) {
				var o, r, h, k, _h, t, _arr = [],
					ftmp, lastUin, _hh, isFirst = true,
					len = data.length,
					viewType = typeof viewType != "undefined" ? viewType : G_Param["view"],
					emText = '<img src="http://' + siDomain + '/qzone/em/e$1.gif" />',
					ptmp;
				for (var i = 0; i < len; i++) {
					o = data[i];
					if (!o) continue;
					var fid = ["feed", o.ouin, o.appid, o.typeid, o.abstime, o.feedno, o.scope, o.ver].join("_");
					if (o["hotkey"] && o["commentlist"]) {
						QZONE.ICFeeds.HotFeed.commentList[fid] = o["commentlist"];
						QZONE.ICFeeds.HotFeed.hotkeyList[fid] = o["hotkey"]
					}
					if (!isExtend || QZONE.ICFeeds.FeedsTemp.Feeds._isFamousSpace(o.otherflag) && viewType == 1) if (viewType == 0 && isFirst || viewType == 1) {
						_hh = tmp_begin.replace(/\<\%(\w+)\%\>/g, function(a, b) {
							if (b == "nickname") return escHTML(o[b]);
							return o[b]
						});
						_arr.push(_hh);
						isFirst && (isFirst = false)
					}
					_h = temp;
					_h = _h.replace(/\<\%(\w+)\%\>/g, function(a, b) {
						if ((o.appid == 311 || o.appid == 217) && b == "title") o[b] = QZONE.ICFeeds.FeedsTemp.Feeds.replaceEM(o[b], true);
						if (b == "lastFeedBor") {
							if (viewType == 1 && o.moreflag) return o.moreflag ? "bor3" : o[b] == "ifeeds_nobor" ? "f_item_noborder" : "bor3";
							if (viewType == 1) return "f_item_noborder";
							else return o.moreflag ? "bor3" : o[b] == "ifeeds_nobor" ? "f_item_noborder" : "bor3"
						} else if (b == "famouslogo") if (o.otherflag && o.otherflag.split("_")[0] == 1) return '<a target="_blank" href="http://page.opensns.qq.com" ><img style="vertical-align: -2px;" src="/ac/qzone_v5/client/auth_icon.png" title="\u817e\u8baf\u8ba4\u8bc1" alt="\u817e\u8baf\u8ba4\u8bc1" /></a>';
						else if (o.type != "campus" && o.otherflag && o.otherflag.split("_")[5] == 1 || o.ouin == g_Parent.g_iLoginUin && 2 & g_Parent.g_LoginBitmap.charAt(0) - 0) return '<img style="vertical-align: -2px;" src="/qzone_v6/slice/ico_realname_16x16.png" title="\u5b9e\u540d\u8ba4\u8bc1" alt="\u5b9e\u540d\u8ba4\u8bc1" />';
						else return "";
						else {
							if (b == "nickname") return escHTML(o[b]);
							return o[b]
						}
					});
					if (o.appid == 2 || o.appid == 4 || o.appid == 334 || o.appid == 311 || o.appid == 202) {
						_h = QZONE.ICFeeds.FeedsTemp.Feeds.replaceEM(_h);
						if (o.appid == 2 || o.appid == 311) if (QZONE.FP && typeof QZONE.FP.replaceIconTag == "function") _h = QZONE.FP.replaceIconTag(_h)
					}
					_arr.push(_h);
					if (!isExtend || QZONE.ICFeeds.FeedsTemp.Feeds._isFamousSpace(o.otherflag) && viewType == 1) if (viewType == 1) {
						if (QZONE.ICFeeds.FeedsTemp.Feeds._isFamousSpace(o.otherflag) && !! o.moreflag) {
							ptmp = o.moreflag.split("|");
							_arr.push('<div class="f_item f_item_noborder" id=' + fid + "_btn" + '><p><a href="javascript:void(0);" class="c_tx" onclick="QZONE.ICController.FeedsGetter.getSingleFeed(\'' + fid + "','" + o.moreflag + "',null,'" + 1 + "');return false;\">\u5c55\u5f00\u66f4\u591a" + ptmp[0] + "\u6761\u52a8\u6001\u2193</a></p></div>")
						}
						_arr.push(tmp_end)
					}
					if (t = QZONE.ICFeeds.FeedsTemp.Accessory) {
						if (o.unread) t.infoPool[fid + "_unread"] || (t.infoPool[fid + "_unread"] = {
							unread: 1
						});
						if (o.key) t.infoPool[fid] = {
							ver: o.ver - 0,
							key: o.key,
							appid: o.appid - 0,
							typeid: o.typeid - 0,
							ouin: o.ouin - 0,
							scope: o.scope - 0,
							abstime: o.abstime,
							otherflag: o.otherflag
						};
						if (o.sameuser) t.infoPool[fid + "_sameuser"] = {
							ver: o.ver - 0,
							key: o.key,
							uins: o.sameuser.list,
							ifuins: QZONE.ICFeeds.FeedsTemp.Feeds._getIsIfFriendMap(o.uperlist, o.uper_isfriend),
							cnt: o.sameuser.num - 0,
							appid: o.appid - 0,
							typeid: o.typeid - 0,
							ouin: o.uin - 0
						}
					}
					if (!isExtend && viewType == 0 && o.moreflag) {
						ptmp = o.moreflag.split("|");
						_arr.push('<div class="f_item f_item_noborder" id=' + fid + "_btn" + '><p><a href="javascript:void(0);" class="c_tx" onclick="QZONE.ICController.FeedsGetter.getSingleFeed(\'' + fid + "','" + o.moreflag + "');return false;\">\u5c55\u5f00\u66f4\u591a" + ptmp[0] + "\u6761\u52a8\u6001\u2193</a></p></div>");
						break
					}
				}
				if (viewType == 0) {
					_arr.push(tmp_end);
					return _arr.join("")
				}
				if (isArray) return _arr;
				else return _arr.join("")
			},
			getHTML4XML: function(appid, typeid, flag, xmlData, callback, feedId) {
				if (flag == 2) flag = 0;
				if (feedId) var feedsflag = QZONE.ICFeeds.commonFN.getFeedFrameData(feedId, "feedsflag") || "";
				var url = "http://" + (g_Ic_Domain || "ic2.qzone.qq.com") + "/cgi-bin/feeds/feeds_html_reply",
					param = {
						uin: g_Parent.g_iLoginUin,
						appid: appid,
						typeid: typeid,
						flag: flag,
						xml: xmlData,
						max_comment_count: 10,
						g_tk: QZFL.pluginsDefine && QZFL.pluginsDefine.getACSRFToken(),
						feedsflag: feedsflag
					},
					sender = new QZFL.FormSender(url, "post", param, "GB2312");
				sender.onSuccess = function(result) {
					var newflag = typeof result.code != "undefined" ? true : false,
						sucflag = false,
						data = {};
					if (newflag) {
						if (result && result.code == 0) sucflag = true;
						var _summary;
						if (result.data.html) {
							QZFL.dom.createElementIn("div", document.body, false, {
								id: "wupfeedsTogetSummary",
								style: "display:none"
							});
							var _ele = $("wupfeedsTogetSummary");
							_ele.innerHTML = result.data.html;
							_summary = $e(".wupfeed", _ele).elements[0].outerHTML + "";
							QZFL.dom.removeElement(_ele)
						}
						data.summary = result.data.summary || _summary;
						data.title = result.data.title;
						data.code = result.code;
						data.html = result.data.html
					} else {
						if (result && result.ret == 0) sucflag = true;
						data.summary = result.summary;
						data.title = result.title;
						data.code = result.ret;
						data.html = result.html
					}
					if (sucflag) {
						if (appid == 2 || appid == 4 || appid == 334 || appid == 311) {
							data.summary = QZONE.ICFeeds.FeedsTemp.Feeds.replaceEM(data.summary);
							if (appid == 2 || appid == 311) if (QZONE.FP && typeof QZONE.FP.replaceIconTag == "function") data.summary = QZONE.FP.replaceIconTag(data.summary);
							if (data.title) data.title = QZONE.ICFeeds.FeedsTemp.Feeds.replaceEM(data.title)
						}
						callback && callback({
							ret: data.code,
							summary: data.summary,
							title: data.title,
							html: data.html
						})
					} else;
				};
				sender.onError = function() {};
				sender.send()
			},
			findTemp: function(appid, typeid, flag, map) {
				if (parseInt(flag, 10) > 1) flag = 0;
				var label = "A" + appid + "T" + typeid + "F" + flag,
					area = tmplPool[map],
					t = tmplPool.dictionary[label + "_" + map];
				if (area && t) return area[t];
				else return ""
			},
			deepColor: null,
			checkIsDeepColor: function() {
				var d = $("QzoneDeepColorDom"),
					c, _a, grayLevel;
				if (!d) {
					d = document.createElement("DIV");
					d.id = "QzoneDeepColorDom";
					d.className = "bg";
					d.style.display = "none";
					document.body.appendChild(d)
				}
				c = QZFL.dom.getStyle(d, "backgroundColor");
				if (!c) c = "#FFFFFF";
				else if (c.indexOf("rgb") >= 0) {
					c = c.slice(4, c.length - 1);
					_a = c.split(",", 3)
				} else _a = QZFL.css.convertHexColor(c);
				if (_a && _a.length == 3) {
					grayLevel = _a[0] * 0.299 + _a[1] * 0.587 + _a[2] * 0.114;
					return grayLevel < 192
				} else return false
			},
			replaceEM: function(html, replaceInLink) {
				var exp = /\[em\]e(\d+)\[\/em\]/g,
					tmplExp = replaceInLink ? />[^>]+</g : />[^>]+<(?!\/a>)/g;
				html = html.replace(tmplExp, function(a, b) {
					return a.replace(exp, function(a, b) {
						var _th = QZONE.ICFeeds.FeedsTemp.Feeds,
							flag = b >= 300 && b <= 700 || b >= 2E3,
							prefix = b >= 2E3 ? "v" : "";
						if (flag) {
							if (_th.deepColor === null) _th.deepColor = _th.checkIsDeepColor();
							if (_th.deepColor) b += "_b"
						}
						return '<img src="http://' + g_Parent.siDomain + "/qzone/em/" + prefix + "e" + b + '.gif"' + " />"
					})
				}).replace(/\n/g, "<br/>");
				return html
			}
		},
		Accessory: {
			infoPool: {}
		},
		User: {
			init: function(id, dom) {
				var _d = QZONE.ICFeeds.commonFN.getDom(id, dom),
					ispengyou = G_Param["scene"] == 1;
				if (QFM.cookie.get("speed") == 1) var tmp = "";
				else var tmp = '<span class="skin_portrait_round"></span>' + '<img src="{logimg}" alt="{nickname}\u7684\u5934\u50cf"/>';
				var vipTmp = '<a class="f_user_vip" href="http://vip.qzone.com?login=qq" style="cursor:pointer" target="_blank" title="\u70b9\u51fb\u67e5\u770b\u9ec4\u94bb\u7279\u6743\u8be6\u60c5"><strong class="gb_lv_icon"><span class="lv{level}"><span class="gb_vip_none">lv{level}</span></span></strong></a>',
					remarkTmp = ['<a  target="_blank" href="http://qz.qq.com/{ouin}/home" class="icenter_remarks" uin="{ouin}"></a>', '<span class="icenter_remarks" uin="{ouin}"></span>'],
					groupTmp = '<a href="javascript:void(0);" onclick="QZONE.FP.toApp(\'/myhome/friendfeeds\');return false;" class="c_tx3 unline remark q_group" link="group_{uin}"></a>';
				var a, _o = {},
					l = QZFL.dom.getElementsByTagNameNS(_d, "qz", "user"),
					_d, _h, _data, userHome, logimg, namecardLink, info_user_name, nickname, vip = "",
					vipArr = [],
					type, uin, remark, param, _tmp, group, g, otherflag;
				l = QZONE.ICFeeds.commonFN.toArray(l);
				for (var i = 0, len = l.length; i < len; i++) {
					if (!l[i]) continue;
					param = l[i].getAttribute("param");
					if (!param) continue;
					a = param.split("|");
					userHome = a[0];
					logimg = this.getUserIcon(a[8]);
					namecardLink = a[2];
					info_user_name = a[3];
					nickname = escHTML(l[i].getAttribute("nick"));
					vip = a[5];
					vipArr = vip.split("_");
					vip = vipArr[0];
					type = a[6];
					uin = a[7];
					ouin = a[8];
					otherflag = a[9] || "";
					if (type != "campus" && vip == "vip" && vipArr[1] >= 1 && !ispengyou) {
						_data = {
							"ouin": ouin,
							"level": vipArr[1]
						};
						vip = format(vipTmp, _data)
					} else if (ispengyou) {
						var of = uin == g_Parent.g_iLoginUin ? 0 : otherflag.split("_")[3] || 0,
							oft = {
								"0": "",
								1: '<div class="xiaoyou_friend"><a title="\u70b9\u51fb\u52a0\u4e3a\u670b\u53cb\u7f51\u597d\u53cb" onclick="top.QZONE&&top.QZONE.FrontPage&&top.QZONE.FrontPage.XY&&top.QZONE.FrontPage.XY.invite(' + ouin + ",'" + nickname + '\');return false;" href="javascript:;" class="add"></a></div>',
								2: '<div class="xiaoyou_friend"><a title="\u70b9\u51fb\u52a0\u4e3a\u670b\u53cb\u7f51\u597d\u53cb" onclick="top.QZONE&&top.QZONE.FrontPage&&top.QZONE.FrontPage.XY&&top.QZONE.FrontPage.XY.addFriend(' + ouin + ",'" + nickname + '\');return false;" href="javascript:;" class="add"></a></div>',
								3: '<div class="xiaoyou_friend"><span class="added" title="\u793e\u533a\u597d\u53cb">\u793e\u533a\u597d\u53cb</span></div>'
							};
						vip = oft[of]
					} else vip = "";
					if (type == "campus" || type == "bailing") {
						remark = "";
						logimg = a[1]
					} else {
						_data = {
							"ouin": ouin
						};
						remark = format(remarkTmp[G_Param["view"]], _data)
					}
					_data = {
						"logimg": logimg,
						"info_user_name": info_user_name,
						"nickname": nickname,
						"vip": vip,
						"remark": remark
					};
					_h = format(tmp, _data);
					if (l[i].parentNode && l[i].parentNode.className.indexOf("f_aside imgBlock_img") == 0) {
						var div = document.createElement("div"),
							div2;
						div.className = "f_user_head";
						_tmp = document.createElement("a");
						_tmp.setAttribute("href", userHome);
						_tmp.setAttribute("target", "_blank");
						_tmp.className = "q_namecard f_user_avatar";
						_tmp.setAttribute("link", "nameCard_" + ouin);
						var hatclick = function(uin) {
								return function(e) {
									var e = e || event;
									var el = e.target || e.srcElement;
									if (el.className == "skin_portrait_hat") {
										if (e.preventDefault) e.preventDefault();
										e.returnValue = false;
										if (g_Parent.QZONE.FrontPage.getVipStatus()) {
											var _qom = g_Parent.QOM;
											if (_qom && _qom.taskSystem && _qom.taskSystem.systemState && _qom.taskSystem.systemState["hasInit"]) _qom.taskSystem.showTaskInfo("1048", 0, 1);
											else g_Parent.QZONE.FrontPage.toApp("/myhome/tasks?method=show&taskid=1048")
										} else g_Parent.QZONE.FrontPage.popupDialog("\u611a\u4eba\u8282\u6d3b\u52a8", {
											src: "/qzone/v5/fragment/act_fool_popup.html"
										}, 520, 300, false);
										return false
									}
								}
							}(uin);
						if (otherflag.split("_")[2] == "1") _h = _h.replace(/(<span[^>]*>[\s\S]*<\/span>)/, '$1<b class="skin_like"></b>');
						if (otherflag.split("_")[1] == "1") {
							_h = _h.replace(/(<span[^>]*>[\s\S]*<\/span>)/, '$1<span onclick="" title="\u53c2\u4e0e\u9ec4\u94bb\u4efb\u52a1\uff0c\u83b7\u5f97\u611a\u4eba\u8282\u5c0f\u4e11\u5934\u50cf\uff01" class="skin_portrait_hat"></span>');
							_tmp.onclick = hatclick
						}
						if (uin == g_Parent.g_iLoginUin && g_Parent["festival_" + uin]) {
							if (!g_Parent["festivalLoaded"]) g_Parent["festivalLoaded"] = {};
							g_Parent["festivalLoaded"]["-" + (uin + Math.random())] = function(_it) {
								return function() {
									$e(_it).find(".skin_portrait_hat").remove()
								}
							}(_tmp);
							_h = _h.replace(/(<span[^>]*>[\s\S]*<\/span>)/, '$1<span title="\u53c2\u4e0e\u9ec4\u94bb\u4efb\u52a1\uff0c\u83b7\u5f97\u611a\u4eba\u8282\u5c0f\u4e11\u5934\u50cf\uff01" class="skin_portrait_hat"></span>');
							_tmp.onclick = hatclick
						} else if (uin == g_Parent.g_iLoginUin) {
							if (!top["festivalLoaded"]) g_Parent["festivalLoaded"] = {};
							if (uin == g_Parent.g_iLoginUin) {
								g_Parent["festivalLoaded"][uin + Math.random()] = function(_it) {
									return function() {
										var sp = document.createElement("span");
										sp.className = "skin_portrait_hat";
										sp.title = "\u53c2\u4e0e\u9ec4\u94bb\u4efb\u52a1\uff0c\u83b7\u5f97\u611a\u4eba\u8282\u5c0f\u4e11\u5934\u50cf\uff01";
										_tmp.onclick = hatclick;
										$e(sp).insertAfter($e(_it).find(".skin_portrait_round"))
									}
								}(_tmp);
								g_Parent["festivalLoaded"]["-" + (uin + Math.random())] = function(_it) {
									return function() {
										$e(_it).find(".skin_portrait_hat").remove()
									}
								}(_tmp)
							}
						}
						_tmp.innerHTML = _h;
						div.appendChild(_tmp);
						var _p = l[i].parentNode;
						_p.replaceChild(div, l[i]);
						if (vip != "") {
							div2 = document.createElement("div");
							div2.className = "priviilege_info";
							div2.innerHTML = vip;
							_p.appendChild(div2)
						}
						if (g_Mode == "ofp_lite") {
							var div3 = document.createElement("div");
							div3.className = "f_ang f_ang_l bor_bg2";
							_p.appendChild(div3)
						}
					}
				}
			},
			getUserIcon: function(uin) {
				return "http://qlogo" + (uin % 4 + 1) + ".store.qq.com/qzone/" + uin + "/" + uin + "/" + "50"
			}
		}
	},
	Extend: {
		initQZ: QZFL.emptyFn
	},
	PV: {
		send: function() {
			var b = g_Parent;
			t = b.window.G_firstComin_IC;
			if (!t) b.window.G_firstComin_IC = true;
			else QZONE.ICC.sendPV("icnew");
			QZONE.ICFeeds.PV.sendIC0()
		},
		sendIC0: function() {
			QZONE.ICC.sendAct(G_Param["view"] == 0 ? "modern" : "classic")
		},
		sendAct: function(label, domain) {
			if (g_Parent.TCISD && g_Parent.TCISD.pv) g_Parent.TCISD.pv((domain ? domain : QZONE.ICFeeds.PV_ACT_DOMAIN) + ".qzone.qq.com", "/" + label)
		},
		sendPV: function(label) {
			QZONE.ICC.sendPV(label)
		}
	}
};

function _inputAnswer(ouin, title, width, height) {
	QZONE.ICFeeds.PV.sendAct("inputAnswer");
	var _t = title != undefined ? title : "\u8f93\u5165\u95ee\u9898\u7b54\u6848";
	var _w = width != undefined ? width : "418";
	var _h = height != undefined ? height : "184";
	var _s = "/qzone/admin/admin_popup.html";
	var _p = "&ouin=" + ouin;
	var e = QZFL.event.getTarget();
	var feedID = QZONE.ICFeeds.commonFN.getFeedId(e);
	if (!feedID) return;
	QZONE.ICFeeds.Popup._popup(_t, _p, _s, _w, _h);
	var b = g_Parent;
	if (!b.QZONE.FrontPage) b.QZONE.FrontPage = {};
	b.QZONE.FrontPage.onPopupResult = function(success) {
		if (success) {
			ENV.set("GRZOPTshowAll", true);
			if (QZONE.ICC.Config.inputAnswerCallback && typeof QZONE.ICC.Config.inputAnswerCallback == "function") QZONE.ICC.Config.inputAnswerCallback(feedID);
			else setTimeout(function() {
				QZONE.ICController.FeedsGetter.getSingleFeed(feedID)
			}, 0)
		}
	}
}
function resetFlag() {
	g_Parent.G_flag = 0
}
function reInitFeed(feedID) {
	QZONE.ICFeeds.reInitFeed(feedID)
}
function updateFeedExtend(elid, html) {
	var d = $(elid);
	if (d) {
		d.innerHTML = "";
		d.innerHTML = html
	}
}
if (typeof window.QZONE != "object") window.QZONE = {};
QZFL.widget.simpleImageViewer = {
	show: function() {},
	updateHeight: function() {
		QZONE.ICC.changeHeight()
	}
};
QZONE.ICFeeds.FeedsGetter = {
	scope: 0,
	scopeInfoMap: {},
	hasMoreFeeds: true,
	getMoreFeeds: function(params) {
		params = params || {};
		if (!G_Param.hasMoreFeeds || !QZONE.ICFeeds.FeedsGetter.hasMoreFeeds) {
			if (!QZONE.ICFeeds.FeedsGette.hasMoreFeeds) QZFL.dom.setStyle($("getMoreFeeds"), "display", "none");
			return
		}
		var _self = QZONE.ICFeeds.FeedsGetter,
			scope = params.srope || _self.scope || G_Param.scope || 0,
			dest = "http://ic2.qzone.qq.com/cgi-bin/feeds/feeds2_html_more",
			data;
		(scope == 1 && (dest = "http://rsh.qzone.qq.com/cgi-bin/feeds/feeds2_html_pav_all") || scope == 10 && (dest = "http://rsh.qzone.qq.com/cgi-bin/feeds/feeds_html_act_all") || scope == 100 && (dest = "http://rsh.qzone.qq.com/cgi-bin/feeds/feeds2_html_about_all")) && (t = ENV.get("lastFeedsTime" + scope), data = {
			uin: g_iLoginUin,
			end_time: t && t.end_time || G_Param.end_time || "",
			offset: t && t.offset || G_Param.offset || 15,
			has_get_key: t && t.has_get_key || G_Param.has_get_key || 0,
			count: 10,
			filter: "qz",
			set: 0
		}, data.end_time && (data.end_time = parseInt(data.end_time, 10) - 1));
		if (scope == 0) data = {
			uin: g_iLoginUin,
			scope: params.srope || _self.scope || G_Param.scope || 0,
			view: 1,
			applist: "all",
			filter: _self.filter || G_Param.filter || "qz",
			refresh: params.refresh || 0,
			begintime: _self.begintime || G_Param.begintime || 0,
			count: 10,
			direct: 0,
			dayspac: 0,
			sidomain: "qzs.qq.com",
			g_tk: QZFL.pluginsDefine.getACSRFToken(),
			grz: Math.random()
		};
		else if (scope == 10) {
			t = ENV.get("lastFeedsTime" + scope);
			data = {
				uin: g_iLoginUin || 0,
				hostuin: g_iUin || 0,
				scope: 0,
				filter: "qz",
				view: 1,
				friendnum: -1,
				start: t && t.start || 10,
				count: 10
			}
		}
		_self.scope = scope || 0;
		_self.daylist = data.daylist;
		_self.uinlist = data.uinlist;
		_self.filter = G_Param.filter || "qz";
		data.useutf8 = 1;
		var load = new QZFL.JSONGetter(dest, null, data, "utf-8");
		load.onSuccess = function(result) {
			var dmain, sucflag, feedsList, friend_data;
			if (result.main) {
				sucflag = result.result == "" ? true : false;
				dmain = result.main;
				feedsList = result.data;
				friend_data = result.friend_data
			} else if (result.data) {
				sucflag = result.code == 0 ? true : false;
				dmain = result.data.main;
				feedsList = result.data.data;
				friend_data = result.data.friend_data
			}
			var _self = QZONE.ICFeeds.FeedsGetter;
			if (sucflag) {
				if (_self.scope == 10 && ((feedsList || friend_data).length > 1 || dmain.hasMoreFeeds)) {
					_self.uinlist = dmain.uinlist;
					_self.daylist = dmain.daylist;
					t = ENV.get("lastFeedsTime" + _self.scope);
					ENV.set("lastFeedsTime" + _self.scope, {
						"start": dmain ? (t && t.start || 10) + 10 : 10
					});
					if (dmain && (t && t.start || 0) + 10 > dmain.total) QZFL.dom.setStyle($("getMoreFeeds"), "display", "none");
					QZONE.ICFeeds.FeedsGetter.scopeInfoMap[_self.scope] = dmain;
					QZONE.ICFeeds.FeedsGetter._getMoreFeedsCallback(friend_data);
					return
				}
				_self.uinlist = dmain.uinlist;
				_self.daylist = dmain.daylist;
				_self.begintime = dmain.begintime;
				_self.hasMoreFeeds = dmain.hasMoreFeeds;
				if ((_self.scope == 100 || _self.scope == 1) && ((feedsList || friend_data).length > 1 || dmain.hasMoreFeeds)) ENV.set("lastFeedsTime" + _self.scope, {
					"end_time": dmain.end_time,
					"has_get_key": dmain.has_get_key,
					"offset": dmain ? (dmain.offset || 0) + (dmain.count || 10) : 0
				});
				if (!dmain.hasMoreFeeds) QZFL.dom.setStyle($("getMoreFeeds"), "display", "none");
				QZONE.ICFeeds.FeedsGetter.scopeInfoMap[_self.scope] = dmain;
				QZONE.ICFeeds.FeedsGetter._getMoreFeedsCallback(feedsList)
			}
		};
		load.onError = function(o) {};
		load.send("_Callback")
	},
	_getMoreFeedsCallback: function(o) {
		if (o && typeof o[0] !== "undefined") {
			var html = "",
				len = o.length,
				_c;
			_c = $("_feeds__proxy");
			if (!_c) _c = QZFL.dom.createElementIn("div", document.body, false, {
				"id": "_feeds__proxy",
				"style": "display:none;"
			});
			view = 1;
			html += QZONE.ICFeeds.FeedsTemp.Feeds.getHTML(o, friend_tmp, false, view);
			_c.innerHTML = html;
			QZONE.ICFeeds.QZ.init(undefined, _c);
			var feedslist = $("ifeedsContainer");
			if (feedslist) while (_c.firstChild) QZFL.dom.insertAdjacent(feedslist, 2, _c.firstChild, false);
			QZONE.ICFeeds.Remark.init()
		}
	},
	filtPopup: function(id, dom) {
		var root = QZONE.ICFeeds.commonFN.getDom(id, dom);
		if (root) {
			var l_p = QZFL.dom.getElementsByTagNameNS(root, "qz", "plugin");
			for (var i_p = l_p.length - 1; i_p >= 0; --i_p) {
				var i_p_text = l_p[i_p].innerText || l_p[i_p].textContent;
				if (i_p_text && i_p_text.indexOf("\u6d4f\u89c8") == 0) {
					l_p[i_p].innerHTML = i_p_text;
					l_p[i_p].style.marginRight = "10px"
				}
				if (l_p[i_p].getAttribute("name") == "Vote") $e("input", l_p[i_p]).setAttr("disabled", "disabled")
			}
			var l = QZFL.dom.getElementsByTagNameNS(root, "qz", "popup");
			$e(".qz_like_btn_v3,._likeInfo", root).hide();
			$e(".ui_mr10[data-type=ForwardingBox]", root).hide();
			$e(".ui_mr10[data-version=5]", root).hide();
			$e("p.f_detail a.ui_mr10[data-version=1]", root).hide();
			$e("div.f_info a.ui_mr10[data-version=1]", root).setStyle("cursor", "default");
			$e(".qz_shuoshuo_audio", root).hide();
			for (var i = l.length - 1; i >= 0; --i) {
				var _inner_text = l[i].innerText || l[i].textContent;
				if (_inner_text && _inner_text.indexOf && (_inner_text.indexOf("\u8d5e") == 0 || _inner_text.indexOf("\u8f6c\u53d1") == 0 || _inner_text.indexOf("\u5206\u4eab") == 0 || _inner_text.indexOf("\u6211\u4e5f\u7b7e\u5230") == 0)) {
					l[i].style.display = "none";
					continue
				}
				fid = QZONE.ICFeeds.commonFN.getFeedId(l[i]);
				try {
					fed = QZONE.ICFeeds.commonFN.getFeedExtendNodeId(l[i]);
					if (fidArr[fed] == undefined) fidArr[fed] = $(fed).innerHTML;
					popUpdate = fidArr[fed]
				} catch (e) {}
				unrend = l[i].getAttribute("unrend");
				if (unrend) aNode = QZFL.dom.getFirstChild(l[i]);
				else {
					aNode = document.createElement("A");
					aNode.className = "c_tx";
					var c = l[i].childNodes;
					if (c && c.length) while (c.length) aNode.appendChild(c[0]);
					else aNode.innerHTML = trim(l[i].innerHTML)
				}
				title = l[i].getAttribute("title");
				title = escHTML(title);
				param = l[i].getAttribute("param");
				src = l[i].getAttribute("src");
				width = l[i].getAttribute("width");
				height = l[i].getAttribute("height");
				version = l[i].getAttribute("version");
				var _arr = (version || "1").split(".");
				version = _arr[0];
				subVersion = _arr[1] ? _arr[1] : 0;
				type = l[i].getAttribute("type");
				if (!type) type = 0;
				appid = fid.split("_")[2];
				typeid = fid.split("_")[3];
				ver = fid.split("_")[7];
				noHideTarget = type == 1 ? true : false;
				if (fid) {
					aNode.href = "javascript:;";
					if (version == 1) {
						if (typeid == 11 || typeid == 5) {
							l[i].style.display = "none";
							continue
						}
						aNode.href = src + "?params=" + param
					} else if (version == 2) {
						if (appid == 4 && typeid == 11) {
							var _timgclassName = l[i].getAttribute("img_box_bigshow");
							var opts = {
								src: l[i].getAttribute("src") + (l[i].getAttribute("param") ? "?" + l[i].getAttribute("param") : ""),
								width: width,
								height: height,
								className: _timgclassName
							};
							QZFL.css.addClassName(aNode, opts.className)
						} else if (appid == 4 && typeid == 1) {
							var opts = {
								src: l[i].getAttribute("src") + (l[i].getAttribute("param") ? "?" + l[i].getAttribute("param") : ""),
								width: width,
								height: height
							};
							if (_inner_text == "\u67e5\u770b\u8be5\u5708\u5708") if (ver == 0) {
								l[i].parentNode.style.display = "none";
								continue
							} else if (ver == 1) {
								l[i].parentNode.parentNode.style.display = "none";
								continue
							}
						}
						aNode.onclick = function(o) {
							return function() {
								return false
							}
						}(opts)
					} else if (version == 3) {
						if (appid == "311") noArrow = true;
						else noArrow = subVersion == 1;
						aNode.onclick = function(a, b, c, d, e, f, g) {
							return function() {
								return false
							}
						}(param, src, width, height, fid, noArrow, noHideTarget)
					} else if (version == 4) {
						fdom = $(fid);
						if (fdom) {
							pObj = {
								src: src,
								nc: l[i].getAttribute("type"),
								css: l[i].getAttribute("link"),
								charset: l[i].getAttribute("charset"),
								param: param,
								dom: fdom,
								needContainer: l[i].getAttribute("needcontainer"),
								noHideTarget: noHideTarget,
								feedId: fid
							};
							if (l[i].className) QZFL.css.addClassName(aNode, l[i].className);
							var _title = l[i].getAttribute("title");
							if (_title) aNode.title = _title;
							aNode.onclick = function(o) {
								return function() {
									return false
								}
							}(pObj)
						}
					} else if (version == 5) {
						if (typeid == 0) {
							l[i].parentNode.style.display = "none";
							continue
						}
						var opts = {
							single: true,
							src: l[i].getAttribute("src") + (l[i].getAttribute("param") ? "?" + l[i].getAttribute("param") : ""),
							width: width,
							height: height
						};
						aNode.href = opts.src;
						aNode.title = l[i].getAttribute("title")
					}
					l[i].parentNode.replaceChild(aNode, l[i])
				} else l[i].style.display = "none"
			}
		}
	},
	feedsUnreadMark: function(num) {
		var _feeds = $e("div.feed_inner ul#ifeedsContainer li.f_single"),
			l = _feeds.elements.length;
		if (l) {
			if (num > l) num = l;
			for (var i = 0; i < num; i++) _feeds.elements[i] && QZFL.css.addClassName(_feeds.elements[i], "f_single_newest")
		}
	},
	ExternalWrapper: {
		getClientUin: function() {
			var uin;
			try {
				uin = external.Hummer_Contact_GetSelfUin()
			} catch (err) {
				uin = QZFL.cookie.get("uin").replace(/\D/g, "") - 0
			}
			return uin
		},
		getClientKey: function() {
			var key;
			try {
				key = external.Hummer_IM_GetClientKey()
			} catch (err) {
				key = ""
			}
			return key
		},
		openFullScreenDialog: function(url, width, height) {
			try {
				external.fullScreenDialog(url, width, height)
			} catch (err) {}
		}
	},
	onImageView: function(evt) {
		var e = QZFL.event.getTarget(evt);
		var feedId = QZONE.ICFeeds.commonFN.getFeedId(e);
		var imgUrl1 = this.getAttribute("url1");
		var imgUrl2 = this.getAttribute("url2");
		var imgUrl3 = this.getAttribute("url3");
		var param = this.getAttribute("richinfo");
		var imgUrl = imgUrl3 || imgUrl2 || imgUrl1;
		var appid = QZONE.ICFeeds.commonFN.getAppId(feedId);
		var p = $e("a.img_gif[data-cmd=qz_popup]", $(feedId)).elements[0],
			photoPopupGparam = {},
			arr_tmp, env;
		if (p && (env = p.getAttribute("data-env")) && env) {
			env = env.split(",");
			for (var i = 0, len = env.length; i < len; i++) {
				arr_tmp = env[i].split(":");
				photoPopupGparam[arr_tmp.shift()] = arr_tmp.join(":")
			}
			appid = photoPopupGparam["subappid"]
		}
		var opts = {
			"ownerUin": QZONE.ICFeeds.commonFN.getFeedUin(feedId),
			"appid": appid
		};
		if (imgUrl && param) QZONE.ICFeeds.FeedsGetter.slideViewPhoto(param, opts);
		else if (imgUrl) QZONE.ICFeeds.FeedsGetter.viewPhoto(imgUrl, Math.floor(e.clientX || 0), Math.floor(e.clientY || 0))
	},
	slideViewPhoto: function(param, opts) {
		opts = opts || {};
		var url = "http://qzs.qq.com/qzone/photo/zone/icenter_popup_2012.html?timestamp=0&appid=" + opts.appid + "&subtype=infocard&loginUin=" + g_iLoginUin + "&uin=" + opts.ownerUin + "&params=" + encodeURIComponent(param) + "&clientkey=" + QZONE.ICFeeds.FeedsGetter.ExternalWrapper.getClientKey();
		QZONE.ICFeeds.FeedsGetter.ExternalWrapper.openFullScreenDialog(url, 930, 695)
	},
	viewPhoto: function(url, w, h) {
		try {
			external.openPic(url, w, h)
		} catch (err) {}
	}
};
QZFL.pageEvents.pageBaseInit();
QZFL.pageEvents.onloadRegister(QZONE.ICFeeds.bootStrap);
QZONE.ICFeeds.PV_ACT_DOMAIN = "qzdianji";
QZONE.ICFeeds.CLICK_DOMAIN = "qzdianji";
(function() {
	if (window.bua == 23) {
		var STATE_DOMAIN = QZONE.ICFeeds.PV_ACT_DOMAIN + ".qzone.qq.com";
		var getFeedInfo = function(dom) {
				var fid = QZONE.ICFeeds.commonFN.getFeedId(dom);
				if (fid) {
					var info = QZONE.ICFeeds.commonFN.getFeedInfo(fid);
					info.flag = info.scope == 1 ? 1 : 0;
					return info
				}
				return null
			},
			hasParentNodeByClass = function(el, className) {
				while (el.className != className) {
					el = el.parentNode;
					if (!el || el.tagName == "BODY") return false
				}
				return true
			},
			isInOperate = function(dom) {
				return dom.parentNode && ($e(dom.parentNode).hasClass("feeds_tp_operate") || $e(dom.parentNode).hasClass("feeds_tp_operate_v2")) || dom.parentNode.parentNode && ($e(dom.parentNode.parentNode).hasClass("feeds_tp_operate") || $e(dom.parentNode.parentNode).hasClass("feeds_tp_operate_v2"))
			};
		var init = function() {
				var t = g_Parent.TCISD;
				$e(".li_refresh").bind("click", function() {
					t.hotClick("/toqzone", STATE_DOMAIN)
				});
				t.pv && t.pv(STATE_DOMAIN, "/qzall");
				t.hotClickWatch({
					doc: document,
					domain: STATE_DOMAIN,
					reportRate: 1,
					url: "/feeds"
				});
				t.hotAddRule(function(dom) {
					var info = getFeedInfo(dom),
						t, domain = STATE_DOMAIN,
						rex = /\(\d+\)/;
					if (!info) return null;
					if (dom.getAttribute("alt") && dom.getAttribute("alt") == "replybtn") return {
						tag: [info.flag + "_appid_" + info.appid, "typeid_" + info.typeid, "comment", "replybtn"].join("."),
						domain: domain
					};
					if (dom.getAttribute("x:id") == "postButton") return {
						tag: "feedcomment." + info.appid + "." + info.typeid,
						domain: STATE_DOMAIN
					};
					if (dom.tagName != "A" && dom.tagName != "IMG") return null;
					if (isInOperate(dom)) {
						t = "href";
						if (py) {
							t = py(dom.innerText || dom.textContent);
							t && (t = (t[0] || "").replace(rex, ""))
						}
						var paras = {
							tag: [info.flag + "_appid_" + info.appid, "typeid_" + info.typeid, "operate", t].join("."),
							domain: domain
						};
						if (t == "zan" || t == "quxiaozan") paras.domain = "internallike.qzone.qq.com";
						return paras
					}
					var domPr = dom.parentNode;
					if (domPr && domPr.getAttribute("hotclickpath")) return {
						tag: domPr.getAttribute("hotclickpath"),
						domain: domPr.getAttribute("hotdomain") || domain
					};
					if (hasParentNodeByClass(dom, "f_info")) return {
						tag: [info.flag + "_appid_" + info.appid, "typeid_" + info.typeid, "title", "href"].join("."),
						domain: domain
					};
					if (hasParentNodeByClass(dom, "feeds_comment_v2") || hasParentNodeByClass(dom, "feeds_comment")) return {
						tag: [info.flag + "_appid_" + info.appid, "typeid_" + info.typeid, "comment", "href"].join("."),
						domain: domain
					};
					if (dom.className.indexOf("qz-clock-uinsBtn") != -1) return {
						tag: "clockRemind",
						domain: domain
					};
					if (hasParentNodeByClass(dom, "qz_summary")) {
						t = "href";
						if (dom.tagName == "IMG") t = "img";
						return {
							tag: [info.flag + "_appid_" + info.appid, "typeid_" + info.typeid, "summay", t].join("."),
							domain: domain
						}
					}
				}, {
					doc: document
				})
			};
		QZFL.imports("http://" + siDomain + "/qzone/v6/mobile/hot_stat.js", init)
	}
})(); /*  |xGv00|f33836e4e4094f41edd8ae51c1f16e5d */