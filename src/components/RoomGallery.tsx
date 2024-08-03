import React, { useState, useEffect, createContext, Suspense, forwardRef, Ref, useImperativeHandle } from 'react'
import { useSwipeable } from "react-swipeable"
import '../sass/room-gallery.scss'
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
  StylesVariables,
  sanitizeHtmlAllowedTags,
  sanitizeHtmlAllowedAttributes
} from '../types/types'
import { Room } from './Room'
import { ItemType } from './Item'
import { RoomType } from './Room'
import { parseRooms, parseWalls, kebabize } from '../helpers/parse'

import { NextIcon, PrevIcon, LightOffIcon, ZoomInIcon, ZoomOutIcon } from '../helpers/icons';

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
  keypressToZoom: true,
  animationSpeed: { min: 2, ratio: 1 },
  allOnOneWall: false,
  sanitizeHtml: true,
  sanitizeHtmlOptions: {
    allowedTags: Object.values(sanitizeHtmlAllowedTags),
    allowedAttributes: Object.values(sanitizeHtmlAllowedAttributes)
  }
} as RoomGallerySettingsType;

export const GalleryContext = createContext({position: roomGalleryDefaultSettings.defaultPosition, zoom: roomGalleryDefaultSettings.zoomMode === 'in', settings: roomGalleryDefaultSettings});

export const RoomGallery = forwardRef(
  (
    {
      fetch: fetchMethod,
      items: dataItems,
      styles,
      children,
      settings: dataSettings,
    }: RoomGalleryProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const settings = { ...roomGalleryDefaultSettings, ...dataSettings } as RoomGallerySettingsType

    const [currentState, setCurrentState] = useState({
      items: [] as Array<ItemType>,
      rooms: [] as Array<RoomType>,
      activeItem: { index: 0 } as ItemType,
      prevItem: { index: 0 } as ItemType
    })
    const [position, setPosition] = useState(settings.defaultPosition)
    const [dark, setDark] = useState(settings.darkMode === DarkMode.dark)
    const [zoom, setZoom] = useState(settings.zoomMode === ZoomMode.in)

    const value = { currentState, zoom, dark, position, settings }

    const clear = () => {
      setCurrentState({
        items: [] as Array<ItemType>,
        rooms: [] as Array<RoomType>,
        activeItem: { index: 0 } as ItemType,
        prevItem: { index: 0 } as ItemType
      })
      setPosition(settings.defaultPosition)
      setDark(settings.darkMode === DarkMode.dark)
      setZoom(settings.zoomMode === ZoomMode.in)
    }

    const build = () => {
      const preItems = [] as Array<ItemType>
      const preRooms = [] as Array<RoomType>
      if (typeof settings?.event?.onInit === 'function') settings?.event?.onInit(value)

      if (children) {
        parseItems({ childrenItems: children, preItems, preRooms })
      } else if (dataItems && dataItems?.length > 0 && typeof dataItems === 'object') {
        if (dataItems[0] instanceof HTMLElement) {
          parseItems({ elementItems: dataItems as Array<HTMLElement>, preItems, preRooms })
        } else {
          parseItems({ dataItems, preItems, preRooms })
        }
      } else if (fetchMethod && typeof fetchMethod === 'string') {
        dataFetch(fetchMethod).then((fetchItems: Array<ItemType>) => {
          parseItems({ dataItems: fetchItems, preItems, preRooms })
        })
      } else if (fetchMethod && typeof fetchMethod === 'function') {
        fetchMethod().then(async (fetchItems: Array<ItemType>) => {
          parseItems({ dataItems: fetchItems, preItems, preRooms })
        })
      } else {
        console.error('No fetch methods or items provided. Use one of this props: fetch, items')
      }
    }

    const parseItems = ({dataItems, elementItems, childrenItems, preItems, preRooms}: parseItemsI) => {
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
          newItems.push({ HtmlElement: element})
        })
        itemsToParse = newItems
      } else {
        itemsToParse = dataItems as Array<ItemType>
      }
      parseRooms(itemsToParse, preRooms, settings.allOnOneWall)
      const activeItem = parseWalls(itemsToParse, preItems, preRooms, position, settings.allOnOneWall)
      if (activeItem) setCurrentState({
        rooms: preRooms,
        items: preItems,
        activeItem,
        prevItem: currentState.activeItem
      })
      if (typeof settings?.event?.onRender === 'function') settings?.event?.onRender(value)
    }

    const gotoNextItem = () => {
      const nextItem = getNextItem()
      if (nextItem) {
        setCurrent(nextItem)
        if (typeof settings?.event?.onShowNext === 'function') settings?.event?.onShowNext(value)
      }
    }

    const getNextItem = () => {
      if (typeof currentState.activeItem.index === 'number')
      return currentState.activeItem.index < currentState.items.length ? 
        currentState.items[currentState.activeItem.index + 1] :
        currentState.items[currentState.items.length]
    }

    const gotoPrevItem = () => {
      const prevItem = getPrevItem()
      if (prevItem) {
        setCurrent(prevItem)
        if (typeof settings?.event?.onShowPrev === 'function') settings?.event?.onShowPrev(value)
      }
    }

    const getPrevItem = () => {
      if (typeof currentState.activeItem.index === 'number')
      return currentState.activeItem.index > 0 ?
      currentState.items[currentState.activeItem.index - 1] :
      currentState.items[0]
    }

    const getCurrentItem = () => {
      return currentState.activeItem
    }

    const setCurrent = (item: ItemType) => {
      setCurrentState({ ...currentState, activeItem: item, prevItem: currentState.activeItem })
      if (item.position) setPosition({ y: item.position.y, x: item.position.x }) 
    }

    const toggleDarkMode = () => {
      setDark((prevDark) => !prevDark)
      if (typeof settings?.event?.onDarkModeOn === 'function' && !dark) settings?.event?.onDarkModeOn(value)
      if (typeof settings?.event?.onDarkModeOff === 'function' && dark) settings?.event?.onDarkModeOff(value)
    }
    
    const setDarkMode = (mode: boolean) => {
      setDark(mode)
      if (typeof settings?.event?.onDarkModeOn === 'function' && !dark) settings?.event?.onDarkModeOn(value)
      if (typeof settings?.event?.onDarkModeOff === 'function' && dark) settings?.event?.onDarkModeOff(value)
    }
    
    const toggleZoom = () => {
      setZoom((prevZoom) => !prevZoom)
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
    })

    function renderRooms() {
      return currentState.rooms.map((room, index) => (
        <Room
          key={index}
          index={index}
          room={room}
          rooms={currentState.rooms}
          activeItem={currentState.activeItem}
          prevItem={currentState.prevItem}
          position={position}
          settings={settings}
        />
        )
      )
    }

    function renderPagination() {
      return settings.paginations !== Paginations.disabled &&
      ((isZoomed() && settings.paginationsOnZoom !== PaginationsOnZoom.hide) || !isZoomed()) && 
        <div className={`room-paginations ${settings.paginations === Paginations.thumb ? 'room-paginations-thumbs' : ''}`}>
        { currentState.items.map((item, index) => (
          item && <button
            className={
              `${index === currentState.activeItem.index ? 'active' : ''}
              ${settings.paginationsNav === PaginationsNav.text && settings.paginations !== Paginations.thumb ? ' room-icon' : ''}`
            }
            key={index}
            onClick={() => setCurrent(item) }>
            { settings.paginations === Paginations.number && <span>{index + 1}</span> }
            { settings.paginations === Paginations.title && <span>{item?.title}</span> }
            { settings.paginations === Paginations.thumb && ( typeof item?.image === 'object' ? <img src={item?.image?.thumb} /> : typeof item?.image === 'string' && <img src={item?.image} /> ) }
            </button>
        ))}
      </div>
    }

    function renderZoomNav() {
      return settings.zoomMode === ZoomMode.manual && 
      <>
        {
          isZoomed() ? <button className={`room-exit-btn ${settings.zoomNav === ZoomNav.icon ? 'room-icon' : ''}`} onClick={() => toggleZoom()}>
            { settings?.icons?.zoomOut ?? <ZoomOutIcon/> }
          </button> :
          <button className={`room-zoom-btn ${settings.zoomNav === ZoomNav.icon ? 'room-icon' : ''}`} onClick={() => toggleZoom()}>
            { settings?.icons?.zoomIn ?? <ZoomInIcon/> }
          </button>
        }
      </>
    }

    function renderDarkNav() {
      return settings.darkMode === DarkMode.manual && 
      <button className={`room-dark-btn ${settings.darkNav === DarkNav.icon ? 'room-icon' : ''}`} onClick={() => toggleDarkMode()}>
        { isDarkMode() ? settings?.icons?.lightOn ?? <LightOffIcon/> : settings?.icons?.lightOff ?? <LightOffIcon/> }
      </button>
    }

    function renderArrowNav() {
      return typeof currentState.activeItem.index === 'number' && settings.arrowNav !== ArrowNav.disabled && 
      <div className="room-navigations">
        { 
          currentState.activeItem.index > 0 && getPrevItem() &&
          ((isZoomed() && settings.arrowNavOnZoom !== ArrowNavOnZoom.hide) || !isZoomed()) &&
          settings.arrowNav && <>
            {
              ['number', 'blank'].includes(settings.arrowNav) ?
              <button className="room-prev" onClick={() => gotoPrevItem()}>
                { settings.arrowNav === ArrowNav.number && <span>{currentState.activeItem.index}</span> }
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
          settings.arrowNav && <>
            {
              ['number', 'blank'].includes(settings.arrowNav) ?
              <button className="room-next" onClick={() => gotoNextItem()}>
                { settings.arrowNav === ArrowNav.number && <span>{currentState.activeItem.index + 2.0}</span> }
              </button> :
              <button className="room-next room-icon" onClick={() => gotoNextItem()}>
                { settings?.icons?.next ?? <NextIcon/> }
              </button>
            }
          </>
        }
    </div>
    }

    function Loading() {
      return <h2>Loading...</h2>;
    }

    useEffect(() => {
      build();
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
            rootStyle.setProperty('--room-' + kebabize(key), styles[key as keyof typeof styles])
          }
        })
      }
    }, [styles])

    useImperativeHandle(ref, () : any => {
      return {
        gotoNextItem() {
          gotoNextItem();
        },
        gotoPrevItem() {
          gotoPrevItem();
        },
        toggleDarkMode() {
          toggleDarkMode();
        },
        setDarkMode(mode: boolean) {
          setDarkMode(mode);
        },
        toggleZoom() {
          toggleZoom();
        },
        setZoom(zoom: boolean) {
          setZoom(zoom);
        },
        getCurrentItem() {
          return getCurrentItem();
        },
        refresh() {
          clear();
          build();
        },
        clear() {
          clear();
        }
      };
    }, [currentState]);

    return (
      <GalleryContext.Provider value={value}>
        <Suspense fallback={<Loading />}>
          {
            currentState && currentState.rooms.length > 0 &&
            <div className={`room-gallery${isDarkMode() ? ' room-dark' : ''}${isZoomed() ? ' room-zoom' : ''}`} {...swipeHandlers}>
              <div className="room-body">
                {
                  <div className="room-arena">
                    {renderRooms()}
                  </div>
                }
                { renderArrowNav() }
                { renderPagination() }
                { renderZoomNav() }
                { renderDarkNav() }
              </div>
            </div>
          }
        </Suspense>
      </GalleryContext.Provider>
    )
  }
)