// import { Link, useLocation } from 'react-router-dom';
// import { formatFilmDuration } from '../../../utils/formatFilmDuration';
// import { useReducer } from 'react';
// import { mainApi } from '../../../utils/MainApi';

// export const MoviesItem = ({ movie, removeMovie }) => {
//   let { pathname } = useLocation();
//   const [, forceUpdate] = useReducer((x) => x + 1, 0);
//   // const [liked, setLiked] = useState(movie.liked);
//   // console.log(`movie.liked ${movie.liked}, liked ${liked}`)

//   const toggleLike = async () => {
//     try {
//       console.log(movie);
//       !movie.liked
//         ? await mainApi.postMovie(movie)
//         : await mainApi.deleteMovie(movie.id);
//       movie.liked = !movie.liked;
//       forceUpdate();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className='movies__item'>
//       <Link to={movie.trailerLink} target='_blank'>
//         <img
//           className='link movies__item-img'
//           src={`https://api.nomoreparties.co/${movie.image.url}`}
//           alt='картинка фильма'
//         />
//       </Link>
//       <div className='movies__item-container'>
//         <h4 className='text movies__name'>{movie.nameRU}</h4>
//         {pathname === '/movies' && (
//           <button
//             className={`link movies__button ${
//               movie.liked ? 'movies__button_liked' : 'movies__button_not-liked'
//             }`}
//             onClick={toggleLike}
//           />
//         )}
//         {pathname === '/saved-movies' && (
//           <button
//             className='link movies__button movies__button_remove'
//             onClick={() => removeMovie(movie)}
//           />
//         )}
//       </div>
//       <p className='text movies__duration'>
//         {formatFilmDuration(movie.duration)}
//       </p>
//     </div>
//   );
// };
