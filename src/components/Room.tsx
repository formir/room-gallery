import React from 'react'
import { Wall, WallType } from './Wall'

export interface RoomI {
  room: RoomType;
  rooms: Array<RoomType>;
  position: {x: number, y: number};
  index: number;
}

export type RoomType = {
  walls: Array<WallType>;
  position: {x: number, y: number};
  index: number;
}

export const Room = ({ room, rooms, position, index }: RoomI) => {
  return room.walls && <div
    className={`walls ${index === (rooms.length - 1) ? 'last' : ''} ${index === 0 ? 'first' : ''}`}
    style={
      {
        transform: 'rotateY(' + (position.y * 90) + 'deg) translateX(' + ((index - position.x) * 100) + '%)'
      }
    }>
    { room.walls.map((wall, wallIndex) => (
      wall.visible &&
      <Wall
        room={room}
        key={wallIndex}
        direction={wall.direction}
        items={wall.items}
        visible={wall.visible}
      />
    )) }
    <div className="ceil"></div>
    <div className="floor"></div>
  </div>
}