import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

export const SearchMovies = ({
  initialIsShort = false,
  initialSearchQuery = '',
  setFilteredMovies,
  fullMoviesList,
  setError,
}) => {
  const [isShort, setIsShort] = useState(initialIsShort);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  let { pathname } = useLocation();

  const filterMovies = useCallback(
    ({ isShort, searchQuery }) => {
      const filteredMovies = fullMoviesList.filter(
        (movie) =>
          (isShort ? movie.duration <= 40 : movie) &&
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      if (pathname === '/movies') {
        localStorage.setItem(
          'lastSearch',
          JSON.stringify({
            filteredMovies,
            isShort,
            searchQuery,
          })
        );
        if (filteredMovies.length === 0) {
          setError('Нет результатов');
        }
      }
      setFilteredMovies(filteredMovies);
    },
    [fullMoviesList, pathname, setFilteredMovies, setError]
  );

  const searchMovies = useCallback(
    ({ isShort, searchQuery }) => {
      if (searchQuery === '' && pathname === '/movies') {
        return;
      }
      filterMovies({ isShort, searchQuery });
    },
    [filterMovies, pathname]
  );

  // Для удаления карточек
  useEffect(() => {
    if (pathname === '/saved-movies') {
      filterMovies({ isShort, searchQuery });
    }
  }, [fullMoviesList, filterMovies, pathname]);

  return (
    <form
      className='search'
      onSubmit={(evt) => {
        evt.preventDefault();
        searchMovies({ isShort, searchQuery });
      }}
    >
      <div className='search__row'>
        <input
          className='search__input'
          type='text'
          placeholder='Фильм'
          required
          value={searchQuery}
          onChange={(evt) => setSearchQuery(evt.target.value)}
        />
        <button className='link search__button' type='submit'>
          Найти
        </button>
      </div>
      <div className='search__short-movies-switch'>
        <label className='search__switch'>
          <input
            className='search__checkbox'
            type='checkbox'
            checked={isShort}
            onChange={() => {
              searchMovies({ isShort: !isShort, searchQuery });
              setIsShort(!isShort);
            }}
          />
          <span className='search__slider'></span>
        </label>
        <p className='search__short-movies-text'>Короткометражки</p>
      </div>
    </form>
  );
};
