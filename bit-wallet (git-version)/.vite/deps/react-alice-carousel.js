import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/vanilla-swipe/lib/types/index.js
var require_types = __commonJS({
  "node_modules/vanilla-swipe/lib/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TraceDirectionKey = exports.Direction = exports.Axis = void 0;
    var TraceDirectionKey;
    exports.TraceDirectionKey = TraceDirectionKey;
    (function(TraceDirectionKey2) {
      TraceDirectionKey2["NEGATIVE"] = "NEGATIVE";
      TraceDirectionKey2["POSITIVE"] = "POSITIVE";
      TraceDirectionKey2["NONE"] = "NONE";
    })(TraceDirectionKey || (exports.TraceDirectionKey = TraceDirectionKey = {}));
    var Direction;
    exports.Direction = Direction;
    (function(Direction2) {
      Direction2["TOP"] = "TOP";
      Direction2["LEFT"] = "LEFT";
      Direction2["RIGHT"] = "RIGHT";
      Direction2["BOTTOM"] = "BOTTOM";
      Direction2["NONE"] = "NONE";
    })(Direction || (exports.Direction = Direction = {}));
    var Axis;
    exports.Axis = Axis;
    (function(Axis2) {
      Axis2["X"] = "x";
      Axis2["Y"] = "y";
    })(Axis || (exports.Axis = Axis = {}));
  }
});

// node_modules/vanilla-swipe/lib/utils/calculateDirection.js
var require_calculateDirection = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/calculateDirection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calculateDirection = calculateDirection;
    var _types = require_types();
    function calculateDirection(trace) {
      var direction;
      var negative = _types.TraceDirectionKey.NEGATIVE;
      var positive = _types.TraceDirectionKey.POSITIVE;
      var current = trace[trace.length - 1];
      var previous = trace[trace.length - 2] || 0;
      if (trace.every(function(i) {
        return i === 0;
      })) {
        return _types.TraceDirectionKey.NONE;
      }
      direction = current > previous ? positive : negative;
      if (current === 0) {
        direction = previous < 0 ? positive : negative;
      }
      return direction;
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/common.js
var require_common = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resolveAxisDirection = exports.getDirectionValue = exports.getDirectionKey = exports.getDifference = void 0;
    var _types = require_types();
    var getDirectionKey = function getDirectionKey2() {
      var object = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = Object.keys(object).toString();
      switch (key) {
        case _types.TraceDirectionKey.POSITIVE:
          return _types.TraceDirectionKey.POSITIVE;
        case _types.TraceDirectionKey.NEGATIVE:
          return _types.TraceDirectionKey.NEGATIVE;
        default:
          return _types.TraceDirectionKey.NONE;
      }
    };
    exports.getDirectionKey = getDirectionKey;
    var getDirectionValue = function getDirectionValue2() {
      var values = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      return values[values.length - 1] || 0;
    };
    exports.getDirectionValue = getDirectionValue;
    var getDifference = function getDifference2() {
      var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return Math.abs(x - y);
    };
    exports.getDifference = getDifference;
    var resolveAxisDirection = function resolveAxisDirection2(axis, key) {
      var negative = _types.Direction.LEFT;
      var positive = _types.Direction.RIGHT;
      var direction = _types.Direction.NONE;
      if (axis === _types.Axis.Y) {
        negative = _types.Direction.BOTTOM;
        positive = _types.Direction.TOP;
      }
      if (key === _types.TraceDirectionKey.NEGATIVE) {
        direction = negative;
      }
      if (key === _types.TraceDirectionKey.POSITIVE) {
        direction = positive;
      }
      return direction;
    };
    exports.resolveAxisDirection = resolveAxisDirection;
  }
});

// node_modules/vanilla-swipe/lib/utils/calculateDirectionDelta.js
var require_calculateDirectionDelta = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/calculateDirectionDelta.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calculateDirectionDelta = calculateDirectionDelta;
    var _types = require_types();
    var _common = require_common();
    function calculateDirectionDelta(traceDirections) {
      var delta = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var length = traceDirections.length;
      var i = length - 1;
      var direction = _types.TraceDirectionKey.NONE;
      for (; i >= 0; i--) {
        var current = traceDirections[i];
        var currentKey = (0, _common.getDirectionKey)(current);
        var currentValue = (0, _common.getDirectionValue)(current[currentKey]);
        var prev = traceDirections[i - 1] || {};
        var prevKey = (0, _common.getDirectionKey)(prev);
        var prevValue = (0, _common.getDirectionValue)(prev[prevKey]);
        var difference = (0, _common.getDifference)(currentValue, prevValue);
        if (difference >= delta) {
          direction = currentKey;
          break;
        } else {
          direction = prevKey;
        }
      }
      return direction;
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/calculateDuration.js
var require_calculateDuration = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/calculateDuration.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calculateDuration = calculateDuration;
    function calculateDuration() {
      var prevTime = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var nextTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return prevTime ? nextTime - prevTime : 0;
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/calculateMovingPosition.js
var require_calculateMovingPosition = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/calculateMovingPosition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calculateMovingPosition = calculateMovingPosition;
    function calculateMovingPosition(e) {
      if ("changedTouches" in e) {
        var touches = e.changedTouches && e.changedTouches[0];
        return {
          x: touches && touches.clientX,
          y: touches && touches.clientY
        };
      }
      return {
        x: e.clientX,
        y: e.clientY
      };
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/updateTrace.js
var require_updateTrace = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/updateTrace.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.updateTrace = updateTrace;
    function updateTrace(trace, value) {
      var last = trace[trace.length - 1];
      if (last !== value) {
        trace.push(value);
      }
      return trace;
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/calculateTraceDirections.js
var require_calculateTraceDirections = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/calculateTraceDirections.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calculateTraceDirections = calculateTraceDirections;
    var _types = require_types();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function calculateTraceDirections() {
      var trace = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var ticks = [];
      var positive = _types.TraceDirectionKey.POSITIVE;
      var negative = _types.TraceDirectionKey.NEGATIVE;
      var i = 0;
      var tick = [];
      var direction = _types.TraceDirectionKey.NONE;
      for (; i < trace.length; i++) {
        var current = trace[i];
        var prev = trace[i - 1];
        if (tick.length) {
          var currentDirection = current > prev ? positive : negative;
          if (direction === _types.TraceDirectionKey.NONE) {
            direction = currentDirection;
          }
          if (currentDirection === direction) {
            tick.push(current);
          } else {
            ticks.push(_defineProperty({}, direction, tick.slice()));
            tick = [];
            tick.push(current);
            direction = currentDirection;
          }
        } else {
          if (current !== 0) {
            direction = current > 0 ? positive : negative;
          }
          tick.push(current);
        }
      }
      if (tick.length) {
        ticks.push(_defineProperty({}, direction, tick));
      }
      return ticks;
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/resolveDirection.js
var require_resolveDirection = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/resolveDirection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resolveDirection = resolveDirection;
    var _calculateDirection = require_calculateDirection();
    var _calculateTraceDirections = require_calculateTraceDirections();
    var _calculateDirectionDelta = require_calculateDirectionDelta();
    var _common = require_common();
    var _types = require_types();
    function resolveDirection(trace) {
      var axis = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _types.Axis.X;
      var directionDelta = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      if (directionDelta) {
        var directions = (0, _calculateTraceDirections.calculateTraceDirections)(trace);
        var _direction = (0, _calculateDirectionDelta.calculateDirectionDelta)(directions, directionDelta);
        return (0, _common.resolveAxisDirection)(axis, _direction);
      }
      var direction = (0, _calculateDirection.calculateDirection)(trace);
      return (0, _common.resolveAxisDirection)(axis, direction);
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/calculateVelocity.js
var require_calculateVelocity = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/calculateVelocity.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calculateVelocity = calculateVelocity;
    function calculateVelocity(x, y, time) {
      var magnitude = Math.sqrt(x * x + y * y);
      return magnitude / (time || 1);
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/calculatePosition.js
var require_calculatePosition = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/calculatePosition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calculatePosition = calculatePosition;
    var _updateTrace = require_updateTrace();
    var _resolveDirection = require_resolveDirection();
    var _calculateDuration = require_calculateDuration();
    var _calculateVelocity = require_calculateVelocity();
    var _types = require_types();
    function calculatePosition(state, options) {
      var start = state.start, x = state.x, y = state.y, traceX = state.traceX, traceY = state.traceY;
      var rotatePosition = options.rotatePosition, directionDelta = options.directionDelta;
      var deltaX = rotatePosition.x - x;
      var deltaY = y - rotatePosition.y;
      var absX = Math.abs(deltaX);
      var absY = Math.abs(deltaY);
      (0, _updateTrace.updateTrace)(traceX, deltaX);
      (0, _updateTrace.updateTrace)(traceY, deltaY);
      var directionX = (0, _resolveDirection.resolveDirection)(traceX, _types.Axis.X, directionDelta);
      var directionY = (0, _resolveDirection.resolveDirection)(traceY, _types.Axis.Y, directionDelta);
      var duration = (0, _calculateDuration.calculateDuration)(start, Date.now());
      var velocity = (0, _calculateVelocity.calculateVelocity)(absX, absY, duration);
      return {
        absX,
        absY,
        deltaX,
        deltaY,
        directionX,
        directionY,
        duration,
        positionX: rotatePosition.x,
        positionY: rotatePosition.y,
        velocity
      };
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/checkIsMoreThanSingleTouches.js
var require_checkIsMoreThanSingleTouches = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/checkIsMoreThanSingleTouches.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.checkIsMoreThanSingleTouches = void 0;
    var checkIsMoreThanSingleTouches = function checkIsMoreThanSingleTouches2(e) {
      return Boolean(e.touches && e.touches.length > 1);
    };
    exports.checkIsMoreThanSingleTouches = checkIsMoreThanSingleTouches;
  }
});

// node_modules/vanilla-swipe/lib/utils/createOptions.js
var require_createOptions = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/createOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.createOptions = createOptions;
    function createOptions() {
      var proxy = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      Object.defineProperty(proxy, "passive", {
        get: function get() {
          this.isPassiveSupported = true;
          return true;
        },
        enumerable: true
      });
      return proxy;
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/checkIsPassiveSupported.js
var require_checkIsPassiveSupported = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/checkIsPassiveSupported.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.checkIsPassiveSupported = checkIsPassiveSupported;
    exports.noop = void 0;
    var _createOptions = require_createOptions();
    function checkIsPassiveSupported(isPassiveSupported) {
      if (typeof isPassiveSupported === "boolean") {
        return isPassiveSupported;
      }
      var proxy = {
        isPassiveSupported
      };
      try {
        var options = (0, _createOptions.createOptions)(proxy);
        window.addEventListener("checkIsPassiveSupported", noop, options);
        window.removeEventListener("checkIsPassiveSupported", noop, options);
      } catch (err) {
      }
      return proxy.isPassiveSupported;
    }
    var noop = function noop2() {
    };
    exports.noop = noop;
  }
});

// node_modules/vanilla-swipe/lib/utils/checkIsTouchEventsSupported.js
var require_checkIsTouchEventsSupported = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/checkIsTouchEventsSupported.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.checkIsTouchEventsSupported = void 0;
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    var checkIsTouchEventsSupported = function checkIsTouchEventsSupported2() {
      return (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && ("ontouchstart" in window || Boolean(window.navigator.maxTouchPoints));
    };
    exports.checkIsTouchEventsSupported = checkIsTouchEventsSupported;
  }
});

// node_modules/vanilla-swipe/lib/utils/getInitialState.js
var require_getInitialState = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/getInitialState.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getInitialState = void 0;
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var getInitialState = function getInitialState2() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return _objectSpread({
        x: 0,
        y: 0,
        start: 0,
        isSwiping: false,
        traceX: [],
        traceY: []
      }, options);
    };
    exports.getInitialState = getInitialState;
  }
});

// node_modules/vanilla-swipe/lib/utils/getInitialProps.js
var require_getInitialProps = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/getInitialProps.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getInitialProps = void 0;
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var getInitialProps = function getInitialProps2() {
      var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return _objectSpread({
        element: null,
        target: null,
        delta: 10,
        directionDelta: 0,
        rotationAngle: 0,
        mouseTrackingEnabled: false,
        touchTrackingEnabled: true,
        preventDefaultTouchmoveEvent: false,
        preventTrackingOnMouseleave: false
      }, props);
    };
    exports.getInitialProps = getInitialProps;
  }
});

// node_modules/vanilla-swipe/lib/utils/getOptions.js
var require_getOptions = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/getOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getOptions = getOptions;
    function getOptions() {
      var isPassiveSupported = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (isPassiveSupported) {
        return {
          passive: false
        };
      }
      return {};
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/rotateByAngle.js
var require_rotateByAngle = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/rotateByAngle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.rotateByAngle = rotateByAngle;
    function rotateByAngle(position) {
      var angle = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (angle === 0) {
        return position;
      }
      var x = position.x, y = position.y;
      var angleInRadians = Math.PI / 180 * angle;
      var rotatedX = x * Math.cos(angleInRadians) + y * Math.sin(angleInRadians);
      var rotatedY = y * Math.cos(angleInRadians) - x * Math.sin(angleInRadians);
      return {
        x: rotatedX,
        y: rotatedY
      };
    }
  }
});

// node_modules/vanilla-swipe/lib/utils/index.js
var require_utils = __commonJS({
  "node_modules/vanilla-swipe/lib/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _calculateDirection = require_calculateDirection();
    Object.keys(_calculateDirection).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _calculateDirection[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _calculateDirection[key];
        }
      });
    });
    var _calculateDirectionDelta = require_calculateDirectionDelta();
    Object.keys(_calculateDirectionDelta).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _calculateDirectionDelta[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _calculateDirectionDelta[key];
        }
      });
    });
    var _calculateDuration = require_calculateDuration();
    Object.keys(_calculateDuration).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _calculateDuration[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _calculateDuration[key];
        }
      });
    });
    var _calculateMovingPosition = require_calculateMovingPosition();
    Object.keys(_calculateMovingPosition).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _calculateMovingPosition[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _calculateMovingPosition[key];
        }
      });
    });
    var _calculatePosition = require_calculatePosition();
    Object.keys(_calculatePosition).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _calculatePosition[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _calculatePosition[key];
        }
      });
    });
    var _calculateTraceDirections = require_calculateTraceDirections();
    Object.keys(_calculateTraceDirections).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _calculateTraceDirections[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _calculateTraceDirections[key];
        }
      });
    });
    var _calculateVelocity = require_calculateVelocity();
    Object.keys(_calculateVelocity).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _calculateVelocity[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _calculateVelocity[key];
        }
      });
    });
    var _checkIsMoreThanSingleTouches = require_checkIsMoreThanSingleTouches();
    Object.keys(_checkIsMoreThanSingleTouches).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _checkIsMoreThanSingleTouches[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _checkIsMoreThanSingleTouches[key];
        }
      });
    });
    var _checkIsPassiveSupported = require_checkIsPassiveSupported();
    Object.keys(_checkIsPassiveSupported).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _checkIsPassiveSupported[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _checkIsPassiveSupported[key];
        }
      });
    });
    var _checkIsTouchEventsSupported = require_checkIsTouchEventsSupported();
    Object.keys(_checkIsTouchEventsSupported).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _checkIsTouchEventsSupported[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _checkIsTouchEventsSupported[key];
        }
      });
    });
    var _common = require_common();
    Object.keys(_common).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _common[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _common[key];
        }
      });
    });
    var _createOptions = require_createOptions();
    Object.keys(_createOptions).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _createOptions[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _createOptions[key];
        }
      });
    });
    var _getInitialState = require_getInitialState();
    Object.keys(_getInitialState).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _getInitialState[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _getInitialState[key];
        }
      });
    });
    var _getInitialProps = require_getInitialProps();
    Object.keys(_getInitialProps).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _getInitialProps[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _getInitialProps[key];
        }
      });
    });
    var _getOptions = require_getOptions();
    Object.keys(_getOptions).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _getOptions[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _getOptions[key];
        }
      });
    });
    var _resolveDirection = require_resolveDirection();
    Object.keys(_resolveDirection).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _resolveDirection[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _resolveDirection[key];
        }
      });
    });
    var _rotateByAngle = require_rotateByAngle();
    Object.keys(_rotateByAngle).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _rotateByAngle[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _rotateByAngle[key];
        }
      });
    });
    var _updateTrace = require_updateTrace();
    Object.keys(_updateTrace).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (key in exports && exports[key] === _updateTrace[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _updateTrace[key];
        }
      });
    });
  }
});

// node_modules/vanilla-swipe/lib/index.js
var require_lib = __commonJS({
  "node_modules/vanilla-swipe/lib/index.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _exportNames = {};
    exports["default"] = void 0;
    var Utils = _interopRequireWildcard(require_utils());
    var _types = require_types();
    Object.keys(_types).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _types[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
          return _types[key];
        }
      });
    });
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var VanillaSwipe = function() {
      function VanillaSwipe2(props) {
        _classCallCheck(this, VanillaSwipe2);
        _defineProperty(this, "state", void 0);
        _defineProperty(this, "props", void 0);
        this.state = Utils.getInitialState();
        this.props = Utils.getInitialProps(props);
        this.handleSwipeStart = this.handleSwipeStart.bind(this);
        this.handleSwipeMove = this.handleSwipeMove.bind(this);
        this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
      }
      _createClass(VanillaSwipe2, [{
        key: "init",
        value: function init() {
          this.setupTouchListeners();
          this.setupMouseListeners();
        }
      }, {
        key: "update",
        value: function update(props) {
          var prevProps = this.props;
          var nextProps = Object.assign({}, prevProps, props);
          if (prevProps.element !== nextProps.element || prevProps.target !== nextProps.target) {
            this.destroy();
            this.props = nextProps;
            this.init();
            return;
          }
          this.props = nextProps;
          if (prevProps.mouseTrackingEnabled !== nextProps.mouseTrackingEnabled || prevProps.preventTrackingOnMouseleave !== nextProps.preventTrackingOnMouseleave) {
            this.cleanupMouseListeners();
            nextProps.mouseTrackingEnabled ? this.setupMouseListeners() : this.cleanupMouseListeners();
          }
          if (prevProps.touchTrackingEnabled !== nextProps.touchTrackingEnabled) {
            this.cleanupTouchListeners();
            nextProps.touchTrackingEnabled ? this.setupTouchListeners() : this.cleanupTouchListeners();
          }
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.cleanupMouseListeners();
          this.cleanupTouchListeners();
          this.state = Utils.getInitialState();
          this.props = Utils.getInitialProps();
        }
      }, {
        key: "setupTouchListeners",
        value: function setupTouchListeners() {
          var _this$props = this.props, element = _this$props.element, target = _this$props.target, touchTrackingEnabled = _this$props.touchTrackingEnabled;
          if (element && touchTrackingEnabled) {
            var listener = target || element;
            var isPassiveSupported = Utils.checkIsPassiveSupported();
            var options = Utils.getOptions(isPassiveSupported);
            listener.addEventListener("touchstart", this.handleSwipeStart, options);
            listener.addEventListener("touchmove", this.handleSwipeMove, options);
            listener.addEventListener("touchend", this.handleSwipeEnd, options);
          }
        }
      }, {
        key: "cleanupTouchListeners",
        value: function cleanupTouchListeners() {
          var _this$props2 = this.props, element = _this$props2.element, target = _this$props2.target;
          var listener = target || element;
          if (listener) {
            listener.removeEventListener("touchstart", this.handleSwipeStart);
            listener.removeEventListener("touchmove", this.handleSwipeMove);
            listener.removeEventListener("touchend", this.handleSwipeEnd);
          }
        }
      }, {
        key: "setupMouseListeners",
        value: function setupMouseListeners() {
          var _this$props3 = this.props, element = _this$props3.element, mouseTrackingEnabled = _this$props3.mouseTrackingEnabled, preventTrackingOnMouseleave = _this$props3.preventTrackingOnMouseleave;
          if (mouseTrackingEnabled && element) {
            element.addEventListener("mousedown", this.handleMouseDown);
            element.addEventListener("mousemove", this.handleMouseMove);
            element.addEventListener("mouseup", this.handleMouseUp);
            if (preventTrackingOnMouseleave) {
              element.addEventListener("mouseleave", this.handleMouseLeave);
            }
          }
        }
      }, {
        key: "cleanupMouseListeners",
        value: function cleanupMouseListeners() {
          var element = this.props.element;
          if (element) {
            element.removeEventListener("mousedown", this.handleMouseDown);
            element.removeEventListener("mousemove", this.handleMouseMove);
            element.removeEventListener("mouseup", this.handleMouseUp);
            element.removeEventListener("mouseleave", this.handleMouseLeave);
          }
        }
      }, {
        key: "getEventData",
        value: function getEventData(e) {
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
            directionDelta: 0
          };
          var rotationAngle = this.props.rotationAngle;
          var directionDelta = options.directionDelta;
          var movingPosition = Utils.calculateMovingPosition(e);
          var rotatePosition = Utils.rotateByAngle(movingPosition, rotationAngle);
          return Utils.calculatePosition(this.state, {
            rotatePosition,
            directionDelta
          });
        }
      }, {
        key: "handleSwipeStart",
        value: function handleSwipeStart(e) {
          if (Utils.checkIsMoreThanSingleTouches(e)) return;
          var rotationAngle = this.props.rotationAngle;
          var movingPosition = Utils.calculateMovingPosition(e);
          var _Utils$rotateByAngle = Utils.rotateByAngle(movingPosition, rotationAngle), x = _Utils$rotateByAngle.x, y = _Utils$rotateByAngle.y;
          this.state = Utils.getInitialState({
            isSwiping: false,
            start: Date.now(),
            x,
            y
          });
        }
      }, {
        key: "handleSwipeMove",
        value: function handleSwipeMove(e) {
          var _this$state = this.state, x = _this$state.x, y = _this$state.y, isSwiping = _this$state.isSwiping;
          if (!x || !y || Utils.checkIsMoreThanSingleTouches(e)) return;
          var directionDelta = this.props.directionDelta || 0;
          var _this$getEventData = this.getEventData(e, {
            directionDelta
          }), absX = _this$getEventData.absX, absY = _this$getEventData.absY, deltaX = _this$getEventData.deltaX, deltaY = _this$getEventData.deltaY, directionX = _this$getEventData.directionX, directionY = _this$getEventData.directionY, duration = _this$getEventData.duration, velocity = _this$getEventData.velocity;
          var _this$props4 = this.props, delta = _this$props4.delta, preventDefaultTouchmoveEvent = _this$props4.preventDefaultTouchmoveEvent, onSwipeStart = _this$props4.onSwipeStart, onSwiping = _this$props4.onSwiping;
          if (e.cancelable && preventDefaultTouchmoveEvent) e.preventDefault();
          if (absX < Number(delta) && absY < Number(delta) && !isSwiping) return;
          if (onSwipeStart && !isSwiping) {
            onSwipeStart(e, {
              deltaX,
              deltaY,
              absX,
              absY,
              directionX,
              directionY,
              duration,
              velocity
            });
          }
          this.state.isSwiping = true;
          if (onSwiping) {
            onSwiping(e, {
              deltaX,
              deltaY,
              absX,
              absY,
              directionX,
              directionY,
              duration,
              velocity
            });
          }
        }
      }, {
        key: "handleSwipeEnd",
        value: function handleSwipeEnd(e) {
          var _this$props5 = this.props, onSwiped = _this$props5.onSwiped, onTap = _this$props5.onTap;
          if (this.state.isSwiping) {
            var directionDelta = this.props.directionDelta || 0;
            var position = this.getEventData(e, {
              directionDelta
            });
            onSwiped && onSwiped(e, position);
          } else {
            var _position = this.getEventData(e);
            onTap && onTap(e, _position);
          }
          this.state = Utils.getInitialState();
        }
      }, {
        key: "handleMouseDown",
        value: function handleMouseDown(e) {
          var target = this.props.target;
          if (target) {
            if (target === e.target) {
              this.handleSwipeStart(e);
            }
          } else {
            this.handleSwipeStart(e);
          }
        }
      }, {
        key: "handleMouseMove",
        value: function handleMouseMove(e) {
          this.handleSwipeMove(e);
        }
      }, {
        key: "handleMouseUp",
        value: function handleMouseUp(e) {
          var isSwiping = this.state.isSwiping;
          var target = this.props.target;
          if (target) {
            if (target === e.target || isSwiping) {
              this.handleSwipeEnd(e);
            }
          } else {
            this.handleSwipeEnd(e);
          }
        }
      }, {
        key: "handleMouseLeave",
        value: function handleMouseLeave(e) {
          var isSwiping = this.state.isSwiping;
          if (isSwiping) {
            this.handleSwipeEnd(e);
          }
        }
      }], [{
        key: "isTouchEventsSupported",
        value: function isTouchEventsSupported() {
          return Utils.checkIsTouchEventsSupported();
        }
      }]);
      return VanillaSwipe2;
    }();
    exports["default"] = VanillaSwipe;
  }
});

// node_modules/react-alice-carousel/lib/types/index.js
var require_types2 = __commonJS({
  "node_modules/react-alice-carousel/lib/types/index.js"(exports) {
    "use strict";
    var EventType;
    var AnimationType;
    var AutoPlayStrategy;
    var ControlsStrategy;
    var AutoplayDirection;
    var Classnames;
    var Modifiers;
    Object.defineProperty(exports, "__esModule", { value: true }), exports.Modifiers = exports.Classnames = exports.AutoplayDirection = exports.ControlsStrategy = exports.AutoPlayStrategy = exports.AnimationType = exports.EventType = void 0, function(e) {
      e.ACTION = "action", e.INIT = "init", e.RESIZE = "resize", e.UPDATE = "update";
    }(EventType = exports.EventType || (exports.EventType = {})), function(e) {
      e.FADEOUT = "fadeout", e.SLIDE = "slide";
    }(AnimationType = exports.AnimationType || (exports.AnimationType = {})), function(e) {
      e.DEFAULT = "default", e.ALL = "all", e.ACTION = "action", e.NONE = "none";
    }(AutoPlayStrategy = exports.AutoPlayStrategy || (exports.AutoPlayStrategy = {})), function(e) {
      e.DEFAULT = "default", e.ALTERNATE = "alternate", e.RESPONSIVE = "responsive";
    }(ControlsStrategy = exports.ControlsStrategy || (exports.ControlsStrategy = {})), function(e) {
      e.RTL = "rtl", e.LTR = "ltr";
    }(AutoplayDirection = exports.AutoplayDirection || (exports.AutoplayDirection = {})), function(e) {
      e.ANIMATED = "animated animated-out fadeOut", e.ROOT = "alice-carousel", e.WRAPPER = "alice-carousel__wrapper", e.STAGE = "alice-carousel__stage", e.STAGE_ITEM = "alice-carousel__stage-item", e.DOTS = "alice-carousel__dots", e.DOTS_ITEM = "alice-carousel__dots-item", e.PLAY_BTN = "alice-carousel__play-btn", e.PLAY_BTN_ITEM = "alice-carousel__play-btn-item", e.PLAY_BTN_WRAPPER = "alice-carousel__play-btn-wrapper", e.SLIDE_INFO = "alice-carousel__slide-info", e.SLIDE_INFO_ITEM = "alice-carousel__slide-info-item", e.BUTTON_PREV = "alice-carousel__prev-btn", e.BUTTON_PREV_WRAPPER = "alice-carousel__prev-btn-wrapper", e.BUTTON_PREV_ITEM = "alice-carousel__prev-btn-item", e.BUTTON_NEXT = "alice-carousel__next-btn", e.BUTTON_NEXT_WRAPPER = "alice-carousel__next-btn-wrapper", e.BUTTON_NEXT_ITEM = "alice-carousel__next-btn-item";
    }(Classnames = exports.Classnames || (exports.Classnames = {})), function(e) {
      e.ACTIVE = "__active", e.INACTIVE = "__inactive", e.CLONED = "__cloned", e.CUSTOM = "__custom", e.PAUSE = "__pause", e.SEPARATOR = "__separator", e.SSR = "__ssr", e.TARGET = "__target";
    }(Modifiers = exports.Modifiers || (exports.Modifiers = {}));
  }
});

// node_modules/react-alice-carousel/lib/defaultProps.js
var require_defaultProps = __commonJS({
  "node_modules/react-alice-carousel/lib/defaultProps.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true }), exports.defaultProps = void 0;
    var types_1 = require_types2();
    exports.defaultProps = { activeIndex: 0, animationDuration: 400, animationEasingFunction: "ease", animationType: types_1.AnimationType.SLIDE, autoHeight: false, autoWidth: false, autoPlay: false, autoPlayControls: false, autoPlayDirection: types_1.AutoplayDirection.LTR, autoPlayInterval: 400, autoPlayStrategy: types_1.AutoPlayStrategy.DEFAULT, children: void 0, controlsStrategy: types_1.ControlsStrategy.DEFAULT, disableButtonsControls: false, disableDotsControls: false, disableSlideInfo: true, infinite: false, innerWidth: void 0, items: void 0, keyboardNavigation: false, mouseTracking: false, syncStateOnPropsUpdate: true, name: "", paddingLeft: 0, paddingRight: 0, responsive: void 0, swipeDelta: 20, swipeExtraPadding: 200, ssrSilentMode: true, touchTracking: true, touchMoveDefaultEvents: true, onInitialized: function() {
    }, onResized: function() {
    }, onUpdated: function() {
    }, onResizeEvent: void 0, onSlideChange: function() {
    }, onSlideChanged: function() {
    } };
  }
});

// node_modules/react-alice-carousel/lib/views/Link.js
var require_Link = __commonJS({
  "node_modules/react-alice-carousel/lib/views/Link.js"(exports) {
    "use strict";
    var __assign = function() {
      return (__assign = Object.assign || function(e) {
        for (var n, t = 1, r = arguments.length; t < r; t++) for (var u in n = arguments[t]) Object.prototype.hasOwnProperty.call(n, u) && (e[u] = n[u]);
        return e;
      }).apply(this, arguments);
    };
    var __importDefault = function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    var react_1 = (Object.defineProperty(exports, "__esModule", { value: true }), __importDefault(require_react()));
    function Link(e) {
      var n = { xDown: null, xUp: null };
      return react_1.default.createElement("a", __assign({ onClick: function(e2) {
        n.xDown !== n.xUp && e2.preventDefault();
      }, onMouseDown: function(e2) {
        e2.preventDefault(), n.xUp = null, n.xDown = e2.clientX;
      }, onMouseUp: function(e2) {
        e2.preventDefault(), n.xUp = e2.clientX;
      } }, e), e.children);
    }
    exports.default = Link;
  }
});

// node_modules/react-alice-carousel/lib/utils/mappers.js
var require_mappers = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/mappers.js"(exports) {
    "use strict";
    var __assign = function() {
      return (__assign = Object.assign || function(o) {
        for (var t, r = 1, i = arguments.length; r < i; r++) for (var s in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, s) && (o[s] = t[s]);
        return o;
      }).apply(this, arguments);
    };
    var mapPartialCoords = (Object.defineProperty(exports, "__esModule", { value: true }), exports.mapPositionCoords = exports.mapPartialCoords = void 0, function(o) {
      return o.map(function(o2) {
        return { width: o2.width, position: 0 };
      });
    });
    var mapPositionCoords = (exports.mapPartialCoords = mapPartialCoords, function(o, t) {
      return void 0 === t && (t = 0), o.map(function(o2) {
        return o2.position > t ? __assign(__assign({}, o2), { position: t }) : o2;
      });
    });
    exports.mapPositionCoords = mapPositionCoords;
  }
});

// node_modules/react-alice-carousel/lib/utils/math.js
var require_math = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/math.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true }), exports.isVerticalTouchmoveDetected = exports.getFadeoutAnimationPosition = exports.getFadeoutAnimationIndex = exports.getSwipeTouchendIndex = exports.getSwipeTouchendPosition = exports.getSwipeTransformationCursor = exports.getTransformationItemIndex = exports.getSwipeShiftValue = exports.getItemCoords = exports.getIsLeftDirection = exports.shouldRecalculateSwipePosition = exports.getSwipeLimitMax = exports.getSwipeLimitMin = exports.shouldCancelSlideAnimation = exports.shouldRecalculateSlideIndex = exports.getUpdateSlidePositionIndex = exports.getActiveIndex = exports.getStartIndex = exports.getShiftIndex = void 0;
    var getShiftIndex = function(e, t) {
      return (e = void 0 === e ? 0 : e) + (t = void 0 === t ? 0 : t);
    };
    var getStartIndex = (exports.getShiftIndex = getShiftIndex, function(e, t) {
      if (void 0 === e && (e = 0), t = void 0 === t ? 0 : t) {
        if (t <= e) return t - 1;
        if (0 < e) return e;
      }
      return 0;
    });
    var getActiveIndex = (exports.getStartIndex = getStartIndex, function(e) {
      var t = e.startIndex, t = void 0 === t ? 0 : t, i = e.itemsCount, e = e.infinite;
      return void 0 !== e && e ? t : (0, exports.getStartIndex)(t, void 0 === i ? 0 : i);
    });
    var getUpdateSlidePositionIndex = (exports.getActiveIndex = getActiveIndex, function(e, t) {
      return e < 0 ? t - 1 : t <= e ? 0 : e;
    });
    var shouldRecalculateSlideIndex = (exports.getUpdateSlidePositionIndex = getUpdateSlidePositionIndex, function(e, t) {
      return e < 0 || t <= e;
    });
    var shouldCancelSlideAnimation = (exports.shouldRecalculateSlideIndex = shouldRecalculateSlideIndex, function(e, t) {
      return e < 0 || t <= e;
    });
    var getSwipeLimitMin = (exports.shouldCancelSlideAnimation = shouldCancelSlideAnimation, function(e, t) {
      var i = e.itemsOffset, e = e.transformationSet, e = void 0 === e ? [] : e, o = t.infinite, t = t.swipeExtraPadding;
      return o ? (e[void 0 === i ? 0 : i] || {}).position : (o = (e[0] || {}).width, Math.min(void 0 === t ? 0 : t, void 0 === o ? 0 : o));
    });
    var getSwipeLimitMax = (exports.getSwipeLimitMin = getSwipeLimitMin, function(e, t) {
      var i = t.infinite, t = t.swipeExtraPadding, t = void 0 === t ? 0 : t, o = e.itemsCount, n = e.itemsOffset, r = e.itemsInSlide, r = void 0 === r ? 1 : r, e = e.transformationSet, e = void 0 === e ? [] : e;
      return i ? (e[(void 0 === o ? 1 : o) + (0, exports.getShiftIndex)(r, void 0 === n ? 0 : n)] || {}).position || 0 : (0, exports.getItemCoords)(-r, e).position + t;
    });
    var shouldRecalculateSwipePosition = (exports.getSwipeLimitMax = getSwipeLimitMax, function(e, t, i) {
      return -t <= e || Math.abs(e) >= i;
    });
    var getIsLeftDirection = (exports.shouldRecalculateSwipePosition = shouldRecalculateSwipePosition, function(e) {
      return (e = void 0 === e ? 0 : e) < 0;
    });
    var getItemCoords = (exports.getIsLeftDirection = getIsLeftDirection, function(e, t) {
      return (t = void 0 === t ? [] : t).slice(e = void 0 === e ? 0 : e)[0] || { position: 0, width: 0 };
    });
    var getSwipeShiftValue = (exports.getItemCoords = getItemCoords, function(e, t) {
      return void 0 === e && (e = 0), void 0 === t && (t = []), (0, exports.getItemCoords)(e, t).position;
    });
    var getTransformationItemIndex = (exports.getSwipeShiftValue = getSwipeShiftValue, function(e, t) {
      return void 0 === t && (t = 0), (e = void 0 === e ? [] : e).findIndex(function(e2) {
        return e2.position >= Math.abs(t);
      });
    });
    var getSwipeTransformationCursor = (exports.getTransformationItemIndex = getTransformationItemIndex, function(e, t, i) {
      void 0 === e && (e = []), void 0 === t && (t = 0), void 0 === i && (i = 0);
      e = (0, exports.getTransformationItemIndex)(e, t);
      return (0, exports.getIsLeftDirection)(i) ? e : e - 1;
    });
    var getSwipeTouchendPosition = (exports.getSwipeTransformationCursor = getSwipeTransformationCursor, function(e, t, i) {
      void 0 === i && (i = 0);
      var o = e.infinite, n = e.autoWidth, r = e.isStageContentPartial, s = e.swipeAllowedPositionMax, e = e.transformationSet, i = (0, exports.getSwipeTransformationCursor)(e, i, t), t = (0, exports.getItemCoords)(i, e).position;
      if (!o) {
        if (n && r) return 0;
        if (s < t) return -s;
      }
      return -t;
    });
    var getSwipeTouchendIndex = (exports.getSwipeTouchendPosition = getSwipeTouchendPosition, function(e, t) {
      var i = t.transformationSet, o = t.itemsInSlide, n = t.itemsOffset, r = t.itemsCount, s = t.infinite, d = t.isStageContentPartial, a = t.activeIndex, t = t.translate3d;
      return s || !d && t !== Math.abs(e) ? (d = (0, exports.getTransformationItemIndex)(i, e), s ? d < (t = (0, exports.getShiftIndex)(o, n)) ? r - o - n + d : t + r <= d ? d - (t + r) : d - t : d) : a;
    });
    var getFadeoutAnimationIndex = (exports.getSwipeTouchendIndex = getSwipeTouchendIndex, function(e) {
      var t = e.infinite, i = e.activeIndex, e = e.itemsInSlide;
      return t ? i + e : i;
    });
    var getFadeoutAnimationPosition = (exports.getFadeoutAnimationIndex = getFadeoutAnimationIndex, function(e, t) {
      var i = t.activeIndex, t = t.stageWidth;
      return e < i ? (i - e) * -t || 0 : (e - i) * t || 0;
    });
    var isVerticalTouchmoveDetected = (exports.getFadeoutAnimationPosition = getFadeoutAnimationPosition, function(e, t, i) {
      return e < (i = void 0 === i ? 0 : i) || e < 0.1 * t;
    });
    exports.isVerticalTouchmoveDetected = isVerticalTouchmoveDetected;
  }
});

// node_modules/react-alice-carousel/lib/utils/elements.js
var require_elements = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/elements.js"(exports) {
    "use strict";
    var __assign = function() {
      return (__assign = Object.assign || function(t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t;
      }).apply(this, arguments);
    };
    var mappers_1 = (Object.defineProperty(exports, "__esModule", { value: true }), exports.getItemsInSlide = exports.canUseDOM = exports.getTransformMatrix = exports.getTranslateXProperty = exports.getTouchmoveTranslatePosition = exports.getTranslate3dProperty = exports.getRenderStageItemStyles = exports.getRenderStageStyles = exports.getTransitionProperty = exports.getRenderWrapperStyles = exports.animate = exports.shouldHandleResizeEvent = exports.getElementFirstChild = exports.getElementCursor = exports.getAutoheightProperty = exports.getElementDimensions = exports.getItemWidth = exports.createDefaultTransformationSet = exports.createAutowidthTransformationSet = exports.isElement = exports.createClones = exports.getItemsOffset = exports.getItemsCount = exports.getSlides = void 0, require_mappers());
    var math_1 = require_math();
    var getSlides = function(t) {
      var e = t.children, t = t.items;
      return e ? e.length ? e : [e] : void 0 === t ? [] : t;
    };
    var getItemsCount = (exports.getSlides = getSlides, function(t) {
      return (0, exports.getSlides)(t).length;
    });
    var getItemsOffset = (exports.getItemsCount = getItemsCount, function(t) {
      var e = t.infinite, n = t.paddingRight, t = t.paddingLeft;
      return e && (t || n) ? 1 : 0;
    });
    var createClones = (exports.getItemsOffset = getItemsOffset, function(t) {
      var e, n, r, o, i = (0, exports.getSlides)(t);
      return t.infinite ? (e = (0, exports.getItemsCount)(t), o = (0, exports.getItemsOffset)(t), t = (0, exports.getItemsInSlide)(e, t), r = Math.min(t, e) + o, n = i.slice(0, r), r = i.slice(-r), o && t === e && (o = i[0], t = i.slice(-1)[0], r.unshift(t), n.push(o)), r.concat(i, n)) : i;
    });
    var isElement = (exports.createClones = createClones, function(t) {
      try {
        return t instanceof Element || t instanceof HTMLDocument;
      } catch (t2) {
        return false;
      }
    });
    var createAutowidthTransformationSet = (exports.isElement = isElement, function(t, i, e) {
      void 0 === i && (i = 0), void 0 === e && (e = false);
      var s = 0, a = true, n = [];
      return (0, exports.isElement)(t) && (n = Array.from((null == t ? void 0 : t.children) || []).reduce(function(t2, e2, n2) {
        var r = 0, n2 = n2 - 1, o = t2[n2], e2 = getElementDimensions(null == e2 ? void 0 : e2.firstChild).width, e2 = void 0 === e2 ? 0 : e2;
        return a = (s += e2) <= i, o && (r = 0 == n2 ? o.width : o.width + o.position), t2.push({ position: r, width: e2 }), t2;
      }, []), e || (n = a ? (0, mappers_1.mapPartialCoords)(n) : (t = s - i, (0, mappers_1.mapPositionCoords)(n, t)))), { coords: n, content: s, partial: a };
    });
    var createDefaultTransformationSet = (exports.createAutowidthTransformationSet = createAutowidthTransformationSet, function(t, o, e, n) {
      void 0 === n && (n = false);
      var i = 0, s = true, r = [], a = (0, exports.getItemWidth)(o, e);
      return r = t.reduce(function(t2, e2, n2) {
        var r2 = 0, n2 = t2[n2 - 1];
        return s = (i += a) <= o, n2 && (r2 = a + n2.position || 0), t2.push({ width: a, position: r2 }), t2;
      }, []), { coords: r = n ? r : s ? (0, mappers_1.mapPartialCoords)(r) : (e = i - o, (0, mappers_1.mapPositionCoords)(r, e)), content: i, partial: s };
    });
    var getItemWidth = (exports.createDefaultTransformationSet = createDefaultTransformationSet, function(t, e) {
      return 0 < e ? t / e : t;
    });
    function getElementDimensions(t) {
      return t && t.getBoundingClientRect ? { width: (t = t.getBoundingClientRect()).width, height: t.height } : { width: 0, height: 0 };
    }
    exports.getItemWidth = getItemWidth, exports.getElementDimensions = getElementDimensions;
    var getAutoheightProperty = function(t, e, n) {
      var e = (0, exports.getElementCursor)(e, n), n = (0, exports.getElementFirstChild)(t, e);
      if ((0, exports.isElement)(n)) return t = window.getComputedStyle(n), e = parseFloat(t.marginTop), t = parseFloat(t.marginBottom), Math.ceil(n.offsetHeight + e + t);
    };
    var getElementCursor = (exports.getAutoheightProperty = getAutoheightProperty, function(t, e) {
      var n = e.activeIndex, e = e.itemsInSlide;
      return t.infinite ? n + e + (0, exports.getItemsOffset)(t) : n;
    });
    var getElementFirstChild = (exports.getElementCursor = getElementCursor, function(t, e) {
      t = t && t.children || [];
      return t[e] && t[e].firstChild || null;
    });
    function shouldHandleResizeEvent(t, e, n) {
      return (e = void 0 === e ? {} : e).width !== (n = void 0 === n ? {} : n).width;
    }
    function animate(t, e) {
      var e = e || {}, n = e.position, n = void 0 === n ? 0 : n, r = e.animationDuration, r = void 0 === r ? 0 : r, e = e.animationEasingFunction, e = void 0 === e ? "ease" : e;
      return t && (0, exports.isElement)(t) && (t.style.transition = "transform ".concat(r, "ms ").concat(e, " 0ms"), t.style.transform = "translate3d(".concat(n, "px, 0, 0)")), t;
    }
    exports.getElementFirstChild = getElementFirstChild, exports.shouldHandleResizeEvent = shouldHandleResizeEvent, exports.animate = animate;
    var getRenderWrapperStyles = function(t, e, n) {
      var r = t || {}, o = r.paddingLeft, i = r.paddingRight, s = r.autoHeight, r = r.animationDuration, s = s ? (0, exports.getAutoheightProperty)(n, t, e) : void 0;
      return { height: s, transition: s ? "height ".concat(r, "ms") : void 0, paddingLeft: "".concat(o, "px"), paddingRight: "".concat(i, "px") };
    };
    var getTransitionProperty = (exports.getRenderWrapperStyles = getRenderWrapperStyles, function(t) {
      var t = t || {}, e = t.animationDuration, t = t.animationEasingFunction, t = void 0 === t ? "ease" : t;
      return "transform ".concat(void 0 === e ? 0 : e, "ms ").concat(t, " 0ms");
    });
    var getRenderStageStyles = (exports.getTransitionProperty = getTransitionProperty, function(t, e) {
      t = (t || {}).translate3d, t = "translate3d(".concat(-(void 0 === t ? 0 : t), "px, 0, 0)");
      return __assign(__assign({}, e), { transform: t });
    });
    var getRenderStageItemStyles = (exports.getRenderStageStyles = getRenderStageStyles, function(t, e) {
      var n = e.transformationSet, r = e.fadeoutAnimationIndex, o = e.fadeoutAnimationPosition, i = e.fadeoutAnimationProcessing, e = e.animationDuration, n = (n[t] || {}).width;
      return i && r === t ? { transform: "translateX(".concat(o, "px)"), animationDuration: "".concat(e, "ms"), width: "".concat(n, "px") } : { width: n };
    });
    var getTranslate3dProperty = (exports.getRenderStageItemStyles = getRenderStageItemStyles, function(t, e) {
      var n = t, r = e.infinite, o = e.itemsOffset, i = e.itemsInSlide, e = e.transformationSet;
      return ((void 0 === e ? [] : e)[n = r ? t + (0, math_1.getShiftIndex)(void 0 === i ? 0 : i, void 0 === o ? 0 : o) : n] || {}).position || 0;
    });
    var getTouchmoveTranslatePosition = (exports.getTranslate3dProperty = getTranslate3dProperty, function(t, e) {
      return -(e - Math.floor(t));
    });
    function getTranslateXProperty(t) {
      t = getTransformMatrix(t), t = t && t[4] || "";
      return Number(t);
    }
    function getTransformMatrix(t) {
      return t && (0, exports.isElement)(t) && window.getComputedStyle(t).transform.match(/(-?[0-9.]+)/g) || [];
    }
    exports.getTouchmoveTranslatePosition = getTouchmoveTranslatePosition, exports.getTranslateXProperty = getTranslateXProperty, exports.getTransformMatrix = getTransformMatrix;
    var canUseDOM = function() {
      var t;
      try {
        return Boolean(null == (t = null === window || void 0 === window ? void 0 : window.document) ? void 0 : t.createElement);
      } catch (t2) {
        return false;
      }
    };
    var getItemsInSlide = (exports.canUseDOM = canUseDOM, function(n, t) {
      var r, o = 1, i = t.responsive, e = t.autoWidth, s = t.infinite, t = t.innerWidth;
      return void 0 !== e && e ? void 0 !== s && s ? n : o : (i && (e = Object.keys(i)).length && (t || (0, exports.canUseDOM)()) && (r = void 0 === t ? window.innerWidth : t, e.forEach(function(t2) {
        var e2;
        Number(t2) <= r && (e2 = (t2 = i[t2]).items, t2 = t2.itemsFit, o = "contain" === (void 0 === t2 ? "fill" : t2) ? e2 : Math.min(e2, n));
      })), o || 1);
    });
    exports.getItemsInSlide = getItemsInSlide;
  }
});

// node_modules/react-alice-carousel/lib/utils/common.js
var require_common2 = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true }), exports.calculateInitialState = exports.getIsStageContentPartial = exports.concatClassnames = void 0;
    var elements_1 = require_elements();
    var math_1 = require_math();
    var concatClassnames = function() {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      return t.filter(Boolean).join(" ");
    };
    var getIsStageContentPartial = (exports.concatClassnames = concatClassnames, function(t, e, i) {
      return void 0 === e && (e = 0), void 0 === i && (i = 0), !(t = void 0 !== t && t) && i <= e;
    });
    var calculateInitialState = (exports.getIsStageContentPartial = getIsStageContentPartial, function(t, e, i) {
      void 0 === i && (i = (0, elements_1.canUseDOM)());
      var n, a, o = t.animationDuration, o = void 0 === o ? 0 : o, s = t.infinite, s = void 0 !== s && s, l = t.autoPlay, l = void 0 !== l && l, r = t.autoWidth, r = void 0 !== r && r, m = (0, elements_1.createClones)(t), d = (0, elements_1.getTransitionProperty)(), c = (0, elements_1.getItemsCount)(t), u = (0, elements_1.getItemsOffset)(t), f = (0, elements_1.getItemsInSlide)(c, t), g = (0, math_1.getStartIndex)(t.activeIndex, c), g = (0, math_1.getActiveIndex)({ startIndex: g, itemsCount: c, infinite: s }), S = (0, elements_1.getElementDimensions)(e).width, I = (a = (e = (r ? (n = (e = (0, elements_1.createAutowidthTransformationSet)(e, S, s)).coords, a = e.content, e) : (n = (e = (0, elements_1.createDefaultTransformationSet)(m, S, f, s)).coords, a = e.content, e)).partial, a), (0, math_1.getItemCoords)(-f, n = n).position), _ = (0, math_1.getSwipeLimitMin)({ itemsOffset: u, transformationSet: n }, t), t = (0, math_1.getSwipeLimitMax)({ itemsCount: c, itemsOffset: u, itemsInSlide: f, transformationSet: n }, t), h = (0, math_1.getSwipeShiftValue)(c, n);
      return { activeIndex: g, autoWidth: r, animationDuration: o, clones: m, infinite: s, itemsCount: c, itemsInSlide: f, itemsOffset: u, translate3d: (0, elements_1.getTranslate3dProperty)(g, { itemsInSlide: f, itemsOffset: u, transformationSet: n, autoWidth: r, infinite: s }), stageWidth: S, stageContentWidth: a, initialStageHeight: 0, isStageContentPartial: e, isAutoPlaying: l, isAutoPlayCanceledOnAction: false, transformationSet: n, transition: d, fadeoutAnimationIndex: null, fadeoutAnimationPosition: null, fadeoutAnimationProcessing: false, swipeLimitMin: _, swipeLimitMax: t, swipeAllowedPositionMax: I, swipeShiftValue: h, canUseDom: i };
    });
    exports.calculateInitialState = calculateInitialState;
  }
});

// node_modules/react-alice-carousel/lib/utils/classnames.js
var require_classnames = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/classnames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true }), exports.isClonedItem = exports.isTargetItem = exports.isActiveItem = exports.getRenderStageItemClasses = void 0;
    var types_1 = require_types2();
    var common_1 = require_common2();
    var math_1 = require_math();
    var getRenderStageItemClasses = function(e, t) {
      void 0 === e && (e = 0);
      var s = t.fadeoutAnimationIndex, i = (0, exports.isActiveItem)(e, t) ? types_1.Modifiers.ACTIVE : "", n = (0, exports.isClonedItem)(e, t) ? types_1.Modifiers.CLONED : "", t = (0, exports.isTargetItem)(e, t) ? types_1.Modifiers.TARGET : "", e = e === s ? types_1.Classnames.ANIMATED : "";
      return (0, common_1.concatClassnames)(types_1.Classnames.STAGE_ITEM, i, n, t, e);
    };
    var isActiveItem = (exports.getRenderStageItemClasses = getRenderStageItemClasses, function(e, t) {
      void 0 === e && (e = 0);
      var s = t.activeIndex, i = t.itemsInSlide, n = t.itemsOffset, r = t.infinite, t = t.autoWidth, o = (0, math_1.getShiftIndex)(i, n);
      return t && r ? e - o === s + n : (t = s + o, r ? t <= e && e < t + i : s <= e && e < t);
    });
    var isTargetItem = (exports.isActiveItem = isActiveItem, function(e, t) {
      void 0 === e && (e = 0);
      var s = t.activeIndex, i = t.itemsInSlide, n = t.itemsOffset, r = t.infinite, t = t.autoWidth, i = (0, math_1.getShiftIndex)(i, n);
      return r ? t && r ? e - i === s + n : e === s + i : e === s;
    });
    var isClonedItem = (exports.isTargetItem = isTargetItem, function(e, t) {
      void 0 === e && (e = 0);
      var s = t.itemsInSlide, i = t.itemsOffset, n = t.itemsCount, r = t.infinite, t = t.autoWidth;
      return !!r && (t && r ? e < s || n - 1 + s < e : e < (t = (0, math_1.getShiftIndex)(s, i)) || n - 1 + t < e);
    });
    exports.isClonedItem = isClonedItem;
  }
});

// node_modules/react-alice-carousel/lib/utils/timers.js
var require_timers = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/timers.js"(exports) {
    "use strict";
    function debounce(n, i) {
      void 0 === i && (i = 0);
      function u() {
        d && (clearTimeout(d), d = void 0);
      }
      var d = void 0;
      return [function() {
        for (var e = this, o = [], t = 0; t < arguments.length; t++) o[t] = arguments[t];
        u(), d = window.setTimeout(function() {
          n.apply(e, o), d = void 0;
        }, i);
      }, u];
    }
    Object.defineProperty(exports, "__esModule", { value: true }), exports.debounce = void 0, exports.debounce = debounce;
  }
});

// node_modules/react-alice-carousel/lib/utils/debug.js
var require_debug = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/debug.js"(exports) {
    "use strict";
    function debug() {
      for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
      console.debug.apply(console, e);
    }
    Object.defineProperty(exports, "__esModule", { value: true }), exports.debug = void 0, exports.debug = debug;
  }
});

// node_modules/react-alice-carousel/lib/utils/render.js
var require_render = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/render.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true }), exports.getSlideItemInfo = exports.getSlideInfo = exports.getSlideIndexForMultipleItems = exports.getSlideIndexForNonMultipleItems = exports.getActiveSlideDotsLength = exports.getActiveSlideIndex = void 0;
    var getActiveSlideIndex = function(e, t) {
      var t = t || {}, i = t.activeIndex, o = t.itemsInSlide, t = t.itemsCount, i = i + o;
      return 1 === o ? (0, exports.getSlideIndexForNonMultipleItems)(i, o, t) : (0, exports.getSlideIndexForMultipleItems)(i, o, t, e);
    };
    var getActiveSlideDotsLength = (exports.getActiveSlideIndex = getActiveSlideIndex, function(e, t) {
      var i;
      return void 0 === t && (t = 1), (e = void 0 === e ? 0 : e) && t ? (i = Math.floor(e / t), e % t == 0 ? i - 1 : i) : 0;
    });
    var getSlideIndexForNonMultipleItems = (exports.getActiveSlideDotsLength = getActiveSlideDotsLength, function(e, t, i) {
      return e < t ? i - t : i < e ? 0 : e - 1;
    });
    var getSlideIndexForMultipleItems = (exports.getSlideIndexForNonMultipleItems = getSlideIndexForNonMultipleItems, function(e, t, i, o) {
      var l = (0, exports.getActiveSlideDotsLength)(i, t);
      return e === i + t ? 0 : o || e < t && 0 !== e ? l : 0 === e ? i % t == 0 ? l : l - 1 : 0 < t ? Math.floor(e / t) - 1 : 0;
    });
    var getSlideInfo = (exports.getSlideIndexForMultipleItems = getSlideIndexForMultipleItems, function(e, t) {
      void 0 === t && (t = 0);
      e = (e = void 0 === e ? 0 : e) + 1;
      return e < 1 ? e = t : t < e && (e = 1), { item: e, itemsCount: t };
    });
    var getSlideItemInfo = (exports.getSlideInfo = getSlideInfo, function(e) {
      var e = e || {}, t = e.itemsInSlide, i = e.activeIndex, o = e.infinite, l = e.itemsCount;
      return e.isStageContentPartial ? { isPrevSlideDisabled: true, isNextSlideDisabled: true } : { isPrevSlideDisabled: false === o && 0 === i, isNextSlideDisabled: false === o && l - t <= i };
    });
    exports.getSlideItemInfo = getSlideItemInfo;
  }
});

// node_modules/react-alice-carousel/lib/utils/controls.js
var require_controls = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/controls.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true }), exports.shouldCancelAutoPlayOnHover = exports.shouldCancelAutoPlayOnAction = exports.getItemIndexForDotNavigation = exports.checkIsTheLastDotIndex = exports.getDotsNavigationLength = exports.hasDotForEachSlide = exports.isStrategy = exports.shouldDisableButtons = exports.shouldDisableDots = exports.shouldDisableControls = void 0;
    var types_1 = require_types2();
    function shouldDisableControls(t, o) {
      var t = (t || {}).controlsStrategy, o = o || {}, e = o.itemsInSlide, s = o.itemsCount, o = o.autoWidth;
      if ((0, exports.isStrategy)(t, types_1.ControlsStrategy.RESPONSIVE)) return !o && e === s;
    }
    function shouldDisableDots(t, o) {
      return t.disableDotsControls || shouldDisableControls(t, o);
    }
    function shouldDisableButtons(t, o) {
      return t.disableButtonsControls || !t.infinite && shouldDisableControls(t, o);
    }
    exports.shouldDisableControls = shouldDisableControls, exports.shouldDisableDots = shouldDisableDots, exports.shouldDisableButtons = shouldDisableButtons;
    var isStrategy = function(t, o) {
      return void 0 === t && (t = ""), void 0 === o && (o = ""), Boolean(t && t.includes(o));
    };
    var hasDotForEachSlide = (exports.isStrategy = isStrategy, function(t, o) {
      return t || (0, exports.isStrategy)(o, types_1.ControlsStrategy.ALTERNATE);
    });
    var getDotsNavigationLength = (exports.hasDotForEachSlide = hasDotForEachSlide, function(t, o, e) {
      return void 0 === t && (t = 0), void 0 === o && (o = 1), (e = void 0 !== e && e) ? t : 0 !== Number(o) && Math.ceil(t / o) || 0;
    });
    var checkIsTheLastDotIndex = (exports.getDotsNavigationLength = getDotsNavigationLength, function(t, o, e) {
      return !o && t === e - 1;
    });
    var getItemIndexForDotNavigation = (exports.checkIsTheLastDotIndex = checkIsTheLastDotIndex, function(t, o, e, s) {
      return (o ? e - s : t * s) || 0;
    });
    var shouldCancelAutoPlayOnAction = (exports.getItemIndexForDotNavigation = getItemIndexForDotNavigation, function(t) {
      return (t = void 0 === t ? "" : t) === types_1.AutoPlayStrategy.ACTION || t === types_1.AutoPlayStrategy.ALL;
    });
    var shouldCancelAutoPlayOnHover = (exports.shouldCancelAutoPlayOnAction = shouldCancelAutoPlayOnAction, function(t) {
      return (t = void 0 === t ? "" : t) === types_1.AutoPlayStrategy.DEFAULT || t === types_1.AutoPlayStrategy.ALL;
    });
    exports.shouldCancelAutoPlayOnHover = shouldCancelAutoPlayOnHover;
  }
});

// node_modules/react-alice-carousel/lib/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/react-alice-carousel/lib/utils/index.js"(exports) {
    "use strict";
    var __createBinding = Object.create ? function(e, r, t, o) {
      void 0 === o && (o = t);
      var p = Object.getOwnPropertyDescriptor(r, t);
      p && ("get" in p ? r.__esModule : !p.writable && !p.configurable) || (p = { enumerable: true, get: function() {
        return r[t];
      } }), Object.defineProperty(e, o, p);
    } : function(e, r, t, o) {
      e[o = void 0 === o ? t : o] = r[t];
    };
    var __exportStar = function(e, r) {
      for (var t in e) "default" === t || Object.prototype.hasOwnProperty.call(r, t) || __createBinding(r, e, t);
    };
    Object.defineProperty(exports, "__esModule", { value: true }), __exportStar(require_common2(), exports), __exportStar(require_elements(), exports), __exportStar(require_classnames(), exports), __exportStar(require_timers(), exports), __exportStar(require_math(), exports), __exportStar(require_debug(), exports), __exportStar(require_render(), exports), __exportStar(require_controls(), exports), __exportStar(require_mappers(), exports);
  }
});

// node_modules/react-alice-carousel/lib/views/SlideInfo.js
var require_SlideInfo = __commonJS({
  "node_modules/react-alice-carousel/lib/views/SlideInfo.js"(exports) {
    "use strict";
    var __importDefault = function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    var react_1 = (Object.defineProperty(exports, "__esModule", { value: true }), exports.SlideInfo = void 0, __importDefault(require_react()));
    var types_1 = require_types2();
    var utils_1 = require_utils2();
    var SlideInfo = function(e) {
      var t = e.activeIndex, s = e.itemsCount, e = e.renderSlideInfo, t = (0, utils_1.getSlideInfo)(t, s).item;
      return "function" == typeof e ? react_1.default.createElement("div", { className: types_1.Classnames.SLIDE_INFO }, e({ item: t, itemsCount: s })) : (e = (0, utils_1.concatClassnames)(types_1.Classnames.SLIDE_INFO_ITEM, types_1.Modifiers.SEPARATOR), react_1.default.createElement("div", { className: types_1.Classnames.SLIDE_INFO }, react_1.default.createElement("span", { className: types_1.Classnames.SLIDE_INFO_ITEM }, t), react_1.default.createElement("span", { className: e }, "/"), react_1.default.createElement("span", { className: types_1.Classnames.SLIDE_INFO_ITEM }, s)));
    };
    exports.SlideInfo = SlideInfo;
  }
});

// node_modules/react-alice-carousel/lib/views/StageItem.js
var require_StageItem = __commonJS({
  "node_modules/react-alice-carousel/lib/views/StageItem.js"(exports) {
    "use strict";
    var __importDefault = function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    var react_1 = (Object.defineProperty(exports, "__esModule", { value: true }), exports.StageItem = void 0, __importDefault(require_react()));
    var StageItem = function(e) {
      var t = e.item, r = e.className, e = e.styles;
      return react_1.default.createElement("li", { style: e, className: r }, t);
    };
    exports.StageItem = StageItem;
  }
});

// node_modules/react-alice-carousel/lib/views/DotsNavigation.js
var require_DotsNavigation = __commonJS({
  "node_modules/react-alice-carousel/lib/views/DotsNavigation.js"(exports) {
    "use strict";
    var __importDefault = function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    var react_1 = (Object.defineProperty(exports, "__esModule", { value: true }), exports.DotsNavigation = void 0, __importDefault(require_react()));
    var types_1 = require_types2();
    var utils_1 = require_utils2();
    var DotsNavigation = function(e) {
      var a = e.state, n = e.onClick, r = e.onMouseEnter, l = e.onMouseLeave, t = e.controlsStrategy, u = e.renderDotsItem, c = a.itemsCount, _ = a.itemsInSlide, d = a.infinite, e = a.autoWidth, m = a.activeIndex, v = (0, utils_1.getSlideItemInfo)(a).isNextSlideDisabled, f = (0, utils_1.hasDotForEachSlide)(e, t), D = (0, utils_1.getDotsNavigationLength)(c, _, f);
      return react_1.default.createElement("ul", { className: types_1.Classnames.DOTS }, Array.from({ length: c }).map(function(e2, t2) {
        var i, s, o;
        if (t2 < D) return s = (0, utils_1.checkIsTheLastDotIndex)(t2, Boolean(d), D), i = (0, utils_1.getItemIndexForDotNavigation)(t2, s, c, _), s = (0, utils_1.getActiveSlideIndex)(v, a), f && ((s = m) < 0 ? s = c - 1 : c <= m && (s = 0), i = t2), s = s === t2 ? types_1.Modifiers.ACTIVE : "", o = u ? types_1.Modifiers.CUSTOM : "", o = (0, utils_1.concatClassnames)(types_1.Classnames.DOTS_ITEM, s, o), react_1.default.createElement("li", { key: "dot-item-".concat(t2), onMouseEnter: r, onMouseLeave: l, onClick: function() {
          return n(i);
        }, className: o }, u && u({ isActive: Boolean(s), activeIndex: t2 }));
      }));
    };
    exports.DotsNavigation = DotsNavigation;
  }
});

// node_modules/react-alice-carousel/lib/views/PlayPauseButton.js
var require_PlayPauseButton = __commonJS({
  "node_modules/react-alice-carousel/lib/views/PlayPauseButton.js"(exports) {
    "use strict";
    var __importDefault = function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    var react_1 = (Object.defineProperty(exports, "__esModule", { value: true }), exports.PlayPauseButton = void 0, __importDefault(require_react()));
    var types_1 = require_types2();
    var utils_1 = require_utils2();
    var PlayPauseButton = function(e) {
      var t = e.isPlaying, a = e.onClick, e = e.renderPlayPauseButton;
      return "function" == typeof e ? react_1.default.createElement("div", { className: types_1.Classnames.PLAY_BTN, onClick: a }, e({ isPlaying: t })) : (e = t ? types_1.Modifiers.PAUSE : "", t = (0, utils_1.concatClassnames)(types_1.Classnames.PLAY_BTN_ITEM, e), react_1.default.createElement("div", { className: types_1.Classnames.PLAY_BTN }, react_1.default.createElement("div", { className: types_1.Classnames.PLAY_BTN_WRAPPER }, react_1.default.createElement("div", { onClick: a, className: t }))));
    };
    exports.PlayPauseButton = PlayPauseButton;
  }
});

// node_modules/react-alice-carousel/lib/views/PrevNextButton.js
var require_PrevNextButton = __commonJS({
  "node_modules/react-alice-carousel/lib/views/PrevNextButton.js"(exports) {
    "use strict";
    var __importDefault = function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    var react_1 = (Object.defineProperty(exports, "__esModule", { value: true }), exports.PrevNextButton = void 0, __importDefault(require_react()));
    var types_1 = require_types2();
    var utils_1 = require_utils2();
    var PrevNextButton = function(e) {
      var t, s = e.name, a = e.isDisabled, r = e.onClick, n = e.renderPrevButton, e = e.renderNextButton;
      return "function" == typeof n ? react_1.default.createElement("div", { className: types_1.Classnames.BUTTON_PREV, onClick: r }, n({ isDisabled: a })) : "function" == typeof e ? react_1.default.createElement("div", { className: types_1.Classnames.BUTTON_NEXT, onClick: r }, e({ isDisabled: a })) : (e = (n = "prev" === s) ? "<" : ">", s = n ? types_1.Classnames.BUTTON_PREV : types_1.Classnames.BUTTON_NEXT, t = n ? types_1.Classnames.BUTTON_PREV_WRAPPER : types_1.Classnames.BUTTON_NEXT_WRAPPER, n = n ? types_1.Classnames.BUTTON_PREV_ITEM : types_1.Classnames.BUTTON_NEXT_ITEM, a = a ? types_1.Modifiers.INACTIVE : "", n = (0, utils_1.concatClassnames)(n, a), react_1.default.createElement("div", { className: s }, react_1.default.createElement("div", { className: t }, react_1.default.createElement("p", { className: n, onClick: function(e2) {
        return r(e2);
      } }, react_1.default.createElement("span", { "data-area": e })))));
    };
    exports.PrevNextButton = PrevNextButton;
  }
});

// node_modules/react-alice-carousel/lib/views/index.js
var require_views = __commonJS({
  "node_modules/react-alice-carousel/lib/views/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true }), exports.PrevNextButton = exports.PlayPauseButton = exports.DotsNavigation = exports.StageItem = exports.SlideInfo = void 0;
    var SlideInfo_1 = require_SlideInfo();
    var StageItem_1 = (Object.defineProperty(exports, "SlideInfo", { enumerable: true, get: function() {
      return SlideInfo_1.SlideInfo;
    } }), require_StageItem());
    var DotsNavigation_1 = (Object.defineProperty(exports, "StageItem", { enumerable: true, get: function() {
      return StageItem_1.StageItem;
    } }), require_DotsNavigation());
    var PlayPauseButton_1 = (Object.defineProperty(exports, "DotsNavigation", { enumerable: true, get: function() {
      return DotsNavigation_1.DotsNavigation;
    } }), require_PlayPauseButton());
    var PrevNextButton_1 = (Object.defineProperty(exports, "PlayPauseButton", { enumerable: true, get: function() {
      return PlayPauseButton_1.PlayPauseButton;
    } }), require_PrevNextButton());
    Object.defineProperty(exports, "PrevNextButton", { enumerable: true, get: function() {
      return PrevNextButton_1.PrevNextButton;
    } });
  }
});

// node_modules/react-alice-carousel/lib/react-alice-carousel.js
var require_react_alice_carousel = __commonJS({
  "node_modules/react-alice-carousel/lib/react-alice-carousel.js"(exports) {
    var __extends = /* @__PURE__ */ function() {
      var n = function(t, e) {
        return (n = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? function(t2, e2) {
          t2.__proto__ = e2;
        } : function(t2, e2) {
          for (var i in e2) Object.prototype.hasOwnProperty.call(e2, i) && (t2[i] = e2[i]);
        }))(t, e);
      };
      return function(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
        function i() {
          this.constructor = t;
        }
        n(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
      };
    }();
    var __assign = function() {
      return (__assign = Object.assign || function(t) {
        for (var e, i = 1, n = arguments.length; i < n; i++) for (var o in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t;
      }).apply(this, arguments);
    };
    var __createBinding = Object.create ? function(t, e, i, n) {
      void 0 === n && (n = i);
      var o = Object.getOwnPropertyDescriptor(e, i);
      o && ("get" in o ? e.__esModule : !o.writable && !o.configurable) || (o = { enumerable: true, get: function() {
        return e[i];
      } }), Object.defineProperty(t, n, o);
    } : function(t, e, i, n) {
      t[n = void 0 === n ? i : n] = e[i];
    };
    var __setModuleDefault = Object.create ? function(t, e) {
      Object.defineProperty(t, "default", { enumerable: true, value: e });
    } : function(t, e) {
      t.default = e;
    };
    var __importStar = function(t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (null != t) for (var i in t) "default" !== i && Object.prototype.hasOwnProperty.call(t, i) && __createBinding(e, t, i);
      return __setModuleDefault(e, t), e;
    };
    var __exportStar = function(t, e) {
      for (var i in t) "default" === i || Object.prototype.hasOwnProperty.call(e, i) || __createBinding(e, t, i);
    };
    var __awaiter = function(t, a, r, l) {
      return new (r = r || Promise)(function(i, e) {
        function n(t2) {
          try {
            s(l.next(t2));
          } catch (t3) {
            e(t3);
          }
        }
        function o(t2) {
          try {
            s(l.throw(t2));
          } catch (t3) {
            e(t3);
          }
        }
        function s(t2) {
          var e2;
          t2.done ? i(t2.value) : ((e2 = t2.value) instanceof r ? e2 : new r(function(t3) {
            t3(e2);
          })).then(n, o);
        }
        s((l = l.apply(t, a || [])).next());
      });
    };
    var __generator = function(n, o) {
      var s, a, r, l = { label: 0, sent: function() {
        if (1 & r[0]) throw r[1];
        return r[1];
      }, trys: [], ops: [] }, t = { next: e(0), throw: e(1), return: e(2) };
      return "function" == typeof Symbol && (t[Symbol.iterator] = function() {
        return this;
      }), t;
      function e(i) {
        return function(t2) {
          var e2 = [i, t2];
          if (s) throw new TypeError("Generator is already executing.");
          for (; l; ) try {
            if (s = 1, a && (r = 2 & e2[0] ? a.return : e2[0] ? a.throw || ((r = a.return) && r.call(a), 0) : a.next) && !(r = r.call(a, e2[1])).done) return r;
            switch (a = 0, (e2 = r ? [2 & e2[0], r.value] : e2)[0]) {
              case 0:
              case 1:
                r = e2;
                break;
              case 4:
                return l.label++, { value: e2[1], done: false };
              case 5:
                l.label++, a = e2[1], e2 = [0];
                continue;
              case 7:
                e2 = l.ops.pop(), l.trys.pop();
                continue;
              default:
                if (!(r = 0 < (r = l.trys).length && r[r.length - 1]) && (6 === e2[0] || 2 === e2[0])) {
                  l = 0;
                  continue;
                }
                if (3 === e2[0] && (!r || e2[1] > r[0] && e2[1] < r[3])) l.label = e2[1];
                else if (6 === e2[0] && l.label < r[1]) l.label = r[1], r = e2;
                else {
                  if (!(r && l.label < r[2])) {
                    r[2] && l.ops.pop(), l.trys.pop();
                    continue;
                  }
                  l.label = r[2], l.ops.push(e2);
                }
            }
            e2 = o.call(n, l);
          } catch (t3) {
            e2 = [6, t3], a = 0;
          } finally {
            s = r = 0;
          }
          if (5 & e2[0]) throw e2[1];
          return { value: e2[0] ? e2[1] : void 0, done: true };
        };
      }
    };
    var __importDefault = function(t) {
      return t && t.__esModule ? t : { default: t };
    };
    var react_1 = (Object.defineProperty(exports, "__esModule", { value: true }), exports.Link = void 0, __importDefault(require_react()));
    var vanilla_swipe_1 = __importDefault(require_lib());
    var defaultProps_1 = require_defaultProps();
    var Link_1 = __importDefault(require_Link());
    var Views = (exports.Link = Link_1.default, __importStar(require_views()));
    var Utils = __importStar(require_utils2());
    var types_1 = require_types2();
    var AliceCarousel = (__exportStar(require_types2(), exports), function(e) {
      function t(t2) {
        var s = e.call(this, t2) || this;
        return s.swipeListener = null, s._handleKeyboardEvents = function(t3) {
          switch (t3.code) {
            case "Space":
              return s.props.autoPlay && s._handlePlayPauseToggle();
            case "ArrowLeft":
              return s.slidePrev(t3);
            case "ArrowRight":
              return s.slideNext(t3);
          }
        }, s._handleBeforeSlideEnd = function(o) {
          return __awaiter(s, void 0, void 0, function() {
            var e2, i, n;
            return __generator(this, function(t3) {
              switch (t3.label) {
                case 0:
                  return (i = this.state, n = i.activeIndex, e2 = i.itemsCount, i = i.fadeoutAnimationProcessing, Utils.shouldRecalculateSlideIndex(n, e2)) ? (n = Utils.getUpdateSlidePositionIndex(n, e2), [4, this._handleUpdateSlidePosition(n)]) : [3, 2];
                case 1:
                  return t3.sent(), [3, 4];
                case 2:
                  return i ? [4, this.setState({ fadeoutAnimationIndex: null, fadeoutAnimationPosition: null, fadeoutAnimationProcessing: false })] : [3, 4];
                case 3:
                  t3.sent(), t3.label = 4;
                case 4:
                  return this._handleSlideChanged(o), [2];
              }
            });
          });
        }, s._handleMouseEnter = function() {
          var t3 = s.props.autoPlayStrategy;
          Utils.shouldCancelAutoPlayOnHover(t3) && s.state.isAutoPlaying && (s.isHovered = true, s._handlePause());
        }, s._handleMouseLeave = function() {
          s.state.isAutoPlaying && (s.isHovered = false, s._handlePlay());
        }, s._handlePause = function() {
          s._clearAutoPlayTimeout();
        }, s._handlePlayPauseToggle = function() {
          return __awaiter(s, void 0, void 0, function() {
            var e2;
            return __generator(this, function(t3) {
              switch (t3.label) {
                case 0:
                  return e2 = this.state.isAutoPlaying, this.hasUserAction = true, [4, this.setState({ isAutoPlaying: !e2, isAutoPlayCanceledOnAction: true })];
                case 1:
                  return t3.sent(), e2 ? this._handlePause() : this._handlePlay(), [2];
              }
            });
          });
        }, s._setRootComponentRef = function(t3) {
          return s.rootElement = t3;
        }, s._setStageComponentRef = function(t3) {
          return s.stageComponent = t3;
        }, s._renderStageItem = function(t3, e2) {
          var i = Utils.getRenderStageItemStyles(e2, s.state), n = Utils.getRenderStageItemClasses(e2, s.state);
          return react_1.default.createElement(Views.StageItem, { styles: i, className: n, key: "stage-item-".concat(e2), item: t3 });
        }, s._renderSlideInfo = function() {
          var t3 = s.props.renderSlideInfo, e2 = s.state, i = e2.activeIndex, e2 = e2.itemsCount;
          return react_1.default.createElement(Views.SlideInfo, { itemsCount: e2, activeIndex: i, renderSlideInfo: t3 });
        }, s.state = Utils.calculateInitialState(t2, null), s.isHovered = false, s.isAnimationDisabled = false, s.isTouchMoveProcessStarted = false, s.cancelTouchAnimations = false, s.hasUserAction = false, s.rootElement = null, s.rootComponentDimensions = {}, s.stageComponent = null, s.startTouchmovePosition = void 0, s.slideTo = s.slideTo.bind(s), s.slidePrev = s.slidePrev.bind(s), s.slideNext = s.slideNext.bind(s), s._handleTouchmove = s._handleTouchmove.bind(s), s._handleTouchend = s._handleTouchend.bind(s), s._handleDotClick = s._handleDotClick.bind(s), s._handleResize = s._handleResize.bind(s), t2 = Utils.debounce(s._handleResize, 100), s._handleResizeDebounced = t2[0], s._cancelResizeDebounced = t2[1], s;
      }
      return __extends(t, e), t.prototype.componentDidMount = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(t2) {
            switch (t2.label) {
              case 0:
                return [4, this._setInitialState()];
              case 1:
                return t2.sent(), this._addEventListeners(), this._setupSwipeHandlers(), this.props.autoPlay && this._handlePlay(), [2];
            }
          });
        });
      }, t.prototype.componentDidUpdate = function(t2) {
        var e2 = this.props, i = e2.activeIndex, n = e2.animationDuration, o = e2.autoWidth, s = e2.children, a = e2.infinite, r = e2.items, l = e2.paddingLeft, u = e2.paddingRight, d = e2.responsive, c = e2.swipeExtraPadding, h = e2.mouseTracking, p = e2.swipeDelta, _ = e2.touchTracking, e2 = e2.touchMoveDefaultEvents;
        s && t2.children !== s || t2.autoWidth !== o || t2.infinite !== a || t2.items !== r || t2.paddingLeft !== l || t2.paddingRight !== u || t2.responsive !== d || t2.swipeExtraPadding !== c ? this._updateComponent() : (t2.animationDuration !== n && this.setState({ animationDuration: n }), t2.activeIndex !== i && this.slideTo(i, types_1.EventType.UPDATE)), t2.swipeDelta === p && t2.mouseTracking === h && t2.touchTracking === _ && t2.touchMoveDefaultEvents === e2 || this._updateSwipeProps(), this.props.keyboardNavigation !== t2.keyboardNavigation && this._updateEventListeners();
      }, t.prototype.componentWillUnmount = function() {
        this._cancelResizeDebounced(), this._cancelTimeoutAnimations(), this._removeEventListeners();
      }, Object.defineProperty(t.prototype, "eventObject", { get: function() {
        var t2 = this.state, e2 = t2.itemsInSlide, t2 = t2.activeIndex, i = Utils.getSlideItemInfo(this.state), n = i.isNextSlideDisabled, i = i.isPrevSlideDisabled;
        return { item: t2, slide: Utils.getActiveSlideIndex(n, this.state), itemsInSlide: e2, isNextSlideDisabled: n, isPrevSlideDisabled: i, type: types_1.EventType.ACTION };
      }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "isFadeoutAnimationAllowed", { get: function() {
        var t2 = this.state.itemsInSlide, e2 = this.props, i = e2.animationType, n = e2.paddingLeft, o = e2.paddingRight, e2 = e2.autoWidth;
        return 1 === t2 && i === types_1.AnimationType.FADEOUT && !(n || o || e2);
      }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "touchmovePosition", { get: function() {
        return void 0 !== this.startTouchmovePosition ? this.startTouchmovePosition : this.state.translate3d;
      }, enumerable: false, configurable: true }), t.prototype.slideTo = function(t2, e2) {
        var i, n, o;
        void 0 === t2 && (t2 = 0), this._handlePause(), this.isFadeoutAnimationAllowed ? (i = Utils.getUpdateSlidePositionIndex(t2, this.state.itemsCount), n = Utils.getFadeoutAnimationPosition(i, this.state), o = Utils.getFadeoutAnimationIndex(this.state), this._handleSlideTo({ activeIndex: i, fadeoutAnimationIndex: o, fadeoutAnimationPosition: n, eventType: e2 })) : this._handleSlideTo({ activeIndex: t2, eventType: e2 });
      }, t.prototype.slidePrev = function(t2) {
        this._handlePause(), t2 && t2.isTrusted && (this.hasUserAction = true);
        var e2, i, t2 = this.state.activeIndex - 1;
        this.isFadeoutAnimationAllowed ? (e2 = -this.state.stageWidth, i = Utils.getFadeoutAnimationIndex(this.state), this._handleSlideTo({ activeIndex: t2, fadeoutAnimationIndex: i, fadeoutAnimationPosition: e2 })) : this._handleSlideTo({ activeIndex: t2 });
      }, t.prototype.slideNext = function(t2) {
        this._handlePause(), t2 && t2.isTrusted && (this.hasUserAction = true);
        var e2, i, t2 = this.state.activeIndex + 1;
        this.isFadeoutAnimationAllowed ? (e2 = this.state.stageWidth, i = Utils.getFadeoutAnimationIndex(this.state), this._handleSlideTo({ activeIndex: t2, fadeoutAnimationIndex: i, fadeoutAnimationPosition: e2 })) : this._handleSlideTo({ activeIndex: t2 });
      }, t.prototype._addEventListeners = function() {
        window.addEventListener("resize", this._handleResizeDebounced), this.props.keyboardNavigation && window.addEventListener("keyup", this._handleKeyboardEvents);
      }, t.prototype._removeEventListeners = function() {
        this.swipeListener && this.swipeListener.destroy(), window.removeEventListener("resize", this._handleResizeDebounced), window.removeEventListener("keyup", this._handleKeyboardEvents);
      }, t.prototype._updateEventListeners = function() {
        this.props.keyboardNavigation ? window.addEventListener("keyup", this._handleKeyboardEvents) : window.removeEventListener("keyup", this._handleKeyboardEvents);
      }, t.prototype._handleResize = function(s) {
        return __awaiter(this, void 0, void 0, function() {
          var e2, i, n, o;
          return __generator(this, function(t2) {
            switch (t2.label) {
              case 0:
                return (n = this.props.onResizeEvent, i = Utils.getElementDimensions(this.rootElement), (n || Utils.shouldHandleResizeEvent)(s, this.rootComponentDimensions, i)) ? (this._cancelTimeoutAnimations(), this.rootComponentDimensions = i, n = this.state, i = n.itemsCount, e2 = n.isAutoPlaying, n = Utils.getUpdateSlidePositionIndex(this.state.activeIndex, i), i = Utils.calculateInitialState(__assign(__assign({}, this.props), { activeIndex: n }), this.stageComponent), n = Utils.getTranslate3dProperty(i.activeIndex, i), o = __assign(__assign({}, i), { translate3d: n, isAutoPlaying: e2 }), Utils.animate(this.stageComponent, { position: -n }), [4, this.setState(o)]) : [3, 2];
              case 1:
                t2.sent(), this._handleResized({ itemsInSlide: o.itemsInSlide }), this.isAnimationDisabled = false, e2 && this._handlePlay(), t2.label = 2;
              case 2:
                return [2];
            }
          });
        });
      }, t.prototype._handleTouchmove = function(t2, e2) {
        var i = e2.absY, n = e2.absX, o = e2.deltaX, e2 = this.props.swipeDelta, s = this.state, a = s.swipeShiftValue, r = s.swipeLimitMin, l = s.swipeLimitMax, u = s.infinite, s = s.fadeoutAnimationProcessing;
        if (this.hasUserAction = true, !(s || !this.isTouchMoveProcessStarted && Utils.isVerticalTouchmoveDetected(n, i, e2))) {
          this.isTouchMoveProcessStarted || (this._cancelTimeoutAnimations(), this._setTouchmovePosition(), this.isAnimationDisabled = true, this.isTouchMoveProcessStarted = true, this._handleSlideChange());
          var d = Utils.getTouchmoveTranslatePosition(o, this.touchmovePosition);
          if (false === u) return r < d || d < -l ? void 0 : void Utils.animate(this.stageComponent, { position: d });
          if (Utils.shouldRecalculateSwipePosition(d, r, l)) try {
            !function t3() {
              Utils.getIsLeftDirection(o) ? d += a : d += -a;
              Utils.shouldRecalculateSwipePosition(d, r, l) && t3();
            }();
          } catch (t3) {
            Utils.debug(t3);
          }
          Utils.animate(this.stageComponent, { position: d });
        }
      }, t.prototype._handleTouchend = function(t2, e2) {
        var i, n, o, e2 = e2.deltaX;
        this._clearTouchmovePosition(), this.isTouchMoveProcessStarted && (this.isTouchMoveProcessStarted = false, i = this.state.animationDuration, n = this.props.animationEasingFunction, o = Utils.getTranslateXProperty(this.stageComponent), e2 = Utils.getSwipeTouchendPosition(this.state, e2, o), Utils.animate(this.stageComponent, { position: e2, animationDuration: i, animationEasingFunction: n }), this._handleBeforeTouchEnd(e2));
      }, t.prototype._handleBeforeTouchEnd = function(s) {
        var t2 = this, e2 = this.state.animationDuration;
        this.touchEndTimeoutId = window.setTimeout(function() {
          return __awaiter(t2, void 0, void 0, function() {
            var e3, i, n, o = this;
            return __generator(this, function(t3) {
              switch (t3.label) {
                case 0:
                  return e3 = Utils.getSwipeTouchendIndex(s, this.state), i = Utils.getTranslate3dProperty(e3, this.state), Utils.animate(this.stageComponent, { position: -i }), n = Utils.getTransitionProperty(), [4, this.setState({ activeIndex: e3, translate3d: i, transition: n })];
                case 1:
                  return t3.sent(), requestAnimationFrame(function() {
                    return o._handleSlideChanged();
                  }), [2];
              }
            });
          });
        }, e2);
      }, t.prototype._handleSlideTo = function(t2) {
        var e2 = t2.activeIndex, a = void 0 === e2 ? 0 : e2, e2 = t2.fadeoutAnimationIndex, r = void 0 === e2 ? null : e2, e2 = t2.fadeoutAnimationPosition, l = void 0 === e2 ? null : e2, u = t2.eventType;
        return __awaiter(this, void 0, void 0, function() {
          var e3, i, n, o, s = this;
          return __generator(this, function(t3) {
            switch (t3.label) {
              case 0:
                return (i = this.props, n = i.infinite, i = i.animationEasingFunction, e3 = this.state, o = e3.itemsCount, e3 = e3.animationDuration, this.isAnimationDisabled || this.state.activeIndex === a || !n && Utils.shouldCancelSlideAnimation(a, o)) ? [2] : (this.isAnimationDisabled = true, this._cancelTimeoutAnimations(), this._handleSlideChange(u), n = false, o = Utils.getTranslate3dProperty(a, this.state), i = null !== r && null !== l ? (n = true, Utils.getTransitionProperty()) : Utils.getTransitionProperty({ animationDuration: e3, animationEasingFunction: i }), [4, this.setState({ activeIndex: a, transition: i, translate3d: o, animationDuration: e3, fadeoutAnimationIndex: r, fadeoutAnimationPosition: l, fadeoutAnimationProcessing: n })]);
              case 1:
                return t3.sent(), this.slideEndTimeoutId = window.setTimeout(function() {
                  return s._handleBeforeSlideEnd(u);
                }, e3), [2];
            }
          });
        });
      }, t.prototype._handleUpdateSlidePosition = function(o) {
        return __awaiter(this, void 0, void 0, function() {
          var e2, i, n;
          return __generator(this, function(t2) {
            switch (t2.label) {
              case 0:
                return e2 = this.state.animationDuration, i = Utils.getTranslate3dProperty(o, this.state), n = Utils.getTransitionProperty({ animationDuration: 0 }), [4, this.setState({ activeIndex: o, translate3d: i, transition: n, animationDuration: e2, fadeoutAnimationIndex: null, fadeoutAnimationPosition: null, fadeoutAnimationProcessing: false })];
              case 1:
                return t2.sent(), [2];
            }
          });
        });
      }, t.prototype._handleUpdated = function() {
        this.props.onUpdated && this.props.onUpdated(__assign(__assign({}, this.eventObject), { type: types_1.EventType.UPDATE }));
      }, t.prototype._handleResized = function(t2) {
        void 0 === t2 && (t2 = {}), this.props.onResized && this.props.onResized(__assign(__assign(__assign({}, this.eventObject), t2), { type: types_1.EventType.RESIZE }));
      }, t.prototype._handleSlideChange = function(t2) {
        this.props.onSlideChange && (t2 = t2 ? __assign(__assign({}, this.eventObject), { type: t2 }) : this.eventObject, this.props.onSlideChange(t2));
      }, t.prototype._handleSlideChanged = function(s) {
        return __awaiter(this, void 0, void 0, function() {
          var e2, i, n, o;
          return __generator(this, function(t2) {
            switch (t2.label) {
              case 0:
                return (i = this.state, e2 = i.isAutoPlaying, i = i.isAutoPlayCanceledOnAction, n = this.props, o = n.autoPlayStrategy, n = n.onSlideChanged, Utils.shouldCancelAutoPlayOnAction(o) && this.hasUserAction && !i) ? [4, this.setState({ isAutoPlayCanceledOnAction: true, isAutoPlaying: false })] : [3, 2];
              case 1:
                return t2.sent(), [3, 3];
              case 2:
                e2 && this._handlePlay(), t2.label = 3;
              case 3:
                return this.isAnimationDisabled = false, n && (o = s ? __assign(__assign({}, this.eventObject), { type: s }) : this.eventObject, n(o)), s === types_1.EventType.UPDATE && this._handleUpdated(), [2];
            }
          });
        });
      }, t.prototype._handleDotClick = function(t2) {
        this.hasUserAction = true, this.slideTo(t2);
      }, t.prototype._handlePlay = function() {
        this._setAutoPlayInterval();
      }, t.prototype._cancelTimeoutAnimations = function() {
        this._clearAutoPlayTimeout(), this._clearSlideEndTimeout(), this.clearTouchendTimeout();
      }, t.prototype._clearAutoPlayTimeout = function() {
        window.clearTimeout(this.autoPlayTimeoutId), this.autoPlayTimeoutId = void 0;
      }, t.prototype._clearSlideEndTimeout = function() {
        clearTimeout(this.slideEndTimeoutId), this.slideEndTimeoutId = void 0;
      }, t.prototype.clearTouchendTimeout = function() {
        clearTimeout(this.touchEndTimeoutId), this.touchEndTimeoutId = void 0;
      }, t.prototype._clearTouchmovePosition = function() {
        this.startTouchmovePosition = void 0;
      }, t.prototype._setTouchmovePosition = function() {
        var t2 = Utils.getTranslateXProperty(this.stageComponent);
        this.startTouchmovePosition = -t2;
      }, t.prototype._setInitialState = function() {
        return __awaiter(this, void 0, void 0, function() {
          var e2;
          return __generator(this, function(t2) {
            switch (t2.label) {
              case 0:
                return e2 = Utils.calculateInitialState(this.props, this.stageComponent), this.rootComponentDimensions = Utils.getElementDimensions(this.rootElement), [4, this.setState(e2)];
              case 1:
                return t2.sent(), this.props.onInitialized && this.props.onInitialized(__assign(__assign({}, this.eventObject), { type: types_1.EventType.INIT })), [2];
            }
          });
        });
      }, t.prototype._setAutoPlayInterval = function() {
        var t2 = this, e2 = this.props, i = e2.autoPlayDirection, e2 = e2.autoPlayInterval;
        this.autoPlayTimeoutId = window.setTimeout(function() {
          t2.isHovered || (i === types_1.AutoplayDirection.RTL ? t2.slidePrev() : t2.slideNext());
        }, e2);
      }, t.prototype._setupSwipeHandlers = function() {
        this.swipeListener = new vanilla_swipe_1.default({ element: this.rootElement, delta: this.props.swipeDelta, onSwiping: this._handleTouchmove, onSwiped: this._handleTouchend, rotationAngle: 5, mouseTrackingEnabled: this.props.mouseTracking, touchTrackingEnabled: this.props.touchTracking, preventDefaultTouchmoveEvent: !this.props.touchMoveDefaultEvents, preventTrackingOnMouseleave: true }), this.swipeListener.init();
      }, t.prototype._updateComponent = function() {
        var t2 = this, e2 = (this.props.syncStateOnPropsUpdate ? this.state : this.props).activeIndex, i = __assign(__assign({}, this.props), { activeIndex: e2 });
        this._cancelTimeoutAnimations(), this.isAnimationDisabled = false, this.state.isAutoPlaying && this._handlePlay(), this.setState({ clones: Utils.createClones(i) }), requestAnimationFrame(function() {
          t2.setState(Utils.calculateInitialState(i, t2.stageComponent), function() {
            return t2._handleUpdated();
          });
        });
      }, t.prototype._updateSwipeProps = function() {
        this.swipeListener && this.swipeListener.update({ delta: this.props.swipeDelta, mouseTrackingEnabled: this.props.mouseTracking, touchTrackingEnabled: this.props.touchTracking, preventDefaultTouchmoveEvent: !this.props.touchMoveDefaultEvents });
      }, t.prototype._renderDotsNavigation = function() {
        var t2 = this.props, e2 = t2.renderDotsItem, t2 = t2.controlsStrategy;
        return react_1.default.createElement(Views.DotsNavigation, { state: this.state, onClick: this._handleDotClick, renderDotsItem: e2, controlsStrategy: t2 });
      }, t.prototype._renderPrevButton = function() {
        var t2 = this.props.renderPrevButton, e2 = Utils.getSlideItemInfo(this.state).isPrevSlideDisabled;
        return react_1.default.createElement(Views.PrevNextButton, { name: "prev", onClick: this.slidePrev, isDisabled: e2, renderPrevButton: t2 });
      }, t.prototype._renderNextButton = function() {
        var t2 = this.props.renderNextButton, e2 = Utils.getSlideItemInfo(this.state).isNextSlideDisabled;
        return react_1.default.createElement(Views.PrevNextButton, { name: "next", onClick: this.slideNext, isDisabled: e2, renderNextButton: t2 });
      }, t.prototype._renderPlayPauseButton = function() {
        var t2 = this.props.renderPlayPauseButton, e2 = this.state.isAutoPlaying;
        return react_1.default.createElement(Views.PlayPauseButton, { isPlaying: e2, onClick: this._handlePlayPauseToggle, renderPlayPauseButton: t2 });
      }, t.prototype.render = function() {
        var t2 = this.state, e2 = t2.translate3d, i = t2.clones, n = t2.transition, t2 = t2.canUseDom, o = Utils.shouldDisableDots(this.props, this.state), s = Utils.shouldDisableButtons(this.props, this.state), a = Utils.getRenderWrapperStyles(this.props, this.state, this.stageComponent), e2 = Utils.getRenderStageStyles({ translate3d: e2 }, { transition: n }), n = this.props.ssrSilentMode || t2 ? "" : types_1.Modifiers.SSR, t2 = Utils.concatClassnames(types_1.Classnames.ROOT, n);
        return react_1.default.createElement("div", { className: t2 }, react_1.default.createElement("div", { ref: this._setRootComponentRef }, react_1.default.createElement("div", { style: a, className: types_1.Classnames.WRAPPER, onMouseEnter: this._handleMouseEnter, onMouseLeave: this._handleMouseLeave }, react_1.default.createElement("ul", { style: e2, className: types_1.Classnames.STAGE, ref: this._setStageComponentRef }, i.map(this._renderStageItem)))), o ? null : this._renderDotsNavigation(), s ? null : this._renderPrevButton(), s ? null : this._renderNextButton(), this.props.disableSlideInfo ? null : this._renderSlideInfo(), this.props.autoPlayControls ? this._renderPlayPauseButton() : null);
      }, t.defaultProps = defaultProps_1.defaultProps, t;
    }(react_1.default.PureComponent));
    exports.default = AliceCarousel;
  }
});
export default require_react_alice_carousel();
//# sourceMappingURL=react-alice-carousel.js.map
