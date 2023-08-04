import React from 'react'

export interface ItemI {
  description: string;
  image: string;
  index: number;
}

export interface ItemType {
  description: string;
  image: string;
  index?: number;
}

export const Item = ({ image, description } : ItemI) =>  {
  return <div className="item">
    <a className="item-image">
      <img src={image}/>
    </a>
    <p className="item-desc">
      <span>
        {description}
      </span>
    </p>
  </div>
}
