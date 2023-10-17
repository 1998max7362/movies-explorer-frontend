import { useCallback, useEffect, useMemo, useState } from 'react';
import { movieApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { isFilmInList } from '../../utils/isFilmInList';
import { Movies } from './Movies';
import Preloader from '../Preloader/Preloader';

export const AllMoviesLayout = ({ windowSize }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [preload, setPreload] = useState(true);
  const [error, setError] = useState('');

  // определяется 1 раз
  const getAllMovies = useCallback(async () => {
    try {
      const movies = await movieApi.getMovies();
      setAllMovies(movies);
      setPreload(false);
    } catch (err) {
      console.log(err);
      setPreload(false);
      setError('Произошла ошибка при загрузке данных с сервера');
    }
  }, [setAllMovies]);

  const lastSearch = useMemo(() => {
    if (localStorage.getItem('lastSearch')) {
      const { filteredMovies, isShort, searchQuery } = JSON.parse(
        localStorage.getItem('lastSearch')
      );
      setPreload(false);
      if (filteredMovies.length===0){
        setError('Нет результатов')
      }
      return { filteredMovies, isShort, searchQuery };
    }
  }, []);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  const updateLikes = useCallback(async (moviesList) => {
    try {
      const savedMovies = await mainApi.getMovies();
      const moviesListWithLikes = moviesList.forEach((movie) => {
        movie._id = false;
        const _id = isFilmInList(savedMovies, movie);
        if (_id) {
          movie._id = _id;
        }
      });
      return moviesListWithLikes;
    } catch (err) {
      console.log(err);
    }
  }, []);

  return preload ? (
    <Preloader />
  ) : (
    <>
      <Movies
        initialFilteredMovies={lastSearch && lastSearch.filteredMovies}
        initialIsShort={lastSearch && lastSearch.isShort}
        initialSearchQuery={lastSearch && lastSearch.searchQuery}
        fullMoviesList={allMovies}
        windowSize={windowSize}
        updateLikes={updateLikes}
        setError={setError}
      />
      <p className='text error'>{error}</p>
    </>
  );
};
