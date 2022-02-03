(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, n = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = n ? `${n}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !n),
            !n && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !n && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    n = (e, t = 500, n = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          n && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = n ? `${n}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } })
              );
          }, t);
      }
    },
    i = !0,
    s = (e = 500) => {
      document.documentElement.classList.contains("lock") ? r(e) : o(e);
    },
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < n.length; e++) {
            n[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < n.length; e++) {
          n[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    };
  function a(e, t) {
    const n = Array.from(e).filter(function (e, n, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (n.length) {
      const e = [];
      n.forEach((n) => {
        const i = {},
          s = n.dataset[t].split(",");
        (i.value = s[0]),
          (i.type = s[1] ? s[1].trim() : "max"),
          (i.item = n),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = (function (e) {
        return e.filter(function (e, t, n) {
          return n.indexOf(e) === t;
        });
      })(i);
      const s = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const n = t.split(","),
              i = n[1],
              r = n[2],
              o = window.matchMedia(n[0]),
              a = e.filter(function (e) {
                if (e.value === i && e.type === r) return !0;
              });
            s.push({ itemsArray: a, matchMedia: o });
          }),
          s
        );
    }
  }
  e.popup = new (class {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this)
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const n = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${n}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : s(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          i &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            s(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        n = Array.prototype.slice.call(t),
        i = n.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (n[n.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== n.length - 1 || (n[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging &&
        (function (e) {
          setTimeout(() => {
            window.FLS && console.log(e);
          }, 0);
        })(`[Попапос]: ${e}`);
    }
  })({});
  function l(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function c(e) {
    return e instanceof l(e).Element || e instanceof Element;
  }
  function d(e) {
    return e instanceof l(e).HTMLElement || e instanceof HTMLElement;
  }
  function p(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof l(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var u = Math.max,
    f = Math.min,
    h = Math.round;
  function m(e, t) {
    void 0 === t && (t = !1);
    var n = e.getBoundingClientRect(),
      i = 1,
      s = 1;
    if (d(e) && t) {
      var r = e.offsetHeight,
        o = e.offsetWidth;
      o > 0 && (i = h(n.width) / o || 1), r > 0 && (s = h(n.height) / r || 1);
    }
    return {
      width: n.width / i,
      height: n.height / s,
      top: n.top / s,
      right: n.right / i,
      bottom: n.bottom / s,
      left: n.left / i,
      x: n.left / i,
      y: n.top / s,
    };
  }
  function g(e) {
    var t = l(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function v(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function b(e) {
    return ((c(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function y(e) {
    return m(b(e)).left + g(e).scrollLeft;
  }
  function w(e) {
    return l(e).getComputedStyle(e);
  }
  function x(e) {
    var t = w(e),
      n = t.overflow,
      i = t.overflowX,
      s = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + s + i);
  }
  function T(e, t, n) {
    void 0 === n && (n = !1);
    var i,
      s,
      r = d(t),
      o =
        d(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = h(t.width) / e.offsetWidth || 1,
            i = h(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== i;
        })(t),
      a = b(t),
      c = m(e, o),
      p = { scrollLeft: 0, scrollTop: 0 },
      u = { x: 0, y: 0 };
    return (
      (r || (!r && !n)) &&
        (("body" !== v(t) || x(a)) &&
          (p =
            (i = t) !== l(i) && d(i)
              ? { scrollLeft: (s = i).scrollLeft, scrollTop: s.scrollTop }
              : g(i)),
        d(t)
          ? (((u = m(t, !0)).x += t.clientLeft), (u.y += t.clientTop))
          : a && (u.x = y(a))),
      {
        x: c.left + p.scrollLeft - u.x,
        y: c.top + p.scrollTop - u.y,
        width: c.width,
        height: c.height,
      }
    );
  }
  function S(e) {
    var t = m(e),
      n = e.offsetWidth,
      i = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - i) <= 1 && (i = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
    );
  }
  function E(e) {
    return "html" === v(e)
      ? e
      : e.assignedSlot || e.parentNode || (p(e) ? e.host : null) || b(e);
  }
  function C(e) {
    return ["html", "body", "#document"].indexOf(v(e)) >= 0
      ? e.ownerDocument.body
      : d(e) && x(e)
      ? e
      : C(E(e));
  }
  function O(e, t) {
    var n;
    void 0 === t && (t = []);
    var i = C(e),
      s = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
      r = l(i),
      o = s ? [r].concat(r.visualViewport || [], x(i) ? i : []) : i,
      a = t.concat(o);
    return s ? a : a.concat(O(E(o)));
  }
  function L(e) {
    return ["table", "td", "th"].indexOf(v(e)) >= 0;
  }
  function A(e) {
    return d(e) && "fixed" !== w(e).position ? e.offsetParent : null;
  }
  function k(e) {
    for (var t = l(e), n = A(e); n && L(n) && "static" === w(n).position; )
      n = A(n);
    return n &&
      ("html" === v(n) || ("body" === v(n) && "static" === w(n).position))
      ? t
      : n ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              d(e) &&
              "fixed" === w(e).position
            )
              return null;
            for (var n = E(e); d(n) && ["html", "body"].indexOf(v(n)) < 0; ) {
              var i = w(n);
              if (
                "none" !== i.transform ||
                "none" !== i.perspective ||
                "paint" === i.contain ||
                -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                (t && "filter" === i.willChange) ||
                (t && i.filter && "none" !== i.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var M = "top",
    P = "bottom",
    $ = "right",
    _ = "left",
    D = "auto",
    I = [M, P, $, _],
    B = "start",
    j = "end",
    z = "viewport",
    H = "popper",
    N = I.reduce(function (e, t) {
      return e.concat([t + "-" + B, t + "-" + j]);
    }, []),
    G = [].concat(I, [D]).reduce(function (e, t) {
      return e.concat([t, t + "-" + B, t + "-" + j]);
    }, []),
    q = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function V(e) {
    var t = new Map(),
      n = new Set(),
      i = [];
    function s(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var i = t.get(e);
              i && s(i);
            }
          }),
        i.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || s(e);
      }),
      i
    );
  }
  var W = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function F() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function R(e) {
    void 0 === e && (e = {});
    var t = e,
      n = t.defaultModifiers,
      i = void 0 === n ? [] : n,
      s = t.defaultOptions,
      r = void 0 === s ? W : s;
    return function (e, t, n) {
      void 0 === n && (n = r);
      var s,
        o,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, W, r),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        l = [],
        d = !1,
        p = {
          state: a,
          setOptions: function (n) {
            var s = "function" == typeof n ? n(a.options) : n;
            u(),
              (a.options = Object.assign({}, r, a.options, s)),
              (a.scrollParents = {
                reference: c(e)
                  ? O(e)
                  : e.contextElement
                  ? O(e.contextElement)
                  : [],
                popper: O(t),
              });
            var o = (function (e) {
              var t = V(e);
              return q.reduce(function (e, n) {
                return e.concat(
                  t.filter(function (e) {
                    return e.phase === n;
                  })
                );
              }, []);
            })(
              (function (e) {
                var t = e.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(i, a.options.modifiers))
            );
            return (
              (a.orderedModifiers = o.filter(function (e) {
                return e.enabled;
              })),
              a.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  i = void 0 === n ? {} : n,
                  s = e.effect;
                if ("function" == typeof s) {
                  var r = s({ state: a, name: t, instance: p, options: i }),
                    o = function () {};
                  l.push(r || o);
                }
              }),
              p.update()
            );
          },
          forceUpdate: function () {
            if (!d) {
              var e = a.elements,
                t = e.reference,
                n = e.popper;
              if (F(t, n)) {
                (a.rects = {
                  reference: T(t, k(n), "fixed" === a.options.strategy),
                  popper: S(n),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (e) {
                    return (a.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var i = 0; i < a.orderedModifiers.length; i++)
                  if (!0 !== a.reset) {
                    var s = a.orderedModifiers[i],
                      r = s.fn,
                      o = s.options,
                      l = void 0 === o ? {} : o,
                      c = s.name;
                    "function" == typeof r &&
                      (a =
                        r({ state: a, options: l, name: c, instance: p }) || a);
                  } else (a.reset = !1), (i = -1);
              }
            }
          },
          update:
            ((s = function () {
              return new Promise(function (e) {
                p.forceUpdate(), e(a);
              });
            }),
            function () {
              return (
                o ||
                  (o = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (o = void 0), e(s());
                    });
                  })),
                o
              );
            }),
          destroy: function () {
            u(), (d = !0);
          },
        };
      if (!F(e, t)) return p;
      function u() {
        l.forEach(function (e) {
          return e();
        }),
          (l = []);
      }
      return (
        p.setOptions(n).then(function (e) {
          !d && n.onFirstUpdate && n.onFirstUpdate(e);
        }),
        p
      );
    };
  }
  var Y = { passive: !0 };
  const X = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (e) {
      var t = e.state,
        n = e.instance,
        i = e.options,
        s = i.scroll,
        r = void 0 === s || s,
        o = i.resize,
        a = void 0 === o || o,
        c = l(t.elements.popper),
        d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
      return (
        r &&
          d.forEach(function (e) {
            e.addEventListener("scroll", n.update, Y);
          }),
        a && c.addEventListener("resize", n.update, Y),
        function () {
          r &&
            d.forEach(function (e) {
              e.removeEventListener("scroll", n.update, Y);
            }),
            a && c.removeEventListener("resize", n.update, Y);
        }
      );
    },
    data: {},
  };
  function U(e) {
    return e.split("-")[0];
  }
  function K(e) {
    return e.split("-")[1];
  }
  function Q(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function J(e) {
    var t,
      n = e.reference,
      i = e.element,
      s = e.placement,
      r = s ? U(s) : null,
      o = s ? K(s) : null,
      a = n.x + n.width / 2 - i.width / 2,
      l = n.y + n.height / 2 - i.height / 2;
    switch (r) {
      case M:
        t = { x: a, y: n.y - i.height };
        break;
      case P:
        t = { x: a, y: n.y + n.height };
        break;
      case $:
        t = { x: n.x + n.width, y: l };
        break;
      case _:
        t = { x: n.x - i.width, y: l };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var c = r ? Q(r) : null;
    if (null != c) {
      var d = "y" === c ? "height" : "width";
      switch (o) {
        case B:
          t[c] = t[c] - (n[d] / 2 - i[d] / 2);
          break;
        case j:
          t[c] = t[c] + (n[d] / 2 - i[d] / 2);
      }
    }
    return t;
  }
  var Z = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function ee(e) {
    var t,
      n = e.popper,
      i = e.popperRect,
      s = e.placement,
      r = e.variation,
      o = e.offsets,
      a = e.position,
      c = e.gpuAcceleration,
      d = e.adaptive,
      p = e.roundOffsets,
      u = e.isFixed,
      f = o.x,
      m = void 0 === f ? 0 : f,
      g = o.y,
      v = void 0 === g ? 0 : g,
      y = "function" == typeof p ? p({ x: m, y: v }) : { x: m, y: v };
    (m = y.x), (v = y.y);
    var x = o.hasOwnProperty("x"),
      T = o.hasOwnProperty("y"),
      S = _,
      E = M,
      C = window;
    if (d) {
      var O = k(n),
        L = "clientHeight",
        A = "clientWidth";
      if (
        (O === l(n) &&
          "static" !== w((O = b(n))).position &&
          "absolute" === a &&
          ((L = "scrollHeight"), (A = "scrollWidth")),
        (O = O),
        s === M || ((s === _ || s === $) && r === j))
      )
        (E = P),
          (v -=
            (u && C.visualViewport ? C.visualViewport.height : O[L]) -
            i.height),
          (v *= c ? 1 : -1);
      if (s === _ || ((s === M || s === P) && r === j))
        (S = $),
          (m -=
            (u && C.visualViewport ? C.visualViewport.width : O[A]) - i.width),
          (m *= c ? 1 : -1);
    }
    var D,
      I = Object.assign({ position: a }, d && Z),
      B =
        !0 === p
          ? (function (e) {
              var t = e.x,
                n = e.y,
                i = window.devicePixelRatio || 1;
              return { x: h(t * i) / i || 0, y: h(n * i) / i || 0 };
            })({ x: m, y: v })
          : { x: m, y: v };
    return (
      (m = B.x),
      (v = B.y),
      c
        ? Object.assign(
            {},
            I,
            (((D = {})[E] = T ? "0" : ""),
            (D[S] = x ? "0" : ""),
            (D.transform =
              (C.devicePixelRatio || 1) <= 1
                ? "translate(" + m + "px, " + v + "px)"
                : "translate3d(" + m + "px, " + v + "px, 0)"),
            D)
          )
        : Object.assign(
            {},
            I,
            (((t = {})[E] = T ? v + "px" : ""),
            (t[S] = x ? m + "px" : ""),
            (t.transform = ""),
            t)
          )
    );
  }
  const te = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          i = t.attributes[e] || {},
          s = t.elements[e];
        d(s) &&
          v(s) &&
          (Object.assign(s.style, n),
          Object.keys(i).forEach(function (e) {
            var t = i[e];
            !1 === t
              ? s.removeAttribute(e)
              : s.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var i = t.elements[e],
              s = t.attributes[e] || {},
              r = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            d(i) &&
              v(i) &&
              (Object.assign(i.style, r),
              Object.keys(s).forEach(function (e) {
                i.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  const ne = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function (e) {
      var t = e.state,
        n = e.options,
        i = e.name,
        s = n.offset,
        r = void 0 === s ? [0, 0] : s,
        o = G.reduce(function (e, n) {
          return (
            (e[n] = (function (e, t, n) {
              var i = U(e),
                s = [_, M].indexOf(i) >= 0 ? -1 : 1,
                r =
                  "function" == typeof n
                    ? n(Object.assign({}, t, { placement: e }))
                    : n,
                o = r[0],
                a = r[1];
              return (
                (o = o || 0),
                (a = (a || 0) * s),
                [_, $].indexOf(i) >= 0 ? { x: a, y: o } : { x: o, y: a }
              );
            })(n, t.rects, r)),
            e
          );
        }, {}),
        a = o[t.placement],
        l = a.x,
        c = a.y;
      null != t.modifiersData.popperOffsets &&
        ((t.modifiersData.popperOffsets.x += l),
        (t.modifiersData.popperOffsets.y += c)),
        (t.modifiersData[i] = o);
    },
  };
  var ie = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function se(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return ie[e];
    });
  }
  var re = { start: "end", end: "start" };
  function oe(e) {
    return e.replace(/start|end/g, function (e) {
      return re[e];
    });
  }
  function ae(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && p(n)) {
      var i = t;
      do {
        if (i && e.isSameNode(i)) return !0;
        i = i.parentNode || i.host;
      } while (i);
    }
    return !1;
  }
  function le(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function ce(e, t) {
    return t === z
      ? le(
          (function (e) {
            var t = l(e),
              n = b(e),
              i = t.visualViewport,
              s = n.clientWidth,
              r = n.clientHeight,
              o = 0,
              a = 0;
            return (
              i &&
                ((s = i.width),
                (r = i.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((o = i.offsetLeft), (a = i.offsetTop))),
              { width: s, height: r, x: o + y(e), y: a }
            );
          })(e)
        )
      : c(t)
      ? (function (e) {
          var t = m(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(t)
      : le(
          (function (e) {
            var t,
              n = b(e),
              i = g(e),
              s = null == (t = e.ownerDocument) ? void 0 : t.body,
              r = u(
                n.scrollWidth,
                n.clientWidth,
                s ? s.scrollWidth : 0,
                s ? s.clientWidth : 0
              ),
              o = u(
                n.scrollHeight,
                n.clientHeight,
                s ? s.scrollHeight : 0,
                s ? s.clientHeight : 0
              ),
              a = -i.scrollLeft + y(e),
              l = -i.scrollTop;
            return (
              "rtl" === w(s || n).direction &&
                (a += u(n.clientWidth, s ? s.clientWidth : 0) - r),
              { width: r, height: o, x: a, y: l }
            );
          })(b(e))
        );
  }
  function de(e, t, n) {
    var i =
        "clippingParents" === t
          ? (function (e) {
              var t = O(E(e)),
                n =
                  ["absolute", "fixed"].indexOf(w(e).position) >= 0 && d(e)
                    ? k(e)
                    : e;
              return c(n)
                ? t.filter(function (e) {
                    return c(e) && ae(e, n) && "body" !== v(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      s = [].concat(i, [n]),
      r = s[0],
      o = s.reduce(function (t, n) {
        var i = ce(e, n);
        return (
          (t.top = u(i.top, t.top)),
          (t.right = f(i.right, t.right)),
          (t.bottom = f(i.bottom, t.bottom)),
          (t.left = u(i.left, t.left)),
          t
        );
      }, ce(e, r));
    return (
      (o.width = o.right - o.left),
      (o.height = o.bottom - o.top),
      (o.x = o.left),
      (o.y = o.top),
      o
    );
  }
  function pe(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function ue(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function fe(e, t) {
    void 0 === t && (t = {});
    var n = t,
      i = n.placement,
      s = void 0 === i ? e.placement : i,
      r = n.boundary,
      o = void 0 === r ? "clippingParents" : r,
      a = n.rootBoundary,
      l = void 0 === a ? z : a,
      d = n.elementContext,
      p = void 0 === d ? H : d,
      u = n.altBoundary,
      f = void 0 !== u && u,
      h = n.padding,
      g = void 0 === h ? 0 : h,
      v = pe("number" != typeof g ? g : ue(g, I)),
      y = p === H ? "reference" : H,
      w = e.rects.popper,
      x = e.elements[f ? y : p],
      T = de(c(x) ? x : x.contextElement || b(e.elements.popper), o, l),
      S = m(e.elements.reference),
      E = J({ reference: S, element: w, strategy: "absolute", placement: s }),
      C = le(Object.assign({}, w, E)),
      O = p === H ? C : S,
      L = {
        top: T.top - O.top + v.top,
        bottom: O.bottom - T.bottom + v.bottom,
        left: T.left - O.left + v.left,
        right: O.right - T.right + v.right,
      },
      A = e.modifiersData.offset;
    if (p === H && A) {
      var k = A[s];
      Object.keys(L).forEach(function (e) {
        var t = [$, P].indexOf(e) >= 0 ? 1 : -1,
          n = [M, P].indexOf(e) >= 0 ? "y" : "x";
        L[e] += k[n] * t;
      });
    }
    return L;
  }
  function he(e, t, n) {
    return u(e, f(t, n));
  }
  const me = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        i = e.name,
        s = n.mainAxis,
        r = void 0 === s || s,
        o = n.altAxis,
        a = void 0 !== o && o,
        l = n.boundary,
        c = n.rootBoundary,
        d = n.altBoundary,
        p = n.padding,
        h = n.tether,
        m = void 0 === h || h,
        g = n.tetherOffset,
        v = void 0 === g ? 0 : g,
        b = fe(t, { boundary: l, rootBoundary: c, padding: p, altBoundary: d }),
        y = U(t.placement),
        w = K(t.placement),
        x = !w,
        T = Q(y),
        E = "x" === T ? "y" : "x",
        C = t.modifiersData.popperOffsets,
        O = t.rects.reference,
        L = t.rects.popper,
        A =
          "function" == typeof v
            ? v(Object.assign({}, t.rects, { placement: t.placement }))
            : v,
        D =
          "number" == typeof A
            ? { mainAxis: A, altAxis: A }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, A),
        I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        j = { x: 0, y: 0 };
      if (C) {
        if (r) {
          var z,
            H = "y" === T ? M : _,
            N = "y" === T ? P : $,
            G = "y" === T ? "height" : "width",
            q = C[T],
            V = q + b[H],
            W = q - b[N],
            F = m ? -L[G] / 2 : 0,
            R = w === B ? O[G] : L[G],
            Y = w === B ? -L[G] : -O[G],
            X = t.elements.arrow,
            J = m && X ? S(X) : { width: 0, height: 0 },
            Z = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            ee = Z[H],
            te = Z[N],
            ne = he(0, O[G], J[G]),
            ie = x
              ? O[G] / 2 - F - ne - ee - D.mainAxis
              : R - ne - ee - D.mainAxis,
            se = x
              ? -O[G] / 2 + F + ne + te + D.mainAxis
              : Y + ne + te + D.mainAxis,
            re = t.elements.arrow && k(t.elements.arrow),
            oe = re ? ("y" === T ? re.clientTop || 0 : re.clientLeft || 0) : 0,
            ae = null != (z = null == I ? void 0 : I[T]) ? z : 0,
            le = q + se - ae,
            ce = he(m ? f(V, q + ie - ae - oe) : V, q, m ? u(W, le) : W);
          (C[T] = ce), (j[T] = ce - q);
        }
        if (a) {
          var de,
            pe = "x" === T ? M : _,
            ue = "x" === T ? P : $,
            me = C[E],
            ge = "y" === E ? "height" : "width",
            ve = me + b[pe],
            be = me - b[ue],
            ye = -1 !== [M, _].indexOf(y),
            we = null != (de = null == I ? void 0 : I[E]) ? de : 0,
            xe = ye ? ve : me - O[ge] - L[ge] - we + D.altAxis,
            Te = ye ? me + O[ge] + L[ge] - we - D.altAxis : be,
            Se =
              m && ye
                ? (function (e, t, n) {
                    var i = he(e, t, n);
                    return i > n ? n : i;
                  })(xe, me, Te)
                : he(m ? xe : ve, me, m ? Te : be);
          (C[E] = Se), (j[E] = Se - me);
        }
        t.modifiersData[i] = j;
      }
    },
    requiresIfExists: ["offset"],
  };
  const ge = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        n = e.state,
        i = e.name,
        s = e.options,
        r = n.elements.arrow,
        o = n.modifiersData.popperOffsets,
        a = U(n.placement),
        l = Q(a),
        c = [_, $].indexOf(a) >= 0 ? "height" : "width";
      if (r && o) {
        var d = (function (e, t) {
            return pe(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : ue(e, I)
            );
          })(s.padding, n),
          p = S(r),
          u = "y" === l ? M : _,
          f = "y" === l ? P : $,
          h =
            n.rects.reference[c] +
            n.rects.reference[l] -
            o[l] -
            n.rects.popper[c],
          m = o[l] - n.rects.reference[l],
          g = k(r),
          v = g ? ("y" === l ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
          b = h / 2 - m / 2,
          y = d[u],
          w = v - p[c] - d[f],
          x = v / 2 - p[c] / 2 + b,
          T = he(y, x, w),
          E = l;
        n.modifiersData[i] = (((t = {})[E] = T), (t.centerOffset = T - x), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        n = e.options.element,
        i = void 0 === n ? "[data-popper-arrow]" : n;
      null != i &&
        ("string" != typeof i || (i = t.elements.popper.querySelector(i))) &&
        ae(t.elements.popper, i) &&
        (t.elements.arrow = i);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function ve(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function be(e) {
    return [M, $, P, _].some(function (t) {
      return e[t] >= 0;
    });
  }
  var ye = R({
      defaultModifiers: [
        X,
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = J({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = n.gpuAcceleration,
              s = void 0 === i || i,
              r = n.adaptive,
              o = void 0 === r || r,
              a = n.roundOffsets,
              l = void 0 === a || a,
              c = {
                placement: U(t.placement),
                variation: K(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: s,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                ee(
                  Object.assign({}, c, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: o,
                    roundOffsets: l,
                  })
                )
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  ee(
                    Object.assign({}, c, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: l,
                    })
                  )
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        te,
        ne,
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name;
            if (!t.modifiersData[i]._skip) {
              for (
                var s = n.mainAxis,
                  r = void 0 === s || s,
                  o = n.altAxis,
                  a = void 0 === o || o,
                  l = n.fallbackPlacements,
                  c = n.padding,
                  d = n.boundary,
                  p = n.rootBoundary,
                  u = n.altBoundary,
                  f = n.flipVariations,
                  h = void 0 === f || f,
                  m = n.allowedAutoPlacements,
                  g = t.options.placement,
                  v = U(g),
                  b =
                    l ||
                    (v === g || !h
                      ? [se(g)]
                      : (function (e) {
                          if (U(e) === D) return [];
                          var t = se(e);
                          return [oe(e), t, oe(t)];
                        })(g)),
                  y = [g].concat(b).reduce(function (e, n) {
                    return e.concat(
                      U(n) === D
                        ? (function (e, t) {
                            void 0 === t && (t = {});
                            var n = t,
                              i = n.placement,
                              s = n.boundary,
                              r = n.rootBoundary,
                              o = n.padding,
                              a = n.flipVariations,
                              l = n.allowedAutoPlacements,
                              c = void 0 === l ? G : l,
                              d = K(i),
                              p = d
                                ? a
                                  ? N
                                  : N.filter(function (e) {
                                      return K(e) === d;
                                    })
                                : I,
                              u = p.filter(function (e) {
                                return c.indexOf(e) >= 0;
                              });
                            0 === u.length && (u = p);
                            var f = u.reduce(function (t, n) {
                              return (
                                (t[n] = fe(e, {
                                  placement: n,
                                  boundary: s,
                                  rootBoundary: r,
                                  padding: o,
                                })[U(n)]),
                                t
                              );
                            }, {});
                            return Object.keys(f).sort(function (e, t) {
                              return f[e] - f[t];
                            });
                          })(t, {
                            placement: n,
                            boundary: d,
                            rootBoundary: p,
                            padding: c,
                            flipVariations: h,
                            allowedAutoPlacements: m,
                          })
                        : n
                    );
                  }, []),
                  w = t.rects.reference,
                  x = t.rects.popper,
                  T = new Map(),
                  S = !0,
                  E = y[0],
                  C = 0;
                C < y.length;
                C++
              ) {
                var O = y[C],
                  L = U(O),
                  A = K(O) === B,
                  k = [M, P].indexOf(L) >= 0,
                  j = k ? "width" : "height",
                  z = fe(t, {
                    placement: O,
                    boundary: d,
                    rootBoundary: p,
                    altBoundary: u,
                    padding: c,
                  }),
                  H = k ? (A ? $ : _) : A ? P : M;
                w[j] > x[j] && (H = se(H));
                var q = se(H),
                  V = [];
                if (
                  (r && V.push(z[L] <= 0),
                  a && V.push(z[H] <= 0, z[q] <= 0),
                  V.every(function (e) {
                    return e;
                  }))
                ) {
                  (E = O), (S = !1);
                  break;
                }
                T.set(O, V);
              }
              if (S)
                for (
                  var W = function (e) {
                      var t = y.find(function (t) {
                        var n = T.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (E = t), "break";
                    },
                    F = h ? 3 : 1;
                  F > 0;
                  F--
                ) {
                  if ("break" === W(F)) break;
                }
              t.placement !== E &&
                ((t.modifiersData[i]._skip = !0),
                (t.placement = E),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        me,
        ge,
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              s = t.rects.popper,
              r = t.modifiersData.preventOverflow,
              o = fe(t, { elementContext: "reference" }),
              a = fe(t, { altBoundary: !0 }),
              l = ve(o, i),
              c = ve(a, s, r),
              d = be(l),
              p = be(c);
            (t.modifiersData[n] = {
              referenceClippingOffsets: l,
              popperEscapeOffsets: c,
              isReferenceHidden: d,
              hasPopperEscaped: p,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": d,
                "data-popper-escaped": p,
              }));
          },
        },
      ],
    }),
    we = "tippy-content",
    xe = "tippy-backdrop",
    Te = "tippy-arrow",
    Se = "tippy-svg-arrow",
    Ee = { passive: !0, capture: !0 },
    Ce = function () {
      return document.body;
    };
  function Oe(e, t, n) {
    if (Array.isArray(e)) {
      var i = e[t];
      return null == i ? (Array.isArray(n) ? n[t] : n) : i;
    }
    return e;
  }
  function Le(e, t) {
    var n = {}.toString.call(e);
    return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
  }
  function Ae(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function ke(e, t) {
    return 0 === t
      ? e
      : function (i) {
          clearTimeout(n),
            (n = setTimeout(function () {
              e(i);
            }, t));
        };
    var n;
  }
  function Me(e) {
    return [].concat(e);
  }
  function Pe(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function $e(e) {
    return e.split("-")[0];
  }
  function _e(e) {
    return [].slice.call(e);
  }
  function De(e) {
    return Object.keys(e).reduce(function (t, n) {
      return void 0 !== e[n] && (t[n] = e[n]), t;
    }, {});
  }
  function Ie() {
    return document.createElement("div");
  }
  function Be(e) {
    return ["Element", "Fragment"].some(function (t) {
      return Le(e, t);
    });
  }
  function je(e) {
    return Le(e, "MouseEvent");
  }
  function ze(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function He(e) {
    return Be(e)
      ? [e]
      : (function (e) {
          return Le(e, "NodeList");
        })(e)
      ? _e(e)
      : Array.isArray(e)
      ? e
      : _e(document.querySelectorAll(e));
  }
  function Ne(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function Ge(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function qe(e) {
    var t,
      n = Me(e)[0];
    return null != n && null != (t = n.ownerDocument) && t.body
      ? n.ownerDocument
      : document;
  }
  function Ve(e, t, n) {
    var i = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[i](t, n);
    });
  }
  function We(e, t) {
    for (var n = t; n; ) {
      var i;
      if (e.contains(n)) return !0;
      n =
        null == n.getRootNode || null == (i = n.getRootNode())
          ? void 0
          : i.host;
    }
    return !1;
  }
  var Fe = { isTouch: !1 },
    Re = 0;
  function Ye() {
    Fe.isTouch ||
      ((Fe.isTouch = !0),
      window.performance && document.addEventListener("mousemove", Xe));
  }
  function Xe() {
    var e = performance.now();
    e - Re < 20 &&
      ((Fe.isTouch = !1), document.removeEventListener("mousemove", Xe)),
      (Re = e);
  }
  function Ue() {
    var e = document.activeElement;
    if (ze(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var Ke =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var Qe = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    Je = Object.assign(
      {
        appendTo: Ce,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      Qe,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    Ze = Object.keys(Je);
  function et(e) {
    var t = (e.plugins || []).reduce(function (t, n) {
      var i,
        s = n.name,
        r = n.defaultValue;
      s && (t[s] = void 0 !== e[s] ? e[s] : null != (i = Je[s]) ? i : r);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function tt(e, t) {
    var n = Object.assign(
      {},
      t,
      { content: Ae(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (
              t ? Object.keys(et(Object.assign({}, Je, { plugins: t }))) : Ze
            ).reduce(function (t, n) {
              var i = (e.getAttribute("data-tippy-" + n) || "").trim();
              if (!i) return t;
              if ("content" === n) t[n] = i;
              else
                try {
                  t[n] = JSON.parse(i);
                } catch (e) {
                  t[n] = i;
                }
              return t;
            }, {});
          })(e, t.plugins)
    );
    return (
      (n.aria = Object.assign({}, Je.aria, n.aria)),
      (n.aria = {
        expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
        content:
          "auto" === n.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : n.aria.content,
      }),
      n
    );
  }
  function nt(e, t) {
    e.innerHTML = t;
  }
  function it(e) {
    var t = Ie();
    return (
      !0 === e
        ? (t.className = Te)
        : ((t.className = Se), Be(e) ? t.appendChild(e) : nt(t, e)),
      t
    );
  }
  function st(e, t) {
    Be(t.content)
      ? (nt(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? nt(e, t.content) : (e.textContent = t.content));
  }
  function rt(e) {
    var t = e.firstElementChild,
      n = _e(t.children);
    return {
      box: t,
      content: n.find(function (e) {
        return e.classList.contains(we);
      }),
      arrow: n.find(function (e) {
        return e.classList.contains(Te) || e.classList.contains(Se);
      }),
      backdrop: n.find(function (e) {
        return e.classList.contains(xe);
      }),
    };
  }
  function ot(e) {
    var t = Ie(),
      n = Ie();
    (n.className = "tippy-box"),
      n.setAttribute("data-state", "hidden"),
      n.setAttribute("tabindex", "-1");
    var i = Ie();
    function s(n, i) {
      var s = rt(t),
        r = s.box,
        o = s.content,
        a = s.arrow;
      i.theme
        ? r.setAttribute("data-theme", i.theme)
        : r.removeAttribute("data-theme"),
        "string" == typeof i.animation
          ? r.setAttribute("data-animation", i.animation)
          : r.removeAttribute("data-animation"),
        i.inertia
          ? r.setAttribute("data-inertia", "")
          : r.removeAttribute("data-inertia"),
        (r.style.maxWidth =
          "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
        i.role ? r.setAttribute("role", i.role) : r.removeAttribute("role"),
        (n.content === i.content && n.allowHTML === i.allowHTML) ||
          st(o, e.props),
        i.arrow
          ? a
            ? n.arrow !== i.arrow &&
              (r.removeChild(a), r.appendChild(it(i.arrow)))
            : r.appendChild(it(i.arrow))
          : a && r.removeChild(a);
    }
    return (
      (i.className = we),
      i.setAttribute("data-state", "hidden"),
      st(i, e.props),
      t.appendChild(n),
      n.appendChild(i),
      s(e.props, e.props),
      { popper: t, onUpdate: s }
    );
  }
  ot.$$tippy = !0;
  var at = 1,
    lt = [],
    ct = [];
  function dt(e, t) {
    var n,
      i,
      s,
      r,
      o,
      a,
      l,
      c,
      d = tt(e, Object.assign({}, Je, et(De(t)))),
      p = !1,
      u = !1,
      f = !1,
      h = !1,
      m = [],
      g = ke(Y, d.interactiveDebounce),
      v = at++,
      b = (c = d.plugins).filter(function (e, t) {
        return c.indexOf(e) === t;
      }),
      y = {
        id: v,
        reference: e,
        popper: Ie(),
        popperInstance: null,
        props: d,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: b,
        clearDelayTimeouts: function () {
          clearTimeout(n), clearTimeout(i), cancelAnimationFrame(s);
        },
        setProps: function (t) {
          0;
          if (y.state.isDestroyed) return;
          _("onBeforeUpdate", [y, t]), F();
          var n = y.props,
            i = tt(e, Object.assign({}, n, De(t), { ignoreAttributes: !0 }));
          (y.props = i),
            W(),
            n.interactiveDebounce !== i.interactiveDebounce &&
              (B(), (g = ke(Y, i.interactiveDebounce)));
          n.triggerTarget && !i.triggerTarget
            ? Me(n.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : i.triggerTarget && e.removeAttribute("aria-expanded");
          I(), $(), T && T(n, i);
          y.popperInstance &&
            (Q(),
            Z().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          _("onAfterUpdate", [y, t]);
        },
        setContent: function (e) {
          y.setProps({ content: e });
        },
        show: function () {
          0;
          var e = y.state.isVisible,
            t = y.state.isDestroyed,
            n = !y.state.isEnabled,
            i = Fe.isTouch && !y.props.touch,
            s = Oe(y.props.duration, 0, Je.duration);
          if (e || t || n || i) return;
          if (A().hasAttribute("disabled")) return;
          if ((_("onShow", [y], !1), !1 === y.props.onShow(y))) return;
          (y.state.isVisible = !0), L() && (x.style.visibility = "visible");
          $(), N(), y.state.isMounted || (x.style.transition = "none");
          if (L()) {
            var r = M(),
              o = r.box,
              l = r.content;
            Ne([o, l], 0);
          }
          (a = function () {
            var e;
            if (y.state.isVisible && !h) {
              if (
                ((h = !0),
                x.offsetHeight,
                (x.style.transition = y.props.moveTransition),
                L() && y.props.animation)
              ) {
                var t = M(),
                  n = t.box,
                  i = t.content;
                Ne([n, i], s), Ge([n, i], "visible");
              }
              D(),
                I(),
                Pe(ct, y),
                null == (e = y.popperInstance) || e.forceUpdate(),
                _("onMount", [y]),
                y.props.animation &&
                  L() &&
                  (function (e, t) {
                    q(e, t);
                  })(s, function () {
                    (y.state.isShown = !0), _("onShown", [y]);
                  });
            }
          }),
            (function () {
              var e,
                t = y.props.appendTo,
                n = A();
              e =
                (y.props.interactive && t === Ce) || "parent" === t
                  ? n.parentNode
                  : Ae(t, [n]);
              e.contains(x) || e.appendChild(x);
              (y.state.isMounted = !0), Q(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !y.state.isVisible,
            t = y.state.isDestroyed,
            n = !y.state.isEnabled,
            i = Oe(y.props.duration, 1, Je.duration);
          if (e || t || n) return;
          if ((_("onHide", [y], !1), !1 === y.props.onHide(y))) return;
          (y.state.isVisible = !1),
            (y.state.isShown = !1),
            (h = !1),
            (p = !1),
            L() && (x.style.visibility = "hidden");
          if ((B(), G(), $(!0), L())) {
            var s = M(),
              r = s.box,
              o = s.content;
            y.props.animation && (Ne([r, o], i), Ge([r, o], "hidden"));
          }
          D(),
            I(),
            y.props.animation
              ? L() &&
                (function (e, t) {
                  q(e, function () {
                    !y.state.isVisible &&
                      x.parentNode &&
                      x.parentNode.contains(x) &&
                      t();
                  });
                })(i, y.unmount)
              : y.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          k().addEventListener("mousemove", g), Pe(lt, g), g(e);
        },
        enable: function () {
          y.state.isEnabled = !0;
        },
        disable: function () {
          y.hide(), (y.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          y.state.isVisible && y.hide();
          if (!y.state.isMounted) return;
          J(),
            Z().forEach(function (e) {
              e._tippy.unmount();
            }),
            x.parentNode && x.parentNode.removeChild(x);
          (ct = ct.filter(function (e) {
            return e !== y;
          })),
            (y.state.isMounted = !1),
            _("onHidden", [y]);
        },
        destroy: function () {
          0;
          if (y.state.isDestroyed) return;
          y.clearDelayTimeouts(),
            y.unmount(),
            F(),
            delete e._tippy,
            (y.state.isDestroyed = !0),
            _("onDestroy", [y]);
        },
      };
    if (!d.render) return y;
    var w = d.render(y),
      x = w.popper,
      T = w.onUpdate;
    x.setAttribute("data-tippy-root", ""),
      (x.id = "tippy-" + y.id),
      (y.popper = x),
      (e._tippy = y),
      (x._tippy = y);
    var S = b.map(function (e) {
        return e.fn(y);
      }),
      E = e.hasAttribute("aria-expanded");
    return (
      W(),
      I(),
      $(),
      _("onCreate", [y]),
      d.showOnCreate && ee(),
      x.addEventListener("mouseenter", function () {
        y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
      }),
      x.addEventListener("mouseleave", function () {
        y.props.interactive &&
          y.props.trigger.indexOf("mouseenter") >= 0 &&
          k().addEventListener("mousemove", g);
      }),
      y
    );
    function C() {
      var e = y.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function O() {
      return "hold" === C()[0];
    }
    function L() {
      var e;
      return !(null == (e = y.props.render) || !e.$$tippy);
    }
    function A() {
      return l || e;
    }
    function k() {
      var e = A().parentNode;
      return e ? qe(e) : document;
    }
    function M() {
      return rt(x);
    }
    function P(e) {
      return (y.state.isMounted && !y.state.isVisible) ||
        Fe.isTouch ||
        (r && "focus" === r.type)
        ? 0
        : Oe(y.props.delay, e ? 0 : 1, Je.delay);
    }
    function $(e) {
      void 0 === e && (e = !1),
        (x.style.pointerEvents = y.props.interactive && !e ? "" : "none"),
        (x.style.zIndex = "" + y.props.zIndex);
    }
    function _(e, t, n) {
      var i;
      (void 0 === n && (n = !0),
      S.forEach(function (n) {
        n[e] && n[e].apply(n, t);
      }),
      n) && (i = y.props)[e].apply(i, t);
    }
    function D() {
      var t = y.props.aria;
      if (t.content) {
        var n = "aria-" + t.content,
          i = x.id;
        Me(y.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(n);
          if (y.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
          else {
            var s = t && t.replace(i, "").trim();
            s ? e.setAttribute(n, s) : e.removeAttribute(n);
          }
        });
      }
    }
    function I() {
      !E &&
        y.props.aria.expanded &&
        Me(y.props.triggerTarget || e).forEach(function (e) {
          y.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                y.state.isVisible && e === A() ? "true" : "false"
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function B() {
      k().removeEventListener("mousemove", g),
        (lt = lt.filter(function (e) {
          return e !== g;
        }));
    }
    function j(t) {
      if (!Fe.isTouch || (!f && "mousedown" !== t.type)) {
        var n = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!y.props.interactive || !We(x, n)) {
          if (
            Me(y.props.triggerTarget || e).some(function (e) {
              return We(e, n);
            })
          ) {
            if (Fe.isTouch) return;
            if (y.state.isVisible && y.props.trigger.indexOf("click") >= 0)
              return;
          } else _("onClickOutside", [y, t]);
          !0 === y.props.hideOnClick &&
            (y.clearDelayTimeouts(),
            y.hide(),
            (u = !0),
            setTimeout(function () {
              u = !1;
            }),
            y.state.isMounted || G());
        }
      }
    }
    function z() {
      f = !0;
    }
    function H() {
      f = !1;
    }
    function N() {
      var e = k();
      e.addEventListener("mousedown", j, !0),
        e.addEventListener("touchend", j, Ee),
        e.addEventListener("touchstart", H, Ee),
        e.addEventListener("touchmove", z, Ee);
    }
    function G() {
      var e = k();
      e.removeEventListener("mousedown", j, !0),
        e.removeEventListener("touchend", j, Ee),
        e.removeEventListener("touchstart", H, Ee),
        e.removeEventListener("touchmove", z, Ee);
    }
    function q(e, t) {
      var n = M().box;
      function i(e) {
        e.target === n && (Ve(n, "remove", i), t());
      }
      if (0 === e) return t();
      Ve(n, "remove", o), Ve(n, "add", i), (o = i);
    }
    function V(t, n, i) {
      void 0 === i && (i = !1),
        Me(y.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, n, i),
            m.push({ node: e, eventType: t, handler: n, options: i });
        });
    }
    function W() {
      O() &&
        (V("touchstart", R, { passive: !0 }),
        V("touchend", X, { passive: !0 })),
        (function (e) {
          return e.split(/\s+/).filter(Boolean);
        })(y.props.trigger).forEach(function (e) {
          if ("manual" !== e)
            switch ((V(e, R), e)) {
              case "mouseenter":
                V("mouseleave", X);
                break;
              case "focus":
                V(Ke ? "focusout" : "blur", U);
                break;
              case "focusin":
                V("focusout", U);
            }
        });
    }
    function F() {
      m.forEach(function (e) {
        var t = e.node,
          n = e.eventType,
          i = e.handler,
          s = e.options;
        t.removeEventListener(n, i, s);
      }),
        (m = []);
    }
    function R(e) {
      var t,
        n = !1;
      if (y.state.isEnabled && !K(e) && !u) {
        var i = "focus" === (null == (t = r) ? void 0 : t.type);
        (r = e),
          (l = e.currentTarget),
          I(),
          !y.state.isVisible &&
            je(e) &&
            lt.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (y.props.trigger.indexOf("mouseenter") < 0 || p) &&
          !1 !== y.props.hideOnClick &&
          y.state.isVisible
            ? (n = !0)
            : ee(e),
          "click" === e.type && (p = !n),
          n && !i && te(e);
      }
    }
    function Y(e) {
      var t = e.target,
        n = A().contains(t) || x.contains(t);
      if ("mousemove" !== e.type || !n) {
        var i = Z()
          .concat(x)
          .map(function (e) {
            var t,
              n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
            return n
              ? {
                  popperRect: e.getBoundingClientRect(),
                  popperState: n,
                  props: d,
                }
              : null;
          })
          .filter(Boolean);
        (function (e, t) {
          var n = t.clientX,
            i = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              s = e.popperState,
              r = e.props.interactiveBorder,
              o = $e(s.placement),
              a = s.modifiersData.offset;
            if (!a) return !0;
            var l = "bottom" === o ? a.top.y : 0,
              c = "top" === o ? a.bottom.y : 0,
              d = "right" === o ? a.left.x : 0,
              p = "left" === o ? a.right.x : 0,
              u = t.top - i + l > r,
              f = i - t.bottom - c > r,
              h = t.left - n + d > r,
              m = n - t.right - p > r;
            return u || f || h || m;
          });
        })(i, e) && (B(), te(e));
      }
    }
    function X(e) {
      K(e) ||
        (y.props.trigger.indexOf("click") >= 0 && p) ||
        (y.props.interactive ? y.hideWithInteractivity(e) : te(e));
    }
    function U(e) {
      (y.props.trigger.indexOf("focusin") < 0 && e.target !== A()) ||
        (y.props.interactive &&
          e.relatedTarget &&
          x.contains(e.relatedTarget)) ||
        te(e);
    }
    function K(e) {
      return !!Fe.isTouch && O() !== e.type.indexOf("touch") >= 0;
    }
    function Q() {
      J();
      var t = y.props,
        n = t.popperOptions,
        i = t.placement,
        s = t.offset,
        r = t.getReferenceClientRect,
        o = t.moveTransition,
        l = L() ? rt(x).arrow : null,
        c = r
          ? {
              getBoundingClientRect: r,
              contextElement: r.contextElement || A(),
            }
          : e,
        d = {
          name: "$$tippy",
          enabled: !0,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: function (e) {
            var t = e.state;
            if (L()) {
              var n = M().box;
              ["placement", "reference-hidden", "escaped"].forEach(function (
                e
              ) {
                "placement" === e
                  ? n.setAttribute("data-placement", t.placement)
                  : t.attributes.popper["data-popper-" + e]
                  ? n.setAttribute("data-" + e, "")
                  : n.removeAttribute("data-" + e);
              }),
                (t.attributes.popper = {});
            }
          },
        },
        p = [
          { name: "offset", options: { offset: s } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !o } },
          d,
        ];
      L() &&
        l &&
        p.push({ name: "arrow", options: { element: l, padding: 3 } }),
        p.push.apply(p, (null == n ? void 0 : n.modifiers) || []),
        (y.popperInstance = ye(
          c,
          x,
          Object.assign({}, n, { placement: i, onFirstUpdate: a, modifiers: p })
        ));
    }
    function J() {
      y.popperInstance &&
        (y.popperInstance.destroy(), (y.popperInstance = null));
    }
    function Z() {
      return _e(x.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      y.clearDelayTimeouts(), e && _("onTrigger", [y, e]), N();
      var t = P(!0),
        i = C(),
        s = i[0],
        r = i[1];
      Fe.isTouch && "hold" === s && r && (t = r),
        t
          ? (n = setTimeout(function () {
              y.show();
            }, t))
          : y.show();
    }
    function te(e) {
      if (
        (y.clearDelayTimeouts(), _("onUntrigger", [y, e]), y.state.isVisible)
      ) {
        if (
          !(
            y.props.trigger.indexOf("mouseenter") >= 0 &&
            y.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            p
          )
        ) {
          var t = P(!1);
          t
            ? (i = setTimeout(function () {
                y.state.isVisible && y.hide();
              }, t))
            : (s = requestAnimationFrame(function () {
                y.hide();
              }));
        }
      } else G();
    }
  }
  function pt(e, t) {
    void 0 === t && (t = {});
    var n = Je.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", Ye, Ee),
      window.addEventListener("blur", Ue);
    var i = Object.assign({}, t, { plugins: n }),
      s = He(e).reduce(function (e, t) {
        var n = t && dt(t, i);
        return n && e.push(n), e;
      }, []);
    return Be(e) ? s[0] : s;
  }
  (pt.defaultProps = Je),
    (pt.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        Je[t] = e[t];
      });
    }),
    (pt.currentInput = Fe);
  Object.assign({}, te, {
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
    },
  });
  pt.setDefaultProps({ render: ot });
  const ut = pt;
  function ft(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function ht(e = {}, t = {}) {
    Object.keys(t).forEach((n) => {
      void 0 === e[n]
        ? (e[n] = t[n])
        : ft(t[n]) &&
          ft(e[n]) &&
          Object.keys(t[n]).length > 0 &&
          ht(e[n], t[n]);
    });
  }
  e.tippy = ut("[data-tippy-content]", {});
  const mt = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function gt() {
    const e = "undefined" != typeof document ? document : {};
    return ht(e, mt), e;
  }
  const vt = {
    document: mt,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function bt() {
    const e = "undefined" != typeof window ? window : {};
    return ht(e, vt), e;
  }
  class yt extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function wt(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...wt(e)) : t.push(e);
      }),
      t
    );
  }
  function xt(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function Tt(e, t) {
    const n = bt(),
      i = gt();
    let s = [];
    if (!t && e instanceof yt) return e;
    if (!e) return new yt(s);
    if ("string" == typeof e) {
      const n = e.trim();
      if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
        let e = "div";
        0 === n.indexOf("<li") && (e = "ul"),
          0 === n.indexOf("<tr") && (e = "tbody"),
          (0 !== n.indexOf("<td") && 0 !== n.indexOf("<th")) || (e = "tr"),
          0 === n.indexOf("<tbody") && (e = "table"),
          0 === n.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = n;
        for (let e = 0; e < t.childNodes.length; e += 1)
          s.push(t.childNodes[e]);
      } else
        s = (function (e, t) {
          if ("string" != typeof e) return [e];
          const n = [],
            i = t.querySelectorAll(e);
          for (let e = 0; e < i.length; e += 1) n.push(i[e]);
          return n;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === n || e === i) s.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof yt) return e;
      s = e;
    }
    return new yt(
      (function (e) {
        const t = [];
        for (let n = 0; n < e.length; n += 1)
          -1 === t.indexOf(e[n]) && t.push(e[n]);
        return t;
      })(s)
    );
  }
  Tt.fn = yt.prototype;
  const St = "resize scroll".split(" ");
  function Et(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          St.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : Tt(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  Et("click"),
    Et("blur"),
    Et("focus"),
    Et("focusin"),
    Et("focusout"),
    Et("keyup"),
    Et("keydown"),
    Et("keypress"),
    Et("submit"),
    Et("change"),
    Et("mousedown"),
    Et("mousemove"),
    Et("mouseup"),
    Et("mouseenter"),
    Et("mouseleave"),
    Et("mouseout"),
    Et("mouseover"),
    Et("touchstart"),
    Et("touchend"),
    Et("touchmove"),
    Et("resize"),
    Et("scroll");
  const Ct = {
    addClass: function (...e) {
      const t = wt(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = wt(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = wt(e.map((e) => e.split(" ")));
      return (
        xt(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = wt(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let n = 0; n < this.length; n += 1)
        if (2 === arguments.length) this[n].setAttribute(e, t);
        else
          for (const t in e) (this[n][t] = e[t]), this[n].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, n, i, s] = e;
      function r(e) {
        const t = e.target;
        if (!t) return;
        const s = e.target.dom7EventData || [];
        if ((s.indexOf(e) < 0 && s.unshift(e), Tt(t).is(n))) i.apply(t, s);
        else {
          const e = Tt(t).parents();
          for (let t = 0; t < e.length; t += 1)
            Tt(e[t]).is(n) && i.apply(e[t], s);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
      }
      "function" == typeof e[1] && (([t, i, s] = e), (n = void 0)),
        s || (s = !1);
      const a = t.split(" ");
      let l;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (n)
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: i, proxyListener: r }),
              t.addEventListener(e, r, s);
          }
        else
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: i, proxyListener: o }),
              t.addEventListener(e, o, s);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, n, i, s] = e;
      "function" == typeof e[1] && (([t, i, s] = e), (n = void 0)),
        s || (s = !1);
      const r = t.split(" ");
      for (let e = 0; e < r.length; e += 1) {
        const t = r[e];
        for (let e = 0; e < this.length; e += 1) {
          const r = this[e];
          let o;
          if (
            (!n && r.dom7Listeners
              ? (o = r.dom7Listeners[t])
              : n && r.dom7LiveListeners && (o = r.dom7LiveListeners[t]),
            o && o.length)
          )
            for (let e = o.length - 1; e >= 0; e -= 1) {
              const n = o[e];
              (i && n.listener === i) ||
              (i &&
                n.listener &&
                n.listener.dom7proxy &&
                n.listener.dom7proxy === i)
                ? (r.removeEventListener(t, n.proxyListener, s), o.splice(e, 1))
                : i ||
                  (r.removeEventListener(t, n.proxyListener, s),
                  o.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = bt(),
        n = e[0].split(" "),
        i = e[1];
      for (let s = 0; s < n.length; s += 1) {
        const r = n[s];
        for (let n = 0; n < this.length; n += 1) {
          const s = this[n];
          if (t.CustomEvent) {
            const n = new t.CustomEvent(r, {
              detail: i,
              bubbles: !0,
              cancelable: !0,
            });
            (s.dom7EventData = e.filter((e, t) => t > 0)),
              s.dispatchEvent(n),
              (s.dom7EventData = []),
              delete s.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function n(i) {
            i.target === this && (e.call(this, i), t.off("transitionend", n));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = bt();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = bt(),
          t = gt(),
          n = this[0],
          i = n.getBoundingClientRect(),
          s = t.body,
          r = n.clientTop || s.clientTop || 0,
          o = n.clientLeft || s.clientLeft || 0,
          a = n === e ? e.scrollY : n.scrollTop,
          l = n === e ? e.scrollX : n.scrollLeft;
        return { top: i.top + a - r, left: i.left + l - o };
      }
      return null;
    },
    css: function (e, t) {
      const n = bt();
      let i;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1)
            for (const t in e) this[i].style[t] = e[t];
          return this;
        }
        if (this[0])
          return n.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, n) => {
            e.apply(t, [t, n]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = bt(),
        n = gt(),
        i = this[0];
      let s, r;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (s = Tt(e), r = 0; r < s.length; r += 1) if (s[r] === i) return !0;
        return !1;
      }
      if (e === n) return i === n;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof yt) {
        for (s = e.nodeType ? [e] : e, r = 0; r < s.length; r += 1)
          if (s[r] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return Tt([]);
      if (e < 0) {
        const n = t + e;
        return Tt(n < 0 ? [] : [this[n]]);
      }
      return Tt([this[e]]);
    },
    append: function (...e) {
      let t;
      const n = gt();
      for (let i = 0; i < e.length; i += 1) {
        t = e[i];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const i = n.createElement("div");
            for (i.innerHTML = t; i.firstChild; )
              this[e].appendChild(i.firstChild);
          } else if (t instanceof yt)
            for (let n = 0; n < t.length; n += 1) this[e].appendChild(t[n]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = gt();
      let n, i;
      for (n = 0; n < this.length; n += 1)
        if ("string" == typeof e) {
          const s = t.createElement("div");
          for (s.innerHTML = e, i = s.childNodes.length - 1; i >= 0; i -= 1)
            this[n].insertBefore(s.childNodes[i], this[n].childNodes[0]);
        } else if (e instanceof yt)
          for (i = 0; i < e.length; i += 1)
            this[n].insertBefore(e[i], this[n].childNodes[0]);
        else this[n].insertBefore(e, this[n].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && Tt(this[0].nextElementSibling).is(e)
            ? Tt([this[0].nextElementSibling])
            : Tt([])
          : this[0].nextElementSibling
          ? Tt([this[0].nextElementSibling])
          : Tt([])
        : Tt([]);
    },
    nextAll: function (e) {
      const t = [];
      let n = this[0];
      if (!n) return Tt([]);
      for (; n.nextElementSibling; ) {
        const i = n.nextElementSibling;
        e ? Tt(i).is(e) && t.push(i) : t.push(i), (n = i);
      }
      return Tt(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && Tt(t.previousElementSibling).is(e)
            ? Tt([t.previousElementSibling])
            : Tt([])
          : t.previousElementSibling
          ? Tt([t.previousElementSibling])
          : Tt([]);
      }
      return Tt([]);
    },
    prevAll: function (e) {
      const t = [];
      let n = this[0];
      if (!n) return Tt([]);
      for (; n.previousElementSibling; ) {
        const i = n.previousElementSibling;
        e ? Tt(i).is(e) && t.push(i) : t.push(i), (n = i);
      }
      return Tt(t);
    },
    parent: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1)
        null !== this[n].parentNode &&
          (e
            ? Tt(this[n].parentNode).is(e) && t.push(this[n].parentNode)
            : t.push(this[n].parentNode));
      return Tt(t);
    },
    parents: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        let i = this[n].parentNode;
        for (; i; )
          e ? Tt(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
      }
      return Tt(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? Tt([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        const i = this[n].querySelectorAll(e);
        for (let e = 0; e < i.length; e += 1) t.push(i[e]);
      }
      return Tt(t);
    },
    children: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        const i = this[n].children;
        for (let n = 0; n < i.length; n += 1)
          (e && !Tt(i[n]).is(e)) || t.push(i[n]);
      }
      return Tt(t);
    },
    filter: function (e) {
      return Tt(xt(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(Ct).forEach((e) => {
    Object.defineProperty(Tt.fn, e, { value: Ct[e], writable: !0 });
  });
  const Ot = Tt;
  function Lt(e, t = 0) {
    return setTimeout(e, t);
  }
  function At() {
    return Date.now();
  }
  function kt(e, t = "x") {
    const n = bt();
    let i, s, r;
    const o = (function (e) {
      const t = bt();
      let n;
      return (
        t.getComputedStyle && (n = t.getComputedStyle(e, null)),
        !n && e.currentStyle && (n = e.currentStyle),
        n || (n = e.style),
        n
      );
    })(e);
    return (
      n.WebKitCSSMatrix
        ? ((s = o.transform || o.webkitTransform),
          s.split(",").length > 6 &&
            (s = s
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new n.WebKitCSSMatrix("none" === s ? "" : s)))
        : ((r =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = r.toString().split(","))),
      "x" === t &&
        (s = n.WebKitCSSMatrix
          ? r.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (s = n.WebKitCSSMatrix
          ? r.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      s || 0
    );
  }
  function Mt(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function Pt(...e) {
    const t = Object(e[0]),
      n = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < e.length; s += 1) {
      const r = e[s];
      if (
        null != r &&
        ((i = r),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? i instanceof HTMLElement
          : i && (1 === i.nodeType || 11 === i.nodeType)))
      ) {
        const e = Object.keys(Object(r)).filter((e) => n.indexOf(e) < 0);
        for (let n = 0, i = e.length; n < i; n += 1) {
          const i = e[n],
            s = Object.getOwnPropertyDescriptor(r, i);
          void 0 !== s &&
            s.enumerable &&
            (Mt(t[i]) && Mt(r[i])
              ? r[i].__swiper__
                ? (t[i] = r[i])
                : Pt(t[i], r[i])
              : !Mt(t[i]) && Mt(r[i])
              ? ((t[i] = {}), r[i].__swiper__ ? (t[i] = r[i]) : Pt(t[i], r[i]))
              : (t[i] = r[i]));
        }
      }
    }
    var i;
    return t;
  }
  function $t(e, t, n) {
    e.style.setProperty(t, n);
  }
  function _t({ swiper: e, targetPosition: t, side: n }) {
    const i = bt(),
      s = -e.translate;
    let r,
      o = null;
    const a = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      i.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > s ? "next" : "prev",
      c = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
      d = () => {
        (r = new Date().getTime()), null === o && (o = r);
        const l = Math.max(Math.min((r - o) / a, 1), 0),
          p = 0.5 - Math.cos(l * Math.PI) / 2;
        let u = s + p * (t - s);
        if ((c(u, t) && (u = t), e.wrapperEl.scrollTo({ [n]: u }), c(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [n]: u });
            }),
            void i.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = i.requestAnimationFrame(d);
      };
    d();
  }
  let Dt, It, Bt;
  function jt() {
    return (
      Dt ||
        (Dt = (function () {
          const e = bt(),
            t = gt();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const n = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, n);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      Dt
    );
  }
  function zt(e = {}) {
    return (
      It ||
        (It = (function ({ userAgent: e } = {}) {
          const t = jt(),
            n = bt(),
            i = n.navigator.platform,
            s = e || n.navigator.userAgent,
            r = { ios: !1, android: !1 },
            o = n.screen.width,
            a = n.screen.height,
            l = s.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = s.match(/(iPad).*OS\s([\d_]+)/);
          const d = s.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !c && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            u = "Win32" === i;
          let f = "MacIntel" === i;
          return (
            !c &&
              f &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${a}`) >= 0 &&
              ((c = s.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (f = !1)),
            l && !u && ((r.os = "android"), (r.android = !0)),
            (c || p || d) && ((r.os = "ios"), (r.ios = !0)),
            r
          );
        })(e)),
      It
    );
  }
  function Ht() {
    return (
      Bt ||
        (Bt = (function () {
          const e = bt();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      Bt
    );
  }
  const Nt = {
    on(e, t, n) {
      const i = this;
      if ("function" != typeof t) return i;
      const s = n ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][s](t);
        }),
        i
      );
    },
    once(e, t, n) {
      const i = this;
      if ("function" != typeof t) return i;
      function s(...n) {
        i.off(e, s), s.__emitterProxy && delete s.__emitterProxy, t.apply(i, n);
      }
      return (s.__emitterProxy = t), i.on(e, s, n);
    },
    onAny(e, t) {
      const n = this;
      if ("function" != typeof e) return n;
      const i = t ? "unshift" : "push";
      return (
        n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[i](e), n
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const n = t.eventsAnyListeners.indexOf(e);
      return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
    },
    off(e, t) {
      const n = this;
      return n.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (n.eventsListeners[e] = [])
              : n.eventsListeners[e] &&
                n.eventsListeners[e].forEach((i, s) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    n.eventsListeners[e].splice(s, 1);
                });
          }),
          n)
        : n;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners) return t;
      let n, i, s;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((n = e[0]), (i = e.slice(1, e.length)), (s = t))
        : ((n = e[0].events), (i = e[0].data), (s = e[0].context || t)),
        i.unshift(s);
      return (
        (Array.isArray(n) ? n : n.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(s, [e, ...i]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(s, i);
              });
        }),
        t
      );
    },
  };
  const Gt = {
    updateSize: function () {
      const e = this;
      let t, n;
      const i = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i[0].clientWidth),
        (n =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === n && e.isVertical()) ||
          ((t =
            t -
            parseInt(i.css("padding-left") || 0, 10) -
            parseInt(i.css("padding-right") || 0, 10)),
          (n =
            n -
            parseInt(i.css("padding-top") || 0, 10) -
            parseInt(i.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(n) && (n = 0),
          Object.assign(e, {
            width: t,
            height: n,
            size: e.isHorizontal() ? t : n,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function n(e, n) {
        return parseFloat(e.getPropertyValue(t(n)) || 0);
      }
      const i = e.params,
        { $wrapperEl: s, size: r, rtlTranslate: o, wrongRTL: a } = e,
        l = e.virtual && i.virtual.enabled,
        c = l ? e.virtual.slides.length : e.slides.length,
        d = s.children(`.${e.params.slideClass}`),
        p = l ? e.virtual.slides.length : d.length;
      let u = [];
      const f = [],
        h = [];
      let m = i.slidesOffsetBefore;
      "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
      let g = i.slidesOffsetAfter;
      "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = i.spaceBetween,
        w = -m,
        x = 0,
        T = 0;
      if (void 0 === r) return;
      "string" == typeof y &&
        y.indexOf("%") >= 0 &&
        (y = (parseFloat(y.replace("%", "")) / 100) * r),
        (e.virtualSize = -y),
        o
          ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        i.centeredSlides &&
          i.cssMode &&
          ($t(e.wrapperEl, "--swiper-centered-offset-before", ""),
          $t(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const S = i.grid && i.grid.rows > 1 && e.grid;
      let E;
      S && e.grid.initSlides(p);
      const C =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView
        ).length > 0;
      for (let s = 0; s < p; s += 1) {
        E = 0;
        const o = d.eq(s);
        if (
          (S && e.grid.updateSlide(s, o, p, t), "none" !== o.css("display"))
        ) {
          if ("auto" === i.slidesPerView) {
            C && (d[s].style[t("width")] = "");
            const r = getComputedStyle(o[0]),
              a = o[0].style.transform,
              l = o[0].style.webkitTransform;
            if (
              (a && (o[0].style.transform = "none"),
              l && (o[0].style.webkitTransform = "none"),
              i.roundLengths)
            )
              E = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
            else {
              const e = n(r, "width"),
                t = n(r, "padding-left"),
                i = n(r, "padding-right"),
                s = n(r, "margin-left"),
                a = n(r, "margin-right"),
                l = r.getPropertyValue("box-sizing");
              if (l && "border-box" === l) E = e + s + a;
              else {
                const { clientWidth: n, offsetWidth: r } = o[0];
                E = e + t + i + s + a + (r - n);
              }
            }
            a && (o[0].style.transform = a),
              l && (o[0].style.webkitTransform = l),
              i.roundLengths && (E = Math.floor(E));
          } else
            (E = (r - (i.slidesPerView - 1) * y) / i.slidesPerView),
              i.roundLengths && (E = Math.floor(E)),
              d[s] && (d[s].style[t("width")] = `${E}px`);
          d[s] && (d[s].swiperSlideSize = E),
            h.push(E),
            i.centeredSlides
              ? ((w = w + E / 2 + x / 2 + y),
                0 === x && 0 !== s && (w = w - r / 2 - y),
                0 === s && (w = w - r / 2 - y),
                Math.abs(w) < 0.001 && (w = 0),
                i.roundLengths && (w = Math.floor(w)),
                T % i.slidesPerGroup == 0 && u.push(w),
                f.push(w))
              : (i.roundLengths && (w = Math.floor(w)),
                (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(w),
                f.push(w),
                (w = w + E + y)),
            (e.virtualSize += E + y),
            (x = E),
            (T += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + g),
        o &&
          a &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          s.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
        i.setWrapperSize &&
          s.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
        S && e.grid.updateWrapperSize(E, u, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let n = 0; n < u.length; n += 1) {
          let s = u[n];
          i.roundLengths && (s = Math.floor(s)),
            u[n] <= e.virtualSize - r && t.push(s);
        }
        (u = t),
          Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - r);
      }
      if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
        const n = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        d.filter((e, t) => !i.cssMode || t !== d.length - 1).css({
          [n]: `${y}px`,
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        h.forEach((t) => {
          e += t + (i.spaceBetween ? i.spaceBetween : 0);
        }),
          (e -= i.spaceBetween);
        const t = e - r;
        u = u.map((e) => (e < 0 ? -m : e > t ? t + g : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (h.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
          (e -= i.spaceBetween),
          e < r)
        ) {
          const t = (r - e) / 2;
          u.forEach((e, n) => {
            u[n] = e - t;
          }),
            f.forEach((e, n) => {
              f[n] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: d,
          snapGrid: u,
          slidesGrid: f,
          slidesSizesGrid: h,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        $t(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          $t(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - h[h.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          n = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + n));
      }
      p !== c && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        f.length !== b && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset();
    },
    updateAutoHeight: function (e) {
      const t = this,
        n = [],
        i = t.virtual && t.params.virtual.enabled;
      let s,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const o = (e) =>
        i
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            n.push(e);
          });
        else
          for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
            const e = t.activeIndex + s;
            if (e > t.slides.length && !i) break;
            n.push(o(e));
          }
      else n.push(o(t.activeIndex));
      for (s = 0; s < n.length; s += 1)
        if (void 0 !== n[s]) {
          const e = n[s].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let n = 0; n < t.length; n += 1)
        t[n].swiperSlideOffset = e.isHorizontal()
          ? t[n].offsetLeft
          : t[n].offsetTop;
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        n = t.params,
        { slides: i, rtlTranslate: s, snapGrid: r } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let o = -e;
      s && (o = e),
        i.removeClass(n.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < i.length; e += 1) {
        const a = i[e];
        let l = a.swiperSlideOffset;
        n.cssMode && n.centeredSlides && (l -= i[0].swiperSlideOffset);
        const c =
            (o + (n.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + n.spaceBetween),
          d =
            (o - r[0] + (n.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + n.spaceBetween),
          p = -(o - l),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(a),
          t.visibleSlidesIndexes.push(e),
          i.eq(e).addClass(n.slideVisibleClass)),
          (a.progress = s ? -c : c),
          (a.originalProgress = s ? -d : d);
      }
      t.visibleSlides = Ot(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const n = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * n) || 0;
      }
      const n = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: s, isBeginning: r, isEnd: o } = t;
      const a = r,
        l = o;
      0 === i
        ? ((s = 0), (r = !0), (o = !0))
        : ((s = (e - t.minTranslate()) / i), (r = s <= 0), (o = s >= 1)),
        Object.assign(t, { progress: s, isBeginning: r, isEnd: o }),
        (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !a && t.emit("reachBeginning toEdge"),
        o && !l && t.emit("reachEnd toEdge"),
        ((a && !r) || (l && !o)) && t.emit("fromEdge"),
        t.emit("progress", s);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: n,
          $wrapperEl: i,
          activeIndex: s,
          realIndex: r,
        } = e,
        o = e.virtual && n.virtual.enabled;
      let a;
      t.removeClass(
        `${n.slideActiveClass} ${n.slideNextClass} ${n.slidePrevClass} ${n.slideDuplicateActiveClass} ${n.slideDuplicateNextClass} ${n.slideDuplicatePrevClass}`
      ),
        (a = o
          ? e.$wrapperEl.find(
              `.${n.slideClass}[data-swiper-slide-index="${s}"]`
            )
          : t.eq(s)),
        a.addClass(n.slideActiveClass),
        n.loop &&
          (a.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                )
                .addClass(n.slideDuplicateActiveClass)
            : i
                .children(
                  `.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                )
                .addClass(n.slideDuplicateActiveClass));
      let l = a.nextAll(`.${n.slideClass}`).eq(0).addClass(n.slideNextClass);
      n.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(n.slideNextClass));
      let c = a.prevAll(`.${n.slideClass}`).eq(0).addClass(n.slidePrevClass);
      n.loop &&
        0 === c.length &&
        ((c = t.eq(-1)), c.addClass(n.slidePrevClass)),
        n.loop &&
          (l.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${
                    n.slideDuplicateClass
                  })[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicateNextClass)
            : i
                .children(
                  `.${n.slideClass}.${
                    n.slideDuplicateClass
                  }[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicateNextClass),
          c.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${
                    n.slideDuplicateClass
                  })[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicatePrevClass)
            : i
                .children(
                  `.${n.slideClass}.${
                    n.slideDuplicateClass
                  }[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        n = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: i,
          snapGrid: s,
          params: r,
          activeIndex: o,
          realIndex: a,
          snapIndex: l,
        } = t;
      let c,
        d = e;
      if (void 0 === d) {
        for (let e = 0; e < i.length; e += 1)
          void 0 !== i[e + 1]
            ? n >= i[e] && n < i[e + 1] - (i[e + 1] - i[e]) / 2
              ? (d = e)
              : n >= i[e] && n < i[e + 1] && (d = e + 1)
            : n >= i[e] && (d = e);
        r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
      }
      if (s.indexOf(n) >= 0) c = s.indexOf(n);
      else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        c = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if ((c >= s.length && (c = s.length - 1), d === o))
        return void (c !== l && ((t.snapIndex = c), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(d).attr("data-swiper-slide-index") || d,
        10
      );
      Object.assign(t, {
        snapIndex: c,
        realIndex: p,
        previousIndex: o,
        activeIndex: d,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        a !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        n = t.params,
        i = Ot(e).closest(`.${n.slideClass}`)[0];
      let s,
        r = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (r = !0), (s = e);
            break;
          }
      if (!i || !r)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              Ot(i).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = s),
        n.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const qt = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: n, translate: i, $wrapperEl: s } = this;
      if (t.virtualTranslate) return n ? -i : i;
      if (t.cssMode) return i;
      let r = kt(s[0], e);
      return n && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const n = this,
        {
          rtlTranslate: i,
          params: s,
          $wrapperEl: r,
          wrapperEl: o,
          progress: a,
        } = n;
      let l,
        c = 0,
        d = 0;
      n.isHorizontal() ? (c = i ? -e : e) : (d = e),
        s.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
        s.cssMode
          ? (o[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
              ? -c
              : -d)
          : s.virtualTranslate ||
            r.transform(`translate3d(${c}px, ${d}px, 0px)`),
        (n.previousTranslate = n.translate),
        (n.translate = n.isHorizontal() ? c : d);
      const p = n.maxTranslate() - n.minTranslate();
      (l = 0 === p ? 0 : (e - n.minTranslate()) / p),
        l !== a && n.updateProgress(e),
        n.emit("setTranslate", n.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, n = !0, i = !0, s) {
      const r = this,
        { params: o, wrapperEl: a } = r;
      if (r.animating && o.preventInteractionOnTransition) return !1;
      const l = r.minTranslate(),
        c = r.maxTranslate();
      let d;
      if (
        ((d = i && e > l ? l : i && e < c ? c : e),
        r.updateProgress(d),
        o.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!r.support.smoothScroll)
            return (
              _t({ swiper: r, targetPosition: -d, side: e ? "left" : "top" }),
              !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(d),
            n &&
              (r.emit("beforeTransitionStart", t, s), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(d),
            n &&
              (r.emit("beforeTransitionStart", t, s),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    n && r.emit("transitionEnd"));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function Vt({ swiper: e, runCallbacks: t, direction: n, step: i }) {
    const { activeIndex: s, previousIndex: r } = e;
    let o = n;
    if (
      (o || (o = s > r ? "next" : s < r ? "prev" : "reset"),
      e.emit(`transition${i}`),
      t && s !== r)
    ) {
      if ("reset" === o) return void e.emit(`slideResetTransition${i}`);
      e.emit(`slideChangeTransition${i}`),
        "next" === o
          ? e.emit(`slideNextTransition${i}`)
          : e.emit(`slidePrevTransition${i}`);
    }
  }
  const Wt = {
    slideTo: function (e = 0, t = this.params.speed, n = !0, i, s) {
      if ("number" != typeof e && "string" != typeof e)
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const r = this;
      let o = e;
      o < 0 && (o = 0);
      const {
        params: a,
        snapGrid: l,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: f,
        enabled: h,
      } = r;
      if ((r.animating && a.preventInteractionOnTransition) || (!h && !i && !s))
        return !1;
      const m = Math.min(r.params.slidesPerGroupSkip, o);
      let g = m + Math.floor((o - m) / r.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1),
        (p || a.initialSlide || 0) === (d || 0) &&
          n &&
          r.emit("beforeSlideChangeStart");
      const v = -l[g];
      if ((r.updateProgress(v), a.normalizeSlideIndex))
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            n = Math.floor(100 * c[e]),
            i = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= n && t < i - (i - n) / 2
              ? (o = e)
              : t >= n && t < i && (o = e + 1)
            : t >= n && (o = e);
        }
      if (r.initialized && o !== p) {
        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (p || 0) !== o
        )
          return !1;
      }
      let b;
      if (
        ((b = o > p ? "next" : o < p ? "prev" : "reset"),
        (u && -v === r.translate) || (!u && v === r.translate))
      )
        return (
          r.updateActiveIndex(o),
          a.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== a.effect && r.setTranslate(v),
          "reset" !== b && (r.transitionStart(n, b), r.transitionEnd(n, b)),
          !1
        );
      if (a.cssMode) {
        const e = r.isHorizontal(),
          n = u ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            (f[e ? "scrollLeft" : "scrollTop"] = n),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._swiperImmediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              _t({ swiper: r, targetPosition: n, side: e ? "left" : "top" }), !0
            );
          f.scrollTo({ [e ? "left" : "top"]: n, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(o),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, i),
        r.transitionStart(n, b),
        0 === t
          ? r.transitionEnd(n, b)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(n, b));
              }),
            r.$wrapperEl[0].addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd
            ),
            r.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              r.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, n = !0, i) {
      const s = this;
      let r = e;
      return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, n, i);
    },
    slideNext: function (e = this.params.speed, t = !0, n) {
      const i = this,
        { animating: s, enabled: r, params: o } = i;
      if (!r) return i;
      let a = o.slidesPerGroup;
      "auto" === o.slidesPerView &&
        1 === o.slidesPerGroup &&
        o.slidesPerGroupAuto &&
        (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const l = i.activeIndex < o.slidesPerGroupSkip ? 1 : a;
      if (o.loop) {
        if (s && o.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      return o.rewind && i.isEnd
        ? i.slideTo(0, e, t, n)
        : i.slideTo(i.activeIndex + l, e, t, n);
    },
    slidePrev: function (e = this.params.speed, t = !0, n) {
      const i = this,
        {
          params: s,
          animating: r,
          snapGrid: o,
          slidesGrid: a,
          rtlTranslate: l,
          enabled: c,
        } = i;
      if (!c) return i;
      if (s.loop) {
        if (r && s.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = d(l ? i.translate : -i.translate),
        u = o.map((e) => d(e));
      let f = o[u.indexOf(p) - 1];
      if (void 0 === f && s.cssMode) {
        let e;
        o.forEach((t, n) => {
          p >= t && (e = n);
        }),
          void 0 !== e && (f = o[e > 0 ? e - 1 : e]);
      }
      let h = 0;
      return (
        void 0 !== f &&
          ((h = a.indexOf(f)),
          h < 0 && (h = i.activeIndex - 1),
          "auto" === s.slidesPerView &&
            1 === s.slidesPerGroup &&
            s.slidesPerGroupAuto &&
            ((h = h - i.slidesPerViewDynamic("previous", !0) + 1),
            (h = Math.max(h, 0)))),
        s.rewind && i.isBeginning
          ? i.slideTo(i.slides.length - 1, e, t, n)
          : i.slideTo(h, e, t, n)
      );
    },
    slideReset: function (e = this.params.speed, t = !0, n) {
      return this.slideTo(this.activeIndex, e, t, n);
    },
    slideToClosest: function (e = this.params.speed, t = !0, n, i = 0.5) {
      const s = this;
      let r = s.activeIndex;
      const o = Math.min(s.params.slidesPerGroupSkip, r),
        a = o + Math.floor((r - o) / s.params.slidesPerGroup),
        l = s.rtlTranslate ? s.translate : -s.translate;
      if (l >= s.snapGrid[a]) {
        const e = s.snapGrid[a];
        l - e > (s.snapGrid[a + 1] - e) * i && (r += s.params.slidesPerGroup);
      } else {
        const e = s.snapGrid[a - 1];
        l - e <= (s.snapGrid[a] - e) * i && (r -= s.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, s.slidesGrid.length - 1)),
        s.slideTo(r, e, t, n)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: n } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let s,
        r = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (s = parseInt(Ot(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? r < e.loopedSlides - i / 2 ||
              r > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (r = n
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                Lt(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - i
            ? (e.loopFix(),
              (r = n
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              Lt(() => {
                e.slideTo(r);
              }))
            : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  const Ft = {
    loopCreate: function () {
      const e = this,
        t = gt(),
        { params: n, $wrapperEl: i } = e,
        s = i.children().length > 0 ? Ot(i.children()[0].parentNode) : i;
      s.children(`.${n.slideClass}.${n.slideDuplicateClass}`).remove();
      let r = s.children(`.${n.slideClass}`);
      if (n.loopFillGroupWithBlank) {
        const e = n.slidesPerGroup - (r.length % n.slidesPerGroup);
        if (e !== n.slidesPerGroup) {
          for (let i = 0; i < e; i += 1) {
            const e = Ot(t.createElement("div")).addClass(
              `${n.slideClass} ${n.slideBlankClass}`
            );
            s.append(e);
          }
          r = s.children(`.${n.slideClass}`);
        }
      }
      "auto" !== n.slidesPerView ||
        n.loopedSlides ||
        (n.loopedSlides = r.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(n.loopedSlides || n.slidesPerView, 10)
        )),
        (e.loopedSlides += n.loopAdditionalSlides),
        e.loopedSlides > r.length && (e.loopedSlides = r.length);
      const o = [],
        a = [];
      r.each((t, n) => {
        const i = Ot(t);
        n < e.loopedSlides && a.push(t),
          n < r.length && n >= r.length - e.loopedSlides && o.push(t),
          i.attr("data-swiper-slide-index", n);
      });
      for (let e = 0; e < a.length; e += 1)
        s.append(Ot(a[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
      for (let e = o.length - 1; e >= 0; e -= 1)
        s.prepend(Ot(o[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: n,
        loopedSlides: i,
        allowSlidePrev: s,
        allowSlideNext: r,
        snapGrid: o,
        rtlTranslate: a,
      } = e;
      let l;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const c = -o[t] - e.getTranslate();
      if (t < i) {
        (l = n.length - 3 * i + t), (l += i);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      } else if (t >= n.length - i) {
        (l = -n.length + t + i), (l += i);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      }
      (e.allowSlidePrev = s), (e.allowSlideNext = r), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: n } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        n.removeAttr("data-swiper-slide-index");
    },
  };
  function Rt(e) {
    const t = this,
      n = gt(),
      i = bt(),
      s = t.touchEventsData,
      { params: r, touches: o, enabled: a } = t;
    if (!a) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let c = Ot(l.target);
    if ("wrapper" === r.touchEventsTarget && !c.closest(t.wrapperEl).length)
      return;
    if (
      ((s.isTouchEvent = "touchstart" === l.type),
      !s.isTouchEvent && "which" in l && 3 === l.which)
    )
      return;
    if (!s.isTouchEvent && "button" in l && l.button > 0) return;
    if (s.isTouched && s.isMoved) return;
    !!r.noSwipingClass &&
      "" !== r.noSwipingClass &&
      l.target &&
      l.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (c = Ot(e.path[0]));
    const d = r.noSwipingSelector
        ? r.noSwipingSelector
        : `.${r.noSwipingClass}`,
      p = !(!l.target || !l.target.shadowRoot);
    if (
      r.noSwiping &&
      (p
        ? (function (e, t = this) {
            return (function t(n) {
              return n && n !== gt() && n !== bt()
                ? (n.assignedSlot && (n = n.assignedSlot),
                  n.closest(e) || t(n.getRootNode().host))
                : null;
            })(t);
          })(d, l.target)
        : c.closest(d)[0])
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !c.closest(r.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
      (o.currentY =
        "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
    const u = o.currentX,
      f = o.currentY,
      h = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
      m = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (h && (u <= m || u >= i.innerWidth - m)) {
      if ("prevent" !== h) return;
      e.preventDefault();
    }
    if (
      (Object.assign(s, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = u),
      (o.startY = f),
      (s.touchStartTime = At()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      r.threshold > 0 && (s.allowThresholdMove = !1),
      "touchstart" !== l.type)
    ) {
      let e = !0;
      c.is(s.focusableElements) && (e = !1),
        n.activeElement &&
          Ot(n.activeElement).is(s.focusableElements) &&
          n.activeElement !== c[0] &&
          n.activeElement.blur();
      const i = e && t.allowTouchMove && r.touchStartPreventDefault;
      (!r.touchStartForcePreventDefault && !i) ||
        c[0].isContentEditable ||
        l.preventDefault();
    }
    t.emit("touchStart", l);
  }
  function Yt(e) {
    const t = gt(),
      n = this,
      i = n.touchEventsData,
      { params: s, touches: r, rtlTranslate: o, enabled: a } = n;
    if (!a) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        n.emit("touchMoveOpposite", l)
      );
    if (i.isTouchEvent && "touchmove" !== l.type) return;
    const c =
        "touchmove" === l.type &&
        l.targetTouches &&
        (l.targetTouches[0] || l.changedTouches[0]),
      d = "touchmove" === l.type ? c.pageX : l.pageX,
      p = "touchmove" === l.type ? c.pageY : l.pageY;
    if (l.preventedByNestedSwiper) return (r.startX = d), void (r.startY = p);
    if (!n.allowTouchMove)
      return (
        (n.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(r, { startX: d, startY: p, currentX: d, currentY: p }),
          (i.touchStartTime = At()))
        )
      );
    if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
      if (n.isVertical()) {
        if (
          (p < r.startY && n.translate <= n.maxTranslate()) ||
          (p > r.startY && n.translate >= n.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (d < r.startX && n.translate <= n.maxTranslate()) ||
        (d > r.startX && n.translate >= n.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      l.target === t.activeElement &&
      Ot(l.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (n.allowClick = !1);
    if (
      (i.allowTouchCallbacks && n.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (r.currentX = d), (r.currentY = p);
    const u = r.currentX - r.startX,
      f = r.currentY - r.startY;
    if (n.params.threshold && Math.sqrt(u ** 2 + f ** 2) < n.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (n.isHorizontal() && r.currentY === r.startY) ||
      (n.isVertical() && r.currentX === r.startX)
        ? (i.isScrolling = !1)
        : u * u + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(u))) / Math.PI),
          (i.isScrolling = n.isHorizontal()
            ? e > s.touchAngle
            : 90 - e > s.touchAngle));
    }
    if (
      (i.isScrolling && n.emit("touchMoveOpposite", l),
      void 0 === i.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (n.allowClick = !1),
      !s.cssMode && l.cancelable && l.preventDefault(),
      s.touchMoveStopPropagation && !s.nested && l.stopPropagation(),
      i.isMoved ||
        (s.loop && !s.cssMode && n.loopFix(),
        (i.startTranslate = n.getTranslate()),
        n.setTransition(0),
        n.animating &&
          n.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (i.allowMomentumBounce = !1),
        !s.grabCursor ||
          (!0 !== n.allowSlideNext && !0 !== n.allowSlidePrev) ||
          n.setGrabCursor(!0),
        n.emit("sliderFirstMove", l)),
      n.emit("sliderMove", l),
      (i.isMoved = !0);
    let h = n.isHorizontal() ? u : f;
    (r.diff = h),
      (h *= s.touchRatio),
      o && (h = -h),
      (n.swipeDirection = h > 0 ? "prev" : "next"),
      (i.currentTranslate = h + i.startTranslate);
    let m = !0,
      g = s.resistanceRatio;
    if (
      (s.touchReleaseOnEdges && (g = 0),
      h > 0 && i.currentTranslate > n.minTranslate()
        ? ((m = !1),
          s.resistance &&
            (i.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + i.startTranslate + h) ** g))
        : h < 0 &&
          i.currentTranslate < n.maxTranslate() &&
          ((m = !1),
          s.resistance &&
            (i.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - i.startTranslate - h) ** g)),
      m && (l.preventedByNestedSwiper = !0),
      !n.allowSlideNext &&
        "next" === n.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !n.allowSlidePrev &&
        "prev" === n.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      n.allowSlidePrev ||
        n.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      s.threshold > 0)
    ) {
      if (!(Math.abs(h) > s.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          void (r.diff = n.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    s.followFinger &&
      !s.cssMode &&
      (((s.freeMode && s.freeMode.enabled && n.freeMode) ||
        s.watchSlidesProgress) &&
        (n.updateActiveIndex(), n.updateSlidesClasses()),
      n.params.freeMode &&
        s.freeMode.enabled &&
        n.freeMode &&
        n.freeMode.onTouchMove(),
      n.updateProgress(i.currentTranslate),
      n.setTranslate(i.currentTranslate));
  }
  function Xt(e) {
    const t = this,
      n = t.touchEventsData,
      { params: i, touches: s, rtlTranslate: r, slidesGrid: o, enabled: a } = t;
    if (!a) return;
    let l = e;
    if (
      (l.originalEvent && (l = l.originalEvent),
      n.allowTouchCallbacks && t.emit("touchEnd", l),
      (n.allowTouchCallbacks = !1),
      !n.isTouched)
    )
      return (
        n.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (n.isMoved = !1),
        void (n.startMoving = !1)
      );
    i.grabCursor &&
      n.isMoved &&
      n.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = At(),
      d = c - n.touchStartTime;
    if (t.allowClick) {
      const e = l.path || (l.composedPath && l.composedPath());
      t.updateClickedSlide((e && e[0]) || l.target),
        t.emit("tap click", l),
        d < 300 &&
          c - n.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", l);
    }
    if (
      ((n.lastClickTime = At()),
      Lt(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !n.isTouched ||
        !n.isMoved ||
        !t.swipeDirection ||
        0 === s.diff ||
        n.currentTranslate === n.startTranslate)
    )
      return (n.isTouched = !1), (n.isMoved = !1), void (n.startMoving = !1);
    let p;
    if (
      ((n.isTouched = !1),
      (n.isMoved = !1),
      (n.startMoving = !1),
      (p = i.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -n.currentTranslate),
      i.cssMode)
    )
      return;
    if (t.params.freeMode && i.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      f = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== o[e + t]
        ? p >= o[e] && p < o[e + t] && ((u = e), (f = o[e + t] - o[e]))
        : p >= o[e] && ((u = e), (f = o[o.length - 1] - o[o.length - 2]));
    }
    const h = (p - o[u]) / f,
      m = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (d > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (h >= i.longSwipesRatio ? t.slideTo(u + m) : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (h > 1 - i.longSwipesRatio ? t.slideTo(u + m) : t.slideTo(u));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
        ? l.target === t.navigation.nextEl
          ? t.slideTo(u + m)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(u + m),
          "prev" === t.swipeDirection && t.slideTo(u));
    }
  }
  function Ut() {
    const e = this,
      { params: t, el: n } = e;
    if (n && 0 === n.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: s, snapGrid: r } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = s),
      (e.allowSlideNext = i),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function Kt(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function Qt() {
    const e = this,
      { wrapperEl: t, rtlTranslate: n, enabled: i } = e;
    if (!i) return;
    let s;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (s = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      s !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let Jt = !1;
  function Zt() {}
  const en = (e, t) => {
    const n = gt(),
      {
        params: i,
        touchEvents: s,
        el: r,
        wrapperEl: o,
        device: a,
        support: l,
      } = e,
      c = !!i.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (l.touch) {
      const t = !(
        "touchstart" !== s.start ||
        !l.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      r[d](s.start, e.onTouchStart, t),
        r[d](
          s.move,
          e.onTouchMove,
          l.passiveListener ? { passive: !1, capture: c } : c
        ),
        r[d](s.end, e.onTouchEnd, t),
        s.cancel && r[d](s.cancel, e.onTouchEnd, t);
    } else
      r[d](s.start, e.onTouchStart, !1),
        n[d](s.move, e.onTouchMove, c),
        n[d](s.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      r[d]("click", e.onClick, !0),
      i.cssMode && o[d]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[p](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            Ut,
            !0
          )
        : e[p]("observerUpdate", Ut, !0);
  };
  const tn = {
      attachEvents: function () {
        const e = this,
          t = gt(),
          { params: n, support: i } = e;
        (e.onTouchStart = Rt.bind(e)),
          (e.onTouchMove = Yt.bind(e)),
          (e.onTouchEnd = Xt.bind(e)),
          n.cssMode && (e.onScroll = Qt.bind(e)),
          (e.onClick = Kt.bind(e)),
          i.touch && !Jt && (t.addEventListener("touchstart", Zt), (Jt = !0)),
          en(e, "on");
      },
      detachEvents: function () {
        en(this, "off");
      },
    },
    nn = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const sn = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: n,
          loopedSlides: i = 0,
          params: s,
          $el: r,
        } = e,
        o = s.breakpoints;
      if (!o || (o && 0 === Object.keys(o).length)) return;
      const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
      if (!a || e.currentBreakpoint === a) return;
      const l = (a in o ? o[a] : void 0) || e.originalParams,
        c = nn(e, s),
        d = nn(e, l),
        p = s.enabled;
      c && !d
        ? (r.removeClass(
            `${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !c &&
          d &&
          (r.addClass(`${s.containerModifierClass}grid`),
          ((l.grid.fill && "column" === l.grid.fill) ||
            (!l.grid.fill && "column" === s.grid.fill)) &&
            r.addClass(`${s.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const u = l.direction && l.direction !== s.direction,
        f = s.loop && (l.slidesPerView !== s.slidesPerView || u);
      u && n && e.changeDirection(), Pt(e.params, l);
      const h = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !h ? e.disable() : !p && h && e.enable(),
        (e.currentBreakpoint = a),
        e.emit("_beforeBreakpoint", l),
        f &&
          n &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - i + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", l);
    },
    getBreakpoint: function (e, t = "window", n) {
      if (!e || ("container" === t && !n)) return;
      let i = !1;
      const s = bt(),
        r = "window" === t ? s.innerHeight : n.clientHeight,
        o = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: r * t, point: e };
          }
          return { value: e, point: e };
        });
      o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < o.length; e += 1) {
        const { point: r, value: a } = o[e];
        "window" === t
          ? s.matchMedia(`(min-width: ${a}px)`).matches && (i = r)
          : a <= n.clientWidth && (i = r);
      }
      return i || "max";
    },
  };
  const rn = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: n, rtl: i, $el: s, device: r, support: o } = e,
        a = (function (e, t) {
          const n = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((i) => {
                    e[i] && n.push(t + i);
                  })
                : "string" == typeof e && n.push(t + e);
            }),
            n
          );
        })(
          [
            "initialized",
            n.direction,
            { "pointer-events": !o.touch },
            { "free-mode": e.params.freeMode && n.freeMode.enabled },
            { autoheight: n.autoHeight },
            { rtl: i },
            { grid: n.grid && n.grid.rows > 1 },
            {
              "grid-column":
                n.grid && n.grid.rows > 1 && "column" === n.grid.fill,
            },
            { android: r.android },
            { ios: r.ios },
            { "css-mode": n.cssMode },
            { centered: n.cssMode && n.centeredSlides },
          ],
          n.containerModifierClass
        );
      t.push(...a), s.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const on = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function an(e, t) {
    return function (n = {}) {
      const i = Object.keys(n)[0],
        s = n[i];
      "object" == typeof s && null !== s
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in s
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              Pt(t, n))
            : Pt(t, n))
        : Pt(t, n);
    };
  }
  const ln = {
      eventsEmitter: Nt,
      update: Gt,
      translate: qt,
      transition: {
        setTransition: function (e, t) {
          const n = this;
          n.params.cssMode || n.$wrapperEl.transition(e),
            n.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const n = this,
            { params: i } = n;
          i.cssMode ||
            (i.autoHeight && n.updateAutoHeight(),
            Vt({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const n = this,
            { params: i } = n;
          (n.animating = !1),
            i.cssMode ||
              (n.setTransition(0),
              Vt({ swiper: n, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: Wt,
      loop: Ft,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const n =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (n.style.cursor = "move"),
            (n.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (n.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (n.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: tn,
      breakpoints: sn,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: n } = e,
            { slidesOffsetBefore: i } = n;
          if (i) {
            const t = e.slides.length - 1,
              n = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > n;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === n.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === n.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: rn,
      images: {
        loadImage: function (e, t, n, i, s, r) {
          const o = bt();
          let a;
          function l() {
            r && r();
          }
          Ot(e).parent("picture")[0] || (e.complete && s)
            ? l()
            : t
            ? ((a = new o.Image()),
              (a.onload = l),
              (a.onerror = l),
              i && (a.sizes = i),
              n && (a.srcset = n),
              t && (a.src = t))
            : l();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let n = 0; n < e.imagesToLoad.length; n += 1) {
            const i = e.imagesToLoad[n];
            e.loadImage(
              i,
              i.currentSrc || i.getAttribute("src"),
              i.srcset || i.getAttribute("srcset"),
              i.sizes || i.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    cn = {};
  class dn {
    constructor(...e) {
      let t, n;
      if (
        (1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (n = e[0])
          : ([t, n] = e),
        n || (n = {}),
        (n = Pt({}, n)),
        t && !n.el && (n.el = t),
        n.el && Ot(n.el).length > 1)
      ) {
        const e = [];
        return (
          Ot(n.el).each((t) => {
            const i = Pt({}, n, { el: t });
            e.push(new dn(i));
          }),
          e
        );
      }
      const i = this;
      (i.__swiper__ = !0),
        (i.support = jt()),
        (i.device = zt({ userAgent: n.userAgent })),
        (i.browser = Ht()),
        (i.eventsListeners = {}),
        (i.eventsAnyListeners = []),
        (i.modules = [...i.__modules__]),
        n.modules && Array.isArray(n.modules) && i.modules.push(...n.modules);
      const s = {};
      i.modules.forEach((e) => {
        e({
          swiper: i,
          extendParams: an(n, s),
          on: i.on.bind(i),
          once: i.once.bind(i),
          off: i.off.bind(i),
          emit: i.emit.bind(i),
        });
      });
      const r = Pt({}, on, s);
      return (
        (i.params = Pt({}, r, cn, n)),
        (i.originalParams = Pt({}, i.params)),
        (i.passedParams = Pt({}, n)),
        i.params &&
          i.params.on &&
          Object.keys(i.params.on).forEach((e) => {
            i.on(e, i.params.on[e]);
          }),
        i.params && i.params.onAny && i.onAny(i.params.onAny),
        (i.$ = Ot),
        Object.assign(i, {
          enabled: i.params.enabled,
          el: t,
          classNames: [],
          slides: Ot(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === i.params.direction,
          isVertical: () => "vertical" === i.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: i.params.allowSlideNext,
          allowSlidePrev: i.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (i.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (i.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              i.support.touch || !i.params.simulateTouch
                ? i.touchEventsTouch
                : i.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: i.params.focusableElements,
            lastClickTime: At(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: i.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        i.emit("_swiper"),
        i.params.init && i.init(),
        i
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const n = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = n.minTranslate(),
        s = (n.maxTranslate() - i) * e + i;
      n.translateTo(s, void 0 === t ? 0 : t),
        n.updateActiveIndex(),
        n.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((n) => {
        const i = e.getSlideClasses(n);
        t.push({ slideEl: n, classNames: i }), e.emit("_slideClass", n, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: n,
        slides: i,
        slidesGrid: s,
        slidesSizesGrid: r,
        size: o,
        activeIndex: a,
      } = this;
      let l = 1;
      if (n.centeredSlides) {
        let e,
          t = i[a].swiperSlideSize;
        for (let n = a + 1; n < i.length; n += 1)
          i[n] &&
            !e &&
            ((t += i[n].swiperSlideSize), (l += 1), t > o && (e = !0));
        for (let n = a - 1; n >= 0; n -= 1)
          i[n] &&
            !e &&
            ((t += i[n].swiperSlideSize), (l += 1), t > o && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < i.length; e += 1) {
          (t ? s[e] + r[e] - s[a] < o : s[e] - s[a] < o) && (l += 1);
        }
      else
        for (let e = a - 1; e >= 0; e -= 1) {
          s[a] - s[e] < o && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: n } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let s;
      n.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (i(), e.params.autoHeight && e.updateAutoHeight())
          : ((s =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            s || i()),
        n.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const n = this,
        i = n.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (n.$el
            .removeClass(`${n.params.containerModifierClass}${i}`)
            .addClass(`${n.params.containerModifierClass}${e}`),
          n.emitContainerClasses(),
          (n.params.direction = e),
          n.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          n.emit("changeDirection"),
          t && n.update()),
        n
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const n = Ot(e || t.params.el);
      if (!(e = n[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let s = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = Ot(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => n.children(e)), t;
        }
        return n.children(i());
      })();
      if (0 === s.length && t.params.createElements) {
        const e = gt().createElement("div");
        (s = Ot(e)),
          (e.className = t.params.wrapperClass),
          n.append(e),
          n.children(`.${t.params.slideClass}`).each((e) => {
            s.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: n,
          el: e,
          $wrapperEl: s,
          wrapperEl: s[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction")),
          wrongRTL: "-webkit-box" === s.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const n = this,
        { params: i, $el: s, $wrapperEl: r, slides: o } = n;
      return (
        void 0 === n.params ||
          n.destroyed ||
          (n.emit("beforeDestroy"),
          (n.initialized = !1),
          n.detachEvents(),
          i.loop && n.loopDestroy(),
          t &&
            (n.removeClasses(),
            s.removeAttr("style"),
            r.removeAttr("style"),
            o &&
              o.length &&
              o
                .removeClass(
                  [
                    i.slideVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          n.emit("destroy"),
          Object.keys(n.eventsListeners).forEach((e) => {
            n.off(e);
          }),
          !1 !== e &&
            ((n.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(n)),
          (n.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      Pt(cn, e);
    }
    static get extendedDefaults() {
      return cn;
    }
    static get defaults() {
      return on;
    }
    static installModule(e) {
      dn.prototype.__modules__ || (dn.prototype.__modules__ = []);
      const t = dn.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => dn.installModule(e)), dn)
        : (dn.installModule(e), dn);
    }
  }
  Object.keys(ln).forEach((e) => {
    Object.keys(ln[e]).forEach((t) => {
      dn.prototype[t] = ln[e][t];
    });
  }),
    dn.use([
      function ({ swiper: e, on: t, emit: n }) {
        const i = bt();
        let s = null;
        const r = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (n("beforeResize"), n("resize"));
          },
          o = () => {
            e && !e.destroyed && e.initialized && n("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== i.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((s = new ResizeObserver((t) => {
                const { width: n, height: i } = e;
                let s = n,
                  o = i;
                t.forEach(
                  ({ contentBoxSize: t, contentRect: n, target: i }) => {
                    (i && i !== e.el) ||
                      ((s = n ? n.width : (t[0] || t).inlineSize),
                      (o = n ? n.height : (t[0] || t).blockSize));
                  }
                ),
                  (s === n && o === i) || r();
              })),
              s.observe(e.el))
            : (i.addEventListener("resize", r),
              i.addEventListener("orientationchange", o));
        }),
          t("destroy", () => {
            s && s.unobserve && e.el && (s.unobserve(e.el), (s = null)),
              i.removeEventListener("resize", r),
              i.removeEventListener("orientationchange", o);
          });
      },
      function ({ swiper: e, extendParams: t, on: n, emit: i }) {
        const s = [],
          r = bt(),
          o = (e, t = {}) => {
            const n = new (r.MutationObserver || r.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void i("observerUpdate", e[0]);
                const t = function () {
                  i("observerUpdate", e[0]);
                };
                r.requestAnimationFrame
                  ? r.requestAnimationFrame(t)
                  : r.setTimeout(t, 0);
              }
            );
            n.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              s.push(n);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          n("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = e.$el.parents();
                for (let e = 0; e < t.length; e += 1) o(t[e]);
              }
              o(e.$el[0], { childList: e.params.observeSlideChildren }),
                o(e.$wrapperEl[0], { attributes: !1 });
            }
          }),
          n("destroy", () => {
            s.forEach((e) => {
              e.disconnect();
            }),
              s.splice(0, s.length);
          });
      },
    ]);
  const pn = dn;
  function un(e = "") {
    return `.${e
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`;
  }
  function fn({ swiper: e, extendParams: t, on: n, emit: i }) {
    const s = "swiper-pagination";
    let r;
    t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${s}-bullet`,
        bulletActiveClass: `${s}-bullet-active`,
        modifierClass: `${s}-`,
        currentClass: `${s}-current`,
        totalClass: `${s}-total`,
        hiddenClass: `${s}-hidden`,
        progressbarFillClass: `${s}-progressbar-fill`,
        progressbarOppositeClass: `${s}-progressbar-opposite`,
        clickableClass: `${s}-clickable`,
        lockClass: `${s}-lock`,
        horizontalClass: `${s}-horizontal`,
        verticalClass: `${s}-vertical`,
      },
    }),
      (e.pagination = { el: null, $el: null, bullets: [] });
    let o = 0;
    function a() {
      return (
        !e.params.pagination.el ||
        !e.pagination.el ||
        !e.pagination.$el ||
        0 === e.pagination.$el.length
      );
    }
    function l(t, n) {
      const { bulletActiveClass: i } = e.params.pagination;
      t[n]().addClass(`${i}-${n}`)[n]().addClass(`${i}-${n}-${n}`);
    }
    function c() {
      const t = e.rtl,
        n = e.params.pagination;
      if (a()) return;
      const s =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        c = e.pagination.$el;
      let d;
      const p = e.params.loop
        ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
        : e.snapGrid.length;
      if (
        (e.params.loop
          ? ((d = Math.ceil(
              (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
            )),
            d > s - 1 - 2 * e.loopedSlides && (d -= s - 2 * e.loopedSlides),
            d > p - 1 && (d -= p),
            d < 0 && "bullets" !== e.params.paginationType && (d = p + d))
          : (d = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
        "bullets" === n.type &&
          e.pagination.bullets &&
          e.pagination.bullets.length > 0)
      ) {
        const i = e.pagination.bullets;
        let s, a, p;
        if (
          (n.dynamicBullets &&
            ((r = i.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            c.css(
              e.isHorizontal() ? "width" : "height",
              r * (n.dynamicMainBullets + 4) + "px"
            ),
            n.dynamicMainBullets > 1 &&
              void 0 !== e.previousIndex &&
              ((o += d - (e.previousIndex - e.loopedSlides || 0)),
              o > n.dynamicMainBullets - 1
                ? (o = n.dynamicMainBullets - 1)
                : o < 0 && (o = 0)),
            (s = Math.max(d - o, 0)),
            (a = s + (Math.min(i.length, n.dynamicMainBullets) - 1)),
            (p = (a + s) / 2)),
          i.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${n.bulletActiveClass}${e}`)
              .join(" ")
          ),
          c.length > 1)
        )
          i.each((e) => {
            const t = Ot(e),
              i = t.index();
            i === d && t.addClass(n.bulletActiveClass),
              n.dynamicBullets &&
                (i >= s && i <= a && t.addClass(`${n.bulletActiveClass}-main`),
                i === s && l(t, "prev"),
                i === a && l(t, "next"));
          });
        else {
          const t = i.eq(d),
            r = t.index();
          if ((t.addClass(n.bulletActiveClass), n.dynamicBullets)) {
            const t = i.eq(s),
              o = i.eq(a);
            for (let e = s; e <= a; e += 1)
              i.eq(e).addClass(`${n.bulletActiveClass}-main`);
            if (e.params.loop)
              if (r >= i.length) {
                for (let e = n.dynamicMainBullets; e >= 0; e -= 1)
                  i.eq(i.length - e).addClass(`${n.bulletActiveClass}-main`);
                i.eq(i.length - n.dynamicMainBullets - 1).addClass(
                  `${n.bulletActiveClass}-prev`
                );
              } else l(t, "prev"), l(o, "next");
            else l(t, "prev"), l(o, "next");
          }
        }
        if (n.dynamicBullets) {
          const s = Math.min(i.length, n.dynamicMainBullets + 4),
            o = (r * s - r) / 2 - p * r,
            a = t ? "right" : "left";
          i.css(e.isHorizontal() ? a : "top", `${o}px`);
        }
      }
      if (
        ("fraction" === n.type &&
          (c.find(un(n.currentClass)).text(n.formatFractionCurrent(d + 1)),
          c.find(un(n.totalClass)).text(n.formatFractionTotal(p))),
        "progressbar" === n.type)
      ) {
        let t;
        t = n.progressbarOpposite
          ? e.isHorizontal()
            ? "vertical"
            : "horizontal"
          : e.isHorizontal()
          ? "horizontal"
          : "vertical";
        const i = (d + 1) / p;
        let s = 1,
          r = 1;
        "horizontal" === t ? (s = i) : (r = i),
          c
            .find(un(n.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${s}) scaleY(${r})`)
            .transition(e.params.speed);
      }
      "custom" === n.type && n.renderCustom
        ? (c.html(n.renderCustom(e, d + 1, p)), i("paginationRender", c[0]))
        : i("paginationUpdate", c[0]),
        e.params.watchOverflow &&
          e.enabled &&
          c[e.isLocked ? "addClass" : "removeClass"](n.lockClass);
    }
    function d() {
      const t = e.params.pagination;
      if (a()) return;
      const n =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        s = e.pagination.$el;
      let r = "";
      if ("bullets" === t.type) {
        let i = e.params.loop
          ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup)
          : e.snapGrid.length;
        e.params.freeMode &&
          e.params.freeMode.enabled &&
          !e.params.loop &&
          i > n &&
          (i = n);
        for (let n = 0; n < i; n += 1)
          t.renderBullet
            ? (r += t.renderBullet.call(e, n, t.bulletClass))
            : (r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
        s.html(r), (e.pagination.bullets = s.find(un(t.bulletClass)));
      }
      "fraction" === t.type &&
        ((r = t.renderFraction
          ? t.renderFraction.call(e, t.currentClass, t.totalClass)
          : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
        s.html(r)),
        "progressbar" === t.type &&
          ((r = t.renderProgressbar
            ? t.renderProgressbar.call(e, t.progressbarFillClass)
            : `<span class="${t.progressbarFillClass}"></span>`),
          s.html(r)),
        "custom" !== t.type && i("paginationRender", e.pagination.$el[0]);
    }
    function p() {
      e.params.pagination = (function (e, t, n, i) {
        const s = gt();
        return (
          e.params.createElements &&
            Object.keys(i).forEach((r) => {
              if (!n[r] && !0 === n.auto) {
                let o = e.$el.children(`.${i[r]}`)[0];
                o ||
                  ((o = s.createElement("div")),
                  (o.className = i[r]),
                  e.$el.append(o)),
                  (n[r] = o),
                  (t[r] = o);
              }
            }),
          n
        );
      })(e, e.originalParams.pagination, e.params.pagination, {
        el: "swiper-pagination",
      });
      const t = e.params.pagination;
      if (!t.el) return;
      let n = Ot(t.el);
      0 !== n.length &&
        (e.params.uniqueNavElements &&
          "string" == typeof t.el &&
          n.length > 1 &&
          ((n = e.$el.find(t.el)),
          n.length > 1 &&
            (n = n.filter((t) => Ot(t).parents(".swiper")[0] === e.el))),
        "bullets" === t.type && t.clickable && n.addClass(t.clickableClass),
        n.addClass(t.modifierClass + t.type),
        n.addClass(t.modifierClass + e.params.direction),
        "bullets" === t.type &&
          t.dynamicBullets &&
          (n.addClass(`${t.modifierClass}${t.type}-dynamic`),
          (o = 0),
          t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
        "progressbar" === t.type &&
          t.progressbarOpposite &&
          n.addClass(t.progressbarOppositeClass),
        t.clickable &&
          n.on("click", un(t.bulletClass), function (t) {
            t.preventDefault();
            let n = Ot(this).index() * e.params.slidesPerGroup;
            e.params.loop && (n += e.loopedSlides), e.slideTo(n);
          }),
        Object.assign(e.pagination, { $el: n, el: n[0] }),
        e.enabled || n.addClass(t.lockClass));
    }
    function u() {
      const t = e.params.pagination;
      if (a()) return;
      const n = e.pagination.$el;
      n.removeClass(t.hiddenClass),
        n.removeClass(t.modifierClass + t.type),
        n.removeClass(t.modifierClass + e.params.direction),
        e.pagination.bullets &&
          e.pagination.bullets.removeClass &&
          e.pagination.bullets.removeClass(t.bulletActiveClass),
        t.clickable && n.off("click", un(t.bulletClass));
    }
    n("init", () => {
      p(), d(), c();
    }),
      n("activeIndexChange", () => {
        (e.params.loop || void 0 === e.snapIndex) && c();
      }),
      n("snapIndexChange", () => {
        e.params.loop || c();
      }),
      n("slidesLengthChange", () => {
        e.params.loop && (d(), c());
      }),
      n("snapGridLengthChange", () => {
        e.params.loop || (d(), c());
      }),
      n("destroy", () => {
        u();
      }),
      n("enable disable", () => {
        const { $el: t } = e.pagination;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.pagination.lockClass
          );
      }),
      n("lock unlock", () => {
        c();
      }),
      n("click", (t, n) => {
        const s = n.target,
          { $el: r } = e.pagination;
        if (
          e.params.pagination.el &&
          e.params.pagination.hideOnClick &&
          r.length > 0 &&
          !Ot(s).hasClass(e.params.pagination.bulletClass)
        ) {
          if (
            e.navigation &&
            ((e.navigation.nextEl && s === e.navigation.nextEl) ||
              (e.navigation.prevEl && s === e.navigation.prevEl))
          )
            return;
          const t = r.hasClass(e.params.pagination.hiddenClass);
          i(!0 === t ? "paginationShow" : "paginationHide"),
            r.toggleClass(e.params.pagination.hiddenClass);
        }
      }),
      Object.assign(e.pagination, {
        render: d,
        update: c,
        init: p,
        destroy: u,
      });
  }
  function hn({ swiper: e, extendParams: t, on: n, emit: i }) {
    let s;
    function r() {
      const t = e.slides.eq(e.activeIndex);
      let n = e.params.autoplay.delay;
      t.attr("data-swiper-autoplay") &&
        (n = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
        clearTimeout(s),
        (s = Lt(() => {
          let t;
          e.params.autoplay.reverseDirection
            ? e.params.loop
              ? (e.loopFix(),
                (t = e.slidePrev(e.params.speed, !0, !0)),
                i("autoplay"))
              : e.isBeginning
              ? e.params.autoplay.stopOnLastSlide
                ? a()
                : ((t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0)),
                  i("autoplay"))
              : ((t = e.slidePrev(e.params.speed, !0, !0)), i("autoplay"))
            : e.params.loop
            ? (e.loopFix(),
              (t = e.slideNext(e.params.speed, !0, !0)),
              i("autoplay"))
            : e.isEnd
            ? e.params.autoplay.stopOnLastSlide
              ? a()
              : ((t = e.slideTo(0, e.params.speed, !0, !0)), i("autoplay"))
            : ((t = e.slideNext(e.params.speed, !0, !0)), i("autoplay")),
            ((e.params.cssMode && e.autoplay.running) || !1 === t) && r();
        }, n));
    }
    function o() {
      return (
        void 0 === s &&
        !e.autoplay.running &&
        ((e.autoplay.running = !0), i("autoplayStart"), r(), !0)
      );
    }
    function a() {
      return (
        !!e.autoplay.running &&
        void 0 !== s &&
        (s && (clearTimeout(s), (s = void 0)),
        (e.autoplay.running = !1),
        i("autoplayStop"),
        !0)
      );
    }
    function l(t) {
      e.autoplay.running &&
        (e.autoplay.paused ||
          (s && clearTimeout(s),
          (e.autoplay.paused = !0),
          0 !== t && e.params.autoplay.waitForTransition
            ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                e.$wrapperEl[0].addEventListener(t, d);
              })
            : ((e.autoplay.paused = !1), r())));
    }
    function c() {
      const t = gt();
      "hidden" === t.visibilityState && e.autoplay.running && l(),
        "visible" === t.visibilityState &&
          e.autoplay.paused &&
          (r(), (e.autoplay.paused = !1));
    }
    function d(t) {
      e &&
        !e.destroyed &&
        e.$wrapperEl &&
        t.target === e.$wrapperEl[0] &&
        (["transitionend", "webkitTransitionEnd"].forEach((t) => {
          e.$wrapperEl[0].removeEventListener(t, d);
        }),
        (e.autoplay.paused = !1),
        e.autoplay.running ? r() : a());
    }
    function p() {
      e.params.autoplay.disableOnInteraction ? a() : l(),
        ["transitionend", "webkitTransitionEnd"].forEach((t) => {
          e.$wrapperEl[0].removeEventListener(t, d);
        });
    }
    function u() {
      e.params.autoplay.disableOnInteraction || ((e.autoplay.paused = !1), r());
    }
    (e.autoplay = { running: !1, paused: !1 }),
      t({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      }),
      n("init", () => {
        if (e.params.autoplay.enabled) {
          o();
          gt().addEventListener("visibilitychange", c),
            e.params.autoplay.pauseOnMouseEnter &&
              (e.$el.on("mouseenter", p), e.$el.on("mouseleave", u));
        }
      }),
      n("beforeTransitionStart", (t, n, i) => {
        e.autoplay.running &&
          (i || !e.params.autoplay.disableOnInteraction
            ? e.autoplay.pause(n)
            : a());
      }),
      n("sliderFirstMove", () => {
        e.autoplay.running &&
          (e.params.autoplay.disableOnInteraction ? a() : l());
      }),
      n("touchEnd", () => {
        e.params.cssMode &&
          e.autoplay.paused &&
          !e.params.autoplay.disableOnInteraction &&
          r();
      }),
      n("destroy", () => {
        e.$el.off("mouseenter", p),
          e.$el.off("mouseleave", u),
          e.autoplay.running && a();
        gt().removeEventListener("visibilitychange", c);
      }),
      Object.assign(e.autoplay, { pause: l, run: r, start: o, stop: a });
  }
  window.addEventListener("load", function (e) {
    document.querySelector(".main-block__slider") &&
      new pn(".main-block__slider", {
        modules: [hn, fn],
        autoplay: { delay: 7e3, disableOnInteraction: !1 },
        observer: !0,
        observeParents: !0,
        slidesPerView: 1,
        spaceBetween: 30,
        autoHeight: !0,
        speed: 800,
        loop: !0,
        pagination: { el: ".control-main-block__pagination", clickable: !0 },
        on: {
          init: (e) => {
            const t = document.querySelector(".fraction-control__all"),
              n = document.querySelectorAll(
                ".main-block__slide:not(.swiper-slide-duplicate)"
              ).length;
            t.innerHTML = n;
          },
          slideChange: (e) => {
            document.querySelector(
              ".fraction-control__current"
            ).innerHTML = `0${e.realIndex + 1}`;
          },
        },
      });
  });
  let mn = !1;
  function gn(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (mn) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (gn.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          n = t.dataset.da.trim().split(","),
          i = {};
        (i.element = t),
          (i.parent = t.parentNode),
          (i.destination = document.querySelector(n[0].trim())),
          (i.breakpoint = n[1] ? n[1].trim() : "767"),
          (i.place = n[2] ? n[2].trim() : "last"),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.оbjects.push(i);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, n) {
            return Array.prototype.indexOf.call(n, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const n = this.mediaQueries[t],
          i = String.prototype.split.call(n, ","),
          s = window.matchMedia(i[0]),
          r = i[1],
          o = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        s.addListener(function () {
          e.mediaHandler(s, o);
        }),
          this.mediaHandler(s, o);
      }
    }),
    (gn.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          (n.index = this.indexInParent(n.parent, n.element)),
            this.moveTo(n.place, n.element, n.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const n = t[e];
          n.element.classList.contains(this.daClassname) &&
            this.moveBack(n.parent, n.element, n.index);
        }
    }),
    (gn.prototype.moveTo = function (e, t, n) {
      t.classList.add(this.daClassname),
        "last" === e || e >= n.children.length
          ? n.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? n.children[e].insertAdjacentElement("beforebegin", t)
          : n.insertAdjacentElement("afterbegin", t);
    }),
    (gn.prototype.moveBack = function (e, t, n) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[n]
          ? e.children[n].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (gn.prototype.indexInParent = function (e, t) {
      const n = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(n, t);
    }),
    (gn.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new gn("max").init(),
    document.querySelectorAll(".submenu-header__block").forEach((e) => {
      var t = e.querySelectorAll(".submenu-header__category").length;
      e.style.gridTemplateColumns = `repeat(${t}, 1fr)`;
    }),
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-submenu-btn]")) {
        var n = t.closest("[data-submenu-btn]"),
          i = n.dataset.submenuBtn,
          s = document.querySelector(`[data-submenu="${i}"]`);
        if (s) {
          var r = document.querySelector(".submenu-header__block_active"),
            o = document.querySelector(".menu-catalog__button_active");
          r &&
            r !== s &&
            (r.classList.remove("submenu-header__block_active"),
            o.classList.remove("menu-catalog__button_active")),
            s.classList.toggle("submenu-header__block_active"),
            n.classList.toggle("menu-catalog__button_active");
        }
      }
      if (t.closest(".menu-top-header__item_catalog .menu-top-header__link")) {
        document
          .querySelector(".menu-catalog")
          .classList.add("menu-catalog_active");
      }
      if (t.closest(".side-menu-back")) {
        var a = t.closest(".side-menu-back").parentElement,
          l = Array.from(a.classList).find((e) => {
            if (e.endsWith("_active")) return e;
          });
        a.classList.remove(l);
      }
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    document.querySelector(".icon-menu") &&
      document.addEventListener("click", function (e) {
        i &&
          e.target.closest(".icon-menu") &&
          (s(), document.documentElement.classList.toggle("menu-open"));
      }),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const i = Array.from(e).filter(function (e, t, n) {
          return !e.dataset.spollers.split(",")[0];
        });
        i.length && r(i);
        let s = a(e, "spollers");
        function r(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  o(e),
                  e.addEventListener("click", l))
                : (e.classList.remove("_spoller-init"),
                  o(e, !1),
                  e.removeEventListener("click", l));
          });
        }
        function o(e, t = !0) {
          let n = e.querySelectorAll("[data-spoller]");
          n.length &&
            ((n = Array.from(n).filter(
              (t) => t.closest("[data-spollers]") === e
            )),
            n.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function l(e) {
          const i = e.target;
          if (i.closest("[data-spoller]")) {
            const s = i.closest("[data-spoller]"),
              r = s.closest("[data-spollers]"),
              o = r.hasAttribute("data-one-spoller"),
              a = r.dataset.spollersSpeed
                ? parseInt(r.dataset.spollersSpeed)
                : 500;
            r.querySelectorAll("._slide").length ||
              (o && !s.classList.contains("_spoller-active") && c(r),
              s.classList.toggle("_spoller-active"),
              ((e, i = 500) => {
                e.hidden ? n(e, i) : t(e, i);
              })(s.nextElementSibling, a)),
              e.preventDefault();
          }
        }
        function c(e) {
          const n = e.querySelector("[data-spoller]._spoller-active"),
            i = e.dataset.spollersSpeed
              ? parseInt(e.dataset.spollersSpeed)
              : 500;
          n &&
            !e.querySelectorAll("._slide").length &&
            (n.classList.remove("_spoller-active"), t(n.nextElementSibling, i));
        }
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              r(e.itemsArray, e.matchMedia);
            }),
              r(e.itemsArray, e.matchMedia);
          });
      }
    })();
})();
