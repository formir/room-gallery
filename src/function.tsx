export interface IroomGallery {
  element: string | HTMLElement;
  fetchMethod: (fetchUrl: string) => Promise<Array<object>> | string;
  items: HTMLImageElement[];
  elements: HTMLElement[];
  styles: object;
  settings: RoomGallerySettingsType;
}

declare global {
  interface Window {
    RoomGallery: ({} : IroomGallery) => void
  }
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RoomGallery as ReactRoomGallery } from './RoomGallery'
import { ItemType } from './components/Item'
import { RoomGallerySettingsType } from './types/types'

function RoomGallery({ element, fetchMethod, items, elements, styles, settings } : IroomGallery ) {
  const container = typeof element === 'string' ? document.querySelectorAll(element)[0] : element
  let dataItems
  let props = {
    styles: styles,
    settings: settings
  }
  
  if (typeof items === 'object') {
    if (items.length > 0) {
      dataItems = [...items].map((item) => item.tagName === 'IMG' && typeof item.tagName === 'string' ?
        ({ image: item.src.toString(), description: item.title.toString() } as ItemType) : item as ItemType)
    }
    props = { ...props, ...{ dataItems: dataItems } }
  } else if (typeof elements === 'object') {
      props = { ...props, ...{ elementItems: elements } };
  } else {
    props = {...props, [typeof fetchMethod === 'string' ? 'fetchUrl' : 'fetchHandler']: fetchMethod}
  }
  
  const root = ReactDOM.createRoot(container)
        root.render(<ReactRoomGallery {...props} />)
}
window.RoomGallery = RoomGallery;