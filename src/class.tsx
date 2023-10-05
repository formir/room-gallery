
import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { RoomGallery as ReactRoomGallery } from './RoomGallery'
import { ItemType } from './components/Item'
import { RoomGallerySettingsType, RoomGalleryProps } from './types/types'

interface IroomGallery {
  element: string | HTMLElement;
  fetchMethod?: (fetchUrl: string) => Promise<Array<object>> | string;
  items?: HTMLImageElement[];
  elements?: HTMLElement[];
  styles?: object;
  settings?: RoomGallerySettingsType;
}

class RoomGallery implements IroomGallery {
  element: string | HTMLElement;
  fetchMethod?: (fetchUrl: string) => Promise<Array<object>> | string;
  items?: HTMLImageElement[];
  elements?: HTMLElement[];
  styles?: object;
  settings?: RoomGallerySettingsType;
  roomGalleryRef?: any;

  constructor(options: IroomGallery) {
    this.element = options.element
    this.elements = options?.elements
    this.fetchMethod = options?.fetchMethod
    this.items = options?.items
    this.styles = options?.styles
    this.settings = options?.settings
    this.roomGalleryRef = React.createRef()
    this.init()
  }

  init(): {} | void {
    const container = typeof this.element === 'string' ? document.querySelectorAll(this.element)[0] : this.element
    if (!container) return console.error("Specify container element, provide query string or HTML Element in 'element' prop.")
    let dataItems
    let props = {} as RoomGalleryProps

    if (this.styles) props.styles = this.styles
    if (this.settings) props.settings = this.settings
    
    if (typeof this.items === 'object') {
      if (this.items.length > 0) {
        dataItems = [...this.items].map((item) =>
        item.tagName === 'IMG' && typeof item.tagName === 'string' ?
          { image: item.src.toString(), title: item.title.toString(), description: item.alt.toString() } as ItemType : {} as ItemType
        )
      }
      props.dataItems = dataItems
    } else if (typeof this.elements === 'object') {
        props.elementItems = this.elements
    } else {
      props = { ...props, [typeof this.fetchMethod === 'string' ? 'fetchUrl' : 'fetchHandler'] : this.fetchMethod }
    }


    const root = ReactDOM.createRoot(container),
    room = <ReactRoomGallery {...props} ref={this.roomGalleryRef} />
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