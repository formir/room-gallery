import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import './sass/formir-room.scss'
import Room from './components/Room'
import { parseRooms, parseWalls } from './helpers/parse'

const RoomGallery = (props) => {
  const { fetchHandler, dataItems, fetchUrl } = props
  const [currentState, setCurrentState] = useState({ items: [], rooms: [], activeItem: null })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dark, setDark] = useState(false)
  const [zoom, setZoom] = useState(false)

  const preRooms = []
  const preItems = []

  const parseItems = (dataItems) => {
    parseRooms(dataItems, preRooms)
    const activeItem = parseWalls(dataItems, preItems, preRooms)
    setCurrentState({ rooms: preRooms, items: preItems, activeItem })
  }

  const nextItem = () => {
    if (currentState.activeItem.index < currentState.items.length) {
      setCurrent(currentState.items[currentState.activeItem.index + 1])
    } else {
      setCurrent(currentState.items[currentState.items.length])
    }
  }

  const prevItem = () => {
    if (currentState.activeItem.index > 0) {
      setCurrent(currentState.items[currentState.activeItem.index - 1])
    } else {
      setCurrent(currentState.items[0])
    }
  }

  const currentItem = () => {
    return currentState.activeItem
  }

  const setCurrent = (item) => {
    setCurrentState({ items: currentState.items, rooms: currentState.rooms, activeItem: item })
    setPosition({ y: item.position.y, x: item.position.x })
  }

  const darkModeToggle = () => {
    setDark(!dark)
  }

  const zoomToggle = () => {
    setZoom(!zoom)
  }

  const dataFetch = async (url) => {
    const data = await (
      await fetch(url)
    ).json()
    return data.items
  }

  useEffect(() => {
    if (dataItems) {
      parseItems(dataItems)
    } else if (fetchHandler) {
      fetchHandler(fetchUrl).then((fetchItems) => {
        parseItems(fetchItems)
      })
    } else if (fetchUrl) {
      dataFetch(fetchUrl).then((fetchItems) => {
        parseItems(fetchItems)
      })
    } else {
      console.error('Provide items for gallery using one of two methods: fetchUrl or dataItems.')
    }
  }, [])

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
              { currentState.activeItem.index > 0 &&
                <button className="prev" onClick={() => prevItem()}>
                  <span>{currentItem().index}</span>
                </button>
              }
              {
                currentState.items.length > currentState.activeItem.index + 1 &&
                <button className="next" onClick={() => nextItem()}>
                  <span>{currentItem().index + 2.0}</span>
                </button>
              }

            </div>
            <div className="room-paginations">
              { currentState.items.map((item, index) => (
                item.image && <button
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

RoomGallery.propTypes = {
  fetchHandler: PropTypes.func,
  dataItems: PropTypes.arrayOf(PropTypes.object),
  fetchUrl: PropTypes.string
}

export default RoomGallery
