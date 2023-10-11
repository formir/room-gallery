import React from 'react';
import { WallType } from './Wall';
export interface RoomI {
    room: RoomType;
    rooms: Array<RoomType>;
    position: {
        x: number;
        y: number;
    };
    index: number;
}
export type RoomType = {
    walls: Array<WallType>;
    position: {
        x: number;
        y: number;
    };
    index: number;
};
export declare const Room: ({ room, rooms, position, index }: RoomI) => React.JSX.Element;
//# sourceMappingURL=Room.d.ts.map