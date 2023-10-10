
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RoomGallery as ReactRoomGallery } from './components/RoomGallery'
import { ItemType } from './components/Item'
import { RoomGallerySettingsType, RoomGalleryProps } from './types/types'

export interface IroomGallery {
  element: string | HTMLElement;
  fetch?: () => Promise<Array<object>> | string;
  items?: HTMLImageElement[] | ItemType[] | HTMLElement[];
  styles?: object;
  settings?: RoomGallerySettingsType;
}

class RoomGallery implements IroomGallery {
  element: string | HTMLElement;
  fetch?: () => Promise<Array<object>> | string;
  items?: HTMLImageElement[] | ItemType[] | HTMLElement[];
  styles?: object;
  settings?: RoomGallerySettingsType;
  roomGalleryRef?: any;
  props: RoomGalleryProps;
  container: null | Element;

  constructor(options: IroomGallery) {
    this.element = options.element
    this.fetch = options?.fetch
    this.items = options?.items
    this.styles = options?.styles
    this.settings = options?.settings
    this.roomGalleryRef = React.createRef()
    this.props = {}
    this.findContainer()
    this.prepareProps()
    this.init()
  }

  findContainer(): void {
    this.container = typeof this.element === 'string' ? document.querySelectorAll(this.element)[0] : this.element
    if (!this.container) return console.error("Specify container element, provide query string or HTML Element in 'element' prop.")
  }

  prepareProps(): void {
    let dataItems;
    if (this.styles) this.props.styles = this.styles
    if (this.settings) this.props.settings = this.settings
    
    if (typeof this.items === 'object' && this.items[0] instanceof HTMLImageElement) {
      if (this.items.length > 0) {
        dataItems = [...this.items].map((item: HTMLImageElement) =>
        item.tagName === 'IMG' && typeof item.tagName === 'string' ?
          { image: item.src.toString(), title: item.title.toString(), description: item.alt.toString() } as ItemType : {} as ItemType
        )
      }
      this.props.items = dataItems
    } else if (typeof this.items === 'object') {
      this.props.items = this.items
    } else if (typeof this.fetch === 'string' || typeof this.fetch === 'function') {
      this.props.fetch = this.fetch
    }
  }

  init(): {} | void {
    const root = ReactDOM.createRoot(this.container),
    room = <ReactRoomGallery {...this.props} ref={this.roomGalleryRef} />
    root.render(room)
  }

  gotoNextItem(): void {
    if (this.roomGalleryRef.current) {
      this.roomGalleryRef.current.gotoNextItem()
    }
  }

  gotoPrevItem(): void {
    if (this.roomGalleryRef.current) {
      this.roomGalleryRef.current.gotoPrevItem()
    }
  }

  toggleDarkMode(): void {
    if (this.roomGalleryRef.current) {
      this.roomGalleryRef.current.toggleDarkMode()
    }
  }

  setDarkMode(mode : boolean): void {
    if (this.roomGalleryRef.current) {
      this.roomGalleryRef.current.setDarkMode(mode)
    }
  }

  toggleZoom(): void {
    if (this.roomGalleryRef.current) {
      this.roomGalleryRef.current.toggleZoom()
    }
  }

  setZoom(zoom : boolean): void {
    if (this.roomGalleryRef.current) {
      this.roomGalleryRef.current.setZoom(zoom)
    }
  }

  getCurrentItem(): {} | void {
    if (this.roomGalleryRef.current) {
      return this.roomGalleryRef.current.getCurrentItem()
    }
  }
}

export default RoomGallery;