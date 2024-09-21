import React from 'react';
import ReactDOM from 'react-dom';
import RoomGallery from './index';
import './../scss/room-gallery.scss';

const dataFetch = async () => {
  const data = await (await fetch('./data.json')).json();
  return data.items;
}

const container = document.getElementById('root');

ReactDOM.render(
  <RoomGallery fetch={dataFetch} styles={{}} settings={{}} />,
  container
);