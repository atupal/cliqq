typeof progress == "function" && progress("qqweb.part2.js loaded", 0);
Jx().$package(function(f) {
	var e = f.dom,
		d = f.event,
		g, b = function() {
			if (!g) {
				var a = e.node("div", {
					"class": "dragMask"
				}),
					b = e.node("div", {
						"class": "dragProxy"
					});
				a.appendChild(b);
				e.getDoc().body.appendChild(a);
				g = {
					maskEl: a,
					proxyEl: b
				}
			}
			return g
		},
		c = new f.Class({
			_zIndex: 1,
			_inBorder: 5,
			_outBorder: 5,
			_windowFlag: 0,
			init: function(a) {
				f.profile("windowCreat" + a.windowId, "baseWindow");
				a = this.parseOption(a);
				this.subWinMarginLeft = this.subWinWidth = 0;
				this.desktopIndex = a.desktopIndex;
				this.setPrivateProperty();
				this.appendTo = a.appendTo;
				if (f.isUndefined(this._windowId)) throw "[BaseWindow.init]: _windowId is undefined!";
				this.createDom();
				e.setStyle(this._window_outer, "zIndex", this.option.zIndex);
				this.createEvent();
				this.option.hideWinBorder && this.hideWinBorder();
				this.option.hasToolBar && this.showToolBar()
			},
			parseOption: function() {
				throw "parseOption does not implement a required interface(Error in BaseWindow.parseOption())";
			},
			setPrivateProperty: function() {
				throw "setPrivateProperty does not implement a required interface(Error in BaseWindow.setPrivateProperty())";
			},
			getTemplate: function() {
				throw "getTemplate does not implement a required interface(Error in BaseWindow.getTemplate())";
			},
			initObserver: function() {
				var a = this;
				this.observer = {
					onMousedown: function() {
						f.browser.ie || (e.setStyle(a._dragProxy.proxyEl, "left", a.getX() + a._outBorder + "px"), e.setStyle(a._dragProxy.proxyEl, "top", a.getY() + a._outBorder + "px"), e.setStyle(a._dragProxy.proxyEl, "width", a._width - a._outBorder * 2 + "px"), e.setStyle(a._dragProxy.proxyEl, "height", a._height - a._outBorder * 2 + "px"), e.setStyle(a._dragProxy.maskEl, "zIndex", 60002), e.show(a._dragProxy.maskEl))
					},
					onMove: function(b) {
						a._x = b.x;
						a._y = b.y;
						if (a.subMode == 1 && a.isSubWinFloat && a.subWin) {
							var c = e.getRelativeXY(a._subBodyOuter, a.container.parentNode);
							a.subWin.setXY(c[0], c[1] + (f.browser.ie ? 2 : 0))
						}
						if (a.subMode == 2) {
							var c = a.getX(),
								h = a.getY();
							a.subWin.setXY(c + a.getWidth(), h)
						}
						d.notifyObservers(a, "dragMove", b)
					},
					onBeforeDragStart: function() {
						d.notifyObservers(a, "beforeDragStart")
					},
					onDragStart: function(b) {
						d.notifyObservers(a, "dragStart", b)
					},
					onDragEnd: function(b) {
						a.mask && a.mask.hide();
						d.notifyObservers(a, "dragEnd", b)
					},
					onResize: function(b) {
						b.width && a.setWinWidth(b.width);
						b.height && a.setWinHeight(b.height);
						d.notifyObservers(a, "resize", a.getBodySize())
					},
					onDragProxyEnd: function(b) {
						b && (e.hide(a._dragProxy.maskEl), a.setXY(b.x - a._outBorder, b.y - a._outBorder))
					},
					onDragProxyResizeEnd: function(b) {
						e.hide(a._dragProxy.maskEl);
						a.setXY(b.x - a._outBorder, b.y - a._outBorder);
						a.setWidth(b.width + a._outBorder * 2);
						a.setHeight(b.height + a._outBorder * 2);
						d.notifyObservers(a, "resize", a.getBodySize())
					}
				}
			},
			initDomReference: function() {
				throw "initDomReference does not implement a required interface(Error in BaseWindow.initDomReference())";
			},
			initButtons: function() {
				throw "initButtons does not implement a required interface(Error in BaseWindow.initButtons())";
			},
			createEvent: function() {
				throw "createEvent does not implement a required interface(Error in BaseWindow.createEvent())";
			},
			getAppId: function() {
				return this._appId
			},
			getButton: function(a) {
				return this["_" + a + "Button"] || null
			},
			getWindowFlags: function() {
				return this._windowFlag
			},
			setWindowFlags: function(a) {
				this._windowFlag = a
			},
			createDom: function() {
				f.out("CreateDom", "baseWindow");
				var a = this._windowId;
				this.getId = function() {
					return a
				};
				var b = this.getTemplate();
				this.container = e.node("div", {
					id: "appWindow_" + a,
					"class": "window window_current"
				});
				this.container.innerHTML = b;
				this.appendTo.appendChild(this.container);
				this.initDomReference();
				f.out("initDomReference", "baseWindow");
				this.initObserver();
				f.out("initObserver", "baseWindow");
				this.initButtons();
				f.out("initButtons", "baseWindow");
				this._width = Number(this._width);
				this._height = Number(this._height);
				this.setWidth(this._width);
				this.setHeight(this._height);
				this._toolbarHeight = 0;
				!f.isUndefined(this.option.x) && !f.isUndefined(this.option.y) && this.setXY(this.option.x, this.option.y);
				this.setTitle(this.option.title);
				this.option.html && this.setHtml(this.option.html)
			},
			getTitleBarHeight: function() {
				return this._titleBarHeight || (this._titleBarHeight = e.getHeight(this._titleBar))
			},
			setTitle: function(a) {
				a = f.string.encodeHtml(a);
				this.option.titleIcon && (a = '<span class="window_title_icon" style="background:url(' + this.option.titleIcon + ') no-repeat center center;">&nbsp;&nbsp;&nbsp;&nbsp;</span>' + a);
				this._title.innerHTML = a
			},
			setTitleHtml: function(a) {
				this._title.innerHTML = a
			},
			setToolBarHtml: function(a) {
				this._toolBar.innerHTML = a
			},
			showToolBarBtn: function() {
				e.show(this._toggleToolbar)
			},
			hideToolBarBtn: function() {
				e.hide(this._toggleToolbar)
			},
			setToolbar: function(a) {
				a ? this.showToolBar() : this.hideToolBar()
			},
			toggleToolBar: function() {
				this._toolbarIsShow ? this.hideToolBar() : this.showToolBar()
			},
			showToolBar: function() {},
			hideToolBar: function() {
				this._toolbarIsShow = !1;
				e.hide(this._toolBar);
				e.setStyle(this.body, "top", "0px");
				this._toolbarHeight = 0;
				this.setHeight(this.getBodyHeight());
				e.replaceClass(this._toggleToolbar, "app_toolbar_toggle_up", "app_toolbar_toggle_down");
				this._toggleToolbar.title = "\u5c55\u5f00\u5de5\u5177\u6761";
				alloy.util.report2app("apptoolbar|close")
			},
			isToolBarShow: function() {
				return this._toolbarIsShow
			},
			getToolBarHeight: function() {
				return this._toolbarHeight
			},
			getToolBar: function() {
				return this._toolButtonBar
			},
			setButton: function(a) {
				for (var b in a) {
					var d = !! a[b],
						c = [];
					switch (b) {
					case "hasRefreshButton":
						break;
					default:
						switch (this.windowType) {
						case "window":
							switch (b) {
							case "hasMaxButton":
								c.push(this._maxButton);
								c.push(this._restoreButton);
								break;
							case "hasMinButton":
								c.push(this._minButton)
							}
							break;
						case "widget":
							switch (b) {
							case "hasPinUpButton":
								c.push(this._pinUpButton), c.push(this._pinDownButton)
							}
						}
					}
					c.length && (f.array.forEach(c, function(a) {
						a && a.setAvailability(d)
					}), c = null)
				}
			},
			showCloseButton: function() {
				this._closeButton && this._closeButton.show()
			},
			showFullButton: function() {
				this._fullButton && this._fullButton.hide()
			},
			showMaxButton: function() {
				this._restoreButton && this._restoreButton.hide();
				this._maxButton && this._maxButton.show()
			},
			showRestoreButton: function() {
				this._maxButton && this._maxButton.hide();
				this._restoreButton && this._restoreButton.show()
			},
			showMinButton: function() {
				this._minButton && this._minButton.show()
			},
			showRefreshButton: function() {
				this._refreshButton && this._refreshButton.show()
			},
			showPinUpButton: function() {
				this._pinDownButton && this._pinDownButton.hide();
				this._pinUpButton && this._pinUpButton.show()
			},
			showPinDownButton: function() {
				this._pinUpButton && this._pinUpButton.hide();
				this._pinDownButton && this._pinDownButton.show()
			},
			disableOkButton: function(a) {
				this._okButton.disable(a)
			},
			showControlButton: function(a) {
				e.show(this._controlArea);
				e.setStyle(this.body, "bottom", "29px");
				e.addClass(this._window_outer, "window_has_controlArea");
				a.show()
			},
			hideControlArea: function() {
				e.hide(this._controlArea);
				e.setStyle(this.body, "bottom", "0");
				e.removeClass(this._window_outer, "window_has_controlArea")
			},
			getButtons: function() {
				if (this._buttons) return this._buttons
			},
			show: function() {
				e.show(this.container);
				e.getStyle(this.container, "visibility") && e.setStyle(this.container, "visibility", "visible");
				f.info(">>>> Window: show", "baseWindow");
				d.notifyObservers(this, "show", this.getBodySize());
				this._isShow = !0
			},
			hide: function(a) {
				a ? e.setStyle(this.container, "visibility", "hidden") : e.hide(this.container);
				d.notifyObservers(this, "hide");
				this._isShow = !1
			},
			isShow: function() {
				return this._isShow
			},
			toggleShow: function() {
				this.isShow() ? this.hide() : this.show()
			},
			setCurrent: function(a) {
				this.setCurrentWithoutFocus(a);
				this.focus()
			},
			setNotCurrent: function() {
				this.setWindowFlags(this.getWindowFlags() & ~c.CONST.WINDOW_FLAG_CURRENT | c.CONST.WINDOW_FLAG_NOT_CURRENT);
				this.setStyleNotCurrent();
				d.notifyObservers(this, "setNotCurrent")
			},
			setCurrentWithoutFocus: function(a) {
				a && a.fromInit && this.windowType === "widget" ? (this.show(), this.setNotCurrent()) : (this.getWindowFlags() & c.CONST.WINDOW_FLAG_CURRENT || (this.setStyleCurrent(), this.show(), this.setWindowFlags(this.getWindowFlags() | c.CONST.WINDOW_FLAG_CURRENT)), d.notifyObservers(this, "setCurrent"))
			},
			setStyleCurrent: function() {
				e.addClass(this.container, "window_current")
			},
			setStyleNotCurrent: function() {
				this.container && e.removeClass(this.container, "window_current")
			},
			focus: function() {
				d.notifyObservers(this, "focus")
			},
			setBoxStatus: function(a) {
				this._status = a
			},
			getBoxStatus: function() {
				return this._status
			},
			adjustSize: function(a, b, c, e) {
				!f.isUndefined(c) && !f.isUndefined(e) && this.setXY(c, e);
				this.setWinWidth(a);
				this.setWinHeight(b);
				d.notifyObservers(this, "resize", this.getBodySize())
			},
			max: function() {
				if (!(this.getWindowFlags() & c.CONST.WINDOW_FLAG_FULLSCREEN)) this._restoreX = this._x, this._restoreY = this._y;
				var a = this.getBoxStatus();
				this.setDisableDrag();
				this.setWindowFlags(this.getWindowFlags() & ~c.CONST.WINDOW_FLAG_NORMAL | c.CONST.WINDOW_FLAG_MAX);
				this.setBoxStatus("max");
				this.showRestoreButton();
				d.notifyObservers(this, "max", a);
				d.notifyObservers(this, "resize", this.getBodySize())
			},
			fullscreen: function() {
				if (this.getWindowFlags() & c.CONST.WINDOW_FLAG_NORMAL) this._restoreX = this._x, this._restoreY = this._y;
				this.setDisableDrag();
				this.setWindowFlags(this.getWindowFlags() | c.CONST.WINDOW_FLAG_FULLSCREEN);
				this.setBoxStatus("fullscreen");
				this._maxButton.hide();
				this._restoreButton.hide();
				this._fullButton.hide();
				this._restorefullButton.show();
				d.notifyObservers(this, "fullscreen", this.getBodySize());
				d.notifyObservers(this, "resize", this.getBodySize())
			},
			restorefull: function() {
				this.getWindowFlags() & c.CONST.WINDOW_FLAG_NORMAL ? this.restore() : this.max();
				this.setWindowFlags(this.getWindowFlags() & ~c.CONST.WINDOW_FLAG_FULLSCREEN);
				d.notifyObservers(this, "restorefull", this.getBoxStatus());
				d.notifyObservers(this, "resize", this.getBodySize())
			},
			min: function() {
				var a = this.getBoxStatus();
				this.setWindowFlags(this.getWindowFlags() & ~c.CONST.WINDOW_FLAG_CURRENT | c.CONST.WINDOW_FLAG_NOT_CURRENT | c.CONST.WINDOW_FLAG_MIN);
				this.option.isVisibilityMode ? this.hide(!0) : this.option.flashMode || this.hide();
				this.setBoxStatus(a || "min");
				this._isShow = !1;
				d.notifyObservers(this, "min");
				d.notifyObservers(this, "resize", this.getBodySize())
			},
			restore: function() {
				this.setWindowFlags(this.getWindowFlags() & ~c.CONST.WINDOW_FLAG_MAX | c.CONST.WINDOW_FLAG_NORMAL);
				this.setXY(this._restoreX, this._restoreY);
				if (this._restoreWidth < 0) this._restoreWidth = 0;
				if (this._restoreHeight < 0) this._restoreHeight = 0;
				this.setWidth(this._restoreWidth);
				this.setHeight(this._restoreHeight);
				this._dragController && this._dragController.lock();
				this.setEnableDrag();
				this.option.hasMaxButton && (this.showMaxButton(), this._restorefullButton.hide(), this.option.noFullButton && this._fullButton.hide());
				this.setBoxStatus("restore");
				d.notifyObservers(this, "restore");
				d.notifyObservers(this, "resize", this.getBodySize())
			},
			setZIndexLevel: function(a) {
				this.zIndexLevel = a
			},
			getZIndexLevel: function() {
				return this.zIndexLevel
			},
			setLockZIndex: function(a) {
				this._isLockZIndex = a
			},
			isLockZIndex: function() {
				return this._isLockZIndex
			},
			setWidth: function(a) {
				this.setBodyWidth(a)
			},
			setWinWidth: function(a) {
				var a = a || this._width,
					b = this.isBorderHide ? 0 : 10;
				this._bodyWidth = a - b * 2 - this.option.bodyBorder * 2 - this.subWinWidth - this.subWinMarginLeft;
				this._width = a;
				e.setStyle(this.container, "width", a + "px");
				e.setStyle(this._bodyOuter, "width", this._bodyWidth + this.subWinWidth + this.subWinMarginLeft + "px");
				e.setStyle(this.body, "width", this._bodyWidth + "px");
				e.setStyle(this._window_outer, "padding", b + "px");
				if (this.getBoxStatus() !== "max" && this.getBoxStatus() !== "fullscreen") this._restoreWidth = this._bodyWidth
			},
			setBodyWidth: function(a) {
				var a = a || this._bodyWidth,
					b;
				b = this.option.bodyBorder * 2;
				this.isBorderHide ? (b = a + b, e.setStyle(this._window_outer, "padding", "0px")) : (b = a + b + 20, e.setStyle(this._window_outer, "padding", "10px"));
				this._bodyWidth = a;
				this._width = b = b + this.subWinWidth + this.subWinMarginLeft;
				e.setStyle(this.container, "width", b + "px");
				e.setStyle(this._bodyOuter, "width", a + this.subWinWidth + this.subWinMarginLeft + "px");
				e.setStyle(this.body, "width", a + "px");
				if (this.getBoxStatus() !== "max" && this.getBoxStatus() !== "fullscreen") this._restoreWidth = this._bodyWidth
			},
			getBodyWidth: function() {
				return this._bodyWidth
			},
			getWidth: function() {
				return this._width
			},
			getWinWidth: function() {
				return this._width
			},
			getHeight: function() {
				return this._height
			},
			getWinHeight: function() {
				return this._height
			},
			setHeight: function(a) {
				this.setBodyHeight(a)
			},
			setWinHeight: function(a) {
				var a = a || this._height,
					b = this.getTitleBarHeight(),
					c = this.option.bodyBorder * 2,
					h = 0,
					m = 0;
				this._controlArea && e.isShow(this._controlArea) && (h = 29);
				if (this._toolbarHeight) m = this._toolbarHeight;
				this.isBorderHide ? (h = a, e.setStyle(this._window_outer, "padding", "0px"), e.setStyle(this._bodyOuter, "top", "0"), b = a - c) : (h = a - b - m - h - 20 - c, e.setStyle(this._window_outer, "padding", "10px"), e.setStyle(this._bodyOuter, "top", b + "px"), b = a - 20 - c);
				f.browser.ie == 6 && (b -= b % 2);
				e.setStyle(this._window_outer, "height", b + "px");
				this._bodyHeight = h + 1;
				this._height = a;
				e.setStyle(this.body, "height", this._bodyHeight - c + "px");
				e.setStyle(this._bodyOuter, "height", this._bodyHeight + m - c + "px");
				e.setStyle(this.container, "height", a + "px");
				if (this.getBoxStatus() !== "max" && this.getBoxStatus() !== "fullscreen") this._restoreHeight = this._bodyHeight;
				d.notifyObservers(this, "setNewHeight", a)
			},
			setBodyHeight: function(a) {
				var a = a || this._bodyHeight,
					b = this.getTitleBarHeight(),
					c = this.option.bodyBorder * 2,
					h = 0,
					m = 0;
				this._controlArea && e.isShow(this._controlArea) && (h = 29);
				if (this._toolbarHeight) m = this._toolbarHeight;
				this.isBorderHide ? (h = a, e.setStyle(this._window_outer, "padding", "0px"), e.setStyle(this._bodyOuter, "top", "0"), b = h - c) : (h = a + b + m + h + 20 + c, e.setStyle(this._window_outer, "padding", "10px"), e.setStyle(this._bodyOuter, "top", b + "px"), b = h - 20 - c);
				f.browser.ie == 6 && (b -= b % 2);
				e.setStyle(this._window_outer, "height", b + "px");
				this._bodyHeight = a + 1;
				this._height = h;
				e.setStyle(this.body, "height", this._bodyHeight - c + "px");
				e.setStyle(this._bodyOuter, "height", this._bodyHeight + m - c + "px");
				e.setStyle(this.container, "height", h + "px");
				if (this.getBoxStatus() !== "max" && this.getBoxStatus() !== "fullscreen") this._restoreHeight = this._bodyHeight;
				d.notifyObservers(this, "setNewHeight", this._height)
			},
			getBodyHeight: function() {
				return this._bodyHeight
			},
			setWinSize: function(a) {
				this.setWinWidth(a.width);
				this.setWinHeight(a.height);
				d.notifyObservers(this, "resize", this.getBodySize())
			},
			setBodySize: function(a) {
				this.setBodyWidth(a.width);
				this.setBodyHeight(a.height);
				d.notifyObservers(this, "resize", this.getBodySize())
			},
			getZIndex: function() {
				return this._zIndex
			},
			setZIndex: function(a) {
				e.setStyle(this.container, "zIndex", a);
				e.setStyle(this._window_inner, "zIndex", a);
				this._zIndex = a
			},
			setXY: function(a, b) {
				(a || a === 0) && this.setX(a);
				(b || b === 0) && this.setY(b)
			},
			setX: function(a) {
				this._x = a;
				e.setStyle(this.container, "left", a + "px");
				d.notifyObservers(this, "positionChanged")
			},
			setY: function(a) {
				this._y = a;
				e.setStyle(this.container, "top", a + "px");
				d.notifyObservers(this, "positionChanged")
			},
			getX: function() {
				return parseInt(e.getStyle(this.container, "left"))
			},
			getRestoreX: function() {
				return this._restoreX
			},
			getRestoreY: function() {
				return this._restoreY
			},
			getLeft: function() {
				return this._x
			},
			getY: function() {
				return parseInt(e.getStyle(this.container, "top"))
			},
			getXY: function() {
				return {
					x: this.getX(),
					y: this.getY()
				}
			},
			getRestoreXY: function() {
				return {
					x: this.getRestoreX(),
					y: this.getRestoreY()
				}
			},
			setLeft: function(a) {
				e.setStyle(this.container, "left", a + "px");
				e.setStyle(this.container, "right", "")
			},
			setTop: function(a) {
				e.setStyle(this.container, "top", a + "px");
				e.setStyle(this.container, "bottom", "")
			},
			setRight: function(a) {
				e.setStyle(this.container, "right", a + "px");
				e.setStyle(this.container, "left", "")
			},
			setBottom: function(a) {
				e.setStyle(this.container, "bottom", a + "px");
				e.setStyle(this.container, "top", "")
			},
			setWindowCentered: function() {
				d.notifyObservers(this, "setCenter")
			},
			setWindowCenteredRelative: function(a) {
				this.setX(a.getX() + (a.getWidth() - this._width) / 2)
			},
			enableDrag: function() {
				this.option.dragable = !0;
				this.getBoxStatus() !== "max" && this.getBoxStatus() !== "fullscreen" && this.setEnableDrag()
			},
			disableDrag: function() {
				this.option.dragable = !1;
				this.setDisableDrag()
			},
			enableDragProxy: function() {
				this.option.dragProxy = !0
			},
			disableDragProxy: function() {
				this.option.dragProxy = !1
			},
			setEnableDrag: function() {
				if (this.option.dragable) {
					if (this._dragController) {
						if (this.option.dragProxy) d.on(this.container, "mousedown", this.observer.onMousedown);
						this._dragController.unlock()
					} else this.option.dragProxy ? (this._dragProxy = b(), d.on(this.container, "mousedown", this.observer.onMousedown), this._dragController = new f.ui.Drag(this.container, this._dragProxy.proxyEl, {
						isLimited: !0,
						clientEl: this.option.dragLimitEl || this.option.appendTo,
						leftMargin: this._leftMargin + this._outBorder,
						topMargin: this._topMargin + this._outBorder,
						rightMargin: this._rightMargin + this._outBorder,
						bottomMargin: this._bottomMargin + this._outBorder,
						isOverLeft: !0,
						isOverRight: !0,
						isLockCursorInScreen: !0
					}), d.addObserver(this._dragController, "end", this.observer.onDragProxyEnd)) : (this._dragController = new f.ui.Drag(this.container, this.container, {
						isLimited: !0,
						clientEl: this.option.dragLimitEl || this.option.appendTo,
						leftMargin: this._leftMargin,
						topMargin: this._topMargin,
						rightMargin: this._rightMargin,
						bottomMargin: this._bottomMargin,
						isOverLeft: !0,
						isOverRight: !0,
						isLockCursorInScreen: !0
					}), d.addObserver(this._dragController, "move", this.observer.onMove)), d.addObserver(this._dragController, "beforeStart", this.observer.onBeforeDragStart), d.addObserver(this._dragController, "start", this.observer.onDragStart), d.addObserver(this._dragController, "end", this.observer.onDragEnd);
					this.setEnableResize()
				}
			},
			setDisableDrag: function() {
				this._dragController && (this._dragController.lock(), this.option.dragProxy && d.off(this.container, "mousedown", this.observer.onMousedown));
				this.setDisableResize()
			},
			setDragLimite: function(a) {
				this._dragController.setLimite(a)
			},
			onDrag: function(a) {
				(!f.browser.ie || !(f.browser.ie <= 6 && (a.target.tagName == "A" || a.target.parentNode && a.target.parentNode.tagName == "A"))) && this.startDrag([a.pageX, a.pageY])
			},
			startDrag: function(a) {
				var b = this,
					c = b.container.children[0];
				e.hide(c);
				b.mask && b.mask.remove();
				b.mask = new f.ui.MaskLayer({
					appendTo: b.container,
					opacity: 0
				});
				b.mask.show();
				e.show(c);
				if (typeof a != "undefined") c = e.getClientXY(this.body), this._dragController.dragStartIn(a[0] + c[0], a[1] + c[1]);
				else {
					var h = function(a) {
							b._dragController.dragStart(a);
							d.off(document, "mousemove", h)
						};
					d.on(document, "mousemove", h)
				}
			},
			enableResize: function() {
				this.option.resize = !0;
				this.getBoxStatus() !== "max" && this.setEnableResize()
			},
			disableResize: function() {
				this.option.dragable = !1;
				this.setDisableResize()
			},
			setEnableResize: function() {
				if (this.option.resize) this._resizeController ? (this.option.dragProxy && d.addObserver(this._resizeController, "mousedown", this.observer.onMousedown), this._resizeController.show()) : (this.option.dragProxy ? (this._dragProxy = b(), this._resizeController = new f.ui.Resize(this._window_inner, this._dragProxy.proxyEl, {
					isLimited: !0,
					leftMargin: this._leftMargin,
					topMargin: this._topMargin,
					rightMargin: this._rightMargin,
					bottomMargin: this._bottomMargin,
					minWidth: this._minWidth,
					minHeight: this._minHeight,
					dragProxy: this._dragProxy
				}), d.addObserver(this._resizeController, "mousedown", this.observer.onMousedown), d.addObserver(this._resizeController, "end", this.observer.onDragProxyResizeEnd)) : (this._resizeController = new f.ui.Resize(this._window_inner, this.container, {
					isLimited: !0,
					leftMargin: this._leftMargin,
					topMargin: this._topMargin,
					rightMargin: this._rightMargin,
					bottomMargin: this._bottomMargin,
					minWidth: this._minWidth,
					minHeight: this._minHeight
				}), d.addObserver(this._resizeController, "resize", this.observer.onResize)), d.addObserver(this._resizeController, "mousedown", this.observer.onDragStart), d.addObserver(this._resizeController, "end", this.observer.onDragEnd))
			},
			setDisableResize: function() {
				this._resizeController && (this._resizeController.hide(), this.option.dragProxy && d.removeObserver(this._resizeController, "mousedown", this.observer.onMousedown))
			},
			setLimite: function(a) {
				a = a || {};
				if (this.isLimited) this._leftMargin = a.leftMargin, this._topMargin = a.topMargin, this._rightMargin = a.rightMargin, this._bottomMargin = a.bottomMargin
			},
			setMinLimite: function(a) {
				this._resizeController && (this._resizeController.setWidth(this._width), this._resizeController.setMinLimite(a))
			},
			setHtml: function(a) {
				this.html = a;
				this.body.innerHTML = a
			},
			setBorderOpacity: function(a) {
				f.browser.ie && f.browser.ie < 9 || e.setStyle(this._bg_container, "opacity", a)
			},
			setOpacity: function(a) {
				f.browser.ie && f.browser.ie < 9 || e.setStyle(this.container, "opacity", a)
			},
			append: function(a) {
				this.body.appendChild(a)
			},
			getSize: function() {
				return {
					width: e.getClientWidth(this.container),
					height: e.getClientHeight(this.container)
				}
			},
			getBodySize: function() {
				return {
					width: parseInt(e.getStyle(this.body, "width"), 10),
					height: parseInt(e.getStyle(this.body, "height"), 10)
				}
			},
			getSelfDomObj: function() {
				return this.container
			},
			hideWinBorder: function() {
				if (!this.isBorderHide) this.isBorderHide = !0, e.hide(this._window_bg), e.hide(this._titleBar), this.setWidth(this.getBodyWidth()), this.setHeight(this.getBodyHeight())
			},
			showWinBorder: function() {
				if (this.isBorderHide) this.isBorderHide = !1, e.show(this._window_bg), e.show(this._titleBar), this.setWidth(this.getBodyWidth()), this.setHeight(this.getBodyHeight())
			},
			toggleWinBorder: function() {
				this.isBorderHide ? this.showWinBorder() : this.hideWinBorder()
			},
			setSubMode: function(a, b) {
				switch (a) {
				case 1:
					this.setSubWinInner(b);
					break;
				case 2:
					this.setSubWinFollow(b);
					break;
				default:
					this.setSubWinNone(b)
				}
				this.subMode = a
			},
			setSubWinInner: function(a) {
				a = a || {};
				this.subMode = 1;
				this.subWinWidth = this.subWinWidth || 200;
				this.subWinMarginLeft = 10;
				var b = this.getId();
				this.getBoxStatus() != "fullscreen" && this.getBoxStatus() != "max" ? (this.setBodyWidth(a.width || this._bodyWidth), this.setBodyHeight(a.height || this._bodyHeight)) : (this.setWinWidth(), this.setWinHeight());
				this._subBodyOuter ? e.show(this._subBodyOuter) : (this._subBodyOuter = e.node("div", {
					"class": "window_bodyArea",
					id: "window_sub_body_" + b
				}), this._bodyOuter.appendChild(this._subBodyOuter));
				e.setStyle(this._subBodyOuter, "width", this.subWinWidth + "px");
				e.setStyle(this._subBodyOuter, "height", this._bodyHeight + "px");
				e.setStyle(this._subBodyOuter, "right", "5px");
				e.setStyle(this.subWin.container, "left", "0");
				e.setStyle(this.subWin.container, "top", "0");
				this.subWin.hideWinBorder();
				this.isSubWinFloat ? (b = e.getRelativeXY(this._subBodyOuter, this.container.parentNode), this.subWin.setXY(b[0], b[1] + (f.browser.ie ? 2 : 0))) : this._subBodyOuter.appendChild(this.subWin.container);
				this.setCurrent();
				a.isSubWinFloat && this.subWin.setZIndex(this.getZIndex() + 1);
				this.setMinLimite({
					minWidth: this._width,
					minHeight: this._height
				})
			},
			hideSubWinInner: function() {
				this.subWinMarginLeft = this.subWinWidth = 0;
				this.subWin.showWinBorder();
				this.setBodyWidth(this._bodyWidth);
				this._subBodyOuter && e.hide(this._subBodyOuter);
				var a = this.getX(),
					b = this.getY();
				this.subWin.setXY(a + this.getWidth(), b);
				this.isSubWinFloat || this.subWin.option.appendTo.appendChild(this.subWin.container);
				a = this._restoreX;
				b = this._restoreY;
				this.getBoxStatus() == "fullscreen" ? (this.fullscreen(), this._restoreX = a, this._restoreY = b, this._restoreWidth = this.option.width, this._restoreHeight = this.option.height) : this.getBoxStatus() == "max" ? (this.max(), this._restoreX = a, this._restoreY = b, this._restoreWidth = this.option.width, this._restoreHeight = this.option.height) : (this.setWidth(this.option.width), this.setHeight(this.option.height));
				this.setMinLimite({
					minWidth: this._minWidth,
					minHeight: this._minHeight
				})
			},
			setSubWinFollow: function() {
				this.subMode != 2 && this.removeSubordinate();
				this.subMode = 2;
				var a = this.getX(),
					b = this.getY();
				this.subWin.setXY(a + this.getWidth(), b);
				var c = this,
					f = function() {
						c.setSubWinNone();
						d.removeObserver(this.subWin._dragController, "move", f)
					};
				d.addObserver(this.subWin._dragController, "move", f)
			},
			setSubWinNone: function() {
				if (this.subMode != 0) this.subMode = 0, this.hideSubWinInner()
			},
			getSubMode: function() {
				return this.subMode
			},
			addSubordinate: function(a, b) {
				if (!this.subWin) {
					this.subWin = a;
					if (b.subWinWidth) this.subWinWidth = b.subWinWidth;
					var c = !b || !b.mode ? 1 : b.mode;
					this.isSubWinFloat = b.isSubWinFloat ? !0 : !1;
					this.setSubMode(c, b)
				}
			},
			removeSubordinate: function() {
				if (this.subWin) this.setSubMode(0), this.subWin = null, this.subWinWidth = 0, this.isSubWinFloat = !1
			},
			close: function() {
				if (d.notifyObservers(this, "beforeClose", this) === !1) return !1;
				if (d.notifyObservers(this, "close", this) === !1) return !1;
				this.destroy();
				d.notifyObservers(this, "afterClose", this)
			},
			destroy: function() {
				d.notifyObservers(this, "destroy", this);
				var a = this.container.parentNode;
				this.container.innerHTML = "";
				a.removeChild(this.container);
				for (var b in this) this.hasOwnProperty(b) && delete this[b];
				this._isDestroy = !0
			},
			isDestroy: function() {
				return this._isDestroy
			}
		});
	c.CONST = {
		WINDOW_FLAG_MIN: 1,
		WINDOW_FLAG_NORMAL: 2,
		WINDOW_FLAG_MAX: 4,
		WINDOW_FLAG_CURRENT: 8,
		WINDOW_FLAG_NOT_CURRENT: 16,
		WINDOW_FLAG_FULLSCREEN: 32
	};
	f.ui.BaseWindow = c
});
Jx().$package(function(f) {
	var e = f.event,
		d = f.dom,
		g = f.browser,
		b = new f.Class({
			init: function(a) {
				if (!a.appendTo) throw Error("BaseEditor: appendTo is undefined.");
				this.option = {
					keepCursor: a.keepCursor || !1,
					brNewline: a.brNewline || !1,
					clearNode: a.clearNode || !1,
					nodeFilter: a.nodeFilter || null
				};
				var c = a.className || "rich_editor",
					k = this._container = d.node("div", {
						"class": c
					}),
					h = this._divArea = d.node("div", {
						"class": a.richClassName || c + "_div"
					}),
					c = this._textArea = d.node("textarea", {
						"class": a.textClassName || c + "_text"
					});
				k.appendChild(h);
				k.appendChild(c);
				a.appendTo.appendChild(k);
				this.setState(!0);
				this.clear();
				var m = this;
				this._private = {
					startTimeoutSaveRange: function(a) {
						this.clearTimeoutSaveRange();
						this._keyupTimer = window.setTimeout(this.timeoutSaveRange, a || 0)
					},
					timeoutSaveRange: function() {
						m.saveRange(!0)
					},
					clearTimeoutSaveRange: function() {
						if (this._keyupTimer) window.clearTimeout(this._keyupTimer), this._keyupTimer = 0
					},
					startTimeoutClearNodes: function(a) {
						this.clearTimeoutClearNodes();
						this._clearNodesTimer = window.setTimeout(this.timeoutClearNodes, a || 0)
					},
					timeoutClearNodes: function() {
						m.clearNodes()
					},
					clearTimeoutClearNodes: function() {
						if (this._clearNodesTimer) window.clearTimeout(this._clearNodesTimer), this._clearNodesTimer = 0
					}
				};
				e.on(h, "blur", f.bind(b.observer.onBlur, m));
				e.on(h, "mouseup", f.bind(b.observer.onMouseup, m));
				e.on(h, "drop", f.bind(b.observer.onDrop, m));
				e.on(h, "paste", f.bind(b.observer.onPaste, m));
				e.on(h, "keyup", f.bind(b.observer.onKeyup, m));
				if (g.ie) e.on(h, "keydown", f.bind(b.observer.onBackspaceKeydown, m));
				if (g.adobeAir) e.on(h, "keyup", f.bind(b.observer.onAdobeAirKeyup, m));
				if (f.platform.linux && g.firefox) e.on(h, "keypress", f.bind(b.observer.onLinuxKeypress, m));
				else if (f.platform.win && g.opera) e.on(h, "keypress", f.bind(b.observer.onKeydown, m));
				else e.on(h, "keydown", f.bind(b.observer.onKeydown, m));
				e.addObserver(this, "Paste", f.bind(b.observer.onEditorPaste, m));
				if (g.firefox) e.on(h, "keypress", f.bind(b.observer.onKeypress, m))
			},
			onKeyUp: function() {},
			isEnable: function() {
				return this._isEnable
			},
			setState: function(a) {
				this._isEnable = a;
				var b = this._textArea,
					c = this._divArea;
				a ? (d.show(c), d.hide(b), b.readonly = !0, c.setAttribute("contentEditable", !0)) : (d.hide(c), d.show(b), b.readonly = !1, c.setAttribute("contentEditable", !1))
			},
			isEditable: function() {
				return this._isEditable
			},
			setEditable: function(a) {
				this._isEditable = a;
				this._isEnable ? this._divArea.setAttribute("contenteditable", a) : this._textArea.readonly = !a
			},
			destroy: function() {
				e.off(divArea, "focus");
				e.off(divArea, "blur");
				e.off(divArea, "mousedown");
				e.off(divArea, "mouseup");
				e.off(divArea, "keyup");
				e.off(divArea, "paste");
				e.off(divArea, "drop");
				e.off(divArea, "keypress");
				e.off(divArea, "keydown");
				this.setState(!1);
				this._container.parentNode.removeChild(this._container);
				for (var a in this) this.hasOwnProperty(a) && delete this[a]
			},
			getHtml: function() {
				return this._divArea.innerHTML
			},
			setHtml: function(a) {
				this._divArea.innerHTML = a
			},
			clear: function() {
				this._isEnable ? (this.option.keepCursor && this.saveRange(!0), g.ie ? this.setHtml("") : this.setHtml("<br/>")) : this.setText("")
			},
			setText: function(a) {
				this._textArea.value = a
			},
			getText: function() {
				return this._textArea.value
			},
			isEmpty: function() {
				if (this._isEnable) {
					var a = this.getHtml();
					return a === "" ? !0 : !g.ie && a.toLowerCase() === "<br>" ? !0 : !1
				} else return this.getText() === "" ? !0 : !1
			},
			focus: function() {
				this._isEnable ? (this._divArea.focus(), this.option.keepCursor && this.restoreRange()) : this._textArea.focus()
			},
			blur: function() {
				this._isEnable ? this._divArea.blur() : this._textArea.blur()
			},
			save: function() {
				this.setText(this.getHtml())
			},
			restore: function() {
				this.setHtml(this.getText())
			},
			getRange: function() {
				return b.getRange(this._divArea)
			},
			saveRange: function(a) {
				if (a = a ? this.getRange() : b.getRange()) this._lastRange = a
			},
			restoreRange: function() {
				if (this._lastRange) {
					var a = b.getSelection();
					a.addRange ? (a.removeAllRanges(), a.addRange(this._lastRange)) : this._lastRange && this._lastRange.select()
				}
			},
			insertHtml: function(a) {
				if (a !== "") {
					var c = this.getRange();
					if (c) if (c.pasteHTML) c.pasteHTML(a), c.collapse(!1), c.select();
					else if (c.length) b.getSelection().clear(), c = b.getRange(), c.pasteHTML(a), c.collapse(!1), c.select();
					else {
						if (c.createContextualFragment) {
							a += '<img style="display:inline;width:1px;height:1px;">';
							var f = c.createContextualFragment(a),
								a = f.lastChild;
							c.deleteContents();
							c.insertNode(f);
							c.setEndAfter(a);
							c.setStartAfter(a);
							f = b.getSelection();
							f.removeAllRanges();
							f.addRange(c);
							c = this._divArea;
							f = d.getRelativeXY(a, c);
							c.scrollTop = f[1] < c.scrollHeight ? c.scrollHeight : f[1];
							g.opera || document.execCommand("Delete", !1, null);
							b.contains(c, a) && c.removeChild(a)
						}
					} else if (this.isEmpty() ? this._divArea.innerHTML = a : this._divArea.innerHTML += a, c = b.getRange()) a = this._divArea.lastChild, c.selectNode ? (c.setEndAfter(a), c.setStartAfter(a), f = b.getSelection(), f.removeAllRanges(), f.addRange(c)) : c.moveToElementText && (c.moveToElementText(a), c.collapse(!1), c.select());
					this.option.keepCursor && this.saveRange()
				}
			},
			insertText: function(a) {
				if (a !== "") {
					var c = this._textArea;
					if (g.ie) {
						var d = b.getRange();
						d ? d.text = a : c.value += a
					} else if (f.isUndefined(c.selectionStart)) c.value += a;
					else {
						var d = c.value,
							e = c.selectionStart,
							m = c.selectionEnd,
							n = e + a.length;
						c.value = d.substring(0, e) + a + d.substring(m);
						c.setSelectionRange(n, n)
					}
				}
			},
			newline: function() {
				this._isEnable ? this.insertHtml("<br/>") : this.insertText("\n")
			},
			clearNodes: function() {
				for (var a = this._divArea, c, d, f = a.childNodes, e = f.length - 1, g; e >= 0; e--) if (g = f[e], g.nodeType !== 3) if (g.nodeType === 1) {
					if (g.nodeName !== "BR" && (!this.option.nodeFilter || !this.option.nodeFilter(g))) c = g.textContent || g.innerText || "", c !== "" ? (c = document.createTextNode(c), d || (d = c), a.replaceChild(c, g)) : a.removeChild(g)
				} else a.removeChild(g);
				d && (a = b.getSelection(), a.extend && (a.extend(d, d.length), a.collapseToEnd()))
			}
		});
	b.observer = {
		onBlur: function() {
			this._private.clearTimeoutSaveRange()
		},
		onMouseup: function() {
			this.option.keepCursor && this.saveRange()
		},
		onLinuxKeypress: function(a) {
			var b = Number(a.keyCode),
				c = a.altKey,
				d = a.ctrlKey,
				f = a.shiftKey;
			Number(a.charCode) === 118 && d && !c && !f ? e.notifyObservers(this, "Paste", a) : b === 13 && this.option.brNewline && (a.preventDefault(), this.newline())
		},
		onAdobeAirKeyup: function(a) {
			var b = a.altKey,
				c = a.ctrlKey,
				d = a.shiftKey;
			Number(a.keyCode) === 86 && c && !b && !d && e.notifyObservers(this, "Paste", a)
		},
		onBackspaceKeydown: function(a) {
			var c = a.altKey,
				d = a.ctrlKey,
				f = a.shiftKey;
			Number(a.keyCode) === 8 && !d && !c && !f && (c = b.getSelection(), c.type.toLowerCase() === "control" && (a.preventDefault(), c.clear()))
		},
		onKeydown: function(a) {
			var b = Number(a.keyCode),
				c = a.altKey,
				d = a.ctrlKey,
				f = a.shiftKey;
			b === 86 && d && !c && !f ? e.notifyObservers(this, "Paste", a) : b === 13 && this.option.brNewline && (a.preventDefault(), this.newline())
		},
		onKeyup: function(a) {
			var b = Number(a.keyCode);
			b === 16 || b === 17 || b === 18 || this.option.keepCursor && this._private.startTimeoutSaveRange(100);
			this.onKeyUp(a)
		},
		onKeypress: function(a) {
			this.onKeyUp(a)
		},
		onPaste: function() {
			this.option.clearNode && this._private.startTimeoutClearNodes(200)
		},
		onDrop: function() {
			this.option.clearNode && this._private.startTimeoutClearNodes()
		},
		onEditorPaste: function(a) {
			e.notifyObservers(this, "EditorPaste", a) && this.option.clearNode && this._private.startTimeoutClearNodes()
		}
	};
	b.getSelection = function() {
		return document.selection ? document.selection : window.getSelection()
	};
	b.getRange = function(a) {
		var c = b.getSelection();
		if (!c) return null;
		c = c.getRangeAt ? c.rangeCount ? c.getRangeAt(0) : null : c.createRange();
		return !c ? null : a ? b.containsRange(a, c) ? c : null : c
	};
	b.contains = function(a, b, c) {
		if (!c && a === b) return !1;
		if (a.compareDocumentPosition) {
			if (a = a.compareDocumentPosition(b), a == 20 || a == 0) return !0
		} else if (a.contains(b)) return !0;
		return !1
	};
	b.containsRange = function(a, c) {
		var d = c.commonAncestorContainer || c.parentElement && c.parentElement() || null;
		if (d) return b.contains(a, d, !0);
		else if (c.length) return b.contains(a, c.item(0), !0);
		return !1
	};
	var c = new f.Class({
		extend: b
	}, {
		init: function(a) {
			var b = this;
			this.callSuper = function(a) {
				var d = Array.prototype.slice,
					f = d.call(arguments, 1);
				c.superClass[a].apply(b, f.concat(d.call(arguments)))
			};
			this.callSuper("init", a)
		}
	});
	f.ui.BaseEditor = b;
	f.ui.RichEditor = c
});
Jx().$package("alloy.businessClass", function(f) {
	var e = f.dom,
		d = f.event,
		g = new f.Class({
			extend: f.ui.BaseWindow
		}, {
			init: function(b) {
				var c = this;
				this.windowType = "window";
				this.callSuper = function(a) {
					var b = Array.prototype.slice,
						d = b.call(arguments, 1);
					g.superClass[a].apply(c, d.concat(b.call(arguments)))
				};
				this.callSuper("init", b)
			},
			parseOption: function(b) {
				b = b || {};
				b.type = b.type || "default";
				b.ieOnly = f.isUndefined(b.ieOnly) ? !1 : b.ieOnly;
				b.loginLevel = f.isUndefined(b.loginLevel) ? 1 : b.loginLevel;
				b.isTask = f.isUndefined(b.isTask) ? !0 : b.isTask;
				b.width = b.width || 600;
				b.height = b.height || 450;
				b.minWidth = b.minWidth || 180;
				b.minHeight = b.minHeight || 100;
				b.zIndex = !f.isUndefined(b.zIndex) ? b.zIndex : "99999";
				b.title = b.title || "\u672a\u547d\u540d";
				b.titleIcon = b.titleIcon || !1;
				b.html = b.html || "";
				b.modeSwitch = b.modeSwitch == !0 ? !0 : !1;
				b.isSetCurrent = b.isSetCurrent ? b.isSetCurrent : !0;
				b.defaultMode = b.defaultMode ? b.defaultMode : "restore";
				b.dragable = b.dragable == !0 ? !0 : !1;
				b.resize = b.resize == !0 ? !0 : !1;
				b.dragProxy = b.dragProxy == !0 ? !0 : !1;
				b.dragProxy = !1;
				b.dragLimitEl = b.dragLimitEl || !1;
				b.isFixedZIndex = b.isFixedZIndex == !0 ? !0 : !1;
				b.isSetCentered = b.isSetCentered == !0 ? !0 : !1;
				b.hasCloseButton = b.hasCloseButton == !0 ? !0 : !1;
				b.hasMaxButton = b.hasMaxButton == !0 ? !0 : !1;
				b.hasRestoreButton = b.hasRestoreButton == !0 ? !0 : !1;
				b.hasMinButton = b.hasMinButton == !0 ? !0 : !1;
				b.hasRefreshButton = b.hasRefreshButton == !0 ? !0 : !1;
				b.hasPinUpButton = b.hasPinUpButton == !0 ? !0 : !1;
				b.hasPinDownButton = b.hasPinDownButton == !0 ? !0 : !1;
				b.hasOkButton = b.hasOkButton == !0 ? !0 : !1;
				b.hasCancelButton = b.hasCancelButton == !0 ? !0 : !1;
				b.hasPreviousButton = b.hasPreviousButton == !0 ? !0 : !1;
				b.hasNextButton = b.hasNextButton == !0 ? !0 : !1;
				b.leftMargin = b.leftMargin || 0;
				b.topMargin = b.topMargin || 0;
				b.rightMargin = b.rightMargin || 0;
				b.bottomMargin = b.bottomMargin || 0;
				b.doubleClickModeSwitch = f.isUndefined(b.doubleClickModeSwitch) && b.hasMaxButton === !1 ? !1 : b.doubleClickModeSwitch === !1 ? !1 : !0;
				b.bodyBorder = f.isUndefined(b.bodyBorder) ? 1 : b.bodyBorder;
				return this.option = b
			},
			setPrivateProperty: function() {
				this.type = this.option.type;
				this._width = this.option.width;
				this._height = this.option.height;
				this._x = this.option.x;
				this._y = this.option.y;
				this._minWidth = this.option.minWidth;
				this._minHeight = this.option.minHeight;
				this._leftMargin = this.option.leftMargin;
				this._topMargin = this.option.topMargin;
				this._rightMargin = this.option.rightMargin;
				this._bottomMargin = this.option.bottomMargin;
				this._appId = this.option.appId;
				this._windowId = this.option.windowId
			},
			getAppId: function() {
				return this._appId
			},
			getTemplate: function() {
				var b = this.getId(),
					b = '\t\t\t\t<div id="window_outer_' + b + '" class="window_outer">\t\t\t\t\t<div id="window_inner_' + b + '" class="window_inner" >\t\t\t\t\t\t<div class="window_bg_container" id="window_bg_container_' + b + '"></div>\t\t\t\t\t\t<div class="window_content">\t\t\t\t\t\t\t<div id="window_titleBar_' + b + '" class="window_titleBar">                                <div id="window_toolButtonBar_' + b + '" class="window_toolButtonBar"></div>\t\t\t\t\t\t\t\t<div id="window_titleButtonBar_' + b + '" class="window_titleButtonBar"></div>\t\t\t\t\t\t\t\t<div id="window_title_' + b + '" class="window_title titleText">App</div>\t\t\t\t\t\t\t</div>                            <div id="window_body_outer_' + b + '" class="window_bodyOuter">                                 <div id="window_toolBar_' + b + '" class="window_toolBar"></div>                \t\t\t\t <div id="window_toggleToolbar_' + b + '" class ="app_toolbar_icon app_toolbar_toggle app_toolbar_toggle_up" style="display:none"></div>\t\t\t\t\t\t\t     <div id="window_body_' + b + '" class="window_bodyArea"></div>                            </div>\t\t\t\t\t\t\t<div id="window_controlArea_' + b + '" class="window_controlArea">\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
				f.browser.ie && (b += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');
				return b
			},
			initObserver: function() {
				var b = this;
				this.callSuper("initObserver");
				f.extend(this.observer, {
					onCloseButtonClick: function(c) {
						c.preventDefault();
						c.stopPropagation();
						b.close();
						d.notifyObservers(b, "clickCloseButton", b)
					},
					stopPropagation: function(b) {
						b.stopPropagation()
					},
					onMaxButtonClick: function(c) {
						c.preventDefault();
						b.option.modeSwitch && b.max()
					},
					onRestorefullButtonClick: function(c) {
						c.preventDefault();
						b.option.modeSwitch && b.restorefull()
					},
					onFullButtonClick: function(c) {
						c.preventDefault();
						b.option.modeSwitch && b.fullscreen()
					},
					onRestoreButtonClick: function(c) {
						c.preventDefault();
						b.option.modeSwitch && b.restore()
					},
					onMinButtonClick: function(c) {
						c.preventDefault();
						b.option.modeSwitch && b.min()
					},
					onRefreshButtonClick: function(c) {
						c.preventDefault();
						d.notifyObservers(b, "clickRefreshButton")
					},
					onPinUpButtonClick: function(c) {
						c.preventDefault();
						d.notifyObservers(b, "clickPinUpButton");
						b.showPinDownButton()
					},
					onPinDownButtonClick: function(c) {
						c.preventDefault();
						d.notifyObservers(b, "clickPinDownButton");
						b.showPinUpButton()
					},
					onOkButtonClick: function(c) {
						c.preventDefault();
						if (e.hasClass(this, "window_button_disabled")) return !1;
						d.notifyObservers(b, "clickOkButton") && setTimeout(function() {
							b.close()
						}, 0)
					},
					onCancelButtonClick: function(c) {
						c.preventDefault();
						d.notifyObservers(b, "clickCancelButton") && setTimeout(function() {
							b.close()
						}, 0)
					},
					onPreviousButtonClick: function(c) {
						c.preventDefault();
						d.notifyObservers(b, "clickPreviousButton")
					},
					onNextButtonClick: function(c) {
						c.preventDefault();
						d.notifyObservers(b, "clickNextButton")
					},
					onMouseoverWindow: function(c) {
						c.stopPropagation();
						d.notifyObservers(b, "mouseoverWindow")
					},
					onMouseoutWindow: function(c) {
						c.stopPropagation();
						d.notifyObservers(b, "mouseoutWindow")
					},
					onMousedownWindow: function() {
						b && b.setCurrent()
					},
					onKeyDownWindow: function() {},
					onTitleBarClick: function() {
						d.notifyObservers(b, "clickTitleBar")
					},
					onTitleBarDblClick: function(c) {
						b.option.doubleClickModeSwitch && (c.preventDefault(), d.notifyObservers(b, "dblClickTitleBar"), b.option.modeSwitch && (b.getBoxStatus() === "max" ? b.restore() : b.getBoxStatus() === "restore" && b.max()))
					},
					setCurrent: function() {
						b.setCurrent()
					},
					stopPropagationAndSetCurrent: function(c) {
						c.stopPropagation();
						b.setCurrent()
					},
					stopPropagationAndSetCurrentWithoutFocus: function(c) {
						c.stopPropagation();
						b.setCurrentWithoutFocus()
					},
					stopPropagation: function(b) {
						b.stopPropagation()
					},
					onToolBarToggleBtnClick: function(c) {
						c.preventDefault();
						b.toggleToolBar()
					}
				})
			},
			initDomReference: function() {
				var b = this.getId();
				this._titleBar = e.id("window_titleBar_" + b);
				this._titleButtonBar = e.id("window_titleButtonBar_" + b);
				this._toolButtonBar = e.id("window_toolButtonBar_" + b);
				this._controlArea = e.id("window_controlArea_" + b);
				this._title = e.id("window_title_" + b);
				this._toolBar = e.id("window_toolBar_" + b);
				this._toggleToolbar = e.id("window_toggleToolbar_" + b);
				this._bodyOuter = e.id("window_body_outer_" + b);
				this.body = e.id("window_body_" + b);
				this._window_outer = e.id("window_outer_" + b);
				this._window_inner = e.id("window_inner_" + b);
				this._bg_container = this._window_bg = e.id("window_bg_container_" + b)
			},
			initButtons: function() {
				var b = f.ui.Button,
					c = this._titleButtonBar;
				this._buttons = {};
				if (this.option.hasCloseButton) this._closeButton = new b({
					appendTo: c,
					className: "window_action_button window_close",
					isStopPropagation: !0,
					title: "\u5173\u95ed",
					event: {
						click: this.observer.onCloseButtonClick
					}
				}), this._closeButton.show();
				if (this.option.hasMaxButton) this._maxButton = new b({
					appendTo: c,
					className: "window_action_button window_max",
					isStopPropagation: !0,
					title: "\u6700\u5927\u5316",
					event: {
						click: this.observer.onMaxButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this._maxButton.show(), this._restoreButton = new b({
					appendTo: c,
					className: "window_action_button window_restore",
					isStopPropagation: !0,
					title: "\u8fd8\u539f",
					event: {
						click: this.observer.onRestoreButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this._restoreButton.hide();
				if (this.option.hasMinButton) this._minButton = new b({
					appendTo: c,
					className: "window_action_button window_min",
					isStopPropagation: !0,
					title: "\u6700\u5c0f\u5316",
					event: {
						click: this.observer.onMinButtonClick
					}
				}), this._minButton.show();
				if (this.option.hasMaxButton) this._fullButton = new b({
					appendTo: c,
					className: "window_action_button window_fullscreen",
					isStopPropagation: !0,
					title: "\u5168\u5c4f",
					event: {
						click: this.observer.onFullButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this._restorefullButton = new b({
					appendTo: c,
					className: "window_action_button window_restore_full",
					isStopPropagation: !0,
					title: "\u9000\u51fa\u5168\u5c4f",
					event: {
						click: this.observer.onRestorefullButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this._restorefullButton.hide();
				if (this.option.hasRefreshButton) this._refreshButton = new b({
					appendTo: c,
					className: "window_action_button window_refresh",
					isStopPropagation: !0,
					title: "\u5237\u65b0",
					event: {
						click: this.observer.onRefreshButtonClick,
						mousedown: this.observer.setCurrent
					}
				});
				if (this.option.hasPinUpButton) this._pinUpButton = new b({
					appendTo: c,
					className: "window_action_button window_pinUp",
					isStopPropagation: !0,
					title: "\u7f6e\u9876",
					event: {
						click: this.observer.onPinUpButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this._pinDownButton = new b({
					appendTo: c,
					className: "window_action_button window_pinDown",
					isStopPropagation: !0,
					title: "\u6d6e\u52a8",
					event: {
						click: this.observer.onPinDownButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this._pinUpButton.show(), this._pinDownButton.hide();
				c = this._controlArea;
				e.hide(this._controlArea);
				if (this.option.hasCancelButton) this._cancelButton = new b({
					appendTo: c,
					className: "window_button window_cancel",
					isStopPropagation: !0,
					text: "\u53d6\u6d88",
					event: {
						click: this.observer.onCancelButtonClick
					}
				}), this.showControlButton(this._cancelButton), this._buttons.cancelButton = this._cancelButton;
				if (this.option.hasOkButton) this._okButton = new b({
					appendTo: c,
					className: "window_button window_ok",
					isStopPropagation: !0,
					text: "\u786e\u5b9a",
					event: {
						click: this.observer.onOkButtonClick
					}
				}), this.showControlButton(this._okButton), this._buttons.okButton = this._okButton;
				if (this.option.hasNextButton) this._nextButton = new b({
					appendTo: c,
					className: "window_button window_next",
					isStopPropagation: !0,
					text: "\u4e0b\u4e00\u6b65",
					event: {
						click: this.observer.onNextButtonClick
					}
				}), this.showControlButton(this._nextButton), this._buttons.nextButton = this._nextButton;
				if (this.option.hasPreviousButton) this._previousButton = new b({
					appendTo: c,
					className: "window_button window_previous",
					isStopPropagation: !0,
					text: "\u4e0a\u4e00\u6b65",
					event: {
						click: this.observer.onPreviousButtonClick
					}
				}), this.showControlButton(this._previousButton), this._buttons.previousButton = this._previousButton
			},
			createEvent: function() {
				this.option.dragProxy && this.enableDragProxy();
				this.option.dragable && this.enableDrag();
				this.option.resize && this.enableResize();
				d.on(this.container, "mousedown", this.observer.onMousedownWindow);
				d.on(this.container, "keydown", this.observer.onKeyDownWindow);
				d.on(this.body, "mousedown", this.observer.stopPropagationAndSetCurrent);
				d.on(this._titleBar, "click", this.observer.onTitleBarClick);
				d.on(this._titleBar, "dblclick", this.observer.onTitleBarDblClick);
				d.on(this._toggleToolbar, "click", this.observer.onToolBarToggleBtnClick);
				d.on(this._toggleToolbar, "mousedown", this.observer.stopPropagation);
				d.addObserver(this, "closeWindow", this.close)
			}
		});
	this.Window = g;
	this.EqqWindow = new f.Class({
		extend: alloy.businessClass.Window
	}, {
		init: function(b) {
			var c = this;
			this.windowType = "window";
			this.callSuper = function(a) {
				var b = Array.prototype.slice,
					d = b.call(arguments, 1);
				g.superClass[a].apply(c, d.concat(b.call(arguments)))
			};
			this.callSuper("init", b)
		},
		setBg: function(b) {
			e.id("window_bg_container_" + this.getId()).style.background = b
		},
		getTemplate: function() {
			var b = this.getId(),
				b = '\t\t\t\t<div id="window_outer_' + b + '" class="window_outer eqq_window">\t\t\t\t\t<div id="window_inner_' + b + '" class="window_inner" >\t\t\t\t\t\t<div class="window_bg_container" id="window_bg_container_' + b + '">\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="window_content">\t\t\t\t\t\t\t<div id="window_titleBar_' + b + '" class="window_titleBar">\t\t\t\t\t\t\t\t<div id="window_titleButtonBar_' + b + '" class="window_titleButtonBar"></div>\t\t\t\t\t\t\t\t<div id="window_title_' + b + '" class="window_title titleText">App</div>\t\t\t\t\t\t\t</div>                            <div id="window_body_outer_' + b + '" class="window_bodyOuter">                                 <div id="window_toolBar_' + b + '" class="window_toolBar"></div>                \t\t\t\t <div id="window_toggleToolbar_' + b + '" class ="app_toolbar_icon app_toolbar_toggle app_toolbar_toggle_up" style="display:none"></div>\t\t\t\t\t\t\t     <div id="window_body_' + b + '" class="window_bodyArea"></div>                            </div>\t\t\t\t\t\t\t<div id="window_controlArea_' + b + '" class="window_controlArea">\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
			f.browser.ie && (b += '<iframe width="100%" height="100%" class="fullscreen_bg_iframe"></iframe>');
			return b
		}
	})
});
Jx().$package("alloy.businessClass", function(f) {
	var e = f.dom,
		d = f.event,
		g = new f.Class({
			extend: f.ui.BaseWindow
		}, {
			init: function(b) {
				var c = this;
				this.windowType = "widget";
				this.callSuper = function(a) {
					var b = Array.prototype.slice,
						d = b.call(arguments, 1);
					g.superClass[a].apply(c, d.concat(b.call(arguments)))
				};
				this.callSuper("init", b);
				this.option.hasPinUpButton && d.notifyObservers(c, "clickPinUpButton");
				if (!f.isUndefined(c._appId) && f.isNumber(c._appId)) this.appToolBar = new alloy.businessClass.WidgetToolBar(c)
			},
			parseOption: function(b) {
				b = b || {};
				b.isTask = f.isUndefined(b.isTask) ? !0 : b.isTask;
				b.width = Number(b.width);
				b.height = Number(b.height);
				b.windowMode = b.windowMode || "single";
				b.width = b.width > 0 ? b.width : 0;
				b.height = b.height > 0 ? b.height : 0;
				b.dragable = b.dragable === !1 ? !1 : !0;
				b.title = b.title || "";
				b.pinUpStyle = b.pinUpStyle || "default-class";
				b.pinDownStyle = b.pinDownStyle || "default-class";
				b.closeStyle = b.closeStyle || "default-class";
				b.hasCloseButton = b.hasCloseButton === !0 ? !0 : !1;
				b.hasMinButton = b.hasMinButton === !0 ? !0 : !1;
				b.hasRefreshButton = b.hasRefreshButton === !0 ? !0 : !1;
				b.hasPinUpButton = !1;
				b.hasPinDownButton = !1;
				b.isFix = b.isFix || !1;
				this._x = b.x;
				this._y = b.y;
				this._width = b.width;
				b.x = b.x > 0 ? parseInt(b.x) : 0;
				b.y = b.y > 0 ? parseInt(b.y) : 0;
				b.isSetCurrent = f.isUndefined(b.isSetCurrent) ? !0 : b.isSetCurrent;
				b.leftMargin = b.leftMargin || 0;
				b.topMargin = b.topMargin || 0;
				b.rightMargin = b.rightMargin || 0;
				b.bottomMargin = b.bottomMargin || 0;
				b.bodyBorder = f.isUndefined(b.bodyBorder) ? 0 : b.bodyBorder;
				return this.option = b
			},
			setPrivateProperty: function() {
				this.type = this.option.type;
				this._isFix = this.option.isFix;
				this._x = this.option.x;
				this._y = this.option.y;
				this._width = this.option.width;
				this._height = this.option.height;
				this._pinUpStyle = this.option.pinUpStyle;
				this._pinDownStyle = this.option.pinDownStyle;
				this._closeStyle = this.option.closeStyle;
				this._leftMargin = this.option.leftMargin;
				this._topMargin = this.option.topMargin;
				this._rightMargin = this.option.rightMargin;
				this._bottomMargin = this.option.bottomMargin;
				this._appId = this.option.appId;
				this._windowId = this.option.windowId
			},
			getAppId: function() {
				return this._appId
			},
			getTemplate: function() {
				var b = this.getId(),
					b = '\t\t\t\t<div id="widget_outer_' + b + '" class="widget_outer">\t\t\t\t\t<div id="widget_inner_' + b + '" class="widget_inner"  style="z-index:' + this.option.zIndex + '">\t\t\t\t\t\t<div id="widget_bg_container_' + b + '" class="widget_bg_container">\t\t\t\t\t\t\t<div class="widget_bg widget_center"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_t"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_rt"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_r"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_rb"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_b"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_lb"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_l"></div>\t\t\t\t\t\t\t<div class="widget_bg widget_lt"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="widget_content">\t\t\t\t\t\t\t<div id="widget_titleBar_' + b + '" class="widget_titleBar">\t\t\t\t\t\t\t\t<div id="widget_titleButtonBar_' + b + '" class="widget_titleButtonBar"></div>\t\t\t\t\t\t\t\t<div id="widget_title_' + b + '" class="widget_title"></div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div id="widget_toolBar_' + b + '" class="widget_toolBar"></div>\t\t\t\t\t\t\t<div id="widget_Body_' + b + '" class="widget_bodyArea"></div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t';
				f.browser.ie && (b += '<iframe class="flash_mask_iframe" border="0"></iframe>');
				return b
			},
			initObserver: function() {
				var b = this;
				this.callSuper("initObserver");
				f.extend(this.observer, {
					onMouseoverWindow: function(c) {
						c.stopPropagation();
						e.show(b._titleBar);
						d.notifyObservers(b, "mouseoverWindow", b)
					},
					onMouseoutWindow: function(c) {
						c.stopPropagation();
						e.hide(b._titleBar);
						e.hide(b._bg_container);
						d.notifyObservers(b, "mouseoutWindow", b)
					},
					setCurrent: function() {
						b.setCurrent()
					},
					onMousedownWidget: function(c) {
						b._offX = c.clientX;
						b._offY = c.clientY
					},
					onMouseupWidget: function(c) {
						Math.abs(b._offX - c.clientX) + Math.abs(b._offY - c.clientY) < 10 && d.notifyObservers(b, "shortMoveClick", b)
					},
					onPinDownButtonClick: function(c) {
						c.preventDefault();
						b.showPinUpButton();
						d.notifyObservers(b, "clickPinUpButton", b)
					},
					onPinUpButtonClick: function(c) {
						c.preventDefault();
						b.showPinDownButton();
						d.notifyObservers(b, "clickPinDownButton", b)
					},
					onRefreshButtonClick: function(c) {
						c.preventDefault();
						d.notifyObservers(b, "clickRefreshButton", b)
					},
					onCloseButtonClick: function(c) {
						c.preventDefault();
						b.appToolBar && b.appToolBar.close();
						d.notifyObservers(b, "clickCloseButton", b);
						setTimeout(function() {
							b.close()
						}, 0)
					}
				})
			},
			initDomReference: function() {
				var b = this.getId();
				this._bg_container = e.id("widget_bg_container_" + b);
				this._titleBar = e.id("widget_titleBar_" + b);
				this._titleButtonBar = e.id("widget_titleButtonBar_" + b);
				this._title = e.id("widget_title_" + b);
				this.body = e.id("widget_Body_" + b);
				this._toolBar = e.id("widget_toolBar_" + b);
				this._window_outer = e.id("widget_outer_" + b)
			},
			initButtons: function() {
				var b = f.ui.Button,
					c = this._titleButtonBar;
				if (this.option.hasCloseButton) this._closeButton = new b({
					appendTo: c,
					className: "widget_close",
					isStopPropagation: !0,
					title: "\u5173\u95ed",
					event: {
						click: this.observer.onCloseButtonClick
					}
				}), this._closeButton.show();
				if (this.option.hasMinButton) this._minButton = new b({
					appendTo: c,
					className: "widget_min",
					isStopPropagation: !0,
					event: {
						click: this.observer.onMinButtonClick
					}
				}), this._minButton.show();
				if (this.option.hasRefreshButton) this._refreshButton = new b({
					appendTo: c,
					className: "widget_refresh",
					isStopPropagation: !0,
					title: "\u5237\u65b0",
					event: {
						click: this.observer.onRefreshButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this._refreshButton.show();
				if (this.option.hasPinUpButton || this.option.hasPinDownButton) this._pinUpButton = new b({
					appendTo: c,
					className: "widget_pinUp",
					isStopPropagation: !0,
					title: "\u7f6e\u9876",
					event: {
						click: this.observer.onPinUpButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this._pinDownButton = new b({
					appendTo: c,
					className: "widget_pinDown",
					isStopPropagation: !0,
					title: "\u6d6e\u52a8",
					event: {
						click: this.observer.onPinDownButtonClick,
						mousedown: this.observer.setCurrent
					}
				}), this.option.hasPinUpButton && (this._pinUpButton.show(), this._pinDownButton.hide()), this.option.hasPinDownButton && (this._pinUpButton.hide(), this._pinDownButton.show())
			},
			createEvent: function() {
				this.setEnableDrag();
				e.addClass(this.body.parentNode.parentNode.parentNode, "widgetDrag");
				d.on(this.body, "mousedown", this.observer.onMousedownWidget);
				d.on(this.body, "mouseup", this.observer.onMouseupWidget);
				d.on(this.container, "mousedown", this.observer.setCurrent);
				d.on(this.container, "mouseover", this.observer.onMouseoverWindow);
				d.on(this.container, "mouseout", this.observer.onMouseoutWindow);
				d.addObserver(this, "closeWindow", this.close)
			},
			setStyleCurrent: function() {
				this.container && e.addClass(this.container, "widget_current")
			},
			setStyleNotCurrent: function() {
				this.container && e.removeClass(this.container, "widget_current")
			}
		});
	this.Widget = g
});
Jx().$package("alloy.Class", function(f) {
	var e = f.dom,
		d = f.event,
		g = f.string,
		b = 1,
		c = {
			stopPropagation: function(a) {
				a.stopPropagation()
			},
			onIconMouseover: function() {
				e.addClass(this._el, "appButtonHover")
			},
			onIconMouseout: function() {
				e.removeClass(this._el, "appButtonHover")
			},
			onIconContextMenu: function(a) {
				a.preventDefault();
				a.stopPropagation();
				this.isContextMenuEnable() && this.isEnable() && alloy.desktopManager.getDesktopStatus() != alloy.desktopManager.DESK_STATUS.EDIT && this.option.contextMenu && this.option.contextMenu.length && (a = alloy.layout.showContextMenu({
					x: a.clientX,
					y: a.clientY
				}, {
					argument: this,
					items: this.option.contextMenu,
					beforeShow: this.option.cxBeforeShow
				}), d.notifyObservers(this, "contextmenu", a))
			},
			onIconClick: function(a, b) {
				if (this.isEnable()) {
					if (this.prevClickTime && (new Date).getTime() - this.prevClickTime < 1E3) return c.onIconDbClick.call(this, a, b);
					this.prevClickTime = (new Date).getTime();
					this.option.longTouchable ? e.hasClass(a.target, "appButton_delete") || (b >= 1E3 ? alloy.desktopManager.getDesktopStatus() !== alloy.desktopManager.DESK_STATUS.EDIT && (alloy.desktopManager.setDesktopStatus(alloy.desktopManager.DESK_STATUS.EDIT), alloy.util.report2qqweb("screen|ipad|edit")) : alloy.desktopManager.getDesktopStatus() !== alloy.desktopManager.DESK_STATUS.EDIT && this.option.onClick && (this.option.onClick.call(this, a), d.notifyObservers(this, "iconclick"))) : !(b >= 1E3) && this.option.onClick && (this.option.onClick.call(this, a), d.notifyObservers(this, "iconclick"))
				}
			},
			onIconDbClick: function(a) {
				this.isEnable() && alloy.desktopManager.getDesktopStatus() !== alloy.desktopManager.DESK_STATUS.EDIT && this.option.onDbClick && this.option.onDbClick.call(this, a)
			},
			onIconDeleteClick: function(a) {
				a.preventDefault();
				a.stopPropagation();
				this.option.onDelete && this.option.onDelete.call(this, a)
			}
		};
	this.Icon = new f.Class({
		init: function(a) {
			this.parseOption(a);
			this._createDom();
			a.notifyNumber ? this.showNotify(a.notifyNumber) : this.hideNotify();
			this.enable();
			this.contextMenuEnable()
		},
		parseOption: function(a) {
			return this.option = a = {
				parentNode: a.parentNode,
				id: a.id,
				text: a.text,
				title: a.title || a.text,
				className: a.className || "",
				notifyNumber: a.notifyNumber || 0,
				icon: a.icon || {},
				onClick: a.onClick,
				onDbClick: a.onDbClick,
				onDelete: a.onDelete,
				contextMenu: a.contextMenu,
				cxBeforeShow: a.cxBeforeShow ||
				function() {},
				lock: a.lock || !1,
				attrs: a.attrs,
				isShowNotify: f.isUndefined(a.isShowNotify) ? !0 : a.isShowNotify,
				longTouchable: f.isUndefined(a.longTouchable) ? !0 : a.longTouchable,
				deleteable: f.isUndefined(a.deleteable) ? !0 : a.deleteable
			}
		},
		getId: function() {
			return this._id
		},
		getDomId: function() {
			return this._domId
		},
		getElement: function() {
			return this._el
		},
		disable: function() {
			this._enable = !1;
			f.browser.ie && f.browser.ie < 9 || e.addClass(this._el, "ui_halfOpacity")
		},
		enable: function() {
			this._enable = !0;
			f.browser.ie && f.browser.ie < 9 || e.removeClass(this._el, "ui_halfOpacity")
		},
		isEnable: function() {
			return this._enable
		},
		destroy: function() {
			var a = this._el;
			d.notifyObservers(this, "destroy", this);
			d.off(a, "mouseover");
			d.off(a, "mouseout");
			d.off(a, "customclick");
			d.off(a, "contextmenu");
			a.innerHTML = "";
			a.parentNode.removeChild(a);
			for (var b in this) this.hasOwnProperty(b) && delete this[b]
		},
		showNotify: function(a) {
			if (this.option.isShowNotify && (a = Number(a), a = a > 999 ? 999 : a)) {
				if (!this._notifyEl) this._notifyEl = e.node("div", {
					"class": "appButton_notify",
					id: this._domId + "_notify"
				}), this._el.appendChild(this._notifyEl), this._notifyEl.innerHTML = '<span class="appButton_notify_inner"></span>';
				this._isNotifyShow = !0;
				var b = a.toString().length;
				this._notifyEl.firstChild.innerHTML = a;
				e.setClass(this._notifyEl, "appButton_notify appButton_notify_" + b);
				e.show(this._notifyEl)
			}
		},
		hideNotify: function() {
			this._isNotifyShow = !1;
			this._notifyEl && e.hide(this._notifyEl)
		},
		isNotifyShow: function() {
			return this._isNotifyShow || !1
		},
		setTitle: function(a) {
			a = this._formatTitle(a);
			this._el.setAttribute("title", a);
			this._iconImgEl.setAttribute("alt", a)
		},
		setText: function(a) {
			this.option.text = a;
			this._textEl.innerHTML = g.encodeHtmlSimple(a);
			this.setTitle(a)
		},
		contextMenuEnable: function() {
			this._contextMenuEnable = !0
		},
		contextMenuDisable: function() {
			this._contextMenuEnable = !1
		},
		isContextMenuEnable: function() {
			return this._contextMenuEnable
		},
		_formatTitle: function(a) {
			if (f.isArray(a)) {
				for (var b = 0; b < a.length; b++) a[b] = g.encodeHtmlAttributeSimple(a[b]);
				return alloy.util.formatTitle(a)
			} else return g.encodeHtmlAttributeSimple(a)
		},
		_createDom: function() {
			var a = this.option;
			this._id = a.id;
			var j = this._domId = "alloy_icon_" + a.id + "_" + b++,
				k = a.attrs || {},
				h = this._formatTitle(a.title),
				k = f.extend(k, {
					id: j,
					uid: a.id,
					"class": "appButton " + a.className,
					title: h
				}),
				k = this._el = e.node("div", k),
				m = a.icon,
				h = '<div class="appButton_appIcon ' + (m.className || "") + '" id="' + j + '_icon_div" style="' + (m.style || "") + '"><img id="' + j + '_img" class="appButton_appIconImg" src="' + (m.url ? m.url : alloy.CONST.CDN_URL + "style/images/transparent.gif") + '" alt="' + h + '"/></div>                    <div class="appButton_appName" ><div id="' + j + '_name" class="appButton_appName_inner">' + g.encodeHtmlSimple(a.text) + '</div><div class="appButton_appName_inner_right"></div></div>                    <div class="appButton_delete" id="' + j + '_delete" title="\u5378\u8f7d\u5e94\u7528"></div>                ';
			k.innerHTML = h;
			a.parentNode.appendChild(k);
			this._iconEl = e.id(j + "_icon_div");
			this._iconImgEl = e.id(j + "_img");
			this._textEl = e.id(j + "_name");
			a.deleteable || e.addClass(k, "not_deleteable");
			j = this._delEl = e.id(j + "_delete");
			d.on(j, "mousedown", c.stopPropagation);
			d.on(j, "click", f.bind(c.onIconDeleteClick, this));
			d.on(k, "customclick", f.bind(c.onIconClick, this), {
				longtouchable: !0
			});
			d.on(k, "dbclick", f.bind(c.onIconDbClick, this));
			if (a.contextMenu) d.on(k, "contextmenu", f.bind(c.onIconContextMenu, this));
			f.browser.ie == 6 && (d.on(k, "mouseover", f.bind(c.onIconMouseover, this)), d.on(k, "mouseout", f.bind(c.onIconMouseout, this)))
		}
	})
});
Jx().$package("alloy.Class", function(f) {
	var e = f.dom,
		d = f.event,
		g = alloy.fileSystem.FILE_TYPE.APP,
		b = function(a, b, c) {
			a = c.parentMenu.getArgument().app.id;
			alloy.fileSystem.moveFile({
				id: a,
				t: g
			}, b.option.argument, null, null, null, !0)
		},
		c = [{
			text: "\u6253\u5f00\u5e94\u7528",
			onClick: function(a, b, c) {
				a = c.getArgument().app.id;
				alloy.portal.runApp(a);
				alloy.util.report2app("appbar|menu|runapp|" + a)
			}
		}, {
			type: "separator"
		}, {
			type: "submenu",
			text: "\u79fb\u52a8\u5e94\u7528\u5230",
			items: [{
				text: "\u684c\u97621",
				argument: 0,
				onClick: b
			}, {
				text: "\u684c\u97622",
				argument: 1,
				onClick: b
			}, {
				text: "\u684c\u97623",
				argument: 2,
				onClick: b
			}, {
				text: "\u684c\u97624",
				argument: 3,
				onClick: b
			}, {
				text: "\u684c\u97625",
				argument: 4,
				onClick: b
			}]
		}, {
			text: "\u5378\u8f7d\u5e94\u7528",
			onClick: function(a, b, c) {
				if (a = c.getArgument().app) alloy.config.removeSetupAppList(a), alloy.util.report2app("appbutton|menudel")
			}
		}],
		a = function(b, c, f) {
			f ? j(b, c) : (d.on(b, "load", function() {
				if (!this._isLoad) this._isLoad = 1, a(b, c, !0);
				d.off(this, "load")
			}), b.src = c)
		},
		j = function(a, b) {
			a.src = alloy.CONST.CDN_URL + "style/images/transparent.gif";
			a.style.background = "none";
			a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b + "', sizingMethod='scale')"
		},
		k = {
			onAppButtonClick: function() {
				alloy.portal.runApp(this.app.id);
				alloy.util.report2app("appbar|shortcut|runapp|" + this.app.id)
			},
			onAppDeleteButtonClick: function(a) {
				a.preventDefault();
				a.stopPropagation();
				alloy.config.removeSetupAppList(this.app);
				alloy.util.report2app("appbutton|del")
			},
			onAppButtonContextMenu: function(a) {
				var b = a.getItemAt(3);
				this.option.deleteable ? b.enable() : b.disable();
				a = a.getItemAt(2).getSubmenu();
				b = alloy.fileSystem.getFolderIdByFile({
					id: this.appId,
					t: g
				});
				(a = a.getItemAt(b)) && a.disable()
			},
			onIconImgError: function() {
				if (!this._isError) {
					this._isError = 1;
					var b = alloy.CONST.CDN_URL + "style/images/big.png";
					f.browser.ie == 6 ? a(this, b, !0) : this.src = b
				}
			}
		},
		h = this.AppIcon = new f.Class({
			extend: alloy.Class.Icon
		}, {
			init: function(b, n) {
				if (!n) throw Error("appButton: app is null!");
				var l = n.appName;
				b.parentNode = b.parentNode || alloy.layout.getDesktop().body;
				b.text = l;
				b.title = n.appName;
				b.onClick = b.onClick || k.onAppButtonClick;
				b.onDelete = b.onDelete || k.onAppDeleteButtonClick;
				f.platform.iPad && n.ipadincompatible == "1" && (b.className += " appButtonIpadincompatible");
				b.contextMenu = b.contextMenu || c;
				if (f.isUndefined(b.deleteable)) b.deleteable = n.cannotUninstall == "1" ? !1 : !0;
				b.attrs = {
					appId: n.id,
					fileId: n.id,
					type: g
				};
				h.superClass.init.call(this, b);
				if ((n.id == "appMarket" || n.id == "diskExplorer" || n.id == "messageCenter") && f.browser.ie == 6) j(this._iconImgEl, this.option.icon.url);
				else {
					var l = this._iconEl,
						o = this._iconImgEl,
						r = n.id,
						q = n.iconUrl;
					if (q) {
						var v = alloy.util.getAppRoot(r) + "images/",
							p = alloy.CONST.PRI_APP_STATIC_URL;
						if (q && q.smallIcon && q.smallIcon.indexOf("priapps") > -1) p = alloy.CONST.PRI_APP_STATIC_URL2;
						var s = "",
							t = f.browser.ie == 6,
							s = q.type || q;
						(s & 100) > 0 ? (s = r > 99999 ? p + q.bigIcon : v + "big.png", t ? a(o, s) : o.src = s) : (s & 10) > 0 ? (s = r > 99999 ? p + q.midIcon : v + "mid.png", t ? a(o, s) : o.src = s) : (s & 1) > 0 ? (s = r > 99999 ? p + q.smallIcon : v + "small.png", e.addClass(l, "appButton_appIcon_warp"), e.addClass(o, "appButton_smallIcon"), t ? a(o, s) : o.src = s) : t ? a(o, alloy.CONST.CDN_URL + "style/images/big.png") : o.src = alloy.CONST.CDN_URL + "style/images/big.png"
					}
				}
				d.on(this._iconImgEl, "error", k.onIconImgError);
				this.app = n;
				this.appId = n.id;
				b.contextMenu === c && d.addObserver(this, "contextmenu", f.bind(k.onAppButtonContextMenu, this))
			}
		})
});
Jx().$package("alloy.Class", function(f) {
	var e = f.dom,
		d = f.event,
		g = {
			online: "\u5728\u7ebf",
			callme: "Q\u6211\u5427",
			away: "\u79bb\u5f00",
			busy: "\u5fd9\u788c",
			silent: "\u8bf7\u52ff\u6253\u6270",
			hidden: "\u9690\u8eab",
			offline: "\u79bb\u7ebf"
		},
		b = alloy.fileSystem.FILE_TYPE,
		c = {},
		a = function(a, b, c) {
			a = c.parentMenu.getArgument();
			alloy.fileSystem.moveFile({
				id: a.fileId,
				t: a.type
			}, b.option.argument, null, null, null, !0)
		},
		j = [{
			text: "\u53d1\u9001\u5373\u65f6\u6d88\u606f",
			onClick: function(a, b, c) {
				l(c.getArgument());
				qqweb.util.report2qqweb("deskcontact|contact|sendmsg")
			}
		}, {
			text: "\u53d1\u9001\u7535\u5b50\u90ae\u4ef6",
			onClick: function(a, b, c) {
				a = c.getArgument().fileId;
				qqweb.rpcService.sendGetFriendUin2(a, 3, function(a) {
					qqweb.portal.runApp("6", {
						url: alloy.util.getSendMailUrl(a.result.account)
					})
				});
				qqweb.util.report2qqweb("deskcontact|contact|mail")
			}
		}, {
			type: "separator"
		}, {
			text: "\u8bbf\u95eeQQ\u7a7a\u95f4",
			onClick: function(a, b, c) {
				qqweb.util.report2qqweb("deskcontact|contact|qzone");
				a = c.getArgument().fileId;
				qqweb.rpcService.sendGetFriendUin2(a, 2, function(a) {
					qqweb.portal.runApp("6", {
						url: alloy.util.getQzoneUrl(a.result.account)
					})
				})
			}
		}, {
			text: "\u67e5\u770b\u6d88\u606f\u8bb0\u5f55",
			onClick: function(a, b, c) {
				qqweb.util.report2qqweb("deskcontact|contact|msghistory");
				a = c.getArgument().fileId;
				if (alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_ALL || m({
					t: "uin",
					id: a
				})) alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL ? qqweb.portal.runApp("chatLogViewer", a) : alloy.portal.getPtwebqq() ? alloy.layout.alert("\u60a8\u9700\u8981\u767b\u5f55QQ\u540e\uff0c\u624d\u80fd\u53d1\u8d77\u4f1a\u8bdd\u6216\u67e5\u770b\u6d88\u606f\u3002", function() {
					qqweb.portal.runApp(50)
				}) : alloy.layout.alert("\u60a8\u9700\u8981\u767b\u5f55QQ\u540e\uff0c\u624d\u80fd\u53d1\u8d77\u4f1a\u8bdd\u6216\u67e5\u770b\u6d88\u606f\u3002", function() {
					alloy.layout.showLoginWindow(50, !0)
				})
			}
		}, {
			text: "\u67e5\u770b\u8be6\u7ec6\u8d44\u6599",
			onClick: function(a, b, c) {
				a = c.getArgument().fileId;
				qqweb.portal.runApp("userDetails", {
					from: "desktopContact",
					uin: a
				});
				qqweb.util.report2qqweb("deskcontact|contact|detail")
			}
		}, {
			type: "separator"
		}, {
			type: "submenu",
			text: "\u79fb\u52a8\u8054\u7cfb\u4eba\u81f3",
			items: [{
				text: "\u684c\u97621",
				argument: 0,
				onClick: a
			}, {
				text: "\u684c\u97622",
				argument: 1,
				onClick: a
			}, {
				text: "\u684c\u97623",
				argument: 2,
				onClick: a
			}, {
				text: "\u684c\u97624",
				argument: 3,
				onClick: a
			}, {
				text: "\u684c\u97625",
				argument: 4,
				onClick: a
			}]
		}, {
			text: "\u5220\u9664\u684c\u9762\u8054\u7cfb\u4eba",
			onClick: function(a, b, c) {
				a = {
					id: c.getArgument().fileId,
					t: c.getArgument().type
				};
				alloy.desktopContact.deleteContactIcon(a);
				qqweb.util.report2qqweb("deskcontact|contact|del")
			}
		}],
		k = [{
			text: "\u53d1\u9001\u7fa4\u6d88\u606f",
			onClick: function(a, b, c) {
				l(c.getArgument());
				qqweb.util.report2qqweb("deskcontact|group|sendmsg")
			}
		}, {
			type: "separator"
		}, {
			text: "\u8bbf\u95ee\u7fa4\u793e\u533a",
			onClick: function(a, b, d) {
				qqweb.util.report2qqweb("deskcontact|group|qun");
				a = d.getArgument().fileId;
				if (alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_ALL || n({
					t: "gid",
					id: a
				})) c[a] ? qqweb.portal.openInWebBrowser({
					url: alloy.CONST.QQ_GROUP_URL + c[a],
					title: b.option.title
				}) : qqweb.rpcService.sendGetFriendUin2(a, 4, function(a) {
					qqweb.portal.openInWebBrowser({
						url: alloy.CONST.QQ_GROUP_URL + a.result.account,
						title: b.option.title
					})
				})
			}
		}, {
			text: "\u67e5\u770b\u7fa4\u8d44\u6599",
			onClick: function(a, b, c) {
				qqweb.util.report2qqweb("deskcontact|group|detail");
				a = c.getArgument().fileId;
				c = {
					gid: c.getArgument().gid,
					gcode: a,
					from: "groupDetail"
				};
				(alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_ALL || n({
					t: "gid",
					id: a
				})) && qqweb.portal.runApp("groupDetails", c)
			}
		}, {
			text: "\u67e5\u770b\u6d88\u606f\u8bb0\u5f55",
			onClick: function(a, b, c) {
				qqweb.util.report2qqweb("deskcontact|group|msghistory");
				a = c.getArgument().fileId;
				c = c.getArgument().gid;
				if (alloy.portal.getLoginLevel() != alloy.CONST.LOGIN_LEVEL_ALL || n({
					t: "gid",
					id: a
				})) alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL ? qqweb.portal.runApp("chatLogViewer", {
					gid: c,
					gcode: a,
					from: "group"
				}) : alloy.portal.getPtwebqq() ? alloy.layout.alert("\u60a8\u9700\u8981\u767b\u5f55QQ\u540e\uff0c\u624d\u80fd\u53d1\u8d77\u4f1a\u8bdd\u6216\u67e5\u770b\u6d88\u606f\u3002", function() {
					qqweb.portal.runApp(50)
				}) : alloy.layout.alert("\u60a8\u9700\u8981\u767b\u5f55QQ\u540e\uff0c\u624d\u80fd\u53d1\u8d77\u4f1a\u8bdd\u6216\u67e5\u770b\u6d88\u606f\u3002", function() {
					alloy.layout.showLoginWindow(50, !0)
				})
			}
		}, {
			type: "separator"
		}, {
			type: "submenu",
			text: "\u79fb\u52a8\u8054\u7cfb\u4eba\u81f3",
			items: [{
				text: "\u684c\u97621",
				argument: 0,
				onClick: a
			}, {
				text: "\u684c\u97622",
				argument: 1,
				onClick: a
			}, {
				text: "\u684c\u97623",
				argument: 2,
				onClick: a
			}, {
				text: "\u684c\u97624",
				argument: 3,
				onClick: a
			}, {
				text: "\u684c\u97625",
				argument: 4,
				onClick: a
			}]
		}, {
			text: "\u5220\u9664\u684c\u9762\u8054\u7cfb\u4eba",
			onClick: function(a, b, c) {
				a = {
					id: c.getArgument().fileId,
					t: c.getArgument().type
				};
				alloy.desktopContact.deleteContactIcon(a);
				qqweb.util.report2qqweb("deskcontact|group|del")
			}
		}],
		h = {
			onContactIconClick: function() {
				l(this);
				qqweb.util.report2qqweb("deskcontact|use|click");
				this.type == b.BUDDY ? qqweb.util.report2qqweb("deskcontact|contact|run") : qqweb.util.report2qqweb("deskcontact|group|run")
			},
			onContactIconDeleteClick: function() {
				alloy.desktopContact.deleteContactIcon({
					id: this.fileId,
					t: this.type
				})
			},
			onContactIconContextMenu: function(a) {
				var a = a.getItemAt(-2).getSubmenu(),
					b = alloy.fileSystem.getFolderIdByFile({
						id: this.fileId,
						t: this.type
					});
				(a = a.getItemAt(b)) && a.disable()
			}
		},
		m = function(a) {
			if (EQQ.Model.BuddyList.isBuddy(a.id)) return !0;
			else {
				var b = a.id;
				alloy.layout.confirm("\u60a8\u4e0eTa\u5df2\u89e3\u9664\u597d\u53cb\u5173\u7cfb\uff0c\u662f\u5426\u5220\u9664\u684c\u9762\u56fe\u6807\uff1f", function() {
					alloy.fileSystem.deleteFile(a, null, null, null, !0)
				}, {
					onCancel: function() {
						alloy.layout.confirm("\u662f\u5426\u91cd\u65b0\u6dfb\u52a0\u4e3a\u597d\u53cb\uff1f", function() {
							qqweb.rpcService.sendGetFriendUin2(b, 5, function(a) {
								qqweb.portal.runApp("buddyFinder", {
									from: "buddy",
									directJoin: a.result.account
								})
							}, null, null, !0)
						})
					}
				});
				return !1
			}
		},
		n = function(a) {
			if (EQQ.Model.BuddyList.getGroupByCode(a.id)) return !0;
			else {
				var b = a.id;
				alloy.layout.confirm("\u60a8\u5df2\u4e0d\u5c5e\u4e8e\u8be5\u7fa4\uff0c\u662f\u5426\u5220\u9664\u684c\u9762\u56fe\u6807\uff1f", function() {
					alloy.fileSystem.deleteFile(a, null, null, null, !0)
				}, {
					onCancel: function() {
						alloy.layout.confirm("\u662f\u5426\u91cd\u7533\u8bf7\u52a0\u5165\u8be5\u7fa4\uff1f", function() {
							qqweb.portal.runApp("buddyFinder", {
								from: "group",
								directJoin: b
							})
						})
					}
				});
				return !1
			}
		},
		l = function(a) {
			var c = {
				t: a.type,
				id: a.fileId
			},
				c = alloy.fileSystem.getFileByFile(c);
			c.notifyNumber = 0;
			alloy.iconFactory.updateNotifyNumber(c);
			alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL ? c.t == b.BUDDY ? m(c) && (EQQ.handleNotification(c.id, "single") || WebqCore.api.call(["chat", ["single", c.id]])) : n(c) && (EQQ.handleNotification(c.gid, "group") || WebqCore.api.call(["chat", ["group", c.id]])) : alloy.portal.getPtwebqq() ? alloy.layout.alert("\u60a8\u9700\u8981\u767b\u5f55QQ\u540e\uff0c\u624d\u80fd\u53d1\u8d77\u4f1a\u8bdd\u6216\u67e5\u770b\u6d88\u606f\u3002", function() {
				var a = "single";
				c.t == b.GROUP && (a = "group");
				alloy.portal.runApp(50, {
					directChat: c.id,
					directChatType: a
				})
			}) : alloy.layout.alert("\u60a8\u9700\u8981\u767b\u5f55QQ\u540e\uff0c\u624d\u80fd\u53d1\u8d77\u4f1a\u8bdd\u6216\u67e5\u770b\u6d88\u606f\u3002", function() {
				alloy.layout.showLoginWindow(50, !0)
			})
		},
		o = this.ContactIcon = new f.Class({
			extend: alloy.Class.Icon
		}, {
			init: function(a, c) {
				a.parentNode = a.parentNode || alloy.layout.getDesktop().body;
				a.text = c.n;
				a.icon = a.icon || {};
				a.icon.className = "appButton_contactIcon";
				a.onClick = a.onClick || h.onContactIconClick;
				a.onDelete = a.onDelete || h.onContactIconDeleteClick;
				if (c.t == b.BUDDY) a.contextMenu = a.contextMenu || j;
				else if (c.t == b.GROUP) a.contextMenu = a.contextMenu || k;
				a.attrs = {
					gid: c.gid || 0,
					fileId: c.id,
					type: c.t
				};
				this.file = c;
				this.type = c.t;
				this.fileId = c.id;
				this.gid = c.gid;
				o.superClass.init.call(this, a);
				this.hideState();
				alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_ALL && c.t == b.BUDDY && alloy.desktopContact.updateContactIconState(c.id);
				d.addObserver(this, "contextmenu", f.bind(h.onContactIconContextMenu, this))
			},
			showState: function(a) {
				if (!this._stateEl && a !== "offline") this._iconEl.appendChild(this._stateEl = e.node("div", {
					"class": "appButton_stateIcon"
				}));
				a == "offline" ? (this._stateEl && e.hide(this._stateEl), this.setTitle(this.option.text + " - " + g.hidden + "\u6216" + g.offline)) : (e.setClass(this._stateEl, "appButton_stateIcon EQQ_" + a), e.show(this._stateEl), this.setTitle(this.option.text + " - " + g[a]))
			},
			hideState: function() {
				this._stateEl && (e.hide(this._stateEl), this.setTitle(this.option.text))
			},
			refreshIcon: function() {
				this._iconImgEl.src = this.type == b.BUDDY ? alloy.util.getUserAvatar(this.fileId) : alloy.util.getGroupAvatar(this.fileId)
			},
			_createDom: function() {
				o.superClass._createDom.call(this);
				this._iconImgEl.src = this.type == b.BUDDY ? alloy.util.getUserAvatar(this.fileId) : alloy.util.getGroupAvatar(this.fileId);
				this._delEl.title = "\u5220\u9664\u8054\u7cfb\u4eba"
			}
		})
});
Jx().$package("alloy.Class", function(f) {
	var e = f.dom,
		d = f.event,
		g = f.string,
		b = alloy.fileSystem.FILE_TYPE,
		c = [{
			text: "\u9884\u89c8",
			onClick: function(a, b, c) {
				a = c.getArgument();
				b = e.getClientXY(a.getElement());
				alloy.system.runApp("explorer", {
					file: a.file,
					type: "quick",
					x: b[0],
					y: b[1]
				});
				qqweb.util.report2qqweb("contextmenu|folder|preview")
			}
		}, {
			text: "\u6253\u5f00",
			onClick: function(a, b, c) {
				a = c.getArgument();
				alloy.system.runApp("explorer", {
					file: a.file,
					type: "open"
				});
				qqweb.util.report2qqweb("contextmenu|folder|open")
			}
		}, {
			type: "separator"
		}, {
			text: "\u91cd\u547d\u540d",
			onClick: function(a, b, c) {
				var b = c.getArgument(),
					a = b.file,
					d = alloy.fileSystem.getFileInfoByFile(b.file);
				c.hide();
				if (d.parent.id == 5) {
					if (c = prompt("\u91cd\u547d\u540d", a.n)) {
						if (c == a.n) return;
						contex.onFileRename(c)
					}
				} else b.startEdit();
				qqweb.util.report2qqweb("contextmenu|folder|rename")
			}
		}, {
			text: "\u5220\u9664",
			onClick: function(a, b, c) {
				a = c.getArgument();
				alloy.desktopFolder.deleteFolder(a.file);
				qqweb.util.report2qqweb("contextmenu|folder|del")
			}
		}],
		a = function(a, b) {
			a.src = alloy.CONST.CDN_URL + "style/images/transparent.gif";
			a.style.background = "none";
			a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b + "', sizingMethod='scale')"
		},
		j = function(a) {
			a.stopPropagation()
		},
		k = {
			onFolderIconClick: function(a, b) {
				if (alloy.desktopManager.getDesktopStatus() === alloy.desktopManager.DESK_STATUS.MANAGE) k.onFolderIconDbClick.apply(this, [a, b]);
				else {
					var c = e.getClientXY(this.getElement());
					alloy.system.runApp("explorer", {
						file: this.file,
						type: "quick",
						x: c[0],
						y: c[1]
					});
					qqweb.util.report2qqweb("folder|previewopen")
				}
			},
			onFolderIconDbClick: function() {
				alloy.system.runApp("explorer", {
					file: this.file
				});
				qqweb.util.report2qqweb("folder|open")
			},
			onFolderIconDeleteClick: function() {
				alloy.desktopFolder.deleteFolder(this.file)
			},
			onFileRename: function(a) {
				var c = {
					id: this.file.id,
					t: this.file.t
				},
					d = alloy.fileSystem.isFileNameAvailable(a, b.FOLDER);
				d == 0 ? (c.n = a, alloy.fileSystem.updateFile(c, !0)) : alloy.layout.alert(d, null, {
					title: "\u91cd\u547d\u540d"
				})
			}
		},
		h = this.FolderIcon = new f.Class({
			extend: alloy.Class.Icon
		}, {
			init: function(b, d) {
				b.text = d.n;
				b.category = d.c || "folder";
				b.icon = {};
				d.items = d.items || [];
				b.icon.url = d.items.length == 0 ? alloy.CONST.CDN_URL + "style/images/filesys/" + b.category + ".png?t=20111011001" : alloy.CONST.CDN_URL + "style/images/filesys/" + b.category + "_o.png?t=20111011001";
				b.parentNode = b.parentNode || alloy.layout.getDesktop().body;
				b.onClick = b.onClick || k.onFolderIconClick;
				b.onDbClick = b.onDbClick || k.onFolderIconDbClick;
				b.onDelete = b.onDelete || k.onFolderIconDeleteClick;
				b.contextMenu = b.contextMenu || c;
				b.onFileRename = b.onFileRename || k.onFileRename;
				b.attrs = {
					fileId: d.id,
					type: d.t
				};
				h.superClass.init.call(this, b);
				this.file = d;
				this.type = d.t;
				this.fileId = d.id;
				this.option = b;
				this.onFileRename = b.onFileRename;
				this._delEl.title = "\u5220\u9664\u6587\u4ef6\u5939";
				f.browser.ie == 6 && a(this._iconImgEl, this.option.icon.url)
			},
			update: function() {
				var b = alloy.fileSystem.getFolderById(this.file.id);
				b.items = b.items || [];
				b = b.items.length == 0 ? alloy.CONST.CDN_URL + "style/images/filesys/" + this.option.category + ".png?t=20111011001" : alloy.CONST.CDN_URL + "style/images/filesys/" + this.option.category + "_o.png?t=20111011001";
				f.browser.ie == 6 ? a(this._iconImgEl, b) : this._iconImgEl.src = b
			},
			endEdit: function() {
				var a = this._textEl;
				a.setAttribute("edit", "false");
				e.removeClass(a, "modify_name");
				a = a.firstChild;
				d.off(a, "blur");
				a = a.value;
				this.setText(this.file.n);
				if (!(a == "" || a == this.file.n)) this.onFileRename(a)
			},
			startEdit: function() {
				var a = this.file.id,
					b = this._textEl;
				if (b.getAttribute("edit") != "true") {
					b.setAttribute("edit", "true");
					e.addClass(b, "modify_name");
					b.innerHTML = '<input maxlength="48" class="edit_input" id="explorer_edit_input_' + a + '" type="text" style="width:100%" value="' + b.innerHTML + '" />';
					var c = e.id("explorer_edit_input_" + a);
					c.select();
					d.on(c, "mousedown", j);
					d.on(c, "blur", f.bind(this.endEdit, this));
					var h = this;
					d.on(c, "keydown", function(a) {
						a.keyCode == 13 ? (d.off(c, "keydown"), h.endEdit()) : g.byteLength(c.value) > 48 && a.keyCode != 8 && a.preventDefault()
					})
				}
			}
		})
});
Jx().$package("alloy.Class", function(f) {
	var e = f.dom,
		d = f.event,
		g = f.string,
		b = alloy.fileSystem.FILE_TYPE,
		c = alloy.storage.DISK,
		a = {
			".xls.cvs.xlsx": "excel",
			".jpg.png.ico.bmp.gif.tif.pcx.tga.jpeg": "image",
			".mp3.wma.amr.ogg.aac.wav": "music",
			".pdf": "pdf",
			".ppt.pptx": "ppt",
			".7z.rar.zip": "rar",
			".txt": "txt",
			".mp4.3gp.avi.mkv.wmv.mpg.flv.vob.swf.mov.rmvb.rm": "video",
			".doc.docx": "word"
		},
		j = function(a, b) {
			a.src = alloy.CONST.CDN_URL + "style/images/transparent.gif";
			a.style.background = "none";
			a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b + "', sizingMethod='scale')"
		},
		k = function(a) {
			var b = alloy.util.getFileExt(a.n).toLowerCase();
			alloy.system.isOpenFile(b) && alloy.fileSystem.fileDownload(a, l.onGetFileViewSuccess)
		},
		h = [{
			text: "\u9884\u89c8",
			onClick: function(a, b, c) {
				a = c.getArgument();
				k(a.file);
				qqweb.util.report2qqweb("document|contact|open")
			}
		}, {
			text: "\u4e0b\u8f7d",
			onClick: function(a, b, c) {
				a = c.getArgument();
				alloy.fileSystem.fileDownload(a.file, l.onGetFileDownLoadSuccess);
				qqweb.util.report2qqweb("document|contact|download")
			}
		}, {
			type: "separator"
		}, {
			text: "\u526a\u5207",
			onClick: function(a, b, c) {
				a = c.getArgument().file;
				alloy.clipBoard.setData({
					type: alloy.clipBoard.CLIP_BOARD_TYPE.FILE,
					data: a,
					pasteType: alloy.clipBoard.PASTE_TYPE.CUT
				});
				qqweb.util.report2qqweb("document|contact|cut")
			}
		}, {
			text: "\u590d\u5236",
			onClick: function(a, b, c) {
				a = c.getArgument().file;
				alloy.clipBoard.setData({
					type: alloy.clipBoard.CLIP_BOARD_TYPE.FILE,
					data: a,
					pasteType: alloy.clipBoard.PASTE_TYPE.COPY
				});
				qqweb.util.report2qqweb("document|contact|copy")
			}
		}, {
			text: "\u91cd\u547d\u540d",
			onClick: function(a, b, c) {
				a = c.getArgument();
				b = alloy.fileSystem.getFileInfoByFile(a.file);
				c.hide();
				if (b.parent.id == 5) {
					if (c = prompt("\u91cd\u547d\u540d", a.fileName)) {
						if (c == a.fileName) return;
						a.onFileRename(c + a.fileExt)
					}
				} else a.startEdit();
				qqweb.util.report2qqweb("document|contact|rename")
			}
		}, {
			type: "separator"
		}, {
			text: "\u5220\u9664",
			onClick: function(a, b, c) {
				a = c.getArgument();
				alloy.desktopFile.deleteFile(a.file);
				d.notifyObservers(a, "cancle");
				qqweb.util.report2qqweb("document|contact|del")
			}
		}],
		m = function(a) {
			var c = a.getArgument();
			if (c.file.t == b.FILE) {
				if (c.isFragment() || c.isUploading()) a.getItemAt(0).disable(), a.getItemAt(1).disable(), a.getItemAt(3).disable(), a.getItemAt(4).disable(), a.getItemAt(5).disable();
				c = alloy.util.getFileExt(c.file.n);
				alloy.system.isOpenFile(c) || a.getItemAt(0).disable()
			}
		},
		n = function(a) {
			a.stopPropagation()
		},
		l = {
			onFileIconClick: function() {
				this.isUploading() || (k(this.file), qqweb.util.report2qqweb("document|contact|click"))
			},
			onFileIconDeleteClick: function() {
				alloy.desktopFile.deleteFile(this.file)
			},
			onGetFileDownLoadSuccess: function(a) {
				a.retcode == 0 && a.result && a.result.code == 0 ? alloy.storage.receiveFile(a.result.objs[0]) : alloy.layout.confirm("\u6587\u4ef6\u635f\u574f\u6216\u5df2\u88ab\u5220\u9664\uff0c\u662f\u5426\u5c06\u5176\u5728Q+ Web\u4e2d\u5220\u9664\uff1f", function() {
					alloy.desktopFile.deleteFile(a.arguments.fileList[0])
				})
			},
			onGetFileViewSuccess: function(a) {
				if (a.retcode == 0 && a.result && a.result.code == 0) {
					var b = a.result.objs[0];
					alloy.fileSystem.openFile(b, b.url)
				} else alloy.layout.confirm("\u6587\u4ef6\u635f\u574f\u6216\u5df2\u88ab\u5220\u9664\uff0c\u662f\u5426\u5c06\u5176\u5728Q+ Web\u4e2d\u5220\u9664\uff1f", function() {
					alloy.desktopFile.deleteFile(a.arguments.fileList[0])
				})
			},
			onFileRename: function(a) {
				var c = {
					id: this.file.id,
					t: this.file.t
				},
					d = alloy.fileSystem.getFolderByFile(c).id,
					d = alloy.fileSystem.isFileNameAvailable(a, b.FILE, d);
				d == 0 ? (c.n = a, alloy.fileSystem.updateFile(c, !0)) : alloy.layout.alert(d, null, {
					title: "\u91cd\u547d\u540d"
				})
			}
		},
		o = this.FileIcon = new f.Class({
			extend: alloy.Class.Icon
		}, {
			init: function(a, b) {
				var e = this;
				this.file = b;
				this.file.s = this.file.s || c.QQDISK;
				this._isUploading = b.upload;
				a.parentNode = a.parentNode || alloy.layout.getDesktop().body;
				a.text = alloy.util.getFileName(b.n);
				var p = ["\u540d\u79f0\uff1a" + b.n, "\u5927\u5c0f\uff1a" + alloy.util.formatFileSize(b.size), "\u4f4d\u7f6e\uff1a" + alloy.storage.getDiskById(b.s).name];
				a.title = p;
				a.cate = this.getFileIconClass(b.n);
				a.icon = a.icon || {};
				a.icon.url = this.getFileIconUrl(a.cate);
				a.onClick = a.onClick || l.onFileIconClick;
				a.onDelete = a.onDelete || l.onFileIconDeleteClick;
				a.onFileRename = a.onFileRename || l.onFileRename;
				a.attrs = {
					fileId: b.id,
					type: b.t
				};
				this.type = b.t;
				this.fileId = b.id;
				this.fileName = a.text;
				this.fileExt = "." + alloy.util.getFileExt(b.n);
				this.onFileRename = a.onFileRename;
				a.contextMenu = a.contextMenu || h;
				a.cxBeforeShow = a.cxBeforeShow || m;
				o.superClass.init.call(this, a);
				f.browser.ie == 6 && j(this._iconImgEl, a.icon.url);
				if (e.file.upload && (e.showUploadBar(), e.file.s == c.KINGSOFT)) e.onFileUploadComplete = function(a) {
					if (b.id == a.id) e.file.ks_fileid = a.ks_fileid
				}, d.addObserver(alloy.flashUploadManager, "FileUploadComplete", e.onFileUploadComplete), d.addObserver(e, "destroy", function() {
					d.removeObserver(alloy.flashUploadManager, "FileUploadComplete", e.onFileUploadComplete)
				})
			},
			getFileIconUrl: function(a) {
				return alloy.CONST.CDN_URL + "style/images/filesys/file_" + a + ".png"
			},
			getFileIconClass: function(b) {
				if (!this._isUploading && this.file.size != this.file.cur_size) return this._isFragment = !0, "fragment";
				var b = "." + alloy.util.getFileExt(b).toLowerCase(),
					c;
				for (c in a) if (c.indexOf(b) >= 0) return a[c];
				return "default"
			},
			showUploadBar: function() {
				if (!this._uploadBar) this._uploadBar = e.node("div", {
					"class": "fileUploadBar"
				}), this._uploadProcess = e.node("div", {
					"class": "fileUploadProcess"
				}), this._uploadBar.appendChild(this._uploadProcess), this._el.appendChild(this._uploadBar);
				e.show(this._uploadBar)
			},
			hideUploadBar: function() {
				e.hide(this._uploadBar)
			},
			uploadFailed: function() {
				e.hideUploadBar();
				var a = this.getFileIconUrl("fragment");
				this._iconImgEl.src = a;
				f.browser.ie == 6 && j(this._iconImgEl, a);
				this._isFragment = !0
			},
			uploadSuccess: function() {
				this.hideUploadBar();
				this.setTitle(["\u540d\u79f0\uff1a" + this.file.n, "\u5927\u5c0f\uff1a" + alloy.util.formatFileSize(this.file.size), "\u4f4d\u7f6e\uff1a" + alloy.storage.getDiskById(this.file.s).name]);
				this.disHalfOpacity();
				this._isUploading = this.file.upload = 0
			},
			uploadProcess: function(a) {
				var b = a.processed / a.fileSize,
					c = alloy.util.formatFileSize(a.processed),
					a = alloy.util.formatFileSize(a.fileSize);
				this.showUploadBar();
				var d = e.getWidth(this._uploadProcess);
				e.setStyle(this._uploadProcess, "backgroundPosition", b * d - d + "px");
				this.setTitle("\u6b63\u5728\u4e0a\u4f20: " + c + "/" + a);
				this.halfOpacity()
			},
			isFragment: function() {
				return this._isFragment
			},
			isUploading: function() {
				return this._isUploading
			},
			disable: function() {
				this._enable = !1;
				f.browser.ie && f.browser.ie < 9 || this.halfOpacity()
			},
			enable: function() {
				this._enable = !0;
				f.browser.ie && f.browser.ie < 9 || this.disHalfOpacity()
			},
			halfOpacity: function() {
				var a = e.mini(".appButton_appName", this._el)[0];
				e.addClass(this._iconEl, "ui_halfOpacity");
				e.addClass(a, "ui_halfOpacity")
			},
			disHalfOpacity: function() {
				var a = e.mini(".appButton_appName", this._el)[0];
				e.removeClass(this._iconEl, "ui_halfOpacity");
				e.removeClass(a, "ui_halfOpacity")
			},
			startEdit: function() {
				var a = this.file.id,
					b = this._textEl;
				if (b.getAttribute("edit") != "true") {
					b.setAttribute("edit", "true");
					b.innerHTML = '<input maxlength="48" class="edit_input" id="explorer_edit_input_' + a + '" type="text" style="width:100%" value="' + b.innerHTML + '" />';
					var c = e.id("explorer_edit_input_" + a);
					c.select();
					d.on(c, "mousedown", n);
					d.on(c, "blur", f.bind(this.endEdit, this));
					var l = this;
					d.on(c, "keydown", function(a) {
						a.keyCode == 13 ? (d.off(c, "keydown"), l.endEdit()) : g.byteLength(c.value) > 48 && a.keyCode != 8 && a.preventDefault()
					})
				}
			},
			endEdit: function() {
				var a = this._textEl;
				a.setAttribute("edit", "false");
				a = a.firstChild;
				d.off(a, "blur");
				a = a.value;
				this.setText(this.file.n);
				var b = a + this.fileExt;
				if (!(a == "" || b == this.file.n)) this.onFileRename(b)
			},
			setText: function(a) {
				this.option.title = a;
				this.option.text = alloy.util.getFileName(a);
				this.fileName = this.option.text;
				this._textEl.innerHTML = g.encodeHtmlSimple(this.option.text);
				this.setTitle(["\u540d\u79f0\uff1a" + this.option.title, "\u5927\u5c0f" + alloy.util.formatFileSize(this.file.size), "\u4f4d\u7f6e" + alloy.storage.getDiskById(this.file.s).name])
			}
		})
});
Jx().$package("alloy.iconFactory", function(f) {
	var e = this,
		d = f.event,
		g = f.array,
		b = {},
		c = 1,
		a = alloy.fileSystem.FILE_TYPE,
		j = {
			onAppRun: function(b) {
				var c = alloy.portal.getAppConfig(b);
				c && (c.notifyNumber = 0);
				Number(b) && (alloy.iconFactory.updateNotifyNumber({
					id: b,
					t: a.APP,
					notifyNumber: 0
				}), alloy.portal.reportAppState(b, 1))
			},
			onIcondestroy: function(a) {
				var c = a.getId();
				b[c] && g.remove(b[c], a)
			},
			onFileBeforeProcess: function() {},
			onFileProcessing: function() {
				alloy.layout.alert("\u6570\u636e\u6b63\u5728\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u540e\u3002")
			},
			onFileProcessed: function(a) {
				if (a = e.getIcons(a.id, a.t)) for (var b = 0, c = a.length; b < c; b++) a[b].enable()
			},
			onUpdateNotifyNumber: function(a) {
				var b = e.getIcons(a.id, a.t);
				if (b) for (var a = a.notifyNumber || 0, c = 0, d = b.length; c < d; c++)(b[c].notifyNumber = a) ? b[c].showNotify(a) : b[c].hideNotify()
			},
			onUpdateFolderNotifyNumber: function(a) {
				var b = a.items,
					c, d, f = 0;
				c = 0;
				for (d = b.length; c < d; ++c) f += b[c].notifyNumber || 0;
				a.notifyNumber = f;
				if (a = e.getIcons(a.id, a.t)) {
					c = 0;
					for (d = a.length; c < d; c++) f ? a[c].showNotify(f) : a[c].hideNotify()
				}
			}
		},
		k = function(a, b) {
			b = b || c+++"_" + +new Date;
			return a + "_" + b
		};
	this.getIconId = function(a, b) {
		return k(a, b)
	};
	this.updateNotifyNumber = function(b) {
		var c;
		c = alloy.fileSystem.getFileByFile(b);
		if (!c) return !1;
		c.notifyNumber = b.notifyNumber;
		c.t !== a.FOLDER ? (d.notifyObservers(alloy.iconFactory, "UpdateNotifyNumber", c), b = alloy.fileSystem.getFolderByFile(c), d.notifyObservers(alloy.iconFactory, "UpdateFolderNotifyNumber", b)) : d.notifyObservers(alloy.iconFactory, "UpdateFolderNotifyNumber", c)
	};
	this.createIcon = function(c, f, e) {
		var l, g, r;
		g = k(c, e.id);
		f.id = g;
		if (r = alloy.fileSystem.getFileByFile({
			id: e.id,
			t: c
		})) f.notifyNumber = r.notifyNumber;
		switch (c) {
		case a.APP:
			l = new alloy.Class.AppIcon(f, e);
			break;
		case a.BUDDY:
		case a.GROUP:
			l = new alloy.Class.ContactIcon(f, e);
			break;
		case a.FILE:
			f.id = k(e.t, e.id);
			l = new alloy.Class.FileIcon(f, e);
			break;
		case a.FOLDER:
			l = new alloy.Class.FolderIcon(f, e)
		}
		l && (b[g] ? b[g].push(l) : b[g] = [l], d.addObserver(l, "destroy", j.onIcondestroy));
		return l
	};
	this.getIcons = function(a, c) {
		a = k(c, a);
		return b[a]
	};
	this.init = function() {
		d.addObserver(alloy.portal, "appRun", j.onAppRun);
		d.addObserver(alloy.fileSystem, "FileBeforeProcess", j.onFileBeforeProcess);
		d.addObserver(alloy.fileSystem, "FileProcessing", j.onFileProcessing);
		d.addObserver(alloy.fileSystem, "FileProcessed", j.onFileProcessed);
		d.addObserver(alloy.iconFactory, "UpdateNotifyNumber", j.onUpdateNotifyNumber);
		d.addObserver(alloy.iconFactory, "UpdateFolderNotifyNumber", j.onUpdateFolderNotifyNumber)
	}
});
Jx().$package("alloy.clipBoard", function(f) {
	var e = this,
		d = f.event;
	this.CLIP_BOARD_TYPE = {
		FILE: "file",
		EX_FILE: "explore_file",
		FOLDER: "folder",
		EX_FOLDER: "explorer_folder"
	};
	var g = this.PASTE_TYPE = {
		COPY: "copy",
		CUT: "cut"
	},
		b = null;
	this.clear = function() {
		d.notifyObservers(e, "BEFORE_CLIP_DATA_CHANGED", b);
		b = null;
		d.notifyObservers(e, "CLIP_DATA_CHANGED", b)
	};
	this.isEmpty = function() {
		return b == null ? !0 : !1
	};
	this.setData = function(c) {
		d.notifyObservers(e, "BEFORE_CLIP_DATA_CHANGED", b);
		b = {};
		b.type = c.type;
		b.data = c.data;
		b.source = c.source;
		b.pasteType = c.pasteType;
		d.notifyObservers(e, "CLIP_DATA_CHANGED", b)
	};
	this.getData = function() {
		return b
	};
	f = {
		onBeforeClipDataChanged: function(b) {
			if (b && b.pasteType == g.CUT) {
				b = alloy.iconFactory.getIcons(b.data.id, alloy.fileSystem.FILE_TYPE.FILE);
				i = 0;
				for (len = b.length; i < len; i++) b[i].disHalfOpacity()
			}
		},
		onClipDataChanged: function(b) {
			if (b && b.pasteType == g.CUT) {
				b = alloy.iconFactory.getIcons(b.data.id, alloy.fileSystem.FILE_TYPE.FILE);
				i = 0;
				for (len = b.length; i < len; i++) b[i].halfOpacity()
			}
		}
	};
	d.addObserver(e, "BEFORE_CLIP_DATA_CHANGED", f.onBeforeClipDataChanged);
	d.addObserver(e, "CLIP_DATA_CHANGED", f.onClipDataChanged)
});
Jx().$package("alloy.navbar", function(f) {
	function e() {
		alloy.layout.showWebTopInstallBox()
	}
	function d() {
		b.setXY(r, "-9999", "-9999");
		o = null
	}
	function g() {
		var a = o.getButton("ok").getNode(),
			a = b.getXY(a);
		f.browser.ie && (a[0]++, a[1]++);
		b.setXY(r, a[0], a[1])
	}
	var b = f.dom,
		c = f.event,
		a, j, k, h, m = !1,
		n, l, o, r, q = {
			onIndicatorDragmove: function() {
				var a = this.getAttribute("index");
				alloy.desktopManager.setCurrentDesktop(Number(a)) && alloy.desktopManager.refreshDesktop()
			},
			onIndicatorDrop: function(a) {
				var b = a.dragEl,
					a = this.getAttribute("index");
				if (!isNaN(a)) {
					var c = b.getAttribute("type"),
						b = parseInt(b.getAttribute("fileId"));
					isNaN(b) || alloy.fileSystem.moveFile({
						t: c,
						id: b
					}, a, -1, null, null, !0)
				}
			},
			onIndicatorClick: function(c) {
				var d = alloy.util.getActionTarget(c, 2, "cmd");
				if (d) switch (d.getAttribute("cmd")) {
				case "user":
					c.preventDefault();
					alloy.portal.runApp("userDetails", alloy.portal.getPortalSelf("uin"));
					break;
				case "manage":
					c.preventDefault();
					alloy.appManager.tooglePanel();
					break;
				case "search":
					c.preventDefault();
					c.stopPropagation();
					alloy.searchbar.toggleShow(d);
					break;
				case "switch":
					d = d.getAttribute("index");
					if (!d && d !== 0) break;
					c.preventDefault();
					switch (d) {
					case ">":
					case "&gt;":
						alloy.desktopManager.goNextDesktop();
						break;
					case "<":
					case "&lt;":
						alloy.desktopManager.goPrevDesktop();
						break;
					case "system":
						d = b.getXY(a);
						c = "" + d[0];
						d = "" + d[1];
						if (alloy.portal.isWebTop()) alloy.portal.switchToDesktop(c, d);
						else try {
							if ((void 0).getRuntimeStatus() == "installed")(void 0).detectAppVersion("alloy.portal.onWebTopSystemClickCb");
							else alloy.portal.onWebTopSystemClickCb(0)
						} catch (e) {
							f.error(e.message)
						}
						alloy.util.report2qqweb("navbar|system");
						break;
					default:
						c = Number(d), alloy.desktopManager.setCurrentDesktop(c), alloy.util.report2qqweb("navbar|" + c)
					}
				}
			},
			onIndicatorDragEnd: function(a) {
				alloy.portal.isWebTop() && webTop.ui.channel.postCmd(17, a.x, a.y);
				alloy.searchbar.hide();
				alloy.util.report2qqweb("navbar|move")
			},
			onDesktopSwitched: function(a) {
				v(a)
			},
			onSelfInfoReady: function(a) {
				if (a && a.uin) k.title = "\u7f16\u8f91\u4e2a\u4eba\u8d44\u6599", h.alt = "\u7f16\u8f91\u4e2a\u4eba\u8d44\u6599", h.src = alloy.util.getUserAvatar(a.uin, 1) + "&t=" + (new Date).getTime()
			},
			onUserAvatarChanged: function() {
				var a = alloy.portal.getPortalSelf("uin");
				h.src = alloy.util.getUserAvatar(a, 1) + "&t=" + (new Date).getTime()
			}
		};
	this.getNavBarPosition = function() {
		return [parseInt(b.getStyle(a, "left")), parseInt(b.getStyle(a, "top"))]
	};
	var v = function(a) {
			b.setClass(j, "indicator_container nav_current_" + (a + 1))
		};
	this.init = function() {
		a = b.node("div", {
			id: "navbar"
		});
		a.innerHTML = '            <div class="indicator_wrapper">            <div id="indicatorContainer" class="indicator_container"></div></div>';
		var d = alloy.layout.getDesktop().body;
		d.appendChild(a);
		b.setStyle(a, "left", (alloy.layout.getClientWidth() - b.getWidth(a)) / 2 + "px");
		var d = new f.ui.Drag(a, a, {
			isLimited: !0,
			clientEl: d,
			bottomMargin: 30,
			noEndCallback: !0
		}),
			e = j = b.id("indicatorContainer");
		k = b.node("div", {
			"class": "indicator indicator_header",
			cmd: "user",
			title: "\u8bf7\u767b\u5f55"
		});
		k.innerHTML = '<img id="navbarHeaderImg" class="indicator_header_img" alt="\u8bf7\u767b\u5f55" src="' + alloy.CONST.CDN_URL + 'style/images/avatar.png">';
		e.appendChild(k);
		h = b.id("navbarHeaderImg");
		if (f.browser.mobileSafari || !alloy.portal.isWebTop()) b.addClass(a, "no_sysbtn"), b.setStyle(a, "width", "240px");
		else {
			var e = j,
				l = b.node("div", {
					"class": "indicator system_button",
					cmd: "switch",
					index: "system",
					title: "\u7cfb\u7edf\u684c\u9762"
				});
			n = l;
			if (alloy.portal.isWebTop()) {
				var g = alloy.hotkeyManager.getHotkeyInfo("layout_desktop_gosystem");
				l.title = g.keys[0].des
			}
			e.appendChild(l)
		}
		for (var e = alloy.desktopManager.getDesktopList().length, r, l = alloy.desktopManager.getDragController(), g = 0; g < e; ++g) {
			r = j;
			var m = g,
				o = alloy.hotkeyManager.getHotkeyInfo("layout_desktop_gospecific").keys[m].des,
				o = b.node("a", {
					"class": "indicator indicator_" + (m + 1),
					href: "###",
					hideFocus: "true",
					customAcceptDrop: "1",
					cmd: "switch",
					index: m,
					title: "\u684c\u9762" + (m + 1) + "\uff0c" + o
				});
			o.innerHTML = '<span class="indicator_icon_bg"></span><span class="indicator_icon indicator_icon_' + (m + 1) + '">' + (m === null || typeof m === "undefined" ? "" : m + 1) + "</span>";
			c.addObserver(o, "dragmove", q.onIndicatorDragmove);
			c.addObserver(o, "drop", q.onIndicatorDrop);
			r.appendChild(o);
			r = o;
			l.addDropTarget({
				el: r,
				level: 999
			})
		}
		v(alloy.desktopManager.getCurrentDesktopIndex());
		e = j;
		l = b.node("a", {
			"class": "indicator indicator_manage",
			href: "###",
			hideFocus: "true",
			cmd: "manage",
			title: "\u5168\u5c40\u89c6\u56fe\uff0c" + alloy.hotkeyManager.getHotkeyInfo("layout_desktop_manage").keys[0].des
		});
		g = b.node("a", {
			"class": "indicator indicator_search",
			href: "###",
			hideFocus: "true",
			cmd: "search",
			title: "\u641c\u7d22"
		});
		e.appendChild(g);
		e.appendChild(l);
		c.addObserver(d, "end", q.onIndicatorDragEnd);
		c.addEventListener(a, "click", q.onIndicatorClick);
		q.onSelfInfoReady(alloy.portal.getPortalSelf());
		c.addObserver(alloy.portal, "DesktopSwitch", q.onDesktopSwitched);
		c.addObserver(alloy.portal, "selfInfoReady", q.onSelfInfoReady);
		c.addObserver(alloy.portal, "UserAvatarChanged", q.onUserAvatarChanged)
	};
	this.showRunWebTopTip = function() {
		var a = alloy.portal.getAirRunTime();
		if (!f.platform.win && a.appVersion && !o) {
			var a = o = alloy.layout.alert('\u60a8\u786e\u5b9a\u8981\u542f\u52a8"\u589e\u5f3a\u7248"\u5417\uff1f'),
				s = a.getButton("ok").getNode(),
				q = b.getWidth(s),
				s = b.getHeight(s);
			b.setStyle(r, "width", q + "px");
			b.setStyle(r, "height", s + "px");
			g();
			c.addObserver(a, "close", d);
			c.addObserver(a, "dragMove", g)
		} else l || (l = alloy.layout.createBubble({
			className: "air_tip_bubble"
		}), l.setTitle("\u63d0\u793a"), l.setContent('\u4f7f\u7528\u65b0\u7248"\u589e\u5f3a\u7248"\u83b7\u5f97\u66f4\u4f73<br/>\u4f53\u9a8c'), l.showButton("ok", "\u7acb\u5373\u4e0b\u8f7d"), c.addObserver(l, "onBubbleOkBtnClick", e)), l.show({
			pointerPosition: "top left",
			target: alloy.navbar.getSystemButton()
		})
	};
	this.closeTip = function() {
		o && o.close()
	};
	this.getSystemButton = function() {
		return n
	};
	this.setNavBarOnTop = function(c, d, f) {
		(m = c) ? b.setStyle(a, "zIndex", alloy.layout.getTopZIndex(4)) : b.setStyle(a, "zIndex", "12");
		if (d) {
			if (alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) alloy.config.configList.navTop = c ? 1 : 0, f ? alloy.rpcService.sendMSetConfigDelay({
				data: {
					0: {
						navTop: alloy.config.configList.navTop
					}
				},
				delay: f
			}) : alloy.rpcService.sendSetConfig({
				data: {
					r: {
						appid: 0,
						value: {
							navTop: alloy.config.configList.navTop
						}
					}
				}
			});
			alloy.util.report2qqweb("navbar|" + (c ? "pin" : "unpin"))
		}
	};
	this.setNavBarPosition = function(c, d) {
		b.setStyle(a, "left", c + "px");
		b.setStyle(a, "top", d + "px")
	};
	this.isNavBarOnTop = function() {
		return m
	};
	this.setZIndex = function(c) {
		b.setStyle(a, "zIndex", c);
		alloy.searchbar.setZIndex(c)
	};
	this.getZIndex = function() {
		return b.getStyle(a, "zIndex")
	}
});
Jx().$package("alloy.searchbar", function(f) {
	var e = this,
		d = f.dom,
		g = f.event,
		b = f.string,
		c, a = !1,
		j = !1,
		k = !1,
		h, m = null,
		n = function(a, b) {
			if (!b || b == -1) {
				var d = "http://www.soso.com/q?bid=203&cid=webq.a&ie=utf-8&w=" + encodeURIComponent(a);
				alloy.portal.openInWebBrowser({
					url: d,
					title: "\u641c\u641csoso"
				})
			} else b == -2 || b == -3 ? qqweb.portal.runApp("appMarket", {
				page: "search",
				option: {
					key: a
				}
			}) : (d = alloy.fileSystem.getFolderIdByFile({
				t: alloy.fileSystem.FILE_TYPE.APP,
				id: b
			}), f.isNumber(d) && d >= 0 && d < 5 && alloy.desktopManager.setCurrentDesktop(d), qqweb.portal.runApp(b));
			c.value = "\u641c\u7d22\u7f51\u9875\u548c\u5e94\u7528...";
			q.close()
		},
		l = function(a) {
			var b = c.value;
			if (b == "" || b == "\u641c\u7d22\u7f51\u9875\u548c\u5e94\u7528...") return c.focus(), !1;
			var d = q.getSeledIndex();
			d ? o(d) : a == "btn" ? alloy.util.report2qqweb("search|searchsoso|directsearch") : a == "enter" && alloy.util.report2qqweb("search|searchsoso|entersearch");
			n(b, q.getSeledIndex())
		},
		o = function(a) {
			a == -1 ? alloy.util.report2qqweb("search|searchsoso|listsearch") : a == -2 ? alloy.util.report2qqweb("search|searchapp|clickseaapp") : alloy.util.report2qqweb("search|searchapp|clickrecapp")
		},
		r = {
			onSearchButtonClick: function() {
				l("btn");
				e.hide()
			},
			onSearchDeleteButtonClick: function() {
				c.value = "\u641c\u7d22\u7f51\u9875\u548c\u5e94\u7528...";
				d.hide(void 0)
			},
			onSearchInputKeydown: function(a) {
				a.keyCode == 13 && l("enter")
			},
			onSearchInputBlur: function() {
				if (c.value == "") c.value = "\u641c\u7d22\u7f51\u9875\u548c\u5e94\u7528..."
			},
			onSearchInputFocus: function() {
				if (c.value == "\u641c\u7d22\u7f51\u9875\u548c\u5e94\u7528...") c.value = "", q.resetUlList();
				c.value != "" && !q.isShow() && q.show()
			},
			stopPropagation: function(a) {
				a.stopPropagation()
			},
			onSearchInputKeyup: function(a) {
				c.value != "" ? q.isShow() || q.show() : q.isShow() && q.close();
				m && clearTimeout(m);
				a.keyCode === 13 ? l("enter") : a.keyCode === 38 ? q.preItem() : a.keyCode === 40 ? q.nextItem() : m = setTimeout(q.requestSuggest, 400)
			},
			onPortalReady: function() {
				d.show(h)
			}
		};
	this.setZIndex = function(a) {
		d.setStyle(h, "zIndex", a)
	};
	this.toggleShow = function(a, b) {
		j ? this.hide() : this.show(a, b)
	};
	this.show = function(b) {
		a || this.init();
		if (b) {
			var c = d.getClientXY(b),
				f = d.getClientHeight(b),
				e = d.getClientWidth(b),
				b = alloy.layout.getDesktopHeight(),
				e = c[0] - e - 157,
				l = c[1] + f + 9;
			l + 380 > b && l - 380 - f - 12 > 0 ? (l = c[1] - f - 15, k = !0, d.addClass(h, "pagelet_search_bar_top"), d.addClass(q.mainDom, "pagelet_search_suggest_top")) : (k = !1, d.removeClass(h, "pagelet_search_bar_top"), d.removeClass(q.mainDom, "pagelet_search_suggest_top"));
			d.setStyle(h, "left", e + "px");
			d.setStyle(h, "top", l + "px")
		}
		d.show(h);
		j = !0
	};
	this.hide = function() {
		a && (d.hide(h), j = !1, c.blur(), q.isShow() && q.close())
	};
	this.init = function() {
		h = d.node("div", {
			"class": "pagelet_search_bar"
		});
		d.hide(h);
		h.innerHTML = '             <input id="pageletSearchInput" class="pagelet_search_input" value="\u641c\u7d22\u7f51\u9875\u548c\u5e94\u7528...">            <\!--div id="pageletSearchButton" class="pagelet_search_button" title="\u641c\u7d22..."></div--\>\t\t\t<input type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" id="pageletSearchButton" class="pagelet_search_button" title="\u641c\u7d22..." />';
		alloy.layout.getDesktop().body.appendChild(h);
		c = d.id("pageletSearchInput");
		var b = d.id("pageletSearchButton");
		g.on(h, "click", r.stopPropagation);
		g.on(b, "click", r.onSearchButtonClick);
		g.on(c, "keyup", r.onSearchInputKeyup);
		g.on(c, "focus", r.onSearchInputFocus);
		g.on(c, "blur", r.onSearchInputBlur);
		g.on(c, "mousedown", r.stopPropagation);
		g.on(c, "mouseup", r.stopPropagation);
		g.on(c, "click", r.stopPropagation);
		q.init();
		g.addObserver(qqweb.layout, "clickDesktop", function() {
			e.hide()
		});
		a = !0
	};
	var q = {
		mainDom: null,
		ulDom: null,
		numDom: null,
		moreDom: null,
		listDomArr: null,
		bgIfrmDom: null,
		curIndex: -1,
		rpc: null,
		init: function() {
			var a = alloy.layout.getDesktop().body,
				b = null,
				b = d.node("iframe", {
					"class": "sb_bgIfm",
					id: "sb_bgIfm",
					name: "sb_bgIfm",
					frameBorder: "no",
					border: "0"
				});
			a.appendChild(b);
			this.bgIfrmDom = d.id("sb_bgIfm");
			b = d.node("div", {
				"class": "pagelet_search_suggest",
				id: "pagelet_search_suggest"
			});
			b.innerHTML = '<ul id="sb_resultBox"></ul>\t\t\t\t\t\t<div class="sb_resultList sb_app" idx="-2"><a href="#">\t\t\t\t\t\t\t<span class="sb_appTxt">\u53bb\u5e94\u7528\u5e02\u573a\u641c\u641c...</span></a>\t\t\t\t\t\t</div>                        <div class="sb_resultList sb_page" idx="-1"><a href="#">                            <span class="sb_pageTxt"><span id="sb_resultBox_key"></span>\u5728\u201cSoSo\u201d\u641c\u7d22</span></a>                        </div>\t\t\t\t\t\t';
			a.appendChild(b);
			this.mainDom = d.id("pagelet_search_suggest");
			this.ulDom = d.id("sb_resultBox");
			this.keyword = d.id("sb_resultBox_key")
		},
		resetList: function() {
			this.curIndex = -1;
			var a = this.listDomArr,
				b;
			for (b in a) d.removeClass(a[b].firstChild, "rsSeledBg")
		},
		resetUlList: function() {
			if (this.ulDom) this.ulDom.innerHTML = ""
		},
		fillResult: function(a) {
			d.hide(this.ulDom);
			var a = a != null ? a.resultData : [],
				e = [],
				l;
			for (l in a) {
				var q = a[l],
					j = b.encodeHtml(q.name);
				e.push('<li class="sb_resultList" idx="' + q.id + '"><a href="#" title="' + j + '"><div class="listInner">' + j + "</div></a></li>")
			}
			this.ulDom.innerHTML = e.join("");
			this.listDomArr = d.mini(".sb_resultList", this.mainDom);
			for (l in this.listDomArr) a = this.listDomArr[l], g.off(a, "click"), g.on(a, "click", function(a) {
				a.preventDefault();
				a = this.getAttribute("idx");
				o(a);
				n(c.value, a)
			});
			this.keyword.innerHTML = b.encodeHtmlSimple(c.value + "-");
			d.show(this.ulDom);
			this.setPosition();
			f.browser.ie && this.resizeBgIfm()
		},
		selectItem: function(a) {
			var b = this.listDomArr;
			if (!b || b.length < 1) return !1;
			var c = b.length - 1,
				a = parseInt(a);
			if (a > c) this.curIndex = a = c;
			else if (a < 1) this.curIndex = a = 0;
			if (f.isUndefined(b[a]) || !b[a]) return !1;
			for (var e in b) d.removeClass(b[e].firstChild, "rsSeledBg");
			d.addClass(b[a].firstChild, "rsSeledBg")
		},
		preItem: function() {
			this.selectItem(--this.curIndex)
		},
		nextItem: function() {
			this.selectItem(++this.curIndex)
		},
		close: function() {
			d.hide(this.bgIfrmDom);
			d.hide(this.mainDom)
		},
		show: function() {
			this.resetList();
			d.show(this.mainDom);
			this.setPosition();
			f.browser.ie && (this.resizeBgIfm(), d.show(this.bgIfrmDom))
		},
		setPosition: function() {
			var a = d.getClientXY(h),
				b = d.getClientHeight(h),
				c = d.getClientHeight(this.ulDom),
				e = a[0],
				b = a[1] + b;
			k && (b = a[1] - c);
			d.setStyle(this.mainDom, "left", e + "px");
			d.setStyle(this.mainDom, "top", b + "px");
			f.browser.ie && (d.setStyle(this.bgIfrmDom, "left", e - 1 + "px"), d.setStyle(this.bgIfrmDom, "top", b - 1 + "px"))
		},
		resizeBgIfm: function() {
			var a = d.getClientHeight(this.mainDom);
			d.setStyle(this.bgIfrmDom, "height", a + 2 + "px")
		},
		isShow: function() {
			return d.isShow(this.mainDom)
		},
		getSeledIndex: function() {
			if (this.curIndex == -1) return !1;
			var a = this.curIndex,
				b = this.listDomArr;
			return f.isUndefined(b[a]) || !b[a] ? !1 : b[a].getAttribute("idx")
		},
		requestSuggest: function() {
			if (!this.rpc) this.rpc = new v;
			b.trim(c.value) != "" && this.rpc.getSearchSuggest(c.value, q.getSuggestSuccess)
		},
		getSuggestSuccess: function(a) {
			a.retcode != 0 && f.error("\u83b7\u53d6\u641c\u7d22\u5efa\u8bae\u5185\u5bb9\u5931\u8d25\uff01");
			q.fillResult(a.result)
		}
	},
		v = function() {
			var a = alloy.rpcService.cgiSend,
				b = {},
				c = function(a, b) {
					var c = f.string.toQueryString(b.data);
					return a + "?" + c
				},
				d = alloy.CONST.JAVA_CGI_URL,
				e = function(a) {
					a = b[a];
					return !a ? null : (new Date).getTime() - a.responseTime > a.cacheTime ? null : a.data
				},
				l = function(d, l) {
					if (l.method == "GET" && l.cacheTime) {
						var g = l.cacheTime,
							q = c(d, l),
							j = e(q, g);
						if (j) f.info("url: " + d + " has a cache.", "AppMarketRequest"), l.onSuccess.call(l.context, j);
						else {
							var h = l.onSuccess;
							l.onSuccess = function(a) {
								if (a.retcode === 0) {
									f.info("cache this response now, url: " + d, "AppMarketRequest");
									var c = {};
									c.data = a;
									c.cacheTime = g;
									c.responseTime = (new Date).getTime();
									b[q] = c
								}
								h.call(l.context, a)
							};
							a(d, l)
						}
					} else f.info("url: " + d + " Width no cache!", "AppMarketRequest"), a(d, l)
				};
			this.getSearchSuggest = function(a, b, c) {
				l(d + "cgi/qqweb/market/appsearchsmart.do", {
					data: {
						kw: a,
						type: 1
					},
					method: "GET",
					cacheTime: 18E5,
					onSuccess: b,
					onTimeout: c ||
					function() {}
				})
			}
		}
});
Jx().$package("alloy.businessClass", function(f) {
	var e = f.dom,
		d = f.event,
		g = [],
		b = !1,
		c = {
			onWindowClose: function() {
				j._globalMask && j._globalMask.hide();
				alloy.hotkeyManager.setHotkeyLimitState(!1);
				this.modal && g.length > 0 && (g.shift(), b = !1);
				a()
			}
		},
		a = function() {
			if (g.length > 0) {
				var a = g[0];
				b ? a.Window.setCurrent() : a.show()
			}
		},
		j = new f.Class({
			_className: "ui_messageBox",
			init: function(b) {
				var b = b || {},
					j = {
						title: "\u6e29\u99a8\u63d0\u793a",
						modeSwitch: !0,
						dragable: !0,
						resize: !1,
						width: 350,
						height: 50,
						innerHtml: "",
						hasCloseButton: !0,
						isSetCentered: !0,
						bodyBorder: 1,
						lineHeight: "inherit",
						background: "none repeat scroll 0 0 #FFFFFF",
						level: 3,
						modal: !0
					};
				f.extend(j, b);
				if (j.modal) j.appendTo = alloy.layout.getDesktop().body;
				this.modal = j.modal;
				this.Window = alloy.windowFactory.createWindow(b.windowType || "Window", j);
				var l = this.Window.getId();
				this.Window.windowType = "messagebox";
				this.Window.setHtml('<div class="' + this._className + '" id="ui_messageBox_' + l + '" style="' + ("text-align: center;line-height: " + j.lineHeight + ";") + '"></div>');
				b.windowType || e.setStyle(this.Window.body, "background", j.background);
				this._uiMessageBox = e.id("ui_messageBox_" + l);
				this._uiMessageBox.innerHTML = j.innerHtml;
				d.addObserver(this.Window, "close", f.bind(c.onWindowClose, this));
				j.modal ? (this.Window.hide(), g.push(this), a()) : this.show()
			},
			show: function() {
				var a = this.Window.getZIndexLevel();
				if (this.modal) {
					if (!j._globalMask) j._globalMask = alloy.layout.getMaskLayer();
					j._globalMask.setZIndex(alloy.layout.getTopZIndex(a));
					j._globalMask.show();
					alloy.hotkeyManager.setHotkeyLimitState(!0);
					b = !0
				}
				this.Window.setZIndex(alloy.layout.getTopZIndex(a));
				this.Window.show();
				this.Window.setCurrent()
			}
		}),
		k = new f.Class({
			extend: j
		}, {
			init: function(a) {
				var b = {
					lineHeight: "50px",
					hasOkButton: !0,
					autoClose: !0
				};
				if (a.innerHtml.length > 34) a.lineHeight = "25px";
				f.extend(b, a);
				k.superClass.init.call(this, b);
				b.onAccept && d.addObserver(this.Window, "clickOkButton", function() {
					b.onAccept.apply(this)
				});
				b.onClose && d.addObserver(this.Window, "close", function() {
					b.onClose.apply(this)
				})
			}
		}),
		h = new f.Class({
			extend: j
		}, {
			init: function(a) {
				var b = {
					lineHeight: "50px",
					hasOkButton: !0,
					hasCancelButton: !0,
					autoClose: !0
				};
				if (a.innerHtml.length > 34) a.lineHeight = "25px";
				f.extend(b, a);
				h.superClass.init.call(this, b);
				var c = !1;
				if (b.onAccept) {
					var e = this;
					d.addObserver(this.Window, "clickOkButton", function() {
						b.onAccept.apply(e);
						c = !0
					})
				}
				b.onCancel && d.addObserver(this.Window, "close", function() {
					c || b.onCancel.apply(this)
				});
				b.onClose && d.addObserver(this.Window, "close", function() {
					b.onClose.apply(this)
				});
				b.okButtonDecorator && this.decorateOkButton(b.okButtonDecorator)
			},
			decorateOkButton: function(a) {
				for (var b in a) a.hasOwnProperty(b) && e.setStyle(this.Window._okButton._node, b, a[b])
			}
		});
	this.MessageBox = j;
	this.MessageBox.Alert = k;
	this.MessageBox.Confirm = h
});
Jet().$package("alloy.businessClass", function(f) {
	var e = f.dom,
		d = f.string,
		g = f.event,
		b = f.dom.mini,
		c = f.dom.id,
		a = [],
		j = this,
		a = [];
	this.getShareFriendById = function(b) {
		return a[b]
	};
	this.addShareFriend = function(b, c) {
		a[b] = c
	};
	this.removeShareFriendById = function(b) {
		f.isUndefined(a[b]) || (a[b].destroy(), delete a[b])
	};
	this.ShareFriends = new f.Class({
		init: function(a) {
			a = a || {};
			this.share_list = [];
			var h = this._id = a.id || (new Date).getTime(),
				m = a.className || "",
				n = a.container || alloy.layout.getDesktop().body;
			a.enableDrag = a.enableDrag || !1;
			a.maskIframe = a.maskIframe || !1;
			a.isSetCentered = a.isSetCentered || !1;
			var l = '\t\t\t\t<div class="sharef_t">\t\t\t\t\t<div class="sharef_popup_title">' + (a.title ? "\u5206\u4eab\u7ed9\u597d\u53cb - " + a.title : "\u5206\u4eab\u7ed9\u597d\u53cb") + '</div>\t\t\t\t\t<a href ="###" class ="sharef_close" id="share_close_' + h + '"></a>\t\t\t\t</div>\t\t\t\t<div class="sharef_m">\t\t\t\t\t<div class="sharef_popup_content_share sharef_popup_radius" id="sharef_popup_content_' + h + '">\t\t\t\t\t\t<div class="sharef_group_list sharef_multi_list" id="multi_list_' + h + '">\t\t\t\t\t\t\t<div>\t\t\t\t\t\t\t\t<h5 onclick="toggleItemList(this);"><span class="sharef_down_icon"></span>\u6211\u7684\u597d\u53cb</h5>\t\t\t\t\t\t\t\t<ul class="sharef_item_list">\t\t\t\t\t\t\t\t\t<li><div class="sharef_item_icon sharef_friend_icon"></div><span class="nick">\u6b63\u5728\u52a0\u8f7d\u4e2d\u2026\u2026</span><span class="sharef_selected_icon"></span></li>\t\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="sharef_info_container">\t\t\t\t\t\t\t<h5 id="share_title_' + h + '">\u53ef\u4ee5\u9080\u8bf7<span id="share_limit_' + h + '" class="sharef_limit">10</span>\u4e2a\u597d\u53cb</h5>\t\t\t\t\t\t\t<div class="sharef_list_container sharef_tip" id="share_list_container_' + h + '"></div>\t\t\t\t\t\t\t<div class="sharef_info" id="share_info_' + h + '">\t\t\t\t\t\t\t\t<strong class="sharef_big_quote">\u201c</strong>\t\t\t\t\t\t\t\t<textarea class="sharef_info_quote_content"></textarea>\t\t\t\t\t\t\t\t<strong class="sharef_big_quote sharef_right_quote">\u201d</strong>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<span class="sharef_text_limit" id="sharef_text_limit_' + h + '"></span>\t\t\t\t\t\t\t<input class="sharef_submit sharef_disabled" id="share_submit_' + h + '" type="button" value="" />\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div class="sharef_b"></div>\t\t\t';
			a.maskIframe && (l += '<iframe class="ui_maskBgIframe" src="' + alloy.CONST.MAIN_URL + 'domain.html" border="0"></iframe>');
			m = this._el = e.node("div", {
				"class": "sharef_popup_window sharef_popup_radius " + m
			});
			m.innerHTML = l;
			n.appendChild(m);
			var o = this,
				r = this.observer = {
					friendClickHanler: function(a) {
						var b = a.children[2],
							c = a.getAttribute("item_id");
						if (b.style.display != "block") {
							if (o.share_list.length < 10) o.addItem(c, "friend", a.children[1].innerHTML), b.style.display = "block"
						} else b.style.display = "none", o.deleteItem(c, "friend");
						o.renderShareList();
						g.notifyObservers(o, "clickFriendItem")
					},
					onClearSelection: function() {
						o.share_list = [];
						for (var a = b(".sharef_selected_icon", c("multi_list_" + o._appId)), d = 0; d < a.length; d++) a[d].style.display = "none";
						o._share_list_container.innerHTML = "";
						o._share_list_container.className = "sharef_list_container sharef_tip";
						o._share_title.innerHTML = '\u53ef\u4ee5\u9080\u8bf7<span class="sharef_limit">10</span>\u4e2a\u597d\u53cb'
					},
					onCloseButtonClick: function(a) {
						a.preventDefault();
						o.hide();
						g.notifyObservers(o, "clickCloseButton");
						j.removeShareFriendById(o._id)
					},
					onSendButtonClick: function(a) {
						a.preventDefault();
						if (o.share_list.length > 0) g.notifyObservers(o, "clickSendButton", d.cutByBytes(o._share_input.value, 100)), r.onClearSelection(), o._share_send.className = "sharef_submit sharef_disabled"
					},
					onInputChange: function() {
						var a = Math.ceil(d.byteLength(o._share_input.value) / 2);
						o._share_text_tip.innerHTML = a <= 50 ? "\u8fd8\u53ef\u4ee5\u8f93\u5165" + (50 - a) + "\u5b57" : '\u8d85\u8fc7<span class="red">' + (a - 50) + "</span>\u5b57 \u8d85\u51fa\u5185\u5bb9\u5c06\u4e0d\u4e88\u53d1\u9001"
					}
				};
			this._share_list_container = c("share_list_container_" + h);
			this._share_title = c("share_title_" + h);
			this._share_send = c("share_submit_" + h);
			this._share_close = c("share_close_" + h);
			this._share_info = c("share_info_" + h);
			this._el = m;
			this._share_input = e.mini(".sharef_info_quote_content", this._share_info)[0];
			this._share_text_tip = c("sharef_text_limit_" + h);
			g.on(this._share_close, "click", r.onCloseButtonClick);
			g.on(this._share_send, "click", r.onSendButtonClick);
			g.on(this._share_input, "input", r.onInputChange);
			this._share_input.value = a.text || "";
			r.onInputChange();
			this.shareList(this.getEQQFriendList());
			f.platform.iPad && new f.ui.TouchScroller(c("multi_list_" + h));
			a.enableDrag && (new f.ui.Drag(m), g.on(e.id("sharef_popup_content_" + h), "mousedown", function(a) {
				a.stopPropagation()
			}));
			e.show(m);
			a.isSetCentered && this.setCenter()
		},
		getInput: function() {
			return this._share_input.value
		},
		setZIndex: function(a) {
			e.setStyle(this._el, "zIndex", a)
		},
		setCenter: function() {
			var a = alloy.layout.getAvailableWidth(),
				b = alloy.layout.getAvailableHeight(),
				c = alloy.layout.getAreaHeight("top"),
				d = e.getClientWidth(this._el),
				f = e.getClientHeight(this._el),
				b = b > f ? (b - f) / 2 : 0;
			e.setXY(this._el, a > d ? (a - d) / 2 : 0, b < c ? c : b)
		},
		show: function() {
			e.show(this._el)
		},
		setXY: function(a, b) {
			var c = this._el.style;
			c.left = a + "px";
			c.top = b + "px"
		},
		setX: function(a) {
			this._el.style.left = a + "px"
		},
		setY: function(a) {
			this._el.style.top = a + "px"
		},
		hide: function() {
			e.hide(this._el);
			g.notifyObservers(this, "hide")
		},
		destroy: function() {
			this._el.parentNode.removeChild(this._el)
		},
		deleteItem: function(a, b) {
			for (var c = 0; c < this.share_list.length; ++c) if (this.share_list[c].uin == a && this.share_list[c].type == b) {
				this.share_list.splice(c, 1);
				break
			}
		},
		getElement: function() {
			return this._el
		},
		addItem: function(a, b, c) {
			for (var d = 0; d < this.share_list.length; ++d) if (this.share_list[d].uin == a && this.share_list[d].type == b) return;
			this.share_list.push({
				type: b,
				uin: a,
				nick: c
			})
		},
		renderShareList: function() {
			for (var a = [], b = 0; b < this.share_list.length; ++b) {
				a.push("<span>");
				var c = this.share_list[b].nick;
				c.length > 6 && (c = c.substr(0, 5) + "\u2026");
				a.push(c);
				a.push("</span>")
			}
			this._share_list_container.innerHTML = a.join("");
			this.share_list.length == 0 ? (this._share_list_container.className = "sharef_list_container sharef_tip", this._share_title.innerHTML = '\u53ef\u4ee5\u9080\u8bf7<span class="sharef_limit">10</span>\u4e2a\u597d\u53cb', this._share_send.className = "sharef_submit sharef_disabled") : (this._share_list_container.className = "sharef_list_container", this._share_title.innerHTML = '\u8fd8\u53ef\u4ee5\u9080\u8bf7<span class="sharef_limit">' + (10 - this.share_list.length) + "</span>\u4e2a\u597d\u53cb", this._share_send.className = "sharef_submit")
		},
		getEQQFriendList: function() {
			for (var a = EQQ.Model.BuddyList.getBuddyList(), b = EQQ.Model.BuddyList.getClassList(), c = [], d = 0; d < b.length; ++d) {
				var f = b[d];
				c[f.index] = {
					title: f.htmlName.length > 15 ? f.htmlName.substr(0, 15) + "\u2026" : f.htmlName,
					icon: "sharef_friend_icon",
					list: []
				}
			}
			for (d = 0; d < a.length; ++d) b = a[d], c[b.classId].list.push({
				title: b.htmlShowName,
				id: b.uin
			});
			return c
		},
		shareList: function(a) {
			this.initMultilist("multi_list_" + this._id, a)
		},
		initMultilist: function(a, b) {
			function d() {
				var a = this.firstChild,
					b = this.parentNode.children[1];
				b.style.display != "none" ? (a.className = "sharef_up_icon", b.style.display = "none") : (a.className = "sharef_down_icon", b.style.display = "block")
			}
			c(a).className += " sharef_multi_list";
			var f = [],
				e, g;
			for (e = 0; e < b.length; ++e) {
				f.push('<div><h5><span class="sharef_down_icon"></span>');
				f.push('<span class="sharef_group">');
				f.push(b[e].title);
				f.push('</span></h5><ul class="sharef_item_list">');
				var j = b[e].list;
				for (g = 0; g < j.length; ++g) f.push('<li item_id="'), f.push(j[g].id), f.push('"><span class="sharef_item_icon '), f.push(j[g].icon || b[e].icon), f.push('"></span><span class="sharef_nick">'), f.push(j[g].title), f.push('</span><span class="sharef_selected_icon"></span></li>');
				f.push("</ul></div>")
			}
			c(a).innerHTML = f.join("");
			f = c(a).getElementsByTagName("h5");
			for (e = 0; e < f.length; ++e) f[e].onclick = d;
			f = c(a).children;
			for (e = 0; e < f.length; ++e) {
				var q = f[e].getElementsByTagName("li"),
					v = this.observer.friendClickHanler;
				for (g = 0; g < q.length; ++g) q[g].onclick = function() {
					var a = q[g],
						b = v;
					return function() {
						b(a)
					}
				}(), q[g].onmouseover = function() {
					this.className = "sharef_item_highlight"
				}, q[g].onmouseout = function() {
					this.className = ""
				}
			}
			f = function(b) {
				b = c(a).children[b];
				b.firstChild.firstChild.className = "sharef_up_icon";
				b.children[1].style.display = "none"
			};
			for (e = 1; e < b.length; ++e) f(e)
		}
	})
});
Jx().$package("alloy.businessClass", function(f) {
	var e = this,
		d = f.dom,
		g = f.event;
	$T = f.fx.transitions;
	$H = f.http;
	var b = function() {
			if (alloy.portal.getLoginLevel() > alloy.CONST.LOGIN_LEVEL_NONE) {
				var b = this.getX(),
					a = this.getY(),
					d = {};
				d[this.getAppId()] = {
					x: b,
					y: a
				};
				alloy.rpcService.sendMSetConfigDelay({
					data: d,
					delay: 3E3
				})
			}
		};
	this.App = new f.Class({
		init: function(b) {
			b.id || f.out("App: [" + b.appName + "] \u7f3a\u5c11 id !!!");
			this.option = {
				id: b.id,
				gaid: b.gaid || 0,
				needAuth: b.exinfo && b.exinfo.enableGaid ? !0 : !1,
				title: b.appName || "\u672a\u547d\u540d\u5e94\u7528",
				titleIcon: b.titleIcon || !1,
				appType: b.appType || 1,
				appUrl: b.appUrl || null,
				windowType: b.windowType || "window",
				windowMode: b.windowMode || "single",
				taskType: b.taskType || "app",
				x: b.x,
				y: b.y,
				defaultWidth: 580,
				defaultHeight: 452,
				width: b.width || 580,
				height: b.height || 452,
				hasToolBar: f.isUndefined(b.hasToolBar) ? !0 : b.hasToolBar == 1,
				bodyBorder: f.isUndefined(b.bodyBorder) ? 1 : b.bodyBorder,
				hasCloseButton: f.isUndefined(b.hasCloseButton) ? !0 : b.hasCloseButton,
				hasMaxButton: f.isUndefined(b.hasMaxButton) ? !0 : b.hasMaxButton,
				hasMinButton: f.isUndefined(b.hasMinButton) ? !0 : b.hasMinButton,
				hasNextButton: f.isUndefined(b.hasNextButton) ? !1 : b.hasNextButton,
				hasPreviousButton: f.isUndefined(b.hasPreviousButton) ? !1 : b.hasPreviousButton,
				hasOkButton: b.hasOkButton || !1,
				hasCancelButton: b.hasCancelButton || !1,
				hasRefreshButton: b.hasRefreshButton ? !0 : !1,
				modeSwitch: f.isUndefined(b.modeSwitch) ? !0 : b.modeSwitch,
				dragable: f.isUndefined(b.dragable) ? !0 : b.dragable,
				dragProxy: b.dragProxy,
				resize: f.isUndefined(b.resize) ? !0 : b.resize,
				defaultMode: f.isUndefined(b.defaultMode) ? "restore" : b.defaultMode,
				flashMode: f.isUndefined(b.flashMode) ? !1 : b.flashMode,
				loginLevel: f.isUndefined(b.loginLevel) ? alloy.CONST.LOGIN_LEVEL_NONE : b.loginLevel,
				customLoginValidate: b.customLoginValidate,
				alterMode: f.isUndefined(b.alterMode) ? !1 : b.alterMode,
				minWidth: b.minWidth,
				minHeight: b.minHeight,
				right: parseInt(b.right || !1),
				bottom: parseInt(b.bottom || !1),
				ieOnly: f.isUndefined(b.ieOnly) ? !1 : b.ieOnly,
				ipadIncompatible: f.platform.iPad && !f.isUndefined(b.ipadincompatible) && b.ipadincompatible == 1 ? !0 : !1
			};
			if ((b = parseInt(b.id)) && b > 1E5) this.option.hasToolBar = !1;
			if (this.option.needAuth && alloy.CONST.LOGIN_LEVEL_NOCHAT > this.option.loginLevel) this.option.loginLevel = alloy.CONST.LOGIN_LEVEL_NOCHAT;
			if (this.option.appUrl && this.option.appUrl.length > 2 && this.option.appUrl.indexOf("://") == -1 && alloy.CONST.CDN_URL.indexOf("static.com") == -1) this.option.appUrl = "/webqqpic/" + this.option.appUrl;
			if (f.browser.mobileSafari && this.option.id === 15) this.option.appUrl = "http://live.qq.com/ipad/";
			f.out("createApp, id:" + this.option.id);
			this._isRunning = !1;
			g.notifyObservers(this, "init", this)
		},
		detectActiveX: function() {
			var b = null;
			try {
				b = new ActiveXObject("TXFTNActiveX.FTNUpload")
			} catch (a) {
				return !1
			}
			if (b) {
				var d = "";
				try {
					d = b && (b.version ? b.version : "1.0.0.8") || ""
				} catch (f) {}
				return !d ? !1 : parseInt(d.split(".").join("")) > 1007 ? !0 : !1
			} else return !1
		},
		run: function(c) {
			var a = this,
				c = c || {};
			if (f.platform.iPad) {
				var j = [],
					k = !1,
					h;
				for (h in j) if (j[h].toString() == this.option.id.toString()) {
					k = !0;
					break
				}
				if (this.option.ipadIncompatible) {
					k || alloy.layout.alert("\u5f88\u62b1\u6b49\uff0c" + (this.option.title || "\u6b64") + "\u5e94\u7528\u6682\u4e0d\u652f\u6301iPad\u3002", null, {
						modal: !0
					});
					return
				}
			}
			if (window.webTop && this.option.id == 12) alloy.layout.alert("\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u6682\u4e0d\u652f\u6301\u5ba2\u6237\u7aef\u3002", null, {
				modal: !0
			});
			else if (j = alloy.portal.getLoginLevel(), !c.noValidateLogin && this.option.loginLevel > j) this.option.customLoginValidate ? g.notifyObservers(this, "needLogin", {
				has: this.option.loginLevel,
				need: j
			}) : (j = this.option.id, c.runFrom != "url" && alloy.portal.setReRunAppList([
				[c.id, qqweb.portal.getUrlOption(c.id) || {}]
			]), this.option.loginLevel > alloy.CONST.LOGIN_LEVEL_NOCHAT ? alloy.layout.showLoginWindow(j, !0) : alloy.layout.showLoginWindow(j, !1));
			else if (this.option.id == "56" && !f.sound.isReady) f.browser.plugins.flash < 9 ? alloy.layout.alert("\u5f88\u62b1\u6b49\uff0c\u53ef\u80fd\u7531\u4e8eFlash\u7248\u672c\u8fc7\u4f4e\uff0c\u97f3\u4e50\u76d2\u5b50\u65e0\u6cd5\u4f7f\u7528\uff0c<br />\u5efa\u8bae\u60a8\u5b89\u88c5\u6700\u65b0\u7248Flash\u540e\u4f7f\u7528\u3002") : g.addObserver(f.sound, "ready", function() {
				alloy.system.runApp("56")
			});
			else if (f.browser.ie && this.option.id == "13" && !this.detectActiveX()) alloy.layout.alert("\u6b64\u5e94\u7528\u9700\u8981\u63d2\u4ef6\u652f\u6301\uff0c\u70b9\u51fb\u786e\u5b9a\u83b7\u53d6\u5b89\u88c5", function() {
				this.body.innerHTML += '<div><object classid="clsid:BDEACC50-F56D-4D60-860F-CF6ED1766D65" codebase="http://res.qqmail.com/zh_CN/activex/TencentMailActiveX.cab#version=1,0,1,32"></object></div>';
				this.close()
			}, {
				autoClose: !1
			});
			else if (this.option.id == "25") alloy.layout.messagebox("<div class='flash_alt' style='display: block;'><div class='appIframeAlter'></div><div class='appComingSoon'></div></div>", {
				title: this.option.title,
				width: 600,
				height: 450,
				modal: !0
			});
			else if (this.option.ieOnly && !f.browser.ie || f.browser.ie && this.option.id == "13" && !this.detectActiveX()) alloy.layout.alert("\u5f88\u62b1\u6b49\uff0c\u6b64\u5e94\u7528\u4ec5\u652f\u6301ie\u6d4f\u89c8\u5668\u3002");
			else if (this.option.id == "50" && alloy.portal.getLoginLevel() == alloy.CONST.LOGIN_LEVEL_NONE) alloy.layout.showLoginWindow("eqq", !0);
			else {
				if (this.isRunning()) {
					this.runOption = c;
					if ((j = this.getAppUrl()) && this._iframe && this.option.id == "appMarket") this._iframe.src = j;
					g.notifyObservers(this, "runAgain", c)
				} else {
					j = alloy.appconfig.getAllConfig(this.option.id);
					if (this.option.needAuth && 2 === this.option.appType) {
						var m = "isAuth";
						if (1 !== j.exinfo[m]) {
							var n = !0;
							alloy.rpcService.sendGetConfig({
								data: {
									r: {
										appid: a.option.id,
										itemlist: [m]
									}
								},
								action: "get",
								context: e,
								onSuccess: function(b) {
									if (0 === b.retcode) {
										n = !1;
										var d = {
											appId: a.option.id,
											gaid: a.option.gaid
										};
										1 === b.result[m] ? (d.loginParam = c.loginParam, alloy.config.requestGrant(d)) : (d.callbackArguments = {
											loginParam: c.loginParam
										}, alloy.portal.runApp("appGrant", d))
									}
								},
								onComplete: function() {
									n && alloy.layout.alert("\u6388\u6743\u72b6\u6001\u67e5\u8be2\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01");
									n = null
								}
							});
							return
						}
						m = null
					}
					this.runOption = c;
					this._isRunning = !0;
					this.option.windowMode !== "none" && (k = f.clone(this.option), k = f.extend(k, c), this.createWindow(k), this.window && (f.isUndefined(k.x) && f.isNumber(this.option.right) && (h = this.window.getWidth(), this.window.setX(alloy.layout.getAvailableWidth() - h - this.option.right)), f.isUndefined(k.y) && f.isNumber(this.option.bottom) && (k = this.window.getHeight(), this.window.setY(alloy.layout.getAvailableHeight() - k - this.option.bottom)), this.window.windowType == "widget" && g.addObserver(this.window, "dragEnd", b)));
					if (this.option.appType !== 1 && this.option.appType === 2) {
						var l = alloy.windowManager.getCurrentWindow();
						if ((!this.option.ieOnly || f.browser.ie) && (!f.browser.ie || this.option.id != "13" || this.detectActiveX())) {
							if ("exinfo" in j && (f.isObject(j.exinfo) ? j.exinfo : f.json.parse(j.exinfo)).powerLevel > 0) k = j.appKey = Math.random(), h = j.wid = encodeURIComponent(f.json.stringify({
								appid: this.option.id,
								webqqkey: k,
								webqqdomain: location.hostname
							})), qqweb.app.appKeyMap[k] = {
								appId: this.option.id,
								wid: h
							}, h = k = null;
							j = j.appKey ? j.wid : "iframeApp_" + this.window.getId();
							k = '\t\t\t\t\t\t\t<div id="container_iframeApp_' + this.window.getId() + '" class="content_area">\t\t\t\t\t\t\t\t<div id="starting_iframeApp_' + this.window.getId() + '" class="appStartingCover">\t\t\t\t\t\t\t\t\t<div id="error_background_' + this.window.getId() + '" class="appStartingError">\t\t\t\t\t\t\t\t\t\t<a id="appRestart_' + this.window.getId() + '" class="appRestart" href="#"></a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div id="appText_' + this.window.getId() + '" class="appText">\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="appStartingAnimation"></div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<iframe id="iframeApp_' + this.window.getId() + '" name="' + j + '" class="iframeApp" frameborder="no"  allowtransparency="true" scrolling="auto" hidefocus></iframe>\t\t\t\t\t\t\t\t<div id="iframeApp_dragResizeMask_' + this.window.getId() + '" class="iframeDragResizeMask"></div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t';
							this.option.windowType != "widget" && f.platform.iPad && f.platform.iPad.split(".")[0] >= 4 && (k = '\t\t\t\t\t\t\t\t<div id="container_iframeApp_' + this.window.getId() + '" class="content_area">\t\t\t\t\t\t\t\t\t<div id="starting_iframeApp_' + this.window.getId() + '" class="appStartingCover">\t\t\t\t\t\t\t\t\t\t<div id="error_background_' + this.window.getId() + '" class="appStartingError">\t\t\t\t\t\t\t\t\t\t\t<a id="appRestart_' + this.window.getId() + '" class="appRestart" href="#"></a>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t<div id="appText_' + this.window.getId() + '" class="appText">\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t<div class="appStartingAnimation"></div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div style="width:100%;position:absolute;height:100000px;">\t\t\t\t\t\t\t\t\t<iframe id="iframeApp_' + this.window.getId() + '" name="' + j + '" class="iframeApp" frameborder="no" allowtransparency="true" scrolling="auto" hidefocus ></iframe>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<iframe id="iframeApp_' + this.window.getId() + '_proxy" class="iframeApp" name="HiframeApp_' + this.window.getId() + '" src="' + qqweb.CONST.MAIN_URL + './touchpad.html?201110216001" frameborder="no" allowtransparency="true" scrolling="auto" hidefocus ></iframe>\t\t\t\t\t\t\t\t\t<div id="iframeApp_dragResizeMask_' + this.window.getId() + '" class="iframeDragResizeMask"></div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t');
							this.window.setHtml(k);
							this._contenty = this._contentx = 0;
							this._starting = d.id("starting_iframeApp_" + this.window.getId());
							this._error = d.id("error_background_" + this.window.getId());
							this._restart = d.id("appRestart_" + this.window.getId());
							this._apptext = d.id("appText_" + this.window.getId());
							this._apptext.innerHTML = "loading...";
							this.startingAnimationApp = new f.fx.Animation({
								element: this._starting,
								property: "opacity",
								from: 1,
								to: 0,
								unit: !1,
								duration: 1E3,
								fps: 30,
								transition: $T.sinusoidal.easeOut
							});
							g.addObserver(this.startingAnimationApp, "end", function() {
								d.hide(a._starting)
							});
							this._iframe = d.id("iframeApp_" + this.window.getId());
							this._iframeDragResizeMask = d.id("iframeApp_dragResizeMask_" + this.window.getId());
							this.isMouseDown = !1;
							g.on(this._iframeDragResizeMask, "mousedown", function() {
								a.isMouseDown = !0
							});
							g.on(this._iframeDragResizeMask, "mouseup", function() {
								if (a.isMouseDown) d.hide(a._iframeDragResizeMask), a.isMouseDown = !1
							});
							g.addObserver(this.window, "dragEnd", function() {
								if (a.isMouseDown) d.hide(a._iframeDragResizeMask), a.isMouseDown = !1
							});
							this._containerIframe = d.id("container_iframeApp_" + this.window.getId());
							f.platform.iPad && d.addClass(this._containerIframe, "ipad");
							if (this.option.alterMode) a.alterDom = d.node("div", {
								"class": "flash_alt"
							}), a.alterDom.innerHTML = "<div class='appIframeAlter'></div><div  class='appIframeAlterTxt'>\u8fd0\u884c\u4e2d\uff0c\u70b9\u51fb\u6062\u590d\u663e\u793a :)</div>", this.window.body.appendChild(a.alterDom);
							g.on(a._restart, "click", function() {
								d.setStyle(a._error, "display", "none");
								a._apptext.innerHTML = "loading...";
								d.setStyle(a._apptext, "marginTop", "15px");
								d.setStyle(a._apptext, "fontFamily", "Tahoma");
								d.removeClass(a._starting, "appStartingbg");
								a._iframe.src = a.getAppUrl()
							});
							g.on(this._iframe, "load", function() {
								a.hideStarting();
								d.setStyle(a._iframe, "left", "0px");
								g.notifyObservers(a, "load")
							});
							j = this.getAppUrl();
							a.showStarting();
							this._iframe.src = j;
							var o = {
								onWindowResize: function(b) {
									a.option.flashMode && a.window != l || a._resizeIframe(b)
								},
								onWindowShow: function(b) {
									f.isUndefined(a.tmpx) || (a.window.setX(a.tmpx), delete a.tmpx);
									b = a.window.getBodySize();
									a._resizeIframe(b)
								},
								onWindowDragStart: function() {
									d.show(a._iframeDragResizeMask)
								},
								onWindowDragEnd: function() {
									a.isMouseDown || d.hide(a._iframeDragResizeMask)
								},
								onSetCurrent: function() {
									d.setStyle(a._containerIframe, "height", "100%");
									d.setStyle(a._containerIframe, "width", "100%");
									o.onWindowShow();
									d.hide(a.alterDom)
								},
								onSetNotCurrent: function() {
									f.platform.iPad || (d.setStyle(a._iframe, "width", "1px"), d.setStyle(a._iframe, "height", "1px"), d.setStyle(a._containerIframe, "width", "1px"), d.setStyle(a._containerIframe, "height", "1px"), d.show(a.alterDom))
								},
								onWindowMin: function() {
									if (a.option.flashMode) {
										var b = a.window.getX();
										a.tmpx = b;
										a.window.setX(-1E4)
									}
								}
							};
							this._resizeIframe = function() {
								f.platform.iPad || (d.setStyle(this._iframe, "width", "100%"), d.setStyle(this._iframe, "height", "100%"))
							};
							this.option.alterMode ? (g.addObserver(this.window, "setCurrent", o.onSetCurrent), g.addObserver(this.window, "setNotCurrent", o.onSetNotCurrent), g.addObserver(this.window, "dragStart", o.onSetNotCurrent), g.addObserver(this.window, "dragEnd", o.onSetCurrent)) : (g.addObserver(this.window, "setNotCurrent", o.onWindowDragStart), g.addObserver(this.window, "setCurrent", o.onWindowDragEnd));
							this.option.flashMode && g.addObserver(this.window, "min", o.onWindowMin);
							g.addObserver(this.window, "resize", o.onWindowResize);
							g.addObserver(this.window, "show", o.onWindowShow)
						}
						j = !1;
						if (l) {
							k = document.getElementById("iframeApp_" + l.getId());
							try {
								j = k && typeof k.contentWindow.padEventProxy == "function" ? !0 : !1
							} catch (r) {}
						}
						f.platform.iPad && !j && new f.ui.IframeScroller(this._iframe)
					}
					this._observer = {
						onMessage: function(b) {
							b.appid == a.option.id && g.notifyObservers(a, "message", b)
						}
					};
					g.addObserver(alloy.system, "message", this._observer.onMessage);
					this.option.windowMode === "single" && g.addObserver(this, "runAgain", function() {
						a.window.setCurrent()
					});
					g.notifyObservers(this, "runFirst", c)
				}
				g.notifyObservers(alloy.portal, "appRun", this.option.id);
				alloy.portal.getAllConfig(this.option.id);
				g.notifyObservers(this, "run", c)
			}
		},
		createWindow: function(b) {
			var a = this,
				b = b || {};
			b.appId = b.id;
			var d;
			if (b.windowType == "widget") {
				var e = {
					appId: a.option.id,
					width: b.width,
					height: b.height,
					hasCloseButton: !0,
					hasPinDownButton: !0,
					isFix: !0,
					desktopIndex: b.desktopIndex,
					x: b.x,
					y: b.y
				};
				if (f.isUndefined(e.x)) e.x = f.isUndefined(a.option.x) ? 20 : a.option.x;
				if (f.isUndefined(e.y)) e.y = f.isUndefined(a.option.y) ? 255 : a.option.y;
				a.window = d = alloy.windowFactory.createWindow("Widget", e, !0)
			} else if (a.window = b.windowType == "EqqWindow" ? d = alloy.windowFactory.createWindow("EqqWindow", b) : d = alloy.windowFactory.createWindow("Window", b), b.hasToolBar) this.appToolBar = new alloy.businessClass.TitleToolBar(a);
			var h = this._windowObserver = {
				onWindowMin: function() {
					g.notifyObservers(a, "min")
				},
				onWindowMax: function() {
					g.notifyObservers(a, "max")
				},
				onWindowRestore: function() {
					g.notifyObservers(a, "restore")
				},
				onWindowFullScreen: function() {
					g.notifyObservers(a, "fullScreen")
				},
				onWindowClose: function() {
					g.removeObserver(a, "exit", h.onAppExit);
					if (a.exit() === !1) return g.addObserver(a, "exit", h.onAppExit), !1;
					else {
						if (a._iframe) {
							a._iframe.src = "about:blank";
							a._iframe.parentNode.removeChild(a._iframe);
							try {
								delete d.frames[a._iframe.getAttribute("name")]
							} catch (b) {}
							delete a._iframe
						}
						d = null
					}
					alloy.portal.reportAppState(this.option.id, 2)
				},
				onWindowSetCurrent: function() {
					g.notifyObservers(a, "setCurrent")
				},
				onWindowSetNotCurrent: function() {
					g.notifyObservers(a, "setNotCurrent")
				},
				onAppExit: function() {
					if (a._iframe) {
						a._iframe.src = "about:blank";
						a._iframe.parentNode.removeChild(a._iframe);
						try {
							delete d.frames[a._iframe.getAttribute("name")]
						} catch (b) {}
						delete a._iframe
					}
					g.removeObserver(d, "close", h.onWindowClose);
					d.close();
					g.removeObserver(a, "exit", h.onAppExit)
				}
			};
			g.addObserver(d, "min", h.onWindowMin);
			g.addObserver(d, "max", h.onWindowMax);
			g.addObserver(d, "setCurrent", h.onWindowSetCurrent);
			g.addObserver(d, "setNotCurrent", h.onWindowSetNotCurrent);
			g.addObserver(d, "close", h.onWindowClose);
			g.addObserver(a, "exit", h.onAppExit);
			b.windowType != "widget" && (g.addObserver(d, "restore", h.onWindowRestore), g.addObserver(d, "fullscreen", h.onWindowFullScreen));
			return d
		},
		min: function() {
			this.window && this.window.min()
		},
		restore: function() {
			this.window && this.window.restore()
		},
		setCurrent: function() {
			this.window && this.window.setCurrent()
		},
		setNotCurrent: function() {
			this.window && this.window.setNotCurrent()
		},
		isRunning: function() {
			return this._isRunning
		},
		getWindowList: function() {
			return [this.window]
		},
		getWindowIDList: function() {
			return [this.window.getId()]
		},
		getWindowByID: function(b) {
			var a = this.getWindowList(),
				d = this.getWindowIDList();
			return a[f.array.indexOf(d, b)]
		},
		getRunOption: function() {
			return this.runOption
		},
		removeRunOpiton: function() {
			delete this.runOption
		},
		setRunOpiton: function(b) {
			this.runOption = b
		},
		setExitConfirm: function(b) {
			this._msg = b
		},
		removeExitConfirm: function() {
			this._msg = null
		},
		exit: function() {
			if (this._msg && !confirm(this._msg)) return !1;
			else g.removeObserver(this, "runAgain"), g.notifyObservers(this, "exit"), this.destroy(), g.removeObserver(this, "exit")
		},
		destroy: function() {
			g.notifyObservers(this, "destroy");
			this._isRunning = !1;
			g.notifyObservers(alloy.portal, "appExit", this)
		},
		updateAppConfig: function(b) {
			b.id == this.option.id && (f.extend(this.option, b), this._isRunning && b.type == 2 && this.window.setTitle(b.appName))
		},
		removeAppConfig: function() {
			if (this._iframe) this._iframe.src = "about:blank";
			this.isRunning() && this.exit()
		},
		showStarting: function() {
			d.show(this._starting)
		},
		hideStarting: function() {
			this.startingAnimationApp.start()
		},
		touchMoveHandler: function(b) {
			var a = this._iframe,
				f = this._containerIframe,
				e = this._contentx + b.sx,
				b = this._contenty + b.sy,
				g = d.getWidth(a),
				m = d.getHeight(a),
				n = d.getWidth(f),
				f = d.getHeight(f);
			e > 0 ? e = 0 : e < n - g && (e = n - g);
			b > 0 ? b = 0 : b < f - m && (b = f - m);
			d.setStyle(a, "left", e + "px");
			d.setStyle(a, "top", b + "px");
			this._contentx = e;
			this._contenty = b
		},
		getAppUrl: function() {
			var b = this.getRunOption(),
				a = b && b.appUrl || this.option.appUrl;
			b && b.param && (a += b.param);
			return a
		},
		redirectToHome: function() {
			if (this.isRunning()) {
				d.setStyle(this._error, "display", "none");
				d.removeClass(this._starting, "appStartingbg");
				d.setStyle(this._starting, "opacity", "1");
				this.option.windowType != "widget" && this.showStarting();
				var b = this.getAppUrl();
				if (b && this._iframe) this._iframe.src = b
			}
		},
		setToolBarButton: function(b) {
			this.appToolBar && this.appToolBar.setButton(b)
		}
	})
});
Jx().$package("alloy.component", function(f) {
	var e = this,
		d = f.event,
		g = f.string,
		b = {
			inviteInstallAppByTips: function(a) {
				a = a || {};
				alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/tips/sendtips.do", {
					context: e,
					method: "POST",
					data: {
						r: f.json.stringify(a),
						vfwebqq: alloy.portal.getVfWebQQ()
					},
					arguments: a,
					onSuccess: function(a) {
						a.retcode === 0 ? d.notifyObservers(e, "InviteInstallAppByTipsSuccess", a.result) : d.notifyObservers(e, "InviteInstallAppByTipsError", a)
					},
					onError: function(a) {
						f.out("\u901a\u8fc7tips\u9080\u8bf7\u597d\u53cb\u6dfb\u52a0\u5e94\u7528\u5931\u8d25\uff01\uff01");
						d.notifyObservers(e, "InviteInstallAppByTipsError", a)
					}
				})
			}
		},
		c = this.createShareFriends = function(a) {
			a = a || {};
			a.className = a.className || "";
			a.cmd = f.isUndefined(a.cmd) ? 0 : a.cmd;
			if (alloy.portal.getLoginLevel() < 3) alloy.layout.alert("\u60a8\u5c1a\u672a\u767b\u5f55QQ\uff0c\u8bf7\u767b\u5f55\u540e\u518d\u8fdb\u884c\u8be5\u64cd\u4f5c\u3002", function() {
				alloy.layout.showLoginWindow("6", !0)
			});
			else {
				if (!f.isUndefined(a.id)) {
					var c = alloy.businessClass.getShareFriendById(a.id);
					if (c) return c.show(), !1
				}
				var e = new alloy.businessClass.ShareFriends({
					className: " api_sharefreind " + a.className,
					text: a.text,
					container: alloy.layout.getDesktop().body,
					isSetCentered: !0,
					enableDrag: !0,
					maskIframe: !0,
					title: a.title
				});
				f.isUndefined(a.id) || alloy.businessClass.addShareFriend(a.id, e);
				f.isUndefined(a.x) || e.setX(a.x);
				f.isUndefined(a.y) || e.setY(a.y);
				f.isUndefined(a.zindex) || e.setZIndex(a.zindex);
				var h = this._tips = new alloy.businessClass.Tips({
					centerEl: e.getElement()
				}),
					m, n, l, c = alloy.layout.getTopZIndex(3);
				e.setZIndex(c);
				h.setZIndex(c + 1);
				var o = {
					onShare: function(b) {
						if (!f.isUndefined(b)) a.text = b;
						switch (a.cmd) {
						case 0:
							o.onShareByC2C();
							break;
						case 1:
							o.onInviteInstallApp(a);
							break;
						case 2:
							o.onShareApp(a)
						}
					},
					onCancel: function() {
						switch (a.cmd) {
						case 2:
							o.onShareAppCancel(a)
						}
					},
					onShareByC2C: function() {
						var b = e.share_list,
							c = null;
						WebqCore.api.call(["getSelf", [function(a) {
							c = a
						}]]);
						if (c && c.state == "offline") h.show("\u5df2\u79bb\u7ebf", "error");
						else {
							for (var d = function(b) {
									var c = a.text;
									!f.isUndefined(a.url) && a.url != "" && (c += a.url);
									WebqCore.api.call(["sendMsg", [b, [c]]])
								}, l = 0; l < b.length; ++l) setTimeout(f.bind(d, this, b[l].uin), 1100 * l);
							h.show("\u5206\u4eab\u6210\u529f", "success");
							a.onAccept()
						}
					},
					onInviteInstallApp: function(a) {
						for (var c = e.share_list, d = alloy.appconfig.getAllConfig(a._appId), a = {
							templateId: 1,
							list: [],
							srcNickName: alloy.portal.getPortalSelf("nick"),
							title: "",
							appId: a._appId,
							appName: d.appName
						}, d = 0; d < c.length; d++) {
							var f = {};
							f.nickName = c[d].nick;
							f.uin = c[d].uin;
							a.list[d] = f
						}
						b.inviteInstallAppByTips(a);
						h.show("\u9080\u8bf7\u6210\u529f", "success")
					},
					onShareApp: function(a) {
						for (var b = e.share_list, c = [], d = 0, s = b.length; d < s; d++) c.push(b[d].uin);
						b = {
							share_type: a.type,
							friend_uins: "[" + c.join() + "]",
							dst_appid: a.gaid,
							msg: a.text,
							onAccept: a.onAccept,
							onCancel: a.onCancel
						};
						a.type == 2 && f.extend(b, {
							title: a.title,
							pic_url: a.pic,
							desc: a.desc,
							param: a.param
						});
						a.isDev ? (m ? m.show() : (m = new f.ui.Boxy({
							modal: !0,
							zIndex: alloy.layout.getTopZIndex(3),
							width: 640,
							height: 300
						}), a = alloy.portal.getPortalSelf(), n = a.htmlNick, l = alloy.util.getUserAvatar(a.uin, 1), f.dom.createStyleNode("#shareItemTip{ margin:5px; padding:0; text-align:center; font-size:14px; font-weight:bold; }\t\t\t\t\t\t\t#shareItem{ margin:10px 20px 0; border-bottom:1px solid #d8d8d8; font:12px/150% Arial; padding:0 0 10px 50px; background:0 6px no-repeat; }\t\t\t\t\t\t\t#shareItem a{ text-decoration:none; color:#0474cb; }\t\t\t\t\t\t\t#shareItem .title{ font:bold 12px/200% Arial; margin:0; padding:0; }\t\t\t\t\t\t\t#shareItem .time{ float:right; font-weight:normal; color:#666; }\t\t\t\t\t\t\t#shareItem .bubble{ position:relative; background:url(http://0.web.qstatic.com/webqqpic/module/messagecenter/images/images.png) 0 -41px; padding:21px 10px 18px 80px; width:450px; height:68px; overflow:hidden; }\t\t\t\t\t\t\t#shareItem .bubble .inner-title{ margin:0; padding:0; font:bold 12px/22px Arial; }\t\t\t\t\t\t\t#shareItem .bubble .link{ color:#0474cb; cursor:pointer; margin-right:5px; }\t\t\t\t\t\t\t#shareItem .bubble .ctrl{ float:right; font-weight:normal; }\t\t\t\t\t\t\t#shareItem .bubble .text{ height:54px; overflow:hidden; font:12px/18px Arial; color:#808080; clear:both; }\t\t\t\t\t\t\t#shareItem .bubble .pic-pane{ width:60px; height:80px; position:absolute; top:21px; left:10px; background:center 0 no-repeat; }\t\t\t\t\t\t\t#shareItem .button{ width:68px; height:22px; border:0; text-align:center; color:#fff; }\t\t\t\t\t\t\t#shareItem .button-blue{ background:url(http://0.web.qstatic.com/webqqpic/module/messagecenter/images/images.png) -346px -157px; }\t\t\t\t\t\t\t#shareItem .button-blue:hover{ background:url(http://0.web.qstatic.com/webqqpic/module/messagecenter/images/images.png) -414px -157px; }")), m.getPanel().setHtml(g.template('<p id="shareItemTip">\u5f00\u53d1\u4e2d\u5e94\u7528\u6682\u4e0d\u80fd\u5206\u4eab,\u60a8\u7684\u597d\u53cb\u5c06\u6536\u5230\u4ee5\u4e0b\u5206\u4eab\u5185\u5bb9</p>\t<div id="shareItem" style="background-image:url(<%=avatar%>);"><h5 class="title"><%=nick%><span class="time"><%=time%></span></h5>\t<%=msg%>\t<div class="bubble">\t\t<h5 class="inner-title">\t\t\t<span class="ctrl">\t\t\t\t<span class="link">\u5206\u4eab</span>\t\t\t\t<input type="button" class="button button-blue app<%=appId%>" value="\u6253\u5f00\u5e94\u7528" />\t\t\t</span>\t\t\t<span class="link app-name"><%=title%></span>\t\t</h5>\t\t<div class="text app-desc"><%=desc%></div>\t\t<div class="pic-pane" style="background-image:url(<%=pic%>);"></div>\t</div></div>', {
							avatar: l,
							nick: n,
							time: "\u521a\u521a",
							msg: g.encodeHtml(b.msg),
							appId: 0,
							title: g.encodeHtml(b.title),
							desc: g.encodeHtml(b.desc),
							pic: g.encodeHtmlAttribute(b.pic_url)
						})), b.onAccept()) : alloy.qplus.sendShare(b);
						e.hide()
					},
					onShareAppCancel: function(a) {
						a.onCancel()
					}
				};
				d.addObserver(e, "clickSendButton", o.onShare);
				d.addObserver(e, "clickCloseButton", o.onCancel);
				return e
			}
		};
	this.inviteInstallAppByC2C = function(a) {
		a = a || {};
		a.cmd = 0;
		var b = alloy.appconfig.getAllConfig(a._appId);
		a.text = "\u6211\u6b63\u5728\u4f7f\u7528Q+ Web\u4e2d\u7684" + b.appName + "\u5e94\u7528\uff0c\u5f88\u4e0d\u9519\u54e6\uff0c\u9080\u8bf7\u4f60\u4e5f\u6765\u73a9\u3002" + alloy.CONST.MAIN_URL + "?run=" + encodeURIComponent('{"' + a._appId + '":{"defaultMode":"max"}}');
		c(a)
	};
	this.inviteInstallAppByTips = function(a) {
		a = a || {};
		a.cmd = 1;
		var b = alloy.appconfig.getAllConfig(a._appId);
		a.text = "\u6211\u6b63\u5728\u4f7f\u7528Q+ Web\u4e2d\u7684" + b.appName + "\u5e94\u7528\uff0c\u5f88\u4e0d\u9519\u54e6\uff0c\u9080\u8bf7\u4f60\u4e5f\u6765\u73a9";
		c(a)
	};
	this.shareMsgByC2C = function(a) {
		a = a || {};
		a.cmd = 0;
		a.text = a.text || "";
		if (a.text === "") alloy.layout.alert("\u8bf7\u4e0d\u8981\u53d1\u9001\u7a7a\u6d88\u606f\uff01");
		else return c(a)
	};
	this.shareMsg = function(a) {
		return alloy.system.runApp("shareComponent", a)
	};
	this.shareApp = function(a) {
		var b, e, g, a = a || {};
		if (b = a._appId) if (e = alloy.appconfig.getAllConfig(b)) alloy.appconfig.isQplusApp(b) ? (g = {
			cmd: 2,
			type: a.type || 2,
			text: a.msg || "\u5206\u4eab\u5e94\u7528",
			gaid: e.gaid,
			onAccept: function() {
				a.onAccept && a.onAccept();
				var c = alloy.portal.getApp(b);
				c && d.notifyObservers(c, "shareApp", {
					shareRet: 1
				})
			},
			onCancel: function() {
				var a = alloy.portal.getApp(b);
				a && d.notifyObservers(a, "shareApp", {
					shareRet: 0
				})
			},
			isDev: "flag" in e
		}, a.type == 2 && f.extend(g, {
			title: a._title || (a.title ? e.appName + " - " + a.title : e.appName),
			pic: a.pic || alloy.util.getAppRoot(b) + "images/mid.png",
			desc: a.desc || e.appDesc || e.appName,
			param: a.param || ""
		})) : (g = alloy.CONST.MAIN_URL + "?run=" + encodeURIComponent(encodeURIComponent('{"' + b + '":{"defaultMode":"max","pushParam":"' + (a.param || "").replace('"', '\\"') + '"}}')), g = {
			cmd: 0,
			text: (a.msg || "\u5206\u4eab\u5e94\u7528") + (a.title ? e.appName + " - " + a.title : e.appName),
			url: g,
			onAccept: function() {
				a.onAccept && a.onAccept();
				var c = alloy.portal.getApp(b);
				c && d.notifyObservers(c, "shareApp", {
					shareRet: 1
				})
			}
		}), c(g)
	}
});
Jx().$package("alloy.businessClass", function(f) {
	var e = this,
		d = f.dom,
		g = f.event,
		b = f.dom.mini,
		c = f.array,
		a, j = null,
		k = function() {
			j = null;
			a.hide()
		},
		h = function(b, c, e, g) {
			g = g || 3E3;
			if (!a) {
				var h = d.node("div", {
					"class": "app_toolbar_tipouter"
				}),
					p = d.node("div", {
						"class": "app_toolbar_icon"
					}),
					s = d.node("div", {
						"class": "app_toolbar_text"
					});
				h.appendChild(p);
				h.appendChild(s);
				alloy.layout.getDesktop().body.appendChild(h);
				a = new f.ui.Panel({
					id: "app_toolbar_tip",
					name: "app_toolbar_tip",
					container: h
				});
				a.outerEl = h;
				a.iconEl = p;
				a.textEl = s
			}
			d.setClass(a.iconEl, "app_toolbar_icon app_toolbar_icon_" + c);
			a.textEl.innerHTML = b;
			j && clearTimeout(j);
			j = setTimeout(k, g);
			a.show();
			b = a;
			g = b.getSize();
			c = e.getX() + (e.getWidth() - g.width) / 2;
			e = e.getY() + (e.getHeight() - g.height) / 2;
			b.setXY(c, e)
		},
		m = new f.Class({
			init: function(a) {
				this._arrPanel = {};
				this._currentPanel = null;
				this._window = a.window;
				this._alterMode = a.alterMode;
				var b = this;
				g.addObserver(a.window, "setCurrent", function() {
					b._currentPanel && b._currentPanel.hide()
				})
			},
			add: function(a, b) {
				this._arrPanel[a] = b
			},
			get: function(a) {
				return this._arrPanel[a]
			},
			showPanel: function(a) {
				if (this._currentPanel) this._currentPanel.hide(), this._currentPanel = null;
				if (a = this.get(a)) this._alterMode && this._window.setNotCurrent(), a.show(), this._currentPanel = a
			},
			hidePanel: function(a) {
				if (a = this.get(a)) if (a.hide(), this._alterMode && this._window.setCurrent(), this._currentPanel == a) this._currentPanel = null
			},
			hideCurrent: function() {
				if (this._currentPanel) this._currentPanel.hide(), this._currentPanel = null
			}
		}),
		n = function(a) {
			a.stopPropagation()
		};
	this.AppToolBar = new f.Class({
		init: function(a) {
			var b = this.window = a.window,
				c = this;
			this.panelManager = new m({
				window: b,
				alterMode: a.option.alterMode
			});
			this._appId = Number(a.option.id);
			this._appName = a.option.title;
			this._app = a;
			var f = this._shareUrl = alloy.CONST.MAIN_URL + "?run=" + encodeURIComponent('{"' + this._appId + '":{"defaultMode":"max"}}'),
				e = this._shareTitle = "\u6211\u6b63\u5728\u4f7f\u7528Q+ Web\u4e2d\u7684#" + this._appName + "#\u5e94\u7528\uff0c\u5f88\u4e0d\u9519\u54e6\uff0c\u63a8\u8350\u4f60\u4e5f\u6765\u73a9\uff01",
				j = this._shareUrlEncode = alloy.CONST.MAIN_URL + "?run=" + encodeURIComponent(encodeURIComponent('{"' + this._appId + '":{"defaultMode":"max"}}'));
			this._shareShowContent2 = this._shareShowContent = e;
			this._shareContent = e + f;
			this._shareContentEncode = e + j;
			this._snsButtonNum = 4;
			this._navButtonNum = 2;
			this._buttonMinize = !1;
			this._buttonParams = {
				isShow: !0,
				hasBackwardButton: !1,
				hasForwardButton: !1,
				hasRefreshButton: !1
			};
			b.setToolBarHtml('<ul class="app_toolbar_navigator"><li class="app_toolbar_button_outer_nav" title="\u4e3b\u9875"><a hidefocus href="###" class="app_toolbar_button" cmd="home" id="app_toolbar_home"><span class="app_toolbar_icon app_toolbar_home"></span><span class="app_toolbar_txt">\u4e3b\u9875</span></a></li><li class="app_toolbar_button_outer_nav" title="\u8be6\u60c5"><a hidefocus href="###" class="app_toolbar_button" cmd="detail" id="app_toolbar_detail"><span class="app_toolbar_icon app_toolbar_detail"></span><span class="app_toolbar_txt">\u8be6\u60c5</span></a></li><li class="app_toolbar_button_outer_nav" title="\u540e\u9000" style="display:none"><a hidefocus href="###" class="app_toolbar_button" cmd="backward" id="app_toolbar_backward"><span class="app_toolbar_icon app_toolbar_backward"></span><span class="app_toolbar_txt">\u540e\u9000</span></a></li><li class="app_toolbar_button_outer_nav" title="\u524d\u8fdb" style="display:none"><a hidefocus href="###" class="app_toolbar_button" cmd="forward" id="app_toolbar_forward"><span class="app_toolbar_icon app_toolbar_forward"></span><span class="app_toolbar_txt">\u524d\u8fdb</span></a></li><li class="app_toolbar_button_outer_nav" title="\u5237\u65b0" style="display:none"><a hidefocus href="###" class="app_toolbar_button" cmd="refresh" id="app_toolbar_refresh"><span class="app_toolbar_icon app_toolbar_refresh"></span><span class="app_toolbar_txt">\u5237\u65b0</span></a></li></ul><ul class="app_toolbar_buttons"><li class="app_toolbar_button_outer" title="\u5206\u4eab"><a hidefocus href="###" class="app_toolbar_button" cmd="share" id="app_toolbar_share"><span class="app_toolbar_icon app_toolbar_share"></span><span class="app_toolbar_txt">\u5206\u4eab</span></a></li><li class="app_toolbar_button_outer" title="\u8bc4\u5206"><a hidefocus href="###" class="app_toolbar_button" cmd="score" id="app_toolbar_score"><span class="app_toolbar_icon app_toolbar_score"></span><span class="app_toolbar_txt">\u8bc4\u5206</span></a></li><li class="app_toolbar_button_outer" title="\u8bc4\u8bba"><a hidefocus href="###" class="app_toolbar_button" cmd="comment" id="app_toolbar_comment"><span class="app_toolbar_icon app_toolbar_comment"></span><span class="app_toolbar_txt">\u8bc4\u8bba</span></a></li><li class="app_toolbar_button_outer" title="\u4e3e\u62a5"><a hidefocus href="###" class="app_toolbar_button" cmd="complain" id="app_toolbar_complain"><span class="app_toolbar_icon app_toolbar_complain"></span><span class="app_toolbar_txt">\u4e3e\u62a5</span></a></li></ul>');
			this.toolbarIsShow = !0;
			this.currentToolbarBtn = null;
			f = b.getToolBar();
			this.backwardBtn = d.id("app_toolbar_backward");
			this.forwardBtn = d.id("app_toolbar_forward");
			this.refreshBtn = d.id("app_toolbar_refresh");
			this.shareBtn = d.id("app_toolbar_share");
			this.scoreBtn = d.id("app_toolbar_score");
			this.commentBtn = d.id("app_toolbar_comment");
			this.complainBtn = d.id("app_toolbar_complain");
			g.on(f, "click", function(a) {
				a.preventDefault();
				if (a = alloy.util.getActionTarget(a, 2, "cmd")) {
					var b = a.getAttribute("cmd");
					if (alloy.portal.getLoginLevel() < 2 && b != "detail" && b != "home") alloy.layout.alert("\u60a8\u5c1a\u672a\u767b\u5f55QQ\uff0c\u8bf7\u767b\u5f55\u540e\u518d\u8fdb\u884c\u8be5\u64cd\u4f5c\u3002", function() {
						alloy.layout.showLoginWindow(appId)
					}).setWindowCenteredRelative(c.window);
					else switch (d.toggleClass(a, "app_toolbar_button_hover"), c.currentToolbarBtn && c.currentToolbarBtn != a && d.removeClass(c.currentToolbarBtn, "app_toolbar_button_hover"), c.currentToolbarBtn = a, b) {
					case "share":
						c.toggleSharePanel();
						break;
					case "score":
						c.toggleScorePanel();
						break;
					case "comment":
						c.adjustWindow(270, 140);
						c.toggleCommentPanel();
						break;
					case "complain":
						c.adjustWindow(270, 140);
						c.toggleComplainPanel();
						break;
					case "size":
						c.toggleSizePanel();
						break;
					case "home":
						c.panelManager.hideCurrent();
						c.navigateTo("home");
						break;
					case "backward":
						c.navigateTo("backward");
						break;
					case "forward":
						c.navigateTo("forward");
						break;
					case "refresh":
						c.navigateTo("self");
						break;
					case "detail":
						c.panelManager.hideCurrent(), alloy.portal.runApp("appMarket", {
							page: "introduce",
							option: {
								appid: c._appId
							}
						})
					}
				}
			});
			g.on(f, "mousedown", function(a) {
				a.stopPropagation();
				if (a.target.className == "window_toolBar") {
					c.panelManager.hideCurrent();
					if (c.currentToolbarBtn) d.removeClass(c.currentToolbarBtn, "app_toolbar_button_hover"), c.currentToolbarBtn = null;
					c.panelManager._alterMode && c.window.setCurrent()
				}
			});
			g.addObserver(b, "setCurrent", function() {
				if (c.currentToolbarBtn) d.removeClass(c.currentToolbarBtn, "app_toolbar_button_hover"), c.currentToolbarBtn = null
			});
			b.showToolBar();
			c.appVote = {
				avgVote: 0,
				myVote: 0,
				voteCount: 0
			};
			alloy.rpcService.getAppInfo(this._appId, ["avgVote", "myVote", "vote1", "vote2", "vote3", "vote4", "vote5"], function(a) {
				if (a.retcode == 0 && a.result && a.result.resultData) a = a.result.resultData, c.appVote = {
					avgVote: a.avgVote,
					myVote: a.myVote,
					voteCount: a.vote1 + a.vote2 + a.vote3 + a.vote4 + a.vote5
				}, c._scorePanel && c.setVote(c.appVote)
			});
			b = function() {
				c.adjustButtons()
			};
			g.addObserver(a.window, "resize", b);
			b()
		},
		adjustWindow: function(a, b) {
			var c = this.window,
				d = c.getBodyWidth(),
				f = c.getBodyHeight();
			d < a && c.setBodyWidth(a);
			f < b && c.setBodyHeight(b);
			this.adjustButtons()
		},
		adjustButtons: function() {
			var a = this.window,
				c = a.getBodyWidth(),
				f = b("span.app_toolbar_txt", a._toolBar),
				a = b("li.app_toolbar_button_outer", b("ul.app_toolbar_buttons", a._toolBar)[0]);
			if (c < this._snsButtonNum * 78 + this._navButtonNum * 60) {
				this._buttonMinize = !0;
				for (var e = 0; e < f.length; e++) d.setStyle(f[e], "display", "none");
				for (e = 0; e < a.length; e++) d.addClass(a[e], "app_toolbar_button_outer_min");
				this._sharePanel && d.setStyle(this._sharePanel.container, "right", "100px");
				this._sharebox && d.setStyle(this._sharebox.getElement(), "right", "0px");
				this._shareQzone && d.setStyle(this._shareQzone.getElement(), "right", "0px");
				this._shareXiaoyou && d.setStyle(this._shareXiaoyou.getElement(), "right", "0px");
				this._scorePanel && d.setStyle(this._scorePanel.container, "right", "0px");
				this._commentPanel && d.setStyle(this._commentPanel.container, "right", "0px");
				this._complainPanel && d.setStyle(this._complainPanel.container, "right", "0px");
				c < (this._snsButtonNum + this._navButtonNum) * 35 ? (d.hide(this.backwardBtn.parentNode), d.hide(this.forwardBtn.parentNode), d.hide(this.refreshBtn.parentNode), d.hide(a[2]), d.hide(a[3]), this._sharePanel && d.setStyle(this._sharePanel.container, "right", "40px")) : (this._buttonParams.hasBackwardButton && d.show(this.backwardBtn.parentNode), this._buttonParams.hasForwardButton && d.show(this.forwardBtn.parentNode), this._buttonParams.hasRefreshButton && d.show(this.refreshBtn.parentNode), d.show(a[2]), d.show(a[3]), this._sharePanel && d.setStyle(this._sharePanel.container, "right", "100px"), c < 255 && (this._commentPanel && this._commentPanel.isShow() && (this.panelManager.hidePanel("comment"), this.window.setNotCurrent(), d.removeClass(this.currentToolbarBtn, "app_toolbar_button_hover")), this._complainPanel && this._complainPanel.isShow() && (this.panelManager.hidePanel("complain"), this.window.setNotCurrent(), d.removeClass(this.currentToolbarBtn, "app_toolbar_button_hover")), this._sharebox && (this._sharePanel.isShow() || d.removeClass(this.currentToolbarBtn, "app_toolbar_button_hover"), this.panelManager.hidePanel("share2weibo"), this.window.setNotCurrent()), this._shareQzone && (this._sharePanel.isShow() || d.removeClass(this.currentToolbarBtn, "app_toolbar_button_hover"), this.panelManager.hidePanel("share2qzone"), this.window.setNotCurrent()), this._shareXiaoyou && (this._sharePanel.isShow() || d.removeClass(this.currentToolbarBtn, "app_toolbar_button_hover"), this.panelManager.hidePanel("sharexiaoyou"), this.window.setNotCurrent())))
			} else {
				this._buttonMinize = !1;
				for (e = 0; e < f.length; e++) d.setStyle(f[e], "display", "");
				for (e = 0; e < a.length; e++) d.removeClass(a[e], "app_toolbar_button_outer_min");
				d.show(a[2]);
				d.show(a[3]);
				this._sharePanel && d.setStyle(this._sharePanel.container, "right", "255px");
				this._scorePanel && d.setStyle(this._scorePanel.container, "right", "100px");
				this._commentPanel && d.setStyle(this._commentPanel.container, "right", "120px");
				this._complainPanel && d.setStyle(this._complainPanel.container, "right", "40px");
				c > 480 ? (this._sharebox && d.setStyle(this._sharebox.getElement(), "right", "230px"), this._shareQzone && d.setStyle(this._shareQzone.getElement(), "right", "230px"), this._shareXiaoyou && d.setStyle(this._shareXiaoyou.getElement(), "right", "230px")) : (this._sharebox && d.setStyle(this._sharebox.getElement(), "right", "190px"), this._shareQzone && d.setStyle(this._shareQzone.getElement(), "right", "190px"), this._shareXiaoyou && d.setStyle(this._shareXiaoyou.getElement(), "right", "190px"))
			}
		},
		reportAppShare: function(a) {
			alloy.util.reportAppShare({
				type: a,
				appId: this._appId
			})
		},
		setButton: function(a) {
			var b = 0,
				a = f.extend(this._buttonParams, a);
			a.hasBackwardButton ? (b++, d.show(this.backwardBtn.parentNode)) : d.hide(this.backwardBtn.parentNode);
			a.hasForwardButton ? (b++, d.show(this.forwardBtn.parentNode)) : d.hide(this.forwardBtn.parentNode);
			a.hasRefreshButton ? (b++, d.show(this.refreshBtn.parentNode)) : d.hide(this.refreshBtn.parentNode);
			this._navButtonNum = 2 + b;
			this.adjustButtons()
		},
		toggleScorePanel: function() {
			var a = this,
				b = this.window.getToolBar();
			if (!this._scorePanel) {
				var c = '<div class="app_toolbar_scroebar"><div class="app_toolbar_scroe_outer"><span id="app_toolbar_scroe_' + this._appId + '" class="app_toolbar_scroe">0</span> \u5206</div><div class="app_toolbar_scroecount_outer"  id="app_toolbar_scroecount_' + this._appId + '">0\u4eba</div></div><div class="app_toolbar_stars"><div id="app_toolbar_star_' + this._appId + '" class="app_toolbar_star"><span class="app_toolbar_star_btn" star="1" title="1\u5206"></span><span class="app_toolbar_star_btn" star="2" title="2\u5206"></span><span class="app_toolbar_star_btn" star="3" title="3\u5206"></span><span class="app_toolbar_star_btn" star="4" title="4\u5206"></span><span class="app_toolbar_star_btn" star="5" title="5\u5206"></span></div></div><div id="app_toolbar_scroebar_tip_' + this._appId + '" class="app_toolbar_scroebar_tip">\u70b9\u51fb\u8bc4\u5206<sup>\u2191</sup></div>',
					e = d.node("div", {
						"class": "app_toolbar_scorepanel"
					});
				e.innerHTML = c;
				b.appendChild(e);
				var j = d.id("app_toolbar_star_" + this._appId),
					h = this.scoreEl = d.id("app_toolbar_scroe_" + this._appId),
					s = this.voteCount = d.id("app_toolbar_scroecount_" + this._appId),
					t = this.voteTip = d.id("app_toolbar_scroebar_tip_" + this._appId),
					k = this.setStar = function(a) {
						d.setStyle(j, "backgroundPosition", "-" + (90 - a * 18) + "px -100px")
					},
					z = function() {
						a.appVote.myVote ? k(a.appVote.myVote) : k(0)
					},
					m = this.setVote = function(a) {
						var b = f.number.format(a.avgVote, "#.0");
						h.innerHTML = b;
						h.title = "\u5e73\u5747\u5206\uff1a" + b + " \u5206";
						s.innerHTML = (a.voteCount > 1E4 ? a.voteCount + "+" : a.voteCount) + "\u4eba";
						s.title = "\u5171" + a.voteCount + "\u4eba\u8bc4\u5206";
						if (a.myVote > 0) k(a.myVote), t.innerHTML = "\u60a8\u7684\u8bc4\u5206\u4e3a " + a.myVote + " \u5206"
					};
				g.on(e, "mouseover", function(a) {
					var b = alloy.util.getActionTarget(a, 1, "star");
					b ? (a.stopPropagation(), a = b.getAttribute("star"), k(a)) : z()
				});
				g.on(e, "mouseout", function(a) {
					a.target == a.currentTarget && z()
				});
				g.on(e, "click", function(b) {
					var c = alloy.util.getActionTarget(b, 1, "star");
					if (c) b.stopPropagation(), b = c.getAttribute("star"), b = Number(b), a.appVote.myVote < 1 && a.appVote.voteCount++, a.appVote.myVote = b, m(a.appVote), alloy.rpcService.setAppVote({
						appid: a._appId,
						value: b,
						type: 1
					}), alloy.util.report2app("apptoolbar|grade|grade")
				});
				this._scorePanel = new f.ui.Panel({
					id: "app_toolbar_panel_" + this._appId,
					name: "app_toolbar_panel_" + this._appId,
					container: e
				});
				this.setVote(a.appVote);
				this.panelManager.add("score", this._scorePanel)
			}
			this._scorePanel.isShow() ? this.panelManager.hidePanel("score") : (this.adjustButtons(), this.panelManager.showPanel("score"))
		},
		toggleSizePanel: function() {},
		navigateTo: function(a) {
			a == "self" && (a = "refresh");
			c.indexOf(["home", "backward", "forward", "refresh"], a) >= 0 && (a == "home" ? this._app.redirectToHome() : g.notifyObservers(this.window, "toolbarClick", a))
		},
		toggleSharePanel: function() {
			var a = this,
				b = this.window.getToolBar();
			if (!this._sharePanel) {
				var c = '                \t<a class="app_toolbar_shareitem" id="app_toolbar_weibo_' + this._appId + '" href="###">                \t\t<span class="app_toolbar_shareicon app_toolbar_weibo"></span>                \t\t<span>\u5fae\u535a</span>                \t</a>                \t<a class="app_toolbar_shareitem" id="app_toolbar_qzone_' + this._appId + '" href="###">                \t\t<span class="app_toolbar_shareicon app_toolbar_qzone"></span>                \t\t<span>\u7a7a\u95f4</span>                \t</a>                \t<a class="app_toolbar_shareitem" id="app_toolbar_qqfreinds_' + this._appId + '" href="###">                \t\t<span class="app_toolbar_shareicon app_toolbar_qqfreinds"></span>                \t\t<span>\u597d\u53cb</span>                \t</a>                \t<iframe class="ui_maskBgIframe" src="domain.html" border="0"></iframe>                \t<a class="app_toolbar_shareitem" id="app_toolbar_xiaoyou_' + this._appId + '" href="###">                \t\t<span class="app_toolbar_shareicon app_toolbar_xiaoyou"></span>                \t\t<span>\u670b\u53cb</span>                \t</a>                \t',
					j = "app_toolbar_sharepanel_" + this._appId,
					k = d.node("div", {
						id: j,
						"class": "app_toolbar_sharepanel"
					});
				k.innerHTML = c;
				b.appendChild(k);
				var c = this._sharePanel = new f.ui.Panel({
					id: j,
					name: j,
					container: k
				}),
					p = {
						onWeiboItemClick: function(c) {
							c.preventDefault();
							a._sharePanel.toggleShow();
							if (!a._sharebox) c = a._sharebox = new f.ui.TextBox({
								title: "\u5206\u4eab\u5230\u5fae\u535a",
								text: a._shareShowContent,
								width: 230,
								readOnly: !1,
								maskIframe: !0,
								hasCloseButton: !1,
								container: b,
								className: "app_toolbar_share2weibo",
								thumb: "http://2." + alloy.CONST.CDN_ROOT + "pubapps/" + parseInt(a._appId / 1E3) + "/" + a._appId + "/images/thumb2.png",
								height: 95
							}), c = new f.ui.Panel({
								id: "app_toolbar_share2weibo" + a._appId,
								name: "app_toolbar_share2weibo" + a._appId,
								container: c.getElement()
							}), a.panelManager.add("share2weibo", c);
							a.panelManager.showPanel("share2weibo");
							a.adjustWindow(270, 140);
							g.on(a._sharebox.getElement(), "mousedown", n);
							g.on(a._sharebox.getElement(), "click", n);
							g.addObserver(a._sharebox, "clickSendButton", p.onShare2Weibo);
							g.addObserver(a._sharebox, "clickCloseButton", p.onShare2WeiboClose);
							g.addObserver(a._sharebox, "hide", p.onCloseSharebox)
						},
						onQQfreindsItemClick: function(c) {
							c.preventDefault();
							a._sharePanel.toggleShow();
							if (a.currentToolbarBtn) d.removeClass(a.currentToolbarBtn, "app_toolbar_button_hover"), a.currentToolbarBtn = null;
							if (parent.alloy.portal.getLoginLevel() > 2) {
								a.adjustWindow(530, 340);
								if (!a._sharefriends) c = a._sharefriends = new alloy.businessClass.ShareFriends({
									className: "app_toolbar_share2freinds",
									text: a._shareShowContent2,
									container: b,
									maskIframe: !0
								}), c = new f.ui.Panel({
									id: "app_toolbar_share2freinds" + a._appId,
									name: "app_toolbar_share2freinds" + a._appId,
									container: c.getElement()
								}), a.panelManager.add("share2freinds", c);
								a.panelManager.showPanel("share2freinds");
								a.adjustWindow(460, 140);
								g.on(a._sharefriends.getElement(), "mousedown", n);
								g.on(a._sharefriends.getElement(), "click", n);
								g.addObserver(a._sharefriends, "clickSendButton", p.onShare2QQfreinds);
								g.addObserver(a._sharefriends, "clickCloseButton", p.onCloseQQfreindsClick);
								g.addObserver(a._sharefriends, "clickFriendItem", p.onQQfreindClick)
							} else alloy.layout.showLoginWindow("eqq", !0)
						},
						onCloseQQfreindsClick: function() {
							a.window.setCurrent();
							alloy.util.report2app("apptoolbar|share|qq|close")
						},
						onQQfreindClick: function() {
							alloy.util.report2app("apptoolbar|share|qq|friends")
						},
						onQzoneItemClick: function(c) {
							c.preventDefault();
							a._sharePanel.toggleShow();
							if (!a._shareQzone) c = a._shareQzone = new f.ui.TextBox({
								title: "\u5206\u4eab\u5230QQ\u7a7a\u95f4",
								text: a._shareShowContent,
								width: 230,
								hasCloseButton: !1,
								readOnly: !1,
								maskIframe: !0,
								container: b,
								className: "app_toolbar_share2weibo",
								thumb: "http://2." + alloy.CONST.CDN_ROOT + "pubapps/" + parseInt(a._appId / 1E3) + "/" + a._appId + "/images/thumb2.png",
								height: 95
							}), c = new f.ui.Panel({
								id: "app_toolbar_share2qzone" + a._appId,
								name: "app_toolbar_share2qzone" + a._appId,
								container: c.getElement()
							}), a.panelManager.add("share2qzone", c);
							a.panelManager.showPanel("share2qzone");
							a.adjustWindow(270, 140);
							g.on(a._shareQzone.getElement(), "mousedown", n);
							g.on(a._shareQzone.getElement(), "click", n);
							g.addObserver(a._shareQzone, "clickSendButton", p.onShare2Qzone);
							g.addObserver(a._shareQzone, "clickCloseButton", p.onShare2QzoneClose);
							g.addObserver(a._shareQzone, "hide", p.onCloseShareQzone)
						},
						onXiaoyouClick: function(c) {
							c.preventDefault();
							a._sharePanel.toggleShow();
							if (!a._shareXiaoyou) c = a._shareXiaoyou = new f.ui.TextBox({
								title: "\u5206\u4eab\u5230\u670b\u53cb",
								text: a._shareShowContent,
								width: 230,
								readOnly: !1,
								maskIframe: !0,
								hasCloseButton: !1,
								container: b,
								className: "app_toolbar_share2weibo",
								height: 95
							}), c = new f.ui.Panel({
								id: "app_toolbar_sharexiaoyou" + a._appId,
								name: "app_toolbar_sharexiaoyou" + a._appId,
								container: c.getElement()
							}), a.panelManager.add("sharexiaoyou", c);
							a.panelManager.showPanel("sharexiaoyou");
							a.adjustWindow(270, 140);
							g.on(a._shareXiaoyou.getElement(), "mousedown", n);
							g.on(a._shareXiaoyou.getElement(), "click", n);
							g.addObserver(a._shareXiaoyou, "clickSendButton", p.onShareXiaoyou);
							g.addObserver(a._shareXiaoyou, "clickCloseButton", p.onShareXiaoyouClose);
							g.addObserver(a._shareXiaoyou, "hide", p.onCloseShareXiaoyou)
						},
						onCloseShareQzone: function() {
							if (a.currentToolbarBtn) d.removeClass(a.currentToolbarBtn, "app_toolbar_button_hover"), a.currentToolbarBtn = null
						},
						onCloseShareXiaoyou: function() {
							if (a.currentToolbarBtn) d.removeClass(a.currentToolbarBtn, "app_toolbar_button_hover"), a.currentToolbarBtn = null
						},
						onCloseSharebox: function() {
							if (a.currentToolbarBtn) d.removeClass(a.currentToolbarBtn, "app_toolbar_button_hover"), a.currentToolbarBtn = null;
							a.window.setCurrent()
						},
						onShare2Weibo: function() {
							p.onCheckWeiboRegested();
							alloy.util.report2app("apptoolbar|share|weibo|send")
						},
						onShare2WeiboClose: function() {
							alloy.util.report2app("apptoolbar|share|weibo|close")
						},
						onShareXiaoyouClose: function() {
							alloy.util.report2app("apptoolbar|share|xiaoyou|close")
						},
						onCheckWeiboRegested: function() {
							alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi-bin/weibo/checkReg", {
								context: e,
								method: "GET",
								data: "",
								arguments: "",
								onSuccess: function(b) {
									if (b.ret == 0) p.onAddWeibo();
									else if (a._sharebox) b = d.node("a", {
										href: "###",
										"class": "share_box_hintLink"
									}), b.innerHTML = "\u8bf7\u5148\u5f00\u901a\u5fae\u535a", h("\u672a\u5f00\u901a\u5fae\u535a", "error", a.window), g.on(b, "click", function(a) {
										a.preventDefault();
										alloy.portal.openInWebBrowser({
											url: "http://t.qq.com",
											title: "\u5f00\u901a\u5fae\u535a",
											isOpenNewTab: !0
										})
									}), a._sharebox.setHint(b)
								},
								onError: function() {}
							})
						},
						onAddWeibo: function() {
							var b = {
								format: "json",
								from: "1009"
							};
							b.pic = "http://2." + alloy.CONST.CDN_ROOT + "pubapps/" + parseInt(a._appId / 1E3) + "/" + a._appId + "/images/thumb2.png";
							b.content = "#Q+ Web\u70ed\u95e8\u5e94\u7528#" + a._sharebox._shareBoxText.value + a._shareUrl;
							alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi-bin/weibo/add_withPic", {
								context: e,
								method: "POST",
								data: b,
								arguments: {},
								onSuccess: function(b) {
									if (b.ret != 0) {
										var c = "\u5206\u4eab\u5931\u8d25";
										b.ret == 13 && (c = "\u8bf7\u52ff\u91cd\u590d\u63d0\u4ea4");
										h(c, "error", a.window)
									} else h("\u5206\u4eab\u6210\u529f", "success", a.window), a._sharebox.hide(), a.reportAppShare(2)
								},
								onError: function() {}
							})
						},
						onShare2QQfreinds: function() {
							var b = a._sharefriends.share_list,
								c = null;
							WebqCore.api.call(["getSelf", [function(a) {
								c = a
							}]]);
							if (c && c.state == "offline") h("\u5df2\u79bb\u7ebf", "error", a.window);
							else {
								for (var d = function(b) {
										var c = a._sharefriends.getInput();
										a._shareContent = c + a._shareUrlEncode;
										WebqCore.api.call(["sendMsg", [b, [a._shareContent]]])
									}, e = 0; e < b.length; ++e) setTimeout(f.bind(d, this, b[e].uin), 1100 * e);
								a._sharefriends.hide();
								h("\u5206\u4eab\u6210\u529f", "success", a.window);
								a.reportAppShare(3);
								alloy.util.report2app("apptoolbar|share|qq|send")
							}
						},
						onShare2Qzone: function() {
							var b = {
								t: 15
							};
							b.url = a._shareUrl;
							b.appid = a._appId;
							b.title = encodeURIComponent(a._shareQzone._shareBoxText.value);
							alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/qzone/share.do", {
								context: e,
								method: "POST",
								data: b,
								arguments: {},
								onSuccess: function(b) {
									b.retcode == 21 ? h("\u8bf7\u52ff\u91cd\u590d\u63d0\u4ea4", "error", a.window) : b.retcode != 0 ? h("\u5206\u4eab\u5931\u8d25", "error", a.window) : (h("\u5206\u4eab\u6210\u529f", "success", a.window), a._shareQzone.hide(), a.reportAppShare(1))
								},
								onError: function() {}
							});
							alloy.util.report2app("apptoolbar|share|qzone|send")
						},
						onShareXiaoyou: function() {
							var b = {
								t: 4
							};
							b.url = a._shareUrl;
							b.title = encodeURIComponent(a._shareXiaoyou._shareBoxText.value);
							alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/qqweb/pengyou/share.do", {
								context: e,
								method: "POST",
								data: b,
								arguments: {},
								onSuccess: function(b) {
									b.retcode == 21 ? h("\u8bf7\u52ff\u91cd\u590d\u63d0\u4ea4", "error", a.window) : b.retcode == -10002 ? (b = d.node("a", {
										href: "###",
										"class": "share_box_hintLink"
									}), b.innerHTML = "\u8bf7\u5148\u5f00\u901a\u670b\u53cb", g.on(b, "click", function(a) {
										a.preventDefault();
										alloy.portal.openInWebBrowser({
											url: "http://www.pengyou.com/",
											title: "\u5f00\u901a\u6821\u53cb",
											isOpenNewTab: !0
										})
									}), a._shareXiaoyou.setHint(b), h("\u672a\u5f00\u901a\u670b\u53cb", "error", a.window)) : b.retcode != 0 ? h("\u5206\u4eab\u5931\u8d25", "error", a.window) : (h("\u5206\u4eab\u6210\u529f", "success", a.window), a._shareXiaoyou.hide(), a.reportAppShare(4))
								},
								onError: function() {}
							});
							alloy.util.report2app("apptoolbar|share|xiaoyou|send")
						},
						onShare2QzoneClose: function() {
							alloy.util.report2app("apptoolbar|share|qzone|close")
						}
					};
				g.on(d.id("app_toolbar_weibo_" + this._appId), "click", p.onWeiboItemClick);
				g.on(d.id("app_toolbar_qqfreinds_" + this._appId), "click", p.onQQfreindsItemClick);
				g.on(d.id("app_toolbar_qzone_" + this._appId), "click", p.onQzoneItemClick);
				g.on(d.id("app_toolbar_xiaoyou_" + this._appId), "click", p.onXiaoyouClick);
				this.panelManager.add("share", c)
			}
			this._sharePanel.isShow() ? this.panelManager.hidePanel("share") : (this.adjustButtons(), this.panelManager.showPanel("share"))
		},
		toggleCommentPanel: function() {
			if (this._commentbox) this._commentPanel.isShow() ? this.panelManager.hidePanel("comment") : (this.adjustButtons(), this.panelManager.showPanel("comment"));
			else {
				var a = this,
					b = this.window.getToolBar(),
					c = {
						onAddComment: function() {
							var b = e.getValue();
							alloy.rpcService.createAppComment({
								content: b,
								appid: a._appId
							}, function(b) {
								b.retcode == 0 ? (h("\u8bc4\u8bba\u6210\u529f", "success", a.window), e.setValue(""), e.hide()) : h("\u8bc4\u8bba\u5931\u8d25", "error", a.window)
							}, function() {
								h("\u5206\u4eab\u5931\u8d25", "error", a.window)
							});
							alloy.util.report2app("apptoolbar|comment|send")
						},
						onClickMoreComments: function(b) {
							b.preventDefault();
							alloy.portal.runApp("appMarket", {
								page: "introduce",
								option: {
									appid: a._appId
								}
							});
							alloy.util.report2app("apptoolbar|comment|more")
						},
						onCloseComment: function() {
							if (a.currentToolbarBtn) d.removeClass(a.currentToolbarBtn, "app_toolbar_button_hover"), a.currentToolbarBtn = null;
							a.window.setCurrent();
							alloy.util.report2app("apptoolbar|comment|close")
						}
					},
					e = this._commentbox = new f.ui.TextBox({
						title: "\u8bc4\u8bba",
						text: "",
						container: b,
						className: "app_toolbar_commentpanel",
						maskIframe: !0,
						hasCloseButton: !1,
						limit: 300,
						hint: [{
							text: "\u66f4\u591a\u8bc4\u8bba",
							click: c.onClickMoreComments
						}],
						width: 250,
						height: 115
					});
				e.show();
				g.on(e.getElement(), "mousedown", n);
				g.on(e.getElement(), "click", n);
				g.addObserver(e, "clickSendButton", c.onAddComment);
				g.addObserver(e, "hide", c.onCloseComment);
				this.panelManager.add("comment", this._commentPanel = new f.ui.Panel({
					id: "app_toolbar_commentpanel" + this._appId,
					name: "app_toolbar_commentpanel" + this._appId,
					container: e.getElement()
				}));
				this.adjustButtons();
				this.panelManager.showPanel("comment")
			}
		},
		toggleComplainPanel: function() {
			if (this._complainbox) this._complainPanel.isShow() ? this.panelManager.hidePanel("complain") : (this.adjustButtons(), this.panelManager.showPanel("complain"));
			else {
				var a = this,
					b = this.window.getToolBar(),
					c = {
						onAddComplain: function() {
							var b = e.getValue();
							alloy.rpcService.createAppComplain({
								content: b,
								title: "",
								email: "",
								appid: a._appId
							}, function(b) {
								b.retcode == 0 ? (h("\u4e3e\u62a5\u6210\u529f", "success", a.window), e.setValue(""), e.hide()) : h("\u4e3e\u62a5\u5931\u8d25", "error", a.window)
							}, function() {
								h("\u4e3e\u62a5\u5931\u8d25", "error", a.window)
							});
							alloy.util.report2app("apptoolbar|complain|send")
						},
						onCloseComplain: function() {
							if (a.currentToolbarBtn) d.removeClass(a.currentToolbarBtn, "app_toolbar_button_hover"), a.currentToolbarBtn = null;
							a.window.setCurrent();
							alloy.util.report2app("apptoolbar|complain|close")
						}
					},
					e = this._complainbox = new f.ui.TextBox({
						title: "\u4e3e\u62a5",
						text: "",
						container: b,
						hasCloseButton: !1,
						className: "app_toolbar_complainpanel",
						maskIframe: !0,
						limit: 300,
						width: 250,
						height: 115
					});
				e._sendButton.setText("\u63d0\u4ea4");
				e.show();
				g.on(e.getElement(), "mousedown", n);
				g.on(e.getElement(), "click", n);
				g.addObserver(e, "clickSendButton", c.onAddComplain);
				g.addObserver(e, "hide", c.onCloseComplain);
				this.panelManager.add("complain", this._complainPanel = new f.ui.Panel({
					id: "app_toolbar_complainpanel" + this._appId,
					name: "app_toolbar_complainpanel" + this._appId,
					container: e.getElement()
				}));
				this.adjustButtons();
				this.panelManager.showPanel("complain")
			}
		},
		observer: {}
	});
	this.WidgetToolBar = new f.Class({
		init: function(a) {
			this.window = a.window;
			var b = this;
			this._app = a;
			var c = alloy.portal.getAppConfig(a._appId);
			this._appId = Number(a._appId);
			var d = f.ui.Button,
				e = a._titleButtonBar,
				g = "\u6211\u6b63\u5728\u4f7f\u7528Q+ Web\u4e2d\u7684#" + (c.title || c.appName) + "#\u5e94\u7528\uff0c\u5f88\u4e0d\u9519\u54e6\uff0c\u63a8\u8350\u4f60\u4e5f\u6765\u73a9\uff01";
			this.invite = this.share = null;
			var c = f.platform.iPad ? "touchstart" : "click",
				j = {},
				h = {
					onShareClick: function(c) {
						c.preventDefault();
						a.getXY();
						b.share = alloy.component.shareMsg({
							_appId: b._appId,
							text: g
						})
					},
					onFriendClick: function(c) {
						c.preventDefault();
						if (b.invite) b.invite.show();
						else {
							a.getXY();
							var c = parseInt(a.getZIndex() || 100) + 1,
								d = alloy.CONST.MAIN_URL + "?run=" + encodeURIComponent(encodeURIComponent('{"' + b._appId + '":{"defaultMode":"max"}}'));
							b.invite = alloy.component.shareMsgByC2C({
								text: g,
								url: d,
								className: "api_sharefreind2",
								container: a._toolBar,
								id: b._appId,
								zindex: c
							})
						}
					}
				};
			j[c] = h.onShareClick;
			(new d({
				appendTo: e,
				className: "widget_share",
				isStopPropagation: !0,
				title: "\u5206\u4eab",
				event: j
			})).show();
			j[c] = h.onFriendClick;
			(new d({
				appendTo: e,
				className: "widget_invite",
				isStopPropagation: !0,
				title: "\u9080\u8bf7",
				event: j
			})).show()
		},
		close: function() {
			this.share && alloy.app.shareComponent.removeshareComponentById(this._appId);
			this.invite && alloy.businessClass.removeShareFriendById(this._appId)
		}
	});
	this.TitleToolBar = function(a) {
		var b = this.window = a.window,
			e = b.getToolBar(),
			j = this,
			k = Number(a.option.id),
			p = alloy.portal.getAppConfig(k),
			s = f.ui.Button,
			t = b._toolButtonBar,
			w = new m({
				window: b,
				alterMode: a.option.alterMode
			}),
			z = "\u6211\u6b63\u5728\u4f7f\u7528Q+ Web\u4e2d\u7684#" + (p.title || p.appName) + "#\u5e94\u7528\uff0c\u5f88\u4e0d\u9519\u54e6\uff0c\u63a8\u8350\u4f60\u4e5f\u6765\u73a9\uff01",
			p = {
				onHomeClick: function(a) {
					a.preventDefault();
					G("home")
				},
				onShareClick: function(a) {
					a.preventDefault();
					alloy.portal.getLoginLevel() < 2 ? u() : j.share = alloy.component.shareMsg({
						_appId: k,
						text: z
					})
				},
				onScoreClick: function(a) {
					a.preventDefault();
					alloy.portal.getLoginLevel() < 2 ? u() : (d.addClass(t, "toolButtonBar_select_score"), C())
				},
				onCommentClick: function(a) {
					a.preventDefault();
					alloy.portal.getLoginLevel() < 2 ? u() : (d.addClass(t, "toolButtonBar_select_comment"), I())
				},
				onComplainClick: function(a) {
					a.preventDefault();
					alloy.portal.getLoginLevel() < 2 ? u() : J()
				},
				onDetailButton: function(a) {
					a.preventDefault();
					w.hideCurrent();
					alloy.portal.runApp("appMarket", {
						page: "introduce",
						option: {
							appid: k
						}
					})
				},
				onRefreshClick: function(a) {
					a.preventDefault();
					G("self");
					w.hidePanel("more")
				},
				onForwardClick: function(a) {
					a.preventDefault();
					G("forward");
					w.hidePanel("more")
				},
				onBackwardClick: function(a) {
					a.preventDefault();
					G("backward");
					w.hidePanel("more")
				},
				onMoreClick: function(a) {
					a.preventDefault();
					E.isShow() ? w.hidePanel("more") : (a = j.moreButton.getNode(), a = d.getRelativeXY(a, a.parentNode), d.setStyle(y, "left", a[0] - 22 + "px"), w.showPanel("more"))
				},
				onToolBarMouseDown: function(a) {
					a.preventDefault();
					a.stopPropagation()
				},
				onToolBarClick: function(a) {
					a.preventDefault();
					alloy.portal.getLoginLevel() < 2 && alloy.layout.alert("\u60a8\u5c1a\u672a\u767b\u5f55QQ\uff0c\u8bf7\u767b\u5f55\u540e\u518d\u8fdb\u884c\u8be5\u64cd\u4f5c\u3002", function() {
						alloy.layout.showLoginWindow(k)
					}).setWindowCenteredRelative(window)
				},
				onWindowResize: function() {
					H()
				}
			},
			u = function() {
				alloy.layout.alert("\u60a8\u5c1a\u672a\u767b\u5f55QQ\uff0c\u8bf7\u767b\u5f55\u540e\u518d\u8fdb\u884c\u8be5\u64cd\u4f5c\u3002", function() {
					alloy.layout.showLoginWindow(k)
				}).setWindowCenteredRelative(window)
			},
			A = ["share", "score", "comment"],
			H = function() {
				for (var a = d.getClientWidth(b._titleBar) / 3 - 70, a = Math.floor(a / 35), c = 0; c < A.length; c++) c <= a ? (j[A[c] + "Button"].show(), j[A[c] + "CopyButton"].hide()) : (j[A[c] + "Button"].hide(), j[A[c] + "CopyButton"].show())
			},
			F, x = {
				avgVote: 0,
				myVote: 0,
				voteCount: 0
			},
			C = function() {
				var a = b._titleBar;
				if (!F) {
					var c = '<div class="app_toolbar_scroebar"><div class="app_toolbar_scroe_outer"><span id="app_toolbar_scroe_' + k + '" class="app_toolbar_scroe">0</span> \u5206</div><div class="app_toolbar_scroecount_outer"  id="app_toolbar_scroecount_' + k + '">0\u4eba</div></div><div class="app_toolbar_stars"><div id="app_toolbar_star_' + k + '" class="app_toolbar_star"><span class="app_toolbar_star_btn" star="1" title="1\u5206"></span><span class="app_toolbar_star_btn" star="2" title="2\u5206"></span><span class="app_toolbar_star_btn" star="3" title="3\u5206"></span><span class="app_toolbar_star_btn" star="4" title="4\u5206"></span><span class="app_toolbar_star_btn" star="5" title="5\u5206"></span></div></div><div id="app_toolbar_scroebar_tip_' + k + '" class="app_toolbar_scroebar_tip">\u70b9\u51fb\u8bc4\u5206<sup>\u2191</sup></div>',
						e = d.node("div", {
							"class": "app_toolbar_scorepanel"
						});
					e.innerHTML = c;
					a.appendChild(e);
					var J = d.id("app_toolbar_star_" + k),
						E = this.scoreEl = d.id("app_toolbar_scroe_" + k),
						h = this.voteCount = d.id("app_toolbar_scroecount_" + k),
						p = this.voteTip = d.id("app_toolbar_scroebar_tip_" + k),
						l = this.setStar = function(a) {
							d.setStyle(J, "backgroundPosition", "-" + (90 - a * 18) + "px -100px")
						},
						s = j.setVote = function(a) {
							if (F) {
								var b = f.number.format(a.avgVote, "#.0");
								E.innerHTML = b;
								E.title = "\u5e73\u5747\u5206\uff1a" + b + " \u5206";
								h.innerHTML = (a.voteCount > 1E4 ? a.voteCount + "+" : a.voteCount) + "\u4eba";
								h.title = "\u5171" + a.voteCount + "\u4eba\u8bc4\u5206";
								if (a.myVote > 0) l(a.myVote), p.innerHTML = "\u60a8\u7684\u8bc4\u5206\u4e3a " + a.myVote + " \u5206"
							}
						};
					g.on(e, "mouseover", function(a) {
						var b = alloy.util.getActionTarget(a, 1, "star");
						b ? (a.stopPropagation(), a = b.getAttribute("star"), l(a)) : x.myVote ? l(x.myVote) : l(0)
					});
					g.on(e, "mouseout", function(a) {
						a.target == a.currentTarget && (x.myVote ? l(x.myVote) : l(0))
					});
					g.on(e, "mousedown", n);
					g.on(e, "click", function(a) {
						var b = alloy.util.getActionTarget(a, 1, "star");
						if (b) a.stopPropagation(), a = b.getAttribute("star"), a = Number(a), x.myVote < 1 && x.voteCount++, x.myVote = a, s(x), alloy.rpcService.setAppVote({
							appid: k,
							value: a,
							type: 1
						}), alloy.util.report2app("apptoolbar|grade|grade")
					});
					F = new f.ui.Panel({
						id: "app_toolbar_panel_" + k,
						name: "app_toolbar_panel_" + k,
						container: e
					});
					s(x);
					w.add("score", F)
				}
				F.isShow() ? (t.className = "window_toolButtonBar", w.hidePanel("score")) : w.showPanel("score")
			},
			D, I = function() {
				if (D) D.isShow() ? (t.className = "window_toolButtonBar", w.hidePanel("comment")) : w.showPanel("comment");
				else {
					var a = {
						onAddComment: function() {
							var a = {
								content: c.getValue(),
								appid: k
							};
							alloy.rpcService.createAppComment(a, function(a) {
								a.retcode == 0 ? (h("\u8bc4\u8bba\u6210\u529f", "success", b), c.setValue(""), c.hide()) : h("\u8bc4\u8bba\u5931\u8d25", "error", b)
							}, function() {
								h("\u5206\u4eab\u5931\u8d25", "error", b)
							});
							alloy.util.report2app("apptoolbar|comment|send")
						},
						onClickMoreComments: function(a) {
							a.preventDefault();
							alloy.portal.runApp("appMarket", {
								page: "introduce",
								option: {
									appid: k
								}
							});
							alloy.util.report2app("apptoolbar|comment|more")
						},
						onCloseComment: function() {
							j.window.setCurrent();
							t.className = "window_toolButtonBar";
							alloy.util.report2app("apptoolbar|comment|close")
						}
					},
						c = new f.ui.TextBox({
							title: "\u8bc4\u8bba",
							text: "",
							container: b._titleBar,
							className: "app_toolbar_commentpanel",
							maskIframe: !0,
							hasCloseButton: !1,
							limit: 300,
							hint: [{
								text: "\u66f4\u591a\u8bc4\u8bba",
								click: a.onClickMoreComments
							}],
							width: 250,
							height: 115
						});
					c.show();
					g.on(c.getElement(), "mousedown", n);
					g.on(c.getElement(), "click", n);
					g.addObserver(c, "clickSendButton", a.onAddComment);
					g.addObserver(c, "hide", a.onCloseComment);
					a = D = new f.ui.Panel({
						id: "app_toolbar_commentpanel" + k,
						name: "app_toolbar_commentpanel" + k,
						container: c.getElement()
					});
					w.add("comment", a);
					w.showPanel("comment")
				}
			},
			B, J = function() {
				if (B) B.isShow() ? (t.className = "window_toolButtonBar", w.hidePanel("complain")) : w.showPanel("complain");
				else {
					var a = {
						onAddComplain: function() {
							var a = {
								content: c.getValue(),
								title: "",
								email: "",
								appid: k
							};
							alloy.rpcService.createAppComplain(a, function(a) {
								a.retcode == 0 ? (h("\u4e3e\u62a5\u6210\u529f", "success", b), c.setValue(""), c.hide()) : h("\u4e3e\u62a5\u5931\u8d25", "error", b)
							}, function() {
								h("\u4e3e\u62a5\u5931\u8d25", "error", b)
							});
							alloy.util.report2app("apptoolbar|complain|send")
						},
						onCloseComplain: function() {
							t.className = "window_toolButtonBar";
							b.setCurrent();
							alloy.util.report2app("apptoolbar|complain|close")
						}
					},
						c = new f.ui.TextBox({
							title: "\u4e3e\u62a5",
							text: "",
							container: b._titleBar,
							className: "app_toolbar_complainpanel",
							maskIframe: !0,
							hasCloseButton: !1,
							limit: 300,
							width: 250,
							height: 115
						});
					c._sendButton.setText("\u63d0\u4ea4");
					c.show();
					g.on(c.getElement(), "mousedown", n);
					g.on(c.getElement(), "click", n);
					g.addObserver(c, "clickSendButton", a.onAddComplain);
					g.addObserver(c, "hide", a.onCloseComplain);
					a = B = new f.ui.Panel({
						id: "app_toolbar_complainpanel" + k,
						name: "app_toolbar_complainpanel" + k,
						container: c.getElement()
					});
					w.add("complain", a);
					w.showPanel("complain")
				}
			},
			E, y;
		(function() {
			var a = b._titleBar;
			y = d.node("ul", {
				"class": "share_box app_toolbar_morepanel"
			});
			a.appendChild(y);
			E = new f.ui.Panel({
				id: "app_toolbar_panel_" + k,
				name: "app_toolbar_panel_" + k,
				container: y
			});
			w.add("more", E);
			w.hidePanel("more")
		})();
		var G = function(d) {
				d == "self" && (d = "refresh");
				c.indexOf(["home", "backward", "forward", "refresh"], d) >= 0 && (d == "home" ? a.redirectToHome() : g.notifyObservers(b, "toolbarClick", d))
			};
		this.homeButton = new s({
			appendTo: t,
			className: "app_titlebar_icon app_toolbar_home",
			isStopPropagation: !0,
			title: "\u4e3b\u9875",
			event: {
				click: p.onHomeClick
			}
		});
		this.homeButton.show();
		this.shareButton = new s({
			appendTo: t,
			className: "app_titlebar_icon app_toolbar_share",
			isStopPropagation: !0,
			title: "\u5206\u4eab",
			event: {
				click: p.onShareClick
			}
		});
		this.shareButton.show();
		this.scoreButton = new s({
			appendTo: t,
			className: "app_titlebar_icon app_toolbar_score",
			isStopPropagation: !0,
			title: "\u8bc4\u5206",
			event: {
				click: p.onScoreClick
			}
		});
		this.scoreButton.show();
		this.commentButton = new s({
			appendTo: t,
			className: "app_titlebar_icon app_toolbar_comment",
			isStopPropagation: !0,
			title: "\u8bc4\u8bba",
			event: {
				click: p.onCommentClick
			}
		});
		this.commentButton.show();
		this.shareCopyButton = new s({
			appendTo: y,
			className: "app_titlebar_icon app_toolbar_share",
			isStopPropagation: !0,
			title: "\u5206\u4eab",
			text: "\u5206\u4eab",
			event: {
				click: p.onShareClick
			}
		});
		this.shareCopyButton.hide();
		this.scoreCopyButton = new s({
			appendTo: y,
			className: "app_titlebar_icon app_toolbar_score",
			isStopPropagation: !0,
			title: "\u8bc4\u5206",
			text: "\u8bc4\u5206",
			event: {
				click: p.onScoreClick
			}
		});
		this.scoreCopyButton.hide();
		this.commentCopyButton = new s({
			appendTo: y,
			className: "app_titlebar_icon app_toolbar_comment",
			isStopPropagation: !0,
			title: "\u8bc4\u8bba",
			text: "\u8bc4\u8bba",
			event: {
				click: p.onCommentClick
			}
		});
		this.commentCopyButton.hide();
		this.refreshButton = new s({
			appendTo: y,
			className: "app_titlebar_icon app_toolbar_refresh",
			isStopPropagation: !0,
			title: "\u5237\u65b0",
			text: "\u5237\u65b0",
			event: {
				click: p.onRefreshClick
			}
		});
		this.refreshButton.show();
		this.forwardButton = new s({
			appendTo: y,
			className: "app_titlebar_icon app_toolbar_forward",
			isStopPropagation: !0,
			title: "\u524d\u8fdb",
			text: "\u524d\u8fdb",
			event: {
				click: p.onForwardClick
			}
		});
		this.forwardButton.hide();
		this.backwardButton = new s({
			appendTo: y,
			className: "app_titlebar_icon app_toolbar_backward",
			isStopPropagation: !0,
			title: "\u540e\u9000",
			text: "\u540e\u9000",
			event: {
				click: p.onBackwardClick
			}
		});
		this.backwardButton.hide();
		this.detailButton = new s({
			appendTo: y,
			className: "app_titlebar_icon app_toolbar_detail",
			isStopPropagation: !0,
			title: "\u8be6\u60c5",
			text: "\u8be6\u60c5",
			event: {
				click: p.onDetailButton
			}
		});
		this.detailButton.show();
		this.complainButton = new s({
			appendTo: y,
			className: "app_titlebar_icon app_toolbar_complain",
			isStopPropagation: !0,
			title: "\u4e3e\u62a5",
			text: "\u4e3e\u62a5",
			event: {
				click: p.onComplainClick
			}
		});
		this.complainButton.show();
		this.moreButton = new s({
			appendTo: t,
			className: "app_toolbar_icon app_toolbar_more",
			isStopPropagation: !0,
			title: "\u66f4\u591a",
			event: {
				click: p.onMoreClick
			}
		});
		this.commentButton.show();
		this.setButton = function(a) {
			a = a || {};
			a.hasBackwardButton ? this.backwardButton.show() : this.backwardButton.hide();
			a.hasForwardButton ? this.forwardButton.show() : this.forwardButton.hide();
			a.hasRefreshButton ? this.refreshButton.show() : this.refreshButton.hide()
		};
		alloy.rpcService.getAppInfo(k, ["avgVote", "myVote", "vote1", "vote2", "vote3", "vote4", "vote5"], function(a) {
			if (a.retcode == 0 && a.result && a.result.resultData) a = a.result.resultData, x = {
				avgVote: a.avgVote,
				myVote: a.myVote,
				voteCount: a.vote1 + a.vote2 + a.vote3 + a.vote4 + a.vote5
			}, j.setVote && j.setVote(x)
		});
		g.addObserver(a.window, "resize", p.onWindowResize);
		g.on(e, "mousedown", p.onToolBarMouseDown);
		g.addObserver(b, "setCurrent", function() {
			t.className = "window_toolButtonBar"
		});
		g.on(e, "click", p.onToolBarClick);
		H()
	}
});
Jx().$package("alloy.pushService", function(f) {
	var e = f.event,
		d = alloy.fileSystem.FILE_TYPE,
		g = {
			onMessage: function(b) {
				if (b.mt == 1) {
					var c = Number(b.appid) || Number(b.aid),
						a = Number(b.m);
					if (c == 50) {
						if (alloy.system.getLoginLevel() < 3) c = b.ext.id, alloy.config.configList.isNoContactNotify || (b = {
							id: c,
							t: d.BUDDY,
							notifyNumber: a
						}, alloy.iconFactory.updateNotifyNumber(b))
					} else(b = alloy.portal.getAppConfig(c)) && (b.notifyNumber = a), b = {
						id: c,
						t: d.APP,
						notifyNumber: a
					}, alloy.iconFactory.updateNotifyNumber(b), alloy.qplus.onWebMessage({
						appId: c,
						number: a
					})
				} else if (b.mt == 2) c = b.appid, alloy.qplus.onWebMessage({
					appId: c,
					msg: b.m,
					time: ""
				});
				else if (b.mt == 5) switch (b.ext.msg_type) {
				case 34:
					f.profile("Q+ online");
					break;
				case 195:
					f.profile("Q+ message");
					alloy.qplus.onMessage(b.ext);
					break;
				case 48:
					f.profile("Q+ offline"), alloy.qplus.setOffline()
				}
			}
		};
	this.init = function() {
		e.addObserver(alloy.portal, "message", g.onMessage)
	}
});
Jx().$package("alloy.messageSystem", function(f) {
	var e = f.event,
		d = this,
		g = [],
		b = 0;
	this.notify = function(c) {
		var a = ++b;
		c.id = a;
		g.push(c);
		f.out("MessageSystem NotifyMessage! - " + c.from + ": " + c.type);
		e.notifyObservers(d, "MessageReceive", c);
		return a
	};
	this.handle = this.handleNotification = function(b) {
		var a;
		a: {
			a = 0;
			for (var f = g.length; a < f; a++) if (g[a].id == b) {
				b = g[a];
				g.splice(a, 1);
				a = b;
				break a
			}
			a = null
		}
		return a ? (e.notifyObservers(d, "MessageHandled", a), !0) : !1
	};
	this.handleNotificationBySource = function(b) {
		for (var a = !1, f = 0; f < g.length; f++) if (g[f].from == b) {
			var a = !0,
				k = g[f];
			g.splice(f, 1);
			f--;
			e.notifyObservers(d, "MessageHandled", k)
		}
		return a
	};
	this.removeNotificationsBySource = function(b) {
		var a = this.handleNotificationBySource(b);
		e.notifyObservers(d, "MessageSourceRemove", b);
		return a
	};
	this.getMessageAmount = function() {
		return g.length
	};
	this.getMessageById = function(b) {
		for (var a = null, d = 0, e = g.length; d < e; d++) if (g[d].id == b) {
			a = g[d];
			break
		}
		return a
	};
	this.getLatestMessage = function() {
		return g.length > 0 ? g[g.length - 1] : null
	};
	this.init = function() {
		f.profile("MessageSystem Init", "MessageSystem");
		g = []
	}
});
Jx().$package("alloy.notifier", function(f) {
	var e = f.event,
		d = f.string,
		g = f.array;
	hasInit = !1;
	var b = this.ENABLE_FLAGS = {
		ENABLE_TITLE_MARQUEE: 1,
		ENABLE_MSG_BUBBLE: 2,
		ENABLE_DESKTOP_NOTIFICATION: 4,
		ENABLE_SOUND: 8,
		ENABLE_BADGE: 16,
		ENABLE_ALL: 31
	},
		c = this.NOTIFICATION_FLAGS = {
			badge: b.ENABLE_BADGE,
			marquee: b.ENABLE_MSG_BUBBLE,
			desktop: b.ENABLE_DESKTOP_NOTIFICATION,
			title: b.ENABLE_TITLE_MARQUEE,
			sound: b.ENABLE_SOUND,
			msg: b.ENABLE_MSG_BUBBLE | b.ENABLE_DESKTOP_NOTIFICATION | b.ENABLE_TITLE_MARQUEE
		},
		a = {
			msgBubble: {
				flag: b.ENABLE_MSG_BUBBLE,
				types: ["SingleChat", "GroupChat", "DiscuChat", "BuddyAdd", "GroupJoin", "PushMessage"]
			},
			sound: {
				flag: b.ENABLE_SOUND,
				types: ["SingleChat", "GroupChat", "DiscuChat", "BuddyAdd", "GroupJoin", "PushMessage"]
			},
			titleMarquee: {
				flag: b.ENABLE_TITLE_MARQUEE,
				types: ["SingleChat", "GroupChat", "DiscuChat", "BuddyAdd", "GroupJoin", "PushMessage"]
			},
			desktopNotification: {
				flag: b.ENABLE_DESKTOP_NOTIFICATION,
				types: ["SingleChat", "GroupChat", "DiscuChat"]
			},
			ieNotification: {
				flag: b.ENABLE_DESKTOP_NOTIFICATION,
				types: ["SingleChat", "GroupChat", "DiscuChat"]
			},
			webTopNotification: {
				types: ["SingleChat", "GroupChat", "DiscuChat", "BuddyAdd", "GroupJoin"]
			},
			taskbarNotification: {
				types: ["SingleChat", "GroupChat", "DiscuChat", "BuddyAdd", "GroupJoin"]
			},
			messageManager: {
				types: ["SingleChat", "GroupChat", "BuddyAdd", "GroupJoin"]
			},
			desktopContact: {
				types: ["SingleChat", "GroupChat"]
			},
			messageBox: {
				types: ["SingleChat", "GroupChat", "DiscuChat", "BuddyAdd", "GroupJoin"]
			},
			eqq: {
				types: ["SingleChat", "GroupChat", "DiscuChat", "BuddyAdd", "GroupJoin"]
			},
			appBadge: {
				types: ["PushMessage"]
			}
		},
		j = {},
		k = {},
		h = {
			onMessageReceive: function(b) {
				var c, d, e, g, h;
				g = alloy.config.configList.notifySetting || alloy.notifier.ENABLE_FLAGS.ENABLE_ALL;
				if (c = j[b.type]) for (var l in c) if (d = c[l], e = a[d], h = k[d], b.type === "PushMessage" && (g = alloy.config.getMergedNotifications(b.body.appId)), !e.flag || e.flag & g) if (e = h.context || window, h.onMessage) try {
					h.onMessage.apply(e, [b])
				} catch (m) {
					f.error("Notifier error when message receive! Notifier id: " + d + "; error: " + m.message)
				} finally {}
			},
			onMessageHandled: function(a) {
				var b, c, d, e;
				if (b = j[a.type]) for (var g in b) if (c = b[g], d = k[c], e = d.context || window, d.onHandled) try {
					d.onHandled.apply(e, [a])
				} catch (h) {
					f.error("Notifier error when message handle! Notifier id: " + c + "; error: " + h.message)
				} finally {}
			}
		};
	this.register = function(b, c, d, e) {
		var f, g;
		f = a[b];
		if (!f) throw Error("registerNotifier: no such config for " + b);
		if (!k[b]) {
			f = f.types;
			for (var h in f) g = f[h], !j[g] ? j[g] = [b] : j[g].push(b)
		}
		k[b] = {
			onMessage: c || null,
			onHandled: d || null,
			context: e || null
		};
		return !0
	};
	this.unregister = function(b) {
		var c, d;
		c = a[b];
		if (!c) throw Error("unregisterNotifier: no such config for " + b);
		if (!k[b]) return !1;
		k[b] = null;
		delete k[b];
		c = c.types;
		for (var e in c) d = c[e], g.remove(j[d], b);
		return !0
	};
	this.init = function() {
		if (!hasInit) hasInit = !0, this.notifierList = k, this.messageType2Ids = j, this.notifierConfigs = a, e.addObserver(alloy.messageSystem, "MessageReceive", h.onMessageReceive), e.addObserver(alloy.messageSystem, "MessageHandled", h.onMessageHandled), new m, new n, alloy.app.msgBubble.run(), alloy.app.messageManager.run(), new l, f.browser.ie == 9 && new r, f.browser.ie && /(tencenttraveler)|(qqbrowser)|(maxthon)|(se 2.x)/.test(navigator.userAgent.toLowerCase()) && alloy.portal.runApp("ienotification"), window.webTop && new o
	};
	this.translateFlag = function(a) {
		var b = 0,
			d;
		for (d in a) {
			var e = c[a[d]];
			e && (b |= e)
		}
		return b
	};
	var m = new f.Class({
		init: function() {
			alloy.notifier.register("sound", this.observer.onMessageReceive, null, this)
		},
		checkIsNeedSound: function() {
			return !0
		},
		observer: {
			onMessageReceive: function(a) {
				if (this.checkIsNeedSound(a)) switch (a.type) {
				case "SingleChat":
					a.body.content == "\u5bf9\u65b9\u5411\u60a8\u53d1\u8d77\u89c6\u9891\u9080\u8bf7\u3002" ? alloy.sound.playSound("./sound/Audio.mp3", !0) : alloy.sound.playSound("./sound/msg.mp3", !0);
					break;
				case "GroupChat":
					if (alloy.layout.getIsFocusOnDesktop() && a.body.extra.isChatBoxCurrent) break;
				case "DiscuChat":
					alloy.sound.playSound("./sound/msg.mp3", !0);
					break;
				case "BuddyAdd":
				case "GroupJoin":
					alloy.sound.playSound("./sound/system.mp3", !0);
					break;
				case "PushMessage":
					alloy.sound.playSound("./sound/msg.mp3", !0)
				}
			}
		}
	}),
		n = new f.Class({
			init: function() {
				this._isFocusOnDesktop = !0;
				alloy.notifier.register("titleMarquee", this.observer.onMessageReceive, null, this);
				e.addObserver(alloy.layout, "clickDesktop", this.observer.onDesktopFocus);
				e.addObserver(alloy.layout, "desktopFocus", f.bind(this.observer.onDesktopFocus, this));
				e.addObserver(alloy.layout, "desktopBlur", f.bind(this.observer.onDesktopBlur, this))
			},
			checkIsNeedMarquee: function() {
				return this._isFocusOnDesktop ? !1 : !0
			},
			observer: {
				onMessageReceive: function(a) {
					if (this.checkIsNeedMarquee(a)) {
						var b, c = a.body;
						switch (a.type) {
						case "SingleChat":
						case "GroupChat":
						case "DiscuChat":
							a = c.title || c.uin || "Q+ Web";
							a = d.decodeHtmlSimple(a);
							b = a + " - \u6765\u6d88\u606f\u4e86...";
							break;
						case "BuddyAdd":
						case "GroupJoin":
							b = "\u60a8\u6709\u65b0\u7684\u7cfb\u7edf\u6d88\u606f...";
							break;
						case "PushMessage":
							b = "\u3010" + c.title + "\u3011\u6765\u6d88\u606f\u4e86\uff1a" + c.content
						}
						b && (alloy.layout.resetTitle(), alloy.layout.setTitle(b, {
							roll: !0
						}))
					}
				},
				onDesktopFocus: function() {
					this._isFocusOnDesktop = !0;
					f.browser.chrome ? setTimeout(function() {
						alloy.layout.resetTitle()
					}, 100) : alloy.layout.resetTitle()
				},
				onDesktopBlur: function() {
					this._isFocusOnDesktop = !1
				}
			}
		}),
		l = new f.Class({
			init: function() {
				var a = new f.ui.Notifier;
				if (a.hasSupport()) a.requestPermission(), this._notifier = a, this._notifierManage = [], this._popupHideTime = 5E3, alloy.notifier.register("desktopNotification", this.observer.onMessageReceive, null, this)
			},
			checkIsNeedNotify: function() {
				return alloy.portal.isLocked() ? !1 : !0
			},
			observer: {
				onMessageReceive: function(a) {
					if (this.checkIsNeedNotify(a)) {
						var b, c;
						b = a.body;
						for (var e = this._notifierManage, f = this._notifier; e.length >= 4;) {
							var g = e.shift();
							clearTimeout(g.timer);
							g.popup.cancel()
						}
						switch (a.type) {
						case "SingleChat":
							c = alloy.util.getUserAvatar(b.uin, 1);
							break;
						case "GroupChat":
							c = alloy.util.getGroupAvatar(b.code, 1);
							break;
						case "DiscuChat":
							c = alloy.util.getDiscuAvatar(b.uin, 1)
						}
						a = d.decodeHtmlSimple(b.title);
						b = d.decodeHtmlSimple(b.content);
						b = b.replace(/<img.*?\/?>/ig, function() {
							return "\u3010\u56fe\u7247\u3011"
						});
						b = b.replace(/<br\/>/ig, "\u3000").replace(/<([^>]+).*?>/ig, "");
						var h = f.notify(c, a, b);
						if (!h) {
							try {
								f.requestPermission()
							} catch (j) {}
							h = f.notify(c, a, b)
						}
						if (h) {
							var k = setTimeout(function() {
								h.cancel()
							}, this._popupHideTime);
							h.addEventListener("close", function() {
								clearTimeout(k)
							});
							e.push({
								popup: h,
								timer: k
							})
						}
					}
				}
			}
		}),
		o = new f.Class({
			init: function() {
				var a = this._uinCache = {},
					b = function(b, c) {
						var d = a[c];
						b == 136 ? alloy.messageSystem.handleNotification(d) : b == 137 ? alloy.messageSystem.handleNotificationBySource(50) : b == 138 ? alloy.app.msgBubble.cancelNotify() : b == 139 && alloy.app.msgBubble.cancelNotify()
					};
				/QT\//.test(webTop.type) ? webTop.ui.notification.onClick.connect(b) : webTop.ui.notification.onClick = b;
				alloy.notifier.register("webTopNotification", this.observer.onMessageReceive, this.observer.onMessageHandled, this)
			},
			checkIsNeedNotify: function(a) {
				return alloy.portal.isLocked() ? !1 : a.body.extra && a.body.extra.isChatBoxOpen ? !1 : !0
			},
			observer: {
				onMessageReceive: function(a) {
					if (this.checkIsNeedNotify(a)) {
						var b, c, e, f = a.body;
						switch (a.type) {
						case "SingleChat":
							b = d.decodeHtmlSimple(f.title);
							e = alloy.util.getUserAvatar(f.uin, 1);
							break;
						case "GroupChat":
							b = d.decodeHtmlSimple(f.title);
							e = alloy.util.getGroupAvatar(f.code, 1);
							break;
						case "DiscuChat":
							b = d.decodeHtmlSimple(f.title);
							e = alloy.util.getDiscuAvatar(f.uin, 1);
							break;
						case "BuddyAdd":
						case "GroupJoin":
							b = "\u60a8\u6709\u65b0\u7684\u7cfb\u7edf\u6d88\u606f...";
							e = "./images/messagebox_icon_system.png";
							break;
						default:
							return
						}
						c = d.decodeHtmlSimple(f.content);
						c = c.replace(/<img.*?\/?>/ig, function() {
							return "\u3010\u56fe\u7247\u3011"
						});
						c = c.replace(/<br\/>/ig, "\u3000").replace(/<([^>]+).*?>/ig, "");
						this._uinCache[f.uin] = a.id;
						webTop.ui.notification.add(e, b, c, f.uin + "", 19)
					}
				},
				onMessageHandled: function(a) {
					webTop.ui.notification.cancel(a.body.uin || "")
				}
			}
		}),
		r = new f.Class({
			init: function() {
				this._totalMsgCount = 0;
				alloy.notifier.register("taskbarNotification", this.observer.onMessageReceive, this.observer.onMessageHandled, this);
				e.on(window, "beforeunload", this.observer.onWindowUnload)
			},
			checkIsNeedNotify: function() {
				return !0
			},
			observer: {
				onMessageReceive: function(a) {
					this.checkIsNeedNotify(a) && (this._totalMsgCount++, alloy.layout.setIe9IconOverLay(this._totalMsgCount))
				},
				onMessageHandled: function() {
					this._totalMsgCount--;
					if (this._totalMsgCount < 0) this._totalMsgCount = 0;
					alloy.layout.setIe9IconOverLay(this._totalMsgCount)
				},
				onWindowUnload: function() {
					alloy.layout.setIe9IconOverLay(0)
				}
			}
		})
});
Jx().$package("alloy.sound", function(f) {
	var e = f.event,
		d = f.sound,
		g = {};
	alloy.sound = {
		createIpadAudioObj: function() {
			if (!this._IpadAudioObj) this._IpadAudioObj = new f.sound("./sound/msg.mp3", !0, !0)
		},
		init: function() {
			d.init({
				path: alloy.CONST.MAIN_URL + "swf/jxswfsound.swf?t=20111011001"
			})
		},
		playSound: f.platform.iPad ?
		function(b, c) {
			if (!d.isReady || this.isMute() || !b) return !1;
			var c = c || !1,
				a = g[b];
			if (!a && !c) a = g[b] = new d(b), a.load();
			else if (c) a = this._IpadAudioObj, a.play(!0, b);
			return a
		} : function(b, c) {
			if (!d.isReady || this.isMute() || !b) return !1;
			var c = c || !1,
				a = g[b];
			try {
				a ? c && a.play() : (a = g[b] = new d(b, c), c || a.load())
			} catch (e) {
				f.error("alloy.sound: " + e.message)
			}
			return a
		},
		setMute: function(b) {
			try {
				b ? d.Global.mute() : d.Global.unMute()
			} catch (c) {
				f.out(c.message, "alloy.sound")
			}
			e.notifyObservers(alloy.sound, "SoundMuteChange", !! b)
		},
		isMute: function() {
			return d.Global.isMute()
		},
		setVol: function(b) {
			d.Global.setVolume(b)
		},
		getVol: function() {
			return d.Global.getVolume()
		}
	}
});
Jx().$package("alloy.apiManager", function(f) {
	var e = this,
		d = f.dom,
		g = f.event,
		b = f.string,
		c = {},
		a, j;
	try {
		a = new ActiveXObject("CrossDomainCtrl.CrossDomain"), j = !0
	} catch (k) {}
	var h = {
		system: {
			alert: {
				powerLevel: 1,
				api: function(a) {
					alloy.layout.alert(b.encodeHtml(a.msg), function() {
						a.seq && r(a.seq, !0)
					}, a.option);
					return "asynchronous"
				}
			},
			confirm: {
				powerLevel: 1,
				api: function(a) {
					alloy.layout.confirm(b.encodeHtml(a.msg), function() {
						a.seq && r(a.seq, !0)
					}, {
						onCancel: function() {
							a.seq && r(a.seq, !1)
						}
					});
					return "asynchronous"
				}
			},
			showLoginBox: {
				powerLevel: 1,
				api: function(a) {
					return alloy.layout.showLoginBox(a.appId, a.strong)
				}
			},
			showAppBox: {
				powerLevel: 1,
				api: function() {
					return alloy.app.appBar.showPopup()
				}
			},
			hideAppBox: {
				powerLevel: 1,
				api: function() {
					return alloy.app.appBar.hidePopup()
				}
			},
			getLoginState: 1,
			getConfig: 1,
			isLocked: 1,
			isAppInstalled: 1,
			isAppRunning: 1,
			installApp: {
				powerLevel: 1,
				api: function(a) {
					alloy.layout.confirm("\u662f\u5426\u6dfb\u52a0\u5e94\u7528", function() {
						alloy.config.addSetupApp(a.appId);
						a.seq && r(a.seq, !0)
					}, {
						onCancel: function() {
							a.seq && r(a.seq, !1)
						}
					});
					return "asynchronous"
				}
			},
			runApp: {
				powerLevel: 1,
				api: function(a) {
					return alloy.system.runApp(a.appId, a.option)
				}
			},
			getAppInfo: {
				powerLevel: 1,
				api: function(a) {
					alloy.system.getAppInfo({
						appList: a.appId,
						onSuccess: function(b) {
							a.seq && r(a.seq, b)
						},
						onError: function(b) {
							a.seq && r(a.seq, b)
						}
					});
					return "asynchronous"
				}
			},
			openURL: 1,
			search: 1,
			getUinAndSkey: 3,
			runSettingCenter: 1,
			runAppMarket: 1,
			runBrowser: 1,
			runQQ: 1,
			runIME: 1,
			runHandWrite: 1,
			notifyMessage: 1,
			openFile: 1,
			about: {
				powerLevel: 1,
				api: function() {
					alert("Tencent Alloy OS.")
				}
			},
			isWebTop: {
				powerLevel: 1,
				api: function() {
					return alloy.portal.isWebTop()
				}
			},
			getToken: {
				powerLevel: 1,
				api: function(a) {
					var a = a._appId,
						b = alloy.appconfig.getAppConfig(a);
					return b.exinfo && b.exinfo.isAuth ? alloy.portal.getCacheOpenkey(a) ? {
						openID: openId,
						openKey: openKey
					} : {} : {
						ret: 5
					}
				}
			},
			getVersion: {
				powerLevel: 1,
				api: function() {
					return {
						version: "Q+ Web"
					}
				}
			},
			isWebTop: {
				powerLevel: 1,
				api: function() {
					return alloy.portal.isWebTop()
				}
			},
			setWallpaper: {
				powerLevel: 1,
				api: function(a) {
					var b = {
						filling: "fill",
						adapt: "adapt",
						stretch: "zoom",
						flat: "repeat",
						center: "center"
					};
					if (/^http:\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-\.\/?%&=]*)?$/.test(a.url)) {
						var c = a.url,
							d = b[a.type] || "fill";
						alloy.layout.confirm("\u7ee7\u7eed\u64cd\u4f5c\u5c06\u4fee\u6539\u60a8\u7684\u684c\u9762\u4e3b\u9898\u8bbe\u7f6e\uff0c\u662f\u5426\u7ee7\u7eed\uff1f", function() {
							a.seq && (alloy.layout.themeManager.setWallpaper(c, d), r(a.seq, {
								retCode: 0
							}))
						}, {
							onCancel: function() {
								a.seq && r(a.seq, {
									retCode: 1
								})
							}
						});
						return "asynchronous"
					} else return {
						retCode: 1
					}
				}
			}
		},
		layout: {
			getDesktopSize: 1,
			getClientSize: 1,
			getAvailSize: 1,
			showDesktop: 1,
			applyTheme: {
				powerLevel: 1,
				api: function(a) {
					return alloy.layout.themeManager.applyTheme(a)
				}
			},
			applySkin: {
				powerLevel: 1,
				api: function(a) {
					return alloy.layout.themeManager.applySkin(a)
				}
			},
			applyWallpaper: {
				powerLevel: 1,
				api: function(a) {
					return alloy.layout.themeManager.applyWallpaper(a.url, a.mode)
				}
			},
			applyScene: {
				powerLevel: 1,
				api: function(a) {
					return alloy.layout.themeManager.applyScene(a.id)
				}
			},
			setTheme: {
				powerLevel: 1,
				api: function(a) {
					alloy.layout.confirm("\u7ee7\u7eed\u64cd\u4f5c\u5c06\u4fee\u6539\u60a8\u7684\u684c\u9762\u4e3b\u9898\u8bbe\u7f6e\uff0c\u662f\u5426\u7ee7\u7eed\uff1f", function() {
						return alloy.layout.themeManager.setTheme(a)
					})
				}
			},
			setSkin: {
				powerLevel: 1,
				api: function(a) {
					alloy.layout.confirm("\u7ee7\u7eed\u64cd\u4f5c\u5c06\u4fee\u6539\u60a8\u7684\u684c\u9762\u4e3b\u9898\u8bbe\u7f6e\uff0c\u662f\u5426\u7ee7\u7eed\uff1f", function() {
						return alloy.layout.themeManager.setSkin(a)
					})
				}
			},
			setWallpaper: {
				powerLevel: 1,
				api: function(a) {
					alloy.layout.confirm("\u7ee7\u7eed\u64cd\u4f5c\u5c06\u4fee\u6539\u60a8\u7684\u684c\u9762\u4e3b\u9898\u8bbe\u7f6e\uff0c\u662f\u5426\u7ee7\u7eed\uff1f", function() {
						return alloy.layout.themeManager.setWallpaper(a.url, a.mode)
					})
				}
			},
			setScene: {
				powerLevel: 1,
				api: function(a) {
					return alloy.layout.themeManager.applyScene(a.id)
				}
			}
		},
		util: {
			getCookie: {
				powerLevel: 3,
				api: function(a) {
					return alloy.util.getCookie(a.name)
				}
			},
			cgiSend: {
				powerLevel: 1,
				api: function(a) {
					var b = a.url.match(/\/api\/(\w)*\//gi),
						c;
					if (b) {
						switch (b[0]) {
						case "/api/weibo/":
							c = "weibo"
						}
						c ? t[c] ? z(a) : confirm(w[c]) ? (t[c] = !0, z(a)) : t[c] = !1 : z(a)
					} else z(a);
					return "asynchronous"
				}
			}
		},
		app: {
			getWindowIDList: {
				powerLevel: 1,
				api: function(a) {
					return a.getWindowIDList()
				}
			},
			exit: {
				powerLevel: 1,
				api: function(a) {
					return a.exit()
				}
			}
		},
		report: {
			report2app: {
				powerLevel: 1,
				api: function(a) {
					return alloy.util.report2app(a.tag)
				}
			},
			apiCallCnt: {
				powerLevel: 1,
				api: function(a) {
					var b = a.cmd && "" !== a.cmd;
					return (a = b ? a.cmd : a.event) ? pgvSendClick({
						hottag: "web2qq." + (b ? "api" : "eventapi") + "." + a
					}) : !1
				}
			}
		},
		window: {
			getRunOption: {
				powerLevel: 1,
				api: function(a) {
					return (a = alloy.system.getApp(a.getAppId()).getRunOption()) ? f.json.stringify(a) : a
				}
			},
			min: {
				powerLevel: 1,
				api: function(a) {
					return a.min()
				}
			},
			max: {
				powerLevel: 1,
				api: function(a) {
					return a.max()
				}
			},
			restore: {
				powerLevel: 1,
				api: function(a, b) {
					return a.restore(b)
				}
			},
			fullScreen: {
				powerLevel: 1,
				api: function(a, b) {
					var c = a.max(b);
					g.notifyObservers(a, "fullScreen");
					return c
				}
			},
			setExitConfirm: {
				powerLevel: 1,
				api: function(a, b) {
					return alloy.system.getApp(a.getAppId()).setExitConfirm(b.msg)
				}
			},
			removeExitConfirm: {
				powerLevel: 1,
				api: function(a) {
					return alloy.system.getApp(a.getAppId()).removeExitConfirm()
				}
			},
			close: {
				powerLevel: 1,
				api: function(a, b) {
					return a.close(b)
				}
			},
			setCenter: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setWindowCentered(b)
				}
			},
			setCurrent: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setCurrent(b)
				}
			},
			setNotCurrent: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setNotCurrent(b)
				}
			},
			setWinSize: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setWinSize(b)
				}
			},
			setBodySize: {
				powerLevel: 1,
				api: function(a, b) {
					return isNaN(b.width) || isNaN(b.height) || b.width <= 0 || b.height <= 0 ? !1 : a.setBodySize(b)
				}
			},
			setBorderOpacity: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setBorderOpacity(b)
				}
			},
			setOpacity: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setOpacity(b)
				}
			},
			setXY: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setXY(b.x, b.y)
				}
			},
			getXY: {
				powerLevel: 1,
				api: function(a) {
					return a.getXY()
				}
			},
			getRestoreXY: {
				powerLevel: 1,
				api: function(a) {
					return a.getRestoreXY()
				}
			},
			setStyle: 1,
			setTitle: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setTitle(b.title)
				}
			},
			setButton: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setButton(b)
				}
			},
			setToolbar: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setToolbar(b.isShow)
				}
			},
			setToolbarButton: {
				powerLevel: 1,
				api: function(a, b) {
					return alloy.system.getApp(a.getAppId()).setToolBarButton(b)
				}
			},
			flashWindow: {
				powerLevel: 1,
				api: function(a, b) {
					g.notifyObservers(alloy.taskBar, "FlashTaskItem", {
						appId: b._appId,
						id: b._appId
					})
				}
			},
			startDrag: 1
		},
		widget: {
			getRunOption: {
				powerLevel: 1,
				api: function(a) {
					a = alloy.system.getApp(a.getAppId()).getRunOption();
					return f.json.stringify(a)
				}
			},
			min: {
				powerLevel: 1,
				api: function(a) {
					return a.min()
				}
			},
			restore: {
				powerLevel: 1,
				api: function(a, b) {
					return a.restore(b)
				}
			},
			setExitConfirm: {
				powerLevel: 1,
				api: function(a, b) {
					return alloy.system.getApp(a.getAppId()).setExitConfirm(b.msg)
				}
			},
			removeExitConfirm: {
				powerLevel: 1,
				api: function(a) {
					return alloy.system.getApp(a.getAppId()).removeExitConfirm()
				}
			},
			close: {
				powerLevel: 1,
				api: function(a, b) {
					return a.close(b)
				}
			},
			setCurrent: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setCurrent(b)
				}
			},
			setNotCurrent: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setNotCurrent(b)
				}
			},
			setOpacity: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setOpacity(b)
				}
			},
			setXY: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setXY(b.x, b.y)
				}
			},
			getXY: {
				powerLevel: 1,
				api: function(a) {
					return a.getXY()
				}
			},
			setWinSize: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setWinSize(b)
				}
			},
			setBodySize: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setBodySize(b)
				}
			},
			setButton: {
				powerLevel: 1,
				api: function(a, b) {
					return a.setButton(b)
				}
			},
			startDrag: 1
		},
		sound: {
			play: {
				powerLevel: 1,
				api: function(a) {
					a.isAuto = !0;
					return alloy.sound.playSound(a.url, a.isAuto)
				}
			},
			setMute: {
				powerLevel: 1,
				api: function(a) {
					return alloy.sound.setMute(a.flag)
				}
			},
			isMute: {
				powerLevel: 1,
				api: function() {
					return alloy.sound.isMute()
				}
			},
			setVolume: {
				powerLevel: 1,
				api: function(a) {
					return alloy.sound.setVol(a.volume)
				}
			},
			getVolume: {
				powerLevel: 1,
				api: function() {
					return alloy.sound.getVol()
				}
			}
		},
		qq: {
			isLogin: {
				powerLevel: 1,
				api: function() {
					return typeof EQQ == "undefined" ? !1 : EQQ && EQQ.getIsLogin() ? !0 : !1
				}
			}
		},
		video: {
			notify: {
				powerLevel: 3,
				api: function(a) {
					return EQQ ? EQQ.videoNotify(a) : null
				}
			}
		},
		account: {
			setSignature: {
				powerLevel: 1,
				api: function(a) {
					return alloy.rpcService.sendSetSignature(a.msg)
				}
			}
		},
		component: {
			inviteInstallAppByTips: 1,
			inviteInstallAppByC2C: 1,
			shareMsg: 1,
			shareMsgByC2C: 1,
			shareApp: {
				powerLevel: 1,
				api: function(a) {
					a.type = 2;
					a.onAccept = function() {
						a.seq && r(a.seq)
					};
					alloy.component.shareApp(a);
					return "asynchronous"
				}
			}
		},
		user: {
			getNick: {
				powerLevel: 1,
				api: function(a) {
					a = alloy.appconfig.getAppConfig(a._appId);
					return a.exinfo && a.exinfo.isAuth ? {
						nick: alloy.portal.self.nick
					} : {
						ret: 5
					}
				}
			},
			getAvatar: {
				powerLevel: 1,
				api: function(a) {
					var b = alloy.appconfig.getAppConfig(a._appId);
					return b.exinfo && b.exinfo.isAuth ? a.head ? {
						head: alloy.util.getUserAvatar(alloy.portal.self.uin, 1)
					} : {
						avatar: alloy.util.getUserAvatar(alloy.portal.self.uin, 1)
					} : {
						ret: 5
					}
				}
			},
			auth: {
				powerLevel: 1,
				api: function(a) {
					alloy.portal.runApp("appGrant", {
						appId: a._appId,
						callbackArguments: {
							loginParam: a.param,
							authType: 1,
							onSuccess: function(b) {
								var c = {},
									d = b.param || {};
								if (b.auth) {
									var e = ["app_id", "app_nonce", "app_lang", "app_userip", "app_ts", "sig"],
										g;
									for (g in e) {
										var h = e[g];
										f.isUndefined(d[h]) || (c[h] = d[h])
									}
								}
								b = {
									auth: b.auth,
									param: c
								};
								a.seq && r(a.seq, b)
							}
						}
					});
					return "asynchronous"
				}
			}
		}
	},
		m = {
			app: {
				openId: 1,
				message: 1,
				exit: 1,
				pushParam: 1,
				shareApp: 1
			},
			window: {
				min: 1,
				max: 1,
				restore: 1,
				fullScreen: 1,
				beforeClose: 1,
				close: 1,
				afterClose: 1,
				setCurrent: 1,
				setNotCurrent: 1,
				resize: 1,
				toolbarClick: 1,
				destroy: 1
			},
			widget: {
				min: 1,
				restore: 1,
				beforeClose: 1,
				close: 1,
				afterClose: 1,
				setCurrent: 1,
				setNotCurrent: 1,
				destroy: 1
			},
			system: {
				message: 1,
				loginSuccess: 1,
				exit: 1
			},
			layout: {
				clickDesktop: 1
			},
			messageSystem: {
				MessageReceive: 1
			}
		},
		n = function(a, b) {
			var c = !0,
				d, e, g = a.split("."),
				h = b;
			for (d = 0; d < g.length; d += 1) e = g[d], (h = h[e]) || (c = !1);
			if (c) return c = f.isObject(h) ? h.powerLevel : h
		},
		l = function(a, b) {
			var c = !0,
				d, e, g = a.split("."),
				h = b;
			for (d = 0; d < g.length; d += 1) e = g[d], (h = h[e]) || (c = !1);
			if (c) return f.isObject(h) ? c = h.api : !1
		},
		o = {},
		r = function(a, b) {
			var c = o[a],
				d = b && b.ret || 0;
			b && delete b.ret;
			c.seq && e.postMessage(c, {
				param: {
					ret: d,
					result: b
				},
				ret: d,
				result: b,
				seq: c.seq,
				cmd: c.cmd,
				origin: window.location.protocol + "//" + window.location.host,
				type: "callback"
			});
			delete o[a]
		},
		q = function(a, b) {
			var c, d;
			if (d = n(a, h)) {
				var e = alloy.system.getApp(b.appId);
				if (alloy.system.getAllConfig(b.appId).powerLevel >= d) {
					c = a.split(".");
					var g = c[0],
						j = c[1];
					b.param = b.param || {};
					if (b.seq) b.param.seq = b.seq, o[b.seq] = b;
					if (g == "app") e = alloy.system.getApp(b.appId), c = function(b) {
						var c;
						c = (c = l(a, h)) ? c(e, b.param) : e[j](b.param);
						c !== "asynchronous" && b.seq && r(b.seq, c)
					};
					else if (g == "window" || g == "widget") {
						var e = alloy.system.getApp(b.appId),
							k = e.getWindowList()[0];
						c = function(b) {
							if (k) {
								var c;
								c = (c = l(a, h)) ? c(k, b.param) : k[j](b.param);
								c !== "asynchronous" && b.seq && r(b.seq, c)
							}
						}
					} else c = function(b) {
						var c;
						c = (c = l(a, h)) ? c(b.param) : f.$namespace("alloy." + g)[j](b.param);
						c !== "asynchronous" && b.seq && r(b.seq, c)
					}
				}
				try {
					c(b)
				} catch (p) {
					f.debug("alloy.apiManager call exception: " + p.message)
				} finally {
					a !== "report.apiCallCnt" && h.report.apiCallCnt.api({
						cmd: a
					})
				}
			}
		},
		v = function() {
			var a = c[this.option.id] || {},
				b;
			for (b in a) if (a.hasOwnProperty(b)) {
				var d = a[b];
				g.removeObserver(d[0], d[1], d[2])
			}
			c[this.option.id] = {};
			g.removeObserver(this, "exit", v)
		},
		p = function(a, b) {
			var d = a,
				a = C[a] && C[a][0] || a,
				h, j = a.split("."),
				j = j[j.length - 1],
				k = a.split("." + j)[0];
			h = n(a, m);
			var l = b.appId,
				p = alloy.system.getApp(l),
				z = alloy.system.getAllConfig(l);
			if (h) if (z.powerLevel >= h) {
				h = function(a) {
					if (b.seq) {
						var c = {
							param: {
								ret: 0
							},
							ret: 0,
							seq: b.seq,
							cmd: b.cmd || b.event,
							origin: window.location.protocol + "//" + window.location.host,
							type: "event"
						},
							a = x[d] && x[d][1](a) || C[d] && C[d][1](a) || a;
						if (f.checkJSON(a)) c.result = a, c.param.result = a;
						e.postMessage(b, c)
					}
				};
				c[l] || (c[l] = {});
				try {
					if (k == "app") if (p = alloy.system.getApp(l), g.addObserver(p, j, h), c[l][b.seq] = [p, j, h], j == "pushParam") {
						var B = p.getRunOption();
						h({
							pushParam: B && B.pushParam || ""
						})
					} else {
						if (j == "openId") {
							var s = alloy.appconfig.getAppConfig(l);
							h({
								openId: s.userAuthToken.openID
							})
						}
					} else if (k == "window" || k == "widget") {
						var p = alloy.system.getApp(l),
							u = p.getWindowList()[0];
						u && (j == "message" ? (g.addObserver(p, j, h), c[l][b.seq] = [p, j, h]) : (g.addObserver(u, j, h), c[l][b.seq] = [u, j, h]))
					} else k = f.$namespace("alloy." + k), g.addObserver(k, j, h), c[l][b.seq] = [k, j, h];
					g.addObserver(p, "exit", v)
				} catch (o) {
					f.error("alloy.apiManager => addEventListener error!!!")
				}
			} else throw Error("\u6743\u9650\u4e0d\u591f\uff01\uff01\uff01");
		},
		s = function(a, b) {
			var a = C[a] && C[a][0] || a,
				d;
			d = a.split(".");
			a.split("." + d[d.length - 1]);
			d = n(a, m);
			var e = b.appId;
			alloy.system.getApp(e);
			var h = alloy.system.getAllConfig(e);
			if (d && h.powerLevel >= d) try {
				var j;
				if (j = (c[e] || 0)[b.seq]) g.removeObserver(j[0], j[1], j[2]), delete c[e][b.seq]
			} catch (k) {
				f.error("alloy.apiManager => removeEventListener error!!!")
			}
		},
		t = {},
		w = {
			weibo: "\u8be5\u5e94\u7528\u4f1a\u8c03\u7528\u60a8\u3010\u817e\u8baf\u5fae\u535a\u3011\u7684\u90e8\u5206\u6570\u636e\uff0c\u9700\u8981\u5f97\u5230\u60a8\u7684\u6388\u6743\uff01",
			about: "\u8be5\u5e94\u7528\u9700\u8981\u786e\u8ba4\u6743\u9650\uff01"
		},
		z = function(a) {
			var b = a.param,
				c = parseInt(b.appid),
				d;
			if (c && (d = alloy.system.getCacheOpenkey(c))) b.gaid = d.gaid, b.app_openid = d.openId, b.app_openkey = d.openKey;
			alloy.rpcService.cgiSend(a.url, {
				arguments: a,
				method: a.method || "GET",
				data: b,
				onSuccess: function(a) {
					var b = a.arguments;
					delete a.arguments;
					delete a.errmsg;
					b.seq && r(b.seq, a)
				}
			})
		};
	if (f.isUndefined(window.postMessage)) {
		var u = d.node("div", {
			id: "qqweb_cfproxys",
			"class": "hiddenIframe",
			style: "display:none"
		});
		document.body.appendChild(u)
	}
	var A = {
		MSGNAME: "crossframe:message",
		PROXY: "app.proxy.html"
	};
	this.removeCF = function(a) {
		a && window.setTimeout(function() {
			var b = a.parentNode;
			b.parentNode.removeChild(b);
			a = null
		}, 1E3)
	};
	this.postMessage = function(b, c) {
		f.info("postMessage start", "postMessage");
		if (!f.isUndefined(b) && !f.isUndefined(b.wid) && !f.isUndefined(b.host) && !f.isUndefined(c)) {
			var e = 'frames["' + b.wid + '"]',
				g = b.host,
				h = f.json.stringify(c),
				k = /top|parent|frames\[(?:(?:['"][a-zA-Z\d-_%\.]*['"])|\d+)\]/;
			if (h && k.test(e)) if (f.isUndefined(window.postMessage)) if (j) e = eval(e), a.PostMessageEx(h, e);
			else {
				if (!f.isUndefined(b.proxy)) if (k = function() {
					var a = ["target=" + encodeURIComponent(e), "host=" + encodeURIComponent(g)],
						a = "http://" + g + "/" + b.proxy + "#" + a.join("&"),
						c = d.node("div");
					c.innerHTML = '<iframe class="hiddenCFProxy" name="' + encodeURIComponent(h) + '" src="' + a + '" onload="alloy.apiManager.removeCF(this)"></iframe>';
					d.id("qqweb_cfproxys").appendChild(c);
					f.info("postMessage typeOf iframe finish", "postMessage")
				}, /qq\.com$/.test(g)) try {
					var l = eval(e);
					l.Jet().event.notifyObservers(l, A.MSGNAME, f.json.parse(h))
				} catch (p) {
					k()
				} else k()
			} else {
				if (e = eval(e)) g = g.indexOf("http://") != -1 ? g : "http://" + g, e.postMessage(h, g);
				f.info("postMessage typeOf post finish", "postMessage")
			}
		}
	};
	if (f.isUndefined(window.postMessage)) {
		if (j) a.onmessage = function(a) {
			f.info("onmessage", "activeXPostMsgNotifier");
			a = f.json.parse(a.data);
			f.event.notifyObservers(alloy, A.MSGNAME, a)
		}
	} else g.addEventListener(window, "message", function(a) {
		f.info("onmessage", "postMessage");
		if (f.browser.ie) a = window.event;
		var b = f.json.parse(a.data);
		a.source && f.event.notifyObservers(alloy, A.MSGNAME, b)
	});
	var H = {
		"window.setPageSize": [{
			cx: 1,
			cy: 1
		}, function(a, b) {
			D(b.param, {
				cx: "width",
				cy: "height"
			});
			q("window.setBodySize", b)
		}],
		"window.setWinPos": [{
			x: 1,
			y: 1
		}, function(a, b) {
			q("window.setXY", b)
		}],
		"window.setWinSize": [{
			cx: 1,
			cy: 1
		}, function(a, b) {
			D(b.param, {
				cx: "width",
				cy: "height"
			});
			q("window.setWinSize", b)
		}],
		"user.getHead": [null, function(a, b) {
			b.param = b.param || {};
			b.param.head = !0;
			q("user.getAvatar", b)
		}],
		"system.shareApp": [{
			msg: 1,
			title: 1,
			pic: 1,
			desc: 1,
			param: 1
		}, function(a, b) {
			q("component.shareApp", b)
		}]
	},
		F = {
			"window.setPageSize": [{
				width: 1,
				height: 1
			}, function(a, b) {
				q("window.setBodySize", b)
			}],
			"window.setPosition": [{
				x: 1,
				y: 1
			}, function(a, b) {
				D(b.param, {
					left: "x",
					top: "y"
				});
				q("window.setXY", b)
			}]
		},
		x = {
			"window.close": ["window.close", function() {
				return {}
			}]
		},
		C = {
			"system.qplusID": ["app.openId", function(a) {
				a.qplusID = a.openId;
				delete a.openId;
				return a
			}],
			"system.shareApp": ["app.shareApp", function(a) {
				return a
			}]
		},
		D = function(a, b) {
			for (var c in b) b.hasOwnProperty(c) && (a[b[c]] = a[c], delete a[c])
		},
		I = function(a, b, c) {
			var d;
			if (d = c[a]) {
				c = d[0];
				d = d[1];
				if (!c) return d(a, b), !0;
				for (var e in b.param) if (b.param.hasOwnProperty(e) && c.hasOwnProperty(e)) return d(a, b), !0
			}
			return !1
		},
		B = {
			ready: function(a) {
				var E;
				var y;
				var b = alloy.system.getApp(a.appId),
					c = alloy.portal.getAllConfig(a.appId);
				c.selfConfig.appUrl && (E = (y = (c = c.selfConfig.appUrl.split("?")[1]) ? c.split("app_openid=")[1] : void 0, c = y) ? c.split("&")[0] : void 0, c = E) && g.notifyObservers(b, "openId", {
					openId: c
				});
				e.postMessage(a, {
					type: "message",
					cmd: "ready",
					param: {
						ret: 0,
						result: {
							platform: "web"
						}
					}
				})
			}
		};
	g.addObserver(alloy, A.MSGNAME, function(a) {
		a.host = a.host || a.origin;
		delete a.origin;
		a.key = a.key || a.webqqkey;
		delete a.webqqkey;
		if (!a.seq) a.seq = a.cmd;
		if (a.key && a.type && a.cmd && a.host && alloy.app.appKeyMap) {
			var b = f.extend({}, a),
				c = alloy.app.appKeyMap[a.key],
				d = c.appId,
				c = c.wid;
			alloy.system.getAllConfig(d);
			alloy.system.getApp(d);
			b.appId = d;
			b.wid = c;
			b.proxy = b.proxy || A.PROXY;
			b.param = b.param || {};
			b.param._appId = b.appId;
			a.type == "method" ? (f.info("callMethod", "postMessage"), I(a.cmd, b, F) || I(a.cmd, b, H) || q(a.cmd, b)) : a.type == "event" ? a.cmd == "addEventListener" ? p(a.event, b) : a.cmd == "removeEventListener" && s(a.event, b) : a.type == "bind" ? p(a.cmd, b) : a.type == "unbind" ? s(a.cmd, b) : a.type == "message" && B[a.cmd] && B[a.cmd](b)
		}
	})
});
Jx().$package(alloy.app.msgBubble = new alloy.businessClass.App(alloy.portal.getSystemConfig("msgBubble")), function(f) {
	var e = f.dom,
		d = f.event,
		g = this,
		b = e.id("desktop"),
		c, a = !1,
		j = !1,
		k = {},
		h = {},
		m = !0,
		n = !0,
		l, o, r, q, v, p, s, t, w, z = '\t\t<div id="messageBubble_bubblePanel" class="bubblePanel" >\t\t\t<span id="messageBubble_bubblePanel_setting" class="icon setting" title="\u6d88\u606f\u7ba1\u7406\u5668"></span>\t\t\t<div id="messageBubble_bubblePanel_message" class="item"></div>\t\t</div>\t\t<div id="messageBubble_bubbleMsgList" class="bubbleMsgList" >\t\t\t<h3>\u672a\u8bfb\u6d88\u606f(<span id="messageBubble_bubbleMsgList_userCount" class="count">10</span>)</h3>\t\t\t<div class="bubbleMsgListInner">\t\t\t\t<div id="messageBubble_bubbleMsgListContainer" class="bubbleMsgListContainer">\t\t\t\t\t<ul id="messageBubble_bubbleMsgList_ul">\t\t\t\t\t</ul>\t\t\t\t</div>\t\t\t\t<div class="bubbleMsgButtons">\t\t\t\t\t<a href="#cancel" id="messageBubble_bubbleMsgList_cancelNotifyButton" class="cancelNotify">\u5ffd\u7565\u63d0\u9192</a>\t\t\t\t\t<a href="#viewall" id="messageBubble_bubbleMsgList_viewAll" class="viewAll">\u67e5\u770b\u5168\u90e8</a>\t\t\t\t</div>\t\t\t</div>' + (f.browser.ie ? '<iframe class="flash_mask_iframe" border="0"></iframe>' : "") + "</div>";
	f.browser.ie && (z += '<iframe class="flash_mask_iframe" border="0"></iframe>');
	var u = {
		stopPropagation: function(a) {
			a.stopPropagation()
		},
		onBubbleMove: function(a) {
			e.setClientXY(o, a.x, a.y)
		},
		onMouseOverBubble: function() {
			a || e.show(r)
		},
		onMouseOutBubble: function() {
			e.hide(r)
		},
		onBubbleStartMove: function() {
			a = !0;
			e.hide(r)
		},
		onBubbleEndMove: function(b) {
			a = !1;
			A(b.y);
			F(b)
		},
		onDesktopFocus: function() {
			if (typeof EQQ != "undefined" && EQQ.Presenter.ChatBox) {
				var a = EQQ.Presenter.ChatBox.getCurrent();
				a && a.isShow() && !n && EQQ.handleNotification(a.uin, a.chatBoxType)
			}
			n = !0
		},
		onDesktopBlur: function() {
			n = !1
		},
		onWindowResize: function() {
			H()
		},
		onBubblePanelMouseUp: function() {
			a && (j = !0)
		},
		onTouchStartBubble: function() {
			e.isShow(r) ? e.hide(r) : e.show(r)
		},
		onTouchEndBubble: function() {},
		onMessageReceive: function(a) {
			var b;
			b = a.type == "BuddyAdd" || a.type == "GroupJoin" ? !0 : n && a.body.extra.isChatBoxCurrent ? !1 : !0;
			if (b) {
				var c;
				b = {
					message: a
				};
				switch (a.type) {
				case "SingleChat":
					b.icon = "single";
					b.avatar = '<img class="avatar" src="' + alloy.util.getUserAvatar(a.body.uin) + '" alt="">';
					if (a.body.content == "\u5411\u60a8\u53d1\u8d77\u89c6\u9891\u9080\u8bf7\u3002") b.icon = "video";
					break;
				case "GroupChat":
					b.icon = "group";
					b.avatar = '<img class="avatar" src="' + alloy.util.getGroupAvatar(a.body.code) + '" alt="">';
					break;
				case "DiscuChat":
					b.icon = "group";
					b.avatar = '<img class="avatar" src="' + alloy.util.getDiscuAvatar(a.body.uin) + '" alt="">';
					break;
				case "BuddyAdd":
				case "GroupJoin":
					b.icon = "system";
					b.avatar = '<span class="avatar system" ></span>';
					break;
				case "PushMessage":
					b.icon = "pushmessage";
					b.avatar = '<img class="avatar" src="' + alloy.util.getAppRoot(a.body.appId) + 'images/small.png" alt="">';
					break;
				default:
					b = null
				}
				if (c = b) {
					var d = c.message,
						f = d.body,
						a = d.id;
					k[a] = c;
					C(c);
					b = e.node("li", {
						id: "messagebubble_msg_" + a,
						"class": "item"
					});
					b.nid = a;
					var j = D(f.content);
					b.innerHTML = '<a href="###"><span class="count">(' + (f.count > 99 ? '99<sup class="plus">+</sup>' : f.count) + ")</span>" + c.avatar + '<span class="content"><span class="contentInner">' + f.title + "\uff1a" + j + "</span></span></a>";
					/(SingleChat)|(GroupChat)|(DiscuChat)/.test(d.type) && (c = f.uin + f.type, h[c] && (d = e.id("messagebubble_msg_" + h[c])) && d.parentNode.removeChild(d), h[c] = a);
					s.firstChild ? s.insertBefore(b, s.firstChild) : s.appendChild(b);
					p.innerHTML = s.children.length;
					g.show()
				}
			}
		},
		onMessageHandled: function(a) {
			var a = a.id,
				b = e.id("messagebubble_msg_" + a);
			b && b.parentNode.removeChild(b);
			k[a] = null;
			delete k[a];
			b = s.children.length;
			p.innerHTML = b;
			b > 0 ? a == v.nid && (a = k[s.children[0].nid]) && C(a) : g.hide()
		},
		onBubbleNotifyMessageClick: function(a) {
			a.preventDefault();
			j ? j = !1 : x(this.nid)
		},
		onBubbleSettingBtnClick: function() {
			alloy.portal.runApp("messageManager", {});
			alloy.util.report2im("msgbubble|messagemanager")
		},
		onBubleCancelBtnClick: function(a) {
			a.preventDefault();
			I();
			g.hide();
			window.webTop && webTop.ui.notification.cancel();
			alloy.util.report2im("msgbubble|rejectalert")
		},
		onBubbleViewAllBtnClick: function(a) {
			a.preventDefault();
			for (var b in k) alloy.messageSystem.handleNotification(b);
			alloy.util.report2im("msgbubble|viewallmsg")
		},
		onBubbleListUlClick: function(a) {
			a.preventDefault();
			a = a.target;
			if (a.tagName.toLowerCase() != "ul") {
				for (; a.tagName.toLowerCase() != "li";) a = a.parentNode;
				x(a.nid)
			}
		}
	},
		A = function(a) {
			var a = a || e.getClientXY(l)[1],
				b = e.getHeight(r);
			a < b + 0 ? (a = e.getHeight(l), e.setStyle(r, "top", a + "px")) : e.setStyle(r, "top", "-" + b + "px")
		},
		H = function() {
			var a = alloy.config.configList.msgBubblePos,
				b, c = alloy.layout.getDesktopWidth(),
				d = alloy.layout.getDesktopHeight(),
				g = e.getWidth(l),
				h = e.getHeight(l);
			!f.isUndefined(a) && a.length == 2 ? (b = a[1], a = a[0], b > d - h - 30 && (b = d - h - 30), a > c - g && (a = c - g)) : (b = d - h - 35, a = c / 2 - g / 2);
			e.setStyle(l, "left", a + "px");
			e.setStyle(l, "top", b + "px");
			A(b)
		},
		F = function(a) {
			var a = a || [0, 0],
				b = a.x || 0,
				a = a.y || 0;
			alloy.config.configList.msgBubblePos = [b, a];
			alloy.rpcService.sendSetConfig({
				context: this,
				data: {
					retype: 1,
					r: {
						appid: 0,
						value: {
							msgBubblePos: [b, a]
						}
					}
				}
			})
		},
		x = function(a) {
			var b = k[a];
			if (b) alloy.messageSystem.handleNotification(a), a = b.message.type, a == "SingleChat" ? alloy.util.report2im("msgbubble|viewc2cmsg") : a == "GroupChat" ? alloy.util.report2im("msgbubble|viewgroupmsg") : a == "DiscuChat" && alloy.util.report2im("msgbubble|viewdisupmsg")
		},
		C = function(a) {
			var b = a.message.body,
				c = D(b.content);
			v.innerHTML = '<span class="icon ' + a.icon + '"></span><span class="body"><span class="content"><span class="nick">' + b.title + "</span>\uff1a" + c + '</span></span><span class="count">(' + (b.count > 99 ? '99<sup class="plus">+</sup>' : b.count) + ")</span>";
			v.nid = a.message.id
		},
		D = function(a) {
			a = a.replace(/<img.*?\/?>/ig, function() {
				return "\u3010\u56fe\u7247\u3011"
			});
			return a = a.replace(/<br\/>/ig, "\u3000").replace(/<([^>]+).*?>/ig, "")
		},
		I = function() {
			s.innerHTML = "";
			p.innerHTML = "0";
			v.innerHTML = "";
			h = {};
			k = {}
		};
	this.show = function() {
		m && (m = !1, H());
		e.show(l);
		this._isShow = !0
	};
	this.hide = function() {
		e.hide(r);
		e.hide(l);
		this._isShow = !1
	};
	this.isShow = function() {
		return this._isShow
	};
	this.cancelNotify = function() {
		I();
		g.hide()
	};
	this.reset = function() {
		this.hide();
		s.innerHTML = ""
	};
	d.addObserver(this, "runFirst", function() {
		l = e.node("div", {
			id: "qqweb_app_messageBubble",
			"class": "bubbleContainer"
		});
		l.innerHTML = z;
		e.setStyle(l, "zIndex", alloy.layout.getTopZIndex(2));
		b.appendChild(l);
		e.id("messageBubble_bubbleMsgListContainer");
		r = e.id("messageBubble_bubbleMsgList");
		o = e.id("messageBubble_bubblePanel");
		q = e.id("messageBubble_bubblePanel_setting");
		v = e.id("messageBubble_bubblePanel_message");
		p = e.id("messageBubble_bubbleMsgList_userCount");
		s = e.id("messageBubble_bubbleMsgList_ul");
		t = e.id("messageBubble_bubbleMsgList_cancelNotifyButton");
		w = e.id("messageBubble_bubbleMsgList_viewAll");
		h = {};
		k = {};
		c = new f.ui.Drag(l, l, {
			isLimited: !0,
			topMargin: 0,
			bottomMargin: 30
		});
		f.platform.iPad ? (d.on(r, "touchstart", u.stopPropagation), d.on(document, "touchstart", u.onMouseOutBubble), d.on(l, "touchstart", u.onTouchStartBubble)) : (d.on(r, "mousedown", u.stopPropagation), d.on(o, "mouseup", u.onBubblePanelMouseUp), d.on(l, "mouseenter", u.onMouseOverBubble), d.on(l, "mouseleave", u.onMouseOutBubble), d.on(v, "click", u.onBubbleNotifyMessageClick));
		d.on(q, "click", u.onBubbleSettingBtnClick);
		d.on(t, "click", u.onBubleCancelBtnClick);
		d.on(w, "click", u.onBubbleViewAllBtnClick);
		d.on(s, "click", u.onBubbleListUlClick);
		d.on(window, "resize", u.onWindowResize);
		d.addObserver(c, "move", u.onBubbleMove);
		d.addObserver(c, "start", u.onBubbleStartMove);
		d.addObserver(c, "end", u.onBubbleEndMove);
		d.addObserver(alloy.layout, "desktopFocus", u.onDesktopFocus);
		d.addObserver(alloy.layout, "desktopBlur", u.onDesktopBlur);
		alloy.notifier.register("msgBubble", u.onMessageReceive, u.onMessageHandled)
	});
	d.addObserver(this, "run", function() {})
});
Jx().$package(alloy.app.messageManager = new alloy.businessClass.App(alloy.portal.getSystemConfig("messageManager")), function(f) {
	var e = f.dom,
		d = f.event,
		g = f.string,
		b = this,
		c, a = {},
		j = !0,
		k = !1,
		h = [],
		m, n, l = {
			stopPropagation: function(a) {
				a.stopPropagation()
			},
			onMessageReceive: function(a) {
				var b = q(a);
				b && (m && m.isShow() && v(b), o(a.id, b))
			},
			onRemoveSource: function(b) {
				b == 50 && (h = [], a = {}, m && m.close())
			},
			onMsgboxBodyClick: function(a) {
				var b = alloy.util.getActionTarget(a, 4, "cmd", c);
				b && b.getAttribute("cmd") == "msg" && l.onMsgLiClick.apply(b, [a])
			},
			onMsgAreaOptionBtnClick: function(a) {
				a.preventDefault();
				a = this.target;
				e.hasClass(this.previousSibling, "showall") ? s(n[a]) : p(n[a])
			},
			onMessageButtonClick: function(a) {
				a.preventDefault();
				for (var b in n) this === n[b].btn ? p(n[b]) : n[b] && s(n[b])
			},
			onMsgLiClick: function(a) {
				a.preventDefault();
				a = this.getAttribute("nid");
				a: {
					for (var b = h.length - 1; b >= 0; b--) if (h[b].message.id == a) {
						a = h[b].message;
						break a
					}
					a = null
				}
				if (a) switch (b = a.body, a.type) {
				case "SingleChat":
					alloy.portal.runApp("chatLogViewer", b.uin);
					alloy.util.report2im("qqpanel|contacts|msgmgr|buddy");
					break;
				case "GroupChat":
					alloy.portal.runApp("chatLogViewer", {
						gid: b.uin,
						gcode: b.code,
						from: "group"
					});
					alloy.util.report2im("qqpanel|contacts|msgmgr|qun");
					break;
				case "BuddyAdd":
					alloy.portal.runApp("buddyAdder", b.extra);
					alloy.util.report2im("qqpanel|contacts|msgmgr|sys");
					break;
				case "GroupJoin":
					alloy.portal.runApp("groupSystemMsg", b.extra), alloy.util.report2im("qqpanel|contacts|msgmgr|sys")
				}
			},
			onWindowClose: function() {
				for (var b in n) d.off(n[b].msgAreaBtnTrigger, "click"), d.off(n[b].btn, "click");
				m = null;
				a = {}
			},
			onUinChange: function() {
				h = [];
				a = {}
			}
		},
		o = function(a, b) {
			if (b.type == "group" || b.type == "single") for (var c = 0; c < h.length; ++c) {
				var d = h[c].message,
					e = b.message;
				if (d.type == e.type && d.body.uin == e.body.uin) if (d.body.time > e.body.time) return;
				else {
					h.splice(c, 1);
					break
				}
			}
			h.push(b)
		},
		r = function() {
			for (var a = 0; a < h.length; ++a) v(h[a])
		},
		q = function(a) {
			var b = {
				message: a
			};
			switch (a.type) {
			case "SingleChat":
				!f.isUndefined(a.body.extra) && a.body.extra.attachType == "file" ? b = null : (b.avatar = '<img src="' + alloy.util.getUserAvatar(a.body.uin) + '" alt="">', b.type = a.body.type);
				break;
			case "GroupChat":
				b.avatar = '<img src="' + alloy.util.getGroupAvatar(a.body.code) + '" alt="">';
				b.type = a.body.type;
				break;
			case "BuddyAdd":
			case "GroupJoin":
				b.avatar = '<span class="icon system" ></span>';
				b.type = "system";
				break;
			default:
				b = null
			}
			return b
		},
		v = function(b, c) {
			var d = b.message,
				h = d.body,
				d = d.id;
			if (/(single)|(group)|(discu)/.test(b.type)) {
				var j = h.uin + h.type;
				if (a[j]) {
					var k = e.id("messagemmg_msg_" + a[j]);
					if (k) {
						if (c) return;
						k.parentNode.removeChild(k)
					}
				}
				a[j] = d
			}
			j = "messagemmg_msg_" + d;
			d = e.id(j) || e.node("li", {
				id: j,
				"class": "message",
				cmd: "msg",
				nid: d
			});
			d.innerHTML = '            <div class="time">' + g.encodeHtml(h.time) + '</div>            <div class="from"><a href="###">' + b.avatar + '</a>                <span class="name"><a href="###">' + h.title + '</a></span>            </div>            <div class="msgbody">                <div class="msgcontent_container"><a class="msgcontent" href="###">' + f.string.encodeHtml(h.content) + "</a></div>            </div>";
			h = n[b.type];
			j = h.msgUl;
			j.firstChild ? j.insertBefore(d, j.firstChild) : j.appendChild(d);
			e.hide(h.noMsgTip);
			e.show(j);
			for (var l in n) h = n[l], d = h.msgUl.children.length, h.count.innerHTML = "" + d, h.count2.innerHTML = "" + d
		},
		p = function(a) {
			e.hasClass(a.msgAreaBtn, "hideall") && e.removeClass(a.msgAreaBtn, "hideall");
			e.addClass(a.msgAreaBtn, "showall");
			a.msgAreaBtn.nextSibling.title = "\u6536\u8d77";
			e.show(a.msgArea)
		},
		s = function(a) {
			e.hasClass(a.msgAreaBtn, "showall") && e.removeClass(a.msgAreaBtn, "showall");
			e.addClass(a.msgAreaBtn, "hideall");
			a.msgAreaBtn.nextSibling.title = "\u5c55\u5f00";
			e.hide(a.msgArea)
		},
		t = function(a) {
			if (Object.prototype.toString.call(a) == "[object Array]") {
				for (var b = [], c = 0; c < a.length; c++) {
					var d = a[c];
					if (Object.prototype.toString.call(d) != "[object Array]") b.push(d);
					else switch (d[0]) {
					case "face":
						b.push('<img align="absmiddle" src=' + EQQ.CONST.SYSTEM_FACE_URL + EQQ.CONST.T_TRANSFER_TABLE[d[1]] + ".gif>");
						break;
					case "cface":
						b.push('<img align="absmiddle" src=' + CDN_URL_0 + "image_icon.png?t=20111011001")
					}
				}
				b = b.join("")
			} else b = String(a);
			return b
		},
		w = function(a) {
			var b = a.result.gil,
				a = a.result.c;
			if (!f.isUndefined(b)) for (var c = b.length - 1; c >= 0; --c) {
				var d = b[c].cl[0],
					e = {
						from: "",
						to: "",
						type: "GroupChat",
						id: 1E5 + d.id,
						body: {
							time: f.date.format(new Date(d.t * 1E3), "YYYY-MM-DD hh:mm:ss"),
							t: d.t,
							type: "group",
							code: d.g,
							body: "\u964c\u751f\u7fa4",
							uin: d.g,
							content: t(d.il[0].v)
						}
					};
				WebqCore.api.call(["getGroupByCode", [d.g, function(a) {
					if (a) e.body.title = a.htmlShowName, e.body.uin = a.gid
				}]]);
				d = q(e);
				o(e.id, d)
			}
			if (!f.isUndefined(a)) for (c = a.length - 1; c >= 0; --c) d = a[c], e = {
				from: "",
				to: "",
				type: "SingleChat",
				id: 1E5 + d.seq,
				uin: d.tuin,
				body: {
					title: d.tuin,
					time: f.date.format(new Date(d.time * 1E3), "YYYY-MM-DD hh:mm:ss"),
					t: d.time,
					type: "single",
					uin: d.tuin,
					content: t(d.msg)
				}
			}, WebqCore.api.call(["getUserByUin", [d.tuin, function(a) {
				if (a) e.body.title = a.htmlShowName
			}]]), d = q(e), o(e.id, d);
			h.sort(function(a, b) {
				return a.message.body.t - b.message.body.t
			});
			r();
			m.setCurrent()
		};
	d.addObserver(this, "run", function() {
		if (j) j = !1, alloy.notifier.register("messageManager", l.onMessageReceive), d.addObserver(alloy.messageSystem, "MessageSourceRemove", l.onRemoveSource), d.addObserver(alloy.portal, "reset", l.onUinChange);
		else {
			if (!m) {
				var a = f.clone(b.option);
				f.extend(a, {
					hasMinButton: !1,
					hasToolBar: 0,
					noFullButton: !0
				});
				m = alloy.windowFactory.createWindow("EqqWindow", a);
				m.setHtml('<div class="message_content_area"><div id="messageManager_qqweb_app_messageBox" class="message_manager">    <div class="messmenu clearfix">        <ul>            <li ><span class="icon single"></span><a id="messageManager_msgboxFriendBtn" target="msgboxFriendArea" href="#">\u597d\u53cb(<span  id="messageManager_msgboxFriendCount">0</span>)</a></li>            <li ><span class="icon group"></span><a id="messageManager_msgboxGroupBtn"  target="msgboxGroupArea"  href="#">\u7fa4(<span id="messageManager_msgboxGroupCount">0</span>)</a></li>            <li ><span class="icon system"></span><a id="messageManager_msgboxSystemBtn"  target="msgboxSystemArea"  href="#">\u7cfb\u7edf\u6d88\u606f(<span id="messageManager_msgboxSystemCount">0</span>)</a></li>        </ul>    </div>    <div class="messdetail">        <div class="border">            <div class="infos clearfix">                <div class="title" >                    <strong>\u597d\u53cb(<span id="messageManager_msgboxFriendCount2">0</span>)</strong>                </div>                <div class="options">                    <span class="showall button" ></span><a href="#" id="messageManager_msgboxFriendAreaBtn" target="single" class="linkButton"  title="\u6536\u8d77"></a>                </div>            </div>            <div id="messageManager_msgboxFriendArea" class="messageArea">                <div class="weakTips">\u60a8\u76ee\u524d\u8fd8\u6ca1\u6709\u597d\u53cb\u7559\u8a00</div>                <ul class="clearfix"></ul>            </div>        </div>        <div class="border">            <div class="infos clearfix">                <div class="title">                    <strong>\u7fa4(<span id="messageManager_msgboxGroupCount2">0</span>)</strong>                </div>                <div class="options">                        <span class="showall button" ></span><a href="#" id="messageManager_msgboxGroupAreaBtn" target="group" class="linkButton" title="\u6536\u8d77"></a>                </div>            </div>            <div id="messageManager_msgboxGroupArea" class="messageArea">                <div  class="weakTips">\u60a8\u76ee\u524d\u8fd8\u6ca1\u6709\u7fa4\u7559\u8a00</div>                 <ul class="clearfix"></ul>            </div>        </div>        <div class="border">            <div class="infos clearfix">                <div class="title">                    <strong>\u7cfb\u7edf\u6d88\u606f(<span id="messageManager_msgboxSystemCount2">0</span>)</strong>                </div>                <div class="options">                        <span class="showall button" ></span><a href="#" id="messageManager_msgboxSystemAreaBtn" target="system"  class="linkButton"  title="\u6536\u8d77"></a>                </div>            </div>            <div id="messageManager_msgboxSystemArea" class="messageArea">                <div  class="weakTips">\u60a8\u76ee\u524d\u8fd8\u6ca1\u6709\u7cfb\u7edf\u6d88\u606f</div>                <ul class="clearfix"></ul>            </div>        </div>    </div></div></div>');
				f.browser.moblieSafari && new f.ui.TouchScroller(m.body.firstChild);
				c = e.id("messageManager_qqweb_app_messageBox");
				var a = e.id("messageManager_msgboxFriendBtn"),
					g = e.id("messageManager_msgboxGroupBtn"),
					h = e.id("messageManager_msgboxSystemBtn"),
					p = e.id("messageManager_msgboxFriendCount"),
					s = e.id("messageManager_msgboxFriendCount2"),
					o = e.id("messageManager_msgboxGroupCount"),
					t = e.id("messageManager_msgboxGroupCount2"),
					q = e.id("messageManager_msgboxSystemCount"),
					v = e.id("messageManager_msgboxSystemCount2"),
					B = e.id("messageManager_msgboxFriendAreaBtn"),
					J = e.id("messageManager_msgboxGroupAreaBtn"),
					E = e.id("messageManager_msgboxSystemAreaBtn"),
					y = e.id("messageManager_msgboxFriendArea"),
					G = e.id("messageManager_msgboxGroupArea"),
					K = e.id("messageManager_msgboxSystemArea");
				n = {
					single: {
						btn: a,
						count: p,
						count2: s,
						msgAreaBtn: B.previousSibling,
						msgAreaBtnTrigger: B,
						msgArea: y,
						noMsgTip: y.getElementsByTagName("div")[0],
						msgUl: y.getElementsByTagName("ul")[0]
					},
					group: {
						btn: g,
						count: o,
						count2: t,
						msgAreaBtn: J.previousSibling,
						msgAreaBtnTrigger: J,
						msgArea: G,
						noMsgTip: G.getElementsByTagName("div")[0],
						msgUl: G.getElementsByTagName("ul")[0]
					},
					system: {
						btn: h,
						count: q,
						count2: v,
						msgAreaBtn: E.previousSibling,
						msgAreaBtnTrigger: E,
						msgArea: K,
						noMsgTip: K.getElementsByTagName("div")[0],
						msgUl: K.getElementsByTagName("ul")[0]
					}
				};
				d.on(c, "click", l.onMsgboxBodyClick);
				d.on(B, "click", l.onMsgAreaOptionBtnClick);
				d.on(J, "click", l.onMsgAreaOptionBtnClick);
				d.on(E, "click", l.onMsgAreaOptionBtnClick);
				d.on(a, "click", l.onMessageButtonClick);
				d.on(g, "click", l.onMessageButtonClick);
				d.on(h, "click", l.onMessageButtonClick);
				d.addObserver(m, "close", l.onWindowClose);
				r()
			}
			k || (alloy.rpcService.sendGetRecentChat({
				onSuccess: w
			}), k = !0);
			m.setCurrent()
		}
	})
});
Jet().$package("alloy.businessClass", function(f) {
	var e = f.dom;
	this.Tips = new f.Class({
		init: function(d) {
			d = d || {};
			d.id || (new Date).getTime();
			var g;
			this._centerEl = d.centerEl || document.body;
			this._delayTime = d.delayTime || 3E3;
			this._tipTimeout = null;
			if (!g) {
				var d = e.node("div", {
					"class": "app_toolbar_tipouter"
				}),
					b = e.node("div", {
						"class": "app_toolbar_icon"
					}),
					c = e.node("div", {
						"class": "app_toolbar_text"
					});
				d.appendChild(b);
				d.appendChild(c);
				alloy.layout.getDesktop().body.appendChild(d);
				g = new f.ui.Panel({
					id: "app_toolbar_tip",
					name: "app_toolbar_tip",
					container: d
				});
				g.outerEl = d;
				g.iconEl = b;
				g.textEl = c
			}
			this._tipPanel = g
		},
		setPanelCenter: function(d) {
			var f = this._tipPanel,
				b = f.getSize(),
				c = e.getXY(d),
				a = c[0],
				c = c[1],
				j = e.getClientWidth(d),
				d = e.getClientHeight(d);
			f.setXY(a + (j - b.width) / 2, c + (d - b.height) / 2)
		},
		setZIndex: function(d) {
			this._tipPanel.setZIndex(d)
		},
		show: function(d, f, b, c) {
			var c = c || this._centerEl,
				b = b || this._delayTime,
				a, j = this._tipPanel;
			e.setClass(j.iconEl, "app_toolbar_icon app_toolbar_icon_" + f);
			j.textEl.innerHTML = d;
			a && clearTimeout(a);
			var k = this;
			a = this._tipTimeout = setTimeout(function() {
				k.hide.call(k)
			}, b);
			j.show();
			this.setPanelCenter(c)
		},
		hide: function() {
			this._tipTimeout = null;
			this._tipPanel.hide()
		}
	})
});
Jx().$package("alloy.localStorage", function(f) {
	var e = f.dom,
		d, g, b = "_top",
		c;
	this.init = function() {
		if (!g) {
			a: {
				try {
					if ("localStorage" in window && window.localStorage !== null) {
						g = "localStorage";
						break a
					}
				} catch (a) {}
				g = f.browser.ie ? "userData" : f.browser.plugins.flash ? "flash" : "none"
			}
			switch (g) {
			case "localStorage":
				this.initStorage = function(a) {
					b = a || "_top"
				};
				this.save = function(a, c) {
					localStorage[b + "." + a] = c
				};
				this.read = function(a) {
					return localStorage[b + "." + a]
				};
				this.del = function(a) {
					localStorage[b + "." + a] = null
				};
				this.clear = function() {
					for (var a = b + ".", c = 0, d = localStorage.length; c < d; ++c) {
						var e = localStorage.key(c);
						e.indexOf(a) == 0 && (localStorage[e] = "")
					}
				};
				this.flush = function() {
					return !0
				};
				break;
			case "userData":
				e.id("localStorage") || (c = e.node("div", {
					id: "storage"
				}), document.body.appendChild(c), c.addBehavior("#default#userdata"));
				this.initStorage = function(a) {
					b = a
				};
				this.save = function(a, d) {
					try {
						c.load(b), c.expires = (new Date(+new Date + 6048E5)).toGMTString(), c.setAttribute(a, d), c.save(b)
					} catch (e) {}
				};
				this.read = function(a) {
					try {
						return c.load(b), c.getAttribute(a)
					} catch (d) {
						return f.error(d.message), null
					}
				};
				this.del = function(a) {
					try {
						c.load(b), c.removeAttribute(a), c.save(b)
					} catch (d) {}
				};
				this.clear = function() {
					try {
						c.load(b), c.expires = (new Date(+new Date - 36E5)).toGMTString(), c.save(b)
					} catch (a) {}
				};
				this.flush = function() {
					return !0
				};
				break;
			case "flash":
				if (!e.id("localStorage")) c = e.node("div", {
					id: "storage"
				}), c.innerHTML = '<object style="position:absolute;left:1px;top:1px;width:1px;height:1px;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9.0.45.0" width="1" height="1" id="sharedObject" align="middle">\t\t\t\t\t\t<param name="allowScriptAccess" value="always" />\t\t\t\t\t\t<param name="allowFullScreen" value="false" />\t\t\t\t\t\t<param name="movie" value="swf/sharedobject.swf" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="bgcolor" /><embed src="swf/sharedobject.swf" quality="high" wmode="opaque" width="1" height="1" name="sharedObject" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />\t\t\t\t\t\t</object>', document.body.appendChild(c), d = f.browser.ie ? e.id("sharedObject") || window.sharedObject : document.sharedObject;
				this.initStorage = function(a) {
					d.init(a)
				};
				this.save = function(a, b) {
					d.save(a, b)
				};
				this.read = function(a) {
					return d.read(a)
				};
				this.del = function(a) {
					d.del(a)
				};
				this.clear = function() {
					d.clear()
				};
				this.flush = function() {
					return d.flush()
				};
				break;
			default:
			case "none":
				window.remStorage = {}, this.initStorage = function(a) {
					b = a || "_top";
					remStorage[b] = remStorage[b] || {}
				}, this.save = function(a, c) {
					remStorage[b][a] = c
				}, this.read = function(a) {
					return remStorage[b][a]
				}, this.del = function(a) {
					remStorage[b][a] = null
				}, this.clear = function() {
					remStorage[b] = {}
				}, this.flush = function() {
					return !0
				}
			}
		}
	};
	this.getStorageMode = function() {
		return g
	}
});
Jx().$package("alloy.qplus", function(f) {
	var e = f.event,
		d = this,
		g = !1,
		b = [],
		c, a = 0,
		j = {},
		k, h, m = {
			NONE: 0,
			APP: 1,
			SHARE: 2,
			SYS: 4
		},
		n = {
			sendGetOfflineMessage: function(b) {
				b = {
					msg_type: 0,
					next_msgid: b,
					vfwebqq: alloy.portal.getVfWebQQ(),
					connProxy_ip: k,
					connProxy_port: h
				};
				alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/top/get_share", {
					context: d,
					method: "GET",
					data: b,
					onSuccess: function(b) {
						var c, g, h, j, k, l, p;
						if (b.retcode == 0) {
							if (c = b.result.push_msg) {
								h = 0;
								for (k = c.length; h < k; h++) {
									g = c[h].app_msg;
									p = c[h].wqqappid;
									j = 0;
									for (l = c[h].app_msg_num; j < l; j++) r(g[j], p)
								}
								b.result.next_msgid ? n.sendGetOfflineMessage(b.result.next_msgid) : a && (o(), e.notifyObservers(d, "messageUpdate", a))
							}
						} else f.profile("\u62c9\u53d6\u5206\u4eab\u5931\u8d25")
					},
					onError: function() {
						f.profile("\u62c9\u53d6\u5206\u4eab\u5931\u8d25")
					}
				})
			},
			sendMarkShare: function(a) {
				a.vfwebqq = alloy.portal.getVfWebQQ();
				a.connProxy_ip = k;
				a.connProxy_port = h;
				alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/top/mark_share", {
					context: d,
					method: "POST",
					data: a,
					onSuccess: function(a) {
						a.retcode == 0 ? f.profile("\u6807\u8bb0\u5206\u4eab\u5df2\u8bfb\u6210\u529f") : f.profile("\u6807\u8bb0\u5206\u4eab\u5df2\u8bfb\u5931\u8d25")
					},
					onError: function() {
						f.profile("\u6807\u8bb0\u5206\u4eab\u5df2\u8bfb\u5931\u8d25")
					}
				})
			},
			sendShare: function(a) {
				var b = a.onAccept;
				delete a.onAccept;
				var c = a.onCancel;
				delete a.onCancel;
				a.vfwebqq = alloy.portal.getVfWebQQ();
				a.connProxy_ip = k;
				a.connProxy_port = h;
				var e = new alloy.businessClass.Tips;
				alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/top/send_share", {
					context: d,
					method: "POST",
					data: a,
					onSuccess: function(a) {
						a.retcode == 0 ? (e.show("\u5206\u4eab\u6210\u529f", "success"), b && b()) : (e.show("\u5206\u4eab\u5931\u8d25", "error"), c && c())
					},
					onError: function() {
						e.show("\u5206\u4eab\u5931\u8d25", "error");
						c && c()
					}
				})
			},
			sendQplusLogin: function() {
				var a = {
					vfwebqq: alloy.portal.getVfWebQQ()
				};
				alloy.rpcService.cgiSend(alloy.CONST.JAVA_CGI_URL + "cgi/top/qpluslogin", {
					context: d,
					method: "GET",
					data: a,
					onSuccess: function(a) {
						if (a.retcode === 0) k = a.result.connProxy_ip, h = a.result.connProxy_port, d.setOnline()
					}
				})
			}
		},
		l = {
			onQplusMessageHandled: function(b) {
				if (c) {
					b = b.flag;
					if (!(a & b)) return !1;
					a &= ~b;
					alloy.localStorage.save("updateFlag", String(a));
					alloy.localStorage.flush();
					if (b & m.SHARE) {
						for (var b = Number.POSITIVE_INFINITY, d = Number.NEGATIVE_INFINITY, e = 0, f; f = c[e]; e++) b = Math.min(b, f.time), d = Math.max(d, f.time);
						n.sendMarkShare({
							msg_type: 2,
							start_time: b,
							end_time: d
						})
					}
				}
			},
			onAppRun: function(a) {
				if (!isNaN(a) && b) for (var c = 0, d; d = b[c]; c++) if (d.appId == a) {
					b[c].number = 0;
					b[c].count = 0;
					alloy.localStorage.save("appList", f.json.stringify(b));
					alloy.localStorage.flush();
					break
				}
			}
		},
		o = function() {
			b.length > 50 && (b = b.slice(0, 50));
			c.length > 50 && (c = c.slice(0, 50));
			alloy.localStorage.clear();
			alloy.localStorage.save("updateFlag", String(a));
			alloy.localStorage.save("appList", f.json.stringify(b));
			alloy.localStorage.save("shareList", f.json.stringify(c));
			alloy.localStorage.flush()
		},
		r = function(b, d) {
			var e = String(b.push_time) + String(b.msgid);
			if (j[e]) return m.NONE;
			if (b.msg_type == 2) {
				var f = b.json_msg;
				if (!d) return m.NONE;
				c.unshift({
					id: e,
					uin: f.FUIN,
					nick: f.NICK,
					appId: d,
					msg: f.MSG,
					title: f.TITLE,
					pic: f.PICURL,
					desc: f.APPDESC,
					param: f.APPCUSTOMIZE,
					time: b.push_time,
					type: f.SHARETYPE
				});
				j[e] = !0;
				a |= m.SHARE;
				return m.SHARE
			}
			return m.NONE
		},
		q = function() {
			var a = 0;
			return function() {
				return String(+new Date) + a++
			}
		}(),
		v = function(c) {
			for (var d = c.appId, e, f = -1, g = 0; e = b[g]; g++) if (e.appId == d) {
				f = g;
				break
			}
			e = e || {
				appId: d,
				id: q()
			};
			if ("number" in c) {
				if ("number" in e && e.number == c.number) return m.NONE;
				e.number = c.number
			} else if ("msg" in c) {
				for (var d = e.ext || [], h = e.count || 0, g = 0, j; j = d[g]; g++) if (j.text == c.msg) return m.NONE;
				d.unshift({
					text: c.msg,
					time: c.time
				});
				h++;
				d.length > 3 && d.splice(3, d.length - 3, {});
				e.ext = d;
				e.count = h
			} else return m.NONE;
			f > -1 && b.splice(f, 1);
			b.unshift(e);
			a |= m.APP;
			return m.APP
		};
	this.login = function() {
		if (!g) {
			alloy.localStorage.initStorage(alloy.system.getUin());
			a = Number(alloy.localStorage.read("updateFlag") || 0);
			try {
				b = f.json.parse(alloy.localStorage.read("appList")), f.isArray(b) || (b = [], a &= ~m.APP)
			} catch (d) {
				b = [], a &= ~m.APP
			}
			try {
				c = f.json.parse(alloy.localStorage.read("shareList")), f.isArray(c) || (c = [], a &= ~m.SHARE)
			} catch (e) {
				c = [], a &= ~m.SHARE
			}
			for (var h = 0, k = b.length; h < k; h++) b[h] && b[h].id && (j[b[h].id] = !0);
			h = 0;
			for (k = c.length; h < k; h++) c[h] && c[h].id && (j[c[h].id] = !0);
			n.sendQplusLogin()
		}
	};
	this.setOnline = function() {
		g = !0;
		e.addObserver(d, "messageHandled", l.onQplusMessageHandled);
		e.addObserver(alloy.system, "appRun", l.onAppRun);
		n.sendGetOfflineMessage(0)
	};
	this.setOffline = function() {
		g = !1;
		e.removeObserver(d, "messageHandled", l.onQplusMessageHandled);
		e.removeObserver(alloy.system, "appRun", l.onAppRun)
	};
	this.sendShare = function(a) {
		g ? n.sendShare(a) : f.profile("\u65e0\u6cd5\u62c9\u53d6\u5206\u4eab,Q+\u672a\u767b\u5f55")
	};
	this.onMessage = function(b) {
		for (var c = b.app_msg, b = b.wqqappid, f = 0, g = c.length; f < g; f++) r(c[f], b);
		a && (o(), e.notifyObservers(d, "messageUpdate", a))
	};
	this.onWebMessage = function(b) {
		v(b);
		a && (flushStore(), e.notifyObservers(d, "messageUpdate", a))
	}
});