import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

function Wall (props) {
  const { wall } = props

  return <div className={`wall wall-${wall.direction}`}>
    { wall.items.map(item => (
      <Item key={item.key} item={item}></Item>
    ))}
  </div>
}

Wall.propTypes = {
  wall: PropTypes.object
}

export default Wall
