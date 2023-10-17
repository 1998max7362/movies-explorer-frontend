import { useCallback, useEffect, useMemo, useState } from 'react';
import { movieApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { isFilmInList } from '../../utils/isFilmInList';
import { Movies } from './Movies V1';

export const AllMoviesLayout = ({ windowSize }) => {
  const [allMovies, setAllMovies] = useState([]);

  // определяется 1 раз
  const getAllMovies = useCallback(async () => {
    try {
      const movies = await movieApi.getMovies();
      setAllMovies(movies);
    } catch (err) {
      console.log(err);
    }
  }, [setAllMovies]);

  // const getAllMoviesLiked = useCallback(({ allMovies, savedMovies }) => {
  //   const allMoviesLiked = allMovies.map((movie) => {
  //     movie.liked = false;
  //     if (isFilmInList(savedMovies, movie)) {
  //       movie.liked = true;
  //     }
  //     return movie;
  //   });
  //   setAllMoviesLiked(allMoviesLiked);
  // }, []);

  const lastSearch = useMemo(() => {
    if (localStorage.getItem('lastSearch')) {
      const { filteredMovies, isShort, searchQuery } = JSON.parse(
        localStorage.getItem('lastSearch')
      );
      return { filteredMovies, isShort, searchQuery };
    }
  }, []);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  const updateLikes = useCallback(async (moviesList) => {
    try {
      const savedMovies = await mainApi.getMovies();
      const moviesListWithLikes = moviesList.forEach((movie) => {
        movie.liked = false;
        if (isFilmInList(savedMovies, movie)) {
          movie.liked = true;
        }
      });
      return moviesListWithLikes;
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {allMovies.length > 0 && (
        <Movies
          initialFilteredMovies={lastSearch && lastSearch.filteredMovies}
          initialIsShort={lastSearch && lastSearch.isShort}
          initialSearchQuery={lastSearch && lastSearch.searchQuery}
          fullMoviesList={allMovies}
          windowSize={windowSize}
          updateLikes={updateLikes}
        />
      )}
    </>
  );
};
