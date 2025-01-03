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

export const Room = ({ room, rooms, position, index }: RoomI) => {



  return room.walls && position ? <div
    className={`room-walls${index === (rooms.length - 1) ? ' last' : ''} ${index === 0 ? ' first' : ''}`}
    style={
      {
        transform: 'translateX(' + (index * 100) + '%)'
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