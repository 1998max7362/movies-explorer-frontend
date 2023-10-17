// import { useCallback, useEffect, useState } from 'react';
// import './SearchForm.css';

// export const SearchMovies = ({
//   allMoviesList,
//   setFilteredMovies,
//   setCount,
//   saved,
// }) => {
//   const [isShort, setIsShort] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   // localStorage.clear();

//   const searchMovies = useCallback(
//     ({ isShort, searchQuery }) => {
//       const filteredMovies = allMoviesList.filter(
//         (movie) =>
//           (isShort ? movie.duration <= 40 : movie) &&
//           (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()))
//       );
//       if (!saved) {
//         localStorage.setItem(
//           'filteredMovies',
//           JSON.stringify({
//             filteredMovies,
//             isShort,
//             searchQuery,
//           })
//         );
//       }
//       setCount(0);
//       setFilteredMovies(filteredMovies);
//     },
//     [allMoviesList, setFilteredMovies, setCount, saved]
//   );

//   useEffect(() => {
//     if (saved) {
//       setFilteredMovies(allMoviesList);
//       setIsShort(false);
//       setSearchQuery('');
//     }
//     if (!saved && localStorage.getItem('filteredMovies')) {
//       const { filteredMovies, isShort, searchQuery } = JSON.parse(
//         localStorage.getItem('filteredMovies')
//       );
//       setFilteredMovies(filteredMovies);
//       setIsShort(isShort);
//       setSearchQuery(searchQuery);
//     }
//   }, [setFilteredMovies, setIsShort, setSearchQuery, saved, allMoviesList]);

//   return (
//     <form
//       className='search'
//       onSubmit={(evt) => {
//         evt.preventDefault();
//         searchMovies({ isShort, searchQuery });
//       }}
//     >
//       <div className='search__row'>
//         <input
//           className='search__input'
//           type='text'
//           placeholder='Фильм'
//           required
//           value={searchQuery}
//           onChange={(evt) => setSearchQuery(evt.target.value)}
//         />
//         <button className='link search__button' type='submit'>
//           Найти
//         </button>
//       </div>
//       <div className='search__short-movies-switch'>
//         <label className='search__switch'>
//           <input
//             className='search__checkbox'
//             type='checkbox'
//             checked={isShort}
//             onChange={() => {
//               searchQuery !== '' &&
//                 searchMovies({ isShort: !isShort, searchQuery });
//               setIsShort(!isShort);
//             }}
//           />
//           <span className='search__slider'></span>
//         </label>
//         <p className='search__short-movies-text'>Короткометражки</p>
//       </div>
//     </form>
//   );
// };
