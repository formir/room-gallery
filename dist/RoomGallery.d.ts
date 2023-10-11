import { ItemType } from './../src/components/Item';
import { RoomGallerySettingsType, RoomGalleryProps } from './../src/types/types';
export interface IroomGallery {
    element: string | HTMLElement;
    fetch?: () => Promise<Array<object>> | string;
    items?: HTMLImageElement[] | ItemType[] | HTMLElement[];
    styles?: object;
    settings?: RoomGallerySettingsType;
}
declare class RoomGallery implements IroomGallery {
    element: string | HTMLElement;
    fetch?: () => Promise<Array<object>> | string;
    items?: HTMLImageElement[] | ItemType[] | HTMLElement[];
    styles?: object;
    settings?: RoomGallerySettingsType;
    roomGalleryRef?: any;
    props: RoomGalleryProps;
    container: null | Element;
    constructor(options: IroomGallery);
    findContainer(): void;
    prepareProps(): void;
    init(): {} | void;
    gotoNextItem(): void;
    gotoPrevItem(): void;
    toggleDarkMode(): void;
    setDarkMode(mode: boolean): void;
    toggleZoom(): void;
    setZoom(zoom: boolean): void;
    getCurrentItem(): {} | void;
}
export default RoomGallery;
//# sourceMappingURL=RoomGallery.d.ts.map