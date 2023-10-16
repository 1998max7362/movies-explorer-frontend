import { useLocation } from 'react-router-dom';
import { formatFilmDuration } from '../../../utils/formatFilmDuration';

export const MoviesItem = ({ movie }) => {
  let { pathname } = useLocation();

  const toggleLike = () => {};

  const removeMovie = () => {};

  return (
    <div className='movies__item'>
      <img
        className='movies__item-img'
        src={`https://api.nomoreparties.co/${movie.image.url}`}
        alt='картинка фильма'
      />
      <div className='movies__item-container'>
        <h4 className='text movies__name'>{movie.nameRU}</h4>
        {pathname === '/movies' && (
          <button
            className={`link movies__button ${
              movie.liked ? 'movies__button_liked' : 'movies__button_not-liked'
            }`}
            onClick={toggleLike}
          />
        )}
        {pathname === '/saved-movies' && (
          <button
            className='link movies__button movies__button_remove'
            onClick={removeMovie}
          />
        )}
      </div>
      <p className='text movies__duration'>
        {formatFilmDuration(movie.duration)}
      </p>
    </div>
  );
};
