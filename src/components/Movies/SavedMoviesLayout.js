import { useCallback, useEffect, useState } from 'react';
import { mainApi } from '../../utils/MainApi';
import { Movies } from './Movies';

export const SavedMoviesLayout = ({ windowSize }) => {
  const [savedMovies, setSavedMovies] = useState([]);

  // определяется 1 раз
  const getSavedMovies = useCallback(async () => {
    try {
      const movies = await mainApi.getMovies();
      setSavedMovies(movies);
    } catch (err) {
      console.log(err);
    }
  }, [setSavedMovies]);

  useEffect(() => {
    getSavedMovies();
  }, [getSavedMovies]);

  return (
    <>
      {savedMovies.length > 0 && (
        <Movies
          initialFilteredMovies={savedMovies}
          fullMoviesList={savedMovies}
          windowSize={windowSize}
          getSavedMovies={getSavedMovies}
        />
      )}
    </>
  );
};
