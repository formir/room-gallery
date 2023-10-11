import React from 'react';
import { ItemType } from './Item';
import { RoomType } from './Room';
export declare enum Direction {
    n = "n",
    e = "e",
    s = "s",
    w = "w"
}
export interface WallI {
    direction: Direction;
    items: Array<ItemType>;
    room: RoomType;
    visible: boolean;
    active: boolean;
}
export type WallType = {
    direction: Direction;
    items: Array<ItemType>;
    room?: RoomType;
    visible: boolean;
};
export declare const Wall: ({ direction, items, active }: WallI) => React.JSX.Element;
//# sourceMappingURL=Wall.d.ts.map