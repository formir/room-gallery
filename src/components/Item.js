import React from 'react'
import PropTypes from 'prop-types'

function Item (props) {
  const { item } = props

  return <div className="item">
    <a className="item-image">
      <img src={item.image}/>
    </a>
    <p className="item-desc">
      <span>
        {item.description}
      </span>
    </p>
  </div>
}

Item.propTypes = {
  item: PropTypes.object
}

export default Item
