import { useState } from 'react';
import './SearchForm.css';

export const SearchMovies = ({
  handleSearch,
  initialIsShort = false,
  initialSearchQuery = '',
}) => {
  const [isShort, setIsShort] = useState(initialIsShort);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [error, setError] = useState('')

  return (
    <form
      className='search'
      onSubmit={(evt) => {
        evt.preventDefault();
        if (searchQuery===''){
          setError('Нужно ввести ключевое слово')
          return
        }
        setError('')
        handleSearch({ isShort, searchQuery });
      }}
    >
      <div>
        <div className='search__row'>
          <input
            className='search__input'
            type='text'
            placeholder='Фильм'
            value={searchQuery}
            onChange={(evt) => {
              setSearchQuery(evt.target.value);
            }}
          />
          <button className='link search__button' type='submit'>
            Найти
          </button>
        </div>
        <p className='text search__input-error'>{error}</p>
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
