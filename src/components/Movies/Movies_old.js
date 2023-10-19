import { useMemo, useState } from 'react';
import { SearchMovies } from './SearchForm/SearchMovies_old';
import { MoviesGrid } from './MoviesGrid/MoviesGrid_old';
import './Movies.css';

export const Movies = ({
  windowSize,
  fullMoviesList,
  initialIsShort,
  initialSearchQuery,
  initialFilteredMovies = [],
  updateLikes = () => {},
  getSavedMovies,
  setError
}) => {
  const [filteredMovies, setFilteredMovies] = useState(initialFilteredMovies);

  // Дописываем к фильмам атрибут .liked
  useMemo(() => {
    updateLikes(filteredMovies);
  }, [filteredMovies, updateLikes]);

  return (
    <section className='movies'>
      <SearchMovies
        initialIsShort={initialIsShort}
        initialSearchQuery={initialSearchQuery}
        setFilteredMovies={setFilteredMovies}
        fullMoviesList={fullMoviesList}
        setError={setError}
      />
      <MoviesGrid
      setError={setError}
        windowSize={windowSize}
        filteredMoviesList={filteredMovies}
        getSavedMovies={getSavedMovies}
      />
    </section>
  );
};
