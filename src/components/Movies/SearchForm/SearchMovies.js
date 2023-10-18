import { useState } from 'react';
import './SearchForm.css';

export const SearchMovies = ({
  handleSearch,
  initialIsShort = false,
  initialSearchQuery = '',
}) => {
  const [isShort, setIsShort] = useState(initialIsShort);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  return (
    <form
      className='search'
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSearch({ isShort, searchQuery });
      }}
    >
      <div className='search__row'>
        <input
          className='search__input'
          type='text'
          placeholder='Фильм'
          required
          value={searchQuery}
          onChange={(evt) => {setSearchQuery(evt.target.value)}}
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
              handleSearch({ isShort: !isShort, searchQuery });
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
