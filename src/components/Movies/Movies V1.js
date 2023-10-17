import { useMemo, useState } from 'react';
import { SearchMovies } from './SearchForm/SearchMoviesV1';
import { MoviesGrid } from './MoviesGrid/MoviesGridV1';
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
