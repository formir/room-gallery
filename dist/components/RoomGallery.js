var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, createContext, Suspense, forwardRef, useImperativeHandle } from 'react';
import { useSwipeable } from "react-swipeable";
import { ArrowNav, DarkNav, ZoomNav, DarkMode, ZoomMode, PaginationsNav, Paginations, PaginationsOnZoom, ArrowNavOnZoom, StylesVariables, sanitizeHtmlAllowedTags, sanitizeHtmlAllowedAttributes } from '../types/types';
import { Room } from './Room';
import { parseRooms, parseWalls, kebabize } from '../helpers/parse';
import { NextIcon, PrevIcon, LightOffIcon, ZoomInIcon, ZoomOutIcon } from '../helpers/icons';
export var roomGalleryDefaultSettings = {
    arrowNav: ArrowNav.number,
    darkNav: DarkNav.button,
    zoomNav: ZoomNav.button,
    darkMode: DarkMode.manual,
    zoomMode: ZoomMode.manual,
    paginationsNav: PaginationsNav.button,
    paginations: Paginations.number,
    paginationsOnZoom: PaginationsOnZoom.hide,
    arrowNavOnZoom: ArrowNavOnZoom.show,
    defaultPosition: { x: 0, y: 0 },
    swipeToNav: true,
    swipeToZoom: true,
    keypressToNav: true,
    keypressToZoom: true,
    animationSpeed: { min: 2, ratio: 1 },
    allOnOneWall: false,
    sanitizeHtml: true,
    sanitizeHtmlOptions: {
        allowedTags: Object.values(sanitizeHtmlAllowedTags),
        allowedAttributes: Object.values(sanitizeHtmlAllowedAttributes)
    }
};
export var GalleryContext = createContext({ position: roomGalleryDefaultSettings.defaultPosition, zoom: roomGalleryDefaultSettings.zoomMode === 'in', settings: roomGalleryDefaultSettings });
export var RoomGallery = forwardRef(function (_a, ref) {
    var fetchMethod = _a.fetch, dataItems = _a.items, styles = _a.styles, children = _a.children, dataSettings = _a.settings;
    var settings = __assign(__assign({}, roomGalleryDefaultSettings), dataSettings);
    var _b = useState({
        items: [],
        rooms: [],
        activeItem: { index: 0 },
        prevItem: { index: 0 }
    }), currentState = _b[0], setCurrentState = _b[1];
    var _c = useState(settings.defaultPosition), position = _c[0], setPosition = _c[1];
    var _d = useState(settings.darkMode === DarkMode.dark), dark = _d[0], setDark = _d[1];
    var _e = useState(settings.zoomMode === ZoomMode.in), zoom = _e[0], setZoom = _e[1];
    var value = { currentState: currentState, zoom: zoom, dark: dark, position: position, settings: settings };
    var clear = function () {
        setCurrentState({
            items: [],
            rooms: [],
            activeItem: { index: 0 },
            prevItem: { index: 0 }
        });
        setPosition(settings.defaultPosition);
        setDark(settings.darkMode === DarkMode.dark);
        setZoom(settings.zoomMode === ZoomMode.in);
    };
    var build = function () {
        var _a, _b;
        var preItems = [];
        var preRooms = [];
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onInit) === 'function')
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onInit(value);
        if (children) {
            parseItems({ childrenItems: children, preItems: preItems, preRooms: preRooms });
        }
        else if (dataItems && (dataItems === null || dataItems === void 0 ? void 0 : dataItems.length) > 0 && typeof dataItems === 'object') {
            if (dataItems[0] instanceof HTMLElement) {
                parseItems({ elementItems: dataItems, preItems: preItems, preRooms: preRooms });
            }
            else {
                parseItems({ dataItems: dataItems, preItems: preItems, preRooms: preRooms });
            }
        }
        else if (fetchMethod && typeof fetchMethod === 'string') {
            dataFetch(fetchMethod).then(function (fetchItems) {
                parseItems({ dataItems: fetchItems, preItems: preItems, preRooms: preRooms });
            });
        }
        else if (fetchMethod && typeof fetchMethod === 'function') {
            fetchMethod().then(function (fetchItems) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    parseItems({ dataItems: fetchItems, preItems: preItems, preRooms: preRooms });
                    return [2 /*return*/];
                });
            }); });
        }
        else {
            parseItems({ dataItems: [{ title: settings.emptyMessage || 'It looks like there\'s nothing here. Visit us in a moment' }], preRooms: [], preItems: [] });
            console.error('No fetch methods or items provided. Use one of this props: fetch, items');
        }
    };
    var parseItems = function (_a) {
        var _b, _c;
        var dataItems = _a.dataItems, elementItems = _a.elementItems, childrenItems = _a.childrenItems, preItems = _a.preItems, preRooms = _a.preRooms;
        var itemsToParse = [];
        if (childrenItems) {
            itemsToParse = __spreadArray([], (Array.isArray(childrenItems) ? childrenItems : [childrenItems]), true);
            var newItems_1 = [];
            itemsToParse.forEach(function (element) {
                newItems_1.push({ element: element });
            });
            itemsToParse = newItems_1;
        }
        else if (elementItems) {
            itemsToParse = __spreadArray([], elementItems, true);
            var newItems_2 = [];
            itemsToParse.forEach(function (element) {
                newItems_2.push({ HtmlElement: element });
            });
            itemsToParse = newItems_2;
        }
        else {
            itemsToParse = dataItems;
        }
        parseRooms(itemsToParse, preRooms, settings.allOnOneWall);
        var activeItem = parseWalls(itemsToParse, preItems, preRooms, position, settings.allOnOneWall);
        if (activeItem)
            setCurrentState({
                rooms: preRooms,
                items: preItems,
                activeItem: activeItem,
                prevItem: currentState.activeItem
            });
        if (typeof ((_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onRender) === 'function')
            (_c = settings === null || settings === void 0 ? void 0 : settings.event) === null || _c === void 0 ? void 0 : _c.onRender(value);
    };
    var gotoNextItem = function () {
        var _a, _b;
        var nextItem = getNextItem();
        if (nextItem) {
            setCurrent(nextItem);
            if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onShowNext) === 'function')
                (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onShowNext(value);
        }
    };
    var getNextItem = function () {
        if (typeof currentState.activeItem.index === 'number')
            return currentState.activeItem.index < currentState.items.length ?
                currentState.items[currentState.activeItem.index + 1] :
                currentState.items[currentState.items.length];
    };
    var gotoPrevItem = function () {
        var _a, _b;
        var prevItem = getPrevItem();
        if (prevItem) {
            setCurrent(prevItem);
            if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onShowPrev) === 'function')
                (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onShowPrev(value);
        }
    };
    var getPrevItem = function () {
        if (typeof currentState.activeItem.index === 'number')
            return currentState.activeItem.index > 0 ?
                currentState.items[currentState.activeItem.index - 1] :
                currentState.items[0];
    };
    var getCurrentItem = function () {
        return currentState.activeItem;
    };
    var setCurrent = function (item) {
        setCurrentState(__assign(__assign({}, currentState), { activeItem: item, prevItem: currentState.activeItem }));
        if (item.position)
            setPosition({ y: item.position.y, x: item.position.x });
    };
    var toggleDarkMode = function () {
        var _a, _b, _c, _d;
        setDark(function (prevDark) { return !prevDark; });
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onDarkModeOn) === 'function' && !dark)
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onDarkModeOn(value);
        if (typeof ((_c = settings === null || settings === void 0 ? void 0 : settings.event) === null || _c === void 0 ? void 0 : _c.onDarkModeOff) === 'function' && dark)
            (_d = settings === null || settings === void 0 ? void 0 : settings.event) === null || _d === void 0 ? void 0 : _d.onDarkModeOff(value);
    };
    var setDarkMode = function (mode) {
        var _a, _b, _c, _d;
        setDark(mode);
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onDarkModeOn) === 'function' && !dark)
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onDarkModeOn(value);
        if (typeof ((_c = settings === null || settings === void 0 ? void 0 : settings.event) === null || _c === void 0 ? void 0 : _c.onDarkModeOff) === 'function' && dark)
            (_d = settings === null || settings === void 0 ? void 0 : settings.event) === null || _d === void 0 ? void 0 : _d.onDarkModeOff(value);
    };
    var toggleZoom = function () {
        var _a, _b, _c, _d;
        setZoom(function (prevZoom) { return !prevZoom; });
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onZoomIn) === 'function' && !zoom)
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onZoomIn(value);
        if (typeof ((_c = settings === null || settings === void 0 ? void 0 : settings.event) === null || _c === void 0 ? void 0 : _c.onZoomOut) === 'function' && zoom)
            (_d = settings === null || settings === void 0 ? void 0 : settings.event) === null || _d === void 0 ? void 0 : _d.onZoomOut(value);
    };
    var zoomOn = function () {
        var _a, _b;
        setZoom(true);
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onZoomOut) === 'function')
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onZoomOut(value);
    };
    var zoomOff = function () {
        var _a, _b;
        setZoom(false);
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onZoomIn) === 'function')
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onZoomIn(value);
    };
    var dataFetch = function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.items];
            }
        });
    }); };
    function isDarkMode() {
        return (settings.darkMode === DarkMode.manual && dark) || settings.darkMode === DarkMode.dark;
    }
    function isZoomed() {
        return (settings.zoomMode === ZoomMode.manual && zoom) || settings.zoomMode === ZoomMode.in;
    }
    var swipeHandlers = useSwipeable({
        onSwipedLeft: function () { return settings.swipeToNav && gotoNextItem(); },
        onSwipedRight: function () { return settings.swipeToNav && gotoPrevItem(); },
        onSwipedUp: function () { return settings.swipeToZoom && zoomOff(); },
        onSwipedDown: function () { return settings.swipeToZoom && zoomOn(); },
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true
    });
    function renderRooms() {
        return currentState.rooms.map(function (room, index) { return (React.createElement(Room, { key: index, index: index, room: room, rooms: currentState.rooms, activeItem: currentState.activeItem, prevItem: currentState.prevItem, position: position, settings: settings })); });
    }
    function renderPagination() {
        return settings.paginations !== Paginations.disabled &&
            ((isZoomed() && settings.paginationsOnZoom !== PaginationsOnZoom.hide) || !isZoomed()) &&
            React.createElement("div", { className: "room-paginations ".concat(settings.paginations === Paginations.thumb ? 'room-paginations-thumbs' : '') }, currentState.items.map(function (item, index) {
                var _a;
                return (item && React.createElement("button", { className: "".concat(index === currentState.activeItem.index ? 'active' : '', "\n              ").concat(settings.paginationsNav === PaginationsNav.text && settings.paginations !== Paginations.thumb ? ' room-icon' : ''), key: index, onClick: function () { return setCurrent(item); } },
                    settings.paginations === Paginations.number && React.createElement("span", null, index + 1),
                    settings.paginations === Paginations.title && React.createElement("span", null, item === null || item === void 0 ? void 0 : item.title),
                    settings.paginations === Paginations.thumb && (typeof (item === null || item === void 0 ? void 0 : item.image) === 'object' ? React.createElement("img", { src: (_a = item === null || item === void 0 ? void 0 : item.image) === null || _a === void 0 ? void 0 : _a.thumb }) : typeof (item === null || item === void 0 ? void 0 : item.image) === 'string' && React.createElement("img", { src: item === null || item === void 0 ? void 0 : item.image }))));
            }));
    }
    function renderZoomNav() {
        var _a, _b, _c, _d;
        return settings.zoomMode === ZoomMode.manual &&
            React.createElement(React.Fragment, null, isZoomed() ? React.createElement("button", { className: "room-exit-btn ".concat(settings.zoomNav === ZoomNav.icon ? 'room-icon' : ''), onClick: function () { return toggleZoom(); } }, (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _a === void 0 ? void 0 : _a.zoomOut) !== null && _b !== void 0 ? _b : React.createElement(ZoomOutIcon, null)) :
                React.createElement("button", { className: "room-zoom-btn ".concat(settings.zoomNav === ZoomNav.icon ? 'room-icon' : ''), onClick: function () { return toggleZoom(); } }, (_d = (_c = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _c === void 0 ? void 0 : _c.zoomIn) !== null && _d !== void 0 ? _d : React.createElement(ZoomInIcon, null)));
    }
    function renderDarkNav() {
        var _a, _b, _c, _d;
        return settings.darkMode === DarkMode.manual &&
            React.createElement("button", { className: "room-dark-btn ".concat(settings.darkNav === DarkNav.icon ? 'room-icon' : ''), onClick: function () { return toggleDarkMode(); } }, isDarkMode() ? (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _a === void 0 ? void 0 : _a.lightOn) !== null && _b !== void 0 ? _b : React.createElement(LightOffIcon, null) : (_d = (_c = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _c === void 0 ? void 0 : _c.lightOff) !== null && _d !== void 0 ? _d : React.createElement(LightOffIcon, null));
    }
    function renderArrowNav() {
        var _a, _b, _c, _d;
        return typeof currentState.activeItem.index === 'number' && settings.arrowNav !== ArrowNav.disabled &&
            React.createElement("div", { className: "room-navigations" },
                currentState.activeItem.index > 0 && getPrevItem() &&
                    ((isZoomed() && settings.arrowNavOnZoom !== ArrowNavOnZoom.hide) || !isZoomed()) &&
                    settings.arrowNav && React.createElement(React.Fragment, null, ['number', 'blank'].includes(settings.arrowNav) ?
                    React.createElement("button", { className: "room-prev", onClick: function () { return gotoPrevItem(); } }, settings.arrowNav === ArrowNav.number && React.createElement("span", null, currentState.activeItem.index)) :
                    React.createElement("button", { className: "room-prev room-icon", onClick: function () { return gotoPrevItem(); } }, (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _a === void 0 ? void 0 : _a.prev) !== null && _b !== void 0 ? _b : React.createElement(PrevIcon, null))),
                currentState.items.length > currentState.activeItem.index + 1 && getNextItem() &&
                    ((isZoomed() && settings.arrowNavOnZoom !== ArrowNavOnZoom.hide) || !isZoomed()) &&
                    settings.arrowNav && React.createElement(React.Fragment, null, ['number', 'blank'].includes(settings.arrowNav) ?
                    React.createElement("button", { className: "room-next", onClick: function () { return gotoNextItem(); } }, settings.arrowNav === ArrowNav.number && React.createElement("span", null, currentState.activeItem.index + 2.0)) :
                    React.createElement("button", { className: "room-next room-icon", onClick: function () { return gotoNextItem(); } }, (_d = (_c = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _c === void 0 ? void 0 : _c.next) !== null && _d !== void 0 ? _d : React.createElement(NextIcon, null))));
    }
    function Loading() {
        return React.createElement("h2", null, "Loading...");
    }
    useEffect(function () {
        build();
    }, []);
    useEffect(function () {
        var handleKeyDown = function (event) {
            switch (event.key) {
                case 'ArrowUp':
                    settings.keypressToZoom && zoomOn();
                    break;
                case 'ArrowDown':
                    settings.keypressToZoom && zoomOff();
                    break;
                case 'ArrowLeft':
                    settings.keypressToNav && gotoPrevItem();
                    break;
                case 'ArrowRight':
                    settings.keypressToNav && gotoNextItem();
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentState.items, position]);
    useEffect(function () {
        var root = document.querySelector(':root');
        if (root instanceof HTMLElement) {
            var rootStyle_1 = root.style;
            styles && Object.keys(styles).forEach(function (key) {
                if (key && key in StylesVariables) {
                    rootStyle_1.setProperty('--room-' + kebabize(key), styles[key]);
                }
            });
        }
    }, [styles]);
    useImperativeHandle(ref, function () {
        return {
            gotoNextItem: function () {
                gotoNextItem();
            },
            gotoPrevItem: function () {
                gotoPrevItem();
            },
            toggleDarkMode: function () {
                toggleDarkMode();
            },
            setDarkMode: function (mode) {
                setDarkMode(mode);
            },
            toggleZoom: function () {
                toggleZoom();
            },
            setZoom: function (zoom) {
                setZoom(zoom);
            },
            getCurrentItem: function () {
                return getCurrentItem();
            },
            refresh: function () {
                clear();
                build();
            },
            clear: function () {
                clear();
            }
        };
    }, [currentState]);
    return (React.createElement(GalleryContext.Provider, { value: value },
        React.createElement(Suspense, { fallback: React.createElement(Loading, null) }, currentState && currentState.rooms.length > 0 &&
            React.createElement("div", __assign({ className: "room-gallery".concat(isDarkMode() ? ' room-dark' : '').concat(isZoomed() ? ' room-zoom' : '') }, swipeHandlers),
                React.createElement("div", { className: "room-body" },
                    React.createElement("div", { className: "room-arena" }, renderRooms()),
                    renderArrowNav(),
                    renderPagination(),
                    renderZoomNav(),
                    renderDarkNav())))));
});
