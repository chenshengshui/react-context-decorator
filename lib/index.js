'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.injectContext = exports.ContextProvider = exports.Context = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Context = exports.Context = _react2.default.createContext();

var ContextProvider = exports.ContextProvider = function (_Component) {
    _inherits(ContextProvider, _Component);

    function ContextProvider() {
        _classCallCheck(this, ContextProvider);

        return _possibleConstructorReturn(this, (ContextProvider.__proto__ || Object.getPrototypeOf(ContextProvider)).apply(this, arguments));
    }

    _createClass(ContextProvider, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                Context.Provider,
                { value: this.props.context },
                this.props.children
            );
        }
    }]);

    return ContextProvider;
}(_react.Component);

/**
 * 用注解的方式给子组件注入属性
 */

var injectContext = exports.injectContext = function injectContext(contexts) {
    return function (RealComponent) {
        return function (_Component2) {
            _inherits(_class, _Component2);

            function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            _createClass(_class, [{
                key: 'render',
                value: function render() {
                    var _this3 = this;

                    return _react2.default.createElement(
                        Context.Consumer,
                        null,
                        function (context) {
                            // 将顶层的context分发到各层
                            var mapContext = {};
                            if (Array.isArray(contexts)) {
                                contexts.map(function (item) {
                                    mapContext[item] = context[item];
                                });
                            }
                            return _react2.default.createElement(RealComponent, _extends({}, mapContext, _this3.props));
                        }
                    );
                }
            }]);

            return _class;
        }(_react.Component);
    };
};