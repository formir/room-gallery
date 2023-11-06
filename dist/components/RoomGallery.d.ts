import React from 'react';
import '../sass/room-gallery.scss';
import { RoomGallerySettingsType, RoomGalleryProps } from '../types/types';
export declare const roomGalleryDefaultSettings: RoomGallerySettingsType;
export declare const GalleryContext: React.Context<{
    position: import("./Item").Position | undefined;
    zoom: boolean;
}>;
export declare const RoomGallery: React.ForwardRefExoticComponent<Omit<RoomGalleryProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RoomGallery.d.ts.map