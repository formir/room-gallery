import React from 'react'
import { createRoot } from 'react-dom/client'
import { RoomGallery } from './components/RoomGallery'

const dataFetch = async () => {
  const data = await (
    await fetch('./data.json')
  ).json()
  return data.items
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<RoomGallery fetch={dataFetch} styles={{}} settings={{}} />)