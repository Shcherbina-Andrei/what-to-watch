import MainPage from '../../pages/main-page';

const film = {
  title: 'Sicario',
  genre: 'thriller',
  year: 2015
};

function App(): JSX.Element {
  return (
    <MainPage title={film.title} genre={film.genre} year={film.year}/>
  );
}

export default App;
