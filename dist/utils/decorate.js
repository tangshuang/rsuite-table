'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalClassName = undefined;
exports.default = decorate;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalClassName = exports.globalClassName = 'rsuite-table';
function decorate() {
  var skin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    prefixClass: globalClassName
  };

  return function (Component) {
    var prefixClass = skin.prefixClass;

    var propTypes = Component.propTypes || (Component.propTypes = {});
    var defaultProps = Component.defaultProps || (Component.defaultProps = {});

    propTypes.prefixClass = _propTypes2.default.string;
    defaultProps.prefixClass = prefixClass;

    Component.prototype.prefix = function (className) {
      return prefixClass + '-' + className;
    };

    return Component;
  };
}