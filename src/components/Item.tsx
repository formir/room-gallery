import React from 'react'

export interface ItemI {
  description?: string;
  image?: string;
  index: number;
  element?: JSX.Element | Element; 
}

export interface ItemType {
  description?: string;
  image?: string;
  index?: number;
  position?: {x: number, y: number};
  element?: JSX.Element | Element;
}

export const Item = ({ image, description, element } : ItemI) =>  {
  if (element) {
    return <>{element}</>;
  } else {
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
}
