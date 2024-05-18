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
    allOnOneWall?: boolean;
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
    sanitizeHtml?: boolean;
    sanitizeHtmlOptions?: {
        allowedAttributes?: Array<keyof typeof sanitizeHtmlAllowedAttributes>;
        allowedTags?: Array<keyof typeof sanitizeHtmlAllowedTags>;
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
export declare enum sanitizeHtmlAllowedTags {
    'a' = 0,
    'abbr' = 1,
    'address' = 2,
    'area' = 3,
    'article' = 4,
    'aside' = 5,
    'audio' = 6,
    'b' = 7,
    'base' = 8,
    'bdi' = 9,
    'bdo' = 10,
    'blockquote' = 11,
    'br' = 12,
    'button' = 13,
    'canvas' = 14,
    'caption' = 15,
    'cite' = 16,
    'code' = 17,
    'col' = 18,
    'colgroup' = 19,
    'data' = 20,
    'datalist' = 21,
    'dd' = 22,
    'del' = 23,
    'details' = 24,
    'dfn' = 25,
    'dialog' = 26,
    'div' = 27,
    'dl' = 28,
    'dt' = 29,
    'em' = 30,
    'embed' = 31,
    'fieldset' = 32,
    'figcaption' = 33,
    'figure' = 34,
    'footer' = 35,
    'form' = 36,
    'h1' = 37,
    'h2' = 38,
    'h3' = 39,
    'h4' = 40,
    'h5' = 41,
    'h6' = 42,
    'head' = 43,
    'header' = 44,
    'hgroup' = 45,
    'hr' = 46,
    'i' = 47,
    'iframe' = 48,
    'img' = 49,
    'input' = 50,
    'ins' = 51,
    'kbd' = 52,
    'label' = 53,
    'legend' = 54,
    'li' = 55,
    'link' = 56,
    'main' = 57,
    'map' = 58,
    'mark' = 59,
    'meta' = 60,
    'meter' = 61,
    'nav' = 62,
    'noscript' = 63,
    'object' = 64,
    'ol' = 65,
    'optgroup' = 66,
    'option' = 67,
    'output' = 68,
    'p' = 69,
    'param' = 70,
    'picture' = 71,
    'pre' = 72,
    'progress' = 73,
    'q' = 74,
    'rp' = 75,
    'rt' = 76,
    'ruby' = 77,
    's' = 78,
    'samp' = 79,
    'section' = 80,
    'select' = 81,
    'small' = 82,
    'source' = 83,
    'span' = 84,
    'strong' = 85,
    'style' = 86,
    'sub' = 87,
    'summary' = 88,
    'sup' = 89,
    'table' = 90,
    'tbody' = 91,
    'td' = 92,
    'template' = 93,
    'textarea' = 94,
    'tfoot' = 95,
    'th' = 96,
    'thead' = 97,
    'time' = 98,
    'title' = 99,
    'tr' = 100,
    'track' = 101,
    'u' = 102,
    'ul' = 103,
    'var' = 104,
    'video' = 105,
    'wbr' = 106,
    'menu' = 107,
    'menuitem' = 108,
    'command' = 109,
    'keygen' = 110
}
export declare enum sanitizeHtmlAllowedAttributes {
    'href' = 0,
    'action' = 1,
    'src' = 2,
    'value' = 3,
    'name' = 4,
    'id' = 5,
    'target' = 6,
    'style' = 7,
    'class' = 8,
    'controls' = 9,
    'frameborder' = 10,
    'allowfullscreen' = 11,
    'allow' = 12,
    'title' = 13,
    'alt' = 14,
    'width' = 15,
    'height' = 16,
    'autoplay' = 17,
    'muted' = 18,
    'loop' = 19,
    'playsinline' = 20,
    'poster' = 21,
    'preload' = 22,
    'controlslist' = 23,
    'crossorigin' = 24,
    'referrerpolicy' = 25,
    'sandbox' = 26,
    'allowpaymentrequest' = 27,
    'colspan' = 28,
    'rowspan' = 29,
    'scope' = 30,
    'headers' = 31,
    'colgroup' = 32,
    'rowgroup' = 33,
    'span' = 34,
    'abbr' = 35,
    'align' = 36,
    'valign' = 37,
    'nowrap' = 38,
    'accept' = 39,
    'accept-charset' = 40,
    'accesskey' = 41,
    'async' = 42,
    'autocapitalize' = 43,
    'autocomplete' = 44,
    'autofocus' = 45,
    'background' = 46,
    'bgcolor' = 47,
    'border' = 48,
    'buffered' = 49,
    'capture' = 50,
    'challenge' = 51,
    'charset' = 52,
    'checked' = 53,
    'code' = 54,
    'color' = 55,
    'cols' = 56,
    'content' = 57,
    'contenteditable' = 58,
    'contextmenu' = 59,
    'coords' = 60,
    'csp' = 61,
    'datetime' = 62,
    'decoding' = 63,
    'default' = 64,
    'defer' = 65,
    'dir' = 66,
    'dirname' = 67,
    'disabled' = 68,
    'download' = 69,
    'draggable' = 70,
    'enctype' = 71,
    'enterkeyhint' = 72,
    'for' = 73,
    'formmethod' = 74,
    'formnovalidate' = 75,
    'formtarget' = 76,
    'hidden' = 77,
    'high' = 78,
    'hreflang' = 79,
    'http-equiv' = 80,
    'icon' = 81,
    'importance' = 82,
    'integrity' = 83,
    'intrinsicsize' = 84,
    'inputmode' = 85,
    'is' = 86,
    'ismap' = 87,
    'itemprop' = 88,
    'keytype' = 89,
    'kind' = 90,
    'label' = 91,
    'lang' = 92,
    'language' = 93,
    'loading' = 94,
    'list' = 95,
    'low' = 96,
    'manifest' = 97,
    'max' = 98,
    'maxlength' = 99,
    'minlength' = 100,
    'media' = 101,
    'method' = 102,
    'min' = 103,
    'multiple' = 104,
    'novalidate' = 105,
    'open' = 106,
    'optimum' = 107,
    'pattern' = 108,
    'ping' = 109,
    'placeholder' = 110,
    'radiogroup' = 111,
    'readonly' = 112,
    'rel' = 113,
    'required' = 114,
    'reversed' = 115,
    'rows' = 116,
    'scoped' = 117,
    'selected' = 118,
    'shape' = 119,
    'size' = 120,
    'sizes' = 121,
    'slot' = 122,
    'spellcheck' = 123,
    'srclang' = 124,
    'srcset' = 125,
    'start' = 126,
    'step' = 127,
    'summary' = 128,
    'tabindex' = 129,
    'translate' = 130,
    'type' = 131,
    'usemap' = 132,
    'wrap' = 133,
    'aria-activedescendant' = 134,
    'aria-atomic' = 135,
    'aria-autocomplete' = 136,
    'aria-busy' = 137,
    'aria-checked' = 138,
    'aria-colcount' = 139,
    'aria-colindex' = 140,
    'aria-colspan' = 141,
    'aria-controls' = 142,
    'aria-current' = 143,
    'aria-describedby' = 144,
    'aria-details' = 145,
    'aria-disabled' = 146,
    'aria-dropeffect' = 147,
    'aria-errormessage' = 148,
    'aria-expanded' = 149,
    'aria-flowto' = 150,
    'aria-grabbed' = 151,
    'aria-haspopup' = 152,
    'aria-hidden' = 153,
    'aria-invalid' = 154,
    'aria-keyshortcuts' = 155,
    'aria-label' = 156,
    'aria-labelledby' = 157,
    'aria-level' = 158,
    'aria-live' = 159,
    'aria-modal' = 160,
    'aria-multiline' = 161,
    'aria-multiselectable' = 162,
    'aria-orientation' = 163,
    'aria-owns' = 164,
    'aria-placeholder' = 165,
    'aria-posinset' = 166,
    'aria-pressed' = 167,
    'aria-readonly' = 168,
    'aria-relevant' = 169,
    'aria-required' = 170,
    'aria-roledescription' = 171,
    'aria-rowcount' = 172,
    'aria-rowindex' = 173,
    'aria-rowspan' = 174,
    'aria-selected' = 175,
    'aria-setsize' = 176,
    'aria-sort' = 177,
    'aria-valuemax' = 178,
    'aria-valuemin' = 179,
    'aria-valuenow' = 180,
    'aria-valuetext' = 181
}
//# sourceMappingURL=types.d.ts.map