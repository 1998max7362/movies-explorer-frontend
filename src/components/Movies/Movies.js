import { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchMovies } from './SearchForm/SearchMovies';
import { MoviesGrid } from './MoviesGrid/MoviesGrid';
import './Movies.css';
import { getNumOfMovies } from '../../utils/getNumOfMovies';
import { movieApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import { isFilmInList } from '../../utils/isFilmInList';
import { SHORTMOVIESDURATION } from '../../utils/constants';

export const Movies = ({ windowSize }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  const [preload, setPreload] = useState(false);

  const { startNumOfMovies, extraNumOfMovies } = useMemo(
    () => getNumOfMovies({ windowSize }),
    [windowSize]
  );

  const getAllMoviesWIthLikes = useCallback(async () => {
    try {
      setPreload(true);
      if (allMovies.length === 0) {
        const newAllMovies = await movieApi.getMovies();
        const savedMovies = await mainApi.getMovies();
        setAllMovies(newAllMovies);
        setPreload(false);
        setPreload(false);
        const moviesListWithLikes = newAllMovies.map((movie) => {
          movie._id = false;
          const _id = isFilmInList(savedMovies, movie);
          if (_id) {
            movie._id = _id;
          }
          return movie;
        });
        return moviesListWithLikes;
      } else {
        const savedMovies = await mainApi.getMovies();
        setPreload(false);
        setPreload(false);
        const moviesListWithLikes = allMovies.map((movie) => {
          movie._id = false;
          const _id = isFilmInList(savedMovies, movie);
          if (_id) {
            movie._id = _id;
          }
          return movie;
        });
        return moviesListWithLikes;
      }
    } catch (err) {
      setPreload(false);
      console.log(err);
      setError('Произошла ошибка при загрузке данных с сервера');
    }
  }, [setPreload, allMovies]);

  const handleSearch = useCallback(
    async ({ isShort, searchQuery }) => {
      try {
        const moviesList = await getAllMoviesWIthLikes();
        const filteredMovies = moviesList.filter(
          (movie) =>
            (isShort ? movie.duration <= SHORTMOVIESDURATION : movie) &&
            (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        if (filteredMovies.length === 0) {
          setError('Ничего не найдено');
        } else {
          setError('');
          localStorage.setItem(
            'lastSearch',
            JSON.stringify({
              lastFilteredMovies: filteredMovies,
              lastIsShort: isShort,
              lastSearchQuery: searchQuery,
            })
          );
        }
        setCount(0);
        setFilteredMovies(filteredMovies);
      } catch (err) {
        console.log(err);
      }
    },
    [getAllMoviesWIthLikes]
  );

  // Чтобы писать в localstorage последние лайки уже после поиска
  const updateLastSearch = useCallback(() => {
    if (localStorage.getItem('lastSearch')) {
      const { lastIsShort, lastSearchQuery } = JSON.parse(
        localStorage.getItem('lastSearch')
      );
      localStorage.setItem(
        'lastSearch',
        JSON.stringify({
          lastFilteredMovies: filteredMovies,
          lastIsShort,
          lastSearchQuery,
        })
      );
    }
  }, [filteredMovies]);

  // Если есть сеть, то подгружаем новые лайки, если нет, то без новых лайков
  useMemo(async () => {
    if (localStorage.getItem('lastSearch')) {
      const { lastFilteredMovies, lastIsShort, lastSearchQuery } = JSON.parse(
        localStorage.getItem('lastSearch')
      );
      try {
        setPreload(true);
        const savedMovies = await mainApi.getMovies();
        setPreload(false);
        const moviesListWithLikes = lastFilteredMovies.map((movie) => {
          movie._id = false;
          const _id = isFilmInList(savedMovies, movie);
          if (_id) {
            movie._id = _id;
          }
          return movie;
        });
        // обновляем старый сохраненный запрос (дописываем новые лайки)
        localStorage.setItem(
          'lastSearch',
          JSON.stringify({
            lastFilteredMovies: moviesListWithLikes,
            lastIsShort,
            lastSearchQuery,
          })
        );
        setFilteredMovies(moviesListWithLikes);
      } catch (err) {
        setPreload(false);
        console.log(err);
        setFilteredMovies(lastFilteredMovies);
      }
    }
  }, [setFilteredMovies]);

  const lastSearch = useMemo(() => {
    if (localStorage.getItem('lastSearch')) {
      const { lastIsShort, lastSearchQuery } = JSON.parse(
        localStorage.getItem('lastSearch')
      );
      return { lastIsShort, lastSearchQuery };
    }
  }, []);

  useEffect(() => {
    const moviesListToShow = filteredMovies.slice(
      0,
      startNumOfMovies + count * extraNumOfMovies
    );
    setMoviesToShow(moviesListToShow);
  }, [filteredMovies, count, extraNumOfMovies, startNumOfMovies]);

  return (
    <section className='movies'>
      <SearchMovies
        handleSearch={handleSearch}
        initialIsShort={lastSearch && lastSearch.lastIsShort}
        initialSearchQuery={lastSearch && lastSearch.lastSearchQuery}
      />
      {preload ? (
        <Preloader />
      ) : error ? (
        <p className='text error'>{error}</p>
      ) : (
        <>
          <MoviesGrid
            moviesToShow={moviesToShow}
            updateLastSearch={updateLastSearch}
          />
          {filteredMovies.length >
            startNumOfMovies + count * extraNumOfMovies && (
            <button
              className='link movies__more'
              onClick={() => {
                setCount(count + 1);
              }}
            >
              Еще
            </button>
          )}
        </>
      )}
    </section>
  );
};
