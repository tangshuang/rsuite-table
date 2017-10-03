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

var _isNullOrUndefined = require('./utils/isNullOrUndefined');

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

var _constants = require('./constants');

var _decorate = require('./utils/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),
  className: _propTypes2.default.string,
  dataKey: _propTypes2.default.string,
  isHeaderCell: _propTypes2.default.bool,

  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  left: _propTypes2.default.number,
  headerHeight: _propTypes2.default.number,

  rowKey: _propTypes2.default.string,

  /* eslint-disable */
  rowData: _propTypes2.default.object,
  rowIndex: _propTypes2.default.number,
  layer: _propTypes2.default.number, // for tree table

  style: _propTypes2.default.object,
  firstColumn: _propTypes2.default.bool,
  lastColumn: _propTypes2.default.bool,
  hasChildren: _propTypes2.default.bool,

  onTreeToggle: _propTypes2.default.func,
  renderTreeToggle: _propTypes2.default.func,
  cellRenderer: _propTypes2.default.func,
  sortable: _propTypes2.default.bool
};

var defaultProps = {
  align: 'left',
  headerHeight: 36,
  height: 36,
  width: 0,
  layer: 0,
  left: 0
};

var Cell = function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell() {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).apply(this, arguments));
  }

  _createClass(Cell, [{
    key: 'renderExpandIcon',
    value: function renderExpandIcon() {
      var _props = this.props,
          hasChildren = _props.hasChildren,
          firstColumn = _props.firstColumn,
          onTreeToggle = _props.onTreeToggle,
          rowKey = _props.rowKey,
          rowIndex = _props.rowIndex,
          rowData = _props.rowData,
          renderTreeToggle = _props.renderTreeToggle;


      var expandButton = _react2.default.createElement('i', {
        role: 'button',
        tabIndex: -1,
        className: 'expand-icon icon',
        onClick: function onClick(event) {
          onTreeToggle && onTreeToggle(rowKey, rowIndex, rowData, event);
        }
      });

      /**
       * 如果用子节点，同时是第一列,则创建一个 icon 用于展开节点
       */
      if (hasChildren && firstColumn) {
        return renderTreeToggle ? renderTreeToggle(expandButton, rowData) : expandButton;
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          width = _props2.width,
          left = _props2.left,
          height = _props2.height,
          style = _props2.style,
          className = _props2.className,
          firstColumn = _props2.firstColumn,
          lastColumn = _props2.lastColumn,
          isHeaderCell = _props2.isHeaderCell,
          headerHeight = _props2.headerHeight,
          layer = _props2.layer,
          align = _props2.align,
          sortable = _props2.sortable,
          children = _props2.children,
          rowData = _props2.rowData,
          dataKey = _props2.dataKey,
          cellRenderer = _props2.cellRenderer,
          props = _objectWithoutProperties(_props2, ['width', 'left', 'height', 'style', 'className', 'firstColumn', 'lastColumn', 'isHeaderCell', 'headerHeight', 'layer', 'align', 'sortable', 'children', 'rowData', 'dataKey', 'cellRenderer']);

      var classes = (0, _classnames2.default)(this.prefix('cell'), {
        sortable: sortable && isHeaderCell,
        first: firstColumn,
        last: lastColumn
      }, className);

      var layerWidth = layer * _constants.LAYER_WIDTH;
      var nextWidth = !isHeaderCell && firstColumn ? width - layerWidth : width;
      var nextHeight = isHeaderCell ? headerHeight : height;

      var styles = _extends({
        width: nextWidth,
        height: nextHeight,
        zIndex: layer,
        left: !isHeaderCell && firstColumn ? left + layerWidth : left
      }, style);

      var contentStyles = {
        width: nextWidth,
        height: nextHeight,
        textAlign: align
      };

      if (sortable) {
        contentStyles.paddingRight = 28;
      }

      var contentChildren = (0, _isNullOrUndefined2.default)(children) && rowData ? rowData[dataKey] : children;
      var elementProps = (0, _omit2.default)(props, ['index', 'fixed', 'resizable', 'flexGrow', 'sortColumn', 'sortType', 'onSortColumn', 'onColumnResizeEnd', 'onColumnResizeStart', 'onColumnResizeMove'].concat(_toConsumableArray(Object.keys(propTypes))));

      return _react2.default.createElement(
        'div',
        _extends({}, elementProps, {
          className: classes,
          style: styles
        }),
        _react2.default.createElement(
          'div',
          { className: this.prefix('cell-wrap1') },
          _react2.default.createElement(
            'div',
            { className: this.prefix('cell-wrap2') },
            _react2.default.createElement(
              'div',
              { className: this.prefix('cell-wrap3') },
              _react2.default.createElement(
                'div',
                {
                  className: this.prefix('cell-content'),
                  style: contentStyles
                },
                this.renderExpandIcon(),
                cellRenderer ? cellRenderer(contentChildren) : contentChildren
              )
            )
          )
        )
      );
    }
  }]);

  return Cell;
}(_react2.default.Component);

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

exports.default = (0, _decorate2.default)()(Cell);