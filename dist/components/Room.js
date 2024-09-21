import React from 'react';
import { Wall, Direction } from './Wall';
export var Room = function (_a) {
    var room = _a.room, rooms = _a.rooms, position = _a.position, index = _a.index, activeItem = _a.activeItem, prevItem = _a.prevItem, settings = _a.settings;
    var rotation = function () {
        if (position)
            if (activeItem.position && prevItem.position && activeItem.position.y === 3 && prevItem.position.y === 0)
                return -90;
            else
                return (position.y * 90);
        else
            return 0;
    };
    var delay = function () {
        var _a, _b;
        var distance = 2;
        var min = 2;
        var ratio = 1;
        if (typeof (settings === null || settings === void 0 ? void 0 : settings.animationSpeed) === 'number')
            min = settings.animationSpeed;
        else if (typeof ((_a = settings === null || settings === void 0 ? void 0 : settings.animationSpeed) === null || _a === void 0 ? void 0 : _a.min) === 'number')
            min = settings.animationSpeed.min;
        if (typeof (settings === null || settings === void 0 ? void 0 : settings.animationSpeed) === 'object' && typeof ((_b = settings === null || settings === void 0 ? void 0 : settings.animationSpeed) === null || _b === void 0 ? void 0 : _b.ratio) === 'number')
            ratio = settings.animationSpeed.ratio;
        if (activeItem && activeItem.position && typeof activeItem.position.x === 'number'
            && prevItem && prevItem.position && typeof prevItem.position.x === 'number') {
            distance = prevItem.position.x - activeItem.position.x;
        }
        return "transform ".concat(Math.abs(distance) > min ? (Math.abs(distance) * ratio) : min, "s ease-in-out");
    };
    return room.walls && position ? React.createElement("div", { className: "room-walls".concat(index === (rooms.length - 1) ? ' last' : '', " ").concat(index === 0 ? ' first' : ''), style: {
            transform: 'rotateY(' + rotation() + 'deg) translateX(' + ((index - position.x) * 100) + '%)',
            transition: delay()
        } },
        room.walls.map(function (wall, wallIndex) {
            var indexOfDirection = Object.values(Direction).indexOf(wall.direction);
            return wall.visible &&
                React.createElement(Wall, { room: room, key: wallIndex, direction: wall.direction, items: wall.items, visible: wall.visible, active: position.x === index && position.y === indexOfDirection });
        }),
        React.createElement("div", { className: "room-ceil" }),
        React.createElement("div", { className: "room-floor" })) : React.createElement(React.Fragment, null);
};
