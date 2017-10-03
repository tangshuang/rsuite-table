'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rsuite = require('rsuite');

var _decorate = require('./utils/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  lengthMenu: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.number,
    text: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
  })),
  showLengthMenu: _propTypes2.default.bool,
  showInfo: _propTypes2.default.bool,
  total: _propTypes2.default.number.isRequired,
  displayLength: _propTypes2.default.number,
  formatLengthMenu: _propTypes2.default.func,
  formatInfo: _propTypes2.default.func,
  onChangePage: _propTypes2.default.func,
  onChangeLength: _propTypes2.default.func,
  prev: _propTypes2.default.bool,
  next: _propTypes2.default.bool,
  first: _propTypes2.default.bool,
  last: _propTypes2.default.bool,
  maxButtons: _propTypes2.default.number,
  activePage: _propTypes2.default.number
};

var defaultProps = {
  showLengthMenu: true,
  showInfo: true,
  lengthMenu: [{
    value: 30,
    text: 30
  }, {
    value: 50,
    text: 50
  }, {
    value: 100,
    text: 100
  }],
  displayLength: 30,
  prev: true,
  next: true,
  first: true,
  last: true,
  maxButtons: 5
};

var TablePagination = function (_React$Component) {
  _inherits(TablePagination, _React$Component);

  function TablePagination(props) {
    _classCallCheck(this, TablePagination);

    var _this = _possibleConstructorReturn(this, (TablePagination.__proto__ || Object.getPrototypeOf(TablePagination)).call(this, props));

    _this.handleChangeLength = function (eventKey) {
      var onChangeLength = _this.props.onChangeLength;

      _this.setState({
        displayLength: eventKey
      });
      onChangeLength && onChangeLength(eventKey);
    };

    _this.handleChangePage = function (eventKey) {
      var onChangePage = _this.props.onChangePage;

      _this.setState({
        activePage: eventKey
      });
      onChangePage && onChangePage(eventKey);
    };

    _this.state = {
      displayLength: props.displayLength,
      activePage: props.activePage || 1
    };
    return _this;
  }

  _createClass(TablePagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          displayLength = _props.displayLength,
          activePage = _props.activePage;

      if (displayLength !== nextProps.displayLength || activePage !== nextProps.activePage) {
        this.setState({
          displayLength: nextProps.displayLength,
          activePage: nextProps.activePage
        });
      }
    }
  }, {
    key: 'renderLengthMenu',
    value: function renderLengthMenu() {
      var _props2 = this.props,
          lengthMenu = _props2.lengthMenu,
          formatLengthMenu = _props2.formatLengthMenu,
          showLengthMenu = _props2.showLengthMenu;
      var displayLength = this.state.displayLength;


      if (!showLengthMenu) {
        return null;
      }

      var items = lengthMenu.map(function (item) {
        return _react2.default.createElement(
          _rsuite.Dropdown.Item,
          {
            key: item.value,
            eventKey: item.value
          },
          item.text
        );
      });

      var dropdown = _react2.default.createElement(
        _rsuite.Dropdown,
        {
          shape: 'default',
          activeKey: displayLength,
          onSelect: this.handleChangeLength,
          dropup: true,
          select: true
        },
        items
      );

      return _react2.default.createElement(
        'div',
        { className: this.prefix('length-menu') },
        formatLengthMenu ? formatLengthMenu(dropdown) : dropdown
      );
    }
  }, {
    key: 'renderInfo',
    value: function renderInfo() {
      var _props3 = this.props,
          formatInfo = _props3.formatInfo,
          total = _props3.total,
          showInfo = _props3.showInfo;


      if (!showInfo) {
        return null;
      }

      var activePage = this.state.activePage;

      return _react2.default.createElement(
        'div',
        { className: this.prefix('page-info') },
        formatInfo ? formatInfo(total, activePage) : _react2.default.createElement(
          'span',
          null,
          'Total: ',
          total
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          total = _props4.total,
          prev = _props4.prev,
          next = _props4.next,
          first = _props4.first,
          last = _props4.last,
          maxButtons = _props4.maxButtons,
          className = _props4.className;
      var _state = this.state,
          displayLength = _state.displayLength,
          activePage = _state.activePage;

      var pages = Math.floor(total / displayLength) + (total % displayLength ? 1 : 0);
      var classes = (0, _classnames2.default)(this.prefix('pagination-wrapper'), className);

      return _react2.default.createElement(
        'div',
        { className: classes },
        this.renderLengthMenu(),
        this.renderInfo(),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(this.prefix('pagination')) },
          _react2.default.createElement(_rsuite.Pagination, {
            prev: prev,
            next: next,
            first: first,
            last: last,
            maxButtons: maxButtons,
            pages: pages,
            onSelect: this.handleChangePage,
            activePage: activePage
          })
        )
      );
    }
  }]);

  return TablePagination;
}(_react2.default.Component);

TablePagination.propTypes = propTypes;
TablePagination.defaultProps = defaultProps;

exports.default = (0, _decorate2.default)()(TablePagination);