import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchMovies } from './SearchForm/SearchMovies';
import { MoviesGrid } from './MoviesGrid/MoviesGrid';
import './Movies.css';
import { getNumOfMovies } from '../../utils/getNumOfMovies';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

export const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState('');
  const [preload, setPreload] = useState(false);


  const getSavedMovies = useCallback(async () => {
    try {
      setPreload(true);
      const savedMovies = await mainApi.getMovies();
      setPreload(false);
      setSavedMovies(savedMovies);
      setFilteredMovies(savedMovies);
    } catch (err) {
      setPreload(false);
      console.log(err);
      setError('Произошла ошибка при загрузке данных с сервера');
    }
  }, [setPreload, setSavedMovies, setFilteredMovies]);

  useEffect(() => {
    getSavedMovies();
  }, [getSavedMovies]);

  const handleSearch = useCallback(
    async ({ isShort, searchQuery }) => {
      try {
        const filteredMovies = savedMovies.filter(
          (movie) =>
            (isShort ? movie.duration <= 40 : movie) &&
            (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        if (filteredMovies.length === 0) {
          setError('Ничего не найдено');
        } else {
          setError('');
        }
        setFilteredMovies(filteredMovies);
      } catch (err) {
        console.log(err);
      }
    },
    [savedMovies]
  );

  const removeMovie = useCallback(
    (_id) => {
      setSavedMovies((savedMovies) =>
        savedMovies.filter((movie) => movie._id !== _id)
      );
      setFilteredMovies((filteredMovies) =>
        filteredMovies.filter((movie) => movie._id !== _id)
      );
    },
    [setSavedMovies, setFilteredMovies]
  );

  return (
    <section className='movies'>
      <SearchMovies handleSearch={handleSearch} />
      {preload ? (
        <Preloader />
      ) : error ? (
        <p className='text error'>{error}</p>
      ) : (
        <MoviesGrid moviesToShow={filteredMovies} removeMovie={removeMovie} />
      )}
    </section>
  );
};
