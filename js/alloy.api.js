typeof progress == "function" && progress("jet.all.js loaded");
(function() {
	var c = this,
		b = c.Jx,
		q = {},
		p = {},
		m = {
			NO_DEBUG: 0,
			SHOW_ALL: 1
		},
		j = {
			debug: 1
		},
		n = function(b, c, h) {
			b = String(b);
			j.debug && this.console && (this.console.out ? this.console.out(b, c, h) : alert(b + " - \u6d88\u606f\u7c7b\u578b[" + h + "]"));
			return b
		};
	try {
		if (typeof b === "undefined" || b.mark && b.mark === "JxMark") {
			if (b) q = b.VERSIONS, p = b.PACKAGES;
			b = function(c, g) {
				var h = this;
				if (g) this._init();
				else if (c) {
					c = String(c);
					try {
						if (b.VERSIONS[c]) h = b.VERSIONS[c];
						else throw h = b.VERSIONS[b.DEFAULT_VERSION], Error("\u6ca1\u6709\u627e\u5230 JET version " + c + ", \u6240\u4ee5\u8fd4\u56de\u9ed8\u8ba4\u7248\u672c JET version " + b.DEFAULT_VERSION + "!");
					} catch (l) {
						h.out("A.\u9519\u8bef\uff1a[" + l.name + "] " + l.message + ", " + l.fileName + ", \u884c\u53f7:" + l.lineNumber + "; stack:" + typeof l.stack, 2)
					}
				} else h = b.VERSIONS[b.DEFAULT_VERSION];
				return h
			};
			b.prototype = {
				version: "1.0",
				DEBUG: m,
				option: j,
				_init: function() {
					this.constructor = b
				},
				$namespace: function(b) {
					for (var c, h = b.split("."), l = window, b = 0; b < h.length; b += 1) c = h[b], l[c] = l[c] || {}, l = l[h[b]];
					return l
				},
				$package: function() {
					var e = arguments[0],
						g = arguments[arguments.length - 1],
						h = c;
					if (typeof g === "function") typeof e === "string" ? (h = this.$namespace(e), b.PACKAGES[e] || (b.PACKAGES[e] = {
						isLoaded: !0,
						returnValue: void 0
					}), h.packageName = e) : typeof e === "object" && (h = e), g.call(h, this);
					else throw Error("Function required");
				},
				checkPackage: function(c) {
					return b.PACKAGES[c]
				},
				out: n,
				debug: function() {},
				profile: function() {},
				warn: function() {},
				error: function() {},
				startTime: +new Date,
				about: function() {
					return this.out("JET (Javascript Extend Tools)\nversion: " + this.version + "\n\nCopyright (c) 2009, All rights reserved.")
				},
				toString: function() {
					return "JET version " + this.version + " !"
				}
			};
			b.VERSIONS = q;
			b.PACKAGES = p;
			b.VERSIONS["1.0"] = new b("1.0", !0);
			b.DEFAULT_VERSION = "1.0";
			b.mark = "JxMark";
			c.Jet = c.Jx = b
		} else throw Error('"Jx" name is defined in other javascript code !!!');
	} catch (g) {
		n("JET \u5fae\u5185\u6838\u521d\u59cb\u5316\u5931\u8d25! B.\u9519\u8bef\uff1a[" + g.name + "] " + g.message + ", " + g.fileName + ", \u884c\u53f7:" + g.lineNumber + "; stack:" + typeof g.stack, 1)
	}
})();
Jx().$package(function(c) {
	var b, q, p, m, j, n, g, e, k, h, l;
	b = function(a) {
		return typeof a === "undefined"
	};
	q = function(a) {
		return a === null
	};
	p = function(a) {
		return (a === 0 || a) && a.constructor === Number
	};
	j = function(a) {
		return (a === !1 || a) && a.constructor === Boolean
	};
	m = function(a) {
		return (a === "" || a) && a.constructor === String
	};
	n = function(a) {
		return a && (a.constructor === Object || Object.prototype.toString.call(a) === "[object Object]")
	};
	g = function(a) {
		return a && a.constructor === Array || Object.prototype.toString.call(a) === "[object Array]"
	};
	e = function(a) {
		return a && a.callee && p(a.length) ? !0 : !1
	};
	k = function(a) {
		return a && a.constructor === Function
	};
	h = function(a, d, f) {
		var i = arguments,
			b, c;
		i.length === 1 ? (a = this, i = 0) : (a = i[0] || {}, i = 1);
		for (; i < arguments.length; i++) for (b in c = arguments[i], c) {
			var l = a[b],
				e = c[b];
			l !== e && (e && n(e) && !g(e) && !e.nodeType && !k(e) ? (l = a[b] || {}, a[b] = h(l, e || (e.length != null ? [] : {}))) : e !== void 0 && (a[b] = e))
		}
		return a
	};
	l = function() {
		var a = arguments.length,
			d = arguments[a - 1];
		d.init = d.init ||
		function() {};
		if (a === 2) {
			var a = arguments[0].extend,
				f = function() {};
			f.prototype = a.prototype;
			var i = function() {
					this.init.apply(this, arguments)
				};
			i.superClass = a.prototype;
			i.callSuper = function(a, d) {
				var f = Array.prototype.slice,
					b = f.call(arguments, 2);
				(d = i.superClass[d]) && d.apply(a, b.concat(f.call(arguments)))
			};
			i.prototype = new f;
			i.prototype.constructor = i;
			c.extend(i.prototype, d);
			i.prototype.init = function() {
				d.init.apply(this, arguments)
			};
			return i
		} else if (a === 1) return a = function() {
			return this.init.apply(this, arguments)
		}, a.prototype = d, a
	};
	var o = new l({
		init: function(a, d, f, i, b) {
			var c = a.concat();
			i && (c = a);
			this.timeout = window.setTimeout(function() {
				var i = +new Date;
				do d.call(f, c.shift());
				while (c.length > 0 && +new Date - i < 50);
				c.length > 0 ? this.timeout = window.setTimeout(arguments.callee, 25) : b && b(a)
			}, 25)
		},
		stop: function() {
			clearTimeout(this.timeout)
		}
	});
	c.isUndefined = b;
	c.isNull = q;
	c.isNumber = p;
	c.isString = m;
	c.isBoolean = j;
	c.isObject = n;
	c.isArray = g;
	c.isArguments = e;
	c.isFunction = k;
	c.$typeof = function(a) {
		return b(a) ? "undefined" : q(a) ? "null" : p(a) ? "number" : j(a) ? "boolean" : m(a) ? "string" : n(a) ? "object" : g(a) ? "array" : e(a) ? "arguments" : k(a) ? "function" : "other"
	};
	c.$return = function(a) {
		return c.isFunction(a) ? a : function() {
			return a
		}
	};
	c.$try = function() {
		var a, d = arguments.length,
			f;
		for (a = 0; a < d; a++) try {
			f = arguments[a]();
			break
		} catch (i) {
			c.out("C.\u9519\u8bef\uff1a[" + i.name + "] " + i.message + ", " + i.fileName + ", \u884c\u53f7:" + i.lineNumber + "; stack:" + typeof i.stack, 2)
		}
		return f
	};
	c.emptyFunc = function() {};
	c.clone = function(a) {
		var d = function() {};
		d.prototype = a;
		return new d
	};
	c.getLength = function(a) {
		var d, f = 0;
		for (d in a) a.hasOwnProperty(d) && f++;
		return f
	};
	c.checkJSON = function() {
		return !0
	};
	c.random = function(a, d) {
		return Math.floor(Math.random() * (d - a + 1) + a)
	};
	c.extend = h;
	c.now = function() {
		return +new Date
	};
	c.timedChunk = function(a, d, f, i, b) {
		var c = a.concat();
		i && (c = a);
		window.setTimeout(function() {
			var i = +new Date;
			do d.call(f, c.shift());
			while (c.length > 0 && +new Date - i < 50);
			c.length > 0 ? window.setTimeout(arguments.callee, 25) : b && b(a)
		}, 25)
	};
	c.rebuild = function(a, d) {
		d = d || {};
		a.$$rebuildedFunc = a.$$rebuildedFunc ||
		function() {
			var f, i;
			f = d.contextObj || this;
			i = Array.prototype.slice.call(arguments, 0);
			i !== void 0 && (i = i.concat(d.arguments));
			d.event === !1 && (i = i.slice(1));
			return a.apply(f, i)
		};
		return a.$$rebuildedFunc
	};
	c.pass = function(a, d) {
		var f = Array.prototype.slice,
			i = f.call(arguments, 1);
		return function() {
			return a.apply(this, i.concat(f.call(arguments)))
		}
	};
	c.bind = function(a, d, f) {
		var i = Array.prototype.slice,
			b = i.call(arguments, 2);
		return function() {
			return a.apply(d, b.concat(i.call(arguments)))
		}
	};
	c.bindNoEvent = void 0;
	c.Class = l;
	c.Chunk = o
});
Jx().$package(function(c) {
	c.browserOptions = {
		adjustBehaviors: !0,
		htmlClass: !0
	};
	c.host = window.location.host;
	var b = navigator.platform.toLowerCase(),
		q = navigator.userAgent.toLowerCase(),
		p = navigator.plugins,
		m, j, n, g, e;
	g = function(b, c) {
		b = ("" + b).replace(/_/g, ".");
		c = c || 1;
		b = String(b).split(".");
		b = b[0] + "." + (b[1] || "0");
		return b = Number(b).toFixed(c)
	};
	m = {
		getPlatform: function() {
			return b
		},
		name: window.orientation != void 0 ? "iPod" : (b.match(/mac|win|linux/i) || ["unknown"])[0],
		version: 0,
		iPod: 0,
		iPad: 0,
		iPhone: 0,
		android: 0,
		win: 0,
		linux: 0,
		mac: 0,
		set: function(b, c) {
			this.name = b;
			this.version = c;
			this[b] = c
		}
	};
	m[m.name] = !0;
	(e = q.match(/windows ([\d.]+)/)) ? m.set("win", g(e[1])) : (e = q.match(/windows nt ([\d.]+)/)) ? m.set("win", g(e[1])) : (e = q.match(/linux ([\d.]+)/)) ? m.set("linux", g(e[1])) : (e = q.match(/mac ([\d.]+)/)) ? m.set("mac", g(e[1])) : (e = q.match(/ipod ([\d.]+)/)) ? m.set("iPod", g(e[1])) : (e = q.match(/ipad[\D]*os ([\d_]+)/)) ? m.set("iPad", g(e[1])) : (e = q.match(/iphone ([\d.]+)/)) ? m.set("iPhone", g(e[1])) : (e = q.match(/android ([\d.]+)/)) && m.set("android", g(e[1]));
	j = {
		features: {
			xpath: !! document.evaluate,
			air: !! window.runtime,
			query: !! document.querySelector
		},
		getPlugins: function() {
			return p
		},
		plugins: {
			flash: function() {
				var b = 0;
				if (p && p.length) {
					var c = p["Shockwave Flash"];
					c && c.description && (b = g(c.description.match(/\b(\d+)\.\d+\b/)[1], 1) || b)
				} else for (c = 13; c--;) try {
					new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + c);
					b = g(c);
					break
				} catch (a) {}
				return b
			}()
		},
		getUserAgent: function() {
			return q
		},
		name: "unknown",
		version: 0,
		ie: 0,
		firefox: 0,
		chrome: 0,
		opera: 0,
		safari: 0,
		mobileSafari: 0,
		adobeAir: 0,
		set: function(b, c) {
			this.name = b;
			this.version = c;
			this[b] = c
		}
	};
	(e = q.match(/msie ([\d.]+)/)) ? j.set("ie", g(e[1])) : (e = q.match(/firefox\/([\d.]+)/)) ? j.set("firefox", g(e[1])) : (e = q.match(/chrome\/([\d.]+)/)) ? j.set("chrome", g(e[1])) : (e = q.match(/opera.([\d.]+)/)) ? j.set("opera", g(e[1])) : (e = q.match(/adobeair\/([\d.]+)/)) ? j.set("adobeAir", g(e[1])) : (e = q.match(/version\/([\d.]+).*safari/)) && j.set("safari", g(e[1]));
	(e = q.match(/version\/([\d.]+).*mobile.*safari/)) && j.set("mobileSafari", g(e[1]));
	m.iPad && j.set("mobileSafari", "0.0");
	if (j.ie) document.documentMode ? document.documentMode !== Math.floor(j.ie) && j.set("ie", g(document.documentMode)) : document.documentMode = Math.floor(j.ie);
	n = {
		name: "unknown",
		version: 0,
		trident: 0,
		gecko: 0,
		webkit: 0,
		presto: 0,
		set: function(b, c) {
			this.name = b;
			this.version = c;
			this[b] = c
		}
	};
	(e = q.match(/trident\/([\d.]+)/)) ? n.set("trident", g(e[1])) : (e = q.match(/gecko\/([\d.]+)/)) ? n.set("gecko", g(e[1])) : (e = q.match(/applewebkit\/([\d.]+)/)) ? n.set("webkit", g(e[1])) : (e = q.match(/presto\/([\d.]+)/)) && n.set("presto", g(e[1]));
	j.ie && (j.ie == 6 ? n.set("trident", g("4")) : (j.ie == 7 || j.ie == 8) && n.set("trident", g("5")));
	if (c.browserOptions.adjustBehaviors && j.ie && j.ie < 7) try {
		document.execCommand("BackgroundImageCache", !1, !0)
	} catch (k) {}
	var h = function(b) {
			return String(b).replace(/\./gi, "_")
		};
	c.browserOptions.htmlClass &&
	function() {
		var b = document.documentElement,
			c = [b.className];
		c.push("javascriptEnabled");
		c.push(m.name);
		c.push(m.name + h(m.version));
		c.push(j.name);
		c.push(j.name + h(j.version));
		document.documentMode && c.push("documentMode_" + document.documentMode);
		c.push(n.name);
		c.push(n.name + h(n.version));
		j.plugins.flash && (c.push("flash"), c.push("flash" + h(j.plugins.flash)));
		typeof window.webTop != "undefined" && window.webTop && c.push("webTop");
		b.className = c.join(" ")
	}();
	c.platform = m;
	c.browser = j;
	c.browser.engine = n
});
Jx().$package(function(c) {
	var b, q, p, m, j, n, g, e, k, h, l, o, a, d, f, i, u = null,
		x, v, r, s;
	c.dom = c.dom || {};
	b = c.dom;
	q = c.browser;
	p = b.win ? b.win.contentWindow : b.win || window;
	b.win = p;
	b.doc = p.document;
	var t = document && Object.prototype.hasOwnProperty.call(document.documentElement, "classList");
	v = function() {
		return r ? r : r = document.compatMode === "CSS1Compat" ? document.documentElement : document.body
	};
	i = function(a) {
		a ? (a = a || window.document, u = a.nodeType === 9 ? a : a.ownerDocument || b.doc) : u || (a = a || window.document, u = a.nodeType === 9 ? a : a.ownerDocument || b.doc);
		return u
	};
	x = function(a) {
		var d = i(a);
		return a.document ? a : d.defaultView || d.parentWindow || b.win
	};
	p = function(a, d) {
		d = d || i();
		return d.getElementsByTagName(a)
	};
	l = function(a) {
		return (a ? a.scrollLeft : Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)) || 0
	};
	o = function(a) {
		return (a ? a.scrollTop : Math.max(document.documentElement.scrollTop, document.body.scrollTop)) || 0
	};
	m = function() {
		return t ?
		function(a, d) {
			return !a || !d ? !1 : a.classList.contains(d)
		} : function(a, d) {
			return !a || !d ? !1 : -1 < (" " + a.className + " ").indexOf(" " + d + " ")
		}
	}();
	j = function() {
		return t ?
		function(a, d) {
			a && d && !m(a, d) && a.classList.add(d)
		} : function(a, d) {
			a && d && !m(a, d) && (a.className += " " + d)
		}
	}();
	n = function() {
		return t ?
		function(a, d) {
			a && d && m(a, d) && a.classList.remove(d)
		} : function(a, d) {
			if (a && d && m(a, d)) a.className = a.className.replace(RegExp("(?:^|\\s)" + d + "(?:\\s|$)"), " ")
		}
	}();
	g = function() {
		return t ?
		function(a, d) {
			a && d && a.classList.toggle(d)
		} : function(a, d) {
			a && d && (m(a, d) ? n(a, d) : j(a, d))
		}
	}();
	e = function(a, d, f) {
		if (a) {
			var b = c.browser.name;
			if (d === "float" || d === "cssFloat") d = b === "ie" ? "styleFloat" : "cssFloat";
			if (d === "opacity" && b === "ie" && c.browser.ie < 9) {
				if (a.style.filter = 'alpha(opacity="' + f * 100 + '")', !a.style.zoom) a.style.zoom = 1
			} else a.style[d] = f
		}
	};
	k = function(a, d) {
		if (a) {
			var f = x(a),
				b = c.browser.name;
			if (d === "float" || d === "cssFloat") d = b === "ie" ? "styleFloat" : "cssFloat";
			if (d === "opacity" && b === "ie" && c.browser.ie < 9) return f = 1, (b = a.style.filter.match(/opacity=(\d+)/)) && b[1] && (f = b[1] / 100), f;
			if (a.style[d]) return a.style[d];
			else if (a.currentStyle) return a.currentStyle[d];
			else if (f.getComputedStyle) return f.getComputedStyle(a, null)[d];
			else if (document.defaultView && document.defaultView.getComputedStyle) return d = d.replace(/([/A-Z])/g, "-$1"), d = d.toLowerCase(), (f = document.defaultView.getComputedStyle(a, "")) && f.getPropertyValue(d)
		}
	};
	h = function(a, d) {
		a.style.cssText = d
	};
	a = function(a) {
		var d = 0,
			f = 0;
		if (a) if (document.documentElement.getBoundingClientRect && a.getBoundingClientRect) {
			f = {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			};
			try {
				f = a.getBoundingClientRect()
			} catch (b) {
				return [0, 0]
			}
			var a = a.ownerDocument,
				i = c.browser.ie ? 2 : 0,
				d = f.top - i + o(a),
				f = f.left - i + l(a)
		} else for (; a.offsetParent;) d += a.offsetTop, f += a.offsetLeft, a = a.offsetParent;
		return [f, d]
	};
	d = function(d) {
		d = a(d);
		d[0] += l();
		d[1] += o();
		return d
	};
	f = function(a, d, f) {
		var b = parseInt(k(a, "marginLeft")) || 0,
			c = parseInt(k(a, "marginTop")) || 0;
		e(a, "left", parseInt(d) - b + "px");
		e(a, "top", parseInt(f) - c + "px")
	};
	for (var w = function(a) {
			return !a || a == "auto" ? 0 : parseInt(a.substr(0, a.length - 2))
		}, y = p("script"), z = 0; z < y.length; z++) if (y[z].getAttribute("hasJx") == "true") c.src = y[z].src;
	if (!c.src) c.src = y[y.length - 1].src;
	c.filename = c.src.replace(/(.*\/){0,}([^\\]+).*/ig, "$2");
	c.path = c.src.split(c.filename)[0];
	b.getDoc = i;
	b.id = function(a, d) {
		return i(d).getElementById(a)
	};
	b.name = function(a, d) {
		return i(d).getElementsByName(a)
	};
	b.tagName = p;
	b.getText = function(a) {
		var d = a ? a[TEXT_CONTENT] : "";
		d === UNDEFINED && INNER_TEXT in a && (d = a[INNER_TEXT]);
		return d || ""
	};
	b.getAttributeByParent = function(a, d, f) {
		var b = !1,
			i;
		do i = d.getAttribute(a), c.isUndefined(i) || c.isNull(i) ? d === f ? b = !0 : d = d.parentNode : b = !0;
		while (!b);
		return i
	};
	b.node = function(a, d) {
		var f, b = document.createElement(a),
			i = {
				"class": function() {
					b.className = d["class"]
				},
				style: function() {
					h(b, d.style)
				}
			};
		for (f in d) if (i[f]) i[f]();
		else b.setAttribute(f, d[f]);
		return b
	};
	b.setClass = function(a, d) {
		a.className = d
	};
	b.getClass = function(a) {
		return a.className
	};
	b.hasClass = m;
	b.addClass = j;
	b.removeClass = n;
	b.toggleClass = g;
	b.replaceClass = function(a, d, f) {
		n(a, d);
		j(a, f)
	};
	b.createStyleNode = function(a, d) {
		var f = b.node("style", {
			id: d || "",
			type: "text/css"
		});
		if (f.styleSheet) f.styleSheet.cssText = a;
		else {
			var i = document.createTextNode(a);
			f.appendChild(i)
		}
		b.getDocHead().appendChild(f);
		return f
	};
	b.setStyle = e;
	b.getStyle = k;
	b.setCssText = h;
	b.getCssText = function(a) {
		return a.style.cssText
	};
	b.addCssText = function(a, d) {
		a.style.cssText += ";" + d
	};
	b.show = function(a, d) {
		var f;
		f = (f = a.getAttribute("_oldDisplay")) ? f : k(a, "display");
		d ? e(a, "display", d) : f === "none" ? e(a, "display", "block") : e(a, "display", f)
	};
	b.isShow = function(a) {
		return k(a, "display") === "none" ? !1 : !0
	};
	b.recover = function(a) {
		var d;
		d = (d = a.getAttribute("_oldDisplay")) ? d : k(a, "display");
		d === "none" ? e(a, "display", "") : e(a, "display", d)
	};
	b.hide = function(a) {
		var d = k(a, "display");
		a.getAttribute("_oldDisplay") || (d === "none" ? a.setAttribute("_oldDisplay", "") : a.setAttribute("_oldDisplay", d));
		e(a, "display", "none")
	};
	b.getScrollLeft = l;
	b.getScrollTop = o;
	b.getScrollHeight = function(a) {
		return (a ? a.scrollHeight : Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)) || 0
	};
	b.getScrollWidth = function(a) {
		return (a ? a.scrollWidth : Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)) || 0
	};
	b.getClientHeight = function(a) {
		a = a || v();
		return a.clientHeight
	};
	b.getClientWidth = function(a) {
		a = a || v();
		return a.clientWidth
	};
	b.getOffsetHeight = function(a) {
		a = a || v();
		return a.offsetHeight
	};
	b.getOffsetWidth = function(a) {
		a = a || v();
		return a.offsetWidth
	};
	b.getClientXY = a;
	b.setClientXY = function(a, d, b) {
		d = parseInt(d) + l();
		b = parseInt(b) + o();
		f(a, d, b)
	};
	b.getXY = d;
	b.setXY = f;
	b.getRelativeXY = function(a, f) {
		var b = d(a),
			i = d(f),
			c = [];
		c[0] = b[0] - i[0];
		c[1] = b[1] - i[1];
		return c
	};
	b.getPosX = function(a) {
		return w(b.getStyle(a, "left"))
	};
	b.getPosY = function(a) {
		return w(b.getStyle(a, "top"))
	};
	b.getWidth = function(a) {
		return w(b.getStyle(a, "width"))
	};
	b.getHeight = function(a) {
		return w(b.getStyle(a, "height"))
	};
	b.getSelection = void 0;
	b.getSelectionText = function(a) {
		var a = a || window,
			d = a.document;
		if (a.getSelection) return a.getSelection().toString();
		else if (d.getSelection) return d.getSelection();
		else if (d.selection) return d.selection.createRange().text
	};
	b.getTextFieldSelection = function(a) {
		return a.selectionStart != void 0 && a.selectionEnd != void 0 ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
	};
	b.getDocumentElement = v;
	b.getDocHead = function() {
		if (!s) {
			var a = i();
			s = a.getElementsByTagName("head") ? a.getElementsByTagName("head")[0] : a.documentElement
		}
		return s
	};
	b.contains = function(a, d, f) {
		if (!f && a === d) return !1;
		if (a.compareDocumentPosition) {
			if (a = a.compareDocumentPosition(d), a == 20 || a == 0) return !0
		} else if (a.contains(d)) return !0;
		return !1
	};
	b.getHref = function(a) {
		return (q.ie && q.ie <= 7 ? a.getAttribute("href", 4) : a.href) || null
	}
});
Jx().$package(function(c) {
	var b, q, p, m, j, n, g = [],
		e, k, h, l, o;
	c.event = c.event || {};
	b = c.event;
	o = function(a, d) {
		if (!a) a = window.event;
		var d = d || a.srcElement,
			f = document,
			b = f.documentElement,
			f = f.body,
			b = {
				_event: a,
				type: a.type,
				target: a.srcElement,
				currentTarget: d,
				relatedTarget: a.fromElement ? a.fromElement : a.toElement,
				eventPhase: a.srcElement == d ? 2 : 3,
				clientX: a.clientX,
				clientY: a.clientY,
				screenX: a.screenX,
				screenY: a.screenY,
				layerX: a.offsetX,
				layerY: a.offsetY,
				pageX: a.clientX + (b && b.scrollLeft || f && f.scrollLeft || 0) - (b && b.clientLeft || f && f.clientLeft || 0),
				pageY: a.clientY + (b && b.scrollTop || f && f.scrollTop || 0) - (b && b.clientTop || f && f.clientTop || 0),
				wheelDelta: a.wheelDelta || -40 * (a.detail || 0),
				altKey: a.altKey,
				ctrlKey: a.ctrlKey,
				shiftKey: a.shiftKey,
				charCode: a.keyCode,
				keyCode: a.keyCode,
				stopPropagation: function() {
					this._event.cancelBubble = !0
				},
				preventDefault: function() {
					this._event.returnValue = !1
				}
			},
			f = a.type.toLowerCase();
		if (f == "mouseover") b.relatedTarget = a.fromElement;
		else if (f == "mouseout") b.relatedTarget = a.toElement;
		if (!c.isUndefined(a.button)) {
			var f = a.button,
				h = {
					0: -1,
					1: 0,
					2: 2,
					3: -1,
					4: 1
				};
			b.button = c.isUndefined(h[f]) ? f : h[f]
		}
		return b
	};
	c.browser.ie ? (q = function(a, d, f, b) {
		if (n["on" + d]) n["on" + d](a, d, f, b);
		else p(a, d, f)
	}, p = function(a, d, f) {
		if (b._find(arguments) == -1) {
			var c = function(d) {
					d = o(d, a);
					Function.prototype.call ? f.call(a, d) : (a._currentHandler = f, a._currentHandler(d), a._currentHandler = null)
				};
			a.attachEvent("on" + d, c);
			var c = {
				element: a,
				eventType: d,
				handler: f,
				wrappedEvent: c
			},
				h = (a.document || a).parentWindow || window,
				e = b._uid();
			if (!h._allHandlers) h._allHandlers = {};
			h._allHandlers[e] = c;
			if (!a._handlers) a._handlers = [];
			a._handlers.push(e);
			if (!h._onunloadEventRegistered) h._onunloadEventRegistered = !0, h.attachEvent("onunload", b._removeAllEvents)
		}
	}, m = function(a, d, f) {
		if (n["off" + d]) n["off" + d](a, d, f);
		else arguments.length == 3 ? j(a, d, f) : j(a, d)
	}, j = function(a, d, f) {
		var c = b._find(arguments);
		if (c != -1) {
			for (var h = (a.document || a).parentWindow || window, e = 0; e < c.length; e++) {
				var l = c[e],
					g = a._handlers[l],
					o = h._allHandlers[g];
				a.detachEvent("on" + o.eventType, o.wrappedEvent);
				a._handlers[l] = null;
				a._handlers.splice(l, 1);
				delete h._allHandlers[g]
			}
			if (a._handlers && a._handlers.length == 0) a._handlers = null
		}
	}, b._find = function(a) {
		var d = a[0],
			f = a[1],
			b = a[2],
			c = d._handlers;
		if (!c) return -1;
		var d = (d.document || d).parentWindow || window,
			h = [];
		if (a.length === 3) for (a = c.length - 1; a >= 0; a--) {
			var e = c[a],
				e = d._allHandlers[e];
			if (e.eventType == f && e.handler == b) return h.push(a), h
		} else if (a.length === 2) {
			for (a = c.length - 1; a >= 0; a--) e = c[a], e = d._allHandlers[e], e.eventType == f && h.push(a);
			if (h.length > 0) return h
		} else if (a.length === 1) {
			for (a = c.length - 1; a >= 0; a--) h.push(a);
			if (h.length > 0) return h
		}
		return -1
	}, b._removeAllEvents = function() {
		for (var a in this._allHandlers) {
			var d = this._allHandlers[a];
			d.element.detachEvent("on" + d.eventType, d.wrappedEvent);
			d.element._handlers = null;
			delete this._allHandlers[a]
		}
	}, b._counter = 0, b._uid = function() {
		return "h" + b._counter++
	}) : document.addEventListener && (q = function(a, d, f, b) {
		if (n["on" + d]) n["on" + d](a, d, f, b);
		else p(a, d, f)
	}, p = function(a, d, f) {
		var b = !1;
		a || c.out("targetModel undefined:" + d + f);
		if (!a._eventTypes) a._eventTypes = {};
		a._eventTypes[d] || (a._eventTypes[d] = []);
		a.addEventListener(d, f, !1);
		a = a._eventTypes[d];
		for (d = 0; d < a.length; d++) if (a[d] == f) {
			b = !0;
			break
		}
		b || a.push(f)
	}, m = function(a, d, f) {
		if (n["off" + d]) n["off" + d](a, d, f);
		else arguments.length == 3 ? j(a, d, f) : j(a, d)
	}, j = function(a, d, f) {
		if (d) if (arguments.length == 3) {
			if (f && (a.removeEventListener(d, f, !1), a._eventTypes && a._eventTypes[d])) for (var b = a._eventTypes[d], c = 0; c < b.length; c++) if (b[c] === f) {
				b[c] = null;
				b.splice(c, 1);
				break
			}
		} else {
			if (a._eventTypes && a._eventTypes[d]) {
				b = a._eventTypes[d];
				for (c = 0; c < b.length; c++) a.removeEventListener(d, b[c], !1);
				a._eventTypes[d] = []
			}
		} else if (a._eventTypes) {
			var h = a._eventTypes,
				e;
			for (e in h) {
				b = a._eventTypes[e];
				for (c = 0; c < b.length; c++) a.removeEventListener(e, b[c], !1)
			}
		}
	});
	n = {
		ondrag: function(a, d, f) {
			var i, h, e = !1,
				l = function(d) {
					if (c.browser.mobileSafari || d.button === 0) c.browser.mobileSafari ? (d.stopPropagation(), d = d.touches[0], i = d.pageX, h = d.pageY) : (d.stopPropagation(), d.preventDefault(), i = d.clientX, h = d.clientY), e = !1, c.browser.mobileSafari ? (b.addEventListener(document, "touchmove", o), b.addEventListener(a, "touchend", k)) : b.addEventListener(document, "mousemove", o)
				},
				o = function(d) {
					if (c.browser.mobileSafari || d.button === 0) {
						var l, g;
						d.stopPropagation();
						c.browser.mobileSafari ? (g = d.changedTouches[0], l = g.pageX, g = g.pageY) : (l = d.clientX, g = d.clientY);
						Math.abs(i - l) + Math.abs(h - g) > 2 && (c.browser.mobileSafari ? (b.removeEventListener(document, "touchmove", o), b.removeEventListener(a, "touchend", k)) : b.removeEventListener(document, "mousemove", o), e || (f.call(a, d), e = !0))
					}
				},
				k = function(a) {
					if (c.browser.mobileSafari || a.button === 0) c.browser.mobileSafari ? (b.removeEventListener(document, "touchmove", o), e && (a.stopPropagation(), a.preventDefault())) : b.removeEventListener(document, "mousemove", o)
				};
			c.browser.mobileSafari ? b.addEventListener(a, "touchstart", l) : (b.addEventListener(a, "mousedown", l), b.addEventListener(a, "mouseup", k));
			g.push({
				element: a,
				eventType: d,
				handler: f,
				actions: [l, k]
			})
		},
		offdrag: function(a, d, f) {
			for (var i in g) if (g[i].handler == f && g[i].element == a && g[i].eventType == d) {
				c.browser.mobileSafari ? (b.removeEventListener(a, "touchstart", g[i].actions[0]), b.removeEventListener(a, "touchend", g[i].actions[1])) : (b.removeEventListener(a, "mousedown", g[i].actions[0]), b.removeEventListener(a, "mouseup", g[i].actions[1]));
				g.splice(i, 1);
				break
			}
		},
		oncustomclick: function(a, d, f, i) {
			var h, e, l = !1,
				o = !1,
				k, i = i ? i : {},
				j = i.longtouchable,
				m = -1,
				i = function(d) {
					l = !1;
					if (c.browser.mobileSafari || d.button === 0) {
						var i;
						c.browser.mobileSafari ? (i = d.changedTouches[0], h = i.pageX, e = i.pageY) : (h = d.clientX, e = d.clientY);
						o = !1;
						j && (k = setTimeout(function() {
							!l && !o && (c.browser.mobileSafari ? (b.removeEventListener(a, "touchmove", n), b.removeOriginalEventListener(a, "touchend", p)) : (b.removeEventListener(a, "mousemove", n), b.removeOriginalEventListener(a, "click", p)), f.call(a, d, 2E3))
						}, 1E3));
						c.browser.mobileSafari ? (b.addEventListener(a, "touchmove", n), b.addOriginalEventListener(a, "touchend", p)) : (b.addEventListener(a, "mousemove", n), b.addOriginalEventListener(a, "click", p))
					}
				},
				q = function(a) {
					m = a.button;
					if (c.browser.mobileSafari || a.button === 0) c.browser.mobileSafari && (touch = a.changedTouches[0])
				},
				n = function(d) {
					if (c.browser.mobileSafari) {
						touch = d.changedTouches[0];
						var f = touch.pageX,
							d = touch.pageY
					} else f = d.clientX, d = d.clientY;
					if (l = Math.abs(h - f) + Math.abs(e - d) > 1) clearTimeout(k), k = null, c.browser.mobileSafari ? (b.removeEventListener(a, "touchmove", n), b.removeOriginalEventListener(a, "touchend", p)) : (b.removeEventListener(a, "mousemove", n), b.removeOriginalEventListener(a, "click", p))
				},
				p = function(d) {
					clearTimeout(k);
					k = null;
					o = !0;
					if (c.browser.mobileSafari || m === 0) {
						var b;
						if (c.browser.mobileSafari) {
							b = d.changedTouches[0];
							var i = b.pageX;
							b = b.pageY
						} else i = d.clientX, b = d.clientY;
						Math.abs(h - i) + Math.abs(e - b) < 1 && (l = !1, f.call(a, d, 0))
					}
				};
			c.browser.mobileSafari ? b.addEventListener(a, "touchstart", i) : (b.addEventListener(a, "mousedown", i), b.addEventListener(a, "mouseup", q));
			g.push({
				element: a,
				eventType: d,
				handler: f,
				actions: [i, n, q, p]
			})
		},
		offcustomclick: function(a, d, f) {
			for (var i in g) if (g[i].handler == f && g[i].element == a && g[i].eventType == d) {
				c.browser.mobileSafari ? (b.removeEventListener(a, "touchstart", g[i].actions[0]), b.removeEventListener(a, "touchmove", g[i].actions[1]), b.removeOriginalEventListener(a, "touchend", g[i].actions[3])) : (b.removeEventListener(a, "mousedown", g[i].actions[0]), b.removeEventListener(a, "mousemove", g[i].actions[1]), b.removeEventListener(a, "mouseup", g[i].actions[2]), b.removeOriginalEventListener(a, "click", g[i].actions[3]));
				g.splice(i, 1);
				break
			}
		},
		oncontextmenu: function(a, d, f) {
			if (c.browser.ie == 9) {
				var i = function(d) {
						d = o(d, a);
						f.call(a, d)
					};
				a.attachEvent("oncontextmenu", i);
				g.push({
					element: a,
					eventType: d,
					handler: f,
					actions: [i]
				})
			} else b.addOriginalEventListener(a, d, f)
		},
		offcontextmenu: function(a, d, f) {
			if (c.browser.ie == 9) for (var i in g) {
				if (g[i].handler == f && g[i].element == a && g[i].eventType == d) {
					a.detachEvent("oncontextmenu", g[i].actions[0]);
					g.splice(i, 1);
					break
				}
			} else b.removeOriginalEventListener(a, d, f)
		},
		onmousewheel: function(a, d, f) {
			if (c.browser.firefox) {
				var i = function(d) {
						d = o(d, a);
						f.call(a, d)
					};
				b.addOriginalEventListener(a, "DOMMouseScroll", i);
				g.push({
					element: a,
					eventType: d,
					handler: f,
					actions: [i]
				})
			} else b.addOriginalEventListener(a, "mousewheel", f)
		},
		offmousewheel: function(a, d, f) {
			if (c.browser.firefox) for (var i in g) {
				if (g[i].handler == f && g[i].element == a && g[i].eventType == d) {
					b.removeOriginalEventListener(a, "DOMMouseScroll", g[i].actions[0]);
					g.splice(i, 1);
					break
				}
			} else b.removeOriginalEventListener(a, "mousewheel", f)
		},
		onmouseenter: function(a, d, f) {
			var c = function(a) {
					var d = a.relatedTarget;
					if (d) if (this.compareDocumentPosition) {
						var b = this.compareDocumentPosition(d);
						d == this || b == 20 || b == 0 || f.call(this, a)
					} else d == this || this.contains(d) || f.call(this, a);
					else f.call(this, a)
				};
			b.addEventListener(a, "mouseover", c);
			g.push({
				element: a,
				eventType: d,
				handler: f,
				actions: [c]
			})
		},
		offmouseenter: function(a, d, f) {
			for (var c in g) if (g[c].handler == f && g[c].element == a && g[c].eventType == d) {
				b.removeEventListener(a, "mouseover", g[c].actions[0]);
				g.splice(c, 1);
				break
			}
		},
		onmouseleave: function(a, d, f) {
			var c = function(a) {
					var d = a.relatedTarget;
					d ? this.compareDocumentPosition ? (d = this.compareDocumentPosition(d), d == 20 || d == 0 || f.call(this, a)) : this.contains(d) || f.call(this, a) : f.call(this, a)
				};
			b.addEventListener(a, "mouseout", c);
			g.push({
				element: a,
				eventType: d,
				handler: f,
				actions: [c]
			})
		},
		offmouseleave: function(a, d, f) {
			for (var c in g) if (g[c].handler == f && g[c].element == a && g[c].eventType == d) {
				b.removeEventListener(a, "mouseout", g[c].actions[0]);
				g.splice(c, 1);
				break
			}
		},
		oninput: function(a, d, f) {
			if (c.browser.ie) {
				var i = function(d) {
						d.propertyName.toLowerCase() == "value" && (d = o(d, a), f.call(a, d))
					};
				a.attachEvent("onpropertychange", i);
				g.push({
					element: a,
					eventType: d,
					handler: f,
					actions: [i]
				});
				c.browser.ie == 9 && b.addOriginalEventListener(a, "change", f)
			} else b.addOriginalEventListener(a, "input", f)
		},
		offinput: function(a, d, f) {
			if (c.browser.ie) {
				for (var i in g) if (g[i].handler == f && g[i].element == a && g[i].eventType == d) {
					a.detachEvent("onpropertychange", g[i].actions[0]);
					g.splice(i, 1);
					break
				}
				c.browser.ie == 9 && b.removeOriginalEventListener(a, "change", f)
			} else b.removeOriginalEventListener(a, "input", f)
		}
	};
	e = function(a) {
		if (e.done) return a();
		e.timer ? e.ready.push(a) : (e.ready = [a], b.on(window, "load", k), e.timer = window.setInterval(k, 300))
	};
	k = function() {
		if (e.done) return !0;
		if (document && document.getElementsByTagName && document.getElementById && document.body) {
			e.done = !0;
			window.clearInterval(e.timer);
			e.timer = null;
			for (var a = 0; a < e.ready.length; a++) e.ready[a]();
			e.ready = null;
			return !0
		}
	};
	h = function() {
		this.subscribers = []
	};
	h.prototype.subscribe = function(a) {
		c.array.some(this.subscribers, function(d) {
			return d === a
		}) || this.subscribers.push(a);
		return a
	};
	h.prototype.deliver = function(a) {
		c.array.forEach(this.subscribers, function(d) {
			d(a)
		})
	};
	h.prototype.unsubscribe = function(a) {
		this.subscribers = c.array.filter(this.subscribers, function(d) {
			return d !== a
		});
		return a
	};
	l = function(a, d, b) {
		var i, h;
		if (b) {
			d = "on" + d;
			if (!a._$events) a._$events = {};
			a._$events[d] ? a._$events[d].length == 0 && (a._$events[d] = []) : a._$events[d] = [];
			a = a._$events[d];
			d = a.length;
			i = -1;
			for (h = 0; h < d; h++) if (a[h] == b) {
				i = h;
				break
			}
			i === -1 && a.push(b)
		} else c.out(">>> \u6dfb\u52a0\u7684\u89c2\u5bdf\u8005\u65b9\u6cd5\u4e0d\u5b58\u5728\uff1a" + a + d + b)
	};
	b.addEventListener = q;
	b.removeEventListener = m;
	b.addOriginalEventListener = p;
	b.removeOriginalEventListener = j;
	b.on = b.addEventListener;
	b.off = b.removeEventListener;
	b.onDomReady = e;
	b.Publish = h;
	b.addObserver = l;
	b.addObservers = function(a) {
		var d = a.targetModel,
			a = a.eventMapping,
			b;
		for (b in a) l(d, b, a[b])
	};
	b.notifyObservers = function(a, d, b) {
		var c, d = "on" + d,
			h = !0;
		if (a._$events && a._$events[d] && (d = a._$events[d], d.length > 0)) for (c = 0; c < d.length; c++) d[c].apply(a, [b]) === !1 && (h = !1);
		return h
	};
	b.removeObserver = function(a, d, b) {
		var c, h = !1,
			e, l = a._$events;
		if (b) {
			if (l && (a = l["on" + d])) {
				e = a.length;
				for (c = 0; c < e; c++) if (a[c] == b) {
					a[c] = null;
					a.splice(c, 1);
					h = !0;
					break
				}
			}
		} else if (d) {
			if (l && (d = "on" + d, a = l[d])) {
				e = a.length;
				for (c = 0; c < e; c++) a[c] = null;
				delete l[d];
				h = !0
			}
		} else if (a && l) {
			for (c in l) delete l[c];
			delete a._$events;
			h = !0
		}
		return h
	}
});
Jx().$package(function(c) {
	c.date = c.date || {};
	c.date.format = function(b, c) {
		var p = {
			"M+": b.getMonth() + 1,
			"D+": b.getDate(),
			"h+": b.getHours(),
			"m+": b.getMinutes(),
			"s+": b.getSeconds(),
			"q+": Math.floor((b.getMonth() + 3) / 3),
			S: b.getMilliseconds()
		};
		/(Y+)/.test(c) && (c = c.replace(RegExp.$1, (b.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (var m in p) RegExp("(" + m + ")").test(c) && (c = c.replace(RegExp.$1, RegExp.$1.length == 1 ? p[m] : ("00" + p[m]).substr(("" + p[m]).length)));
		return c
	}
});
Jx().$package(function(c) {
	var b = c.Class({
		init: function() {
			var b = this;
			this.op = [{
				".": function(b, c) {
					return c.className == b
				},
				"+": function(b, c) {
					return c.getAttribute(b)
				},
				"#": function(b, c) {
					return c.id == b
				},
				".~": function(b, c) {
					return $D.hasClass(c, b)
				}
			}, {
				">": function(c, m) {
					var j, n, g;
					g = c.split(">");
					n = g[0];
					g = g[1];
					return (g == "*" || b.match(g, m)) && (j = b.operate(b.detectAncestor, n, m)()) ? b.packEvent(m, j) : !1
				}
			}, {
				"!": function(c, m) {
					c = c.substr(1);
					return !b.match(c, m)
				}
			}, {
				"&&": function(c, m) {
					var j, n;
					n = c.split("&&");
					j = n[0];
					n = n.slice(1).join("");
					return b.match(j, m) ? n.indexOf("&&") == -1 ? b.match(n, m) : arguments.callee(n, m) : !1
				}
			}];
			this.op2Level = [
				[".", "#", "+", ".~"], ">", "!", "&&"]
		},
		detectAncestor: function(b, c, m) {
			var j = 5,
				n = c.target;
			return function() {
				if (m(b, n)) return n;
				else if (j > 0) return j--, n.parentNode ? n = n.parentNode : j = 0, arguments.callee();
				return null
			}
		},
		detect: function(b, c, m) {
			var j = c.target;
			if (j.nodeType != 1) {
				if (j = j.parentNode, m(b, j)) return this.packEvent(c, j)
			} else return m(b, j);
			return !1
		},
		packEvent: function(b, c) {
			return [!0, {
				target: c,
				oTarget: b.target,
				stopPropagation: function() {
					b.stopPropagation()
				},
				preventDefault: function() {
					b.preventDefault()
				},
				pageX: b.pageX,
				pageY: b.pageY
			}]
		},
		operate: function(b, c, m) {
			for (var j, n = 3; n > 0;) {
				if (j = this.op[0][c.substr(0, n)]) {
					var g = null;
					if (g = b(c.substr(n), m, j)) return g
				}
				n--
			}
			return !1
		},
		match: function(b, c) {
			for (var m = this.op2Level.length; m > 0; m--) {
				var j = this.op2Level[m];
				if (b.indexOf(j) != -1) return this.op[m][j](b, c, void 0)
			}
			return this.operate(this.detect, b, c)
		},
		router: function(b, c, m) {
			for (var b = b.split(","), j, m = b.length - 1; m >= 0; m--) if (j = this.match(b[m], c)) return j;
			return !1
		},
		parse: function(b, c, m) {
			b = this.router(b, m);
			b.length == 2 ? c(b[1]) : b && c(m)
		}
	});
	c.event.eventParser = new b
});
Jx().$package(function(c) {
	var b = c.event,
		q = {
			"#": "id",
			".": "className",
			"@": "el",
			"!": "!"
		},
		p = {
			blur: 1,
			focus: 1,
			change: 1
		};
	c.event.eventProxy = function(m, j) {
		var n = {},
			g, e;
		for (g in j) {
			e = j[g];
			var k = g.split(" "),
				h = k[0],
				k = k[1];
			n[k] = n[k] || [];
			n[k].push([h, e])
		}
		g = e = null;
		for (g in n) if (e = n[g], p[g] || g.charAt(0) == "@") for (k = e.length - 1; k >= 0; k--) for (var h = e[k][0].split(","), l = h.length - 1; l >= 0; l--) {
			var o = q[h[l].charAt(0)];
			if (o == "id") b.on($D.id(h[l].substr(1)), g, e[k][1]);
			else if (o == "el") b.on(m, g.substr(1), e[k][1])
		} else b.on(m, g, function(a) {
			for (var d = e.length - 1; d >= 0; d--) c.event.eventParser.parse(e[d][0], e[d][1], a)
		})
	}
});
Jx().$package(function(c) {
	c.number = c.number || {};
	c.number.format = function(b, c) {
		for (var p = b ? b.toString().split(".") : ["0"], m = c ? c.split(".") : [""], j = "", n = p[0], g = m[0], e = n.length - 1, k = !1, h = g.length - 1; h >= 0; h--) switch (g.substr(h, 1)) {
		case "":
			e >= 0 && (j = n.substr(e--, 1) + j);
			break;
		case "0":
			j = e >= 0 ? n.substr(e--, 1) + j : "0" + j;
			break;
		case ",":
			k = !0, j = "," + j
		}
		if (e >= 0) if (k) for (g = n.length; e >= 0; e--) j = n.substr(e, 1) + j, e > 0 && (g - e) % 3 == 0 && (j = "," + j);
		else j = n.substr(0, e + 1) + j;
		j += ".";
		n = p.length > 1 ? p[1] : "";
		g = m.length > 1 ? m[1] : "";
		for (h = e = 0; h < g.length; h++) switch (g.substr(h, 1)) {
		case "":
			e < n.length && (j += n.substr(e++, 1));
			break;
		case "0":
			j += e < n.length ? n.substr(e++, 1) : "0"
		}
		return j.replace(/^,+/, "").replace(/\.$/, "")
	}
});
Jx().$package(function(c) {
	c.string = c.string || {};
	var b = c.string,
		q, p, m, j, n, g, e, k, h, l, o = {};
	q = function(a, d) {
		var b = !/\W/.test(a) ? o[a] = o[a] || q(document.getElementById(a).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
		return d ? b(d) : b
	};
	p = function(a) {
		return p.RE.test(a)
	};
	p.RE = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
	m = function(a) {
		var d = null;
		if (null !== (d = m.RE.exec(a))) {
			for (var a = {}, b = 0, c = m.SPEC.length; b < c; b++) a[m.SPEC[b]] = d[b + 1];
			d = a
		}
		return d
	};
	m.SPEC = ["scheme", "user", "pass", "host", "port", "path", "query", "fragment"];
	m.RE = /^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+))?(?:#(.+))?$/;
	j = function(a) {
		return String(a).replace(/^\s+|\s+$/g, "")
	};
	n = function(a, d) {
		return encodeURIComponent(String(a)) + "=" + encodeURIComponent(String(d))
	};
	g = function(a, d) {
		return a.replace(/[^\x00-\xff]/g, {
			2: "aa",
			3: "aaa"
		}[d || 2]).length
	};
	e = function(a, d) {
		return a.substring(0, a.length - d)
	};
	k = function(a) {
		return a.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(a) {
			return "&#" + a.charCodeAt(0) + ";"
		}).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />")
	};
	h = function(a) {
		return escape(a).replace(/\+/g, "%2B")
	};
	l = function(a, d) {
		var b = document.createElement("div");
		b.style.visibility = "hidden";
		b.style.width = "auto";
		if (d) b.style.fontSize = d + "px";
		b.style.position = "absolute";
		b.innerHTML = c.string.encodeHtmlSimple(a);
		document.body.appendChild(b);
		var h = b.offsetWidth;
		document.body.removeChild(b);
		return h
	};
	b.cutByWidth = function(a, d, b) {
		for (var c = a.length; c >= 0; --c) if (a = a.substring(0, c), l(a, d) < b) return a;
		return ""
	};
	b.toString = function(a) {
		return a + ""
	};
	b.template = q;
	b.isURL = p;
	b.parseURL = m;
	b.buildURL = function(a) {
		for (var d = "", b = {}, c = {}, h = 0, e = m.SPEC.length; h < e; h++) {
			var l = m.SPEC[h];
			if (a[l]) {
				switch (l) {
				case "scheme":
					c[l] = "://";
					break;
				case "pass":
					b[l] = ":";
				case "user":
					b.host = "@";
					break;
				case "port":
					b[l] = ":";
					break;
				case "query":
					b[l] = "?";
					break;
				case "fragment":
					b[l] = "#"
				}
				l in b && (d += b[l]);
				l in a && (d += a[l]);
				l in c && (d += c[l])
			}
		}
		return d
	};
	b.mapQuery = function(a) {
		var d, b, a = a || window.location.href,
			c = a.indexOf("?"),
			h = a.substring(c + 1).split("&"),
			e = {};
		if (c === -1) return e;
		for (a = 0; a < h.length; a++) try {
			if (c = h[a].indexOf("="), d = h[a].substring(0, c), b = h[a].substring(c + 1), !(e[d] = unescape(b))) throw Error("uri has wrong query string when run mapQuery.");
		} catch (l) {}
		return e
	};
	b.test = function(a, d, b) {
		return (typeof d == "string" ? RegExp(d, b) : d).test(a)
	};
	b.contains = function(a, d, b) {
		return b ? (b + a + b).indexOf(b + d + b) > -1 : a.indexOf(d) > -1
	};
	b.trim = j;
	b.clean = function(a) {
		return j(a.replace(/\s+/g, " "))
	};
	b.camelCase = function(a) {
		return a.replace(/-\D/g, function(a) {
			return a.charAt(1).toUpperCase()
		})
	};
	b.hyphenate = function(a) {
		return a.replace(/[A-Z]/g, function(a) {
			return "-" + a.charAt(0).toLowerCase()
		})
	};
	b.capitalize = function(a) {
		return a.replace(/\b[a-z]/g, function(a) {
			return a.toUpperCase()
		})
	};
	b.escapeRegExp = function(a) {
		return a.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
	};
	b.toInt = function(a, d) {
		return parseInt(a, d || 10)
	};
	b.toFloat = function(a) {
		return parseFloat(a)
	};
	b.toSingleLine = function(a) {
		return String(a).replace(/\r/gi, "").replace(/\n/gi, "")
	};
	b.toHtml = function(a) {
		return String(a).replace(/&/gi, "&amp;").replace(/\\/gi, "&#92;").replace(/\'/gi, "&#39;").replace(/\"/gi, "&quot;").replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/ /gi, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n\r/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />")
	};
	b.toTitle = function(a) {
		return String(a).replace(/\\/gi, "\\").replace(/\'/gi, "'").replace(/\"/gi, "'")
	};
	b.toQueryPair = n;
	b.toQueryString = function(a) {
		var d = [],
			b;
		for (b in a) d.push(n(b, a[b]));
		return d.join("&")
	};
	b.hexToRgb = function(a, d) {
		var b = a.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return b ? b.slice(1).hexToRgb(d) : null
	};
	b.rgbToHex = function(a, d) {
		var b = a.match(/\d{1,3}/g);
		return b ? b.rgbToHex(d) : null
	};
	b.stripScripts = function(a, d) {
		var b = "",
			c = a.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(a, d) {
				b += d + "\n";
				return ""
			});
		d === !0 ? $exec(b) : $type(d) == "function" && d(b, c);
		return c
	};
	b.substitute = function(a, d, b) {
		return a.replace(b || /\\?\{([^{}]+)\}/g, function(a, b) {
			return a.charAt(0) == "\\" ? a.slice(1) : d[b] != void 0 ? d[b] : ""
		})
	};
	b.replaceAll = function(a, d, b, c) {
		return RegExp.prototype.isPrototypeOf(d) ? a.replace(d, b) : a.replace(RegExp(d, c ? "gi" : "g"), b)
	};
	b.byteLength = g;
	b.cutRight = e;
	b.isNumber = function(a) {
		return a.search(/^\d+$/) !== -1 ? !0 : !1
	};
	b.isEmail = function(a) {
		return a.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1 ? !0 : !1
	};
	b.cutByBytes = function(a, d) {
		for (var b = a; g(b) > d;) b = e(b, 1);
		return b
	};
	b.encodeHtmlSimple = function(a) {
		a = a.replace(/&/g, "&amp;");
		a = a.replace(/>/g, "&gt;");
		a = a.replace(/</g, "&lt;");
		a = a.replace(/"/g, "&quot;");
		return a = a.replace(/'/g, "&#39;")
	};
	b.decodeHtmlSimple = function(a) {
		a = a.replace(/&amp;/g, "&");
		a = a.replace(/&gt;/g, ">");
		a = a.replace(/&lt;/g, "<");
		a = a.replace(/&quot;/g, '"');
		return a = a.replace(/&#39;/g, "'")
	};
	b.decodeHtmlSimple2 = function(a) {
		a = a.replace(/&amp;/g, "&");
		a = a.replace(/&gt;/g, ">");
		a = a.replace(/&lt;/g, "<");
		a = a.replace(/\\\\"/g, '"');
		return a = a.replace(/\\\\'/g, "'")
	};
	b.encodeHtmlAttributeSimple = function(a) {
		a = a.replace(/&/g, "&amp;");
		a = a.replace(/>/g, "&gt;");
		a = a.replace(/</g, "&lt;");
		a = a.replace(/"/g, "&quot;");
		a = a.replace(/'/g, "&#39;");
		a = a.replace(/=/g, "&#61;");
		return a = a.replace(/`/g, "&#96;")
	};
	b.encodeHtmlAttribute = function(a) {
		return a.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function(a) {
			return "&#" + a.charCodeAt(0) + ";"
		})
	};
	b.encodeHtml = k;
	b.encodeScript = function(a) {
		a += "";
		return a.replace(/[\\"']/g, function(a) {
			return "\\" + a
		}).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01")
	};
	b.encodeHrefScript = function(a) {
		return k(h(escScript(a)))
	};
	b.encodeRegExp = function(a) {
		return a.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a) {
			return "\\" + a
		})
	};
	b.encodeUrl = h;
	b.encodeUriComponent = function(a) {
		a = encodeURIComponent(a);
		a = a.replace(/~/g, "%7E");
		a = a.replace(/!/g, "%21");
		a = a.replace(/\*/g, "%2A");
		a = a.replace(/\(/g, "%28");
		a = a.replace(/\)/g, "%29");
		a = a.replace(/'/g, "%27");
		a = a.replace(/\?/g, "%3F");
		return a = a.replace(/;/g, "%3B")
	};
	b.vaildTencentUrl = function(a) {
		return /^(https?:\/\/)?[\w\-.]+\.(qq|paipai|soso|taotao)\.com($|\/|\\)/i.test(a) || /^[\w][\w\/\.\-_%]+$/i.test(a) || /^[\/\\][^\/\\]/i.test(a) ? !0 : !1
	};
	b.vaildUrl = function(a) {
		var a = encodeURI(a).replace(/(^\s*)|(\s*$)/g, ""),
			d = /(^[a-zA-Z0-9]+[^.]):/,
			b = /^[\S.]+\.[\S.]+$/,
			c = /[\w.]+\/(\S*)/,
			h = /^[\s*]*javascript[\s*]*:/;
		!d.test(a) && !b.test(a) ? a = "" : (d.test(a) || (a = "http://" + a), c.test(a) || (a += "/"), h.test(a) && (a = ""));
		return a
	};
	b.getCharWidth = l
});
Jx().$package(function(c) {
	var b = window.JSON || {};
	(function() {
		function c(b) {
			j.lastIndex = 0;
			return j.test(b) ? '"' + b.replace(j, function(b) {
				var c = e[b];
				return typeof c === "string" ? c : "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
			}) + '"' : '"' + b + '"'
		}
		function p(b, e) {
			var o, a, d, f, i = n,
				j, m = e[b];
			m && typeof m === "object" && typeof m.toJSON === "function" && (m = m.toJSON(b));
			typeof k === "function" && (m = k.call(e, b, m));
			switch (typeof m) {
			case "string":
				return c(m);
			case "number":
				return isFinite(m) ? String(m) : "null";
			case "boolean":
			case "null":
				return String(m);
			case "object":
				if (!m) return "null";
				n += g;
				j = [];
				if (Object.prototype.toString.apply(m) === "[object Array]") {
					f = m.length;
					for (o = 0; o < f; o += 1) j[o] = p(o, m) || "null";
					d = j.length === 0 ? "[]" : n ? "[\n" + n + j.join(",\n" + n) + "\n" + i + "]" : "[" + j.join(",") + "]";
					n = i;
					return d
				}
				if (k && typeof k === "object") {
					f = k.length;
					for (o = 0; o < f; o += 1) a = k[o], typeof a === "string" && (d = p(a, m)) && j.push(c(a) + (n ? ": " : ":") + d)
				} else for (a in m) Object.hasOwnProperty.call(m, a) && (d = p(a, m)) && j.push(c(a) + (n ? ": " : ":") + d);
				d = j.length === 0 ? "{}" : n ? "{\n" + n + j.join(",\n" + n) + "\n" + i + "}" : "{" + j.join(",") + "}";
				n = i;
				return d
			}
		}
		var m = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			j = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			n, g, e = {
				"\u0008": "\\b",
				"\t": "\\t",
				"\n": "\\n",
				"\u000c": "\\f",
				"\r": "\\r",
				'"': '\\"',
				"\\": "\\\\"
			},
			k;
		if (typeof b.stringify !== "function") b.stringify = function(b, c, e) {
			var a;
			g = n = "";
			if (typeof e === "number") for (a = 0; a < e; a += 1) g += " ";
			else typeof e === "string" && (g = e);
			if ((k = c) && typeof c !== "function" && (typeof c !== "object" || typeof c.length !== "number")) throw Error("JSON.stringify");
			return p("", {
				"": b
			})
		};
		if (typeof b.parse !== "function") b.parse = function(b, c) {
			function e(a, b) {
				var h, g, k = a[b];
				if (k && typeof k === "object") for (h in k) Object.hasOwnProperty.call(k, h) && (g = e(k, h), g !== void 0 ? k[h] = g : delete k[h]);
				return c.call(a, b, k)
			}
			var a;
			m.lastIndex = 0;
			m.test(b) && (b = b.replace(m, function(a) {
				return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
			}));
			if (/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return a = eval("(" + b + ")"), typeof c === "function" ? e({
				"": a
			}, "") : a;
			throw new SyntaxError("JSON.parse");
		}
	})();
	c.json = b
});
Jx().$package(function(c) {
	var b = c.dom.id,
		q = c.dom,
		p = c.event,
		m;
	if (typeof window.XMLHttpRequest === "undefined") window.XMLHttpRequest = function() {
		return new window.ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP")
	};
	c.http = c.http || {};
	m = function(g, e, k) {
		var h, l, o, a, d = document.getElementsByTagName("head") ? document.getElementsByTagName("head")[0] : document.documentElement,
			f, i = !1,
			j = !1,
			k = k || {};
		o = k.isDefer || !1;
		l = k.query || null;
		arguments = k.arguments || null;
		var n = k.onSuccess ||
		function() {}, v = k.onError ||
		function() {}, r = k.onComplete ||
		function() {}, s, t = k.onTimeout ||
		function() {}, w = k.timeout, y = k.charset ? k.charset : "utf-8", z = k.win || window, A, e = e || "";
		l !== null && (e = e + "?" + l);
		a = m.Id++;
		s = function(a) {
			(a = b("jet_load_" + a)) && d.removeChild(a)
		};
		l = function(d, b, c) {
			return q.node("link", {
				id: "jet_load_" + a,
				type: "text/css",
				charset: c || "utf-8",
				rel: "stylesheet",
				href: d
			}, b)
		};
		g === "script" ? h = k.node ||
		function(d, b, c, f) {
			d = q.node("script", {
				id: "jet_load_" + a,
				type: "text/javascript",
				charset: c || "utf-8",
				src: d
			}, b);
			f && d.setAttribute("defer", "defer");
			return d
		}(e, z, y, o) : g === "css" && (h = k.node || l(e, z, y));
		if (c.browser.engine.trident && parseInt(c.browser.ie) < 9) h.onreadystatechange = function() {
			var d = this.readyState;
			if (d === "loaded" || d === "complete") if (h.onreadystatechange = null, !i) j = !0, window.clearTimeout(f), f = null, A = {}, A.id = a, A.uri = e, A.arguments = arguments, n(A), r(A)
		};
		else if (c.browser.engine.webkit) p.on(h, "load", function() {
			var d;
			if (!i) j = !0, window.clearTimeout(f), f = null, d = {}, d.id = a, d.uri = e, d.arguments = arguments, n(d), r(d), g === "script" && s(a)
		});
		else h.onload = function() {
			var d;
			if (!i) j = !0, window.clearTimeout(f), f = null, d = {}, d.id = a, d.uri = e, d.arguments = k.arguments, n(d), r(d), g === "script" && s(a)
		}, h.onerror = function(d) {
			var b;
			if (!i) j = !0, window.clearTimeout(f), f = null, b = {}, b.id = a, b.uri = e, b.arguments = arguments, b.error = d, v(b), r(b), s(a)
		};
		if (k.node) if (g === "script") h.src = e;
		else {
			if (g === "css") h.href = e
		} else d.appendChild(h);
		g === "script" && w && (f = window.setTimeout(function() {
			var d;
			if (!j) i = !0, d = {}, d.uri = e, d.arguments = arguments, t(d), r(d), s(a)
		}, w));
		o = function(a) {
			this._node = a;
			this._head = d
		};
		o.prototype = {
			abort: function() {
				this._node.src = "";
				this._head.removeChild(this._node);
				delete this._node
			}
		};
		return new o(h)
	};
	m.Id = 0;
	var j, n = {
		_iframes: [],
		_tick: 0,
		_select: function() {
			this._tick++;
			return this._iframes[(this._tick - 1) % this._len]
		},
		init: function(b) {
			if (this._isInit != !0) {
				this._len = b;
				for (var c = document.body, k = 0; k < b; k++) j = q.node("div", {
					"class": "RPCService_hDiv"
				}), q.hide(j), j.innerHTML = '<iframe id="RPCService_hIframe_' + k + '" name="RPCService_hIframe_' + k + '" src="' + alloy.CONST.MAIN_URL + 'domain.html"></iframe>', c.appendChild(j), this._iframes[k] = [j, null, "RPCService_hIframe_" + k];
				this._isInit = !0
			}
		},
		take: function(b) {
			var c = this._select();
			c[1] && c[0].removeChild(c[1]);
			b.setAttribute("target", c[2]);
			c[1] = b;
			c[0].appendChild(b)
		}
	};
	c.http.ajax = function(b, c) {
		var k, h, l, o = !1,
			a = !1,
			c = {
				method: c.method || "GET",
				data: c.data || null,
				arguments: c.arguments || null,
				onSuccess: c.onSuccess ||
				function() {},
				onError: c.onError ||
				function() {},
				onComplete: c.onComplete ||
				function() {},
				onTimeout: c.onTimeout ||
				function() {},
				isAsync: c.isAsync || !0,
				timeout: c.timeout ? c.timeout : 3E4,
				contentType: c.contentType ? c.contentType : "utf-8",
				type: c.type || "xml"
			},
			b = b || "";
		l = c.timeout;
		k = new window.XMLHttpRequest;
		k.open(c.method, b, c.isAsync);
		k.setRequestHeader("Content-Type", c.contentType);
		h = function(a) {
			try {
				return !a.status && location.protocol == "file:" || a.status >= 200 && a.status < 300 || a.status == 304 || navigator.userAgent.indexOf("Safari") > -1 && typeof a.status == "undefined"
			} catch (b) {}
			return !1
		};
		k.onreadystatechange = function() {
			if (k.readyState == 4) {
				if (!o) {
					var d = {};
					d.responseText = k.responseText;
					d.responseXML = k.responseXML;
					d.data = c.data;
					d.status = k.status;
					d.uri = b;
					d.arguments = c.arguments;
					if (h(k)) c.type === "script" && eval.call(window, data), c.onSuccess(d);
					else c.onError(d);
					c.onComplete(d)
				}
				a = !0;
				k = null
			}
		};
		k.send(c.data);
		window.setTimeout(function() {
			var d;
			if (!a) o = !0, d = {}, d.uri = b, d.arguments = c.arguments, c.onTimeout(d), c.onComplete(d)
		}, l);
		return k
	};
	c.http.comet = function(b, e) {
		var b = b || "",
			e = {
				method: e.method || "GET",
				data: e.data || null,
				arguments: e.arguments || null,
				callback: e.callback ||
				function() {},
				onLoad: e.onLoad ||
				function() {},
				contentType: e.contentType ? e.contentType : "utf-8"
			},
			k;
		if (c.browser.ie) {
			k = new ActiveXObject("htmlfile");
			k.open();
			k.close();
			var h = k.createElement("div");
			k.appendChild(h);
			k.parentWindow._parent = self;
			h.innerHTML = '<iframe id="_cometIframe" src="' + b + "?callback=window.parent._parent." + e.callback + '"></iframe>';
			k = k.getElementById("_cometIframe")
		} else k = q.node("iframe"), k.setAttribute("id", "_cometIframe"), k.setAttribute("src", b + "?callback=window.parent._parent." + e.callback), k.style.position = "absolute", k.style.visibility = "hidden", k.style.left = k.style.top = "-999px", k.style.width = k.style.height = "1px", document.body.appendChild(k), self._parent = self;
		p.on(k, "load", e.onLoad);
		return k
	};
	c.http.load = m;
	c.http.loadCss = function(b, c) {
		return m("css", b, c)
	};
	c.http.loadScript = function(b, c) {
		return m("script", b, c)
	};
	c.http.formSend = function(b, c) {
		n.init(2);
		var k = {
			method: c.method || "GET",
			enctype: c.enctype || "",
			data: c.data || {},
			onSuccess: c.onSuccess ||
			function() {},
			onError: c.onError ||
			function() {},
			onComplete: c.onComplete ||
			function() {},
			onTimeout: c.onTimeout ||
			function() {},
			timeout: c.timeout ? c.timeout : 1E4
		},
			h = q.node("form", {
				"class": "RPCService_form",
				method: k.method,
				action: b + "?t=" + (new Date).getTime(),
				enctype: k.enctype
			});
		if (Object.prototype.toString.call(k.data).indexOf("String") > -1) {
			var l = q.node("input");
			l.type = "text";
			l.name = k.data;
			h.appendChild(l)
		} else for (var o in k.data) l = q.node("input"), l.type = "text", l.name = o, l.setAttribute("value", k.data[o]), h.appendChild(l);
		n.take(h);
		h.submit()
	}
});
Jx().$package(function(c) {
	var b = function() {
			function b(l, o) {
				o = o || document;
				if (!/^[\w\-_#]+$/.test(l) && o.querySelectorAll) return c(o.querySelectorAll(l));
				if (l.indexOf(",") > -1) {
					for (var a = l.split(/,/g), d = [], f = 0, i = a.length; f < i; ++f) d = d.concat(b(a[f], o));
					return h(d)
				}
				a = l.match(j);
				f = a.pop();
				d = (f.match(g) || k)[1];
				i = !d && (f.match(n) || k)[1];
				f = !d && (f.match(e) || k)[1];
				if (i && !f && o.getElementsByClassName) f = c(o.getElementsByClassName(i));
				else {
					f = !d && c(o.getElementsByTagName(f || "*"));
					if (i) {
						for (var i = RegExp("(^|\\s)" + i + "(\\s|$)"), u = -1, x, v = -1, r = []; x = f[++u];) i.test(x.className) && (r[++v] = x);
						f = r
					}
					if (d) return (a = o.getElementById(d)) ? [a] : []
				}
				return a[0] && f[0] ? m(a, f) : f
			}
			function c(b) {
				try {
					return Array.prototype.slice.call(b)
				} catch (h) {
					for (var a = [], d = 0, f = b.length; d < f; ++d) a[d] = b[d];
					return a
				}
			}
			function m(b, c, a) {
				var d = b.pop();
				if (d === ">") return m(b, c, !0);
				for (var f = [], h = -1, j = (d.match(g) || k)[1], p = !j && (d.match(n) || k)[1], d = !j && (d.match(e) || k)[1], q = -1, r, s, t, d = d && d.toLowerCase(); r = c[++q];) {
					s = r.parentNode;
					do
					if (t = (t = (t = !d || d === "*" || d === s.nodeName.toLowerCase()) && (!j || s.id === j)) && (!p || RegExp("(^|\\s)" + p + "(\\s|$)").test(s.className)), a || t) break;
					while (s = s.parentNode);
					t && (f[++h] = r)
				}
				return b[0] && f[0] ? m(b, f) : f
			}
			var j = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
				n = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
				g = /^(?:[\w\-_]+)?#([\w\-_]+)/,
				e = /^([\w\*\-_]+)/,
				k = [null, null],
				h = function() {
					var b = +new Date,
						c = function() {
							var a = 1;
							return function(d) {
								var c = d[b],
									h = a++;
								return !c ? (d[b] = h, !0) : !1
							}
						}();
					return function(a) {
						for (var d = a.length, f = [], h = -1, e = 0, g; e < d; ++e) g = a[e], c(g) && (f[++h] = g);
						b += 1;
						return f
					}
				}();
			return b
		}();
	c.dom.mini = b
});
Jx().$package(function(c) {
	c.array = c.array || {};
	var b = c.array,
		q, p, m, j, n, g, e, k, h, l, o, a;
	q = Array.prototype.indexOf ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.indexOf.apply(arguments[0], a)
	} : function(a, b, c) {
		for (c == null ? c = 0 : c < 0 && (c = Math.max(0, a.length + c)); c < a.length; c++) if (a[c] === b) return c;
		return -1
	};
	p = Array.prototype.lastIndexOf ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.lastIndexOf.apply(arguments[0], a)
	} : function(a, b, c) {
		for (c == null ? c = a.length - 1 : c < 0 && (c = Math.max(0, a.length + c)); c >= 0; c--) if (a[c] === b) return c;
		return -1
	};
	m = Array.prototype.forEach ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.forEach.apply(arguments[0], a)
	} : function(a, b, c) {
		var h = a.length;
		if (typeof b != "function") throw new TypeError;
		for (var e = 0; e < h; e++) e in a && b.call(c, a[e], e, a)
	};
	j = Array.prototype.filter ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.filter.apply(arguments[0], a)
	} : function(a, b, c) {
		var h = a.length;
		if (typeof b != "function") throw new TypeError;
		for (var e = [], l = 0; l < h; l++) if (l in a) {
			var g = a[l];
			b.call(c, g, l, a) && e.push(g)
		}
		return e
	};
	n = Array.prototype.some ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.some.apply(arguments[0], a)
	} : function(a, b, c) {
		var h = a.length;
		if (typeof b != "function") throw new TypeError;
		for (var e = 0; e < h; e++) if (e in a && b.call(c, a[e], e, a)) return !0;
		return !1
	};
	g = Array.prototype.map ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.map.apply(arguments[0], a)
	} : function(a, b, c) {
		var h = a.length;
		if (typeof b != "function") throw new TypeError;
		for (var e = Array(h), l = 0; l < h; l++) l in a && (e[l] = b.call(c, a[l], l, a));
		return e
	};
	e = Array.prototype.every ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.every.apply(arguments[0], a)
	} : function(a, b, c) {
		var h = a.length;
		if (typeof b != "function") throw new TypeError;
		for (var e = 0; e < h; e++) if (e in a && !b.call(c, a[e], e, a)) return !1;
		return !0
	};
	k = Array.prototype.reduce ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.reduce.apply(arguments[0], a)
	} : function(a, b) {
		var c = a.length >>> 0;
		if (typeof b != "function") throw new TypeError;
		if (c == 0 && arguments.length == 2) throw new TypeError;
		var h = 0;
		if (arguments.length >= 3) var e = arguments[2];
		else {
			do {
				if (h in a) {
					e = a[h++];
					break
				}
				if (++h >= c) throw new TypeError;
			} while (1)
		}
		for (; h < c; h++) h in a && (e = b.call(null, e, a[h], h, a));
		return e
	};
	h = Array.prototype.reduceRight ?
	function() {
		var a = Array.prototype.slice.call(arguments, 1);
		return Array.prototype.reduceRight.apply(arguments[0], a)
	} : function(a, b) {
		var c = a.length >>> 0;
		if (typeof b != "function") throw new TypeError;
		if (c == 0 && arguments.length == 2) throw new TypeError;
		c -= 1;
		if (arguments.length >= 3) var h = arguments[2];
		else {
			do {
				if (c in a) {
					h = a[c--];
					break
				}
				if (--c < 0) throw new TypeError;
			} while (1)
		}
		for (; c >= 0; c--) c in a && (h = b.call(null, h, a[c], c, a));
		return h
	};
	l = function(a) {
		var b = c.$typeof(a);
		return b ? b != "array" && b != "arguments" ? [a] : a : []
	};
	o = function(a, b) {
		return q(a, b) > -1
	};
	a = function(a) {
		for (var b = [], c = 0, h = a.length; c < h; c++) o(b, a[c]) || b.push(a[c]);
		return b
	};
	b.indexOf = q;
	b.lastIndexOf = p;
	b.forEach = m;
	b.filter = j;
	b.some = n;
	b.map = g;
	b.every = e;
	b.reduce = k;
	b.reduceRight = h;
	b.toArray = l;
	b.remove = function(a, b) {
		var b = l(b),
			c, h, e = !1;
		for (c = 0; c < b.length; c++) for (h = 0; h < a.length; h++) a[h] === b[c] && (a.splice(h, 1), e = !0);
		return e
	};
	b.replace = function(a, b, c) {
		for (; 0 < a.length; ij++) if (a[0] === b) return a[0] = c, !0;
		return !1
	};
	b.bubbleSort = function(a, b) {
		for (var b = b ||
		function(a, b) {
			return a - b
		}, c = a.length, h, e, l = 0; l < c - 1; l++) {
			e = !1;
			for (var g = c - 1; g > l; g--) b(a[g], a[g - 1]) < 0 && (e = !0, h = a[g - 1], a[g - 1] = a[g], a[g] = h);
			if (!e) break
		}
		return a
	};
	b.binarySearch = function(a, b, c) {
		for (var h = 0, e = a.length, l = Math.floor(a.length / 2); e != l;) c(b, a[l]) > 0 ? h = l + 1 : e = l, l = Math.floor((h + e) / 2);
		return l
	};
	b.contains = o;
	b.uniquelize = a;
	b.intersect = function(a, b) {
		for (var c = [], h = 0, e = a.length; h < e; h++) o(b, a[h]) && c.push(a[h]);
		return c
	};
	b.minus = function(a, b) {
		for (var c = [], h = 0, e = a.length; h < e; h++) o(b, a[h]) || c.push(a[h]);
		return c
	};
	b.union = function(b, c) {
		return a(b.concat(c))
	}
});
Jx().$package(function(c) {
	var b = c.dom.id,
		q = c.dom,
		p = c.event,
		m = c.string,
		j = c.http,
		n = this,
		g = c.string.mapQuery(window.location.search),
		e = window.open;
	window.open = function(b, l, g, a) {
		l == void 0 && (l = "_blank");
		g == void 0 && (g = "");
		a == void 0 && (a = !1);
		return !e(b, l, g, a) ? (c.out("\u4f60\u7684\u673a\u5668\u4e0a\u6709\u8f6f\u4ef6\u62e6\u622a\u4e86\u5f39\u51fa\u7a97\u53e3"), !1) : !0
	};
	var k = new c.Class({
		_defaultType: 3,
		_defaultTag: "information",
		_defaultTemplate: "<%=msg%>(<%=type%>#<%=tag%>@<%=time%>)",
		TYPE: ["PROFILE", "WARNING", "ERROR", "INFO", "DEBUG"],
		init: function(b) {
			this.msg = b.msg || "";
			this.tag = b.tag || this._defaultTag;
			this.type = c.isUndefined(b.type) ? this._defaultType : b.type;
			this.time = (new Date).valueOf();
			this._template = b.template || this._defaultTemplate
		},
		format: function(b, c, e) {
			e = e || this._template;
			return c ? m.encodeHtml(m.template(e, b)) : m.template(e, b)
		},
		parseOption: function() {
			return {
				msg: this.msg,
				time: this.time,
				type: this.TYPE[this.type],
				tag: this.tag
			}
		},
		toString: function(b, c) {
			return this.format(this.parseOption(), b, c || this._template)
		}
	});
	c.config = {
		debugLevel: 1
	};
	c.console = {};
	c.Report = {
		receive: c.emptyFunc,
		addRule: c.emptyFunc
	};
	c.extend(c.console, {
		_isCreated: !1,
		_maxLength: 1E3,
		_html: '<div id="ConsoleBoxHead" class="consoleBoxHead">\t\t\t\t\t\t<a href="###" id="ConsoleCloseButton" class="consoleCloseButton" title="\u5173\u95ed">X</a>\t\t\t\t\t\t<a href="###" id="ConsoleClearButton" class="consoleCloseButton" title="\u6e05\u9664\u6240\u6709\u65e5\u5fd7">cls</a>\t\t\t\t\t\t<a href="###" id="ConsoleRefreshButton" class="consoleCloseButton" title="\u8fd8\u539f\u6240\u6709\u65e5\u5fd7">r</a>\t\t\t\t\t\t<a href="###" id="ConsoleHelpButton" class="consoleCloseButton" title="\u63a7\u5236\u53f0\u5e2e\u52a9">H</a>\t\t\t\t\t\t<h5 class="title" title="\u63a7\u5236\u53f0">Console</h5>\t\t\t\t\t</div>\t\t\t\t\t<div id="consoleMain" class="consoleMain">\t\t\t\t\t\t<ul id="ConsoleOutput" class="consoleOutput"></ul>\t\t\t\t\t</div>\t\t\t\t\t<div class="consoleInputBox">\t\t\t\t\t\t&gt;<input id="ConsoleInput" class="consoleInput" title="\u8bf7\u8f93\u5165\u63a7\u5236\u53f0\u6307\u4ee4\u6216\u8005Javascript\u8bed\u53e5..." />\t\t\t\t\t</div>',
		_opened: !1,
		_log_record: [],
		_cmd_history: [],
		_cmd_last_index: 0,
		isCustomConsole: !0,
		_templateArr: ["<%=msg%>", "<%=msg%>(<%=type%>#<%=tag%>@<%=time%>)"],
		_templateType: 0,
		_typeInfo: [
			["log_profile_type", "\u2514"],
			["log_warning_type", "!"],
			["log_error_type", "x"],
			["log_info_type", "i"],
			["log_debug_type", "\u221a"]
		],
		TYPE: {
			PROFILE: 0,
			WARNING: 1,
			ERROR: 2,
			INFO: 3,
			DEBUG: 4
		},
		show: function() {
			this._isCreated || this._create();
			this._opened = !0;
			this._main.style.display = "block";
			this.render();
			window.setTimeout(c.bind(this.focusCommandLine, this), 0)
		},
		hide: function(b) {
			b && b.preventDefault();
			this.clear();
			c.console._main.style.display = "none";
			c.console._opened = !1
		},
		enable: function() {
			c.option.console = !0;
			this.show()
		},
		disable: function() {
			c.option.console = !1;
			this.hide()
		},
		_init: function() {
			p.on(document, "keydown", c.bind(this.handleDocumentKeydown, this));
			c.option.console && this.show();
			this.setToDebug()
		},
		_create: function() {
			j.loadCss(c.path + "assets/jet.css");
			this._main = document.createElement("div");
			this._main.id = "JxConsole";
			this._main.style.display = "none";
			this._main.className = "consoleBox";
			this._main.innerHTML = this._html;
			window.document.body.appendChild(this._main);
			var h = q.getClientWidth(),
				e = q.getClientHeight(),
				h = h - 210 - 300;
			q.setStyle(this._main, "top", e - 50 - 310 + "px");
			q.setStyle(this._main, "left", h + "px");
			this._headEl = b("ConsoleBoxHead");
			this._inputEl = b("ConsoleInput");
			this._closeButtonEl = b("ConsoleCloseButton");
			this._clsButtonEl = b("ConsoleClearButton");
			this._refreshButtonEl = b("ConsoleRefreshButton");
			this._helpButtonEl = b("ConsoleHelpButton");
			this._outputEl = b("ConsoleOutput");
			this._consoleMainEl = b("consoleMain");
			c.ui.Drag && new c.ui.Drag(this._headEl, this._main);
			p.on(this._inputEl, "keyup", c.bind(this.onInputKeyup, this));
			p.on(this._clsButtonEl, "click", c.bind(this.clear, this));
			p.on(this._refreshButtonEl, "click", c.bind(this.refresh, this));
			p.on(this._helpButtonEl, "click", c.bind(this.help, this));
			p.on(this._closeButtonEl, "click", c.bind(this.hide, this));
			e = {
				hScrollbar: !0,
				vScrollbar: !0,
				checkDOMChanges: !1,
				desktopCompatibility: !0
			};
			if (c.browser.mobileSafari && c.ui.iScroll && !this.consoleScroller) this.consoleScroller = new c.ui.iScroll(this._outputEl, e), c.debug("!!!!2", "console");
			this._isCreated = !0
		},
		handleDocumentKeydown: function(b) {
			switch (b.keyCode) {
			case 192:
				b.ctrlKey && b.shiftKey && (this.toggleShow(), b.preventDefault())
			}
		},
		focusCommandLine: function() {
			this._inputEl.focus()
		},
		toggleShow: function() {
			this._opened ? this.hide() : this.show()
		},
		outConsoleShow: function(b, e) {
			this.outConsole(b, e);
			!this._opened && c.option.console && this.show()
		},
		outConsole: function(b) {
			if (this._opened) {
				var e = document.createElement("li");
				this._outputEl.appendChild(e);
				var g = c.console._typeInfo[b.type] || c.console._typeInfo[0],
					a = this._templateArr[this._templateType];
				e.className = g[0];
				e.innerHTML = '<div class="log_icon" title="' + g[0] + '">' + g[1] + '</div><div class="log_text">' + b.toString(!0, a) + "</div>";
				this.consoleScroller && this.consoleScroller.refresh();
				this._consoleMainEl.scrollTop = this._consoleMainEl.scrollHeight
			}
		},
		print: function(b) {
			var c = document.createElement("li");
			this._outputEl.appendChild(c);
			c.innerHTML = b;
			this._consoleMainEl.scrollTop = this._consoleMainEl.scrollHeight
		},
		out: function(b, c, e) {
			var a = this._templateArr[this._templateType],
				b = new k({
					msg: b,
					tag: c,
					type: e
				});
			this.logRecord(b);
			g && g.consolefilter ? b.tag == g.consolefilter && (this.isCustomConsole ? this.outConsole(b) : n.console.log(b.toString(!1, a))) : this.isCustomConsole ? this.outConsole(b) : n.console.log(b.toString(!1, a))
		},
		profile: function(b, c) {
			this.out(b, c || "system", 0)
		},
		warn: function(b, c) {
			this.out(b, c, 1)
		},
		error: function(b, c) {
			this.out(b, c, 2)
		},
		info: function(b, c) {
			this.out(b, c, 3)
		},
		debug: function(b, c) {
			this.out(b, c, 4)
		},
		setToDebug: function() {
			this.isCustomConsole = g.console && g.console == "firebug" ? !1 : !0
		},
		setToNoDebug: function() {
			this.out = c.emptyFunc
		},
		logRecord: function(b) {
			this._log_record.push(b);
			g.console || this._log_record.length > this._maxLength && this._log_record.shift()
		},
		setTemplate: function(b) {
			if (this._templateArr[b]) this._templateType = b
		},
		filter: function(b) {
			var e = RegExp(b, "i"),
				g = [];
			c.array.forEach(this._log_record, function(a) {
				var b = a.toString(!0);
				e.test(b) && g.push(a)
			});
			return g
		},
		filterByType: function(b, e) {
			var g = [],
				b = b || [];
			c.array.forEach(b, function(a) {
				var b = !1;
				c.array.forEach(e, function(c) {
					a.type == c && (b = !0)
				});
				b && g.push(a)
			});
			return g
		},
		filterByTag: function(b, e) {
			var g = [],
				b = b || [];
			c.array.forEach(b, function(a) {
				var b = !1;
				c.array.forEach(e, function(c) {
					a.tag == c && (b = !0)
				});
				b && g.push(a)
			});
			return g
		},
		filterByMsg: function(b, e) {
			var g = [],
				b = b || [];
			c.array.forEach(b, function(a) {
				var b = !1;
				c.array.forEach(e, function(c) {
					a.msg.indexOf(c) > -1 && (b = !0)
				});
				b && g.push(a)
			});
			return g
		},
		getReport: function(b, e, g) {
			var a = [],
				d = this._log_record,
				f = this;
			!b || b == "" ? b = !1 : c.isArray(b) || (b = [b]);
			!e || e == "" ? e = !1 : c.isArray(e) || (e = [e]);
			!g || g == "" ? g = !1 : c.isArray(g) || (g = [g]);
			b && (d = this.filterByType(d, b));
			e && (d = this.filterByTag(d, e));
			g && (d = this.filterByMsg(d, g));
			c.array.forEach(d, function(b) {
				a.push(b.toString(!1, f._templateArr[1]))
			});
			return a.join(",")
		},
		render: function(b, e) {
			b = b || this._log_record;
			e || (b = b.slice(-15));
			var g = this;
			g.clear();
			c.array.forEach(b, function(a) {
				g.outConsole(a)
			})
		},
		clear: function(b) {
			b && b.preventDefault();
			c.console._outputEl.innerHTML = ""
		},
		refresh: function(b) {
			b && b.preventDefault();
			this.clear();
			this.render()
		},
		help: function(b) {
			b && b.preventDefault();
			this.print("&lt;&lt; Console Help &gt;&gt;<br/>\t\t\t\t\t\t\t\thelp|h  : \u63a7\u5236\u53f0\u5e2e\u52a9<br/>\t\t\t\t\t\t\t\tclear|cls : \u6e05\u7a7a\u63a7\u5236\u53f0\u8f93\u51fa<br/>\t\t\t\t\t\t\t\trefresh|r : \u5237\u65b0\u63a7\u5236\u53f0\u8f93\u51fa<br/>\t\t\t\t\t\t\t\tfilter|f : \u8fc7\u6ee4\u63a7\u5236\u53f0\u8f93\u51fa<br/>\t\t\t\t\t\t\t\tsetTemplate|s : \u8bbe\u7f6e\u8f93\u51fa\u6a21\u7248\u7c7b\u578b<br/>\t\t\t\t\t\t\t\thide  : \u9690\u85cf\u63a7\u5236\u53f0\uff0c\u6216\u8005\u4f7f\u7528 Ctrl+Shift+`[~] \u5feb\u6377\u952e")
		},
		onInputKeyup: function(b) {
			switch (b.keyCode) {
			case 13:
				this._cmd_history.push(c.console._inputEl.value);
				this._cmd_last_index = this._cmd_history.length;
				this._execCommand(c.console._inputEl.value);
				break;
			case 38:
				if (this._cmd_history.length == 0) break;
				b = "";
				this._cmd_last_index > 0 ? (this._cmd_last_index--, b = this._cmd_history[this._cmd_last_index]) : this._cmd_last_index = -1;
				c.console._inputEl.value = b;
				break;
			case 40:
				if (this._cmd_history.length == 0) break;
				b = "";
				this._cmd_last_index < this._cmd_history.length - 1 ? (this._cmd_last_index++, b = this._cmd_history[this._cmd_last_index]) : this._cmd_last_index = this._cmd_history.length;
				c.console._inputEl.value = b
			}
		},
		_execCommand: function(b) {
			b == "help" || b == "h" ? this.help() : b == "clear" || b == "cls" ? c.console.clear() : b == "hide" ? c.console.hide() : b == "refresh" || b == "r" ? this.refresh() : b == "showall" || b == "sa" ? (this.clear(), this.render(null, !0)) : RegExp(/^(?:filter|f)(?:\(|\s+)(.+)(?:\)|\s*)$/i).test(b) ? (b = eval("this.filter('" + RegExp.$1 + "')"), b.length > 0 ? this.render(b, !0) : (this.clear(), this.out("NO RESULT!", 1))) : RegExp(/^(?:setTemplate|s)(?:\(|\s+)(\d+)(?:\)|\s*)$/i).test(b) ? (this.setTemplate(parseInt(RegExp.$1)), this.refresh()) : this._execScript(b);
			c.console._inputEl.value = ""
		},
		_execScript: function(b) {
			var e = '<span style="color:#ccff00">' + b + "</span><br/>";
			try {
				e += (eval(b) || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;"), c.console.print(e, 0)
			} catch (g) {
				e += g.description, c.console.print(e, 1)
			}
		}
	});
	c.profile = c.console.profile;
	c.warn = c.console.warn;
	c.error = c.console.error;
	c.info = c.console.info;
	c.debug = c.console.debug;
	p.onDomReady(function() {
		c.console._init();
		if (g.console == "true") c.console = c.extend(c.console, {
			profile: c.emptyFunc,
			warn: c.emptyFunc,
			error: c.emptyFunc,
			info: c.emptyFunc,
			debug: c.emptyFunc
		}), c.console.show()
	});
	g.console && g.console == "firebug" && (n.console || j.loadScript(c.path + "firebug/firebug-lite.js", {
		onSuccess: function() {
			if (firebug) firebug.env.height = 220, firebug.env.css = "../../source/firebug/firebug-lite.css", c.out("...\u63a7\u5236\u53f0\u5f00\u542f"), c.out("...\u6d4b\u8bd5\u6210\u529f")
		}
	}));
	c.runtime = function() {
		function b() {
			return c.config.debugLevel > 0
		}
		function e(a, d) {
			var f;
			b() ? f = a + "\n=STACK=\n" + g() : d == "error" && (f = a);
			c.Debug.errorLogs.push(f)
		}
		function g(a, b) {
			function c(a, b) {
				if (a.stack) return a.stack;
				else if (a.message.indexOf("\nBacktrace:\n") >= 0) {
					var d = 0;
					return a.message.split("\nBacktrace:\n")[1].replace(/\s*\n\s*/g, function() {
						d++;
						return d % 2 == 0 ? "\n" : " @ "
					})
				} else {
					for (var e = b.callee == g ? b.callee.caller : b.callee, f = e.arguments, h = [], l = 0, i = f.length; l < i; l++) h.push(typeof f[l] == "undefined" ? "<u>" : f[l] === null ? "<n>" : f[l]);
					f = /function\s+([^\s\(]+)\(/;
					return ((f.test(e.toString()) ? f.exec(e.toString())[1] : "<ANON>") + "(" + h.join() + ");").replace(/\n/g, "")
				}
			}
			var e;
			if (a instanceof Error && typeof arguments == "object" && arguments.callee) e = c(a, b);
			else try {
				({}).sds()
			} catch (h) {
				e = c(h, arguments)
			}
			return e.replace(/\n/g, " <= ")
		}
		return {
			stack: g,
			warn: function(a, b) {
				e(write.apply(null, arguments), "warn")
			},
			error: function(a, b) {
				e(write.apply(null, arguments), "error")
			},
			isDebugMode: b
		}
	}()
});
Jx().$package("alloy", function(c) {
	var b = this,
		q = c.event,
		p = +new Date,
		m = {},
		j = {},
		n = !1,
		g = !1,
		e = [],
		k = !1,
		h = [],
		l = window,
		o = document,
		a = location,
		d = a.protocol,
		a = a.host,
		f = {
			PATTERN: /top|parent|frames\[(?:(?:['"][a-zA-Z\d-_%\.]*['"])|\d+)\]/,
			WQKEY: null,
			MSGNAME: "crossframe:message",
			CFPROXY: "alloy.proxy.html",
			CGI_SERVER: "http://cgi.web2.qq.com/",
			MAIN_DOMAIN: null,
			PROXY: null,
			REGHOST: RegExp("^" + d + "//(" + a + ")/.*"),
			REGPROXY: RegExp("^" + d + "//" + a + "/(.+)")
		},
		i = function(a) {
			x();
			g ? a.call(b) : e.push(a)
		},
		u = function() {
			if (!g && (g = !0, e)) {
				for (var a, c = 0; a = e[c++];) a.call(b);
				e = null
			}
		},
		x = function() {
			if (!n) n = !0, o.attachEvent ? (o.attachEvent("onreadystatechange", function() {
				o.readyState === "complete" && (o.detachEvent("onreadystatechange", arguments.callee), u())
			}), o.documentElement.doScroll && l == l.top &&
			function() {
				if (!g) {
					try {
						o.documentElement.doScroll("left")
					} catch (a) {
						setTimeout(arguments.callee, 0);
						return
					}
					u()
				}
			}()) : o.addEventListener && o.addEventListener("DOMContentLoaded", function() {
				o.removeEventListener("DOMContentLoaded", arguments.callee, !1);
				u()
			}, !1), l.attachEvent ? l.attachEvent("onload", u) : l.addEventListener ? l.addEventListener("load", u, !1) : l.onload = u
		},
		v = function(a) {
			if (c.isUndefined(a) || c.isUndefined(a.key) || c.isUndefined(a.cmd) || c.isUndefined(a.host)) return null;
			var b = {
				key: a.key,
				type: a.type,
				cmd: a.cmd,
				host: a.host,
				event: a.event
			},
				d = a.type == "event" ? j : m;
			a.proxy && (b.proxy = a.proxy);
			!c.isUndefined(a.param) && (b.param = a.param);
			if (!c.isUndefined(a.onSuccess) || !c.isUndefined(a.onError)) {
				var e = d[++p] = {};
				!c.isUndefined(a.onSuccess) && (e.suc = a.onSuccess);
				!c.isUndefined(a.onError) && (e.err = a.onError);
				b.seq = p
			} else if (a.cmd == "addEventListener") e = d[++p] = {}, e.event = a.event, e.handler = a.handler, b.seq = p;
			else if (a.cmd == "removeEventListener") if (c.isUndefined(a.handler)) for (e in j) d = j[e], d.event === a.event && delete j[e];
			else for (e in j) d = j[e], d.event === a.event && d.handler === a.handler && delete j[e];
			return c.json.stringify(b)
		},
		r = function(a, b, d) {
			var d = d || {},
				e = v(d),
				h, g;
			cfProxys = o.getElementById("webqq_cfproxys") || o.body;
			if (!c.isUndefined(a) && !c.isUndefined(b) && f.PATTERN.test(a)) {
				if (!e) throw Error("error message!");
				if (c.isUndefined(l.postMessage)) {
					var i = function() {
							h = "http://" + b + "/" + f.CFPROXY + "#" + t({
								target: a,
								host: b
							});
							g = o.createElement("div");
							g.innerHTML = '<iframe name="' + encodeURIComponent(e) + '" src="' + h + '" onload="alloy.removeCF(this)"></iframe>';
							cfProxys.appendChild(g)
						};
					if (d.host && /qq\.com$/.test(d.host)) try {
						var j = eval(a);
						j.Jet().event.notifyObservers(j.alloy, f.MSGNAME, c.json.parse(e))
					} catch (k) {
						i()
					} else i()
				} else a = eval(a), a.postMessage(e, "http://" + b)
			}
		},
		s = function() {},
		t = function(a) {
			var b = [],
				c;
			for (c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
			return b.join("&")
		},
		w = {};
	this.CONST = {};
	this.onDomReady = i;
	this.onReady = function(a) {
		if (c.isFunction(a)) if (k) this.onDomReady(a);
		else h.push(a)
	};
	this.getScript = function(a) {
		var a = a || {},
			b = !1,
			c = a.url || "",
			d = a.type || "script",
			e = a.param || {},
			f = a.onSuccess || s,
			h, g = o.getElementsByTagName("head")[0] || o.documentElement,
			i = o.createElement("script");
		if (a.charset) i.charset = a.charset;
		c += (/\?/.test(c) ? "&" : "?") + t(e);
		if (d === "jsonp") h = "jsonp" + p++, l[h] = function(a) {
			f(a);
			l[h] = void 0;
			try {
				delete l[h]
			} catch (b) {}
			g && g.removeChild(i)
		}, c += "&retype=2&callback=?", c = c.replace(/\=\?(&|$)/, "=" + h + "$1");
		else if (d === "script") i.onload = i.onreadystatechange = function() {
			if (!b && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) b = !0, f(), i.onload = i.onreadystatechange = null, g && i.parentNode && g.removeChild(i)
		};
		i.src = c;
		g.insertBefore(i, g.lastChild)
	};
	this.registerSDK = function(a) {
		for (var b = 0, d = a.length, e; b < d; b++) if (e = a[b], !c.isUndefined(e[0]) && c.isFunction(e[1])) w[String(e[0])] = {
			api: e[1]
		};
		else if (!c.isUndefined(e[0]) && !c.isUndefined(e[1]) && !c.isUndefined(e[2]) && (w[String(e[0])] = {
			method: String(e[1]),
			url: String(e[2])
		}, !c.isUndefined(e[3]))) w[String(e[0])].makeParam = e[3]
	};
	this.api = function(a, b) {
		if (c.isUndefined(a)) throw Error("api param error!");
		var d = f.REGHOST.exec(location.href);
		if (d) {
			var e = w[a],
				g;
			if (e) {
				if (e.api) {
					e.api(b);
					return
				}
				if (!f.APPID) throw Error("no openkey!");
				g = {
					param: {
						method: e.method,
						url: e.url,
						param: {
							appid: f.APPID
						}
					}
				};
				c.isUndefined(e.makeParam) ? c.extend(g.param.param, b.param) : (e = e.makeParam(b.param), c.extend(g.param.param, c.isObject(e) ? e : {
					r: e
				}));
				!c.isUndefined(b.onSuccess) && (g.onSuccess = b.onSuccess);
				!c.isUndefined(b.onError) && (g.onError = b.onError);
				b = g;
				a = "util.cgiSend"
			}
			d = {
				key: f.WQKEY,
				type: "method",
				cmd: a,
				host: d[1]
			};
			f.PROXY && (d.proxy = f.PROXY);
			if (!c.isUndefined(b))!c.isUndefined(b.param) && (d.param = b.param), !c.isUndefined(b.onSuccess) && (d.onSuccess = b.onSuccess), !c.isUndefined(b.onError) && (d.onError = b.onError);
			r("parent", f.MAIN_DOMAIN, d)
		}
	};
	this.setProxy = function(a) {
		if (a = f.REGPROXY.exec(a)) f.PROXY = a[1]
	};
	this.removeCF = function(a) {
		a && l.setTimeout(function() {
			var b = a.parentNode;
			b.parentNode.removeChild(b);
			a = null
		}, 1E3)
	};
	this.addEventListener = function(a, d) {
		b.api("report.apiCallCnt", {
			param: {
				event: a
			}
		});
		if (c.isUndefined(a) || c.isUndefined(d)) throw Error("addEventListener param error!");
		var e = f.REGHOST.exec(location.href);
		if (e) e = {
			key: f.WQKEY,
			host: e[1],
			type: "event",
			cmd: "addEventListener",
			event: a,
			handler: d
		}, f.PROXY && (e.proxy = f.PROXY), r("parent", f.MAIN_DOMAIN, e)
	};
	this.removeEventListener = function(a, b) {
		if (c.isUndefined(a)) throw Error("removeEventListener param error!");
		var d = f.REGHOST.exec(location.href);
		if (d) d = {
			key: f.WQKEY,
			host: d[1],
			type: "event",
			cmd: "removeEventListener",
			event: a,
			handler: b
		}, f.PROXY && (d.proxy = f.PROXY), r("parent", f.MAIN_DOMAIN, d)
	};
	this.on = this.addEventListener;
	this.off = this.removeEventListener;
	this.registerSDK([
		["account.check", function(a) {
			(a.onSuccess || s)(b.CONST)
		}],
		["account.bind", "POST", f.CGI_SERVER + "api/app/bind", function(a) {
			return c.json.stringify(a)
		}],
		["account.unbind", "POST", f.CGI_SERVER + "api/app/unbind", function(a) {
			return c.json.stringify(a)
		}],
		["system.getToken", "POST", f.CGI_SERVER + "api/system/gettoken"]
	]);
	(function(a, d) {
		var e = a.name;
		if (e == "") throw Error("window name error!");
		e = c.json.parse(decodeURIComponent(e));
		if (e.appid && e.webqqkey && e.webqqdomain) f.APPID = e.appid, f.WQKEY = e.webqqkey, f.MAIN_DOMAIN = e.webqqdomain, f.MAIN_URL = "http://" + f.MAIN_DOMAIN, c.isUndefined(a.postMessage) ? i(function() {
			var a = d.createElement("div"),
				b = a.style;
			a.id = "webqq_cfproxys";
			b.width = 0;
			b.height = 0;
			b.display = "none";
			d.body.appendChild(a)
		}) : (e = function(b) {
			if (b.origin != f.MAIN_URL || !b.source) throw Error("illegal origin or source in onmessage !");
			b = c.json.parse(b.data);
			q.notifyObservers(a, f.MSGNAME, b)
		}, a.attachEvent ? a.attachEvent("onmessage", e) : a.addEventListener ? a.addEventListener("message", e, !1) : a.onmessage = e), q.addObserver(a, "loadApp", function() {
			k = !0;
			b.onDomReady(function() {
				if (h) {
					for (var a, b = 0; a = h[b++];) a();
					h = null
				}
			})
		}), i(function() {
			alloy.system.getLoginState(function() {
				q.notifyObservers(a, "loadApp", {})
			});
			var e, f, g, h = d.getElementsByTagName("head")[0];
			h && (e = h.getElementsByTagName("base")[0]);
			e && (f = e.getAttribute("target"));
			g = f === "_blank";
			q.on(d, "click", function(a) {
				for (var d = a.target; d;) {
					if (d.tagName === "A" && (g || d.getAttribute("target") && d.getAttribute("target").toLowerCase() === "_blank")) {
						a.preventDefault();
						a.stopPropagation();
						b.system.openURL({
							url: c.dom.getHref(d)
						});
						break
					}
					d = d.parentNode
				}
			})
		}), q.addObserver(a, f.MSGNAME, function(a) {
			var b = +a.ret,
				d = a.seq;
			if (!c.isUndefined(a) && !c.isUndefined(b) && !c.isUndefined(d)) a = a.result, b = b === 0 ? "suc" : "err", m[d] && m[d][b] ? (m[d][b](a), delete m[d]) : j[d] && j[d].handler && j[d].handler(a)
		}), q.on(a, "unload", function() {
			j = m = null
		})
	})(l, o)
});
(function(c) {
	for (var b = Jx(), q = b.event, p = [
		["system.alert"],
		["system.confirm"],
		["system.getLoginState"],
		["system.showLoginBox"],
		["system.isAppInstalled"],
		["system.isAppRunning"],
		["system.isLocked"],
		["system.openURL"],
		["system.runApp"],
		["system.runAppMarket"],
		["system.runBrowser"],
		["system.runIME"],
		["system.runHandWrite"],
		["system.runQQ"],
		["system.runSettingCenter"],
		["system.installApp"],
		["system.search"],
		["system.getToken"],
		["system.getUinAndSkey"],
		["system.getVersion"],
		["system.showShareBox"],
		["system.getAppInfo"],
		["system.openFile"],
		["system.isWebTop"],
		["window.setExitConfirm"],
		["window.removeExitConfirm"],
		["window.close"],
		["window.fullScreen"],
		["window.getRunOption"],
		["window.max"],
		["window.min"],
		["window.restore"],
		["window.setButton"],
		["window.setCenter"],
		["window.setCurrent"],
		["window.setNotCurrent"],
		["window.setWinSize"],
		["window.setBodySize"],
		["window.setBorderOpacity"],
		["window.setOpacity"],
		["window.setStyle"],
		["window.setTitle"],
		["window.setToolbar"],
		["window.setToolbarButton"],
		["window.setXY"],
		["window.getXY"],
		["window.getRestoreXY"],
		["window.startDrag"],
		["window.enableIframeDrag", function(c) {
			q.on(c, "drag", function(c) {
				c.preventDefault();
				c.stopPropagation();
				(!b.browser.ie || !(b.browser.ie <= 6 && (c.target.tagName == "A" || c.target.parentNode && c.target.parentNode.tagName == "A"))) && alloy.widget.startDrag([c.pageX, c.pageY])
			})
		}],
		["widget.setExitConfirm"],
		["widget.removeExitConfirm"],
		["widget.close"],
		["widget.getRunOption"],
		["widget.setButton"],
		["widget.setCurrent"],
		["widget.setNotCurrent"],
		["widget.setOpacity"],
		["widget.setXY"],
		["widget.getXY"],
		["widget.setWinSize"],
		["widget.setBodySize"],
		["widget.setBodySize"],
		["widget.startDrag"],
		["widget.enableIframeDrag", function(c) {
			q.on(c, "drag", function(c) {
				c.preventDefault();
				c.stopPropagation();
				(!b.browser.ie || !(b.browser.ie <= 6 && (c.target.tagName == "A" || c.target.parentNode && c.target.parentNode.tagName == "A"))) && alloy.widget.startDrag([c.pageX, c.pageY])
			})
		}],
		["layout.applyScene"],
		["layout.applySkin"],
		["layout.applyTheme"],
		["layout.applyWallpaper"],
		["layout.setScene"],
		["layout.setSkin"],
		["layout.setTheme"],
		["layout.setWallpaper"],
		["layout.getDesktopSize"],
		["layout.getAvailSize"],
		["layout.getClientSize"],
		["layout.showDesktop"],
		["sound.play"],
		["sound.setMute"],
		["sound.isMute"],
		["sound.setVolume"],
		["sound.getVolume"],
		["account.check"],
		["account.bind"],
		["account.unbind"],
		["report.report2app"],
		["report.apiCallCnt"],
		["qq.isLogin"],
		["account.setSignature", function(e, g, j) {
			b.isFunction(e) && (j = j || g, g = e, e = void 0);
			confirm("\u786e\u5b9a\u8981\u8bbe\u7f6e\u7b7e\u540d\u5417\uff1f") && c.api("account.setSignature", {
				param: e,
				onSuccess: g,
				onError: j
			})
		}],
		["user.getNick"],
		["user.getProfile"],
		["user.setProfile"],
		["system.setOpenURL", function(e, g) {
			var j = document,
				a = function() {},
				d = function(a) {
					a.preventDefault();
					a.stopPropagation();
					c.system.openURL({
						url: b.dom.getHref(a.currentTarget)
					});
					return !1
				};
			b.isFunction(e) && (g = e, e = j);
			var e = e && e.nodeType ? e : j,
				g = b.isFunction(g) ? g : a,
				f, i, a = j.getElementsByTagName("head")[0],
				j = e.getElementsByTagName("a");
			a && (f = a.getElementsByTagName("base")[0]);
			f && (i = f.getAttribute("target"));
			f = i === "_blank";
			i = 0;
			for (var a = j.length, k, m; i < a; i++) if (k = j[i], m = k.getAttribute("target"), m === "_blank" || !m && f) m = g(k), m !== !1 && q.addEventListener(k, "click", d)
		}],
		["component.inviteInstallAppByTips"],
		["component.inviteInstallAppByC2C"],
		["component.shareMsg"],
		["component.shareMsgByC2C"],
		["component.shareApp"]
	], m = function(e) {
			return function(g, j, a) {
				b.isFunction(g) && (a = a || j, j = g, g = void 0);
				c.api(e, {
					param: g,
					onSuccess: j,
					onError: a
				})
			}
		}, j = function(b, e) {
			return function() {
				e.apply(this, arguments);
				c.api("report.apiCallCnt", {
					param: {
						cmd: b
					}
				})
			}
		}, n = function(e, g) {
			var k, a, d, f = e.split("."),
				i = c;
			k = 0;
			for (a = f.length - 1; k < a; k++) d = f[k], i[d] = i[d] || {}, i = i[f[k]];
			d = f[k];
			i[d] = b.isFunction(i[d]) ? i[d] : !b.isFunction(g) ? m(e) : j(e, g)
		}, g = 0, e = p.length, k; g < e; g++) k = p[g], n(k[0], k[1])
})(alloy);