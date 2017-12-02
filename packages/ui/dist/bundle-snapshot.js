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

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
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

/* lib/ui/components/login/component.html generated by Svelte v1.43.1 */
const { ipcRenderer } = window.require('electron');

function data() {
  return {
    password: ''
  }
}

var methods = {
  login (event) {
    if (event.code === 'Enter') {
      const password = this.get('password');
      ipcRenderer.send('login', { password });
    }
  }
};

function create_main_fragment$1(state, component) {
	var div, div_1, text_2, div_2, input, input_updating = false;

	function input_input_handler() {
		input_updating = true;
		component.set({ password: input.value });
		input_updating = false;
	}

	function keyup_handler(event) {
		component.login(event);
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_1.innerHTML = "<h1>unstore</h1>";
			text_2 = createText("\n  ");
			div_2 = createElement("div");
			input = createElement("input");
			this.h();
		},

		h: function hydrate() {
			div_1.className = "heading aligner-item";
			addListener(input, "input", input_input_handler);
			input.type = "password";
			addListener(input, "keyup", keyup_handler);
			div_2.className = "aligner-item";
			div.className = "aligner";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(text_2, div);
			appendNode(div_2, div);
			appendNode(input, div_2);

			input.value = state.password;
		},

		p: function update(changed, state) {
			if (!input_updating) input.value = state.password;
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(input, "input", input_input_handler);
			removeListener(input, "keyup", keyup_handler);
		}
	};
}

function Component$1(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	this._fragment = create_main_fragment$1(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(Component$1.prototype, methods, proto);

/* lib/ui/components/initialise/component.html generated by Svelte v1.43.1 */
const { ipcRenderer: ipcRenderer$1 } = window.require('electron');

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
    ipcRenderer$1.send('config:save', { password, keyLength, readableLength });
  }
};

function oncreate() {
  ipcRenderer$1.on('reload', () => {
    console.log('reload');
  });
}

function create_main_fragment$2(state, component) {
	var header, text_2, div, form, p, text_4, div_1, label, text_6, input, input_updating = false, text_8, div_2, label_1, text_10, input_1, input_1_updating = false, text_12, div_3, label_2, text_14, input_2, input_2_updating = false, text_18, footer, div_4, button;

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

	function click_handler(event) {
		component.configure();
	}

	return {
		c: function create() {
			header = createElement("header");
			header.innerHTML = "<h1 class=\"title\">Setup</h1>";
			text_2 = createText("\n");
			div = createElement("div");
			form = createElement("form");
			p = createElement("p");
			p.textContent = "No configuration found, so we'll create a new one.";
			text_4 = createText("\n    ");
			div_1 = createElement("div");
			label = createElement("label");
			label.textContent = "Master password";
			text_6 = createText("\n      ");
			input = createElement("input");
			text_8 = createText("\n    ");
			div_2 = createElement("div");
			label_1 = createElement("label");
			label_1.textContent = "Password length (characters)";
			text_10 = createText("\n      ");
			input_1 = createElement("input");
			text_12 = createText("\n    ");
			div_3 = createElement("div");
			label_2 = createElement("label");
			label_2.textContent = "Readable password length (words)";
			text_14 = createText("\n      ");
			input_2 = createElement("input");
			text_18 = createText("\n");
			footer = createElement("footer");
			div_4 = createElement("div");
			button = createElement("button");
			button.textContent = "Save";
			this.h();
		},

		h: function hydrate() {
			header.className = "toolbar toolbar-header";
			addListener(input, "input", input_input_handler);
			input.className = "form-control";
			input.type = "password";
			div_1.className = "form-group";
			addListener(input_1, "input", input_1_input_handler);
			input_1.className = "form-control";
			input_1.type = "number";
			div_2.className = "form-group";
			addListener(input_2, "input", input_2_input_handler);
			input_2.className = "form-control";
			input_2.type = "number";
			div_3.className = "form-group";
			div.className = "window-content";
			button.className = "btn btn-primary pull-right";
			addListener(button, "click", click_handler);
			div_4.className = "toolbar-actions";
			footer.className = "toolbar toolbar-footer";
		},

		m: function mount(target, anchor) {
			insertNode(header, target, anchor);
			insertNode(text_2, target, anchor);
			insertNode(div, target, anchor);
			appendNode(form, div);
			appendNode(p, form);
			appendNode(text_4, form);
			appendNode(div_1, form);
			appendNode(label, div_1);
			appendNode(text_6, div_1);
			appendNode(input, div_1);

			input.value = state.password;

			appendNode(text_8, form);
			appendNode(div_2, form);
			appendNode(label_1, div_2);
			appendNode(text_10, div_2);
			appendNode(input_1, div_2);

			input_1.value = state.keyLength;

			appendNode(text_12, form);
			appendNode(div_3, form);
			appendNode(label_2, div_3);
			appendNode(text_14, div_3);
			appendNode(input_2, div_3);

			input_2.value = state.readableLength;

			insertNode(text_18, target, anchor);
			insertNode(footer, target, anchor);
			appendNode(div_4, footer);
			appendNode(button, div_4);
		},

		p: function update(changed, state) {
			if (!input_updating) input.value = state.password;
			if (!input_1_updating) input_1.value = state.keyLength;
			if (!input_2_updating) input_2.value = state.readableLength;
		},

		u: function unmount() {
			detachNode(header);
			detachNode(text_2);
			detachNode(div);
			detachNode(text_18);
			detachNode(footer);
		},

		d: function destroy$$1() {
			removeListener(input, "input", input_input_handler);
			removeListener(input_1, "input", input_1_input_handler);
			removeListener(input_2, "input", input_2_input_handler);
			removeListener(button, "click", click_handler);
		}
	};
}

function Component$2(options) {
	init(this, options);
	this._state = assign(data$1(), options.data);

	var _oncreate = oncreate.bind(this);

	if (!options._root) {
		this._oncreate = [_oncreate];
	} else {
	 	this._root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment$2(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(Component$2.prototype, methods$1, proto);

/* lib/ui/components/app/component.html generated by Svelte v1.43.1 */
function create_main_fragment(state, component) {
	var div;

	var current_block_type = select_block_type(state);
	var if_block = current_block_type(state, component);

	return {
		c: function create() {
			div = createElement("div");
			if_block.c();
			this.h();
		},

		h: function hydrate() {
			div.className = "window";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			if_block.m(div, null);
		},

		p: function update(changed, state) {
			if (current_block_type !== (current_block_type = select_block_type(state))) {
				if_block.u();
				if_block.d();
				if_block = current_block_type(state, component);
				if_block.c();
				if_block.m(div, null);
			}
		},

		u: function unmount() {
			detachNode(div);
			if_block.u();
		},

		d: function destroy$$1() {
			if_block.d();
		}
	};
}

// (2:1) {{#if configured}}
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

// (4:1) {{else}}
function create_if_block_1(state, component) {

	var initialise = new Component$2({
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

function select_block_type(state) {
	if (state.configured) return create_if_block;
	return create_if_block_1;
}

function Component(options) {
	init(this, options);
	this._state = assign({}, options.data);

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
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

__$styleInject("/*!\n * =====================================================\n * Photon v0.1.2\n * Copyright 2016 Connor Sears\n * Licensed under MIT (https://github.com/connors/proton/blob/master/LICENSE)\n *\n * v0.1.2 designed by @connors.\n * =====================================================\n */\n\n@charset \"UTF-8\";\naudio,\ncanvas,\nprogress,\nvideo {\n  vertical-align: baseline;\n}\n\naudio:not([controls]) {\n  display: none;\n}\n\na:active,\na:hover {\n  outline: 0;\n}\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\nb,\nstrong {\n  font-weight: bold;\n}\n\ndfn {\n  font-style: italic;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\npre {\n  overflow: auto;\n}\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box;\n}\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\nlegend {\n  border: 0;\n  padding: 0;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n\n* {\n  cursor: default;\n  -webkit-user-select: none;\n}\n\ninput,\ntextarea {\n  -webkit-user-select: text;\n}\n\nform,\ninput,\noptgroup,\nselect,\ntextarea {\n  -webkit-user-select: text;\n  -webkit-app-region: no-drag;\n}\n\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nhtml {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n\nbody {\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  font-family: system, -apple-system, \".SFNSDisplay-Regular\", \"Helvetica Neue\", Helvetica, \"Segoe UI\", sans-serif;\n  font-size: 13px;\n  line-height: 1.6;\n  color: #333;\n  background-color: transparent;\n}\n\nhr {\n  margin: 15px 0;\n  overflow: hidden;\n  background: transparent;\n  border: 0;\n  border-bottom: 1px solid #ddd;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n  font-weight: 500;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\nh1 {\n  font-size: 36px;\n}\n\nh2 {\n  font-size: 30px;\n}\n\nh3 {\n  font-size: 24px;\n}\n\nh4 {\n  font-size: 18px;\n}\n\nh5 {\n  font-size: 14px;\n}\n\nh6 {\n  font-size: 12px;\n}\n\n.window {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n}\n\n.window-content {\n  position: relative;\n  overflow-y: auto;\n  display: flex;\n  flex: 1;\n}\n\n.selectable-text {\n  cursor: text;\n  -webkit-user-select: text;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.pull-left {\n  float: left;\n}\n\n.pull-right {\n  float: right;\n}\n\n.padded {\n  padding: 10px;\n}\n\n.padded-less {\n  padding: 5px;\n}\n\n.padded-more {\n  padding: 20px;\n}\n\n.padded-vertically {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n.padded-vertically-less {\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n\n.padded-vertically-more {\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n\n.padded-horizontally {\n  padding-right: 10px;\n  padding-left: 10px;\n}\n\n.padded-horizontally-less {\n  padding-right: 5px;\n  padding-left: 5px;\n}\n\n.padded-horizontally-more {\n  padding-right: 20px;\n  padding-left: 20px;\n}\n\n.padded-top {\n  padding-top: 10px;\n}\n\n.padded-top-less {\n  padding-top: 5px;\n}\n\n.padded-top-more {\n  padding-top: 20px;\n}\n\n.padded-bottom {\n  padding-bottom: 10px;\n}\n\n.padded-bottom-less {\n  padding-bottom: 5px;\n}\n\n.padded-bottom-more {\n  padding-bottom: 20px;\n}\n\n.sidebar {\n  background-color: #f5f5f4;\n}\n\n.draggable {\n  -webkit-app-region: drag;\n}\n\n.not-draggable {\n  -webkit-app-region: no-drag;\n}\n\n.clearfix:before, .clearfix:after {\n  display: table;\n  content: \" \";\n}\n.clearfix:after {\n  clear: both;\n}\n\n.btn {\n  display: inline-block;\n  padding: 3px 8px;\n  margin-bottom: 0;\n  font-size: 12px;\n  line-height: 1.4;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  cursor: default;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);\n  -webkit-app-region: no-drag;\n}\n.btn:focus {\n  outline: none;\n  box-shadow: none;\n}\n\n.btn-mini {\n  padding: 2px 6px;\n}\n\n.btn-large {\n  padding: 6px 12px;\n}\n\n.btn-form {\n  padding-right: 20px;\n  padding-left: 20px;\n}\n\n.btn-default {\n  color: #333;\n  border-top-color: #c2c0c2;\n  border-right-color: #c2c0c2;\n  border-bottom-color: #a19fa1;\n  border-left-color: #c2c0c2;\n  background-color: #fcfcfc;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fcfcfc), color-stop(100%, #f1f1f1));\n  background-image: -webkit-linear-gradient(top, #fcfcfc 0%, #f1f1f1 100%);\n  background-image: linear-gradient(to bottom, #fcfcfc 0%, #f1f1f1 100%);\n}\n.btn-default:active {\n  background-color: #ddd;\n  background-image: none;\n}\n\n.btn-primary,\n.btn-positive,\n.btn-negative,\n.btn-warning {\n  color: #fff;\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n}\n\n.btn-primary {\n  border-color: #388df8;\n  border-bottom-color: #0866dc;\n  background-color: #6eb4f7;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #6eb4f7), color-stop(100%, #1a82fb));\n  background-image: -webkit-linear-gradient(top, #6eb4f7 0%, #1a82fb 100%);\n  background-image: linear-gradient(to bottom, #6eb4f7 0%, #1a82fb 100%);\n}\n.btn-primary:active {\n  background-color: #3e9bf4;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #3e9bf4), color-stop(100%, #0469de));\n  background-image: -webkit-linear-gradient(top, #3e9bf4 0%, #0469de 100%);\n  background-image: linear-gradient(to bottom, #3e9bf4 0%, #0469de 100%);\n}\n\n.btn-positive {\n  border-color: #29a03b;\n  border-bottom-color: #248b34;\n  background-color: #5bd46d;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #5bd46d), color-stop(100%, #29a03b));\n  background-image: -webkit-linear-gradient(top, #5bd46d 0%, #29a03b 100%);\n  background-image: linear-gradient(to bottom, #5bd46d 0%, #29a03b 100%);\n}\n.btn-positive:active {\n  background-color: #34c84a;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #34c84a), color-stop(100%, #248b34));\n  background-image: -webkit-linear-gradient(top, #34c84a 0%, #248b34 100%);\n  background-image: linear-gradient(to bottom, #34c84a 0%, #248b34 100%);\n}\n\n.btn-negative {\n  border-color: #fb2f29;\n  border-bottom-color: #fb1710;\n  background-color: #fd918d;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fd918d), color-stop(100%, #fb2f29));\n  background-image: -webkit-linear-gradient(top, #fd918d 0%, #fb2f29 100%);\n  background-image: linear-gradient(to bottom, #fd918d 0%, #fb2f29 100%);\n}\n.btn-negative:active {\n  background-color: #fc605b;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fc605b), color-stop(100%, #fb1710));\n  background-image: -webkit-linear-gradient(top, #fc605b 0%, #fb1710 100%);\n  background-image: linear-gradient(to bottom, #fc605b 0%, #fb1710 100%);\n}\n\n.btn-warning {\n  border-color: #fcaa0e;\n  border-bottom-color: #ee9d02;\n  background-color: #fece72;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fece72), color-stop(100%, #fcaa0e));\n  background-image: -webkit-linear-gradient(top, #fece72 0%, #fcaa0e 100%);\n  background-image: linear-gradient(to bottom, #fece72 0%, #fcaa0e 100%);\n}\n.btn-warning:active {\n  background-color: #fdbc40;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fdbc40), color-stop(100%, #ee9d02));\n  background-image: -webkit-linear-gradient(top, #fdbc40 0%, #ee9d02 100%);\n  background-image: linear-gradient(to bottom, #fdbc40 0%, #ee9d02 100%);\n}\n\n.btn .icon {\n  float: left;\n  width: 14px;\n  height: 14px;\n  margin-top: 1px;\n  margin-bottom: 1px;\n  color: #737475;\n  font-size: 14px;\n  line-height: 1;\n}\n\n.btn .icon-text {\n  margin-right: 5px;\n}\n\n.btn-dropdown:after {\n  font-family: \"photon-entypo\";\n  margin-left: 5px;\n  content: '\\e873';\n}\n\n.btn-group {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-app-region: no-drag;\n}\n.btn-group .btn {\n  position: relative;\n  float: left;\n}\n.btn-group .btn:focus, .btn-group .btn:active {\n  z-index: 2;\n}\n.btn-group .btn.active {\n  z-index: 3;\n}\n\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px;\n}\n.btn-group > .btn:first-child {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.btn-group > .btn:last-child {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group .btn + .btn {\n  border-left: 1px solid #c2c0c2;\n}\n.btn-group .btn + .btn.active {\n  border-left: 0;\n}\n.btn-group .active {\n  color: #fff;\n  border: 1px solid transparent;\n  background-color: #6d6c6d;\n  background-image: none;\n}\n.btn-group .active .icon {\n  color: #fff;\n}\n\n.toolbar {\n  min-height: 22px;\n  box-shadow: inset 0 1px 0 #f5f4f5;\n  background-color: #e8e6e8;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #e8e6e8), color-stop(100%, #d1cfd1));\n  background-image: -webkit-linear-gradient(top, #e8e6e8 0%, #d1cfd1 100%);\n  background-image: linear-gradient(to bottom, #e8e6e8 0%, #d1cfd1 100%);\n}\n.toolbar:before, .toolbar:after {\n  display: table;\n  content: \" \";\n}\n.toolbar:after {\n  clear: both;\n}\n\n.toolbar-header {\n  border-bottom: 1px solid #c2c0c2;\n}\n.toolbar-header .title {\n  margin-top: 1px;\n}\n\n.toolbar-footer {\n  border-top: 1px solid #c2c0c2;\n  -webkit-app-region: drag;\n}\n\n.title {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 400;\n  text-align: center;\n  color: #555;\n  cursor: default;\n}\n\n.toolbar-borderless {\n  border-top: 0;\n  border-bottom: 0;\n}\n\n.toolbar-actions {\n  margin-top: 4px;\n  margin-bottom: 3px;\n  padding-right: 3px;\n  padding-left: 3px;\n  padding-bottom: 3px;\n  -webkit-app-region: drag;\n}\n.toolbar-actions:before, .toolbar-actions:after {\n  display: table;\n  content: \" \";\n}\n.toolbar-actions:after {\n  clear: both;\n}\n.toolbar-actions > .btn,\n.toolbar-actions > .btn-group {\n  margin-left: 4px;\n  margin-right: 4px;\n}\n\nlabel {\n  display: inline-block;\n  font-size: 13px;\n  margin-bottom: 5px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\ninput[type=\"search\"] {\n  box-sizing: border-box;\n}\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  line-height: normal;\n}\n\n.form-control {\n  display: inline-block;\n  width: 100%;\n  min-height: 25px;\n  padding: 5px 10px;\n  font-size: 13px;\n  line-height: 1.6;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  outline: none;\n}\n.form-control:focus {\n  border-color: #6db3fd;\n  box-shadow: 0 0 0 3px #6db3fd;\n}\n\ntextarea {\n  height: auto;\n}\n\n.form-group {\n  margin-bottom: 10px;\n}\n\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.radio label,\n.checkbox label {\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n}\n\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px;\n}\n\n.form-actions .btn {\n  margin-right: 10px;\n}\n.form-actions .btn:last-child {\n  margin-right: 0;\n}\n\n.pane-group {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n}\n\n.pane {\n  position: relative;\n  overflow-y: auto;\n  flex: 1;\n  border-left: 1px solid #ddd;\n}\n.pane:first-child {\n  border-left: 0;\n}\n\n.pane-sm {\n  max-width: 220px;\n  min-width: 150px;\n}\n\n.pane-mini {\n  width: 80px;\n  flex: none;\n}\n\n.pane-one-fourth {\n  width: 25%;\n  flex: none;\n}\n\n.pane-one-third {\n  width: 33.3%;\n  flex: none;\n}\n\nimg {\n  -webkit-user-drag: text;\n}\n\n.img-circle {\n  border-radius: 50%;\n}\n\n.img-rounded {\n  border-radius: 4px;\n}\n\n.list-group {\n  width: 100%;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.list-group * {\n  margin: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.list-group-item {\n  padding: 10px;\n  font-size: 12px;\n  color: #414142;\n  border-top: 1px solid #ddd;\n}\n.list-group-item:first-child {\n  border-top: 0;\n}\n.list-group-item.active, .list-group-item.selected {\n  color: #fff;\n  background-color: #116cd6;\n}\n\n.list-group-header {\n  padding: 10px;\n}\n\n.media-object {\n  margin-top: 3px;\n}\n\n.media-object.pull-left {\n  margin-right: 10px;\n}\n\n.media-object.pull-right {\n  margin-left: 10px;\n}\n\n.media-body {\n  overflow: hidden;\n}\n\n.nav-group {\n  font-size: 14px;\n}\n\n.nav-group-item {\n  padding: 2px 10px 2px 25px;\n  display: block;\n  color: #333;\n  text-decoration: none;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nav-group-item:active, .nav-group-item.active {\n  background-color: #dcdfe1;\n}\n.nav-group-item .icon {\n  width: 19px;\n  height: 18px;\n  float: left;\n  color: #737475;\n  margin-top: -3px;\n  margin-right: 7px;\n  font-size: 18px;\n  text-align: center;\n}\n\n.nav-group-title {\n  margin: 0;\n  padding: 10px 10px 2px;\n  font-size: 12px;\n  font-weight: 500;\n  color: #666666;\n}\n\n@font-face {\n  font-family: \"photon-entypo\";\n  src: url(\"../fonts/photon-entypo.eot\");\n  src: url(\"../fonts/photon-entypo.eot?#iefix\") format(\"eot\"), url(\"../fonts/photon-entypo.woff\") format(\"woff\"), url(\"../fonts/photon-entypo.ttf\") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal;\n}\n.icon:before {\n  position: relative;\n  display: inline-block;\n  font-family: \"photon-entypo\";\n  speak: none;\n  font-size: 100%;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-note:before {\n  content: '\\e800';\n}\n\n/* '' */\n.icon-note-beamed:before {\n  content: '\\e801';\n}\n\n/* '' */\n.icon-music:before {\n  content: '\\e802';\n}\n\n/* '' */\n.icon-search:before {\n  content: '\\e803';\n}\n\n/* '' */\n.icon-flashlight:before {\n  content: '\\e804';\n}\n\n/* '' */\n.icon-mail:before {\n  content: '\\e805';\n}\n\n/* '' */\n.icon-heart:before {\n  content: '\\e806';\n}\n\n/* '' */\n.icon-heart-empty:before {\n  content: '\\e807';\n}\n\n/* '' */\n.icon-star:before {\n  content: '\\e808';\n}\n\n/* '' */\n.icon-star-empty:before {\n  content: '\\e809';\n}\n\n/* '' */\n.icon-user:before {\n  content: '\\e80a';\n}\n\n/* '' */\n.icon-users:before {\n  content: '\\e80b';\n}\n\n/* '' */\n.icon-user-add:before {\n  content: '\\e80c';\n}\n\n/* '' */\n.icon-video:before {\n  content: '\\e80d';\n}\n\n/* '' */\n.icon-picture:before {\n  content: '\\e80e';\n}\n\n/* '' */\n.icon-camera:before {\n  content: '\\e80f';\n}\n\n/* '' */\n.icon-layout:before {\n  content: '\\e810';\n}\n\n/* '' */\n.icon-menu:before {\n  content: '\\e811';\n}\n\n/* '' */\n.icon-check:before {\n  content: '\\e812';\n}\n\n/* '' */\n.icon-cancel:before {\n  content: '\\e813';\n}\n\n/* '' */\n.icon-cancel-circled:before {\n  content: '\\e814';\n}\n\n/* '' */\n.icon-cancel-squared:before {\n  content: '\\e815';\n}\n\n/* '' */\n.icon-plus:before {\n  content: '\\e816';\n}\n\n/* '' */\n.icon-plus-circled:before {\n  content: '\\e817';\n}\n\n/* '' */\n.icon-plus-squared:before {\n  content: '\\e818';\n}\n\n/* '' */\n.icon-minus:before {\n  content: '\\e819';\n}\n\n/* '' */\n.icon-minus-circled:before {\n  content: '\\e81a';\n}\n\n/* '' */\n.icon-minus-squared:before {\n  content: '\\e81b';\n}\n\n/* '' */\n.icon-help:before {\n  content: '\\e81c';\n}\n\n/* '' */\n.icon-help-circled:before {\n  content: '\\e81d';\n}\n\n/* '' */\n.icon-info:before {\n  content: '\\e81e';\n}\n\n/* '' */\n.icon-info-circled:before {\n  content: '\\e81f';\n}\n\n/* '' */\n.icon-back:before {\n  content: '\\e820';\n}\n\n/* '' */\n.icon-home:before {\n  content: '\\e821';\n}\n\n/* '' */\n.icon-link:before {\n  content: '\\e822';\n}\n\n/* '' */\n.icon-attach:before {\n  content: '\\e823';\n}\n\n/* '' */\n.icon-lock:before {\n  content: '\\e824';\n}\n\n/* '' */\n.icon-lock-open:before {\n  content: '\\e825';\n}\n\n/* '' */\n.icon-eye:before {\n  content: '\\e826';\n}\n\n/* '' */\n.icon-tag:before {\n  content: '\\e827';\n}\n\n/* '' */\n.icon-bookmark:before {\n  content: '\\e828';\n}\n\n/* '' */\n.icon-bookmarks:before {\n  content: '\\e829';\n}\n\n/* '' */\n.icon-flag:before {\n  content: '\\e82a';\n}\n\n/* '' */\n.icon-thumbs-up:before {\n  content: '\\e82b';\n}\n\n/* '' */\n.icon-thumbs-down:before {\n  content: '\\e82c';\n}\n\n/* '' */\n.icon-download:before {\n  content: '\\e82d';\n}\n\n/* '' */\n.icon-upload:before {\n  content: '\\e82e';\n}\n\n/* '' */\n.icon-upload-cloud:before {\n  content: '\\e82f';\n}\n\n/* '' */\n.icon-reply:before {\n  content: '\\e830';\n}\n\n/* '' */\n.icon-reply-all:before {\n  content: '\\e831';\n}\n\n/* '' */\n.icon-forward:before {\n  content: '\\e832';\n}\n\n/* '' */\n.icon-quote:before {\n  content: '\\e833';\n}\n\n/* '' */\n.icon-code:before {\n  content: '\\e834';\n}\n\n/* '' */\n.icon-export:before {\n  content: '\\e835';\n}\n\n/* '' */\n.icon-pencil:before {\n  content: '\\e836';\n}\n\n/* '' */\n.icon-feather:before {\n  content: '\\e837';\n}\n\n/* '' */\n.icon-print:before {\n  content: '\\e838';\n}\n\n/* '' */\n.icon-retweet:before {\n  content: '\\e839';\n}\n\n/* '' */\n.icon-keyboard:before {\n  content: '\\e83a';\n}\n\n/* '' */\n.icon-comment:before {\n  content: '\\e83b';\n}\n\n/* '' */\n.icon-chat:before {\n  content: '\\e83c';\n}\n\n/* '' */\n.icon-bell:before {\n  content: '\\e83d';\n}\n\n/* '' */\n.icon-attention:before {\n  content: '\\e83e';\n}\n\n/* '' */\n.icon-alert:before {\n  content: '\\e83f';\n}\n\n/* '' */\n.icon-vcard:before {\n  content: '\\e840';\n}\n\n/* '' */\n.icon-address:before {\n  content: '\\e841';\n}\n\n/* '' */\n.icon-location:before {\n  content: '\\e842';\n}\n\n/* '' */\n.icon-map:before {\n  content: '\\e843';\n}\n\n/* '' */\n.icon-direction:before {\n  content: '\\e844';\n}\n\n/* '' */\n.icon-compass:before {\n  content: '\\e845';\n}\n\n/* '' */\n.icon-cup:before {\n  content: '\\e846';\n}\n\n/* '' */\n.icon-trash:before {\n  content: '\\e847';\n}\n\n/* '' */\n.icon-doc:before {\n  content: '\\e848';\n}\n\n/* '' */\n.icon-docs:before {\n  content: '\\e849';\n}\n\n/* '' */\n.icon-doc-landscape:before {\n  content: '\\e84a';\n}\n\n/* '' */\n.icon-doc-text:before {\n  content: '\\e84b';\n}\n\n/* '' */\n.icon-doc-text-inv:before {\n  content: '\\e84c';\n}\n\n/* '' */\n.icon-newspaper:before {\n  content: '\\e84d';\n}\n\n/* '' */\n.icon-book-open:before {\n  content: '\\e84e';\n}\n\n/* '' */\n.icon-book:before {\n  content: '\\e84f';\n}\n\n/* '' */\n.icon-folder:before {\n  content: '\\e850';\n}\n\n/* '' */\n.icon-archive:before {\n  content: '\\e851';\n}\n\n/* '' */\n.icon-box:before {\n  content: '\\e852';\n}\n\n/* '' */\n.icon-rss:before {\n  content: '\\e853';\n}\n\n/* '' */\n.icon-phone:before {\n  content: '\\e854';\n}\n\n/* '' */\n.icon-cog:before {\n  content: '\\e855';\n}\n\n/* '' */\n.icon-tools:before {\n  content: '\\e856';\n}\n\n/* '' */\n.icon-share:before {\n  content: '\\e857';\n}\n\n/* '' */\n.icon-shareable:before {\n  content: '\\e858';\n}\n\n/* '' */\n.icon-basket:before {\n  content: '\\e859';\n}\n\n/* '' */\n.icon-bag:before {\n  content: '\\e85a';\n}\n\n/* '' */\n.icon-calendar:before {\n  content: '\\e85b';\n}\n\n/* '' */\n.icon-login:before {\n  content: '\\e85c';\n}\n\n/* '' */\n.icon-logout:before {\n  content: '\\e85d';\n}\n\n/* '' */\n.icon-mic:before {\n  content: '\\e85e';\n}\n\n/* '' */\n.icon-mute:before {\n  content: '\\e85f';\n}\n\n/* '' */\n.icon-sound:before {\n  content: '\\e860';\n}\n\n/* '' */\n.icon-volume:before {\n  content: '\\e861';\n}\n\n/* '' */\n.icon-clock:before {\n  content: '\\e862';\n}\n\n/* '' */\n.icon-hourglass:before {\n  content: '\\e863';\n}\n\n/* '' */\n.icon-lamp:before {\n  content: '\\e864';\n}\n\n/* '' */\n.icon-light-down:before {\n  content: '\\e865';\n}\n\n/* '' */\n.icon-light-up:before {\n  content: '\\e866';\n}\n\n/* '' */\n.icon-adjust:before {\n  content: '\\e867';\n}\n\n/* '' */\n.icon-block:before {\n  content: '\\e868';\n}\n\n/* '' */\n.icon-resize-full:before {\n  content: '\\e869';\n}\n\n/* '' */\n.icon-resize-small:before {\n  content: '\\e86a';\n}\n\n/* '' */\n.icon-popup:before {\n  content: '\\e86b';\n}\n\n/* '' */\n.icon-publish:before {\n  content: '\\e86c';\n}\n\n/* '' */\n.icon-window:before {\n  content: '\\e86d';\n}\n\n/* '' */\n.icon-arrow-combo:before {\n  content: '\\e86e';\n}\n\n/* '' */\n.icon-down-circled:before {\n  content: '\\e86f';\n}\n\n/* '' */\n.icon-left-circled:before {\n  content: '\\e870';\n}\n\n/* '' */\n.icon-right-circled:before {\n  content: '\\e871';\n}\n\n/* '' */\n.icon-up-circled:before {\n  content: '\\e872';\n}\n\n/* '' */\n.icon-down-open:before {\n  content: '\\e873';\n}\n\n/* '' */\n.icon-left-open:before {\n  content: '\\e874';\n}\n\n/* '' */\n.icon-right-open:before {\n  content: '\\e875';\n}\n\n/* '' */\n.icon-up-open:before {\n  content: '\\e876';\n}\n\n/* '' */\n.icon-down-open-mini:before {\n  content: '\\e877';\n}\n\n/* '' */\n.icon-left-open-mini:before {\n  content: '\\e878';\n}\n\n/* '' */\n.icon-right-open-mini:before {\n  content: '\\e879';\n}\n\n/* '' */\n.icon-up-open-mini:before {\n  content: '\\e87a';\n}\n\n/* '' */\n.icon-down-open-big:before {\n  content: '\\e87b';\n}\n\n/* '' */\n.icon-left-open-big:before {\n  content: '\\e87c';\n}\n\n/* '' */\n.icon-right-open-big:before {\n  content: '\\e87d';\n}\n\n/* '' */\n.icon-up-open-big:before {\n  content: '\\e87e';\n}\n\n/* '' */\n.icon-down:before {\n  content: '\\e87f';\n}\n\n/* '' */\n.icon-left:before {\n  content: '\\e880';\n}\n\n/* '' */\n.icon-right:before {\n  content: '\\e881';\n}\n\n/* '' */\n.icon-up:before {\n  content: '\\e882';\n}\n\n/* '' */\n.icon-down-dir:before {\n  content: '\\e883';\n}\n\n/* '' */\n.icon-left-dir:before {\n  content: '\\e884';\n}\n\n/* '' */\n.icon-right-dir:before {\n  content: '\\e885';\n}\n\n/* '' */\n.icon-up-dir:before {\n  content: '\\e886';\n}\n\n/* '' */\n.icon-down-bold:before {\n  content: '\\e887';\n}\n\n/* '' */\n.icon-left-bold:before {\n  content: '\\e888';\n}\n\n/* '' */\n.icon-right-bold:before {\n  content: '\\e889';\n}\n\n/* '' */\n.icon-up-bold:before {\n  content: '\\e88a';\n}\n\n/* '' */\n.icon-down-thin:before {\n  content: '\\e88b';\n}\n\n/* '' */\n.icon-left-thin:before {\n  content: '\\e88c';\n}\n\n/* '' */\n.icon-right-thin:before {\n  content: '\\e88d';\n}\n\n/* '' */\n.icon-up-thin:before {\n  content: '\\e88e';\n}\n\n/* '' */\n.icon-ccw:before {\n  content: '\\e88f';\n}\n\n/* '' */\n.icon-cw:before {\n  content: '\\e890';\n}\n\n/* '' */\n.icon-arrows-ccw:before {\n  content: '\\e891';\n}\n\n/* '' */\n.icon-level-down:before {\n  content: '\\e892';\n}\n\n/* '' */\n.icon-level-up:before {\n  content: '\\e893';\n}\n\n/* '' */\n.icon-shuffle:before {\n  content: '\\e894';\n}\n\n/* '' */\n.icon-loop:before {\n  content: '\\e895';\n}\n\n/* '' */\n.icon-switch:before {\n  content: '\\e896';\n}\n\n/* '' */\n.icon-play:before {\n  content: '\\e897';\n}\n\n/* '' */\n.icon-stop:before {\n  content: '\\e898';\n}\n\n/* '' */\n.icon-pause:before {\n  content: '\\e899';\n}\n\n/* '' */\n.icon-record:before {\n  content: '\\e89a';\n}\n\n/* '' */\n.icon-to-end:before {\n  content: '\\e89b';\n}\n\n/* '' */\n.icon-to-start:before {\n  content: '\\e89c';\n}\n\n/* '' */\n.icon-fast-forward:before {\n  content: '\\e89d';\n}\n\n/* '' */\n.icon-fast-backward:before {\n  content: '\\e89e';\n}\n\n/* '' */\n.icon-progress-0:before {\n  content: '\\e89f';\n}\n\n/* '' */\n.icon-progress-1:before {\n  content: '\\e8a0';\n}\n\n/* '' */\n.icon-progress-2:before {\n  content: '\\e8a1';\n}\n\n/* '' */\n.icon-progress-3:before {\n  content: '\\e8a2';\n}\n\n/* '' */\n.icon-target:before {\n  content: '\\e8a3';\n}\n\n/* '' */\n.icon-palette:before {\n  content: '\\e8a4';\n}\n\n/* '' */\n.icon-list:before {\n  content: '\\e8a5';\n}\n\n/* '' */\n.icon-list-add:before {\n  content: '\\e8a6';\n}\n\n/* '' */\n.icon-signal:before {\n  content: '\\e8a7';\n}\n\n/* '' */\n.icon-trophy:before {\n  content: '\\e8a8';\n}\n\n/* '' */\n.icon-battery:before {\n  content: '\\e8a9';\n}\n\n/* '' */\n.icon-back-in-time:before {\n  content: '\\e8aa';\n}\n\n/* '' */\n.icon-monitor:before {\n  content: '\\e8ab';\n}\n\n/* '' */\n.icon-mobile:before {\n  content: '\\e8ac';\n}\n\n/* '' */\n.icon-network:before {\n  content: '\\e8ad';\n}\n\n/* '' */\n.icon-cd:before {\n  content: '\\e8ae';\n}\n\n/* '' */\n.icon-inbox:before {\n  content: '\\e8af';\n}\n\n/* '' */\n.icon-install:before {\n  content: '\\e8b0';\n}\n\n/* '' */\n.icon-globe:before {\n  content: '\\e8b1';\n}\n\n/* '' */\n.icon-cloud:before {\n  content: '\\e8b2';\n}\n\n/* '' */\n.icon-cloud-thunder:before {\n  content: '\\e8b3';\n}\n\n/* '' */\n.icon-flash:before {\n  content: '\\e8b4';\n}\n\n/* '' */\n.icon-moon:before {\n  content: '\\e8b5';\n}\n\n/* '' */\n.icon-flight:before {\n  content: '\\e8b6';\n}\n\n/* '' */\n.icon-paper-plane:before {\n  content: '\\e8b7';\n}\n\n/* '' */\n.icon-leaf:before {\n  content: '\\e8b8';\n}\n\n/* '' */\n.icon-lifebuoy:before {\n  content: '\\e8b9';\n}\n\n/* '' */\n.icon-mouse:before {\n  content: '\\e8ba';\n}\n\n/* '' */\n.icon-briefcase:before {\n  content: '\\e8bb';\n}\n\n/* '' */\n.icon-suitcase:before {\n  content: '\\e8bc';\n}\n\n/* '' */\n.icon-dot:before {\n  content: '\\e8bd';\n}\n\n/* '' */\n.icon-dot-2:before {\n  content: '\\e8be';\n}\n\n/* '' */\n.icon-dot-3:before {\n  content: '\\e8bf';\n}\n\n/* '' */\n.icon-brush:before {\n  content: '\\e8c0';\n}\n\n/* '' */\n.icon-magnet:before {\n  content: '\\e8c1';\n}\n\n/* '' */\n.icon-infinity:before {\n  content: '\\e8c2';\n}\n\n/* '' */\n.icon-erase:before {\n  content: '\\e8c3';\n}\n\n/* '' */\n.icon-chart-pie:before {\n  content: '\\e8c4';\n}\n\n/* '' */\n.icon-chart-line:before {\n  content: '\\e8c5';\n}\n\n/* '' */\n.icon-chart-bar:before {\n  content: '\\e8c6';\n}\n\n/* '' */\n.icon-chart-area:before {\n  content: '\\e8c7';\n}\n\n/* '' */\n.icon-tape:before {\n  content: '\\e8c8';\n}\n\n/* '' */\n.icon-graduation-cap:before {\n  content: '\\e8c9';\n}\n\n/* '' */\n.icon-language:before {\n  content: '\\e8ca';\n}\n\n/* '' */\n.icon-ticket:before {\n  content: '\\e8cb';\n}\n\n/* '' */\n.icon-water:before {\n  content: '\\e8cc';\n}\n\n/* '' */\n.icon-droplet:before {\n  content: '\\e8cd';\n}\n\n/* '' */\n.icon-air:before {\n  content: '\\e8ce';\n}\n\n/* '' */\n.icon-credit-card:before {\n  content: '\\e8cf';\n}\n\n/* '' */\n.icon-floppy:before {\n  content: '\\e8d0';\n}\n\n/* '' */\n.icon-clipboard:before {\n  content: '\\e8d1';\n}\n\n/* '' */\n.icon-megaphone:before {\n  content: '\\e8d2';\n}\n\n/* '' */\n.icon-database:before {\n  content: '\\e8d3';\n}\n\n/* '' */\n.icon-drive:before {\n  content: '\\e8d4';\n}\n\n/* '' */\n.icon-bucket:before {\n  content: '\\e8d5';\n}\n\n/* '' */\n.icon-thermometer:before {\n  content: '\\e8d6';\n}\n\n/* '' */\n.icon-key:before {\n  content: '\\e8d7';\n}\n\n/* '' */\n.icon-flow-cascade:before {\n  content: '\\e8d8';\n}\n\n/* '' */\n.icon-flow-branch:before {\n  content: '\\e8d9';\n}\n\n/* '' */\n.icon-flow-tree:before {\n  content: '\\e8da';\n}\n\n/* '' */\n.icon-flow-line:before {\n  content: '\\e8db';\n}\n\n/* '' */\n.icon-flow-parallel:before {\n  content: '\\e8dc';\n}\n\n/* '' */\n.icon-rocket:before {\n  content: '\\e8dd';\n}\n\n/* '' */\n.icon-gauge:before {\n  content: '\\e8de';\n}\n\n/* '' */\n.icon-traffic-cone:before {\n  content: '\\e8df';\n}\n\n/* '' */\n.icon-cc:before {\n  content: '\\e8e0';\n}\n\n/* '' */\n.icon-cc-by:before {\n  content: '\\e8e1';\n}\n\n/* '' */\n.icon-cc-nc:before {\n  content: '\\e8e2';\n}\n\n/* '' */\n.icon-cc-nc-eu:before {\n  content: '\\e8e3';\n}\n\n/* '' */\n.icon-cc-nc-jp:before {\n  content: '\\e8e4';\n}\n\n/* '' */\n.icon-cc-sa:before {\n  content: '\\e8e5';\n}\n\n/* '' */\n.icon-cc-nd:before {\n  content: '\\e8e6';\n}\n\n/* '' */\n.icon-cc-pd:before {\n  content: '\\e8e7';\n}\n\n/* '' */\n.icon-cc-zero:before {\n  content: '\\e8e8';\n}\n\n/* '' */\n.icon-cc-share:before {\n  content: '\\e8e9';\n}\n\n/* '' */\n.icon-cc-remix:before {\n  content: '\\e8ea';\n}\n\n/* '' */\n.icon-github:before {\n  content: '\\e8eb';\n}\n\n/* '' */\n.icon-github-circled:before {\n  content: '\\e8ec';\n}\n\n/* '' */\n.icon-flickr:before {\n  content: '\\e8ed';\n}\n\n/* '' */\n.icon-flickr-circled:before {\n  content: '\\e8ee';\n}\n\n/* '' */\n.icon-vimeo:before {\n  content: '\\e8ef';\n}\n\n/* '' */\n.icon-vimeo-circled:before {\n  content: '\\e8f0';\n}\n\n/* '' */\n.icon-twitter:before {\n  content: '\\e8f1';\n}\n\n/* '' */\n.icon-twitter-circled:before {\n  content: '\\e8f2';\n}\n\n/* '' */\n.icon-facebook:before {\n  content: '\\e8f3';\n}\n\n/* '' */\n.icon-facebook-circled:before {\n  content: '\\e8f4';\n}\n\n/* '' */\n.icon-facebook-squared:before {\n  content: '\\e8f5';\n}\n\n/* '' */\n.icon-gplus:before {\n  content: '\\e8f6';\n}\n\n/* '' */\n.icon-gplus-circled:before {\n  content: '\\e8f7';\n}\n\n/* '' */\n.icon-pinterest:before {\n  content: '\\e8f8';\n}\n\n/* '' */\n.icon-pinterest-circled:before {\n  content: '\\e8f9';\n}\n\n/* '' */\n.icon-tumblr:before {\n  content: '\\e8fa';\n}\n\n/* '' */\n.icon-tumblr-circled:before {\n  content: '\\e8fb';\n}\n\n/* '' */\n.icon-linkedin:before {\n  content: '\\e8fc';\n}\n\n/* '' */\n.icon-linkedin-circled:before {\n  content: '\\e8fd';\n}\n\n/* '' */\n.icon-dribbble:before {\n  content: '\\e8fe';\n}\n\n/* '' */\n.icon-dribbble-circled:before {\n  content: '\\e8ff';\n}\n\n/* '' */\n.icon-stumbleupon:before {\n  content: '\\e900';\n}\n\n/* '' */\n.icon-stumbleupon-circled:before {\n  content: '\\e901';\n}\n\n/* '' */\n.icon-lastfm:before {\n  content: '\\e902';\n}\n\n/* '' */\n.icon-lastfm-circled:before {\n  content: '\\e903';\n}\n\n/* '' */\n.icon-rdio:before {\n  content: '\\e904';\n}\n\n/* '' */\n.icon-rdio-circled:before {\n  content: '\\e905';\n}\n\n/* '' */\n.icon-spotify:before {\n  content: '\\e906';\n}\n\n/* '' */\n.icon-spotify-circled:before {\n  content: '\\e907';\n}\n\n/* '' */\n.icon-qq:before {\n  content: '\\e908';\n}\n\n/* '' */\n.icon-instagram:before {\n  content: '\\e909';\n}\n\n/* '' */\n.icon-dropbox:before {\n  content: '\\e90a';\n}\n\n/* '' */\n.icon-evernote:before {\n  content: '\\e90b';\n}\n\n/* '' */\n.icon-flattr:before {\n  content: '\\e90c';\n}\n\n/* '' */\n.icon-skype:before {\n  content: '\\e90d';\n}\n\n/* '' */\n.icon-skype-circled:before {\n  content: '\\e90e';\n}\n\n/* '' */\n.icon-renren:before {\n  content: '\\e90f';\n}\n\n/* '' */\n.icon-sina-weibo:before {\n  content: '\\e910';\n}\n\n/* '' */\n.icon-paypal:before {\n  content: '\\e911';\n}\n\n/* '' */\n.icon-picasa:before {\n  content: '\\e912';\n}\n\n/* '' */\n.icon-soundcloud:before {\n  content: '\\e913';\n}\n\n/* '' */\n.icon-mixi:before {\n  content: '\\e914';\n}\n\n/* '' */\n.icon-behance:before {\n  content: '\\e915';\n}\n\n/* '' */\n.icon-google-circles:before {\n  content: '\\e916';\n}\n\n/* '' */\n.icon-vkontakte:before {\n  content: '\\e917';\n}\n\n/* '' */\n.icon-smashing:before {\n  content: '\\e918';\n}\n\n/* '' */\n.icon-sweden:before {\n  content: '\\e919';\n}\n\n/* '' */\n.icon-db-shape:before {\n  content: '\\e91a';\n}\n\n/* '' */\n.icon-logo-db:before {\n  content: '\\e91b';\n}\n\n/* '' */\ntable {\n  width: 100%;\n  border: 0;\n  border-collapse: separate;\n  font-size: 12px;\n  text-align: left;\n}\n\nthead {\n  background-color: #f5f5f4;\n}\n\ntbody {\n  background-color: #fff;\n}\n\n.table-striped tr:nth-child(even) {\n  background-color: #f5f5f4;\n}\n\ntr:active,\n.table-striped tr:active:nth-child(even) {\n  color: #fff;\n  background-color: #116cd6;\n}\n\nthead tr:active {\n  color: #333;\n  background-color: #f5f5f4;\n}\n\nth {\n  font-weight: normal;\n  border-right: 1px solid #ddd;\n  border-bottom: 1px solid #ddd;\n}\n\nth,\ntd {\n  padding: 2px 15px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\nth:last-child,\ntd:last-child {\n  border-right: 0;\n}\n\n.tab-group {\n  margin-top: -1px;\n  display: flex;\n  border-top: 1px solid #989698;\n  border-bottom: 1px solid #989698;\n}\n\n.tab-item {\n  position: relative;\n  flex: 1;\n  padding: 3px;\n  font-size: 12px;\n  text-align: center;\n  border-left: 1px solid #989698;\n  background-color: #b8b6b8;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #b8b6b8), color-stop(100%, #b0aeb0));\n  background-image: -webkit-linear-gradient(top, #b8b6b8 0%, #b0aeb0 100%);\n  background-image: linear-gradient(to bottom, #b8b6b8 0%, #b0aeb0 100%);\n}\n.tab-item:first-child {\n  border-left: 0;\n}\n.tab-item.active {\n  background-color: #d4d2d4;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #d4d2d4), color-stop(100%, #cccacc));\n  background-image: -webkit-linear-gradient(top, #d4d2d4 0%, #cccacc 100%);\n  background-image: linear-gradient(to bottom, #d4d2d4 0%, #cccacc 100%);\n}\n.tab-item .icon-close-tab {\n  position: absolute;\n  top: 50%;\n  left: 5px;\n  width: 15px;\n  height: 15px;\n  font-size: 15px;\n  line-height: 15px;\n  text-align: center;\n  color: #666;\n  opacity: 0;\n  transition: opacity .1s linear, background-color .1s linear;\n  border-radius: 3px;\n  transform: translateY(-50%);\n  z-index: 10;\n}\n.tab-item:after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0.08);\n  opacity: 0;\n  transition: opacity .1s linear;\n  z-index: 1;\n}\n.tab-item:hover:not(.active):after {\n  opacity: 1;\n}\n.tab-item:hover .icon-close-tab {\n  opacity: 1;\n}\n.tab-item .icon-close-tab:hover {\n  background-color: rgba(0, 0, 0, 0.08);\n}\n\n.tab-item-fixed {\n  flex: none;\n  padding: 3px 10px;\n}\n",undefined);

const store = new Store({});

var app = new Component({
  target: document.body,
  store
});

return app;

}());
