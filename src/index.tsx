import React from 'react'
import { createRoot } from 'react-dom/client'
import RoomGallery from './RoomGallery'

const dataFetch = async (url: string) => {
  const data = await (
    await fetch(url)
  ).json()
  return data.items
}

const container = document.getElementById('root')
const root = createRoot(container!)
//root.render(<RoomGallery fetchHandler={dataFetch} fetchUrl={process.env.PUBLIC_URL + '/data.json'} styles={ { } } />)

root.render(<RoomGallery><div>1</div><div>2</div></RoomGallery>)