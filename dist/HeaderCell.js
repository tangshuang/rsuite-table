'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _ColumnResizeHandler = require('./ColumnResizeHandler');

var _ColumnResizeHandler2 = _interopRequireDefault(_ColumnResizeHandler);

var _isNullOrUndefined = require('./utils/isNullOrUndefined');

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

var _decorate = require('./utils/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _Cell2.default.propTypes, {
  sortable: _propTypes2.default.bool,
  resizable: _propTypes2.default.bool,
  onColumnResizeEnd: _propTypes2.default.func,
  onColumnResizeStart: _propTypes2.default.func,
  onColumnResizeMove: _propTypes2.default.func,
  onSortColumn: _propTypes2.default.func,
  headerHeight: _propTypes2.default.number
});

var HeaderCell = function (_React$Component) {
  _inherits(HeaderCell, _React$Component);

  function HeaderCell(props) {
    _classCallCheck(this, HeaderCell);

    var _this = _possibleConstructorReturn(this, (HeaderCell.__proto__ || Object.getPrototypeOf(HeaderCell)).call(this, props));

    _this.onColumnResizeStart = function (event) {
      var _this$props = _this.props,
          left = _this$props.left,
          fixed = _this$props.fixed,
          onColumnResizeStart = _this$props.onColumnResizeStart;


      _this.setState({ initialEvent: event });
      onColumnResizeStart && onColumnResizeStart(_this.state.columnWidth, left, fixed);
    };

    _this.onColumnResizeEnd = function (columnWidth, cursorDelta) {
      var _this$props2 = _this.props,
          dataKey = _this$props2.dataKey,
          index = _this$props2.index,
          onColumnResizeEnd = _this$props2.onColumnResizeEnd;

      _this.setState({ columnWidth: columnWidth });
      onColumnResizeEnd && onColumnResizeEnd(columnWidth, cursorDelta, dataKey, index);
    };

    _this.handleClick = function () {
      var _this$props3 = _this.props,
          sortable = _this$props3.sortable,
          dataKey = _this$props3.dataKey,
          sortType = _this$props3.sortType,
          onSortColumn = _this$props3.onSortColumn;

      sortable && onSortColumn && onSortColumn(dataKey, sortType === 'asc' ? 'desc' : 'asc');
    };

    _this.state = {
      columnWidth: (0, _isNullOrUndefined2.default)(props.flexGrow) ? props.width : 0
    };
    return _this;
  }

  _createClass(HeaderCell, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.width !== nextProps.width || this.props.flexGrow !== nextProps.flexGrow) {
        this.state = {
          columnWidth: (0, _isNullOrUndefined2.default)(nextProps.flexGrow) ? nextProps.width : 0
        };
      }
    }
  }, {
    key: 'renderResizeSpanner',
    value: function renderResizeSpanner() {
      var _props = this.props,
          resizable = _props.resizable,
          left = _props.left,
          onColumnResizeMove = _props.onColumnResizeMove,
          fixed = _props.fixed,
          headerHeight = _props.headerHeight;
      var _state = this.state,
          columnWidth = _state.columnWidth,
          initialEvent = _state.initialEvent;


      if (!resizable) {
        return null;
      }

      return _react2.default.createElement(_ColumnResizeHandler2.default, {
        columnWidth: columnWidth,
        columnLeft: left,
        columnFixed: fixed,
        height: headerHeight,
        initialEvent: initialEvent,
        onColumnResizeMove: onColumnResizeMove,
        onColumnResizeStart: this.onColumnResizeStart,
        onColumnResizeEnd: this.onColumnResizeEnd
      });
    }
  }, {
    key: 'renderSortColumn',
    value: function renderSortColumn() {
      var _props2 = this.props,
          _props2$left = _props2.left,
          left = _props2$left === undefined ? 0 : _props2$left,
          _props2$headerHeight = _props2.headerHeight,
          headerHeight = _props2$headerHeight === undefined ? 0 : _props2$headerHeight,
          _props2$width = _props2.width,
          width = _props2$width === undefined ? 0 : _props2$width,
          sortable = _props2.sortable,
          sortColumn = _props2.sortColumn,
          sortType = _props2.sortType,
          dataKey = _props2.dataKey;
      var _state$columnWidth = this.state.columnWidth,
          columnWidth = _state$columnWidth === undefined ? 0 : _state$columnWidth;

      var styles = {
        left: (columnWidth || width) + left - 16,
        top: headerHeight / 2 - 10
      };

      if (sortable) {
        return _react2.default.createElement(
          'div',
          {
            style: styles,
            className: this.prefix('sortable')
          },
          _react2.default.createElement('i', { className: sortColumn === dataKey ? 'icon icon-sort-' + sortType : 'icon icon-sort' })
        );
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {

      var classes = this.prefix('cell-header');

      return _react2.default.createElement(
        'div',
        {
          className: classes
        },
        _react2.default.createElement(_Cell2.default, _extends({}, this.props, {
          isHeaderCell: true,
          onClick: this.handleClick
        })),
        this.renderSortColumn(),
        this.renderResizeSpanner()
      );
    }
  }]);

  return HeaderCell;
}(_react2.default.Component);

HeaderCell.propTypes = propTypes;

exports.default = (0, _decorate2.default)()(HeaderCell);