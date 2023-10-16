import { useEffect, useMemo, useState } from 'react';
import { SearchMovies } from './SearchForm/SearchMovies';
import { MoviesGrid } from './MoviesGrid/MoviesGrid';
import './Movies.css';

import { mainApi } from '../../utils/MainApi';
import { movieApi } from '../../utils/MoviesApi';
import { getNumOfMovies } from '../../utils/getNumOfMovies';
import { isObjectInArray } from '../../utils/isObjectInArray';

export const Movies = ({ saved, windowSize }) => {
  const { startNumOfMovies, extraNumOfMovies } = useMemo(
    () => getNumOfMovies({ windowSize }),
    [windowSize]
  );

  const [allMoviesList, setAllMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [count, setCount] = useState(0);

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
        const savedMovies = await mainApi.getMovies();
        movies.forEach((movie) => {
          if (isObjectInArray(savedMovies, movie)) {
            movie.liked = true;
          }
        });
        setAllMoviesList(movies);
      } catch (err) {
        console.log(err);
      }
    }
  }, [saved]);

  useEffect(() => {
    setMoviesToShow(
      filteredMovies.slice(0, startNumOfMovies + count * extraNumOfMovies)
    );
  }, [
    setMoviesToShow,
    filteredMovies,
    count,
    startNumOfMovies,
    extraNumOfMovies,
  ]);

  return (
    <section className='movies'>
      <SearchMovies
        allMoviesList={allMoviesList}
        setFilteredMovies={setFilteredMovies}
        setCount={setCount}
        saved={saved}
      />
      <MoviesGrid saved={saved} moviesToShow={moviesToShow} />
      {filteredMovies.length > startNumOfMovies + count * extraNumOfMovies && (
        <button
          className='link movies__more'
          onClick={() => setCount(count + 1)}
        >
          Еще
        </button>
      )}
    </section>
  );
};
