import React from 'react'
import { Wall, WallType, Direction } from './Wall'
import { ItemType } from './Item'

export interface RoomI {
  room: RoomType;
  rooms: Array<RoomType>;
  position?: {x: number, y: number};
  index: number;
  activeItem: ItemType;
  prevItem: ItemType;
}

export type RoomType = {
  walls: Array<WallType>;
  position: {x: number, y: number};
  index: number;
}

export const Room = ({ room, rooms, position, index, activeItem, prevItem }: RoomI) => {

  const rotation = () => {
    if (position)
      if (activeItem.position && prevItem.position && activeItem.position.y === 3 && prevItem.position.y === 0)
        return -90
      else
        return (position.y * 90)
    else
      return 0
  }
  return room.walls && position && <div
    className={`room-walls${index === (rooms.length - 1) ? ' last' : ''} ${index === 0 ? ' first' : ''}`}
    style={
      {
        transform: 'rotateY(' + rotation() + 'deg) translateX(' + ((index - position.x) * 100) + '%)',
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
}) }
    <div className="room-ceil"></div>
    <div className="room-floor"></div>
  </div>
}