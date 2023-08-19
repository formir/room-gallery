import React, { useState, useEffect, FC } from 'react'
import './sass/formir-room.scss'
import { Room } from './components/Room'
import { ItemType } from './components/Item'
import { RoomType } from './components/Room'
import { parseRooms, parseWalls, kebabize } from './helpers/parse'
import { StylesVariables} from './helpers/types'

interface RoomGalleryProps {
  fetchHandler?: (fetchUrl:string) => Promise<Array<ItemType>>;
  dataItems?: Array<ItemType>;
  fetchUrl?: string;
  styles?: object;
  children?: JSX.Element[] | JSX.Element;
}

interface parseItemsI {
  dataItems?: Array<ItemType>;
  childrenItems?: JSX.Element[] | JSX.Element;
  nodeItems?: Element | NodeListOf<Element>;
  preItems?: Array<ItemType>;
  preRooms?: Array<RoomType>;
}

const RoomGallery: FC<RoomGalleryProps> = ({ fetchHandler, dataItems, fetchUrl, styles, children }) => {
  const [currentState, setCurrentState] = useState({ items: [] as Array<ItemType>, rooms: [] as Array<RoomType>, activeItem: {index: 0} as ItemType })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dark, setDark] = useState(false)
  const [zoom, setZoom] = useState(false)

  const parseItems = ({dataItems, childrenItems, preItems, preRooms}: parseItemsI) => {
    let itemsToParse = [];
    if (childrenItems) {
      itemsToParse = [...(Array.isArray(childrenItems) ? childrenItems : [childrenItems])]
      const newItems = [] as Array<ItemType>
      itemsToParse.forEach((element) => {
        newItems.push({element: element})
      })
      itemsToParse = newItems
    } else {
      itemsToParse = dataItems as Array<ItemType>
    }
    parseRooms(itemsToParse, preRooms!)
    const activeItem = parseWalls(itemsToParse, preItems!, preRooms!)
    setCurrentState({ rooms: preRooms!, items: preItems!, activeItem })
  }

  const gotoNextItem = () => {
    setCurrent(getNextItem());
  }

  const getNextItem = () => {
    return currentState.activeItem.index < currentState.items.length ? 
      currentState.items[currentState.activeItem.index + 1] :
      currentState.items[currentState.items.length]
  }

  const gotoPrevItem = () => {
    setCurrent(getPrevItem());
  }

  const getPrevItem = () => {
    return currentState.activeItem.index > 0 ?
    currentState.items[currentState.activeItem.index - 1] :
    currentState.items[0]
  }

  const getCurrentItem = () => {
    return currentState.activeItem
  }

  const setCurrent = (item: ItemType) => {
    setCurrentState({ items: currentState.items, rooms: currentState.rooms, activeItem: item })
    setPosition({ y: item.position.y, x: item.position.x })
  }

  const darkModeToggle = () => {
    setDark(!dark)
  }

  const zoomToggle = () => {
    setZoom(!zoom)
  }

  const dataFetch = async (url: string) => {
    const data = await (
      await fetch(url)
    ).json()
    return data.items
  }

  useEffect(() => {
    const preItems = [] as Array<ItemType>
    const preRooms = [] as Array<RoomType>
    if (children) {
      parseItems({ childrenItems: children, preItems, preRooms })
    } else if (dataItems) {
      parseItems({ dataItems, preItems, preRooms })
    } else if (fetchHandler) {
      fetchHandler(fetchUrl!).then((fetchItems: Array<ItemType>) => {
        parseItems({dataItems: fetchItems, preItems, preRooms})
      })
    } else if (fetchUrl) {
      dataFetch(fetchUrl).then((fetchItems: Array<ItemType>) => {
        parseItems({dataItems: fetchItems, preItems, preRooms})
      })
    } else {
      console.error('Provide items for gallery using one of two methods: fetchUrl or dataItems.')
    }
  }, [])

  useEffect(() => {
    const root = document.querySelector(':root')
    if (root instanceof HTMLElement) {
      const rootStyle = root.style
      styles && Object.keys(styles).forEach((key: string) => {
        if (key && key in StylesVariables) {
          rootStyle.setProperty('--' + kebabize(key), styles[key as keyof typeof styles])
        }
      })
    }
  }, [styles])

  return (
    <>
      { currentState.rooms.length > 0 && <div className={`room ${dark ? 'room-dark' : ''} ${zoom ? 'room-zoom' : ''}`}>
          <div className="room-body">
            <div className="room-arena">
              { currentState.rooms.map((room, index) => (
                <Room
                  key={index}
                  index={index}
                  room={room}
                  rooms={currentState.rooms}
                  position={position}/>
              )) }
            </div>
            <div className="room-navigations">
              { currentState.activeItem.index > 0 && getPrevItem() &&
                <button className="prev" onClick={() => gotoPrevItem()}>
                  <span>{getCurrentItem().index}</span>
                </button>
              }
              {
                currentState.items.length > currentState.activeItem.index + 1 && getNextItem() &&
                <button className="next" onClick={() => gotoNextItem()}>
                  <span>{getCurrentItem().index + 2.0}</span>
                </button>
              }
            </div>
            <div className="room-paginations">
              { currentState.items.map((item, index) => (
                item && <button
                  className={index === currentState.activeItem.index ? 'active' : ''}
                  key={index}
                  onClick={() => setCurrent(item) }>
                    {index + 1}
                  </button>
              ))}
            </div>
            <button className="room-exit-btn" onClick={() => zoomToggle()}></button>
            <button className="room-zoom-btn" onClick={() => zoomToggle()}></button>
            <button className="room-dark-btn" onClick={() => darkModeToggle()}></button>
          </div>
        </div>
      }
    </>
  )
}

export default RoomGallery
