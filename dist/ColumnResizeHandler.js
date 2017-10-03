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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

var _clamp = require('lodash/clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _decorate = require('./utils/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  height: _propTypes2.default.number,

  /* eslint-disable */
  initialEvent: _propTypes2.default.object,
  columnWidth: _propTypes2.default.number,
  columnLeft: _propTypes2.default.number,
  columnFixed: _propTypes2.default.bool,
  onColumnResizeStart: _propTypes2.default.func,
  onColumnResizeEnd: _propTypes2.default.func,
  onColumnResizeMove: _propTypes2.default.func
};

var ColumnResizeHandler = function (_React$Component) {
  _inherits(ColumnResizeHandler, _React$Component);

  function ColumnResizeHandler(props) {
    _classCallCheck(this, ColumnResizeHandler);

    var _this = _possibleConstructorReturn(this, (ColumnResizeHandler.__proto__ || Object.getPrototypeOf(ColumnResizeHandler)).call(this, props));

    _this.onMove = function (deltaX) {

      if (!_this.isKeyDown) {
        return;
      }

      var _this$props = _this.props,
          onColumnResizeMove = _this$props.onColumnResizeMove,
          columnWidth = _this$props.columnWidth,
          columnLeft = _this$props.columnLeft,
          columnFixed = _this$props.columnFixed;

      _this.cursorDelta += deltaX;
      _this.columnWidth = (0, _clamp2.default)(columnWidth + _this.cursorDelta, 20, 20000);
      onColumnResizeMove && onColumnResizeMove(_this.columnWidth, columnLeft, columnFixed);
    };

    _this.onColumnResizeEnd = function () {
      var onColumnResizeEnd = _this.props.onColumnResizeEnd;

      _this.isKeyDown = false;

      onColumnResizeEnd && onColumnResizeEnd(_this.columnWidth, _this.cursorDelta);

      if (_this.mouseMoveTracker) {
        _this.mouseMoveTracker.releaseMouseMoves();
        _this.mouseMoveTracker = null;
      }
    };

    _this.onColumnResizeMouseDown = function (event) {
      var onColumnResizeStart = _this.props.onColumnResizeStart;

      _this.mouseMoveTracker = _this.getMouseMoveTracker();
      _this.isKeyDown = true;
      _this.cursorDelta = 0;

      onColumnResizeStart && onColumnResizeStart({
        clientX: event.clientX,
        clientY: event.clientY,
        preventDefault: function preventDefault() {}
      });
    };

    _this.columnWidth = props.columnWidth || 0;
    _this.cursorDelta = 0;
    return _this;
  }

  _createClass(ColumnResizeHandler, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.isKeyDown && nextProps.initialEvent && !this.mouseMoveTracker.isDragging()) {
        this.mouseMoveTracker.captureMouseMoves(nextProps.initialEvent);
      }
      if (nextProps.columnWidth !== this.props.columnWidth) {

        this.columnWidth = nextProps.columnWidth;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      if (this.mouseMoveTracker) {
        this.mouseMoveTracker.releaseMouseMoves();
        this.mouseMoveTracker = null;
      }
    }
  }, {
    key: 'getMouseMoveTracker',
    value: function getMouseMoveTracker() {

      return this.mouseMoveTracker || new _domLib.DOMMouseMoveTracker(this.onMove, this.onColumnResizeEnd, document.body);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$columnLeft = _props.columnLeft,
          columnLeft = _props$columnLeft === undefined ? 0 : _props$columnLeft,
          height = _props.height,
          className = _props.className,
          style = _props.style,
          props = _objectWithoutProperties(_props, ['columnLeft', 'height', 'className', 'style']);

      var styles = _extends({
        width: 6,
        left: this.columnWidth + columnLeft - 2,
        height: height
      }, style);

      var classes = (0, _classnames2.default)(this.prefix('column-resize-spanner'), className);
      var elementProps = (0, _omit2.default)(props, Object.keys(propTypes));

      return _react2.default.createElement('div', _extends({}, elementProps, {
        className: classes,
        style: styles,
        onMouseDown: this.onColumnResizeMouseDown,
        role: 'button',
        tabIndex: -1
      }));
    }
  }]);

  return ColumnResizeHandler;
}(_react2.default.Component);

ColumnResizeHandler.propTypes = propTypes;

exports.default = (0, _decorate2.default)()(ColumnResizeHandler);