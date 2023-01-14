import {Films} from '../types/film';

export const films: Films = [
  {
    id: 1,
    name: 'Sicario',
    posterImage: 'https://www.film.ru/sites/default/files/movies/posters/7679888-2143374.jpeg',
    previewImage: 'https://images7.alphacoders.com/110/thumb-1920-1109775.jpg',
    backgroundImage: 'https://wallpapershome.ru/images/pages/pic_h/18905.jpg',
    backgroundColor: 'yellow',
    videoLink: 'https://youtu.be/35ZxuxyEU-4',
    previewVideoLink: 'https://youtu.be/35ZxuxyEU-4',
    description: 'In Chandler, Arizona, FBI Special Agents Kate Macer and Reggie Wayne lead a raid on a Sonora Cartel safe house where they discover dozens of decaying corpses hidden in the walls. Outside, an explosive booby trap kills two police officers. Following the raid, Kate is recommended for and joins a Joint Task Force overseen by CIA operative Matt Graver and the secretive Alejandro Gillick. Their mission is to flush out and apprehend Sonora lieutenant Manuel Díaz, currently operating hidden in the US.',
    rating: 10,
    scoresCount: 10,
    director: 'Denis Villeneuve',
    starring: ['Emily Blunt', 'Josh Brolin', 'Benicio del Toro'],
    runTime: 121,
    genre: 'thriller',
    released: 2015,
    isFavorite: true
  },

  {
    id: 2,
    name: 'Wind River',
    posterImage: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Wind_River_%282017_film%29.png',
    previewImage: 'https://image.tmdb.org/t/p/w1280/ebLq1YoEi6aInQY5hYNFZYXNlbr.jpg',
    backgroundImage: 'https://fs.kinomania.ru/file/film_poster/d/ec/dec54f35c8fded57bfdce37bcc1fd7a6.jpeg',
    backgroundColor: 'white',
    videoLink: 'https://youtu.be/s7WuKdVhrmA',
    previewVideoLink: 'https://youtu.be/s7WuKdVhrmA',
    description: 'During the winter on Wyoming\'s Wind River Indian Reservation, U.S. Fish and Wildlife Service Agent Cory Lambert discovers the frozen body of 18-year-old Natalie Hanson.',
    rating: 9,
    scoresCount: 9,
    director: 'Taylor Sheridan',
    starring: ['Jeremy Renner', 'Elizabeth Olsen '],
    runTime: 121,
    genre: 'thriller',
    released: 2017,
    isFavorite: false
  }
];

