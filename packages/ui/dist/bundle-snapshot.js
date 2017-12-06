(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var bundle = (function () {
'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function toNumber(value) {
	return value === '' ? undefined : +value;
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._root = options._root || component;
	component._bind = options._bind;

	component.options = options;
	component.store = component._root.options.store;
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this._root._lock) return;
	this._root._lock = true;
	callAll(this._root._beforecreate);
	callAll(this._root._oncreate);
	callAll(this._root._aftercreate);
	this._root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	this._fragment.u();
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

__$styleInject("/*! Spectre.css v0.4.6 | MIT License | github.com/picturepan2/spectre */\n/* Manually forked from Normalize.css */\n/* normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/** 1. Change the default font family in all browsers (opinionated). 2. Correct the line height in all browsers. 3. Prevent adjustments of font size after orientation changes in IE on Windows Phone and in iOS. */\n/* Document ========================================================================== */\nhtml {\n  font-family: sans-serif; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 3 */ \n  -ms-text-size-adjust: 100%; /* 3 */\n}\n\n/* Sections ========================================================================== */\n/** Remove the margin in all browsers (opinionated). */\nbody {\n  margin: 0;\n}\n\n/** Add the correct display in IE 9-. */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/** Correct the font size and margin on `h1` elements within `section` and `article` contexts in Chrome, Firefox, and Safari. */\nh1 {\n  font-size: 2em;\n  margin: .67em 0;\n}\n\n/* Grouping content ========================================================================== */\n/** Add the correct display in IE 9-. 1. Add the correct display in IE. */\nfigcaption,\nfigure,\nmain {\n  /* 1 */ display: block;\n}\n\n/** Add the correct margin in IE 8 (removed). */\n/** 1. Add the correct box sizing in Firefox. 2. Show the overflow in Edge and IE. */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/** 1. Correct the inheritance and scaling of font size in all browsers. (removed) 2. Correct the odd `em` font sizing in all browsers. */\n/* Text-level semantics ========================================================================== */\n/** 1. Remove the gray background on active links in IE 10. 2. Remove gaps in links underline in iOS 8+ and Safari 8+. */\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/** Remove the outline on focused links when they are also active or hovered in all browsers (opinionated). */\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/** Modify default styling of address. */\naddress {\n  font-style: normal;\n}\n\n/** 1. Remove the bottom border in Firefox 39-. 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari. (removed) */\n/** Prevent the duplicate application of `bolder` by the next rule in Safari 6. */\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/** Add the correct font weight in Chrome, Edge, and Safari. */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/** 1. Correct the inheritance and scaling of font size in all browsers. 2. Correct the odd `em` font sizing in all browsers. */\ncode,\nkbd,\npre,\nsamp {\n  font-family: \"SF Mono\", \"Segoe UI Mono\", \"Roboto Mono\", Menlo, Courier, monospace; /* 1 (changed) */\n  font-size: 1em; /* 2 */\n}\n\n/** Add the correct font style in Android 4.3-. */\ndfn {\n  font-style: italic;\n}\n\n/** Add the correct background and color in IE 9-. (Removed) */\n/** Add the correct font size in all browsers. */\nsmall {\n  font-size: 80%;\n  font-weight: 400; /* (added) */\n}\n\n/** Prevent `sub` and `sup` elements from affecting the line height in all browsers. */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -.25em;\n}\n\nsup {\n  top: -.5em;\n}\n\n/* Embedded content ========================================================================== */\n/** Add the correct display in IE 9-. */\naudio,\nvideo {\n  display: inline-block;\n}\n\n/** Add the correct display in iOS 4-7. */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/** Remove the border on images inside links in IE 10-. */\nimg {\n  border-style: none;\n}\n\n/** Hide the overflow in IE. */\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms ========================================================================== */\n/** 1. Change the font styles in all browsers (opinionated). 2. Remove the margin in Firefox and Safari. */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 (changed) */\n  font-size: inherit; /* 1 (changed) */\n  line-height: inherit; /* 1 (changed) */\n  margin: 0; /* 2 */\n}\n\n/** Show the overflow in IE. 1. Show the overflow in Edge. */\nbutton,\ninput {\n  /* 1 */ overflow: visible;\n}\n\n/** Remove the inheritance of text transform in Edge, Firefox, and IE. 1. Remove the inheritance of text transform in Firefox. */\nbutton,\nselect {\n  /* 1 */ text-transform: none;\n}\n\n/** 1. Prevent a WebKit bug where (2) destroys native `audio` and `video` controls in Android 4. 2. Correct the inability to style clickable types in iOS and Safari. */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/** Remove the inner border and padding in Firefox. */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/** Restore the focus styles unset by the previous rule (removed). */\n/** Change the border, margin, and padding in all browsers (opinionated) (changed). */\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/** 1. Correct the text wrapping in Edge and IE. 2. Correct the color inheritance from `fieldset` elements in IE. 3. Remove the padding so developers are not caught out when they zero out `fieldset` elements in all browsers. */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/** 1. Add the correct display in IE 9-. 2. Add the correct vertical alignment in Chrome, Firefox, and Opera. */\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/** Remove the default vertical scrollbar in IE. */\ntextarea {\n  overflow: auto;\n}\n\n/** 1. Add the correct box sizing in IE 10-. 2. Remove the padding in IE 10-. */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/** Correct the cursor style of increment and decrement buttons in Chrome. */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/** 1. Correct the odd appearance in Chrome and Safari. 2. Correct the outline style in Safari. */\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/** Remove the inner padding and cancel buttons in Chrome and Safari on macOS. */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/** 1. Correct the inability to style clickable types in iOS and Safari. 2. Change font properties to `inherit` in Safari. */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive ========================================================================== */\n/* Add the correct display in IE 9-. 1. Add the correct display in Edge, IE, and Firefox. */\ndetails,\nmenu {\n  display: block;\n}\n\n/* Add the correct display in all browsers. */\nsummary {\n  display: list-item;\n  outline: none;\n}\n\n/* Scripting ========================================================================== */\n/** Add the correct display in IE 9-. */\ncanvas {\n  display: inline-block;\n}\n\n/** Add the correct display in IE. */\ntemplate {\n  display: none;\n}\n\n/* Hidden ========================================================================== */\n/** Add the correct display in IE 10-. */\n[hidden] {\n  display: none;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: 20px;\n  line-height: 1.5;\n  -webkit-tap-highlight-color: transparent;\n}\n\nbody {\n  background: #fff;\n  color: #50596c;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: .8rem;\n  overflow-x: hidden;\n  text-rendering: optimizeLegibility;\n}\n\na {\n  color: #5755d9;\n  outline: none;\n  text-decoration: none;\n}\n\na:focus {\n  box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);\n}\n\na:focus,\na:hover,\na:active,\na.active {\n  color: #4240d4;\n  text-decoration: underline;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: inherit;\n  font-weight: 500;\n  line-height: 1.2;\n  margin-bottom: .5em;\n  margin-top: 0;\n}\n\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-weight: 500;\n}\n\nh1,\n.h1 {\n  font-size: 2rem;\n}\n\nh2,\n.h2 {\n  font-size: 1.6rem;\n}\n\nh3,\n.h3 {\n  font-size: 1.4rem;\n}\n\nh4,\n.h4 {\n  font-size: 1.2rem;\n}\n\nh5,\n.h5 {\n  font-size: 1rem;\n}\n\nh6,\n.h6 {\n  font-size: .8rem;\n}\n\np {\n  margin: 0 0 1rem;\n}\n\na,\nins,\nu {\n  -webkit-text-decoration-skip: ink edges;\n  text-decoration-skip: ink edges;\n}\n\nabbr[title] {\n  border-bottom: .05rem dotted;\n  cursor: help;\n  text-decoration: none;\n}\n\nkbd {\n  background: #454d5d;\n  border-radius: .1rem;\n  color: #fff;\n  font-size: .7rem; \n  line-height: 1.2;\n  padding: .1rem .15rem;\n}\n\nmark {\n  background: #ffe9b3;\n  border-radius: .1rem;\n  color: #50596c;\n  padding: .05rem;\n}\n\nblockquote {\n  border-left: .1rem solid #e7e9ed;\n  margin-left: 0;\n  padding: .4rem .8rem;\n}\n\nblockquote p:last-child {\n  margin-bottom: 0;\n}\n\nul,\nol {\n  margin: .8rem 0 .8rem .8rem;\n  padding: 0;\n}\n\nul ul,\nul ol,\nol ul,\nol ol {\n  margin: .8rem 0 .8rem .8rem;\n}\n\nul li,\nol li {\n  margin-top: .4rem;\n}\n\nul {\n  list-style: disc inside;\n}\n\nul ul {\n  list-style-type: circle;\n}\n\nol {\n  list-style: decimal inside;\n}\n\nol ol {\n  list-style-type: lower-alpha;\n}\n\ndl dt {\n  font-weight: bold;\n}\n\ndl dd {\n  margin: .4rem 0 .8rem 0;\n}\n\n:lang(zh) {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", sans-serif;\n}\n\n:lang(ja) {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Hiragino Sans\", \"Hiragino Kaku Gothic Pro\", \"Yu Gothic\", YuGothic, Meiryo, \"Helvetica Neue\", sans-serif;\n}\n\n:lang(ko) {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Malgun Gothic\", \"Helvetica Neue\", sans-serif;\n}\n\n:lang(zh) ins,\n:lang(zh) u,\n:lang(ja) ins,\n:lang(ja) u,\n.cjk ins,\n.cjk u {\n  border-bottom: .05rem solid;\n  text-decoration: none;\n}\n\n:lang(zh) del + del,\n:lang(zh) del + s,\n:lang(zh) ins + ins,\n:lang(zh) ins + u,\n:lang(zh) s + del,\n:lang(zh) s + s,\n:lang(zh) u + ins,\n:lang(zh) u + u,\n:lang(ja) del + del,\n:lang(ja) del + s,\n:lang(ja) ins + ins,\n:lang(ja) ins + u,\n:lang(ja) s + del,\n:lang(ja) s + s,\n:lang(ja) u + ins,\n:lang(ja) u + u,\n.cjk del + del,\n.cjk del + s,\n.cjk ins + ins,\n.cjk ins + u,\n.cjk s + del,\n.cjk s + s,\n.cjk u + ins,\n.cjk u + u {\n  margin-left: .125em;\n}\n\n.table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  text-align: left;\n  width: 100%;\n}\n\n.table.table-striped tbody tr:nth-of-type(odd) {\n  background: #f8f9fa;\n}\n\n.table tbody tr.active,\n.table.table-striped tbody tr.active {\n  background: #f0f1f4;\n}\n\n.table.table-hover tbody tr:hover {\n  background: #f0f1f4;\n}\n\n.table.table-scroll {\n  display: block;\n  overflow-x: auto;\n  padding-bottom: .75rem;\n  white-space: nowrap;\n}\n\n.table td,\n.table th {\n  border-bottom: .05rem solid #e7e9ed;\n  padding: .6rem .4rem;\n}\n\n.table th {\n  border-bottom-width: .1rem;\n}\n\n.btn {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  background: #fff;\n  border: .05rem solid #5755d9;\n  border-radius: .1rem;\n  color: #5755d9;\n  cursor: pointer;\n  display: inline-block;\n  font-size: .8rem;\n  height: 1.8rem;\n  line-height: 1rem;\n  outline: none;\n  padding: .35rem .4rem;\n  text-align: center;\n  text-decoration: none;\n  transition: all .2s ease;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n.btn:focus {\n  box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);\n}\n\n.btn:focus,\n.btn:hover {\n  background: #f1f1fc;\n  border-color: #4b48d6;\n  text-decoration: none;\n}\n\n.btn:active,\n.btn.active {\n  background: #4b48d6;\n  border-color: #3634d2;\n  color: #fff;\n  text-decoration: none;\n}\n\n.btn:active.loading::after,\n.btn.active.loading::after {\n  border-bottom-color: #fff;\n  border-left-color: #fff;\n}\n\n.btn[disabled],\n.btn:disabled,\n.btn.disabled {\n  cursor: default;\n  opacity: .5;\n  pointer-events: none;\n}\n\n.btn.btn-primary {\n  background: #5755d9;\n  border-color: #4b48d6;\n  color: #fff;\n}\n\n.btn.btn-primary:focus,\n.btn.btn-primary:hover {\n  background: #4240d4;\n  border-color: #3634d2;\n  color: #fff;\n}\n\n.btn.btn-primary:active,\n.btn.btn-primary.active {\n  background: #3a38d2;\n  border-color: #302ecd;\n  color: #fff;\n}\n\n.btn.btn-primary.loading::after {\n  border-bottom-color: #fff;\n  border-left-color: #fff;\n}\n\n.btn.btn-link {\n  background: transparent;\n  border-color: transparent;\n  color: #5755d9;\n}\n\n.btn.btn-link:focus,\n.btn.btn-link:hover,\n.btn.btn-link:active,\n.btn.btn-link.active {\n  color: #4240d4;\n}\n\n.btn.btn-sm {\n  font-size: .7rem;\n  height: 1.4rem;\n  padding: .15rem .3rem;\n}\n\n.btn.btn-lg {\n  font-size: .9rem;\n  height: 2rem;\n  padding: .45rem .6rem;\n}\n\n.btn.btn-block {\n  display: block;\n  width: 100%;\n}\n\n.btn.btn-action {\n  padding-left: 0;\n  padding-right: 0; \n  width: 1.8rem;\n}\n\n.btn.btn-action.btn-sm {\n  width: 1.4rem;\n}\n\n.btn.btn-action.btn-lg {\n  width: 2rem;\n}\n\n.btn.btn-clear {\n  background: transparent;\n  border: 0;\n  color: currentColor;\n  height: .8rem;\n  line-height: .8rem;\n  margin-left: .2rem;\n  margin-right: -2px;\n  opacity: 1;\n  padding: 0;\n  text-decoration: none;\n  width: .8rem;\n}\n\n.btn.btn-clear:hover {\n  opacity: .95;\n}\n\n.btn.btn-clear::before {\n  content: \"\\2715\";\n}\n\n.btn-group {\n  display: inline-flex;\n  display: -ms-inline-flexbox;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n\n.btn-group .btn {\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n}\n\n.btn-group .btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n  margin-left: -.05rem;\n}\n\n.btn-group .btn:last-child:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  margin-left: -.05rem;\n}\n\n.btn-group .btn:focus,\n.btn-group .btn:hover,\n.btn-group .btn:active,\n.btn-group .btn.active {\n  z-index: 1;\n}\n\n.btn-group.btn-group-block {\n  display: flex; \n  display: -ms-flexbox;\n}\n\n.btn-group.btn-group-block .btn {\n  -ms-flex: 1 0 0;\n  flex: 1 0 0;\n}\n\n.form-group:not(:last-child) {\n  margin-bottom: .4rem;\n}\n\nfieldset {\n  margin-bottom: .8rem;\n}\n\nlegend {\n  font-size: .9rem;\n  font-weight: 500;\n  margin-bottom: .8rem;\n}\n\n.form-label {\n  display: block;\n  line-height: 1rem;\n  padding: .4rem 0;\n}\n\n.form-label.label-sm {\n  padding: .2rem 0;\n}\n\n.form-label.label-lg {\n  padding: .5rem 0;\n}\n\n.form-input {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  background: #fff;\n  background-image: none;\n  border: .05rem solid #caced7;\n  border-radius: .1rem;\n  color: #50596c;\n  display: block;\n  font-size: .8rem;\n  height: 1.8rem;\n  line-height: 1rem;\n  max-width: 100%;\n  outline: none;\n  padding: .35rem .4rem;\n  position: relative;\n  transition: all .2s ease;\n  width: 100%;\n}\n\n.form-input:focus {\n  border-color: #5755d9; \n  box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);\n}\n\n.form-input::-webkit-input-placeholder {\n  color: #acb3c2;\n}\n\n.form-input:-ms-input-placeholder {\n  color: #acb3c2;\n}\n\n.form-input::placeholder {\n  color: #acb3c2;\n}\n\n.form-input.input-sm {\n  font-size: .7rem;\n  height: 1.4rem;\n  padding: .15rem .3rem;\n}\n\n.form-input.input-lg {\n  font-size: .9rem;\n  height: 2rem;\n  padding: .45rem .6rem;\n}\n\n.form-input.input-inline {\n  display: inline-block;\n  vertical-align: middle;\n  width: auto;\n}\n\n.form-input[type=\"file\"] {\n  height: auto;\n}\n\ntextarea.form-input {\n  height: auto;\n}\n\n.form-input-hint {\n  color: #acb3c2;\n  font-size: .7rem;\n  margin-top: .2rem;\n}\n\n.has-success .form-input-hint,\n.is-success + .form-input-hint {\n  color: #32b643;\n}\n\n.has-error .form-input-hint,\n.is-error + .form-input-hint {\n  color: #e85600;\n}\n\n.form-select {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  border: .05rem solid #caced7;\n  border-radius: .1rem;\n  color: inherit;\n  font-size: .8rem;\n  height: 1.8rem;\n  line-height: 1rem;\n  outline: none;\n  padding: .35rem .4rem;\n  vertical-align: middle;\n  width: 100%;\n}\n\n.form-select[size],\n.form-select[multiple] {\n  height: auto;\n}\n\n.form-select[size] option,\n.form-select[multiple] option {\n  padding: .1rem .2rem;\n}\n\n.form-select:not([multiple]):not([size]) {\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%204%205'%3E%3Cpath%20fill='%23667189'%20d='M2%200L0%202h4zm0%205L0%203h4z'/%3E%3C/svg%3E\") no-repeat right .35rem center/.4rem .5rem;\n  padding-right: 1.2rem;\n}\n\n.form-select:focus {\n  border-color: #5755d9; \n  box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);\n}\n\n.form-select::-ms-expand {\n  display: none;\n}\n\n.form-select.select-sm {\n  font-size: .7rem;\n  height: 1.4rem;\n  padding: .15rem 1.1rem .15rem .3rem;\n}\n\n.form-select.select-lg {\n  font-size: .9rem;\n  height: 2rem;\n  padding: .45rem 1.4rem .45rem .6rem;\n}\n\n.has-icon-left,\n.has-icon-right {\n  position: relative;\n}\n\n.has-icon-left .form-icon,\n.has-icon-right .form-icon {\n  height: .8rem;\n  margin: 0 .35rem;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: .8rem;\n}\n\n.has-icon-left .form-icon {\n  left: .05rem;\n}\n\n.has-icon-left .form-input {\n  padding-left: 1.5rem;\n}\n\n.has-icon-right .form-icon {\n  right: .05rem;\n}\n\n.has-icon-right .form-input {\n  padding-right: 1.5rem;\n}\n\n.form-checkbox,\n.form-radio,\n.form-switch {\n  display: inline-block;\n  line-height: 1rem;\n  padding: .2rem 1.2rem;\n  position: relative;\n}\n\n.form-checkbox input,\n.form-radio input,\n.form-switch input {\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  position: absolute;\n  width: 1px;\n}\n\n.form-checkbox input:focus + .form-icon,\n.form-radio input:focus + .form-icon,\n.form-switch input:focus + .form-icon {\n  border-color: #5755d9; \n  box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);\n}\n\n.form-checkbox input:checked + .form-icon,\n.form-radio input:checked + .form-icon,\n.form-switch input:checked + .form-icon {\n  background: #5755d9;\n  border-color: #5755d9;\n}\n\n.form-checkbox .form-icon,\n.form-radio .form-icon,\n.form-switch .form-icon {\n  border: .05rem solid #caced7;\n  cursor: pointer;\n  display: inline-block;\n  position: absolute; \n  transition: all .2s ease;\n}\n\n.form-checkbox .form-icon,\n.form-radio .form-icon {\n  background: #fff;\n  height: .8rem;\n  left: 0;\n  top: .3rem;\n  width: .8rem;\n}\n\n.form-checkbox input:active + .form-icon,\n.form-radio input:active + .form-icon {\n  background: #f0f1f4;\n}\n\n.form-checkbox .form-icon {\n  border-radius: .1rem;\n}\n\n.form-checkbox input:checked + .form-icon::before {\n  background-clip: padding-box;\n  border: .1rem solid #fff;\n  border-left-width: 0;\n  border-top-width: 0;\n  content: \"\";\n  height: 12px;\n  left: 50%;\n  margin-left: -4px;\n  margin-top: -8px;\n  position: absolute;\n  top: 50%;\n  transform: rotate(45deg);\n  width: 8px;\n}\n\n.form-checkbox input:indeterminate + .form-icon {\n  background: #5755d9;\n  border-color: #5755d9;\n}\n\n.form-checkbox input:indeterminate + .form-icon::before {\n  background: #fff;\n  content: \"\";\n  height: 2px;\n  left: 50%;\n  margin-left: -5px;\n  margin-top: -1px;\n  position: absolute;\n  top: 50%;\n  width: 10px;\n}\n\n.form-radio .form-icon {\n  border-radius: 50%;\n}\n\n.form-radio input:checked + .form-icon::before {\n  background: #fff;\n  border-radius: 50%;\n  content: \"\";\n  height: 4px;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 4px;\n}\n\n.form-switch {\n  padding-left: 2rem;\n}\n\n.form-switch .form-icon {\n  background: #e7e9ed;\n  background-clip: padding-box;\n  border-radius: .45rem;\n  height: .9rem;\n  left: 0;\n  top: .25rem;\n  width: 1.6rem;\n}\n\n.form-switch .form-icon::before {\n  background: #fff;\n  border-radius: 50%;\n  content: \"\";\n  display: block;\n  height: .8rem;\n  left: 0;\n  position: absolute;\n  top: 0;\n  transition: all .2s ease;\n  width: .8rem;\n}\n\n.form-switch input:checked + .form-icon::before {\n  left: 14px;\n}\n\n.form-switch input:active + .form-icon::before {\n  background: #f8f9fa;\n}\n\n.input-group {\n  display: flex; \n  display: -ms-flexbox;\n}\n\n.input-group .input-group-addon {\n  background: #f8f9fa;\n  border: .05rem solid #caced7;\n  border-radius: .1rem;\n  line-height: 1rem;\n  padding: .35rem .4rem;\n}\n\n.input-group .input-group-addon.addon-sm {\n  font-size: .7rem;\n  padding: .15rem .3rem;\n}\n\n.input-group .input-group-addon.addon-lg {\n  font-size: .9rem;\n  padding: .45rem .6rem;\n}\n\n.input-group .form-input,\n.input-group .form-select {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n}\n\n.input-group .input-group-btn {\n  z-index: 1;\n}\n\n.input-group .form-input:first-child:not(:last-child),\n.input-group .form-select:first-child:not(:last-child),\n.input-group .input-group-addon:first-child:not(:last-child),\n.input-group .input-group-btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.input-group .form-input:not(:first-child):not(:last-child),\n.input-group .form-select:not(:first-child):not(:last-child),\n.input-group .input-group-addon:not(:first-child):not(:last-child),\n.input-group .input-group-btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n  margin-left: -.05rem;\n}\n\n.input-group .form-input:last-child:not(:first-child),\n.input-group .form-select:last-child:not(:first-child),\n.input-group .input-group-addon:last-child:not(:first-child),\n.input-group .input-group-btn:last-child:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  margin-left: -.05rem;\n}\n\n.input-group .form-input:focus,\n.input-group .form-select:focus,\n.input-group .input-group-addon:focus,\n.input-group .input-group-btn:focus {\n  z-index: 2;\n}\n\n.input-group .form-select {\n  width: auto;\n}\n\n.input-group.input-inline {\n  display: inline-flex; \n  display: -ms-inline-flexbox;\n}\n\n.has-success .form-input,\n.form-input.is-success,\n.has-success .form-select,\n.form-select.is-success {\n  border-color: #32b643;\n}\n\n.has-success .form-input:focus,\n.form-input.is-success:focus,\n.has-success .form-select:focus,\n.form-select.is-success:focus {\n  box-shadow: 0 0 0 .1rem rgba(50, 182, 67, .2);\n}\n\n.has-error .form-input,\n.form-input.is-error,\n.has-error .form-select,\n.form-select.is-error {\n  border-color: #e85600;\n}\n\n.has-error .form-input:focus,\n.form-input.is-error:focus,\n.has-error .form-select:focus,\n.form-select.is-error:focus {\n  box-shadow: 0 0 0 .1rem rgba(232, 86, 0, .2);\n}\n\n.has-error .form-checkbox .form-icon,\n.form-checkbox.is-error .form-icon,\n.has-error .form-radio .form-icon,\n.form-radio.is-error .form-icon,\n.has-error .form-switch .form-icon,\n.form-switch.is-error .form-icon {\n  border-color: #e85600;\n}\n\n.has-error .form-checkbox input:checked + .form-icon,\n.form-checkbox.is-error input:checked + .form-icon,\n.has-error .form-radio input:checked + .form-icon,\n.form-radio.is-error input:checked + .form-icon,\n.has-error .form-switch input:checked + .form-icon,\n.form-switch.is-error input:checked + .form-icon {\n  background: #e85600;\n  border-color: #e85600;\n}\n\n.has-error .form-checkbox input:focus + .form-icon,\n.form-checkbox.is-error input:focus + .form-icon,\n.has-error .form-radio input:focus + .form-icon,\n.form-radio.is-error input:focus + .form-icon,\n.has-error .form-switch input:focus + .form-icon,\n.form-switch.is-error input:focus + .form-icon {\n  border-color: #e85600; \n  box-shadow: 0 0 0 .1rem rgba(232, 86, 0, .2);\n}\n\n.form-input:not(:placeholder-shown):invalid {\n  border-color: #e85600;\n}\n\n.form-input:not(:placeholder-shown):invalid:focus {\n  box-shadow: 0 0 0 .1rem rgba(232, 86, 0, .2);\n}\n\n.form-input:not(:placeholder-shown):invalid + .form-input-hint {\n  color: #e85600;\n}\n\n.form-input:disabled,\n.form-input.disabled,\n.form-select:disabled,\n.form-select.disabled {\n  background-color: #f0f1f4;\n  cursor: not-allowed;\n  opacity: .5;\n}\n\n.form-input[readonly] {\n  background-color: #f8f9fa;\n}\n\ninput:disabled + .form-icon,\ninput.disabled + .form-icon {\n  background: #f0f1f4;\n  cursor: not-allowed;\n  opacity: .5;\n}\n\n.form-switch input:disabled + .form-icon::before,\n.form-switch input.disabled + .form-icon::before {\n  background: #fff;\n}\n\n.form-horizontal {\n  padding: .4rem;\n}\n\n.form-horizontal .form-group {\n  display: flex; \n  display: -ms-flexbox;\n}\n\n.form-horizontal .form-checkbox,\n.form-horizontal .form-radio,\n.form-horizontal .form-switch {\n  margin: .2rem 0;\n}\n\n.label {\n  background: #f0f1f4;\n  border-radius: .1rem;\n  color: #5b657a;\n  display: inline-block; \n  line-height: 1.2;\n  padding: .1rem .15rem;\n}\n\n.label.label-rounded {\n  border-radius: 5rem;\n  padding-left: .4rem;\n  padding-right: .4rem;\n}\n\n.label.label-primary {\n  background: #5755d9;\n  color: #fff;\n}\n\n.label.label-secondary {\n  background: #f1f1fc;\n  color: #5755d9;\n}\n\n.label.label-success {\n  background: #32b643;\n  color: #fff;\n}\n\n.label.label-warning {\n  background: #ffb700;\n  color: #fff;\n}\n\n.label.label-error {\n  background: #e85600;\n  color: #fff;\n}\n\ncode {\n  background: #fdf4f4;\n  border-radius: .1rem;\n  color: #e06870;\n  font-size: 85%; \n  line-height: 1.2;\n  padding: .1rem .15rem;\n}\n\n.code {\n  border-radius: .1rem;\n  color: #50596c;\n  position: relative;\n}\n\n.code::before {\n  color: #acb3c2;\n  content: attr(data-lang);\n  font-size: .7rem;\n  position: absolute;\n  right: .4rem;\n  top: .1rem;\n}\n\n.code code {\n  background: #f8f9fa;\n  color: inherit;\n  display: block;\n  line-height: 1.5;\n  overflow-x: auto;\n  padding: 1rem;\n  width: 100%;\n}\n\n.img-responsive {\n  display: block;\n  height: auto;\n  max-width: 100%;\n}\n\n.img-fit-cover {\n  object-fit: cover;\n}\n\n.img-fit-contain {\n  object-fit: contain;\n}\n\n.video-responsive {\n  display: block;\n  overflow: hidden;\n  padding: 0;\n  position: relative;\n  width: 100%;\n}\n\n.video-responsive::before {\n  content: \"\";\n  display: block;\n  padding-bottom: 56.25%;\n}\n\n.video-responsive iframe,\n.video-responsive object,\n.video-responsive embed {\n  border: 0;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 100%;\n}\n\nvideo.video-responsive {\n  height: auto;\n  max-width: 100%;\n}\n\nvideo.video-responsive::before {\n  content: none;\n}\n\n.video-responsive-4-3::before {\n  padding-bottom: 75%;\n}\n\n.video-responsive-1-1::before {\n  padding-bottom: 100%;\n}\n\n.figure {\n  margin: 0 0 .4rem 0;\n}\n\n.figure .figure-caption {\n  color: #667189;\n  margin-top: .4rem;\n}\n\n.container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: .4rem;\n  padding-right: .4rem;\n  width: 100%;\n}\n\n.container.grid-xl {\n  max-width: 1296px;\n}\n\n.container.grid-lg {\n  max-width: 976px;\n}\n\n.container.grid-md {\n  max-width: 856px;\n}\n\n.container.grid-sm {\n  max-width: 616px;\n}\n\n.container.grid-xs {\n  max-width: 496px;\n}\n\n.show-xs,\n.show-sm,\n.show-md,\n.show-lg,\n.show-xl {\n  display: none !important;\n}\n\n.columns {\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-left: -.4rem;\n  margin-right: -.4rem;\n}\n\n.columns.col-gapless {\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.columns.col-gapless > .column {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.columns.col-oneline {\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n  overflow-x: auto;\n}\n\n.column {\n  -ms-flex: 1;\n  flex: 1;\n  max-width: 100%;\n  padding-left: .4rem;\n  padding-right: .4rem;\n}\n\n.column.col-12,\n.column.col-11,\n.column.col-10,\n.column.col-9,\n.column.col-8,\n.column.col-7,\n.column.col-6,\n.column.col-5,\n.column.col-4,\n.column.col-3,\n.column.col-2,\n.column.col-1 {\n  -ms-flex: none;\n  flex: none;\n}\n\n.col-12 {\n  width: 100%;\n}\n\n.col-11 {\n  width: 91.66666667%;\n}\n\n.col-10 {\n  width: 83.33333333%;\n}\n\n.col-9 {\n  width: 75%;\n}\n\n.col-8 {\n  width: 66.66666667%;\n}\n\n.col-7 {\n  width: 58.33333333%;\n}\n\n.col-6 {\n  width: 50%;\n}\n\n.col-5 {\n  width: 41.66666667%;\n}\n\n.col-4 {\n  width: 33.33333333%;\n}\n\n.col-3 {\n  width: 25%;\n}\n\n.col-2 {\n  width: 16.66666667%;\n}\n\n.col-1 {\n  width: 8.33333333%;\n}\n\n.col-auto {\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  max-width: none;\n  width: auto;\n}\n\n.col-mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.col-ml-auto {\n  margin-left: auto;\n}\n\n.col-mr-auto {\n  margin-right: auto;\n}\n\n@media (max-width: 1280px) {\n  .col-xl-12,\n  .col-xl-11,\n  .col-xl-10,\n  .col-xl-9,\n  .col-xl-8,\n  .col-xl-7,\n  .col-xl-6,\n  .col-xl-5,\n  .col-xl-4,\n  .col-xl-3,\n  .col-xl-2,\n  .col-xl-1 {\n    -ms-flex: none;\n    flex: none;\n  }\n  .col-xl-12 {\n    width: 100%;\n  }\n  .col-xl-11 {\n    width: 91.66666667%;\n  }\n  .col-xl-10 {\n    width: 83.33333333%;\n  }\n  .col-xl-9 {\n    width: 75%;\n  }\n  .col-xl-8 {\n    width: 66.66666667%;\n  }\n  .col-xl-7 {\n    width: 58.33333333%;\n  }\n  .col-xl-6 {\n    width: 50%;\n  }\n  .col-xl-5 {\n    width: 41.66666667%;\n  }\n  .col-xl-4 {\n    width: 33.33333333%;\n  }\n  .col-xl-3 {\n    width: 25%;\n  }\n  .col-xl-2 {\n    width: 16.66666667%;\n  }\n  .col-xl-1 {\n    width: 8.33333333%;\n  }\n  .hide-xl {\n    display: none !important;\n  }\n  .show-xl {\n    display: block !important;\n  }\n}\n\n@media (max-width: 960px) {\n  .col-lg-12,\n  .col-lg-11,\n  .col-lg-10,\n  .col-lg-9,\n  .col-lg-8,\n  .col-lg-7,\n  .col-lg-6,\n  .col-lg-5,\n  .col-lg-4,\n  .col-lg-3,\n  .col-lg-2,\n  .col-lg-1 {\n    -ms-flex: none;\n    flex: none;\n  }\n  .col-lg-12 {\n    width: 100%;\n  }\n  .col-lg-11 {\n    width: 91.66666667%;\n  }\n  .col-lg-10 {\n    width: 83.33333333%;\n  }\n  .col-lg-9 {\n    width: 75%;\n  }\n  .col-lg-8 {\n    width: 66.66666667%;\n  }\n  .col-lg-7 {\n    width: 58.33333333%;\n  }\n  .col-lg-6 {\n    width: 50%;\n  }\n  .col-lg-5 {\n    width: 41.66666667%;\n  }\n  .col-lg-4 {\n    width: 33.33333333%;\n  }\n  .col-lg-3 {\n    width: 25%;\n  }\n  .col-lg-2 {\n    width: 16.66666667%;\n  }\n  .col-lg-1 {\n    width: 8.33333333%;\n  }\n  .hide-lg {\n    display: none !important;\n  }\n  .show-lg {\n    display: block !important;\n  }\n}\n\n@media (max-width: 840px) {\n  .col-md-12,\n  .col-md-11,\n  .col-md-10,\n  .col-md-9,\n  .col-md-8,\n  .col-md-7,\n  .col-md-6,\n  .col-md-5,\n  .col-md-4,\n  .col-md-3,\n  .col-md-2,\n  .col-md-1 {\n    -ms-flex: none;\n    flex: none;\n  }\n  .col-md-12 {\n    width: 100%;\n  }\n  .col-md-11 {\n    width: 91.66666667%;\n  }\n  .col-md-10 {\n    width: 83.33333333%;\n  }\n  .col-md-9 {\n    width: 75%;\n  }\n  .col-md-8 {\n    width: 66.66666667%;\n  }\n  .col-md-7 {\n    width: 58.33333333%;\n  }\n  .col-md-6 {\n    width: 50%;\n  }\n  .col-md-5 {\n    width: 41.66666667%;\n  }\n  .col-md-4 {\n    width: 33.33333333%;\n  }\n  .col-md-3 {\n    width: 25%;\n  }\n  .col-md-2 {\n    width: 16.66666667%;\n  }\n  .col-md-1 {\n    width: 8.33333333%;\n  }\n  .hide-md {\n    display: none !important;\n  }\n  .show-md {\n    display: block !important;\n  }\n}\n\n@media (max-width: 600px) {\n  .col-sm-12,\n  .col-sm-11,\n  .col-sm-10,\n  .col-sm-9,\n  .col-sm-8,\n  .col-sm-7,\n  .col-sm-6,\n  .col-sm-5,\n  .col-sm-4,\n  .col-sm-3,\n  .col-sm-2,\n  .col-sm-1 {\n    -ms-flex: none;\n    flex: none;\n  }\n  .col-sm-12 {\n    width: 100%;\n  }\n  .col-sm-11 {\n    width: 91.66666667%;\n  }\n  .col-sm-10 {\n    width: 83.33333333%;\n  }\n  .col-sm-9 {\n    width: 75%;\n  }\n  .col-sm-8 {\n    width: 66.66666667%;\n  }\n  .col-sm-7 {\n    width: 58.33333333%;\n  }\n  .col-sm-6 {\n    width: 50%;\n  }\n  .col-sm-5 {\n    width: 41.66666667%;\n  }\n  .col-sm-4 {\n    width: 33.33333333%;\n  }\n  .col-sm-3 {\n    width: 25%;\n  }\n  .col-sm-2 {\n    width: 16.66666667%;\n  }\n  .col-sm-1 {\n    width: 8.33333333%;\n  }\n  .hide-sm {\n    display: none !important;\n  }\n  .show-sm {\n    display: block !important;\n  }\n}\n\n@media (max-width: 480px) {\n  .col-xs-12,\n  .col-xs-11,\n  .col-xs-10,\n  .col-xs-9,\n  .col-xs-8,\n  .col-xs-7,\n  .col-xs-6,\n  .col-xs-5,\n  .col-xs-4,\n  .col-xs-3,\n  .col-xs-2,\n  .col-xs-1 {\n    -ms-flex: none;\n    flex: none;\n  }\n  .col-xs-12 {\n    width: 100%;\n  }\n  .col-xs-11 {\n    width: 91.66666667%;\n  }\n  .col-xs-10 {\n    width: 83.33333333%;\n  }\n  .col-xs-9 {\n    width: 75%;\n  }\n  .col-xs-8 {\n    width: 66.66666667%;\n  }\n  .col-xs-7 {\n    width: 58.33333333%;\n  }\n  .col-xs-6 {\n    width: 50%;\n  }\n  .col-xs-5 {\n    width: 41.66666667%;\n  }\n  .col-xs-4 {\n    width: 33.33333333%;\n  }\n  .col-xs-3 {\n    width: 25%;\n  }\n  .col-xs-2 {\n    width: 16.66666667%;\n  }\n  .col-xs-1 {\n    width: 8.33333333%;\n  }\n  .hide-xs {\n    display: none !important;\n  }\n  .show-xs {\n    display: block !important;\n  }\n}\n\n.navbar {\n  align-items: stretch;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-align: stretch;\n  -ms-flex-pack: justify;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n\n.navbar .navbar-section {\n  align-items: center;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex: 1 0 0;\n  flex: 1 0 0; \n  -ms-flex-align: center;\n}\n\n.navbar .navbar-section:last-child {\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\n.navbar .navbar-center {\n  align-items: center;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto; \n  -ms-flex-align: center;\n}\n\n.navbar .navbar-brand {\n  font-size: .9rem;\n  font-weight: 500;\n  text-decoration: none;\n}\n\n.accordion input:checked ~ .accordion-header .icon,\n.accordion[open] .accordion-header .icon {\n  transform: rotate(90deg);\n}\n\n.accordion input:checked ~ .accordion-body,\n.accordion[open] .accordion-body {\n  max-height: 50rem;\n}\n\n.accordion .accordion-header {\n  display: block;\n  padding: .2rem .4rem;\n}\n\n.accordion .accordion-header .icon {\n  transition: all .2s ease;\n}\n\n.accordion .accordion-body {\n  margin-bottom: .4rem;\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height .2s ease;\n}\n\nsummary.accordion-header::-webkit-details-marker {\n  display: none;\n}\n\n.form-autocomplete {\n  position: relative;\n}\n\n.form-autocomplete .form-autocomplete-input {\n  align-content: flex-start;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-line-pack: start;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  height: auto;\n  min-height: 1.6rem;\n  padding: .1rem;\n}\n\n.form-autocomplete .form-autocomplete-input.is-focused {\n  border-color: #5755d9; \n  box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);\n}\n\n.form-autocomplete .form-autocomplete-input .form-input {\n  border-color: transparent;\n  box-shadow: none;\n  display: inline-block;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  height: 1.2rem;\n  line-height: .8rem;\n  margin: .1rem;\n  width: auto;\n}\n\n.form-autocomplete .menu {\n  left: 0;\n  position: absolute;\n  top: 100%;\n  width: 100%;\n}\n\n.avatar {\n  background: #5755d9;\n  border-radius: 50%;\n  color: rgba(255, 255, 255, .85);\n  display: inline-block;\n  font-size: .8rem;\n  font-weight: 300;\n  height: 1.6rem;\n  line-height: 1.25;\n  margin: 0;\n  position: relative;\n  vertical-align: middle; \n  width: 1.6rem;\n}\n\n.avatar.avatar-xs {\n  font-size: .4rem;\n  height: .8rem;\n  width: .8rem;\n}\n\n.avatar.avatar-sm {\n  font-size: .6rem;\n  height: 1.2rem;\n  width: 1.2rem;\n}\n\n.avatar.avatar-lg {\n  font-size: 1.2rem;\n  height: 2.4rem;\n  width: 2.4rem;\n}\n\n.avatar.avatar-xl {\n  font-size: 1.6rem;\n  height: 3.2rem;\n  width: 3.2rem;\n}\n\n.avatar img {\n  border-radius: 50%;\n  height: 100%;\n  position: relative;\n  width: 100%;\n  z-index: 1;\n}\n\n.avatar .avatar-icon,\n.avatar .avatar-presence {\n  background: #fff;\n  bottom: 14.64%;\n  height: 50%;\n  padding: .1rem;\n  position: absolute;\n  right: 14.64%;\n  transform: translate(50%, 50%);\n  width: 50%;\n  z-index: 2;\n}\n\n.avatar .avatar-presence {\n  background: #acb3c2;\n  border-radius: 50%;\n  box-shadow: 0 0 0 .1rem #fff;\n  height: .5em;\n  width: .5em;\n}\n\n.avatar .avatar-presence.online {\n  background: #32b643;\n}\n\n.avatar .avatar-presence.busy {\n  background: #e85600;\n}\n\n.avatar .avatar-presence.away {\n  background: #ffb700;\n}\n\n.avatar[data-initial]::before {\n  color: currentColor;\n  content: attr(data-initial);\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 1;\n}\n\n.badge {\n  position: relative;\n  white-space: nowrap;\n}\n\n.badge[data-badge]::after,\n.badge:not([data-badge])::after {\n  background: #5755d9;\n  background-clip: padding-box;\n  border-radius: .5rem;\n  box-shadow: 0 0 0 .1rem #fff;\n  color: #fff;\n  content: attr(data-badge);\n  display: inline-block;\n  transform: translate(-.1rem, -.5rem);\n}\n\n.badge[data-badge]::after {\n  font-size: .7rem;\n  height: .9rem;\n  line-height: 1;\n  min-width: .9rem;\n  padding: .1rem .2rem;\n  text-align: center;\n  white-space: nowrap;\n}\n\n.badge:not([data-badge])::after,\n.badge[data-badge=\"\"]::after {\n  height: 6px;\n  min-width: 6px;\n  padding: 0;\n  width: 6px;\n}\n\n.badge.btn::after {\n  position: absolute;\n  right: 0;\n  top: 0;\n  transform: translate(50%, -50%);\n}\n\n.badge.avatar::after {\n  position: absolute;\n  right: 14.64%;\n  top: 14.64%;\n  transform: translate(50%, -50%);\n  z-index: 100;\n}\n\n.badge.avatar-xs::after {\n  content: \"\";\n  height: .4rem;\n  min-width: .4rem;\n  padding: 0;\n  width: .4rem;\n}\n\n.breadcrumb {\n  list-style: none;\n  margin: .2rem 0;\n  padding: .2rem 0;\n}\n\n.breadcrumb .breadcrumb-item {\n  color: #667189;\n  display: inline-block;\n  margin: 0;\n  padding: .2rem 0;\n}\n\n.breadcrumb .breadcrumb-item:not(:last-child) {\n  margin-right: .2rem;\n}\n\n.breadcrumb .breadcrumb-item:not(:last-child) a {\n  color: #667189;\n}\n\n.breadcrumb .breadcrumb-item:not(:first-child)::before {\n  color: #e7e9ed;\n  content: \"/\";\n  padding-right: .4rem;\n}\n\n.bar {\n  background: #f0f1f4;\n  border-radius: .1rem;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n  height: .8rem;\n  width: 100%;\n}\n\n.bar.bar-sm {\n  height: .2rem;\n}\n\n.bar .bar-item {\n  background: #5755d9;\n  color: #fff;\n  display: block;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  font-size: .7rem;\n  height: 100%;\n  line-height: .8rem;\n  position: relative;\n  text-align: center;\n  width: 0;\n}\n\n.bar .bar-item:first-child {\n  border-bottom-left-radius: .1rem;\n  border-top-left-radius: .1rem;\n}\n\n.bar .bar-item:last-child {\n  border-bottom-right-radius: .1rem;\n  border-top-right-radius: .1rem;\n  -ms-flex-negative: 1;\n  flex-shrink: 1;\n}\n\n.bar-slider {\n  height: .1rem;\n  margin: .4rem 0;\n  position: relative;\n}\n\n.bar-slider .bar-item {\n  left: 0;\n  padding: 0;\n  position: absolute;\n}\n\n.bar-slider .bar-item:not(:last-child):first-child {\n  background: #f0f1f4;\n  z-index: 1;\n}\n\n.bar-slider .bar-slider-btn {\n  background: #5755d9;\n  border: 0;\n  border-radius: 50%;\n  height: .6rem;\n  padding: 0;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  transform: translate(50%, -50%);\n  width: .6rem;\n}\n\n.bar-slider .bar-slider-btn:active {\n  box-shadow: 0 0 0 .1rem #5755d9;\n}\n\n.card {\n  background: #fff;\n  border: .05rem solid #e7e9ed;\n  border-radius: .1rem;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.card .card-header,\n.card .card-body,\n.card .card-footer {\n  padding: .8rem;\n  padding-bottom: 0;\n}\n\n.card .card-header:last-child,\n.card .card-body:last-child,\n.card .card-footer:last-child {\n  padding-bottom: .8rem;\n}\n\n.card .card-image {\n  padding-top: .8rem;\n}\n\n.card .card-image:first-child {\n  padding-top: 0;\n}\n\n.card .card-image:first-child img {\n  border-top-left-radius: .1rem;\n  border-top-right-radius: .1rem;\n}\n\n.card .card-image:last-child img {\n  border-bottom-left-radius: .1rem;\n  border-bottom-right-radius: .1rem;\n}\n\n.chip {\n  align-items: center;\n  background: #f0f1f4;\n  border-radius: 5rem;\n  color: #667189;\n  display: inline-flex;\n  display: -ms-inline-flexbox;\n  -ms-flex-align: center;\n  font-size: 90%;\n  height: 1.2rem;\n  line-height: .8rem;\n  margin: .1rem;\n  max-width: 100%;\n  padding: .2rem .4rem;\n  text-decoration: none;\n  vertical-align: middle;\n}\n\n.chip.active {\n  background: #5755d9;\n  color: #fff;\n}\n\n.chip .avatar {\n  margin-left: -.4rem;\n  margin-right: .2rem;\n}\n\n.dropdown {\n  display: inline-block;\n  position: relative;\n}\n\n.dropdown .menu {\n  animation: slide-down .15s ease 1;\n  display: none;\n  left: 0;\n  max-height: 50vh;\n  overflow-y: auto;\n  position: absolute;\n  top: 100%;\n}\n\n.dropdown.dropdown-right .menu {\n  left: auto;\n  right: 0;\n}\n\n.dropdown.active .menu,\n.dropdown .dropdown-toggle:focus + .menu,\n.dropdown .menu:hover {\n  display: block;\n}\n\n.dropdown .btn-group .dropdown-toggle:nth-last-child(2) {\n  border-bottom-right-radius: .1rem;\n  border-top-right-radius: .1rem;\n}\n\n.empty {\n  background: #f8f9fa;\n  border-radius: .1rem;\n  color: #667189;\n  padding: 3.2rem 1.6rem; \n  text-align: center;\n}\n\n.empty .empty-icon {\n  margin-bottom: .8rem;\n}\n\n.empty .empty-title,\n.empty .empty-subtitle {\n  margin: .4rem auto;\n}\n\n.empty .empty-action {\n  margin-top: .8rem;\n}\n\n.menu {\n  background: #fff;\n  border-radius: .1rem;\n  box-shadow: 0 .05rem .2rem rgba(69, 77, 93, .3);\n  list-style: none;\n  margin: 0;\n  min-width: 180px;\n  padding: .4rem;\n  transform: translateY(.2rem);\n  z-index: 100;\n}\n\n.menu.menu-nav {\n  background: transparent;\n  box-shadow: none;\n}\n\n.menu .menu-item {\n  margin-top: 0;\n  padding: 0 .4rem;\n  text-decoration: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.menu .menu-item > a {\n  border-radius: .1rem;\n  color: inherit;\n  display: block;\n  margin: 0 -.4rem;\n  padding: .2rem .4rem;\n  text-decoration: none;\n}\n\n.menu .menu-item > a:focus,\n.menu .menu-item > a:hover {\n  background: #f1f1fc;\n  color: #5755d9;\n}\n\n.menu .menu-item > a:active,\n.menu .menu-item > a.active {\n  background: #f1f1fc;\n  color: #5755d9;\n}\n\n.menu .menu-item + .menu-item {\n  margin-top: .2rem;\n}\n\n.menu .menu-badge {\n  float: right;\n  padding: .2rem 0;\n}\n\n.menu .menu-badge .btn {\n  margin-top: -.1rem;\n}\n\n.modal {\n  align-items: center;\n  bottom: 0;\n  display: none;\n  -ms-flex-align: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  left: 0;\n  opacity: 0;\n  overflow: hidden;\n  padding: .4rem;\n  position: fixed;\n  right: 0;\n  top: 0;\n}\n\n.modal:target,\n.modal.active {\n  display: flex;\n  display: -ms-flexbox;\n  opacity: 1;\n  z-index: 400;\n}\n\n.modal:target .modal-overlay,\n.modal.active .modal-overlay {\n  background: rgba(248, 249, 250, .75);\n  bottom: 0;\n  cursor: default;\n  display: block;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.modal:target .modal-container,\n.modal.active .modal-container {\n  animation: slide-down .2s ease 1;\n  max-width: 640px;\n  width: 100%;\n  z-index: 1;\n}\n\n.modal.modal-sm .modal-container {\n  max-width: 320px;\n  padding: 0 .4rem;\n}\n\n.modal.modal-lg .modal-overlay {\n  background: #fff;\n}\n\n.modal.modal-lg .modal-container {\n  box-shadow: none;\n  max-width: 960px;\n}\n\n.modal-container {\n  background: #fff;\n  border-radius: .1rem;\n  box-shadow: 0 .2rem .5rem rgba(69, 77, 93, .3);\n  display: block;\n  padding: 0 .8rem;\n  text-align: left;\n}\n\n.modal-container .modal-header {\n  padding: .8rem;\n}\n\n.modal-container .modal-body {\n  max-height: 50vh;\n  overflow-y: auto;\n  padding: .8rem;\n  position: relative;\n}\n\n.modal-container .modal-footer {\n  padding: .8rem;\n  text-align: right;\n}\n\n.nav {\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  list-style: none;\n  margin: .2rem 0;\n}\n\n.nav .nav-item a {\n  color: #667189;\n  padding: .2rem .4rem;\n  text-decoration: none;\n}\n\n.nav .nav-item a:focus,\n.nav .nav-item a:hover {\n  color: #5755d9;\n}\n\n.nav .nav-item.active > a {\n  color: #50596c;\n  font-weight: bold;\n}\n\n.nav .nav-item.active > a:focus,\n.nav .nav-item.active > a:hover {\n  color: #5755d9;\n}\n\n.nav .nav {\n  margin-bottom: .4rem;\n  margin-left: .8rem;\n}\n\n.pagination {\n  display: flex;\n  display: -ms-flexbox;\n  list-style: none;\n  margin: .2rem 0;\n  padding: .2rem 0;\n}\n\n.pagination .page-item {\n  margin: .2rem .05rem;\n}\n\n.pagination .page-item span {\n  display: inline-block;\n  padding: .2rem .2rem;\n}\n\n.pagination .page-item a {\n  border-radius: .1rem;\n  color: #667189;\n  display: inline-block;\n  padding: .2rem .4rem;\n  text-decoration: none;\n}\n\n.pagination .page-item a:focus,\n.pagination .page-item a:hover {\n  color: #5755d9;\n}\n\n.pagination .page-item.disabled a {\n  cursor: default;\n  opacity: .5;\n  pointer-events: none;\n}\n\n.pagination .page-item.active a {\n  background: #5755d9;\n  color: #fff;\n}\n\n.pagination .page-item.page-prev,\n.pagination .page-item.page-next {\n  -ms-flex: 1 0 50%;\n  flex: 1 0 50%;\n}\n\n.pagination .page-item.page-next {\n  text-align: right;\n}\n\n.pagination .page-item .page-item-title {\n  margin: 0;\n}\n\n.pagination .page-item .page-item-subtitle {\n  margin: 0;\n  opacity: .5;\n}\n\n.panel {\n  border: .05rem solid #e7e9ed;\n  border-radius: .1rem;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.panel .panel-header,\n.panel .panel-footer {\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  padding: .8rem;\n}\n\n.panel .panel-nav {\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n}\n\n.panel .panel-body {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  overflow-y: auto;\n  padding: 0 .8rem;\n}\n\n.popover {\n  display: inline-block;\n  position: relative;\n}\n\n.popover .popover-container {\n  left: 50%;\n  opacity: 0;\n  padding: .4rem;\n  position: absolute;\n  top: 0;\n  transform: translate(-50%, -50%) scale(0);\n  transition: transform .2s ease;\n  width: 320px;\n  z-index: 400;\n}\n\n.popover *:focus + .popover-container,\n.popover:hover .popover-container,\n.popover .popover-container:hover {\n  display: block;\n  opacity: 1;\n  transform: translate(-50%, -100%) scale(1);\n}\n\n.popover.popover-right .popover-container {\n  left: 100%;\n  top: 50%;\n}\n\n.popover.popover-right :focus + .popover-container,\n.popover.popover-right:hover .popover-container,\n.popover.popover-right .popover-container:hover {\n  transform: translate(0, -50%) scale(1);\n}\n\n.popover.popover-bottom .popover-container {\n  left: 50%;\n  top: 100%;\n}\n\n.popover.popover-bottom :focus + .popover-container,\n.popover.popover-bottom:hover .popover-container,\n.popover.popover-bottom .popover-container:hover {\n  transform: translate(-50%, 0) scale(1);\n}\n\n.popover.popover-left .popover-container {\n  left: 0;\n  top: 50%;\n}\n\n.popover.popover-left :focus + .popover-container,\n.popover.popover-left:hover .popover-container,\n.popover.popover-left .popover-container:hover {\n  transform: translate(-100%, -50%) scale(1);\n}\n\n.popover .card {\n  border: 0; \n  box-shadow: 0 .2rem .5rem rgba(69, 77, 93, .3);\n}\n\n.step {\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n  list-style: none;\n  margin: .2rem 0;\n  width: 100%;\n}\n\n.step .step-item {\n  -ms-flex: 1 1 0;\n  flex: 1 1 0;\n  margin-top: 0;\n  min-height: 1rem;\n  position: relative; \n  text-align: center;\n}\n\n.step .step-item:not(:first-child)::before {\n  background: #5755d9;\n  content: \"\";\n  height: 2px;\n  left: -50%;\n  position: absolute;\n  top: 9px;\n  width: 100%;\n}\n\n.step .step-item a {\n  color: #acb3c2;\n  display: inline-block;\n  padding: 20px 10px 0;\n  text-decoration: none;\n}\n\n.step .step-item a::before {\n  background: #5755d9;\n  border: .1rem solid #fff;\n  border-radius: 50%;\n  content: \"\";\n  display: block;\n  height: .6rem;\n  left: 50%;\n  position: absolute;\n  top: .2rem;\n  transform: translateX(-50%);\n  width: .6rem;\n  z-index: 1;\n}\n\n.step .step-item.active a::before {\n  background: #fff;\n  border: .1rem solid #5755d9;\n}\n\n.step .step-item.active ~ .step-item::before {\n  background: #e7e9ed;\n}\n\n.step .step-item.active ~ .step-item a::before {\n  background: #e7e9ed;\n}\n\n.tab {\n  align-items: center;\n  border-bottom: .05rem solid #e7e9ed;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-align: center;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  list-style: none;\n  margin: .2rem 0 .15rem 0;\n}\n\n.tab .tab-item {\n  margin-top: 0;\n}\n\n.tab .tab-item a {\n  border-bottom: .1rem solid transparent;\n  color: inherit;\n  display: block;\n  margin: 0 .4rem 0 0;\n  padding: .4rem .2rem .3rem .2rem;\n  text-decoration: none;\n}\n\n.tab .tab-item a:focus,\n.tab .tab-item a:hover {\n  color: #5755d9;\n}\n\n.tab .tab-item.active a,\n.tab .tab-item a.active {\n  border-bottom-color: #5755d9;\n  color: #5755d9;\n}\n\n.tab .tab-item.tab-action {\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  text-align: right;\n}\n\n.tab .tab-item .btn-clear {\n  margin-top: -.2rem;\n}\n\n.tab.tab-block .tab-item {\n  -ms-flex: 1 0 0;\n  flex: 1 0 0;\n  text-align: center;\n}\n\n.tab.tab-block .tab-item a {\n  margin: 0;\n}\n\n.tab.tab-block .tab-item .badge[data-badge]::after {\n  position: absolute;\n  right: .1rem;\n  top: .1rem;\n  transform: translate(0, 0);\n}\n\n.tab:not(.tab-block) .badge {\n  padding-right: 0;\n}\n\n.tile {\n  align-content: space-between;\n  align-items: flex-start;\n  display: flex; \n  display: -ms-flexbox;\n  -ms-flex-align: start;\n  -ms-flex-line-pack: justify;\n}\n\n.tile .tile-icon,\n.tile .tile-action {\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n}\n\n.tile .tile-content {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n}\n\n.tile .tile-content:not(:first-child) {\n  padding-left: .4rem;\n}\n\n.tile .tile-content:not(:last-child) {\n  padding-right: .4rem;\n}\n\n.tile .tile-title,\n.tile .tile-subtitle {\n  line-height: 1rem;\n}\n\n.tile.tile-centered {\n  align-items: center; \n  -ms-flex-align: center;\n}\n\n.tile.tile-centered .tile-content {\n  overflow: hidden;\n}\n\n.tile.tile-centered .tile-title,\n.tile.tile-centered .tile-subtitle {\n  margin-bottom: 0; \n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.toast {\n  background: rgba(69, 77, 93, .9);\n  border: .05rem solid #454d5d;\n  border-color: #454d5d;\n  border-radius: .1rem;\n  color: #fff;\n  display: block;\n  padding: .4rem;\n  width: 100%;\n}\n\n.toast.toast-primary {\n  background: rgba(87, 85, 217, .9);\n  border-color: #5755d9;\n}\n\n.toast.toast-success {\n  background: rgba(50, 182, 67, .9);\n  border-color: #32b643;\n}\n\n.toast.toast-warning {\n  background: rgba(255, 183, 0, .9);\n  border-color: #ffb700;\n}\n\n.toast.toast-error {\n  background: rgba(232, 86, 0, .9);\n  border-color: #e85600;\n}\n\n.toast a {\n  color: #fff;\n  text-decoration: underline;\n}\n\n.toast a:focus,\n.toast a:hover,\n.toast a:active,\n.toast a.active {\n  opacity: .75;\n}\n\n.toast .btn-clear {\n  margin: 4px -2px 4px 4px;\n}\n\n.tooltip {\n  position: relative;\n}\n\n.tooltip::after {\n  background: rgba(69, 77, 93, .9);\n  border-radius: .1rem;\n  bottom: 100%;\n  color: #fff;\n  content: attr(data-tooltip);\n  display: block;\n  font-size: .7rem;\n  left: 50%;\n  max-width: 320px;\n  opacity: 0;\n  overflow: hidden;\n  padding: .2rem .4rem;\n  pointer-events: none;\n  position: absolute;\n  text-overflow: ellipsis;\n  transform: translate(-50%, .4rem);\n  transition: all .2s ease;\n  white-space: pre;\n  z-index: 300;\n}\n\n.tooltip:focus::after,\n.tooltip:hover::after {\n  opacity: 1;\n  transform: translate(-50%, -.2rem);\n}\n\n.tooltip[disabled],\n.tooltip.disabled {\n  pointer-events: auto;\n}\n\n.tooltip.tooltip-right::after {\n  bottom: 50%;\n  left: 100%;\n  transform: translate(-.2rem, 50%);\n}\n\n.tooltip.tooltip-right:focus::after,\n.tooltip.tooltip-right:hover::after {\n  transform: translate(.2rem, 50%);\n}\n\n.tooltip.tooltip-bottom::after {\n  bottom: auto;\n  top: 100%;\n  transform: translate(-50%, -.4rem);\n}\n\n.tooltip.tooltip-bottom:focus::after,\n.tooltip.tooltip-bottom:hover::after {\n  transform: translate(-50%, .2rem);\n}\n\n.tooltip.tooltip-left::after {\n  bottom: 50%;\n  left: auto;\n  right: 100%;\n  transform: translate(.4rem, 50%);\n}\n\n.tooltip.tooltip-left:focus::after,\n.tooltip.tooltip-left:hover::after {\n  transform: translate(-.2rem, 50%);\n}\n\n@keyframes loading {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes slide-down {\n  0% {\n    opacity: 0;\n    transform: translateY(-1.6rem);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.text-primary {\n  color: #5755d9;\n}\n\na.text-primary:focus,\na.text-primary:hover {\n  color: #4240d4;\n}\n\n.text-secondary {\n  color: #e5e5f9;\n}\n\na.text-secondary:focus,\na.text-secondary:hover {\n  color: #d1d0f4;\n}\n\n.text-gray {\n  color: #acb3c2;\n}\n\na.text-gray:focus,\na.text-gray:hover {\n  color: #9ea6b7;\n}\n\n.text-light {\n  color: #fff;\n}\n\na.text-light:focus,\na.text-light:hover {\n  color: #f2f2f2;\n}\n\n.text-success {\n  color: #32b643;\n}\n\na.text-success:focus,\na.text-success:hover {\n  color: #2da23c;\n}\n\n.text-warning {\n  color: #ffb700;\n}\n\na.text-warning:focus,\na.text-warning:hover {\n  color: #e6a500;\n}\n\n.text-error {\n  color: #e85600;\n}\n\na.text-error:focus,\na.text-error:hover {\n  color: #cf4d00;\n}\n\n.bg-primary {\n  background: #5755d9;\n  color: #fff;\n}\n\n.bg-secondary {\n  background: #f1f1fc;\n}\n\n.bg-dark {\n  background: #454d5d;\n  color: #fff;\n}\n\n.bg-gray {\n  background: #f8f9fa;\n}\n\n.bg-success {\n  background: #32b643;\n  color: #fff;\n}\n\n.bg-warning {\n  background: #ffb700;\n  color: #fff;\n}\n\n.bg-error {\n  background: #e85600;\n  color: #fff;\n}\n\n.c-hand {\n  cursor: pointer;\n}\n\n.c-move {\n  cursor: move;\n}\n\n.c-zoom-in {\n  cursor: zoom-in;\n}\n\n.c-zoom-out {\n  cursor: zoom-out;\n}\n\n.c-not-allowed {\n  cursor: not-allowed;\n}\n\n.c-auto {\n  cursor: auto;\n}\n\n.d-block {\n  display: block;\n}\n\n.d-inline {\n  display: inline;\n}\n\n.d-inline-block {\n  display: inline-block;\n}\n\n.d-flex {\n  display: flex; \n  display: -ms-flexbox;\n}\n\n.d-inline-flex {\n  display: inline-flex; \n  display: -ms-inline-flexbox;\n}\n\n.d-none,\n.d-hide {\n  display: none !important;\n}\n\n.d-visible {\n  visibility: visible;\n}\n\n.d-invisible {\n  visibility: hidden;\n}\n\n.text-hide {\n  background: transparent;\n  border: 0;\n  color: transparent;\n  font-size: 0;\n  line-height: 0;\n  text-shadow: none;\n}\n\n.text-assistive {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.divider,\n.divider-vert {\n  display: block;\n  position: relative;\n}\n\n.divider[data-content]::after,\n.divider-vert[data-content]::after {\n  background: #fff;\n  color: #acb3c2;\n  content: attr(data-content);\n  display: inline-block;\n  font-size: .7rem;\n  padding: 0 .4rem;\n  transform: translateY(-.65rem);\n}\n\n.divider {\n  border-top: .05rem solid #e7e9ed;\n  height: .05rem;\n  margin: .4rem 0;\n}\n\n.divider[data-content] {\n  margin: .8rem 0;\n}\n\n.divider-vert {\n  display: block;\n  padding: .8rem;\n}\n\n.divider-vert::before {\n  border-left: .05rem solid #e7e9ed;\n  bottom: .4rem;\n  content: \"\";\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: .4rem;\n  transform: translateX(-50%);\n}\n\n.divider-vert[data-content]::after {\n  left: 50%;\n  padding: .2rem 0;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.loading {\n  color: transparent !important;\n  min-height: .8rem;\n  pointer-events: none;\n  position: relative;\n}\n\n.loading::after {\n  animation: loading 500ms infinite linear;\n  border: .1rem solid #5755d9;\n  border-radius: 50%;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: .8rem;\n  left: 50%;\n  margin-left: -.4rem;\n  margin-top: -.4rem;\n  position: absolute;\n  top: 50%;\n  width: .8rem;\n  z-index: 1;\n}\n\n.loading.loading-lg {\n  min-height: 2rem;\n}\n\n.loading.loading-lg::after {\n  height: 1.6rem;\n  margin-left: -.8rem;\n  margin-top: -.8rem;\n  width: 1.6rem;\n}\n\n.clearfix::after,\n.container::after {\n  clear: both;\n  content: \"\";\n  display: table;\n}\n\n.float-left {\n  float: left !important;\n}\n\n.float-right {\n  float: right !important;\n}\n\n.relative {\n  position: relative;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.fixed {\n  position: fixed;\n}\n\n.centered {\n  display: block;\n  float: none;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.flex-centered {\n  align-items: center;\n  display: flex;\n  display: -ms-flexbox;\n  -ms-flex-align: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.m-0 {\n  margin: 0;\n}\n\n.mb-0 {\n  margin-bottom: 0;\n}\n\n.ml-0 {\n  margin-left: 0;\n}\n\n.mr-0 {\n  margin-right: 0;\n}\n\n.mt-0 {\n  margin-top: 0;\n}\n\n.mx-0 {\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.my-0 {\n  margin-bottom: 0;\n  margin-top: 0;\n}\n\n.m-1 {\n  margin: .2rem;\n}\n\n.mb-1 {\n  margin-bottom: .2rem;\n}\n\n.ml-1 {\n  margin-left: .2rem;\n}\n\n.mr-1 {\n  margin-right: .2rem;\n}\n\n.mt-1 {\n  margin-top: .2rem;\n}\n\n.mx-1 {\n  margin-left: .2rem;\n  margin-right: .2rem;\n}\n\n.my-1 {\n  margin-bottom: .2rem;\n  margin-top: .2rem;\n}\n\n.m-2 {\n  margin: .4rem;\n}\n\n.mb-2 {\n  margin-bottom: .4rem;\n}\n\n.ml-2 {\n  margin-left: .4rem;\n}\n\n.mr-2 {\n  margin-right: .4rem;\n}\n\n.mt-2 {\n  margin-top: .4rem;\n}\n\n.mx-2 {\n  margin-left: .4rem;\n  margin-right: .4rem;\n}\n\n.my-2 {\n  margin-bottom: .4rem;\n  margin-top: .4rem;\n}\n\n.p-0 {\n  padding: 0;\n}\n\n.pb-0 {\n  padding-bottom: 0;\n}\n\n.pl-0 {\n  padding-left: 0;\n}\n\n.pr-0 {\n  padding-right: 0;\n}\n\n.pt-0 {\n  padding-top: 0;\n}\n\n.px-0 {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.py-0 {\n  padding-bottom: 0;\n  padding-top: 0;\n}\n\n.p-1 {\n  padding: .2rem;\n}\n\n.pb-1 {\n  padding-bottom: .2rem;\n}\n\n.pl-1 {\n  padding-left: .2rem;\n}\n\n.pr-1 {\n  padding-right: .2rem;\n}\n\n.pt-1 {\n  padding-top: .2rem;\n}\n\n.px-1 {\n  padding-left: .2rem;\n  padding-right: .2rem;\n}\n\n.py-1 {\n  padding-bottom: .2rem;\n  padding-top: .2rem;\n}\n\n.p-2 {\n  padding: .4rem;\n}\n\n.pb-2 {\n  padding-bottom: .4rem;\n}\n\n.pl-2 {\n  padding-left: .4rem;\n}\n\n.pr-2 {\n  padding-right: .4rem;\n}\n\n.pt-2 {\n  padding-top: .4rem;\n}\n\n.px-2 {\n  padding-left: .4rem;\n  padding-right: .4rem;\n}\n\n.py-2 {\n  padding-bottom: .4rem;\n  padding-top: .4rem;\n}\n\n.rounded {\n  border-radius: .1rem;\n}\n\n.circle {\n  border-radius: 50%;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.text-lowercase {\n  text-transform: lowercase;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n\n.text-capitalize {\n  text-transform: capitalize;\n}\n\n.text-normal {\n  font-weight: normal;\n}\n\n.text-bold {\n  font-weight: bold;\n}\n\n.text-italic {\n  font-style: italic;\n}\n\n.text-large {\n  font-size: 1.2em;\n}\n\n.text-ellipsis {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.text-clip {\n  overflow: hidden;\n  text-overflow: clip;\n  white-space: nowrap;\n}\n\n.text-break {\n  -webkit-hyphens: auto;\n  -ms-hyphens: auto;\n  hyphens: auto;\n  word-break: break-word;\n  word-wrap: break-word;\n}",undefined);

__$styleInject("/*! Spectre.css Icons v0.4.6 | MIT License | github.com/picturepan2/spectre */\n.icon {\n  box-sizing: border-box;\n  display: inline-block;\n  font-size: inherit;\n  font-style: normal;\n  height: 1em;\n  position: relative;\n  text-indent: -9999px;\n  vertical-align: middle;\n  width: 1em;\n}\n\n.icon::before,\n.icon::after {\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.icon.icon-2x {\n  font-size: 1.6rem;\n}\n\n.icon.icon-3x {\n  font-size: 2.4rem;\n}\n\n.icon.icon-4x {\n  font-size: 3.2rem;\n}\n\n.accordion .icon,\n.btn .icon,\n.toast .icon,\n.menu .icon {\n  vertical-align: -10%;\n}\n\n.btn-lg .icon {\n  vertical-align: -15%;\n}\n\n.icon-arrow-down::before,\n.icon-arrow-left::before,\n.icon-arrow-right::before,\n.icon-arrow-up::before,\n.icon-downward::before,\n.icon-back::before,\n.icon-forward::before,\n.icon-upward::before {\n  border: .1rem solid currentColor;\n  border-bottom: 0;\n  border-right: 0;\n  content: \"\";\n  height: .65em;\n  width: .65em;\n}\n\n.icon-arrow-down::before {\n  transform: translate(-50%, -75%) rotate(225deg);\n}\n\n.icon-arrow-left::before {\n  transform: translate(-25%, -50%) rotate(-45deg);\n}\n\n.icon-arrow-right::before {\n  transform: translate(-75%, -50%) rotate(135deg);\n}\n\n.icon-arrow-up::before {\n  transform: translate(-50%, -25%) rotate(45deg);\n}\n\n.icon-back::after,\n.icon-forward::after {\n  background: currentColor;\n  content: \"\";\n  height: .1rem;\n  width: .8em;\n}\n\n.icon-downward::after,\n.icon-upward::after {\n  background: currentColor;\n  content: \"\";\n  height: .8em;\n  width: .1rem;\n}\n\n.icon-back::after {\n  left: 55%;\n}\n\n.icon-back::before {\n  transform: translate(-50%, -50%) rotate(-45deg);\n}\n\n.icon-downward::after {\n  top: 45%;\n}\n\n.icon-downward::before {\n  transform: translate(-50%, -50%) rotate(-135deg);\n}\n\n.icon-forward::after {\n  left: 45%;\n}\n\n.icon-forward::before {\n  transform: translate(-50%, -50%) rotate(135deg);\n}\n\n.icon-upward::after {\n  top: 55%;\n}\n\n.icon-upward::before {\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n\n.icon-caret::before {\n  border-left: .3em solid transparent;\n  border-right: .3em solid transparent;\n  border-top: .3em solid currentColor;\n  content: \"\";\n  height: 0;\n  transform: translate(-50%, -25%);\n  width: 0;\n}\n\n.icon-menu::before {\n  background: currentColor;\n  box-shadow: 0 -.35em, 0 .35em;\n  content: \"\";\n  height: .1rem;\n  width: 100%;\n}\n\n.icon-apps::before {\n  background: currentColor;\n  box-shadow: -.35em -.35em, -.35em 0, -.35em .35em, 0 -.35em, 0 .35em, .35em -.35em, .35em 0, .35em .35em;\n  content: \"\";\n  height: 3px;\n  width: 3px;\n}\n\n.icon-resize-horiz::before,\n.icon-resize-horiz::after,\n.icon-resize-vert::before,\n.icon-resize-vert::after {\n  border: .1rem solid currentColor;\n  border-bottom: 0;\n  border-right: 0;\n  content: \"\";\n  height: .45em;\n  width: .45em;\n}\n\n.icon-resize-horiz::before,\n.icon-resize-vert::before {\n  transform: translate(-50%, -90%) rotate(45deg);\n}\n\n.icon-resize-horiz::after,\n.icon-resize-vert::after {\n  transform: translate(-50%, -10%) rotate(225deg);\n}\n\n.icon-resize-horiz::before {\n  transform: translate(-90%, -50%) rotate(-45deg);\n}\n\n.icon-resize-horiz::after {\n  transform: translate(-10%, -50%) rotate(135deg);\n}\n\n.icon-more-horiz::before,\n.icon-more-vert::before {\n  background: currentColor;\n  border-radius: 50%;\n  box-shadow: -.4em 0, .4em 0;\n  content: \"\";\n  height: 3px;\n  width: 3px;\n}\n\n.icon-more-vert::before {\n  box-shadow: 0 -.4em, 0 .4em;\n}\n\n.icon-plus::before,\n.icon-minus::before,\n.icon-cross::before {\n  background: currentColor;\n  content: \"\";\n  height: .1rem;\n  width: 100%;\n}\n\n.icon-plus::after,\n.icon-cross::after {\n  background: currentColor;\n  content: \"\";\n  height: 100%;\n  width: .1rem;\n}\n\n.icon-cross::before {\n  width: 100%;\n}\n\n.icon-cross::after {\n  height: 100%;\n}\n\n.icon-cross::before,\n.icon-cross::after {\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n\n.icon-check::before {\n  border: .1rem solid currentColor;\n  border-right: 0;\n  border-top: 0;\n  content: \"\";\n  height: .5em;\n  transform: translate(-50%, -75%) rotate(-45deg); \n  width: .9em;\n}\n\n.icon-stop {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n}\n\n.icon-stop::before {\n  background: currentColor;\n  content: \"\";\n  height: .1rem;\n  transform: translate(-50%, -50%) rotate(45deg);\n  width: 1em;\n}\n\n.icon-shutdown {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n  border-top-color: transparent;\n}\n\n.icon-shutdown::before {\n  background: currentColor;\n  content: \"\";\n  height: .5em;\n  top: .1em;\n  width: .1rem;\n}\n\n.icon-refresh::before {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n  border-right-color: transparent;\n  content: \"\";\n  height: 1em;\n  width: 1em;\n}\n\n.icon-refresh::after {\n  border: .2em solid currentColor;\n  border-left-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  height: 0;\n  left: 80%;\n  top: 20%;\n  width: 0;\n}\n\n.icon-search::before {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n  content: \"\";\n  height: .75em;\n  left: 5%;\n  top: 5%;\n  transform: translate(0, 0) rotate(45deg);\n  width: .75em;\n}\n\n.icon-search::after {\n  background: currentColor;\n  content: \"\";\n  height: .1rem;\n  left: 80%;\n  top: 80%;\n  transform: translate(-50%, -50%) rotate(45deg);\n  width: .4em;\n}\n\n.icon-edit::before {\n  border: .1rem solid currentColor;\n  content: \"\";\n  height: .4em;\n  transform: translate(-40%, -60%) rotate(-45deg);\n  width: .85em;\n}\n\n.icon-edit::after {\n  border: .15em solid currentColor;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  height: 0;\n  left: 5%;\n  top: 95%;\n  transform: translate(0, -100%);\n  width: 0;\n}\n\n.icon-delete::before {\n  border: .1rem solid currentColor;\n  border-bottom-left-radius: .1rem;\n  border-bottom-right-radius: .1rem;\n  border-top: 0;\n  content: \"\";\n  height: .75em;\n  top: 60%;\n  width: .75em;\n}\n\n.icon-delete::after {\n  background: currentColor;\n  box-shadow: -.25em .2em, .25em .2em;\n  content: \"\";\n  height: .1rem;\n  top: .05rem;\n  width: .5em;\n}\n\n.icon-share {\n  border: .1rem solid currentColor;\n  border-radius: .1rem;\n  border-right: 0;\n  border-top: 0;\n}\n\n.icon-share::before {\n  border: .1rem solid currentColor;\n  border-left: 0;\n  border-top: 0;\n  content: \"\";\n  height: .4em;\n  left: 100%;\n  top: .25em;\n  transform: translate(-125%, -50%) rotate(-45deg);\n  width: .4em;\n}\n\n.icon-share::after {\n  border: .1rem solid currentColor;\n  border-bottom: 0;\n  border-radius: 75% 0;\n  border-right: 0;\n  content: \"\";\n  height: .5em;\n  width: .6em;\n}\n\n.icon-flag::before {\n  background: currentColor;\n  content: \"\";\n  height: 1em;\n  left: 15%;\n  width: .1rem;\n}\n\n.icon-flag::after {\n  border: .1rem solid currentColor;\n  border-bottom-right-radius: .1rem;\n  border-left: 0;\n  border-top-right-radius: .1rem;\n  content: \"\";\n  height: .65em;\n  left: 60%;\n  top: 35%;\n  width: .8em;\n}\n\n.icon-bookmark::before {\n  border: .1rem solid currentColor;\n  border-bottom: 0;\n  border-top-left-radius: .1rem;\n  border-top-right-radius: .1rem;\n  content: \"\";\n  height: .9em;\n  width: .8em;\n}\n\n.icon-bookmark::after {\n  border: .1rem solid currentColor;\n  border-bottom: 0;\n  border-left: 0;\n  border-radius: .1rem;\n  content: \"\";\n  height: .5em;\n  transform: translate(-50%, 35%) rotate(-45deg) skew(15deg, 15deg);\n  width: .5em;\n}\n\n.icon-download,\n.icon-upload {\n  border-bottom: .1rem solid currentColor;\n}\n\n.icon-download::before,\n.icon-upload::before {\n  border: .1rem solid currentColor;\n  border-bottom: 0;\n  border-right: 0;\n  content: \"\";\n  height: .5em;\n  transform: translate(-50%, -60%) rotate(-135deg); \n  width: .5em;\n}\n\n.icon-download::after,\n.icon-upload::after {\n  background: currentColor;\n  content: \"\";\n  height: .6em;\n  top: 40%;\n  width: .1rem;\n}\n\n.icon-upload::before {\n  transform: translate(-50%, -60%) rotate(45deg);\n}\n\n.icon-upload::after {\n  top: 50%;\n}\n\n.icon-time {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n}\n\n.icon-time::before {\n  background: currentColor;\n  content: \"\";\n  height: .4em;\n  transform: translate(-50%, -75%);\n  width: .1rem;\n}\n\n.icon-time::after {\n  background: currentColor;\n  content: \"\";\n  height: .3em;\n  transform: translate(-50%, -75%) rotate(90deg);\n  transform-origin: 50% 90%;\n  width: .1rem;\n}\n\n.icon-mail::before {\n  border: .1rem solid currentColor;\n  border-radius: .1rem;\n  content: \"\";\n  height: .8em;\n  width: 1em;\n}\n\n.icon-mail::after {\n  border: .1rem solid currentColor;\n  border-right: 0;\n  border-top: 0;\n  content: \"\";\n  height: .5em;\n  transform: translate(-50%, -90%) rotate(-45deg) skew(10deg, 10deg);\n  width: .5em;\n}\n\n.icon-people::before {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n  content: \"\";\n  height: .45em;\n  top: 25%;\n  width: .45em;\n}\n\n.icon-people::after {\n  border: .1rem solid currentColor;\n  border-radius: 50% 50% 0 0;\n  content: \"\";\n  height: .4em;\n  top: 75%;\n  width: .9em;\n}\n\n.icon-message {\n  border: .1rem solid currentColor;\n  border-bottom: 0;\n  border-radius: .1rem;\n  border-right: 0;\n}\n\n.icon-message::before {\n  border: .1rem solid currentColor;\n  border-bottom-right-radius: .1rem;\n  border-left: 0;\n  border-top: 0;\n  content: \"\";\n  height: .8em;\n  left: 65%;\n  top: 40%;\n  width: .7em;\n}\n\n.icon-message::after {\n  background: currentColor;\n  border-radius: .1rem;\n  content: \"\";\n  height: .3em;\n  left: 10%;\n  top: 100%;\n  transform: translate(0, -90%) rotate(45deg);\n  width: .1rem;\n}\n\n.icon-photo {\n  border: .1rem solid currentColor;\n  border-radius: .1rem;\n}\n\n.icon-photo::before {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n  content: \"\";\n  height: .25em;\n  left: 35%;\n  top: 35%;\n  width: .25em;\n}\n\n.icon-photo::after {\n  border: .1rem solid currentColor;\n  border-bottom: 0;\n  border-left: 0;\n  content: \"\";\n  height: .5em;\n  left: 60%;\n  transform: translate(-50%, 25%) rotate(-45deg);\n  width: .5em;\n}\n\n.icon-link::before,\n.icon-link::after {\n  border: .1rem solid currentColor;\n  border-radius: 5em 0 0 5em;\n  border-right: 0;\n  content: \"\";\n  height: .5em;\n  width: .75em;\n}\n\n.icon-link::before {\n  transform: translate(-70%, -45%) rotate(-45deg);\n}\n\n.icon-link::after {\n  transform: translate(-30%, -55%) rotate(135deg);\n}\n\n.icon-location::before {\n  border: .1rem solid currentColor;\n  border-radius: 50% 50% 50% 0;\n  content: \"\";\n  height: .8em;\n  transform: translate(-50%, -60%) rotate(-45deg);\n  width: .8em;\n}\n\n.icon-location::after {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n  content: \"\";\n  height: .2em;\n  transform: translate(-50%, -80%);\n  width: .2em;\n}\n\n.icon-emoji {\n  border: .1rem solid currentColor;\n  border-radius: 50%;\n}\n\n.icon-emoji::before {\n  border-radius: 50%;\n  box-shadow: -.17em -.15em, .17em -.15em;\n  content: \"\";\n  height: .1em;\n  width: .1em;\n}\n\n.icon-emoji::after {\n  border: .1rem solid currentColor;\n  border-bottom-color: transparent;\n  border-radius: 50%;\n  border-right-color: transparent;\n  content: \"\";\n  height: .5em;\n  transform: translate(-50%, -40%) rotate(-135deg);\n  width: .5em;\n}",undefined);

/* lib/ui/components/error-message/component.html generated by Svelte v1.44.1 */
function encapsulateStyles(node) {
	setAttribute(node, "svelte-3318010927", "");
}

function add_css() {
	var style = createElement("style");
	style.id = 'svelte-3318010927-style';
	style.textContent = "p[svelte-3318010927],[svelte-3318010927] p{color:crimson\n  }";
	appendNode(style, document.head);
}

function create_main_fragment$2(state, component) {
	var if_block_anchor;

	var if_block = (state.message) && create_if_block$1(state, component);

	return {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = createComment();
		},

		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insertNode(if_block_anchor, target, anchor);
		},

		p: function update(changed, state) {
			if (state.message) {
				if (if_block) {
					if_block.p(changed, state);
				} else {
					if_block = create_if_block$1(state, component);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}
		},

		u: function unmount() {
			if (if_block) if_block.u();
			detachNode(if_block_anchor);
		},

		d: function destroy$$1() {
			if (if_block) if_block.d();
		}
	};
}

// (1:0) {{#if message}}
function create_if_block$1(state, component) {
	var div, text;

	return {
		c: function create() {
			div = createElement("div");
			text = createText(state.message);
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles(div);
			div.className = "toast toast-error";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(text, div);
		},

		p: function update(changed, state) {
			if (changed.message) {
				text.data = state.message;
			}
		},

		u: function unmount() {
			detachNode(div);
		},

		d: noop
	};
}

function Component$2(options) {
	init(this, options);
	this._state = assign({}, options.data);

	if (!document.getElementById("svelte-3318010927-style")) add_css();

	this._fragment = create_main_fragment$2(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(Component$2.prototype, proto);

/* lib/ui/components/login/component.html generated by Svelte v1.44.1 */
const { ipcRenderer: ipcRenderer$1 } = window.require('electron');

function data() {
  return {
    password: '',
    message: null
  }
}

var methods = {
  handleKeyup (event) {
    if (event.code === 'Enter') {
      this.login();
    }
  },
  login () {
    const password = this.get('password');
    ipcRenderer$1.send('login', { password });
  }
};

function oncreate$1() {
  ipcRenderer$1.on('login:error', (event, { message }) => {
    this.set({ message });
			});
}

function create_main_fragment$1(state, component) {
	var div, div_1, text_2, div_3, div_4, label, text_4, input, input_updating = false, text_6, text_8, div_5, button;

	function input_input_handler() {
		input_updating = true;
		component.set({ password: input.value });
		input_updating = false;
	}

	function keyup_handler(event) {
		component.handleKeyup(event);
	}

	var errormessage = new Component$2({
		_root: component._root,
		data: { message: state.message }
	});

	function click_handler(event) {
		component.login();
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_1.innerHTML = "<div class=\"panel-title\">Unlock</div>";
			text_2 = createText("\n  ");
			div_3 = createElement("div");
			div_4 = createElement("div");
			label = createElement("label");
			label.textContent = "Master password";
			text_4 = createText("\n      ");
			input = createElement("input");
			text_6 = createText("\n    ");
			errormessage._fragment.c();
			text_8 = createText("\n  ");
			div_5 = createElement("div");
			button = createElement("button");
			button.textContent = "Unlock";
			this.h();
		},

		h: function hydrate() {
			div_1.className = "panel-header text-center";
			label.className = "form-label";
			addListener(input, "input", input_input_handler);
			input.className = "form-input";
			input.type = "password";
			addListener(input, "keyup", keyup_handler);
			div_4.className = "form-group";
			div_3.className = "panel-body";
			button.className = "btn btn-primary btn-block";
			addListener(button, "click", click_handler);
			div_5.className = "panel-footer";
			div.className = "panel";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(text_2, div);
			appendNode(div_3, div);
			appendNode(div_4, div_3);
			appendNode(label, div_4);
			appendNode(text_4, div_4);
			appendNode(input, div_4);

			input.value = state.password;

			appendNode(text_6, div_3);
			errormessage._mount(div_3, null);
			appendNode(text_8, div);
			appendNode(div_5, div);
			appendNode(button, div_5);
		},

		p: function update(changed, state) {
			if (!input_updating) input.value = state.password;

			var errormessage_changes = {};
			if (changed.message) errormessage_changes.message = state.message;
			errormessage._set(errormessage_changes);
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(input, "input", input_input_handler);
			removeListener(input, "keyup", keyup_handler);
			errormessage.destroy(false);
			removeListener(button, "click", click_handler);
		}
	};
}

function Component$1(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	var _oncreate = oncreate$1.bind(this);

	if (!options._root) {
		this._oncreate = [_oncreate];
		this._beforecreate = [];
		this._aftercreate = [];
	} else {
	 	this._root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment$1(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Component$1.prototype, methods, proto);

/* lib/ui/components/initialise/component.html generated by Svelte v1.44.1 */
const { ipcRenderer: ipcRenderer$2 } = window.require('electron');

function data$1() {
  return {
    password: '',
    keyLength: 16,
    readableLength: 8
  }
}

var methods$1 = {
  configure () {
    const password = this.get('password');
    const keyLength = this.get('keyLength');
    const readableLength = this.get('readableLength');
    ipcRenderer$2.send('config:save', { password, keyLength, readableLength });
  }
};

function create_main_fragment$3(state, component) {
	var div, div_1, text_2, div_3, p, text_4, div_4, label, text_6, input, input_updating = false, text_8, div_5, label_1, text_10, input_1, input_1_updating = false, text_12, div_6, label_2, text_14, input_2, input_2_updating = false, text_16, text_18, div_7, button;

	function input_input_handler() {
		input_updating = true;
		component.set({ password: input.value });
		input_updating = false;
	}

	function input_1_input_handler() {
		input_1_updating = true;
		component.set({ keyLength: toNumber(input_1.value) });
		input_1_updating = false;
	}

	function input_2_input_handler() {
		input_2_updating = true;
		component.set({ readableLength: toNumber(input_2.value) });
		input_2_updating = false;
	}

	var errormessage = new Component$2({
		_root: component._root,
		data: { message: state.message }
	});

	function click_handler(event) {
		component.configure();
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_1.innerHTML = "<div class=\"panel-title\">Setup</div>";
			text_2 = createText("\n  ");
			div_3 = createElement("div");
			p = createElement("p");
			p.textContent = "No configuration found, so we'll create a new one.";
			text_4 = createText("\n    ");
			div_4 = createElement("div");
			label = createElement("label");
			label.textContent = "Master password";
			text_6 = createText("\n      ");
			input = createElement("input");
			text_8 = createText("\n    ");
			div_5 = createElement("div");
			label_1 = createElement("label");
			label_1.textContent = "Password length (characters)";
			text_10 = createText("\n      ");
			input_1 = createElement("input");
			text_12 = createText("\n    ");
			div_6 = createElement("div");
			label_2 = createElement("label");
			label_2.textContent = "Readable password length (words)";
			text_14 = createText("\n      ");
			input_2 = createElement("input");
			text_16 = createText("\n    ");
			errormessage._fragment.c();
			text_18 = createText("\n  ");
			div_7 = createElement("div");
			button = createElement("button");
			button.textContent = "Save";
			this.h();
		},

		h: function hydrate() {
			div_1.className = "panel-header text-center";
			label.className = "form-label";
			addListener(input, "input", input_input_handler);
			input.className = "form-input";
			input.type = "password";
			div_4.className = "form-group";
			label_1.className = "form-label";
			addListener(input_1, "input", input_1_input_handler);
			input_1.className = "form-input";
			input_1.type = "number";
			div_5.className = "form-group";
			label_2.className = "form-label";
			addListener(input_2, "input", input_2_input_handler);
			input_2.className = "form-input";
			input_2.type = "number";
			div_6.className = "form-group";
			div_3.className = "panel-body";
			button.className = "btn btn-primary btn-block";
			addListener(button, "click", click_handler);
			div_7.className = "panel-footer";
			div.className = "panel";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(text_2, div);
			appendNode(div_3, div);
			appendNode(p, div_3);
			appendNode(text_4, div_3);
			appendNode(div_4, div_3);
			appendNode(label, div_4);
			appendNode(text_6, div_4);
			appendNode(input, div_4);

			input.value = state.password;

			appendNode(text_8, div_3);
			appendNode(div_5, div_3);
			appendNode(label_1, div_5);
			appendNode(text_10, div_5);
			appendNode(input_1, div_5);

			input_1.value = state.keyLength;

			appendNode(text_12, div_3);
			appendNode(div_6, div_3);
			appendNode(label_2, div_6);
			appendNode(text_14, div_6);
			appendNode(input_2, div_6);

			input_2.value = state.readableLength;

			appendNode(text_16, div_3);
			errormessage._mount(div_3, null);
			appendNode(text_18, div);
			appendNode(div_7, div);
			appendNode(button, div_7);
		},

		p: function update(changed, state) {
			if (!input_updating) input.value = state.password;
			if (!input_1_updating) input_1.value = state.keyLength;
			if (!input_2_updating) input_2.value = state.readableLength;

			var errormessage_changes = {};
			if (changed.message) errormessage_changes.message = state.message;
			errormessage._set(errormessage_changes);
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(input, "input", input_input_handler);
			removeListener(input_1, "input", input_1_input_handler);
			removeListener(input_2, "input", input_2_input_handler);
			errormessage.destroy(false);
			removeListener(button, "click", click_handler);
		}
	};
}

function Component$3(options) {
	init(this, options);
	this._state = assign(data$1(), options.data);

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment$3(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Component$3.prototype, methods$1, proto);

/* lib/ui/components/generate/component.html generated by Svelte v1.44.1 */
const { ipcRenderer: ipcRenderer$3, clipboard } = window.require('electron');

function data$2() {
  return {
    generated: null,
    keyword: ''
  }
}

var methods$2 = {
  handleKeyup (event) {
    if (event.code === 'Enter') {
      this.generate();
    }
  },
  generate () {
    const keyword = this.get('keyword');
    ipcRenderer$3.send('generate', { keyword });
  },
  copy (text) {
    clipboard.writeText(text);
  },
  logout () {
    this.set({ state: 'login' });
  }
};

function oncreate$2() {
  ipcRenderer$3.on('generate:results', (event, { simple, complex, readable }) => {
    this.set({ generated: { simple, complex, readable } });
			});
}

function encapsulateStyles$1(node) {
	setAttribute(node, "svelte-1621541518", "");
}

function add_css$1() {
	var style = createElement("style");
	style.id = 'svelte-1621541518-style';
	style.textContent = "[svelte-1621541518].tile,[svelte-1621541518] .tile{margin:2vh 0}[svelte-1621541518].tile > .tile-action,[svelte-1621541518] .tile > .tile-action{visibility:hidden}[svelte-1621541518].tile:hover > .tile-action,[svelte-1621541518] .tile:hover > .tile-action{visibility:visible}[svelte-1621541518].tile-title,[svelte-1621541518] .tile-title{text-transform:capitalize}[svelte-1621541518].tile-subtitle,[svelte-1621541518] .tile-subtitle{margin:1vh 0}";
	appendNode(style, document.head);
}

function create_main_fragment$4(state, component) {
	var div, div_1, div_2, div_3, div_4, button, text_2, div_5, text_7, div_6, div_7, label, text_9, input, input_updating = false, text_11, div_8, text_14, div_9, button_1;

	function click_handler(event) {
		component.logout();
	}

	function input_input_handler() {
		input_updating = true;
		component.set({ keyword: input.value });
		input_updating = false;
	}

	function keyup_handler(event) {
		component.handleKeyup(event);
	}

	var if_block = (state.generated) && create_if_block$2(state, component);

	function click_handler_1(event) {
		component.generate(event);
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			div_3 = createElement("div");
			div_4 = createElement("div");
			button = createElement("button");
			button.innerHTML = "<i class=\"icon icon-arrow-left\"></i>";
			text_2 = createText("\n        ");
			div_5 = createElement("div");
			div_5.textContent = "Generate";
			text_7 = createText("\n  ");
			div_6 = createElement("div");
			div_7 = createElement("div");
			label = createElement("label");
			label.textContent = "Enter seed";
			text_9 = createText("\n      ");
			input = createElement("input");
			text_11 = createText("\n    ");
			div_8 = createElement("div");
			if (if_block) if_block.c();
			text_14 = createText("\n  ");
			div_9 = createElement("div");
			button_1 = createElement("button");
			button_1.textContent = "Generate";
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$1(div);
			button.className = "btn btn-primary btn-action btn-lg float-left";
			addListener(button, "click", click_handler);
			div_4.className = "column col-3";
			div_5.className = "column col-6";
			div_3.className = "columns";
			div_2.className = "panel-title";
			div_1.className = "panel-header text-center";
			label.className = "form-label";
			addListener(input, "input", input_input_handler);
			input.className = "form-input";
			input.type = "text";
			addListener(input, "keyup", keyup_handler);
			div_7.className = "form-group";
			div_6.className = "panel-body";
			button_1.className = "btn btn-primary btn-block";
			addListener(button_1, "click", click_handler_1);
			div_9.className = "panel-footer";
			div.className = "panel";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(div_3, div_2);
			appendNode(div_4, div_3);
			appendNode(button, div_4);
			appendNode(text_2, div_3);
			appendNode(div_5, div_3);
			appendNode(text_7, div);
			appendNode(div_6, div);
			appendNode(div_7, div_6);
			appendNode(label, div_7);
			appendNode(text_9, div_7);
			appendNode(input, div_7);

			input.value = state.keyword;

			appendNode(text_11, div_6);
			appendNode(div_8, div_6);
			if (if_block) if_block.m(div_8, null);
			appendNode(text_14, div);
			appendNode(div_9, div);
			appendNode(button_1, div_9);
		},

		p: function update(changed, state) {
			if (!input_updating) input.value = state.keyword;

			if (state.generated) {
				if (if_block) {
					if_block.p(changed, state);
				} else {
					if_block = create_if_block$2(state, component);
					if_block.c();
					if_block.m(div_8, null);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}
		},

		u: function unmount() {
			detachNode(div);
			if (if_block) if_block.u();
		},

		d: function destroy$$1() {
			removeListener(button, "click", click_handler);
			removeListener(input, "input", input_input_handler);
			removeListener(input, "keyup", keyup_handler);
			if (if_block) if_block.d();
			removeListener(button_1, "click", click_handler_1);
		}
	};
}

// (25:6) {{#each ['simple', 'complex', 'readable'] as kind}}
function create_each_block(state, each_value, kind, kind_index, component) {
	var div, div_1, div_2, b, text_value = kind, text, text_1, div_3, text_2_value = state.generated[kind], text_2, text_4, div_4, button;

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			b = createElement("b");
			text = createText(text_value);
			text_1 = createText("\n            ");
			div_3 = createElement("div");
			text_2 = createText(text_2_value);
			text_4 = createText("\n          ");
			div_4 = createElement("div");
			button = createElement("button");
			button.innerHTML = "<i class=\"icon icon-share\"></i>";
			this.h();
		},

		h: function hydrate() {
			div_2.className = "tile-title";
			div_3.className = "tile-subtitle";
			div_1.className = "tile-content";
			button.className = "btn btn-primary btn-action btn-lg";
			addListener(button, "click", click_handler);

			button._svelte = {
				component: component,
				each_value: each_value,
				kind_index: kind_index
			};

			div_4.className = "tile-action";
			div.className = "tile";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(b, div_2);
			appendNode(text, b);
			appendNode(text_1, div_1);
			appendNode(div_3, div_1);
			appendNode(text_2, div_3);
			appendNode(text_4, div);
			appendNode(div_4, div);
			appendNode(button, div_4);
		},

		p: function update(changed, state, each_value, kind, kind_index) {
			if ((changed.generated) && text_2_value !== (text_2_value = state.generated[kind])) {
				text_2.data = text_2_value;
			}

			button._svelte.each_value = each_value;
			button._svelte.kind_index = kind_index;
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(button, "click", click_handler);
		}
	};
}

// (22:6) {{#if generated}}
function create_if_block$2(state, component) {
	var div, text, each_anchor;

	var each_value = ['simple', 'complex', 'readable'];

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(state, each_value, each_value[i], i, component);
	}

	return {
		c: function create() {
			div = createElement("div");
			text = createText("\n\n      ");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_anchor = createComment();
			this.h();
		},

		h: function hydrate() {
			div.className = "divider text-center";
			div.dataset.content = "GENERATED";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			insertNode(text, target, anchor);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insertNode(each_anchor, target, anchor);
		},

		p: function update(changed, state) {
			var each_value = ['simple', 'complex', 'readable'];

			if (changed.generated) {
				for (var i = 0; i < each_value.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].p(changed, state, each_value, each_value[i], i);
					} else {
						each_blocks[i] = create_each_block(state, each_value, each_value[i], i, component);
						each_blocks[i].c();
						each_blocks[i].m(each_anchor.parentNode, each_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = each_value.length;
			}
		},

		u: function unmount() {
			detachNode(div);
			detachNode(text);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}

			detachNode(each_anchor);
		},

		d: function destroy$$1() {
			destroyEach(each_blocks);
		}
	};
}

function click_handler(event) {
	var component = this._svelte.component;
	var state = component.get();
	var each_value = this._svelte.each_value, kind_index = this._svelte.kind_index, kind = each_value[kind_index];
	component.copy(state.generated[kind]);
}

function Component$4(options) {
	init(this, options);
	this._state = assign(data$2(), options.data);

	if (!document.getElementById("svelte-1621541518-style")) add_css$1();

	var _oncreate = oncreate$2.bind(this);

	if (!options._root) {
		this._oncreate = [_oncreate];
	} else {
	 	this._root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment$4(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(Component$4.prototype, methods$2, proto);

/* lib/ui/components/app/component.html generated by Svelte v1.44.1 */
const { ipcRenderer } = window.require('electron');

  function oncreate() {
	ipcRenderer.on('state:change', (event, { state }) => {
        this.set({ state });
	});
	ipcRenderer.send('application:bootstrap');
}

function create_main_fragment(state, component) {
	var div, div_1, div_2, text, text_1;

	var if_block = (state.state === 'login') && create_if_block(state, component);

	var if_block_1 = (state.state === 'setup') && create_if_block_1(state, component);

	var if_block_2 = (state.state === 'generate') && create_if_block_2(state, component);

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			if (if_block) if_block.c();
			text = createText("\n\t\t\t");
			if (if_block_1) if_block_1.c();
			text_1 = createText("\n\t\t\t");
			if (if_block_2) if_block_2.c();
			this.h();
		},

		h: function hydrate() {
			div_2.className = "column col-12";
			div_1.className = "columns";
			div.className = "container";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			if (if_block) if_block.m(div_2, null);
			appendNode(text, div_2);
			if (if_block_1) if_block_1.m(div_2, null);
			appendNode(text_1, div_2);
			if (if_block_2) if_block_2.m(div_2, null);
		},

		p: function update(changed, state) {
			if (state.state === 'login') {
				if (!if_block) {
					if_block = create_if_block(state, component);
					if_block.c();
					if_block.m(div_2, text);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}

			if (state.state === 'setup') {
				if (!if_block_1) {
					if_block_1 = create_if_block_1(state, component);
					if_block_1.c();
					if_block_1.m(div_2, text_1);
				}
			} else if (if_block_1) {
				if_block_1.u();
				if_block_1.d();
				if_block_1 = null;
			}

			if (state.state === 'generate') {
				if (!if_block_2) {
					if_block_2 = create_if_block_2(state, component);
					if_block_2.c();
					if_block_2.m(div_2, null);
				}
			} else if (if_block_2) {
				if_block_2.u();
				if_block_2.d();
				if_block_2 = null;
			}
		},

		u: function unmount() {
			detachNode(div);
			if (if_block) if_block.u();
			if (if_block_1) if_block_1.u();
			if (if_block_2) if_block_2.u();
		},

		d: function destroy$$1() {
			if (if_block) if_block.d();
			if (if_block_1) if_block_1.d();
			if (if_block_2) if_block_2.d();
		}
	};
}

// (4:3) {{#if state === 'login'}}
function create_if_block(state, component) {

	var login = new Component$1({
		_root: component._root
	});

	return {
		c: function create() {
			login._fragment.c();
		},

		m: function mount(target, anchor) {
			login._mount(target, anchor);
		},

		u: function unmount() {
			login._unmount();
		},

		d: function destroy$$1() {
			login.destroy(false);
		}
	};
}

// (7:3) {{#if state === 'setup'}}
function create_if_block_1(state, component) {

	var initialise = new Component$3({
		_root: component._root
	});

	return {
		c: function create() {
			initialise._fragment.c();
		},

		m: function mount(target, anchor) {
			initialise._mount(target, anchor);
		},

		u: function unmount() {
			initialise._unmount();
		},

		d: function destroy$$1() {
			initialise.destroy(false);
		}
	};
}

// (10:3) {{#if state === 'generate'}}
function create_if_block_2(state, component) {

	var generate = new Component$4({
		_root: component._root
	});

	return {
		c: function create() {
			generate._fragment.c();
		},

		m: function mount(target, anchor) {
			generate._mount(target, anchor);
		},

		u: function unmount() {
			generate._unmount();
		},

		d: function destroy$$1() {
			generate.destroy(false);
		}
	};
}

function Component(options) {
	init(this, options);
	this._state = assign({}, options.data);

	var _oncreate = oncreate.bind(this);

	if (!options._root) {
		this._oncreate = [_oncreate];
		this._beforecreate = [];
		this._aftercreate = [];
	} else {
	 	this._root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Component.prototype, proto);

function Store(state) {
	this._observers = { pre: blankObject(), post: blankObject() };
	this._changeHandlers = [];
	this._dependents = [];

	this._computed = blankObject();
	this._sortedComputedProperties = [];

	this._state = assign({}, state);
}

assign(Store.prototype, {
	_add: function(component, props) {
		this._dependents.push({
			component: component,
			props: props
		});
	},

	_init: function(props) {
		var state = {};
		for (var i = 0; i < props.length; i += 1) {
			var prop = props[i];
			state['$' + prop] = this._state[prop];
		}
		return state;
	},

	_remove: function(component) {
		var i = this._dependents.length;
		while (i--) {
			if (this._dependents[i].component === component) {
				this._dependents.splice(i, 1);
				return;
			}
		}
	},

	_sortComputedProperties: function() {
		var computed = this._computed;
		var sorted = this._sortedComputedProperties = [];
		var cycles;
		var visited = blankObject();

		function visit(key) {
			if (cycles[key]) {
				throw new Error('Cyclical dependency detected');
			}

			if (visited[key]) return;
			visited[key] = true;

			var c = computed[key];

			if (c) {
				cycles[key] = true;
				c.deps.forEach(visit);
				sorted.push(c);
			}
		}

		for (var key in this._computed) {
			cycles = blankObject();
			visit(key);
		}
	},

	compute: function(key, deps, fn) {
		var value;

		var c = {
			deps: deps,
			update: function(state, changed, dirty) {
				var values = deps.map(function(dep) {
					if (dep in changed) dirty = true;
					return state[dep];
				});

				if (dirty) {
					var newValue = fn.apply(null, values);
					if (differs(newValue, value)) {
						value = newValue;
						changed[key] = true;
						state[key] = value;
					}
				}
			}
		};

		c.update(this._state, {}, true);

		this._computed[key] = c;
		this._sortComputedProperties();
	},

	get: get,

	observe: observe,

	onchange: function(callback) {
		this._changeHandlers.push(callback);
		return {
			cancel: function() {
				var index = this._changeHandlers.indexOf(callback);
				if (~index) this._changeHandlers.splice(index, 1);
			}
		};
	},

	set: function(newState) {
		var oldState = this._state,
			changed = this._changed = {},
			dirty = false;

		for (var key in newState) {
			if (this._computed[key]) throw new Error("'" + key + "' is a read-only property");
			if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign({}, oldState, newState);

		for (var i = 0; i < this._sortedComputedProperties.length; i += 1) {
			this._sortedComputedProperties[i].update(this._state, changed);
		}

		for (var i = 0; i < this._changeHandlers.length; i += 1) {
			this._changeHandlers[i](this._state, changed);
		}

		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);

		var dependents = this._dependents.slice(); // guard against mutations
		for (var i = 0; i < dependents.length; i += 1) {
			var dependent = dependents[i];
			var componentState = {};
			dirty = false;

			for (var j = 0; j < dependent.props.length; j += 1) {
				var prop = dependent.props[j];
				if (prop in changed) {
					componentState['$' + prop] = this._state[prop];
					dirty = true;
				}
			}

			if (dirty) dependent.component.set(componentState);
		}

		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
});

const store = new Store({});

var app = new Component({
  target: document.body,
  store
});

return app;

}());
