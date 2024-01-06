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
    title = "title",
    thumb = "thumb"
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
    'iconBlendMode' = 13,
    'textColor' = 14,
    'linkColor' = 15,
    'textFontSize' = 16,
    'textFontSizeMobile' = 17,
    'fontLineHeight' = 18,
    'textMarginTop' = 19,
    'textMaxHeight' = 20,
    'textMinHeight' = 21,
    'textMaxWidth' = 22,
    'textPadding' = 23,
    'navigationsMargin' = 24,
    'buttonSize' = 25,
    'paginationButtonSize' = 26,
    'paginationButtonsSpace' = 27,
    'paginationButtonsBorderRadius' = 28,
    'paginationThumbsMaxHeight' = 29,
    'paginationThumbMaxWidth' = 30,
    'navButtonSize' = 31,
    'buttonsPosition' = 32,
    'buttonZoomPosition' = 33,
    'buttonDarkPosition' = 34,
    'buttonZoomWidth' = 35,
    'buttonExitWidth' = 36,
    'buttonDarkWidth' = 37,
    'paginationPosition' = 38,
    'buttonTransition' = 39,
    'buttonOpacity' = 40,
    'lightBackgroundBlendMode' = 41,
    'lightBodyBackground' = 42,
    'lightTextColor' = 43,
    'lightLinkColor' = 44,
    'lightFloorBackground' = 45,
    'lightFloorShadow' = 46,
    'lightWallBackground' = 47,
    'lightWallShadow' = 48,
    'lightCeilBackground' = 49,
    'lightCeilShadow' = 50,
    'lightButtonBackground' = 51,
    'lightButtonColor' = 52,
    'lightButtonBorder' = 53,
    'lightButtonShadow' = 54,
    'lightButtonCurrentBackground' = 55,
    'lightButtonCurrentBorder' = 56,
    'lightButtonCurrentColor' = 57,
    'lightButtonCurrentShadow' = 58,
    'lightIconColor' = 59,
    'lightCanvasBorder' = 60,
    'lightCanvasShadow' = 61,
    'darkBackgroundBlendMode' = 62,
    'darkBodyBackground' = 63,
    'darkTextColor' = 64,
    'darkLinkColor' = 65,
    'darkFloorBackground' = 66,
    'darkFloorShadow' = 67,
    'darkWallBackground' = 68,
    'darkWallShadow' = 69,
    'darkCeilBackground' = 70,
    'darkCeilShadow' = 71,
    'darkButtonBackground' = 72,
    'darkButtonColor' = 73,
    'darkButtonBorder' = 74,
    'darkButtonShadow' = 75,
    'darkButtonCurrentBackground' = 76,
    'darkButtonCurrentBorder' = 77,
    'darkButtonCurrentColor' = 78,
    'darkButtonCurrentShadow' = 79,
    'darkIconColor' = 80,
    'darkCanvasBorder' = 81,
    'darkCanvasShadow' = 82
}
//# sourceMappingURL=types.d.ts.map