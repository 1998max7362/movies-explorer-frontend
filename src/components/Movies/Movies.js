// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { SearchMovies } from './SearchForm/SearchMovies';
// import { MoviesGrid } from './MoviesGrid/MoviesGrid';
// import './Movies.css';

// import { mainApi } from '../../utils/MainApi';
// import { movieApi } from '../../utils/MoviesApi';
// import { getNumOfMovies } from '../../utils/getNumOfMovies';
// import { isFilmInList } from '../../utils/isFilmInList';

// export const Movies = ({ saved, windowSize }) => {
//   const { startNumOfMovies, extraNumOfMovies } = useMemo(
//     () => getNumOfMovies({ windowSize }),
//     [windowSize]
//   );

//   const [savedMovies, setSavedMovies] = useState([]);
//   const [allMoviesList, setAllMoviesList] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [moviesToShow, setMoviesToShow] = useState([]);
//   const [count, setCount] = useState(0);

//   useMemo(async () => {
//     try {
//       const movies = await mainApi.getMovies();
//       setSavedMovies(movies);
//     } catch (err) {}
//   }, [saved]);

//   useMemo(async () => {
//     if (saved) {
//       setAllMoviesList(savedMovies);
//     } else {
//       try {
//         const movies = await movieApi.getMovies();
//         setAllMoviesList(movies);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }, [saved, savedMovies]);

//   // При нажатии "Еще"
//   useEffect(() => {
//     const moviesListToShow = filteredMovies.slice(
//       0,
//       startNumOfMovies + count * extraNumOfMovies
//     );
//     const moviesListToShowWithLikes = moviesListToShow.map((movie) => {
//       movie.liked = false
//       if (isFilmInList(savedMovies, movie)) {
//         movie.liked = true;
//       }
//       return movie;
//     });
//     setMoviesToShow(moviesListToShowWithLikes);
//   }, [
//     setMoviesToShow,
//     filteredMovies,
//     count,
//     startNumOfMovies,
//     extraNumOfMovies,
//     savedMovies
//   ]);

//   const removeMovie = useCallback(
//     async (movie) => {
//       const movieId = movie.id;
//       try {
//         await mainApi.deleteMovie(movieId);
//         setAllMoviesList((movieList) =>
//           movieList.filter((movie) => movie.id !== movieId)
//         );
//         setFilteredMovies((movieList) =>
//           movieList.filter((movie) => movie.id !== movieId)
//         );
//         setMoviesToShow((movieList) =>
//           movieList.filter((movie) => movie.id !== movieId)
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     },
//     [setAllMoviesList, setFilteredMovies, setMoviesToShow]
//   );

//   return (
//     <section className='movies'>
//       <SearchMovies
//         allMoviesList={allMoviesList}
//         setFilteredMovies={setFilteredMovies}
//         setCount={setCount}
//         saved={saved}
//       />
//       <MoviesGrid moviesToShow={moviesToShow} removeMovie={removeMovie} />
//       {filteredMovies.length > startNumOfMovies + count * extraNumOfMovies && (
//         <button
//           className='link movies__more'
//           onClick={() => setCount(count + 1)}
//         >
//           Еще
//         </button>
//       )}
//     </section>
//   );
// };
