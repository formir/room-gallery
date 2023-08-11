import { Direction } from './../components/Wall'
import { ItemType } from './../components/Item'
import { RoomType } from './../components/Room'
import { WallType } from './../components/Wall'

function insertItem (item: ItemType, roomIndex = 0, direction: Direction, wallIndex: number, preRooms: Array<any>) {
  const wall = {
    index: wallIndex,
    visible: true,
    direction,
    items: [] as Array<ItemType>
  }

  wall.items.push(item)
  preRooms[roomIndex].walls.push(wall)
}

export function parseRooms (items: Array<ItemType>, preRooms: Array<RoomType>) {
  const itemCount = items.length
  const roomsNeed = Math.ceil((itemCount - 2) / 2)
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
  const roomsNeed = Math.ceil((itemCount - 2) / 2)
  let y = 0
  let x = 0
  let direction = Direction.n

  const updateItem = (item: ItemType, index: number) => {
    item.index = index
    item.position = { x, y }
    item.index = index
    preItems.push(item)
    insertItem(item, x, direction, index, preRooms)
  }

  for (let i = 1; i <= (roomsNeed * 2 + 2); i++) {
    if (i === (roomsNeed + 1)) {
      direction = Direction.e
      y = 1
    } else if (i >= (roomsNeed + 2) && i < (roomsNeed * 2 + 2)) {
      direction = Direction.e
      y = 2
    } else if (i === (roomsNeed * 2 + 2)) {
      direction = Direction.w
      y = 3
    }

    const item = { ...items[i - 1] }
    updateItem(item, i - 1)

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