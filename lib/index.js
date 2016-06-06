'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sendAction = require('send-action');

var _sendAction2 = _interopRequireDefault(_sendAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Connect send action store to React component
 * Subscribe onchange event and trigger a setState to rerender the app
 *
 * @return {Object} Connected Component
 */

var Provider = function (_React$Component) {
  _inherits(Provider, _React$Component);

  _createClass(Provider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        store: this.store
      };
    }
  }]);

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Provider).call(this, props, context));

    _this.store = _this.createstore(props.createStore.actionHandler, props.createStore.initialState);
    _this.state = _this.store.state();
    return _this;
  }

  _createClass(Provider, [{
    key: 'createstore',
    value: function createstore(actionHandler, initialState) {
      return (0, _sendAction2.default)({
        onaction: actionHandler,
        onchange: this.onchange.bind(this),
        state: initialState
      });
    }
  }, {
    key: 'onchange',
    value: function onchange(action, state, oldState) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return Provider;
}(_react2.default.Component);

Provider.propTypes = {
  createStore: _react.PropTypes.shape({
    initialState: _react.PropTypes.object.isRequired,
    actionHandler: _react.PropTypes.func.isRequired
  }),
  children: _react.PropTypes.element.isRequired
};

Provider.childContextTypes = {
  store: _react.PropTypes.func.isRequired
};

exports.default = Provider;