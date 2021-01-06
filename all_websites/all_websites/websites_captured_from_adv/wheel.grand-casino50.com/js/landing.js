window.Modernizr = function (n, t, e) {
  function o(n) {
    v.cssText = n
  }

  function r(n, t) {
    return typeof n === t
  }

  function i(n, t) {
    return !!~("" + n).indexOf(t)
  }

  function s(n, t) {
    for (var o in n) {
      var r = n[o];
      if (!i(r, "-") && v[r] !== e) return "pfx" == t ? r : !0
    }
    return !1
  }

  function a(n, t, o) {
    for (var i in n) {
      var s = t[n[i]];
      if (s !== e) return o === !1 ? n[i] : r(s, "function") ? s.bind(o || t) : s
    }
    return !1
  }

  function c(n, t, e) {
    var o = n.charAt(0).toUpperCase() + n.slice(1), i = (n + " " + h.join(o + " ") + o).split(" ");
    return r(t, "string") || r(t, "undefined") ? s(i, t) : (i = (n + " " + g.join(o + " ") + o).split(" "), a(i, t, e))
  }

  var f, u, l, d = "2.6.2", p = {}, m = t.documentElement, w = "modernizr", y = t.createElement(w), v = y.style,
    b = ({}.toString, "Webkit Moz O ms"), h = b.split(" "), g = b.toLowerCase().split(" "), C = {}, A = [], L = A.slice,
    P = {}.hasOwnProperty;
  l = r(P, "undefined") || r(P.call, "undefined") ? function (n, t) {
    return t in n && r(n.constructor.prototype[t], "undefined")
  } : function (n, t) {
    return P.call(n, t)
  }, Function.prototype.bind || (Function.prototype.bind = function (n) {
    var t = this;
    if ("function" != typeof t) throw new TypeError;
    var e = L.call(arguments, 1), o = function () {
      if (this instanceof o) {
        var r = function () {
        };
        r.prototype = t.prototype;
        var i = new r, s = t.apply(i, e.concat(L.call(arguments)));
        return Object(s) === s ? s : i
      }
      return t.apply(n, e.concat(L.call(arguments)))
    };
    return o
  }), C.cssanimations = function () {
    return c("animationName")
  };
  for (var T in C) l(C, T) && (u = T.toLowerCase(), p[u] = C[T](), A.push((p[u] ? "" : "no-") + u));
  return p.addTest = function (n, t) {
    if ("object" == typeof n) for (var o in n) l(n, o) && p.addTest(o, n[o]); else {
      if (n = n.toLowerCase(), p[n] !== e) return p;
      t = "function" == typeof t ? t() : t, "undefined" != typeof enableClasses && enableClasses && (m.className += " " + (t ? "" : "no-") + n), p[n] = t
    }
    return p
  }, o(""), y = f = null, p._version = d, p._domPrefixes = g, p._cssomPrefixes = h, p.testProp = function (n) {
    return s([n])
  }, p.testAllProps = c, p
}(this, this.document), function () {
  function n() {
    r || (t.animate({opacity: 0}, 700).delay(500).animate({opacity: .99}, 800), setTimeout(n, 2e3))
  }

  var t = ($("#btn"), $("#btn_over")), e = navigator.userAgent, o = e.toLowerCase().indexOf("opera");
  if (-1 == o && Modernizr.cssanimations) t.addClass("css3animated"); else {
    var r = !1;
    n(), t.on({
      mouseenter: function () {
        t.stop(!0, !1).animate({opacity: .99}, 200), r = !0
      }, mouseleave: function () {
        r = !1, n()
      }
    })
  }
 
}();
