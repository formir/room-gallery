import React from 'react';
import { Item } from './Item';
export var Direction;
(function (Direction) {
    Direction["n"] = "n";
    Direction["e"] = "e";
    Direction["s"] = "s";
    Direction["w"] = "w";
})(Direction || (Direction = {}));
export var Wall = function (_a) {
    var direction = _a.direction, items = _a.items, active = _a.active;
    return React.createElement("div", { className: "room-wall wall-".concat(direction).concat(active ? ' wall-active' : '') }, items.map(function (item) { return (React.createElement(Item, { key: item.index, index: item.index, title: item === null || item === void 0 ? void 0 : item.title, description: item === null || item === void 0 ? void 0 : item.description, descriptionHtml: item === null || item === void 0 ? void 0 : item.descriptionHtml, image: item === null || item === void 0 ? void 0 : item.image, element: item === null || item === void 0 ? void 0 : item.element, html: item === null || item === void 0 ? void 0 : item.html, video: item === null || item === void 0 ? void 0 : item.video, vimeo: item === null || item === void 0 ? void 0 : item.vimeo, youtube: item === null || item === void 0 ? void 0 : item.youtube, HtmlElement: item === null || item === void 0 ? void 0 : item.HtmlElement, position: item.position, height: item === null || item === void 0 ? void 0 : item.height, width: item === null || item === void 0 ? void 0 : item.width })); }));
};
