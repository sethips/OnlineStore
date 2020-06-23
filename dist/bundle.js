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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Data.json":
/*!**************************!*\
  !*** ./src/js/Data.json ***!
  \**************************/
/*! exports provided: productsDataBase, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"productsDataBase\\\":[{\\\"name\\\":\\\"Eingerless gloves in camel\\\",\\\"pictures\\\":[\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-241_7c9b49ad-9f62-42cb-bb36-4ad90c5eea70_2048x.jpg\\\",\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-23_421d7906-0b30-4ab1-8f01-392a1419ad6f_2048x.jpg\\\"],\\\"price\\\":390,\\\"price-reduction\\\":0,\\\"color\\\":[\\\"black\\\"],\\\"description\\\":{\\\"title-1\\\":\\\"MUS ADIPISCING NISL\\\",\\\"p-1\\\":[\\\"Condimentum mi curae adipiscing a viverra id vel curae nec parturient elementum pharetra ante a orci a ad praesent himenaeos ultrices conubia a maecenas.A nisi elementum fringilla sodales suspendisse at accumsan dictum vestibulum parturient condimentum condimentum augue.\\\",\\\"Dui parturient ullamcorper a aptent sociosqu nisl a fringilla vestibulum adipiscing cras convallis pretium parturient senectus ridiculus nullam suspendisse ullamcorper vestibulum at quis dolor et a ullamcorper malesuada integer.Fusce urna parturient parturient eleifend ridiculus a morbi mattis.\\\"],\\\"title-2\\\":\\\"A nisi elementum fringilla sodales suspendisse at accumsan dictum vestibulum parturient condimentum condimentum a ullamcorper malesuada integer.\\\",\\\"p-2\\\":[\\\"A nisi elementum fringilla sodales suspendisse at accumsan dictum vestibulum parturient condimentum condimentum a ullamcorper malesuada integer.\\\"]},\\\"Category\\\":\\\"home\\\",\\\"stock\\\":100,\\\"Vendor\\\":\\\"Basel\\\"},{\\\"name\\\":\\\"Jeptum ring earrings\\\",\\\"pictures\\\":[\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/products/jewelry-2_a1d9a402-b051-4c85-8761-6e2a489eddcc_2048x.jpg\\\",\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/products/jewelry-12_8a0e17aa-c879-4127-98ea-6242dbf9568c_2048x.jpg\\\"],\\\"price\\\":299,\\\"price-reduction\\\":0,\\\"color\\\":[\\\"black\\\"],\\\"description\\\":{\\\"title-1\\\":\\\"PARTURIENT ADIPISCING\\\",\\\"p-1\\\":[\\\"Blandit parturient adipiscing faucibus fringilla vestibulum ultrices integer dolor parturient parturient at porta platea inceptos. Habitant dui ut fringilla eleifend tincidunt scelerisque porta a tortor adipiscing ullamcorper etiam imperdiet pulvinar vel facilisis potenti facilisis mi parturient sed per egestas vivamus a auctor eu curae. Id dui bibendum non enim accumsan leo habitant diam eu.\\\"],\\\"title-2\\\":\\\"FACILISIS MI PARTURIENT\\\",\\\"p-2\\\":[\\\"Etiam fermentum parturient Sociosqu leo mus odio ad vestibulum. Adipiscing praesent a ut mi nostra sed. Proin a taciti adipiscing tempor turpis. Mi netus eros nisi vulputate etiam. Massa mi suspendisse ligula vestibu.\\\"]},\\\"Category\\\":\\\"accessories\\\",\\\"stock\\\":100,\\\"Vendor\\\":\\\"Basel\\\"}]}\");\n\n//# sourceURL=webpack:///./src/js/Data.json?");

/***/ }),

/***/ "./src/js/DataBaseHandler.js":
/*!***********************************!*\
  !*** ./src/js/DataBaseHandler.js ***!
  \***********************************/
/*! exports provided: getProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getProduct\", function() { return getProduct; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar jsonDataBase = __webpack_require__(/*! ./Data.json */ \"./src/js/Data.json\");\n\nfunction getProduct(productName) {\n  var _iterator = _createForOfIteratorHelper(jsonDataBase.productsDataBase),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var product = _step.value;\n\n      if (product.name === productName) {\n        return product;\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n}\n\n//# sourceURL=webpack:///./src/js/DataBaseHandler.js?");

/***/ }),

/***/ "./src/js/DomModules.js":
/*!******************************!*\
  !*** ./src/js/DomModules.js ***!
  \******************************/
/*! exports provided: DOMElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMElements\", function() { return DOMElements; });\nvar DOMElements = {\n  featuredProducts: document.querySelector('#featuredProducts')\n};\n\n//# sourceURL=webpack:///./src/js/DomModules.js?");

/***/ }),

/***/ "./src/js/UI-Updater.js":
/*!******************************!*\
  !*** ./src/js/UI-Updater.js ***!
  \******************************/
/*! exports provided: displayProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayProduct\", function() { return displayProduct; });\nfunction displayProduct(product) {\n  var pageTemplate = \"<!-- main section -->\\n    <div class=\\\"container\\\">\\n      <div class=\\\"row\\\">\\n        <div class=\\\"col-sm-12 col-md-6 mb-5\\\">\\n          <div class=\\\"row\\\">\\n            <div class=\\\"col-3 order-sm-2 order-lg-1\\\"></div>\\n            <div class=\\\"col-12 col-lg-9 order-sm-1 order-lg-2\\\">\\n              <div class=\\\"card border-0\\\">\\n                <img src=\\\"\".concat(product.pictures[0], \"\\\" class=\\\"img-fluid\\\" alt=\\\"\\\" />\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n    \\n        <!-- title and description -->\\n        <div class=\\\"col-sm-12 col-md-6 px-4\\\">\\n          <h1 class=\\\"my-3 FontSize28\\\">\").concat(product.name, \"</h1>\\n          <p class=\\\"my-3\\\">\\n            <span class=\\\"money h2 text-info\\\">\").concat(product.price, \"</span>\\n          </p>\\n          <p class=\\\"my-3\\\">\\n            <span class=\\\"text-danger\\\"> 11 sold in last 15 hours</span>\\n          </p>\\n          <p class=\\\"my-3\\\" style=\\\"font-size: 14px;\\\">\\n            MUS ADIPISCING NISL Condimentum mi curae adipiscing a viverra id vel\\n            curae nec parturient elementum pharetra ante a orci a ad praesent\\n            himenaeos ultrices conubia a maecenas.A nisi elementum fringilla\\n            sodales...\\n          </p>\\n          <div class=\\\"text-center my-3\\\">\\n            <p class=\\\"font-weight-bold mb-0\\\">\\n              HURRY! ONLY <span class=\\\"number text-info\\\">15</span> LEFT IN STOCK.\\n            </p>\\n    \\n            <!-- progress bar -->\\n            <div class=\\\"progress rounded-0 mb-3\\\" style=\\\"height: 10px;\\\">\\n              <div\\n                class=\\\"progress-bar progress-bar-striped progress-bar-animated bg-info\\\"\\n                role=\\\"progressbar\\\"\\n                style=\\\"width: 25%;\\\"\\n                aria-valuenow=\\\"25\\\"\\n                aria-valuemin=\\\"0\\\"\\n                aria-valuemax=\\\"100\\\"\\n              ></div>\\n            </div>\\n          </div>\\n    \\n          <!-- timer -->\\n          <div class=\\\"time d-none d-lg-flex justify-content-around w-100 my-3\\\">\\n            <div class=\\\"d-flex flex-column align-items-center\\\">\\n              <span class=\\\"time-day\\\" style=\\\"font-size: 40px;\\\">0</span\\n              ><span>DAYS</span>\\n            </div>\\n            <div class=\\\"d-flex flex-column align-items-center\\\">\\n              <span class=\\\"time-day\\\" style=\\\"font-size: 40px;\\\">00</span\\n              ><span>HOURS</span>\\n            </div>\\n            <div class=\\\"d-flex flex-column align-items-center\\\">\\n              <span class=\\\"time-minutes\\\" style=\\\"font-size: 40px;\\\">50</span\\n              ><span>MINUTES</span>\\n            </div>\\n            <div class=\\\"d-flex flex-column align-items-center\\\">\\n              <span class=\\\"time-seconds\\\" style=\\\"font-size: 40px;\\\">00</span\\n              ><span>SECONDS</span>\\n            </div>\\n          </div>\\n    \\n          <!-- color section -->\\n          <div class=\\\"d-flex align-items-center my-4\\\">\\n            <span>Color: </span>\\n            <div\\n              class=\\\"pb-1 ml-3\\\"\\n              style=\\\"border-bottom: solid 2px \").concat(product.color[0], \";\\\"\\n            >\\n              <div\\n                class=\\\"rounded-circle\\\"\\n                style=\\\"width: 25px; height: 25px; background-color: \").concat(product.color[0], \";\\\"\\n              ></div>\\n            </div>\\n          </div>\\n    \\n          <!-- number of items -->\\n          <div class=\\\"input-group w-25 my-3\\\">\\n            <div class=\\\"input-group-prepend\\\">\\n              <span class=\\\"input-group-text\\\" id=\\\"basic-addon1\\\">-</span>\\n            </div>\\n            <input\\n              type=\\\"text\\\"\\n              class=\\\"form-control text-center\\\"\\n              placeholder=\\\"\\\"\\n              aria-label=\\\"\\\"\\n              aria-describedby=\\\"basic-addon1\\\"\\n              value=\\\"1\\\"\\n            />\\n            <div class=\\\"input-group-append\\\">\\n              <span class=\\\"input-group-text\\\" id=\\\"basic-addon1\\\">+</span>\\n            </div>\\n          </div>\\n    \\n          <!-- cart buttons -->\\n          <button\\n            type=\\\"button\\\"\\n            name=\\\"\\\"\\n            id=\\\"\\\"\\n            class=\\\"btn black-bg text-white btn-block\\\"\\n          >\\n            ADD TO CART\\n          </button>\\n          <button\\n            type=\\\"button\\\"\\n            name=\\\"\\\"\\n            id=\\\"\\\"\\n            class=\\\"btn bg-info text-white btn-block\\\"\\n          >\\n            ADD TO CART\\n          </button>\\n    \\n          <!-- shipping estimates -->\\n          <div class=\\\"mt-5 mb-4\\\">\\n            <span class=\\\"font-weight-bold\\\" style=\\\"font-size: 15px;\\\"\\n              >Order in the next\\n              <span class=\\\"bg-info px-2 py-1 text-white rounded shadow-sm mb-5\\\"\\n                >1 hours 1 minutes</span\\n              >\\n              to get it by <span class=\\\"time\\\">Monday 06/29/2020</span>\\n            </span>\\n          </div>\\n    \\n          <!-- badges -->\\n          <div class=\\\"text-center\\\">\\n            <img\\n              src=\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/files/trustseal_499x.png?v=1575378615\\\"\\n              class=\\\"img-fluid\\\"\\n              alt=\\\"\\\"\\n            />\\n          </div>\\n    \\n          <hr />\\n    \\n          <!-- vendor info -->\\n          <div\\n            class=\\\"d-flex flex-column font-weight-bold text-muted my-3\\\"\\n            style=\\\"font-size: 14px;\\\"\\n          >\\n            <span class=\\\"my-2\\\">\\n              Vendor: <span class=\\\"vendor\\\">\").concat(product.Vendor, \"</span></span\\n            >\\n            <span class=\\\"my-2\\\"> SKU: <span class=\\\"stock\\\">N/A</span></span>\\n            <span class=\\\"my-2\\\">\\n              Share: <i class=\\\"fa fa-facebook custom-cursor mx-2\\\"></i>\\n              <i class=\\\"fa fa-twitter custom-cursor mx-2\\\"></i>\\n              <i class=\\\"fa fa-envelope custom-cursor mx-2\\\"></i>\\n              <i class=\\\"fa fa-pinterest custom-cursor mx-2\\\"></i>\\n              <i class=\\\"fa fa-tumblr custom-cursor mx-2\\\"></i>\\n            </span>\\n            <span class=\\\"my-2\\\">\\n              Real time\\n              <span class=\\\"bg-info px-2 py-1 text-white rounded shadow-sm mb-5\\\"\\n                >66</span\\n              >\\n              Visitor right now\\n            </span>\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n    \\n    <!-- product description -->\\n    <div class=\\\"bg-light py-4 my-5 px-2 px-md-5\\\">\\n      <ul\\n        class=\\\"nav flex-column flex-md-row justify-content-center align-items-center bg-light description-nav font-weight-bold\\\"\\n        id=\\\"myTab\\\"\\n        role=\\\"tablist\\\"\\n      >\\n        <li class=\\\"nav-item custom-nav\\\">\\n          <a\\n            class=\\\"nav-link active\\\"\\n            id=\\\"Description-tab\\\"\\n            data-toggle=\\\"tab\\\"\\n            href=\\\"#Description\\\"\\n            role=\\\"tab\\\"\\n            aria-controls=\\\"Description\\\"\\n            aria-selected=\\\"true\\\"\\n            >Description</a\\n          >\\n        </li>\\n        <li class=\\\"nav-item custom-nav\\\">\\n          <a\\n            class=\\\"nav-link\\\"\\n            id=\\\"Additional-Information-tab\\\"\\n            data-toggle=\\\"tab\\\"\\n            href=\\\"#Additional-Information\\\"\\n            role=\\\"tab\\\"\\n            aria-controls=\\\"Additional-Information\\\"\\n            aria-selected=\\\"false\\\"\\n            >Additional-Information</a\\n          >\\n        </li>\\n        <li class=\\\"nav-item custom-nav\\\">\\n          <a\\n            class=\\\"nav-link\\\"\\n            id=\\\"Reviews-tab\\\"\\n            data-toggle=\\\"tab\\\"\\n            href=\\\"#Reviews\\\"\\n            role=\\\"tab\\\"\\n            aria-controls=\\\"Reviews\\\"\\n            aria-selected=\\\"false\\\"\\n            >Reviews</a\\n          >\\n        </li>\\n        <li class=\\\"nav-item custom-nav\\\">\\n          <a\\n            class=\\\"nav-link\\\"\\n            id=\\\"Shipping-Delivery-tab\\\"\\n            data-toggle=\\\"tab\\\"\\n            href=\\\"#Shipping-Delivery\\\"\\n            role=\\\"tab\\\"\\n            aria-controls=\\\"Shipping-Delivery\\\"\\n            aria-selected=\\\"false\\\"\\n            >Shipping-Delivery</a\\n          >\\n        </li>\\n      </ul>\\n      <div class=\\\"tab-content\\\" id=\\\"myTabContent\\\">\\n        <div\\n          class=\\\"tab-pane fade show active\\\"\\n          id=\\\"Description\\\"\\n          role=\\\"tabpanel\\\"\\n          aria-labelledby=\\\"Description-tab\\\"\\n        >\\n          <div class=\\\"row w-100 mx-0 pt-4\\\">\\n            <div class=\\\"col-sm-12 col-md-6 ml-sm-4 ml-md-0\\\">\\n              <div class=\\\"firstWrapper\\\" id=\\\"#description\\\">\\n                <h5 class=\\\"mb-4 font-weight-bold\\\" style=\\\"font-size: 18px;\\\">\\n                  \").concat(product.description.title - 1, \"\\n                </h5>\\n                <p style=\\\"font-size: 14px;\\\">\\n                  \").concat(product.description.p - 1[0], \"\\n                </p>\\n    \\n                <p style=\\\"font-size: 14px;\\\">\\n                  \").concat(product.description.p - 1[1], \"\\n                </p>\\n    \\n                <h5 class=\\\"my-4 font-weight-bold\\\" style=\\\"font-size: 18px;\\\">\\n                  \").concat(product.description.title - 2, \"\\n                </h5>\\n    \\n                <p style=\\\"font-size: 14px;\\\">\\n                  \").concat(product.description.p - 2[0], \"\\n                </p>\\n              </div>\\n            </div>\\n            <div class=\\\"col-sm-12 col-md-6 px-0\\\">\\n              <!-- product carousel -->\\n              <div class=\\\"row w-100 mx-0 w-100\\\">\\n                <h5 class=\\\"font-weight-bold pl-4 mb-0\\\" style=\\\"font-size: 18px;\\\">\\n                  SHOP THE LOOK\\n                </h5>\\n                <div class=\\\"col-12 w-100 p-0\\\">\\n                  <div\\n                    id=\\\"myCarousel\\\"\\n                    class=\\\"carousel slide\\\"\\n                    data-ride=\\\"carousel\\\"\\n                    data-interval=\\\"0\\\"\\n                  >\\n                    <!-- Carousel indicators -->\\n                    <ol class=\\\"carousel-indicators\\\">\\n                      <li\\n                        data-target=\\\"#myCarousel\\\"\\n                        data-slide-to=\\\"0\\\"\\n                        class=\\\"active\\\"\\n                      ></li>\\n                      <li data-target=\\\"#myCarousel\\\" data-slide-to=\\\"1\\\"></li>\\n                    </ol>\\n                    <!-- Wrapper for carousel items -->\\n                    <div class=\\\"carousel-inner\\\">\\n                      <div class=\\\"item carousel-item active h-auto pt-3 pb-5\\\">\\n                        <div class=\\\"row w-100 mx-0 px-3\\\">\\n                          <div class=\\\"col-6 px-1\\\">\\n                            <div class=\\\"img-box my-3\\\">\\n                              <img\\n                                src=\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-21_1_1a51cd0d-6911-4536-af1c-1a475b3792a6_1512x.jpg\\\"\\n                                class=\\\"img-fluid h-auto\\\"\\n                                alt=\\\"\\\"\\n                              />\\n                            </div>\\n                          </div>\\n                          <div class=\\\"col-6 px-1\\\">\\n                            <div class=\\\"img-box my-3\\\">\\n                              <img\\n                                src=\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-14_9e7e1119-5ef5-437f-b1c9-959d06f85d3c_1728x.jpg\\\"\\n                                class=\\\"img-fluid h-auto\\\"\\n                                alt=\\\"\\\"\\n                              />\\n                            </div>\\n                          </div>\\n                        </div>\\n                      </div>\\n                      <div class=\\\"item carousel-item h-auto pt-3 pb-5\\\">\\n                        <div class=\\\"row w-100 mx-0 px-3\\\">\\n                          <div class=\\\"col-6 px-1\\\">\\n                            <div class=\\\"img-box my-3\\\">\\n                              <img\\n                                src=\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-23_421d7906-0b30-4ab1-8f01-392a1419ad6f_1728x.jpg\\\"\\n                                class=\\\"img-fluid h-auto\\\"\\n                                alt=\\\"\\\"\\n                              />\\n                            </div>\\n                          </div>\\n                          <div class=\\\"col-6 px-1\\\">\\n                            <div class=\\\"img-box my-3\\\">\\n                              <img\\n                                src=\\\"https://cdn.shopify.com/s/files/1/0102/4383/3952/products/accessories-16_64fd0422-07ec-4407-b434-a573bbdf3300_1728x.jpg\\\"\\n                                class=\\\"img-fluid h-auto\\\"\\n                                alt=\\\"\\\"\\n                              />\\n                            </div>\\n                          </div>\\n                        </div>\\n                      </div>\\n                    </div>\\n                    <!-- Carousel controls -->\\n                    <!-- <a class=\\\"carousel-control left carousel-control-prev\\\" href=\\\"#myCarousel\\\" data-slide=\\\"prev\\\">\\n                                <i class=\\\"fa fa-angle-left\\\"></i>\\n                            </a>\\n                            <a class=\\\"carousel-control right carousel-control-next\\\" href=\\\"#myCarousel\\\" data-slide=\\\"next\\\">\\n                                <i class=\\\"fa fa-angle-right\\\"></i>\\n                            </a> -->\\n                  </div>\\n                </div>\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n        <div\\n          class=\\\"tab-pane fade\\\"\\n          id=\\\"Additional-Information\\\"\\n          role=\\\"tabpanel\\\"\\n          aria-labelledby=\\\"Additional-Information-tab\\\"\\n        >\\n          <div class=\\\"w-100 h-100 d-flex justify-content-center py-5\\\">\\n            <h4>Color:</h4>\\n            <h4>\").concat(product.color[0], \"</h4>\\n          </div>\\n        </div>\\n        <div\\n          class=\\\"tab-pane fade\\\"\\n          id=\\\"Reviews\\\"\\n          role=\\\"tabpanel\\\"\\n          aria-labelledby=\\\"Reviews-tab\\\"\\n        >\\n          <div class=\\\"w-100 h-100 d-flex flex-column text-center py-5\\\">\\n            <h4>There are no reviews</h4>\\n            <h4>\\n              Be the first to <span class=\\\"text-warning\\\">Write a review</span>\\n            </h4>\\n          </div>\\n        </div>\\n        <div\\n          class=\\\"tab-pane fade\\\"\\n          id=\\\"Shipping-Delivery\\\"\\n          role=\\\"tabpanel\\\"\\n          aria-labelledby=\\\"Shipping-Delivery-tab\\\"\\n        >\\n          <div class=\\\"content-wrapper mb-lg-5\\\">\\n            <div class=\\\"p-5\\\">\\n              <img\\n                src=\\\"https://cdn.shopify.com/s/files/1/1933/6253/files/shipping.jpg?2957050064640912120\\\"\\n                class=\\\"img-fluid float-left mr-4\\\"\\n                alt=\\\"\\\"\\n              />\\n              <p class=\\\"\\\">\\n                Vestibulum curae torquent diam diam commodo parturient penatibus\\n                nunc dui adipiscing convallis bulum parturient suspendisse\\n                parturient a.Parturient in parturient scelerisque nibh lectus quam a\\n                natoque adipiscing a vestibulum hendrerit et pharetra\\n                fames.Consequat net Vestibulum parturient suspendisse parturient\\n                a.Parturient in parturient scelerisque nibh lectus quam a natoque\\n                adipiscing a vestibulum hendrerit et pharetra fames.Consequat netus.\\n                Scelerisque adipiscing bibendum sem vestibulum et in a a a purus\\n                lectus faucibus lobortis tincidunt purus lectus nisl class\\n                eros.Condimentum a et ullamcorper dictumst mus et tristique\\n                elementum nam inceptos hac vestibulum amet elit\\n              </p>\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n    \");\n  console.log(pageTemplate);\n}\n\n//# sourceURL=webpack:///./src/js/UI-Updater.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DataBaseHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataBaseHandler */ \"./src/js/DataBaseHandler.js\");\n/* harmony import */ var _UI_Updater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI-Updater */ \"./src/js/UI-Updater.js\");\n/* harmony import */ var _DomModules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DomModules */ \"./src/js/DomModules.js\");\n\n\n\nvar DomElements = _DomModules__WEBPACK_IMPORTED_MODULE_2__[\"DOMElements\"];\nDomElements.featuredProducts.addEventListener('click', function (e) {\n  var clickedProduct = _DataBaseHandler__WEBPACK_IMPORTED_MODULE_0__[\"getProduct\"](e.target.textContent);\n  _UI_Updater__WEBPACK_IMPORTED_MODULE_1__[\"displayProduct\"](clickedProduct);\n});\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });