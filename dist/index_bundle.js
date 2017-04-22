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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AgentObservation__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generateInitialState__ = __webpack_require__(27);



// import {getVisibleTiles} from './getVisibleTiles'

const config = {
    size: [31, 31],
    viewPortSize: [7, 5],
    viewPortOffset: [0, 1],
    // viewPortSize: [3, 2],
    // viewPortOffset: [0, 1],
    verticalDeltaScore: 4,
    maxTileCost: 9
};
/* harmony export (immutable) */ __webpack_exports__["b"] = config;


/**
 * The main environment class for this game. This is the public interface for the game.
 */
class Environment {
    constructor() {
        this._state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__generateInitialState__["a" /* generateInitialState */])();

        //Bind these to create proper JavaScript "this" context
        this.applyAction = this.applyAction.bind(this);
        this.getAgentObservation = this.getAgentObservation.bind(this);
        this.getGodObservation = this.getGodObservation.bind(this);
    }

    /**
     * Mutates the environment's internal state by processing the given action
     *
     * @param actionCode
     */
    applyAction(actionCode) {
        switch (actionCode) {
            case "w":
                if (this._state.position[1] > 0) {
                    this._state.position[1]--;
                }
                this._state.score = this._state.score - config.verticalDeltaScore;
                break;
            case "a":
                if (this._state.position[0] > 0) {
                    this._state.position[0]--;
                }
                break;
            case "s":
                if (this._state.position[1] < config.size[1] - 1) {
                    this._state.position[1]++;
                }
                this._state.score = this._state.score + config.verticalDeltaScore;
                break;
            case "d":
                if (this._state.position[0] < config.size[0] - 1) {
                    this._state.position[0]++;
                }
                break;
        }

        this._state.score = this._state.score - this._state.costs[this._state.position[0]][this._state.position[1]];

        this._state.isComplete = this._state.position[1] == config.size[1] - 1;// || this._state.score < -100;

    }

    /**
     * Returns what the agent can see about the current environment state
     *
     * @returns {AgentObservation}
     */
    getAgentObservation() {
        const trimAmount = [
            Math.floor((config.size[0] - config.viewPortSize[0]) / 2),
            Math.floor((config.size[1] - config.viewPortSize[1]) / 2)
        ];
        const shiftVector = [
            Math.ceil(this._state.position[0] - config.size[0] / 2),
            Math.ceil(this._state.position[1] - config.size[0] / 2) + config.viewPortOffset[1]
        ];
        const trimVector = [trimAmount[0], trimAmount[1]];
        return new __WEBPACK_IMPORTED_MODULE_1__AgentObservation__["a" /* default */](
            // shiftAndTrimMatrix(getVisibleTiles(this._state), shiftVector, 1, trimVector),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["a" /* shiftAndTrimMatrix */])(this._state.costs, shiftVector, 9, trimVector),
            this._state.score,
            [
                Math.floor(config.size[0] / 2) - trimAmount[0],
                Math.floor(config.size[1] / 2) - trimAmount[1] - config.viewPortOffset[1]
            ]
        );
    }

    getGodObservation() {
        return this._state
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Environment;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createMatrix */
/* unused harmony export getMatrixDimensions */
/* unused harmony export matrixPositionExists */
/* unused harmony export forEachValueInMatrix */
/* unused harmony export shiftMatrix */
/* harmony export (immutable) */ __webpack_exports__["a"] = shiftAndTrimMatrix;
/* harmony export (immutable) */ __webpack_exports__["b"] = matrixToVector;
function createMatrix(dimensions, defaultValue) {//@TODO take dimensions instead of size
    let matrix = [];

    for (let i0 = 0; i0 < dimensions[0]; i0++) {
        matrix[i0] = [];
        for (let i1 = 0; i1 < dimensions[1]; i1++) {
            matrix[i0][i1] = defaultValue;
        }
    }

    return matrix;
}

function getMatrixDimensions(matrix) {
    return [matrix.length, matrix[0].length];
}

function matrixPositionExists(matrix, x, y) {
    return typeof matrix[x] !== 'undefined' && typeof matrix[x][y] !== 'undefined';
}

function forEachValueInMatrix(matrix, callback) {
    const dimensions = getMatrixDimensions(matrix);
    for (let x = 0; x < dimensions[0]; x++) {
        for (let y = 0; y < dimensions[1]; y++) {
            callback(x, y, matrix[x][y]);
        }
    }
}

function shiftMatrix(matrix, vector, defaultValue) {
    const dimensions = getMatrixDimensions(matrix);
    const newMatrix = createMatrix(dimensions, defaultValue);

    for (let x = 0; x < dimensions[0]; x++) {
        for (let y = 0; y < dimensions[1]; y++) {
            const fromX = x + vector[0];
            const fromY = y + vector[1];
            if (fromX >= 0 && fromX < dimensions[0] && fromY >= 0 && fromY < dimensions[0]) {
                newMatrix[x][y] = matrix[fromX][fromY]
            }
        }
    }

    return newMatrix;
}


function shiftAndTrimMatrix(matrix, shiftVector, defaultValue, trimVector) {
    shiftVector = [shiftVector[0] + trimVector[0], shiftVector[1] + trimVector[1]];
    const dimensions = [matrix.length, matrix[0].length];
    const newDimensions = [dimensions[0] - trimVector[0] * 2, dimensions[1] - trimVector[1] * 2];
    const newMatrix = createMatrix(newDimensions, defaultValue);

    for (let x = 0; x < newDimensions[0]; x++) {
        for (let y = 0; y < newDimensions[1]; y++) {
            const fromX = x + shiftVector[0];
            const fromY = y + shiftVector[1];
            if (fromX >= 0 && fromX < dimensions[0] && fromY >= 0 && fromY < dimensions[0]) {
                newMatrix[x][y] = matrix[fromX][fromY]
            }
        }
    }

    return newMatrix;
}

function matrixToVector(matrix) {
    let vector = [];
    for (let xI = 0, len = matrix[0].length; xI < len; xI++) {
        vector = [...vector, ...matrix[xI]];
    }
    return vector;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(0);
/* unused harmony export getFeelerValue */
/* unused harmony export getFeelerValues */
/* unused harmony export filterPathsWithFirstAction */
/* unused harmony export getBestFeeler */
/* harmony export (immutable) */ __webpack_exports__["a"] = getActionViaFeelers;


const oppositeActions = {
    w: 's',
    a: 'd',
    s: 'w',
    d: 'a'
};
/* unused harmony export oppositeActions */


const actionVectors = {
    //[dX, dY, dScore]
    w: [0, -1, -__WEBPACK_IMPORTED_MODULE_0__environment__["b" /* config */].verticalDeltaScore],
    a: [-1, 0, 0],
    s: [0, 1, __WEBPACK_IMPORTED_MODULE_0__environment__["b" /* config */].verticalDeltaScore],
    d: [1, 0, 0],
};

function getFeelerValue(observation, feelerSteps) {
    let position = [observation.position[0], observation.position[1]];
    let value = 0;
    feelerSteps.forEach((step) => {
        const vector = actionVectors[step];
        position = [position[0] + vector[0], position[1] + vector[1]];
        let cost;
        if (typeof observation.costs[position[0]] === 'undefined' || typeof observation.costs[position[0]][position[1]] === 'undefined') {
            cost = __WEBPACK_IMPORTED_MODULE_0__environment__["b" /* config */].maxTileCost * 2; //If going off map, make look very expensive
            // } else
            //     if (observation.visibles[position[0]][position[1]] === 0) {
            //     cost = 1;//config.maxTileCost / 2; //@TODO there must be a better way to deal with unknown tiles
        } else {
            cost = observation.costs[position[0]][position[1]]
        }
        value = value + vector[2] - cost;
    });
    return value;
}

function getFeelerValues(observation, feelerPaths) {
    return feelerPaths.map((feelerPath) => {
        return {
            path: feelerPath,
            value: getFeelerValue(observation, feelerPath)
        }
    });
}

function filterPathsWithFirstAction(paths, blacklistedFirstAction) {
    return paths.filter((path) => path[0] !== blacklistedFirstAction);
}

function getBestFeeler(feelersWithValues) {
    return feelersWithValues.reduce((bestFeelerSoFar, feeler) => {
        if (bestFeelerSoFar === null || feeler.value > bestFeelerSoFar.value) {
            return feeler;
        } else {
            return bestFeelerSoFar
        }
    }, null)
}

function getActionViaFeelers(observation, feelerPaths, lastAction) {
    //This filter prevents infinite back-and-forth movement
    const safeFeelerPaths = filterPathsWithFirstAction(
        feelerPaths, oppositeActions[lastAction]
    );

    const feelersWithValues = getFeelerValues(observation, safeFeelerPaths);

    const bestFeeler = getBestFeeler(feelersWithValues);

    return bestFeeler.path[0];
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16).Buffer))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(21);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var R = {}; // the Recurrent library

(function(global) {
    "use strict";

    // Utility fun
    function assert(condition, message) {
        // from http://stackoverflow.com/questions/15313418/javascript-assert
        if (!condition) {
            message = message || "Assertion failed";
            if (typeof Error !== "undefined") {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }

    // Random numbers utils
    var return_v = false;
    var v_val = 0.0;
    var gaussRandom = function() {
        if(return_v) {
            return_v = false;
            return v_val;
        }
        var u = 2*Math.random()-1;
        var v = 2*Math.random()-1;
        var r = u*u + v*v;
        if(r == 0 || r > 1) return gaussRandom();
        var c = Math.sqrt(-2*Math.log(r)/r);
        v_val = v*c; // cache this
        return_v = true;
        return u*c;
    }
    var randf = function(a, b) { return Math.random()*(b-a)+a; }
    var randi = function(a, b) { return Math.floor(Math.random()*(b-a)+a); }
    var randn = function(mu, std){ return mu+gaussRandom()*std; }

    // helper function returns array of zeros of length n
    // and uses typed arrays if available
    var zeros = function(n) {
        if(typeof(n)==='undefined' || isNaN(n)) { return []; }
        if(typeof ArrayBuffer === 'undefined') {
            // lacking browser support
            var arr = new Array(n);
            for(var i=0;i<n;i++) { arr[i] = 0; }
            return arr;
        } else {
            return new Float64Array(n);
        }
    }

    // Mat holds a matrix
    var Mat = function(n,d) {
        // n is number of rows d is number of columns
        this.n = n;
        this.d = d;
        this.w = zeros(n * d);
        this.dw = zeros(n * d);
    }
    Mat.prototype = {
        get: function(row, col) {
            // slow but careful accessor function
            // we want row-major order
            var ix = (this.d * row) + col;
            assert(ix >= 0 && ix < this.w.length);
            return this.w[ix];
        },
        set: function(row, col, v) {
            // slow but careful accessor function
            var ix = (this.d * row) + col;
            assert(ix >= 0 && ix < this.w.length);
            this.w[ix] = v;
        },
        setFrom: function(arr) {
            for(var i=0,n=arr.length;i<n;i++) {
                this.w[i] = arr[i];
            }
        },
        setColumn: function(m, i) {
            for(var q=0,n=m.w.length;q<n;q++) {
                this.w[(this.d * q) + i] = m.w[q];
            }
        },
        toJSON: function() {
            var json = {};
            json['n'] = this.n;
            json['d'] = this.d;
            json['w'] = this.w;
            return json;
        },
        fromJSON: function(json) {
            this.n = json.n;
            this.d = json.d;
            this.w = zeros(this.n * this.d);
            this.dw = zeros(this.n * this.d);
            for(var i=0,n=this.n * this.d;i<n;i++) {
                this.w[i] = json.w[i]; // copy over weights
            }
        }
    }

    var copyMat = function(b) {
        var a = new Mat(b.n, b.d);
        a.setFrom(b.w);
        return a;
    }

    var copyNet = function(net) {
        // nets are (k,v) pairs with k = string key, v = Mat()
        var new_net = {};
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                new_net[p] = copyMat(net[p]);
            }
        }
        return new_net;
    }

    var updateMat = function(m, alpha) {
        // updates in place
        for(var i=0,n=m.n*m.d;i<n;i++) {
            if(m.dw[i] !== 0) {
                m.w[i] += - alpha * m.dw[i];
                m.dw[i] = 0;
            }
        }
    }

    var updateNet = function(net, alpha) {
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                updateMat(net[p], alpha);
            }
        }
    }

    var netToJSON = function(net) {
        var j = {};
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                j[p] = net[p].toJSON();
            }
        }
        return j;
    }
    var netFromJSON = function(j) {
        var net = {};
        for(var p in j) {
            if(j.hasOwnProperty(p)){
                net[p] = new Mat(1,1); // not proud of this
                net[p].fromJSON(j[p]);
            }
        }
        return net;
    }
    var netZeroGrads = function(net) {
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                var mat = net[p];
                gradFillConst(mat, 0);
            }
        }
    }
    var netFlattenGrads = function(net) {
        var n = 0;
        for(var p in net) { if(net.hasOwnProperty(p)){ var mat = net[p]; n += mat.dw.length; } }
        var g = new Mat(n, 1);
        var ix = 0;
        for(var p in net) {
            if(net.hasOwnProperty(p)){
                var mat = net[p];
                for(var i=0,m=mat.dw.length;i<m;i++) {
                    g.w[ix] = mat.dw[i];
                    ix++;
                }
            }
        }
        return g;
    }

    // return Mat but filled with random numbers from gaussian
    var RandMat = function(n,d,mu,std) {
        var m = new Mat(n, d);
        fillRandn(m,mu,std);
        //fillRand(m,-std,std); // kind of :P
        return m;
    }

    // Mat utils
    // fill matrix with random gaussian numbers
    var fillRandn = function(m, mu, std) { for(var i=0,n=m.w.length;i<n;i++) { m.w[i] = randn(mu, std); } }
    var fillRand = function(m, lo, hi) { for(var i=0,n=m.w.length;i<n;i++) { m.w[i] = randf(lo, hi); } }
    var gradFillConst = function(m, c) { for(var i=0,n=m.dw.length;i<n;i++) { m.dw[i] = c } }

    // Transformer definitions
    var Graph = function(needs_backprop) {
        if(typeof needs_backprop === 'undefined') { needs_backprop = true; }
        this.needs_backprop = needs_backprop;

        // this will store a list of functions that perform backprop,
        // in their forward pass order. So in backprop we will go
        // backwards and evoke each one
        this.backprop = [];
    }
    Graph.prototype = {
        backward: function() {
            for(var i=this.backprop.length-1;i>=0;i--) {
                this.backprop[i](); // tick!
            }
        },
        rowPluck: function(m, ix) {
            // pluck a row of m with index ix and return it as col vector
            assert(ix >= 0 && ix < m.n);
            var d = m.d;
            var out = new Mat(d, 1);
            for(var i=0,n=d;i<n;i++){ out.w[i] = m.w[d * ix + i]; } // copy over the data

            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0,n=d;i<n;i++){ m.dw[d * ix + i] += out.dw[i]; }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        tanh: function(m) {
            // tanh nonlinearity
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for(var i=0;i<n;i++) {
                out.w[i] = Math.tanh(m.w[i]);
            }

            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0;i<n;i++) {
                        // grad for z = tanh(x) is (1 - z^2)
                        var mwi = out.w[i];
                        m.dw[i] += (1.0 - mwi * mwi) * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        sigmoid: function(m) {
            // sigmoid nonlinearity
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for(var i=0;i<n;i++) {
                out.w[i] = sig(m.w[i]);
            }

            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0;i<n;i++) {
                        // grad for z = tanh(x) is (1 - z^2)
                        var mwi = out.w[i];
                        m.dw[i] += mwi * (1.0 - mwi) * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        relu: function(m) {
            var out = new Mat(m.n, m.d);
            var n = m.w.length;
            for(var i=0;i<n;i++) {
                out.w[i] = Math.max(0, m.w[i]); // relu
            }
            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0;i<n;i++) {
                        m.dw[i] += m.w[i] > 0 ? out.dw[i] : 0.0;
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        mul: function(m1, m2) {
            // multiply matrices m1 * m2
            assert(m1.d === m2.n, 'matmul dimensions misaligned');

            var n = m1.n;
            var d = m2.d;
            var out = new Mat(n,d);
            for(var i=0;i<m1.n;i++) { // loop over rows of m1
                for(var j=0;j<m2.d;j++) { // loop over cols of m2
                    var dot = 0.0;
                    for(var k=0;k<m1.d;k++) { // dot product loop
                        dot += m1.w[m1.d*i+k] * m2.w[m2.d*k+j];
                    }
                    out.w[d*i+j] = dot;
                }
            }

            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0;i<m1.n;i++) { // loop over rows of m1
                        for(var j=0;j<m2.d;j++) { // loop over cols of m2
                            for(var k=0;k<m1.d;k++) { // dot product loop
                                var b = out.dw[d*i+j];
                                m1.dw[m1.d*i+k] += m2.w[m2.d*k+j] * b;
                                m2.dw[m2.d*k+j] += m1.w[m1.d*i+k] * b;
                            }
                        }
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        add: function(m1, m2) {
            assert(m1.w.length === m2.w.length);

            var out = new Mat(m1.n, m1.d);
            for(var i=0,n=m1.w.length;i<n;i++) {
                out.w[i] = m1.w[i] + m2.w[i];
            }
            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0,n=m1.w.length;i<n;i++) {
                        m1.dw[i] += out.dw[i];
                        m2.dw[i] += out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        dot: function(m1, m2) {
            // m1 m2 are both column vectors
            assert(m1.w.length === m2.w.length);
            var out = new Mat(1,1);
            var dot = 0.0;
            for(var i=0,n=m1.w.length;i<n;i++) {
                dot += m1.w[i] * m2.w[i];
            }
            out.w[0] = dot;
            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0,n=m1.w.length;i<n;i++) {
                        m1.dw[i] += m2.w[i] * out.dw[0];
                        m2.dw[i] += m1.w[i] * out.dw[0];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
        eltmul: function(m1, m2) {
            assert(m1.w.length === m2.w.length);

            var out = new Mat(m1.n, m1.d);
            for(var i=0,n=m1.w.length;i<n;i++) {
                out.w[i] = m1.w[i] * m2.w[i];
            }
            if(this.needs_backprop) {
                var backward = function() {
                    for(var i=0,n=m1.w.length;i<n;i++) {
                        m1.dw[i] += m2.w[i] * out.dw[i];
                        m2.dw[i] += m1.w[i] * out.dw[i];
                    }
                }
                this.backprop.push(backward);
            }
            return out;
        },
    }

    var softmax = function(m) {
        var out = new Mat(m.n, m.d); // probability volume
        var maxval = -999999;
        for(var i=0,n=m.w.length;i<n;i++) { if(m.w[i] > maxval) maxval = m.w[i]; }

        var s = 0.0;
        for(var i=0,n=m.w.length;i<n;i++) {
            out.w[i] = Math.exp(m.w[i] - maxval);
            s += out.w[i];
        }
        for(var i=0,n=m.w.length;i<n;i++) { out.w[i] /= s; }

        // no backward pass here needed
        // since we will use the computed probabilities outside
        // to set gradients directly on m
        return out;
    }

    var Solver = function() {
        this.decay_rate = 0.999;
        this.smooth_eps = 1e-8;
        this.step_cache = {};
    }
    Solver.prototype = {
        step: function(model, step_size, regc, clipval) {
            // perform parameter update
            var solver_stats = {};
            var num_clipped = 0;
            var num_tot = 0;
            for(var k in model) {
                if(model.hasOwnProperty(k)) {
                    var m = model[k]; // mat ref
                    if(!(k in this.step_cache)) { this.step_cache[k] = new Mat(m.n, m.d); }
                    var s = this.step_cache[k];
                    for(var i=0,n=m.w.length;i<n;i++) {

                        // rmsprop adaptive learning rate
                        var mdwi = m.dw[i];
                        s.w[i] = s.w[i] * this.decay_rate + (1.0 - this.decay_rate) * mdwi * mdwi;

                        // gradient clip
                        if(mdwi > clipval) {
                            mdwi = clipval;
                            num_clipped++;
                        }
                        if(mdwi < -clipval) {
                            mdwi = -clipval;
                            num_clipped++;
                        }
                        num_tot++;

                        // update (and regularize)
                        m.w[i] += - step_size * mdwi / Math.sqrt(s.w[i] + this.smooth_eps) - regc * m.w[i];
                        m.dw[i] = 0; // reset gradients for next iteration
                    }
                }
            }
            solver_stats['ratio_clipped'] = num_clipped*1.0/num_tot;
            return solver_stats;
        }
    }

    var initLSTM = function(input_size, hidden_sizes, output_size) {
        // hidden size should be a list

        var model = {};
        for(var d=0;d<hidden_sizes.length;d++) { // loop over depths
            var prev_size = d === 0 ? input_size : hidden_sizes[d - 1];
            var hidden_size = hidden_sizes[d];

            // gates parameters
            model['Wix'+d] = new RandMat(hidden_size, prev_size , 0, 0.08);
            model['Wih'+d] = new RandMat(hidden_size, hidden_size , 0, 0.08);
            model['bi'+d] = new Mat(hidden_size, 1);
            model['Wfx'+d] = new RandMat(hidden_size, prev_size , 0, 0.08);
            model['Wfh'+d] = new RandMat(hidden_size, hidden_size , 0, 0.08);
            model['bf'+d] = new Mat(hidden_size, 1);
            model['Wox'+d] = new RandMat(hidden_size, prev_size , 0, 0.08);
            model['Woh'+d] = new RandMat(hidden_size, hidden_size , 0, 0.08);
            model['bo'+d] = new Mat(hidden_size, 1);
            // cell write params
            model['Wcx'+d] = new RandMat(hidden_size, prev_size , 0, 0.08);
            model['Wch'+d] = new RandMat(hidden_size, hidden_size , 0, 0.08);
            model['bc'+d] = new Mat(hidden_size, 1);
        }
        // decoder params
        model['Whd'] = new RandMat(output_size, hidden_size, 0, 0.08);
        model['bd'] = new Mat(output_size, 1);
        return model;
    }

    var forwardLSTM = function(G, model, hidden_sizes, x, prev) {
        // forward prop for a single tick of LSTM
        // G is graph to append ops to
        // model contains LSTM parameters
        // x is 1D column vector with observation
        // prev is a struct containing hidden and cell
        // from previous iteration

        if(prev == null || typeof prev.h === 'undefined') {
            var hidden_prevs = [];
            var cell_prevs = [];
            for(var d=0;d<hidden_sizes.length;d++) {
                hidden_prevs.push(new R.Mat(hidden_sizes[d],1));
                cell_prevs.push(new R.Mat(hidden_sizes[d],1));
            }
        } else {
            var hidden_prevs = prev.h;
            var cell_prevs = prev.c;
        }

        var hidden = [];
        var cell = [];
        for(var d=0;d<hidden_sizes.length;d++) {

            var input_vector = d === 0 ? x : hidden[d-1];
            var hidden_prev = hidden_prevs[d];
            var cell_prev = cell_prevs[d];

            // input gate
            var h0 = G.mul(model['Wix'+d], input_vector);
            var h1 = G.mul(model['Wih'+d], hidden_prev);
            var input_gate = G.sigmoid(G.add(G.add(h0,h1),model['bi'+d]));

            // forget gate
            var h2 = G.mul(model['Wfx'+d], input_vector);
            var h3 = G.mul(model['Wfh'+d], hidden_prev);
            var forget_gate = G.sigmoid(G.add(G.add(h2, h3),model['bf'+d]));

            // output gate
            var h4 = G.mul(model['Wox'+d], input_vector);
            var h5 = G.mul(model['Woh'+d], hidden_prev);
            var output_gate = G.sigmoid(G.add(G.add(h4, h5),model['bo'+d]));

            // write operation on cells
            var h6 = G.mul(model['Wcx'+d], input_vector);
            var h7 = G.mul(model['Wch'+d], hidden_prev);
            var cell_write = G.tanh(G.add(G.add(h6, h7),model['bc'+d]));

            // compute new cell activation
            var retain_cell = G.eltmul(forget_gate, cell_prev); // what do we keep from cell
            var write_cell = G.eltmul(input_gate, cell_write); // what do we write to cell
            var cell_d = G.add(retain_cell, write_cell); // new cell contents

            // compute hidden state as gated, saturated cell activations
            var hidden_d = G.eltmul(output_gate, G.tanh(cell_d));

            hidden.push(hidden_d);
            cell.push(cell_d);
        }

        // one decoder to outputs at end
        var output = G.add(G.mul(model['Whd'], hidden[hidden.length - 1]),model['bd']);

        // return cell memory, hidden representation and output
        return {'h':hidden, 'c':cell, 'o' : output};
    }

    var sig = function(x) {
        // helper function for computing sigmoid
        return 1.0/(1+Math.exp(-x));
    }

    var maxi = function(w) {
        // argmax of array w
        var maxv = w[0];
        var maxix = 0;
        for(var i=1,n=w.length;i<n;i++) {
            var v = w[i];
            if(v > maxv) {
                maxix = i;
                maxv = v;
            }
        }
        return maxix;
    }

    var samplei = function(w) {
        // sample argmax from w, assuming w are
        // probabilities that sum to one
        var r = randf(0,1);
        var x = 0.0;
        var i = 0;
        while(true) {
            x += w[i];
            if(x > r) { return i; }
            i++;
        }
        return w.length - 1; // pretty sure we should never get here?
    }

    // various utils
    global.assert = assert;
    global.zeros = zeros;
    global.maxi = maxi;
    global.samplei = samplei;
    global.randi = randi;
    global.randn = randn;
    global.softmax = softmax;
    // classes
    global.Mat = Mat;
    global.RandMat = RandMat;
    global.forwardLSTM = forwardLSTM;
    global.initLSTM = initLSTM;
    // more utils
    global.updateMat = updateMat;
    global.updateNet = updateNet;
    global.copyMat = copyMat;
    global.copyNet = copyNet;
    global.netToJSON = netToJSON;
    global.netFromJSON = netFromJSON;
    global.netZeroGrads = netZeroGrads;
    global.netFlattenGrads = netFlattenGrads;
    // optimization
    global.Solver = Solver;
    global.Graph = Graph;
})(R);

// END OF RECURRENTJS

var RL = {};
(function(global) {
    "use strict";

// syntactic sugar function for getting default parameter values
    var getopt = function(opt, field_name, default_value) {
        if(typeof opt === 'undefined') { return default_value; }
        return (typeof opt[field_name] !== 'undefined') ? opt[field_name] : default_value;
    }

    var zeros = R.zeros; // inherit these
    var assert = R.assert;
    var randi = R.randi;
    var randf = R.randf;

    var setConst = function(arr, c) {
        for(var i=0,n=arr.length;i<n;i++) {
            arr[i] = c;
        }
    }

    var sampleWeighted = function(p) {
        var r = Math.random();
        var c = 0.0;
        for(var i=0,n=p.length;i<n;i++) {
            c += p[i];
            if(c >= r) { return i; }
        }
        assert(false, 'wtf');
    }

// ------
// AGENTS
// ------

// DPAgent performs Value Iteration
// - can also be used for Policy Iteration if you really wanted to
// - requires model of the environment :(
// - does not learn from experience :(
// - assumes finite MDP :(
    var DPAgent = function(env, opt) {
        this.V = null; // state value function
        this.P = null; // policy distribution \pi(s,a)
        this.env = env; // store pointer to environment
        this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
        this.reset();
    }
    DPAgent.prototype = {
        reset: function() {
            // reset the agent's policy and value function
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.V = zeros(this.ns);
            this.P = zeros(this.ns * this.na);
            // initialize uniform random policy
            for(var s=0;s<this.ns;s++) {
                var poss = this.env.allowedActions(s);
                for(var i=0,n=poss.length;i<n;i++) {
                    this.P[poss[i]*this.ns+s] = 1.0 / poss.length;
                }
            }
        },
        act: function(s) {
            // behave according to the learned policy
            var poss = this.env.allowedActions(s);
            var ps = [];
            for(var i=0,n=poss.length;i<n;i++) {
                var a = poss[i];
                var prob = this.P[a*this.ns+s];
                ps.push(prob);
            }
            var maxi = sampleWeighted(ps);
            return poss[maxi];
        },
        learn: function() {
            // perform a single round of value iteration
            self.evaluatePolicy(); // writes this.V
            self.updatePolicy(); // writes this.P
        },
        evaluatePolicy: function() {
            // perform a synchronous update of the value function
            var Vnew = zeros(this.ns);
            for(var s=0;s<this.ns;s++) {
                // integrate over actions in a stochastic policy
                // note that we assume that policy probability mass over allowed actions sums to one
                var v = 0.0;
                var poss = this.env.allowedActions(s);
                for(var i=0,n=poss.length;i<n;i++) {
                    var a = poss[i];
                    var prob = this.P[a*this.ns+s]; // probability of taking action under policy
                    if(prob === 0) { continue; } // no contribution, skip for speed
                    var ns = this.env.nextStateDistribution(s,a);
                    var rs = this.env.reward(s,a,ns); // reward for s->a->ns transition
                    v += prob * (rs + this.gamma * this.V[ns]);
                }
                Vnew[s] = v;
            }
            this.V = Vnew; // swap
        },
        updatePolicy: function() {
            // update policy to be greedy w.r.t. learned Value function
            for(var s=0;s<this.ns;s++) {
                var poss = this.env.allowedActions(s);
                // compute value of taking each allowed action
                var vmax, nmax;
                var vs = [];
                for(var i=0,n=poss.length;i<n;i++) {
                    var a = poss[i];
                    var ns = this.env.nextStateDistribution(s,a);
                    var rs = this.env.reward(s,a,ns);
                    var v = rs + this.gamma * this.V[ns];
                    vs.push(v);
                    if(i === 0 || v > vmax) { vmax = v; nmax = 1; }
                    else if(v === vmax) { nmax += 1; }
                }
                // update policy smoothly across all argmaxy actions
                for(var i=0,n=poss.length;i<n;i++) {
                    var a = poss[i];
                    this.P[a*this.ns+s] = (vs[i] === vmax) ? 1.0/nmax : 0.0;
                }
            }
        },
    }

// QAgent uses TD (Q-Learning, SARSA)
// - does not require environment model :)
// - learns from experience :)
    var TDAgent = function(env, opt) {
        this.update = getopt(opt, 'update', 'qlearn'); // qlearn | sarsa
        this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.01); // value function learning rate

        // class allows non-deterministic policy, and smoothly regressing towards the optimal policy based on Q
        this.smooth_policy_update = getopt(opt, 'smooth_policy_update', false);
        this.beta = getopt(opt, 'beta', 0.01); // learning rate for policy, if smooth updates are on

        // eligibility traces
        this.lambda = getopt(opt, 'lambda', 0); // eligibility trace decay. 0 = no eligibility traces used
        this.replacing_traces = getopt(opt, 'replacing_traces', true);

        // optional optimistic initial values
        this.q_init_val = getopt(opt, 'q_init_val', 0);

        this.planN = getopt(opt, 'planN', 0); // number of planning steps per learning iteration (0 = no planning)

        this.Q = null; // state action value function
        this.P = null; // policy distribution \pi(s,a)
        this.e = null; // eligibility trace
        this.env_model_s = null;; // environment model (s,a) -> (s',r)
        this.env_model_r = null;; // environment model (s,a) -> (s',r)
        this.env = env; // store pointer to environment
        this.reset();
    }
    TDAgent.prototype = {
        reset: function(){
            // reset the agent's policy and value function
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.Q = zeros(this.ns * this.na);
            if(this.q_init_val !== 0) { setConst(this.Q, this.q_init_val); }
            this.P = zeros(this.ns * this.na);
            this.e = zeros(this.ns * this.na);

            // model/planning vars
            this.env_model_s = zeros(this.ns * this.na);
            setConst(this.env_model_s, -1); // init to -1 so we can test if we saw the state before
            this.env_model_r = zeros(this.ns * this.na);
            this.sa_seen = [];
            this.pq = zeros(this.ns * this.na);

            // initialize uniform random policy
            for(var s=0;s<this.ns;s++) {
                var poss = this.env.allowedActions(s);
                for(var i=0,n=poss.length;i<n;i++) {
                    this.P[poss[i]*this.ns+s] = 1.0 / poss.length;
                }
            }
            // agent memory, needed for streaming updates
            // (s0,a0,r0,s1,a1,r1,...)
            this.r0 = null;
            this.s0 = null;
            this.s1 = null;
            this.a0 = null;
            this.a1 = null;
        },
        resetEpisode: function() {
            // an episode finished
        },
        act: function(s){
            // act according to epsilon greedy policy
            var poss = this.env.allowedActions(s);
            var probs = [];
            for(var i=0,n=poss.length;i<n;i++) {
                probs.push(this.P[poss[i]*this.ns+s]);
            }
            // epsilon greedy policy
            if(Math.random() < this.epsilon) {
                var a = poss[randi(0,poss.length)]; // random available action
                this.explored = true;
            } else {
                var a = poss[sampleWeighted(probs)];
                this.explored = false;
            }
            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;
            return a;
        },
        learn: function(r1){
            // takes reward for previous action, which came from a call to act()
            if(!(this.r0 == null)) {
                this.learnFromTuple(this.s0, this.a0, this.r0, this.s1, this.a1, this.lambda);
                if(this.planN > 0) {
                    this.updateModel(this.s0, this.a0, this.r0, this.s1);
                    this.plan();
                }
            }
            this.r0 = r1; // store this for next update
        },
        updateModel: function(s0, a0, r0, s1) {
            // transition (s0,a0) -> (r0,s1) was observed. Update environment model
            var sa = a0 * this.ns + s0;
            if(this.env_model_s[sa] === -1) {
                // first time we see this state action
                this.sa_seen.push(a0 * this.ns + s0); // add as seen state
            }
            this.env_model_s[sa] = s1;
            this.env_model_r[sa] = r0;
        },
        plan: function() {

            // order the states based on current priority queue information
            var spq = [];
            for(var i=0,n=this.sa_seen.length;i<n;i++) {
                var sa = this.sa_seen[i];
                var sap = this.pq[sa];
                if(sap > 1e-5) { // gain a bit of efficiency
                    spq.push({sa:sa, p:sap});
                }
            }
            spq.sort(function(a,b){ return a.p < b.p ? 1 : -1});

            // perform the updates
            var nsteps = Math.min(this.planN, spq.length);
            for(var k=0;k<nsteps;k++) {
                // random exploration
                //var i = randi(0, this.sa_seen.length); // pick random prev seen state action
                //var s0a0 = this.sa_seen[i];
                var s0a0 = spq[k].sa;
                this.pq[s0a0] = 0; // erase priority, since we're backing up this state
                var s0 = s0a0 % this.ns;
                var a0 = Math.floor(s0a0 / this.ns);
                var r0 = this.env_model_r[s0a0];
                var s1 = this.env_model_s[s0a0];
                var a1 = -1; // not used for Q learning
                if(this.update === 'sarsa') {
                    // generate random action?...
                    var poss = this.env.allowedActions(s1);
                    var a1 = poss[randi(0,poss.length)];
                }
                this.learnFromTuple(s0, a0, r0, s1, a1, 0); // note lambda = 0 - shouldnt use eligibility trace here
            }
        },
        learnFromTuple: function(s0, a0, r0, s1, a1, lambda) {
            var sa = a0 * this.ns + s0;

            // calculate the target for Q(s,a)
            if(this.update === 'qlearn') {
                // Q learning target is Q(s0,a0) = r0 + gamma * max_a Q[s1,a]
                var poss = this.env.allowedActions(s1);
                var qmax = 0;
                for(var i=0,n=poss.length;i<n;i++) {
                    var s1a = poss[i] * this.ns + s1;
                    var qval = this.Q[s1a];
                    if(i === 0 || qval > qmax) { qmax = qval; }
                }
                var target = r0 + this.gamma * qmax;
            } else if(this.update === 'sarsa') {
                // SARSA target is Q(s0,a0) = r0 + gamma * Q[s1,a1]
                var s1a1 = a1 * this.ns + s1;
                var target = r0 + this.gamma * this.Q[s1a1];
            }

            if(lambda > 0) {
                // perform an eligibility trace update
                if(this.replacing_traces) {
                    this.e[sa] = 1;
                } else {
                    this.e[sa] += 1;
                }
                var edecay = lambda * this.gamma;
                var state_update = zeros(this.ns);
                for(var s=0;s<this.ns;s++) {
                    var poss = this.env.allowedActions(s);
                    for(var i=0;i<poss.length;i++) {
                        var a = poss[i];
                        var saloop = a * this.ns + s;
                        var esa = this.e[saloop];
                        var update = this.alpha * esa * (target - this.Q[saloop]);
                        this.Q[saloop] += update;
                        this.updatePriority(s, a, update);
                        this.e[saloop] *= edecay;
                        var u = Math.abs(update);
                        if(u > state_update[s]) { state_update[s] = u; }
                    }
                }
                for(var s=0;s<this.ns;s++) {
                    if(state_update[s] > 1e-5) { // save efficiency here
                        this.updatePolicy(s);
                    }
                }
                if(this.explored && this.update === 'qlearn') {
                    // have to wipe the trace since q learning is off-policy :(
                    this.e = zeros(this.ns * this.na);
                }
            } else {
                // simpler and faster update without eligibility trace
                // update Q[sa] towards it with some step size
                var update = this.alpha * (target - this.Q[sa]);
                this.Q[sa] += update;
                this.updatePriority(s0, a0, update);
                // update the policy to reflect the change (if appropriate)
                this.updatePolicy(s0);
            }
        },
        updatePriority: function(s,a,u) {
            // used in planning. Invoked when Q[sa] += update
            // we should find all states that lead to (s,a) and upgrade their priority
            // of being update in the next planning step
            u = Math.abs(u);
            if(u < 1e-5) { return; } // for efficiency skip small updates
            if(this.planN === 0) { return; } // there is no planning to be done, skip.
            for(var si=0;si<this.ns;si++) {
                // note we are also iterating over impossible actions at all states,
                // but this should be okay because their env_model_s should simply be -1
                // as initialized, so they will never be predicted to point to any state
                // because they will never be observed, and hence never be added to the model
                for(var ai=0;ai<this.na;ai++) {
                    var siai = ai * this.ns + si;
                    if(this.env_model_s[siai] === s) {
                        // this state leads to s, add it to priority queue
                        this.pq[siai] += u;
                    }
                }
            }
        },
        updatePolicy: function(s) {
            var poss = this.env.allowedActions(s);
            // set policy at s to be the action that achieves max_a Q(s,a)
            // first find the maxy Q values
            var qmax, nmax;
            var qs = [];
            for(var i=0,n=poss.length;i<n;i++) {
                var a = poss[i];
                var qval = this.Q[a*this.ns+s];
                qs.push(qval);
                if(i === 0 || qval > qmax) { qmax = qval; nmax = 1; }
                else if(qval === qmax) { nmax += 1; }
            }
            // now update the policy smoothly towards the argmaxy actions
            var psum = 0.0;
            for(var i=0,n=poss.length;i<n;i++) {
                var a = poss[i];
                var target = (qs[i] === qmax) ? 1.0/nmax : 0.0;
                var ix = a*this.ns+s;
                if(this.smooth_policy_update) {
                    // slightly hacky :p
                    this.P[ix] += this.beta * (target - this.P[ix]);
                    psum += this.P[ix];
                } else {
                    // set hard target
                    this.P[ix] = target;
                }
            }
            if(this.smooth_policy_update) {
                // renomalize P if we're using smooth policy updates
                for(var i=0,n=poss.length;i<n;i++) {
                    var a = poss[i];
                    this.P[a*this.ns+s] /= psum;
                }
            }
        }
    }


    var DQNAgent = function(env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.75); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.01); // value function learning rate

        this.experience_add_every = getopt(opt, 'experience_add_every', 25); // number of time steps before we add another experience to replay memory
        this.experience_size = getopt(opt, 'experience_size', 5000); // size of experience replay
        this.learning_steps_per_iteration = getopt(opt, 'learning_steps_per_iteration', 10);
        this.tderror_clamp = getopt(opt, 'tderror_clamp', 1.0);

        this.num_hidden_units =  getopt(opt, 'num_hidden_units', 100);

        this.env = env;
        this.reset();
    }
    DQNAgent.prototype = {
        reset: function() {
            this.nh = this.num_hidden_units; // number of hidden units
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();

            // nets are hardcoded for now as key (str) -> Mat
            // not proud of this. better solution is to have a whole Net object
            // on top of Mats, but for now sticking with this
            this.net = {};
            this.net.W1 = new R.RandMat(this.nh, this.ns, 0, 0.01);
            this.net.b1 = new R.Mat(this.nh, 1, 0, 0.01);
            this.net.W2 = new R.RandMat(this.na, this.nh, 0, 0.01);
            this.net.b2 = new R.Mat(this.na, 1, 0, 0.01);

            this.exp = []; // experience
            this.expi = 0; // where to insert

            this.t = 0;

            this.r0 = null;
            this.s0 = null;
            this.s1 = null;
            this.a0 = null;
            this.a1 = null;

            this.tderror = 0; // for visualization only...
        },
        toJSON: function() {
            // save function
            var j = {};
            j.nh = this.nh;
            j.ns = this.ns;
            j.na = this.na;
            j.net = R.netToJSON(this.net);
            return j;
        },
        fromJSON: function(j) {
            // load function
            this.nh = j.nh;
            this.ns = j.ns;
            this.na = j.na;
            this.net = R.netFromJSON(j.net);
        },
        forwardQ: function(net, s, needs_backprop) {
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            this.lastG = G; // back this up. Kind of hacky isn't it
            return a2mat;
        },
        act: function(slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            // epsilon greedy policy
            if(Math.random() < this.epsilon) {
                var a = randi(0, this.na);
            } else {
                // greedy wrt Q function
                var amat = this.forwardQ(this.net, s, false);
                var a = R.maxi(amat.w); // returns index of argmax action
            }

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;

            return a;
        },
        learn: function(r1) {
            // perform an update on Q function
            if(!(this.r0 == null) && this.alpha > 0) {

                // learn from this tuple to get a sense of how "surprising" it is to the agent
                var tderror = this.learnFromTuple(this.s0, this.a0, this.r0, this.s1, this.a1);
                this.tderror = tderror; // a measure of surprise

                // decide if we should keep this experience in the replay
                if(this.t % this.experience_add_every === 0) {
                    this.exp[this.expi] = [this.s0, this.a0, this.r0, this.s1, this.a1];
                    this.expi += 1;
                    if(this.expi > this.experience_size) { this.expi = 0; } // roll over when we run out
                }
                this.t += 1;

                // sample some additional experience from replay memory and learn from it
                for(var k=0;k<this.learning_steps_per_iteration;k++) {
                    var ri = randi(0, this.exp.length); // todo: priority sweeps?
                    var e = this.exp[ri];
                    this.learnFromTuple(e[0], e[1], e[2], e[3], e[4])
                }
            }
            this.r0 = r1; // store for next update
        },
        learnFromTuple: function(s0, a0, r0, s1, a1) {
            // want: Q(s,a) = r + gamma * max_a' Q(s',a')

            // compute the target Q value
            var tmat = this.forwardQ(this.net, s1, false);
            var qmax = r0 + this.gamma * tmat.w[R.maxi(tmat.w)];

            // now predict
            var pred = this.forwardQ(this.net, s0, true);

            var tderror = pred.w[a0] - qmax;
            var clamp = this.tderror_clamp;
            if(Math.abs(tderror) > clamp) {  // huber loss to robustify
                if(tderror > clamp) tderror = clamp;
                if(tderror < -clamp) tderror = -clamp;
            }
            pred.dw[a0] = tderror;
            this.lastG.backward(); // compute gradients on net params

            // update net
            R.updateNet(this.net, this.alpha);
            return tderror;
        }
    }

// buggy implementation, doesnt work...
    var SimpleReinforceAgent = function(env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.5); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.75); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.001); // actor net learning rate
        this.beta = getopt(opt, 'beta', 0.01); // baseline net learning rate
        this.env = env;
        this.reset();
    }
    SimpleReinforceAgent.prototype = {
        reset: function() {
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.nh = 100; // number of hidden units
            this.nhb = 100; // and also in the baseline lstm

            this.actorNet = {};
            this.actorNet.W1 = new R.RandMat(this.nh, this.ns, 0, 0.01);
            this.actorNet.b1 = new R.Mat(this.nh, 1, 0, 0.01);
            this.actorNet.W2 = new R.RandMat(this.na, this.nh, 0, 0.1);
            this.actorNet.b2 = new R.Mat(this.na, 1, 0, 0.01);
            this.actorOutputs = [];
            this.actorGraphs = [];
            this.actorActions = []; // sampled ones

            this.rewardHistory = [];

            this.baselineNet = {};
            this.baselineNet.W1 = new R.RandMat(this.nhb, this.ns, 0, 0.01);
            this.baselineNet.b1 = new R.Mat(this.nhb, 1, 0, 0.01);
            this.baselineNet.W2 = new R.RandMat(this.na, this.nhb, 0, 0.01);
            this.baselineNet.b2 = new R.Mat(this.na, 1, 0, 0.01);
            this.baselineOutputs = [];
            this.baselineGraphs = [];

            this.t = 0;
        },
        forwardActor: function(s, needs_backprop) {
            var net = this.actorNet;
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            return {'a':a2mat, 'G':G}
        },
        forwardValue: function(s, needs_backprop) {
            var net = this.baselineNet;
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            return {'a':a2mat, 'G':G}
        },
        act: function(slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            // forward the actor to get action output
            var ans = this.forwardActor(s, true);
            var amat = ans.a;
            var ag = ans.G;
            this.actorOutputs.push(amat);
            this.actorGraphs.push(ag);

            // forward the baseline estimator
            var ans = this.forwardValue(s, true);
            var vmat = ans.a;
            var vg = ans.G;
            this.baselineOutputs.push(vmat);
            this.baselineGraphs.push(vg);

            // sample action from the stochastic gaussian policy
            var a = R.copyMat(amat);
            var gaussVar = 0.02;
            a.w[0] = R.randn(0, gaussVar);
            a.w[1] = R.randn(0, gaussVar);

            this.actorActions.push(a);

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;

            return a;
        },
        learn: function(r1) {
            // perform an update on Q function
            this.rewardHistory.push(r1);
            var n = this.rewardHistory.length;
            var baselineMSE = 0.0;
            var nup = 100; // what chunk of experience to take
            var nuse = 80; // what chunk to update from
            if(n >= nup) {
                // lets learn and flush
                // first: compute the sample values at all points
                var vs = [];
                for(var t=0;t<nuse;t++) {
                    var mul = 1;
                    // compute the actual discounted reward for this time step
                    var V = 0;
                    for(var t2=t;t2<n;t2++) {
                        V += mul * this.rewardHistory[t2];
                        mul *= this.gamma;
                        if(mul < 1e-5) { break; } // efficiency savings
                    }
                    // get the predicted baseline at this time step
                    var b = this.baselineOutputs[t].w[0];
                    for(var i=0;i<this.na;i++) {
                        // [the action delta] * [the desirebility]
                        var update = - (V - b) * (this.actorActions[t].w[i] - this.actorOutputs[t].w[i]);
                        if(update > 0.1) { update = 0.1; }
                        if(update < -0.1) { update = -0.1; }
                        this.actorOutputs[t].dw[i] += update;
                    }
                    var update = - (V - b);
                    if(update > 0.1) { update = 0.1; }
                    if(update < 0.1) { update = -0.1; }
                    this.baselineOutputs[t].dw[0] += update;
                    baselineMSE += (V - b) * (V - b);
                    vs.push(V);
                }
                baselineMSE /= nuse;
                // backprop all the things
                for(var t=0;t<nuse;t++) {
                    this.actorGraphs[t].backward();
                    this.baselineGraphs[t].backward();
                }
                R.updateNet(this.actorNet, this.alpha); // update actor network
                R.updateNet(this.baselineNet, this.beta); // update baseline network

                // flush
                this.actorOutputs = [];
                this.rewardHistory = [];
                this.actorActions = [];
                this.baselineOutputs = [];
                this.actorGraphs = [];
                this.baselineGraphs = [];

                this.tderror = baselineMSE;
            }
            this.t += 1;
            this.r0 = r1; // store for next update
        },
    }

// buggy implementation as well, doesn't work
    var RecurrentReinforceAgent = function(env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.5); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.001); // actor net learning rate
        this.beta = getopt(opt, 'beta', 0.01); // baseline net learning rate
        this.env = env;
        this.reset();
    }
    RecurrentReinforceAgent.prototype = {
        reset: function() {
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.nh = 40; // number of hidden units
            this.nhb = 40; // and also in the baseline lstm

            this.actorLSTM = R.initLSTM(this.ns, [this.nh], this.na);
            this.actorG = new R.Graph();
            this.actorPrev = null;
            this.actorOutputs = [];
            this.rewardHistory = [];
            this.actorActions = [];

            this.baselineLSTM = R.initLSTM(this.ns, [this.nhb], 1);
            this.baselineG = new R.Graph();
            this.baselinePrev = null;
            this.baselineOutputs = [];

            this.t = 0;

            this.r0 = null;
            this.s0 = null;
            this.s1 = null;
            this.a0 = null;
            this.a1 = null;
        },
        act: function(slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            // forward the LSTM to get action distribution
            var actorNext = R.forwardLSTM(this.actorG, this.actorLSTM, [this.nh], s, this.actorPrev);
            this.actorPrev = actorNext;
            var amat = actorNext.o;
            this.actorOutputs.push(amat);

            // forward the baseline LSTM
            var baselineNext = R.forwardLSTM(this.baselineG, this.baselineLSTM, [this.nhb], s, this.baselinePrev);
            this.baselinePrev = baselineNext;
            this.baselineOutputs.push(baselineNext.o);

            // sample action from actor policy
            var gaussVar = 0.05;
            var a = R.copyMat(amat);
            for(var i=0,n=a.w.length;i<n;i++) {
                a.w[0] += R.randn(0, gaussVar);
                a.w[1] += R.randn(0, gaussVar);
            }
            this.actorActions.push(a);

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;
            return a;
        },
        learn: function(r1) {
            // perform an update on Q function
            this.rewardHistory.push(r1);
            var n = this.rewardHistory.length;
            var baselineMSE = 0.0;
            var nup = 100; // what chunk of experience to take
            var nuse = 80; // what chunk to also update
            if(n >= nup) {
                // lets learn and flush
                // first: compute the sample values at all points
                var vs = [];
                for(var t=0;t<nuse;t++) {
                    var mul = 1;
                    var V = 0;
                    for(var t2=t;t2<n;t2++) {
                        V += mul * this.rewardHistory[t2];
                        mul *= this.gamma;
                        if(mul < 1e-5) { break; } // efficiency savings
                    }
                    var b = this.baselineOutputs[t].w[0];
                    // todo: take out the constants etc.
                    for(var i=0;i<this.na;i++) {
                        // [the action delta] * [the desirebility]
                        var update = - (V - b) * (this.actorActions[t].w[i] - this.actorOutputs[t].w[i]);
                        if(update > 0.1) { update = 0.1; }
                        if(update < -0.1) { update = -0.1; }
                        this.actorOutputs[t].dw[i] += update;
                    }
                    var update = - (V - b);
                    if(update > 0.1) { update = 0.1; }
                    if(update < 0.1) { update = -0.1; }
                    this.baselineOutputs[t].dw[0] += update;
                    baselineMSE += (V-b)*(V-b);
                    vs.push(V);
                }
                baselineMSE /= nuse;
                this.actorG.backward(); // update params! woohoo!
                this.baselineG.backward();
                R.updateNet(this.actorLSTM, this.alpha); // update actor network
                R.updateNet(this.baselineLSTM, this.beta); // update baseline network

                // flush
                this.actorG = new R.Graph();
                this.actorPrev = null;
                this.actorOutputs = [];
                this.rewardHistory = [];
                this.actorActions = [];

                this.baselineG = new R.Graph();
                this.baselinePrev = null;
                this.baselineOutputs = [];

                this.tderror = baselineMSE;
            }
            this.t += 1;
            this.r0 = r1; // store for next update
        },
    }

// Currently buggy implementation, doesnt work
    var DeterministPG = function(env, opt) {
        this.gamma = getopt(opt, 'gamma', 0.5); // future reward discount factor
        this.epsilon = getopt(opt, 'epsilon', 0.5); // for epsilon-greedy policy
        this.alpha = getopt(opt, 'alpha', 0.001); // actor net learning rate
        this.beta = getopt(opt, 'beta', 0.01); // baseline net learning rate
        this.env = env;
        this.reset();
    }
    DeterministPG.prototype = {
        reset: function() {
            this.ns = this.env.getNumStates();
            this.na = this.env.getMaxNumActions();
            this.nh = 100; // number of hidden units

            // actor
            this.actorNet = {};
            this.actorNet.W1 = new R.RandMat(this.nh, this.ns, 0, 0.01);
            this.actorNet.b1 = new R.Mat(this.nh, 1, 0, 0.01);
            this.actorNet.W2 = new R.RandMat(this.na, this.ns, 0, 0.1);
            this.actorNet.b2 = new R.Mat(this.na, 1, 0, 0.01);
            this.ntheta = this.na*this.ns+this.na; // number of params in actor

            // critic
            this.criticw = new R.RandMat(1, this.ntheta, 0, 0.01); // row vector

            this.r0 = null;
            this.s0 = null;
            this.s1 = null;
            this.a0 = null;
            this.a1 = null;
            this.t = 0;
        },
        forwardActor: function(s, needs_backprop) {
            var net = this.actorNet;
            var G = new R.Graph(needs_backprop);
            var a1mat = G.add(G.mul(net.W1, s), net.b1);
            var h1mat = G.tanh(a1mat);
            var a2mat = G.add(G.mul(net.W2, h1mat), net.b2);
            return {'a':a2mat, 'G':G}
        },
        act: function(slist) {
            // convert to a Mat column vector
            var s = new R.Mat(this.ns, 1);
            s.setFrom(slist);

            // forward the actor to get action output
            var ans = this.forwardActor(s, false);
            var amat = ans.a;
            var ag = ans.G;

            // sample action from the stochastic gaussian policy
            var a = R.copyMat(amat);
            if(Math.random() < this.epsilon) {
                var gaussVar = 0.02;
                a.w[0] = R.randn(0, gaussVar);
                a.w[1] = R.randn(0, gaussVar);
            }
            var clamp = 0.25;
            if(a.w[0] > clamp) a.w[0] = clamp;
            if(a.w[0] < -clamp) a.w[0] = -clamp;
            if(a.w[1] > clamp) a.w[1] = clamp;
            if(a.w[1] < -clamp) a.w[1] = -clamp;

            // shift state memory
            this.s0 = this.s1;
            this.a0 = this.a1;
            this.s1 = s;
            this.a1 = a;

            return a;
        },
        utilJacobianAt: function(s) {
            var ujacobian = new R.Mat(this.ntheta, this.na);
            for(var a=0;a<this.na;a++) {
                R.netZeroGrads(this.actorNet);
                var ag = this.forwardActor(this.s0, true);
                ag.a.dw[a] = 1.0;
                ag.G.backward();
                var gflat = R.netFlattenGrads(this.actorNet);
                ujacobian.setColumn(gflat,a);
            }
            return ujacobian;
        },
        learn: function(r1) {
            // perform an update on Q function
            //this.rewardHistory.push(r1);
            if(!(this.r0 == null)) {
                var Gtmp = new R.Graph(false);
                // dpg update:
                // first compute the features psi:
                // the jacobian matrix of the actor for s
                var ujacobian0 = this.utilJacobianAt(this.s0);
                // now form the features \psi(s,a)
                var psi_sa0 = Gtmp.mul(ujacobian0, this.a0); // should be [this.ntheta x 1] "feature" vector
                var qw0 = Gtmp.mul(this.criticw, psi_sa0); // 1x1
                // now do the same thing because we need \psi(s_{t+1}, \mu\_\theta(s\_t{t+1}))
                var ujacobian1 = this.utilJacobianAt(this.s1);
                var ag = this.forwardActor(this.s1, false);
                var psi_sa1 = Gtmp.mul(ujacobian1, ag.a);
                var qw1 = Gtmp.mul(this.criticw, psi_sa1); // 1x1
                // get the td error finally
                var tderror = this.r0 + this.gamma * qw1.w[0] - qw0.w[0]; // lol
                if(tderror > 0.5) tderror = 0.5; // clamp
                if(tderror < -0.5) tderror = -0.5;
                this.tderror = tderror;

                // update actor policy with natural gradient
                var net = this.actorNet;
                var ix = 0;
                for(var p in net) {
                    var mat = net[p];
                    if(net.hasOwnProperty(p)){
                        for(var i=0,n=mat.w.length;i<n;i++) {
                            mat.w[i] += this.alpha * this.criticw.w[ix]; // natural gradient update
                            ix+=1;
                        }
                    }
                }
                // update the critic parameters too
                for(var i=0;i<this.ntheta;i++) {
                    var update = this.beta * tderror * psi_sa0.w[i];
                    this.criticw.w[i] += update;
                }
            }
            this.r0 = r1; // store for next update
        },
    }

// exports
    global.DPAgent = DPAgent;
    global.TDAgent = TDAgent;
    global.DQNAgent = DQNAgent;
//global.SimpleReinforceAgent = SimpleReinforceAgent;
//global.RecurrentReinforceAgent = RecurrentReinforceAgent;
//global.DeterministPG = DeterministPG;
})(RL);

const rl = RL;
/* harmony export (immutable) */ __webpack_exports__["a"] = rl;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * An agent that just always moves downwards no matter what
 *
 * @constructor
 */
class AlwaysDown {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return 's';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlwaysDown;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(0);


function getImmediateCosts(observation) {
    const costOneBelow = observation.costs[observation.position[0]][observation.position[1] + 1];
    const costOneToRight = observation.costs[observation.position[0] + 1][observation.position[1]];
    const costOneToLeft = observation.costs[observation.position[0] - 1][observation.position[1]];
    return {
        'a': costOneToLeft,
        's': costOneBelow - __WEBPACK_IMPORTED_MODULE_0__environment__["b" /* config */].verticalDeltaScore,
        'd': costOneToRight
    };
}

/**
 * An Agent that has a preferred lateral direction and moves that way if its less costly than moving down.
 *
 * @constructor
 */
class LateralWallBouncer {
    constructor() {
        this._state = {
            lateralAvoidanceDirection: 'd'
        }
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let immediateCosts = getImmediateCosts(observation);

        //If we are on the edge of the game, reverse the lateral avoidance direction
        if (observation.position[0] == __WEBPACK_IMPORTED_MODULE_0__environment__["b" /* config */].size[0] - 1) {
            this._state.lateralAvoidanceDirection = 'a';
        } else if (observation.position[0] == 0) {
            this._state.lateralAvoidanceDirection = 'd';
        }

        let costToSide = this._state.lateralAvoidanceDirection == 'd' ? immediateCosts.d : immediateCosts.a;

        let action = 's';

        if (immediateCosts.s > costToSide) {
            action = this._state.lateralAvoidanceDirection;
        }

        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LateralWallBouncer;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);


const feelerPaths = [
    ['s'],
    ['a', 's'],
    ['a', 'a', 's'],
    ['a', 'a', 'a', 's'],
    ['a', 'a', 'a', 'a', 's'],
    ['d', 's'],
    ['d', 'd', 's'],
    ['d', 'd', 'd', 's'],
    ['d', 'd', 'd', 'd', 's'],
];

class LookFourAdjacentOneDown {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_feeler__["a" /* getActionViaFeelers */])(observation, feelerPaths, null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LookFourAdjacentOneDown;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);


const feelerPaths = [ //Warning the paths below may not include all possibilities

    ['s', 's', 's'],

    ////

    ['s', 'a', 's', 's'],
    ['s', 'a', 's', 'a', 's'],
    ['s', 'a', 's', 'a', 'a', 's'],

    ['s', 'a', 'a', 's', 's'],
    ['s', 'a', 'a', 's', 'a', 's'],
    ['s', 'a', 'a', 'a', 's', 's'],

    ['s', 's', 'a', 's'],
    ['s', 's', 'a', 'a', 's'],
    ['s', 's', 'a', 'a', 'a', 's'],

    ['a', 's', 's', 's'],
    ['a', 's', 's', 'a', 's'],
    ['a', 's', 's', 'a', 'a', 's'],

    ['a', 's', 'a', 's', 's'],
    ['a', 's', 'a', 's', 'a', 's'],

    ['a', 'a', 's', 's', 's'],
    ['a', 'a', 's', 'a', 's', 's'],
    ['a', 'a', 's', 'a', 's', 'a', 's'],

    ['a', 'a', 'a', 's', 's', 's'],

    ////

    ['s', 'd', 's', 's'],
    ['s', 'd', 's', 'd', 's'],
    ['s', 'd', 's', 'd', 'd', 's'],

    ['s', 'd', 'd', 's', 's'],
    ['s', 'd', 'd', 's', 'd', 's'],
    ['s', 'd', 'd', 'd', 's', 's'],

    ['s', 's', 'd', 's'],
    ['s', 's', 'd', 'd', 's'],
    ['s', 's', 'd', 'd', 'd', 's'],

    ['d', 's', 's', 's'],
    ['d', 's', 's', 'd', 's'],
    ['d', 's', 's', 'd', 'd', 's'],

    ['d', 's', 'd', 's', 's'],
    ['d', 's', 'd', 's', 'd', 's'],

    ['d', 'd', 's', 's', 's'],
    ['d', 'd', 's', 'd', 's', 's'],
    ['d', 'd', 's', 'd', 's', 'd', 's'],

    ['d', 'd', 'd', 's', 's', 's'],

    ////

    ['a', 's', 's', 'd', 's'],
    ['a', 'a', 's', 's', 'd', 's'],
    ['a', 'a', 's', 's', 'd', 'd', 's'],
    ['a', 'a', 's', 's', 'd', 'd', 'd', 's'],
    ['a', 'a', 'a', 's', 's', 'd', 's'],
    ['a', 'a', 'a', 's', 's', 'd', 'd', 's'],
    ['a', 'a', 'a', 's', 's', 'd', 'd', 'd', 's'],

    ////

    ['d', 's', 's', 'a', 's'],
    ['d', 'd', 's', 's', 'a', 's'],
    ['d', 'd', 's', 's', 'a', 'a', 's'],
    ['d', 'd', 's', 's', 'a', 'a', 'a', 's'],
    ['d', 'd', 'd', 's', 's', 'a', 's'],
    ['d', 'd', 'd', 's', 's', 'a', 'a', 's'],
    ['d', 'd', 'd', 's', 's', 'a', 'a', 'a', 's'],
];

class LookThreeAdjacentTwoDown {
    constructor() {
        this._state = {lastAction: null};
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let action = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_feeler__["a" /* getActionViaFeelers */])(observation, feelerPaths, this._state.lastAction);

        this._state.lastAction = action;

        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LookThreeAdjacentTwoDown;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_feeler__ = __webpack_require__(2);


const feelerPaths = [
    ['s', 's'],

    ['a', 's', 's'],
    ['s', 'a', 's'],
    ['a', 'a', 's', 's'],
    ['s', 'a', 'a', 's'],
    ['s', 'a', 'a', 'a', 's'],
    ['a', 's', 'a', 'a', 's'],
    ['a', 'a', 's', 'a', 's'],
    ['a', 'a', 'a', 's', 's'],

    ['d', 's', 's'],
    ['s', 'd', 's'],
    ['d', 'd', 's', 's'],
    ['s', 'd', 'd', 's'],
    ['s', 'd', 'd', 'd', 's'],
    ['d', 's', 'd', 'd', 's'],
    ['d', 'd', 's', 'd', 's'],
    ['d', 'd', 'd', 's', 's'],
];

class LookThreeAdjacentTwoDown {
    constructor() {
        this._state = {lastAction: null};
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let action = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_feeler__["a" /* getActionViaFeelers */])(observation, feelerPaths, this._state.lastAction);

        this._state.lastAction = action;

        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LookThreeAdjacentTwoDown;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_rl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);




const actions = [
    'w',
    'a',
    's',
    'd'
];


const numberOfStates = __WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].viewPortSize[0] * __WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].viewPortSize[1];
// create an environment object
var env = {};
env.getNumStates = function () {
    return numberOfStates;
};
env.getMaxNumActions = function () {
    return 4;
};

// create the DQN agent
var spec = {alpha: 0.01}; // see full options on DQN page
let agent = new __WEBPACK_IMPORTED_MODULE_1__helper_rl__["a" /* rl */].DQNAgent(env, spec);

class QLearner {
    constructor() {
        this._lastScore = null;
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        const state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["b" /* matrixToVector */])(observation.costs);

        if (this._lastScore !== null) {
            agent.learn(observation.score - this._lastScore);
        }

        // if(Math.random() < .001){
        //     cxonsole.lxog('q-learning-agent-save-data',JSON.stringify(agent.toJSON()));
        // }

        var actionIndex = agent.act(state);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QLearner;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_rl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_qLearnerSaveData3000__ = __webpack_require__(24);





const actions = [
    'w',
    'a',
    's',
    'd'
];


const numberOfStates = __WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].viewPortSize[0] * __WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].viewPortSize[1];
// create an environment object
var env = {};
env.getNumStates = function () {
    return numberOfStates;
};
env.getMaxNumActions = function () {
    return 4;
};

// create the DQN agent
var spec = {alpha: 0.01}; // see full options on DQN page
let agent = new __WEBPACK_IMPORTED_MODULE_1__helper_rl__["a" /* rl */].DQNAgent(env, spec);
agent.fromJSON(__WEBPACK_IMPORTED_MODULE_3__helper_qLearnerSaveData3000__["a" /* trainedAgentData */]);

class QLearnerPreTrained {
    constructor() {
        this._lastScore = null;
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        const state = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tensorTools__["b" /* matrixToVector */])(observation.costs);

        // if (this._lastScore !== null) {
        //     agent.learn(observation.score - this._lastScore);
        // }

        // if(Math.random() < .001){
        //     cxonsole.lxog('q-learning-agent-save-data',JSON.stringify(agent.toJSON()));
        // }

        var actionIndex = agent.act(state);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        return action;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QLearnerPreTrained;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__HtmlTableRenderer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tensorTools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(0);




function generateTableHtml(size, tableClassName) {
    let html = '';
    for (let y = 0; y < size[1]; y++) {
        html += '<tr>';
        for (let x = 0; x < size[0]; x++) {
            html += '<td class="tile-' + x + '-' + y + '"></td>';
        }
        html += '</tr>';
    }
    return '<table class="' + tableClassName + '">' + html + '</table>';
}

function getTdElements(size, tableClassName) {
    let tdElements = [];
    for (let x = 0; x < size[0]; x++) {
        tdElements[x] = [];
        for (let y = 0; y < size[1]; y++) {
            tdElements[x][y] = document.querySelector('table.' + tableClassName + ' td.tile-' + x + '-' + y);
        }
    }
    return tdElements;
}

class HtmlTableRenderer {
    constructor(containerElement) {
        this.clear();//Call clear to init internal observation properties

        containerElement.innerHTML = '<div class="InfectionGameHtmlTableRender">' +
            '<div>' +
            'Agent View' +
            generateTableHtml(__WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].viewPortSize, 'renderer-table-canvas-agent') +
            '</div>' +
            '<div>' +
            'Environment View' +
            generateTableHtml(__WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].size, 'renderer-table-canvas-god') +
            '</div>' +
            '</div>';

        this._agentTds = getTdElements(__WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].viewPortSize, 'renderer-table-canvas-agent');
        this._godTds = getTdElements(__WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].size, 'renderer-table-canvas-god')
    }

    /**
     * Clears the observation of the renderer causing it to forget any stored observation.
     */
    clear() {
        this._previousPositions = [];
    }

    /**
     * Render the current observation of the environment in HTML
     *
     * @param {AgentObservation} agentObservation
     * @param {State} godObservation
     */
    render(agentObservation, godObservation) {
        //Render the agent view
        for (let x = 0; x < __WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].viewPortSize[0]; x++) {
            for (let y = 0; y < __WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].viewPortSize[1]; y++) {
                let color = {r: 50, g: 50, b: 50};
                // if (agentObservation.visibles[x][y] === 0) {
                //     color = {r: 0, g: 0, b: 0};
                // } else
                if (x == agentObservation.position[0] && y == agentObservation.position[1] && agentObservation.costs[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x == agentObservation.position[0] && y == agentObservation.position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (agentObservation.costs[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                this._agentTds[x][y].style
                    .backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }

        //Render the god view
        for (let y = 0; y < __WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].size[0]; y++) {
            for (let x = 0; x < __WEBPACK_IMPORTED_MODULE_2__environment__["b" /* config */].size[1]; x++) {
                let color = {r: 50, g: 50, b: 50};
                if (x == godObservation.position[0] && y == godObservation.position[1] && godObservation.costs[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x == godObservation.position[0] && y == godObservation.position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (this._previousPositions[x + ',' + y] && godObservation.costs[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 128}
                } else if (this._previousPositions[x + ',' + y]) {
                    color = {r: 0, g: 128, b: 0}
                } else if (godObservation.costs[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                // } else if (godObservation.visibles[x][y] === 0) {
                //     color = {r: 0, g: 0, b: 0};
                // }
                this._godTds[x][y].style
                    .backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }

        this._previousPositions[godObservation.position[0] + ',' + godObservation.position[1]] = true;
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HtmlTableRenderer;



/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(15)
var ieee754 = __webpack_require__(20)
var isArray = __webpack_require__(17)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "#info {\n    margin-right: 2em;\n    /*float: left*/\n}\n\n.InfectionGameHtmlTableRender {\n    /*float: left;*/\n}\n\n.InfectionGameHtmlTableRender table {\n    padding-right: 2em;\n    border-spacing: 0;\n}\n\n.InfectionGameHtmlTableRender > div {\n    float: left;\n    border-spacing: 0;\n    margin-right: 2em;\n}\n\n.InfectionGameHtmlTableRender table.renderer-table-canvas-agent {\n    padding: 10px;\n    background-color: black;\n}\n\n.InfectionGameHtmlTableRender .renderer-table-canvas-god td {\n    height: 5px;\n    width: 5px;\n}\n.InfectionGameHtmlTableRender .renderer-table-canvas-agent td {\n    height: 20px;\n    width: 20px;\n}\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./HtmlTableRenderer.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./HtmlTableRenderer.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
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


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(0);



if (__WEBPACK_IMPORTED_MODULE_0__environment__["b" /* config */].viewPortSize.toString() != [7, 5].toString() || __WEBPACK_IMPORTED_MODULE_0__environment__["b" /* config */].viewPortOffset.toString() != [0, 1].toString()) {
    throw new Error('Trying to use saved agent that was trained on different viewport settings');
}


//This data comes from training on 3000 games

const trainedAgentData = {
    "nh": 100,
    "ns": 35,
    "na": 4,
    "net": {
        "W1": {
            "n": 100,
            "d": 35,
            "w": {
                "0": 1.4282614149081694,
                "1": -0.4749514272952828,
                "2": -0.39344826346954226,
                "3": -1.3568228963455595,
                "4": -0.14348789867395076,
                "5": -0.25351668310502923,
                "6": 2.921433831640392,
                "7": -2.518229163676195,
                "8": -1.66864018688728,
                "9": 1.5980880288534247,
                "10": 1.2613308210562157,
                "11": 0.3845445655197428,
                "12": 0.3868502433781278,
                "13": 1.2576364387661603,
                "14": -1.762459143267604,
                "15": -1.2112945612577126,
                "16": 0.7944835387546223,
                "17": 0.13225234237051045,
                "18": 0.14800365365827178,
                "19": -1.0288247021893435,
                "20": -0.9074156722286978,
                "21": -1.3501444649803906,
                "22": -1.0568244196174283,
                "23": -1.959095676751462,
                "24": -0.8482656145031194,
                "25": 0.009323672497549718,
                "26": -0.005093333937929984,
                "27": -0.009785144967992564,
                "28": 0.002024866079724878,
                "29": 0.0022063558042377273,
                "30": 0.02667681090283867,
                "31": -0.0010380804896473193,
                "32": -0.002191705327162954,
                "33": 0.00412882112402088,
                "34": -0.01440863697722069,
                "35": -0.4856654760311537,
                "36": -0.10934545793618478,
                "37": -0.8830970154020142,
                "38": -0.23111530534987543,
                "39": 0.25928703085086724,
                "40": -1.4336949090960067,
                "41": -0.014388543586945742,
                "42": -0.058358948921036165,
                "43": -1.3491992431043525,
                "44": 0.9507430327842458,
                "45": -0.24810941890594157,
                "46": -0.11021131065876319,
                "47": 0.6861147987126428,
                "48": 0.12296313497231239,
                "49": 0.24635310813481898,
                "50": -0.7238965701450871,
                "51": 1.1534855436841696,
                "52": 0.325592647873972,
                "53": -0.05882553261772425,
                "54": 0.6848828771147996,
                "55": -0.6873299871634918,
                "56": -0.9296350695306352,
                "57": 0.003912194815744729,
                "58": -1.6688019739859432,
                "59": -1.5966339987849527,
                "60": -0.005503868557197589,
                "61": 0.01289817949490847,
                "62": 0.002222755627465137,
                "63": 0.002607025805958664,
                "64": -0.015431678754619753,
                "65": -0.0057329530114910736,
                "66": 0.00896697002994705,
                "67": -0.006781337416986767,
                "68": -0.01186057070285143,
                "69": -0.007729149789751063,
                "70": 0.3278288370834022,
                "71": 0.5691155678825248,
                "72": -0.29381380097095594,
                "73": -0.9904553168363639,
                "74": -1.5819156118143978,
                "75": 0.5742607521296079,
                "76": -2.0013195910139783,
                "77": -1.2284366176405264,
                "78": 0.6585655984826645,
                "79": -0.7283859954216704,
                "80": 0.6288958753488014,
                "81": -1.8119213087607584,
                "82": -0.40032159067529927,
                "83": -1.8787800406261772,
                "84": -1.1264415928506535,
                "85": -0.249611987125576,
                "86": 0.7251649836130251,
                "87": 3.054221833616067,
                "88": -1.4010944360756223,
                "89": 0.21399413487908264,
                "90": -0.971980895657453,
                "91": -0.7209326246885279,
                "92": 3.3744732530536927,
                "93": -3.0086450248524157,
                "94": -0.30527864740354616,
                "95": 0.015588939332115364,
                "96": 0.003439712231739262,
                "97": 0.006772198923367667,
                "98": 0.004896770319040374,
                "99": -0.015573028294198635,
                "100": 0.00015600934913041723,
                "101": 0.013304007247768784,
                "102": -0.01638330882308751,
                "103": -0.015595324453452169,
                "104": 0.002144530861536916,
                "105": 0.9919922068430673,
                "106": 2.059049894125069,
                "107": -0.3350696283537167,
                "108": -0.5732500428337646,
                "109": -0.07836100091712607,
                "110": -1.107224723889686,
                "111": -0.9759167209981213,
                "112": 0.3785990498417031,
                "113": 1.7602191792839224,
                "114": 1.6280101381295498,
                "115": 0.45811960764117104,
                "116": 1.4311570741170236,
                "117": 2.047828577545486,
                "118": 0.3836943962070685,
                "119": -0.0007164884799434486,
                "120": 1.287155979467219,
                "121": 0.6306804911626254,
                "122": -1.1809605292401193,
                "123": 0.16618424598742107,
                "124": -0.7357024335010074,
                "125": 0.2679427749358655,
                "126": -4.214013053741301,
                "127": 0.09540779720503204,
                "128": 0.3384427570525541,
                "129": 0.9602130944374527,
                "130": -0.006781522694306762,
                "131": -0.007349761131881859,
                "132": 0.007876043488191438,
                "133": 0.00929994216731716,
                "134": -0.016645167663540714,
                "135": -0.02141004845751853,
                "136": -0.003270926171321264,
                "137": -0.010581018365098395,
                "138": -0.011071910666288294,
                "139": 0.005921981228305132,
                "140": -0.43713663323659474,
                "141": 0.47306977167907754,
                "142": -0.09577218816364003,
                "143": 0.007698493734371929,
                "144": 0.5331959165575666,
                "145": -1.6138745181964367,
                "146": -1.6753051728802373,
                "147": -0.6111491075832923,
                "148": -1.08385108115011,
                "149": -0.7935058893024022,
                "150": -1.1380940397718788,
                "151": -1.689615824829273,
                "152": 0.05618610993545412,
                "153": -0.7037116318661623,
                "154": 2.503014755738303,
                "155": -1.7324044193244459,
                "156": 0.4394719032604239,
                "157": -0.27236697430513807,
                "158": 0.6350487044205132,
                "159": -0.31812482893669963,
                "160": 0.7017162757299551,
                "161": -3.150867350597892,
                "162": 2.9102970908325196,
                "163": -1.2389807645766406,
                "164": 1.836767076318489,
                "165": 0.01144042385877319,
                "166": -0.014462316226176487,
                "167": 0.008775109474385792,
                "168": 0.0035198870771773745,
                "169": -0.01330157764592001,
                "170": 0.015811422203411262,
                "171": 0.0007222720929660525,
                "172": -0.00006580019039816312,
                "173": -0.005638134302619381,
                "174": 0.001171067240125705,
                "175": 1.883244043717327,
                "176": -0.5218366178598999,
                "177": -1.0878931871828823,
                "178": -1.7858202272722163,
                "179": -1.0322620976260843,
                "180": 0.5475815839035875,
                "181": 0.3647105133305523,
                "182": -0.020201798174289836,
                "183": -0.10874304551468976,
                "184": -1.6445882066942552,
                "185": 0.016414175613965465,
                "186": -1.533329489523795,
                "187": -0.6348494426120759,
                "188": 0.028348105281857033,
                "189": -1.407147009305413,
                "190": 0.4648977024166313,
                "191": -0.2822949503981056,
                "192": 2.9860855927372145,
                "193": -0.8301028860589956,
                "194": -0.5180003256529827,
                "195": 0.694034103802406,
                "196": -1.5677495338349676,
                "197": -0.0017329466324954134,
                "198": -2.0569961803702927,
                "199": -0.013320087774850666,
                "200": 0.007234376027783574,
                "201": 0.0034548372085491507,
                "202": -0.0005456016341118762,
                "203": 0.00022868144951964422,
                "204": -0.001870205339924087,
                "205": 0.0016461001593250522,
                "206": -0.0033176908015457476,
                "207": 0.016213253686057118,
                "208": 0.008861518541377272,
                "209": -0.002975338616296589,
                "210": 0.8208518823383388,
                "211": -0.6126253684618309,
                "212": 0.5629463541202596,
                "213": 0.7147385819389379,
                "214": 0.7383367756256313,
                "215": 0.1397836046714159,
                "216": 0.3563195657573821,
                "217": -0.8156309582091548,
                "218": 0.24736999937293405,
                "219": 1.0261471686789685,
                "220": 2.2288631050196765,
                "221": -1.1757571607996407,
                "222": -0.7822800998138086,
                "223": 1.3702608576163666,
                "224": 0.19116818080485545,
                "225": -0.19831320417004933,
                "226": -1.6150658931901039,
                "227": 0.1198835798150725,
                "228": -1.7579899575107811,
                "229": 1.245234600780676,
                "230": 0.3272994779353894,
                "231": 0.036374152765071666,
                "232": 0.6909869590223467,
                "233": 0.5210367686139591,
                "234": 0.246581751521467,
                "235": -0.009696121726536862,
                "236": 0.003469003813302038,
                "237": -0.016467602229903174,
                "238": -0.0024490900158772025,
                "239": -0.007586548546140887,
                "240": 0.007583174220302243,
                "241": -0.012292158554008187,
                "242": -0.0033457087888424243,
                "243": -0.0019152405680543686,
                "244": -0.006359812837676333,
                "245": 0.6169113616624358,
                "246": 2.4868480843138383,
                "247": -0.4037907970586497,
                "248": -0.8181296373919902,
                "249": -0.18455112589438896,
                "250": 2.009757120956067,
                "251": 0.9050134445336567,
                "252": 0.20891111463028295,
                "253": -0.3761234777393822,
                "254": -0.4455578843246608,
                "255": -0.6268776945007817,
                "256": 0.9333486757678293,
                "257": -2.5563808640100953,
                "258": -1.8478885392611692,
                "259": -1.6692419167988641,
                "260": 1.3788720915364103,
                "261": 0.5583369735180184,
                "262": -1.2505921287080035,
                "263": 0.31222445138304883,
                "264": 1.0383574456523499,
                "265": -1.0122414620709723,
                "266": -0.7295530629623102,
                "267": 3.480300074587913,
                "268": 4.205593567051068,
                "269": 2.72806260316201,
                "270": 0.002593666766791149,
                "271": 0.022107354725020664,
                "272": 0.0060258781642296925,
                "273": -0.01598218131681662,
                "274": -0.01472663498265491,
                "275": -0.00361199996351743,
                "276": -0.014925379084744245,
                "277": -0.012515992684240376,
                "278": 0.00035292637358983327,
                "279": -0.004356324871568274,
                "280": 1.1525059151351524,
                "281": 2.3134351121780172,
                "282": 1.9206704843098332,
                "283": 1.2446619730408734,
                "284": 1.9080239042215683,
                "285": 1.5811904909858474,
                "286": -1.052722703894246,
                "287": 1.3011735526687278,
                "288": 2.5705132851175345,
                "289": 1.4124392493535398,
                "290": -1.289991506817665,
                "291": -0.32960662543744773,
                "292": 0.8142610559052843,
                "293": -0.1669232469939043,
                "294": -1.7289866333027946,
                "295": -1.0888102872116576,
                "296": -2.2001544753107765,
                "297": 1.077125179017461,
                "298": -1.8329555821896113,
                "299": -1.4311889901713595,
                "300": -0.18499405687207485,
                "301": 1.9232066532189063,
                "302": -3.0262297599655636,
                "303": -1.6729128584994892,
                "304": -0.5854736093239246,
                "305": 0.001679775089247082,
                "306": -0.010791410525340647,
                "307": 0.001609304624854594,
                "308": -0.01628456236744993,
                "309": -0.003983911859485496,
                "310": 0.0005954127756480754,
                "311": 0.007675088506028223,
                "312": 0.00004767433654241267,
                "313": -0.020410014385641363,
                "314": -0.001103001250392646,
                "315": -1.0407566058779385,
                "316": -0.3599524952003214,
                "317": 0.21073968798770773,
                "318": 0.03995058922920507,
                "319": 0.3655489012079043,
                "320": -0.08542670432799843,
                "321": 0.6807737761791515,
                "322": -0.7510309979191545,
                "323": -0.33682877609315875,
                "324": -0.425926122886834,
                "325": -0.31453720891256937,
                "326": 0.872472872384818,
                "327": -1.002758720766875,
                "328": -0.4254551281971446,
                "329": -0.6227659699935922,
                "330": 0.1288828091908663,
                "331": -0.45285983594887436,
                "332": -0.24723344409475645,
                "333": -0.304774509325667,
                "334": -1.0485526791233046,
                "335": -0.10692633104954417,
                "336": -0.06052750868740386,
                "337": -0.6008074411715132,
                "338": -0.7470699009757171,
                "339": -0.9771068840210265,
                "340": 0.0020659070227271943,
                "341": -0.010238783912156465,
                "342": 0.013479151515187473,
                "343": 0.005843203992603977,
                "344": -0.008982595998929482,
                "345": 0.0010484108803353366,
                "346": 0.005792871607555689,
                "347": 0.018930482105933937,
                "348": 0.020457766042769228,
                "349": 0.008478526006776807,
                "350": 0.49875190924911555,
                "351": -0.7019801029413226,
                "352": 0.10978681738908128,
                "353": -0.7884343648294116,
                "354": 0.7616631873842786,
                "355": -0.46607932730592966,
                "356": 0.046416145301083865,
                "357": -0.19105131748238577,
                "358": 0.2610391443338299,
                "359": 0.19433889396426543,
                "360": 0.8390746209230839,
                "361": 2.0364001984042295,
                "362": -1.1503069797461574,
                "363": -2.6388022243282263,
                "364": -0.17238461377397413,
                "365": -0.5402510407518992,
                "366": -0.2745118570668242,
                "367": 1.8153129654118045,
                "368": 4.584822472716891,
                "369": 6.433278161492837,
                "370": 1.1965082610786963,
                "371": -0.4445269590656878,
                "372": -0.9686564028092544,
                "373": -0.4151399022134975,
                "374": 0.11237055393264006,
                "375": -0.004955654618746372,
                "376": -0.019862680581878914,
                "377": -0.0037714675737168237,
                "378": -0.00013815457202710448,
                "379": -0.009592800962336622,
                "380": 0.009512426732520457,
                "381": -0.0037355928615216767,
                "382": 0.006445792834358973,
                "383": -0.008971516112616396,
                "384": 0.00151124546222769,
                "385": -0.3086461405808658,
                "386": -0.9389364266279988,
                "387": 0.902314499196808,
                "388": 0.14834362570945556,
                "389": 0.014135527845582356,
                "390": -0.27778834856577916,
                "391": 0.8781167695340982,
                "392": -0.38421944836234034,
                "393": -0.7986552713197659,
                "394": 0.3712502902308135,
                "395": 0.30592094273728326,
                "396": -0.29371930339885066,
                "397": -5.121197165713282,
                "398": -1.5292102691020772,
                "399": -0.6274670576640388,
                "400": -0.06746673531843894,
                "401": -1.1401659572997063,
                "402": -1.5775432329785561,
                "403": 5.577874377046801,
                "404": 1.4456617257982776,
                "405": -0.9052809488342931,
                "406": -0.6105934537955303,
                "407": -2.2236538869599576,
                "408": -1.0170143293685585,
                "409": -0.08052369065470082,
                "410": -0.009334596301474483,
                "411": 0.008877290576594974,
                "412": 0.013790005588288983,
                "413": -0.01376223230502963,
                "414": 0.002690585645468675,
                "415": 0.003241760137428471,
                "416": 0.010902332000364355,
                "417": 0.0072107327523129195,
                "418": 0.0005691047060248326,
                "419": -0.005408211695077554,
                "420": 0.34355652852839097,
                "421": -0.180037126456838,
                "422": 0.35334413646194196,
                "423": 0.2572996671957003,
                "424": 0.3699684113084668,
                "425": 0.06268417890175258,
                "426": 0.46895366952359824,
                "427": 0.000679476178626871,
                "428": 0.10034992588294314,
                "429": 0.35087233842820276,
                "430": -0.3901212823143992,
                "431": 0.39771454150763697,
                "432": 0.503345961471765,
                "433": 0.4715576904351279,
                "434": 0.49706109990022335,
                "435": 0.28411883530881193,
                "436": 0.13969010717148514,
                "437": 0.3431195712192039,
                "438": 0.5147412407705367,
                "439": 0.10079249099633424,
                "440": 0.34753992776101633,
                "441": 0.10352912417234487,
                "442": 0.44737522885711795,
                "443": 0.0889947133180631,
                "444": 0.453809645218678,
                "445": -0.0010468444419075658,
                "446": 0.0018402572046259556,
                "447": 0.0019642034144744308,
                "448": 0.000685422614050046,
                "449": 0.004769630197244075,
                "450": -0.00455112564212409,
                "451": 0.0072956245793407435,
                "452": -0.0015578244193385667,
                "453": 0.011557488875217688,
                "454": -0.01437497689652739,
                "455": -0.8124154316763655,
                "456": -0.11935104224798213,
                "457": -1.4385823438314822,
                "458": -0.16553508107341644,
                "459": 3.3518378378863147,
                "460": -1.452107896440741,
                "461": 1.0833093730526164,
                "462": -0.14605926834188238,
                "463": -2.8912399130572246,
                "464": 1.388521736101375,
                "465": -0.5506724968577055,
                "466": 0.15138264604057178,
                "467": -0.9171099003157442,
                "468": 1.551971315958825,
                "469": -0.15498801422669803,
                "470": 2.187872858036221,
                "471": 2.4170734843756407,
                "472": -1.5015374955340008,
                "473": 0.8272088135372926,
                "474": -1.6707051262578834,
                "475": -1.7863120626988018,
                "476": 0.9893863683902162,
                "477": 0.8122012500961391,
                "478": -0.021660805157800025,
                "479": 1.5530549512406884,
                "480": -0.012764090399003605,
                "481": 0.010146551494665734,
                "482": -0.018437002162654776,
                "483": -0.0001918282568301145,
                "484": -0.0069485907845846006,
                "485": -0.002165634079791123,
                "486": 0.0036174303884726746,
                "487": 0.010119919715932433,
                "488": 0.00960768140627604,
                "489": -0.005403186707352386,
                "490": -0.5159079783514555,
                "491": -0.22821561693393755,
                "492": 0.6688895872755772,
                "493": -0.2991982357245965,
                "494": -0.8776787510176176,
                "495": 0.18179423779935353,
                "496": -1.0553644196255236,
                "497": -0.09670589227825016,
                "498": -0.9553191827645124,
                "499": -1.295226780668478,
                "500": -0.709582352931554,
                "501": -2.963144653551988,
                "502": -0.6075379330119917,
                "503": 0.022920706691640688,
                "504": 0.5647147021338953,
                "505": -0.7761748101178163,
                "506": 0.7477547460449007,
                "507": 3.5091532781211043,
                "508": 0.8540642332159132,
                "509": 2.7343730780180286,
                "510": -0.3336044107477722,
                "511": -2.5434627463066146,
                "512": -0.9453765608968644,
                "513": -2.866008054835266,
                "514": -1.381424436139375,
                "515": -0.000017168920853650794,
                "516": -0.0036352400994667713,
                "517": -0.016844257219164157,
                "518": -0.01168220356030896,
                "519": 0.01843117372047905,
                "520": 0.006818426379568475,
                "521": -0.0020145429467350847,
                "522": 0.0025706340437204774,
                "523": -0.01607140391588324,
                "524": -0.009518491240174511,
                "525": 0.13821302433131114,
                "526": 0.032383585091237926,
                "527": -0.02832171518997431,
                "528": 0.13931965133592913,
                "529": 0.1469411918333499,
                "530": -0.7829743611112913,
                "531": -0.7511458377029396,
                "532": 2.0402114530348823,
                "533": 1.7629607774342368,
                "534": 0.8820184514479903,
                "535": -0.5145782155964808,
                "536": -2.4682358124069097,
                "537": -2.40355105183463,
                "538": -1.8779481337696415,
                "539": -1.2443967457479694,
                "540": 2.537919068538591,
                "541": 0.6944598687740295,
                "542": -1.0880477106043491,
                "543": -0.7018668152522322,
                "544": -0.40326330076891126,
                "545": -0.9741199204447407,
                "546": -0.39576930161675483,
                "547": -0.9304145569441067,
                "548": -0.5821538674525923,
                "549": -0.335777621080614,
                "550": -0.013712453676070968,
                "551": 0.0043072034830138,
                "552": 0.00647817536710296,
                "553": -0.0070528156688191256,
                "554": 0.0031836187128881093,
                "555": -0.0059229882426521645,
                "556": -0.011423731703953171,
                "557": 0.009747825155393654,
                "558": 0.020062269772883022,
                "559": 0.0014483992084321359,
                "560": -0.9312607120883495,
                "561": -1.421745958690931,
                "562": -1.420774943776266,
                "563": 0.2800021949385639,
                "564": -0.7627815650265367,
                "565": -1.4131125317716942,
                "566": -1.1108205384011194,
                "567": -0.0686433205728503,
                "568": -0.31480350239552685,
                "569": -0.5539520277798572,
                "570": 0.9782474546632595,
                "571": -0.7409642084257986,
                "572": -0.244052468229212,
                "573": -0.05142644590568978,
                "574": -0.3674179799513457,
                "575": -0.7094290404113247,
                "576": 0.5713012249700978,
                "577": -1.412763521306199,
                "578": -0.991155269343792,
                "579": -1.11616045104294,
                "580": -1.807786187660206,
                "581": -1.151217799445868,
                "582": 0.7080276594046747,
                "583": 0.07867307434276732,
                "584": 0.5689559102066797,
                "585": -0.015158372075258242,
                "586": -0.014731692796375956,
                "587": 0.005883936569264903,
                "588": -0.013551148827809341,
                "589": -0.0052724989642655585,
                "590": -0.0008275302408412263,
                "591": 0.0009321542949111989,
                "592": 0.0022096742134948854,
                "593": 0.009343112018507307,
                "594": 0.0005632620134164493,
                "595": -0.512494620506687,
                "596": -0.7310745406611029,
                "597": -1.1680641388612496,
                "598": 0.19113020694376315,
                "599": -1.0844312413918413,
                "600": -1.22331115362452,
                "601": 0.6948102465600764,
                "602": -0.45739947884120025,
                "603": -0.26010938776256803,
                "604": -0.8027839409817161,
                "605": 1.698434045666633,
                "606": 0.12125638785905664,
                "607": -0.9108989118897813,
                "608": 0.15433279621967935,
                "609": -2.25582905625946,
                "610": 1.0646353454102795,
                "611": 0.752333698968187,
                "612": 0.13698824658423667,
                "613": -0.4200826847873528,
                "614": -1.0777939161123598,
                "615": -0.7078576966520613,
                "616": 0.5081705383626716,
                "617": 0.5162637383968663,
                "618": -1.1787660827799848,
                "619": -1.1924345130835428,
                "620": -0.02167724802012668,
                "621": -0.009193547002624458,
                "622": 0.00968125740833953,
                "623": -0.007747362485177448,
                "624": 0.014909446693412496,
                "625": -0.013327026349082232,
                "626": 0.01631611258272021,
                "627": 0.0014807883659473298,
                "628": 0.004785126506977512,
                "629": -0.00707818050264858,
                "630": 0.2144285330882199,
                "631": 0.161510458202482,
                "632": 0.20633459104580024,
                "633": 0.15115176596502125,
                "634": 0.1491492553023596,
                "635": 0.15944353694386865,
                "636": 0.2203870499250416,
                "637": 0.2073621413233332,
                "638": 0.15831355137070763,
                "639": 0.14292767354092936,
                "640": 0.16272711755781605,
                "641": 0.29628607435650006,
                "642": 0.2836107151511196,
                "643": 0.1833693697324012,
                "644": 0.17157142567055086,
                "645": 0.11506904292709264,
                "646": 0.01997832909412952,
                "647": 0.06107976054229612,
                "648": 0.16344278184521463,
                "649": 0.11252989776769272,
                "650": 0.21997230297088236,
                "651": 0.3004520475639358,
                "652": 0.3728568793868316,
                "653": 0.17139014541664666,
                "654": 0.11779697857498363,
                "655": 0.004842815096641658,
                "656": 0.007594426825860394,
                "657": -0.005059703462298603,
                "658": -0.0023092330701238754,
                "659": -0.00035840052202658525,
                "660": -0.003180945483012038,
                "661": 0.00681833076475746,
                "662": 0.004420798811518,
                "663": -0.005005910237571159,
                "664": 0.010105273632399499,
                "665": -0.39095110440293207,
                "666": -0.34998486837485,
                "667": -0.09177270253028892,
                "668": -0.31215703253595906,
                "669": -0.7355852526283938,
                "670": 0.1728914790793787,
                "671": 0.12685640964921768,
                "672": 0.7436846434191984,
                "673": 0.8455415553547492,
                "674": 2.023093016320917,
                "675": 0.3465399912931493,
                "676": 0.55007337499972,
                "677": 0.6970399481198174,
                "678": 1.7676111807302959,
                "679": 2.6405130485427386,
                "680": -0.6330695848655086,
                "681": -0.2573963998249249,
                "682": -1.4029728126180154,
                "683": -3.2537775342891813,
                "684": -3.9910373478651624,
                "685": -0.17045758548944423,
                "686": 0.9383952263437301,
                "687": 1.9272414267102242,
                "688": 3.0518183729199904,
                "689": 2.0216094108928484,
                "690": 0.012685471690773116,
                "691": -0.0003330541298456571,
                "692": 0.005375128658954598,
                "693": 0.01018769804072182,
                "694": -0.01073070684495979,
                "695": 0.008752605809055035,
                "696": -0.00829012849086364,
                "697": 0.007925124291810193,
                "698": 0.00493489066785343,
                "699": 0.008741292560138952,
                "700": 0.6714220148563437,
                "701": 1.5364031098877675,
                "702": 0.7585283183189981,
                "703": 1.7077990814782964,
                "704": 0.44699723953271014,
                "705": 0.370314027964702,
                "706": 1.5024509441863685,
                "707": -1.84694975248028,
                "708": 1.082518880127472,
                "709": 0.16567625916435783,
                "710": -0.2628524181113071,
                "711": -3.42371743495502,
                "712": 1.1966411137817334,
                "713": -0.6257240075532714,
                "714": -0.0526271555138067,
                "715": 1.0589124984725404,
                "716": -1.327262727525381,
                "717": 0.26593236015535787,
                "718": 1.471777677286235,
                "719": -1.3408242320309636,
                "720": 0.7861838873192836,
                "721": -1.6535217392010821,
                "722": -0.8554143346825948,
                "723": 0.28276967276971166,
                "724": 0.32305853521789196,
                "725": -0.014165583823155945,
                "726": -0.010821545691809572,
                "727": -0.02237305416359116,
                "728": 0.0006274630372751611,
                "729": 0.0016908273149361646,
                "730": 0.013590564787274209,
                "731": -0.0026571690036296374,
                "732": -0.0012763355288088643,
                "733": -0.02196673789504,
                "734": 0.016670886496863085,
                "735": 0.5379892630313503,
                "736": 0.21031152948804915,
                "737": 0.9319849165996469,
                "738": 0.26624598436782115,
                "739": -0.7509437356694433,
                "740": 0.9805720132009745,
                "741": 1.0290263074876322,
                "742": 0.3207913172896061,
                "743": 0.06477006445165308,
                "744": 0.6930298362378636,
                "745": 0.3520941522237915,
                "746": 0.4870213925564641,
                "747": 0.5236021211385461,
                "748": 0.33544770079006797,
                "749": 0.48264007405439974,
                "750": -0.7275144238487734,
                "751": -0.14573107715283695,
                "752": -0.9874517382585067,
                "753": 0.39840084030541345,
                "754": -0.246587662500049,
                "755": 0.7124905148133122,
                "756": 0.26469468287382086,
                "757": 0.9878472263722053,
                "758": 0.8291300529962198,
                "759": 0.3645854598982933,
                "760": -0.006672038769011594,
                "761": -0.0015274554620355483,
                "762": 0.00566058709747676,
                "763": -0.01334000362917962,
                "764": 0.005347684038570974,
                "765": -0.006285703302692811,
                "766": 0.008310408814096447,
                "767": -0.014031972396800206,
                "768": 0.01416721239859925,
                "769": 0.005242183527889149,
                "770": -0.2740289476668905,
                "771": -0.12306129959408782,
                "772": -0.07916237727409998,
                "773": -0.24752769795644483,
                "774": -0.08535457075507324,
                "775": -0.237774304771968,
                "776": -0.33165786348463283,
                "777": -0.30951355581768886,
                "778": -0.1304889824266627,
                "779": -0.0390578197856313,
                "780": -0.05612231405034959,
                "781": -0.22346756002129886,
                "782": -0.2656387068105997,
                "783": -0.3988581162365417,
                "784": -0.0957240329263131,
                "785": -0.08911478443854684,
                "786": -0.26921127071232465,
                "787": -0.46820748903378656,
                "788": -0.19231110690517875,
                "789": -0.21774853011317652,
                "790": -0.1919898312037479,
                "791": 4.334966179251564,
                "792": -0.3234247945889608,
                "793": -0.12016816264939031,
                "794": -0.21690585966364223,
                "795": -0.007703807392427339,
                "796": 0.001484283381120255,
                "797": -0.02858891706721768,
                "798": -0.005373892309549489,
                "799": -0.0059336160930870555,
                "800": -0.004913724537805343,
                "801": 0.0013772084888267022,
                "802": -0.004721262882702692,
                "803": -0.000020043280976400283,
                "804": -0.0063450168662888265,
                "805": -0.6195303837838095,
                "806": -0.030490137846996085,
                "807": 0.47606639438772475,
                "808": -1.9399448443882723,
                "809": -1.3294338006442712,
                "810": -0.811486685801757,
                "811": -0.015488169173874704,
                "812": 0.09564673783023364,
                "813": -2.3396045910643384,
                "814": -1.0430946560692003,
                "815": 0.7120368800073084,
                "816": 0.27098892693156024,
                "817": -3.08419832548485,
                "818": -0.4832155083161052,
                "819": -2.0019886334409662,
                "820": 0.23976924420499027,
                "821": 0.4244460256961729,
                "822": 3.7618521216170673,
                "823": 0.21207559851228627,
                "824": -0.35122841475971744,
                "825": 2.1274956201993884,
                "826": 2.1501045790272912,
                "827": 1.0528826303147691,
                "828": -0.8593765428255641,
                "829": -0.7532440962691039,
                "830": -0.0015621750165407055,
                "831": -0.01956106981316472,
                "832": 0.014807402629195799,
                "833": 0.0022844560932979113,
                "834": 0.0025994771448977698,
                "835": -0.010861186997027561,
                "836": -0.003908908769378631,
                "837": -0.0017935917049903233,
                "838": 0.004138152273259616,
                "839": -0.004440044267149743,
                "840": -0.19350621974041823,
                "841": -0.19498410845485378,
                "842": 0.1327961775109382,
                "843": -0.09920546579851706,
                "844": 0.2952175380549818,
                "845": -0.34874497663609283,
                "846": -0.5408885922706695,
                "847": -0.3806965770983437,
                "848": -0.4201222044984224,
                "849": -0.4046317443848235,
                "850": -0.5852573073663427,
                "851": 6.096716498677614,
                "852": -0.24987161914728598,
                "853": -0.15426040930686363,
                "854": -0.5990750554882815,
                "855": -0.007647667488838188,
                "856": -0.2754237030356353,
                "857": -0.6667226186044307,
                "858": -0.4824638124464555,
                "859": -0.03307837233286932,
                "860": -0.3723069220225229,
                "861": -0.11342660518098659,
                "862": -0.09483942231965092,
                "863": -0.18489423678401087,
                "864": 0.12673150942655406,
                "865": -0.005478867194448568,
                "866": 0.0009926488398512982,
                "867": -0.008838214696927476,
                "868": 0.00678197020281021,
                "869": -0.028542380434588056,
                "870": -0.008094689560895294,
                "871": -0.010540029542174076,
                "872": -0.0093473890428767,
                "873": -0.0022842925697199225,
                "874": 0.016509682462883514,
                "875": 0.5226381728360383,
                "876": -0.18949536389434152,
                "877": -0.35079854183016523,
                "878": 0.2678012076207025,
                "879": -0.6446218115650532,
                "880": -0.15319442174432701,
                "881": 0.5407393717271519,
                "882": -0.6971891933097885,
                "883": 1.2255011340084097,
                "884": 0.03833370759586695,
                "885": 0.611337859477798,
                "886": 1.719186029859674,
                "887": 1.6905619545419033,
                "888": 0.8453189548249727,
                "889": 1.6643482971539578,
                "890": 1.1826192211733968,
                "891": -0.5596946211242384,
                "892": -0.0714240278315262,
                "893": 1.8016504388501047,
                "894": 0.243374950292974,
                "895": -0.7334119501214614,
                "896": -0.4814106616205104,
                "897": 0.5889836027415366,
                "898": 0.3939729262333028,
                "899": 1.0114442665283645,
                "900": -0.008171634752456025,
                "901": -0.002412614631920139,
                "902": -0.008879011213137089,
                "903": -0.015457293307668221,
                "904": 0.0018931634550156942,
                "905": 0.001795360118341623,
                "906": 0.0070376476101067275,
                "907": -0.015024650182334814,
                "908": 0.009317718401661937,
                "909": -0.02451832769378008,
                "910": -0.28492726888937014,
                "911": -0.24230570121009473,
                "912": -0.00875153137428247,
                "913": 0.4491756136902128,
                "914": -0.09138378344739086,
                "915": -0.5156858089243477,
                "916": -1.8481762978394571,
                "917": -1.8189925367096593,
                "918": -0.7055850646960939,
                "919": -0.34443961926666405,
                "920": 0.4573230615677382,
                "921": -1.8176264024449065,
                "922": -3.635545387271438,
                "923": 0.23205939370324546,
                "924": -0.06731491244193252,
                "925": -0.8862673268460131,
                "926": 0.9290045073325014,
                "927": 5.9646040905941,
                "928": -0.4035938531908721,
                "929": -0.33968234981140943,
                "930": -0.460585120312038,
                "931": -0.5722651634234117,
                "932": -0.32775772603744147,
                "933": -0.5195269661776991,
                "934": 0.2994829463829204,
                "935": 0.0025153681554200206,
                "936": 0.011316242442681543,
                "937": 0.01878294061810866,
                "938": -0.005150459945346276,
                "939": 0.015630650405132483,
                "940": -0.00402933958810013,
                "941": 0.003922938227527376,
                "942": 0.0013185318845620737,
                "943": 0.01271036551909521,
                "944": -0.01475276077265431,
                "945": -0.421842118317879,
                "946": -0.243518021024516,
                "947": 0.11781654247953859,
                "948": -0.6243208651643632,
                "949": -0.49581621164545847,
                "950": -0.3570176400306223,
                "951": -0.18281655655147308,
                "952": -0.731062436238362,
                "953": -0.16647257539921792,
                "954": -0.3089190763972303,
                "955": 0.04876965178636377,
                "956": -0.11492559192484628,
                "957": -1.8702518897944855,
                "958": -1.2044909196278193,
                "959": -1.1121678765584042,
                "960": -0.21672372672543724,
                "961": 0.6255784441328706,
                "962": 0.002099971187130735,
                "963": 1.8322825178182927,
                "964": -0.1013027327503171,
                "965": -0.6798596889560351,
                "966": 6.485811426712598,
                "967": -0.153796693022922,
                "968": 0.6487025315792961,
                "969": -0.02607319901723641,
                "970": -0.007326130331341068,
                "971": -0.012057017968608896,
                "972": -0.005046005673946851,
                "973": 0.0002172425128290128,
                "974": 0.0023641475280798594,
                "975": 0.005365994764222165,
                "976": -0.013495037992420869,
                "977": -0.0000721789262724139,
                "978": -0.008214782591392519,
                "979": 0.00326159367015198,
                "980": -0.4701419522682581,
                "981": 0.3354004184975148,
                "982": -0.6296898271719389,
                "983": 0.08059794930290616,
                "984": -0.3598789680828943,
                "985": 0.08086382908170546,
                "986": -0.7622479203093238,
                "987": -0.853059020732585,
                "988": 0.40511477402476676,
                "989": 0.012302982351505521,
                "990": 0.7205803037071057,
                "991": -0.39698192583312236,
                "992": -0.9365403457799893,
                "993": -0.366194913737487,
                "994": 0.13580863808294524,
                "995": -0.5078888825465181,
                "996": 0.2601409612043215,
                "997": -1.1751272474093948,
                "998": -0.2874430051485671,
                "999": 1.3624910662264547,
                "1000": -0.6789422948449639,
                "1001": -0.9269104811861651,
                "1002": -0.5454383465421452,
                "1003": -0.7789724888922136,
                "1004": -0.18297972864738246,
                "1005": -0.0008432127465657854,
                "1006": 0.003792796975523358,
                "1007": 0.004492017741684155,
                "1008": 0.01099068644515414,
                "1009": -0.004069594404718676,
                "1010": -0.004711711144742995,
                "1011": -0.009845194601672035,
                "1012": 0.0054853729867266115,
                "1013": -0.020663740832242677,
                "1014": -0.00768289589141816,
                "1015": 0.8611811619958204,
                "1016": -0.5590568395236978,
                "1017": 0.8680637894152401,
                "1018": 0.12635647731510002,
                "1019": 0.09087732155001635,
                "1020": -0.21476888779252148,
                "1021": -0.2387761830073492,
                "1022": 0.7864541432092939,
                "1023": 0.19652031820035476,
                "1024": 0.7397110343682838,
                "1025": -0.17839539679273375,
                "1026": -0.14650672603837572,
                "1027": -1.2132777196752202,
                "1028": -0.049274622242616035,
                "1029": -0.12214062533615412,
                "1030": -0.19914138998984104,
                "1031": 0.9062741987163633,
                "1032": -1.3523448826453233,
                "1033": -1.1746835107260734,
                "1034": -1.1117617986547028,
                "1035": 0.5483113688486398,
                "1036": 0.5960765063973905,
                "1037": 5.321068840891474,
                "1038": 4.0484190350349545,
                "1039": 4.024564260398157,
                "1040": 0.0035998475899138307,
                "1041": -0.0025879988463620995,
                "1042": -0.0024605008870870297,
                "1043": -0.018239705610085286,
                "1044": -0.004125781637328941,
                "1045": -0.009728455551272011,
                "1046": -0.005257800179584212,
                "1047": 0.004593926476225516,
                "1048": -0.006566128247471723,
                "1049": 0.0061326614948972085,
                "1050": 0.25794809727733886,
                "1051": 2.452600953177548,
                "1052": 0.40403540764245555,
                "1053": -1.6477054211095943,
                "1054": -0.43794222363811414,
                "1055": 2.6545746002718795,
                "1056": -1.1400740070052549,
                "1057": -2.593649223396747,
                "1058": 0.09229903707079859,
                "1059": 1.4740665954342136,
                "1060": 1.039532915326496,
                "1061": 1.3705533724242027,
                "1062": -1.2658994205815437,
                "1063": -1.350697735587969,
                "1064": -1.4360475391870762,
                "1065": -1.8365490968495617,
                "1066": 1.7588170734738293,
                "1067": -0.19220126730802836,
                "1068": 1.2905801741706107,
                "1069": -0.3018188734966148,
                "1070": -1.0960224414297786,
                "1071": 1.171159699098945,
                "1072": -0.02070037652949112,
                "1073": -0.9528227459707227,
                "1074": -2.858243220981101,
                "1075": 0.018565240696532957,
                "1076": -0.009653434841476204,
                "1077": -0.000635547966402296,
                "1078": 0.006185382773324223,
                "1079": -0.0016418839060327968,
                "1080": 0.004131005143509156,
                "1081": 0.0035180100245229265,
                "1082": -0.02642788606100624,
                "1083": -0.0006092373709986744,
                "1084": -0.00425444248262306,
                "1085": 0.07759882149992678,
                "1086": 0.3065452468739835,
                "1087": 0.5212443868183572,
                "1088": 0.326873606445455,
                "1089": 0.3808555693580185,
                "1090": 0.2763029190222928,
                "1091": 0.33945304257193815,
                "1092": 0.4567192549247843,
                "1093": 0.6023865112954634,
                "1094": 0.29956163035840716,
                "1095": 0.6141016233977157,
                "1096": 0.23456789561784214,
                "1097": 0.32878364808261273,
                "1098": 0.31795344159530053,
                "1099": 0.3918061258762621,
                "1100": 0.02638190709033357,
                "1101": -0.30732216424525133,
                "1102": -0.06942049834184617,
                "1103": -8.266892482399014,
                "1104": 0.2793549032010337,
                "1105": 0.41574348753992324,
                "1106": 0.6259615379067499,
                "1107": -0.11282207522949689,
                "1108": 1.2192957242263778,
                "1109": 0.3116414856014481,
                "1110": 0.001752055698888815,
                "1111": -0.006375322281932637,
                "1112": 0.013799132028006493,
                "1113": 0.008125728651423567,
                "1114": 0.004571091644507594,
                "1115": 0.0014423911997838938,
                "1116": -0.01320040031334296,
                "1117": -0.00039532762572256323,
                "1118": 0.015744848190672737,
                "1119": 0.019997254094139584,
                "1120": 0.7291530297016348,
                "1121": -0.8517999832461752,
                "1122": -0.6030448700394977,
                "1123": 0.253760294011805,
                "1124": 0.3659012643397394,
                "1125": -1.1212327677260678,
                "1126": 0.6138681504594138,
                "1127": 1.460674628864297,
                "1128": -0.04366907683142014,
                "1129": -0.780032715151702,
                "1130": -0.9783523837522637,
                "1131": -0.08362894769444505,
                "1132": 0.2890295257654588,
                "1133": 2.1640509852290797,
                "1134": 1.2003868838284828,
                "1135": 2.0178670605116755,
                "1136": 1.9775372447015893,
                "1137": 0.4594892878089328,
                "1138": -0.7921709806848161,
                "1139": -1.085049247002806,
                "1140": -1.0132099082863493,
                "1141": -2.28217277355952,
                "1142": -1.9239000531646853,
                "1143": 0.9649467804757126,
                "1144": -0.8664248057896855,
                "1145": -0.008346717314589564,
                "1146": 0.004638348266405408,
                "1147": 0.012162320097996534,
                "1148": 0.0015275823644669221,
                "1149": 0.007822815674017701,
                "1150": -0.018543529517828467,
                "1151": -0.01285750785577474,
                "1152": -0.01209263270011289,
                "1153": -0.012932677929611119,
                "1154": -0.001913675518280312,
                "1155": -1.2266853613370532,
                "1156": 0.30127446595932345,
                "1157": 0.7503322354469227,
                "1158": 1.5028526731841525,
                "1159": 0.20523436812814697,
                "1160": 0.41513785647112084,
                "1161": -0.7837022158612477,
                "1162": 1.4348612388260704,
                "1163": 0.09363053332155119,
                "1164": 1.4847952263325843,
                "1165": 0.2626689253423761,
                "1166": -5.701865916718188,
                "1167": -0.38725790671450494,
                "1168": 1.1114325863012913,
                "1169": 0.2157254280485963,
                "1170": 0.7177960602947405,
                "1171": 3.716477120152404,
                "1172": 2.1901118441994614,
                "1173": 0.20603924087099126,
                "1174": -0.9840552878800312,
                "1175": 1.5809735457628167,
                "1176": -1.21863847987357,
                "1177": 0.07346528239957832,
                "1178": 0.5543514444232177,
                "1179": 0.17336345147532395,
                "1180": -0.01228389520471719,
                "1181": -0.00011853948773424599,
                "1182": 0.005918696012753586,
                "1183": -0.001102865540964129,
                "1184": 0.0003707916894057608,
                "1185": 0.011132564297960772,
                "1186": 0.004149664765020445,
                "1187": 0.007215014927003152,
                "1188": 0.004662620303724608,
                "1189": -0.014090984562474755,
                "1190": 0.10630240851678686,
                "1191": 1.7298486198611898,
                "1192": -0.7971395157450154,
                "1193": 3.4152128993517765,
                "1194": 0.42931928886017867,
                "1195": 2.1813683139221207,
                "1196": 0.016990411486828987,
                "1197": 0.15850868046946057,
                "1198": 1.7538557319813808,
                "1199": -0.23515096346573575,
                "1200": 0.9004176937391895,
                "1201": -2.001548611066082,
                "1202": -1.1079273904354623,
                "1203": -1.0619069185327006,
                "1204": -2.2006932521302707,
                "1205": 1.2215470228523586,
                "1206": -1.24881057971647,
                "1207": 0.8120127173700868,
                "1208": 0.7069137444294642,
                "1209": -1.2039195892286678,
                "1210": -0.6173220051344244,
                "1211": 1.9104658384818862,
                "1212": 0.6205375799158925,
                "1213": 1.1203515974091898,
                "1214": -0.6550381431085541,
                "1215": -0.012686733596460465,
                "1216": -0.010648615933669787,
                "1217": 0.005118712156202434,
                "1218": -0.000935412215952102,
                "1219": -0.009537021620469209,
                "1220": -0.02689377935953131,
                "1221": -0.0040309946778256415,
                "1222": 0.002435913772819225,
                "1223": -0.006205574744790589,
                "1224": -0.007836860739945354,
                "1225": 1.2632017587316264,
                "1226": 0.34680763937743747,
                "1227": 0.9914002369431794,
                "1228": -0.10950480103061984,
                "1229": 0.45793933710103535,
                "1230": 0.8113422623504889,
                "1231": 1.0615560851063872,
                "1232": 0.5912419544496195,
                "1233": -0.18855682725954506,
                "1234": -0.3358380084603697,
                "1235": 0.9234157640572094,
                "1236": 0.48823910216928224,
                "1237": 1.0438768221787387,
                "1238": -0.2042044950979274,
                "1239": -0.6894943923704226,
                "1240": 0.9713439801713674,
                "1241": -1.0671525610847294,
                "1242": -0.1373750499589307,
                "1243": 0.2502485925163491,
                "1244": -0.5347939752096473,
                "1245": 1.180761238256669,
                "1246": 1.3065981131901194,
                "1247": 1.2967308302021208,
                "1248": 0.8922876766490488,
                "1249": 0.47731311485185224,
                "1250": 0.010507037422612265,
                "1251": -0.007116815784464248,
                "1252": -0.002746528387634359,
                "1253": -0.0032795199071560333,
                "1254": -0.018417225494931164,
                "1255": -0.010182104014327556,
                "1256": -0.009792380638081143,
                "1257": -0.027584816962939813,
                "1258": 0.005862380651611435,
                "1259": -0.006079626189028885,
                "1260": 0.620535987376595,
                "1261": -0.136046727067951,
                "1262": -0.3155665803974048,
                "1263": -0.23527392412425646,
                "1264": 0.03139574928648261,
                "1265": -0.4462179735437305,
                "1266": -0.004211468375346488,
                "1267": 0.6744301686072759,
                "1268": 0.36269791425927744,
                "1269": 0.3239895394322354,
                "1270": -1.0305157828553255,
                "1271": 0.4584605330678678,
                "1272": 1.52267049358212,
                "1273": -1.2021329484545369,
                "1274": -0.24395406584249457,
                "1275": 0.959708794334119,
                "1276": 0.7172566293786726,
                "1277": 1.1749366045938776,
                "1278": 3.6757946065902805,
                "1279": -2.2090975197103533,
                "1280": 0.5033315371147549,
                "1281": 1.8072299936824179,
                "1282": 0.3897917373705304,
                "1283": -0.19191605909333723,
                "1284": 0.30487285484877286,
                "1285": 0.045625577528283,
                "1286": -0.004467896127463893,
                "1287": 0.01153511333168471,
                "1288": -0.015494415682937926,
                "1289": 0.006290438250861471,
                "1290": -0.00013788213547238662,
                "1291": 0.019112492453596974,
                "1292": 0.008689181903236113,
                "1293": 0.0016999506018214978,
                "1294": 0.006202271402790228,
                "1295": -2.5441221863542283,
                "1296": -0.751477839403598,
                "1297": 0.3336192868467159,
                "1298": 0.842169568792027,
                "1299": -0.8859488299217161,
                "1300": 0.4924871839722313,
                "1301": 0.060011978873622376,
                "1302": -1.5743279480840258,
                "1303": -0.037387325071705876,
                "1304": 2.5663995466833844,
                "1305": -0.05860703679670783,
                "1306": -0.6602341833938892,
                "1307": -0.03566256551025872,
                "1308": 0.810373673024874,
                "1309": -0.15726124532496694,
                "1310": 0.8427249907799497,
                "1311": 0.9156470428883902,
                "1312": 1.6073639208139792,
                "1313": 4.446531444157588,
                "1314": 2.8337939594857384,
                "1315": -0.9508410707178097,
                "1316": 1.5863240884491927,
                "1317": -2.374439190009147,
                "1318": -0.8487194197327146,
                "1319": 0.17884278624796504,
                "1320": -0.0034262031185483687,
                "1321": 0.003966280443487639,
                "1322": -0.0037004814907963778,
                "1323": -0.021458280347494904,
                "1324": -0.0004421126127001346,
                "1325": 0.0001568072117866819,
                "1326": -0.001195954006168777,
                "1327": 0.008923463200869905,
                "1328": -0.00692825727664945,
                "1329": -0.009078135157603253,
                "1330": -0.2581623781719256,
                "1331": 0.5205327997215395,
                "1332": -0.882396919847483,
                "1333": 1.981357147836183,
                "1334": 1.9160472570570057,
                "1335": 1.400874572784712,
                "1336": 1.7564085961829283,
                "1337": 0.2813276227698274,
                "1338": -0.33371792300996295,
                "1339": 1.6610803946656572,
                "1340": 2.209736329147306,
                "1341": 1.1754097583070022,
                "1342": -0.009830892329261869,
                "1343": 0.7892723036093271,
                "1344": 0.4075434833846383,
                "1345": 1.3191225767793895,
                "1346": -2.1190359277428628,
                "1347": 1.9012056311318546,
                "1348": -4.302266507850792,
                "1349": -0.1742384409037693,
                "1350": 1.1825032162169944,
                "1351": 2.3422815506339045,
                "1352": -1.5018639690188667,
                "1353": -1.492076260102471,
                "1354": -0.5746733711640271,
                "1355": -0.005484778553442596,
                "1356": -0.030024204965691376,
                "1357": -0.011656598697904348,
                "1358": 0.011905260648224994,
                "1359": 0.004077288531070349,
                "1360": 0.0021679473864905812,
                "1361": -0.003965365325005922,
                "1362": -0.010342299418148314,
                "1363": -0.006767546891742359,
                "1364": -0.001163792106793176,
                "1365": 0.473556484262386,
                "1366": -0.43282449006443147,
                "1367": -0.7283003529261879,
                "1368": -0.369538812455469,
                "1369": 0.3062263830147745,
                "1370": 1.5670442200646053,
                "1371": 0.5860857886312326,
                "1372": -2.7318593059591834,
                "1373": 0.641973363246438,
                "1374": -1.0063818064756394,
                "1375": -0.09127058346060021,
                "1376": -0.5694648214046856,
                "1377": -1.3896869126848144,
                "1378": -2.113126083063059,
                "1379": 1.4134184015976392,
                "1380": 3.221041051085835,
                "1381": 0.6768134965959709,
                "1382": 0.6102044769143957,
                "1383": -0.5839235643091001,
                "1384": 0.5983974136688511,
                "1385": -1.7774696249628268,
                "1386": 2.922178540782291,
                "1387": 1.7398676996815234,
                "1388": -0.2614558263630129,
                "1389": -0.17091109074105165,
                "1390": 0.013879501007764111,
                "1391": -0.0008595971205846496,
                "1392": 0.008917665815852007,
                "1393": 0.02150561748840691,
                "1394": 0.003355363575301763,
                "1395": -0.0028087200375902,
                "1396": 0.008366630077208516,
                "1397": 0.01514814191004271,
                "1398": -0.0096841991262851,
                "1399": 0.017301077545392493,
                "1400": -0.3848766847867869,
                "1401": -0.2971143593322633,
                "1402": -0.5106125711649772,
                "1403": -0.12004707733533158,
                "1404": -0.16531530454917914,
                "1405": -0.30584023327683324,
                "1406": -0.5570010478759629,
                "1407": -0.2884850693647336,
                "1408": -0.2246515313807633,
                "1409": -0.32231151097600974,
                "1410": -0.3625310201052543,
                "1411": -0.32620420822436264,
                "1412": -0.3728693924369361,
                "1413": -0.31683781212625767,
                "1414": -0.24736194557992894,
                "1415": -0.1788061311135841,
                "1416": 0.15005159566833684,
                "1417": 0.1918685379143689,
                "1418": -0.24214957630880596,
                "1419": -0.1704836782962024,
                "1420": -0.455095025956995,
                "1421": -0.5307664159891681,
                "1422": -0.7815083076488689,
                "1423": -0.296949076834201,
                "1424": -0.18472954403062225,
                "1425": -0.008246571604364497,
                "1426": 0.01173013660290739,
                "1427": 0.013542817110703303,
                "1428": -0.00030582248562579655,
                "1429": 0.017066269022949082,
                "1430": -0.001565745692219215,
                "1431": 0.003500201910336329,
                "1432": -0.005482130482126384,
                "1433": 0.009609333445993162,
                "1434": 0.018869565353987743,
                "1435": -0.11387969151758416,
                "1436": 0.3023757913664323,
                "1437": 0.0031391087649232535,
                "1438": 1.7381638264836459,
                "1439": -0.7214840698071127,
                "1440": -0.20318831804052317,
                "1441": 0.046043586375835,
                "1442": 0.29995522080151915,
                "1443": 0.1521206035191432,
                "1444": 1.5784072643691345,
                "1445": 0.40113568676468847,
                "1446": 0.16731389940886118,
                "1447": -0.4263873264085673,
                "1448": 1.4787096789561764,
                "1449": -0.5630109099124316,
                "1450": -1.1159249822669597,
                "1451": -1.4526205096882148,
                "1452": -0.09015034065248381,
                "1453": 0.42039135519880017,
                "1454": -2.016874183793594,
                "1455": -1.159580329665489,
                "1456": 0.08100393475606323,
                "1457": 0.6177949166808852,
                "1458": 1.8928721026676285,
                "1459": 1.819145469638708,
                "1460": 0.008025961538904386,
                "1461": -0.0013100225924334958,
                "1462": 0.00016780144988924638,
                "1463": 0.0014696367951723972,
                "1464": -0.009596042204658954,
                "1465": -0.004979483049085251,
                "1466": 0.006972832966172313,
                "1467": 0.016523154971113004,
                "1468": -0.008009268409485322,
                "1469": 0.00975685788695703,
                "1470": 1.2612401540218443,
                "1471": -0.6755851161178665,
                "1472": -0.740549055492353,
                "1473": -0.1055899690097296,
                "1474": 1.102996532037304,
                "1475": 0.019249700077910183,
                "1476": 0.2113996579833303,
                "1477": 1.5908681779000928,
                "1478": -0.16838457622120703,
                "1479": -0.8167672018027164,
                "1480": 0.795384811074321,
                "1481": -0.9649512074044575,
                "1482": 1.6785173571882432,
                "1483": 0.9455672435062256,
                "1484": 2.388084281640691,
                "1485": -5.118453449555235,
                "1486": -0.9847352028886026,
                "1487": -1.681536367299644,
                "1488": 2.6004752659095676,
                "1489": -0.25387401884383526,
                "1490": -1.2112701633178429,
                "1491": 0.982568732667113,
                "1492": -0.04168708027538407,
                "1493": 2.460102102853327,
                "1494": 0.2969949806768857,
                "1495": 0.005429852166007664,
                "1496": 0.00036807581350067713,
                "1497": -0.01040761818741303,
                "1498": -0.01225597514612407,
                "1499": -0.0023781497426829533,
                "1500": -0.01082540048885988,
                "1501": 0.0024614846116015293,
                "1502": 0.007073746964045897,
                "1503": 0.0018184740925176793,
                "1504": -0.011816968686387508,
                "1505": -0.15839479383053698,
                "1506": 0.8505787063662705,
                "1507": 0.7770791781612553,
                "1508": 1.5270909327264448,
                "1509": -1.7416223008587541,
                "1510": 1.01468700208261,
                "1511": 2.343364111747162,
                "1512": -0.6194411815806778,
                "1513": -0.3746357305582619,
                "1514": 0.9983899167131481,
                "1515": -1.3551534651510666,
                "1516": -0.7541635545496279,
                "1517": 2.6868695003516883,
                "1518": -0.6048209763023619,
                "1519": 0.4190372173153254,
                "1520": 2.6255778737469986,
                "1521": -0.08753493527213826,
                "1522": -3.209107678672099,
                "1523": -2.704602876285509,
                "1524": 0.2444978164717309,
                "1525": -1.2607243734838254,
                "1526": -0.5876099577872598,
                "1527": 1.600309696986327,
                "1528": -0.1431304124200719,
                "1529": 1.9354918806786356,
                "1530": 0.0190416014865411,
                "1531": 0.003588633791266617,
                "1532": 0.016566245379086728,
                "1533": -0.003217627931556082,
                "1534": 0.002454199169923664,
                "1535": 0.0026387959959974666,
                "1536": -0.011770029710089051,
                "1537": -0.008139833491085784,
                "1538": 0.00000294498114073082,
                "1539": 0.012181944417718091,
                "1540": 2.4153905698889866,
                "1541": -1.5281078282068974,
                "1542": 2.517405521457791,
                "1543": 0.7342979139300985,
                "1544": -1.1130702981828606,
                "1545": 1.955996821864585,
                "1546": -0.43090468000880605,
                "1547": -1.4343535458168686,
                "1548": -1.389721932934221,
                "1549": -0.5655397393142938,
                "1550": 0.7718750147158592,
                "1551": 1.7481938553270935,
                "1552": -0.2875652277587547,
                "1553": 0.31050091346701186,
                "1554": 1.480582844082996,
                "1555": 1.912452143904209,
                "1556": 1.0634126707839882,
                "1557": -2.19970091576414,
                "1558": 0.6344989795011396,
                "1559": -1.3777718250220727,
                "1560": 0.07053887898105958,
                "1561": -1.1454266149380634,
                "1562": -0.25776442693806606,
                "1563": 0.7892818362543034,
                "1564": 0.5083140792379395,
                "1565": -0.014639023900208282,
                "1566": -0.00006224697020627689,
                "1567": -0.004529273310086373,
                "1568": 0.016841514009217733,
                "1569": 0.0035796262268933217,
                "1570": 0.03337499988204622,
                "1571": 0.01639554324661173,
                "1572": -0.0031226943872443673,
                "1573": 0.0059731438835519644,
                "1574": 0.01757198720366749,
                "1575": 0.43844320287933675,
                "1576": -0.15169452463067035,
                "1577": 0.19051849131653495,
                "1578": -0.2184091741040609,
                "1579": -0.4125407535061625,
                "1580": 0.5814287362766162,
                "1581": -1.8000953399649946,
                "1582": 0.36087541821367997,
                "1583": 0.823997237401958,
                "1584": 1.2361351725778207,
                "1585": -0.1872378193720134,
                "1586": 1.025926981191804,
                "1587": -1.1277758186275075,
                "1588": 0.23835473707121047,
                "1589": 0.028956117867693417,
                "1590": -1.3318753599058173,
                "1591": -0.825041245837918,
                "1592": -1.0957829956497982,
                "1593": -0.7246739641289067,
                "1594": 0.6374751302809099,
                "1595": -0.13342342922719547,
                "1596": 0.908659597278553,
                "1597": -0.3012889267830079,
                "1598": 0.626178552456661,
                "1599": -0.7600924085777369,
                "1600": 0.008723915847743648,
                "1601": -0.011372375681610676,
                "1602": 0.013832010699464612,
                "1603": 0.009375226800524104,
                "1604": 0.011032381148791445,
                "1605": -0.0026365096859619365,
                "1606": -0.00817079679619244,
                "1607": 0.020654558538864817,
                "1608": 0.0241851589384786,
                "1609": 0.008589121208399737,
                "1610": -1.2665978031963356,
                "1611": 0.9575839264983385,
                "1612": 0.9060763528429485,
                "1613": 0.006848123802301053,
                "1614": 3.935613193170202,
                "1615": -1.2722697730469923,
                "1616": -0.8835149792604008,
                "1617": 0.4536978207618032,
                "1618": 0.587176512556728,
                "1619": 0.3163400298286476,
                "1620": 1.4187416158755957,
                "1621": -2.673334290343385,
                "1622": -0.8286418733907859,
                "1623": 1.423102176890225,
                "1624": 1.1894445415115749,
                "1625": -0.290687674897756,
                "1626": -0.584511534912788,
                "1627": 0.7402594693157046,
                "1628": 0.8427741957212307,
                "1629": 0.38729757973782036,
                "1630": 0.24121010494405914,
                "1631": 1.7628162396916123,
                "1632": -1.5897302984500787,
                "1633": -1.6177237869227021,
                "1634": 1.9804073201606032,
                "1635": -0.012165642115808702,
                "1636": 0.00224199088786984,
                "1637": 0.004031003502619585,
                "1638": -0.008369077591026562,
                "1639": -0.01412026980977666,
                "1640": 0.0014841328100833667,
                "1641": 0.009098590859580744,
                "1642": 0.000018043026244766346,
                "1643": 0.003813974844210893,
                "1644": 0.0004712604420191863,
                "1645": -1.6913553496012033,
                "1646": 0.1162504590600723,
                "1647": -0.0212099058677529,
                "1648": 0.2629365230543757,
                "1649": 0.4141248886466148,
                "1650": -1.1106622969599906,
                "1651": -1.5916027504439978,
                "1652": -1.055633657158864,
                "1653": 0.3099245748390792,
                "1654": -0.7203881250986861,
                "1655": -1.2037457767410367,
                "1656": 1.3528852632175692,
                "1657": -1.1300434250324627,
                "1658": -1.0025148171699723,
                "1659": -0.8618705044744207,
                "1660": -1.6128820162956423,
                "1661": -1.0206384337949868,
                "1662": 3.9197643533494335,
                "1663": 4.532078364080167,
                "1664": 1.499379566033825,
                "1665": 0.5519814427366131,
                "1666": -0.6928756370973612,
                "1667": -3.028517147676031,
                "1668": 0.01121938980328328,
                "1669": -0.6029462771245354,
                "1670": 0.004023303097027127,
                "1671": -0.000031459919938657164,
                "1672": 0.01060875239066895,
                "1673": -0.015173476053942366,
                "1674": 0.0012729360502803605,
                "1675": -0.011356638587208605,
                "1676": -0.009106441209877428,
                "1677": 0.008143796447388081,
                "1678": -0.01659367862471272,
                "1679": -0.012784586701363,
                "1680": -0.5134256215521852,
                "1681": 0.07067593030831743,
                "1682": -0.74945142656916,
                "1683": 0.5287260219656345,
                "1684": -0.3973354880389508,
                "1685": -0.44322734234806443,
                "1686": -0.926454580545613,
                "1687": -0.4471232199103216,
                "1688": -0.2700866105920764,
                "1689": -0.7041572121059856,
                "1690": -0.5210871728819175,
                "1691": -1.5228605133899076,
                "1692": -0.8106817317680024,
                "1693": 0.2629291383315041,
                "1694": 0.015246062701458472,
                "1695": 0.17597954237769037,
                "1696": 0.2210394943702238,
                "1697": 1.6152645172362945,
                "1698": 7.7493619514532135,
                "1699": 3.514580518596732,
                "1700": 0.13102763809936926,
                "1701": -0.6783856428203277,
                "1702": -1.7270218352596456,
                "1703": 1.3631962868671237,
                "1704": 0.24850258822938215,
                "1705": 0.013892098749410851,
                "1706": -0.008594945432802236,
                "1707": 0.019689095789897797,
                "1708": -0.010109867298886369,
                "1709": 0.009376690113382671,
                "1710": -0.019820289951016427,
                "1711": -0.0012713040647506276,
                "1712": -0.008808384133548279,
                "1713": 0.01836040835037858,
                "1714": 0.003124444691986351,
                "1715": 0.4979095937016435,
                "1716": -0.869948840933676,
                "1717": 1.9486718968330738,
                "1718": 1.3981717817434707,
                "1719": 1.1597836930708538,
                "1720": -0.7891552018780289,
                "1721": 0.16889840940703144,
                "1722": -0.9518843836779973,
                "1723": 0.8407135239875345,
                "1724": -0.6186900093589617,
                "1725": 1.113661139898942,
                "1726": -3.063659553067288,
                "1727": 0.8977680867941509,
                "1728": 0.23833109623862647,
                "1729": -3.1671310740148217,
                "1730": -0.15021487363167804,
                "1731": 0.35607619906175275,
                "1732": 0.776518866974493,
                "1733": 2.2939675378726685,
                "1734": 0.06995965350953319,
                "1735": 0.32770709959254013,
                "1736": 0.5328999350401863,
                "1737": 1.626133313152554,
                "1738": 1.9485190353208437,
                "1739": -0.6328612484731446,
                "1740": -0.0054759788828933655,
                "1741": -0.0009521492661117158,
                "1742": 0.007052074314311813,
                "1743": -0.014235677452937483,
                "1744": 0.012391874623475005,
                "1745": 0.0000649572592708673,
                "1746": 0.01510320150017992,
                "1747": 0.004409358332247675,
                "1748": 0.0076459028578018005,
                "1749": 0.0070960666087499045,
                "1750": 0.6086098563818836,
                "1751": 0.9225803035993961,
                "1752": 1.5640518937942187,
                "1753": -2.024373224413008,
                "1754": -0.5448304411614913,
                "1755": 0.1242715677455725,
                "1756": -1.7668343157590318,
                "1757": -1.9082513223535387,
                "1758": -0.26352045076273606,
                "1759": -1.4490071999881946,
                "1760": 0.4700006646754453,
                "1761": -1.163639067668136,
                "1762": 1.290735998941753,
                "1763": 2.046662069175028,
                "1764": 0.25344667165699075,
                "1765": -0.11318929813612975,
                "1766": 0.9022777529686886,
                "1767": 0.28638800701020556,
                "1768": -0.5096758125278815,
                "1769": -0.4362276098932449,
                "1770": -1.6514061014045267,
                "1771": 2.3828245089740916,
                "1772": 2.741734695661666,
                "1773": 2.5134931313490503,
                "1774": -0.7551971997312767,
                "1775": 0.0033276126349461354,
                "1776": 0.010235461442768583,
                "1777": 0.014043268137349454,
                "1778": 0.015140109566936398,
                "1779": 0.0010525602870829934,
                "1780": -0.0027163337223125262,
                "1781": -0.000012210175022163215,
                "1782": 0.004534734536783768,
                "1783": -0.01219973802696825,
                "1784": 0.007847153589019737,
                "1785": 0.3012346611618272,
                "1786": -1.2190764514405028,
                "1787": 2.2308143326056027,
                "1788": -0.2541037721480561,
                "1789": -0.1824660303136047,
                "1790": -1.9338093763634525,
                "1791": 0.026495653581583067,
                "1792": 0.16189508892594806,
                "1793": -0.7159880548635507,
                "1794": -0.9180970690683756,
                "1795": -3.2446368895808826,
                "1796": 2.0324864226320782,
                "1797": 0.32395585798631366,
                "1798": -0.0025672915684452177,
                "1799": 1.7113992340497075,
                "1800": -3.565404767606282,
                "1801": -0.731092347638992,
                "1802": -1.587971615859202,
                "1803": -1.3483137444300182,
                "1804": 1.103446453293029,
                "1805": -0.5660426249155689,
                "1806": -0.8370780244257521,
                "1807": 0.6191157899776695,
                "1808": -0.43841205552331813,
                "1809": 2.066761267514518,
                "1810": -0.010080534972097295,
                "1811": 0.005367724584368889,
                "1812": 0.007473748035531865,
                "1813": -0.004935407526480828,
                "1814": 0.019463151802238062,
                "1815": -0.007984181363572599,
                "1816": -0.007095361473433536,
                "1817": 0.002530689635940437,
                "1818": 0.008200927308899599,
                "1819": -0.007440851146783594,
                "1820": -0.009024878387198542,
                "1821": 0.5432743275817138,
                "1822": -0.6042485824072006,
                "1823": -0.19538250151986525,
                "1824": -0.2288099739033006,
                "1825": -0.6828640602706635,
                "1826": 0.45242262153646357,
                "1827": -0.40916345990682856,
                "1828": -0.5998927417203642,
                "1829": 0.39061823266902834,
                "1830": -0.6067138238304222,
                "1831": -0.3762560767223647,
                "1832": -0.5976604093103564,
                "1833": -0.5952172460625493,
                "1834": -0.4657741944192285,
                "1835": -0.1387137384183853,
                "1836": -0.3550523425121833,
                "1837": -0.7657739925178505,
                "1838": -0.7006028501943561,
                "1839": -0.8091936453186089,
                "1840": -0.15341267995085636,
                "1841": -0.7746637447796682,
                "1842": -0.4178821573491244,
                "1843": -0.5590202741476651,
                "1844": -0.006516938015030404,
                "1845": 0.007496485805938832,
                "1846": 0.018026675089335694,
                "1847": -0.022852698748915077,
                "1848": -0.020394427225266767,
                "1849": 0.008528656531870387,
                "1850": -0.008313637467988183,
                "1851": -0.013187663910854425,
                "1852": -0.011664194401384614,
                "1853": 0.0003715473112616859,
                "1854": -0.0029897892426819332,
                "1855": -0.5724368130544519,
                "1856": 0.016670492790492528,
                "1857": 1.015629164272963,
                "1858": -1.6222650553259257,
                "1859": 0.46489879415240093,
                "1860": 0.4361582477899388,
                "1861": 0.6626950950564487,
                "1862": -0.6253845102165938,
                "1863": 0.667870737238489,
                "1864": -0.8420517418826605,
                "1865": -1.0203863813553051,
                "1866": 0.05006579898178346,
                "1867": 0.9535463455366419,
                "1868": 1.5830462777637042,
                "1869": 0.5203128039024877,
                "1870": 0.9109668226096781,
                "1871": -0.8447705439110641,
                "1872": -0.19373811016434422,
                "1873": 1.893374126038413,
                "1874": -1.3998249199731119,
                "1875": -0.2949754207127902,
                "1876": 0.36605386979605903,
                "1877": 1.6293780293161306,
                "1878": -1.1952370431921726,
                "1879": 0.935291922758648,
                "1880": 0.008857524720381291,
                "1881": 0.015713977590275208,
                "1882": 0.012983104259635343,
                "1883": -0.014345073385803634,
                "1884": -0.0039008093632331223,
                "1885": -0.0041518453190533215,
                "1886": -0.001538975785022726,
                "1887": 0.004340230605776234,
                "1888": -0.013262438418355461,
                "1889": -0.018342217623122554,
                "1890": 2.1324053447585096,
                "1891": -0.6285298043648753,
                "1892": -0.21552217970376988,
                "1893": 0.2664992039094676,
                "1894": 1.2584535052398893,
                "1895": 0.571348489987012,
                "1896": 1.0081452749802302,
                "1897": 0.4335535425870531,
                "1898": 2.2841771014513634,
                "1899": -0.6892239128021256,
                "1900": -0.336873527928788,
                "1901": -0.25374561707094295,
                "1902": 2.766670428758244,
                "1903": 1.0685037533783426,
                "1904": 0.6818543007682624,
                "1905": 1.378480866298391,
                "1906": -1.5529229610509796,
                "1907": -1.5166684086197713,
                "1908": -1.075152140811028,
                "1909": 0.887529353941914,
                "1910": 1.3501616693388978,
                "1911": 0.7304971209862318,
                "1912": -2.306156539632048,
                "1913": 0.09664742452213314,
                "1914": -0.19628051624348736,
                "1915": 0.005864950012455541,
                "1916": 0.002300479587039025,
                "1917": -0.009312065140343623,
                "1918": 0.004332972419646879,
                "1919": 0.008926171129593055,
                "1920": -0.009142488140881254,
                "1921": -0.0025056968524469494,
                "1922": 0.009523574931217485,
                "1923": 0.0025290525677795833,
                "1924": -0.017116958946129916,
                "1925": -0.15496325849300618,
                "1926": -0.8025390868819928,
                "1927": 0.03779540598839578,
                "1928": -0.3857687415238319,
                "1929": 0.0061596912411717815,
                "1930": 0.514123275809793,
                "1931": -0.33643485541606977,
                "1932": -1.0827957064956142,
                "1933": -0.9486255450575223,
                "1934": -0.2176621888490524,
                "1935": 0.675770161718568,
                "1936": 0.6323636724211789,
                "1937": -5.720091672722719,
                "1938": -5.079767816515619,
                "1939": -0.445799157045703,
                "1940": -0.3970556012840168,
                "1941": -0.6334810970263179,
                "1942": 2.3606728803894277,
                "1943": 1.7021364756985864,
                "1944": 0.2180692225435232,
                "1945": 0.3623536283167595,
                "1946": 0.1029988845598411,
                "1947": 0.6338697063269009,
                "1948": 1.1658561205177973,
                "1949": -0.23780903296929112,
                "1950": 0.0017436862933329252,
                "1951": -0.007555080328159567,
                "1952": -0.01096549898822435,
                "1953": -0.009077244985094388,
                "1954": -0.025383175127208692,
                "1955": 0.007065533734341156,
                "1956": 0.007988485272980328,
                "1957": -0.014252519622645666,
                "1958": 0.0011355688634957929,
                "1959": 0.002949736885671892,
                "1960": -0.6080546956897721,
                "1961": 0.18113303705664735,
                "1962": 0.24716030370732,
                "1963": 0.055613794216985944,
                "1964": 0.5235497197053348,
                "1965": 0.05515809361203599,
                "1966": 0.32435981601415864,
                "1967": 0.1890856830411076,
                "1968": 0.04891955544014749,
                "1969": 0.6026073946886509,
                "1970": -0.033424071229329395,
                "1971": 0.1583312399807306,
                "1972": 0.8137031709958996,
                "1973": 0.3115658311102357,
                "1974": 0.6569109210592108,
                "1975": 0.13859203550605637,
                "1976": 0.41534717503688356,
                "1977": -0.41747770579232607,
                "1978": -4.052517593552135,
                "1979": 0.6484334193397189,
                "1980": 0.3953740539181983,
                "1981": 0.24687060025622928,
                "1982": 3.2495392330059922,
                "1983": 4.086075064706316,
                "1984": 2.2620051018911824,
                "1985": 0.0015245339714792217,
                "1986": 0.004738226938119597,
                "1987": 0.008759472289273712,
                "1988": -0.018236743886794967,
                "1989": 0.010219085709973916,
                "1990": -0.011443869699862576,
                "1991": -0.012811679656177095,
                "1992": -0.011505197136485882,
                "1993": -0.004488658583944121,
                "1994": 0.005427242777530139,
                "1995": -0.8597264756143781,
                "1996": -0.377473467307465,
                "1997": -0.2585905719584645,
                "1998": -1.9874000772278064,
                "1999": 0.07885758631459475,
                "2000": -0.2936256324765041,
                "2001": -0.3854628779847857,
                "2002": -0.9526986198838964,
                "2003": -0.6708768664015191,
                "2004": -0.4189385311610476,
                "2005": -0.8818556696789699,
                "2006": -0.7629562176859982,
                "2007": -0.1843338404966617,
                "2008": 0.7566782894777483,
                "2009": 0.6286024798617754,
                "2010": 0.3923424504762837,
                "2011": -1.1538472074447907,
                "2012": 1.6199884859083358,
                "2013": -0.899232708411502,
                "2014": -0.7915086549288107,
                "2015": -0.4743214907691924,
                "2016": -1.7253072593684533,
                "2017": -0.13280347319597952,
                "2018": 1.2237470585577916,
                "2019": -0.7587204622419689,
                "2020": -0.004084031523364888,
                "2021": 0.005731162855305725,
                "2022": 0.012560665145416173,
                "2023": 0.0036860061234349137,
                "2024": 0.005079440454366803,
                "2025": -0.0010328840778473258,
                "2026": 0.015866719752783358,
                "2027": -0.008184232915279034,
                "2028": 0.00402697881707979,
                "2029": -0.013917554929238539,
                "2030": 1.5883404347295214,
                "2031": 1.6309921220383745,
                "2032": -0.03567309043982796,
                "2033": 2.0217799599173016,
                "2034": 0.8750669913660413,
                "2035": -0.5210616976737105,
                "2036": 1.2560790553693393,
                "2037": 0.5932479099006382,
                "2038": 0.2613903442137083,
                "2039": -0.7361328048904079,
                "2040": 2.054589778237634,
                "2041": -0.8431406718035793,
                "2042": -4.4457754112537335,
                "2043": -0.29114567431559396,
                "2044": -2.427967699582629,
                "2045": -0.05664630453844065,
                "2046": -1.3317956134940747,
                "2047": -1.3494582559895363,
                "2048": -0.07766698752116763,
                "2049": -3.5468559804736923,
                "2050": -0.11554792048733584,
                "2051": -1.9112853961256833,
                "2052": -0.6103719753964563,
                "2053": 0.11134255433074196,
                "2054": 2.780588477894728,
                "2055": 0.004372375478450571,
                "2056": 0.009519812649379898,
                "2057": -0.017635378048509377,
                "2058": -0.0047222104600107544,
                "2059": -0.0015459331515469213,
                "2060": 0.019944745379863592,
                "2061": 0.0028410154490996205,
                "2062": -0.014751644994901836,
                "2063": -0.021876437714610435,
                "2064": 0.006740899186766962,
                "2065": 0.9313423578065926,
                "2066": 1.127799287588163,
                "2067": -2.3938871780813717,
                "2068": -1.5300567351294478,
                "2069": 0.7783706992261117,
                "2070": -0.2318971467045892,
                "2071": -0.31544405306161527,
                "2072": 0.32369772405577674,
                "2073": -1.7610506781928372,
                "2074": 1.6443522164727467,
                "2075": 1.2573721969075582,
                "2076": -1.9767599409254166,
                "2077": 2.238830361297613,
                "2078": 1.7633119098541612,
                "2079": 0.9194209584216111,
                "2080": -0.4631459630655664,
                "2081": 0.9046541684816698,
                "2082": 0.0627262227475699,
                "2083": -1.4748146183638418,
                "2084": -2.4279373642004267,
                "2085": 0.8761116470074071,
                "2086": -0.4620208311866076,
                "2087": -1.0562786234192036,
                "2088": -1.5194926161661026,
                "2089": -0.37175509127622636,
                "2090": 0.004035714913648723,
                "2091": -0.000484893171789548,
                "2092": 0.010665958395062364,
                "2093": 0.004654469419834995,
                "2094": -0.02260165796327378,
                "2095": 0.00881630651477053,
                "2096": 0.010094846079281062,
                "2097": 0.0013301119124595085,
                "2098": 0.00118596127989189,
                "2099": -0.005136175152046062,
                "2100": 1.2741321138681538,
                "2101": -1.2302318736970168,
                "2102": 0.45911608042650676,
                "2103": 0.9515925338501079,
                "2104": 0.8251758501559788,
                "2105": 2.140414956187074,
                "2106": -0.31805304794313477,
                "2107": 1.1042112771185864,
                "2108": -2.561346805765141,
                "2109": -1.0959221426172714,
                "2110": 0.2992446466422205,
                "2111": -0.741716209908863,
                "2112": 1.5416234928661035,
                "2113": 0.8600165977292346,
                "2114": 2.3337715378615442,
                "2115": 0.12883101091265803,
                "2116": 0.8169720313244869,
                "2117": -1.6619142453853046,
                "2118": -1.2296436253230298,
                "2119": 0.7100790247940316,
                "2120": -0.021643884657787556,
                "2121": 3.3056004354827033,
                "2122": 2.4243064704575734,
                "2123": 1.1360233389560634,
                "2124": -0.012211223788658104,
                "2125": 0.0027647051874218564,
                "2126": -0.005857079773683389,
                "2127": -0.0044770583747043725,
                "2128": 0.025379344676027198,
                "2129": -0.01209118428739063,
                "2130": -0.004828154315268625,
                "2131": -0.001041472649485378,
                "2132": -0.02594791779534852,
                "2133": 0.013314599627958664,
                "2134": 0.012654474424537925,
                "2135": -0.35763712581749146,
                "2136": -2.9794830309297247,
                "2137": 0.3973969711728204,
                "2138": 1.876913884692077,
                "2139": -0.22529980753394502,
                "2140": -0.815726158093759,
                "2141": 1.4877685252595592,
                "2142": -2.544729178899177,
                "2143": 1.0529166567454837,
                "2144": 0.569933699570871,
                "2145": -0.4362034639649021,
                "2146": -0.7851448944405924,
                "2147": -1.7965816689930811,
                "2148": 1.424918055816768,
                "2149": -0.34779896464072174,
                "2150": 1.2852938852293054,
                "2151": -0.807987730586878,
                "2152": 1.093861855951733,
                "2153": -0.48400368802338434,
                "2154": -3.8840263085409754,
                "2155": -2.148615649083085,
                "2156": 1.1452332371871377,
                "2157": 2.1814203698725247,
                "2158": -0.2883104331929814,
                "2159": 1.8966638003155774,
                "2160": 0.008761144002451524,
                "2161": -0.00020657002284492536,
                "2162": 0.015381423339491374,
                "2163": -0.011969350379748394,
                "2164": -0.007437908824058996,
                "2165": 0.013941513473536143,
                "2166": 0.02097100947395928,
                "2167": -0.0007546991238082047,
                "2168": -0.01633657996816687,
                "2169": -0.008204946820304647,
                "2170": 1.5250591348411582,
                "2171": -1.3390722442427552,
                "2172": -1.4796157017125318,
                "2173": 0.6362660186607674,
                "2174": 0.7938862867128982,
                "2175": -3.0970149429136193,
                "2176": 0.6954383190731771,
                "2177": -0.6089757220854182,
                "2178": -0.10910189021195495,
                "2179": -1.3760098823073954,
                "2180": 0.573297676678472,
                "2181": 0.719645315230906,
                "2182": 1.7624740891826334,
                "2183": 1.8783111036148756,
                "2184": 1.3010083158458081,
                "2185": 0.09417237386230545,
                "2186": -1.7841812123648888,
                "2187": -1.713254944575043,
                "2188": -1.875029530178231,
                "2189": 2.0299648207959557,
                "2190": 0.19253847094544405,
                "2191": -1.3016592752196354,
                "2192": 4.27872790829164,
                "2193": 1.0613650406334463,
                "2194": -0.4541329995789345,
                "2195": 0.01253239596794636,
                "2196": -0.017414065734091013,
                "2197": -0.005492128121481753,
                "2198": 0.003517662474443194,
                "2199": 0.013170954049754695,
                "2200": -0.008003595783754423,
                "2201": -0.010753114728487145,
                "2202": 0.00034605834552731916,
                "2203": -0.004896786219239383,
                "2204": -0.0009369395871889058,
                "2205": -0.3564926691396898,
                "2206": -0.11706509524373745,
                "2207": 0.111563410520703,
                "2208": 0.09054876191396628,
                "2209": -0.2969656194587953,
                "2210": -0.26997506609460664,
                "2211": -0.01302716373902436,
                "2212": 0.09940088505855167,
                "2213": 0.014351041194409993,
                "2214": -0.36291436535167787,
                "2215": -0.2906341726494453,
                "2216": -0.39269575749350033,
                "2217": -0.2670696139827588,
                "2218": -0.20785305025502904,
                "2219": -0.20120608801138076,
                "2220": -0.17435675848749133,
                "2221": -0.13364035534069144,
                "2222": -0.15777138483564151,
                "2223": 0.16530876346679169,
                "2224": -0.06103659325586303,
                "2225": 0.14022205408194888,
                "2226": -0.37995123061605657,
                "2227": -0.3330143228535193,
                "2228": -0.4002654530006754,
                "2229": -0.3692705096988134,
                "2230": -0.0198917559478414,
                "2231": 0.010484364921730101,
                "2232": -0.00194850557919162,
                "2233": 0.012286124103524086,
                "2234": 0.010648977647662624,
                "2235": 0.013273396449161524,
                "2236": 0.011189827091850875,
                "2237": 0.01267216026379422,
                "2238": 0.018925754655256095,
                "2239": 0.003081842183220927,
                "2240": 0.6254173619785408,
                "2241": 2.804224564378217,
                "2242": 0.4405889761395311,
                "2243": 0.07097100482236497,
                "2244": 0.5993255678219571,
                "2245": 1.0664143665615946,
                "2246": 2.0240192768089242,
                "2247": 1.0575605779413961,
                "2248": 2.7913407825978553,
                "2249": 1.9836921154708549,
                "2250": 0.43486236744315104,
                "2251": -0.1911127725387046,
                "2252": -1.3512541041081578,
                "2253": -1.0814624586875823,
                "2254": -0.5874137202671992,
                "2255": -0.8534167210102923,
                "2256": -0.3942331059925846,
                "2257": 0.42447110443881986,
                "2258": 1.6961139260296718,
                "2259": 1.2959896407939444,
                "2260": 0.6884307795262091,
                "2261": -0.624022250494528,
                "2262": -0.7968910289093929,
                "2263": -0.1938562829248392,
                "2264": 1.7109590704638686,
                "2265": -0.0007705644012621924,
                "2266": -0.01312766291403858,
                "2267": -0.0019099558743186523,
                "2268": 0.0007258444699401104,
                "2269": -0.0021294525468445354,
                "2270": 0.00860615532015078,
                "2271": 0.004976472558882845,
                "2272": -0.008421692301903164,
                "2273": -0.008774736707739426,
                "2274": -0.013457045749490845,
                "2275": 0.17742325528615802,
                "2276": 0.8079133802932534,
                "2277": 0.8959119045936264,
                "2278": -0.29457081995453616,
                "2279": 2.6822329169011905,
                "2280": -0.5943379068045602,
                "2281": 2.0477226786278426,
                "2282": 0.9494834677808361,
                "2283": -0.30907784388740667,
                "2284": 2.2323484518024137,
                "2285": -0.3221443907423018,
                "2286": -2.18144869387461,
                "2287": 1.0900328552528173,
                "2288": -0.045254174794727944,
                "2289": 0.09018700549783774,
                "2290": 0.22682680772246827,
                "2291": 0.9883168282506435,
                "2292": -0.7994918254298177,
                "2293": -1.7820387246600433,
                "2294": 0.6978147393037737,
                "2295": 0.5696200673090032,
                "2296": 0.01892284968205936,
                "2297": -0.8225616095050178,
                "2298": -3.418547202042704,
                "2299": -0.6527185582895324,
                "2300": 0.021816467356709834,
                "2301": -0.004593843813046147,
                "2302": 0.004078440301895237,
                "2303": -0.0024840153425426353,
                "2304": 0.020352301271824937,
                "2305": -0.005906122183126238,
                "2306": 0.027877011090518135,
                "2307": 0.004272695287805976,
                "2308": -0.0027275666587942993,
                "2309": -0.006876386993234709,
                "2310": 0.6591709508491177,
                "2311": -0.35940363064929115,
                "2312": 0.6496210735869484,
                "2313": 0.033612761690516024,
                "2314": -0.7384883822603409,
                "2315": 0.24906187539034802,
                "2316": 0.3056246427548154,
                "2317": -0.08606535016316924,
                "2318": -0.4099848466699071,
                "2319": -0.6947864813962266,
                "2320": -0.5717976250235435,
                "2321": -1.3797873876693116,
                "2322": -0.7023941345735918,
                "2323": -1.8571291303057196,
                "2324": -0.9662788118237198,
                "2325": 1.0910358522787955,
                "2326": -0.5431947214580041,
                "2327": -0.6016403193567085,
                "2328": -1.3392310128275984,
                "2329": -1.3595745410673616,
                "2330": -0.6314817556759844,
                "2331": -0.20278627042653138,
                "2332": 0.8036817467303284,
                "2333": -1.689377610538439,
                "2334": -1.0413860500010192,
                "2335": -0.0023225745142000384,
                "2336": 0.0018127498358870967,
                "2337": 0.006177037752362054,
                "2338": 0.014921871229591098,
                "2339": -0.0013041338825974475,
                "2340": 0.0021055830333099736,
                "2341": -0.004665139627609008,
                "2342": -0.018732194062171706,
                "2343": -0.010383001638997665,
                "2344": 0.004102073316568721,
                "2345": 1.0370607785984636,
                "2346": -0.12172831375940704,
                "2347": 0.1110490874758262,
                "2348": -0.9240766129050472,
                "2349": -0.48218987417414433,
                "2350": 3.268396576033343,
                "2351": -1.5442356385089997,
                "2352": -0.7122525579256758,
                "2353": -0.811777675499031,
                "2354": -0.9525248593078578,
                "2355": 0.4033346013533263,
                "2356": -2.7789612667897665,
                "2357": 0.21102812539536578,
                "2358": -1.6371817834992506,
                "2359": 1.747559278826253,
                "2360": 2.791217364847326,
                "2361": 0.35107265088655165,
                "2362": -0.8177120519762219,
                "2363": 4.180986226691219,
                "2364": -0.6053850758439913,
                "2365": -1.9468289290301222,
                "2366": -0.7084973517155867,
                "2367": 0.31834587647347223,
                "2368": -0.36694177134783673,
                "2369": -0.4516472216942473,
                "2370": 0.009137796219030584,
                "2371": 0.005846915543417272,
                "2372": 0.004909284338801206,
                "2373": -0.009374877169474332,
                "2374": 0.007409887588926142,
                "2375": -0.0059793157376648665,
                "2376": -0.003476050697720209,
                "2377": -0.013301594511630295,
                "2378": 0.0013979031791226078,
                "2379": -0.004461397812833623,
                "2380": 0.24458651927209754,
                "2381": -0.3690952559695512,
                "2382": -0.046886800586944805,
                "2383": 0.14739262794152358,
                "2384": -0.6547092456702218,
                "2385": -0.5371630944812925,
                "2386": -0.5707446456521175,
                "2387": -0.14504400578875654,
                "2388": 0.05046891308443021,
                "2389": -0.15921370126443574,
                "2390": 0.14104527425455235,
                "2391": -0.5244336622915906,
                "2392": -0.8817839388694063,
                "2393": -0.4603080628820892,
                "2394": -0.2103165410746293,
                "2395": -0.38733867728506555,
                "2396": -0.1699067397206463,
                "2397": -0.2850400833074477,
                "2398": 0.4264509488681598,
                "2399": -0.41973878910846707,
                "2400": -0.7765410413538182,
                "2401": 0.2570982165089009,
                "2402": -0.6137155237288109,
                "2403": -0.6164483150631217,
                "2404": -0.30479291016963794,
                "2405": 0.007453744311346107,
                "2406": 0.007228516899735277,
                "2407": -0.012086473455374483,
                "2408": -0.008407781100050053,
                "2409": 0.0023084450269671057,
                "2410": -0.008605263127011781,
                "2411": -0.009377369163686514,
                "2412": -0.008122975375481276,
                "2413": 0.005501010288600231,
                "2414": 0.00673579853668226,
                "2415": 0.3388734970484917,
                "2416": 1.034279972571958,
                "2417": 0.7138571129284926,
                "2418": -0.7610279339161408,
                "2419": -0.6106621461808858,
                "2420": -0.3366446610328104,
                "2421": -0.664268266551471,
                "2422": -1.7764861681919533,
                "2423": -0.9627430384556874,
                "2424": 0.14347338992405498,
                "2425": 1.399603855506251,
                "2426": -1.8080010087645493,
                "2427": 1.1475047618114649,
                "2428": 0.3269991276900568,
                "2429": -0.5682725156046537,
                "2430": 0.24187672194122933,
                "2431": -0.7813353798554142,
                "2432": -0.6385056699273439,
                "2433": -0.5789408632991702,
                "2434": -1.198215493035109,
                "2435": 0.12723094023566214,
                "2436": -1.3395989872565255,
                "2437": -1.1767732015578933,
                "2438": 0.900703584918732,
                "2439": -2.1361342083163044,
                "2440": -0.0052583261392533,
                "2441": -0.0005262157717257723,
                "2442": 0.00010635312876829774,
                "2443": 0.021417179475556485,
                "2444": -0.010112870244202469,
                "2445": 0.006520673412904504,
                "2446": -0.003875519818749756,
                "2447": -0.00012088210293255058,
                "2448": -0.00538352882520153,
                "2449": -0.03838994963652709,
                "2450": 0.3960893313117259,
                "2451": -0.15259593788086023,
                "2452": 0.9797142937459243,
                "2453": -0.3022953368426945,
                "2454": -1.850425758840017,
                "2455": 0.18914343602267852,
                "2456": -1.3571710227554865,
                "2457": 1.1818496381399928,
                "2458": -0.23856526125061922,
                "2459": 0.43318157385427547,
                "2460": 0.9557689017935758,
                "2461": -1.9056803502480395,
                "2462": -0.8555789483118973,
                "2463": -2.2360058070015847,
                "2464": -0.7490518429119688,
                "2465": 0.07296195856151348,
                "2466": 0.4706173887115953,
                "2467": -2.2267968217369525,
                "2468": 0.13889360050252955,
                "2469": 0.7491579946700279,
                "2470": -1.4642307932132475,
                "2471": 1.7951137272182953,
                "2472": -0.10912884162091127,
                "2473": -1.4335587565270618,
                "2474": -2.106357716724242,
                "2475": 0.0022305424536594332,
                "2476": -0.003368187898495928,
                "2477": 0.011223945668700141,
                "2478": -0.007776754518769019,
                "2479": -0.01640462157279308,
                "2480": 0.012810357002082023,
                "2481": 0.0008751284303703179,
                "2482": -0.004046599901690791,
                "2483": -0.00251334683100348,
                "2484": 0.0062073441211124986,
                "2485": -0.5276008516186254,
                "2486": -0.2865701090027779,
                "2487": -0.2088856332597146,
                "2488": 0.14310262761162443,
                "2489": -0.2770940531882389,
                "2490": 0.5442421060520279,
                "2491": 0.7976629603734016,
                "2492": 0.8463551394263233,
                "2493": 1.0689449887319717,
                "2494": 0.7128798796810777,
                "2495": 1.1275408808870324,
                "2496": -1.8747872425784382,
                "2497": 3.4180164051735784,
                "2498": 0.4831536002803839,
                "2499": 1.2038755966955181,
                "2500": 0.42446730947704797,
                "2501": -0.1190769930695535,
                "2502": -0.6095874439591866,
                "2503": -2.493016918554835,
                "2504": -2.9961978140509578,
                "2505": -0.08126199984048252,
                "2506": 0.28399129074265433,
                "2507": -2.59049119629925,
                "2508": -0.42521721495736603,
                "2509": -0.536880468218162,
                "2510": -0.007068185549590187,
                "2511": 0.004936351242474102,
                "2512": 0.0024307764332292393,
                "2513": -0.011387463433239589,
                "2514": -0.006762594939720974,
                "2515": -0.002025589840381762,
                "2516": 0.005857127087506894,
                "2517": 0.007373174289623878,
                "2518": 0.0016203945016708184,
                "2519": 0.0024326462676567987,
                "2520": 0.10212001839329937,
                "2521": 0.10574686515394438,
                "2522": -0.3950119893893466,
                "2523": -0.7170825151372313,
                "2524": -0.9981309392924935,
                "2525": -1.3731172377982677,
                "2526": -0.08237190447844217,
                "2527": -1.1659633325711452,
                "2528": 0.921524135940771,
                "2529": -0.9713263204013345,
                "2530": -0.04300250226931893,
                "2531": -0.8232882723653993,
                "2532": -1.269054074045274,
                "2533": -0.28954802645187866,
                "2534": 0.4759299223937733,
                "2535": -0.25084311656085423,
                "2536": -0.7987436765196476,
                "2537": 0.4184778338700313,
                "2538": -0.7011983839605108,
                "2539": -0.9594014126219734,
                "2540": -0.7771019447081445,
                "2541": 0.5261263650463228,
                "2542": -1.3337628262910042,
                "2543": -1.1307624495363409,
                "2544": -0.40893318455241023,
                "2545": 0.013838732830085304,
                "2546": 0.006166900303949086,
                "2547": 0.018244289065195995,
                "2548": -0.01602495212161593,
                "2549": 0.006339838558065658,
                "2550": -0.019571227021619557,
                "2551": -0.011158526535837827,
                "2552": 0.01115953206578815,
                "2553": 0.002840052290986673,
                "2554": -0.020817455739465154,
                "2555": 1.0649673914222413,
                "2556": -0.050749642843624036,
                "2557": -2.312484713377664,
                "2558": 1.6800020933963766,
                "2559": 2.719956745707412,
                "2560": 0.586812539947078,
                "2561": -1.7955773448792471,
                "2562": -1.78729953294855,
                "2563": 0.4151945336090083,
                "2564": 1.0238882533884355,
                "2565": -0.38180388801718446,
                "2566": -2.1038778336575437,
                "2567": -2.6102310140020313,
                "2568": -3.425449800537377,
                "2569": -1.4513002617207138,
                "2570": -0.8765925987209446,
                "2571": -2.051465524837562,
                "2572": 2.069800052020676,
                "2573": 1.5939767303806536,
                "2574": 1.5689144569153295,
                "2575": -0.5800932479741933,
                "2576": -0.17387894221632194,
                "2577": -0.5373702694715112,
                "2578": 1.3969617019418938,
                "2579": -0.8160044692713481,
                "2580": 0.015669751089296663,
                "2581": 0.004219477662836427,
                "2582": 0.01977706307706487,
                "2583": 0.011250693270045525,
                "2584": 0.002770233431506101,
                "2585": 0.021924864928963124,
                "2586": -0.00297985911036199,
                "2587": -0.004817239091884734,
                "2588": -0.008579003707618462,
                "2589": 0.001451066873011481,
                "2590": -1.188271153659508,
                "2591": -0.32782329209813005,
                "2592": -0.5911501806372138,
                "2593": -0.4048246788788795,
                "2594": 0.27831823367829334,
                "2595": -0.288309811805789,
                "2596": -1.2559462434136508,
                "2597": -0.548760324301609,
                "2598": -0.1395247608579463,
                "2599": -0.2197987442454607,
                "2600": 0.007165748546622662,
                "2601": -0.35725739967468184,
                "2602": -0.3973106127867123,
                "2603": -1.150598996736719,
                "2604": 0.2431335025070987,
                "2605": 1.1425268651139988,
                "2606": -0.6618766217643457,
                "2607": -0.21451356828003834,
                "2608": -0.7304607771962162,
                "2609": 0.29170761928009803,
                "2610": 0.09227212423832792,
                "2611": 5.635065772870886,
                "2612": 6.362219032819498,
                "2613": -0.528543261176966,
                "2614": 0.21896032420204545,
                "2615": 0.006553296055750543,
                "2616": 0.019629859699966567,
                "2617": 0.011146511129033239,
                "2618": -0.008835818579743785,
                "2619": 0.0035564430186844553,
                "2620": -0.0010258769143745262,
                "2621": 0.005580398058287496,
                "2622": -0.005855358761186528,
                "2623": 0.0010621295133881787,
                "2624": -0.003917437601053317,
                "2625": -0.3206679242326505,
                "2626": -0.3082052092308727,
                "2627": -0.46952962289260797,
                "2628": -0.4533270942918907,
                "2629": -0.2267490715888784,
                "2630": -0.13188057835039638,
                "2631": -0.25905858858963965,
                "2632": -0.2852921382790976,
                "2633": -0.28039517592972873,
                "2634": -0.051559300536870335,
                "2635": -0.17617624226142786,
                "2636": -0.2156487972276944,
                "2637": -0.05838434398664877,
                "2638": -0.25667371534851613,
                "2639": -0.16134934481244495,
                "2640": -0.09276155367550966,
                "2641": -0.0015403674725171614,
                "2642": 6.98368220108039,
                "2643": -0.5182071521921512,
                "2644": -0.672345796565696,
                "2645": -0.22044382512355604,
                "2646": -0.1497728784596114,
                "2647": -0.31565253236321994,
                "2648": -0.5412587585131102,
                "2649": -0.38139486174648285,
                "2650": -0.009574914232574299,
                "2651": -0.019394834626058087,
                "2652": -0.0014327989279806044,
                "2653": 0.010352098208432706,
                "2654": -0.005663004979603751,
                "2655": 0.004863328328808826,
                "2656": 0.006621101930700193,
                "2657": -0.007658449100652082,
                "2658": 0.0004032008116509643,
                "2659": -0.0017188611526509593,
                "2660": -0.9216547513928667,
                "2661": 0.25462255446084514,
                "2662": -0.1633000235293339,
                "2663": 0.6544980687443721,
                "2664": -0.34188168358572657,
                "2665": 0.5532892002550536,
                "2666": 0.8897261065738505,
                "2667": 0.6188438341707896,
                "2668": -0.6859238686157212,
                "2669": -0.44279366026724326,
                "2670": 0.4090232409103799,
                "2671": -0.1649496403330404,
                "2672": -0.574560949677333,
                "2673": 1.355479831322944,
                "2674": 1.5549041083471076,
                "2675": -0.9323628250890941,
                "2676": -0.31258445218410164,
                "2677": 1.2986381269195653,
                "2678": 0.5295344255114325,
                "2679": -0.8499585416300389,
                "2680": 1.56412373209373,
                "2681": -1.4972780776342849,
                "2682": -1.7112913398853415,
                "2683": 2.0464062685506765,
                "2684": -1.2142242839612767,
                "2685": 0.005575252229248809,
                "2686": -0.025120000832162308,
                "2687": 0.002699477161907975,
                "2688": -0.0014196607730039747,
                "2689": 0.003409516271069596,
                "2690": -0.011699876596558037,
                "2691": 0.015635209392128414,
                "2692": 0.007977936721273091,
                "2693": -0.002121939914814551,
                "2694": 0.012647184005789212,
                "2695": -2.4088763158002524,
                "2696": -0.6758050344651474,
                "2697": -1.2243232919547669,
                "2698": -0.7988601823300778,
                "2699": -1.3585914365736285,
                "2700": -0.527821752272076,
                "2701": -0.5701449905360588,
                "2702": 0.21437645683218948,
                "2703": 0.20568975196568706,
                "2704": 0.01956481743809974,
                "2705": -0.3803329317684394,
                "2706": 0.7851240123009431,
                "2707": 1.3193151799722356,
                "2708": 0.30744655903002827,
                "2709": -1.0583388683512318,
                "2710": 1.067390965994662,
                "2711": -1.546364987788842,
                "2712": -2.153145026976592,
                "2713": 4.980566564269617,
                "2714": -2.2100243017069188,
                "2715": -1.3116945061110734,
                "2716": -3.140822391445411,
                "2717": 1.0016899397826968,
                "2718": -1.0100501217287674,
                "2719": -0.29116305397173486,
                "2720": -0.013850542219182136,
                "2721": 0.011003365341343422,
                "2722": -0.005087732313539798,
                "2723": -0.018483892340948778,
                "2724": -0.004390473598034738,
                "2725": -0.009332267069845631,
                "2726": -0.00803631058813892,
                "2727": 0.0034029559224994683,
                "2728": -0.0034205025785691927,
                "2729": -0.009095659776836603,
                "2730": -0.43424975458690723,
                "2731": 0.2232795465298103,
                "2732": 1.590394788994149,
                "2733": -0.12425824401875966,
                "2734": -1.082068030711738,
                "2735": -0.7631067352436747,
                "2736": 1.993721158740486,
                "2737": -0.4188636306545531,
                "2738": 0.07694037891992397,
                "2739": 0.5372236823446574,
                "2740": 0.5887119077864377,
                "2741": 0.33885908409947396,
                "2742": -2.088685095015597,
                "2743": -0.22656311696421377,
                "2744": 0.48848925013884775,
                "2745": 1.7066379603139457,
                "2746": 1.5089348282150143,
                "2747": 0.04332244290413721,
                "2748": -2.2536175957136106,
                "2749": 1.35917225754611,
                "2750": 1.925285473861548,
                "2751": 1.0292947392814469,
                "2752": 1.387912044455803,
                "2753": -0.3144535578022513,
                "2754": 1.6822097231569715,
                "2755": 0.0013672996456174044,
                "2756": -0.025960085888664643,
                "2757": -0.0075498449587309835,
                "2758": 0.0071982127218689455,
                "2759": -0.0016497014959678672,
                "2760": -0.015190359311368942,
                "2761": -0.011933697773196687,
                "2762": -0.0008429388587245745,
                "2763": 0.01861808395356243,
                "2764": 0.014897863129800563,
                "2765": -0.37697259445810355,
                "2766": 0.44136634534407093,
                "2767": -0.623670439625616,
                "2768": -0.9751412510012126,
                "2769": 0.9402275194158389,
                "2770": -0.02953756858536552,
                "2771": 0.2559653816982111,
                "2772": -0.9069678434770505,
                "2773": 1.30893657018915,
                "2774": 2.0566091409071374,
                "2775": 1.6469039395251015,
                "2776": 0.7683605497463204,
                "2777": 2.449760861150442,
                "2778": 2.004788594947566,
                "2779": 1.0933955281508907,
                "2780": -2.837935317202328,
                "2781": -0.6044590481850138,
                "2782": 0.2647370873240509,
                "2783": -1.8389655374457283,
                "2784": 2.0570464847165937,
                "2785": -0.3598177981704088,
                "2786": 1.5593482467381927,
                "2787": 0.13964763754646944,
                "2788": -0.6966033985432407,
                "2789": 0.35178269083633523,
                "2790": 0.010565108985940366,
                "2791": -0.003579810109087896,
                "2792": -0.005451743160263695,
                "2793": -0.004670076972515927,
                "2794": 0.002078291550536316,
                "2795": 0.0075141326880996655,
                "2796": -0.007003953923947976,
                "2797": -0.00656719573662516,
                "2798": -0.006378819904258485,
                "2799": -0.006674499979945415,
                "2800": 1.1001360535224936,
                "2801": -0.23350763862029913,
                "2802": -0.5678674625259421,
                "2803": 0.1035289021113838,
                "2804": 0.8261278801724236,
                "2805": 0.2950889575945689,
                "2806": 0.14535610810809846,
                "2807": -0.6990175022368181,
                "2808": 0.31282318585873753,
                "2809": 0.8980318307010211,
                "2810": -0.18392990744087254,
                "2811": 1.1129969433047242,
                "2812": 0.48050718079516336,
                "2813": 1.5185853181552826,
                "2814": 0.05445673459498557,
                "2815": -0.7008659181499507,
                "2816": -0.4280213466692386,
                "2817": 1.2768762227433192,
                "2818": 0.20832306179469637,
                "2819": 0.6461513596235471,
                "2820": -0.6192598241297724,
                "2821": -0.18482419644435097,
                "2822": 1.2067946057280956,
                "2823": 1.1164877963834205,
                "2824": 0.5263756648425175,
                "2825": -0.020557786277720338,
                "2826": 0.0005089545074391567,
                "2827": -0.015663717738598516,
                "2828": 0.004919612302061683,
                "2829": -0.013811389525131862,
                "2830": -0.01515176323113696,
                "2831": -0.006720725264558795,
                "2832": -0.0034387671226884958,
                "2833": 0.009973939602903135,
                "2834": -0.007741383514469117,
                "2835": -0.1825284311285327,
                "2836": 1.177480237990479,
                "2837": 2.520906098540037,
                "2838": 0.9502505979184855,
                "2839": -0.3967322670071553,
                "2840": -2.326826779795239,
                "2841": -1.592587317221825,
                "2842": 0.0589958998758328,
                "2843": -1.091773522017829,
                "2844": 0.6160784523897705,
                "2845": -0.16525672430993343,
                "2846": -1.4062033460743006,
                "2847": 0.6627163787617611,
                "2848": -2.121555179157031,
                "2849": 0.5108686681358201,
                "2850": 0.09793950689294838,
                "2851": 1.9052082477614851,
                "2852": 2.16853725775981,
                "2853": 3.7500474743518826,
                "2854": -1.7718453112240944,
                "2855": -1.5889660916263766,
                "2856": -1.6387514809732289,
                "2857": 1.4207378942491837,
                "2858": -0.11309827883466904,
                "2859": -1.7431203826653374,
                "2860": -0.012663977034367262,
                "2861": 0.006555685820597994,
                "2862": -0.008964861107216414,
                "2863": -0.008904581399263088,
                "2864": -0.000312674731222107,
                "2865": 0.008698652791350615,
                "2866": 0.0034412017052078314,
                "2867": -0.0013635443895646854,
                "2868": -0.003896074425604271,
                "2869": 0.002976436174191719,
                "2870": -1.5790502868467726,
                "2871": -0.07806692521179939,
                "2872": -0.6709091801070778,
                "2873": 0.15815996448806244,
                "2874": 0.1709614547692916,
                "2875": 3.062730525391831,
                "2876": -1.6628492882730128,
                "2877": 0.7049956145136174,
                "2878": 0.2744633001427431,
                "2879": -0.20187466256268707,
                "2880": 0.5543958403969795,
                "2881": 2.3021956700836945,
                "2882": 3.1220604207077356,
                "2883": 1.7198710455233455,
                "2884": 2.0107722529647942,
                "2885": -1.4514902607866744,
                "2886": -1.3077908373637566,
                "2887": 0.05960617234551482,
                "2888": -0.19527834174871375,
                "2889": 0.2246951456816123,
                "2890": -1.721683518804953,
                "2891": 0.006205458733798705,
                "2892": 0.9773495740189365,
                "2893": -1.2452767148727655,
                "2894": -0.011022856133650168,
                "2895": 0.007624635359651136,
                "2896": -0.01182109941382405,
                "2897": -0.008117136134874359,
                "2898": -0.011316705266177894,
                "2899": -0.0019149742211228983,
                "2900": 0.01634900258359106,
                "2901": -0.010950518777090667,
                "2902": 0.01594307965393568,
                "2903": -0.009250932318896536,
                "2904": -0.006492799799953641,
                "2905": 1.5021101992367782,
                "2906": 0.7830136083636446,
                "2907": 1.7063099835288091,
                "2908": 1.189741352410458,
                "2909": -2.3491242921385873,
                "2910": 0.14957242981429408,
                "2911": 0.33818270183906357,
                "2912": -3.0249346129136874,
                "2913": 0.5105758010062301,
                "2914": 0.8550580826942095,
                "2915": -1.4524323472875644,
                "2916": 2.0158545088577102,
                "2917": 1.6467942542655956,
                "2918": 0.6190646676445684,
                "2919": 2.2306148104649495,
                "2920": 2.0772705655390555,
                "2921": -0.6570021280817038,
                "2922": 0.06932674873376682,
                "2923": 0.8748181522552289,
                "2924": -1.2204410388294675,
                "2925": -1.5858761759458522,
                "2926": -1.5597089310289671,
                "2927": -2.1001659958546885,
                "2928": -1.9957893815529344,
                "2929": -0.11278664986056476,
                "2930": 0.012384704700348517,
                "2931": 0.0009417377785932028,
                "2932": -0.0032861209479583954,
                "2933": -0.004997092980734261,
                "2934": 0.0009493814050275903,
                "2935": -0.012570516048081433,
                "2936": 0.0031046899051886206,
                "2937": 0.002041999331990001,
                "2938": 0.0013257137723072332,
                "2939": 0.0008193444979581642,
                "2940": -0.8134175746343766,
                "2941": -1.1676479892208362,
                "2942": -0.10809719849483367,
                "2943": -0.4427705267956473,
                "2944": -0.6077192489639512,
                "2945": -0.6124414758267033,
                "2946": -0.8607076207162826,
                "2947": -0.7309766576404491,
                "2948": -0.6141139579086052,
                "2949": 0.5360028643311949,
                "2950": 0.81152064688026,
                "2951": 0.35763246814100536,
                "2952": -0.7723069551777249,
                "2953": -0.4788972662766404,
                "2954": -0.7203348926128356,
                "2955": -0.22028127445010715,
                "2956": -0.19791279015320143,
                "2957": -0.018482945230073544,
                "2958": -0.6848520968422712,
                "2959": -0.3370466871351007,
                "2960": -0.9626053528809775,
                "2961": 0.3914111845051531,
                "2962": 0.46049537259464884,
                "2963": -0.7859511673074622,
                "2964": -0.7532458407810764,
                "2965": -0.014010218913837176,
                "2966": -0.012913159283252176,
                "2967": 0.00908369685789569,
                "2968": 0.0005446460881520357,
                "2969": -0.017983888343285518,
                "2970": -0.009922679970695897,
                "2971": -0.016506436289156174,
                "2972": 0.005727648128674145,
                "2973": -0.02041344751132981,
                "2974": -0.015374700379692158,
                "2975": 0.8298615137798047,
                "2976": 0.20505117045197893,
                "2977": -0.0045911099197478555,
                "2978": 1.478266353437644,
                "2979": -0.18602054029769768,
                "2980": 0.7806171761484846,
                "2981": -0.3307514690722386,
                "2982": 0.9998302826944827,
                "2983": 1.3826347112900357,
                "2984": -0.7322265186138635,
                "2985": -1.9555572950677425,
                "2986": 0.7474565506659832,
                "2987": 0.0310009876514842,
                "2988": -0.2596582568034076,
                "2989": 1.8320068675385772,
                "2990": 0.7603095452792578,
                "2991": 0.11465043339025818,
                "2992": -0.9226810837055489,
                "2993": -0.7419531196816156,
                "2994": -6.755434626065459,
                "2995": 1.4952795743140024,
                "2996": -0.9218394924259705,
                "2997": -0.59959755920798,
                "2998": 0.9140955973896882,
                "2999": 0.7026281091483323,
                "3000": -0.006080937111076381,
                "3001": 0.004822660162625375,
                "3002": -0.0229879499019719,
                "3003": 0.003281431191327514,
                "3004": -0.009097574994036515,
                "3005": 0.008728802456096516,
                "3006": 0.009935819570278778,
                "3007": -0.012170420166901882,
                "3008": -0.011839120250228565,
                "3009": -0.011278778864736758,
                "3010": 0.5167947125975044,
                "3011": 0.9887253791277371,
                "3012": 1.0230724504701447,
                "3013": -1.1488254242036473,
                "3014": 0.11394891406818691,
                "3015": 0.9419921252001051,
                "3016": -1.3179771659136648,
                "3017": 1.083573106033193,
                "3018": 0.6677108145851394,
                "3019": 0.42589955851730443,
                "3020": -0.8626884352229516,
                "3021": 1.7636883321327999,
                "3022": -0.35015183203867184,
                "3023": -0.08572787918692211,
                "3024": 1.6608457838437576,
                "3025": 0.014819649315301529,
                "3026": -0.8401531710951649,
                "3027": 1.2489925228666274,
                "3028": 0.26932455830893115,
                "3029": 1.3896345168194693,
                "3030": 0.6128735601756728,
                "3031": 0.5088640635614937,
                "3032": 0.23109602984831792,
                "3033": 1.5674550107855063,
                "3034": 1.2053564267876224,
                "3035": 0.005163527387114762,
                "3036": 0.008876957580529227,
                "3037": 0.006814728241643206,
                "3038": -0.00522258953408415,
                "3039": -0.00503713358104947,
                "3040": -0.0015028858703235823,
                "3041": 0.0058202545026205975,
                "3042": 0.001087331708735572,
                "3043": -0.012806538488098013,
                "3044": -0.005926282528411351,
                "3045": -0.4775257523515692,
                "3046": -0.7965681074741566,
                "3047": 0.8216271407020527,
                "3048": 2.5219507231677074,
                "3049": -0.5936835194428274,
                "3050": 1.6399131872825572,
                "3051": -0.8834459882121042,
                "3052": 0.9515717817124285,
                "3053": 0.2683217139483663,
                "3054": -1.006500281603733,
                "3055": 1.5566076488995109,
                "3056": 0.8873568028361064,
                "3057": -1.0149147133518572,
                "3058": -1.3281924711568356,
                "3059": 0.4928550015640772,
                "3060": 0.6967187057972617,
                "3061": -1.422762823883556,
                "3062": 0.5844012176602906,
                "3063": 1.8549087408504032,
                "3064": -4.2688343668351,
                "3065": 1.560124316541422,
                "3066": 0.9373181751253715,
                "3067": 1.9932722269031486,
                "3068": -1.8778601245411213,
                "3069": 2.0845715376225398,
                "3070": 0.0000972053190752183,
                "3071": -0.00816521016212554,
                "3072": 0.004693079149266273,
                "3073": 0.007488256419907243,
                "3074": 0.0006733119572057421,
                "3075": 0.008028615373564649,
                "3076": -0.0000810670837304524,
                "3077": -0.0055182297457967025,
                "3078": 0.0003246762937076418,
                "3079": -0.0025889334233932587,
                "3080": -1.3712364211729504,
                "3081": -1.3019873373064412,
                "3082": 0.2054707540462791,
                "3083": -0.09367613476318812,
                "3084": 0.03894030924702405,
                "3085": -0.5888515478702155,
                "3086": 2.0580784552939626,
                "3087": -0.5760023420546158,
                "3088": -2.0557913913416894,
                "3089": 1.0218783979628305,
                "3090": 0.4933940070823222,
                "3091": 0.36227579147522304,
                "3092": 0.6047557897870863,
                "3093": 0.06630627342890312,
                "3094": 3.1816183882617803,
                "3095": -2.8252914203423085,
                "3096": -2.3392125759544897,
                "3097": -0.10675121138120974,
                "3098": 2.4243011855070185,
                "3099": -0.3706606472386329,
                "3100": 0.9511249398247053,
                "3101": 0.6481154841394736,
                "3102": 3.0917560426443593,
                "3103": -1.502532629059508,
                "3104": -2.1961324400253783,
                "3105": -0.01204761525184878,
                "3106": 0.013649502596955989,
                "3107": 0.009406855596294547,
                "3108": 0.01840302407778672,
                "3109": -0.00010661195873305841,
                "3110": -0.008111156385618566,
                "3111": 0.001785430786216764,
                "3112": -0.0012125394275755523,
                "3113": 0.012678260365515006,
                "3114": -0.004305336406526859,
                "3115": 2.610410686747494,
                "3116": 1.0400420158133274,
                "3117": -0.6173010558908506,
                "3118": -0.6700043628665,
                "3119": -0.355502851764196,
                "3120": -0.3309468003860132,
                "3121": 0.8457231176262577,
                "3122": 0.5736559292144386,
                "3123": 0.5312750777246885,
                "3124": -0.08150746648952611,
                "3125": -0.3556013119000663,
                "3126": 1.5926260789879272,
                "3127": 0.897688791665867,
                "3128": 0.6834327802542921,
                "3129": -1.7468833762776326,
                "3130": 0.2440593713499911,
                "3131": 1.015968401144452,
                "3132": -0.9082770574112392,
                "3133": 0.0951599974787846,
                "3134": 1.0296426787047213,
                "3135": 1.3451190843587209,
                "3136": 0.3657690625110111,
                "3137": 1.3856925083242129,
                "3138": 0.5766380848681044,
                "3139": 0.4531754950624638,
                "3140": 0.006508897930310373,
                "3141": -0.004009092775826166,
                "3142": 0.00754551017247819,
                "3143": -0.0022473088494849767,
                "3144": 0.015348652881699665,
                "3145": -0.008204784763211103,
                "3146": 0.0010514090543084708,
                "3147": 0.00015228449611293319,
                "3148": 0.0033379604972761157,
                "3149": -0.005084780575241805,
                "3150": 0.2548039436564158,
                "3151": 0.3713182874153601,
                "3152": 1.6000211113190752,
                "3153": -0.707236575857038,
                "3154": 0.745471705658059,
                "3155": -0.32205866700800756,
                "3156": 2.7182957459398116,
                "3157": 1.0443485321843844,
                "3158": 3.119059549827138,
                "3159": -0.10092082316790701,
                "3160": -0.6415814947352729,
                "3161": 1.8125282110882766,
                "3162": -0.7731006466985217,
                "3163": -3.3049943210092616,
                "3164": 0.9940781567880163,
                "3165": 0.29755913753209756,
                "3166": -2.238734043742434,
                "3167": 2.5894276162504006,
                "3168": -0.6450736849935957,
                "3169": -1.3114944388630343,
                "3170": 1.128635337846977,
                "3171": 2.2253452458139176,
                "3172": -0.2965941852590904,
                "3173": -0.632908992510749,
                "3174": -0.15118259176225884,
                "3175": -0.0011754610497778152,
                "3176": -0.011416899164652527,
                "3177": -0.009547280159708649,
                "3178": -0.0041827370346554545,
                "3179": 0.013495548765233489,
                "3180": -0.001655328131318532,
                "3181": -0.007256041840328589,
                "3182": -0.002721838074245777,
                "3183": 0.003995888661820475,
                "3184": 0.011924587488536196,
                "3185": -0.6227045184680966,
                "3186": 0.5338114376254224,
                "3187": -0.543773125401386,
                "3188": -0.5003225006434957,
                "3189": 0.5193839892579277,
                "3190": 0.6422577724622873,
                "3191": 0.49521893822839014,
                "3192": -0.22801200735452923,
                "3193": -0.36242448360533125,
                "3194": 0.840172646560093,
                "3195": 0.09942957636388718,
                "3196": 0.6655182145023014,
                "3197": 0.5340173256674778,
                "3198": -0.2631943448572256,
                "3199": 0.7614308441127492,
                "3200": 0.08540786982379878,
                "3201": 0.19746715372433404,
                "3202": 0.5792164736202368,
                "3203": 0.059052551679802806,
                "3204": 0.7033639445332921,
                "3205": -0.22911554630141204,
                "3206": 0.5316990473855607,
                "3207": 1.05047835078815,
                "3208": 0.5313926888113567,
                "3209": 0.11944733356030889,
                "3210": -0.004533041445930391,
                "3211": 0.011567613832752231,
                "3212": 0.011838968270673628,
                "3213": -0.0048120215276017545,
                "3214": 0.007164568030003014,
                "3215": -0.011791470600306917,
                "3216": 0.007061839459261528,
                "3217": 0.010854780365157315,
                "3218": 0.0008096771795924447,
                "3219": -0.01698149443915276,
                "3220": -0.13882167727520628,
                "3221": -0.14069930414775475,
                "3222": -0.1523960927639366,
                "3223": -0.14477663401291144,
                "3224": -0.17111905870523988,
                "3225": -0.14420437160626695,
                "3226": -0.13274194628445646,
                "3227": -0.09647381200354119,
                "3228": -0.14983250563094316,
                "3229": -0.09480863046920986,
                "3230": -0.07256486691994031,
                "3231": -0.26219606889060376,
                "3232": -0.20887794290820677,
                "3233": -0.1466873997435785,
                "3234": -0.1428635379979481,
                "3235": -0.1377672880891155,
                "3236": -0.11491937366667232,
                "3237": 3.447028030556914,
                "3238": -0.08812404420532229,
                "3239": -0.07127570057711503,
                "3240": -0.1756834795085902,
                "3241": -0.15415934996089264,
                "3242": -0.168501311638461,
                "3243": -0.05185089342273704,
                "3244": -0.04331356428800621,
                "3245": 0.0007309006313932945,
                "3246": 0.014150387138699773,
                "3247": 0.0006065107051893582,
                "3248": 0.0010537257476496034,
                "3249": 0.010071065908251067,
                "3250": -0.0019290716140295504,
                "3251": -0.015336553110328268,
                "3252": 0.0021860908242137796,
                "3253": 0.01040349012085736,
                "3254": -0.00685980301511301,
                "3255": -0.03910445415268009,
                "3256": -0.04182121760786442,
                "3257": 0.44036347205908066,
                "3258": -0.08983723734799116,
                "3259": -1.1249476879733875,
                "3260": -1.8888706056793416,
                "3261": 1.765552070022156,
                "3262": 1.352817334355432,
                "3263": -0.011744422077221888,
                "3264": 0.22257661933807577,
                "3265": 1.0457825068362916,
                "3266": -0.19244178268439763,
                "3267": 1.5470617420795234,
                "3268": 0.5251002204608768,
                "3269": -0.17285679022663633,
                "3270": 0.7410950073797665,
                "3271": 0.967180915741214,
                "3272": -1.9390122176871103,
                "3273": 2.77588614288904,
                "3274": -2.371155305400234,
                "3275": -0.11815896637023009,
                "3276": 1.49733665859212,
                "3277": 2.1857771122606096,
                "3278": 2.5271668554626943,
                "3279": -1.6173573809717414,
                "3280": 0.007958473682686797,
                "3281": -0.008559787014601541,
                "3282": 0.012554824175016037,
                "3283": -0.005671126907208709,
                "3284": -0.0008015329569713743,
                "3285": -0.02545124698158234,
                "3286": -0.012449979016603148,
                "3287": -0.013165524577534289,
                "3288": 0.009108744965516596,
                "3289": -0.015403274817045483,
                "3290": 0.5999292578046848,
                "3291": 0.689621202537674,
                "3292": 0.5260790971909629,
                "3293": 0.9677638362704062,
                "3294": -0.5472490428948145,
                "3295": 0.6341154173244711,
                "3296": -1.6259966011978948,
                "3297": -0.4393733073843149,
                "3298": 1.7730467356731445,
                "3299": 1.1814850830251358,
                "3300": 0.8200649454327928,
                "3301": 0.8463238501570916,
                "3302": 4.652627797348983,
                "3303": 1.9920257446161345,
                "3304": 1.3515269691014213,
                "3305": -0.9847085070605457,
                "3306": -1.4471333172265177,
                "3307": -1.4077993981031105,
                "3308": -2.401794595144941,
                "3309": -0.1558223407451105,
                "3310": 1.325443084979845,
                "3311": -0.40316549408407554,
                "3312": -0.33010253930046896,
                "3313": -0.4055786682772153,
                "3314": 1.2886411235893562,
                "3315": -0.0015657089616690825,
                "3316": 0.0013616892177816097,
                "3317": -0.0002670954126784049,
                "3318": -0.006344087232130429,
                "3319": -0.005638721088383681,
                "3320": -0.005844605749089918,
                "3321": 0.0010158778293407479,
                "3322": -0.0110829398229891,
                "3323": 0.007608811556616787,
                "3324": 0.002994361664323964,
                "3325": -1.3362360378340372,
                "3326": -0.047578820457524415,
                "3327": -1.2125884408664103,
                "3328": -1.2330420261590338,
                "3329": 0.8943997027769695,
                "3330": -0.393528806715875,
                "3331": -1.324790098945704,
                "3332": -1.4825034288923795,
                "3333": -0.26785211976758944,
                "3334": 0.9253236963481033,
                "3335": -1.441002342691026,
                "3336": 0.3389687058542731,
                "3337": -1.1763676137573078,
                "3338": 1.2323779406536037,
                "3339": 2.2362575179457607,
                "3340": -1.27114452387288,
                "3341": -0.7085898532654799,
                "3342": 2.6965054514045685,
                "3343": -2.516385222269603,
                "3344": -0.14547609237005937,
                "3345": -0.22822756911511552,
                "3346": -0.8758122650970256,
                "3347": 0.803504123296153,
                "3348": 3.5189739513646474,
                "3349": -0.11218802243080513,
                "3350": 0.012832321320241239,
                "3351": 0.005576323098566382,
                "3352": 0.006416152247866539,
                "3353": -0.01396076687197548,
                "3354": 0.01566271085241097,
                "3355": 0.002767119193214687,
                "3356": -0.007708675729284586,
                "3357": 0.0007457199431568836,
                "3358": -0.013063332840216697,
                "3359": 0.006053617934871105,
                "3360": 0.46255285903587645,
                "3361": 0.10942787349511934,
                "3362": 0.24456991998047065,
                "3363": 0.4146983316141925,
                "3364": 0.41134785980030486,
                "3365": 0.3340808358933472,
                "3366": 0.6313071245169083,
                "3367": -0.1861299344215351,
                "3368": 0.828720302620434,
                "3369": 0.16718904631117262,
                "3370": 0.635796358237117,
                "3371": 0.413303434534327,
                "3372": 0.6470887744511883,
                "3373": -0.2428068445001618,
                "3374": 0.6831620816238888,
                "3375": -0.12363200613132375,
                "3376": 0.24089534626732345,
                "3377": -0.844754085007535,
                "3378": 0.4724473376647817,
                "3379": 0.45029459127160026,
                "3380": 0.20937261429099796,
                "3381": 1.0267448000296895,
                "3382": 0.08627895463926227,
                "3383": 0.594131320732114,
                "3384": 0.2787021101464839,
                "3385": -0.0102523957620589,
                "3386": 0.010237012422782963,
                "3387": -0.005728841843086268,
                "3388": -0.003852537186060467,
                "3389": 0.004299784504276478,
                "3390": 0.0007198000383343681,
                "3391": -0.0025086793542822695,
                "3392": 0.0018785954521401058,
                "3393": 0.0015645609156448041,
                "3394": -0.0028530129177818655,
                "3395": -0.5959672827024239,
                "3396": 1.4197365818622842,
                "3397": 0.11069274166969188,
                "3398": -2.621073480976211,
                "3399": -0.2127986452938251,
                "3400": -0.4566463893733125,
                "3401": 1.0420838999479867,
                "3402": 2.3823417297193616,
                "3403": -0.40704034990212107,
                "3404": 0.12040619039816261,
                "3405": 0.5451478581588924,
                "3406": 0.4362537775806828,
                "3407": 1.9999036787421756,
                "3408": 0.9542389949371164,
                "3409": -1.3062802450164548,
                "3410": -3.2581188230760856,
                "3411": 1.7086403667766608,
                "3412": 0.3112581882588305,
                "3413": -1.5413895577902448,
                "3414": -3.7078985621827867,
                "3415": -0.7546497164382351,
                "3416": -0.13006591323824104,
                "3417": -0.2054130751723069,
                "3418": -1.020333386006085,
                "3419": 0.5671205064086186,
                "3420": 0.005856919504483051,
                "3421": -0.017406814256036945,
                "3422": 0.008414562770669107,
                "3423": -0.0012714704429890773,
                "3424": 0.021479423209239627,
                "3425": -0.0036143115329391445,
                "3426": -0.0063447054403605796,
                "3427": -0.0002070239534904881,
                "3428": -0.011916461600077326,
                "3429": 0.0015275430811217434,
                "3430": -0.5972320991546622,
                "3431": 0.4604893594176956,
                "3432": -0.2344753913390389,
                "3433": -0.21078641680981397,
                "3434": 1.0449067425812109,
                "3435": 0.9639950403868521,
                "3436": 2.3853818581327784,
                "3437": -0.43669520607776774,
                "3438": -0.8991138120074458,
                "3439": 0.676469380119254,
                "3440": -0.1534440716523445,
                "3441": -3.1264560555095926,
                "3442": 1.1342153630598641,
                "3443": -1.8701707380777826,
                "3444": -1.3702426448385685,
                "3445": -2.326149680463806,
                "3446": -0.9224677247495893,
                "3447": -0.5629110180827345,
                "3448": -1.7299649234223269,
                "3449": 0.38416457953680244,
                "3450": 1.572371779064551,
                "3451": 2.5042613994460434,
                "3452": 1.776054455670823,
                "3453": 1.1026043881147956,
                "3454": 1.1966475100122451,
                "3455": 0.010138040914477493,
                "3456": 0.007365019434195908,
                "3457": 0.0024973650004425554,
                "3458": 0.0071495207684639725,
                "3459": -0.005021160213349893,
                "3460": 0.0025914592736124486,
                "3461": 0.007988684042059638,
                "3462": -0.009418882393267916,
                "3463": 0.0014623604697134888,
                "3464": -0.003592131242745787,
                "3465": -1.0963136521030377,
                "3466": 1.898429149194125,
                "3467": 0.42872121664024854,
                "3468": 0.7948255297453497,
                "3469": -0.7350468357232417,
                "3470": 1.0683903116227162,
                "3471": 1.2452206819299447,
                "3472": -3.964050454857383,
                "3473": -0.031322282778715224,
                "3474": -1.3321363498980978,
                "3475": -0.17510487414576456,
                "3476": -0.7383572629437449,
                "3477": -0.28220165340769504,
                "3478": 1.9696101265411115,
                "3479": 0.7114783719458871,
                "3480": 0.02374818280673402,
                "3481": -1.042208097723763,
                "3482": 1.772845813488321,
                "3483": 0.13671559696476906,
                "3484": 3.7304272756061447,
                "3485": -0.5874587632170298,
                "3486": 0.19425194776002538,
                "3487": 0.7281360238210707,
                "3488": -0.3832137175135665,
                "3489": -0.9034045542604704,
                "3490": -0.007085178316773173,
                "3491": 0.010927360642436032,
                "3492": -0.006701980440891681,
                "3493": -0.005219831772527527,
                "3494": -0.0029074859221547805,
                "3495": 0.008478254721158046,
                "3496": -0.0033431971866004885,
                "3497": -0.0038371099265084416,
                "3498": 0.0039632127508830465,
                "3499": 0.013084501194429242
            }
        },
        "b1": {
            "n": 100,
            "d": 1,
            "w": {
                "0": 0.19395077352236995,
                "1": 0.07394368620639581,
                "2": 0.2265013226148007,
                "3": 0.06361282622677672,
                "4": -0.4796613806489325,
                "5": -0.38028668393141574,
                "6": -0.02266909634900835,
                "7": -0.13147657014621106,
                "8": 0.7757724452160866,
                "9": -0.23909575478566014,
                "10": -0.32352969895751404,
                "11": 0.03330246592581811,
                "12": 0.16791960541190482,
                "13": -0.011260827483885327,
                "14": 0.007381113854748685,
                "15": -0.11137500424635108,
                "16": 0.13306703334174272,
                "17": -0.045318636813073694,
                "18": 0.2039161095971042,
                "19": -0.11746687525156878,
                "20": 0.42668174393451325,
                "21": 0.2647947856395767,
                "22": -0.5715158287483914,
                "23": 0.32438467057290343,
                "24": -0.6158113909323202,
                "25": 0.22820896631531032,
                "26": 0.4064902566422935,
                "27": -0.45031259582223415,
                "28": -0.13875340338457065,
                "29": 0.07540125198944969,
                "30": 0.4615707449452125,
                "31": 0.9720538299870489,
                "32": -0.28501973728523294,
                "33": -0.06366016587976064,
                "34": 0.4644307347723726,
                "35": 0.6515753442379657,
                "36": 0.500202432119569,
                "37": -0.8190888543389896,
                "38": 1.33420717350401,
                "39": 0.19302967699983484,
                "40": -0.3291691840925515,
                "41": -0.1187781501755704,
                "42": -0.15014281809920732,
                "43": -0.20655852777693698,
                "44": -0.058339992293665044,
                "45": 0.12416836838514912,
                "46": -0.0673254249726359,
                "47": -0.17836922830582533,
                "48": -1.515671197329424,
                "49": 0.1978809187591741,
                "50": -0.16005773055184497,
                "51": 0.1552030052797718,
                "52": -0.15891467228322306,
                "53": 0.21214800942310844,
                "54": -0.5943282737052227,
                "55": 0.46238613448519367,
                "56": 0.10423360208703937,
                "57": 0.0322855493815325,
                "58": 0.4183772462329929,
                "59": 0.30697740590128186,
                "60": -0.058903511800441094,
                "61": 0.31812319282862533,
                "62": -0.0831086325411613,
                "63": -0.12068443513967403,
                "64": -0.02557894661375275,
                "65": -0.03686553434630519,
                "66": -0.1106915833859418,
                "67": -0.6351731662808571,
                "68": -0.18874619508600718,
                "69": 0.033319920779507656,
                "70": -0.08423173331674452,
                "71": 0.25470471632190417,
                "72": -0.2887864259571925,
                "73": 0.21780361099421816,
                "74": -0.1793179160693823,
                "75": -1.1723607260948221,
                "76": 0.23223741507871926,
                "77": -1.018125369648907,
                "78": 0.18253072544622315,
                "79": -0.26087237938366176,
                "80": 0.3303695549612538,
                "81": -1.097276209181578,
                "82": -0.11308299408402962,
                "83": 0.2924600998918172,
                "84": -0.3821781727523764,
                "85": 0.4129609147212546,
                "86": 0.05965347989330035,
                "87": 0.46503169382453974,
                "88": -0.009576314209368983,
                "89": 0.39778796725223814,
                "90": 0.31814516993800823,
                "91": 0.21062392245786038,
                "92": -0.6551991457728663,
                "93": -0.04598036163756073,
                "94": -0.08342659925933027,
                "95": -0.43266293801152883,
                "96": 0.2138849754511785,
                "97": 0.5463365775437498,
                "98": 0.09164521416686451,
                "99": -0.33988127346780195
            }
        },
        "W2": {
            "n": 4,
            "d": 100,
            "w": {
                "0": 0.046359602228772626,
                "1": -0.07781625107507782,
                "2": 0.044453668956989205,
                "3": -0.3642256431371283,
                "4": 0.3330624252390474,
                "5": 0.5610055989960563,
                "6": 0.348648723333348,
                "7": -0.1318439545057848,
                "8": 0.04167896396044163,
                "9": 0.013528400007884031,
                "10": 0.21806994910826594,
                "11": -0.19424392405672614,
                "12": 0.26809039324287337,
                "13": -0.14894582729725306,
                "14": 0.5737276393088722,
                "15": -0.7731015168517971,
                "16": 0.7655121285251127,
                "17": -0.4220389351179492,
                "18": 0.27397958418993745,
                "19": -0.20143458544829626,
                "20": 0.3646524505936502,
                "21": -0.012764582977673892,
                "22": 0.11340988632177229,
                "23": -0.24162099187138092,
                "24": -0.6621608854859174,
                "25": -0.13613492712824293,
                "26": -0.01385513853275187,
                "27": -0.03872340594645961,
                "28": 0.18143247096353385,
                "29": 0.10342931166022477,
                "30": 0.20437407278497544,
                "31": 0.36951077113907144,
                "32": -0.758887374852702,
                "33": -0.35647409090096377,
                "34": -0.12933267068188659,
                "35": 0.21133428913936866,
                "36": -0.33894089019957524,
                "37": -0.3215693272282437,
                "38": 0.3828112534706672,
                "39": -0.5355868637098419,
                "40": -0.3423925738848267,
                "41": 0.2751058957375404,
                "42": 1.1028880721022545,
                "43": -0.20071835112880887,
                "44": -0.3704004485788933,
                "45": 0.3574801303643275,
                "46": -0.17913670185866984,
                "47": 0.20624045693467932,
                "48": -0.33245745106536967,
                "49": 0.041174743596091266,
                "50": -0.257378893447823,
                "51": 0.616124226201778,
                "52": -0.5192806258564286,
                "53": -0.13511614818275292,
                "54": -0.46003853125784316,
                "55": -0.10239320021943994,
                "56": 0.13442205542478589,
                "57": 0.0006233984971201027,
                "58": 0.5867988675205335,
                "59": -0.31709784264298846,
                "60": -0.9198044443963326,
                "61": 0.1706768570725712,
                "62": -0.04295442932225135,
                "63": -0.27813889166880135,
                "64": 0.24298864978231996,
                "65": -0.2788638703590357,
                "66": 0.5622171474459925,
                "67": -0.16428070162222638,
                "68": -0.22721925153182684,
                "69": 0.11910529136763519,
                "70": 0.21127603436286108,
                "71": -0.03589592035261596,
                "72": 0.8063755579939154,
                "73": 0.031964484141801586,
                "74": -0.38686723812063734,
                "75": -0.40804317446238364,
                "76": 0.08170987160988535,
                "77": -0.1502698937285158,
                "78": -0.5066731055902031,
                "79": 0.8388341800259024,
                "80": 0.6666321580797177,
                "81": -0.33835831117016235,
                "82": 0.5465694958453606,
                "83": -0.12707174113778413,
                "84": -0.3198684177909889,
                "85": 0.17010133635572292,
                "86": -0.16012355042629028,
                "87": 0.02040978805097867,
                "88": 0.9936209546463933,
                "89": -0.3714682753621146,
                "90": 0.6237199664844779,
                "91": 0.09230883549207271,
                "92": -1.6248931900392118,
                "93": 0.06064558712011818,
                "94": -0.38319224454647677,
                "95": 0.44348948078664185,
                "96": -0.26945654303391714,
                "97": 0.17518648699529127,
                "98": 0.26920113848589666,
                "99": 0.33749046688060624,
                "100": -0.07038676006798099,
                "101": -0.1885353190143422,
                "102": 0.20855085039254315,
                "103": -0.2985614903992274,
                "104": -0.03536074753407981,
                "105": 0.10697158839113838,
                "106": 0.15488041856492507,
                "107": -0.07064122365392989,
                "108": 0.01916956600258176,
                "109": -0.28955428017304663,
                "110": -0.06371524476882946,
                "111": 0.04402740073458487,
                "112": 0.5636196126676933,
                "113": 0.05983563987615163,
                "114": -0.1700039719244811,
                "115": 0.2937303402700918,
                "116": -0.47096550492867306,
                "117": -0.01691152914920408,
                "118": 0.8283870915608066,
                "119": -0.18684160706171613,
                "120": 0.14920143740955788,
                "121": 0.07283515681050651,
                "122": -0.26000807585185215,
                "123": 0.24035007818816484,
                "124": -4.023545117389549,
                "125": -0.21916733245724096,
                "126": 0.8614379994993401,
                "127": 0.1165053907348482,
                "128": -0.3809001859050215,
                "129": -0.07263971574099767,
                "130": 0.010348965458698473,
                "131": 0.9952911222503931,
                "132": -0.11620607438711962,
                "133": -0.022989905093944753,
                "134": 0.029857932007838255,
                "135": -0.251905296500697,
                "136": -0.006517427005230214,
                "137": 0.06518255031760072,
                "138": 0.045888274005474704,
                "139": 0.2993412530898495,
                "140": -0.40716134878301535,
                "141": 0.1228808895394901,
                "142": 0.027805927973180808,
                "143": -0.1777513646223078,
                "144": -0.06757368904600737,
                "145": 0.027195766917030604,
                "146": 0.1789470743672595,
                "147": 0.15534722727310737,
                "148": 0.12038214869474495,
                "149": -0.08422052610952932,
                "150": -0.0320769175311054,
                "151": 0.0389538802837515,
                "152": -0.016695164602416566,
                "153": 0.10901867228369629,
                "154": -0.19516875061232544,
                "155": 0.85106552500629,
                "156": 0.017523059072884505,
                "157": -0.030563599208660856,
                "158": 0.3070190699738112,
                "159": 0.07653875047355208,
                "160": -0.24146243041327944,
                "161": 0.025439450512491305,
                "162": -0.12304461358071088,
                "163": -0.4506176305478733,
                "164": -0.743153875016624,
                "165": -0.1277751206499132,
                "166": -0.11400323274079298,
                "167": 0.06003756605499049,
                "168": -0.5714924333603674,
                "169": 0.21810630660124655,
                "170": 0.01081773011042726,
                "171": -0.22832726940582154,
                "172": -0.047662299178981564,
                "173": 0.2051189821172791,
                "174": 0.06681352977673924,
                "175": -0.4681274955353977,
                "176": -0.18955434991537792,
                "177": -0.16280315949929725,
                "178": -0.15585302328468315,
                "179": -0.1951681661542023,
                "180": 0.028185256459926623,
                "181": -0.02790253227751114,
                "182": -0.22956849576871416,
                "183": -0.03915685615092847,
                "184": -0.35207170063597687,
                "185": 0.016629043092603213,
                "186": 0.16079190184492007,
                "187": 0.1482425468802377,
                "188": -0.1371769543898448,
                "189": 0.2826812838373923,
                "190": -0.1321892065815134,
                "191": -0.09087763210378143,
                "192": -0.9023370373091302,
                "193": -0.28365776340983806,
                "194": -0.3957089268827124,
                "195": -0.09932817922201848,
                "196": 0.6081616267781897,
                "197": -0.0352481653627137,
                "198": 0.17686211094547574,
                "199": 0.09639687114376927,
                "200": 0.07697120148166589,
                "201": 0.23005369399487877,
                "202": 0.3160579160617302,
                "203": 0.026805243462434965,
                "204": -0.10772648483620775,
                "205": -0.21657695987990472,
                "206": -0.2554949853260524,
                "207": -0.2208518285215808,
                "208": 0.0889480112312828,
                "209": -0.4298737610622304,
                "210": -0.39950572441664883,
                "211": 0.5902876047400315,
                "212": 0.5082566073439878,
                "213": 0.17701491858008025,
                "214": 0.3124739389038146,
                "215": 0.008545025330610327,
                "216": 0.4439556370034254,
                "217": 0.21178630616450184,
                "218": 1.0399586938685244,
                "219": -0.32883401532520107,
                "220": 0.09749755787192929,
                "221": 0.4717067814424126,
                "222": -0.7537598472812705,
                "223": 0.09889850106078177,
                "224": -0.204394428028568,
                "225": 0.34652504701771103,
                "226": -0.13198518647435922,
                "227": 0.4740293969993974,
                "228": 0.1679145083683742,
                "229": -0.30698257851953453,
                "230": 0.14464810601514258,
                "231": 1.9400565901752418,
                "232": -0.2549515686746087,
                "233": -0.05730080457036812,
                "234": 0.3089284258731941,
                "235": 0.4457621721029495,
                "236": 0.32787085881731287,
                "237": -0.1706228985499606,
                "238": 0.3966104889260889,
                "239": 0.08062216193448803,
                "240": -1.972993774541474,
                "241": -0.21572159695386925,
                "242": -0.14401123010927439,
                "243": -0.15102971664042603,
                "244": -0.08667084110940788,
                "245": 0.08511515952155932,
                "246": -0.08882426738295085,
                "247": 0.27415261619253856,
                "248": -0.29136500347067823,
                "249": 0.19942174382781264,
                "250": -0.0038013068598627226,
                "251": 0.0656944139833542,
                "252": -0.5333520108416859,
                "253": 0.1797959573242362,
                "254": -0.12341994182430116,
                "255": 0.2828835697185948,
                "256": -0.6139065620447283,
                "257": 0.514561226287336,
                "258": 0.13239736503143532,
                "259": 0.005459502680773264,
                "260": 0.2180325815781721,
                "261": 0.27839241391451325,
                "262": -0.05355066918335409,
                "263": -0.19559052557446144,
                "264": -0.18219278735946942,
                "265": -0.20581920187025718,
                "266": -0.7325688067313018,
                "267": -0.17122618484926405,
                "268": -0.3556659255304396,
                "269": 0.08054121559427013,
                "270": 0.3764579193847063,
                "271": 0.16623858396176994,
                "272": -0.592355941363753,
                "273": 0.2942203808918202,
                "274": 0.095241682959409,
                "275": -3.523524308069849,
                "276": 0.03328094835235942,
                "277": -0.2493756713251369,
                "278": -0.04274162045270782,
                "279": -0.20350670427933648,
                "280": 0.35533458248862143,
                "281": -0.26173213131170875,
                "282": -0.1019769799813791,
                "283": 0.23282285805838124,
                "284": -0.403266484995546,
                "285": 0.26062574039178493,
                "286": 0.31258264549295456,
                "287": 0.3343750957532188,
                "288": 0.1305527533631202,
                "289": 0.2698656658220173,
                "290": 0.15535626597396462,
                "291": 0.09189419758581933,
                "292": -1.3484369004901802,
                "293": 0.1431436653242985,
                "294": -0.22381128816101867,
                "295": 0.28745816738054986,
                "296": 0.4833295802311184,
                "297": 0.09995724608923705,
                "298": 0.008619057526488817,
                "299": -0.14005055697390628,
                "300": 0.27478509717369276,
                "301": 0.020323750768673942,
                "302": -0.3441096554030733,
                "303": -0.23435683203867777,
                "304": -0.18230795440255748,
                "305": -0.018473556326188856,
                "306": -0.19781104326164858,
                "307": -0.2054476929257287,
                "308": 0.1113065335773969,
                "309": -0.403595345012745,
                "310": -0.3531128094607611,
                "311": -0.20455521973416477,
                "312": 0.7928562944186532,
                "313": -0.001958857257142463,
                "314": 0.1711577669235434,
                "315": 0.20176764920855406,
                "316": 1.3089965944762787,
                "317": 0.2674763335458749,
                "318": 0.9976887357842535,
                "319": -0.19936819972130587,
                "320": -0.03815363224175517,
                "321": -0.314458880406398,
                "322": -3.3278208971832623,
                "323": -0.05599774379182807,
                "324": -0.2809226640861084,
                "325": -0.14641874232941368,
                "326": -0.00499953823897507,
                "327": -0.24870390088254588,
                "328": -0.24427713446576085,
                "329": -0.7424778612636903,
                "330": 0.2357724628318382,
                "331": 0.3357137771097628,
                "332": 0.07605272204576238,
                "333": -0.1351883121813663,
                "334": -0.05809318680499248,
                "335": 0.14686642642548378,
                "336": 0.09207224455390149,
                "337": -0.0069539637661484265,
                "338": -0.0033247469055971805,
                "339": -0.02478941660212862,
                "340": -0.690575602003044,
                "341": -0.15933506927701446,
                "342": -0.16424653441680143,
                "343": -0.26506218155512107,
                "344": -0.2877313506716621,
                "345": 0.12315289901900416,
                "346": 0.18393760855300947,
                "347": 0.0582038669021358,
                "348": -0.11190944490044527,
                "349": -0.33363047236163496,
                "350": -0.15286521801115613,
                "351": 0.16244906684226323,
                "352": -0.6727151213189265,
                "353": -0.07553316104069216,
                "354": 0.024949027228326495,
                "355": -0.004589054208314,
                "356": -0.230662818826818,
                "357": -0.3577262151987531,
                "358": 0.03389615598545208,
                "359": 0.08585262167258842,
                "360": -0.19320028399564157,
                "361": -0.031268466164837055,
                "362": -0.05748942252130277,
                "363": -0.8077855396519497,
                "364": 0.0002981472772900125,
                "365": 0.0016899665535941404,
                "366": 0.3981718301017903,
                "367": -0.22618652431757136,
                "368": -0.671620766459614,
                "369": 0.12953820133012495,
                "370": 0.29021928227790605,
                "371": 0.048057243585136855,
                "372": -0.2732849705196263,
                "373": -0.06530422976580208,
                "374": -1.017865262664487,
                "375": -0.1422640433039835,
                "376": 0.17964179814935194,
                "377": 0.17532454145263454,
                "378": -0.16883053766539605,
                "379": 0.047781761041982146,
                "380": 0.2795096114450734,
                "381": -0.02510380504138103,
                "382": 0.05863692464490906,
                "383": 0.15558398097451376,
                "384": -0.70408576063566,
                "385": 0.4265809466916366,
                "386": 0.18662058398340153,
                "387": -0.02259590732008377,
                "388": 0.09858985671927059,
                "389": -0.27055152541309274,
                "390": -0.19955078911945134,
                "391": 0.1875545782119811,
                "392": -0.46518588374653796,
                "393": -0.3607836788109144,
                "394": -0.3057423384960273,
                "395": -0.42124832286679254,
                "396": 0.7410578718230584,
                "397": -0.052272192045342586,
                "398": -0.21106205654281715,
                "399": 0.08977753691920091
            }
        },
        "b2": {
            "n": 4,
            "d": 1,
            "w": {"0": 0.30070994542400864, "1": 0.842390367766771, "2": 0.6641286680886163, "3": 1.0956000909345285}
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = trainedAgentData;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Data model that holds what the agent gets to see about the environment
 */
class AgentObservation {
    /**
     *
    // * @param {Array} visibles
     * @param {Array} costs
     * @param {int} score
     * @param {Array} position
     */
    constructor(/*visibles,*/ costs, score, position) {
        /**
         * @type {Array}
         */
        this.costs = costs;
        // this.visibles = visibles;
        /**
         * @type {Number}
         */
        this.score = score;
        this.position = position;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AgentObservation;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Data model that holds the environment's full internal state
 */
class State {
    /**
     * @param {Array} costs
     * @param {Array} position [x,y]
     * @param {Number} score
     * @param {Boolean} isComplete
     */
    constructor(costs, position, score, isComplete) {
        /**
         * @type {Array}
         */
        this.costs = costs;
        /**
         * @type {Array} position [x,y]
         */
        this.position = position;
        /**
         * @type {Number}
         */
        this.score = score;
        /**
         * @type {Boolean}
         */
        this.isComplete = isComplete;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = State;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__State__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);



/**
 * Returns a random initial starting state
 *
 * @returns {State}
 */
const generateInitialState = () => {
    return new __WEBPACK_IMPORTED_MODULE_0__State__["a" /* default */](
        generateRandomCosts(__WEBPACK_IMPORTED_MODULE_1__index__["b" /* config */].size),
        [Math.floor(__WEBPACK_IMPORTED_MODULE_1__index__["b" /* config */].size[0] / 2), 0],
        0,
        false
    );
};
/* harmony export (immutable) */ __webpack_exports__["a"] = generateInitialState;


/**
 * Generates a random set of costs for generated random environment states
 *
 * @param {Array} size
 * @returns {Array}
 */
function generateRandomCosts(size) {
    const costs = [];
    const min = 1;
    const max = 9;
    for (let xi = 0; xi < size[0]; xi++) {
        costs[xi] = [];
        for (let yi = 0; yi < size[1]; yi++) {
            let cost = Math.floor(Math.random() * (max - min + 1)) + min;

            if (cost < 7) {
                cost = 0;
            } else {
                cost = 9;
            }

            costs[xi][yi] = cost;
        }
    }
    return costs;
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_HtmlTableRenderer__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agent_LookFourAdjacentOneDown__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agent_LookThreeAdjacentTwoDown__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agent_LookThreeAdjacentThreeDown__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agent_LateralWallBouncer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agent_AlwaysDown__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agent_QLearner__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agent_QLearnerPreTrained__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__style_css__);











document.body.innerHTML =
    '<div id="info">Agent: <select id="agentSelector"></select>' +
    '<br>Speed Interval: <select id="interval">' +
    '<option value="no-render">0ms with no rendering</option>' +
    '<option value="0">0ms</option>' +
    '<option value="100">100ms</option>' +
    '<option value="200">200ms</option>' +
    '<option value="250" selected>250ms</option>' +
    '<option value="500">500ms</option>' +
    '<option value="1000">1000ms</option>' +
    '<option value="paused">Paused</option>' +
    '</select>' +
    '<pre id="score"></pre>' +
    '<pre>' +
    '\nGame Rules:' +
    '\n- Gain 4 points for every row lower you go' +
    '\n- Loose 4 points for every row higher you go' +
    '\n- Loose 9 points any time you move in a red square' +
    '\n- Get to the bottom row to complete the game' +
    '</pre>' +
    '</div>' +
    '<div id="rendererContainer"></div>';
const scoreElement = document.getElementById('score');

let enableRendering = true;
let autoPlay = true;
let environment;
let scoreSum = 0;
let gameCount = 0;
let lastGameScore = 0;
let speed = 250;
let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new __WEBPACK_IMPORTED_MODULE_1__renderer_HtmlTableRenderer__["a" /* default */](document.getElementById('rendererContainer'));


let agents = {
    'QLearnerPreTrainedOn3000Games - ranked 83': __WEBPACK_IMPORTED_MODULE_8__agent_QLearnerPreTrained__["a" /* default */],
    'QLearner': __WEBPACK_IMPORTED_MODULE_7__agent_QLearner__["a" /* default */],
    'LookThreeAdjacentThreeDown - ranked 103': __WEBPACK_IMPORTED_MODULE_4__agent_LookThreeAdjacentThreeDown__["a" /* default */],
    'LookThreeAdjacentTwoDown - ranked 101': __WEBPACK_IMPORTED_MODULE_3__agent_LookThreeAdjacentTwoDown__["a" /* default */],
    'LookFourAdjacentOneDown - ranked 94': __WEBPACK_IMPORTED_MODULE_2__agent_LookFourAdjacentOneDown__["a" /* default */],
    'LateralWallBouncer - ranked 78': __WEBPACK_IMPORTED_MODULE_5__agent_LateralWallBouncer__["a" /* default */],
    'AlwaysDown - ranked 29': __WEBPACK_IMPORTED_MODULE_6__agent_AlwaysDown__["a" /* default */],
};
for (agent in agents) {
    //Select the first agent in the list
    currentAgentName = agent;
    break;
}

function clearHistory() {
    gameCount = 0;
    lastGameScore = 0;
    scoreSum = 0;
}

function renderScore(score) {
    scoreElement.innerHTML =
        'Agent: ' + currentAgentName +
        '\nCurrent Score: ' + score +
        '\nLast Game Final Score: ' + lastGameScore +
        '\nAvg Final Score: ' + (Math.round(scoreSum / gameCount) || 0) +
        '\nGame Count: ' + gameCount;
}

function newGame() {
    environment = new __WEBPACK_IMPORTED_MODULE_0__environment__["a" /* default */]();

    agent = new agents[currentAgentName];

    if (enableRendering) {
        //@TODO have this render make the table its self inside a given div
        renderer.clear();
        renderer.render(environment.getAgentObservation(), environment.getGodObservation());
    } else {
        renderScore(0);//Makes score show up between games when rendering is disabled
    }
}

function takeAction(actionCode, agentObservation) {
    environment.applyAction(actionCode);
    let godObservation = environment.getGodObservation();

    if (godObservation.isComplete) {//@Find better way to communicate "isComplete"
        lastGameScore = agentObservation.score;
        scoreSum += agentObservation.score;
        gameCount += 1;
        newGame();
    }

    if (enableRendering) {
        renderer.render(agentObservation, godObservation);
        renderScore(agentObservation.score);
    }
}

let agentSelectorElement = document.getElementById('agentSelector');
for (agent in agents) {
    const optionElement = document.createElement('option');
    optionElement.text = agent;
    optionElement.value = agent;
    agentSelectorElement.appendChild(optionElement)
}
agentSelectorElement.addEventListener('change', (event) => {
    currentAgentName = agentSelectorElement.value;
    clearHistory();
    newGame();
});

document.getElementById('interval').addEventListener('change', (event) => {
    const value = event.target.value;
    enableRendering = true;
    autoPlay = true;
    if (value === 'no-render') {
        enableRendering = false;
        speed = 0;
        renderer.clear();
    } else if (value === 'paused') {
        autoPlay = false;
    } else {
        speed = value;
    }
    setupInterval();
});

function tick() {
    const agentObservation = environment.getAgentObservation();
    const action = agent.getAction(agentObservation);
    takeAction(action, agentObservation);
}

function setupInterval() {
    clearInterval(intervalReference);
    if (autoPlay) {
        if (enableRendering) {
            intervalReference = setInterval(tick, speed);
        } else {
            //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
            intervalReference = setInterval(function () {
                for (let i = 0; i < 100; i++) {
                    tick();
                }
            }, 0);
        }
    }
}

document.body.addEventListener('keydown', function (event) {
    takeAction(event.key, environment.getAgentObservation());
    if (enableRendering) {
        const agentObservation = environment.getAgentObservation();
        renderer.render(agentObservation, environment.getGodObservation());
        renderScore(agentObservation.score);
    }
});

newGame();
setupInterval();


/***/ })
/******/ ]);