import { ItemType, Position } from './../components/Item';
import { RoomType } from './../components/Room';
import { Ref } from 'react';
export declare enum ArrowNav {
    number = "number",
    icon = "icon",
    blank = "blank",
    disabled = "disabled"
}
export declare enum DarkNav {
    button = "button",
    icon = "icon"
}
export declare enum DarkMode {
    dark = "dark",
    light = "light",
    manual = "manual",
    auto = "auto"
}
export declare enum ZoomNav {
    button = "button",
    icon = "icon"
}
export declare enum ZoomMode {
    in = "in",
    out = "out",
    manual = "manual",
    disabled = "disabled"
}
export declare enum PaginationsNav {
    button = "button",
    text = "text"
}
export declare enum Paginations {
    disabled = "disabled",
    number = "number",
    blank = "blank"
}
export declare enum PaginationsOnZoom {
    hide = "hide",
    show = "show"
}
export declare enum ArrowNavOnZoom {
    hide = "hide",
    show = "show"
}
export type RoomGallerySettingsType = {
    arrowNav?: keyof typeof ArrowNav;
    darkNav?: keyof typeof DarkNav;
    zoomNav?: keyof typeof ZoomNav;
    darkMode?: keyof typeof DarkMode;
    zoomMode?: keyof typeof ZoomMode;
    paginationsNav?: keyof typeof PaginationsNav;
    paginations?: keyof typeof Paginations;
    paginationsOnZoom?: keyof typeof PaginationsOnZoom;
    arrowNavOnZoom?: keyof typeof ArrowNavOnZoom;
    defaultPosition?: Position;
    icons?: {
        next?: JSX.Element;
        prev?: JSX.Element;
        lightOff?: JSX.Element;
        lightOn?: JSX.Element;
        zoomIn?: JSX.Element;
        zoomOut?: JSX.Element;
    };
    swipeToNav?: boolean;
    swipeToZoom?: boolean;
    keypressToNav?: boolean;
    keypressToZoom?: boolean;
    event?: {
        onInit?: (value?: object) => void;
        onRender?: (value?: object) => void;
        onShowNext?: (value?: object) => void;
        onShowPrev?: (value?: object) => void;
        onZoomIn?: (value?: object) => void;
        onZoomOut?: (value?: object) => void;
        onDarkModeOn?: (value?: object) => void;
        onDarkModeOff?: (value?: object) => void;
    };
};
export interface RoomGalleryProps {
    fetch?: (() => Promise<Array<ItemType>>) | string;
    items?: (ItemType[] | HTMLElement[]);
    styles?: object;
    children?: JSX.Element[] | JSX.Element;
    settings?: RoomGallerySettingsType;
    ref?: Ref<HTMLDivElement>;
}
export interface parseItemsI {
    dataItems?: Array<ItemType>;
    elementItems?: HTMLElement[];
    childrenItems?: JSX.Element[] | JSX.Element;
    nodeItems?: Element | NodeListOf<Element>;
    preItems: Array<ItemType>;
    preRooms: Array<RoomType>;
}
export declare enum StylesVariables {
    'lightRoomBackgroundBlendMode' = 0,
    'lightRoomBodyBackground' = 1,
    'lightRoomTypeextColor' = 2,
    'lightRoomFloorBackground' = 3,
    'lightRoomFloorShadow' = 4,
    'lightRoomWallBackground' = 5,
    'lightRoomWallShadow' = 6,
    'lightRoomCeilBackground' = 7,
    'lightRoomCeilShadow' = 8,
    'lightRoomButtonBackground' = 9,
    'lightRoomButtonColor' = 10,
    'lightRoomButtonBorder' = 11,
    'lightRoomButtonShadow' = 12,
    'lightRoomButtonCurrentBackground' = 13,
    'lightRoomButtonCurrentBorder' = 14,
    'lightRoomButtonCurrentColor' = 15,
    'lightRoomButtonCurrentShadow' = 16,
    'lightRoomCanvasBorder' = 17,
    'lightRoomCanvasShadow' = 18,
    'darkRoomBackgroundBlendMode' = 19,
    'darkRoomBodyBackground' = 20,
    'darkRoomTypeextColor' = 21,
    'darkRoomFloorBackground' = 22,
    'darkRoomFloorShadow' = 23,
    'darkRoomWallBackground' = 24,
    'darkRoomWallShadow' = 25,
    'darkRoomCeilBackground' = 26,
    'darkRoomCeilShadow' = 27,
    'darkRoomButtonBackground' = 28,
    'darkRoomButtonColor' = 29,
    'darkRoomButtonBorder' = 30,
    'darkRoomButtonShadow' = 31,
    'darkRoomButtonCurrentBackground' = 32,
    'darkRoomButtonCurrentBorder' = 33,
    'darkRoomButtonCurrentColor' = 34,
    'darkRoomButtonCurrentShadow' = 35,
    'darkRoomCanvasBorder' = 36,
    'darkRoomCanvasShadow' = 37
}
//# sourceMappingURL=types.d.ts.map