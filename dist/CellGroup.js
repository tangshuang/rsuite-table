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

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _domLib = require('dom-lib');

var _decorate = require('./utils/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  fixed: _propTypes2.default.bool,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  left: _propTypes2.default.number
};

var CellGroup = function (_React$Component) {
  _inherits(CellGroup, _React$Component);

  function CellGroup() {
    _classCallCheck(this, CellGroup);

    return _possibleConstructorReturn(this, (CellGroup.__proto__ || Object.getPrototypeOf(CellGroup)).apply(this, arguments));
  }

  _createClass(CellGroup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          fixed = _props.fixed,
          width = _props.width,
          left = _props.left,
          height = _props.height,
          style = _props.style,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['fixed', 'width', 'left', 'height', 'style', 'className']);

      var classes = (0, _classnames2.default)(this.prefix('cell-group'), fixed ? 'fixed' : 'scroll', className);

      var styles = _extends({
        width: width,
        height: height
      }, style);

      (0, _domLib.translateDOMPositionXY)(styles, left, 0);
      var elementProps = (0, _omit2.default)(props, Object.keys(propTypes));

      return _react2.default.createElement('div', _extends({}, elementProps, {
        className: classes,
        style: styles
      }));
    }
  }]);

  return CellGroup;
}(_react2.default.Component);

CellGroup.propTypes = propTypes;

exports.default = (0, _decorate2.default)()(CellGroup);