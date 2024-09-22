"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabize = exports.parseWalls = exports.parseRooms = exports.findItemByPosition = void 0;
const Wall_1 = require("./../components/Wall");
const directions = [Wall_1.Direction.n, Wall_1.Direction.e, Wall_1.Direction.s, Wall_1.Direction.w];
const insertItem = (item, roomIndex = 0, direction, wallIndex, preRooms) => {
    const wall = {
        index: wallIndex,
        visible: true,
        direction,
        items: []
    };
    if (item)
        wall.items.push(item);
    preRooms[roomIndex].walls.push(wall);
};
const findItemByPosition = (position, items) => {
    return items.find((item) => (item.position && item.position.x === position.x && position.y === position.y ? item : null));
};
exports.findItemByPosition = findItemByPosition;
function parseRooms(items, preRooms, allOnOneWall = false) {
    const itemCount = items.length;
    let roomsNeed = items.length;
    if (!allOnOneWall) {
        roomsNeed = Math.ceil((itemCount - 2) / 2) || 1;
    }
    for (let n = 0; n < roomsNeed; n++) {
        const room = {
            index: n,
            walls: []
        };
        preRooms.push(room);
    }
}
exports.parseRooms = parseRooms;
function parseWalls(items, preItems, preRooms, position = { x: 0, y: 0 }, allOnOneWall = false) {
    const itemCount = items.length;
    const numberOfLiterations = itemCount > 4 ? itemCount : 4;
    const roomsNeed = Math.ceil((itemCount - 2) / 2) || 1;
    let y = 0;
    let x = 0;
    let direction = Wall_1.Direction.n;
    let wasWest = false;
    const updateItem = (item, index) => {
        let newItem = {};
        if (item) {
            newItem = Object.assign({}, item);
            newItem.index = index;
            newItem.position = { x, y };
            preItems.push(newItem);
        }
        insertItem(item ? newItem : null, x, direction, index, preRooms);
    };
    if (!allOnOneWall) {
        for (let i = 1; i <= numberOfLiterations; i++) {
            if (roomsNeed === 1) {
                direction = directions[i - 1];
                y = i - 1;
            }
            else if (i === (roomsNeed + 1)) {
                direction = Wall_1.Direction.e;
                y = 1;
            }
            else if (i >= (roomsNeed + 2) && i < (roomsNeed * 2 + 2)) {
                direction = Wall_1.Direction.s;
                y = 2;
            }
            else if (i === (roomsNeed * 2 + 2)) {
                direction = Wall_1.Direction.w;
                y = 3;
            }
            if (direction === Wall_1.Direction.w && x === 0) {
                wasWest = true;
            }
            const item = Object.assign({}, items[i - 1]);
            updateItem(items[i - 1] ? item : null, i - 1);
            if (i < roomsNeed) {
                x++;
            }
            else if (i > (roomsNeed + 1) && i < (roomsNeed * 2 + 1)) {
                x--;
            }
        }
        if (!wasWest) {
            insertItem(null, 0, Wall_1.Direction.w, numberOfLiterations, preRooms);
        }
    }
    else {
        insertItem(null, 0, Wall_1.Direction.w, itemCount, preRooms);
        for (let i = 0; i < itemCount; i++) {
            const item = Object.assign({}, items[i]);
            updateItem(items[i] ? item : null, i);
            x++;
        }
        insertItem(null, itemCount - 1, Wall_1.Direction.e, itemCount, preRooms);
    }
    return (0, exports.findItemByPosition)(position, preItems);
}
exports.parseWalls = parseWalls;
const kebabize = (string) => {
    const upper = /(?:!\p{Uppercase_Letter})\p{Uppercase_Letter}|\p{Uppercase_Letter}(?!\p{Uppercase_Letter})/gu;
    return string.replace(upper, '-$&').replace(/^-/, '').toLowerCase();
};
exports.kebabize = kebabize;
