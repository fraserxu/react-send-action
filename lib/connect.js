'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Map props and actions to child component
 * @param  {Object} mapProps
 * @param  {Function} mapActionHandlers
 * @return {Object} wrapped component
 */
function connect(mapProps, mapActionHandlers, statics) {
  return function (WrappedComponent) {
    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Connect).call(this, props, context));

        _this.store = props.store || context.store;

        if (!_this.store) {
          throw new Error('Could not find "store" in either the context or ' + ('props of "' + _this.constructor.displayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicity pass "client" as a prop to "' + _this.constructor.displayName + '".'));
        }
        return _this;
      }

      _createClass(Connect, [{
        key: 'render',
        value: function render() {
          var actionHandlers = mapActionHandlers ? mapActionHandlers(this.store, this.props) : {};
          var mappedProps = mapProps ? mapProps(this.store, this.props) : {};
          return (0, _react.createElement)(WrappedComponent, _extends({}, mappedProps, actionHandlers, this.props));
        }
      }]);

      return Connect;
    }(_react.Component);

    Connect.WrappedComponent = WrappedComponent;
    Connect.contextTypes = {
      store: _react.PropTypes.func
    };
    Connect.propTypes = {
      store: _react.PropTypes.func
    };

    // map static method to `Connect` component
    // we use it for async data fetching from backend
    if (statics && (typeof statics === 'undefined' ? 'undefined' : _typeof(statics)) === 'object') {
      Connect = (0, _hoistNonReactStatics2.default)(Connect, statics);
    }

    return (0, _hoistNonReactStatics2.default)(Connect, WrappedComponent);
  };
}