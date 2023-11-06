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
    blank = "blank",
    title = "title"
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
    animationSpeed?: {
        min: number;
        ratio: number;
    } | number;
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
    'rotateSpeed' = 0,
    'rotateTiming' = 1,
    'fontFamily' = 2,
    'perspective' = 3,
    'mobileSizeWidth' = 4,
    'mobileSizeHeight' = 5,
    'mobilePerspective' = 6,
    'scale' = 7,
    'scaleZoom' = 8,
    'offsetY' = 9,
    'itemHeight' = 10,
    'itemWidth' = 11,
    'zIndex' = 12,
    'textFontSize' = 13,
    'textFontSizeMobile' = 14,
    'fontLineHeight' = 15,
    'textMarginTop' = 16,
    'textMaxHeight' = 17,
    'textMinHeight' = 18,
    'textMaxWidth' = 19,
    'textPadding' = 20,
    'navigationsMargin' = 21,
    'buttonSize' = 22,
    'paginationButtonSize' = 23,
    'paginationButtonsSpace' = 24,
    'navButtonSize' = 25,
    'buttonsPosition' = 26,
    'buttonZoomPosition' = 27,
    'buttonDarkPosition' = 28,
    'buttonZoomWidth' = 29,
    'buttonExitWidth' = 30,
    'buttonDarkWidth' = 31,
    'paginationPosition' = 32,
    'buttonTransition' = 33,
    'buttonOpacity' = 34,
    'lightRoomBackgroundBlendMode' = 35,
    'lightRoomBodyBackground' = 36,
    'lightRoomTypeextColor' = 37,
    'lightRoomFloorBackground' = 38,
    'lightRoomFloorShadow' = 39,
    'lightRoomWallBackground' = 40,
    'lightRoomWallShadow' = 41,
    'lightRoomCeilBackground' = 42,
    'lightRoomCeilShadow' = 43,
    'lightRoomButtonBackground' = 44,
    'lightRoomButtonColor' = 45,
    'lightRoomButtonBorder' = 46,
    'lightRoomButtonShadow' = 47,
    'lightRoomButtonCurrentBackground' = 48,
    'lightRoomButtonCurrentBorder' = 49,
    'lightRoomButtonCurrentColor' = 50,
    'lightRoomButtonCurrentShadow' = 51,
    'lightRoomCanvasBorder' = 52,
    'lightRoomCanvasShadow' = 53,
    'darkRoomBackgroundBlendMode' = 54,
    'darkRoomBodyBackground' = 55,
    'darkRoomTypeextColor' = 56,
    'darkRoomFloorBackground' = 57,
    'darkRoomFloorShadow' = 58,
    'darkRoomWallBackground' = 59,
    'darkRoomWallShadow' = 60,
    'darkRoomCeilBackground' = 61,
    'darkRoomCeilShadow' = 62,
    'darkRoomButtonBackground' = 63,
    'darkRoomButtonColor' = 64,
    'darkRoomButtonBorder' = 65,
    'darkRoomButtonShadow' = 66,
    'darkRoomButtonCurrentBackground' = 67,
    'darkRoomButtonCurrentBorder' = 68,
    'darkRoomButtonCurrentColor' = 69,
    'darkRoomButtonCurrentShadow' = 70,
    'darkRoomCanvasBorder' = 71,
    'darkRoomCanvasShadow' = 72
}
//# sourceMappingURL=types.d.ts.map