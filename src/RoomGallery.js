import './sass/formir-room.scss'
import React, { Component } from 'react'
import Room from './components/Room'
import { parseRooms, parseWalls } from './helpers/parse'

export default class RoomGallery extends Component {
  constructor (props) {
    super(props)
    this.preRooms = []
    this.preItems = []
    this.state = {
      items: this.preItems,
      rooms: this.preRooms,
      position: { x: 0, y: 0 },
      dark: false,
      zoom: false,
      activeWall: 0,
      activeItem: null
    }
  }

  parseItems = (items) => {
    this.items = items
    parseRooms(this.items, this.preRooms)
    const activeItem = parseWalls(this.items, this.preItems, this.preRooms)
    this.setState({ activeItem })
  }

  componentDidMount () {
    fetch('data.json')
      .then(response => response.json())
      .then(data => this.parseItems(data.items))
  }

  nextItem = () => {
    if (this.state.activeItem.id < this.state.items.length) {
      this.setCurrent(this.state.items[this.state.activeItem.id + 1])
    } else {
      this.setCurrent(this.state.items[this.state.items.length])
    }
  }

  prevItem = () => {
    if (this.state.activeItem.id > 0) {
      this.setCurrent(this.state.items[this.state.activeItem.id - 1])
    } else {
      this.setCurrent(this.state.items[0])
    }
  }

  currentItem = () => {
    return this.state.activeItem
  }

  setCurrent = (item) => {
    this.setState(function () {
      return {
        activeItem: item,
        position: { y: item.position.y, x: item.position.x }
      }
    })
  }

  darkModeToggle = () => {
    this.setState(function (prevState) {
      return {
        dark: !prevState.dark
      }
    })
  }

  zoomToggle = () => {
    this.setState(function (prevState) {
      return {
        zoom: !prevState.zoom
      }
    })
  }

  render () {
    const { prevItem, nextItem, currentItem, setCurrent, darkModeToggle, zoomToggle } = this
    const {
      state: {
        rooms, items, dark, zoom
      }
    } = this
    return (
      <>
        { rooms.length > 0 && <div className={`room ${dark ? 'room-dark' : ''} ${zoom ? 'room-zoom' : ''}`}>
            <div className="room-body">
              <div className="room-arena">
                { rooms.map(room => (
                  <Room
                    key={room.id}
                    room={room}
                    rooms={rooms}
                    position={this.state.position}/>
                )) }
              </div>
              <div className="room-navigations">
                { this.state.activeItem.id > 0 &&
                  <button className="prev" onClick={prevItem}>
                    <span>{currentItem().id}</span>
                  </button>
                }
                {
                  this.state.items.length > this.state.activeItem.id + 1 &&
                  <button className="next" onClick={nextItem}>
                    <span>{currentItem().id + 2.0}</span>
                  </button>
                }

              </div>
              <div className="room-paginations">
                { items.map(item => (
                  item.image && <button
                    key={item.id}
                    onClick={() => setCurrent(item) }>
                      {item.id + 1}
                    </button>
                ))}
              </div>
              <button className="room-exit-btn" onClick={zoomToggle}></button>
              <button className="room-zoom-btn" onClick={zoomToggle}></button>
              <button className="room-dark-btn" onClick={darkModeToggle}></button>
            </div>
          </div>
        }
      </>
    )
  }
}
