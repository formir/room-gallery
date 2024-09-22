"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGallery = exports.GalleryContext = exports.roomGalleryDefaultSettings = void 0;
const react_1 = __importStar(require("react"));
const react_swipeable_1 = require("react-swipeable");
const types_1 = require("../types/types");
const Room_1 = require("./Room");
const parse_1 = require("../helpers/parse");
const icons_1 = require("../helpers/icons");
exports.roomGalleryDefaultSettings = {
    arrowNav: types_1.ArrowNav.number,
    darkNav: types_1.DarkNav.button,
    zoomNav: types_1.ZoomNav.button,
    darkMode: types_1.DarkMode.manual,
    zoomMode: types_1.ZoomMode.manual,
    paginationsNav: types_1.PaginationsNav.button,
    paginations: types_1.Paginations.number,
    paginationsOnZoom: types_1.PaginationsOnZoom.hide,
    arrowNavOnZoom: types_1.ArrowNavOnZoom.show,
    defaultPosition: { x: 0, y: 0 },
    swipeToNav: true,
    swipeToZoom: true,
    keypressToNav: true,
    keypressToZoom: true,
    animationSpeed: { min: 2, ratio: 1 },
    allOnOneWall: false,
    sanitizeHtml: true,
    sanitizeHtmlOptions: {
        allowedTags: Object.values(types_1.sanitizeHtmlAllowedTags),
        allowedAttributes: Object.values(types_1.sanitizeHtmlAllowedAttributes)
    }
};
exports.GalleryContext = (0, react_1.createContext)({ position: exports.roomGalleryDefaultSettings.defaultPosition, zoom: exports.roomGalleryDefaultSettings.zoomMode === 'in', settings: exports.roomGalleryDefaultSettings });
exports.RoomGallery = (0, react_1.forwardRef)(({ fetch: fetchMethod, items: dataItems, styles, children, settings: dataSettings, }, ref) => {
    const settings = Object.assign(Object.assign({}, exports.roomGalleryDefaultSettings), dataSettings);
    const [currentState, setCurrentState] = (0, react_1.useState)({
        items: [],
        rooms: [],
        activeItem: { index: 0 },
        prevItem: { index: 0 }
    });
    const [position, setPosition] = (0, react_1.useState)(settings.defaultPosition);
    const [dark, setDark] = (0, react_1.useState)(settings.darkMode === types_1.DarkMode.dark);
    const [zoom, setZoom] = (0, react_1.useState)(settings.zoomMode === types_1.ZoomMode.in);
    const value = { currentState, zoom, dark, position, settings };
    const clear = () => {
        setCurrentState({
            items: [],
            rooms: [],
            activeItem: { index: 0 },
            prevItem: { index: 0 }
        });
        setPosition(settings.defaultPosition);
        setDark(settings.darkMode === types_1.DarkMode.dark);
        setZoom(settings.zoomMode === types_1.ZoomMode.in);
    };
    const build = () => {
        var _a, _b;
        const preItems = [];
        const preRooms = [];
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onInit) === 'function')
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onInit(value);
        if (children) {
            parseItems({ childrenItems: children, preItems, preRooms });
        }
        else if (dataItems && (dataItems === null || dataItems === void 0 ? void 0 : dataItems.length) > 0 && typeof dataItems === 'object') {
            if (dataItems[0] instanceof HTMLElement) {
                parseItems({ elementItems: dataItems, preItems, preRooms });
            }
            else {
                parseItems({ dataItems, preItems, preRooms });
            }
        }
        else if (fetchMethod && typeof fetchMethod === 'string') {
            dataFetch(fetchMethod).then((fetchItems) => {
                parseItems({ dataItems: fetchItems, preItems, preRooms });
            });
        }
        else if (fetchMethod && typeof fetchMethod === 'function') {
            fetchMethod().then((fetchItems) => __awaiter(void 0, void 0, void 0, function* () {
                parseItems({ dataItems: fetchItems, preItems, preRooms });
            }));
        }
        else {
            parseItems({ dataItems: [{ title: settings.emptyMessage || 'It looks like there\'s nothing here. Visit us in a moment' }], preRooms: [], preItems: [] });
            console.error('No fetch methods or items provided. Use one of this props: fetch, items');
        }
    };
    const parseItems = ({ dataItems, elementItems, childrenItems, preItems, preRooms }) => {
        var _a, _b;
        let itemsToParse = [];
        if (childrenItems) {
            itemsToParse = [...(Array.isArray(childrenItems) ? childrenItems : [childrenItems])];
            const newItems = [];
            itemsToParse.forEach((element) => {
                newItems.push({ element: element });
            });
            itemsToParse = newItems;
        }
        else if (elementItems) {
            itemsToParse = [...elementItems];
            const newItems = [];
            itemsToParse.forEach((element) => {
                newItems.push({ HtmlElement: element });
            });
            itemsToParse = newItems;
        }
        else {
            itemsToParse = dataItems;
        }
        (0, parse_1.parseRooms)(itemsToParse, preRooms, settings.allOnOneWall);
        const activeItem = (0, parse_1.parseWalls)(itemsToParse, preItems, preRooms, position, settings.allOnOneWall);
        if (activeItem)
            setCurrentState({
                rooms: preRooms,
                items: preItems,
                activeItem,
                prevItem: currentState.activeItem
            });
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onRender) === 'function')
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onRender(value);
    };
    const gotoNextItem = () => {
        var _a, _b;
        const nextItem = getNextItem();
        if (nextItem) {
            setCurrent(nextItem);
            if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onShowNext) === 'function')
                (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onShowNext(value);
        }
    };
    const getNextItem = () => {
        if (typeof currentState.activeItem.index === 'number')
            return currentState.activeItem.index < currentState.items.length ?
                currentState.items[currentState.activeItem.index + 1] :
                currentState.items[currentState.items.length];
    };
    const gotoPrevItem = () => {
        var _a, _b;
        const prevItem = getPrevItem();
        if (prevItem) {
            setCurrent(prevItem);
            if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onShowPrev) === 'function')
                (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onShowPrev(value);
        }
    };
    const getPrevItem = () => {
        if (typeof currentState.activeItem.index === 'number')
            return currentState.activeItem.index > 0 ?
                currentState.items[currentState.activeItem.index - 1] :
                currentState.items[0];
    };
    const getCurrentItem = () => {
        return currentState.activeItem;
    };
    const setCurrent = (item) => {
        setCurrentState(Object.assign(Object.assign({}, currentState), { activeItem: item, prevItem: currentState.activeItem }));
        if (item.position)
            setPosition({ y: item.position.y, x: item.position.x });
    };
    const toggleDarkMode = () => {
        var _a, _b, _c, _d;
        setDark((prevDark) => !prevDark);
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onDarkModeOn) === 'function' && !dark)
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onDarkModeOn(value);
        if (typeof ((_c = settings === null || settings === void 0 ? void 0 : settings.event) === null || _c === void 0 ? void 0 : _c.onDarkModeOff) === 'function' && dark)
            (_d = settings === null || settings === void 0 ? void 0 : settings.event) === null || _d === void 0 ? void 0 : _d.onDarkModeOff(value);
    };
    const setDarkMode = (mode) => {
        var _a, _b, _c, _d;
        setDark(mode);
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onDarkModeOn) === 'function' && !dark)
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onDarkModeOn(value);
        if (typeof ((_c = settings === null || settings === void 0 ? void 0 : settings.event) === null || _c === void 0 ? void 0 : _c.onDarkModeOff) === 'function' && dark)
            (_d = settings === null || settings === void 0 ? void 0 : settings.event) === null || _d === void 0 ? void 0 : _d.onDarkModeOff(value);
    };
    const toggleZoom = () => {
        var _a, _b, _c, _d;
        setZoom((prevZoom) => !prevZoom);
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onZoomIn) === 'function' && !zoom)
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onZoomIn(value);
        if (typeof ((_c = settings === null || settings === void 0 ? void 0 : settings.event) === null || _c === void 0 ? void 0 : _c.onZoomOut) === 'function' && zoom)
            (_d = settings === null || settings === void 0 ? void 0 : settings.event) === null || _d === void 0 ? void 0 : _d.onZoomOut(value);
    };
    const zoomOn = () => {
        var _a, _b;
        setZoom(true);
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onZoomOut) === 'function')
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onZoomOut(value);
    };
    const zoomOff = () => {
        var _a, _b;
        setZoom(false);
        if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.event) === null || _a === void 0 ? void 0 : _a.onZoomIn) === 'function')
            (_b = settings === null || settings === void 0 ? void 0 : settings.event) === null || _b === void 0 ? void 0 : _b.onZoomIn(value);
    };
    const dataFetch = (url) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (yield fetch(url)).json();
        return data.items;
    });
    function isDarkMode() {
        return (settings.darkMode === types_1.DarkMode.manual && dark) || settings.darkMode === types_1.DarkMode.dark;
    }
    function isZoomed() {
        return (settings.zoomMode === types_1.ZoomMode.manual && zoom) || settings.zoomMode === types_1.ZoomMode.in;
    }
    const swipeHandlers = (0, react_swipeable_1.useSwipeable)({
        onSwipedLeft: () => settings.swipeToNav && gotoNextItem(),
        onSwipedRight: () => settings.swipeToNav && gotoPrevItem(),
        onSwipedUp: () => settings.swipeToZoom && zoomOff(),
        onSwipedDown: () => settings.swipeToZoom && zoomOn(),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true
    });
    function renderRooms() {
        return currentState.rooms.map((room, index) => (react_1.default.createElement(Room_1.Room, { key: index, index: index, room: room, rooms: currentState.rooms, activeItem: currentState.activeItem, prevItem: currentState.prevItem, position: position, settings: settings })));
    }
    function renderPagination() {
        return settings.paginations !== types_1.Paginations.disabled &&
            ((isZoomed() && settings.paginationsOnZoom !== types_1.PaginationsOnZoom.hide) || !isZoomed()) &&
            react_1.default.createElement("div", { className: `room-paginations ${settings.paginations === types_1.Paginations.thumb ? 'room-paginations-thumbs' : ''}` }, currentState.items.map((item, index) => {
                var _a;
                return (item && react_1.default.createElement("button", { className: `${index === currentState.activeItem.index ? 'active' : ''}
              ${settings.paginationsNav === types_1.PaginationsNav.text && settings.paginations !== types_1.Paginations.thumb ? ' room-icon' : ''}`, key: index, onClick: () => setCurrent(item) },
                    settings.paginations === types_1.Paginations.number && react_1.default.createElement("span", null, index + 1),
                    settings.paginations === types_1.Paginations.title && react_1.default.createElement("span", null, item === null || item === void 0 ? void 0 : item.title),
                    settings.paginations === types_1.Paginations.thumb && (typeof (item === null || item === void 0 ? void 0 : item.image) === 'object' ? react_1.default.createElement("img", { src: (_a = item === null || item === void 0 ? void 0 : item.image) === null || _a === void 0 ? void 0 : _a.thumb }) : typeof (item === null || item === void 0 ? void 0 : item.image) === 'string' && react_1.default.createElement("img", { src: item === null || item === void 0 ? void 0 : item.image }))));
            }));
    }
    function renderZoomNav() {
        var _a, _b, _c, _d;
        return settings.zoomMode === types_1.ZoomMode.manual &&
            react_1.default.createElement(react_1.default.Fragment, null, isZoomed() ? react_1.default.createElement("button", { className: `room-exit-btn ${settings.zoomNav === types_1.ZoomNav.icon ? 'room-icon' : ''}`, onClick: () => toggleZoom() }, (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _a === void 0 ? void 0 : _a.zoomOut) !== null && _b !== void 0 ? _b : react_1.default.createElement(icons_1.ZoomOutIcon, null)) :
                react_1.default.createElement("button", { className: `room-zoom-btn ${settings.zoomNav === types_1.ZoomNav.icon ? 'room-icon' : ''}`, onClick: () => toggleZoom() }, (_d = (_c = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _c === void 0 ? void 0 : _c.zoomIn) !== null && _d !== void 0 ? _d : react_1.default.createElement(icons_1.ZoomInIcon, null)));
    }
    function renderDarkNav() {
        var _a, _b, _c, _d;
        return settings.darkMode === types_1.DarkMode.manual &&
            react_1.default.createElement("button", { className: `room-dark-btn ${settings.darkNav === types_1.DarkNav.icon ? 'room-icon' : ''}`, onClick: () => toggleDarkMode() }, isDarkMode() ? (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _a === void 0 ? void 0 : _a.lightOn) !== null && _b !== void 0 ? _b : react_1.default.createElement(icons_1.LightOffIcon, null) : (_d = (_c = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _c === void 0 ? void 0 : _c.lightOff) !== null && _d !== void 0 ? _d : react_1.default.createElement(icons_1.LightOffIcon, null));
    }
    function renderArrowNav() {
        var _a, _b, _c, _d;
        return typeof currentState.activeItem.index === 'number' && settings.arrowNav !== types_1.ArrowNav.disabled &&
            react_1.default.createElement("div", { className: "room-navigations" },
                currentState.activeItem.index > 0 && getPrevItem() &&
                    ((isZoomed() && settings.arrowNavOnZoom !== types_1.ArrowNavOnZoom.hide) || !isZoomed()) &&
                    settings.arrowNav && react_1.default.createElement(react_1.default.Fragment, null, ['number', 'blank'].includes(settings.arrowNav) ?
                    react_1.default.createElement("button", { className: "room-prev", onClick: () => gotoPrevItem() }, settings.arrowNav === types_1.ArrowNav.number && react_1.default.createElement("span", null, currentState.activeItem.index)) :
                    react_1.default.createElement("button", { className: "room-prev room-icon", onClick: () => gotoPrevItem() }, (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _a === void 0 ? void 0 : _a.prev) !== null && _b !== void 0 ? _b : react_1.default.createElement(icons_1.PrevIcon, null))),
                currentState.items.length > currentState.activeItem.index + 1 && getNextItem() &&
                    ((isZoomed() && settings.arrowNavOnZoom !== types_1.ArrowNavOnZoom.hide) || !isZoomed()) &&
                    settings.arrowNav && react_1.default.createElement(react_1.default.Fragment, null, ['number', 'blank'].includes(settings.arrowNav) ?
                    react_1.default.createElement("button", { className: "room-next", onClick: () => gotoNextItem() }, settings.arrowNav === types_1.ArrowNav.number && react_1.default.createElement("span", null, currentState.activeItem.index + 2.0)) :
                    react_1.default.createElement("button", { className: "room-next room-icon", onClick: () => gotoNextItem() }, (_d = (_c = settings === null || settings === void 0 ? void 0 : settings.icons) === null || _c === void 0 ? void 0 : _c.next) !== null && _d !== void 0 ? _d : react_1.default.createElement(icons_1.NextIcon, null))));
    }
    function Loading() {
        return react_1.default.createElement("h2", null, "Loading...");
    }
    (0, react_1.useEffect)(() => {
        build();
    }, []);
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (event) => {
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
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentState.items, position]);
    (0, react_1.useEffect)(() => {
        const root = document.querySelector(':root');
        if (root instanceof HTMLElement) {
            const rootStyle = root.style;
            styles && Object.keys(styles).forEach((key) => {
                if (key && key in types_1.StylesVariables) {
                    rootStyle.setProperty('--room-' + (0, parse_1.kebabize)(key), styles[key]);
                }
            });
        }
    }, [styles]);
    (0, react_1.useImperativeHandle)(ref, () => {
        return {
            gotoNextItem() {
                gotoNextItem();
            },
            gotoPrevItem() {
                gotoPrevItem();
            },
            toggleDarkMode() {
                toggleDarkMode();
            },
            setDarkMode(mode) {
                setDarkMode(mode);
            },
            toggleZoom() {
                toggleZoom();
            },
            setZoom(zoom) {
                setZoom(zoom);
            },
            getCurrentItem() {
                return getCurrentItem();
            },
            refresh() {
                clear();
                build();
            },
            clear() {
                clear();
            }
        };
    }, [currentState]);
    return (react_1.default.createElement(exports.GalleryContext.Provider, { value: value },
        react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(Loading, null) }, currentState && currentState.rooms.length > 0 &&
            react_1.default.createElement("div", Object.assign({ className: `room-gallery${isDarkMode() ? ' room-dark' : ''}${isZoomed() ? ' room-zoom' : ''}` }, swipeHandlers),
                react_1.default.createElement("div", { className: "room-body" },
                    react_1.default.createElement("div", { className: "room-arena" }, renderRooms()),
                    renderArrowNav(),
                    renderPagination(),
                    renderZoomNav(),
                    renderDarkNav())))));
});
