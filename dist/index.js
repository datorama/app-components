'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var fp = require('lodash/fp');
var moment = _interopDefault(require('moment'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol, ul {\n  list-style: none;\n}\nblockquote, q {\n  quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  overflow-x: hidden;\n}\n\n*:focus {\n  outline: none;\n}\n\ninput, select, textarea, button{\n  font-family: 'Open Sans', sans-serif;\n}\n";
styleInject(css);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// light theme
var lightPrimary = {
  p0: '#ffffff',
  p50: '#F7F8FA',
  p100: '#F1F2F5',
  p200: '#CCCED3',
  p300: '#9EA0A5',
  p400: '#67696F',
  p500: '#4F5053',
  p600: '#37383A',
  p700: '#2E2F30'
};

var lightAccent = {
  a100: '#E3F2FD',
  a200: '#BBDEFB',
  a300: '#77C5FD',
  a350: '#40B2FE',
  a400: '#09A0FF',
  a500: '#317EEB',
  a600: '#1C61D7',
  a700: '#0D47A1',
  a800: '#072A60'
};

// dark theme
var darkPrimary = {
  p700: '#ffffff',
  p600: '#F7F8FA',
  p500: '#F1F2F5',
  p400: '#CCCED3',
  p300: '#9EA0A5',
  p200: '#67696F',
  p100: '#4F5053',
  p50: '#37383A',
  p0: '#2E2F30'
};

var darkAccent = {
  a800: '#E3F2FD',
  a700: '#BBDEFB',
  a600: '#77C5FD',
  a500: '#40B2FE',
  a400: '#09A0FF',
  a350: '#317EEB',
  a300: '#1C61D7',
  a200: '#0D47A1',
  a100: '#072A60'
};

var reds = {
  r50: '#FBEDED',
  r100: '#F6D1D2',
  r200: '#EEA5A5',
  r300: '#E67878',
  r400: '#DE4B4C',
  r500: '#B83E3F',
  r600: '#923132',
  r700: '#6B2424',
  r800: '#551C1D'
};

var greens = {
  g50: '#E7F8EF',
  g100: '#C2EDD8',
  g200: '#86DBB1',
  g300: '#49C98A',
  g400: '#0DB864',
  g500: '#0A9853',
  g600: '#087941',
  g700: '#065930',
  g800: '#044626'
};

var yellows = {
  y50: '#FFF8E7',
  y100: '#FFF2CF',
  y200: '#FFE6A0',
  y300: '#FFDA71',
  y400: '#FFCE42',
  y500: '#D4AB36',
  y600: '#A8872B',
  y700: '#7C6420',
  y800: '#624F19'
};

var oranges = {
  o50: '#FFF4E6',
  o100: '#FFE5BF',
  o200: '#FFCB80',
  o300: '#FFB141',
  o400: '#FF9802',
  o500: '#FF8601',
  o600: '#FF7301',
  o700: '#994500',
  o800: '#402100'
};

var darkTheme = _extends({}, darkPrimary, darkAccent, reds, greens, yellows, oranges);
var lightTheme = _extends({}, lightPrimary, lightAccent, reds, greens, yellows, oranges);

var list = _extends({}, lightAccent, lightPrimary, darkAccent, darkPrimary, reds, greens, yellows, oranges);

var _templateObject = taggedTemplateLiteral(['\n  font-size: 34px;\n  font-weight: 300;\n  color: ', ';\n'], ['\n  font-size: 34px;\n  font-weight: 300;\n  color: ', ';\n']),
    _templateObject2 = taggedTemplateLiteral(['\n  font-size: 18px;\n  font-weight: 600;\n  color: ', ';\n'], ['\n  font-size: 18px;\n  font-weight: 600;\n  color: ', ';\n']),
    _templateObject3 = taggedTemplateLiteral(['\n  font-size: 14px;\n  font-weight: 400;\n  color: ', ';\n'], ['\n  font-size: 14px;\n  font-weight: 400;\n  color: ', ';\n']),
    _templateObject4 = taggedTemplateLiteral(['\n  font-size: 14px;\n  font-weight: 600;\n  color: ', ';\n'], ['\n  font-size: 14px;\n  font-weight: 600;\n  color: ', ';\n']),
    _templateObject5 = taggedTemplateLiteral(['\n  font-size: 14px;\n  font-weight: 400;\n  color: ', ';\n  font-style: italic;\n'], ['\n  font-size: 14px;\n  font-weight: 400;\n  color: ', ';\n  font-style: italic;\n']),
    _templateObject6 = taggedTemplateLiteral(['\n  font-size: 12px;\n  font-weight: 400;\n  color: ', ';\n'], ['\n  font-size: 12px;\n  font-weight: 400;\n  color: ', ';\n']),
    _templateObject7 = taggedTemplateLiteral(['\n  font-size: 12px;\n  font-weight: 600;\n  color: ', ';\n'], ['\n  font-size: 12px;\n  font-weight: 600;\n  color: ', ';\n']),
    _templateObject8 = taggedTemplateLiteral(['\n  font-size: 12px;\n  font-weight: 400;\n  color: ', ';\n  font-style: italic;\n'], ['\n  font-size: 12px;\n  font-weight: 400;\n  color: ', ';\n  font-style: italic;\n']),
    _templateObject9 = taggedTemplateLiteral(['\n  font-size: 11px;\n  font-weight: 400;\n  color: ', ';\n  background: ', ';\n  padding: 4px 8px;\n  border-radius: 4px;\n'], ['\n  font-size: 11px;\n  font-weight: 400;\n  color: ', ';\n  background: ', ';\n  padding: 4px 8px;\n  border-radius: 4px;\n']);

var headline = styled.css(_templateObject, function (_ref) {
  var theme = _ref.theme;
  return theme.p600;
});

var subHeadline = styled.css(_templateObject2, function (_ref2) {
  var theme = _ref2.theme;
  return theme.p600;
});

var p = styled.css(_templateObject3, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p600;
});

var pBold = styled.css(_templateObject4, function (_ref4) {
  var theme = _ref4.theme;
  return theme.p600;
});

var pLink = styled.css(_templateObject4, function (_ref5) {
  var theme = _ref5.theme;
  return theme.p400;
});

var pNote = styled.css(_templateObject3, function (_ref6) {
  var theme = _ref6.theme;
  return theme.p300;
});

var pItalic = styled.css(_templateObject5, function (_ref7) {
  var theme = _ref7.theme;
  return theme.p300;
});

var sm = styled.css(_templateObject6, function (_ref8) {
  var theme = _ref8.theme;
  return theme.p600;
});

var smBold = styled.css(_templateObject7, function (_ref9) {
  var theme = _ref9.theme;
  return theme.p600;
});

var smLink = styled.css(_templateObject7, function (_ref10) {
  var theme = _ref10.theme;
  return theme.p400;
});

var smNote = styled.css(_templateObject6, function (_ref11) {
  var theme = _ref11.theme;
  return theme.p300;
});

var smItalic = styled.css(_templateObject8, function (_ref12) {
  var theme = _ref12.theme;
  return theme.p300;
});

var tooltip = styled.css(_templateObject9, function (_ref13) {
  var theme = _ref13.theme;
  return theme.p0;
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.p400;
});

var typography = /*#__PURE__*/Object.freeze({
  headline: headline,
  subHeadline: subHeadline,
  p: p,
  pBold: pBold,
  pLink: pLink,
  pNote: pNote,
  pItalic: pItalic,
  sm: sm,
  smBold: smBold,
  smLink: smLink,
  smNote: smNote,
  smItalic: smItalic,
  tooltip: tooltip
});

var _templateObject$1 = taggedTemplateLiteral(['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fade forwards;\n\n  @keyframes fade {\n    100% {\n      opacity: 1;\n      visibility: visible;\n    }\n  }\n'], ['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fade forwards;\n\n  @keyframes fade {\n    100% {\n      opacity: 1;\n      visibility: visible;\n    }\n  }\n']),
    _templateObject2$1 = taggedTemplateLiteral(['\n  opacity: 1;\n  visibility: visible;\n  animation: 500ms ease-out 0s 1 fadeOut forwards;\n\n  @keyframes fadeOut {\n    100% {\n      opacity: 0;\n      visibility: hidden;\n    }\n  }\n'], ['\n  opacity: 1;\n  visibility: visible;\n  animation: 500ms ease-out 0s 1 fadeOut forwards;\n\n  @keyframes fadeOut {\n    100% {\n      opacity: 0;\n      visibility: hidden;\n    }\n  }\n']),
    _templateObject3$1 = taggedTemplateLiteral(['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fadeDown forwards;\n  transform: translate(0, -', ');\n\n  @keyframes fadeDown {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: translate(0, 0);\n    }\n  }\n'], ['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fadeDown forwards;\n  transform: translate(0, -', ');\n\n  @keyframes fadeDown {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: translate(0, 0);\n    }\n  }\n']),
    _templateObject4$1 = taggedTemplateLiteral(['\n  opacity: 1;\n  animation: 500ms ease-out 0s 1 fadeUp forwards;\n\n  @keyframes fadeUp {\n    100% {\n      opacity: 0;\n      visibility: hidden;\n      transform: translate(0, -', ');\n    }\n  }\n'], ['\n  opacity: 1;\n  animation: 500ms ease-out 0s 1 fadeUp forwards;\n\n  @keyframes fadeUp {\n    100% {\n      opacity: 0;\n      visibility: hidden;\n      transform: translate(0, -', ');\n    }\n  }\n']),
    _templateObject5$1 = taggedTemplateLiteral(['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fadeUp forwards;\n  transform: translate(0, ', ');\n\n  @keyframes fadeUp {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: translate(0, 0);\n    }\n  }\n'], ['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fadeUp forwards;\n  transform: translate(0, ', ');\n\n  @keyframes fadeUp {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: translate(0, 0);\n    }\n  }\n']),
    _templateObject6$1 = taggedTemplateLiteral(['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fadeLeft forwards;\n  transform: translate(', ', 0);\n\n  @keyframes fadeLeft {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: translate(0, 0);\n    }\n  }\n'], ['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fadeLeft forwards;\n  transform: translate(', ', 0);\n\n  @keyframes fadeLeft {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: translate(0, 0);\n    }\n  }\n']),
    _templateObject7$1 = taggedTemplateLiteral(['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fadeRight forwards;\n  transform: translate(-', ', 0);\n\n  @keyframes fadeRight {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: translate(0, 0);\n    }\n  }\n'], ['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 fadeRight forwards;\n  transform: translate(-', ', 0);\n\n  @keyframes fadeRight {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: translate(0, 0);\n    }\n  }\n']),
    _templateObject8$1 = taggedTemplateLiteral(['\n  opacity: 1;\n  animation: 500ms ease-out 0s 1 fadeRightExit forwards;\n\n  @keyframes fadeRightExit {\n    100% {\n      opacity: 0;\n      visibility: hidden;\n      transform: translate(', ', 0);\n    }\n  }\n'], ['\n  opacity: 1;\n  animation: 500ms ease-out 0s 1 fadeRightExit forwards;\n\n  @keyframes fadeRightExit {\n    100% {\n      opacity: 0;\n      visibility: hidden;\n      transform: translate(', ', 0);\n    }\n  }\n']),
    _templateObject9$1 = taggedTemplateLiteral(['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 zoomIn forwards;\n  transform: scale(0.8);\n\n  @keyframes zoomIn {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: scale(1);\n    }\n  }\n'], ['\n  opacity: 0;\n  visibility: hidden;\n  animation: 500ms ease-out 0s 1 zoomIn forwards;\n  transform: scale(0.8);\n\n  @keyframes zoomIn {\n    100% {\n      opacity: 1;\n      visibility: visible;\n      transform: scale(1);\n    }\n  }\n']),
    _templateObject10 = taggedTemplateLiteral(['\n  opacity: 1;\n  visibility: visible;\n  animation: 500ms ease-out 0s 1 zoomOut forwards;\n  transform: scale(1);\n\n  @keyframes zoomOut {\n    100% {\n      opacity: 0;\n      visibility: hidden;\n      transform: scale(0.8);\n    }\n  }\n'], ['\n  opacity: 1;\n  visibility: visible;\n  animation: 500ms ease-out 0s 1 zoomOut forwards;\n  transform: scale(1);\n\n  @keyframes zoomOut {\n    100% {\n      opacity: 0;\n      visibility: hidden;\n      transform: scale(0.8);\n    }\n  }\n']);

var delta = '20px';

var fade = styled.css(_templateObject$1);

var fadeOut = styled.css(_templateObject2$1);

var fadeDown = styled.css(_templateObject3$1, delta);

var fadeUpExit = styled.css(_templateObject4$1, delta);

var fadeUp = styled.css(_templateObject5$1, delta);

var fadeLeft = styled.css(_templateObject6$1, delta);

var fadeRight = styled.css(_templateObject7$1, delta);

var fadeRightExit = styled.css(_templateObject8$1, delta);

var zoomIn = styled.css(_templateObject9$1);

var zoomOut = styled.css(_templateObject10);

var animation = /*#__PURE__*/Object.freeze({
  fade: fade,
  fadeOut: fadeOut,
  fadeDown: fadeDown,
  fadeUpExit: fadeUpExit,
  fadeUp: fadeUp,
  fadeLeft: fadeLeft,
  fadeRight: fadeRight,
  fadeRightExit: fadeRightExit,
  zoomIn: zoomIn,
  zoomOut: zoomOut
});

var _templateObject$2 = taggedTemplateLiteral(['\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  box-sizing: border-box;\n  padding: ', ';\n'], ['\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  box-sizing: border-box;\n  padding: ', ';\n']),
    _templateObject2$2 = taggedTemplateLiteral(['\n  display: flex;\n  width: 100%;\n  align-items: ', ';\n  justify-content: ', ';\n  min-height: 40px;\n  flex-wrap: wrap;\n'], ['\n  display: flex;\n  width: 100%;\n  align-items: ', ';\n  justify-content: ', ';\n  min-height: 40px;\n  flex-wrap: wrap;\n']),
    _templateObject3$2 = taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: ', ';\n  align-items: ', ';\n  justify-content: ', ';\n  flex: ', ';\n  max-width: ', ';\n  padding: ', 'px;\n  min-height: 40px;\n  box-sizing: border-box;\n\n  ', ';\n\n  ', ';\n\n  @media only screen and (min-width: 1200px) {\n    ', ';\n  }\n\n  @media only screen and (max-width: 1200px) {\n    ', ';\n  }\n\n  @media only screen and (max-width: 992px) {\n    ', ';\n  }\n\n  @media only screen and (max-width: 768px) {\n    ', ';\n  }\n\n  @media only screen and (max-width: 576px) {\n    ', ';\n  }\n'], ['\n  display: flex;\n  flex-direction: ', ';\n  align-items: ', ';\n  justify-content: ', ';\n  flex: ', ';\n  max-width: ', ';\n  padding: ', 'px;\n  min-height: 40px;\n  box-sizing: border-box;\n\n  ', ';\n\n  ', ';\n\n  @media only screen and (min-width: 1200px) {\n    ', ';\n  }\n\n  @media only screen and (max-width: 1200px) {\n    ', ';\n  }\n\n  @media only screen and (max-width: 992px) {\n    ', ';\n  }\n\n  @media only screen and (max-width: 768px) {\n    ', ';\n  }\n\n  @media only screen and (max-width: 576px) {\n    ', ';\n  }\n']),
    _templateObject4$2 = taggedTemplateLiteral(['\n      margin-left: ', ';\n    '], ['\n      margin-left: ', ';\n    ']),
    _templateObject5$2 = taggedTemplateLiteral(['\n      padding: 0;\n    '], ['\n      padding: 0;\n    ']),
    _templateObject6$2 = taggedTemplateLiteral(['\n        flex: none;\n        flex-basis: ', '%;\n        max-width: ', '%;\n      '], ['\n        flex: none;\n        flex-basis: ', '%;\n        max-width: ', '%;\n      ']);

var gutter = 10; // half the size

var Container = styled__default.div(_templateObject$2, function (_ref) {
  var padding = _ref.padding;
  return padding ? padding - gutter + 'px' : 30 - gutter + 'px';
});

var Row = styled__default.div(_templateObject2$2, function (_ref2) {
  var align = _ref2.align;
  return align || 'flex-start';
}, function (_ref3) {
  var justify = _ref3.justify;
  return justify || 'flex-start';
});

var Col = styled__default.div(_templateObject3$2, function (_ref4) {
  var direction = _ref4.direction;
  return direction || 'column';
}, function (_ref5) {
  var align = _ref5.align;
  return align || 'flex-start';
}, function (_ref6) {
  var justify = _ref6.justify;
  return justify || 'center';
}, function (_ref7) {
  var size = _ref7.size;
  return size || 1;
}, function (_ref8) {
  var size = _ref8.size;
  return 'calc(100% / 12 * ' + size + ')' || '100%';
}, function (_ref9) {
  var padding = _ref9.padding;
  return padding || gutter;
}, function (_ref10) {
  var offset = _ref10.offset;
  return offset && styled.css(_templateObject4$2, function (_ref11) {
    var offset = _ref11.offset;
    return 'calc(100% / 12 * ' + offset + ')';
  });
}, function (_ref12) {
  var noPadding = _ref12.noPadding;
  return noPadding && styled.css(_templateObject5$2);
}, function (_ref13) {
  var xl = _ref13.xl;
  return xl && styled.css(_templateObject6$2, 100 / 12 * xl, 100 / 12 * xl);
}, function (_ref14) {
  var lg = _ref14.lg;
  return lg && styled.css(_templateObject6$2, 100 / 12 * lg, 100 / 12 * lg);
}, function (_ref15) {
  var md = _ref15.md;
  return md && styled.css(_templateObject6$2, 100 / 12 * md, 100 / 12 * md);
}, function (_ref16) {
  var sm = _ref16.sm;
  return sm && styled.css(_templateObject6$2, 100 / 12 * sm, 100 / 12 * sm);
}, function (_ref17) {
  var xs = _ref17.xs;
  return xs && styled.css(_templateObject6$2, 100 / 12 * xs, 100 / 12 * xs);
});

var hexToRgba = function hexToRgba(hex, opacity) {
  hex = hex.replace('#', '');

  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
};

var getShadePercent = function getShadePercent(varNum) {
  var accent = varNum.toString();
  switch (accent) {
    case '0':
      return 1;
    case '50':
      return 0.9;
    case '100':
      return 0.75;
    case '200':
      return 0.6;
    case '300':
      return 0.3;
    case '350':
      return 0.3;
    case '400':
      return 0;
    case '500':
      return -0.25;
    case '600':
      return -0.45;
    case '700':
      return -0.55;
    case '800':
      return -0.75;
    default:
      return 1;
  }
};

var shadeColor = function shadeColor(argColor, varNum) {
  var color = argColor;
  if (color.toUpperCase() === '#FFF') {
    color = '#ffffff';
  }

  var percent = getShadePercent(varNum);
  var f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = f >> 8 & 0x00ff,
      B = f & 0x0000ff;

  return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};

var _templateObject$3 = taggedTemplateLiteral(['\n  padding: 0 16px;\n  height: ', ';\n  background: ', ';\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  border-radius: 3px;\n  ', ';\n  color: #fff;\n  transition: all 300ms;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  &:hover {\n    background: ', ';\n\n    ', ';\n  }\n\n  &:active {\n    background: ', ';\n\n    ', ';\n  }\n\n  ', ';\n'], ['\n  padding: 0 16px;\n  height: ', ';\n  background: ', ';\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  border-radius: 3px;\n  ', ';\n  color: #fff;\n  transition: all 300ms;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  &:hover {\n    background: ', ';\n\n    ', ';\n  }\n\n  &:active {\n    background: ', ';\n\n    ', ';\n  }\n\n  ', ';\n']),
    _templateObject2$3 = taggedTemplateLiteral(['\n      height: ', ';\n      ', ';\n      color: #fff;\n      padding: 0 14px;\n    '], ['\n      height: ', ';\n      ', ';\n      color: #fff;\n      padding: 0 14px;\n    ']),
    _templateObject3$3 = taggedTemplateLiteral(['\n      background: ', ';\n      color: ', ';\n    '], ['\n      background: ', ';\n      color: ', ';\n    ']),
    _templateObject4$3 = taggedTemplateLiteral(['\n      padding: 0;\n      border-radius: 50%;\n      width: ', ';\n    '], ['\n      padding: 0;\n      border-radius: 50%;\n      width: ', ';\n    ']),
    _templateObject5$3 = taggedTemplateLiteral(['\n        background: ', ';\n      '], ['\n        background: ', ';\n      ']),
    _templateObject6$3 = taggedTemplateLiteral(['\n      pointer-events: none;\n      background: ', ';\n      color: ', ';\n    '], ['\n      pointer-events: none;\n      background: ', ';\n      color: ', ';\n    ']);

var Button = function Button(props) {
  return React__default.createElement(
    Container$1,
    {
      onClick: props.onClick,
      small: props.small,
      secondary: props.secondary,
      round: props.round,
      disabled: props.disabled,
      className: props.className
    },
    props.children
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

Button.defaultProps = {
  small: false,
  secondary: false,
  round: false,
  disabled: false
};

var Container$1 = styled__default.div(_templateObject$3, function (_ref) {
  var theme = _ref.theme;
  return theme.size.LARGE;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.a400;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.text.pLink;
}, function (_ref4) {
  var small = _ref4.small,
      theme = _ref4.theme;
  return small && styled.css(_templateObject2$3, function (_ref5) {
    var theme = _ref5.theme;
    return theme.size.SMALL;
  }, theme.text.smLink);
}, function (_ref6) {
  var secondary = _ref6.secondary,
      theme = _ref6.theme;
  return secondary && styled.css(_templateObject3$3, hexToRgba(theme.p300, 15), theme.p400);
}, function (_ref7) {
  var round = _ref7.round,
      small = _ref7.small;
  return round && styled.css(_templateObject4$3, small ? '24px' : '34px');
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.a500;
}, function (_ref9) {
  var theme = _ref9.theme,
      secondary = _ref9.secondary;
  return secondary && styled.css(_templateObject5$3, hexToRgba(theme.p300, 25));
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.a600;
}, function (_ref11) {
  var theme = _ref11.theme,
      secondary = _ref11.secondary;
  return secondary && styled.css(_templateObject5$3, hexToRgba(theme.p300, 35));
}, function (_ref12) {
  var disabled = _ref12.disabled,
      theme = _ref12.theme;
  return disabled && styled.css(_templateObject6$3, hexToRgba(theme.p300, 10), hexToRgba(theme.p300, 50));
});

var _templateObject$4 = taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n'], ['\n  display: flex;\n  align-items: center;\n']),
    _templateObject2$4 = taggedTemplateLiteral(['\n  height: ', ';\n  padding: 0 14px;\n  background: ', ';\n  color: ', ';\n\n  ', ';\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 300ms;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  &:hover {\n    background: ', ';\n    color: ', ';\n  }\n'], ['\n  height: ', ';\n  padding: 0 14px;\n  background: ', ';\n  color: ', ';\n\n  ', ';\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 300ms;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  &:hover {\n    background: ', ';\n    color: ', ';\n  }\n']),
    _templateObject3$4 = taggedTemplateLiteral(['\n      background: ', ';\n      color: #fff;\n    '], ['\n      background: ', ';\n      color: #fff;\n    ']),
    _templateObject4$4 = taggedTemplateLiteral(['\n      border-bottom-left-radius: 4px;\n      border-top-left-radius: 4px;\n      border-right: 1px solid ', ';\n    '], ['\n      border-bottom-left-radius: 4px;\n      border-top-left-radius: 4px;\n      border-right: 1px solid ', ';\n    ']),
    _templateObject5$4 = taggedTemplateLiteral(['\n      border-top-right-radius: 4px;\n      border-bottom-right-radius: 4px;\n      border-left: 1px solid ', ';\n    '], ['\n      border-top-right-radius: 4px;\n      border-bottom-right-radius: 4px;\n      border-left: 1px solid ', ';\n    ']),
    _templateObject6$4 = taggedTemplateLiteral(['\n      border-right: ', ';\n    '], ['\n      border-right: ', ';\n    ']);

var SegmentedButton = function SegmentedButton(_ref) {
  var sections = _ref.sections,
      selected = _ref.selected,
      _onClick = _ref.onClick;
  return React__default.createElement(
    Sections,
    null,
    sections.map(function (section, index) {
      var type = 'default';
      if (index === 0) {
        type = 'start';
      }

      if (index === sections.length - 1) {
        type = 'end';
      }

      return React__default.createElement(
        Section,
        {
          type: type,
          selected: section.id === selected,
          onClick: function onClick() {
            return _onClick(section.id);
          },
          key: 'section-' + section.id
        },
        section.label
      );
    })
  );
};

SegmentedButton.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string
  })),
  selected: PropTypes.number,
  onClick: PropTypes.func
};

var Sections = styled__default.div(_templateObject$4);

var Section = styled__default.div(_templateObject2$4, function (_ref2) {
  var theme = _ref2.theme;
  return theme.size.LARGE;
}, function (_ref3) {
  var theme = _ref3.theme;
  return hexToRgba(theme.p300, 15);
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.p400;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.text.pLink;
}, function (_ref6) {
  var theme = _ref6.theme,
      selected = _ref6.selected;
  return selected && styled.css(_templateObject3$4, theme.a400);
}, function (_ref7) {
  var type = _ref7.type,
      theme = _ref7.theme;
  return type === 'start' && styled.css(_templateObject4$4, hexToRgba(theme.p500, 10));
}, function (_ref8) {
  var type = _ref8.type,
      theme = _ref8.theme;
  return type === 'end' && styled.css(_templateObject5$4, hexToRgba(theme.p500, 10));
}, function (_ref9) {
  var type = _ref9.type,
      theme = _ref9.theme;
  return type === 'default' && styled.css(_templateObject6$4, hexToRgba(theme.p500, 10));
}, function (_ref10) {
  var theme = _ref10.theme,
      selected = _ref10.selected;
  return selected ? theme.a500 : hexToRgba(theme.p300, 25);
}, function (_ref11) {
  var theme = _ref11.theme,
      selected = _ref11.selected;
  return selected ? '#fff' : theme.p400;
});

var _templateObject$5 = taggedTemplateLiteral(['\n  background: ', ';\n  width: 100%;\n  border-radius: 2px;\n  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  padding: 30px 40px;\n  transition: all 300ms;\n  border: 1px solid transparent;\n\n  ', '\n'], ['\n  background: ', ';\n  width: 100%;\n  border-radius: 2px;\n  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  padding: 30px 40px;\n  transition: all 300ms;\n  border: 1px solid transparent;\n\n  ', '\n']),
    _templateObject2$5 = taggedTemplateLiteral(['\n      cursor: pointer;\n\n      &:hover {\n        box-shadow: 0 2px 14px 0 ', ';\n        border-color: ', ';\n      }\n    '], ['\n      cursor: pointer;\n\n      &:hover {\n        box-shadow: 0 2px 14px 0 ', ';\n        border-color: ', ';\n      }\n    ']);

var Card = function Card(props) {
  return React__default.createElement(
    Container$2,
    {
      className: props.className,
      clickable: props.clickable,
      onClick: props.clickable && props.onClick
    },
    props.children
  );
};

Card.propTypes = {
  children: PropTypes.node,
  clickable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

var Container$2 = styled__default.div(_templateObject$5, function (_ref) {
  var theme = _ref.theme;
  return theme.p0;
}, function (_ref2) {
  var clickable = _ref2.clickable,
      theme = _ref2.theme;
  return clickable && styled.css(_templateObject2$5, theme.a200, theme.a400);
});

var _templateObject$6 = taggedTemplateLiteral(['\n  path {\n    fill: ', ';\n  }\n'], ['\n  path {\n    fill: ', ';\n  }\n']);

var Spinner = function Spinner(_ref) {
  var color = _ref.color,
      className = _ref.className;

  return React__default.createElement(
    Svg,
    {
      color: color,
      className: className,
      x: '0px',
      y: '0px',
      width: '40px',
      height: '40px',
      viewBox: '0 0 40 40',
      enableBackground: 'new 0 0 40 40'
    },
    React__default.createElement('path', {
      opacity: '0.2',
      d: 'M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z'
    }),
    React__default.createElement(
      'path',
      {
        d: 'M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z'
      },
      React__default.createElement('animateTransform', {
        attributeType: 'xml',
        attributeName: 'transform',
        type: 'rotate',
        from: '0 20 20',
        to: '360 20 20',
        dur: '0.5s',
        repeatCount: 'indefinite'
      })
    )
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
};

var Svg = styled__default.svg(_templateObject$6, function (_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color;
  return color || theme.a400;
});

var _templateObject$7 = taggedTemplateLiteral(['\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  box-sizing: border-box;\n\n  ', ';\n'], ['\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  box-sizing: border-box;\n\n  ', ';\n']),
    _templateObject2$6 = taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  width: ', ';\n  transition: all 500ms ease-out;\n  transform: ', ';\n'], ['\n  display: flex;\n  align-items: center;\n  width: ', ';\n  transition: all 500ms ease-out;\n  transform: ', ';\n']),
    _templateObject3$5 = taggedTemplateLiteral(['\n  width: ', ';\n  min-height: 100px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n'], ['\n  width: ', ';\n  min-height: 100px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject4$5 = taggedTemplateLiteral(['\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100px;\n'], ['\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100px;\n']),
    _templateObject5$5 = taggedTemplateLiteral(['\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 20px;\n'], ['\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 20px;\n']),
    _templateObject6$5 = taggedTemplateLiteral(['\n  width: 8px;\n  height: 8px;\n  background: ', ';\n  border-radius: 50%;\n  margin: 0 4px;\n  cursor: pointer;\n  transition: all 300ms;\n\n  ', ';\n\n  &:hover {\n    background: ', ';\n  }\n'], ['\n  width: 8px;\n  height: 8px;\n  background: ', ';\n  border-radius: 50%;\n  margin: 0 4px;\n  cursor: pointer;\n  transition: all 300ms;\n\n  ', ';\n\n  &:hover {\n    background: ', ';\n  }\n']),
    _templateObject7$2 = taggedTemplateLiteral(['\n      background: ', ';\n    '], ['\n      background: ', ';\n    ']),
    _templateObject8$2 = taggedTemplateLiteral(['\n  width: 100%;\n  min-height: ', 'px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n'], ['\n  width: 100%;\n  min-height: ', 'px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n']);

var Carousel = function (_Component) {
  inherits(Carousel, _Component);

  function Carousel() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Carousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      current: 0
    }, _this.setSlide = function (current) {
      return function () {
        return _this.setState({ current: current });
      };
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Carousel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      var _props = this.props,
          total = _props.total,
          slideRenderer = _props.slideRenderer,
          className = _props.className,
          loading = _props.loading,
          minHeight = _props.minHeight;

      var ids = fp.range(0, total);
      var slides = [];
      var bullets = [];

      fp.each(function (id) {
        slides.push(React__default.createElement(
          Slide,
          { key: 'slide-' + id, total: total, active: current === id },
          React__default.createElement(
            SlideInner,
            null,
            loading ? React__default.createElement(
              SpinnerContainer,
              { minHeight: minHeight },
              React__default.createElement(Spinner, null)
            ) : slideRenderer(id)
          )
        ));

        bullets.push(React__default.createElement(Bullet, {
          key: 'bullet-' + id,
          onClick: _this2.setSlide(id),
          selected: current === id
        }));
      }, ids);

      return React__default.createElement(
        Container$3,
        { className: className },
        React__default.createElement(
          Inner,
          { total: total, translate: -1 * current * (100 / total) },
          slides
        ),
        React__default.createElement(
          Bullets,
          null,
          bullets
        )
      );
    }
  }]);
  return Carousel;
}(React.Component);

Carousel.propTypes = {
  loading: PropTypes.bool,
  total: PropTypes.number.isRequired,
  slideRenderer: PropTypes.func.isRequired,
  className: PropTypes.string,
  minHeight: PropTypes.number
};

var Container$3 = styled__default.div(_templateObject$7, function (_ref2) {
  var theme = _ref2.theme;
  return theme.animation.fade;
});

var Inner = styled__default.div(_templateObject2$6, function (_ref3) {
  var total = _ref3.total;
  return total * 100 + '%';
}, function (_ref4) {
  var translate = _ref4.translate;
  return 'translateX(' + translate + '%)';
});

var Slide = styled__default.div(_templateObject3$5, function (_ref5) {
  var total = _ref5.total;
  return 100 / total + '%';
});

var SlideInner = styled__default.div(_templateObject4$5);

var Bullets = styled__default.div(_templateObject5$5);

var Bullet = styled__default.div(_templateObject6$5, function (_ref6) {
  var theme = _ref6.theme;
  return theme.p200;
}, function (_ref7) {
  var selected = _ref7.selected,
      theme = _ref7.theme;
  return selected && styled.css(_templateObject7$2, theme.p400);
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.p300;
});

var SpinnerContainer = styled__default.div(_templateObject8$2, function (_ref9) {
  var minHeight = _ref9.minHeight;
  return minHeight;
});

var CheckIcon = function CheckIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { width: "10px", height: "7px", viewBox: "0 0 10 7", className: className },
    React__default.createElement(
      "g",
      {
        id: "Tabs-&-Toggles",
        stroke: "none",
        strokeWidth: "1",
        fill: "none",
        fillRule: "evenodd"
      },
      React__default.createElement(
        "g",
        {
          id: "Input-Elements---Toggles-(light)",
          transform: "translate(-371.000000, -234.000000)",
          fill: "#FFFFFF",
          fillRule: "nonzero"
        },
        React__default.createElement(
          "g",
          { id: "V-check", transform: "translate(368.000000, 229.000000)" },
          React__default.createElement("path", {
            d: "M6.60658558,9.60406262 L4.7183469,7.65431492 C4.33413063,7.25758288 3.70104695,7.24743684 3.30431492,7.6316531 C2.90758288,8.01586937 2.89743684,8.64895305 3.2816531,9.04568508 L5.8480531,11.6956851 C6.22535716,12.0852798 6.84444476,12.1031017 7.24353633,11.7358576 L12.6771363,6.73585759 C13.0835393,6.36188552 13.1098297,5.7292666 12.7358576,5.32286367 C12.3618855,4.91646075 11.7292666,4.89017034 11.3228637,5.26414241 L6.60658558,9.60406262 Z",
            id: "Stroke-1"
          })
        )
      )
    )
  );
};

var LineIcon = function LineIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { width: "10px", height: "2px", viewBox: "0 0 10 2", className: className },
    React__default.createElement(
      "g",
      {
        id: "Tabs-&-Toggles",
        stroke: "none",
        strokeWidth: "1",
        fill: "none",
        fillRule: "evenodd"
      },
      React__default.createElement(
        "g",
        {
          id: "Input-Elements---Toggles-(light)",
          transform: "translate(-401.000000, -236.000000)",
          fill: "#FFFFFF",
          fillRule: "nonzero"
        },
        React__default.createElement(
          "g",
          {
            id: "toggles/check-on-idle-copy",
            transform: "translate(398.000000, 229.000000)"
          },
          React__default.createElement("path", {
            d: "M4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L12,7 C12.5522847,7 13,7.44771525 13,8 C13,8.55228475 12.5522847,9 12,9 L4,9 Z",
            id: "Path-2"
          })
        )
      )
    )
  );
};

var _templateObject$8 = taggedTemplateLiteral(['\n  box-sizing: border-box;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  min-width: 16px;\n  min-height: 16px;\n  border: 1px solid ', ';\n  border-radius: 2px;\n  position: relative;\n  transition: all 200ms;\n  overflow: hidden;\n  background: transparent;\n\n  ', ';\n\n  ', ';\n\n  &:hover {\n    border-color: ', ';\n    background: ', ';\n  }\n\n  &:active {\n    border-color: ', ';\n    background: ', ';\n  }\n\n  ', ';\n'], ['\n  box-sizing: border-box;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  min-width: 16px;\n  min-height: 16px;\n  border: 1px solid ', ';\n  border-radius: 2px;\n  position: relative;\n  transition: all 200ms;\n  overflow: hidden;\n  background: transparent;\n\n  ', ';\n\n  ', ';\n\n  &:hover {\n    border-color: ', ';\n    background: ', ';\n  }\n\n  &:active {\n    border-color: ', ';\n    background: ', ';\n  }\n\n  ', ';\n']),
    _templateObject2$7 = taggedTemplateLiteral(['\n      border-radius: 50%;\n    '], ['\n      border-radius: 50%;\n    ']),
    _templateObject3$6 = taggedTemplateLiteral(['\n      border-color: ', ';\n      background: ', ';\n    '], ['\n      border-color: ', ';\n      background: ', ';\n    ']),
    _templateObject4$6 = taggedTemplateLiteral(['\n      background: ', ';\n      border-color: ', ';\n    '], ['\n      background: ', ';\n      border-color: ', ';\n    ']),
    _templateObject5$6 = taggedTemplateLiteral(['\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  left: 2px;\n  transition: all 400ms;\n  transform: translateY(-5px);\n  opacity: 0;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  left: 2px;\n  transition: all 400ms;\n  transform: translateY(-5px);\n  opacity: 0;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n']),
    _templateObject6$6 = taggedTemplateLiteral(['\n      transform: translateY(0);\n      opacity: 1;\n    '], ['\n      transform: translateY(0);\n      opacity: 1;\n    ']),
    _templateObject7$3 = taggedTemplateLiteral(['\n      width: 8px;\n      height: 8px;\n      left: 3px;\n      top: 3px;\n    '], ['\n      width: 8px;\n      height: 8px;\n      left: 3px;\n      top: 3px;\n    ']),
    _templateObject8$3 = taggedTemplateLiteral(['\n      path {\n        fill: ', '};\n      }\n    '], ['\n      path {\n        fill: ', '};\n      }\n    ']),
    _templateObject9$2 = taggedTemplateLiteral(['\n  top: 2px;\n  ', ';\n'], ['\n  top: 2px;\n  ', ';\n']),
    _templateObject10$1 = taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ', ';\n'], ['\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ', ';\n']),
    _templateObject11 = taggedTemplateLiteral(['\n      pointer-events: none;\n    '], ['\n      pointer-events: none;\n    ']),
    _templateObject12 = taggedTemplateLiteral(['\n  ', ';\n  margin-left: 10px;\n\n  ', ';\n'], ['\n  ', ';\n  margin-left: 10px;\n\n  ', ';\n']),
    _templateObject13 = taggedTemplateLiteral(['\n      color: ', ';\n    '], ['\n      color: ', ';\n    ']);

var Checkbox = function Checkbox(_ref) {
  var checked = _ref.checked,
      onClick = _ref.onClick,
      disabled = _ref.disabled,
      round = _ref.round,
      label = _ref.label,
      partial = _ref.partial,
      className = _ref.className;
  return React__default.createElement(
    Strip,
    { onClick: onClick, disabled: disabled },
    React__default.createElement(
      CheckboxContainer,
      {
        selected: checked,
        round: round,
        disabled: disabled,
        partial: partial,
        className: className
      },
      partial && React__default.createElement(StyledLineIcon, { selected: checked, round: round, disabled: disabled }),
      !partial && React__default.createElement(StyledCheckIcon, { selected: checked, round: round, disabled: disabled })
    ),
    label && React__default.createElement(
      Label,
      { disabled: disabled },
      label
    )
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  round: PropTypes.bool,
  label: PropTypes.string,
  partial: PropTypes.bool,
  className: PropTypes.string
};

var CheckboxContainer = styled__default.div(_templateObject$8, function (_ref2) {
  var theme = _ref2.theme;
  return theme.p200;
}, function (_ref3) {
  var round = _ref3.round;
  return round && styled.css(_templateObject2$7);
}, function (_ref4) {
  var selected = _ref4.selected;
  return selected && styled.css(_templateObject3$6, function (_ref5) {
    var theme = _ref5.theme,
        partial = _ref5.partial;
    return partial ? theme.p200 : theme.a400;
  }, function (_ref6) {
    var theme = _ref6.theme,
        partial = _ref6.partial;
    return partial ? theme.p200 : theme.a400;
  });
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.a600;
}, function (_ref8) {
  var theme = _ref8.theme,
      selected = _ref8.selected;
  return selected ? theme.a600 : 'transparent';
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.a700;
}, function (_ref10) {
  var theme = _ref10.theme,
      selected = _ref10.selected;
  return selected ? theme.a700 : 'transparent';
}, function (_ref11) {
  var disabled = _ref11.disabled;
  return disabled && styled.css(_templateObject4$6, function (_ref12) {
    var theme = _ref12.theme;
    return hexToRgba(theme.p200, 35);
  }, function (_ref13) {
    var theme = _ref13.theme;
    return hexToRgba(theme.p200, 35);
  });
});

var iconStyles = styled.css(_templateObject5$6, function (_ref14) {
  var selected = _ref14.selected;
  return selected && styled.css(_templateObject6$6);
}, function (_ref15) {
  var round = _ref15.round;
  return round && styled.css(_templateObject7$3);
}, function (_ref16) {
  var disabled = _ref16.disabled,
      theme = _ref16.theme;
  return disabled && styled.css(_templateObject8$3, hexToRgba(theme.p300, 35));
});

var StyledLineIcon = styled__default(LineIcon)(_templateObject9$2, iconStyles);

var StyledCheckIcon = styled__default(CheckIcon)(_templateObject9$2, iconStyles);

var Strip = styled__default.div(_templateObject10$1, function (_ref17) {
  var disabled = _ref17.disabled;
  return disabled && styled.css(_templateObject11);
});

var Label = styled__default.div(_templateObject12, function (_ref18) {
  var theme = _ref18.theme;
  return theme.text.sm;
}, function (_ref19) {
  var disabled = _ref19.disabled;
  return disabled && styled.css(_templateObject13, function (_ref20) {
    var theme = _ref20.theme;
    return hexToRgba(theme.p300, 35);
  });
});

var _templateObject$9 = taggedTemplateLiteral(['\n  position: relative;\n'], ['\n  position: relative;\n']);

var ClickOut = function (_Component) {
  inherits(ClickOut, _Component);

  function ClickOut() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ClickOut);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ClickOut.__proto__ || Object.getPrototypeOf(ClickOut)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
      var onClick = _this.props.onClick;


      if (!_this.el.contains(e.target)) {
        if (onClick) {
          onClick();
        }
      }
    }, _this.handleRef = function (el) {
      if (el) {
        _this.el = el;
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ClickOut, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('click', this.handleClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.handleClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;


      return React__default.createElement(
        Relative,
        { ref: this.handleRef, className: className },
        this.props.children
      );
    }
  }]);
  return ClickOut;
}(React.Component);

ClickOut.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

var Relative = styled__default.div(_templateObject$9);

var ArrowDownIcon = function ArrowDownIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { className: className, width: "10px", height: "6px", viewBox: "0 0 10 6" },
    React__default.createElement(
      "g",
      { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
      React__default.createElement(
        "g",
        {
          id: "arrow-left",
          transform: "translate(5.000000, 3.000000) rotate(-90.000000) translate(-5.000000, -3.000000) translate(2.000000, -2.000000)",
          fill: "#9CA0A0"
        },
        React__default.createElement("path", {
          d: "M5.3561956,0.00357408 C5.6206355,-0.01806949 5.8678729,0.13170447 5.9616643,0.37036101 C6.0554556,0.60901755 5.9729932,0.87852125 5.759719,1.03035847 L1.4396446,5.0234089 L5.759719,9.0164593 C5.9956882,9.2369894 6.0010019,9.5996471 5.7715873,9.8264781 C5.5421728,10.053309 5.1649047,10.0584169 4.9289355,9.8378868 L0.18160094,5.3884878 C0.06555717,5.2809702 0,5.1327043 0,4.977774 C0,4.8228438 0.06555717,4.6745778 0.18160094,4.5670603 L4.9289355,0.11766124 C5.0506679,0.02798737 5.2037899,-0.01289932 5.3561956,0.00357408 Z",
          id: "path-1"
        })
      )
    )
  );
};

var _templateObject$a = taggedTemplateLiteral(['\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n'], ['\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n']),
    _templateObject2$8 = taggedTemplateLiteral(['\n  width: 100%;\n  height: 34px;\n  background: ', ';\n  box-sizing: border-box;\n  padding: 0 10px;\n  display: flex;\n  align-items: center;\n  ', ';\n  line-height: 12px;\n  cursor: pointer;\n'], ['\n  width: 100%;\n  height: 34px;\n  background: ', ';\n  box-sizing: border-box;\n  padding: 0 10px;\n  display: flex;\n  align-items: center;\n  ', ';\n  line-height: 12px;\n  cursor: pointer;\n']),
    _templateObject3$7 = taggedTemplateLiteral(['\n  width: 100%;\n  height: ', ';\n  transition: all 300ms;\n  overflow: hidden;\n  opacity: ', ';\n'], ['\n  width: 100%;\n  height: ', ';\n  transition: all 300ms;\n  overflow: hidden;\n  opacity: ', ';\n']),
    _templateObject4$7 = taggedTemplateLiteral(['\n  width: 10px;\n  height: 10px;\n  margin-right: 10px;\n  transition: all 300ms;\n  transform: rotate(', ');\n\n  * {\n    fill: ', ';\n  }\n'], ['\n  width: 10px;\n  height: 10px;\n  margin-right: 10px;\n  transition: all 300ms;\n  transform: rotate(', ');\n\n  * {\n    fill: ', ';\n  }\n']);

var Collapse = function (_Component) {
  inherits(Collapse, _Component);

  function Collapse() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Collapse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: true,
      height: 'auto'
    }, _this.toggleOpen = function () {
      return _this.setState(function (prevState) {
        return { open: !prevState.open };
      });
    }, _this.handleRef = function (el) {
      if (el) {
        var _el$getBoundingClient = el.getBoundingClientRect(),
            height = _el$getBoundingClient.height;

        _this.setState({ height: height + 'px' }, _this.toggleOpen);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Collapse, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          open = _state.open,
          height = _state.height;
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          label = _props.label;


      var calcHeight = open ? height : 0;
      return React__default.createElement(
        Container$4,
        { className: className },
        React__default.createElement(
          Header,
          { onClick: this.toggleOpen },
          React__default.createElement(StyledArrow, { open: open }),
          label
        ),
        React__default.createElement(
          Content,
          { height: calcHeight, open: open, ref: this.handleRef },
          children
        )
      );
    }
  }]);
  return Collapse;
}(React.Component);

Collapse.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string
};

var Container$4 = styled__default.div(_templateObject$a);

var Header = styled__default.div(_templateObject2$8, function (_ref2) {
  var theme = _ref2.theme;
  return theme.p0;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.text.smBold;
});

var Content = styled__default.div(_templateObject3$7, function (_ref4) {
  var height = _ref4.height;
  return height;
}, function (_ref5) {
  var open = _ref5.open;
  return open ? 1 : 0;
});

var StyledArrow = styled__default(ArrowDownIcon)(_templateObject4$7, function (_ref6) {
  var open = _ref6.open;
  return open ? '0deg' : '-90deg';
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.p300;
});

var Draggable = function (_React$Component) {
  inherits(Draggable, _React$Component);

  function Draggable() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Draggable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isDragging: false,
      clientX: 0,
      clientY: 0,

      originalX: 0,
      originalY: 0,

      translateX: 0,
      translateY: 0
    }, _this.handleMouseDown = function (_ref2) {
      var clientX = _ref2.clientX,
          clientY = _ref2.clientY;

      window.addEventListener('mousemove', _this.handleMouseMove);
      window.addEventListener('mouseup', _this.handleMouseUp);

      if (_this.props.onDragStart) {
        _this.props.onDragStart();
      }

      _this.setState({
        originalX: clientX,
        originalY: clientY,
        isDragging: true
      });
    }, _this.handleMouseMove = function (_ref3) {
      var clientX = _ref3.clientX,
          clientY = _ref3.clientY;
      var _this$state = _this.state,
          originalX = _this$state.originalX,
          originalY = _this$state.originalY,
          isDragging = _this$state.isDragging;
      var onDrag = _this.props.onDrag;


      if (!isDragging) {
        return;
      }

      onDrag({
        translateX: clientX - originalX,
        translateY: clientY - originalY
      });
    }, _this.handleMouseUp = function () {
      window.removeEventListener('mousemove', _this.handleMouseMove);
      window.removeEventListener('mouseup', _this.handleMouseUp);

      _this.setState({
        clientX: 0,
        clientY: 0,

        originalX: 0,
        originalY: 0,

        translateX: 0,
        translateY: 0,

        isDragging: false
      }, function () {
        if (_this.props.onDragEnd) {
          _this.props.onDragEnd();
        }
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Draggable, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return React__default.createElement(
        'div',
        { onMouseDown: this.handleMouseDown },
        children
      );
    }
  }]);
  return Draggable;
}(React__default.Component);

var _templateObject$b = taggedTemplateLiteral(['\n  position: relative;\n  width: 100%;\n  height: 2px;\n  background: ', ';\n  overflow: hidden;\n'], ['\n  position: relative;\n  width: 100%;\n  height: 2px;\n  background: ', ';\n  overflow: hidden;\n']),
    _templateObject2$9 = taggedTemplateLiteral(['\n  width: 20%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 2px;\n  background: ', ';\n  animation: linearProgress 2s infinite ease-in-out;\n\n  @keyframes linearProgress {\n    0% {\n      width: 0;\n      left: 0;\n    }\n    70% {\n      width: 100%;\n      left: 0;\n    }\n    100% {\n      left: 100%;\n    }\n  }\n'], ['\n  width: 20%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 2px;\n  background: ', ';\n  animation: linearProgress 2s infinite ease-in-out;\n\n  @keyframes linearProgress {\n    0% {\n      width: 0;\n      left: 0;\n    }\n    70% {\n      width: 100%;\n      left: 0;\n    }\n    100% {\n      left: 100%;\n    }\n  }\n']);

var LinearProgress = function LinearProgress(props) {
  return React__default.createElement(
    Outer,
    { className: props.className },
    React__default.createElement(Inner$1, { color: props.color })
  );
};

LinearProgress.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

var Outer = styled__default.div(_templateObject$b, function (_ref) {
  var theme = _ref.theme;
  return hexToRgba(theme.a300, 40);
});

var Inner$1 = styled__default.div(_templateObject2$9, function (_ref2) {
  var theme = _ref2.theme;
  return 'linear-gradient(to right, ' + theme.a400 + ' , ' + theme.a700 + ')';
});

var _templateObject$c = taggedTemplateLiteral(['\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n'], ['\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n']),
    _templateObject2$a = taggedTemplateLiteral(['\n  background: ', ';\n  pointer-events: all;\n  ', ';\n'], ['\n  background: ', ';\n  pointer-events: all;\n  ', ';\n']),
    _templateObject3$8 = taggedTemplateLiteral(['\n  width: 400px;\n  min-height: 100px;\n  padding: 0;\n  pointer-events: all;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  width: 400px;\n  min-height: 100px;\n  padding: 0;\n  pointer-events: all;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n']),
    _templateObject4$8 = taggedTemplateLiteral(['\n      width: 560px;\n      min-height: 240px;\n    '], ['\n      width: 560px;\n      min-height: 240px;\n    ']),
    _templateObject5$7 = taggedTemplateLiteral(['\n      width: 800px;\n      min-height: 400px;\n    '], ['\n      width: 800px;\n      min-height: 400px;\n    ']),
    _templateObject6$7 = taggedTemplateLiteral(['\n      width: 80vw;\n      height: 80vh;\n    '], ['\n      width: 80vw;\n      height: 80vh;\n    ']),
    _templateObject7$4 = taggedTemplateLiteral(['\n  width: 100%;\n  min-height: 50px;\n  box-sizing: border-box;\n  padding: 30px 30px 0 30px;\n  margin-bottom: 16px;\n'], ['\n  width: 100%;\n  min-height: 50px;\n  box-sizing: border-box;\n  padding: 30px 30px 0 30px;\n  margin-bottom: 16px;\n']),
    _templateObject8$4 = taggedTemplateLiteral(['\n  width: 100%;\n  border-top: 1px solid ', ';\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  box-sizing: border-box;\n  padding: 16px 30px;\n'], ['\n  width: 100%;\n  border-top: 1px solid ', ';\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  box-sizing: border-box;\n  padding: 16px 30px;\n']),
    _templateObject9$3 = taggedTemplateLiteral(['\n  flex: 1;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0 30px 30px 30px;\n'], ['\n  flex: 1;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0 30px 30px 30px;\n']),
    _templateObject10$2 = taggedTemplateLiteral(['\n  margin-left: 10px;\n'], ['\n  margin-left: 10px;\n']),
    _templateObject11$1 = taggedTemplateLiteral(['\n  ', ';\n'], ['\n  ', ';\n']),
    _templateObject12$1 = taggedTemplateLiteral(['\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  cursor: pointer;\n\n  width: 12px;\n  height: 12px;\n  overflow: hidden;\n\n  &:hover {\n    &::before,\n    &::after {\n      background: ', ';\n    }\n  }\n\n  &::before,\n  &::after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    top: 50%;\n    left: 0;\n    margin-top: -1px;\n    background: ', ';\n  }\n\n  &::before {\n    transform: rotate(45deg);\n  }\n\n  &::after {\n    transform: rotate(-45deg);\n  }\n\n  &::before,\n  &::after {\n    height: 1px;\n  }\n'], ['\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  cursor: pointer;\n\n  width: 12px;\n  height: 12px;\n  overflow: hidden;\n\n  &:hover {\n    &::before,\n    &::after {\n      background: ', ';\n    }\n  }\n\n  &::before,\n  &::after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    top: 50%;\n    left: 0;\n    margin-top: -1px;\n    background: ', ';\n  }\n\n  &::before {\n    transform: rotate(45deg);\n  }\n\n  &::after {\n    transform: rotate(-45deg);\n  }\n\n  &::before,\n  &::after {\n    height: 1px;\n  }\n']);

var Modal = function (_React$Component) {
  inherits(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      localOpen: false
    }, _this.throttledToggle = fp.throttle(500, _this.props.toggleOpen), _this.handleClick = function (onClick) {
      return function () {
        if (onClick) {
          onClick();
        }

        _this.throttledToggle();
      };
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Modal, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (!this.props.open && prevProps.open) {
        setTimeout(function () {
          _this2.setState({ localOpen: false });
        }, 500);
      }

      if (this.props.open && !prevProps.open) {
        this.setState({ localOpen: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          open = _props.open,
          className = _props.className,
          title = _props.title,
          buttons = _props.buttons,
          children = _props.children,
          size = _props.size;
      var localOpen = this.state.localOpen;


      if (!localOpen) {
        return null;
      }

      return React__default.createElement(
        React.Fragment,
        null,
        React__default.createElement(Overlay, {
          open: localOpen,
          onClick: this.throttledToggle,
          visible: open
        }),
        React__default.createElement(
          Container$5,
          { open: localOpen, className: className, visible: true },
          React__default.createElement(
            StyledCard,
            {
              open: localOpen,
              className: 'modal-card',
              visible: open,
              size: size
            },
            React__default.createElement(CloseIcon, { onClick: this.throttledToggle }),
            title && React__default.createElement(
              Header$1,
              null,
              React__default.createElement(
                Title,
                null,
                title
              )
            ),
            React__default.createElement(
              Content$1,
              null,
              children
            ),
            React__default.createElement(
              Footer,
              null,
              buttons.map(function (button, i) {
                return React__default.createElement(
                  StyledButton,
                  {
                    key: 'btn-' + i,
                    secondary: button.type === 'secondary',
                    onClick: _this3.handleClick(button.onClick)
                  },
                  button.label
                );
              })
            )
          )
        )
      );
    }
  }]);
  return Modal;
}(React__default.Component);

Modal.propTypes = {
  children: PropTypes.node,
  toggleOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full'])
};


var Container$5 = styled__default.div(_templateObject$c);

var Overlay = styled__default(Container$5)(_templateObject2$a, function (_ref2) {
  var theme = _ref2.theme;
  return hexToRgba(theme.p0, 60);
}, function (_ref3) {
  var theme = _ref3.theme,
      visible = _ref3.visible;
  return visible ? theme.animation.fade : theme.animation.fadeOut;
});

var StyledCard = styled__default(Card)(_templateObject3$8, function (_ref4) {
  var theme = _ref4.theme,
      visible = _ref4.visible;
  return visible ? theme.animation.fadeDown : theme.animation.fadeUpExit;
}, function (_ref5) {
  var size = _ref5.size;
  return size === 'medium' && styled.css(_templateObject4$8);
}, function (_ref6) {
  var size = _ref6.size;
  return size === 'large' && styled.css(_templateObject5$7);
}, function (_ref7) {
  var size = _ref7.size;
  return size === 'full' && styled.css(_templateObject6$7);
});

var Header$1 = styled__default.div(_templateObject7$4);

var Footer = styled__default.div(_templateObject8$4, function (_ref8) {
  var theme = _ref8.theme;
  return theme.p100;
});

var Content$1 = styled__default.div(_templateObject9$3);

var StyledButton = styled__default(Button)(_templateObject10$2);

var Title = styled__default.div(_templateObject11$1, function (_ref9) {
  var theme = _ref9.theme;
  return theme.text.subHeadline;
});

var CloseIcon = styled__default.div(_templateObject12$1, function (_ref10) {
  var theme = _ref10.theme;
  return theme.p500;
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.p300;
});

var _templateObject$d = taggedTemplateLiteral(['\n  width: 100%;\n  height: ', ';\n  display: flex;\n  align-items: center;\n  transition: all 300ms;\n  cursor: pointer;\n  box-sizing: border-box;\n  padding: 0 10px;\n  background: ', ';\n  margin: ', ';\n\n  &:hover {\n    background: ', ';\n  }\n\n  ', ';\n\n  ', ';\n'], ['\n  width: 100%;\n  height: ', ';\n  display: flex;\n  align-items: center;\n  transition: all 300ms;\n  cursor: pointer;\n  box-sizing: border-box;\n  padding: 0 10px;\n  background: ', ';\n  margin: ', ';\n\n  &:hover {\n    background: ', ';\n  }\n\n  ', ';\n\n  ', ';\n']),
    _templateObject2$b = taggedTemplateLiteral(['\n      height: ', ';\n    '], ['\n      height: ', ';\n    ']),
    _templateObject3$9 = taggedTemplateLiteral(['\n  ', ';\n  color: ', ';\n  transition: all 300ms;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 100%;\n  text-align: ', ';\n'], ['\n  ', ';\n  color: ', ';\n  transition: all 300ms;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 100%;\n  text-align: ', ';\n']);

var Option = styled__default.div(_templateObject$d, function (_ref) {
  var theme = _ref.theme;
  return theme.size.MEDIUM;
}, function (_ref2) {
  var selected = _ref2.selected,
      theme = _ref2.theme;
  return selected ? theme.a200 : 'transparent';
}, function (_ref3) {
  var margin = _ref3.margin;
  return margin || 0;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.a100;
}, function (_ref5) {
  var theme = _ref5.theme,
      small = _ref5.small;
  return small && styled.css(_templateObject2$b, theme.size.SMALL);
}, function (_ref6) {
  var theme = _ref6.theme,
      large = _ref6.large;
  return large && styled.css(_templateObject2$b, theme.size.LARGE);
});

var Label$1 = styled__default.div(_templateObject3$9, function (_ref7) {
  var theme = _ref7.theme;
  return theme.text.sm;
}, function (_ref8) {
  var color = _ref8.color,
      theme = _ref8.theme;
  return color || theme.p700;
}, function (_ref9) {
  var textAlign = _ref9.textAlign;
  return textAlign || 'left';
});

var _templateObject$e = taggedTemplateLiteral(['\n  margin: ', ';\n\n  .fulfilling-square-spinner,\n  .fulfilling-square-spinner * {\n    box-sizing: border-box;\n  }\n\n  .fulfilling-square-spinner {\n    width: ', ';\n    height: ', ';\n    position: relative;\n    border: 1px solid ', ';\n    border-radius: 50%;\n    overflow: hidden;\n  }\n\n  .fulfilling-square-spinner .spinner-inner {\n    vertical-align: top;\n    display: inline-block;\n    background-color: ', ';\n    width: 100%;\n    opacity: 1;\n    animation: fulfilling-square-spinner-inner-animation 4s infinite ease-in;\n  }\n\n  @keyframes fulfilling-square-spinner-inner-animation {\n    0% {\n      height: 0;\n    }\n    25% {\n      height: 0;\n    }\n    50% {\n      height: 100%;\n    }\n    75% {\n      height: 100%;\n    }\n    100% {\n      height: 0;\n    }\n  }\n'], ['\n  margin: ', ';\n\n  .fulfilling-square-spinner,\n  .fulfilling-square-spinner * {\n    box-sizing: border-box;\n  }\n\n  .fulfilling-square-spinner {\n    width: ', ';\n    height: ', ';\n    position: relative;\n    border: 1px solid ', ';\n    border-radius: 50%;\n    overflow: hidden;\n  }\n\n  .fulfilling-square-spinner .spinner-inner {\n    vertical-align: top;\n    display: inline-block;\n    background-color: ', ';\n    width: 100%;\n    opacity: 1;\n    animation: fulfilling-square-spinner-inner-animation 4s infinite ease-in;\n  }\n\n  @keyframes fulfilling-square-spinner-inner-animation {\n    0% {\n      height: 0;\n    }\n    25% {\n      height: 0;\n    }\n    50% {\n      height: 100%;\n    }\n    75% {\n      height: 100%;\n    }\n    100% {\n      height: 0;\n    }\n  }\n']);

var SelectSpinner = function SelectSpinner(props) {
  return React__default.createElement(
    Container$6,
    { size: props.size, margin: props.margin, color: props.color },
    React__default.createElement(
      'div',
      { className: 'fulfilling-square-spinner' },
      React__default.createElement('div', { className: 'spinner-inner' })
    )
  );
};

SelectSpinner.propTypes = {
  size: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string
};

var Container$6 = styled__default.div(_templateObject$e, function (_ref) {
  var margin = _ref.margin;
  return margin || 0;
}, function (_ref2) {
  var size = _ref2.size;
  return size || '40px';
}, function (_ref3) {
  var size = _ref3.size;
  return size || '40px';
}, function (_ref4) {
  var color = _ref4.color;
  return color || '#fff';
}, function (_ref5) {
  var color = _ref5.color;
  return color || '#fff';
});

var optionsType = PropTypes.arrayOf(PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string
}).isRequired);

var _templateObject$f = taggedTemplateLiteral(['\n  width: calc(100% - 15px);\n'], ['\n  width: calc(100% - 15px);\n']),
    _templateObject2$c = taggedTemplateLiteral(['\n  cursor: pointer;\n  width: 170px;\n  height: ', ';\n  box-sizing: border-box;\n  padding: 0 10px;\n  border: 1px solid ', ';\n  background: ', ';\n  border-radius: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  transition: all 300ms;\n  user-select: none;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  cursor: pointer;\n  width: 170px;\n  height: ', ';\n  box-sizing: border-box;\n  padding: 0 10px;\n  border: 1px solid ', ';\n  background: ', ';\n  border-radius: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  transition: all 300ms;\n  user-select: none;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n']),
    _templateObject3$a = taggedTemplateLiteral(['\n      border-color: ', ';\n    '], ['\n      border-color: ', ';\n    ']),
    _templateObject4$9 = taggedTemplateLiteral(['\n      height: ', ';\n      ', ';\n    '], ['\n      height: ', ';\n      ', ';\n    ']),
    _templateObject5$8 = taggedTemplateLiteral(['\n      height: ', ';\n    '], ['\n      height: ', ';\n    ']),
    _templateObject6$8 = taggedTemplateLiteral(['\n  width: 10px;\n  height: 10px;\n  transform: rotate(', ');\n  transition: all 300ms;\n  * {\n    fill: ', ';\n  }\n'], ['\n  width: 10px;\n  height: 10px;\n  transform: rotate(', ');\n  transition: all 300ms;\n  * {\n    fill: ', ';\n  }\n']);

var SelectHeader = function SelectHeader(props) {
  var open = props.open,
      placeholder = props.placeholder,
      values = props.values,
      options = props.options,
      headerRenderer = props.headerRenderer,
      toggleOpen = props.toggleOpen,
      placeholderRenderer = props.placeholderRenderer,
      loading = props.loading,
      error = props.error,
      small = props.small,
      large = props.large;


  if (headerRenderer) {
    return headerRenderer({ values: values, placeholder: placeholder, options: options, open: open, toggleOpen: toggleOpen });
  }

  var label = placeholder;

  if (values.length <= options.length) {
    label = values.length + ' selected';
  }

  if (values.length === 1) {
    var option = values[0];

    label = option.label;
  }

  if (options.length === values.length && values.length > 1) {
    label = 'Select all (' + options.length + ')';
  }

  if (!values.length) {
    label = placeholder;
  }

  if (placeholderRenderer) {
    var customLabel = placeholderRenderer({
      label: label,
      allSelected: options.length === values.length && values.length > 1,
      selected: values.length,
      total: options.length
    });

    if (!fp.isEmpty(customLabel)) {
      label = customLabel;
    }
  }

  return React__default.createElement(
    Container$7,
    {
      onClick: toggleOpen,
      open: open,
      className: 'header',
      title: label,
      error: error,
      small: small,
      large: large
    },
    React__default.createElement(
      LabelWrapper,
      null,
      React__default.createElement(
        Label$1,
        null,
        label
      )
    ),
    !loading && React__default.createElement(Arrow, { rotation: open ? '180deg' : '0deg' }),
    loading && React__default.createElement(SelectSpinner, { size: '12px', color: '#09a0ff' })
  );
};

SelectHeader.propTypes = {
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  values: optionsType,
  options: optionsType,
  headerRenderer: PropTypes.func,
  toggleOpen: PropTypes.func,
  placeholderRenderer: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool
};

var LabelWrapper = styled__default.div(_templateObject$f);

var Container$7 = styled__default.div(_templateObject2$c, function (_ref) {
  var theme = _ref.theme;
  return theme.size.MEDIUM;
}, function (_ref2) {
  var error = _ref2.error,
      theme = _ref2.theme;
  return error ? theme.r400 : theme.p200;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p0;
}, function (_ref4) {
  var open = _ref4.open,
      theme = _ref4.theme,
      error = _ref4.error;
  return open && styled.css(_templateObject3$a, error ? theme.r400 : theme.a400);
}, function (_ref5) {
  var small = _ref5.small,
      theme = _ref5.theme;
  return small && styled.css(_templateObject4$9, theme.size.SMALL, theme.text.sm);
}, function (_ref6) {
  var large = _ref6.large,
      theme = _ref6.theme;
  return large && styled.css(_templateObject5$8, theme.size.LARGE);
});

var Arrow = styled__default(ArrowDownIcon)(_templateObject6$8, function (_ref7) {
  var rotation = _ref7.rotation;
  return rotation;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.p600;
});

var SearchThinIcon = function SearchThinIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { className: className, width: "24", height: "24", viewBox: "0 0 24 24" },
    React__default.createElement(
      "g",
      { fill: "none", fillRule: "evenodd" },
      React__default.createElement("path", {
        fill: "#9EA0A5",
        d: "M20.948 20.282l-4.573-4.606a7.642 7.642 0 0 0-.52-10.612 7.632 7.632 0 0 0-10.619.173 7.642 7.642 0 0 0-.173 10.625 7.632 7.632 0 0 0 10.606.52l4.613 4.566a.497.497 0 0 0 .666-.666zM10.63 17.298a6.623 6.623 0 0 1-6.621-6.625 6.623 6.623 0 0 1 6.621-6.625 6.623 6.623 0 0 1 6.621 6.625 6.623 6.623 0 0 1-6.581 6.605l-.04.02z"
      })
    )
  );
};

var _templateObject$g = taggedTemplateLiteral(['\n  position: relative;\n  width: 100%;\n'], ['\n  position: relative;\n  width: 100%;\n']),
    _templateObject2$d = taggedTemplateLiteral(['\n  width: calc(100% - 20px);\n  margin: 10px 10px 0 10px;\n  height: ', ';\n  border-radius: 2px;\n  border: 1px solid ', ';\n  box-sizing: border-box;\n  padding: 0 30px 0 10px;\n  font-size: 13px;\n  font-weight: 300;\n  background: ', ';\n\n  ', ';\n\n  ', ';\n\n  color: ', ';\n\n  &:focus {\n    outline: none;\n    border-color: ', ';\n  }\n\n  &::placeholder {\n    color: ', ';\n  }\n'], ['\n  width: calc(100% - 20px);\n  margin: 10px 10px 0 10px;\n  height: ', ';\n  border-radius: 2px;\n  border: 1px solid ', ';\n  box-sizing: border-box;\n  padding: 0 30px 0 10px;\n  font-size: 13px;\n  font-weight: 300;\n  background: ', ';\n\n  ', ';\n\n  ', ';\n\n  color: ', ';\n\n  &:focus {\n    outline: none;\n    border-color: ', ';\n  }\n\n  &::placeholder {\n    color: ', ';\n  }\n']),
    _templateObject3$b = taggedTemplateLiteral(['\n      height: ', ';\n      ', ';\n    '], ['\n      height: ', ';\n      ', ';\n    ']),
    _templateObject4$a = taggedTemplateLiteral(['\n      height: ', ';\n    '], ['\n      height: ', ';\n    ']),
    _templateObject5$9 = taggedTemplateLiteral(['\n  width: 18px;\n  height: 18px;\n  position: absolute;\n  right: 15px;\n  top: calc(50% - 4px);\n'], ['\n  width: 18px;\n  height: 18px;\n  position: absolute;\n  right: 15px;\n  top: calc(50% - 4px);\n']);

var SelectSearch = function SelectSearch(props) {
  return React__default.createElement(
    Container$8,
    null,
    React__default.createElement(Input, {
      placeholder: props.searchPlaceholder || 'Search',
      onChange: props.onChange,
      value: props.value,
      small: props.small,
      large: props.large
    }),
    React__default.createElement(StyledSearchIcon, null)
  );
};

SelectSearch.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool
};

var Container$8 = styled__default.div(_templateObject$g);

var Input = styled__default.input(_templateObject2$d, function (_ref) {
  var theme = _ref.theme;
  return theme.size.MEDIUM;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.p200;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p0;
}, function (_ref4) {
  var theme = _ref4.theme,
      small = _ref4.small;
  return small && styled.css(_templateObject3$b, theme.size.SMALL, theme.text.sm);
}, function (_ref5) {
  var theme = _ref5.theme,
      large = _ref5.large;
  return large && styled.css(_templateObject4$a, theme.size.LARGE);
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.p500;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.a500;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.p200;
});

var StyledSearchIcon = styled__default(SearchThinIcon)(_templateObject5$9);

var _templateObject$h = taggedTemplateLiteral(['\n  width: 100%;\n  height: 1px;\n  background: ', ';\n'], ['\n  width: 100%;\n  height: 1px;\n  background: ', ';\n']),
    _templateObject2$e = taggedTemplateLiteral(['\n  margin-right: 10px;\n'], ['\n  margin-right: 10px;\n']),
    _templateObject3$c = taggedTemplateLiteral(['\n  ', ';\n'], ['\n  ', ';\n']);

var SelectMultiHeader = function SelectMultiHeader(props) {
  var options = props.options,
      values = props.values,
      multi = props.multi,
      selectAll = props.selectAll,
      total = props.total;


  if (!multi || !options.length) {
    return null;
  }

  var counts = '(' + values.length + '/' + total + ')';
  var label = 'Select all';

  var allSelected = false;
  var partialSelected = values.length && values.length < options.length;

  if (total === values.length) {
    allSelected = true;
  }

  if (allSelected || partialSelected) {
    label = 'Deselect all';
  }

  return React__default.createElement(
    React.Fragment,
    null,
    React__default.createElement(
      Option,
      { className: 'option', onClick: selectAll, margin: '5px 0 0 0' },
      React__default.createElement(StyledCheckbox, {
        checked: !!allSelected || !!partialSelected,
        partial: !!partialSelected
      }),
      React__default.createElement(
        Label$1,
        null,
        label,
        ' ',
        React__default.createElement(
          Italic,
          null,
          counts
        )
      )
    ),
    React__default.createElement(Divider, null)
  );
};

SelectMultiHeader.propTypes = {
  selectAll: PropTypes.func,
  options: optionsType,
  values: optionsType,
  multi: PropTypes.bool,
  total: PropTypes.number
};

var Divider = styled__default.div(_templateObject$h, function (_ref) {
  var theme = _ref.theme;
  return theme.p100;
});

var StyledCheckbox = styled__default(Checkbox)(_templateObject2$e);

var Italic = styled__default.span(_templateObject3$c, function (_ref2) {
  var theme = _ref2.theme;
  return theme.text.smItalic;
});

var _templateObject$i = taggedTemplateLiteral(['\n  width: 100%;\n  box-sizing: border-box;\n  padding: 10px;\n'], ['\n  width: 100%;\n  box-sizing: border-box;\n  padding: 10px;\n']);

var SelectNoResults = function SelectNoResults(_ref) {
  var theme = _ref.theme;
  return React__default.createElement(
    Container$9,
    null,
    React__default.createElement(
      Label$1,
      { color: theme.p300, textAlign: 'center' },
      'No results'
    )
  );
};

SelectNoResults.propTypes = {
  theme: PropTypes.object
};

var SelectNoResults$1 = styled.withTheme(SelectNoResults);

var Container$9 = styled__default.div(_templateObject$i);

var _templateObject$j = taggedTemplateLiteral(['\n  margin-top: ', ';\n  width: 100%;\n  max-height: ', ';\n  overflow: auto;\n\n  ', ';\n\n  ', ';\n'], ['\n  margin-top: ', ';\n  width: 100%;\n  max-height: ', ';\n  overflow: auto;\n\n  ', ';\n\n  ', ';\n']),
    _templateObject2$f = taggedTemplateLiteral(['\n      max-height: calc(', ' * ', ');\n    '], ['\n      max-height: calc(', ' * ', ');\n    ']),
    _templateObject3$d = taggedTemplateLiteral(['\n  margin-right: 10px;\n'], ['\n  margin-right: 10px;\n']),
    _templateObject4$b = taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n'], ['\n  display: flex;\n  flex-direction: column;\n']);

var SelectOptions = function SelectOptions(props) {
  var options = props.options,
      values = props.values,
      optionRenderer = props.optionRenderer,
      multi = props.multi,
      handleClick = props.handleClick,
      maxItems = props.maxItems,
      searchable = props.searchable,
      optionLabelRenderer = props.optionLabelRenderer,
      small = props.small,
      large = props.large,
      inlineSearch = props.inlineSearch;


  var items = options.map(function (option) {
    var selected = fp.find(function (op) {
      return op.value === option.value;
    }, values);

    if (optionRenderer) {
      return optionRenderer({ option: option, selected: selected });
    }

    return React__default.createElement(
      Option,
      {
        className: 'option',
        key: option.value,
        onClick: handleClick(option),
        selected: selected && !multi,
        title: option.label,
        small: small,
        large: large
      },
      multi && React__default.createElement(StyledCheckbox$1, { checked: !!selected }),
      optionLabelRenderer ? optionLabelRenderer(option) : React__default.createElement(
        Label$1,
        null,
        option.label
      )
    );
  });

  return React__default.createElement(
    Container$a,
    {
      maxItems: maxItems,
      marginTop: multi || searchable && !inlineSearch ? '5px' : 0,
      small: small,
      large: large
    },
    React__default.createElement(
      Inner$2,
      null,
      items
    )
  );
};

SelectOptions.propTypes = {
  options: optionsType,
  values: optionsType,
  optionRenderer: PropTypes.func,
  multi: PropTypes.bool,
  handleClick: PropTypes.func,
  maxItems: PropTypes.number,
  searchable: PropTypes.bool,
  optionLabelRenderer: PropTypes.func,
  small: PropTypes.bool,
  large: PropTypes.bool,
  inlineSearch: PropTypes.bool
};

var Container$a = styled__default.div(_templateObject$j, function (_ref) {
  var marginTop = _ref.marginTop;
  return marginTop;
}, function (_ref2) {
  var maxItems = _ref2.maxItems,
      theme = _ref2.theme;
  return 'calc(' + maxItems + ' * ' + theme.size.MEDIUM + ')';
}, function (_ref3) {
  var theme = _ref3.theme,
      small = _ref3.small,
      maxItems = _ref3.maxItems;
  return small && styled.css(_templateObject2$f, maxItems, theme.size.SMALL);
}, function (_ref4) {
  var theme = _ref4.theme,
      large = _ref4.large,
      maxItems = _ref4.maxItems;
  return large && styled.css(_templateObject2$f, maxItems, theme.size.LARGE);
});

var StyledCheckbox$1 = styled__default(Checkbox)(_templateObject3$d);

var Inner$2 = styled__default.div(_templateObject4$b);

var _templateObject$k = taggedTemplateLiteral(['\n  position: absolute;\n  z-index: 1;\n  top: calc(100% + 4px);\n  left: 0;\n  width: 100%;\n  min-height: 20px;\n  max-height: ', ';\n  background: ', ';\n  border-radius: 2px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);\n  transition: all 300ms;\n  user-select: none;\n  overflow: hidden;\n\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  transform: translateY(-10px);\n\n  ', ';\n'], ['\n  position: absolute;\n  z-index: 1;\n  top: calc(100% + 4px);\n  left: 0;\n  width: 100%;\n  min-height: 20px;\n  max-height: ', ';\n  background: ', ';\n  border-radius: 2px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);\n  transition: all 300ms;\n  user-select: none;\n  overflow: hidden;\n\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  transform: translateY(-10px);\n\n  ', ';\n']),
    _templateObject2$g = taggedTemplateLiteral(['\n      opacity: 1;\n      visibility: visible;\n      pointer-events: all;\n      transform: translateY(0);\n    '], ['\n      opacity: 1;\n      visibility: visible;\n      pointer-events: all;\n      transform: translateY(0);\n    ']);

var SelectMenu = function SelectMenu(props) {
  var open = props.open,
      searchable = props.searchable,
      onSearch = props.onSearch,
      options = props.options,
      values = props.values,
      multi = props.multi,
      selectAll = props.selectAll,
      optionRenderer = props.optionRenderer,
      onSelect = props.onSelect,
      menuRenderer = props.menuRenderer,
      searchTerm = props.searchTerm,
      total = props.total,
      maxItems = props.maxItems,
      searchPlaceholder = props.searchPlaceholder,
      optionLabelRenderer = props.optionLabelRenderer,
      small = props.small,
      large = props.large,
      inlineSearch = props.inlineSearch;


  if (menuRenderer) {
    return menuRenderer(props);
  }

  var maxHeight = 400;
  if (multi) {
    maxHeight += 5;
  }
  if (searchable) {
    maxHeight += 5;
  }

  return React__default.createElement(
    Container$b,
    { visible: open, className: 'menu', maxheight: maxHeight + 'px' },
    !inlineSearch && searchable && React__default.createElement(SelectSearch, {
      onChange: onSearch,
      value: searchTerm,
      searchPlaceholder: searchPlaceholder,
      small: small,
      large: large
    }),
    React__default.createElement(SelectMultiHeader, {
      options: options,
      values: values,
      multi: multi,
      selectAll: selectAll,
      total: total,
      onChange: onSearch,
      value: searchTerm
    }),
    !options.length && React__default.createElement(SelectNoResults$1, null),
    React__default.createElement(SelectOptions, {
      options: options,
      values: values,
      optionRenderer: optionRenderer,
      multi: multi,
      handleClick: onSelect,
      maxItems: maxItems,
      searchable: searchable,
      optionLabelRenderer: optionLabelRenderer,
      small: small,
      large: large,
      inlineSearch: inlineSearch
    })
  );
};

SelectMenu.propTypes = {
  open: PropTypes.bool,
  searchable: PropTypes.bool,
  onSearch: PropTypes.func,
  options: optionsType,
  values: optionsType,
  multi: PropTypes.bool,
  selectAll: PropTypes.func,
  optionRenderer: PropTypes.func,
  onSelect: PropTypes.func,
  searchTerm: PropTypes.string,
  total: PropTypes.number,
  maxItems: PropTypes.number,
  searchPlaceholder: PropTypes.string,
  optionLabelRenderer: PropTypes.func,
  small: PropTypes.bool,
  large: PropTypes.bool,
  inlineSearch: PropTypes.bool
};

var Container$b = styled__default.div(_templateObject$k, function (_ref) {
  var maxHeight = _ref.maxHeight;
  return maxHeight;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.p0;
}, function (_ref3) {
  var visible = _ref3.visible;
  return visible && styled.css(_templateObject2$g);
});

var _templateObject$l = taggedTemplateLiteral(['\n  cursor: pointer;\n  width: 400px;\n  min-height: ', ';\n  box-sizing: border-box;\n  padding: 0 2px;\n  border: 1px solid ', ';\n  background: ', ';\n  border-radius: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  transition: all 300ms;\n  user-select: none;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  cursor: pointer;\n  width: 400px;\n  min-height: ', ';\n  box-sizing: border-box;\n  padding: 0 2px;\n  border: 1px solid ', ';\n  background: ', ';\n  border-radius: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  transition: all 300ms;\n  user-select: none;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n']),
    _templateObject2$h = taggedTemplateLiteral(['\n      border-color: ', ';\n    '], ['\n      border-color: ', ';\n    ']),
    _templateObject3$e = taggedTemplateLiteral(['\n      height: ', ';\n      ', ';\n    '], ['\n      height: ', ';\n      ', ';\n    ']),
    _templateObject4$c = taggedTemplateLiteral(['\n      height: ', ';\n    '], ['\n      height: ', ';\n    ']),
    _templateObject5$a = taggedTemplateLiteral(['\n  width: calc(100% - 15px);\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  padding: 0 10px 0 0;\n  flex-wrap: wrap;\n'], ['\n  width: calc(100% - 15px);\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  padding: 0 10px 0 0;\n  flex-wrap: wrap;\n']),
    _templateObject6$9 = taggedTemplateLiteral(['\n  padding: ', ';\n  background: ', ';\n  cursor: pointer;\n  border-radius: 2px;\n  margin: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  transition: all 300ms;\n\n  ', ';\n\n  &:hover {\n    background: ', ';\n  }\n'], ['\n  padding: ', ';\n  background: ', ';\n  cursor: pointer;\n  border-radius: 2px;\n  margin: 2px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  transition: all 300ms;\n\n  ', ';\n\n  &:hover {\n    background: ', ';\n  }\n']),
    _templateObject7$5 = taggedTemplateLiteral(['\n      padding: 0 4px;\n      pointer-events: none;\n    '], ['\n      padding: 0 4px;\n      pointer-events: none;\n    ']),
    _templateObject8$5 = taggedTemplateLiteral(['\n  ', ';\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 60px;\n  padding: 2px;\n'], ['\n  ', ';\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 60px;\n  padding: 2px;\n']),
    _templateObject9$4 = taggedTemplateLiteral(['\n  position: absolute;\n  right: 4px;\n  top: 7px;\n  width: 8px;\n  height: 8px;\n  margin-left: 4px;\n  overflow: hidden;\n\n  &::before,\n  &::after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    top: 50%;\n    left: 0;\n    margin-top: -1px;\n    background: #fff;\n  }\n\n  &::before {\n    transform: rotate(45deg);\n  }\n\n  &::after {\n    transform: rotate(-45deg);\n  }\n\n  &::before,\n  &::after {\n    height: 2px;\n  }\n'], ['\n  position: absolute;\n  right: 4px;\n  top: 7px;\n  width: 8px;\n  height: 8px;\n  margin-left: 4px;\n  overflow: hidden;\n\n  &::before,\n  &::after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    top: 50%;\n    left: 0;\n    margin-top: -1px;\n    background: #fff;\n  }\n\n  &::before {\n    transform: rotate(45deg);\n  }\n\n  &::after {\n    transform: rotate(-45deg);\n  }\n\n  &::before,\n  &::after {\n    height: 2px;\n  }\n']),
    _templateObject10$3 = taggedTemplateLiteral(['\n  border: none;\n  height: 24px;\n  background: transparent;\n  color: ', ';\n  ', ';\n  flex: 1;\n  box-sizing: border-box;\n  padding: 0 4px;\n'], ['\n  border: none;\n  height: 24px;\n  background: transparent;\n  color: ', ';\n  ', ';\n  flex: 1;\n  box-sizing: border-box;\n  padding: 0 4px;\n']);

var mapWithIndex = fp.map.convert({ cap: false });

var InlineSearch = function (_Component) {
  inherits(InlineSearch, _Component);

  function InlineSearch() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, InlineSearch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = InlineSearch.__proto__ || Object.getPrototypeOf(InlineSearch)).call.apply(_ref, [this].concat(args))), _this), _this.handleRef = function (el) {
      if (el) {
        _this.el = el;
      }
    }, _this.handleClick = function () {
      _this.props.toggleOpen();
      _this.focus();
    }, _this.handleInput = function (el) {
      var _this$props = _this.props,
          open = _this$props.open,
          toggleOpen = _this$props.toggleOpen;


      if (!open) {
        toggleOpen();
      }
      _this.props.onSearch(el);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(InlineSearch, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.values !== prevProps.values) {
        this.focus();
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.el) {
        this.el.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tags = [];

      mapWithIndex(function (option, index) {
        if (index < _this2.props.maxTags) {
          tags.push(React__default.createElement(
            SmallTag,
            { key: 'small-tag-' + option.value, title: option.label },
            React__default.createElement(
              SmallTagLabel,
              null,
              option.label
            ),
            React__default.createElement(CloseIcon$1, { onClick: _this2.props.onSelect(option) })
          ));
        }
      }, this.props.values);

      if (this.props.values.length > this.props.maxTags) {
        tags.push(React__default.createElement(
          SmallTag,
          { key: 'extra-tags', type: 'info' },
          React__default.createElement(
            SmallTagLabel,
            null,
            '+',
            this.props.values.length - this.props.maxTags
          )
        ));
      }

      return React__default.createElement(
        Container$c,
        {
          onClick: this.handleClick,
          error: this.props.error,
          small: this.props.small,
          large: this.props.large,
          className: 'inline-container',
          open: this.props.open
        },
        React__default.createElement(
          Inner$3,
          null,
          tags,
          React__default.createElement(SmallInput, {
            onChange: this.handleInput,
            value: this.props.value,
            placeholder: this.props.placeholder || 'Search',
            ref: this.handleRef
          })
        ),
        React__default.createElement(Arrow, { rotation: this.props.open ? '180deg' : '0deg' })
      );
    }
  }]);
  return InlineSearch;
}(React.Component);

InlineSearch.propTypes = {
  values: optionsType,
  placeholder: PropTypes.string,
  toggleOpen: PropTypes.func,
  error: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  open: PropTypes.bool,
  value: PropTypes.string,
  onSearch: PropTypes.func,
  maxTags: PropTypes.number,
  onSelect: PropTypes.func
};

var Container$c = styled__default.div(_templateObject$l, function (_ref2) {
  var theme = _ref2.theme;
  return theme.size.MEDIUM;
}, function (_ref3) {
  var error = _ref3.error,
      theme = _ref3.theme;
  return error ? theme.r400 : theme.p200;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.p0;
}, function (_ref5) {
  var open = _ref5.open,
      theme = _ref5.theme,
      error = _ref5.error;
  return open && styled.css(_templateObject2$h, error ? theme.r400 : theme.a400);
}, function (_ref6) {
  var small = _ref6.small,
      theme = _ref6.theme;
  return small && styled.css(_templateObject3$e, theme.size.SMALL, theme.text.sm);
}, function (_ref7) {
  var large = _ref7.large,
      theme = _ref7.theme;
  return large && styled.css(_templateObject4$c, theme.size.LARGE);
});

var Inner$3 = styled__default.div(_templateObject5$a);

var SmallTag = styled__default.div(_templateObject6$9, function (_ref8) {
  var padding = _ref8.padding;
  return padding || '0 18px 0 4px';
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.a400;
}, function (_ref10) {
  var type = _ref10.type;
  return type === 'info' && styled.css(_templateObject7$5);
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.a500;
});

var SmallTagLabel = styled__default.div(_templateObject8$5, function (_ref12) {
  var theme = _ref12.theme;
  return theme.text.sm;
});

var CloseIcon$1 = styled__default.div(_templateObject9$4);

var SmallInput = styled__default.input(_templateObject10$3, function (_ref13) {
  var theme = _ref13.theme;
  return theme.p800;
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.text.sm;
});

var _templateObject$m = taggedTemplateLiteral(['\n  position: relative;\n\n  * {\n    line-height: normal;\n  }\n\n  ', ';\n'], ['\n  position: relative;\n\n  * {\n    line-height: normal;\n  }\n\n  ', ';\n']),
    _templateObject2$i = taggedTemplateLiteral(['\n      pointer-events: none;\n      opacity: 0.5;\n    '], ['\n      pointer-events: none;\n      opacity: 0.5;\n    ']);

var Select = function (_React$Component) {
  inherits(Select, _React$Component);

  function Select() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      searchTerm: '',
      localValues: _this.props.values
    }, _this.checkString = function (searchTerm, str) {
      return str.toString().toLowerCase().includes(searchTerm.toLowerCase());
    }, _this.toggleOpen = function () {
      var _this$props = _this.props,
          keepOpen = _this$props.keepOpen,
          inlineSearch = _this$props.inlineSearch;
      var open = _this.state.open;


      if (keepOpen && open) {
        return;
      }

      _this.setState(function (prevState) {
        return {
          open: !prevState.open,
          searchTerm: !prevState.open ? '' : prevState.searchTerm
        };
      }, function () {
        var open = _this.state.open;
        var _this$props2 = _this.props,
            onOpen = _this$props2.onOpen,
            onClose = _this$props2.onClose;


        if (open) {
          window.addEventListener('keydown', _this.handleKeyDown);

          if (onOpen) {
            onOpen();
          }
        }

        if (!open) {
          window.removeEventListener('keydown', _this.handleKeyDown);

          if (inlineSearch) {
            setTimeout(function () {
              _this.setState({ searchTerm: '' });
            }, 300);
          }

          if (onClose) {
            onClose();
          }
        }
      });
    }, _this.handleKeyDown = function (_ref2) {
      var key = _ref2.key;

      switch (key) {
        case 'Escape':
          _this.toggleOpen();
          break;

        default:
          break;
      }
    }, _this.handleClickOut = function () {
      var open = _this.state.open;


      if (open) {
        _this.toggleOpen();
      }
    }, _this.onSelect = function (option) {
      return function () {
        var multi = _this.props.multi;
        var localValues = _this.state.localValues;


        var result = [];
        if (!multi) {
          result = [option];
        } else {
          if (fp.find(function (op) {
            return op.value === option.value;
          }, localValues)) {
            result = localValues.filter(function (op) {
              return op.value !== option.value;
            });
          } else {
            result = [].concat(toConsumableArray(localValues), [option]);
          }
        }

        _this.applyChanges(result);
      };
    }, _this.selectAll = function () {
      var options = _this.props.options;
      var localValues = _this.state.localValues;


      var result = [];
      if (!localValues.length || localValues.length > options.length) {
        result = [].concat(toConsumableArray(options));
      }

      _this.applyChanges(result);
    }, _this.onSearch = function (e) {
      return _this.setState({ searchTerm: e.target.value });
    }, _this.debouncedOnChange = fp.debounce(_this.props.debounce, function (values) {
      return _this.props.onChange(values);
    }), _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Select, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.localValues === prevState.localValues && this.props.values !== prevProps.values) {
        this.setState({ localValues: this.props.values });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'filterOptions',
    value: function filterOptions() {
      var _this2 = this;

      var searchTerm = this.state.searchTerm;
      var _props = this.props,
          searchBy = _props.searchBy,
          options = _props.options,
          sortable = _props.sortable,
          sortDirection = _props.sortDirection,
          sortBy = _props.sortBy;


      var sorted = sortable ? fp.orderBy(sortDirection, sortBy, options) : options;

      return sorted.filter(function (option) {
        return searchBy.some(function (key) {
          return _this2.checkString(searchTerm, option[key]);
        });
      });
    }
  }, {
    key: 'applyChanges',
    value: function applyChanges(values) {
      var _this3 = this;

      var _props2 = this.props,
          closeOnSelect = _props2.closeOnSelect,
          multi = _props2.multi;


      this.setState({ localValues: values }, function () {
        _this3.debouncedOnChange(values);

        if (!multi && closeOnSelect) {
          _this3.toggleOpen();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          options = _props3.options,
          className = _props3.className,
          disabled = _props3.disabled,
          searchable = _props3.searchable,
          placeholder = _props3.placeholder,
          headerRenderer = _props3.headerRenderer,
          optionRenderer = _props3.optionRenderer,
          optionLabelRenderer = _props3.optionLabelRenderer,
          multi = _props3.multi,
          placeholderRenderer = _props3.placeholderRenderer,
          menuRenderer = _props3.menuRenderer,
          loading = _props3.loading,
          maxItems = _props3.maxItems,
          searchPlaceholder = _props3.searchPlaceholder,
          error = _props3.error,
          small = _props3.small,
          large = _props3.large,
          inlineSearch = _props3.inlineSearch,
          maxTags = _props3.maxTags;
      var _state = this.state,
          open = _state.open,
          searchTerm = _state.searchTerm,
          localValues = _state.localValues;

      var filteredOptions = this.filterOptions();

      return React__default.createElement(
        ClickOut,
        { onClick: this.handleClickOut, className: className },
        React__default.createElement(
          Container$d,
          { disabled: disabled, className: className },
          !inlineSearch && React__default.createElement(SelectHeader, {
            open: open,
            placeholder: placeholder,
            values: localValues,
            options: options,
            headerRenderer: headerRenderer,
            toggleOpen: this.toggleOpen,
            placeholderRenderer: placeholderRenderer,
            loading: loading,
            error: error,
            small: small,
            large: large
          }),
          inlineSearch && React__default.createElement(InlineSearch, {
            values: localValues,
            open: open,
            placeholder: placeholder,
            toggleOpen: this.toggleOpen,
            error: error,
            small: small,
            large: large,
            onSearch: this.onSearch,
            value: searchTerm,
            maxTags: maxTags,
            onSelect: this.onSelect
          }),
          React__default.createElement(SelectMenu, {
            open: open,
            searchable: searchable,
            onSearch: this.onSearch,
            options: filteredOptions,
            total: options.length,
            values: localValues,
            multi: multi,
            selectAll: this.selectAll,
            optionRenderer: optionRenderer,
            onSelect: this.onSelect,
            menuRenderer: menuRenderer,
            searchTerm: searchTerm,
            maxItems: maxItems,
            searchPlaceholder: searchPlaceholder,
            optionLabelRenderer: optionLabelRenderer,
            small: small,
            large: large,
            inlineSearch: inlineSearch
          })
        )
      );
    }
  }]);
  return Select;
}(React__default.Component);

Select.propTypes = {
  className: PropTypes.string,
  options: optionsType,
  values: optionsType,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  sortBy: PropTypes.string,
  sortable: PropTypes.bool,
  multi: PropTypes.bool,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  keepOpen: PropTypes.bool,
  searchBy: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  debounce: PropTypes.number,
  headerRenderer: PropTypes.func,
  optionRenderer: PropTypes.func,
  optionLabelRenderer: PropTypes.func,
  placeholderRenderer: PropTypes.func,
  menuRenderer: PropTypes.func,
  maxItems: PropTypes.number,
  closeOnSelect: PropTypes.bool,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  searchPlaceholder: PropTypes.string,
  error: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  inlineSearch: PropTypes.bool,
  maxTags: PropTypes.number
};


Select.defaultProps = {
  maxItems: 5,
  sortable: true,
  multi: false,
  searchable: false,
  sortBy: 'label',
  searchBy: ['label'],
  sortDirection: 'asc',
  closeOnSelect: true, // apply only for single select
  debounce: 0,
  maxTags: 999
};

var Container$d = styled__default.div(_templateObject$m, function (_ref3) {
  var disabled = _ref3.disabled;
  return disabled && styled.css(_templateObject2$i);
});

var _templateObject$n = taggedTemplateLiteral(['\n  width: 100%;\n  height: 4px;\n  border-radius: 4px;\n  background: ', ';\n  position: relative;\n  overflow: hidden;\n'], ['\n  width: 100%;\n  height: 4px;\n  border-radius: 4px;\n  background: ', ';\n  position: relative;\n  overflow: hidden;\n']),
    _templateObject2$j = taggedTemplateLiteral(['\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 4px;\n\twidth: 0;\n\tbackground: ', ';\n\tmax-width: ', '\n\ttransition: all 100ms;\n  animation: 1000ms ease-out 0s 1 stretchRight forwards;\n  \n  @keyframes stretchRight {\n\t\t100% {\n\t\t\twidth: 100%;\n\t\t}\n\t}\n'], ['\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 4px;\n\twidth: 0;\n\tbackground: ', ';\n\tmax-width: ', '\n\ttransition: all 100ms;\n  animation: 1000ms ease-out 0s 1 stretchRight forwards;\n  \n  @keyframes stretchRight {\n\t\t100% {\n\t\t\twidth: 100%;\n\t\t}\n\t}\n']),
    _templateObject3$f = taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ', ';\n'], ['\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ', ';\n']),
    _templateObject4$d = taggedTemplateLiteral(['\n      pointer-events: none;\n    '], ['\n      pointer-events: none;\n    ']),
    _templateObject5$b = taggedTemplateLiteral(['\n  ', ';\n  margin-right: 15px;\n  width: 40px;\n  text-align: right;\n  color: ', ';\n\n  ', ';\n'], ['\n  ', ';\n  margin-right: 15px;\n  width: 40px;\n  text-align: right;\n  color: ', ';\n\n  ', ';\n']),
    _templateObject6$a = taggedTemplateLiteral(['\n      color: ', ';\n    '], ['\n      color: ', ';\n    ']);

var Progress = function Progress(_ref) {
  var label = _ref.label,
      color = _ref.color,
      percentage = _ref.percentage,
      disabled = _ref.disabled,
      className = _ref.className;

  return React__default.createElement(
    Strip$1,
    { className: className, disabled: disabled },
    label && React__default.createElement(
      Label$2,
      { disabled: disabled },
      label
    ),
    React__default.createElement(
      Outer$1,
      null,
      React__default.createElement(Inner$4, { percentage: percentage, color: color, disabled: disabled })
    )
  );
};

Progress.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

var Outer$1 = styled__default.div(_templateObject$n, function (_ref2) {
  var theme = _ref2.theme;
  return theme.p100;
});

var Inner$4 = styled__default.div(_templateObject2$j, function (_ref3) {
  var theme = _ref3.theme,
      color = _ref3.color;
  return color || theme.a400;
}, function (_ref4) {
  var percentage = _ref4.percentage;
  return percentage + '%';
});

var Strip$1 = styled__default.div(_templateObject3$f, function (_ref5) {
  var disabled = _ref5.disabled;
  return disabled && styled.css(_templateObject4$d);
});

var Label$2 = styled__default.div(_templateObject5$b, function (_ref6) {
  var theme = _ref6.theme;
  return theme.text.sm;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.p300;
}, function (_ref8) {
  var disabled = _ref8.disabled,
      theme = _ref8.theme;
  return disabled && styled.css(_templateObject6$a, hexToRgba(theme.p300, 35));
});

var _templateObject$o = taggedTemplateLiteral(['\n  to {\n    stroke-dashoffset: ', ';\n  }\n'], ['\n  to {\n    stroke-dashoffset: ', ';\n  }\n']),
    _templateObject2$k = taggedTemplateLiteral([''], ['']),
    _templateObject3$g = taggedTemplateLiteral(['\n  transform: rotate(-90deg);\n  transform-origin: 50% 50%;\n'], ['\n  transform: rotate(-90deg);\n  transform-origin: 50% 50%;\n']),
    _templateObject4$e = taggedTemplateLiteral(['\n  stroke-width: ', ';\n  fill: none;\n'], ['\n  stroke-width: ', ';\n  fill: none;\n']),
    _templateObject5$c = taggedTemplateLiteral(['\n  stroke: ', ';\n'], ['\n  stroke: ', ';\n']),
    _templateObject6$b = taggedTemplateLiteral(['\n  stroke: ', ';\n  stroke-linecap: round;\n  stroke-dashoffset: ', ';\n  stroke-dasharray: ', ';\n\n  ', ';\n'], ['\n  stroke: ', ';\n  stroke-linecap: round;\n  stroke-dashoffset: ', ';\n  stroke-dasharray: ', ';\n\n  ', ';\n']),
    _templateObject7$6 = taggedTemplateLiteral(['\n      animation: ', ' 1s linear forwards;\n    '], ['\n      animation: ', ' 1s linear forwards;\n    ']),
    _templateObject8$6 = taggedTemplateLiteral(['\n  ', ';\n  fill: ', ';\n  text-anchor: middle;\n  alignment-baseline: middle;\n'], ['\n  ', ';\n  fill: ', ';\n  text-anchor: middle;\n  alignment-baseline: middle;\n']);

var DEF_RADIUS = 54;

var RadialProgress = function RadialProgress(_ref) {
  var disabled = _ref.disabled,
      label = _ref.label,
      color = _ref.color,
      percentage = _ref.percentage,
      radius = _ref.radius;

  var progress = percentage / 100;
  var rad = radius || DEF_RADIUS;
  var circumference = 2 * Math.PI * rad;
  var dashoffset = circumference - progress * circumference;
  var outerRadius = rad + 6;

  return React__default.createElement(
    Svg$1,
    {
      width: 2 * outerRadius,
      height: 2 * outerRadius,
      viewBox: '0 0 ' + 2 * outerRadius + ' ' + 2 * outerRadius
    },
    React__default.createElement(
      Group,
      null,
      React__default.createElement(Meter, { cx: outerRadius, cy: outerRadius, r: rad, strokeWidth: 2 }),
      React__default.createElement(Value, {
        cx: outerRadius,
        cy: outerRadius,
        r: rad,
        strokeWidth: 5,
        dashoffset: dashoffset,
        circumference: circumference
      })
    ),
    React__default.createElement(
      Text,
      { y: '50%', x: '50%', dy: 2 },
      percentage + '%'
    )
  );
};

RadialProgress.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  radius: PropTypes.number
};

var animate = function animate(dashoffset) {
  return styled.keyframes(_templateObject$o, dashoffset);
};

var Svg$1 = styled__default.svg(_templateObject2$k);

var Group = styled__default.g(_templateObject3$g);

var Circle = styled__default.circle(_templateObject4$e, function (_ref2) {
  var strokeWidth = _ref2.strokeWidth;
  return strokeWidth + 'px';
});

var Meter = styled__default(Circle)(_templateObject5$c, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p200;
});

var Value = styled__default(Circle)(_templateObject6$b, function (_ref4) {
  var theme = _ref4.theme;
  return theme.a400;
}, function (_ref5) {
  var circumference = _ref5.circumference;
  return circumference;
}, function (_ref6) {
  var circumference = _ref6.circumference;
  return circumference;
}, function (_ref7) {
  var dashoffset = _ref7.dashoffset;
  return dashoffset && styled.css(_templateObject7$6, animate(dashoffset));
});

var Text = styled__default.text(_templateObject8$6, function (_ref8) {
  var theme = _ref8.theme;
  return theme.text.sm;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.p300;
});

var _templateObject$p = taggedTemplateLiteral(['\n  width: 100%;\n  display: flex;\n  position: relative;\n  height: 6px;\n  align-items: center;\n\n  ', ';\n'], ['\n  width: 100%;\n  display: flex;\n  position: relative;\n  height: 6px;\n  align-items: center;\n\n  ', ';\n']),
    _templateObject2$l = taggedTemplateLiteral(['\n      pointer-events: none;\n    '], ['\n      pointer-events: none;\n    ']),
    _templateObject3$h = taggedTemplateLiteral(['\n  width: 100%;\n  height: 2px;\n  background: ', ';\n  border-radius: 3px;\n  position: relative;\n  overflow: hidden;\n'], ['\n  width: 100%;\n  height: 2px;\n  background: ', ';\n  border-radius: 3px;\n  position: relative;\n  overflow: hidden;\n']),
    _templateObject4$f = taggedTemplateLiteral(['\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 2px;\n\twidth: ', '\n\tbackground: ', ';\n\ttransition: all 100ms;\n'], ['\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 2px;\n\twidth: ', '\n\tbackground: ', ';\n\ttransition: all 100ms;\n']),
    _templateObject5$d = taggedTemplateLiteral(['\n  width: 12px;\n  height: 12px;\n  cursor: pointer;\n  border-radius: 50%;\n  background: ', ';\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  position: absolute;\n  top: -3px;\n  left: -6px;\n  opacity: 1;\n  transition: all 100ms;\n\n  ', ';\n\n  ', ';\n\n  &:hover {\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n    transform: scale(1.1);\n  }\n'], ['\n  width: 12px;\n  height: 12px;\n  cursor: pointer;\n  border-radius: 50%;\n  background: ', ';\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  position: absolute;\n  top: -3px;\n  left: -6px;\n  opacity: 1;\n  transition: all 100ms;\n\n  ', ';\n\n  ', ';\n\n  &:hover {\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n    transform: scale(1.1);\n  }\n']),
    _templateObject6$c = taggedTemplateLiteral(['\n      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n      transform: scale(1.1);\n    '], ['\n      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n      transform: scale(1.1);\n    ']),
    _templateObject7$7 = taggedTemplateLiteral(['\n      background: ', ';\n    '], ['\n      background: ', ';\n    ']),
    _templateObject8$7 = taggedTemplateLiteral(['\n  position: absolute;\n  top: 10px;\n  left: ', ';\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 20px;\n  pointer-events: none;\n  ', ';\n  color: ', ';\n'], ['\n  position: absolute;\n  top: 10px;\n  left: ', ';\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 20px;\n  pointer-events: none;\n  ', ';\n  color: ', ';\n']),
    _templateObject9$5 = taggedTemplateLiteral(['\n  padding: 2px 6px;\n  ', ';\n  color: ', ';\n  border-radius: 3px;\n  background: ', ';\n  transform: translateX(-50%);\n  position: absolute;\n  transition: all 100ms;\n  top: -28px;\n  opacity: 0;\n\n  ', ';\n'], ['\n  padding: 2px 6px;\n  ', ';\n  color: ', ';\n  border-radius: 3px;\n  background: ', ';\n  transform: translateX(-50%);\n  position: absolute;\n  transition: all 100ms;\n  top: -28px;\n  opacity: 0;\n\n  ', ';\n']),
    _templateObject10$4 = taggedTemplateLiteral(['\n      top: -36px;\n      opacity: 1;\n    '], ['\n      top: -36px;\n      opacity: 1;\n    ']);

var Range = function (_Component) {
  inherits(Range, _Component);

  function Range() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Range);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Range.__proto__ || Object.getPrototypeOf(Range)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      width: 0,
      percentage: 0,
      lastPercentage: 0,
      dragging: false,
      value: 0
    }, _this.handleDrag = function (_ref2) {
      var translateX = _ref2.translateX;
      var _this$state = _this.state,
          lastPercentage = _this$state.lastPercentage,
          width = _this$state.width;
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max,
          onChange = _this$props.onChange;

      var calcPercentage = Math.min(100, lastPercentage + translateX / width * 100);
      var percentage = Math.max(0, calcPercentage);

      _this.setState({
        percentage: percentage,
        value: Math.round(percentage / 100 * (max - min)) + min
      }, function () {
        if (onChange) {
          onChange(_this.state.value);
        }
      });
    }, _this.handleDragStart = function () {
      return _this.setState({ dragging: true });
    }, _this.handleDragEnd = function () {
      return _this.setState({
        lastPercentage: _this.state.percentage,
        dragging: false
      });
    }, _this.handleRef = function (el) {
      if (el) {
        var _el$getBoundingClient = el.getBoundingClientRect(),
            width = _el$getBoundingClient.width;

        _this.setState({ width: width });
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Range, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          percentage = _state.percentage,
          dragging = _state.dragging,
          value = _state.value;
      var _props = this.props,
          min = _props.min,
          max = _props.max,
          disabled = _props.disabled,
          className = _props.className;


      return React__default.createElement(
        Container$e,
        { disabled: disabled, className: className },
        React__default.createElement(
          Outer$2,
          { ref: this.handleRef, className: 'outer', disabled: disabled },
          React__default.createElement(Inner$5, { width: percentage, className: 'inner' })
        ),
        React__default.createElement(
          Draggable,
          {
            onDragStart: this.handleDragStart,
            onDrag: this.handleDrag,
            onDragEnd: this.handleDragEnd
          },
          React__default.createElement(Thumb, {
            className: 'thumb',
            left: percentage,
            dragging: dragging,
            disabled: disabled
          })
        ),
        React__default.createElement(
          Value$1,
          { left: percentage, visible: dragging, className: 'value' },
          value
        ),
        React__default.createElement(
          Label$3,
          { left: '-20px', className: 'label' },
          min
        ),
        React__default.createElement(
          Label$3,
          { left: 'calc(100% - 20px)', className: 'label' },
          max
        )
      );
    }
  }]);
  return Range;
}(React.Component);

Range.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

var Container$e = styled__default.div(_templateObject$p, function (_ref3) {
  var disabled = _ref3.disabled;
  return disabled && styled.css(_templateObject2$l);
});

var Outer$2 = styled__default.div(_templateObject3$h, function (_ref4) {
  var theme = _ref4.theme,
      disabled = _ref4.disabled;
  return disabled ? theme.p200 : hexToRgba(theme.a300, 40);
});

var Inner$5 = styled__default.div(_templateObject4$f, function (_ref5) {
  var width = _ref5.width;
  return width + '%';
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.a400;
});

var Thumb = styled__default.div.attrs({
  style: function style(_ref7) {
    var left = _ref7.left;
    return {
      left: 'calc(' + left + '% - 6px)'
    };
  }
})(_templateObject5$d, function (_ref8) {
  var theme = _ref8.theme;
  return theme.a400;
}, function (_ref9) {
  var dragging = _ref9.dragging;
  return dragging && styled.css(_templateObject6$c);
}, function (_ref10) {
  var disabled = _ref10.disabled,
      theme = _ref10.theme;
  return disabled && styled.css(_templateObject7$7, theme.p200);
});

var Label$3 = styled__default.div(_templateObject8$7, function (_ref11) {
  var left = _ref11.left;
  return left;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.text.sm;
}, function (_ref13) {
  var theme = _ref13.theme;
  return theme.p300;
});

var Value$1 = styled__default.div.attrs({
  style: function style(_ref14) {
    var left = _ref14.left;
    return {
      left: left + '%'
    };
  }
})(_templateObject9$5, function (_ref15) {
  var theme = _ref15.theme;
  return theme.text.sm;
}, function (_ref16) {
  var theme = _ref16.theme;
  return theme.p0;
}, function (_ref17) {
  var theme = _ref17.theme;
  return hexToRgba(theme.p500, 90);
}, function (_ref18) {
  var visible = _ref18.visible;
  return visible && styled.css(_templateObject10$4);
});

var _templateObject$q = taggedTemplateLiteral(['\n  position: relative;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  transition: all 300ms;\n  background: transparent;\n\n  ', ';\n'], ['\n  position: relative;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  transition: all 300ms;\n  background: transparent;\n\n  ', ';\n']),
    _templateObject2$m = taggedTemplateLiteral(['\n      background: ', ';\n    '], ['\n      background: ', ';\n    ']),
    _templateObject3$i = taggedTemplateLiteral(['\n  position: absolute;\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n  top: 4px;\n  left: 4px;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  position: absolute;\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n  top: 4px;\n  left: 4px;\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n']),
    _templateObject4$g = taggedTemplateLiteral(['\n      background: ', ';\n      width: 6px;\n      height: 6px;\n      top: 6px;\n      left: 6px;\n    '], ['\n      background: ', ';\n      width: 6px;\n      height: 6px;\n      top: 6px;\n      left: 6px;\n    ']);

var StepperBullet = function StepperBullet(_ref) {
  var touched = _ref.touched,
      selected = _ref.selected,
      enabled = _ref.enabled,
      hovered = _ref.hovered;
  return React__default.createElement(
    Outer$3,
    { touched: touched, selected: selected, enabled: enabled },
    React__default.createElement(Inner$6, {
      touched: touched,
      selected: selected,
      enabled: enabled,
      hovered: hovered
    })
  );
};

StepperBullet.propTypes = {
  className: PropTypes.string,
  touched: PropTypes.bool,
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
  hovered: PropTypes.bool
};

var Outer$3 = styled__default.div(_templateObject$q, function (_ref2) {
  var selected = _ref2.selected,
      theme = _ref2.theme;
  return selected && styled.css(_templateObject2$m, theme.a400);
});

var Inner$6 = styled__default.div(_templateObject3$i, function (_ref3) {
  var touched = _ref3.touched,
      selected = _ref3.selected,
      theme = _ref3.theme;
  return touched && !selected && styled.css(_templateObject2$m, theme.a400);
}, function (_ref4) {
  var selected = _ref4.selected,
      theme = _ref4.theme;
  return selected && styled.css(_templateObject4$g, theme.p0);
}, function (_ref5) {
  var theme = _ref5.theme,
      selected = _ref5.selected,
      touched = _ref5.touched,
      enabled = _ref5.enabled;
  return !selected && enabled && !touched && styled.css(_templateObject2$m, theme.p200);
}, function (_ref6) {
  var enabled = _ref6.enabled,
      theme = _ref6.theme;
  return !enabled && styled.css(_templateObject2$m, theme.p200);
}, function (_ref7) {
  var theme = _ref7.theme,
      hovered = _ref7.hovered;
  return hovered && styled.css(_templateObject2$m, theme.a400);
});

var _templateObject$r = taggedTemplateLiteral(['\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n'], ['\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject2$n = taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ', ';\n'], ['\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ', ';\n']),
    _templateObject3$j = taggedTemplateLiteral(['\n      pointer-events: none;\n    '], ['\n      pointer-events: none;\n    ']),
    _templateObject4$h = taggedTemplateLiteral(['\n  width: 40px;\n  height: 1px;\n  background: ', ';\n  margin: 0 10px;\n  pointer-events: none;\n'], ['\n  width: 40px;\n  height: 1px;\n  background: ', ';\n  margin: 0 10px;\n  pointer-events: none;\n']),
    _templateObject5$e = taggedTemplateLiteral(['\n  margin: 0 5px;\n  ', ';\n  color: ', ';\n  font-weight: 600;\n  line-height: 14px;\n\n  ', ';\n\n  ', ';\n'], ['\n  margin: 0 5px;\n  ', ';\n  color: ', ';\n  font-weight: 600;\n  line-height: 14px;\n\n  ', ';\n\n  ', ';\n']),
    _templateObject6$d = taggedTemplateLiteral(['\n      color: ', ';\n    '], ['\n      color: ', ';\n    ']),
    _templateObject7$8 = taggedTemplateLiteral(['\n      pointer-events: none;\n      color: ', ';\n    '], ['\n      pointer-events: none;\n      color: ', ';\n    ']),
    _templateObject8$8 = taggedTemplateLiteral([''], ['']);

var Stepper = function (_Component) {
  inherits(Stepper, _Component);

  function Stepper() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Stepper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Stepper.__proto__ || Object.getPrototypeOf(Stepper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hovered: false
    }, _this.toggleHover = function (id) {
      return function () {
        return _this.setState({ hovered: id });
      };
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Stepper, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          steps = _props.steps,
          currentStep = _props.currentStep,
          selectStep = _props.selectStep,
          className = _props.className;
      var hovered = this.state.hovered;


      return React__default.createElement(
        Container$f,
        { className: className },
        steps.map(function (step, index) {
          return React__default.createElement(
            Step,
            {
              key: step.id,
              disabled: !step.enabled,
              onClick: function onClick() {
                return selectStep(step.id);
              },
              onMouseEnter: _this2.toggleHover(step.id),
              onMouseLeave: _this2.toggleHover(null)
            },
            React__default.createElement(StyledBullet, {
              hovered: hovered === step.id && step.id !== currentStep && step.enabled,
              selected: step.id === currentStep,
              enabled: step.enabled,
              touched: step.touched
            }),
            React__default.createElement(
              Label$4,
              { disabled: !step.enabled, selected: step.id === currentStep },
              step.label
            ),
            index !== steps.length - 1 && React__default.createElement(Divider$1, null)
          );
        })
      );
    }
  }]);
  return Stepper;
}(React.Component);

Stepper.defaultProps = { steps: [] };

var stepShape = PropTypes.shape({
  id: PropTypes.number,
  label: PropTypes.string,
  enabled: PropTypes.bool,
  touched: PropTypes.bool
});

Stepper.propTypes = {
  steps: PropTypes.arrayOf(stepShape),
  currentStep: PropTypes.number,
  selectStep: PropTypes.func,
  className: PropTypes.string
};

var Container$f = styled__default.div(_templateObject$r);

var Step = styled__default.div(_templateObject2$n, function (_ref2) {
  var disabled = _ref2.disabled;
  return disabled && styled.css(_templateObject3$j);
});

var Divider$1 = styled__default.div(_templateObject4$h, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p200;
});

var Label$4 = styled__default.span(_templateObject5$e, function (_ref4) {
  var theme = _ref4.theme;
  return theme.text.p;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.p400;
}, function (_ref6) {
  var selected = _ref6.selected,
      theme = _ref6.theme;
  return selected && styled.css(_templateObject6$d, theme.p600);
}, function (_ref7) {
  var disabled = _ref7.disabled;
  return disabled && styled.css(_templateObject7$8, function (_ref8) {
    var theme = _ref8.theme;
    return theme.p200;
  });
});

var StyledBullet = styled__default(StepperBullet)(_templateObject8$8);

var _templateObject$s = taggedTemplateLiteral(['\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n'], ['\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n']),
    _templateObject2$o = taggedTemplateLiteral(['\n  width: 100%;\n  display: flex;\n  justify-content: ', ';\n  border-bottom: 1px solid ', ';\n'], ['\n  width: 100%;\n  display: flex;\n  justify-content: ', ';\n  border-bottom: 1px solid ', ';\n']),
    _templateObject3$k = taggedTemplateLiteral(['\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 0;\n'], ['\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 0;\n']),
    _templateObject4$i = taggedTemplateLiteral(['\n  width: 100%;\n  box-sizing: border-box;\n  padding: 20px 0;\n'], ['\n  width: 100%;\n  box-sizing: border-box;\n  padding: 20px 0;\n']),
    _templateObject5$f = taggedTemplateLiteral(['\n  width: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n'], ['\n  width: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n']),
    _templateObject6$e = taggedTemplateLiteral(['\n  transition: all 300ms;\n  ', ';\n  color: ', ';\n\n  &:hover {\n    color: ', ';\n  }\n\n  ', ';\n'], ['\n  transition: all 300ms;\n  ', ';\n  color: ', ';\n\n  &:hover {\n    color: ', ';\n  }\n\n  ', ';\n']),
    _templateObject7$9 = taggedTemplateLiteral(['\n      color: ', ';\n    '], ['\n      color: ', ';\n    ']),
    _templateObject8$9 = taggedTemplateLiteral(['\n  position: absolute;\n  bottom: -2px;\n  height: 2px;\n  left: ', ';\n  width: 100px;\n  transition: all 300ms;\n  background: ', ';\n'], ['\n  position: absolute;\n  bottom: -2px;\n  height: 2px;\n  left: ', ';\n  width: 100px;\n  transition: all 300ms;\n  background: ', ';\n']);

var Tabs = function Tabs(_ref) {
  var contentRenderer = _ref.contentRenderer,
      selectedIndex = _ref.selectedIndex,
      tabs = _ref.tabs,
      onSelect = _ref.onSelect,
      justify = _ref.justify;

  return React__default.createElement(
    Container$g,
    null,
    React__default.createElement(
      Header$2,
      { justify: justify },
      React__default.createElement(
        InnerHeader,
        null,
        tabs.map(function (tab) {
          return React__default.createElement(
            Tab,
            { key: 'tab-' + tab.id, onClick: function onClick() {
                return onSelect(tab.id);
              } },
            React__default.createElement(
              Label$5,
              { selected: tab.id === selectedIndex },
              tab.label
            )
          );
        }),
        React__default.createElement(Line, { left: selectedIndex * 100 })
      )
    ),
    React__default.createElement(
      Content$2,
      null,
      contentRenderer(tabs[selectedIndex])
    )
  );
};

Tabs.propTypes = {
  contentRenderer: PropTypes.func.isRequired,
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string
  })).isRequired
};

var Container$g = styled__default.div(_templateObject$s);

var Header$2 = styled__default.div(_templateObject2$o, function (_ref2) {
  var justify = _ref2.justify;
  return justify || 'center';
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p100;
});

var InnerHeader = styled__default.div(_templateObject3$k);

var Content$2 = styled__default.div(_templateObject4$i);

var Tab = styled__default.div(_templateObject5$f);

var Label$5 = styled__default.div(_templateObject6$e, function (_ref4) {
  var theme = _ref4.theme;
  return theme.text.pLink;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.p300;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.a400;
}, function (_ref7) {
  var selected = _ref7.selected,
      theme = _ref7.theme;
  return selected && styled.css(_templateObject7$9, theme.a400);
});

var Line = styled__default.div(_templateObject8$9, function (_ref8) {
  var left = _ref8.left;
  return left + 'px';
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.a400;
});

var _templateObject$t = taggedTemplateLiteral(['\n  background: ', ';\n  ', ';\n  color: ', ';\n  height: 24px;\n  padding: 0 16px;\n  border-radius: 12px;\n  line-height: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 300ms;\n  cursor: pointer;\n\n  &:hover {\n    color: ', ';\n    background: ', ';\n  }\n\n  ', ';\n\n  ', ';\n'], ['\n  background: ', ';\n  ', ';\n  color: ', ';\n  height: 24px;\n  padding: 0 16px;\n  border-radius: 12px;\n  line-height: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 300ms;\n  cursor: pointer;\n\n  &:hover {\n    color: ', ';\n    background: ', ';\n  }\n\n  ', ';\n\n  ', ';\n']),
    _templateObject2$p = taggedTemplateLiteral(['\n      color: ', ';\n      background: ', ';\n    '], ['\n      color: ', ';\n      background: ', ';\n    ']),
    _templateObject3$l = taggedTemplateLiteral(['\n      pointer-events: none;\n      color: ', ';\n    '], ['\n      pointer-events: none;\n      color: ', ';\n    ']);

var Tag = function Tag(props) {
  return React__default.createElement(
    Container$h,
    {
      className: props.className,
      onClick: props.onClick,
      color: props.color,
      disabled: props.disabled,
      selected: props.selected
    },
    props.label
  );
};

Tag.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool
};

var Container$h = styled__default.div(_templateObject$t, function (_ref) {
  var theme = _ref.theme;
  return hexToRgba(theme.p300, 15);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.text.pLink;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.lightTheme.p300;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.lightTheme.p0;
}, function (_ref5) {
  var theme = _ref5.theme,
      color = _ref5.color;
  return color || theme.a400;
}, function (_ref6) {
  var selected = _ref6.selected;
  return selected && styled.css(_templateObject2$p, function (_ref7) {
    var theme = _ref7.theme;
    return theme.lightTheme.p0;
  }, function (_ref8) {
    var theme = _ref8.theme,
        color = _ref8.color;
    return color || theme.a400;
  });
}, function (_ref9) {
  var disabled = _ref9.disabled,
      theme = _ref9.theme;
  return disabled && styled.css(_templateObject3$l, hexToRgba(theme.lightTheme.p300, 50));
});

var _templateObject$u = taggedTemplateLiteral(['\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n'], ['\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n']),
    _templateObject2$q = taggedTemplateLiteral(['\n  margin: 4px;\n'], ['\n  margin: 4px;\n']);

var prepSelection = function prepSelection(selected, id) {
  var result = [].concat(toConsumableArray(selected));

  if (result.includes(id)) {
    return result.filter(function (val) {
      return val !== id;
    });
  }

  return [].concat(toConsumableArray(result), [id]);
};

var TagGroup = function TagGroup(_ref) {
  var color = _ref.color,
      tags = _ref.tags,
      selected = _ref.selected,
      onChange = _ref.onChange,
      className = _ref.className,
      disabled = _ref.disabled;
  return React__default.createElement(
    Container$i,
    { className: className },
    tags.map(function (tag) {
      return React__default.createElement(StyledTag, {
        key: 'tag-' + tag.id,
        selected: selected.includes(tag.id),
        onClick: function onClick() {
          return onChange(prepSelection(selected, tag.id));
        },
        label: tag.label,
        color: color,
        disabled: disabled
      });
    })
  );
};

TagGroup.propTypes = {
  color: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })),
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

var Container$i = styled__default.div(_templateObject$u);

var StyledTag = styled__default(Tag)(_templateObject2$q);

var _templateObject$v = taggedTemplateLiteral(['\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  max-width: 200px;\n'], ['\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  max-width: 200px;\n']),
    _templateObject2$r = taggedTemplateLiteral(['\n  ', ';\n  color: ', ';\n  margin-bottom: 5px;\n\n  span {\n    color: ', ';\n    margin-left: 5px;\n  }\n'], ['\n  ', ';\n  color: ', ';\n  margin-bottom: 5px;\n\n  span {\n    color: ', ';\n    margin-left: 5px;\n  }\n']),
    _templateObject3$m = taggedTemplateLiteral(['\n  width: 100%;\n  height: ', ';\n  box-sizing: border-box;\n  padding: 0 10px;\n  border: 1px solid ', ';\n  border-radius: 2px;\n  background: ', ';\n  ', ';\n  transition: all 300ms;\n\n  ', ';\n\n  &::placeholder {\n    color: ', ';\n  }\n\n  ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  width: 100%;\n  height: ', ';\n  box-sizing: border-box;\n  padding: 0 10px;\n  border: 1px solid ', ';\n  border-radius: 2px;\n  background: ', ';\n  ', ';\n  transition: all 300ms;\n\n  ', ';\n\n  &::placeholder {\n    color: ', ';\n  }\n\n  ', ';\n\n  ', ';\n\n  ', ';\n']),
    _templateObject4$j = taggedTemplateLiteral(['\n      &:hover {\n        border-color: ', ';\n      }\n\n      &:focus {\n        border-color: ', ';\n      }\n    '], ['\n      &:hover {\n        border-color: ', ';\n      }\n\n      &:focus {\n        border-color: ', ';\n      }\n    ']),
    _templateObject5$g = taggedTemplateLiteral(['\n      pointer-events: none;\n      background: ', ';\n      border-color: transparent;\n      color: ', ';\n    '], ['\n      pointer-events: none;\n      background: ', ';\n      border-color: transparent;\n      color: ', ';\n    ']),
    _templateObject6$f = taggedTemplateLiteral(['\n      border-color: ', ';\n    '], ['\n      border-color: ', ';\n    ']),
    _templateObject7$a = taggedTemplateLiteral(['\n  ', ';\n  color: ', ';\n  margin-top: 5px;\n'], ['\n  ', ';\n  color: ', ';\n  margin-top: 5px;\n']);

var TextInput = function TextInput(props) {
  var withMessage = props.errorMessage || props.validMessage;

  return React__default.createElement(
    Container$j,
    { className: props.className },
    props.label && React__default.createElement(
      Label$6,
      { className: 'text-input-label' },
      props.label,
      props.required && React__default.createElement(
        'span',
        null,
        '*'
      )
    ),
    React__default.createElement(StyledInput, {
      placeholder: props.placeholder,
      onChange: props.onChange,
      value: props.value,
      disabled: props.disabled,
      error: props.error,
      valid: props.valid,
      large: props.large,
      onFocus: props.onFocus,
      className: 'text-input'
    }),
    withMessage && React__default.createElement(
      Message,
      { valid: props.valid },
      props.errorMessage || props.validMessage
    )
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.bool,
  validMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  large: PropTypes.bool,
  onFocus: PropTypes.func,
  className: PropTypes.string
};

var Container$j = styled__default.div(_templateObject$v);

var Label$6 = styled__default.div(_templateObject2$r, function (_ref) {
  var theme = _ref.theme;
  return theme.text.sm;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.p300;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.r400;
});

var StyledInput = styled__default.input(_templateObject3$m, function (_ref4) {
  var theme = _ref4.theme,
      large = _ref4.large;
  return large ? theme.size.LARGE : theme.size.MEDIUM;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.p200;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.p0;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.text.p;
}, function (_ref8) {
  var theme = _ref8.theme,
      valid = _ref8.valid,
      error = _ref8.error;
  return !valid && !error && styled.css(_templateObject4$j, theme.p300, theme.a400);
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.p300;
}, function (_ref10) {
  var disabled = _ref10.disabled,
      theme = _ref10.theme;
  return disabled && styled.css(_templateObject5$g, hexToRgba(theme.p300, 10), theme.p200);
}, function (_ref11) {
  var valid = _ref11.valid,
      theme = _ref11.theme;
  return valid && styled.css(_templateObject6$f, theme.g400);
}, function (_ref12) {
  var error = _ref12.error,
      theme = _ref12.theme;
  return error && styled.css(_templateObject6$f, theme.r400);
});

var Message = styled__default.div(_templateObject7$a, function (_ref13) {
  var theme = _ref13.theme;
  return theme.text.sm;
}, function (_ref14) {
  var theme = _ref14.theme,
      valid = _ref14.valid;
  return valid ? theme.g400 : theme.r400;
});

var InfoLineIcon = function InfoLineIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { width: "24px", height: "24px", viewBox: "0 0 24 24", className: className },
    React__default.createElement(
      "g",
      {
        id: "icons/info-line-yellow",
        stroke: "none",
        strokeWidth: "1",
        fill: "none",
        fillRule: "evenodd"
      },
      React__default.createElement("path", {
        d: "M12.9200001,13.4932477 C12.9200001,13.9388048 12.5604697,14.3000002 12.1100002,14.3000002 L12.1100002,14.3000002 C11.6626495,14.3000002 11.3000002,13.9344026 11.3000002,13.4932477 L11.3000002,8.30675247 C11.3000002,7.86119538 11.6595307,7.5 12.1100002,7.5 L12.1100002,7.5 C12.5573508,7.5 12.9200001,7.86559754 12.9200001,8.30675247 L12.9200001,13.4932477 Z M12.1100002,16.005 C11.6626496,16.005 11.3000002,16.3676494 11.3000002,16.815 C11.3000002,17.2623507 11.6626496,17.625 12.1100002,17.625 C12.5573509,17.625 12.9200003,17.2623507 12.9200003,16.815 C12.9200003,16.3676494 12.5573509,16.005 12.1100002,16.005 Z",
        id: "Combined-Shape-Copy",
        fill: "#FFBE03",
        transform: "translate(12.110000, 12.562500) scale(1, -1) translate(-12.110000, -12.562500) "
      }),
      React__default.createElement("path", {
        d: "M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C20.9933894,16.967822 16.967822,20.9933894 12,21 Z M12,4.2 C7.69217895,4.2 4.2,7.69217895 4.2,12 C4.2,16.307821 7.69217895,19.8 12,19.8 C16.307821,19.8 19.8,16.307821 19.8,12 C19.793392,7.69491903 16.305081,4.20660796 12,4.2 Z",
        fill: "#FFBE03"
      })
    )
  );
};

var WarningLineIcon = function WarningLineIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { width: "24px", height: "24px", viewBox: "0 0 24 24", className: className },
    React__default.createElement(
      "g",
      {
        id: "icons/warning-line-red",
        stroke: "none",
        strokeWidth: "1",
        fill: "none",
        fillRule: "evenodd"
      },
      React__default.createElement("path", {
        d: "M12.8172415,7.75512919 L12.8172415,13.8310777 C12.8172415,14.2405305 12.4775955,14.5862069 12.0586209,14.5862069 C11.6367252,14.5862069 11.3000002,14.2481241 11.3000002,13.8310777 L11.3000002,7.75512919 C11.3000002,7.34567644 11.6396462,7 12.0586209,7 C12.4805165,7 12.8172415,7.33808286 12.8172415,7.75512919 Z M12.0586209,16.4827587 C12.4775956,16.4827587 12.8172416,16.8224047 12.8172416,17.2413793 C12.8172416,17.660354 12.4775956,18 12.0586209,18 C11.6396463,18 11.3000002,17.660354 11.3000002,17.2413793 C11.3000002,16.8224047 11.6396463,16.4827587 12.0586209,16.4827587 Z",
        id: "Combined-Shape-Copy",
        fill: "#DE4B4C"
      }),
      React__default.createElement("path", {
        d: "M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C20.9933894,16.967822 16.967822,20.9933894 12,21 Z M12,4.2 C7.69217895,4.2 4.2,7.69217895 4.2,12 C4.2,16.307821 7.69217895,19.8 12,19.8 C16.307821,19.8 19.8,16.307821 19.8,12 C19.793392,7.69491903 16.305081,4.20660796 12,4.2 Z",
        id: "Shape",
        fill: "#DE4B4C"
      })
    )
  );
};

var SuccessLineIcon = function SuccessLineIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { width: "24px", height: "24px", viewBox: "0 0 24 24", className: className },
    React__default.createElement(
      "g",
      {
        id: "icons/success-line-green",
        stroke: "none",
        strokeWidth: "1",
        fill: "none",
        fillRule: "evenodd"
      },
      React__default.createElement("path", {
        d: "M14.9903806,9.19038059 C15.2442214,8.9365398 15.6557786,8.9365398 15.9096194,9.19038059 C16.1634602,9.44422138 16.1634602,9.85577862 15.9096194,10.1096194 L10.7096194,15.3096194 C10.4557786,15.5634602 10.0442214,15.5634602 9.79038059,15.3096194 L7.19038059,12.7096194 C6.9365398,12.4557786 6.9365398,12.0442214 7.19038059,11.7903806 C7.44422138,11.5365398 7.85577862,11.5365398 8.10961941,11.7903806 L10.25,13.9307612 L14.9903806,9.19038059 Z",
        id: "Path",
        fill: "#0DB864",
        fillRule: "nonzero"
      }),
      React__default.createElement("path", {
        d: "M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C20.9933894,16.967822 16.967822,20.9933894 12,21 Z M12,4.2 C7.69217895,4.2 4.2,7.69217895 4.2,12 C4.2,16.307821 7.69217895,19.8 12,19.8 C16.307821,19.8 19.8,16.307821 19.8,12 C19.793392,7.69491903 16.305081,4.20660796 12,4.2 Z",
        fill: "#0DB864"
      })
    )
  );
};

var _templateObject$w = taggedTemplateLiteral(['\n  position: fixed;\n  width: 360px;\n  height: 70px;\n  background: ', ';\n  border-radius: 4px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n  padding: 12px;\n  transition: all 1000ms;\n  right: 20px;\n  top: ', ';\n  z-index: 999;\n  ', ';\n  display: flex;\n'], ['\n  position: fixed;\n  width: 360px;\n  height: 70px;\n  background: ', ';\n  border-radius: 4px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n  padding: 12px;\n  transition: all 1000ms;\n  right: 20px;\n  top: ', ';\n  z-index: 999;\n  ', ';\n  display: flex;\n']),
    _templateObject2$s = taggedTemplateLiteral(['\n  flex-direction: column;\n  display: flex;\n'], ['\n  flex-direction: column;\n  display: flex;\n']),
    _templateObject3$n = taggedTemplateLiteral(['\n  ', ';\n  height: 22px;\n  display: flex;\n  align-items: center;\n'], ['\n  ', ';\n  height: 22px;\n  display: flex;\n  align-items: center;\n']),
    _templateObject4$k = taggedTemplateLiteral(['\n  ', ';\n'], ['\n  ', ';\n']),
    _templateObject5$h = taggedTemplateLiteral(['\n  width: 26px;\n  height: 26px;\n  margin-right: 4px;\n'], ['\n  width: 26px;\n  height: 26px;\n  margin-right: 4px;\n']),
    _templateObject6$g = taggedTemplateLiteral(['\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  cursor: pointer;\n\n  width: 12px;\n  height: 12px;\n  overflow: hidden;\n\n  &:hover {\n    &::before,\n    &::after {\n      background: ', ';\n    }\n  }\n\n  &::before,\n  &::after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    top: 50%;\n    left: 0;\n    margin-top: -1px;\n    background: ', ';\n  }\n\n  &::before {\n    transform: rotate(45deg);\n  }\n\n  &::after {\n    transform: rotate(-45deg);\n  }\n\n  &::before,\n  &::after {\n    height: 1px;\n  }\n'], ['\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  cursor: pointer;\n\n  width: 12px;\n  height: 12px;\n  overflow: hidden;\n\n  &:hover {\n    &::before,\n    &::after {\n      background: ', ';\n    }\n  }\n\n  &::before,\n  &::after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    top: 50%;\n    left: 0;\n    margin-top: -1px;\n    background: ', ';\n  }\n\n  &::before {\n    transform: rotate(45deg);\n  }\n\n  &::after {\n    transform: rotate(-45deg);\n  }\n\n  &::before,\n  &::after {\n    height: 1px;\n  }\n']);

// shared context
var Context = React__default.createContext();
var Consumer = Context.Consumer;
var withToast = function withToast(Comp) {
  return function (props) {
    return React__default.createElement(
      Consumer,
      null,
      function (_ref) {
        var addToast = _ref.addToast;
        return React__default.createElement(Comp, _extends({}, props, { addToast: addToast }));
      }
    );
  };
};

var Toasts = function (_Component) {
  inherits(Toasts, _Component);

  function Toasts() {
    var _ref2;

    var _temp, _this, _ret;

    classCallCheck(this, Toasts);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref2 = Toasts.__proto__ || Object.getPrototypeOf(Toasts)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      leaving: [],
      list: []
    }, _this.addToast = fp.throttle(200, function (notif) {
      var id = Math.random();

      _this.setState({
        list: [].concat(toConsumableArray(_this.state.list), [_extends({ id: id }, notif)])
      }, function () {
        setTimeout(function () {
          _this.clearToast(id)();
        }, notif.timeout || 5000);
      });
    }), _this.clearToast = function (id) {
      return function () {
        _this.setState({
          leaving: [id]
        }, function () {
          setTimeout(function () {
            _this.setState({
              list: _this.state.list.filter(function (notif) {
                return notif.id !== id;
              })
            });
          }, 500);
        });
      };
    }, _this.icon = function (type) {
      switch (type) {
        case 'info':
          return React__default.createElement(StyledInfoIcon, null);

        case 'alert':
          return React__default.createElement(StyledAlertIcon, null);

        case 'success':
          return React__default.createElement(StyledSuccessIcon, null);

        case 'warning':
          return React__default.createElement(StyledWarningIcon, null);

        default:
          return null;
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Toasts, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          list = _state.list,
          leaving = _state.leaving;
      var children = this.props.children;

      var contextActions = {
        addToast: this.addToast
      };

      return React__default.createElement(
        Context.Provider,
        { value: contextActions },
        React__default.createElement(
          React.Fragment,
          null,
          list.map(function (_ref3, index) {
            var id = _ref3.id,
                title = _ref3.title,
                subtitle = _ref3.subtitle,
                type = _ref3.type;
            return React__default.createElement(
              Toast,
              {
                key: 'notif-' + id,
                top: index * 80,
                leaving: leaving.includes(id)
              },
              React__default.createElement(CloseIcon$2, { onClick: _this2.clearToast(id) }),
              _this2.icon(type),
              React__default.createElement(
                Meta,
                null,
                React__default.createElement(
                  Title$1,
                  null,
                  title
                ),
                React__default.createElement(
                  Subtitle,
                  null,
                  subtitle
                )
              )
            );
          }),
          children
        )
      );
    }
  }]);
  return Toasts;
}(React.Component);

Toasts.propTypes = {};

var Toast = styled__default.div(_templateObject$w, function (_ref4) {
  var theme = _ref4.theme;
  return theme.p0;
}, function (_ref5) {
  var top = _ref5.top;
  return 20 + top + 'px';
}, function (_ref6) {
  var theme = _ref6.theme,
      leaving = _ref6.leaving;
  return leaving ? theme.animation.fadeRightExit : theme.animation.fadeLeft;
});

var Meta = styled__default.div(_templateObject2$s);

var Title$1 = styled__default.div(_templateObject3$n, function (_ref7) {
  var theme = _ref7.theme;
  return theme.text.pBold;
});

var Subtitle = styled__default.div(_templateObject4$k, function (_ref8) {
  var theme = _ref8.theme;
  return theme.text.smNote;
});

var StyledInfoIcon = styled__default(InfoLineIcon)(_templateObject5$h);

var StyledAlertIcon = styled__default(InfoLineIcon)(_templateObject5$h);

var StyledWarningIcon = styled__default(WarningLineIcon)(_templateObject5$h);

var StyledSuccessIcon = styled__default(SuccessLineIcon)(_templateObject5$h);

var CloseIcon$2 = styled__default.div(_templateObject6$g, function (_ref9) {
  var theme = _ref9.theme;
  return theme.p500;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.p300;
});

var _templateObject$x = taggedTemplateLiteral(['\n  width: 26px;\n  height: 12px;\n  position: relative;\n  border-radius: 6px;\n  background: ', ';\n  transition: all 300ms;\n\n  &:hover {\n    background: ', ';\n  }\n\n  ', ';\n\n  ', ';\n'], ['\n  width: 26px;\n  height: 12px;\n  position: relative;\n  border-radius: 6px;\n  background: ', ';\n  transition: all 300ms;\n\n  &:hover {\n    background: ', ';\n  }\n\n  ', ';\n\n  ', ';\n']),
    _templateObject2$t = taggedTemplateLiteral(['\n      &:hover {\n        background: ', ';\n      }\n    '], ['\n      &:hover {\n        background: ', ';\n      }\n    ']),
    _templateObject3$o = taggedTemplateLiteral(['\n      background: ', ';\n    '], ['\n      background: ', ';\n    ']),
    _templateObject4$l = taggedTemplateLiteral(['\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background: ', ';\n  top: 2px;\n  border-radius: 50%;\n  transition: all 300ms;\n  left: ', 'px;\n'], ['\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background: ', ';\n  top: 2px;\n  border-radius: 50%;\n  transition: all 300ms;\n  left: ', 'px;\n']),
    _templateObject5$i = taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ', ';\n'], ['\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ', ';\n']),
    _templateObject6$h = taggedTemplateLiteral(['\n      pointer-events: none;\n    '], ['\n      pointer-events: none;\n    ']),
    _templateObject7$b = taggedTemplateLiteral(['\n  ', ';\n  margin-left: 10px;\n\n  ', ';\n'], ['\n  ', ';\n  margin-left: 10px;\n\n  ', ';\n']),
    _templateObject8$a = taggedTemplateLiteral(['\n      color: ', ';\n    '], ['\n      color: ', ';\n    ']);

var Toggle = function Toggle(_ref) {
  var onClick = _ref.onClick,
      checked = _ref.checked,
      disabled = _ref.disabled,
      label = _ref.label,
      className = _ref.className;
  return React__default.createElement(
    Strip$2,
    { onClick: onClick, disabled: disabled },
    React__default.createElement(
      Container$k,
      { className: className, checked: checked, disabled: disabled },
      React__default.createElement(Inner$7, { checked: checked, disabled: disabled })
    ),
    label && React__default.createElement(
      Label$7,
      { disabled: disabled },
      label
    )
  );
};

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
};

var Container$k = styled__default.div(_templateObject$x, function (_ref2) {
  var theme = _ref2.theme,
      checked = _ref2.checked;
  return checked ? theme.a400 : theme.p200;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.a500;
}, function (_ref4) {
  var checked = _ref4.checked,
      theme = _ref4.theme;
  return !checked && styled.css(_templateObject2$t, theme.p300);
}, function (_ref5) {
  var disabled = _ref5.disabled,
      theme = _ref5.theme;
  return disabled && styled.css(_templateObject3$o, hexToRgba(theme.p200, 60));
});

var Inner$7 = styled__default.div(_templateObject4$l, function (_ref6) {
  var theme = _ref6.theme,
      disabled = _ref6.disabled;
  return disabled ? hexToRgba(theme.p300, 60) : '#fff';
}, function (_ref7) {
  var checked = _ref7.checked;
  return checked ? 16 : 2;
});

var Strip$2 = styled__default.div(_templateObject5$i, function (_ref8) {
  var disabled = _ref8.disabled;
  return disabled && styled.css(_templateObject6$h);
});

var Label$7 = styled__default.div(_templateObject7$b, function (_ref9) {
  var theme = _ref9.theme;
  return theme.text.sm;
}, function (_ref10) {
  var disabled = _ref10.disabled,
      theme = _ref10.theme;
  return disabled && styled.css(_templateObject8$a, hexToRgba(theme.p300, 35));
});

var _templateObject$y = taggedTemplateLiteral(['\n  position: absolute;\n  padding: 6px 12px;\n  border-radius: 3px;\n  pointer-events: none;\n  visibility: hidden;\n  opacity: 0;\n  transition: all 300ms;\n\n  background: ', ';\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  position: absolute;\n  padding: 6px 12px;\n  border-radius: 3px;\n  pointer-events: none;\n  visibility: hidden;\n  opacity: 0;\n  transition: all 300ms;\n\n  background: ', ';\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n']),
    _templateObject2$u = taggedTemplateLiteral(['\n      pointer-events: all;\n      opacity: 1;\n      visibility: visible;\n    '], ['\n      pointer-events: all;\n      opacity: 1;\n      visibility: visible;\n    ']),
    _templateObject3$p = taggedTemplateLiteral(['\n      top: calc(100% + 10px);\n      left: 50%;\n      transform: translateX(-50%);\n    '], ['\n      top: calc(100% + 10px);\n      left: 50%;\n      transform: translateX(-50%);\n    ']),
    _templateObject4$m = taggedTemplateLiteral(['\n      bottom: calc(100% + 10px);\n      left: 50%;\n      transform: translateX(-50%);\n    '], ['\n      bottom: calc(100% + 10px);\n      left: 50%;\n      transform: translateX(-50%);\n    ']),
    _templateObject5$j = taggedTemplateLiteral(['\n      top: 50%;\n      left: calc(100% + 10px);\n      transform: translateY(-50%);\n    '], ['\n      top: 50%;\n      left: calc(100% + 10px);\n      transform: translateY(-50%);\n    ']),
    _templateObject6$i = taggedTemplateLiteral(['\n      top: 50%;\n      right: calc(100% + 10px);\n      transform: translateY(-50%);\n    '], ['\n      top: 50%;\n      right: calc(100% + 10px);\n      transform: translateY(-50%);\n    ']),
    _templateObject7$c = taggedTemplateLiteral(['\n  position: relative;\n'], ['\n  position: relative;\n']),
    _templateObject8$b = taggedTemplateLiteral(['\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n\n  width: 12px;\n  height: 12px;\n  overflow: hidden;\n\n  &:hover {\n    &::before,\n    &::after {\n      background: ', ';\n    }\n  }\n\n  &::before,\n  &::after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    top: 50%;\n    left: 0;\n    margin-top: -1px;\n    background: ', ';\n  }\n\n  &::before {\n    transform: rotate(45deg);\n  }\n\n  &::after {\n    transform: rotate(-45deg);\n  }\n\n  &::before,\n  &::after {\n    height: 1px;\n  }\n'], ['\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n\n  width: 12px;\n  height: 12px;\n  overflow: hidden;\n\n  &:hover {\n    &::before,\n    &::after {\n      background: ', ';\n    }\n  }\n\n  &::before,\n  &::after {\n    content: \'\';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    top: 50%;\n    left: 0;\n    margin-top: -1px;\n    background: ', ';\n  }\n\n  &::before {\n    transform: rotate(45deg);\n  }\n\n  &::after {\n    transform: rotate(-45deg);\n  }\n\n  &::before,\n  &::after {\n    height: 1px;\n  }\n']);

// positions
var BOTTOM = 'BOTTOM';
var TOP = 'TOP';
var LEFT = 'LEFT';
var RIGHT = 'RIGHT';
// const BOTTOM_LEFT = 'BOTTOM_LEFT';
// const BOTTOM_RIGHT = 'BOTTOM_RIGHT';
// const TOP_LEFT = 'TOP_LEFT';
// const TOP_RIGHT = 'TOP_RIGHT';

var Popup = function Popup(_ref) {
  var children = _ref.children,
      open = _ref.open,
      className = _ref.className,
      _ref$position = _ref.position,
      position = _ref$position === undefined ? BOTTOM : _ref$position,
      contentRenderer = _ref.contentRenderer,
      withClose = _ref.withClose,
      toggleOpen = _ref.toggleOpen;
  return React__default.createElement(
    Container$l,
    { className: className },
    children,
    React__default.createElement(
      Menu,
      { visible: open, className: 'pop-menu', position: position },
      contentRenderer(),
      withClose && React__default.createElement(CloseIcon$3, { onClick: toggleOpen })
    )
  );
};

Popup.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  className: PropTypes.string,
  contentRenderer: PropTypes.func,
  position: PropTypes.string,
  withClose: PropTypes.bool,
  toggleOpen: PropTypes.func
};

var Menu = styled__default.div(_templateObject$y, function (_ref2) {
  var theme = _ref2.theme;
  return hexToRgba(theme.p200, 0.8);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.text.tooltip;
}, function (_ref4) {
  var visible = _ref4.visible;
  return visible && styled.css(_templateObject2$u);
}, function (_ref5) {
  var position = _ref5.position;
  return position === BOTTOM && styled.css(_templateObject3$p);
}, function (_ref6) {
  var position = _ref6.position;
  return position === TOP && styled.css(_templateObject4$m);
}, function (_ref7) {
  var position = _ref7.position;
  return position === RIGHT && styled.css(_templateObject5$j);
}, function (_ref8) {
  var position = _ref8.position;
  return position === LEFT && styled.css(_templateObject6$i);
});

var Container$l = styled__default.div(_templateObject7$c);

var CloseIcon$3 = styled__default.div(_templateObject8$b, function (_ref9) {
  var theme = _ref9.theme;
  return theme.p500;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.p300;
});

var TipLineIcon = function TipLineIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { className: className, width: "24", height: "24", viewBox: "0 0 24 24" },
    React__default.createElement(
      "g",
      { fill: "none", fillRule: "evenodd" },
      React__default.createElement("path", {
        fill: "#9EA0A5",
        d: "M12 16.2a.7.7 0 1 0 0 1.4.7.7 0 0 0 0-1.4zm-.06-1.094a.57.57 0 0 1-.57-.57v-1.359a1.997 1.997 0 0 1 1.403-1.495 2.842 2.842 0 0 0 1.426-1.142 1.816 1.816 0 0 0-.228-1.61 2.544 2.544 0 0 0-2.031-.775c-2.02 0-2.283 1.22-2.283 1.232a.587.587 0 1 1-1.14-.274c0-.09.547-2.1 3.423-2.1a3.617 3.617 0 0 1 2.955 1.142c.582.751.757 1.742.468 2.648a3.424 3.424 0 0 1-2.054 1.883c-.302.125-.586.29-.844.491v1.324a.57.57 0 0 1-.525.605z"
      }),
      React__default.createElement("path", {
        d: "M12 21.375A9.375 9.375 0 1 1 21.375 12 9.387 9.387 0 0 1 12 21.375zm0-17.5A8.125 8.125 0 1 0 20.125 12 8.138 8.138 0 0 0 12 3.875z",
        fill: "#9CA0A0"
      })
    )
  );
};

var _templateObject$z = taggedTemplateLiteral([''], ['']),
    _templateObject2$v = taggedTemplateLiteral(['\n  white-space: nowrap;\n'], ['\n  white-space: nowrap;\n']),
    _templateObject3$q = taggedTemplateLiteral(['\n  width: 24px;\n  height: 24px;\n'], ['\n  width: 24px;\n  height: 24px;\n']),
    _templateObject4$n = taggedTemplateLiteral(['\n  .pop-menu {\n    background: ', ';\n    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);\n    width: 400px;\n    min-height: 40px;\n    color: ', ';\n    box-sizing: border-box;\n    padding: 15px 36px 15px 15px;\n    line-height: 16px;\n    border-radius: 2px;\n    ', ';\n\n    &:after {\n      border: solid transparent;\n      content: \' \';\n      height: 0;\n      width: 0;\n      position: absolute;\n      pointer-events: none;\n      border-top-color: ', ';\n      border-width: 6px;\n    }\n\n    ', ';\n\n    ', ';\n\n    ', ';\n\n    ', ';\n  }\n'], ['\n  .pop-menu {\n    background: ', ';\n    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);\n    width: 400px;\n    min-height: 40px;\n    color: ', ';\n    box-sizing: border-box;\n    padding: 15px 36px 15px 15px;\n    line-height: 16px;\n    border-radius: 2px;\n    ', ';\n\n    &:after {\n      border: solid transparent;\n      content: \' \';\n      height: 0;\n      width: 0;\n      position: absolute;\n      pointer-events: none;\n      border-top-color: ', ';\n      border-width: 6px;\n    }\n\n    ', ';\n\n    ', ';\n\n    ', ';\n\n    ', ';\n  }\n']),
    _templateObject5$k = taggedTemplateLiteral(['\n        &:after {\n          top: 100%;\n          left: 50%;\n          margin-left: -6px;\n        }\n      '], ['\n        &:after {\n          top: 100%;\n          left: 50%;\n          margin-left: -6px;\n        }\n      ']),
    _templateObject6$j = taggedTemplateLiteral(['\n        &:after {\n          bottom: 100%;\n          left: 50%;\n          margin-left: -6px;\n          transform: rotate(180deg);\n        }\n      '], ['\n        &:after {\n          bottom: 100%;\n          left: 50%;\n          margin-left: -6px;\n          transform: rotate(180deg);\n        }\n      ']),
    _templateObject7$d = taggedTemplateLiteral(['\n        &:after {\n          top: 50%;\n          left: 100%;\n          margin-top: -6px;\n          transform: rotate(-90deg);\n        }\n      '], ['\n        &:after {\n          top: 50%;\n          left: 100%;\n          margin-top: -6px;\n          transform: rotate(-90deg);\n        }\n      ']),
    _templateObject8$c = taggedTemplateLiteral(['\n        &:after {\n          top: 50%;\n          right: 100%;\n          margin-top: -6px;\n          transform: rotate(90deg);\n        }\n      '], ['\n        &:after {\n          top: 50%;\n          right: 100%;\n          margin-top: -6px;\n          transform: rotate(90deg);\n        }\n      ']),
    _templateObject9$6 = taggedTemplateLiteral(['\n  cursor: pointer;\n  color: ', ';\n  margin-left: 6px;\n'], ['\n  cursor: pointer;\n  color: ', ';\n  margin-left: 6px;\n']);

var Tooltip = function (_Component) {
  inherits(Tooltip, _Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.toggleOpen = function (origin) {
      return function () {
        var open = _this.state.open;
        var long = _this.props.long;


        if (long && open && origin === 'icon') {
          return;
        }

        _this.setState({ open: !open });
      };
    }, _this.title = function () {
      var _this$props = _this.props,
          long = _this$props.long,
          onClickInfo = _this$props.onClickInfo;


      return React__default.createElement(
        React.Fragment,
        null,
        React__default.createElement(
          'span',
          null,
          _this.props.title
        ),
        long && onClickInfo && React__default.createElement(
          LongAction,
          { onClick: onClickInfo },
          'More Info'
        )
      );
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Tooltip, [{
    key: 'smallTooltip',
    value: function smallTooltip() {
      var _props = this.props,
          children = _props.children,
          _props$position = _props.position,
          position = _props$position === undefined ? 'TOP' : _props$position;
      var open = this.state.open;


      return React__default.createElement(
        StyledPopup,
        { open: open, contentRenderer: this.title, position: position },
        React__default.createElement(
          Container$m,
          {
            onMouseEnter: this.toggleOpen('content'),
            onMouseLeave: this.toggleOpen('content')
          },
          children
        )
      );
    }
  }, {
    key: 'longTooltip',
    value: function longTooltip() {
      var _props$position2 = this.props.position,
          position = _props$position2 === undefined ? 'TOP' : _props$position2;
      var open = this.state.open;


      return React__default.createElement(
        StyledLong,
        {
          open: open,
          contentRenderer: this.title,
          position: position,
          withClose: true,
          toggleOpen: this.toggleOpen('close-icon')
        },
        React__default.createElement(
          Container$m,
          { onMouseEnter: this.toggleOpen('icon') },
          React__default.createElement(StyledTip, null)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var long = this.props.long;


      if (long) {
        return this.longTooltip();
      }

      return this.smallTooltip();
    }
  }]);
  return Tooltip;
}(React.Component);

Tooltip.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  long: PropTypes.bool,
  onClickInfo: PropTypes.func,
  position: PropTypes.string
};

var Container$m = styled__default.span(_templateObject$z);

var StyledPopup = styled__default(Popup)(_templateObject2$v);

var StyledTip = styled__default(TipLineIcon)(_templateObject3$q);

var StyledLong = styled__default(Popup)(_templateObject4$n, function (_ref2) {
  var theme = _ref2.theme;
  return theme.p0;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p600;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.text.sm;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.p0;
}, function (_ref6) {
  var position = _ref6.position;
  return position === 'TOP' && styled.css(_templateObject5$k);
}, function (_ref7) {
  var position = _ref7.position;
  return position === 'BOTTOM' && styled.css(_templateObject6$j);
}, function (_ref8) {
  var position = _ref8.position;
  return position === 'LEFT' && styled.css(_templateObject7$d);
}, function (_ref9) {
  var position = _ref9.position;
  return position === 'RIGHT' && styled.css(_templateObject8$c);
});

var LongAction = styled__default.span(_templateObject9$6, function (_ref10) {
  var theme = _ref10.theme;
  return theme.a400;
});

var _templateObject$A = taggedTemplateLiteral(['\n  width: 100%;\n  min-height: 120px;\n  background: ', ';\n  border-radius: 4px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  padding: 20px;\n  position: relative;\n\n  ', ';\n'], ['\n  width: 100%;\n  min-height: 120px;\n  background: ', ';\n  border-radius: 4px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n  padding: 20px;\n  position: relative;\n\n  ', ';\n']),
    _templateObject2$w = taggedTemplateLiteral(['\n      pointer-events: none;\n      opacity: 0.4;\n    '], ['\n      pointer-events: none;\n      opacity: 0.4;\n    ']),
    _templateObject3$r = taggedTemplateLiteral(['\n  position: absolute;\n  top: 0;\n  left: 0;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n']);

var Widget = function Widget(props) {
  return React__default.createElement(
    Container$n,
    { disabled: props.disabled },
    props.children,
    props.loading && React__default.createElement(StyledProgress, null)
  );
};

Widget.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  empty: PropTypes.bool,
  children: PropTypes.node
};

var Container$n = styled__default.div(_templateObject$A, function (_ref) {
  var theme = _ref.theme;
  return theme.p0;
}, function (_ref2) {
  var disabled = _ref2.disabled;
  return disabled && styled.css(_templateObject2$w);
});

var StyledProgress = styled__default(LinearProgress)(_templateObject3$r);

var DoubleArrowDownIcon = function DoubleArrowDownIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { width: "11px", height: "14px", viewBox: "0 0 11 14", className: className },
    React__default.createElement(
      "g",
      { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
      React__default.createElement(
        "g",
        {
          id: "doublearrow-left",
          transform: "translate(5.500000, 7.000000) rotate(-90.000000) translate(-5.500000, -7.000000) translate(-1.000000, 2.000000)",
          fill: "#9CA0A0"
        },
        React__default.createElement("path", {
          d: "M5.1240936,0.00355696 C5.3770744,-0.0179829 5.6135982,0.1310733 5.7033253,0.36858612 C5.7930523,0.60609895 5.7141633,0.8743111 5.510131,1.02542067 L1.37725993,4.9993351 L5.510131,8.9732496 C5.7358749,9.1927228 5.7409582,9.5536426 5.521485,9.7793865 C5.3020118,10.0051304 4.941092,10.0102138 4.7153481,9.7907405 L0.17373156,5.3626644 C0.06271635,5.2556621 0,5.1081067 0,4.953919 C0,4.7997312 0.06271635,4.6521758 0.17373156,4.5451735 L4.7153481,0.11709737 C4.8318054,0.02785324 4.9782921,-0.0128375 5.1240936,0.00355696 Z M12.1240936,0.00355696 C12.3770744,-0.0179829 12.6135982,0.1310733 12.7033253,0.36858612 C12.7930523,0.60609895 12.7141633,0.8743111 12.510131,1.02542067 L8.3772599,4.9993351 L12.510131,8.9732496 C12.7358749,9.1927228 12.7409582,9.5536426 12.521485,9.7793865 C12.3020118,10.0051304 11.941092,10.0102138 11.7153481,9.7907405 L7.1737316,5.3626644 C7.0627164,5.2556621 7,5.1081067 7,4.953919 C7,4.7997312 7.0627164,4.6521758 7.1737316,4.5451735 L11.7153481,0.11709737 C11.8318054,0.02785324 11.9782921,-0.0128375 12.1240936,0.00355696 Z",
          id: "path-1"
        })
      )
    )
  );
};

var _templateObject$B = taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n'], ['\n  display: flex;\n  align-items: center;\n']),
    _templateObject2$x = taggedTemplateLiteral(['\n  width: 24px;\n  height: 24px;\n  background: ', ';\n  cursor: pointer;\n  margin: 0 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 2px;\n  transition: ', ';\n\n  ', ';\n  color: ', ';\n\n  ', ';\n\n  &:hover {\n    color: ', ';\n  }\n\n  ', ';\n'], ['\n  width: 24px;\n  height: 24px;\n  background: ', ';\n  cursor: pointer;\n  margin: 0 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 2px;\n  transition: ', ';\n\n  ', ';\n  color: ', ';\n\n  ', ';\n\n  &:hover {\n    color: ', ';\n  }\n\n  ', ';\n']),
    _templateObject3$s = taggedTemplateLiteral(['\n      color: ', ';\n    '], ['\n      color: ', ';\n    ']),
    _templateObject4$o = taggedTemplateLiteral(['\n      &:hover {\n        background: ', ';\n      }\n    '], ['\n      &:hover {\n        background: ', ';\n      }\n    ']),
    _templateObject5$l = taggedTemplateLiteral(['\n  width: 1px;\n  height: 18px;\n  margin: 0 8px;\n  background: ', ';\n'], ['\n  width: 1px;\n  height: 18px;\n  margin: 0 8px;\n  background: ', ';\n']),
    _templateObject6$k = taggedTemplateLiteral(['\n  ', ';\n  width: 90px;\n'], ['\n  ', ';\n  width: 90px;\n']),
    _templateObject7$e = taggedTemplateLiteral(['\n  width: 10px;\n  height: 10px;\n  transform: rotate(', ');\n  * {\n    fill: ', ';\n  }\n'], ['\n  width: 10px;\n  height: 10px;\n  transform: rotate(', ');\n  * {\n    fill: ', ';\n  }\n']),
    _templateObject8$d = taggedTemplateLiteral(['\n  width: 14px;\n  height: 14px;\n  transform: rotate(', ');\n  * {\n    fill: ', ';\n  }\n'], ['\n  width: 14px;\n  height: 14px;\n  transform: rotate(', ');\n  * {\n    fill: ', ';\n  }\n']);

var Pagination = function (_React$Component) {
  inherits(Pagination, _React$Component);

  function Pagination() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      current: 1,
      selected: 1
    }, _this.next = function () {
      var _this$props = _this.props,
          total = _this$props.total,
          max = _this$props.max;
      var _this$state = _this.state,
          current = _this$state.current,
          selected = _this$state.selected;

      var next = current + 1;
      var nextSelected = selected + 1;

      if (nextSelected > total) {
        return;
      }

      _this.setState({
        selected: nextSelected,
        current: nextSelected > max && next < total - max + 2 ? next : current
      }, _this.update);
    }, _this.prev = function () {
      var _this$state2 = _this.state,
          current = _this$state2.current,
          selected = _this$state2.selected;
      var _this$props2 = _this.props,
          total = _this$props2.total,
          max = _this$props2.max;

      var next = current - 1;
      var nextSelected = selected - 1;

      if (next <= 0) {
        return;
      }

      var updateCurrent = total - selected > max - 2;

      _this.setState({
        selected: nextSelected,
        current: updateCurrent ? next : current
      }, _this.update);
    }, _this.setPage = function (selected) {
      return function () {
        var current = _this.state.current;
        var _this$props3 = _this.props,
            total = _this$props3.total,
            max = _this$props3.max;

        // update current

        var next = current;
        if (selected === 1) {
          next = 1;
        }

        if (selected === total && total > max) {
          next = total - max + 1;
        }

        _this.setState({
          selected: selected,
          current: next
        }, _this.update);
      };
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Pagination, [{
    key: 'update',
    value: function update() {
      this.props.onChange(this.state.selected);
    }
  }, {
    key: 'getPages',
    value: function getPages() {
      var _this2 = this;

      var _props = this.props,
          total = _props.total,
          max = _props.max;
      var _state = this.state,
          current = _state.current,
          selected = _state.selected;


      var pageRange = fp.range(current, current + max);

      // show all
      if (total <= max) {
        pageRange = fp.range(1, total + 1);
      }

      return pageRange.map(function (page) {
        return React__default.createElement(
          Button$1,
          {
            key: 'page-' + page,
            onClick: _this2.setPage(page),
            selected: page === selected
          },
          page
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          max = _props2.max,
          total = _props2.total;
      var selected = this.state.selected;

      var noControlls = total <= max;

      return React__default.createElement(
        Container$o,
        null,
        !noControlls && React__default.createElement(
          React.Fragment,
          null,
          React__default.createElement(
            Button$1,
            { filled: true, onClick: this.setPage(1) },
            React__default.createElement(DoubleArrow, { rotate: 90 })
          ),
          React__default.createElement(
            Button$1,
            { filled: true, onClick: this.prev },
            React__default.createElement(Arrow$1, { rotate: 90 })
          )
        ),
        this.getPages(),
        !noControlls && React__default.createElement(
          React.Fragment,
          null,
          React__default.createElement(
            Button$1,
            { filled: true, onClick: this.next },
            React__default.createElement(Arrow$1, { rotate: -90 })
          ),
          React__default.createElement(
            Button$1,
            { filled: true, onClick: this.setPage(total) },
            React__default.createElement(DoubleArrow, { rotate: -90 })
          )
        ),
        React__default.createElement(Divider$2, null),
        React__default.createElement(
          Info,
          null,
          selected,
          ' out of ',
          total
        )
      );
    }
  }]);
  return Pagination;
}(React__default.Component);

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};


var Container$o = styled__default.div(_templateObject$B);

var Button$1 = styled__default.div(_templateObject2$x, function (_ref2) {
  var theme = _ref2.theme,
      filled = _ref2.filled;
  return filled ? hexToRgba(theme.p300, 15) : 'transparent';
}, function (_ref3) {
  var filled = _ref3.filled;
  return filled ? 'all 300ms' : 'none';
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.text.smLink;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.p300;
}, function (_ref6) {
  var selected = _ref6.selected,
      theme = _ref6.theme;
  return selected && styled.css(_templateObject3$s, theme.p600);
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.p400;
}, function (_ref8) {
  var filled = _ref8.filled,
      theme = _ref8.theme;
  return filled && styled.css(_templateObject4$o, hexToRgba(theme.p300, 30));
});

var Divider$2 = styled__default.div(_templateObject5$l, function (_ref9) {
  var theme = _ref9.theme;
  return theme.p200;
});

var Info = styled__default.div(_templateObject6$k, function (_ref10) {
  var theme = _ref10.theme;
  return theme.text.smNote;
});

var Arrow$1 = styled__default(ArrowDownIcon)(_templateObject7$e, function (_ref11) {
  var rotate = _ref11.rotate;
  return rotate + 'deg';
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.p400;
});

var DoubleArrow = styled__default(DoubleArrowDownIcon)(_templateObject8$d, function (_ref13) {
  var rotate = _ref13.rotate;
  return rotate + 'deg';
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.p400;
});

var ArrowDate = function ArrowDate(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { className: className, width: "100px", height: "72px", viewBox: "0 0 100 72" },
    React__default.createElement(
      "g",
      { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
      React__default.createElement(
        "g",
        { id: "arrow_2094738", fill: "#000000", fillRule: "nonzero" },
        React__default.createElement("path", {
          d: "M67.34,1.9 C66.4786101,0.867072347 65.1074566,0.40963437 63.7984311,0.718477958 C62.4894056,1.02732155 61.4673215,2.04940558 61.158478,3.35843107 C60.8496344,4.66745656 61.3070723,6.0386101 62.34,6.9 L87.85,32.44 L3.53,32.44 C1.63981935,32.540285 0.158613361,34.1021609 0.158613361,35.995 C0.158613361,37.8878391 1.63981935,39.449715 3.53,39.55 L87.85,39.55 L62.3,65.06 C60.9641212,66.4589808 60.9641212,68.6610192 62.3,70.06 C62.962319,70.7244005 63.8618665,71.0978323 64.8,71.0978323 C65.7381335,71.0978323 66.637681,70.7244005 67.3,70.06 L98.9,38.46 C99.5795764,37.8058591 99.9635711,36.9032521 99.9635711,35.96 C99.9635711,35.0167479 99.5795764,34.1141409 98.9,33.46 L67.34,1.9 Z",
          id: "Path"
        })
      )
    )
  );
};

var CalendarIcon = function CalendarIcon(_ref) {
  var className = _ref.className;
  return React__default.createElement(
    "svg",
    { className: className, width: "16", height: "16", viewBox: "0 0 16 16" },
    React__default.createElement(
      "g",
      { fill: "#67696F", fillRule: "nonzero" },
      React__default.createElement("path", { d: "M0 7h16V6H0zM6 3h4V2H6z" }),
      React__default.createElement("path", { d: "M3 2v1h-.994C1.446 3 1 3.447 1 4.006v9.988A1 1 0 0 0 1.994 15h12.012c.547 0 .994-.45.994-1.006V4.006C15 3.449 14.552 3 13.999 3H13V2h.999C15.104 2 16 2.897 16 4.006v9.988A2.001 2.001 0 0 1 14.006 16H1.994A2 2 0 0 1 0 13.994V4.006C0 2.898.89 2 2.006 2H3zm3 0h4.034H6z" }),
      React__default.createElement("path", { d: "M11 1.749V3.25c0 .415.335.749.75.749.418 0 .75-.332.75-.749V1.75A.748.748 0 0 0 11.75 1a.745.745 0 0 0-.75.749zm-1 0C10 .783 10.777 0 11.75 0c.966 0 1.75.781 1.75 1.749V3.25C13.5 4.217 12.723 5 11.75 5 10.784 5 10 4.219 10 3.251V1.75zM3.5 1.749V3.25c0 .415.335.749.75.749.418 0 .75-.332.75-.749V1.75A.748.748 0 0 0 4.25 1a.745.745 0 0 0-.75.749zm-1 0C2.5.783 3.277 0 4.25 0 5.216 0 6 .781 6 1.749V3.25C6 4.217 5.223 5 4.25 5 3.284 5 2.5 4.219 2.5 3.251V1.75z" })
    )
  );
};

var _templateObject$C = taggedTemplateLiteral(['\n  min-width: 210px;\n  padding: 4px 8px;\n  box-sizing: border-box;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 300ms;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  ', ';\n  line-height: 14px;\n  font-weight: 600;\n\n  &:hover {\n    background: ', ';\n  }\n'], ['\n  min-width: 210px;\n  padding: 4px 8px;\n  box-sizing: border-box;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 300ms;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  ', ';\n  line-height: 14px;\n  font-weight: 600;\n\n  &:hover {\n    background: ', ';\n  }\n']),
    _templateObject2$y = taggedTemplateLiteral(['\n  width: 14px;\n  height: 14px;\n  cursor: pointer;\n  margin-right: 10px;\n\n  path {\n    fill: ', ';\n  }\n'], ['\n  width: 14px;\n  height: 14px;\n  cursor: pointer;\n  margin-right: 10px;\n\n  path {\n    fill: ', ';\n  }\n']),
    _templateObject3$t = taggedTemplateLiteral(['\n  width: 8px;\n  height: 8px;\n  transform: rotate(', ');\n  transition: all 300ms;\n  margin-left: 10px;\n\n  * {\n    fill: ', ';\n  }\n'], ['\n  width: 8px;\n  height: 8px;\n  transform: rotate(', ');\n  transition: all 300ms;\n  margin-left: 10px;\n\n  * {\n    fill: ', ';\n  }\n']);

var DatepickerHeader = function DatepickerHeader(_ref) {
  var open = _ref.open,
      selection = _ref.selection,
      onClick = _ref.onClick;
  return React__default.createElement(
    Container$p,
    { onClick: onClick },
    React__default.createElement(StyledCalendar, null),
    (selection[0] || 'start date') + ' - ' + (selection[1] || 'end date'),
    React__default.createElement(Arrow$2, { rotation: open ? '180deg' : '0deg' })
  );
};

DatepickerHeader.propTypes = {
  onClick: PropTypes.func,
  selection: PropTypes.arrayOf(PropTypes.string),
  open: PropTypes.bool
};

var Container$p = styled__default.div(_templateObject$C, function (_ref2) {
  var theme = _ref2.theme;
  return theme.text.p;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p50;
});

var StyledCalendar = styled__default(CalendarIcon)(_templateObject2$y, function (_ref4) {
  var theme = _ref4.theme;
  return theme.p600;
});

var Arrow$2 = styled__default(ArrowDownIcon)(_templateObject3$t, function (_ref5) {
  var rotation = _ref5.rotation;
  return rotation;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.p600;
});

var _templateObject$D = taggedTemplateLiteral(['\n  width: 200px;\n  cursor: pointer;\n  border-radius: 2px;\n  height: 30px;\n  background: ', ';\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  ', ';\n  transition: all 300ms;\n  line-height: 12px;\n  font-weight: 600;\n\n  &:hover {\n    background: ', ';\n  }\n'], ['\n  width: 200px;\n  cursor: pointer;\n  border-radius: 2px;\n  height: 30px;\n  background: ', ';\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  ', ';\n  transition: all 300ms;\n  line-height: 12px;\n  font-weight: 600;\n\n  &:hover {\n    background: ', ';\n  }\n']),
    _templateObject2$z = taggedTemplateLiteral(['\n  width: 100px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2;\n'], ['\n  width: 100px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2;\n']),
    _templateObject3$u = taggedTemplateLiteral(['\n  width: 8px;\n  height: 8px;\n  transform: rotate(', ');\n  transition: all 300ms;\n  margin-left: 10px;\n\n  * {\n    fill: ', ';\n  }\n'], ['\n  width: 8px;\n  height: 8px;\n  transform: rotate(', ');\n  transition: all 300ms;\n  margin-left: 10px;\n\n  * {\n    fill: ', ';\n  }\n']);

var TODAY = moment().startOf('day');
var FORMAT = 'YYYY-MM-DD';

var THIS_WEEK = [TODAY.clone().startOf('week').format(FORMAT), TODAY.clone().endOf('week').format(FORMAT)];
var THIS_MONTH = [TODAY.clone().startOf('month').format(FORMAT), TODAY.clone().endOf('month').format(FORMAT)];
var THIS_QUARTER = [TODAY.clone().startOf('quarter').format(FORMAT), TODAY.clone().endOf('quarter').format(FORMAT)];
var THIS_YEAR = [TODAY.clone().startOf('year').format(FORMAT), TODAY.clone().endOf('year').format(FORMAT)];

var LAST_7_DAYS = [TODAY.clone().subtract(6, 'days').format(FORMAT), TODAY.format(FORMAT)];
var LAST_14_DAYS = [TODAY.clone().subtract(13, 'days').format(FORMAT), TODAY.format(FORMAT)];
var LAST_30_days = [TODAY.clone().subtract(29, 'days').format(FORMAT), TODAY.format(FORMAT)];
var LAST_90_DAYS = [TODAY.clone().subtract(89, 'days').format(FORMAT), TODAY.format(FORMAT)];

var YESTERDAY_TO_DATE = [TODAY.clone().subtract(1, 'days').format(FORMAT), TODAY.format(FORMAT)];
var WEEK_TO_DATE = [TODAY.clone().startOf('week').format(FORMAT), TODAY.format(FORMAT)];
var MONTH_TO_DATE = [TODAY.clone().startOf('month').format(FORMAT), TODAY.format(FORMAT)];
var QUARTER_TO_DATE = [TODAY.clone().startOf('quarter').format(FORMAT), TODAY.format(FORMAT)];
var YEAR_TO_DATE = [TODAY.clone().startOf('year').format(FORMAT), TODAY.format(FORMAT)];

var PREV_WEEK = [TODAY.clone().subtract(1, 'week').startOf('week').format(FORMAT), TODAY.clone().subtract(1, 'week').endOf('week').format(FORMAT)];
var PREV_MONTH = [TODAY.clone().subtract(1, 'month').startOf('month').format(FORMAT), TODAY.clone().subtract(1, 'month').endOf('month').format(FORMAT)];
var PREV_QUARTER = [TODAY.clone().subtract(1, 'quarter').startOf('quarter').format(FORMAT), TODAY.clone().subtract(1, 'quarter').endOf('quarter').format(FORMAT)];
var PREV_YEAR = [TODAY.clone().subtract(1, 'year').startOf('year').format(FORMAT), TODAY.clone().subtract(1, 'year').endOf('year').format(FORMAT)];

var CustomHeader = function CustomHeader(_ref) {
  var open = _ref.open,
      toggleOpen = _ref.toggleOpen,
      placeholder = _ref.placeholder;
  return React__default.createElement(
    Header$3,
    { onClick: toggleOpen },
    placeholder,
    React__default.createElement(Arrow$3, { rotation: open ? '180deg' : '0deg' })
  );
};

var DatepickerPresets = function DatepickerPresets(_ref2) {
  var onChange = _ref2.onChange;
  return React__default.createElement(
    Container$q,
    null,
    React__default.createElement(Select, {
      placeholder: 'Presets',
      options: [{ value: 'this-week', label: 'This week', selection: THIS_WEEK }, { value: 'this-month', label: 'This month', selection: THIS_MONTH }, {
        value: 'this-quarter',
        label: 'This quarter',
        selection: THIS_QUARTER
      }, { value: 'this-year', label: 'This year', selection: THIS_YEAR }, { value: 'last-7', label: 'Last 7 days', selection: LAST_7_DAYS }, { value: 'last-14', label: 'Last 14 days', selection: LAST_14_DAYS }, { value: 'last-30', label: 'Last 30 days', selection: LAST_30_days }, { value: 'last-90', label: 'Last 90 days', selection: LAST_90_DAYS }, {
        value: 'yesterday-to-date',
        label: 'Yesterday',
        selection: YESTERDAY_TO_DATE
      }, {
        value: 'week-to-date',
        label: 'Week to date',
        selection: WEEK_TO_DATE
      }, {
        value: 'month-to-date',
        label: 'Month to date',
        selection: MONTH_TO_DATE
      }, {
        value: 'quarter-to-date',
        label: 'Quarter to date',
        selection: QUARTER_TO_DATE
      }, {
        value: 'year-to-date',
        label: 'Year to date',
        selection: YEAR_TO_DATE
      }, { value: 'prev-week', label: 'Previous week', selection: PREV_WEEK }, { value: 'prev-month', label: 'Previous month', selection: PREV_MONTH }, {
        value: 'prev-quarter',
        label: 'Previous quarter',
        selection: PREV_QUARTER
      }, { value: 'prev-year', label: 'Previous year', selection: PREV_YEAR }],
      values: [],
      headerRenderer: CustomHeader,
      onChange: onChange
    })
  );
};

DatepickerPresets.propTypes = {
  onChange: PropTypes.func
};

var Header$3 = styled__default.div(_templateObject$D, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p50;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.text.smLink;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.p100;
});

var Container$q = styled__default.div(_templateObject2$z);

var Arrow$3 = styled__default(ArrowDownIcon)(_templateObject3$u, function (_ref6) {
  var rotation = _ref6.rotation;
  return rotation;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.p600;
});

var _templateObject$E = taggedTemplateLiteral(['\n  user-select: none;\n  width: ', 'px;\n  padding: 0 20px;\n  min-height: 250px;\n  background: ', ';\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.13);\n  position: absolute;\n  top: 45px;\n  left: 0;\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n  transition: all 300ms;\n  border-radius: 4px;\n  z-index: 2;\n\n  ', '\n'], ['\n  user-select: none;\n  width: ', 'px;\n  padding: 0 20px;\n  min-height: 250px;\n  background: ', ';\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.13);\n  position: absolute;\n  top: 45px;\n  left: 0;\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n  transition: all 300ms;\n  border-radius: 4px;\n  z-index: 2;\n\n  ', '\n']),
    _templateObject2$A = taggedTemplateLiteral(['\n      opacity: 1;\n      visibility: visible;\n      pointer-events: all;\n    '], ['\n      opacity: 1;\n      visibility: visible;\n      pointer-events: all;\n    ']),
    _templateObject3$v = taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 60px;\n  box-sizing: border-box;\n  width: 100%;\n  padding: 0 10px;\n  margin-bottom: -50px;\n  pointer-events: none;\n  z-index: 1;\n'], ['\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 60px;\n  box-sizing: border-box;\n  width: 100%;\n  padding: 0 10px;\n  margin-bottom: -50px;\n  pointer-events: none;\n  z-index: 1;\n']),
    _templateObject4$p = taggedTemplateLiteral(['\n  display: flex;\n  justify-content: center;\n  font-size: 14px;\n  align-items: center;\n  font-weight: 300;\n  ', ';\n  width: 100%;\n  height: 20px;\n  margin-top: -30px;\n  margin-bottom: 20px;\n  cursor: pointer;\n  transition: all 300ms;\n\n  &:hover {\n    color: ', ';\n  }\n'], ['\n  display: flex;\n  justify-content: center;\n  font-size: 14px;\n  align-items: center;\n  font-weight: 300;\n  ', ';\n  width: 100%;\n  height: 20px;\n  margin-top: -30px;\n  margin-bottom: 20px;\n  cursor: pointer;\n  transition: all 300ms;\n\n  &:hover {\n    color: ', ';\n  }\n']),
    _templateObject5$m = taggedTemplateLiteral(['\n  display: flex;\n  width: 100%;\n  flex-wrap: wrap;\n  box-sizing: border-box;\n  padding: 0 8px;\n  margin-top: 40px;\n  align-items: flex-start;\n  height: 100%;\n'], ['\n  display: flex;\n  width: 100%;\n  flex-wrap: wrap;\n  box-sizing: border-box;\n  padding: 0 8px;\n  margin-top: 40px;\n  align-items: flex-start;\n  height: 100%;\n']),
    _templateObject6$l = taggedTemplateLiteral(['\n  box-sizing: border-box;\n  width: 26px;\n  height: 26px;\n  margin: 2px 0;\n\n  ', '\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  box-sizing: border-box;\n  width: 26px;\n  height: 26px;\n  margin: 2px 0;\n\n  ', '\n\n  ', ';\n\n  ', ';\n\n  ', ';\n\n  ', ';\n']),
    _templateObject7$f = taggedTemplateLiteral(['\n      background: ', ';\n      border-bottom-left-radius: ', ';\n      border-top-left-radius: ', ';\n      border-bottom-right-radius: ', ';\n      border-top-right-radius: ', ';\n    '], ['\n      background: ', ';\n      border-bottom-left-radius: ', ';\n      border-top-left-radius: ', ';\n      border-bottom-right-radius: ', ';\n      border-top-right-radius: ', ';\n    ']),
    _templateObject8$e = taggedTemplateLiteral(['\n      border-radius: 13px;\n      &:hover {\n        background: ', ';\n      }\n    '], ['\n      border-radius: 13px;\n      &:hover {\n        background: ', ';\n      }\n    ']),
    _templateObject9$7 = taggedTemplateLiteral(['\n      background: ', ';\n    '], ['\n      background: ', ';\n    ']),
    _templateObject10$5 = taggedTemplateLiteral(['\n      pointer-events: none;\n    '], ['\n      pointer-events: none;\n    ']),
    _templateObject11$2 = taggedTemplateLiteral(['\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: ', ';\n  ', ';\n  box-sizing: border-box;\n  border-radius: 50%;\n\n  ', ';\n\n  ', ';\n'], ['\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: ', ';\n  ', ';\n  box-sizing: border-box;\n  border-radius: 50%;\n\n  ', ';\n\n  ', ';\n']),
    _templateObject12$2 = taggedTemplateLiteral(['\n        color: ', ';\n      '], ['\n        color: ', ';\n      ']),
    _templateObject13$1 = taggedTemplateLiteral(['\n      border: 1px solid ', ';\n      border-radius: 2px;\n    '], ['\n      border: 1px solid ', ';\n      border-radius: 2px;\n    ']),
    _templateObject14 = taggedTemplateLiteral(['\n  display: flex;\n'], ['\n  display: flex;\n']),
    _templateObject15 = taggedTemplateLiteral(['\n  width: 100%;\n  height: 1px;\n  background: ', ';\n  margin-top: ', ';\n'], ['\n  width: 100%;\n  height: 1px;\n  background: ', ';\n  margin-top: ', ';\n']),
    _templateObject16 = taggedTemplateLiteral(['\n  width: 100%;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n'], ['\n  width: 100%;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n']),
    _templateObject17 = taggedTemplateLiteral(['\n  margin-left: 20px;\n  ', ';\n  line-height: 14px;\n  cursor: pointer;\n\n  &:hover {\n    color: ', ';\n  }\n\n  ', ';\n'], ['\n  margin-left: 20px;\n  ', ';\n  line-height: 14px;\n  cursor: pointer;\n\n  &:hover {\n    color: ', ';\n  }\n\n  ', ';\n']),
    _templateObject18 = taggedTemplateLiteral(['\n      color: ', ';\n\n      &:hover {\n        color: ', ';\n      }\n    '], ['\n      color: ', ';\n\n      &:hover {\n        color: ', ';\n      }\n    ']),
    _templateObject19 = taggedTemplateLiteral(['\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  pointer-events: all;\n\n  &:hover {\n    path {\n      fill: ', ';\n    }\n  }\n'], ['\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  pointer-events: all;\n\n  &:hover {\n    path {\n      fill: ', ';\n    }\n  }\n']),
    _templateObject20 = taggedTemplateLiteral(['\n  width: 14px;\n  height: 14px;\n  transform: rotate(', ');\n\n  path {\n    fill: ', ';\n  }\n'], ['\n  width: 14px;\n  height: 14px;\n  transform: rotate(', ');\n\n  path {\n    fill: ', ';\n  }\n']);

var DATE_FORMAT = 'YYYY-MM-DD';
var TITLES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

var Datepicker = function (_Component) {
  inherits(Datepicker, _Component);

  function Datepicker() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Datepicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      today: moment(),
      offset: 0,
      open: false,

      selection: [],
      committedSelection: [],
      tmpStart: null,
      selecting: false,
      hoveredDate: null
    }, _this.datesRenderer = function () {
      var globalOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var _this$state = _this.state,
          offset = _this$state.offset,
          today = _this$state.today,
          selection = _this$state.selection,
          selecting = _this$state.selecting,
          hoveredDate = _this$state.hoveredDate;

      var dates = [];
      var monthStart = today.clone().startOf('month');
      var thisMonth = monthStart.add(globalOffset + offset, 'month');
      var total = thisMonth.daysInMonth();
      var label = thisMonth.format('MMMM YYYY');

      for (var i = 0; i < TITLES.length; i++) {
        dates.push(React__default.createElement(
          DateContainer,
          { key: 'date-' + TITLES[i] + '-' + i, type: 'title' },
          React__default.createElement(
            DateIcon,
            { type: 'title' },
            TITLES[i]
          )
        ));
      }

      // previews disabled dates
      for (var _i = monthStart.day(); _i > 0; _i--) {
        dates.push(React__default.createElement(DateContainer, { key: 'date-placeholder-' + _i, disabled: true }));
      }

      var _loop = function _loop(_i2) {
        var current = thisMonth.clone().set('date', _i2);
        var selected = current.isBetween(selection[0], selection[1], null, '[]');

        // check selected while selecting
        if (selecting && current.isBetween(selection[0], hoveredDate, null, '[]')) {
          selected = true;
        }

        var isStart = current.format(DATE_FORMAT) === selection[0];
        var isEnd = current.format(DATE_FORMAT) === selection[1];

        dates.push(React__default.createElement(
          DateContainer,
          {
            key: 'date-' + _i2,
            onClick: function onClick() {
              return _this.handleClick(current.format(DATE_FORMAT));
            },
            onMouseEnter: function onMouseEnter() {
              return _this.setHover(current.format(DATE_FORMAT));
            },
            selected: selected,
            sameDay: selection[0] === selection[1] || !selection[1],
            isStart: isStart,
            isEnd: isEnd
          },
          React__default.createElement(
            DateIcon,
            {
              today: current.format(DATE_FORMAT) === today.format(DATE_FORMAT),
              type: isStart || isEnd ? 'edge' : 'normal'
            },
            _i2
          )
        ));
      };

      for (var _i2 = 1; _i2 <= total; _i2++) {
        _loop(_i2);
      }

      return React__default.createElement(
        DatesContainer,
        { key: 'month-' + globalOffset },
        React__default.createElement(
          MonthTitle,
          {
            onClick: _this.selectMonth([today.clone().add(globalOffset + offset, 'month').startOf('month').format(DATE_FORMAT), today.clone().add(globalOffset + offset, 'month').endOf('month').format(DATE_FORMAT)])
          },
          label
        ),
        dates
      );
    }, _this.setHover = function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var _this$state2 = _this.state,
          selecting = _this$state2.selecting,
          tmpStart = _this$state2.tmpStart;


      var extra = {};

      if (selecting) {
        if (moment(date).isBefore(tmpStart)) {
          extra = { selection: [date, tmpStart] };
        } else {
          extra = { selection: [tmpStart, date] };
        }
      }

      _this.setState(_extends({ hoveredDate: date }, extra));
    }, _this.toggleOpen = function () {
      return _this.setState(function (prevState) {
        return { open: !prevState.open };
      }, function () {
        if (!_this.state.open) {
          setTimeout(function () {
            _this.setState({
              offset: 0,
              selecting: false,
              hoveredDate: null
            });
          }, 300);
        } else {
          _this.setOffset();
        }
      });
    }, _this.handleClickOut = function () {
      var open = _this.state.open;


      if (open) {
        _this.cancel();
      }
    }, _this.setOffset = function () {
      var _this$state3 = _this.state,
          today = _this$state3.today,
          selection = _this$state3.selection;


      if (selection[0]) {
        var selectionMonthStart = moment(selection[0]).startOf('month');
        var offset = selectionMonthStart.diff(today.startOf('month'), 'months');

        _this.setState({ offset: offset });
      }
    }, _this.next = function () {
      return _this.setState(function (prevState) {
        return { offset: prevState.offset + 1 };
      });
    }, _this.prev = function () {
      return _this.setState(function (prevState) {
        return { offset: prevState.offset - 1 };
      });
    }, _this.apply = function () {
      return _this.setState({ committedSelection: _this.state.selection }, _this.toggleOpen);
    }, _this.cancel = function () {
      _this.setState({ open: false, selecting: false }, function () {
        setTimeout(function () {
          _this.setState({ selection: _this.state.committedSelection });
        }, 300);
      });
    }, _this.handleClick = function (date) {
      var _this$state4 = _this.state,
          selecting = _this$state4.selecting,
          tmpStart = _this$state4.tmpStart;


      if (selecting) {
        if (moment(date).isBefore(tmpStart)) {
          _this.setState({
            selecting: false,
            selection: [date, tmpStart],
            tmpStart: null
          });
          return;
        }

        _this.setState({
          selecting: false,
          selection: [tmpStart, date],
          tmpStart: null
        });
      } else {
        _this.setState({
          selecting: true,
          selection: [date, null],
          tmpStart: date
        });
      }
    }, _this.selectMonth = function (selection) {
      return function () {
        return _this.setState({ selection: selection, selecting: false });
      };
    }, _this.setPreset = function (preset) {
      _this.setState({ selection: preset[0].selection }, _this.setOffset);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Datepicker, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          open = _state.open,
          committedSelection = _state.committedSelection;
      var _props = this.props,
          className = _props.className,
          months = _props.months;

      var monthsElement = [];

      for (var i = 0; i < months; i++) {
        monthsElement.push(this.datesRenderer(i));
      }

      return React__default.createElement(
        ClickOut,
        { onClick: this.handleClickOut },
        React__default.createElement(DatepickerHeader, {
          onClick: this.toggleOpen,
          selection: committedSelection,
          open: open
        }),
        React__default.createElement(
          Container$r,
          { visible: open, className: className, total: months },
          React__default.createElement(DatepickerPresets, { onChange: this.setPreset }),
          React__default.createElement(Divider$3, { margin: '0' }),
          React__default.createElement(
            Header$4,
            null,
            React__default.createElement(
              ArrowHolder,
              { onClick: this.prev },
              React__default.createElement(StyledArrow$1, { rotation: '-180deg' })
            ),
            React__default.createElement(
              ArrowHolder,
              { onClick: this.next },
              React__default.createElement(StyledArrow$1, { rotation: '0deg' })
            )
          ),
          React__default.createElement(
            Dates,
            null,
            monthsElement
          ),
          React__default.createElement(Divider$3, null),
          React__default.createElement(
            Buttons,
            null,
            React__default.createElement(
              InlineButton,
              { onClick: this.cancel },
              'Cancel'
            ),
            React__default.createElement(
              InlineButton,
              { primary: true, onClick: this.apply },
              'Apply'
            )
          )
        )
      );
    }
  }]);
  return Datepicker;
}(React.Component);

Datepicker.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  months: PropTypes.number
};
Datepicker.defaultProps = {
  months: 1
};

var Container$r = styled__default.div(_templateObject$E, function (_ref2) {
  var total = _ref2.total;
  return total * (182 + 20) + 32 + 20;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.p0;
}, function (_ref4) {
  var visible = _ref4.visible;
  return visible && styled.css(_templateObject2$A);
});

var Header$4 = styled__default.div(_templateObject3$v);

var MonthTitle = styled__default.div(_templateObject4$p, function (_ref5) {
  var theme = _ref5.theme;
  return theme.text.pBold;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.a500;
});

var DatesContainer = styled__default.div(_templateObject5$m);

var DateContainer = styled__default.div(_templateObject6$l, function (_ref7) {
  var selected = _ref7.selected,
      isStart = _ref7.isStart,
      isEnd = _ref7.isEnd,
      theme = _ref7.theme,
      sameDay = _ref7.sameDay;
  return selected && styled.css(_templateObject7$f, theme.a100, isStart || sameDay ? '50%' : 0, isStart || sameDay ? '50%' : 0, isEnd || sameDay ? '50%' : 0, isEnd || sameDay ? '50%' : 0);
}, function (_ref8) {
  var theme = _ref8.theme,
      selected = _ref8.selected;
  return !selected && styled.css(_templateObject8$e, theme.a100);
}, function (_ref9) {
  var isStart = _ref9.isStart,
      isEnd = _ref9.isEnd,
      theme = _ref9.theme;
  return (isStart || isEnd) && styled.css(_templateObject9$7, theme.a400);
}, function (_ref10) {
  var type = _ref10.type;
  return type === 'title' && styled.css(_templateObject10$5);
}, function (_ref11) {
  var disabled = _ref11.disabled;
  return disabled && styled.css(_templateObject10$5);
});

var DateIcon = styled__default.div(_templateObject11$2, function (_ref12) {
  var theme = _ref12.theme;
  return theme.p600;
}, function (_ref13) {
  var theme = _ref13.theme;
  return theme.text.sm;
}, function (_ref14) {
  var type = _ref14.type,
      theme = _ref14.theme;

  if (type === 'title') {
    return styled.css(_templateObject12$2, theme.p300);
  }

  if (type === 'edge') {
    return styled.css(_templateObject12$2, theme.p0);
  }
}, function (_ref15) {
  var today = _ref15.today,
      theme = _ref15.theme;
  return today && styled.css(_templateObject13$1, theme.p600);
});

var Dates = styled__default.div(_templateObject14);

var Divider$3 = styled__default.div(_templateObject15, function (_ref16) {
  var theme = _ref16.theme;
  return theme.p100;
}, function (_ref17) {
  var margin = _ref17.margin;
  return margin || '20px';
});

var Buttons = styled__default.div(_templateObject16);

var InlineButton = styled__default.div(_templateObject17, function (_ref18) {
  var theme = _ref18.theme;
  return theme.text.pLink;
}, function (_ref19) {
  var theme = _ref19.theme;
  return theme.p600;
}, function (_ref20) {
  var primary = _ref20.primary,
      theme = _ref20.theme;
  return primary && styled.css(_templateObject18, theme.a400, theme.a500);
});

var ArrowHolder = styled__default.div(_templateObject19, function (_ref21) {
  var theme = _ref21.theme;
  return theme.a400;
});

var StyledArrow$1 = styled__default(ArrowDate)(_templateObject20, function (_ref22) {
  var rotation = _ref22.rotation;
  return rotation;
}, function (_ref23) {
  var theme = _ref23.theme;
  return theme.p600;
});

var AppTheme = function AppTheme(_ref) {
  var Provider = _ref.provider,
      theme = _ref.theme,
      children = _ref.children;
  return React__default.createElement(
    Provider,
    { theme: theme },
    React__default.createElement(
      styled.ThemeProvider,
      { theme: theme },
      children
    )
  );
};

// DEFAULT COMPONENTS HEIGHTS
var SMALL = '24px';
var MEDIUM = '30px';
var LARGE = '34px';
var size = {
  SMALL: SMALL,
  MEDIUM: MEDIUM,
  LARGE: LARGE

  // LIGHT THEME
};var lightTheme$1 = _extends({}, lightTheme, {
  darkTheme: darkTheme,
  lightTheme: lightTheme,
  text: typography,
  animation: animation,
  size: size

  // DARK THEME
});var darkTheme$1 = _extends({}, darkTheme, {
  lightTheme: lightTheme,
  darkTheme: darkTheme,
  text: typography,
  animation: animation,
  size: size

  // COLORS
});var lightPrimary$1 = lightPrimary;
var lightAccent$1 = lightAccent;
var darkPrimary$1 = darkPrimary;
var darkAccent$1 = darkAccent;

var reds$1 = reds;
var greens$1 = greens;
var yellows$1 = yellows;
var oranges$1 = oranges;

// GRID LAYOUT
var Container$s = Container;
var Row$1 = Row;
var Col$1 = Col;

exports.AppTheme = AppTheme;
exports.lightTheme = lightTheme$1;
exports.darkTheme = darkTheme$1;
exports.lightPrimary = lightPrimary$1;
exports.lightAccent = lightAccent$1;
exports.darkPrimary = darkPrimary$1;
exports.darkAccent = darkAccent$1;
exports.reds = reds$1;
exports.greens = greens$1;
exports.yellows = yellows$1;
exports.oranges = oranges$1;
exports.Container = Container$s;
exports.Row = Row$1;
exports.Col = Col$1;
exports.hexToRgba = hexToRgba;
exports.shadeColor = shadeColor;
exports.Button = Button;
exports.SegmentedButton = SegmentedButton;
exports.Card = Card;
exports.Carousel = Carousel;
exports.Checkbox = Checkbox;
exports.ClickOut = ClickOut;
exports.Collapse = Collapse;
exports.Draggable = Draggable;
exports.LinearProgress = LinearProgress;
exports.Modal = Modal;
exports.Select = Select;
exports.Progress = Progress;
exports.RadialProgress = RadialProgress;
exports.Range = Range;
exports.Spinner = Spinner;
exports.Stepper = Stepper;
exports.Tabs = Tabs;
exports.Tag = Tag;
exports.TagGroup = TagGroup;
exports.TextInput = TextInput;
exports.withToast = withToast;
exports.ToastsProvider = Toasts;
exports.Toggle = Toggle;
exports.Tooltip = Tooltip;
exports.Widget = Widget;
exports.Pagination = Pagination;
exports.Datepicker = Datepicker;
//# sourceMappingURL=index.js.map
