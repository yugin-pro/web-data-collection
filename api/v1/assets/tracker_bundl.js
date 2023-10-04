function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _apiUrl = /*#__PURE__*/new WeakMap();
var _id = /*#__PURE__*/new WeakMap();
var yproTracker = /*#__PURE__*/function () {
  function yproTracker(configuration) {
    _classCallCheck(this, yproTracker);
    _classPrivateFieldInitSpec(this, _apiUrl, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _id, {
      writable: true,
      value: void 0
    });
    if (!yproTracker._instance) {
      this.apiUrl = '/web-data-collection/v1/collect';
      this.id = this.getTrackerId() || Math.random().toString(16).slice(2);
      this.setCookieId();
      yproTracker._instance = this;
    }
    return yproTracker._instance;
  }
  _createClass(yproTracker, [{
    key: "handleEvent",
    value: function handleEvent(event) {
      this.event(event.type);
    }
  }, {
    key: "setCookieId",
    value: function setCookieId() {
      this.setCookie('ypro', this.id, {
        secure: true,
        'max-age': 7776000
      });
    }
  }, {
    key: "getTrackerId",
    value: function getTrackerId() {
      return this.getCookie('ypro');
    }
  }, {
    key: "getCookie",
    value: function getCookie(name) {
      var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  }, {
    key: "setCookie",
    value: function setCookie(name, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options = _objectSpread({
        path: '/'
      }, options);
      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }
      var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      for (var optionKey in options) {
        updatedCookie += "; " + optionKey;
        var optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }
      document.cookie = updatedCookie;
    }
  }, {
    key: "currentId",
    get: function get() {
      return this.id + '.' + Date.now();
    }
  }, {
    key: "windowInfo",
    get: function get() {
      var browserWindowInfo = {};
      var browserWindowPropsList = ['innerHeight', 'innerWidth', 'outerHeight', 'outerWidth', 'pageXOffset', 'pageYOffset', 'scrollX', 'scrollY'];
      browserWindowPropsList.forEach(function (elem) {
        return browserWindowInfo[elem] = window[elem];
      });
      browserWindowInfo.statusbar = window.statusbar.visible || undefined;
      browserWindowInfo.toolbar = window.toolbar.visible || undefined;
      browserWindowInfo.styleMedia = window.styleMedia.visible || undefined;
      browserWindowInfo.scrollbars = window.scrollbars.visible || undefined;
      browserWindowInfo.personalbar = window.personalbar.visible || undefined;
      browserWindowInfo.performance = window.performance.timing;
      return JSON.stringify(browserWindowInfo);
    }
    //https://developers.google.com/tag-platform/gtagjs/reference?hl=ru
  }, {
    key: "event",
    value: function event(eventName) {
      var eventNameParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'X-track-event': eventName,
          'X-track-id': this.currentId,
          'X-track-winfo': this.windowInfo
        },
        body: JSON.stringify(eventNameParameters)
      });
    }
  }]);
  return yproTracker;
}();