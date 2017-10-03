'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

var _decorate = require('./utils/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  vertical: _propTypes2.default.bool,
  length: _propTypes2.default.number,
  scrollLength: _propTypes2.default.number,
  onScroll: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func
};

var Scrollbar = function (_React$Component) {
  _inherits(Scrollbar, _React$Component);

  function Scrollbar(props) {
    _classCallCheck(this, Scrollbar);

    var _this = _possibleConstructorReturn(this, (Scrollbar.__proto__ || Object.getPrototypeOf(Scrollbar)).call(this, props));

    _this.hanldeMouseDown = function (event) {
      var onMouseDown = _this.props.onMouseDown;

      _this.mouseMoveTracker = _this.getMouseMoveTracker();
      _this.mouseMoveTracker.captureMouseMoves(event);
      _this.setState({
        handleDown: true
      });
      onMouseDown && onMouseDown(event);
    };

    _this.hanldeDragEnd = function () {
      _this.releaseMouseMoves();
      _this.setState({
        handleDown: false
      });
    };

    _this.hanldeDragMove = function (deltaX, deltaY, event) {
      var vertical = _this.props.vertical;

      if (!_this.mouseMoveTracker || !_this.mouseMoveTracker.isDragging()) {
        return;
      }
      _this.handleScroll(vertical ? deltaY : deltaX, event);
    };

    _this.state = {
      handleDown: false
    };
    _this.scrollOffset = 0;
    return _this;
  }

  _createClass(Scrollbar, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      this.releaseMouseMoves();
    }
  }, {
    key: 'onWheelScroll',
    value: function onWheelScroll(delta) {
      var _props = this.props,
          length = _props.length,
          scrollLength = _props.scrollLength;

      var nextDelta = delta / (scrollLength / length);
      this.updateScrollBarPosition(nextDelta);
    }
  }, {
    key: 'getMouseMoveTracker',
    value: function getMouseMoveTracker() {
      return this.mouseMoveTracker || new _domLib.DOMMouseMoveTracker(this.hanldeDragMove, this.hanldeDragEnd, document.body);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(delta, event) {
      var _props2 = this.props,
          length = _props2.length,
          scrollLength = _props2.scrollLength,
          onScroll = _props2.onScroll;

      var scrollDelta = delta * (scrollLength / length);
      this.updateScrollBarPosition(delta);
      onScroll && onScroll(scrollDelta, event);
    }
  }, {
    key: 'resetScrollBarPosition',
    value: function resetScrollBarPosition() {
      this.scrollOffset = 0;
      this.updateScrollBarPosition(0);
    }
  }, {
    key: 'updateScrollBarPosition',
    value: function updateScrollBarPosition(delta) {
      var _props3 = this.props,
          vertical = _props3.vertical,
          length = _props3.length,
          scrollLength = _props3.scrollLength;

      var max = length - length / scrollLength * length;
      var styles = {};

      this.scrollOffset += delta;
      this.scrollOffset = Math.max(this.scrollOffset, 0);
      this.scrollOffset = Math.min(this.scrollOffset, max);

      if (vertical) {
        (0, _domLib.translateDOMPositionXY)(styles, 0, this.scrollOffset);
      } else {
        (0, _domLib.translateDOMPositionXY)(styles, this.scrollOffset, 0);
      }

      (0, _domLib.addStyle)(this.handle, styles);
    }
  }, {
    key: 'releaseMouseMoves',
    value: function releaseMouseMoves() {

      if (this.mouseMoveTracker) {
        this.mouseMoveTracker.releaseMouseMoves();
        this.mouseMoveTracker = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _styles,
          _this2 = this;

      var _props4 = this.props,
          vertical = _props4.vertical,
          length = _props4.length,
          scrollLength = _props4.scrollLength,
          className = _props4.className,
          props = _objectWithoutProperties(_props4, ['vertical', 'length', 'scrollLength', 'className']);

      var handleDown = this.state.handleDown;

      var classes = (0, _classnames2.default)(this.prefix('scrollbar-wrapper'), {
        vertical: vertical,
        horizontal: !vertical,
        hide: scrollLength <= length,
        active: handleDown
      }, className);

      var styles = (_styles = {}, _defineProperty(_styles, vertical ? 'height' : 'width', length / scrollLength * 100 + '%'), _defineProperty(_styles, vertical ? 'minHeight' : 'minWidth', _constants.SCROLLBAR_MIN_WIDTH), _styles);
      var elementProps = (0, _omit2.default)(props, Object.keys(propTypes));

      return _react2.default.createElement(
        'div',
        _extends({}, elementProps, {
          className: classes
        }),
        _react2.default.createElement('div', {
          ref: function ref(_ref) {
            _this2.handle = _ref;
          },
          className: 'scrollbar-handle',
          style: styles,
          onMouseDown: this.hanldeMouseDown,
          role: 'button',
          tabIndex: -1
        })
      );
    }
  }]);

  return Scrollbar;
}(_react2.default.Component);

Scrollbar.propTypes = propTypes;

exports.default = (0, _decorate2.default)()(Scrollbar);