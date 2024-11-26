import { Direction } from './../components/Wall'
import { ItemType, Position } from './../components/Item'
import { RoomType } from './../components/Room'
import { WallType } from './../components/Wall'

const directions = [Direction.n, Direction.e, Direction.s, Direction.w]

const insertItem = (
  item: ItemType | null,
  roomIndex = 0,
  direction: Direction,
  wallIndex: number,
  preRooms: Array<RoomType>
) => {
  const wall = {
    index: wallIndex,
    visible: true,
    direction,
    items: [] as Array<ItemType>
  }

  if (item) wall.items.push(item)
  if (preRooms[roomIndex] && preRooms[roomIndex].walls) preRooms[roomIndex].walls.push(wall)
}

export const findItemByPosition = (position: Position, items: Array<ItemType>) => {
  return items.find((item) => (item.position && item.position.x === position.x && position.y === position.y ? item : null ))
}

export function parseRooms (items: Array<ItemType>, preRooms: Array<RoomType>, allOnOneWall: boolean = false) {
  const itemCount = items.length
  let roomsNeed = items.length
  if (!allOnOneWall) {
    roomsNeed = Math.ceil((itemCount - 2) / 2) || 1
  }
  
  for (let n = 0; n < roomsNeed; n++) {
    const room = {
      index: n,
      walls: [] as Array<WallType>
    }
    preRooms.push(room as RoomType)
  }
}

export function parseWalls(
  items: Array<ItemType>,
  preItems: Array<ItemType>,
  preRooms: Array<RoomType>,
  position: Position = { x: 0, y: 0 },
  allOnOneWall: boolean = false
) {
  const itemCount = items.length
  const numberOfLiterations = itemCount > 4 ? itemCount : 4 
  const roomsNeed = Math.ceil((itemCount - 2) / 2) || 1
  let y = 0
  let x = 0
  let direction = Direction.n
  let wasWest = false

  const updateItem = (item: ItemType | null, index: number) => {
    let newItem = {} as ItemType
    if (item) {
      newItem = {...item}
      newItem.index = index
      newItem.position = { x, y }
      preItems.push(newItem)
    }
    insertItem(item ? newItem : null, x, direction, index, preRooms)
  }

  if (!allOnOneWall) {
    for (let i = 1; i <= numberOfLiterations; i++) {
      if (roomsNeed === 1) {
        direction = directions[i - 1];
        y = i - 1
      } else if (i === (roomsNeed + 1)) {
        direction = Direction.e
        y = 1
      } else if (i >= (roomsNeed + 2) && i < (roomsNeed * 2 + 2)) {
        direction = Direction.s
        y = 2
      } else if (i === (roomsNeed * 2 + 2)) {
        direction = Direction.w
        y = 3
      }

      if (direction === Direction.w && x === 0) {
        wasWest = true
      }

      const item = { ...items[i - 1] }
      updateItem(items[i - 1] ? item : null, i - 1)

      if (i < roomsNeed) {
        x++
      } else if (i > (roomsNeed + 1) && i < (roomsNeed * 2 + 1)) {
        x--
      }
    }

    if (!wasWest) {
      insertItem(null, 0, Direction.w, numberOfLiterations, preRooms)
    }
  } else {
    insertItem(null, 0, Direction.w, itemCount, preRooms)
    for (let i = 0; i < itemCount; i++) {
      const item = { ...items[i] }
      updateItem(items[i] ? item : null, i)
      x++
    }
    insertItem(null, itemCount-1, Direction.e, itemCount, preRooms)
  }

  return findItemByPosition(position, preItems)
}

export const kebabize = (string: string) => {
  const upper = /(?:!\p{Uppercase_Letter})\p{Uppercase_Letter}|\p{Uppercase_Letter}(?!\p{Uppercase_Letter})/gu
  return string.replace(upper, '-$&').replace(/^-/, '').toLowerCase()
}