import { Link, useLocation } from 'react-router-dom';
import { formatFilmDuration } from '../../../utils/formatFilmDuration';
import { useState } from 'react';

export const MoviesItem = ({ movie }) => {
  let { pathname } = useLocation();
  const [liked, setLiked] = useState(movie.liked)

  const toggleLike = () => {


    movie.liked = !liked
  };

  const removeMovie = () => {};

  return (
    <div className='movies__item'>
      <Link to={movie.trailerLink} target="_blank">
      <img
        className='link movies__item-img'
        src={`https://api.nomoreparties.co/${movie.image.url}`}
        alt='картинка фильма'
        // onClick={}
      /></Link>
      <div className='movies__item-container'>
        <h4 className='text movies__name'>{movie.nameRU}</h4>
        {pathname === '/movies' && (
          <button
            className={`link movies__button ${
              liked ? 'movies__button_liked' : 'movies__button_not-liked'
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
