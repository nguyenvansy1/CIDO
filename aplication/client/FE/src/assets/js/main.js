!function (i) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery) }(function (i) { "use strict"; var e = window.Slick || {}; (e = function () { var e = 0; return function (t, o) { var s, n = this; n.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: i(t), appendDots: i(t), arrows: !0, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (e, t) { return i('<button type="button" />').text(t + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, focusOnChange: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, n.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: !1, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, swiping: !1, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0) } }()).prototype.activateADA = function () { this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) { var s = this; if ("boolean" == typeof t) o = t, t = null; else if (t < 0 || t >= s.slideCount) return !1; s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) { i(t).attr("data-slick-index", e) }), s.$slidesCache = s.$slides, s.reinit() }, e.prototype.animateHeight = function () { var i = this; if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) { var e = i.$slides.eq(i.currentSlide).outerHeight(!0); i.$list.animate({ height: e }, i.options.speed) } }, e.prototype.animateSlide = function (e, t) { var o = {}, s = this; s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({ animStart: s.currentLeft }).animate({ animStart: e }, { duration: s.options.speed, easing: s.options.easing, step: function (i) { i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o)) }, complete: function () { t && t.call() } })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () { s.disableTransition(), t.call() }, s.options.speed)) }, e.prototype.getNavTarget = function () { var e = this, t = e.options.asNavFor; return t && null !== t && (t = i(t).not(e.$slider)), t }, e.prototype.asNavFor = function (e) { var t = this.getNavTarget(); null !== t && "object" == typeof t && t.each(function () { var t = i(this).slick("getSlick"); t.unslicked || t.slideHandler(e, !0) }) }, e.prototype.applyTransition = function (i) { var e = this, t = {}; !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t) }, e.prototype.autoPlay = function () { var i = this; i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed)) }, e.prototype.autoPlayClear = function () { var i = this; i.autoPlayTimer && clearInterval(i.autoPlayTimer) }, e.prototype.autoPlayIterator = function () { var i = this, e = i.currentSlide + i.options.slidesToScroll; i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e)) }, e.prototype.buildArrows = function () { var e = this; !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, e.prototype.buildDots = function () { var e, t, o = this; if (!0 === o.options.dots) { for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1)t.append(i("<li />").append(o.options.customPaging.call(this, o, e))); o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active") } }, e.prototype.buildOut = function () { var e = this; e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) { i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "") }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable") }, e.prototype.buildRows = function () { var i, e, t, o, s, n, r, l = this; if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) { for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) { var d = document.createElement("div"); for (e = 0; e < l.options.rows; e++) { var a = document.createElement("div"); for (t = 0; t < l.options.slidesPerRow; t++) { var c = i * r + (e * l.options.slidesPerRow + t); n.get(c) && a.appendChild(n.get(c)) } d.appendChild(a) } o.appendChild(d) } l.$slider.empty().append(o), l.$slider.children().children().children().css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" }) } }, e.prototype.checkResponsive = function (e, t) { var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width(); if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) { s = null; for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o])); null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]) } }, e.prototype.changeSlide = function (e, t) { var o, s, n, r = this, l = i(e.currentTarget); switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) { case "previous": s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t); break; case "next": s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t); break; case "index": var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll; r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus"); break; default: return } }, e.prototype.checkNavigable = function (i) { var e, t; if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1]; else for (var o in e) { if (i < e[o]) { i = t; break } t = e[o] } return i }, e.prototype.cleanUpEvents = function () { var e = this; e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition) }, e.prototype.cleanUpSlideEvents = function () { var e = this; e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.cleanUpRows = function () { var i, e = this; e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i)) }, e.prototype.clickHandler = function (i) { !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault()) }, e.prototype.destroy = function (e) { var t = this; t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () { i(this).attr("style", i(this).data("originalStyling")) }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]) }, e.prototype.disableTransition = function (i) { var e = this, t = {}; t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t) }, e.prototype.fadeSlide = function (i, e) { var t = this; !1 === t.cssTransitions ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }), e && setTimeout(function () { t.disableTransition(i), e.call() }, t.options.speed)) }, e.prototype.fadeSlideOut = function (i) { var e = this; !1 === e.cssTransitions ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 })) }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) { var e = this; null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit()) }, e.prototype.focusHandler = function () { var e = this; e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) { t.stopImmediatePropagation(); var o = i(this); setTimeout(function () { e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay()) }, 0) }) }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () { return this.currentSlide }, e.prototype.getDotCount = function () { var i = this, e = 0, t = 0, o = 0; if (!0 === i.options.infinite) if (i.slideCount <= i.options.slidesToShow) ++o; else for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else if (!0 === i.options.centerMode) o = i.slideCount; else if (i.options.asNavFor) for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll); return o - 1 }, e.prototype.getLeft = function (i) { var e, t, o, s, n = this, r = 0; return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e }, e.prototype.getOption = e.prototype.slickGetOption = function (i) { return this.options[i] }, e.prototype.getNavigableIndexes = function () { var i, e = this, t = 0, o = 0, s = []; for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;)s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; return s }, e.prototype.getSlick = function () { return this }, e.prototype.getSlideCount = function () { var e, t, o = this; return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) { if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1 }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) { this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e) }, e.prototype.init = function (e) { var t = this; i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay()) }, e.prototype.initADA = function () { var e = this, t = Math.ceil(e.slideCount / e.options.slidesToShow), o = e.getNavigableIndexes().filter(function (i) { return i >= 0 && i < e.slideCount }); e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) { var s = o.indexOf(t); i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s }) }), e.$dots.attr("role", "tablist").find("li").each(function (s) { var n = o[s]; i(this).attr({ role: "presentation" }), i(this).find("button").first().attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" }) }).eq(e.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end()); for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)e.$slides.eq(s).attr("tabindex", 0); e.activateADA() }, e.prototype.initArrowEvents = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler))) }, e.prototype.initDotEvents = function () { var e = this; !0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.initSlideEvents = function () { var e = this; e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1))) }, e.prototype.initializeEvents = function () { var e = this; e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition) }, e.prototype.initUI = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show() }, e.prototype.keyHandler = function (i) { var e = this; i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } })) }, e.prototype.lazyLoad = function () { function e(e) { i("img[data-lazy]", e).each(function () { var e = i(this), t = i(this).attr("data-lazy"), o = i(this).attr("data-srcset"), s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"), r = document.createElement("img"); r.onload = function () { e.animate({ opacity: 0 }, 100, function () { o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({ opacity: 1 }, 200, function () { e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading") }), n.$slider.trigger("lazyLoaded", [n, e, t]) }) }, r.onerror = function () { e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]) }, r.src = t }) } var t, o, s, n = this; if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++; e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)) }, e.prototype.loadSlider = function () { var i = this; i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad() }, e.prototype.next = e.prototype.slickNext = function () { this.changeSlide({ data: { message: "next" } }) }, e.prototype.orientationChange = function () { var i = this; i.checkResponsive(), i.setPosition() }, e.prototype.pause = e.prototype.slickPause = function () { var i = this; i.autoPlayClear(), i.paused = !0 }, e.prototype.play = e.prototype.slickPlay = function () { var i = this; i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1 }, e.prototype.postSlide = function (e) { var t = this; t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus())) }, e.prototype.prev = e.prototype.slickPrev = function () { this.changeSlide({ data: { message: "previous" } }) }, e.prototype.preventDefault = function (i) { i.preventDefault() }, e.prototype.progressiveLazyLoad = function (e) { e = e || 1; var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider); d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () { s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad() }, r.onerror = function () { e < 3 ? setTimeout(function () { l.progressiveLazyLoad(e + 1) }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad()) }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]) }, e.prototype.refresh = function (e) { var t, o, s = this; o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, { currentSlide: t }), s.init(), e || s.changeSlide({ data: { message: "index", index: t } }, !1) }, e.prototype.registerBreakpoints = function () { var e, t, o, s = this, n = s.options.responsive || null; if ("array" === i.type(n) && n.length) { s.respondTo = s.options.respondTo || "window"; for (e in n) if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) { for (t = n[e].breakpoint; o >= 0;)s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--; s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings } s.breakpoints.sort(function (i, e) { return s.options.mobileFirst ? i - e : e - i }) } }, e.prototype.reinit = function () { var e = this; e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]) }, e.prototype.resize = function () { var e = this; i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () { e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition() }, 50)) }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) { var o = this; if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1; o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit() }, e.prototype.setCSS = function (i) { var e, t, o = this, s = {}; !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s))) }, e.prototype.setDimensions = function () { var i = this; !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length))); var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width(); !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e) }, e.prototype.setFade = function () { var e, t = this; t.$slides.each(function (o, s) { e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) }), t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 }) }, e.prototype.setHeight = function () { var i = this; if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) { var e = i.$slides.eq(i.currentSlide).outerHeight(!0); i.$list.css("height", e) } }, e.prototype.setOption = e.prototype.slickSetOption = function () { var e, t, o, s, n, r = this, l = !1; if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s; else if ("multiple" === n) i.each(o, function (i, e) { r.options[i] = e }); else if ("responsive" === n) for (t in s) if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]]; else { for (e = r.options.responsive.length - 1; e >= 0;)r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--; r.options.responsive.push(s[t]) } l && (r.unload(), r.reinit()) }, e.prototype.setPosition = function () { var i = this; i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]) }, e.prototype.setProps = function () { var i = this, e = document.body.style; i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType }, e.prototype.setSlideClasses = function (i) { var e, t, o, s, n = this; if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) { var r = n.options.slidesToShow % 2 == 0 ? 1 : 0; e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center") } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")); "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad() }, e.prototype.setupInfinite = function () { var e, t, o, s = this; if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) { for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned"); for (e = 0; e < o + s.slideCount; e += 1)t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned"); s.$slideTrack.find(".slick-cloned").find("[id]").each(function () { i(this).attr("id", "") }) } }, e.prototype.interrupt = function (i) { var e = this; i || e.autoPlay(), e.interrupted = i }, e.prototype.selectHandler = function (e) { var t = this, o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"), s = parseInt(o.attr("data-slick-index")); s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s) }, e.prototype.slideHandler = function (i, e, t) { var o, s, n, r, l, d = null, a = this; if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () { a.postSlide(o) }) : a.postSlide(o)); else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () { a.postSlide(o) }) : a.postSlide(o)); else { if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () { a.postSlide(s) })) : a.postSlide(s), void a.animateHeight(); !0 !== t ? a.animateSlide(d, function () { a.postSlide(s) }) : a.postSlide(s) } }, e.prototype.startLoad = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading") }, e.prototype.swipeDirection = function () { var i, e, t, o, s = this; return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical" }, e.prototype.swipeEnd = function (i) { var e, t, o = this; if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1; if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1; if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) { switch (t = o.swipeDirection()) { case "left": case "down": e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0; break; case "right": case "up": e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1 }"vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t])) } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {}) }, e.prototype.swipeHandler = function (i) { var e = this; if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) { case "start": e.swipeStart(i); break; case "move": e.swipeMove(i); break; case "end": e.swipeEnd(i) } }, e.prototype.swipeMove = function (i) { var e, t, o, s, n, r, l = this; return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft)))) }, e.prototype.swipeStart = function (i) { var e, t = this; if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1; void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0 }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () { var i = this; null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit()) }, e.prototype.unload = function () { var e = this; i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, e.prototype.unslick = function (i) { var e = this; e.$slider.trigger("unslick", [e, i]), e.destroy() }, e.prototype.updateArrows = function () { var i = this; Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, e.prototype.updateDots = function () { var i = this; null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active")) }, e.prototype.visibility = function () { var i = this; i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1) }, i.fn.slick = function () { var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length; for (i = 0; i < r; i++)if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t; return o } });



/*!
 * Isotope PACKAGED v3.0.1
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.0
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function(window, factory) {
    'use strict';
    /* globals define: false, module: false, require: false */
  
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('jquery-bridget/jquery-bridget',[ 'jquery' ], function(jQuery) {
        factory(window, jQuery);
      });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        window,
        require('jquery')
     );
    } else {
      // browser global
      window.jQueryBridget = factory(
        window,
        window.jQuery
     );
    }
  
  }(window, function factory(window, jQuery) {
  'use strict';
  
  // ----- utils ----- //
  
  var arraySlice = Array.prototype.slice;
  
  // helper function for logging errors
  // $.error breaks jQuery chaining
  var console = window.console;
  var logError = typeof console == 'undefined' ? function() {} :
    function(message) {
      console.error(message);
    };
  
  // ----- jQueryBridget ----- //
  
  function jQueryBridget(namespace, PluginClass, $) {
    $ = $ || jQuery || window.jQuery;
    if (!$) {
      return;
    }
  
    // add option method -> $().plugin('option', {...})
    if (!PluginClass.prototype.option) {
      // option setter
      PluginClass.prototype.option = function(opts) {
        // bail out if not an object
        if (!$.isPlainObject(opts)){
          return;
        }
        this.options = $.extend(true, this.options, opts);
      };
    }
  
    // make jQuery plugin
    $.fn[ namespace ] = function(arg0 /*, arg1 */) {
      if (typeof arg0 == 'string') {
        // method call $().plugin('methodName', { options })
        // shift arguments by 1
        var args = arraySlice.call(arguments, 1);
        return methodCall(this, arg0, args);
      }
      // just $().plugin({ options })
      plainCall(this, arg0);
      return this;
    };
  
    // $().plugin('methodName')
    function methodCall($elems, methodName, args) {
      var returnValue;
      var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';
  
      $elems.each(function(i, elem) {
        // get instance
        var instance = $.data(elem, namespace);
        if (!instance) {
          logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
            pluginMethodStr);
          return;
        }
  
        var method = instance[ methodName ];
        if (!method || methodName.charAt(0) == '_') {
          logError(pluginMethodStr + ' is not a valid method');
          return;
        }
  
        // apply method, get return value
        var value = method.apply(instance, args);
        // set return value if value is returned, use only first value
        returnValue = returnValue === undefined ? value : returnValue;
      });
  
      return returnValue !== undefined ? returnValue : $elems;
    }
  
    function plainCall($elems, options) {
      $elems.each(function(i, elem) {
        var instance = $.data(elem, namespace);
        if (instance) {
          // set options & init
          instance.option(options);
          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass(elem, options);
          $.data(elem, namespace, instance);
        }
      });
    }
  
    updateJQuery($);
  
  }
  
  // ----- updateJQuery ----- //
  
  // set $.bridget for v1 backwards compatibility
  function updateJQuery($) {
    if (!$ || ($ && $.bridget)) {
      return;
    }
    $.bridget = jQueryBridget;
  }
  
  updateJQuery(jQuery || window.jQuery);
  
  // -----  ----- //
  
  return jQueryBridget;
  
  }));
  
  /**
   * EvEmitter v1.0.3
   * Lil' event emitter
   * MIT License
   */
  
  /* jshint unused: true, undef: true, strict: true */
  
  (function(global, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, window */
    if (typeof define == 'function' && define.amd) {
      // AMD - RequireJS
      define('ev-emitter/ev-emitter',factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS - Browserify, Webpack
      module.exports = factory();
    } else {
      // Browser globals
      global.EvEmitter = factory();
    }
  
  }(typeof window != 'undefined' ? window : this, function() {
  
  
  
  function EvEmitter() {}
  
  var proto = EvEmitter.prototype;
  
  proto.on = function(eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[ eventName ] = events[ eventName ] || [];
    // only add once
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }
  
    return this;
  };
  
  proto.once = function(eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // add event
    this.on(eventName, listener);
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
    // set flag
    onceListeners[ listener ] = true;
  
    return this;
  };
  
  proto.off = function(eventName, listener) {
    var listeners = this._events && this._events[ eventName ];
    if (!listeners || !listeners.length) {
      return;
    }
    var index = listeners.indexOf(listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }
  
    return this;
  };
  
  proto.emitEvent = function(eventName, args) {
    var listeners = this._events && this._events[ eventName ];
    if (!listeners || !listeners.length) {
      return;
    }
    var i = 0;
    var listener = listeners[i];
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[ eventName ];
  
    while (listener) {
      var isOnce = onceListeners && onceListeners[ listener ];
      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener);
        // unset once flag
        delete onceListeners[ listener ];
      }
      // trigger listener
      listener.apply(this, args);
      // get next listener
      i += isOnce ? 0 : 1;
      listener = listeners[i];
    }
  
    return this;
  };
  
  return EvEmitter;
  
  }));
  
  /*!
   * getSize v2.0.2
   * measure size of elements
   * MIT license
   */
  
  /*jshint browser: true, strict: true, undef: true, unused: true */
  /*global define: false, module: false, console: false */
  
  (function(window, factory) {
    'use strict';
  
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('get-size/get-size',[],function() {
        return factory();
      });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory();
    } else {
      // browser global
      window.getSize = factory();
    }
  
  })(window, function factory() {
  'use strict';
  
  // -------------------------- helpers -------------------------- //
  
  // get a number from a string, not a percentage
  function getStyleSize(value) {
    var num = parseFloat(value);
    // not a percent like '100%', and a number
    var isValid = value.indexOf('%') == -1 && !isNaN(num);
    return isValid && num;
  }
  
  function noop() {}
  
  var logError = typeof console == 'undefined' ? noop :
    function(message) {
      console.error(message);
    };
  
  // -------------------------- measurements -------------------------- //
  
  var measurements = [
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
    'borderBottomWidth'
  ];
  
  var measurementsLength = measurements.length;
  
  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };
    for (var i=0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      size[ measurement ] = 0;
    }
    return size;
  }
  
  // -------------------------- getStyle -------------------------- //
  
  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */
  function getStyle(elem) {
    var style = getComputedStyle(elem);
    if (!style) {
      logError('Style returned ' + style +
        '. Are you running this code in a hidden iframe on Firefox? ' +
        'See http://bit.ly/getsizebug1');
    }
    return style;
  }
  
  // -------------------------- setup -------------------------- //
  
  var isSetup = false;
  
  var isBoxSizeOuter;
  
  /**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */
  function setup() {
    // setup once
    if (isSetup) {
      return;
    }
    isSetup = true;
  
    // -------------------------- box sizing -------------------------- //
  
    /**
     * WebKit measures the outer-width on style.width on border-box elems
     * IE & Firefox<29 measures the inner-width
     */
    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style.boxSizing = 'border-box';
  
    var body = document.body || document.documentElement;
    body.appendChild(div);
    var style = getStyle(div);
  
    getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200;
    body.removeChild(div);
  
  }
  
  // -------------------------- getSize -------------------------- //
  
  function getSize(elem) {
    setup();
  
    // use querySeletor if elem is string
    if (typeof elem == 'string') {
      elem = document.querySelector(elem);
    }
  
    // do not proceed on non-objects
    if (!elem || typeof elem != 'object' || !elem.nodeType) {
      return;
    }
  
    var style = getStyle(elem);
  
    // if hidden, everything is 0
    if (style.display == 'none') {
      return getZeroSize();
    }
  
    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;
  
    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';
  
    // get all measurements
    for (var i=0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      var value = style[ measurement ];
      var num = parseFloat(value);
      // any 'auto', 'medium' value will be 0
      size[ measurement ] = !isNaN(num) ? num : 0;
    }
  
    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;
  
    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
  
    // overwrite width and height if we can get it from style
    var styleWidth = getStyleSize(style.width);
    if (styleWidth !== false) {
      size.width = styleWidth +
        // add padding and border unless it's already including it
        (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }
  
    var styleHeight = getStyleSize(style.height);
    if (styleHeight !== false) {
      size.height = styleHeight +
        // add padding and border unless it's already including it
        (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }
  
    size.innerWidth = size.width - (paddingWidth + borderWidth);
    size.innerHeight = size.height - (paddingHeight + borderHeight);
  
    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;
  
    return size;
  }
  
  return getSize;
  
  });
  
  /**
   * matchesSelector v2.0.1
   * matchesSelector(element, '.selector')
   * MIT license
   */
  
  /*jshint browser: true, strict: true, undef: true, unused: true */
  
  (function(window, factory) {
    /*global define: false, module: false */
    'use strict';
    // universal module definition
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('desandro-matches-selector/matches-selector',factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory();
    } else {
      // browser global
      window.matchesSelector = factory();
    }
  
  }(window, function factory() {
    'use strict';
  
    var matchesMethod = (function() {
      var ElemProto = Element.prototype;
      // check for the standard method name first
      if (ElemProto.matches) {
        return 'matches';
      }
      // check un-prefixed
      if (ElemProto.matchesSelector) {
        return 'matchesSelector';
      }
      // check vendor prefixes
      var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];
  
      for (var i=0; i < prefixes.length; i++) {
        var prefix = prefixes[i];
        var method = prefix + 'MatchesSelector';
        if (ElemProto[ method ]) {
          return method;
        }
      }
    })();
  
    return function matchesSelector(elem, selector) {
      return elem[ matchesMethod ](selector);
    };
  
  }));
  
  /**
   * Fizzy UI utils v2.0.2
   * MIT license
   */
  
  /*jshint browser: true, undef: true, unused: true, strict: true */
  
  (function(window, factory) {
    // universal module definition
    /*jshint strict: false */ /*globals define, module, require */
  
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('fizzy-ui-utils/utils',[
        'desandro-matches-selector/matches-selector'
      ], function(matchesSelector) {
        return factory(window, matchesSelector);
      });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        window,
        require('desandro-matches-selector')
     );
    } else {
      // browser global
      window.fizzyUIUtils = factory(
        window,
        window.matchesSelector
     );
    }
  
  }(window, function factory(window, matchesSelector) {
  
  
  
  var utils = {};
  
  // ----- extend ----- //
  
  // extends objects
  utils.extend = function(a, b) {
    for (var prop in b) {
      a[ prop ] = b[ prop ];
    }
    return a;
  };
  
  // ----- modulo ----- //
  
  utils.modulo = function(num, div) {
    return ((num % div) + div) % div;
  };
  
  // ----- makeArray ----- //
  
  // turn element or nodeList into an array
  utils.makeArray = function(obj) {
    var ary = [];
    if (Array.isArray(obj)) {
      // use object if already an array
      ary = obj;
    } else if (obj && typeof obj.length == 'number') {
      // convert nodeList to array
      for (var i=0; i < obj.length; i++) {
        ary.push(obj[i]);
      }
    } else {
      // array of single index
      ary.push(obj);
    }
    return ary;
  };
  
  // ----- removeFrom ----- //
  
  utils.removeFrom = function(ary, obj) {
    var index = ary.indexOf(obj);
    if (index != -1) {
      ary.splice(index, 1);
    }
  };
  
  // ----- getParent ----- //
  
  utils.getParent = function(elem, selector) {
    while (elem != document.body) {
      elem = elem.parentNode;
      if (matchesSelector(elem, selector)) {
        return elem;
      }
    }
  };
  
  // ----- getQueryElement ----- //
  
  // use element as selector string
  utils.getQueryElement = function(elem) {
    if (typeof elem == 'string') {
      return document.querySelector(elem);
    }
    return elem;
  };
  
  // ----- handleEvent ----- //
  
  // enable .ontype to trigger from .addEventListener(elem, 'type')
  utils.handleEvent = function(event) {
    var method = 'on' + event.type;
    if (this[ method ]) {
      this[ method ](event);
    }
  };
  
  // ----- filterFindElements ----- //
  
  utils.filterFindElements = function(elems, selector) {
    // make array of elems
    elems = utils.makeArray(elems);
    var ffElems = [];
  
    elems.forEach(function(elem) {
      // check that elem is an actual element
      if (!(elem instanceof HTMLElement)) {
        return;
      }
      // add elem if no selector
      if (!selector) {
        ffElems.push(elem);
        return;
      }
      // filter & find items if we have a selector
      // filter
      if (matchesSelector(elem, selector)) {
        ffElems.push(elem);
      }
      // find children
      var childElems = elem.querySelectorAll(selector);
      // concat childElems to filterFound array
      for (var i=0; i < childElems.length; i++) {
        ffElems.push(childElems[i]);
      }
    });
  
    return ffElems;
  };
  
  // ----- debounceMethod ----- //
  
  utils.debounceMethod = function(_class, methodName, threshold) {
    // original method
    var method = _class.prototype[ methodName ];
    var timeoutName = methodName + 'Timeout';
  
    _class.prototype[ methodName ] = function() {
      var timeout = this[ timeoutName ];
      if (timeout) {
        clearTimeout(timeout);
      }
      var args = arguments;
  
      var _this = this;
      this[ timeoutName ] = setTimeout(function() {
        method.apply(_this, args);
        delete _this[ timeoutName ];
      }, threshold || 100);
    };
  };
  
  // ----- docReady ----- //
  
  utils.docReady = function(callback) {
    var readyState = document.readyState;
    if (readyState == 'complete' || readyState == 'interactive') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };
  
  // ----- htmlInit ----- //
  
  // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
  utils.toDashed = function(str) {
    return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
      return $1 + '-' + $2;
    }).toLowerCase();
  };
  
  var console = window.console;
  /**
   * allow user to initialize classes via [data-namespace] or .js-namespace class
   * htmlInit(Widget, 'widgetName')
   * options are parsed from data-namespace-options
   */
  utils.htmlInit = function(WidgetClass, namespace) {
    utils.docReady(function() {
      var dashedNamespace = utils.toDashed(namespace);
      var dataAttr = 'data-' + dashedNamespace;
      var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
      var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
      var elems = utils.makeArray(dataAttrElems)
        .concat(utils.makeArray(jsDashElems));
      var dataOptionsAttr = dataAttr + '-options';
      var jQuery = window.jQuery;
  
      elems.forEach(function(elem) {
        var attr = elem.getAttribute(dataAttr) ||
          elem.getAttribute(dataOptionsAttr);
        var options;
        try {
          options = attr && JSON.parse(attr);
        } catch (error) {
          // log error, do not initialize
          if (console) {
            console.error('Error parsing ' + dataAttr + ' on ' + elem.className +
            ': ' + error);
          }
          return;
        }
        // initialize
        var instance = new WidgetClass(elem, options);
        // make available via $().data('layoutname')
        if (jQuery) {
          jQuery.data(elem, namespace, instance);
        }
      });
  
    });
  };
  
  // -----  ----- //
  
  return utils;
  
  }));
  
  /**
   * Outlayer Item
   */
  
  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD - RequireJS
      define('outlayer/item',[
          'ev-emitter/ev-emitter',
          'get-size/get-size'
        ],
        factory
     );
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS - Browserify, Webpack
      module.exports = factory(
        require('ev-emitter'),
        require('get-size')
     );
    } else {
      // browser global
      window.Outlayer = {};
      window.Outlayer.Item = factory(
        window.EvEmitter,
        window.getSize
     );
    }
  
  }(window, function factory(EvEmitter, getSize) {
  'use strict';
  
  // ----- helpers ----- //
  
  function isEmptyObj(obj) {
    for (var prop in obj) {
      return false;
    }
    prop = null;
    return true;
  }
  
  // -------------------------- CSS3 support -------------------------- //
  
  
  var docElemStyle = document.documentElement.style;
  
  var transitionProperty = typeof docElemStyle.transition == 'string' ?
    'transition' : 'WebkitTransition';
  var transformProperty = typeof docElemStyle.transform == 'string' ?
    'transform' : 'WebkitTransform';
  
  var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
  }[ transitionProperty ];
  
  // cache all vendor properties that could have vendor prefix
  var vendorProperties = {
    transform: transformProperty,
    transition: transitionProperty,
    transitionDuration: transitionProperty + 'Duration',
    transitionProperty: transitionProperty + 'Property',
    transitionDelay: transitionProperty + 'Delay'
  };
  
  // -------------------------- Item -------------------------- //
  
  function Item(element, layout) {
    if (!element) {
      return;
    }
  
    this.element = element;
    // parent layout class, i.e. Masonry, Isotope, or Packery
    this.layout = layout;
    this.position = {
      x: 0,
      y: 0
    };
  
    this._create();
  }
  
  // inherit EvEmitter
  var proto = Item.prototype = Object.create(EvEmitter.prototype);
  proto.constructor = Item;
  
  proto._create = function() {
    // transition objects
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    };
  
    this.css({
      position: 'absolute'
    });
  };
  
  // trigger specified handler for event type
  proto.handleEvent = function(event) {
    var method = 'on' + event.type;
    if (this[ method ]) {
      this[ method ](event);
    }
  };
  
  proto.getSize = function() {
    this.size = getSize(this.element);
  };
  
  /**
   * apply CSS styles to element
   * @param {Object} style
   */
  proto.css = function(style) {
    var elemStyle = this.element.style;
  
    for (var prop in style) {
      // use vendor property if available
      var supportedProp = vendorProperties[ prop ] || prop;
      elemStyle[ supportedProp ] = style[ prop ];
    }
  };
  
   // measure position, and sets it
  proto.getPosition = function() {
    var style = getComputedStyle(this.element);
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
    var xValue = style[ isOriginLeft ? 'left' : 'right' ];
    var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
    // convert percent to pixels
    var layoutSize = this.layout.size;
    var x = xValue.indexOf('%') != -1 ?
      (parseFloat(xValue) / 100) * layoutSize.width : parseInt(xValue, 10);
    var y = yValue.indexOf('%') != -1 ?
      (parseFloat(yValue) / 100) * layoutSize.height : parseInt(yValue, 10);
  
    // clean up 'auto' or other non-integer values
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    // remove padding from measurement
    x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
    y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
  
    this.position.x = x;
    this.position.y = y;
  };
  
  // set settled position, apply padding
  proto.layoutPosition = function() {
    var layoutSize = this.layout.size;
    var style = {};
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
  
    // x
    var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
    var xProperty = isOriginLeft ? 'left' : 'right';
    var xResetProperty = isOriginLeft ? 'right' : 'left';
  
    var x = this.position.x + layoutSize[ xPadding ];
    // set in percentage or pixels
    style[ xProperty ] = this.getXValue(x);
    // reset other property
    style[ xResetProperty ] = '';
  
    // y
    var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
    var yProperty = isOriginTop ? 'top' : 'bottom';
    var yResetProperty = isOriginTop ? 'bottom' : 'top';
  
    var y = this.position.y + layoutSize[ yPadding ];
    // set in percentage or pixels
    style[ yProperty ] = this.getYValue(y);
    // reset other property
    style[ yResetProperty ] = '';
  
    this.css(style);
    this.emitEvent('layout', [ this ]);
  };
  
  proto.getXValue = function(x) {
    var isHorizontal = this.layout._getOption('horizontal');
    return this.layout.options.percentPosition && !isHorizontal ?
      ((x / this.layout.size.width) * 100) + '%' : x + 'px';
  };
  
  proto.getYValue = function(y) {
    var isHorizontal = this.layout._getOption('horizontal');
    return this.layout.options.percentPosition && isHorizontal ?
      ((y / this.layout.size.height) * 100) + '%' : y + 'px';
  };
  
  proto._transitionTo = function(x, y) {
    this.getPosition();
    // get current x & y from top/left
    var curX = this.position.x;
    var curY = this.position.y;
  
    var compareX = parseInt(x, 10);
    var compareY = parseInt(y, 10);
    var didNotMove = compareX === this.position.x && compareY === this.position.y;
  
    // save end position
    this.setPosition(x, y);
  
    // if did not move and not transitioning, just go to layout
    if (didNotMove && !this.isTransitioning) {
      this.layoutPosition();
      return;
    }
  
    var transX = x - curX;
    var transY = y - curY;
    var transitionStyle = {};
    transitionStyle.transform = this.getTranslate(transX, transY);
  
    this.transition({
      to: transitionStyle,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: true
    });
  };
  
  proto.getTranslate = function(x, y) {
    // flip cooridinates if origin on right or bottom
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
    x = isOriginLeft ? x : -x;
    y = isOriginTop ? y : -y;
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  };
  
  // non transition + transform support
  proto.goTo = function(x, y) {
    this.setPosition(x, y);
    this.layoutPosition();
  };
  
  proto.moveTo = proto._transitionTo;
  
  proto.setPosition = function(x, y) {
    this.position.x = parseInt(x, 10);
    this.position.y = parseInt(y, 10);
  };
  
  // ----- transition ----- //
  
  /**
   * @param {Object} style - CSS
   * @param {Function} onTransitionEnd
   */
  
  // non transition, just trigger callback
  proto._nonTransition = function(args) {
    this.css(args.to);
    if (args.isCleaning) {
      this._removeStyles(args.to);
    }
    for (var prop in args.onTransitionEnd) {
      args.onTransitionEnd[ prop ].call(this);
    }
  };
  
  /**
   * proper transition
   * @param {Object} args - arguments
   *   @param {Object} to - style to transition to
   *   @param {Object} from - style to start transition from
   *   @param {Boolean} isCleaning - removes transition styles after transition
   *   @param {Function} onTransitionEnd - callback
   */
  proto.transition = function(args) {
    // redirect to nonTransition if no transition duration
    if (!parseFloat(this.layout.options.transitionDuration)) {
      this._nonTransition(args);
      return;
    }
  
    var _transition = this._transn;
    // keep track of onTransitionEnd callback by css property
    for (var prop in args.onTransitionEnd) {
      _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
    }
    // keep track of properties that are transitioning
    for (prop in args.to) {
      _transition.ingProperties[ prop ] = true;
      // keep track of properties to clean up when transition is done
      if (args.isCleaning) {
        _transition.clean[ prop ] = true;
      }
    }
  
    // set from styles
    if (args.from) {
      this.css(args.from);
      // force redraw. http://blog.alexmaccaw.com/css-transitions
      var h = this.element.offsetHeight;
      // hack for JSHint to hush about unused var
      h = null;
    }
    // enable transition
    this.enableTransition(args.to);
    // set styles that are transitioning
    this.css(args.to);
  
    this.isTransitioning = true;
  
  };
  
  // dash before all cap letters, including first for
  // WebkitTransform => -webkit-transform
  function toDashedAll(str) {
    return str.replace(/([A-Z])/g, function($1) {
      return '-' + $1.toLowerCase();
    });
  }
  
  var transitionProps = 'opacity,' + toDashedAll(transformProperty);
  
  proto.enableTransition = function(/* style */) {
    // HACK changing transitionProperty during a transition
    // will cause transition to jump
    if (this.isTransitioning) {
      return;
    }
  
    // make `transition: foo, bar, baz` from style object
    // HACK un-comment this when enableTransition can work
    // while a transition is happening
    // var transitionValues = [];
    // for (var prop in style) {
    //   // dash-ify camelCased properties like WebkitTransition
    //   prop = vendorProperties[ prop ] || prop;
    //   transitionValues.push(toDashedAll(prop));
    // }
    // munge number to millisecond, to match stagger
    var duration = this.layout.options.transitionDuration;
    duration = typeof duration == 'number' ? duration + 'ms' : duration;
    // enable transition styles
    this.css({
      transitionProperty: transitionProps,
      transitionDuration: duration,
      transitionDelay: this.staggerDelay || 0
    });
    // listen for transition end event
    this.element.addEventListener(transitionEndEvent, this, false);
  };
  
  // ----- events ----- //
  
  proto.onwebkitTransitionEnd = function(event) {
    this.ontransitionend(event);
  };
  
  proto.onotransitionend = function(event) {
    this.ontransitionend(event);
  };
  
  // properties that I munge to make my life easier
  var dashedVendorProperties = {
    '-webkit-transform': 'transform'
  };
  
  proto.ontransitionend = function(event) {
    // disregard bubbled events from children
    if (event.target !== this.element) {
      return;
    }
    var _transition = this._transn;
    // get property name of transitioned property, convert to prefix-free
    var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;
  
    // remove property that has completed transitioning
    delete _transition.ingProperties[ propertyName ];
    // check if any properties are still transitioning
    if (isEmptyObj(_transition.ingProperties)) {
      // all properties have completed transitioning
      this.disableTransition();
    }
    // clean style
    if (propertyName in _transition.clean) {
      // clean up style
      this.element.style[ event.propertyName ] = '';
      delete _transition.clean[ propertyName ];
    }
    // trigger onTransitionEnd callback
    if (propertyName in _transition.onEnd) {
      var onTransitionEnd = _transition.onEnd[ propertyName ];
      onTransitionEnd.call(this);
      delete _transition.onEnd[ propertyName ];
    }
  
    this.emitEvent('transitionEnd', [ this ]);
  };
  
  proto.disableTransition = function() {
    this.removeTransitionStyles();
    this.element.removeEventListener(transitionEndEvent, this, false);
    this.isTransitioning = false;
  };
  
  /**
   * removes style property from element
   * @param {Object} style
  **/
  proto._removeStyles = function(style) {
    // clean up transition styles
    var cleanStyle = {};
    for (var prop in style) {
      cleanStyle[ prop ] = '';
    }
    this.css(cleanStyle);
  };
  
  var cleanTransitionStyle = {
    transitionProperty: '',
    transitionDuration: '',
    transitionDelay: ''
  };
  
  proto.removeTransitionStyles = function() {
    // remove transition
    this.css(cleanTransitionStyle);
  };
  
  // ----- stagger ----- //
  
  proto.stagger = function(delay) {
    delay = isNaN(delay) ? 0 : delay;
    this.staggerDelay = delay + 'ms';
  };
  
  // ----- show/hide/remove ----- //
  
  // remove element from DOM
  proto.removeElem = function() {
    this.element.parentNode.removeChild(this.element);
    // remove display: none
    this.css({ display: '' });
    this.emitEvent('remove', [ this ]);
  };
  
  proto.remove = function() {
    // just remove element if no transition support or no transition
    if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
      this.removeElem();
      return;
    }
  
    // start transition
    this.once('transitionEnd', function() {
      this.removeElem();
    });
    this.hide();
  };
  
  proto.reveal = function() {
    delete this.isHidden;
    // remove display: none
    this.css({ display: '' });
  
    var options = this.layout.options;
  
    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
    onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;
  
    this.transition({
      from: options.hiddenStyle,
      to: options.visibleStyle,
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };
  
  proto.onRevealTransitionEnd = function() {
    // check if still visible
    // during transition, item may have been hidden
    if (!this.isHidden) {
      this.emitEvent('reveal');
    }
  };
  
  /**
   * get style property use for hide/reveal transition end
   * @param {String} styleProperty - hiddenStyle/visibleStyle
   * @returns {String}
   */
  proto.getHideRevealTransitionEndProperty = function(styleProperty) {
    var optionStyle = this.layout.options[ styleProperty ];
    // use opacity
    if (optionStyle.opacity) {
      return 'opacity';
    }
    // get first property
    for (var prop in optionStyle) {
      return prop;
    }
  };
  
  proto.hide = function() {
    // set flag
    this.isHidden = true;
    // remove display: none
    this.css({ display: '' });
  
    var options = this.layout.options;
  
    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
    onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;
  
    this.transition({
      from: options.visibleStyle,
      to: options.hiddenStyle,
      // keep hidden stuff hidden
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };
  
  proto.onHideTransitionEnd = function() {
    // check if still hidden
    // during transition, item may have been un-hidden
    if (this.isHidden) {
      this.css({ display: 'none' });
      this.emitEvent('hide');
    }
  };
  
  proto.destroy = function() {
    this.css({
      position: '',
      left: '',
      right: '',
      top: '',
      bottom: '',
      transition: '',
      transform: ''
    });
  };
  
  return Item;
  
  }));
  
  /*!
   * Outlayer v2.1.0
   * the brains and guts of a layout library
   * MIT license
   */
  
  (function(window, factory) {
    'use strict';
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD - RequireJS
      define('outlayer/outlayer',[
          'ev-emitter/ev-emitter',
          'get-size/get-size',
          'fizzy-ui-utils/utils',
          './item'
        ],
        function(EvEmitter, getSize, utils, Item) {
          return factory(window, EvEmitter, getSize, utils, Item);
        }
     );
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS - Browserify, Webpack
      module.exports = factory(
        window,
        require('ev-emitter'),
        require('get-size'),
        require('fizzy-ui-utils'),
        require('./item')
     );
    } else {
      // browser global
      window.Outlayer = factory(
        window,
        window.EvEmitter,
        window.getSize,
        window.fizzyUIUtils,
        window.Outlayer.Item
     );
    }
  
  }(window, function factory(window, EvEmitter, getSize, utils, Item) {
  'use strict';
  
  // ----- vars ----- //
  
  var console = window.console;
  var jQuery = window.jQuery;
  var noop = function() {};
  
  // -------------------------- Outlayer -------------------------- //
  
  // globally unique identifiers
  var GUID = 0;
  // internal store of all Outlayer intances
  var instances = {};
  
  
  /**
   * @param {Element, String} element
   * @param {Object} options
   * @constructor
   */
  function Outlayer(element, options) {
    var queryElement = utils.getQueryElement(element);
    if (!queryElement) {
      if (console) {
        console.error('Bad element for ' + this.constructor.namespace +
          ': ' + (queryElement || element));
      }
      return;
    }
    this.element = queryElement;
    // add jQuery
    if (jQuery) {
      this.$element = jQuery(this.element);
    }
  
    // options
    this.options = utils.extend({}, this.constructor.defaults);
    this.option(options);
  
    // add id for Outlayer.getFromElement
    var id = ++GUID;
    this.element.outlayerGUID = id; // expando
    instances[ id ] = this; // associate via id
  
    // kick it off
    this._create();
  
    var isInitLayout = this._getOption('initLayout');
    if (isInitLayout) {
      this.layout();
    }
  }
  
  // settings are for internal use only
  Outlayer.namespace = 'outlayer';
  Outlayer.Item = Item;
  
  // default options
  Outlayer.defaults = {
    containerStyle: {
      position: 'relative'
    },
    initLayout: true,
    originLeft: true,
    originTop: true,
    resize: true,
    resizeContainer: true,
    // item options
    transitionDuration: '0.4s',
    hiddenStyle: {
      opacity: 0,
      transform: 'scale(0.001)'
    },
    visibleStyle: {
      opacity: 1,
      transform: 'scale(1)'
    }
  };
  
  var proto = Outlayer.prototype;
  // inherit EvEmitter
  utils.extend(proto, EvEmitter.prototype);
  
  /**
   * set options
   * @param {Object} opts
   */
  proto.option = function(opts) {
    utils.extend(this.options, opts);
  };
  
  /**
   * get backwards compatible option value, check old name
   */
  proto._getOption = function(option) {
    var oldOption = this.constructor.compatOptions[ option ];
    return oldOption && this.options[ oldOption ] !== undefined ?
      this.options[ oldOption ] : this.options[ option ];
  };
  
  Outlayer.compatOptions = {
    // currentName: oldName
    initLayout: 'isInitLayout',
    horizontal: 'isHorizontal',
    layoutInstant: 'isLayoutInstant',
    originLeft: 'isOriginLeft',
    originTop: 'isOriginTop',
    resize: 'isResizeBound',
    resizeContainer: 'isResizingContainer'
  };
  
  proto._create = function() {
    // get items from children
    this.reloadItems();
    // elements that affect layout, but are not laid out
    this.stamps = [];
    this.stamp(this.options.stamp);
    // set container style
    utils.extend(this.element.style, this.options.containerStyle);
  
    // bind resize method
    var canBindResize = this._getOption('resize');
    if (canBindResize) {
      this.bindResize();
    }
  };
  
  // goes through all children again and gets bricks in proper order
  proto.reloadItems = function() {
    // collection of item elements
    this.items = this._itemize(this.element.children);
  };
  
  
  /**
   * turn elements into Outlayer.Items to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - collection of new Outlayer Items
   */
  proto._itemize = function(elems) {
  
    var itemElems = this._filterFindItemElements(elems);
    var Item = this.constructor.Item;
  
    // create new Outlayer Items for collection
    var items = [];
    for (var i=0; i < itemElems.length; i++) {
      var elem = itemElems[i];
      var item = new Item(elem, this);
      items.push(item);
    }
  
    return items;
  };
  
  /**
   * get item elements to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - item elements
   */
  proto._filterFindItemElements = function(elems) {
    return utils.filterFindElements(elems, this.options.itemSelector);
  };
  
  /**
   * getter method for getting item elements
   * @returns {Array} elems - collection of item elements
   */
  proto.getItemElements = function() {
    return this.items.map(function(item) {
      return item.element;
    });
  };
  
  // ----- init & layout ----- //
  
  /**
   * lays out all items
   */
  proto.layout = function() {
    this._resetLayout();
    this._manageStamps();
  
    // don't animate first layout
    var layoutInstant = this._getOption('layoutInstant');
    var isInstant = layoutInstant !== undefined ?
      layoutInstant : !this._isLayoutInited;
    this.layoutItems(this.items, isInstant);
  
    // flag for initalized
    this._isLayoutInited = true;
  };
  
  // _init is alias for layout
  proto._init = proto.layout;
  
  /**
   * logic before any new layout
   */
  proto._resetLayout = function() {
    this.getSize();
  };
  
  
  proto.getSize = function() {
    this.size = getSize(this.element);
  };
  
  /**
   * get measurement from option, for columnWidth, rowHeight, gutter
   * if option is String -> get element from selector string, & get size of element
   * if option is Element -> get size of element
   * else use option as a number
   *
   * @param {String} measurement
   * @param {String} size - width or height
   * @private
   */
  proto._getMeasurement = function(measurement, size) {
    var option = this.options[ measurement ];
    var elem;
    if (!option) {
      // default to 0
      this[ measurement ] = 0;
    } else {
      // use option as an element
      if (typeof option == 'string') {
        elem = this.element.querySelector(option);
      } else if (option instanceof HTMLElement) {
        elem = option;
      }
      // use size of element, if element
      this[ measurement ] = elem ? getSize(elem)[ size ] : option;
    }
  };
  
  /**
   * layout a collection of item elements
   * @api public
   */
  proto.layoutItems = function(items, isInstant) {
    items = this._getItemsForLayout(items);
  
    this._layoutItems(items, isInstant);
  
    this._postLayout();
  };
  
  /**
   * get the items to be laid out
   * you may want to skip over some items
   * @param {Array} items
   * @returns {Array} items
   */
  proto._getItemsForLayout = function(items) {
    return items.filter(function(item) {
      return !item.isIgnored;
    });
  };
  
  /**
   * layout items
   * @param {Array} items
   * @param {Boolean} isInstant
   */
  proto._layoutItems = function(items, isInstant) {
    this._emitCompleteOnItems('layout', items);
  
    if (!items || !items.length) {
      // no items, emit event with empty array
      return;
    }
  
    var queue = [];
  
    items.forEach(function(item) {
      // get x/y object from method
      var position = this._getItemLayoutPosition(item);
      // enqueue
      position.item = item;
      position.isInstant = isInstant || item.isLayoutInstant;
      queue.push(position);
    }, this);
  
    this._processLayoutQueue(queue);
  };
  
  /**
   * get item layout position
   * @param {Outlayer.Item} item
   * @returns {Object} x and y position
   */
  proto._getItemLayoutPosition = function(/* item */) {
    return {
      x: 0,
      y: 0
    };
  };
  
  /**
   * iterate over array and position each item
   * Reason being - separating this logic prevents 'layout invalidation'
   * thx @paul_irish
   * @param {Array} queue
   */
  proto._processLayoutQueue = function(queue) {
    this.updateStagger();
    queue.forEach(function(obj, i) {
      this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
    }, this);
  };
  
  // set stagger from option in milliseconds number
  proto.updateStagger = function() {
    var stagger = this.options.stagger;
    if (stagger === null || stagger === undefined) {
      this.stagger = 0;
      return;
    }
    this.stagger = getMilliseconds(stagger);
    return this.stagger;
  };
  
  /**
   * Sets position of item in DOM
   * @param {Outlayer.Item} item
   * @param {Number} x - horizontal position
   * @param {Number} y - vertical position
   * @param {Boolean} isInstant - disables transitions
   */
  proto._positionItem = function(item, x, y, isInstant, i) {
    if (isInstant) {
      // if not transition, just set CSS
      item.goTo(x, y);
    } else {
      item.stagger(i * this.stagger);
      item.moveTo(x, y);
    }
  };
  
  /**
   * Any logic you want to do after each layout,
   * i.e. size the container
   */
  proto._postLayout = function() {
    this.resizeContainer();
  };
  
  proto.resizeContainer = function() {
    var isResizingContainer = this._getOption('resizeContainer');
    if (!isResizingContainer) {
      return;
    }
    var size = this._getContainerSize();
    if (size) {
      this._setContainerMeasure(size.width, true);
      this._setContainerMeasure(size.height, false);
    }
  };
  
  /**
   * Sets width or height of container if returned
   * @returns {Object} size
   *   @param {Number} width
   *   @param {Number} height
   */
  proto._getContainerSize = noop;
  
  /**
   * @param {Number} measure - size of width or height
   * @param {Boolean} isWidth
   */
  proto._setContainerMeasure = function(measure, isWidth) {
    if (measure === undefined) {
      return;
    }
  
    var elemSize = this.size;
    // add padding and border width if border box
    if (elemSize.isBorderBox) {
      measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
        elemSize.borderLeftWidth + elemSize.borderRightWidth :
        elemSize.paddingBottom + elemSize.paddingTop +
        elemSize.borderTopWidth + elemSize.borderBottomWidth;
    }
  
    measure = Math.max(measure, 0);
    this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
  };
  
  /**
   * emit eventComplete on a collection of items events
   * @param {String} eventName
   * @param {Array} items - Outlayer.Items
   */
  proto._emitCompleteOnItems = function(eventName, items) {
    var _this = this;
    function onComplete() {
      _this.dispatchEvent(eventName + 'Complete', null, [ items ]);
    }
  
    var count = items.length;
    if (!items || !count) {
      onComplete();
      return;
    }
  
    var doneCount = 0;
    function tick() {
      doneCount++;
      if (doneCount == count) {
        onComplete();
      }
    }
  
    // bind callback
    items.forEach(function(item) {
      item.once(eventName, tick);
    });
  };
  
  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */
  proto.dispatchEvent = function(type, event, args) {
    // add original event to arguments
    var emitArgs = event ? [ event ].concat(args) : args;
    this.emitEvent(type, emitArgs);
  
    if (jQuery) {
      // set this.$element
      this.$element = this.$element || jQuery(this.element);
      if (event) {
        // create jQuery event
        var $event = jQuery.Event(event);
        $event.type = type;
        this.$element.trigger($event, args);
      } else {
        // just trigger with type if no event available
        this.$element.trigger(type, args);
      }
    }
  };
  
  // -------------------------- ignore & stamps -------------------------- //
  
  
  /**
   * keep item in collection, but do not lay it out
   * ignored items do not get skipped in layout
   * @param {Element} elem
   */
  proto.ignore = function(elem) {
    var item = this.getItem(elem);
    if (item) {
      item.isIgnored = true;
    }
  };
  
  /**
   * return item to layout collection
   * @param {Element} elem
   */
  proto.unignore = function(elem) {
    var item = this.getItem(elem);
    if (item) {
      delete item.isIgnored;
    }
  };
  
  /**
   * adds elements to stamps
   * @param {NodeList, Array, Element, or String} elems
   */
  proto.stamp = function(elems) {
    elems = this._find(elems);
    if (!elems) {
      return;
    }
  
    this.stamps = this.stamps.concat(elems);
    // ignore
    elems.forEach(this.ignore, this);
  };
  
  /**
   * removes elements to stamps
   * @param {NodeList, Array, or Element} elems
   */
  proto.unstamp = function(elems) {
    elems = this._find(elems);
    if (!elems){
      return;
    }
  
    elems.forEach(function(elem) {
      // filter out removed stamp elements
      utils.removeFrom(this.stamps, elem);
      this.unignore(elem);
    }, this);
  };
  
  /**
   * finds child elements
   * @param {NodeList, Array, Element, or String} elems
   * @returns {Array} elems
   */
  proto._find = function(elems) {
    if (!elems) {
      return;
    }
    // if string, use argument as selector string
    if (typeof elems == 'string') {
      elems = this.element.querySelectorAll(elems);
    }
    elems = utils.makeArray(elems);
    return elems;
  };
  
  proto._manageStamps = function() {
    if (!this.stamps || !this.stamps.length) {
      return;
    }
  
    this._getBoundingRect();
  
    this.stamps.forEach(this._manageStamp, this);
  };
  
  // update boundingLeft / Top
  proto._getBoundingRect = function() {
    // get bounding rect for container element
    var boundingRect = this.element.getBoundingClientRect();
    var size = this.size;
    this._boundingRect = {
      left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
      top: boundingRect.top + size.paddingTop + size.borderTopWidth,
      right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
      bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
    };
  };
  
  /**
   * @param {Element} stamp
  **/
  proto._manageStamp = noop;
  
  /**
   * get x/y position of element relative to container element
   * @param {Element} elem
   * @returns {Object} offset - has left, top, right, bottom
   */
  proto._getElementOffset = function(elem) {
    var boundingRect = elem.getBoundingClientRect();
    var thisRect = this._boundingRect;
    var size = getSize(elem);
    var offset = {
      left: boundingRect.left - thisRect.left - size.marginLeft,
      top: boundingRect.top - thisRect.top - size.marginTop,
      right: thisRect.right - boundingRect.right - size.marginRight,
      bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
    };
    return offset;
  };
  
  // -------------------------- resize -------------------------- //
  
  // enable event handlers for listeners
  // i.e. resize -> onresize
  proto.handleEvent = utils.handleEvent;
  
  /**
   * Bind layout to window resizing
   */
  proto.bindResize = function() {
    window.addEventListener('resize', this);
    this.isResizeBound = true;
  };
  
  /**
   * Unbind layout to window resizing
   */
  proto.unbindResize = function() {
    window.removeEventListener('resize', this);
    this.isResizeBound = false;
  };
  
  proto.onresize = function() {
    this.resize();
  };
  
  utils.debounceMethod(Outlayer, 'onresize', 100);
  
  proto.resize = function() {
    // don't trigger if size did not change
    // or if resize was unbound. See #9
    if (!this.isResizeBound || !this.needsResizeLayout()) {
      return;
    }
  
    this.layout();
  };
  
  /**
   * check if layout is needed post layout
   * @returns Boolean
   */
  proto.needsResizeLayout = function() {
    var size = getSize(this.element);
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.size && size;
    return hasSizes && size.innerWidth !== this.size.innerWidth;
  };
  
  // -------------------------- methods -------------------------- //
  
  /**
   * add items to Outlayer instance
   * @param {Array or NodeList or Element} elems
   * @returns {Array} items - Outlayer.Items
  **/
  proto.addItems = function(elems) {
    var items = this._itemize(elems);
    // add items to collection
    if (items.length) {
      this.items = this.items.concat(items);
    }
    return items;
  };
  
  /**
   * Layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */
  proto.appended = function(elems) {
    var items = this.addItems(elems);
    if (!items.length) {
      return;
    }
    // layout and reveal just the new items
    this.layoutItems(items, true);
    this.reveal(items);
  };
  
  /**
   * Layout prepended elements
   * @param {Array or NodeList or Element} elems
   */
  proto.prepended = function(elems) {
    var items = this._itemize(elems);
    if (!items.length) {
      return;
    }
    // add items to beginning of collection
    var previousItems = this.items.slice(0);
    this.items = items.concat(previousItems);
    // start new layout
    this._resetLayout();
    this._manageStamps();
    // layout new stuff without transition
    this.layoutItems(items, true);
    this.reveal(items);
    // layout previous items
    this.layoutItems(previousItems);
  };
  
  /**
   * reveal a collection of items
   * @param {Array of Outlayer.Items} items
   */
  proto.reveal = function(items) {
    this._emitCompleteOnItems('reveal', items);
    if (!items || !items.length) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach(function(item, i) {
      item.stagger(i * stagger);
      item.reveal();
    });
  };
  
  /**
   * hide a collection of items
   * @param {Array of Outlayer.Items} items
   */
  proto.hide = function(items) {
    this._emitCompleteOnItems('hide', items);
    if (!items || !items.length) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach(function(item, i) {
      item.stagger(i * stagger);
      item.hide();
    });
  };
  
  /**
   * reveal item elements
   * @param {Array}, {Element}, {NodeList} items
   */
  proto.revealItemElements = function(elems) {
    var items = this.getItems(elems);
    this.reveal(items);
  };
  
  /**
   * hide item elements
   * @param {Array}, {Element}, {NodeList} items
   */
  proto.hideItemElements = function(elems) {
    var items = this.getItems(elems);
    this.hide(items);
  };
  
  /**
   * get Outlayer.Item, given an Element
   * @param {Element} elem
   * @param {Function} callback
   * @returns {Outlayer.Item} item
   */
  proto.getItem = function(elem) {
    // loop through items to get the one that matches
    for (var i=0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.element == elem) {
        // return item
        return item;
      }
    }
  };
  
  /**
   * get collection of Outlayer.Items, given Elements
   * @param {Array} elems
   * @returns {Array} items - Outlayer.Items
   */
  proto.getItems = function(elems) {
    elems = utils.makeArray(elems);
    var items = [];
    elems.forEach(function(elem) {
      var item = this.getItem(elem);
      if (item) {
        items.push(item);
      }
    }, this);
  
    return items;
  };
  
  /**
   * remove element(s) from instance and DOM
   * @param {Array or NodeList or Element} elems
   */
  proto.remove = function(elems) {
    var removeItems = this.getItems(elems);
  
    this._emitCompleteOnItems('remove', removeItems);
  
    // bail if no items to remove
    if (!removeItems || !removeItems.length) {
      return;
    }
  
    removeItems.forEach(function(item) {
      item.remove();
      // remove item from collection
      utils.removeFrom(this.items, item);
    }, this);
  };
  
  // ----- destroy ----- //
  
  // remove and disable Outlayer instance
  proto.destroy = function() {
    // clean up dynamic styles
    var style = this.element.style;
    style.height = '';
    style.position = '';
    style.width = '';
    // destroy items
    this.items.forEach(function(item) {
      item.destroy();
    });
  
    this.unbindResize();
  
    var id = this.element.outlayerGUID;
    delete instances[ id ]; // remove reference to instance by id
    delete this.element.outlayerGUID;
    // remove data for jQuery
    if (jQuery) {
      jQuery.removeData(this.element, this.constructor.namespace);
    }
  
  };
  
  // -------------------------- data -------------------------- //
  
  /**
   * get Outlayer instance from element
   * @param {Element} elem
   * @returns {Outlayer}
   */
  Outlayer.data = function(elem) {
    elem = utils.getQueryElement(elem);
    var id = elem && elem.outlayerGUID;
    return id && instances[ id ];
  };
  
  
  // -------------------------- create Outlayer class -------------------------- //
  
  /**
   * create a layout class
   * @param {String} namespace
   */
  Outlayer.create = function(namespace, options) {
    // sub-class Outlayer
    var Layout = subclass(Outlayer);
    // apply new options and compatOptions
    Layout.defaults = utils.extend({}, Outlayer.defaults);
    utils.extend(Layout.defaults, options);
    Layout.compatOptions = utils.extend({}, Outlayer.compatOptions );
  
    Layout.namespace = namespace;
  
    Layout.data = Outlayer.data;
  
    // sub-class Item
    Layout.Item = subclass(Item);
  
    // -------------------------- declarative -------------------------- //
  
    utils.htmlInit(Layout, namespace);
  
    // -------------------------- jQuery bridge -------------------------- //
  
    // make into jQuery plugin
    if (jQuery && jQuery.bridget) {
      jQuery.bridget(namespace, Layout);
    }
  
    return Layout;
  };
  
  function subclass(Parent) {
    function SubClass() {
      Parent.apply(this, arguments);
    }
  
    SubClass.prototype = Object.create(Parent.prototype);
    SubClass.prototype.constructor = SubClass;
  
    return SubClass;
  }
  
  // ----- helpers ----- //
  
  // how many milliseconds are in each unit
  var msUnits = {
    ms: 1,
    s: 1000
  };
  
  // munge time-like parameter into millisecond number
  // '0.4s' -> 40
  function getMilliseconds(time) {
    if (typeof time == 'number') {
      return time;
    }
    var matches = time.match(/(^\d*\.?\d*)(\w*)/);
    var num = matches && matches[1];
    var unit = matches && matches[2];
    if (!num.length) {
      return 0;
    }
    num = parseFloat(num);
    var mult = msUnits[ unit ] || 1;
    return num * mult;
  }
  
  // ----- fin ----- //
  
  // back in global
  Outlayer.Item = Item;
  
  return Outlayer;
  
  }));
  
  /**
   * Isotope Item
  **/
  
  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('isotope/js/item',[
          'outlayer/outlayer'
        ],
        factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        require('outlayer')
     );
    } else {
      // browser global
      window.Isotope = window.Isotope || {};
      window.Isotope.Item = factory(
        window.Outlayer
     );
    }
  
  }(window, function factory(Outlayer) {
  'use strict';
  
  // -------------------------- Item -------------------------- //
  
  // sub-class Outlayer Item
  function Item() {
    Outlayer.Item.apply(this, arguments);
  }
  
  var proto = Item.prototype = Object.create(Outlayer.Item.prototype);
  
  var _create = proto._create;
  proto._create = function() {
    // assign id, used for original-order sorting
    this.id = this.layout.itemGUID++;
    _create.call(this);
    this.sortData = {};
  };
  
  proto.updateSortData = function() {
    if (this.isIgnored) {
      return;
    }
    // default sorters
    this.sortData.id = this.id;
    // for backward compatibility
    this.sortData['original-order'] = this.id;
    this.sortData.random = Math.random();
    // go thru getSortData obj and apply the sorters
    var getSortData = this.layout.options.getSortData;
    var sorters = this.layout._sorters;
    for (var key in getSortData) {
      var sorter = sorters[ key ];
      this.sortData[ key ] = sorter(this.element, this);
    }
  };
  
  var _destroy = proto.destroy;
  proto.destroy = function() {
    // call super
    _destroy.apply(this, arguments);
    // reset display, #741
    this.css({
      display: ''
    });
  };
  
  return Item;
  
  }));
  
  /**
   * Isotope LayoutMode
   */
  
  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('isotope/js/layout-mode',[
          'get-size/get-size',
          'outlayer/outlayer'
        ],
        factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        require('get-size'),
        require('outlayer')
     );
    } else {
      // browser global
      window.Isotope = window.Isotope || {};
      window.Isotope.LayoutMode = factory(
        window.getSize,
        window.Outlayer
     );
    }
  
  }(window, function factory(getSize, Outlayer) {
    'use strict';
  
    // layout mode class
    function LayoutMode(isotope) {
      this.isotope = isotope;
      // link properties
      if (isotope) {
        this.options = isotope.options[ this.namespace ];
        this.element = isotope.element;
        this.items = isotope.filteredItems;
        this.size = isotope.size;
      }
    }
  
    var proto = LayoutMode.prototype;
  
    /**
     * some methods should just defer to default Outlayer method
     * and reference the Isotope instance as `this`
    **/
    var facadeMethods = [
      '_resetLayout',
      '_getItemLayoutPosition',
      '_manageStamp',
      '_getContainerSize',
      '_getElementOffset',
      'needsResizeLayout',
      '_getOption'
    ];
  
    facadeMethods.forEach(function(methodName) {
      proto[ methodName ] = function() {
        return Outlayer.prototype[ methodName ].apply(this.isotope, arguments);
      };
    });
  
    // -----  ----- //
  
    // for horizontal layout modes, check vertical size
    proto.needsVerticalResizeLayout = function() {
      // don't trigger if size did not change
      var size = getSize(this.isotope.element);
      // check that this.size and size are there
      // IE8 triggers resize on body size change, so they might not be
      var hasSizes = this.isotope.size && size;
      return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
    };
  
    // ----- measurements ----- //
  
    proto._getMeasurement = function() {
      this.isotope._getMeasurement.apply(this, arguments);
    };
  
    proto.getColumnWidth = function() {
      this.getSegmentSize('column', 'Width');
    };
  
    proto.getRowHeight = function() {
      this.getSegmentSize('row', 'Height');
    };
  
    /**
     * get columnWidth or rowHeight
     * segment: 'column' or 'row'
     * size 'Width' or 'Height'
    **/
    proto.getSegmentSize = function(segment, size) {
      var segmentName = segment + size;
      var outerSize = 'outer' + size;
      // columnWidth / outerWidth // rowHeight / outerHeight
      this._getMeasurement(segmentName, outerSize);
      // got rowHeight or columnWidth, we can chill
      if (this[ segmentName ]) {
        return;
      }
      // fall back to item of first element
      var firstItemSize = this.getFirstItemSize();
      this[ segmentName ] = firstItemSize && firstItemSize[ outerSize ] ||
        // or size of container
        this.isotope.size[ 'inner' + size ];
    };
  
    proto.getFirstItemSize = function() {
      var firstItem = this.isotope.filteredItems[0];
      return firstItem && firstItem.element && getSize(firstItem.element);
    };
  
    // ----- methods that should reference isotope ----- //
  
    proto.layout = function() {
      this.isotope.layout.apply(this.isotope, arguments);
    };
  
    proto.getSize = function() {
      this.isotope.getSize();
      this.size = this.isotope.size;
    };
  
    // -------------------------- create -------------------------- //
  
    LayoutMode.modes = {};
  
    LayoutMode.create = function(namespace, options) {
  
      function Mode() {
        LayoutMode.apply(this, arguments);
      }
  
      Mode.prototype = Object.create(proto);
      Mode.prototype.constructor = Mode;
  
      // default options
      if (options) {
        Mode.options = options;
      }
  
      Mode.prototype.namespace = namespace;
      // register in Isotope
      LayoutMode.modes[ namespace ] = Mode;
  
      return Mode;
    };
  
    return LayoutMode;
  
  }));
  
  /*!
   * Masonry v4.1.0
   * Cascading grid layout library
   * http://masonry.desandro.com
   * MIT License
   * by David DeSandro
   */
  
  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('masonry/masonry',[
          'outlayer/outlayer',
          'get-size/get-size'
        ],
        factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        require('outlayer'),
        require('get-size')
     );
    } else {
      // browser global
      window.Masonry = factory(
        window.Outlayer,
        window.getSize
     );
    }
  
  }(window, function factory(Outlayer, getSize) {
  
  
  
  // -------------------------- masonryDefinition -------------------------- //
  
    // create an Outlayer layout class
    var Masonry = Outlayer.create('masonry');
    // isFitWidth -> fitWidth
    Masonry.compatOptions.fitWidth = 'isFitWidth';
  
    Masonry.prototype._resetLayout = function() {
      this.getSize();
      this._getMeasurement('columnWidth', 'outerWidth');
      this._getMeasurement('gutter', 'outerWidth');
      this.measureColumns();
  
      // reset column Y
      this.colYs = [];
      for (var i=0; i < this.cols; i++) {
        this.colYs.push(0);
      }
  
      this.maxY = 0;
    };
  
    Masonry.prototype.measureColumns = function() {
      this.getContainerWidth();
      // if columnWidth is 0, default to outerWidth of first item
      if (!this.columnWidth) {
        var firstItem = this.items[0];
        var firstItemElem = firstItem && firstItem.element;
        // columnWidth fall back to item of first element
        this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth ||
          // if first elem has no width, default to size of container
          this.containerWidth;
      }
  
      var columnWidth = this.columnWidth += this.gutter;
  
      // calculate columns
      var containerWidth = this.containerWidth + this.gutter;
      var cols = containerWidth / columnWidth;
      // fix rounding errors, typically with gutters
      var excess = columnWidth - containerWidth % columnWidth;
      // if overshoot is less than a pixel, round up, otherwise floor it
      var mathMethod = excess && excess < 1 ? 'round' : 'floor';
      cols = Math[ mathMethod ](cols);
      this.cols = Math.max(cols, 1);
    };
  
    Masonry.prototype.getContainerWidth = function() {
      // container is parent if fit width
      var isFitWidth = this._getOption('fitWidth');
      var container = isFitWidth ? this.element.parentNode : this.element;
      // check that this.size and size are there
      // IE8 triggers resize on body size change, so they might not be
      var size = getSize(container);
      this.containerWidth = size && size.innerWidth;
    };
  
    Masonry.prototype._getItemLayoutPosition = function(item) {
      item.getSize();
      // how many columns does this brick span
      var remainder = item.size.outerWidth % this.columnWidth;
      var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
      // round if off by 1 pixel, otherwise use ceil
      var colSpan = Math[ mathMethod ](item.size.outerWidth / this.columnWidth);
      colSpan = Math.min(colSpan, this.cols);
  
      var colGroup = this._getColGroup(colSpan);
      // get the minimum Y value from the columns
      var minimumY = Math.min.apply(Math, colGroup);
      var shortColIndex = colGroup.indexOf(minimumY);
  
      // position the brick
      var position = {
        x: this.columnWidth * shortColIndex,
        y: minimumY
      };
  
      // apply setHeight to necessary columns
      var setHeight = minimumY + item.size.outerHeight;
      var setSpan = this.cols + 1 - colGroup.length;
      for (var i = 0; i < setSpan; i++) {
        this.colYs[ shortColIndex + i ] = setHeight;
      }
  
      return position;
    };
  
    /**
     * @param {Number} colSpan - number of columns the element spans
     * @returns {Array} colGroup
     */
    Masonry.prototype._getColGroup = function(colSpan) {
      if (colSpan < 2) {
        // if brick spans only one column, use all the column Ys
        return this.colYs;
      }
  
      var colGroup = [];
      // how many different places could this brick fit horizontally
      var groupCount = this.cols + 1 - colSpan;
      // for each group potential horizontal position
      for (var i = 0; i < groupCount; i++) {
        // make an array of colY values for that one group
        var groupColYs = this.colYs.slice(i, i + colSpan);
        // and get the max value of the array
        colGroup[i] = Math.max.apply(Math, groupColYs);
      }
      return colGroup;
    };
  
    Masonry.prototype._manageStamp = function(stamp) {
      var stampSize = getSize(stamp);
      var offset = this._getElementOffset(stamp);
      // get the columns that this stamp affects
      var isOriginLeft = this._getOption('originLeft');
      var firstX = isOriginLeft ? offset.left : offset.right;
      var lastX = firstX + stampSize.outerWidth;
      var firstCol = Math.floor(firstX / this.columnWidth);
      firstCol = Math.max(0, firstCol);
      var lastCol = Math.floor(lastX / this.columnWidth);
      // lastCol should not go over if multiple of columnWidth #425
      lastCol -= lastX % this.columnWidth ? 0 : 1;
      lastCol = Math.min(this.cols - 1, lastCol);
      // set colYs to bottom of the stamp
  
      var isOriginTop = this._getOption('originTop');
      var stampMaxY = (isOriginTop ? offset.top : offset.bottom) +
        stampSize.outerHeight;
      for (var i = firstCol; i <= lastCol; i++) {
        this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
      }
    };
  
    Masonry.prototype._getContainerSize = function() {
      this.maxY = Math.max.apply(Math, this.colYs);
      var size = {
        height: this.maxY
      };
  
      if (this._getOption('fitWidth')) {
        size.width = this._getContainerFitWidth();
      }
  
      return size;
    };
  
    Masonry.prototype._getContainerFitWidth = function() {
      var unusedCols = 0;
      // count unused columns
      var i = this.cols;
      while (--i) {
        if (this.colYs[i] !== 0) {
          break;
        }
        unusedCols++;
      }
      // fit container to columns that have been used
      return (this.cols - unusedCols) * this.columnWidth - this.gutter;
    };
  
    Masonry.prototype.needsResizeLayout = function() {
      var previousWidth = this.containerWidth;
      this.getContainerWidth();
      return previousWidth != this.containerWidth;
    };
  
    return Masonry;
  
  }));
  
  /*!
   * Masonry layout mode
   * sub-classes Masonry
   * http://masonry.desandro.com
   */
  
  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('isotope/js/layout-modes/masonry',[
          '../layout-mode',
          'masonry/masonry'
        ],
        factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        require('../layout-mode'),
        require('masonry-layout')
     );
    } else {
      // browser global
      factory(
        window.Isotope.LayoutMode,
        window.Masonry
     );
    }
  
  }(window, function factory(LayoutMode, Masonry) {
  'use strict';
  
  // -------------------------- masonryDefinition -------------------------- //
  
    // create an Outlayer layout class
    var MasonryMode = LayoutMode.create('masonry');
  
    var proto = MasonryMode.prototype;
  
    var keepModeMethods = {
      _getElementOffset: true,
      layout: true,
      _getMeasurement: true
    };
  
    // inherit Masonry prototype
    for (var method in Masonry.prototype) {
      // do not inherit mode methods
      if (!keepModeMethods[ method ]) {
        proto[ method ] = Masonry.prototype[ method ];
      }
    }
  
    var measureColumns = proto.measureColumns;
    proto.measureColumns = function() {
      // set items, used if measuring first item
      this.items = this.isotope.filteredItems;
      measureColumns.call(this);
    };
  
    // point to mode options for fitWidth
    var _getOption = proto._getOption;
    proto._getOption = function(option) {
      if (option == 'fitWidth') {
        return this.options.isFitWidth !== undefined ?
          this.options.isFitWidth : this.options.fitWidth;
      }
      return _getOption.apply(this.isotope, arguments);
    };
  
    return MasonryMode;
  
  }));
  
  /**
   * fitRows layout mode
   */
  
  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('isotope/js/layout-modes/fit-rows',[
          '../layout-mode'
        ],
        factory);
    } else if (typeof exports == 'object') {
      // CommonJS
      module.exports = factory(
        require('../layout-mode')
     );
    } else {
      // browser global
      factory(
        window.Isotope.LayoutMode
     );
    }
  
  }(window, function factory(LayoutMode) {
  'use strict';
  
  var FitRows = LayoutMode.create('fitRows');
  
  var proto = FitRows.prototype;
  
  proto._resetLayout = function() {
    this.x = 0;
    this.y = 0;
    this.maxY = 0;
    this._getMeasurement('gutter', 'outerWidth');
  };
  
  proto._getItemLayoutPosition = function(item) {
    item.getSize();
  
    var itemWidth = item.size.outerWidth + this.gutter;
    // if this element cannot fit in the current row
    var containerWidth = this.isotope.size.innerWidth + this.gutter;
    if (this.x !== 0 && itemWidth + this.x > containerWidth) {
      this.x = 0;
      this.y = this.maxY;
    }
  
    var position = {
      x: this.x,
      y: this.y
    };
  
    this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
    this.x += itemWidth;
  
    return position;
  };
  
  proto._getContainerSize = function() {
    return { height: this.maxY };
  };
  
  return FitRows;
  
  }));
  
  /**
   * vertical layout mode
   */
  
  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD
      define('isotope/js/layout-modes/vertical',[
          '../layout-mode'
        ],
        factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        require('../layout-mode')
     );
    } else {
      // browser global
      factory(
        window.Isotope.LayoutMode
     );
    }
  
  }(window, function factory(LayoutMode) {
  'use strict';
  
  var Vertical = LayoutMode.create('vertical', {
    horizontalAlignment: 0
  });
  
  var proto = Vertical.prototype;
  
  proto._resetLayout = function() {
    this.y = 0;
  };
  
  proto._getItemLayoutPosition = function(item) {
    item.getSize();
    var x = (this.isotope.size.innerWidth - item.size.outerWidth) *
      this.options.horizontalAlignment;
    var y = this.y;
    this.y += item.size.outerHeight;
    return { x: x, y: y };
  };
  
  proto._getContainerSize = function() {
    return { height: this.y };
  };
  
  return Vertical;
  
  }));
  
  /*!
   * Isotope v3.0.1
   *
   * Licensed GPLv3 for open source use
   * or Isotope Commercial License for commercial use
   *
   * http://isotope.metafizzy.co
   * Copyright 2016 Metafizzy
   */
  
  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD
      define([
          'outlayer/outlayer',
          'get-size/get-size',
          'desandro-matches-selector/matches-selector',
          'fizzy-ui-utils/utils',
          'isotope/js/item',
          'isotope/js/layout-mode',
          // include default layout modes
          'isotope/js/layout-modes/masonry',
          'isotope/js/layout-modes/fit-rows',
          'isotope/js/layout-modes/vertical'
        ],
        function(Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
          return factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode);
        });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        window,
        require('outlayer'),
        require('get-size'),
        require('desandro-matches-selector'),
        require('fizzy-ui-utils'),
        require('isotope/js/item'),
        require('isotope/js/layout-mode'),
        // include default layout modes
        require('isotope/js/layout-modes/masonry'),
        require('isotope/js/layout-modes/fit-rows'),
        require('isotope/js/layout-modes/vertical')
     );
    } else {
      // browser global
      window.Isotope = factory(
        window,
        window.Outlayer,
        window.getSize,
        window.matchesSelector,
        window.fizzyUIUtils,
        window.Isotope.Item,
        window.Isotope.LayoutMode
     );
    }
  
  }(window, function factory(window, Outlayer, getSize, matchesSelector, utils,
    Item, LayoutMode) {
  
  
  
  // -------------------------- vars -------------------------- //
  
  var jQuery = window.jQuery;
  
  // -------------------------- helpers -------------------------- //
  
  var trim = String.prototype.trim ?
    function(str) {
      return str.trim();
    } :
    function(str) {
      return str.replace(/^\s+|\s+$/g, '');
    };
  
  // -------------------------- isotopeDefinition -------------------------- //
  
    // create an Outlayer layout class
    var Isotope = Outlayer.create('isotope', {
      layoutMode: 'masonry',
      isJQueryFiltering: true,
      sortAscending: true
    });
  
    Isotope.Item = Item;
    Isotope.LayoutMode = LayoutMode;
  
    var proto = Isotope.prototype;
  
    proto._create = function() {
      this.itemGUID = 0;
      // functions that sort items
      this._sorters = {};
      this._getSorters();
      // call super
      Outlayer.prototype._create.call(this);
  
      // create layout modes
      this.modes = {};
      // start filteredItems with all items
      this.filteredItems = this.items;
      // keep of track of sortBys
      this.sortHistory = [ 'original-order' ];
      // create from registered layout modes
      for (var name in LayoutMode.modes) {
        this._initLayoutMode(name);
      }
    };
  
    proto.reloadItems = function() {
      // reset item ID counter
      this.itemGUID = 0;
      // call super
      Outlayer.prototype.reloadItems.call(this);
    };
  
    proto._itemize = function() {
      var items = Outlayer.prototype._itemize.apply(this, arguments);
      // assign ID for original-order
      for (var i=0; i < items.length; i++) {
        var item = items[i];
        item.id = this.itemGUID++;
      }
      this._updateItemsSortData(items);
      return items;
    };
  
  
    // -------------------------- layout -------------------------- //
  
    proto._initLayoutMode = function(name) {
      var Mode = LayoutMode.modes[ name ];
      // set mode options
      // HACK extend initial options, back-fill in default options
      var initialOpts = this.options[ name ] || {};
      this.options[ name ] = Mode.options ?
        utils.extend(Mode.options, initialOpts) : initialOpts;
      // init layout mode instance
      this.modes[ name ] = new Mode(this);
    };
  
  
    proto.layout = function() {
      // if first time doing layout, do all magic
      if (!this._isLayoutInited && this._getOption('initLayout')) {
        this.arrange();
        return;
      }
      this._layout();
    };
  
    // private method to be used in layout() & magic()
    proto._layout = function() {
      // don't animate first layout
      var isInstant = this._getIsInstant();
      // layout flow
      this._resetLayout();
      this._manageStamps();
      this.layoutItems(this.filteredItems, isInstant);
  
      // flag for initalized
      this._isLayoutInited = true;
    };
  
    // filter + sort + layout
    proto.arrange = function(opts) {
      // set any options pass
      this.option(opts);
      this._getIsInstant();
      // filter, sort, and layout
  
      // filter
      var filtered = this._filter(this.items);
      this.filteredItems = filtered.matches;
  
      this._bindArrangeComplete();
  
      if (this._isInstant) {
        this._noTransition(this._hideReveal, [ filtered ]);
      } else {
        this._hideReveal(filtered);
      }
  
      this._sort();
      this._layout();
    };
    // alias to _init for main plugin method
    proto._init = proto.arrange;
  
    proto._hideReveal = function(filtered) {
      this.reveal(filtered.needReveal);
      this.hide(filtered.needHide);
    };
  
    // HACK
    // Don't animate/transition first layout
    // Or don't animate/transition other layouts
    proto._getIsInstant = function() {
      var isLayoutInstant = this._getOption('layoutInstant');
      var isInstant = isLayoutInstant !== undefined ? isLayoutInstant :
        !this._isLayoutInited;
      this._isInstant = isInstant;
      return isInstant;
    };
  
    // listen for layoutComplete, hideComplete and revealComplete
    // to trigger arrangeComplete
    proto._bindArrangeComplete = function() {
      // listen for 3 events to trigger arrangeComplete
      var isLayoutComplete, isHideComplete, isRevealComplete;
      var _this = this;
      function arrangeParallelCallback() {
        if (isLayoutComplete && isHideComplete && isRevealComplete) {
          _this.dispatchEvent('arrangeComplete', null, [ _this.filteredItems ]);
        }
      }
      this.once('layoutComplete', function() {
        isLayoutComplete = true;
        arrangeParallelCallback();
      });
      this.once('hideComplete', function() {
        isHideComplete = true;
        arrangeParallelCallback();
      });
      this.once('revealComplete', function() {
        isRevealComplete = true;
        arrangeParallelCallback();
      });
    };
  
    // -------------------------- filter -------------------------- //
  
    proto._filter = function(items) {
      var filter = this.options.filter;
      filter = filter || '*';
      var matches = [];
      var hiddenMatched = [];
      var visibleUnmatched = [];
  
      var test = this._getFilterTest(filter);
  
      // test each item
      for (var i=0; i < items.length; i++) {
        var item = items[i];
        if (item.isIgnored) {
          continue;
        }
        // add item to either matched or unmatched group
        var isMatched = test(item);
        // item.isFilterMatched = isMatched;
        // add to matches if its a match
        if (isMatched) {
          matches.push(item);
        }
        // add to additional group if item needs to be hidden or revealed
        if (isMatched && item.isHidden) {
          hiddenMatched.push(item);
        } else if (!isMatched && !item.isHidden) {
          visibleUnmatched.push(item);
        }
      }
  
      // return collections of items to be manipulated
      return {
        matches: matches,
        needReveal: hiddenMatched,
        needHide: visibleUnmatched
      };
    };
  
    // get a jQuery, function, or a matchesSelector test given the filter
    proto._getFilterTest = function(filter) {
      if (jQuery && this.options.isJQueryFiltering) {
        // use jQuery
        return function(item) {
          return jQuery(item.element).is(filter);
        };
      }
      if (typeof filter == 'function') {
        // use filter as function
        return function(item) {
          return filter(item.element);
        };
      }
      // default, use filter as selector string
      return function(item) {
        return matchesSelector(item.element, filter);
      };
    };
  
    // -------------------------- sorting -------------------------- //
  
    /**
     * @params {Array} elems
     * @public
     */
    proto.updateSortData = function(elems) {
      // get items
      var items;
      if (elems) {
        elems = utils.makeArray(elems);
        items = this.getItems(elems);
      } else {
        // update all items if no elems provided
        items = this.items;
      }
  
      this._getSorters();
      this._updateItemsSortData(items);
    };
  
    proto._getSorters = function() {
      var getSortData = this.options.getSortData;
      for (var key in getSortData) {
        var sorter = getSortData[ key ];
        this._sorters[ key ] = mungeSorter(sorter);
      }
    };
  
    /**
     * @params {Array} items - of Isotope.Items
     * @private
     */
    proto._updateItemsSortData = function(items) {
      // do not update if no items
      var len = items && items.length;
  
      for (var i=0; len && i < len; i++) {
        var item = items[i];
        item.updateSortData();
      }
    };
  
    // ----- munge sorter ----- //
  
    // encapsulate this, as we just need mungeSorter
    // other functions in here are just for munging
    var mungeSorter = (function() {
      // add a magic layer to sorters for convienent shorthands
      // `.foo-bar` will use the text of .foo-bar querySelector
      // `[foo-bar]` will use attribute
      // you can also add parser
      // `.foo-bar parseInt` will parse that as a number
      function mungeSorter(sorter) {
        // if not a string, return function or whatever it is
        if (typeof sorter != 'string') {
          return sorter;
        }
        // parse the sorter string
        var args = trim(sorter).split(' ');
        var query = args[0];
        // check if query looks like [an-attribute]
        var attrMatch = query.match(/^\[(.+)\]$/);
        var attr = attrMatch && attrMatch[1];
        var getValue = getValueGetter(attr, query);
        // use second argument as a parser
        var parser = Isotope.sortDataParsers[ args[1] ];
        // parse the value, if there was a parser
        sorter = parser ? function(elem) {
          return elem && parser(getValue(elem));
        } :
        // otherwise just return value
        function(elem) {
          return elem && getValue(elem);
        };
  
        return sorter;
      }
  
      // get an attribute getter, or get text of the querySelector
      function getValueGetter(attr, query) {
        // if query looks like [foo-bar], get attribute
        if (attr) {
          return function getAttribute(elem) {
            return elem.getAttribute(attr);
          };
        }
  
        // otherwise, assume its a querySelector, and get its text
        return function getChildText(elem) {
          var child = elem.querySelector(query);
          return child && child.textContent;
        };
      }
  
      return mungeSorter;
    })();
  
    // parsers used in getSortData shortcut strings
    Isotope.sortDataParsers = {
      'parseInt': function(val) {
        return parseInt(val, 10);
      },
      'parseFloat': function(val) {
        return parseFloat(val);
      }
    };
  
    // ----- sort method ----- //
  
    // sort filteredItem order
    proto._sort = function() {
      var sortByOpt = this.options.sortBy;
      if (!sortByOpt) {
        return;
      }
      // concat all sortBy and sortHistory
      var sortBys = [].concat.apply(sortByOpt, this.sortHistory);
      // sort magic
      var itemSorter = getItemSorter(sortBys, this.options.sortAscending);
      this.filteredItems.sort(itemSorter);
      // keep track of sortBy History
      if (sortByOpt != this.sortHistory[0]) {
        // add to front, oldest goes in last
        this.sortHistory.unshift(sortByOpt);
      }
    };
  
    // returns a function used for sorting
    function getItemSorter(sortBys, sortAsc) {
      return function sorter(itemA, itemB) {
        // cycle through all sortKeys
        for (var i = 0; i < sortBys.length; i++) {
          var sortBy = sortBys[i];
          var a = itemA.sortData[ sortBy ];
          var b = itemB.sortData[ sortBy ];
          if (a > b || a < b) {
            // if sortAsc is an object, use the value given the sortBy key
            var isAscending = sortAsc[ sortBy ] !== undefined ? sortAsc[ sortBy ] : sortAsc;
            var direction = isAscending ? 1 : -1;
            return (a > b ? 1 : -1) * direction;
          }
        }
        return 0;
      };
    }
  
    // -------------------------- methods -------------------------- //
  
    // get layout mode
    proto._mode = function() {
      var layoutMode = this.options.layoutMode;
      var mode = this.modes[ layoutMode ];
      if (!mode) {
        // TODO console.error
        throw new Error('No layout mode: ' + layoutMode);
      }
      // HACK sync mode's options
      // any options set after init for layout mode need to be synced
      mode.options = this.options[ layoutMode ];
      return mode;
    };
  
    proto._resetLayout = function() {
      // trigger original reset layout
      Outlayer.prototype._resetLayout.call(this);
      this._mode()._resetLayout();
    };
  
    proto._getItemLayoutPosition = function(item ) {
      return this._mode()._getItemLayoutPosition(item);
    };
  
    proto._manageStamp = function(stamp) {
      this._mode()._manageStamp(stamp);
    };
  
    proto._getContainerSize = function() {
      return this._mode()._getContainerSize();
    };
  
    proto.needsResizeLayout = function() {
      return this._mode().needsResizeLayout();
    };
  
    // -------------------------- adding & removing -------------------------- //
  
    // HEADS UP overwrites default Outlayer appended
    proto.appended = function(elems) {
      var items = this.addItems(elems);
      if (!items.length) {
        return;
      }
      // filter, layout, reveal new items
      var filteredItems = this._filterRevealAdded(items);
      // add to filteredItems
      this.filteredItems = this.filteredItems.concat(filteredItems);
    };
  
    // HEADS UP overwrites default Outlayer prepended
    proto.prepended = function(elems) {
      var items = this._itemize(elems);
      if (!items.length) {
        return;
      }
      // start new layout
      this._resetLayout();
      this._manageStamps();
      // filter, layout, reveal new items
      var filteredItems = this._filterRevealAdded(items);
      // layout previous items
      this.layoutItems(this.filteredItems);
      // add to items and filteredItems
      this.filteredItems = filteredItems.concat(this.filteredItems);
      this.items = items.concat(this.items);
    };
  
    proto._filterRevealAdded = function(items) {
      var filtered = this._filter(items);
      this.hide(filtered.needHide);
      // reveal all new items
      this.reveal(filtered.matches);
      // layout new items, no transition
      this.layoutItems(filtered.matches, true);
      return filtered.matches;
    };
  
    /**
     * Filter, sort, and layout newly-appended item elements
     * @param {Array or NodeList or Element} elems
     */
    proto.insert = function(elems) {
      var items = this.addItems(elems);
      if (!items.length) {
        return;
      }
      // append item elements
      var i, item;
      var len = items.length;
      for (i=0; i < len; i++) {
        item = items[i];
        this.element.appendChild(item.element);
      }
      // filter new stuff
      var filteredInsertItems = this._filter(items).matches;
      // set flag
      for (i=0; i < len; i++) {
        items[i].isLayoutInstant = true;
      }
      this.arrange();
      // reset flag
      for (i=0; i < len; i++) {
        delete items[i].isLayoutInstant;
      }
      this.reveal(filteredInsertItems);
    };
  
    var _remove = proto.remove;
    proto.remove = function(elems) {
      elems = utils.makeArray(elems);
      var removeItems = this.getItems(elems);
      // do regular thing
      _remove.call(this, elems);
      // bail if no items to remove
      var len = removeItems && removeItems.length;
      // remove elems from filteredItems
      for (var i=0; len && i < len; i++) {
        var item = removeItems[i];
        // remove item from collection
        utils.removeFrom(this.filteredItems, item);
      }
    };
  
    proto.shuffle = function() {
      // update random sortData
      for (var i=0; i < this.items.length; i++) {
        var item = this.items[i];
        item.sortData.random = Math.random();
      }
      this.options.sortBy = 'random';
      this._sort();
      this._layout();
    };
  
    /**
     * trigger fn without transition
     * kind of hacky to have this in the first place
     * @param {Function} fn
     * @param {Array} args
     * @returns ret
     * @private
     */
    proto._noTransition = function(fn, args) {
      // save transitionDuration before disabling
      var transitionDuration = this.options.transitionDuration;
      // disable transition
      this.options.transitionDuration = 0;
      // do it
      var returnValue = fn.apply(this, args);
      // re-enable transition for reveal
      this.options.transitionDuration = transitionDuration;
      return returnValue;
    };
  
    // ----- helper methods ----- //
  
    /**
     * getter method for getting filtered item elements
     * @returns {Array} elems - collection of item elements
     */
    proto.getFilteredItemElements = function() {
      return this.filteredItems.map(function(item) {
        return item.element;
      });
    };
  
    // -----  ----- //
  
    return Isotope;
  
  }));
  
;(function ($, window, document, undefined) {
	'use strict';

	var $document, $window;
	$window = $(window);
	$document = $(document);
	//Page Load
	function pageLoad() {
		var $body 		= $('body');
		$window.on('beforeunload', function() {
			$body.addClass('amy-fade-out');
		});
	}
	
	//General
	function amyGeneral() {
		$('<div/>', {
			id: 'amy-loading'
		}).appendTo('#main');

		$('#amy-loading').append('<span></span>');

		$('iframe').wrap('<div class="amy-iframe"></div>');
	}

	//Menu
	function amyMenu() {
		var $body 		= $('body'),
			click_event	= document.ontouchstart ? 'touchstart' : 'click',
			$overlay;

		if ($body.find('#amy-menu-overlay').length) {
			$overlay	= $body.find('#amy-menu-overlay');
		} else {
			$overlay	= $('<div id="amy-menu-overlay"></div>').prependTo($body);
		}

		$overlay.on(click_event, function() {
			$body.removeClass('amy-menu-toggle-open');
		});

		$('#amy-menu-toggle').on('click', function(event) {
			event.preventDefault();
			$body.toggleClass('amy-menu-toggle-open');

		});

		if ($(window).width() < amy_script.viewport) {
			$('body').addClass('hasresponsive');
		} else {
			$('body').removeClass('hasresponsive');
		}

	}

	//Tab
	function amyTab() {
		$(document).on('click.bs.tab.data-api', '.bs-tab-nav a', function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
	}

	//Slider
	function amySlider() {
		var as 			= $('.amy-slick');

		if (amy_script.amy_rtl == 1) {
			as.slick({
				rtl: true
			});
		} else {
			as.slick();
		}

	}

	//fancybox
	function amyFancyBox() {
		$('.amy-fancybox').fancybox();
	}

	//Grid Isotope
	function amyGridIsotope() {
		$('.amy-mv-grid .amy-ajax-content').isotope({
			// options
			itemSelector: '.grid-item',
			layoutMode: 'fitRows'
		});
	}

	//Blog Isotope
	function amyBlogIsotope() {
		$('.amy-masonry .page-content').isotope({
			itemSelector: '.entry-item',
			layoutMode: 'masonry'
		});

		$('.amy-blog.amy-grid .row').isotope({
			itemSelector: '.amy-blog.amy-grid .row > div',
		});
	}

	//Movie Filter
	function amyMovieFilter() {
		$('.amy-datepicker').datepicker({
			dateFormat: 'yy-mm-dd',
			onSelect: function(dateText, inst) {
				amyMovieFilterAjax(this);
			}
		});

		$('.select-genre').change(function() {
			amyMovieFilterAjax(this);
		});

		$('.select-cinema').change(function() {
			amyMovieFilterAjax(this);
		});
	}

	// SHortcode Movie Filter From V3.4.0
	function MvFilterSC() {
		$('.mv-filter-form select').on('change', function() {
			let form = $(this).parents('.mv-filter-form');
			let $loading 	= $('#amy-loading');
			let divf		= form.parent().siblings('.amy-ajax-content');

			form.submit();
		});
	};

	function amyMovieFilterAjax(el) {
		var $loading 	= $('#amy-loading'),
			$parent		= $(el).parents('.filter-mv'),
			divf		= $parent.siblings('.amy-ajax-content'),
			genreid		= $parent.find('.select-genre').val(),
			cinemaid	= $parent.find('.select-cinema').val(),
			sortby		= $parent.find('.amy-mv-sort').val(),
			release		= $parent.find('.select-date').val(),
			data_send	= $parent.find('.opt-hidden').attr('data-send'),
			string1		= 'genreid=' + genreid + '&cinemaid=' + cinemaid + '&release=' + release + '&sortby=' + sortby,
			string2		= '&data_send=' + data_send,
			string		= string1 + string2;

		$.ajax({
			method: 'POST',
			url: amy_script.ajax_url,
			data: 'action=amy_movie_ajax_filter&' + string,
			dataType: 'json',
			beforeSend: function() {
				$loading.addClass('open');
			},
			success: function(response) {
				$loading.removeClass('open');
				$(divf).empty();
				$(divf).html(response).hide().fadeIn(2000);

				amyBtnShowtime();
			}
		});
	}

	function amyMovieGridDateFilter() {
		$('.amy-date-filter').find('.single-date').each(function() {
			var $this 		= $(this),
				$loading 	= $('#amy-loading'),
				divf		= $this.parents('.amy-date-filter').siblings('.amy-ajax-content'),
				data_send 	= $this.siblings('.option-hidden').find('.opt-hidden').attr('data-send'),
				data_cat	= $this.siblings('.option-hidden').find('.opt-hidden').attr('data-cat'),
				string		= 'release=' + $this.attr('data-value') + '&data_send=' + data_send;

			$this.click(function() {
				$.ajax({
					method: 'POST',
					url: amy_script.ajax_url,
					data: 'action=amy_movie_ajax_filter&' + string,
					dataType: 'json',
					beforeSend: function() {
						$loading.addClass('open');
					},
					success: function(response) {
						$loading.removeClass('open');
						$(divf).empty();
						$(divf).html(response).hide().fadeIn(2000);

						amyBtnShowtime();
					}
				});
			});
		});

		$('.amy-date-filter').find('.amy-calendar').datepicker({
			dateFormat: 'yy-mm-dd',
			onSelect: function(dateText, inst) {
				var $this 		= $(this),
					$loading 	= $('#amy-loading'),
					divf		= $this.parents('.amy-date-filter').siblings('.amy-ajax-content'),
					data_send 	= $this.parents('.single-calendar').siblings('.option-hidden').find('.opt-hidden').attr('data-send'),
					data_cat	= $this.parents('.single-calendar').siblings('.option-hidden').find('.opt-hidden').attr('data-cat'),
					string		= 'release=' + $this.val() + '&data_send=' + data_send;

				$.ajax({
					method: 'POST',
					url: amy_script.ajax_url,
					data: 'action=amy_movie_ajax_filter&' + string,
					dataType: 'json',
					beforeSend: function() {
						$loading.addClass('open');
					},
					success: function(response) {
						$loading.removeClass('open');
						$(divf).empty();
						$(divf).html(response).hide().fadeIn(2000);

						amyBtnShowtime();
					}
				});
			}
		});

		$('.amy-date-filter').find('.change-layout').click(function() {
			var columm,
				$this 		= $(this);

			if ($this.attr('data-column') == 2) {
				columm = 3;
				$this.attr('data-column', 3);
			} else if ($this.attr('data-column') == 3) {
				columm = 2;
				$this.attr('data-column', 2);
			}

			var $loading 	= $('#amy-loading'),
				divf		= $this.parents('.amy-date-filter').siblings('.amy-ajax-content'),
				data_send 	= $this.siblings('.option-hidden').find('.opt-hidden').attr('data-send'),
				data_cat	= $this.siblings('.option-hidden').find('.opt-hidden').attr('data-cat'),
				string		= 'data_send=' + data_send + '&column=' + columm;

			$.ajax({
				method: 'POST',
				url: amy_script.ajax_url,
				data: 'action=amy_movie_ajax_filter&' + string,
				dataType: 'json',
				beforeSend: function() {
					$loading.addClass('open');
				},
				success: function(response) {
					$loading.removeClass('open');
					$(divf).empty();
					$(divf).html(response).hide().fadeIn(2000);

					amyBtnShowtime();
				}
			});
		});
	}

	//Search button
	function amyMovieSearchAction() {
		$('.amy-mv-search .filter-action li').each(function() {
			var $this = $(this),
				value = $this.attr('data-type');

			$this.click(function() {
				$('.amy-mv-search .filter-action li').removeClass('active');
				$this.parents('.filter-action').siblings('.amy_type').val(value);
				$this.addClass('active');
			});
		});
	}

	//Isotope Metro Slider
	function amyMetroSlider() {
		var $slider = $('.amy-isotope');
		$slider.find('.amy-metroslider').isotope({
			itemSelector: '.item',
			layoutMode: 'masonryHorizontal'
		});

		if ($slider.find('.amy-metroslider').length != 0) {
			$slider.smoothDivScroll({
			    touchScrolling: true,
				autoScrollingMode: 'onStart'
			});
		}

	}

	//Rating star
	function amyRatingStar() {
		$('.mv-current-rating').each(function() {
			var point = $(this).attr('data-point');

			$(this).css('width', point);
		});
	}

	//Shortcode Showtime
	function amyAjaxShowtime() {
		$('input[type=radio][name=movie_id]').change(function() {
			amyAjaxShowtimefn($(this), 'movie');
		});

		$('input[type=radio][name=cinema_id]').change(function() {
			amyAjaxShowtimefn($(this), 'cinema');
		});
	}

	//Shortcode showtime ajax
	function amyAjaxShowtimefn(tag, type) {
		var $loading = $('#amy-loading');

		var mvtime		= tag.parents('.amy-mv-showtime'),
			st_type		= mvtime.find('.showtime-type').val(),
			divresult	= mvtime.find('.list-time > div');

		if (type == 'movie') {
			var cinema 		= mvtime.find('input[type=radio][name=cinema_id]:checked'),
				cinema_id 	= cinema.val(),
				movie_id	= tag.val();
		} else if (type == 'cinema') {
			var movie 		= mvtime.find('input[type=radio][name=movie_id]:checked'),
				movie_id 	= movie.val(),
				cinema_id	= tag.val();
		}

		$.ajax({
			method: 'POST',
			url: amy_script.ajax_url,
			data: 'action=amy_movie_ajax_showtime&cinema_id=' + cinema_id + '&movie_id=' + movie_id + '&st_type=' + st_type + '&action_type=shortcode',
			dataType: 'json',
			beforeSend: function() {
				$loading.addClass('open');
			},
			success: function(response) {
				divresult.empty();
				$loading.removeClass('open');
				divresult.html(response);
			}
		});
	}

	//Button showtime
	function amyBtnShowtime() {
		$('.showtime-btn').each(function() {
			var $parent = $(this).parents('.entry-item'),
				$st		= $parent.find('.entry-showtime');

			$(this).click(function() {
				$st.toggleClass('show');
			});

		});
	}

	//Single Showtime
	function amySingleShowtime() {
		var $loading = $('#amy-loading');

		$('.entry-showtime .select-cinema ul li').each(function() {
			var $this		= $(this),
				cinema_id 	= $(this).attr('data-cinema'),
				movie_id	= $(this).attr('data-movie'),
				showtime	= $('.entry-showtime .showtime');

			$(this).click(function() {
				$('.entry-showtime .select-cinema ul li').removeClass('active');

				$.ajax({
					type: 'POST',
					url: amy_script.ajax_url + '?action=amy_movie_ajax_showtime&cinema_id=' + cinema_id + '&movie_id=' + movie_id,
					dataType: 'json',
					beforeSend: function() {
						$loading.addClass('open');
					},
					success: function(response) {
						showtime.empty();
						$this.addClass('active');
						$loading.removeClass('open');
						showtime.html(response);
					}
				});
			});
		});
	}

	function amyMovieRate() {
		$('.movie-rating-star').each(function() {
			$(this).click(function() {
				var $loading 	= $('#amy-loading'),
					value 		= $(this).attr('data-value'),
					m_id		= $(this).attr('data-post');

				$.ajax({
					method: 'POST',
					url: amy_script.ajax_url,
					data: 'action=amy_movie_ajax_rate&post_id=' + m_id + '&point=' + value,
					dataType: 'json',
					beforeSend: function() {
						$loading.addClass('open');
					},
					success: function(response) {
						$loading.removeClass('open');

						if (response == -1) {
							alert(amy_script.amy_rate_already);
						} else if (response == 1) {
							alert(amy_script.amy_rate_done);
							location.reload();
						}
					}
				});
			});
		});
	}

	function amyMovieOther() {
		//
		var cp 	= $('.cinema-details'),
			cb	= cp.find('.bg-dl'),
			cg	= cp.find('.cinema-gallery'),
			ci	= cp.find('.cinema-info');

		cb.css('height', cg.height() + ci.height() + 70);
		cg.css('margin-top', '-' + (cg.height() + 100) + 'px');

		//
		var av = $('.amy-mv-list .entry-item'),
			ai = av.find('.entry-thumb img').width(),
			ac = av.find('.entry-content');

		//ac.css('margin-left', ai + 27);
	}

	function V2movietooltip() {
		$('.amy-movie-carousel-1 .amy-movie-items, .amy-movie-grid-1 .amy-movie-items').each(function() {
			var $this, $tooltip, $tooltipstyle;
			$this = $(this);
			$tooltip = $this.find('.tooltip');
			$tooltipstyle = $this.data('tooltip-style');
			$tooltip.tooltipster({
				position: 'right',
				animationDuration: 200,
				delay: 200,
				zIndex: 99,
				theme: 'tooltipster-shadow ' + $tooltipstyle,
				contentCloning: true,
				interactive: true,
				maxWidth: 380,
				minWidth: 300
			});
		});
	}

	function V2movieCarousel1() {
		if ($('.amy-slick-carousel').length) {
			$('.amy-slick-carousel').each(function() {
				var $this;
				$this = $(this);
				$this.imagesLoaded(function() {
					$this.slick();
				});
			});
		}
	}

	function V2movieCarousel2() {
		if ($('.amy-movie-carousel-2').length) {
			$('.amy-movie-carousel-2 .amy-movie-items').each(function() {
				var $arrows, $next, $prev, $this, slick;
				$this = $(this);
				$arrows = $('.slick-arrows');
				$next = $arrows.children(".slick-next");
				$prev = $arrows.children(".slick-prev");
				slick = $this.slick({
					centerMode: true,
					infinite: true,
					centerPadding: '0px',
					slidesToShow: 7,
					dots: false,
					variableWidth: true,
					cssEase: 'linear',
					slideDelay: 200,
					appendArrows: $arrows
				});
				$('.slick-next').on('click', function(e) {
					var i;
					i = $next.index(this);
					slick.eq(i).slick("slickNext");
				});
				$('.slick-prev').on('click', function(e) {
					var i;
					i = $prev.index(this);
					slick.eq(i).slick("slickPrev");
				});
				$this.on('afterChange', function() {});
			});
		}
	}

	function V2movieCarousel3d() {
		$('.amy-movie-carousel-3d .amy-movie-items').each(function() {
			let $this = $(this);

			if ($window.width() > 480) {
				return $this.imagesLoaded(function() {
					console.log('trung');
					$this.waterwheelCarousel({
						separation: 190,
						separationMultiplier: 0.5,
						sizeMultiplier: 0.7,
						opacityMultiplier: 1
					});
				});
			} else {
				$this.slick();
			}

		});
	}

	function V2trailerlistScrollbar() {
		$('.playlist-trailer').mCustomScrollbar({
			theme: 'minimal-dark',
			scrollInertia: 150
		});
	}

	function V2amyPlay() {
		var $this, newSource, player, poster, src, type, types;
		if ($('.movie-steaming, .amy-movie-trailer-list').length) {
			player = new Plyr('#amyplayer', {
				debug: true,
				title: '',
				iconUrl: amy_script.site_url + '/wp-content/themes/amy-movie/images/icons/plyr.svg',
				keyboard: {
					global: true
				},
				tooltips: {
					controls: true
				},
				captions: {
					active: true
				}
			});
			types = {
				video: 'video',
				audio: 'audio',
				youtube: 'youtube',
				vimeo: 'vimeo'
			};
			newSource = function(type, video, image, autoplay) {
				switch (type) {
					case types.video:
						player.source = {
							type: 'video',
							sources: [{
								src: video,
								type: 'video/mp4'
							}],
							poster: image,
							autoplay: autoplay
						};
						break;
					case types.youtube:
						player.source = {
							type: 'video',
							sources: [{
								src: video,
								provider: 'youtube'
							}],
							autoplay: autoplay
						};
						break;
					case types.vimeo:
						player.source = {
							type: 'video',
							sources: [{
								src: video,
								provider: 'vimeo'
							}],
							autoplay: autoplay
						};
						break;
				}
			};
			if ($('.movie-steaming').length) {
				$this = $('#amyplayer');
				src = $this.data('source');
				type = $this.data('type');
				poster = $this.data('poster');
				newSource(type, src, poster, false);
			}
			$('.amy-movie-trailer-list').each(function() {
				$this = $(this);
				$this.find('.list-item').first().addClass("selected");
				poster = $this.find('.list-item').first().data('poster');
				src = $this.find('.list-item').first().data('source');
				type = $this.find('.list-item').first().data('type');
				$this.find('.trailer-list-wrapper').css('background-image', 'url(' + poster + ')');
				$this.find(".play-video").on('click', function() {
					$('.video-play').hide();
					$('.video-holder').show();
					newSource(type, src, poster, true);
				});
				$('.playlist-trailer .list-item').each(function() {
					$(this).on('click', function() {
						$(".playlist-trailer .list-item").removeClass("selected");
						$(this).addClass("selected");
						poster = $(this).data('poster');
						src = $(this).data('source');
						type = $(this).data('type');
						$(this).closest('.trailer-list-wrapper').css('background-image', 'url(' + poster + ')');
						newSource(type, src, poster, false);
					});
				});
			});
		}
	}

	function V2galleryCarousel() {
		if ($('.amy-gallery-carousel .gallery-list').length) {
			$('.amy-gallery-carousel .gallery-list').each(function() {
				var $this;
				$this = $(this);
				$this.slick({
					dots: true,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					centerMode: true,
					variableWidth: true
				});
			});
		}
	}

	function V2galleryGrid() {
		$('.amy-gallery-grid').each(function() {
			var $column, $iso, $isoItem, $this;
			$this = $(this);
			$iso = $this.find('.gallery-grid-inner');
			$isoItem = $this.find('.grid-item');
			$column = $iso.data('column');
			$iso.imagesLoaded(function() {
				$iso.isotope({
					animationEngine: 'best-available',
					layoutMode: 'masonry',
					masonry: {
						columnWidth: '.col-md-' + (12 / $column)
					}
				});
				$(window).on('debouncedresize', function() {
					setTimeout(function() {
						$iso.isotope('relayout');
						$(window).resize();
					}, 300);
				});
			});
		});
	}

	function V2movieShowtimeLayout4() {
		$('.amy-movie-showtimews-daily-2').each(function() {
			$(this).find('.amy-movie-item .amy-movie-item-showtimes').each(function() {
				var $this, itemlist, movie_id, selectshowtime;
				$this = $(this);
				selectshowtime = $this.find('.timelist');
				itemlist = $(selectshowtime).siblings('.amy-movie-item-time-list');
				movie_id = selectshowtime.attr('data-movie');
				selectshowtime.on('change', function() {
					return $.ajax({
						method: 'POST',
						url: amy_script.ajax_url,
						dataType: 'json',
						data: 'action=amy_movie_ajax_shortcode_showtime_layout_4&movie_id=' + movie_id + '&date=' + selectshowtime.val(),
						beforeSend: function() {
							$this.addClass('amy-ajax-showtime-loading');
						},
						success: function(response) {
							$this.removeClass('amy-ajax-showtime-loading');
							itemlist.empty();
							itemlist.append(response);
						}
					});
				});
			});
		});
	}

	function V2movieShowtimeLayout3() {
		$('.amy-movie-showtimews-daily-1').each(function() {
			var $that;
			$that = $(this);
			$that.find('.amy-showtimes-header ul li a').each(function() {
				var $this, date, list_movie;
				$this = $(this);

				var $parent	= $this.parents('.amy-movie-showtimews-daily-1');
				var $param = $parent.find('.amy-param').val();
				var $option = $parent.find('.amy-option').val();
				var date = $this.attr('data-date');
				$this.on('click', function(el) {
					el.preventDefault();
					$('.amy-showtimes-header ul li').removeClass('active');
					$this.closest('.amy-showtimes-header ul li').addClass('active');
					return $.ajax({
						method: 'POST',
						url: amy_script.ajax_url,
						dataType: 'json',
						data: 'action=amy_movie_ajax_shortcode_showtime_layout_3&param=' + $param + '&date=' + date  + '&option=' + $option,
						beforeSend: function() {
							$('#amy-loading').addClass('open');
						},
						success: function(response) {
							$('#amy-loading').removeClass('open');
							$('.amy-movie-list .amy-movie-items').empty().append(response);
						}
					});
				});
			});
		});
	}

	function V2lightbulb() {
		$('.btn_lightbulb').on('click', function() {
			var title;
			$(this).toggleClass("off");
			title = 'Turn off the light';
			if ($(this).hasClass('off')) {
				title = 'Turn on the light';
				$('body').append('<div id="background_lamp"></div>');
			} else {
				$("#background_lamp").remove();
			}
			return $(this).attr('title', title);
		});
	}

	function V2streaming() {
		function goToByScroll(id) {
			// Remove "link" from the ID
			id = id.replace("link", "");
			// Scroll
			$('html,body').animate({
				scrollTop: $("#" + id).offset().top
			}, 'slow');
		}

		$('.amy-streaming-link').each(function () {
			var $source = $(this).attr('data-source'),
				$type	= $(this).attr('data-type'),
				$this	= $(this),
				$ms		= $(this).parents('.movie-steaming');

			$this.on('click', function () {
				$ms.find('.amy-streaming-link').removeClass('active');
				$this.addClass('active');
				var player = $ms.find('.amy-movie-item-play .box-player');

				player.empty();
				//player.append('<video id="amyplayer" data-source=' + $source + ' data-type=' + $type + ' data-poster="" controls playsinline></video>');

				if ($source.indexOf("youtube") > 0 || $source.indexOf("vimeo") > 0) {
					player.append('<video id="amyplayer" data-source=' + $source + ' data-type=' + $type + ' data-poster="" controls playsinline></video>');
				} else {
					player.append('<div class="amy-iframe"><iframe src=' + $source + ' allowfullscreen></iframe></div>');
				}
				goToByScroll('amyStream');
				V2amyPlay();
			});
		})
	}

	function amyAjaxSearch() {
		var $loading 	= $('#amy-loading');

		var delay = (function(){
			var timer = 0;
			return function(callback, ms){
				clearTimeout (timer);
				timer = setTimeout(callback, ms);
			};
		})();

		if ($('.amy-mv-search').length) {
			$('.input-txt').on('keypress', function (el) {
				var $this = $(this),
					$s = $this.val();

				delay(function(){
					var data = {
						'action': 'amy_movie_ajax_search',
						's': $s,
					};

					$.ajax({
						method: 'POST',
						url: amy_script.ajax_url,
						data: data,
						dataType: 'json',
						beforeSend: function () {
							$loading.addClass('open');
						},
						success: function (response) {
							$loading.removeClass('open');

							$('.search-ajax-content').html(response);
							$('.search-ajax-content').addClass('open');
						}
					});
				}, 500);
			});

			$('body').on('click', function () {
				$('.search-ajax-content').removeClass('open');
			});
		}
	}

	$(document).ready(function() {
		pageLoad();
		amyGeneral();
		amyMenu();
		amyTab();
		amySlider();
		amyFancyBox();
		amyRatingStar();
		amyMovieSearchAction();


		amyMovieFilter();
		amyMovieGridDateFilter();
		amyMetroSlider();
		amyAjaxShowtime();
		amySingleShowtime();
		amyMovieRate();
		amyMovieOther();

		//V2 function
		V2movieCarousel1();
		V2movieCarousel2();
		V2movietooltip();
		V2movieCarousel3d();
		V2trailerlistScrollbar();
		V2amyPlay();
		V2galleryCarousel();
		V2galleryGrid();
		V2movieShowtimeLayout3();
		V2movieShowtimeLayout4();
		V2lightbulb();
		V2streaming();

		amyAjaxSearch();
		MvFilterSC();

		amyBtnShowtime();

		$(window).on('resize', function() {
			amyMenu();
			V2movieCarousel3d();
		});
	});

})(jQuery, window, document);

jQuery(".img-user").click(function () {
  jQuery(".list-down").slideToggle();
});


jQuery("ul li.showtime:first").addClass("active-showtime");jQuery("ul li.showtime").click(function(){
  jQuery(this).addClass("active-showtime");
  jQuery(this).siblings().removeClass("active-showtime");
});


jQuery('.nav-item a').click(function (e) {
  e.preventDefault();
  jQuery('.nav-item a.active').removeClass('active');
  jQuery(this).addClass('active');
  if (jQuery(this).attr('value') == "ve") {
      jQuery("#ve").css("display", "block");
      jQuery("#matkhau").css("display", "none");
      jQuery("#taikhoan").css("display", "none");
  } else {
      jQuery("#ve").css("display", "none");
      jQuery("#matkhau").css("display", "none");
      jQuery("#taikhoan").css("display", "block");
  }
});

jQuery(".reset-pass").click(function () {
  jQuery("#ve").css("display", "none");
  jQuery("#taikhoan").css("display", "none");
  jQuery("#matkhau").css("display", "block");
});

jQuery('.nav-item').hover(function () {
  // Khi di chuột vào nav-item
  var menu = jQuery(this).find('.dropdown-menu');
  // Kiểm tra xem dropdown-menu đã hiển thị hay chưa
  if (!menu.hasClass('show')) {
      // Nếu chưa hiển thị, sử dụng slideDown để hiển thị
      menu.slideDown(300, function () {
          menu.addClass('show');
      });
  }
}, function () {
  // Khi di chuột khỏi nav-item
  var menu = jQuery(this).find('.dropdown-menu');
  // Sử dụng slideUp để ẩn
  menu.slideUp(300, function () {
      menu.removeClass('show');
  });
});




// Chat bot =======================================


// Chat mode
jQuery("body").on('click', '.chat-mode-1', function () {
})

jQuery("body").on('click', '.chat-mode div', function () {
  let user_message;
  let clicked_id = jQuery(this).attr("class");
  switch (clicked_id) {
    case "chat-mode-1":
      user_message = jQuery(".chat-mode-1").text();
      break;
    case "chat-mode-2":
      user_message = jQuery(".chat-mode-2").text();;
      break;
    case "chat-mode-3":
      user_message = jQuery(".chat-mode-3").text();;
      break;
    case "chat-mode-4":
      user_message = jQuery(".chat-mode-4").text();;
      break;
    case "chat-mode-5":
      user_message = jQuery(".chat-mode-5").text();;
      break;
    case "chat-mode-6":
      user_message = jQuery(".chat-mode-6").text();;
      break;
    case "chat-mode-7":
      user_message = jQuery(".chat-mode-7").text();;
      break;
  }
  jQuery('.chatbot-message-container').append(
    "<div class='chatbot-message user-message'><span>" + user_message + "</span></div> <div class='chatbot-message bot-message'><span>Bot's response here.</span></div>"
  ).animate({
    scrollTop: jQuery('.chatbot-message-container')[0].scrollHeight
  }, 500);


});


jQuery(".chatbot-message-container").css("padding-bottom", jQuery(".chat-mode").height());



jQuery('#stars li').on('mouseover', function () {
  var onStar = parseInt(jQuery(this).data('value'), 10);
  jQuery(this).parent().children('li.star').each(function (e) {
      if (e < onStar) {
          jQuery(this).addClass('hover');
      } else {
          jQuery(this).removeClass('hover');
      }
  });
}).on('mouseout', function () {
  jQuery(this).parent().children('li.star').each(function (e) {
      jQuery(this).removeClass('hover');
  });
});
jQuery('#stars li').on('click', function () {
  var onStar = parseInt(jQuery(this).data('value'), 10);
  var stars = jQuery(this).parent().children('li.star');
  for (i = 0; i < stars.length; i++) {
      jQuery(stars[i]).removeClass('selected');
  }
  for (i = 0; i < onStar; i++) {
      jQuery(stars[i]).addClass('selected');
  }
});

// jQuery(".cls").on('click', function () {
//   jQuery(".modal-binhluan").css('animation', 'topdown 0.5s ease-in-out forwards')
//   jQuery(".overlay").css('display', 'none');
// });
jQuery(".cls").on('click', function () {
  jQuery(".modal-binhluan").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".modal-payment").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".modal-maxchair").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".modal-rebuy").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".modal-trailer").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".overlay").css('display', 'none');
});

jQuery(".overlay").on('click', function () {
  jQuery(".modal-binhluan").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".modal-payment").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".modal-maxchair").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".modal-rebuy").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery(".modal-trailer").css('animation', 'topdown 0.5s ease-in-out forwards')
  jQuery('.overlay').css('display', 'none');
});

jQuery(".btn-comment").on('click', function () {
  jQuery(".modal-binhluan").css('animation', 'downtop 0.5s ease-in-out forwards')
  jQuery(".modal-binhluan").css('display', 'block')
  jQuery(".overlay").css('display', 'block');
});


jQuery(".btn-trailer").closest(".slide-item").find('.btn-trailer').on('click', function () {
  var colosest = jQuery(this).closest(".slide-item");
  jQuery(".modal-trailer").css('animation', 'downtop 0.5s ease-in-out forwards')
  jQuery(".modal-trailer").css('display', 'block')
  jQuery(".overlay").css('display', 'block');

  var attr = {
      // "image": colosest.find('.slide-thumb img').attr('src'),
      "match": colosest.find(".percent-match").val(),
      "limited": colosest.find(".limited").val(),
      "description": colosest.find(".description").val(),
      "actor": colosest.find(".actor").val(),
      "theloai": colosest.find(".theloai").val(),
      "rate": colosest.find(".rate").val(),
  }
  // jQuery(".modal-trailer .detail-img").css("background-image", "url('" + attr.image + "')");
  jQuery(".modal-trailer .detail-in .match").text(attr.match);
  jQuery(".modal-trailer .detail-in .descrip").text(attr.description);
  jQuery(".modal-trailer .detail-in .limit").text(attr.limited);
  jQuery(".modal-trailer .detail-in .actor-modal").text(attr.actor);
  jQuery(".modal-trailer .detail-in .theloai-modal").text(attr.theloai);
  var rateValue = parseFloat(attr.rate);
  var starCount = Math.round(rateValue);
  var starHtml = '';
  for (var i = 1; i <= 5; i++) {
      if (i <= starCount) {
          starHtml += '<i class="fa-sharp fa-solid fa-star"></i>';
      } else {
          starHtml += '<i class="fa-sharp fa-regular fa-star"></i>';
      }
  }
  jQuery('.rate-modal').html(starHtml);
});






jQuery(".btn-trailer-detail").on('click', function () {
  jQuery(".modal-trailer").css('animation', 'downtop 0.5s ease-in-out forwards')
  jQuery(".modal-trailer").css('display', 'block')
  jQuery(".overlay").css('display', 'block');

  var attr = {
      // "image": jQuery('.thumb-detail-img').attr('src'),
      "match": jQuery(".percent-match").val(),
      "limited": jQuery(".limited").val(),
      "description": jQuery(".description").val(),
      "actor": jQuery(".actor").val(),
      "theloai": jQuery(".theloai").val(),
      "rate": jQuery(".rate").val(),
  }
  // jQuery(".modal-trailer .detail-img").css("background-image", "url('" + attr.image + "')");
  jQuery(".modal-trailer .detail-in .match").text(attr.match);
  jQuery(".modal-trailer .detail-in .descrip").text(attr.description);
  jQuery(".modal-trailer .detail-in .limit").text(attr.limited);
  jQuery(".modal-trailer .detail-in .actor-modal").text(attr.actor);
  jQuery(".modal-trailer .detail-in .theloai-modal").text(attr.theloai);
  var rateValue = parseFloat(attr.rate);
  var starCount = Math.round(rateValue);
  var starHtml = '';
  for (var i = 1; i <= 5; i++) {
      if (i <= starCount) {
          starHtml += '<i class="fa-sharp fa-solid fa-star"></i>';
      } else {
          starHtml += '<i class="fa-sharp fa-regular fa-star"></i>';
      }
  }
  jQuery('.rate-modal').html(starHtml);
});




var readURL = function (input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          jQuery('.profile-pic').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
  }
}

jQuery(".file-upload").on('change', function () {
  readURL(this);
});

jQuery(".upload-button").on('click', function () {
  jQuery(".file-upload").click();
});



// Chat bot
    jQuery(".icon-chatbot").on('click', function () {
        if (jQuery(".chatbot-container").css('opacity') === '0') {
            jQuery('.chatbot-container').css('animation', 'show 0.5s ease-in-out forwards');
        } else {
            jQuery('.chatbot-container').css({ animation: 'hide 0.5s ease-in-out forwards' });
        }
    });
    // Close Chat bot
    jQuery(".close-chat").on('click', function () {
        jQuery('.chatbot-container').css({ animation: 'hide 0.5s ease-in-out forwards' });
    });



jQuery('.btn-search').click(function() {
    jQuery('.input-search').addClass('open');
     jQuery(this).css('display', 'none');
         jQuery('.btn-close').css('display', 'block');
    jQuery('.show-search').css('display', 'block');
})

jQuery('.btn-close').click(function() {
    jQuery('.input-search').removeClass('open');
     jQuery('.btn-search').css('display', 'block');
         jQuery(this).css('display', 'none');
      jQuery('.show-search').css('display', 'none');
})