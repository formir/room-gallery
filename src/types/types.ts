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
  title = 'title'
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
  'lightRoomBackgroundBlendMode', 'lightRoomBodyBackground', 'lightRoomTypeextColor', 'lightRoomFloorBackground', 'lightRoomFloorShadow',
  'lightRoomWallBackground', 'lightRoomWallShadow', 'lightRoomCeilBackground', 'lightRoomCeilShadow', 'lightRoomButtonBackground', 'lightRoomButtonColor',
  'lightRoomButtonBorder', 'lightRoomButtonShadow', 'lightRoomButtonCurrentBackground', 'lightRoomButtonCurrentBorder', 'lightRoomButtonCurrentColor',
  'lightRoomButtonCurrentShadow', 'lightRoomCanvasBorder', 'lightRoomCanvasShadow', 'darkRoomBackgroundBlendMode', 'darkRoomBodyBackground', 'darkRoomTypeextColor',
  'darkRoomFloorBackground', 'darkRoomFloorShadow', 'darkRoomWallBackground', 'darkRoomWallShadow', 'darkRoomCeilBackground', 'darkRoomCeilShadow',
  'darkRoomButtonBackground', 'darkRoomButtonColor', 'darkRoomButtonBorder', 'darkRoomButtonShadow', 'darkRoomButtonCurrentBackground',
  'darkRoomButtonCurrentBorder', 'darkRoomButtonCurrentColor', 'darkRoomButtonCurrentShadow', 'darkRoomCanvasBorder', 'darkRoomCanvasShadow' }
