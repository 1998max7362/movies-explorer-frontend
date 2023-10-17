import { useMemo, useState } from 'react';
import { SearchMovies } from './SearchForm/SearchMovies';
import { MoviesGrid } from './MoviesGrid/MoviesGrid';
import './Movies.css';

export const Movies = ({
  windowSize,
  fullMoviesList,
  initialIsShort,
  initialSearchQuery,
  initialFilteredMovies = [],
  updateLikes = () => {},
  getSavedMovies
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
      />
      {fullMoviesList && (
        <MoviesGrid
          windowSize={windowSize}
          filteredMoviesList={filteredMovies}
          getSavedMovies={getSavedMovies}
        />
      )}
    </section>
  );
};
