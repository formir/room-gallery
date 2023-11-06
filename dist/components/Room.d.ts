import React from 'react';
import { WallType } from './Wall';
import { ItemType } from './Item';
import { RoomGallerySettingsType } from '../types/types';
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
    settings: RoomGallerySettingsType;
}
export type RoomType = {
    walls: Array<WallType>;
    position: {
        x: number;
        y: number;
    };
    index: number;
};
export declare const Room: ({ room, rooms, position, index, activeItem, prevItem, settings }: RoomI) => React.JSX.Element;
//# sourceMappingURL=Room.d.ts.map