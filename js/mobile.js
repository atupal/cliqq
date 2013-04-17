window.QOM = window.QOM || {};
QOM.domain = "qz.qq.com";
QOM.init = function() {
	var inbox_num = ((typeof inbox) == 'undefined' ? 0 : inbox) || (QFM.cookie.get("inbox") || 0),
		type = window.location.toString().split('/')[4];
	inbox_num = (type == "oic" ? 0 : inbox_num);
	QOM.FP.setInbox(inbox_num);
	if (typeof bua != 'undefined' && (bua == 5)) {
		var b = $('br_back');
		if ($('li_r_l') && b) {
			b.removeAttribute('href');
			b.style.color = '#ccc';
		}
	}
};
if ((typeof bua != 'undefined') && (bua == 6 || bua == 7)) {
	var os = navigator.userAgent.toUpperCase();
	if (os.indexOf('NT 6.1') > -1 || (os.indexOf('NT 6.0') > -1)) {
		var node = document.createElement("style"),
			r = 'body{font-family: "Microsoft YaHei";}';
		node.type = 'text/css';
		document.getElementsByTagName("head")[0].appendChild(node);
		node.styleSheet && (node.styleSheet.cssText = r);
	}
}
QOM.OFP = {
	isEdit: false,
	activeMoodInput: function() {
		if (!QOM.OFP.isEdit) {
			QOM.OFP.hideCommentBox();
			var moodInput = $("moodInput");
			moodInput.value = "";
			QOM.OFP.isEdit = true;
			delClass(moodInput, "c_tx3");
			delClass($("owner_operation_buttom"), "none");
			addClass($("owner_operation_mood"), "none");
			moodInput.focus();
		}
	},
	disableMoodInput: function() {
		var moodInput = $("moodInput");
		if (moodInput) {
			if (bua != 5) {
				addClass($("owner_operation_buttom"), "none");
				addClass(moodInput, "c_tx3");
				delClass($("owner_operation_mood"), "none");
				moodInput.rows = 1;
				moodInput.value = "说说你身边正在发生的事...";
				moodInput.blur();
			} else if (bua == 6) {
				delClass($("owner_operation_mood"), "none");
				moodInput.value = "说说你身边正在发生的事...";
				moodInput.blur();
			} else {
				moodInput.value = "";
				moodInput.blur();
				addClass($('ownerOperation'), 'none');
			}
			QOM.OFP.isEdit = false;
		}
		bua != 6 && QOM.FP.relaseLoading("public_mood_btn");
	},
	publicMood: function(data) {
		var cc = $("moodInput").value,
			max_len = 200,
			con_len = cc.length;
		if (con_len == 0 || cc == "说说你身边正在发生的事...") {
			alert("随便写点东西吧");
			return false;
		} else if (con_len > max_len) {
			alert("您输入的内容超过" + max_len + "个字,请重新输入");
			return false;
		}
		bua != 6 && QOM.FP.loadingButton("public_mood_btn");
		var fs = new QFM.FormSender("http://" + QOM.domain + "/cgi-bin/mobile_update_mood", data, "update_mod_form");
		fs.onSuccess = function(re) {
			bua != 6 && QOM.FP.relaseLoading("public_mood_btn");
			if (re.ret == "succ") {
				QOM.OFP.disableMoodInput();
				var time = (new Date()) - 0,
					uin = g_iLoginUin,
					nick = QFM.utils.escHTML(loginProfileSummary[0]),
					content = QFM.utils.escHTML(cc);
				if ($('ifeedsContainer')) {
					QFM.dom.createElementIn("li", $('ifeedsContainer'), true, {
						"id": "mode_" + time,
						"class": "f_single imgBlock bor2"
					});
					$("mode_" + time).innerHTML = '<div class="f_aside imgBlock_img"><div class="f_user_head"><a href="http://user.qzone.qq.com/' + uin + '" target="_blank" class="f_user_avatar"><span class="skin_portrait_round"></span><img src="http://qlogo2.store.qq.com/qzone/' + uin + '/' + uin + '/50' + '" alt="' + nick + '的头像"></a></div></div><div class="f_wrap imgBlock_ct"><div class="f_item"><div class="f_info"><a target="_blank" href="http://user.qzone.qq.com/' + uin + '/profile" class="nickname c_tx">' + nick + '</a><span class="c_tx3">：</span>' + content + '</div><div class="qz_summary"><p class="f_detail c_tx3"><span class="ui_mr10"> 刚刚</span></p></div></div>';
				}
			} else {
				alert(re.msg);
				QOM.FP.relaseLoading("public_mood_btn");
			}
		};
		fs.onError = function() {
			alert("请求失败,请稍后再试");
			QOM.FP.relaseLoading("public_mood_btn");
		};
		fs.send();
	},
	addBlog: function(data, type, seq) {
		var form_id = "",
			seqnum = (typeof seq != 'undefined' ? ("_" + seq) : '');
		if (type == 0) {
			form_id = "2_quote_form_" + data.blogid + seqnum;
			delClass($('2_loading_' + data.blogid + seqnum), "none");
		} else if (type == 1) {
			form_id = "add_blog_form";
			if (QFM.utils.trim($('title').value).length == 0) {
				alert("请您输入标题");
				return false;
			}
			if (QFM.utils.trim($('content').value).length == 0) {
				alert("请您输入正文内容");
				return false;
			}
		}
		var fs = new QFM.FormSender("http://" + QOM.domain + "/cgi-bin/mobile_add_blog", data, form_id);
		fs.onSuccess = function(re) {
			if (re.ret == 'succ') {
				if (type == 0) {
					addClass($('2_loading_' + data.blogid + seqnum), "none");
					if ($('2_reply_container_' + data.blogid + seqnum)) {
						addClass($('2_reply_container_' + data.blogid + seqnum), 'none');
					}
					delClass($('2_quote_succ_' + data.blogid + seqnum), 'none');
					setTimeout(function() {
						if ($('2_reply_container_' + data.blogid + seqnum)) {
							delClass($('2_reply_container_' + data.blogid + seqnum), 'none');
						}
						addClass($('2_quote_succ_' + data.blogid + seqnum), 'none');
					}, 2000);
				} else if (type == 1) {
					alert("发表成功,现在跳转到日志列表");
					window.location.href = "http://" + QOM.domain + "/" + g_iLoginUin + "/bloglist/";
				}
			} else if (re.ret == "error") {
				addClass($('2_loading_' + data.blogid + seqnum), "none");
				alert(re.msg);
			}
		};
		fs.onError = function() {
			addClass($('2_loading_' + data.blogid + seqnum), "none");
			alert("请求失败,请稍后再试");
		};
		fs.send();
	},
	csubmit: false,
	cmtVerify: false,
	pubComment: function(data, appid, first, opt) {
		if (QOM.FP.csubmit) {
			return;
		}
		QOM.FP.csubmit = true;
		var CGI = {
			311: "mobile_update_mood",
			2: "mobile_update_blog",
			4: "mobile_update_photo",
			334: "mobile_msgb_com_ans",
			202: "mobile_add_sharecomment",
			302: "mobile_add_sharecomment"
		},
			preId, comment_content = "",
			content_id = "",
			form_id = "",
			max_len = 200,
			con_len = 0,
			detail_mood = ((typeof arguments[2]) == 'boolean'),
			forname = "",
			btnid = "",
			rt_mode = false,
			ic_reply_mode = false;
		if (appid == 311) {
			if (data.mode != 0) {
				if ((typeof arguments[2]) != 'string') {
					preId = data.moodid + ((typeof data.comid) != 'undefined' ? ("_" + data.comid) : "");
				} else {
					preId = arguments[2];
				}
				if ((typeof arguments[3]) == 'number' && opt == 1) {
					ic_reply_mode = true;
				}
			} else {
				preId = "moodInput";
			}
			if (data.mode == 3) {
				rt_mode = true;
			}
			max_len = 200;
			forname = "con";
		} else if (appid == 2) {
			if ((typeof data.commentid) != 'undefined') {
				preId = data.blogid + "_" + data.commentid;
			} else {
				preId = data.blogid;
			}
			if ((typeof arguments[3]) == 'number' && opt == 1) {
				ic_reply_mode = true;
			}
			max_len = 5120;
			forname = "replycontent";
		} else if (appid == 4) {
			preId = data.sloc + "_" + data.cmtid;
			max_len = 200;
			forname = "reply";
		} else if (appid == 334) {
			preId = data.answerid;
			max_len = 1024;
		} else if (appid == 202 || appid == 302) {
			if ((typeof data.commid) != 'undefined' && data.commid >= 0) {
				preId = data.ownerid + "_" + data.commid;
			} else {
				preId = data.ownerid;
			}
			if ((typeof arguments[3]) == 'number' && opt == 1) {
				ic_reply_mode = true;
			}
			max_len = 200;
		}
		if (!rt_mode) {
			content_id = (appid + "_comment_textarea") + (detail_mood ? (first ? "" : "_d_" + preId) : "_" + preId);
			form_id = (appid + "_comment_form") + (detail_mood ? (first ? "" : "_d_" + preId) : "_" + preId);
			btnid = (appid + "_comment_button") + (detail_mood ? (first ? "" : "_d_" + preId) : "_" + preId);
		} else {
			content_id = "311_rt_textarea_" + preId;
			form_id = "311_rt_form_" + preId;
			btnid = "311_rt_button_" + preId;
		}
		QOM.OFP.currentBtnId = btnid;
		comment_content = QFM.utils.escHTML($(content_id).value);
		con_len = comment_content.length;
		if (con_len == 0 || comment_content == " 发表评论") {
			alert("请您输入具体内容");
			QOM.FP.csubmit = false;
			return false;
		} else if (con_len > max_len && appid != 2) {
			alert("您输入的内容超过" + max_len + "个字,请重新输入");
			QOM.FP.csubmit = false;
			return false;
		}
		QOM.FP.loadingButton(btnid);
		var fs = new QFM.FormSender("http://" + QOM.domain + "/cgi-bin/" + CGI[appid], data, form_id);
		fs.onSuccess = function(re) {
			QOM.FP.relaseLoading(btnid);
			if (re.ret == "succ") {
				if (QOM.FP.cmtVerify) {
					QOM.FP.closeVerify();
					QOM.FP.cmtVerify = false;
				}
				if (!rt_mode) {
					var timestamp = new Date() - 0,
						template = "",
						container = appid + "_reply_entry_" + timestamp,
						comment_class = "",
						tag = "",
						list = "";
					if (detail_mood) {
						if (ic_reply_mode) {
							comment_class = "mod_comment_info";
							tag = "div";
							list = appid + "_sub_comment_" + preId;
							template = '<a href="http://' + QOM.domain + '/' + g_iLoginUin + '/home">' + QFM.utils.escHTML(loginProfileSummary[0]) + '</a> ' + comment_content + ' <time class="mod_comment_info_time">刚刚</time>';
							QOM.FP.hideCommentBox();
						} else {
							comment_class = "mod_interact";
							tag = "li";
							list = appid + "_sub_comment_" + preId;
							if (first) {
								template = '<div class="mod_interact_avatar"><span class="avatar_round"></span><img alt="pic" src="' + loginProfileSummary[7] + '"></div><div class="mod_interact_main"><div class="mudule_comment_cont"><a href="http://' + QOM.domain + '/' + g_iLoginUin + '/home">' + QFM.utils.escHTML(loginProfileSummary[0]) + '</a><time datetime="' + new Date() + '">  刚刚</time></div><div class="mudule_comment_detail">' + comment_content + '</div></div>';
								list = appid + "_list";
								$(content_id).value = "";
								QOM.FP.disableCommentInput(appid);
							} else {
								template = '<div class="mod_interact_avatar"><span class="avatar_round"></span><img alt="pic" src="' + loginProfileSummary[7] + '"></div><div class="mod_interact_main"><div class="mudule_comment_cont"><a href="http://' + QOM.domain + '/' + g_iLoginUin + '/home">' + QFM.utils.escHTML(loginProfileSummary[0]) + '</a><time datetime="' + new Date() + '">  回复 刚刚</time></div><div class="mudule_comment_detail">' + comment_content + '</div></div>';
								QOM.FP.hideCommentBox();
							}
						}
					} else {
						if (appid == 311 || appid == 2 || appid == 4 || appid == 334 || appid == 202 || appid == 302) {
							var reply_container = $(appid + '_reply_container_' + preId),
								reply_count = $(appid + "_reply_count_" + preId);;
							if (reply_container) {
								delClass(reply_container, "none");
								QOM.OFP.hideCommentBox();
							}
							if (reply_count) {
								var rcinner = reply_count.innerHTML,
									len = rcinner.length;
								if (len < 5) {
									rcinner = "1条评论";
								} else {
									var count = parseInt(rcinner.substring(1));
									count++;
									reply_count.innerHTML = "，" + count + "条评论";
								}
							}
						}
						QOM.OFP.disableCommentBox();
						template = '<a href="http://' + QOM.domain + '/' + g_iLoginUin + '/home">' + QFM.utils.escHTML(loginProfileSummary[0]) + '</a>    ' + comment_content + '<time datetime="' + new Date() + '" class="mod_comment_info_time">   刚刚</time>';
						list = appid + "_reply_list_" + preId;
						comment_class = "mod_comment_info";
						tag = "div";
					}
					delClass($(list), "none");
					QFM.dom.createElementIn(tag, list, false, {
						"class": comment_class,
						"id": container
					});
					$(container).innerHTML = template;
				} else {
					addClass($(appid + "_comment_input_" + preId), 'none');
					addClass($(appid + "_rt_input_" + preId), 'none');
					delClass($("311_rt_succ_" + preId), "none");
					delClass($("311_rt_alert_" + preId), "none");
					setTimeout(function() {
						addClass($("311_rt_alert_" + preId), "none");
						delClass($("311_rt_comment_" + preId), "none");
					}, 2000);
				}
			} else {
				if (re.type == -2) {
					if (confirm("您还没有登录,需要现在转到登录页面吗?")) {
						location.href = "http://" + QOM.domain + "/";
					}
				} else if (re.type == 100) {
					alert(re.msg);
					QOM.FP.changeVerifyCode();
				} else if (re.type == 37) {
					QOM.FP.showVerifyBox(function() {
						var code = $('verifycode').value;
						if (code.length == 4) {
							data.verify = code;
						} else {
							alert('请输入正确的验证码');
							return;
						}
						QOM.FP.cmtVerify = true;
						QOM.OFP.pubComment(data, appid, first, opt);
					});
				} else {
					alert(re.msg);
				}
				QOM.FP.relaseLoading(btnid);
			}
			QOM.FP.csubmit = false;
		};
		fs.onError = function() {
			alert("请求失败,请稍后再试");
			QOM.FP.relaseLoading(btnid);
			QOM.FP.csubmit = false;
		};
		fs.send(QOM.FP.cmtVerify);
	},
	currentBtnId: '',
	currentCommentId: 0,
	currentAppid: 0,
	showRetweet: function(id, appid) {
		var rtInput = $("311_rt_textarea_" + id);
		addClass($(appid + "_rt_comment_" + id), 'none');
		addClass($(appid + "_comment_input_" + id), 'none');
		delClass($(appid + "_rt_input_" + id), 'none');
		rtInput.value = "";
		rtInput.focus();
	},
	hideRetweet: function(id, appid) {
		delClass($(appid + "_rt_comment_" + id), 'none');
		addClass($(appid + "_comment_input_" + id), 'none');
		addClass($(appid + "_rt_input_" + id), 'none');
	},
	showShareBox: function(id, appid) {
		var rtInput = $(appid + "_share_textarea_" + id);
		addClass($(appid + "_share_comment_" + id), 'none');
		addClass($(appid + "_comment_input_" + id), 'none');
		delClass($(appid + "_share_input_" + id), 'none');
		rtInput.value = "";
		rtInput.focus();
		$('user_reply') && ($('user_reply').style.zoom = 1);
	},
	hideShareBox: function(id, appid) {
		delClass($(appid + "_share_comment_" + id), 'none');
		addClass($(appid + "_comment_input_" + id), 'none');
		addClass($(appid + "_share_input_" + id), 'none');
		$('user_reply') && ($('user_reply').style.zoom = 1);
	},
	shareVerify: false,
	shareIt: function(data, appid, type) {
		var preId = "";
		if (appid == 2 || appid == 202 || appid == 4 || appid == 302) {
			preId = data.ownerid;
		}
		var CGI = {
			2: 'mobile_add_blogshare',
			4: 'mobile_add_picshare',
			202: 'mobile_add_shareshare',
			302: 'mobile_add_shareshare'
		},
			form_id = appid + "_share_form_" + preId,
			btnid = appid + "_share_button_" + preId,
			fs = new QFM.FormSender("http://" + QOM.domain + "/cgi-bin/" + CGI[appid], data, form_id);
		QOM.FP.loadingButton(btnid);
		fs.onSuccess = function(re) {
			QOM.FP.relaseLoading(btnid);
			if (re.ret == "succ") {
				if (QOM.FP.shareVerify) {
					QOM.FP.closeVerify();
					QOM.FP.shareVerify = false;
				}
				addClass($(appid + "_comment_input_" + preId), 'none');
				addClass($(appid + "_share_input_" + preId), 'none');
				delClass($(appid + "_share_succ_" + preId), "none");
				addClass($(appid + "_share_error_" + preId), "none");
				delClass($(appid + "_share_alert_" + preId), "none");
				setTimeout(function() {
					addClass($(appid + "_share_alert_" + preId), "none");
					delClass($(appid + "_share_comment_" + preId), "none");
				}, 2000);
			} else {
				if (re.type == -1) {
					if (confirm("您还没有登录,需要现在转到登录页面吗?")) {
						location.href = "http://" + QOM.domain + "/";
					}
				} else if (re.type == 100) {
					alert(re.msg);
					QOM.FP.changeVerifyCode();
				} else if (re.type == 37) {
					QOM.FP.showVerifyBox(function() {
						var code = $('verifycode').value;
						if (code.length == 4) {
							data.verify = code;
						} else {
							alert('请输入正确的验证码');
							return;
						}
						QOM.FP.shareVerify = true;
						QOM.OFP.shareIt(data, appid, type);
					});
				} else {
					if ($(appid + "_share_error_" + preId)) {
						addClass($(appid + "_comment_input_" + preId), 'none');
						addClass($(appid + "_share_input_" + preId), 'none');
						$(appid + "_share_msg_" + preId).innerHTML = re.msg;
						delClass($(appid + "_share_error_" + preId), "none");
						addClass($(appid + "_share_succ_" + preId), "none");
						delClass($(appid + "_share_alert_" + preId), "none");
						setTimeout(function() {
							addClass($(appid + "_share_alert_" + preId), "none");
							delClass($(appid + "_share_comment_" + preId), "none");
						}, 2000);
					} else {
						alert(re.msg);
					}
				}
			}
		};
		fs.onError = function() {
			alert("请求失败,请稍后再试");
			QOM.FP.relaseLoading(btnid);
		};
		fs.send(QOM.FP.shareVerify);
	},
	activeCommentBox: function(id, appid) {
		if (!(QOM.OFP.currentCommentId == id && QOM.OFP.currentAppid == appid)) {
			QOM.OFP.disableCommentBox();
			var commentInput = $(appid + "_comment_textarea_" + id);
			commentInput.value = "";
			delClass($(appid + "_comment_extend_" + id), "none");
			delClass($(appid + "_comment_textarea_" + id), "c_tx3");
			QOM.OFP.currentCommentId = id;
			QOM.OFP.currentAppid = appid;
			commentInput.focus();
		}
	},
	disableCommentBox: function() {
		var id = QOM.OFP.currentCommentId,
			appid = QOM.OFP.currentAppid;
		if (id == 1 || appid == 0) {
			return;
		}
		var commentInput = $(appid + "_comment_textarea_" + id);
		addClass($(appid + "_comment_extend_" + id), "none");
		addClass($(appid + "_comment_textarea_" + id), "c_tx3");
		if (commentInput) {
			commentInput.rows = 1;
			commentInput.value = " 我也说一句...";
			commentInput.blur();
			QOM.OFP.currentAppid = 0;
			QOM.OFP.currentCommentId = 0;
		}
		QOM.FP.relaseLoading(QOM.OFP.currentBtnId);
		QOM.OFP.currentBtnId = "";
	},
	showCommentBox: function(id, appid) {
		if (QOM.OFP.currentCommentId != id || appid == 311 || appid == 202 || appid == 2 || appid == 302) {
			QOM.OFP.disableMoodInput();
			QOM.OFP.hideCommentBox();
			var postBox = $(appid + "_comment_input_" + id),
				commentInput = $(appid + "_comment_textarea_" + id);
			QOM.OFP.currentCommentId = id;
			QOM.OFP.currentAppid = appid;
			if (appid == 311) {
				QOM.OFP.hideRetweet(id, appid);
			}
			if (appid == 202 || appid == 302 || appid == 2) {
				QOM.OFP.hideShareBox(id, appid);
			}
			delClass(postBox, "none");
			commentInput.value = "";
			commentInput.focus();
		}
		if ($('msgInput')) {
			QOM.FP.disableMsgInput();
		}
	},
	hideCommentBox: function() {
		var id = QOM.OFP.currentCommentId,
			appid = QOM.OFP.currentAppid,
			commentInput = $(appid + "_comment_textarea_" + id);
		if (id == 0 || appid == 0) {
			return;
		}
		var postBox = $(appid + "_comment_input_" + id);
		addClass(postBox, "none");
		if (commentInput) {
			commentInput.value = "";
			commentInput.rows = 1;
			commentInput.blur();
		}
		QOM.OFP.currentCommentId = 0;
		QOM.FP.relaseLoading(QOM.OFP.currentBtnId);
		QOM.OFP.currentBtnId = "";
	},
	currentPage: 1,
	feedCache: 1,
	feedDay: 0,
	photoShowList: {},
	getMorePhotos: function(uin, page) {
		if (!QOM.OFP.photoShowList[uin]) {
			delClass($('photo_loading_' + uin), "none");
			addClass($('open_up_' + uin), "none");
			var GET_MORE_PHOTOS = "http://" + QOM.domain + "/" + uin + "/morephoto",
				jg = new QFM.JSONGetter(GET_MORE_PHOTOS, {
					script: 1,
					page: page
				}, "utf-8");
			jg.onSuccess = function(re) {
				if ((typeof re.uin) != 'undefined') {
					var urls = [];
					for (var i = 0, len = re.list.length; i < len; i++) {
						urls.push('<a href="' + re.list[i].bigurl + '"><img src="' + re.list[i].url + '"></a>');
					}
					$('feed_load_photo_' + re.uin).innerHTML = urls.join('');
					QOM.OFP.openUpPhotos(re.uin);
					QOM.OFP.photoShowList[uin] = true;
				} else {
					alert(re.error.msg);
				}
				addClass($('photo_loading_' + uin), "none");
			};
			jg.onError = function() {
				alert("网络繁忙,请稍后再试");
				addClass($('photo_loading_' + uin), "none");
			};
			jg.send('_Callback');
		} else {
			QOM.OFP.openUpPhotos(uin);
		}
	},
	openUpPhotos: function(uin) {
		addClass($('feed_icon_photo_' + uin), "none");
		delClass($('feed_load_photo_' + uin), "none");
		addClass($('open_up_' + uin), "none");
		delClass($('fold_up_' + uin), "none");
	},
	foldUpPhotos: function(uin) {
		delClass($('feed_icon_photo_' + uin), "none");
		addClass($('feed_load_photo_' + uin), "none");
		delClass($('open_up_' + uin), "none");
		addClass($('fold_up_' + uin), "none");
	},
	showBigPhoto: function(surl, burl, cid, pid, lid) {
		if (QFM.css.hasClassName($(cid), "feed_list_photo")) {
			addClass($(cid), "feed_list_photo_detail");
			delClass($(cid), "feed_list_photo");
			!IE && delClass($(lid), "none");
			$(pid).src = burl;
			$(pid).onload = function() {
				!IE && addClass($(lid), "none");
				$(pid).onload = null;
			}
		} else {
			addClass($(cid), "feed_list_photo");
			delClass($(cid), "feed_list_photo_detail");
			$(pid).src = surl;
		}
	},
	toggleShuoBox: function() {
		var oop = $('ownerOperation');
		if (oop) {
			if (QFM.css.hasClassName(oop, 'none')) {
				delClass(oop, 'none');
				$('moodInput').focus();
			} else {
				addClass(oop, 'none');
			}
			QFM.css.toggleClassName($('shuo_box_link'), 'cur');
		}
	},
	openQzone: function() {
		addClass($('fn_activeQzone_t'), 'none');
		addClass($('fn_activeQzone_b'), 'none');
		if ($('open_tipss')) {
			delClass($('open_tipss'), 'none');
		}
		if ($('li_r_l')) {
			$('li_r_l').innerHTML = '<img src="http://qzs.qq.com/qzonestyle/qzone_mobile_v1/img/loading_16x16.gif" id="page_loading" class="none">在网页中完成注册后，点此刷新';
		}
		QFM.utils.scrollY(1);
	}
};
QOM.Farm = {
	doFarm: function(data, opt) {
		var id, action, loading, formid, fs, ret;
		if (typeof opt != 'undefined' && opt.isoc == true) {
			action = data.act;
			formid = (action == 'scarify') ? 'oc_form' : 'oh_form';
			loading = $((action == 'scarify') ? 'oc_loading' : 'oh_loading');
			msg = (action == 'scarify') ? '一键铲除成功' : '一键收获成功';
			fs = new QFM.FormSender("http://farm.qz.qq.com/cgi-bin/cgi_farm_plant_qz", data, formid);
			delClass(loading, 'none');
			fs.onSuccess = function(re) {
				addClass(loading, 'none');
				alert(msg);
				QOM.Farm.renewLand();
			};
		} else {
			id = data.place;
			action = data.act;
			loading = $(id + '_loading');
			if (action == 'planting') {
				formid = id + '_' + data.cId + '_pform';
			} else if (action == 'scarify') {
				formid = id + '_sform';
			} else if (action == 'harvest') {
				formid = id + '_hform';
			}
			fs = new QFM.FormSender("http://farm.qz.qq.com/cgi-bin/cgi_farm_plant_qz", data, formid);
			delClass(loading, 'none');
			fs.onSuccess = function(re) {
				addClass(loading, 'none');
				QOM.Farm.treatAction(id, action, re, data, opt);
			};
		}
		fs.onError = function() {
			addClass(loading, 'none');
			alert("请求失败,请稍后再试");
		};
		fs.send();
	},
	treatAction: function(id, action, re, data, opt) {
		var tips, form;
		if (action == 'scarify') {
			tips = $(id + '_stips');
			form = id + '_sform';
			if (re.code == 1) {
				tips.innerHTML = '<span class="appicon_16_succ"></span>你成功将该土地的枯萎作物铲除，获得' + re.exp + '点经验。';
				$(id + '_desc').innerHTML = '空地';
				delClass($(id + '_aplant'), 'none');
			} else {
				tips.innerHTML = '<span class="appicon_16_warn"></span>' + re.direction;
			}
		} else if (action == 'planting') {
			tips = $(id + '_ptips');
			form = id + '_pform';
			if (re.code == 1) {
				tips.innerHTML = '<span class="appicon_16_succ"></span>你成功将种子播种在该土地上，获得' + re.exp + '点经验。<br/>';
				$(id + '_desc').innerHTML = data.cname;
				var h = Math.floor(re.maturetime / 60 / 60),
					m = Math.floor(re.maturetime / 60 % 60);
				$(id + '_htime').innerHTML = h + '小时' + (m > 0 ? m + '分钟' : '') + '后成熟';
				addClass($(id + '_send'), 'none');
				addClass($(id + '_aplant'), 'none');
			} else {
				tips.innerHTML = '<span class="appicon_16_warn"></span>' + re.direction;
			}
		} else if (action == 'harvest') {
			tips = $(id + '_htips');
			form = id + '_hform';
			if (re.code == 1) {
				tips.innerHTML = '<span class="appicon_16_succ"></span>你成功将该土地的作物收获，获得了' + re.exp + '点经验。';
			} else {
				tips.innerHTML = '<span class="appicon_16_warn"></span>' + re.direction;
			}
			if (typeof opt != 'undefined') {
				if ((opt.hedtime + 1) == opt.htime) {
					$(id + '_desc').innerHTML = '枯萎的作物';
					addClass($(id + '_hform'), 'none');
					delClass($(id + '_sform'), 'none');
				} else {
					$(id + '_desc').innerHTML = opt.cropname + '，' + (opt.hedtime + 2) + '/' + opt.htime + '季';
				}
			}
		}
		if (re.exp > 0) {
			QOM.Farm.updateExp(re.exp);
		}
		if (re.levelUp) {
			QOM.Farm.updateLevel();
		}
		delClass(tips, 'none');
		addClass($(form), 'none');
		setTimeout(function() {
			addClass(tips, 'none');
		}, 3000);
	},
	currSeed: -1,
	currExp: 0,
	getSeed: function(data) {
		var jg = new QFM.JSONGetter("http://farm.qz.qq.com/cgi-bin/cgi_farm_getuserseed_qz", data, "utf-8"),
			id = data.place,
			loading = $(id + '_loading'),
			seeds = $(id + '_send');
		if (QOM.Farm.currSeed != -1) {
			addClass($(QOM.Farm.currSeed + '_send'), 'none');
		}
		delClass(loading, 'none');
		jg.onSuccess = function(re) {
			addClass(loading, 'none');
			if (typeof re.code == 'undefined') {
				if (re.length > 0) {
					var s = [],
						seed;
					for (var i = 0; i < re.length; i++) {
						seed = re[i];
						if (seed.type == 1) {
							s.push(seed.cName + ' x ' + seed.amount + ' <form id="' + id + '_' + seed.cId + '_pform" onsubmit="return QOM.Farm.doFarm({act:\'planting\',place:' + id + ',cId:' + seed.cId + ',cname:\'' + seed.cName + '\',lifecycle:' + seed.lifecycle + '});" method="post"><input type="submit" value="播种" class="a_like" /></form><br>')
						}
					}
					if (s.length > 0) {
						seeds.innerHTML = '<span class="ico_basket"></span> 你拥有的普通种子：<br>' + s.join('');
						delClass(seeds, 'none');
					} else {
						addClass($(id + '_aplant'), 'none');
						seeds.innerHTML = '<span class="ico_i"></span> 糟糕，没有种子啦，快去商店购买吧。';
						delClass(seeds, 'none');
						setTimeout(function() {
							addClass(seeds, 'none');
						}, 3000);
					}
					QOM.Farm.currSeed = id;
				}
			} else {
				seeds.innerHTML = '<span class="appicon_16_warn"></span>' + re.direction;
				delClass(seeds, 'none');
				setTimeout(function() {
					addClass(seeds, 'none');
				}, 3000);
			}
		};
		jg.onError = function() {
			alert("网络繁忙,请稍后再试");
		};
		jg.send('_Callback');
	},
	updateExp: function(add) {
		QOM.Farm.currExp = $('farm_exp').innerHTML - 0;
		QOM.Farm.currExp += add;
		$('farm_exp').innerHTML = QOM.Farm.currExp;
	},
	updateLevel: function() {
		var level = $('farm_level').innerHTML - 0;
		level++;
		$('farm_level').innerHTML = level;
	},
	renewLand: function() {
		window.location = window.location;
	}
};
QOM.FP = {
	currentCommentId: 0,
	currentAppid: 0,
	isEdit: false,
	activeCommentInput: function(appid) {
		if (!QOM.FP.isEdit) {
			QOM.FP.hideCommentBox();
			var commentInput = $(appid + "_comment_textarea");
			commentInput.value = "";
			QOM.FP.isEdit = true;
			delClass($(appid + "_comment_cancel"), "none");
			delClass($(appid + "_comment_textarea"), "c_tx3");
			commentInput.focus();
		}
	},
	disableCommentInput: function(appid) {
		var commentInput = $(appid + "_comment_textarea");
		if (commentInput) {
			addClass($(appid + "_comment_textarea"), "c_tx3");
			addClass($(appid + "_comment_cancel"), "none");
			commentInput.value = " 发表评论";
			commentInput.rows = 1;
			QOM.FP.isEdit = false;
			QOM.FP.relaseLoading(appid + "_comment_button");
			commentInput.blur();
		}
	},
	showCommentBox: function(id, appid) {
		QOM.FP.disableCommentInput(appid);
		QOM.FP.hideCommentBox();
		QOM.FP.currentAppid = appid;
		QOM.FP.currentCommentId = id;
		delClass($(appid + "_comment_input_d_" + id), "none");
		addClass($(appid + "_link_reply_" + id), "none");
		delClass($(appid + "_link_hide_" + id), "none");
		$(appid + "_comment_textarea_d_" + id).focus();
	},
	hideCommentBox: function() {
		var id = QOM.FP.currentCommentId,
			appid = QOM.FP.currentAppid;
		if (id == 0 || appid == 0) {
			return;
		}
		addClass($(appid + "_comment_input_d_" + id), "none");
		delClass($(appid + "_link_reply_" + id), "none");
		addClass($(appid + "_link_hide_" + id), "none");
		if ($(appid + "_comment_textarea_d_" + id)) {
			$(appid + "_comment_textarea_d_" + id).rows = 1;
			$(appid + "_comment_textarea_d_" + id).value = "";
			$(appid + "_comment_textarea_d_" + id).blur();
		}
		QOM.FP.relaseLoading(appid + "_comment_button_d_" + id);
	},
	loadingButton: function(id) {
		clearInterval(QOM.FP.buttonTimer);
		var btn = $(id),
			str = ["...", ".. ", ".  ", "   "],
			i = 3,
			wait = "小等";
		if (!btn) {
			return;
		}
		btn.disabled = true;
		delClass(btn, "btn_global");
		addClass(btn, "btn_global_n");
		QOM.FP.buttonTimer = setInterval(function() {
			if (i < 0) {
				i = 3;
			}
			btn.value = wait + str[i];
			i--;
		}, 500);
	},
	relaseLoading: function(id) {
		var btn = $(id);
		if (!btn) {
			return;
		}
		btn.disabled = false;
		delClass(btn, "btn_global_n");
		addClass(btn, "btn_global");
		btn.value = "发表";
		clearInterval(QOM.FP.buttonTimer);
	},
	currentPage: 1,
	msgEdit: false,
	activeMsgInput: function() {
		if (!QOM.FP.msgEdit) {
			QOM.OFP.hideCommentBox();
			var moodInput = $("msgInput");
			delClass($("msg_operation_buttom"), "none");
			delClass(moodInput, "c_tx3");
			QOM.FP.msgEdit = true;
			moodInput.value = "";
			moodInput.focus();
		}
	},
	disableMsgInput: function() {
		var moodInput = $("msgInput");
		addClass($("msg_operation_buttom"), "none");
		addClass(moodInput, "c_tx3");
		moodInput.rows = 1;
		moodInput.value = "留句话吧...";
		QOM.FP.msgEdit = false;
		QOM.FP.relaseLoading("public_msg_btn");
		moodInput.blur();
	},
	leaveMsg: function(data) {
		var msg_content = "",
			max_len = 200,
			con_len = 0;
		msg_content = QFM.utils.escHTML($("msgInput").value);
		con_len = msg_content.length;
		if (con_len == 0) {
			alert("请您输入具体内容");
			return false;
		} else if (con_len > 1024) {
			alert("您输入的内容超过1024个字符,请重新输入");
			return false;
		}
		QOM.FP.loadingButton("public_msg_btn");
		var fs = new QFM.FormSender("http://" + QOM.domain + "/cgi-bin/mobile_update_msg", data, "update_msg_form");
		fs.onSuccess = function(re) {
			QOM.FP.relaseLoading("public_msg_btn");
			if (re.ret == "succ") {
				QOM.FP.disableMsgInput();
				var time = (new Date()) - 0;
				QFM.dom.createElementIn("li", $('msg_list'), true, {
					"id": "msg_" + time
				});
				$("msg_" + time).innerHTML = '<div class="mod_interact_avatar appicon_16_334"></div><div class="mod_interact_main"><div class="feed_list_cont"><a href="http://qz.qq.com/' + g_iLoginUin + '/home/">' + QFM.utils.escHTML(loginProfileSummary[0]) + '</a> ' + msg_content + '</div><div class="feed_list_extent"> <time>刚刚</time></div></div>'
			} else {
				alert(re.msg);
			}
		};
		fs.onError = function() {
			QOM.FP.relaseLoading("public_msg_btn");
			alert("请求失败,请稍后再试");
		};
		fs.send();
	},
	textOnBlur: function(id) {
		var text = $(id);
		if (text.value.length > 0) {
			if (confirm("您确定放弃已经输入的内容吗？")) {
				text.value = "";
			}
		}
	},
	showImageLoading: function(id) {
		delClass($('loading_' + id), 'none');
		addClass($('ico_' + id), 'none');
	},
	imageOnload: function(id, type) {
		addClass($('loading_' + id), 'none');
		delClass($('ico_' + id), 'none');
		$('pic_a_' + id + (type == 1 ? '_s' : '_b')).disabled = false;
		$('pic_a_' + id + (type == 1 ? '_b' : '_s')).disabled = true;
	},
	imageOnerror: function(id) {
		addClass($('loading_' + id), 'none');
		delClass($('ico_' + id), 'none');
	},
	switchImage: function(id, url, type) {
		var b = $('pic_' + id + (type == 1 ? '_b' : '_s')),
			s = $('pic_' + id + (type == 1 ? '_s' : '_b'));
		if (b.src.length == 0) {
			delClass($('loading_' + id), 'none');
			addClass($('ico_' + id), 'none');
		}
		addClass(s, 'none');
		delClass(b, 'none');
		b.src = url;
	},
	onPicLoad: function() {
		addClass($('pic_loading'), 'none');
		delClass($('pic_item'), 'none');
	},
	switchNet: function(type) {
		QFM.cookie.set("speed", type, QOM.domain, null, 24 * 30);
		window.location.reload();
	},
	setInbox: function(num) {
		var red = $('red_feed_num');
		if (num > 0) {
			if (red) {
				red.style.display = (gua == 1) ? '' : 'block';
				red.innerHTML = (gua == 1) ? ("(" + num + ")") : num;
			}
		} else {
			red && (red.style.display = 'none');
		}
		QFM.cookie.set("inbox", num, QOM.domain, null, 1);
	},
	refresh: function() {
		if (!$('ico_refresh')) {
			delClass($('page_loading'), 'none');
		}
		window.location = "http://" + QOM.domain;
	},
	menuSub: true,
	menuShow: false,
	showMenu: function() {
		if (QFM.css.hasClassName($('menu_sub'), 'none')) {
			delClass($('menu_sub'), 'none');
			$('more_link').innerHTML = '收起▲';
			addEvent(document, "mouseup", QOM.FP.hideMenu);
			addEvent($('menu_sub'), "mouseup", QFM.event.cancelBubble);
			addEvent($('more_link'), "mouseup", QFM.event.cancelBubble);
		} else {
			QOM.FP.hideMenu();
		}
	},
	hideMenu: function() {
		addClass($('menu_sub'), 'none');
		$('more_link').innerHTML = '更多▼';
		setTimeout(function() {
			delEvent(document, "mouseup", QOM.FP.hideMenu);
		}, 500);
	},
	getACSRFToken: function(type) {
		var hash = 5381,
			str = QFM.cookie.get(type);
		for (var i = 0, len = str.length; i < len; ++i) {
			hash += (hash << 5) + str.charAt(i).charCodeAt();
		}
		return hash & 0x7fffffff;
	},
	showVerifyBox: function(callback) {
		$('verifyimg').src = 'http://ptlogin2.qq.com/getimage?aid=8000102&rd=' + Math.random();
		delClass($('verifybox'), 'none');
		$('verifybox').style.top = Math.max((QFM.dom.getClientHeight() - 230) / 2 + QFM.dom.getScrollTop(), 0) + 'px';
		$('verify_submit').onclick = callback;
		$('verifycode').focus();
	},
	changeVerifyCode: function() {
		$('verifyimg').src = 'http://ptlogin2.qq.com/getimage?aid=8000102&rd=' + Math.random();
	},
	closeVerify: function() {
		addClass($('verifybox'), 'none');
	},
	logout: function() {
		if (confirm("您确定要退出吗？")) {
			for (var i = 0, ar = ["uin", "luin", "lskey", "skey", "zzpaneluin", "zzpanelkey", "prvk", "tab"], l = ar.length; i < l; i++) {
				QFM.cookie.del(ar[i]);
			}
			window.location = "http://" + QOM.domain;
		}
	}
};
window.onbeforeunload = function() {
	var moodInput = $("moodInput");
	if (moodInput && (moodInput.value != "说说你身边正在发生的事...") && (moodInput.value.length > 0)) {
		return "您要放弃正在编写的状态吗？"
	}
}
window.QFM = window.QFM || {};
QFM.emptyFn = function() {};
window.IE = (!-[1, ]);
(function() {
	var $i = this;
	$i.domainPrefix = "qq.com";
}).call(QFM.consts = {});
QFM.utils = {
	getType: function(obj) {
		return obj === null ? "null" : (obj === undefined ? "undefined" : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
	},
	scrollY: function(y) {
		setTimeout(function() {
			window.scrollTo(0, y);
		}, 0);
	},
	commonReplace: function(s, p, r) {
		return s.replace(p, r);
	},
	listReplace: function(s, l) {
		for (var i in l) {
			s = QFM.utils.commonReplace(s, l[i], i);
		}
		return s;
	},
	escHTML: function(str) {
		var t = {
			re_amp: /&/g,
			re_lt: /</g,
			re_gt: />/g,
			re_apos: /\x27/g,
			re_quot: /\x22/g
		};
		return QFM.utils.listReplace((str + ""), {
			"&amp;": t.re_amp,
			"&lt;": t.re_lt,
			"&gt;": t.re_gt,
			"&#039;": t.re_apos,
			"&quot;": t.re_quot
		});
	},
	restHTML: function(str) {
		if (!QFM.utils.restHTML.__utilDiv) {
			QFM.utils.restHTML.__utilDiv = document.createElement("div");
		}
		var t = QFM.utils.restHTML.__utilDiv;
		t.innerHTML = (str + "");
		if (typeof(t.innerText) != 'undefined') {
			return t.innerText;
		} else if (typeof(t.textContent) != 'undefined') {
			return t.textContent;
		} else if (typeof(t.text) != 'undefined') {
			return t.text;
		} else {
			return '';
		}
	},
	trim: function(str) {
		var t = /^\s+|\s+$/g;
		return QFM.utils.commonReplace(str + "", t, '');
	}
};
QFM.dom = {
	getById: function(id) {
		return document.getElementById(id);
	},
	get: function(e) {
		if (e && ((e.tagName || e.item) || e.nodeType == 9)) {
			return e;
		}
		return QFM.dom.getById(e);
	},
	getScrollTop: function(doc) {
		var _doc = doc || document;
		return Math.max(_doc.documentElement.scrollTop, _doc.body.scrollTop);
	},
	removeElement: function(el) {
		if (typeof(el) == "string") {
			el = QFM.dom.getById(el);
		}
		if (!el) {
			return;
		}
		if (el.removeNode) {
			el.removeNode(true);
		} else {
			if (el.childNodes.length > 0) {
				for (var ii = el.childNodes.length - 1; ii >= 0; ii--) {
					QFM.dom.removeElement(el.childNodes[ii]);
				}
			}
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
		}
		el = null;
		return null;
	},
	query: function(s) {
		return document.querySelector(s);
	},
	queryAll: function(s) {
		return document.querySelectorAll(s);
	},
	createElementIn: function(tagName, el, insertFirst, attributes) {
		var tagName = tagName || "div";
		var el = QFM.dom.get(el) || document.body;
		var _doc = el.ownerDocument;
		var _e = _doc.createElement(tagName);
		if (attributes) {
			for (var k in attributes) {
				if (/class/.test(k)) {
					_e.className = attributes[k];
				} else if (/style/.test(k)) {
					_e.style.cssText = attributes[k];
				} else {
					_e[k] = attributes[k];
				}
			}
		}
		if (insertFirst) {
			el.insertBefore(_e, el.firstChild);
		} else {
			el.appendChild(_e);
		}
		return _e;
	},
	createNamedElement: function(type, name, doc) {
		var _doc = doc || document,
			element;
		try {
			element = _doc.createElement('<' + type + ' name="' + name + '">');
		} catch (ignore) {}
		if (!element || !element.name) {
			element = _doc.createElement(type);
			element.name = name;
		}
		return element;
	},
	getClientHeight: function(doc) {
		var _doc = doc || document;
		return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientHeight : _doc.body.clientHeight;
	}
};
QFM.css = {
	hasClassName: function(elem, cname) {
		return elem && cname && (" " + elem.className + " ").indexOf(" " + cname + " ") + 1;
	},
	addClassName: function(elem, cname) {
		if (elem && cname && !QFM.css.hasClassName(elem, cname)) {
			var c = elem.className;
			elem.className = c + (c ? " " : "") + cname;
		}
	},
	removeClassName: function(elem, cname) {
		var idx, c, p;
		if (elem && cname && (cname += '') && (idx = QFM.css.hasClassName(elem, cname))) {
			c = " " + elem.className + " ";
			p = idx + cname.length + 1;
			elem.className = (p == c.length) ? c.slice(1, idx - 1) : (c.slice(1, idx) + c.slice(p, c.length - 1));
		}
	},
	toggleClassName: function(elem, cname) {
		var r = QFM.css;
		r[(r.hasClassName(elem, cname) ? "removeClassName" : "addClassName")](elem, cname);
	},
	insertCSSLink: function(url, id) {
		var doc = document,
			cssLink = (cssLink = $(id)) && cssLink.nodeName == "LINK" ? cssLink : null,
			head = doc.getElementsByTagName("head")[0];
		if (!cssLink) {
			cssLink = doc.createElement("link");
			id && (cssLink.id = id);
			cssLink.rel = "stylesheet";
			cssLink.rev = "stylesheet";
			cssLink.type = "text/css";
			cssLink.media = "screen";
			head.appendChild(cssLink);
		}
		url && (cssLink.href = url);
		return cssLink.sheet || cssLink;
	},
	getStyleSheetById: function(id) {
		var s;
		return (s = QFM.dom.get(id)) && s.sheet || (s = document.styleSheets) && s[id];
	}
};
QFM.event = {
	_eList: {},
	_fnSeqUID: 0,
	_objSeqUID: 0,
	bind: function(obj, fn) {
		var args = Array.prototype.slice.call(arguments, 2);
		return function() {
			var _obj = obj || this,
				_args = args.concat(Array.prototype.slice.call(arguments, 0));
			if (typeof(fn) == "string") {
				if (_obj[fn]) {
					return _obj[fn].apply(_obj, _args);
				}
			} else {
				return fn.apply(_obj, _args);
			}
		}
	},
	addEvent: function(obj, eventType, fn, argArray) {
		var cfn, res = false,
			l;
		if (!obj) {
			return res;
		}
		if (!obj.eUID) {
			obj.eUID = "e" + (++QFM.event._objSeqUID);
		}
		if (!(l = QFM.event._eList[obj.eUID])) {
			l = QFM.event._eList[obj.eUID] = {};
		}
		if (!fn.__elUID) {
			fn.__elUID = "e" + (++QFM.event._fnSeqUID) + obj.eUID;
		}
		if (!l[eventType]) {
			l[eventType] = {};
		}
		if (typeof(l[eventType][fn.__elUID]) == 'function') {
			return false;
		}
		cfn = function(evt) {
			return fn.apply(obj, !argArray ? [QFM.event.getEvent(evt)] : ([QFM.event.getEvent(evt)]).concat(argArray));
		};
		if (obj.addEventListener) {
			obj.addEventListener(eventType, cfn, false);
			res = true;
		} else if (obj.attachEvent) {
			res = obj.attachEvent("on" + eventType, cfn);
		} else {
			res = false;
		}
		if (res) {
			l[eventType][fn.__elUID] = cfn;
		}
		return res;
	},
	removeEvent: function(obj, eventType, fn) {
		var cfn = fn,
			res = false,
			l = QFM.event._eList,
			r;
		if (!obj) {
			return res;
		}
		if (!fn) {
			return QFM.event.purgeEvent(obj, eventType);
		}
		if (obj.eUID && l[obj.eUID]) {
			l = l[obj.eUID][eventType];
			if (l && l[fn.__elUID]) {
				cfn = l[fn.__elUID];
				r = l;
			}
		}
		if (obj.removeEventListener) {
			obj.removeEventListener(eventType, cfn, false);
			res = true;
		} else if (obj.detachEvent) {
			obj.detachEvent("on" + eventType, cfn);
			res = true;
		} else {
			return false;
		}
		if (res && r && r[fn.__elUID]) {
			delete r[fn.__elUID];
		}
		return res;
	},
	getEvent: function(evt) {
		var evt = evt || window.event,
			c;
		if (!evt && (!IE)) {
			c = QFM.event.getEvent.caller, cnt = 1;
			while (c) {
				evt = c.arguments[0];
				if (evt && Event == evt.constructor) {
					break;
				} else if (cnt > 32) {
					break;
				}
				c = c.caller;
				cnt++;
			}
		}
		return evt;
	},
	getTarget: function(evt) {
		var e = QFM.event.getEvent(evt);
		if (e) {
			return e.srcElement || e.target;
		} else {
			return null;
		}
	},
	preventDefault: function(evt) {
		evt = QFM.event.getEvent(evt);
		if (!evt) {
			return false;
		}
		if (evt.preventDefault) {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}
	},
	cancelBubble: function(evt) {
		evt = QFM.event.getEvent(evt);
		if (!evt) {
			return false
		}
		if (evt.stopPropagation) {
			evt.stopPropagation();
		} else {
			if (!evt.cancelBubble) {
				evt.cancelBubble = true;
			}
		}
	},
	onDomReady: function(fn) {
		QFM.event.onDomReady._fn = function() {
			fn();
			QFM.event.onDomReady._fn = null;
		};
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", QFM.event.onDomReady._fn, true);
		} else {
			var src = window.location.protocol == 'https:' ? '//:' : 'javascript:void(0)';
			document.write('<script onreadystatechange="if(this.readyState==\'complete\'){this.parentNode.removeChild(this);QFM.event.onDomReady._fn();}" defer="defer" src="' + src + '"><\/script\>');
		}
	}
};
QFM.media = {
	_tempImageList: [],
	adjustImageSize: function(w, h, trueSrc, callback, errCallback) {
		var ele = QFM.event.getTarget(),
			offset, _c = QFM.media._tempImageList;
		ele.onload = null;
		_c[offset = _c.length] = new Image();
		_c[offset].onload = (function(mainImg, tempImg, ew, eh) {
			return function() {
				tempImg.onload = null;
				var ow = tempImg.width,
					oh = tempImg.height;
				if (ow / oh > ew / eh) {
					if (ow > ew) {
						mainImg.width = ew;
					}
				} else {
					if (oh > eh) {
						mainImg.height = eh;
					}
				}
				mainImg.src = tempImg.src;
				_c[offset] = null;
				delete _c[offset];
				if (typeof(callback) == 'function') {
					callback(mainImg, w, h, tempImg, ow, oh);
				}
			};
		})(ele, _c[offset], w, h);
		_c[offset].onerror = function() {
			_c[offset] = _c[offset].onerror = null;
			delete _c[offset];
			if (typeof(errCallback) == 'function') {
				errCallback();
			}
		};
		_c[offset].src = trueSrc;
	}
};
QFM.cookie = {
	set: function(name, value, domain, path, hour) {
		if (hour) {
			var expire = new Date();
			expire.setTime(expire.getTime() + 3600000 * hour);
		}
		document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QFM.consts.domainPrefix + ";"));
		return true;
	},
	get: function(name) {
		var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
			m = document.cookie.match(r);
		return (!m ? "" : m[1]);
	},
	del: function(name, domain, path) {
		document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QFM.consts.domainPrefix + ";"));
	}
};
if (!window.$) {
	var $ = QFM.dom.getById;
}
var removeNode = QFM.dom.removeElement,
	addClass = QFM.css.addClassName,
	delClass = QFM.css.removeClassName;
addEvent = QFM.event.addEvent, delEvent = QFM.event.removeEvent;
QFM.FormSender = function(actionURL, data, formId) {
	this.uri = actionURL + '?g_tk=' + QOM.FP.getACSRFToken('skey') + '&g_ltk=' + QOM.FP.getACSRFToken('lskey');
	this.formId = formId;
	this.data = (typeof(data) == "object") ? data : null;
	this.data.g_tk = QOM.FP.getACSRFToken('skey');
	this.data.g_ltk = QOM.FP.getACSRFToken('lskey');
	this._sender = null;
	this.onSuccess = QFM.emptyFn;
	this.onError = QFM.emptyFn;
};
QFM.FormSender.prototype.send = function(type) {
	var type = type || false;
	if (this.data == null) {
		return false;
	}

	function clear(o) {
		o._sender = o._sender.callback = o._sender.errorCallback = o._sender.onreadystatechange = null;
		setTimeout(function() {
			removeNode($("_fp_frm_" + o.formId));
		}, 50)
	}
	if (this._sender === null || this._sender === void(0)) {
		var sender = QFM.dom.createNamedElement("iframe", "_fp_frm_" + this.formId);
		sender.id = "_fp_frm_" + this.formId;
		sender.style.width = sender.style.height = sender.style.borderWidth = "0";
		sender.style.display = "none";
		document.body.appendChild(sender);
		sender.callback = QFM.event.bind(this, function(o) {
			clearInterval(interval);
			clear(this);
			this.onSuccess(o);
		});
		sender.errorCallback = QFM.event.bind(this, function(o) {
			clearInterval(interval);
			clear(this);
			this.onError(o);
		});
		if (typeof sender.onreadystatechange != "undefined") {
			sender.onreadystatechange = QFM.event.bind(this, function() {
				if (this._sender.readyState == "complete" && this._sender.submited) {
					clear(this);
					this.onError();
				}
			});
		} else {
			var interval = setInterval(QFM.event.bind(this, function() {
				try {
					var _t = this._sender.contentWindow.location.href;
					if (_t.indexOf(this.uri) == 0) {
						clear(this);
						this.onError();
						clearInterval(interval);
					}
				} catch (err) {
					clear(this);
					this.onError();
					clearInterval(interval);
				}
			}), 100);
		}
		this._sender = sender;
	}
	var f = document.getElementById(this.formId),
		df = document.createDocumentFragment();
	if ($(this.formId + '_div')) {
		removeNode(this.formId + '_div');
	}
	QFM.dom.createElementIn("div", f, false, {
		"class": "none",
		"id": this.formId + '_div'
	});
	f.action = this.uri;
	for (var i in this.data) {
		tmp = QFM.dom.createNamedElement("input", i, document);
		tmp.type = "hidden";
		tmp.value = this.data[i];
		df.appendChild(tmp);
	}
	$(this.formId + '_div').appendChild(df);
	f.target = this._sender.id;
	if (type) {
		f.submit();
	}
	return true;
};
QFM.FormSender.prototype.destroy = function() {
	var n = this.name;
	delete QFM.FormSender.instance[n]._sender;
	QFM.FormSender.instance[n]._sender = null;
	delete QFM.FormSender.instance[n];
	QFM.FormSender.counter--;
	return null;
};
QFM.JsLoader = function() {
	this.onload = QFM.emptyFn;
	this.onerror = QFM.emptyFn;
};
QFM.JsLoader.prototype.load = function(src, doc, opt) {
	var opts = {},
		t = typeof(opt),
		o = this;
	if (t == "string") {
		opts.charset = opt;
	} else if (t == "object") {
		opts = opt;
	}
	opts.charset = opts.charset || "utf-8";
	setTimeout(function() {
		o._load.apply(o, [src, doc || document, opts]);
		o = null;
	}, 0);
};
QFM.JsLoader.prototype._load = function(src, doc, opts) {
	var _js = doc.createElement("script"),
		o = this,
		_rm = QFM.dom.removeElement,
		tmp, k;
	_js.onload = function() {
		if (!_js) {
			return;
		}
		o.onload();
		_rm(_js);
		_js = _rm = o = null;
	};
	_js.onerror = function() {
		o.onerror();
		_rm(_js);
		_js = _rm = o = null;
	};
	for (k in opts) {
		if (typeof(tmp = opts[k]) == "string" && k.toLowerCase() != "src") {
			_js.setAttribute(k, tmp);
		}
	}
	doc.getElementsByTagName("head")[0].appendChild(_js);
	_js.src = src;
	opts = null;
};
QFM.JSONGetter = function(actionURL, data, charset) {
	var cname = "_jsonInstence_" + (QFM.JSONGetter.counter + 1),
		prot = QFM.JSONGetter.instance[cname];
	QFM.JSONGetter.instance[cname] = prot = this;
	QFM.JSONGetter.counter++;
	this.onSuccess = QFM.emptyFn;
	this.onError = QFM.emptyFn;
	prot._uri = actionURL;
	prot._data = (data && (QFM.utils.getType(data) == "object" || QFM.utils.getType(data) == "string")) ? data : null;
	prot._charset = (QFM.utils.getType(charset) != "string") ? QFM.consts.defaultDataCharacterSet : charset;
	return prot;
};
QFM.JSONGetter.instance = {};
QFM.JSONGetter.counter = 0;
QFM.JSONGetter.genHttpParamString = function(o) {
	var r = [];
	for (var i in o) {
		r.push(i + "=" + encodeURIComponent(o[i]));
	}
	return r.join("&");
};
QFM.JSONGetter.prototype.send = function(callbackFnName) {
	var cfn = (QFM.utils.getType(callbackFnName) != "string") ? "callback" : callbackFnName,
		da = this._uri;
	if (this._data) {
		if (QFM.utils.getType(this._data) == "object") {
			da += ((da.indexOf("?") < 0 ? "?" : "&") + QFM.JSONGetter.genHttpParamString(this._data));
		} else {
			da += ((da.indexOf("?") < 0 ? "?" : "&") + this._data);
		}
	}
	window[cfn] = this.onSuccess;
	var _sd = new QFM.JsLoader();
	_sd.onerror = this.onError;
	_sd.load(da, void(0), this._charset);
	return;
};
QFM.event.onDomReady(QOM.init); /*  |xGv00|788139391fd5c4820a36aaa74ae9cf3b */