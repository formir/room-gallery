import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import RoomGallery from './RoomGallery'
import reportWebVitals from './reportWebVitals'

const dataFetch = async (url) => {
  const data = await (
    await fetch(url)
  ).json()
  return data.items
}

ReactDOM.render(
  <React.StrictMode>
    <RoomGallery fetchHandler={dataFetch} fetchUrl={'/data.json'} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
