import React, { useState, useEffect, FC, createContext } from 'react'
import './sass/formir-room.scss'
import { Room } from './components/Room'
import { ItemType } from './components/Item'
import { RoomType } from './components/Room'
import { parseRooms, parseWalls, kebabize } from './helpers/parse'
import { StylesVariables} from './helpers/types'

import NextIcon from './img/icons/next.svg'
import PrevIcon from './img/icons/prev.svg'
import LightOffIcon from './img/icons/light-off.svg'
import ZoomInIcon from './img/icons/zoom-in.svg'
import ZoomOutIcon from './img/icons/zoom-out.svg'

enum ArrowNav {
  number = 'number',
  icon = 'icon',
  blank = 'blank',
  disabled = 'disabled'
}

enum DarkNav {
  button = 'button',
  icon = 'icon',
}

enum DarkMode {
  dark = 'dark',
  light = 'light',
  manual = 'manual',
  auto = 'auto'
}

enum ZoomNav {
  button = 'button',
  icon = 'icon',
}

enum ZoomMode {
  in = 'in',
  out = 'out',
  manual = 'manual',
  disabled = 'disabled'
}

enum PaginationsNav {
  button = 'button',
  text = 'text'
}

enum Paginations {
  disabled = 'disabled',
  number = 'number',
  blank = 'blank'
}

enum PaginationsOnZoom {
  hide = 'hide',
  show = 'show'
}

enum ArrowNavOnZoom {
  hide = 'hide',
  show = 'show'
}

type RoomGallerySettingsType = {
  arrowNav?: keyof typeof ArrowNav;
  darkNav?: keyof typeof DarkNav;
  zoomNav?: keyof typeof ZoomNav;
  darkMode?: keyof typeof DarkMode;
  zoomMode?: keyof typeof ZoomMode;
  paginationsNav?: keyof typeof PaginationsNav;
  paginations?: keyof typeof Paginations;
  paginationsOnZoom?: keyof typeof PaginationsOnZoom;
  arrowNavOnZoom?: keyof typeof ArrowNavOnZoom;
  icons?: {
    next?: JSX.Element
    prev?: JSX.Element
    lightOff?: JSX.Element
    lightOn?: JSX.Element
    zoomIn?: JSX.Element
    zoomOut?: JSX.Element
  }
}

const roomGalleryDefaultSettings = {
   arrowNav: ArrowNav.number,
   darkNav: DarkNav.button,
   zoomNav: ZoomNav.button,
   darkMode: DarkMode.manual,
   zoomMode: ZoomMode.manual,
   paginationsNav: PaginationsNav.button,
   paginations: Paginations.number,
   paginationsOnZoom: PaginationsOnZoom.hide,
   arrowNavOnZoom: ArrowNavOnZoom.show,
} as RoomGallerySettingsType;

interface RoomGalleryProps {
  fetchHandler?: (fetchUrl:string) => Promise<Array<ItemType>>;
  dataItems?: Array<ItemType>;
  fetchUrl?: string;
  styles?: object;
  children?: JSX.Element[] | JSX.Element;
  settings?: RoomGallerySettingsType;
}

interface parseItemsI {
  dataItems?: Array<ItemType>;
  childrenItems?: JSX.Element[] | JSX.Element;
  nodeItems?: Element | NodeListOf<Element>;
  preItems?: Array<ItemType>;
  preRooms?: Array<RoomType>;
}

export const GalleryContext = createContext(null);

const RoomGallery: FC<RoomGalleryProps> = ({ fetchHandler, dataItems, fetchUrl, styles, children, settings }) => {
  const [currentState, setCurrentState] = useState({ items: [] as Array<ItemType>, rooms: [] as Array<RoomType>, activeItem: {index: 0} as ItemType })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dark, setDark] = useState(settings.darkMode === 'dark')
  const [zoom, setZoom] = useState(settings.zoomMode === 'in')

  settings = {...roomGalleryDefaultSettings, ...settings}

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

  function isDarkMode() {
    return (settings.darkMode === DarkMode.manual && dark) || settings.darkMode === DarkMode.dark
  }

  function isZoomed() {
    return (settings.zoomMode === ZoomMode.manual && zoom) || settings.zoomMode === ZoomMode.in
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
    <GalleryContext.Provider value={{currentState, zoom, settings, position}}>
      { currentState.rooms.length > 0 && <div className={`room ${isDarkMode() ? 'room-dark' : ''} ${isZoomed() ? 'room-zoom' : ''}`}>
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
            { settings.arrowNav !== 'disabled' && <div className="room-navigations">
              { currentState.activeItem.index > 0 && getPrevItem() && ((isZoomed() && settings.arrowNavOnZoom !== 'hide') || !isZoomed()) && <>
                {
                  ['number', 'blank'].includes(settings.arrowNav) ?
                  <button className="room-prev" onClick={() => gotoPrevItem()}>
                    { settings.arrowNav === 'number' && <span>{getCurrentItem().index}</span> }
                  </button> :
                  <button className="room-prev room-icon" onClick={() => gotoPrevItem()}>
                    { settings?.icons?.prev ?? <PrevIcon/> }
                  </button>
                }
              </>
              }
              {
                currentState.items.length > currentState.activeItem.index + 1 && getNextItem() && ((isZoomed() && settings.arrowNavOnZoom !== 'hide') || !isZoomed()) && <>
                  {
                    ['number', 'blank'].includes(settings.arrowNav) ?
                    <button className="room-next" onClick={() => gotoNextItem()}>
                      { settings.arrowNav === 'number' && <span>{getCurrentItem().index + 2.0}</span> }
                    </button> :
                    <button className="room-next room-icon" onClick={() => gotoNextItem()}>
                      { settings?.icons?.next ?? <NextIcon/> }
                    </button>
                  }
                </>
              }
            </div>
            }
            {
              settings.paginations !== 'disabled' && ((isZoomed() && settings.paginationsOnZoom !== 'hide') || !isZoomed()) && <div className="room-paginations">
              { currentState.items.map((item, index) => (
                item && <button
                  className={`${index === currentState.activeItem.index ? 'active' : ''} ${settings.paginationsNav === PaginationsNav.text ? 'room-icon' : ''}`}
                  key={index}
                  onClick={() => setCurrent(item) }>
                    { settings.paginations === 'number' && <span>{index + 1}</span> }
                  </button>
              ))}
            </div>
            }
            { settings.zoomMode === 'manual' && <>
                {
                  isZoomed() ? <button className={`room-exit-btn ${settings.zoomNav === ZoomNav.icon ? 'room-icon' : ''}`} onClick={() => zoomToggle()}>
                    { settings?.icons?.zoomOut ?? <ZoomOutIcon/> }
                  </button> :
                  <button className={`room-zoom-btn ${settings.zoomNav === ZoomNav.icon ? 'room-icon' : ''}`} onClick={() => zoomToggle()}>
                    { settings?.icons?.zoomIn ?? <ZoomInIcon/> }
                  </button>
                }
              </>
            }
            { settings.darkMode === 'manual' && <button className={`room-dark-btn ${settings.darkNav === DarkNav.icon ? 'room-icon' : ''}`} onClick={() => darkModeToggle()}>
              { isDarkMode() ? settings?.icons?.lightOn ?? <LightOffIcon/> : settings?.icons?.lightOff ?? <LightOffIcon/> }
            </button> }
          </div>
        </div>
      }
    </GalleryContext.Provider>
  )
}

export default RoomGallery
