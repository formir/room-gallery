import React from 'react'
import PropTypes from 'prop-types'
import Wall from './Wall'

function Room (props) {
  const { room, rooms, position, index } = props

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
        wall={wall}
      />
    )) }
    <div className="ceil"></div>
    <div className="floor"></div>
  </div>
}

Room.propTypes = {
  position: PropTypes.object,
  rooms: PropTypes.arrayOf(PropTypes.object),
  room: PropTypes.object,
  index: PropTypes.number
}

export default Room
