export interface IroomGallery {
  element: string | HTMLElement;
  fetchMethod: (fetchUrl: string) => Promise<Array<object>> | string;
  items: HTMLImageElement[];
  styles: object;
  settings: RoomGallerySettingsType;
}

declare global {
  interface Window {
    RoomGallery: ({} : IroomGallery) => void
  }
}

import React from 'react'
import { createRoot } from 'react-dom/client'
import { RoomGallery as ReactRoomGallery } from './RoomGallery'
import { ItemType } from './components/Item'
import { RoomGallerySettingsType } from './types/types'

function RoomGallery({ element, fetchMethod, items, styles, settings } : IroomGallery ) {
  const container = typeof element === 'string' ? document.querySelector(element) : element
  let dataItems
  let props = {
    styles: styles,
    settings: settings
  }
  
  if (typeof items === 'object') {
    if (items.length > 0) {
      dataItems = [...items].map((item) => item.tagName === 'IMG' ? ( { image: item.src.toString(), description: item.title.toString() } as ItemType) : null)
    }
    props = { ...props, ...{ dataItems: dataItems } }
  } else {
    props = {...props, [typeof fetchMethod === 'string' ? 'fetchUrl' : 'fetchHandler']: fetchMethod}
  }
  
  const root = createRoot(container!)
  root.render(<ReactRoomGallery {...props} />)
}
window.RoomGallery = RoomGallery;