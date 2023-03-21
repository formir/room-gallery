import React from 'react'
import PropTypes from 'prop-types'
import Wall from './Wall'

function Room (props) {
  const { room, rooms, position } = props

  return <div
    key={room.id}
    className={`walls ${room.id === (rooms.length - 1) ? 'last' : ''} ${room.id === 0 ? 'first' : ''}`}
    style={
      {
        transform: 'rotateY(' + (position.y * 90) + 'deg) translateX(' + ((room.id - position.x) * 100) + '%)'
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
  room: PropTypes.object
}

export default Room
