import {  useMemo, useState } from 'react';
import { SearchMovies } from './SearchForm/SearchMovies';
import { MoviesGrid } from './MoviesGrid/MoviesGrid';
import './Movies.css';

import { mainApi } from '../../utils/MainApi';
import { movieApi } from '../../utils/MoviesApi';

export const Movies = ({ saved, windowSize }) => {
  const [allMoviesList, setAllMoviesList] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);

  useMemo(async () => {
    if (saved) {
      try {
        const movies = await mainApi.getMovies();
        setAllMoviesList(movies);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const movies = await movieApi.getMovies();
        setAllMoviesList(movies);
      } catch (err) {
        console.log(err);
      }
    }
  }, [saved]);

  return (
    <section className='movies'>
      <SearchMovies allMoviesList={allMoviesList} setMoviesToShow={setMoviesToShow} moviesToShow={moviesToShow}/>
      <MoviesGrid saved={saved} moviesToShow={moviesToShow} />
      <button className='link movies__more'>Еще</button>
    </section>
  );
};
