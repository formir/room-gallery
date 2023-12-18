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
    'textColor' = 13,
    'linkColor' = 14,
    'textFontSize' = 15,
    'textFontSizeMobile' = 16,
    'fontLineHeight' = 17,
    'textMarginTop' = 18,
    'textMaxHeight' = 19,
    'textMinHeight' = 20,
    'textMaxWidth' = 21,
    'textPadding' = 22,
    'navigationsMargin' = 23,
    'buttonSize' = 24,
    'paginationButtonSize' = 25,
    'paginationButtonsSpace' = 26,
    'navButtonSize' = 27,
    'buttonsPosition' = 28,
    'buttonZoomPosition' = 29,
    'buttonDarkPosition' = 30,
    'buttonZoomWidth' = 31,
    'buttonExitWidth' = 32,
    'buttonDarkWidth' = 33,
    'paginationPosition' = 34,
    'buttonTransition' = 35,
    'buttonOpacity' = 36,
    'lightBackgroundBlendMode' = 37,
    'lightBodyBackground' = 38,
    'lightTextColor' = 39,
    'lightLinkColor' = 40,
    'lightFloorBackground' = 41,
    'lightFloorShadow' = 42,
    'lightWallBackground' = 43,
    'lightWallShadow' = 44,
    'lightCeilBackground' = 45,
    'lightCeilShadow' = 46,
    'lightButtonBackground' = 47,
    'lightButtonColor' = 48,
    'lightButtonBorder' = 49,
    'lightButtonShadow' = 50,
    'lightButtonCurrentBackground' = 51,
    'lightButtonCurrentBorder' = 52,
    'lightButtonCurrentColor' = 53,
    'lightButtonCurrentShadow' = 54,
    'lightCanvasBorder' = 55,
    'lightCanvasShadow' = 56,
    'darkBackgroundBlendMode' = 57,
    'darkBodyBackground' = 58,
    'darkTextColor' = 59,
    'darkLinkColor' = 60,
    'darkFloorBackground' = 61,
    'darkFloorShadow' = 62,
    'darkWallBackground' = 63,
    'darkWallShadow' = 64,
    'darkCeilBackground' = 65,
    'darkCeilShadow' = 66,
    'darkButtonBackground' = 67,
    'darkButtonColor' = 68,
    'darkButtonBorder' = 69,
    'darkButtonShadow' = 70,
    'darkButtonCurrentBackground' = 71,
    'darkButtonCurrentBorder' = 72,
    'darkButtonCurrentColor' = 73,
    'darkButtonCurrentShadow' = 74,
    'darkCanvasBorder' = 75,
    'darkCanvasShadow' = 76
}
//# sourceMappingURL=types.d.ts.map