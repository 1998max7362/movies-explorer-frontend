import { useLocation } from 'react-router-dom';
import { formatFilmDuration } from '../../../utils/formatFilmDuration'; 

export const MoviesItem = ({ movie }) => {

  let { pathname } = useLocation();

  return (<div className="movies__item">
    <img className="movies__item-img" src={`https://api.nomoreparties.co/${movie.image.url}`} alt="картинка фильма" />
    <div className="movies__item-container">
      <h4 className="text movies__name">{movie.nameRU}</h4>
      {/* <button className={`link movies__button ${liked ? 'movies__button_liked' : 'movies__button_not-liked'} ${enableRemove&&'movies__button_remove'}`}></button> */}
      {pathname==='/saved-movies'&&'movies__button_remove'}
    </div>
    <p className="text movies__duration">{formatFilmDuration(movie.duration)}</p>
  </div>)
}