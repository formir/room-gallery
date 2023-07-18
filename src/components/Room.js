import React from 'react'
import PropTypes from 'prop-types'
import Wall from './Wall'

function Room (props) {
  const { room, rooms, position, number } = props

  return room.walls && <div
    key={room.id}
    className={`walls ${number === (rooms.length - 1) ? 'last' : ''} ${number === 0 ? 'first' : ''}`}
    style={
      {
        transform: 'rotateY(' + (position.y * 90) + 'deg) translateX(' + ((number - position.x) * 100) + '%)'
      }
    }>
    { room.walls.map(wall => (
      wall.visible &&
      <Wall
        room={room}
        key={wall.id}
        wall={wall}
      />
    )) }
    <div className="ceil"></div>
    <div className="floor"></div>
  </div>
}

Room.propTypes = {
  position: PropTypes.object,
  rooms: PropTypes.object,
  room: PropTypes.object,
  number: PropTypes.object
}

export default Room
