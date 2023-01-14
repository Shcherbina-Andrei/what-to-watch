import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {films} from './mocks/films';

const film = {
  title: 'Sicario',
  genre: 'thriller',
  year: 2015
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App title={film.title} genre={film.genre} year={film.year} films={films}/>
  </React.StrictMode>,
);
