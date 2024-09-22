"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wall = exports.Direction = void 0;
const react_1 = __importDefault(require("react"));
const Item_1 = require("./Item");
var Direction;
(function (Direction) {
    Direction["n"] = "n";
    Direction["e"] = "e";
    Direction["s"] = "s";
    Direction["w"] = "w";
})(Direction || (exports.Direction = Direction = {}));
const Wall = ({ direction, items, active }) => {
    return react_1.default.createElement("div", { className: `room-wall wall-${direction}${active ? ' wall-active' : ''}` }, items.map(item => (react_1.default.createElement(Item_1.Item, { key: item.index, index: item.index, title: item === null || item === void 0 ? void 0 : item.title, description: item === null || item === void 0 ? void 0 : item.description, descriptionHtml: item === null || item === void 0 ? void 0 : item.descriptionHtml, image: item === null || item === void 0 ? void 0 : item.image, element: item === null || item === void 0 ? void 0 : item.element, html: item === null || item === void 0 ? void 0 : item.html, video: item === null || item === void 0 ? void 0 : item.video, vimeo: item === null || item === void 0 ? void 0 : item.vimeo, youtube: item === null || item === void 0 ? void 0 : item.youtube, HtmlElement: item === null || item === void 0 ? void 0 : item.HtmlElement, position: item.position, height: item === null || item === void 0 ? void 0 : item.height, width: item === null || item === void 0 ? void 0 : item.width }))));
};
exports.Wall = Wall;
