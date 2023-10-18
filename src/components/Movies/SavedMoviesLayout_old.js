import { useCallback, useEffect, useState } from 'react';
import { mainApi } from '../../utils/MainApi';
import { Movies } from './Movies_old';
import Preloader from '../Preloader/Preloader';

export const SavedMoviesLayout = ({ windowSize }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [preload, setPreload] = useState(true);
  const [error, setError] = useState('');

  // определяется 1 раз
  const getSavedMovies = useCallback(async () => {
    try {
      const movies = await mainApi.getMovies();
      setSavedMovies(movies);
      setPreload(false);
    } catch (err) {
      console.log(err);
      setPreload(false);
      setError('Произошла ошибка при загрузке данных с сервера');
    }
  }, [setSavedMovies]);

  useEffect(() => {
    getSavedMovies();
  }, [getSavedMovies]);

  return preload ? (
    <Preloader />
  ) : (
    <>
      <Movies
        initialFilteredMovies={savedMovies}
        fullMoviesList={savedMovies}
        windowSize={windowSize}
        getSavedMovies={getSavedMovies}
        setError={setError}
      />
      <p className='text error'>{error}</p>
    </>
  );
};
