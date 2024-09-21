import { ItemType, Position } from './../components/Item'
import { RoomType } from './../components/Room'
import { Ref } from 'react'

export enum ArrowNav {
  number = 'number',
  icon = 'icon',
  blank = 'blank',
  disabled = 'disabled'
}

export enum DarkNav {
  button = 'button',
  icon = 'icon',
}

export enum DarkMode {
  dark = 'dark',
  light = 'light',
  manual = 'manual',
  auto = 'auto'
}

export enum ZoomNav {
  button = 'button',
  icon = 'icon',
}

export enum ZoomMode {
  in = 'in',
  out = 'out',
  manual = 'manual',
  disabled = 'disabled'
}

export enum PaginationsNav {
  button = 'button',
  text = 'text'
}

export enum Paginations {
  disabled = 'disabled',
  number = 'number',
  blank = 'blank',
  title = 'title',
  thumb = 'thumb'
}

export enum PaginationsOnZoom {
  hide = 'hide',
  show = 'show'
}

export enum ArrowNavOnZoom {
  hide = 'hide',
  show = 'show'
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
  emptyMessage?: string;
  icons?: {
    next?: JSX.Element;
    prev?: JSX.Element;
    lightOff?: JSX.Element;
    lightOn?: JSX.Element;
    zoomIn?: JSX.Element;
    zoomOut?: JSX.Element;
  },
  swipeToNav?: boolean;
  swipeToZoom?: boolean;
  keypressToNav?: boolean;
  keypressToZoom?: boolean;
  event?: {
    onInit?: (value?: object) => void
    onRender?: (value?: object) => void
    onShowNext?: (value?: object) => void
    onShowPrev?: (value?: object) => void
    onZoomIn?: (value?: object) => void
    onZoomOut?: (value?: object) => void
    onDarkModeOn?: (value?: object) => void
    onDarkModeOff?: (value?: object) => void
  },
  animationSpeed?: { min: number, ratio: number } | number,
  sanitizeHtml?: boolean;
  sanitizeHtmlOptions?: {
    allowedAttributes?: Array<keyof typeof sanitizeHtmlAllowedAttributes>;
    allowedTags?: Array<keyof typeof sanitizeHtmlAllowedTags>;
  }
}

export interface RoomGalleryProps {
  fetch?: (() => Promise<Array<ItemType>>) | string;
  items?: (ItemType[] | HTMLElement[]);
  styles?: object;
  children?: JSX.Element[] | JSX.Element;
  settings?: RoomGallerySettingsType;
  ref?: Ref<HTMLDivElement>
}

export interface parseItemsI {
  dataItems?: Array<ItemType>;
  elementItems?: HTMLElement[];
  childrenItems?: JSX.Element[] | JSX.Element;
  nodeItems?: Element | NodeListOf<Element>;
  preItems: Array<ItemType>;
  preRooms: Array<RoomType>;
}

export enum StylesVariables {
  'rotateSpeed', 'rotateTiming', 'fontFamily', 'perspective', 'mobileSizeWidth', 'mobileSizeHeight', 'mobilePerspective', 'scale', 'scaleZoom', 'offsetY',
  'itemHeight', 'itemWidth', 'zIndex', 'iconBlendMode', 'textColor', 'linkColor', 'textFontSize', 'textFontSizeMobile', 'fontLineHeight', 'textMarginTop', 'textMaxHeight', 'textMinHeight',
  'textMaxWidth', 'textPadding', 'navigationsMargin', 'buttonSize', 'paginationButtonSize', 'paginationButtonsSpace', 'paginationButtonsBorderRadius', 'paginationThumbsMaxHeight', 'paginationThumbMaxWidth', 'navButtonSize', 'buttonsPosition',
  'buttonZoomPosition', 'buttonDarkPosition', 'buttonZoomWidth', 'buttonExitWidth', 'buttonDarkWidth', 'paginationPosition', 'buttonTransition', 'buttonOpacity',
  'lightBackgroundBlendMode', 'lightBodyBackground', 'lightTextColor', 'lightLinkColor', 'lightFloorBackground', 'lightFloorShadow',
  'lightWallBackground', 'lightWallShadow', 'lightCeilBackground', 'lightCeilShadow', 'lightButtonBackground', 'lightButtonColor',
  'lightButtonBorder', 'lightButtonShadow', 'lightButtonCurrentBackground', 'lightButtonCurrentBorder', 'lightButtonCurrentColor',
  'lightButtonCurrentShadow', 'lightIconColor', 'lightCanvasBorder', 'lightCanvasShadow', 'darkBackgroundBlendMode', 'darkBodyBackground', 'darkTextColor', 'darkLinkColor',
  'darkFloorBackground', 'darkFloorShadow', 'darkWallBackground', 'darkWallShadow', 'darkCeilBackground', 'darkCeilShadow',
  'darkButtonBackground', 'darkButtonColor', 'darkButtonBorder', 'darkButtonShadow', 'darkButtonCurrentBackground',
  'darkButtonCurrentBorder', 'darkButtonCurrentColor', 'darkButtonCurrentShadow', 'darkIconColor', 'darkCanvasBorder', 'darkCanvasShadow'
}

export enum sanitizeHtmlAllowedTags {
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
  'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas', 'caption',
  'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details',
  'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head',
  'header', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins',
  'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta',
  'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output',
  'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's',
  'samp', 'section', 'select', 'small', 'source', 'span', 'strong',
  'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template',
  'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u',
  'ul', 'var', 'video', 'wbr', 'menu', 'menuitem', 'command', 'keygen'
}

export enum sanitizeHtmlAllowedAttributes {
  'href', 'action', 'src', 'value', 'name', 'id', 'target', 'style', 'class', 'controls', 'frameborder', 'allowfullscreen', 'allow',
  'title', 'alt', 'width', 'height', 'autoplay', 'muted', 'loop', 'playsinline', 'poster', 'preload', 
  'controlslist', 'crossorigin', 'referrerpolicy', 'sandbox', 'allowpaymentrequest', 'colspan', 'rowspan',
  'scope', 'headers', 'colgroup', 'rowgroup', 'span', 'abbr', 'align', 'valign', 'nowrap', 'accept',
  'accept-charset', 'accesskey', 'async', 'autocapitalize', 'autocomplete', 'autofocus', 'background',
  'bgcolor', 'border', 'buffered', 'capture', 'challenge', 'charset', 'checked', 'code',
  'color', 'cols', 'content', 'contenteditable', 'contextmenu', 'coords', 'csp', 'datetime', 'decoding',
  'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'enctype', 'enterkeyhint',
  'for', 'formmethod', 'formnovalidate', 'formtarget', 'hidden', 'high', 'hreflang', 'http-equiv',
  'icon', 'importance', 'integrity', 'intrinsicsize', 'inputmode', 'is', 'ismap', 'itemprop', 'keytype',
  'kind', 'label', 'lang', 'language', 'loading', 'list', 'low', 'manifest', 'max', 'maxlength',
  'minlength', 'media', 'method', 'min', 'multiple', 'novalidate', 'open', 'optimum', 'pattern', 'ping',
  'placeholder', 'radiogroup', 'readonly', 'rel', 'required', 'reversed', 'rows', 'scoped', 'selected',
  'shape', 'size', 'sizes', 'slot', 'spellcheck', 'srclang', 'srcset', 'start', 'step', 'summary', 
  'tabindex', 'translate', 'type', 'usemap', 'wrap', 'aria-activedescendant', 'aria-atomic', 'aria-autocomplete',
  'aria-busy', 'aria-checked', 'aria-colcount', 'aria-colindex', 'aria-colspan', 'aria-controls', 'aria-current',
  'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded',
  'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
  'aria-labelledby', 'aria-level', 'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation',
  'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed', 'aria-readonly', 'aria-relevant', 'aria-required',
  'aria-roledescription', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 'aria-selected', 'aria-setsize', 'aria-sort',
  'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext'
}
