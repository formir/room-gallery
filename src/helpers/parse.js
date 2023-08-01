function insertItem (item, roomKey = 0, direction, wallKey, preRooms) {
  const wall = {
    key: wallKey,
    visible: true,
    direction,
    items: []
  }

  wall.items.push(item)
  preRooms[roomKey].walls.push(wall)
}

export function parseRooms (items, preRooms) {
  const itemCount = items.length
  const roomsNeed = Math.ceil((itemCount - 2) / 2)
  for (let n = 0; n < roomsNeed; n++) {
    const room = {
      index: n,
      key: n,
      walls: []
    }
    preRooms.push(room)
  }
}

export function parseWalls (items, preItems, preRooms) {
  const itemCount = items.length
  const roomsNeed = Math.ceil((itemCount - 2) / 2)
  let y = 0
  let x = 0
  let direction = 'n'

  const updateItem = (item, index) => {
    item.index = index
    item.position = { x, y }
    item.key = index
    preItems.push(item)
    insertItem(item, x, direction, index, preRooms)
  }

  for (let i = 1; i <= (roomsNeed * 2 + 2); i++) {
    if (i === (roomsNeed + 1)) {
      direction = 'e'
      y = 1
    } else if (i >= (roomsNeed + 2) && i < (roomsNeed * 2 + 2)) {
      direction = 's'
      y = 2
    } else if (i === (roomsNeed * 2 + 2)) {
      direction = 'w'
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
