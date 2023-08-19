import { Direction } from './../components/Wall'
import { ItemType } from './../components/Item'
import { RoomType } from './../components/Room'
import { WallType } from './../components/Wall'

const directions = [Direction.n, Direction.e, Direction.s, Direction.w]

function insertItem (item: ItemType | null, roomIndex = 0, direction: Direction, wallIndex: number, preRooms: Array<RoomType>) {
  const wall = {
    index: wallIndex,
    visible: true,
    direction,
    items: [] as Array<ItemType>
  }

  if (item) wall.items.push(item)
  preRooms[roomIndex].walls.push(wall)
}

export function parseRooms (items: Array<ItemType>, preRooms: Array<RoomType>) {
  const itemCount = items.length
  const roomsNeed = Math.ceil((itemCount - 2) / 2) || 1
  for (let n = 0; n < roomsNeed; n++) {
    const room = {
      index: n,
      walls: [] as Array<WallType>
    }
    preRooms.push(room as RoomType)
  }
}

export function parseWalls (items: Array<ItemType>, preItems: Array<ItemType>, preRooms: Array<RoomType>) {
  const itemCount = items.length
  const numberOfLiteration = itemCount > 4 ? itemCount : 4 
  const roomsNeed = Math.ceil((itemCount - 2) / 2) || 1
  let y = 0
  let x = 0
  let direction = Direction.n

  const updateItem = (item: ItemType | null, index: number) => {
    let newItem = {} as ItemType;
    if (item) {
      newItem = {...item}
      newItem.index = index
      newItem.position = { x, y }
      newItem.index = index
      preItems.push(newItem)
    }
    insertItem(item ? newItem : null, x, direction, index, preRooms)
  }

  for (let i = 1; i <= numberOfLiteration; i++) {
    if (roomsNeed === 1) {
      direction = directions[i - 1];
      y = i - 1;
    } else if (i === (roomsNeed + 1)) {
      direction = Direction.e;
      y = 1;
    } else if (i >= (roomsNeed + 2) && i < (roomsNeed * 2 + 2)) {
      direction = Direction.s;
      y = 2;
    } else if (i === (roomsNeed * 2 + 2)) {
      direction = Direction.w;
      y = 3;
    }

    const item = { ...items[i - 1] }
    updateItem(items[i - 1] ? item : null, i - 1)

    if (i < roomsNeed) {
      x++
    } else if (i > (roomsNeed + 1) && i < (roomsNeed * 2 + 1)) {
      x--
    }
  }

  return preItems[0]
}

export const kebabize = (string: string) => {
  const upper = /(?<!\p{Uppercase_Letter})\p{Uppercase_Letter}|\p{Uppercase_Letter}(?!\p{Uppercase_Letter})/gu
  return string.replace(upper, '-$&').replace(/^-/, '').toLowerCase()
}