import React from 'react';
import '../sass/formir-room.scss';
import { RoomGallerySettingsType, RoomGalleryProps } from '../types/types';
import { Position } from './Item';
export declare const roomGalleryDefaultSettings: RoomGallerySettingsType;
export declare const GalleryContext: React.Context<{
    position: Position | undefined;
    zoom: boolean;
}>;
export declare const RoomGallery: React.ForwardRefExoticComponent<Omit<RoomGalleryProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RoomGallery.d.ts.map