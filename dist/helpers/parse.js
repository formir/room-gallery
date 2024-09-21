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
import { Direction } from './../components/Wall';
var directions = [Direction.n, Direction.e, Direction.s, Direction.w];
var insertItem = function (item, roomIndex, direction, wallIndex, preRooms) {
    if (roomIndex === void 0) { roomIndex = 0; }
    var wall = {
        index: wallIndex,
        visible: true,
        direction: direction,
        items: []
    };
    if (item)
        wall.items.push(item);
    preRooms[roomIndex].walls.push(wall);
};
export var findItemByPosition = function (position, items) {
    return items.find(function (item) { return (item.position && item.position.x === position.x && position.y === position.y ? item : null); });
};
export function parseRooms(items, preRooms, allOnOneWall) {
    if (allOnOneWall === void 0) { allOnOneWall = false; }
    var itemCount = items.length;
    var roomsNeed = items.length;
    if (!allOnOneWall) {
        roomsNeed = Math.ceil((itemCount - 2) / 2) || 1;
    }
    for (var n = 0; n < roomsNeed; n++) {
        var room = {
            index: n,
            walls: []
        };
        preRooms.push(room);
    }
}
export function parseWalls(items, preItems, preRooms, position, allOnOneWall) {
    if (position === void 0) { position = { x: 0, y: 0 }; }
    if (allOnOneWall === void 0) { allOnOneWall = false; }
    var itemCount = items.length;
    var numberOfLiterations = itemCount > 4 ? itemCount : 4;
    var roomsNeed = Math.ceil((itemCount - 2) / 2) || 1;
    var y = 0;
    var x = 0;
    var direction = Direction.n;
    var wasWest = false;
    var updateItem = function (item, index) {
        var newItem = {};
        if (item) {
            newItem = __assign({}, item);
            newItem.index = index;
            newItem.position = { x: x, y: y };
            preItems.push(newItem);
        }
        insertItem(item ? newItem : null, x, direction, index, preRooms);
    };
    if (!allOnOneWall) {
        for (var i = 1; i <= numberOfLiterations; i++) {
            if (roomsNeed === 1) {
                direction = directions[i - 1];
                y = i - 1;
            }
            else if (i === (roomsNeed + 1)) {
                direction = Direction.e;
                y = 1;
            }
            else if (i >= (roomsNeed + 2) && i < (roomsNeed * 2 + 2)) {
                direction = Direction.s;
                y = 2;
            }
            else if (i === (roomsNeed * 2 + 2)) {
                direction = Direction.w;
                y = 3;
            }
            if (direction === Direction.w && x === 0) {
                wasWest = true;
            }
            var item = __assign({}, items[i - 1]);
            updateItem(items[i - 1] ? item : null, i - 1);
            if (i < roomsNeed) {
                x++;
            }
            else if (i > (roomsNeed + 1) && i < (roomsNeed * 2 + 1)) {
                x--;
            }
        }
        if (!wasWest) {
            insertItem(null, 0, Direction.w, numberOfLiterations, preRooms);
        }
    }
    else {
        insertItem(null, 0, Direction.w, itemCount, preRooms);
        for (var i = 0; i < itemCount; i++) {
            var item = __assign({}, items[i]);
            updateItem(items[i] ? item : null, i);
            x++;
        }
        insertItem(null, itemCount - 1, Direction.e, itemCount, preRooms);
    }
    return findItemByPosition(position, preItems);
}
export var kebabize = function (string) {
    var upper = /(?:!\p{Uppercase_Letter})\p{Uppercase_Letter}|\p{Uppercase_Letter}(?!\p{Uppercase_Letter})/gu;
    return string.replace(upper, '-$&').replace(/^-/, '').toLowerCase();
};
