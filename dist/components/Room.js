"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const react_1 = __importDefault(require("react"));
const Wall_1 = require("./Wall");
const Room = ({ room, rooms, position, index, activeItem, prevItem, settings }) => {
    const rotation = () => {
        if (position)
            if (activeItem.position && prevItem.position && activeItem.position.y === 3 && prevItem.position.y === 0)
                return -90;
            else
                return (position.y * 90);
        else
            return 0;
    };
    const delay = () => {
        var _a, _b;
        let distance = 2;
        let min = 2;
        let ratio = 1;
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
        return `transform ${Math.abs(distance) > min ? (Math.abs(distance) * ratio) : min}s ease-in-out`;
    };
    return room.walls && position ? react_1.default.createElement("div", { className: `room-walls${index === (rooms.length - 1) ? ' last' : ''} ${index === 0 ? ' first' : ''}`, style: {
            transform: 'rotateY(' + rotation() + 'deg) translateX(' + ((index - position.x) * 100) + '%)',
            transition: delay()
        } },
        room.walls.map((wall, wallIndex) => {
            const indexOfDirection = Object.values(Wall_1.Direction).indexOf(wall.direction);
            return wall.visible &&
                react_1.default.createElement(Wall_1.Wall, { room: room, key: wallIndex, direction: wall.direction, items: wall.items, visible: wall.visible, active: position.x === index && position.y === indexOfDirection });
        }),
        react_1.default.createElement("div", { className: "room-ceil" }),
        react_1.default.createElement("div", { className: "room-floor" })) : react_1.default.createElement(react_1.default.Fragment, null);
};
exports.Room = Room;
