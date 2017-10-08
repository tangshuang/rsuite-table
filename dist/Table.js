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

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _domLib = require('dom-lib');

var _decorate = require('./utils/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _CellGroup = require('./CellGroup');

var _CellGroup2 = _interopRequireDefault(_CellGroup);

var _Scrollbar = require('./Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var handleClass = { add: _domLib.addClass, remove: _domLib.removeClass };
var ReactChildren = _react2.default.Children;

function getTotalByColumns(columns) {
  var totalFlexGrow = 0;
  var totalWidth = 0;

  var count = function count(items) {
    Array.from(items).forEach(function (column) {
      if (_react2.default.isValidElement(column)) {
        var _column$props = column.props,
            flexGrow = _column$props.flexGrow,
            _column$props$width = _column$props.width,
            width = _column$props$width === undefined ? 0 : _column$props$width;

        totalFlexGrow += flexGrow || 0;
        totalWidth += flexGrow ? 0 : width;
      } else if ((0, _isArray2.default)(column)) {
        count(column);
      }
    });
  };
  count(columns);
  return {
    totalFlexGrow: totalFlexGrow,
    totalWidth: totalWidth
  };
}

function cloneCell(Cell, props) {
  return _react2.default.cloneElement(Cell, props);
}

var propTypes = {
  width: _propTypes2.default.number,
  /* eslint-disable */
  data: _propTypes2.default.array,
  height: _propTypes2.default.number,
  rowHeight: _propTypes2.default.number,
  headerHeight: _propTypes2.default.number,
  onRowClick: _propTypes2.default.func,
  isTree: _propTypes2.default.bool,
  expand: _propTypes2.default.bool,
  /* eslint-disable */
  locale: _propTypes2.default.object,
  sortColumn: _propTypes2.default.string,
  sortType: _propTypes2.default.oneOf(['desc', 'asc']),
  /**
   * @callback
   * @params: sortColumn dataKey
   * @params: sortType
   */
  onSortColumn: _propTypes2.default.func,
  onRerenderRowHeight: _propTypes2.default.func,
  onTreeToggle: _propTypes2.default.func,
  renderTreeToggle: _propTypes2.default.func,
  disabledScroll: _propTypes2.default.bool,
  hover: _propTypes2.default.bool,
  loading: _propTypes2.default.bool,
  onScroll: _propTypes2.default.func
};

var defaultProps = {
  rowHeight: 36,
  sortType: 'asc',
  hover: true,
  locale: {
    emptyMessage: 'No data found',
    loading: _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('i', { className: 'icon icon-cog icon-lg icon-spin' }),
      _react2.default.createElement(
        'span',
        null,
        'Loading...'
      )
    )
  }
};

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.onWindowResize = function () {
      var parentNode = _this.table.parentNode;
      var overflow = parentNode.style.overflow;
      parentNode.style.overflow = 'hidden'; // 这样可以让外部的容器恢复正常的弹性高度，防止被table撑开之后根本无法改变大小

      _this.reportTableWidth();
      _this.reportTableContextHeight();
      _this.reportTableContentWidth();
      _this.updatePosition();

      parentNode.style.overflow = overflow;
    };

    _this.onColumnResizeEnd = function (columnWidth, cursorDelta, dataKey, index) {
      _this.setState(_defineProperty({
        isColumnResizing: false
      }, dataKey + '_' + index + '_width', columnWidth));
      (0, _domLib.addStyle)(_this.mouseArea, {
        display: 'none'
      });
    };

    _this.onColumnResizeStart = function (width, left, fixed) {
      _this.setState({
        isColumnResizing: true
      });
      var mouseAreaLeft = width + left;
      var x = fixed ? mouseAreaLeft : mouseAreaLeft + (_this.scrollX || 0);
      var styles = { display: 'block' };
      (0, _domLib.translateDOMPositionXY)(styles, x, 0);
      (0, _domLib.addStyle)(_this.mouseArea, styles);
    };

    _this.onColumnResizeMove = function (width, left, fixed) {
      var mouseAreaLeft = width + left;
      var x = fixed ? mouseAreaLeft : mouseAreaLeft + (_this.scrollX || 0);
      var styles = {};
      (0, _domLib.translateDOMPositionXY)(styles, x, 0);
      (0, _domLib.addStyle)(_this.mouseArea, styles);
    };

    _this.onTreeToggle = function (rowKey, rowIndex, rowData) {
      var onTreeToggle = _this.props.onTreeToggle;

      var expandIcon = _this.treeChildren[rowKey].ref;
      var isOpen = (0, _domLib.hasClass)(expandIcon, 'open');

      if (isOpen) {
        (0, _domLib.removeClass)(expandIcon, 'open');
      } else {
        (0, _domLib.addClass)(expandIcon, 'open');
      }

      _this.reportTableContextHeight();
      onTreeToggle && onTreeToggle(!isOpen, rowData);
    };

    _this.handleScrollX = function (delta) {
      _this.handleWheel(delta, 0);
    };

    _this.handleScrollY = function (delta) {
      _this.handleWheel(0, delta);
    };

    _this.handleWheel = function (deltaX, deltaY) {
      var onScroll = _this.props.onScroll;

      if (!_this.isMounted) {
        return;
      }
      var nextScrollX = _this.scrollX - deltaX;
      var nextScrollY = _this.scrollY - deltaY;

      _this.scrollY = Math.min(0, nextScrollY < _this.minScrollY ? _this.minScrollY : nextScrollY);
      _this.scrollX = Math.min(0, nextScrollX < _this.minScrollX ? _this.minScrollX : nextScrollX);
      _this.updatePosition();

      onScroll && onScroll(_this.scrollX, _this.scrollY);
    };

    _this.handleTouchStart = function (event) {
      var _event$touches$ = event.touches[0],
          pageX = _event$touches$.pageX,
          pageY = _event$touches$.pageY;

      _this.touchX = pageX;
      _this.touchY = pageY;
    };

    _this.handleTouchMove = function (event) {
      event.stopPropagation();
      event.preventDefault();
      var _event$touches$2 = event.touches[0],
          nextPageX = _event$touches$2.pageX,
          nextPageY = _event$touches$2.pageY;

      var deltaX = _this.touchX - nextPageX;
      var deltaY = _this.touchY - nextPageY;
      _this.handleWheel(deltaX, deltaY);
      _this.scrollbarX.onWheelScroll(deltaX);
      _this.scrollbarY.onWheelScroll(deltaY);
      _this.touchX = nextPageX;
      _this.touchY = nextPageY;
    };

    _this.shouldHandleWheelX = function (delta) {
      var _this$props = _this.props,
          disabledScroll = _this$props.disabledScroll,
          loading = _this$props.loading;

      if (delta === 0 || disabledScroll || loading) {
        return false;
      }

      if (_this.state.contentWidth <= _this.state.width) {
        return false;
      }

      return delta >= 0 && _this.scrollX > _this.minScrollX || delta < 0 && _this.scrollX < 0;
    };

    _this.shouldHandleWheelY = function (delta) {
      var _this$props2 = _this.props,
          disabledScroll = _this$props2.disabledScroll,
          loading = _this$props2.loading;

      if (delta === 0 || disabledScroll || loading) {
        return false;
      }
      return delta >= 0 && _this.scrollY > _this.minScrollY || delta < 0 && _this.scrollY < 0;
    };

    _this.reportTableWidth = function () {
      var table = _this.table;
      var previousTableWidth = _this.state.width;
      if (table) {
        _this.setState({
          width: (0, _domLib.getWidth)(table)
        }, function () {
          if (previousTableWidth !== _this.state.width) {
            _this.scrollX = 0;
            _this.scrollbarX && _this.scrollbarX.resetScrollBarPosition();
            _this.handleScrollX(0);
          }
        });
      }
    };

    _this.state = {
      width: props.width,
      height: props.height,
      columnWidth: 0,
      dataKey: 0,
      shouldFixedColumn: false,
      contentHeight: 0,
      contentWidth: 0
    };
    _this.treeChildren = {};
    _this.mounted = false;
    return _this;
  }

  _createClass(Table, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var _props$children = this.props.children,
          children = _props$children === undefined ? [] : _props$children;

      var shouldFixedColumn = Array.from(children).some(function (child) {
        return child.props && child.props.fixed;
      });

      this.scrollY = 0;
      this.scrollX = 0;
      this.wheelHandler = new _domLib.WheelHandler(function (deltaX, deltaY) {
        _this2.handleWheel(deltaX, deltaY);
        _this2.scrollbarX.onWheelScroll(deltaX);
        _this2.scrollbarY.onWheelScroll(deltaY);
      }, this.shouldHandleWheelX, this.shouldHandleWheelY);
      this.setState({ shouldFixedColumn: shouldFixedColumn });
      this.isMounted = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onWindowResizeListener = (0, _domLib.on)(window, 'resize', (0, _debounce2.default)(this.onWindowResize, 100));
      this.reportTableWidth();
      this.reportTableContextHeight();
      this.updatePosition();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._UpdateProps = true;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _isEqual2.default)(this.state, nextState) || this._UpdateProps;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this._UpdateProps = false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.reportTableWidth();
      this.reportTableContextHeight();
      this.reportTableContentWidth();
      this.updatePosition();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.onWheelListener) {
        this.onWheelListener.off();
      }
      if (this.onWindowResizeListener) {
        this.onWindowResizeListener.off();
      }
      this.isMounted = false;
    }
  }, {
    key: 'treeToggle',


    /**
     * public api
     * @param {*} open
     */
    value: function treeToggle(open, iteratee) {
      var buttons = this.treeChildren;
      var toggle = { addClass: _domLib.addClass, removeClass: _domLib.removeClass };
      var key = open ? 'addClass' : 'removeClass';
      Object.values(buttons).forEach(function (item) {
        if ((0, _isUndefined2.default)(iteratee)) {
          toggle[key](item.ref, 'open');
        } else {
          if (iteratee(item.rowData)) {
            toggle[key](item.ref, 'open');
          }
        }
      });
      this.reportTableContextHeight();
    }
  }, {
    key: 'treeToggleBy',
    value: function treeToggleBy(open, iteratee) {
      this.treeToggle(open, iteratee);
    }
  }, {
    key: 'getScrollCellGroups',
    value: function getScrollCellGroups() {
      return this.table.querySelectorAll('.' + this.prefix('cell-group.scroll'));
    }
  }, {
    key: 'getFixedCellGroups',
    value: function getFixedCellGroups() {
      return this.table.querySelectorAll('.' + this.prefix('cell-group.fixed'));
    }
  }, {
    key: 'getCells',
    value: function getCells() {
      var _this3 = this;

      var left = 0; // Cell left margin
      var headerCells = []; // Table header cell
      var bodyCells = []; // Table body cell
      var columns = this.props.children;

      if (!columns) {
        return {
          headerCells: headerCells,
          bodyCells: bodyCells,
          allColumnsWidth: left
        };
      }

      var tableWidth = this.state.width;
      var _props = this.props,
          sortColumn = _props.sortColumn,
          sortType = _props.sortType,
          onSortColumn = _props.onSortColumn,
          rowHeight = _props.rowHeight,
          headerHeight = _props.headerHeight;

      var _getTotalByColumns = getTotalByColumns(columns),
          totalFlexGrow = _getTotalByColumns.totalFlexGrow,
          totalWidth = _getTotalByColumns.totalWidth;

      ReactChildren.forEach(columns, function (column, index) {

        if (_react2.default.isValidElement(column)) {

          var columnChildren = column.props.children;
          var _column$props2 = column.props,
              width = _column$props2.width,
              resizable = _column$props2.resizable,
              flexGrow = _column$props2.flexGrow,
              minWidth = _column$props2.minWidth;


          if (columnChildren.length !== 2) {
            throw new Error('Component <HeaderCell> and <Cell> is required, column index: ' + index + ' ');
          }

          var nextWidth = _this3.state[columnChildren[1].props.dataKey + '_' + index + '_width'] || width || 0;

          if (tableWidth && flexGrow && totalFlexGrow) {
            nextWidth = Math.max((tableWidth - totalWidth) / totalFlexGrow * flexGrow, minWidth || 60);
          }

          var cellProps = _extends({}, (0, _pick2.default)(column.props, Object.keys(_Column2.default.propTypes)), {
            left: left,
            index: index,
            headerHeight: headerHeight,
            width: nextWidth,
            height: rowHeight,
            firstColumn: index === 0,
            lastColumn: index === columns.length - 1,
            key: index
          });

          var headerCellsProps = {
            headerHeight: headerHeight || rowHeight,
            dataKey: columnChildren[1].props.dataKey,
            sortColumn: sortColumn,
            sortType: sortType,
            onSortColumn: onSortColumn,
            flexGrow: flexGrow
          };

          if (resizable) {
            headerCellsProps.onColumnResizeEnd = _this3.onColumnResizeEnd;
            headerCellsProps.onColumnResizeStart = _this3.onColumnResizeStart;
            headerCellsProps.onColumnResizeMove = _this3.onColumnResizeMove;
          }

          headerCells.push(cloneCell(columnChildren[0], _extends({}, cellProps, headerCellsProps)));
          bodyCells.push(cloneCell(columnChildren[1], cellProps));

          left += nextWidth;
        }
      });

      return {
        headerCells: headerCells,
        bodyCells: bodyCells,
        allColumnsWidth: left
      };
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      /**
      * 当存在锁定列情况处理
      */
      if (this.state.shouldFixedColumn) {
        this.updatePositionByFixedCell();
      } else {
        var wheelStyle = {};
        var headerStyle = {};
        (0, _domLib.translateDOMPositionXY)(wheelStyle, this.scrollX, this.scrollY);
        (0, _domLib.translateDOMPositionXY)(headerStyle, this.scrollX, 0);

        this.wheelWrapper && (0, _domLib.addStyle)(this.wheelWrapper, wheelStyle);
        this.headerWrapper && (0, _domLib.addStyle)(this.headerWrapper, headerStyle);
      }
      handleClass[this.scrollY < 0 ? 'add' : 'remove'](this.tableHeader, 'shadow');
    }
  }, {
    key: 'updatePositionByFixedCell',
    value: function updatePositionByFixedCell() {
      var _this4 = this;

      var wheelGroupStyle = {};
      var wheelStyle = {};
      var scrollGroups = this.getScrollCellGroups();
      var fixedGroups = this.getFixedCellGroups();

      (0, _domLib.translateDOMPositionXY)(wheelGroupStyle, this.scrollX, 0);
      (0, _domLib.translateDOMPositionXY)(wheelStyle, 0, this.scrollY);

      Array.from(scrollGroups).forEach(function (group) {
        (0, _domLib.addStyle)(group, wheelGroupStyle);
      });

      (0, _domLib.addStyle)(this.wheelWrapper, wheelStyle);
      Array.from(fixedGroups).forEach(function (group) {
        handleClass[_this4.scrollX < 0 ? 'add' : 'remove'](group, 'shadow');
      });
    }
  }, {
    key: 'renderRowData',
    value: function renderRowData(bodyCells, rowData, props) {
      var _this5 = this;

      var _props2 = this.props,
          onRowClick = _props2.onRowClick,
          renderTreeToggle = _props2.renderTreeToggle;

      var hasChildren = this.props.isTree && rowData.children && Array.isArray(rowData.children);

      var rowKey = '_' + (Math.random() * 1E18).toString(36).slice(0, 5).toUpperCase() + '_' + props.index;
      var row = this.renderRow({
        key: props.index,
        width: props.rowWidth,
        height: props.rowHeight,
        top: props.top,
        onClick: function onClick() {
          onRowClick && onRowClick(rowData);
        }
      }, bodyCells.map(function (cell) {
        return _react2.default.cloneElement(cell, {
          hasChildren: hasChildren,
          layer: props.layer,
          height: props.rowHeight,
          rowIndex: props.index,
          renderTreeToggle: renderTreeToggle,
          onTreeToggle: _this5.onTreeToggle,
          rowKey: rowKey,
          rowData: rowData
        });
      }));

      // insert children
      if (hasChildren) {
        props.layer += 1;

        var childrenClasses = (0, _classnames2.default)(this.prefix('row-children'), {
          open: this.props.expand
        });

        return _react2.default.createElement(
          'div',
          {
            className: childrenClasses,
            key: props.index,
            'data-layer': props.layer,
            ref: function ref(_ref) {
              if (_ref) {
                _this5.treeChildren[rowKey] = { ref: _ref, rowData: rowData };
              }
            }
          },
          row,
          _react2.default.createElement(
            'div',
            { className: 'children' },
            rowData.children.map(function (child, index) {
              return _this5.renderRowData(bodyCells, child, _extends({}, props, {
                index: index
              }));
            })
          )
        );
      }

      return row;
    }
  }, {
    key: 'reportTableContentWidth',
    value: function reportTableContentWidth() {
      var _this6 = this;

      var table = this.table;

      var row = table.querySelectorAll('.' + this.prefix('row-header'))[0];
      var contentWidth = (0, _domLib.getWidth)(row);
      var currentContentWidth = this.state.contentWidth;

      this.setState({ contentWidth: contentWidth }, function () {
        // 这里 -10 是为了让滚动条不挡住内容部分
        _this6.minScrollX = -(contentWidth - _this6.state.width) - 10;
        if (currentContentWidth !== contentWidth) {
          _this6.scrollX = 0;
          _this6.scrollbarX && _this6.scrollbarX.resetScrollBarPosition();
        }
      });
    }
  }, {
    key: 'reportTableContextHeight',
    value: function reportTableContextHeight() {
      var _this7 = this;

      var table = this.table;
      var parentEl = table.parentNode;
      var parentRect = parentEl.getBoundingClientRect();
      var parentHeight = parentRect.height;

      var rows = table.querySelectorAll('.' + this.prefix('row'));
      var _props3 = this.props,
          height = _props3.height,
          rowHeight = _props3.rowHeight,
          headerHeight = _props3.headerHeight;


      if (!height) {
        height = parentHeight || 400;
      }

      var contentHeight = 0;
      Array.from(rows).forEach(function (row) {
        contentHeight += (0, _domLib.getHeight)(row);
      });

      var currentContentHeight = this.state.contentHeight;
      var nextContentHeight = contentHeight - (headerHeight || rowHeight);
      this.setState({
        height: height,
        contentHeight: nextContentHeight
      }, function () {
        // 这里 -10 是为了让滚动条不挡住内容部分
        _this7.minScrollY = -(contentHeight - height) - 10;
        if (currentContentHeight !== nextContentHeight) {
          _this7.scrollY = 0;
          _this7.scrollbarY && _this7.scrollbarY.resetScrollBarPosition();
        }
      });
    }
  }, {
    key: 'renderRow',
    value: function renderRow(props, cells) {

      // IF there are fixed columns, add a fixed group
      if (this.state.shouldFixedColumn) {

        var fixedCells = cells.filter(function (cell) {
          return cell.props.fixed;
        });
        var otherCells = cells.filter(function (cell) {
          return !cell.props.fixed;
        });
        var fixedCellGroupWidth = 0;

        fixedCells.forEach(function (item) {
          fixedCellGroupWidth += item.props.width;
        });

        return _react2.default.createElement(
          _Row2.default,
          props,
          _react2.default.createElement(
            _CellGroup2.default,
            {
              fixed: true,
              height: props.isHeaderRow ? props.headerHeight : props.height,
              width: fixedCellGroupWidth
            },
            fixedCells
          ),
          _react2.default.createElement(
            _CellGroup2.default,
            null,
            otherCells
          )
        );
      }

      return _react2.default.createElement(
        _Row2.default,
        props,
        _react2.default.createElement(
          _CellGroup2.default,
          null,
          cells
        )
      );
    }
  }, {
    key: 'renderMouseArea',
    value: function renderMouseArea() {
      var _this8 = this;

      var _state$height = this.state.height,
          height = _state$height === undefined ? 400 : _state$height;

      var styles = { height: height };

      return _react2.default.createElement('div', {
        ref: function ref(_ref2) {
          return _this8.mouseArea = _ref2;
        },
        className: this.prefix('mouse-area'),
        style: styles
      });
    }
  }, {
    key: 'renderTableHeader',
    value: function renderTableHeader(headerCells, rowWidth) {
      var _this9 = this;

      var _props4 = this.props,
          rowHeight = _props4.rowHeight,
          headerHeight = _props4.headerHeight;

      var row = this.renderRow({
        rowRef: function rowRef(ref) {
          _this9.tableHeader = ref;
        },
        width: rowWidth,
        height: rowHeight,
        headerHeight: headerHeight,
        isHeaderRow: true,
        top: 0
      }, headerCells);

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref3) {
            _this9.headerWrapper = _ref3;
          },
          className: this.prefix('header-row-wrapper')
        },
        row
      );
    }
  }, {
    key: 'renderTableBody',
    value: function renderTableBody(bodyCells, rowWidth) {
      var _this10 = this;

      var _props5 = this.props,
          headerHeight = _props5.headerHeight,
          rowHeight = _props5.rowHeight,
          data = _props5.data,
          isTree = _props5.isTree,
          onRerenderRowHeight = _props5.onRerenderRowHeight;
      var _state$height2 = this.state.height,
          height = _state$height2 === undefined ? 400 : _state$height2;


      var bodyStyles = {
        top: isTree ? 0 : headerHeight || rowHeight,
        height: height - (headerHeight || rowHeight)
      };

      var top = 0; // Row position
      var rows = null;
      if (data && data.length > 0) {
        rows = data.map(function (rowData, index) {
          var nextRowHeight = rowHeight;
          /**
           * 自定义行高
           */
          if (onRerenderRowHeight) {
            nextRowHeight = onRerenderRowHeight(rowData) || rowHeight;
          }

          var row = _this10.renderRowData(bodyCells, rowData, {
            index: index,
            top: top,
            rowWidth: rowWidth,
            layer: 0,
            rowHeight: nextRowHeight
          });

          !isTree && (top += nextRowHeight);
          return row;
        });
      }

      var wheelStyles = {
        position: 'absolute'
      };

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref5) {
            _this10.tableBody = _ref5;
          },
          className: this.prefix('body-row-wrapper'),
          style: bodyStyles,
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onWheel: this.wheelHandler.onWheel
        },
        _react2.default.createElement(
          'div',
          {
            style: wheelStyles,
            className: this.prefix('body-wheel-area'),
            ref: function ref(_ref4) {
              _this10.wheelWrapper = _ref4;
            }
          },
          rows
        ),
        this.renderInfo(rows === null),
        this.renderScrollbar(),
        this.renderLoading()
      );
    }
  }, {
    key: 'renderInfo',
    value: function renderInfo(shouldShow) {

      if (!shouldShow) {
        return null;
      }

      var locale = this.props.locale;


      return _react2.default.createElement(
        'div',
        { className: this.prefix('body-info') },
        locale.emptyMessage
      );
    }
  }, {
    key: 'renderScrollbar',
    value: function renderScrollbar() {
      var _this11 = this;

      var _props6 = this.props,
          disabledScroll = _props6.disabledScroll,
          headerHeight = _props6.headerHeight,
          rowHeight = _props6.rowHeight,
          loading = _props6.loading;
      var _state$height3 = this.state.height,
          height = _state$height3 === undefined ? 400 : _state$height3;
      var _state = this.state,
          contentWidth = _state.contentWidth,
          contentHeight = _state.contentHeight;


      if (disabledScroll || loading) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Scrollbar2.default, {
          length: this.state.width,
          onScroll: this.handleScrollX,
          scrollLength: contentWidth,
          ref: function ref(_ref6) {
            _this11.scrollbarX = _ref6;
          }
        }),
        _react2.default.createElement(_Scrollbar2.default, {
          vertical: true,
          length: height - (headerHeight || rowHeight),
          scrollLength: contentHeight,
          onScroll: this.handleScrollY,
          ref: function ref(_ref7) {
            _this11.scrollbarY = _ref7;
          }
        })
      );
    }

    /**
     *  show loading
     */

  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      var _props7 = this.props,
          loading = _props7.loading,
          locale = _props7.locale;


      if (!loading) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: this.prefix('loading-wrapper') },
        _react2.default.createElement(
          'div',
          { className: this.prefix('loading') },
          locale.loading
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames,
          _this12 = this;

      var _props8 = this.props,
          children = _props8.children,
          className = _props8.className,
          _props8$width = _props8.width,
          width = _props8$width === undefined ? 0 : _props8$width,
          style = _props8.style,
          rowHeight = _props8.rowHeight,
          isTree = _props8.isTree,
          hover = _props8.hover,
          forceUpdate = _props8.forceUpdate,
          props = _objectWithoutProperties(_props8, ['children', 'className', 'width', 'style', 'rowHeight', 'isTree', 'hover', 'forceUpdate']);

      var _state$height4 = this.state.height,
          height = _state$height4 === undefined ? 400 : _state$height4;

      var _getCells = this.getCells(),
          headerCells = _getCells.headerCells,
          bodyCells = _getCells.bodyCells,
          allColumnsWidth = _getCells.allColumnsWidth;

      var rowWidth = allColumnsWidth > width ? allColumnsWidth : width;
      var clesses = (0, _classnames2.default)(_decorate.globalClassName, (_classNames = {}, _defineProperty(_classNames, this.prefix('treetable'), isTree), _defineProperty(_classNames, 'column-resizing', this.state.isColumnResizing), _defineProperty(_classNames, 'table-hover', hover), _classNames), className);

      var styles = _extends({
        width: width || 'auto',
        height: height
      }, style);

      var elementProps = (0, _omit2.default)(props, Object.keys(propTypes));

      return _react2.default.createElement(
        'div',
        _extends({}, elementProps, {
          className: clesses,
          style: styles,
          ref: function ref(_ref8) {
            _this12.table = _ref8;
          }
        }),
        this.renderTableHeader(headerCells, rowWidth),
        children && this.renderTableBody(bodyCells, rowWidth),
        this.renderMouseArea()
      );
    }
  }, {
    key: 'isMounted',
    get: function get() {
      return this.mounted;
    },
    set: function set(isMounted) {
      this.mounted = isMounted;
    }

    /**
     * 处理移动端 Touch 事件
     * Start 的时候初始化 x,y
     **/


    /**
     * 处理移动端 Touch 事件
     * Move 的时候初始化，更新 scroll
     **/

  }]);

  return Table;
}(_react2.default.Component);

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

exports.default = (0, _decorate2.default)()(Table);