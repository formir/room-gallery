import React from 'react';
import { WallType } from './Wall';
import { ItemType } from './Item';
export interface RoomI {
    room: RoomType;
    rooms: Array<RoomType>;
    position?: {
        x: number;
        y: number;
    };
    index: number;
    activeItem: ItemType;
    prevItem: ItemType;
}
export type RoomType = {
    walls: Array<WallType>;
    position: {
        x: number;
        y: number;
    };
    index: number;
};
export declare const Room: ({ room, rooms, position, index, activeItem, prevItem }: RoomI) => React.JSX.Element | undefined;
//# sourceMappingURL=Room.d.ts.map