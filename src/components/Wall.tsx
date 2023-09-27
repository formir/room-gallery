import React from 'react'
import { Item, ItemType } from './Item'
import { RoomType } from './Room'

export enum Direction {
  n = 'n',
  e = 'e',
  s = 's',
  w = 'w'
}

export interface WallI {
  direction: Direction;
  items: Array<ItemType>;
  room: RoomType;
  visible: boolean;
  active: boolean;
}

export type WallType = {
  direction: Direction,
  items: Array<ItemType>,
  room?: RoomType;
  visible: boolean;
}

export const Wall = ({ direction, items, active }: WallI) => {
  return <div className={`wall wall-${direction}${active ? ' wall-active' : ''}`}>
    { items.map(item => (
      <Item
        key={item.index}
        index={item.index}
        title={item?.title}
        description={item?.description}
        descriptionHtml={item?.descriptionHtml}
        image={item?.image}
        element={item?.element}
        html={item?.html}
        vimeo={item?.vimeo}
        youtube={item?.youtube}
        HtmlElement={item?.HtmlElement}
        position={item.position}
        height={item?.height}
        width={item?.width}
      />
    ))}
  </div>
}