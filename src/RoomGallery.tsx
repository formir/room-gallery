import React, { useState, useEffect, FC, createContext, Suspense, useRef } from 'react'
import { useSwipeable } from "react-swipeable"
import './sass/formir-room.scss'
import { 
  RoomGallerySettingsType,
  ArrowNav,
  DarkNav,
  ZoomNav,
  DarkMode,
  ZoomMode,
  PaginationsNav,
  Paginations,
  PaginationsOnZoom,
  ArrowNavOnZoom,
  RoomGalleryProps,
  parseItemsI,
  StylesVariables
} from './types/types'
import { Room } from './components/Room'
import { ItemType } from './components/Item'
import { RoomType } from './components/Room'
import { parseRooms, parseWalls, kebabize } from './helpers/parse'

import NextIcon from './img/icons/next.svg'
import PrevIcon from './img/icons/prev.svg'
import LightOffIcon from './img/icons/light-off.svg'
import ZoomInIcon from './img/icons/zoom-in.svg'
import ZoomOutIcon from './img/icons/zoom-out.svg'

export const roomGalleryDefaultSettings = {
  arrowNav: ArrowNav.number,
  darkNav: DarkNav.button,
  zoomNav: ZoomNav.button,
  darkMode: DarkMode.manual,
  zoomMode: ZoomMode.manual,
  paginationsNav: PaginationsNav.button,
  paginations: Paginations.number,
  paginationsOnZoom: PaginationsOnZoom.hide,
  arrowNavOnZoom: ArrowNavOnZoom.show,
  defaultPosition: { x: 0, y: 0 },
  swipeToNav: true,
  swipeToZoom: true,
  keypressToNav: true,
  keypressToZoom: true
} as RoomGallerySettingsType;

export const GalleryContext = createContext(null);

export const RoomGallery: FC<RoomGalleryProps> = ({ fetchHandler, dataItems, elementItems, fetchUrl, styles, children, settings }) => {
  settings = { ...roomGalleryDefaultSettings, ...settings }
  
  const [currentState, setCurrentState] = useState({
    items: [] as Array<ItemType>,
    rooms: [] as Array<RoomType>,
    activeItem: {index: 0} as ItemType
  })
  const [position, setPosition] = useState(settings.defaultPosition)
  const [dark, setDark] = useState(settings.darkMode === DarkMode.dark)
  const [zoom, setZoom] = useState(settings.zoomMode === ZoomMode.in)

  const roomRef = useRef()

  const value = { currentState, zoom, dark, position, settings }

  const parseItems = ({dataItems, childrenItems, elementItems, preItems, preRooms}: parseItemsI) => {
    let itemsToParse = [];
    if (childrenItems) {
      itemsToParse = [...(Array.isArray(childrenItems) ? childrenItems : [childrenItems])]
      const newItems = [] as Array<ItemType>
      itemsToParse.forEach((element) => {
        newItems.push({element: element})
      })
      itemsToParse = newItems
    } else if (elementItems) {
      itemsToParse = [...elementItems]
      const newItems = [] as Array<ItemType>
      itemsToParse.forEach((element) => {
        newItems.push({HtmlElement: element})
      })
      itemsToParse = newItems
    } else {
      itemsToParse = dataItems as Array<ItemType>
    }
    parseRooms(itemsToParse, preRooms!)
    const activeItem = parseWalls(itemsToParse, preItems!, preRooms!, position)
    setCurrentState({
      rooms: preRooms!,
      items: preItems!,
      activeItem
    })
    if (typeof settings?.event?.onRender === 'function') settings?.event?.onRender(value)
  }

  const gotoNextItem = () => {
    if (getNextItem()) {
      setCurrent(getNextItem())
      if (typeof settings?.event?.onShowNext === 'function') settings?.event?.onShowNext(value)
    }
  }

  const getNextItem = () => {
    return currentState.activeItem.index < currentState.items.length ? 
      currentState.items[currentState.activeItem.index + 1] :
      currentState.items[currentState.items.length]
  }

  const gotoPrevItem = () => {
    if (getPrevItem()) {
      setCurrent(getPrevItem())
      if (typeof settings?.event?.onShowPrev === 'function') settings?.event?.onShowPrev(value)
    }
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
    setCurrentState({ ...currentState, activeItem: item })
    setPosition({ y: item.position.y, x: item.position.x })
  }

  const darkModeToggle = () => {
    setDark(!dark)
    if (typeof settings?.event?.onDarkModeOn === 'function' && !dark) settings?.event?.onDarkModeOn(value)
    if (typeof settings?.event?.onDarkModeOff === 'function' && dark) settings?.event?.onDarkModeOff(value)
  }

  const zoomToggle = () => {
    setZoom(!zoom)
    if (typeof settings?.event?.onZoomIn === 'function' && !zoom) settings?.event?.onZoomIn(value)
    if (typeof settings?.event?.onZoomOut === 'function' && zoom) settings?.event?.onZoomOut(value)
  }

  const zoomOn = () => {
    setZoom(true)
    if (typeof settings?.event?.onZoomOut === 'function') settings?.event?.onZoomOut(value)
  }

  const zoomOff = () => {
    setZoom(false)
    if (typeof settings?.event?.onZoomIn === 'function') settings?.event?.onZoomIn(value)
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => settings.swipeToNav && gotoNextItem(),
    onSwipedRight: () => settings.swipeToNav && gotoPrevItem(),
    onSwipedUp: () => settings.swipeToZoom && zoomOff(),
    onSwipedDown: () => settings.swipeToZoom && zoomOn(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    const preItems = [] as Array<ItemType>
    const preRooms = [] as Array<RoomType>
    if (typeof settings?.event?.onInit === 'function') settings?.event?.onInit(value)

    if (children) {
      parseItems({ childrenItems: children, preItems, preRooms })
    } else if (dataItems) {
      parseItems({ dataItems, preItems, preRooms })
    } else if (elementItems) {
      parseItems({ elementItems: elementItems, preItems, preRooms })
    } else if (fetchHandler) {
      fetchHandler(fetchUrl!).then((fetchItems: Array<ItemType>) => {
        parseItems({dataItems: fetchItems, preItems, preRooms})
      })

    } else if (fetchUrl) {
      dataFetch(fetchUrl).then((fetchItems: Array<ItemType>) => {
        parseItems({dataItems: fetchItems, preItems, preRooms})
      })
    } else {
      console.error('No fetch methods or items provided. Use one of this props: fetchHandler, dataItems, elementItems, fetchUrl')
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          settings.keypressToZoom && zoomOn()
          break;
        case 'ArrowDown':
          settings.keypressToZoom && zoomOff()
          break;
        case 'ArrowLeft':
          settings.keypressToNav && gotoPrevItem()
          break;
        case 'ArrowRight':
          settings.keypressToNav && gotoNextItem()
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentState.items, position]);

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

  function Loading() {
    return <h2>Loading...</h2>;
  }

  return (
    <GalleryContext.Provider value={value}>
      <Suspense fallback={<Loading />}>
        {
          currentState.rooms.length > 0 &&
          <div ref={roomRef} className={`room-gallery${isDarkMode() ? ' room-dark' : ''}${isZoomed() ? ' room-zoom' : ''}`} {...swipeHandlers}>
            <div className="room-body">
              <div className="room-arena">
                {
                  currentState.rooms.map((room, index) => (
                    <Room
                      key={index}
                      index={index}
                      room={room}
                      rooms={currentState.rooms}
                      position={position}/>
                    )
                  )
                }
              </div>
              { settings.arrowNav !== ArrowNav.disabled && 
                <div className="room-navigations">
                  { 
                    currentState.activeItem.index > 0 && getPrevItem() &&
                    ((isZoomed() && settings.arrowNavOnZoom !== ArrowNavOnZoom.hide) || !isZoomed()) &&
                    <>
                      {
                        ['number', 'blank'].includes(settings.arrowNav) ?
                        <button className="room-prev" onClick={() => gotoPrevItem()}>
                          { settings.arrowNav === ArrowNav.number && <span>{getCurrentItem().index}</span> }
                        </button> :
                        <button className="room-prev room-icon" onClick={() => gotoPrevItem()}>
                          { settings?.icons?.prev ?? <PrevIcon/> }
                        </button>
                      }
                    </>
                  }
                  {
                    currentState.items.length > currentState.activeItem.index + 1 && getNextItem() && 
                    ((isZoomed() && settings.arrowNavOnZoom !== ArrowNavOnZoom.hide) || !isZoomed()) && 
                    <>
                      {
                        ['number', 'blank'].includes(settings.arrowNav) ?
                        <button className="room-next" onClick={() => gotoNextItem()}>
                          { settings.arrowNav === ArrowNav.number && <span>{getCurrentItem().index + 2.0}</span> }
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
                settings.paginations !== Paginations.disabled &&
                ((isZoomed() && settings.paginationsOnZoom !== PaginationsOnZoom.hide) || !isZoomed()) && 
                <div className="room-paginations">
                  { currentState.items.map((item, index) => (
                    item && <button
                      className={`${index === currentState.activeItem.index ? 'active' : ''} ${settings.paginationsNav === PaginationsNav.text ? 'room-icon' : ''}`}
                      key={index}
                      onClick={() => setCurrent(item) }>
                        { settings.paginations === Paginations.number && <span>{index + 1}</span> }
                      </button>
                  ))}
                </div>
              }
              { settings.zoomMode === ZoomMode.manual && 
                <>
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
              { settings.darkMode === DarkMode.manual && 
                <button className={`room-dark-btn ${settings.darkNav === DarkNav.icon ? 'room-icon' : ''}`} onClick={() => darkModeToggle()}>
                  { isDarkMode() ? settings?.icons?.lightOn ?? <LightOffIcon/> : settings?.icons?.lightOff ?? <LightOffIcon/> }
                </button>
              }
            </div>
          </div>
        }
      </Suspense>
    </GalleryContext.Provider>
  )
}