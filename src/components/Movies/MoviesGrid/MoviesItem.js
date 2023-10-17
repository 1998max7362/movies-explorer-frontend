import { Link, useLocation } from 'react-router-dom';
import { formatFilmDuration } from '../../../utils/formatFilmDuration';
import { useReducer, useCallback } from 'react';
import { filmUrl } from '../../../utils/constants';
import { mainApi } from '../../../utils/MainApi';

export const MoviesItem = ({ movie, getSavedMovies }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  let { pathname } = useLocation();

  const toggleLike = async () => {
    try {
      if (movie._id) {
        await mainApi.deleteMovie(movie._id);
        movie._id = false;
      } else {
        const { _id } = await mainApi.postMovie(movie);
        movie._id = _id;
      }
      forceUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  const removeMovie = useCallback(
    async (id) => {
      try {
        await mainApi.deleteMovie(id);
        getSavedMovies();
      } catch (err) {
        console.log(err);
      }
    },
    [getSavedMovies]
  );

  return (
    <div className='movies__item'>
      <Link to={movie.trailerLink} target='_blank'>
        <img
          className='link movies__item-img'
          src={`${filmUrl}/${movie.image.url}`}
          alt='картинка фильма'
        />
      </Link>
      <div className='movies__item-container'>
        <h4 className='text movies__name'>{movie.nameRU}</h4>
        {pathname === '/movies' && (
          <button
            className={`link movies__button ${
              movie._id ? 'movies__button_liked' : 'movies__button_not-liked'
            }`}
            onClick={toggleLike}
          />
        )}
        {pathname === '/saved-movies' && (
          <button
            className='link movies__button movies__button_remove'
            onClick={() => removeMovie(movie._id)}
          />
        )}
      </div>
      <p className='text movies__duration'>
        {formatFilmDuration(movie.duration)}
      </p>
    </div>
  );
};
