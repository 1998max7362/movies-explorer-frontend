import { MoviesItem } from './MoviesItem';
import { getNumOfMovies } from '../../../utils/getNumOfMovies';
import { useEffect, useMemo, useState } from 'react';

export const MoviesGrid = ({
  windowSize,
  filteredMoviesList,
  getSavedMovies,
}) => {
  const [count, setCount] = useState(0);
  const [moviesToShow, setMoviesToShow] = useState([]);

  const { startNumOfMovies, extraNumOfMovies } = useMemo(
    () => getNumOfMovies({ windowSize }),
    [windowSize]
  );

  // Если список отфильтрованных поменялся устанавливаем кол-во фильмов по умолчанию
  useEffect(() => {
    setCount(0);
  }, [filteredMoviesList, setCount]);

  // При изменении Count (нажатии "еще")
  useEffect(() => {
    const moviesListToShow = filteredMoviesList.slice(
      0,
      startNumOfMovies + count * extraNumOfMovies
    );
    setMoviesToShow(moviesListToShow);
  }, [
    count,
    filteredMoviesList,
    setMoviesToShow,
    startNumOfMovies,
    extraNumOfMovies,
  ]);

  return (
    <>
      <div className='movies__grid'>
        {moviesToShow.map((movie, idx) => (
          <MoviesItem
            movie={movie}
            key={Date.now() + idx}
            getSavedMovies={getSavedMovies}
          />
        ))}
      </div>
      {filteredMoviesList.length >
        startNumOfMovies + count * extraNumOfMovies && (
        <button
          className='link movies__more'
          onClick={() => setCount(count + 1)}
        >
          Еще
        </button>
      )}
    </>
  );
};
