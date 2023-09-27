
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RoomGallery as ReactRoomGallery } from './RoomGallery'
import { ItemType } from './components/Item'
import { RoomGallerySettingsType, RoomGalleryProps } from './types/types'

declare global {
  interface Window {
    RoomGallery: ({} : IroomGallery) => void
  }
}

export interface IroomGallery {
  element: string | HTMLElement;
  fetchMethod?: (fetchUrl: string) => Promise<Array<object>> | string;
  items?: HTMLImageElement[];
  elements?: HTMLElement[];
  styles?: object;
  settings?: RoomGallerySettingsType;
}

export function RoomGallery({ element, fetchMethod, items, elements, styles, settings } : IroomGallery ) {
  const container = typeof element === 'string' ? document.querySelectorAll(element)[0] : element
  if (!container) return console.error("Specify container element, provide query string or HTML Element in 'element' prop.")
  let dataItems
  let props = {} as RoomGalleryProps

  if (styles) props.styles = styles
  if (settings) props.settings = settings
  
  if (typeof items === 'object') {
    if (items.length > 0) {
      dataItems = [...items].map((item) =>
      item.tagName === 'IMG' && typeof item.tagName === 'string' ?
        { image: item.src.toString(), description: item.title.toString() } as ItemType : item as ItemType
      )
    }
    props.dataItems = dataItems
  } else if (typeof elements === 'object') {
      props.elementItems = elements
  } else {
    props = { ...props, [typeof fetchMethod === 'string' ? 'fetchUrl' : 'fetchHandler'] : fetchMethod }
  }
  const root = ReactDOM.createRoot(container),
        room = <ReactRoomGallery {...props} />
  root.render(room)
  return { component: room, element: container, props: props }
}
window.RoomGallery = RoomGallery;