import { useCallback, useState } from 'react';
import './SearchForm.css';

export const SearchMovies = ({ allMoviesList, setMoviesToShow }) => {
  const [isShort, setIsShort] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchMovies = useCallback(
    ({ isShort, searchQuery }) => {
      const filtereMovies = allMoviesList.filter(
        (movie) =>
          (isShort ? movie.duration <= 40 : movie) &&
          (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setMoviesToShow(filtereMovies);
    },
    [allMoviesList, setMoviesToShow]
  );

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
              searchQuery !== '' &&
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
