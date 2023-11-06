import React from 'react'
import { Wall, WallType, Direction } from './Wall'
import { ItemType } from './Item'
import { RoomGallerySettingsType } from '../types/types'

export interface RoomI {
  room: RoomType;
  rooms: Array<RoomType>;
  position?: {x: number, y: number};
  index: number;
  activeItem: ItemType;
  prevItem: ItemType;
  settings: RoomGallerySettingsType;
}

export type RoomType = {
  walls: Array<WallType>;
  position: {x: number, y: number};
  index: number;
}

export const Room = ({ room, rooms, position, index, activeItem, prevItem, settings }: RoomI) => {

  const rotation = () => {
    if (position)
      if (activeItem.position && prevItem.position && activeItem.position.y === 3 && prevItem.position.y === 0)
        return -90
      else
        return (position.y * 90)
    else
      return 0
  }

  const delay = () => {
    let distance = 2
    let min = 2
    let ratio = 1
    if (typeof settings?.animationSpeed === 'number')
      min = settings.animationSpeed
    else if (typeof settings?.animationSpeed?.min === 'number')
      min = settings.animationSpeed.min
    if (typeof settings?.animationSpeed === 'object' && typeof settings?.animationSpeed?.ratio === 'number')
      ratio = settings.animationSpeed.ratio

    if (
      activeItem && activeItem.position && typeof activeItem.position.x === 'number'
      && prevItem && prevItem.position && typeof prevItem.position.x === 'number'
    ) {
      distance = prevItem.position.x - activeItem.position.x
    }
    return `transform ${ Math.abs(distance) > min ? ( Math.abs(distance) * ratio ) : min }s ease-in-out`;
  }
  return room.walls && position ? <div
    className={`room-walls${index === (rooms.length - 1) ? ' last' : ''} ${index === 0 ? ' first' : ''}`}
    style={
      {
        transform: 'rotateY(' + rotation() + 'deg) translate3d(' + ((index - position.x) * 100) + '%, 0, 0)',
        transition: delay()
      }
    }>
    {room.walls.map((wall, wallIndex) => {
      const indexOfDirection = Object.values(Direction).indexOf(wall.direction as unknown as Direction);
      return wall.visible &&
        <Wall
          room={room}
          key={wallIndex}
          direction={wall.direction}
          items={wall.items}
          visible={wall.visible}
          active={position.x === index && position.y === indexOfDirection}
        />
      })
    }
    <div className="room-ceil"></div>
    <div className="room-floor"></div>
  </div> : <></>
}