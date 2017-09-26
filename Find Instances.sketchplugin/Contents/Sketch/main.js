var that = this;
function run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createSelect = __webpack_require__(1);

var _createSelect2 = _interopRequireDefault(_createSelect);

var _selectAllSymbols = __webpack_require__(2);

var _selectAllSymbols2 = _interopRequireDefault(_selectAllSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function showMessage(txt) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

  NSApplication.sharedApplication().orderedDocuments().firstObject().displayMessage_timeout(txt, timeout);
}

var onRun = function onRun(context) {
  var doc = context.document;

  var pagesWithSymbolNames = [];
  var pagesWithSymbol = [];
  var selectedLayer = context.selection.firstObject();
  if (!selectedLayer) {
    showMessage('No symbol selected');
    return;
  }
  var selectedLayerName = selectedLayer.name();
  var masterSymbol = selectedLayer;
  if (selectedLayer.isKindOfClass(MSSymbolInstance)) {
    masterSymbol = selectedLayer.symbolMaster();
  }
  if (selectedLayer.isKindOfClass(MSSymbolMaster) || selectedLayer.isKindOfClass(MSSymbolInstance)) {
    var pages = doc.pages();
    pages.forEach(function (page) {
      var artboards = page.artboards();
      artboards.forEach(function (artboard) {
        var layers = artboard.layers();
        layers.forEach(function (layer) {
          var layerName = layer.name();
          if (layer instanceof MSSymbolInstance && layer.isInstanceForMaster(masterSymbol)) {
            pagesWithSymbolNames.push(page.name());
            pagesWithSymbol.push(page);
          }
        });
      });
    });
  }

  var alert = COSAlertWindow['new']();
  alert.setMessageText('Pages with this symbol');
  var choosePropertySelect = (0, _createSelect2['default'])(pagesWithSymbolNames, 0);
  alert.addAccessoryView(choosePropertySelect);
  alert.addButtonWithTitle('Go');
  alert.addButtonWithTitle('Cancel');
  if (alert.runModal() === 1000) {
    var uniquePages = pagesWithSymbol.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    var index = choosePropertySelect.indexOfSelectedItem();
    var page = uniquePages[index];
    doc.setCurrentPage(page);
    (0, _selectAllSymbols2['default'])(doc.currentPage(), masterSymbol);
  }
};

exports['default'] = onRun;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createSelect = function createSelect(options) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var select = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
  select.addItemsWithTitles(options);

  select.selectItemAtIndex(index);

  return select;
};

exports["default"] = createSelect;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {Object.defineProperty(exports, "__esModule", {
  value: true
});
var selectAllSymbols = function selectAllSymbols(page, masterSymbol) {
  var layersToSelect = [];
  var artboards = page.artboards();

  artboards.forEach(function (artboard) {
    var layers = artboard.layers();

    layers.forEach(function (layer) {
      if (layer instanceof MSSymbolInstance && layer.isInstanceForMaster(masterSymbol)) {
        layersToSelect.push(layer);
      } else if (layer instanceof MSSymbolMaster && layer.name().isEqualToString(masterSymbol.name())) {
        layersToSelect.push(layer);
      }
    });
  });

  console.log(layersToSelect);

  page.changeSelectionBySelectingLayers(layersToSelect);
};

exports["default"] = selectAllSymbols;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* globals log */

var console = {
  log: log,
  warn: log,
  error: log,
  dump: function (obj) {
    log('###############################################')
    log('## Dumping object ' + obj)
    if (obj.className) {
      log('## obj class is: ' + obj.className())
    }
    log('###############################################')

    if (obj.class && obj.class().mocha) {
      log('obj.properties:')
      log(obj.class().mocha().properties())
      log('obj.propertiesWithAncestors:')
      log(obj.class().mocha().propertiesWithAncestors())

      log('obj.classMethods:')
      log(obj.class().mocha().classMethods())
      log('obj.classMethodsWithAncestors:')
      log(obj.class().mocha().classMethodsWithAncestors())

      log('obj.instanceMethods:')
      log(obj.class().mocha().instanceMethods())
      log('obj.instanceMethodsWithAncestors:')
      log(obj.class().mocha().instanceMethodsWithAncestors())

      log('obj.protocols:')
      log(obj.class().mocha().protocols())
      log('obj.protocolsWithAncestors:')
      log(obj.class().mocha().protocolsWithAncestors())
    }

    if (obj.treeAsDictionary) {
      log('obj.treeAsDictionary():')
      log(obj.treeAsDictionary())
    }
  }
}

// polyfill the global object
var commonjsGlobal = typeof global !== 'undefined'
  ? global
  : this

commonjsGlobal.console = commonjsGlobal.console || console

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = run.bind(this, 'default')
