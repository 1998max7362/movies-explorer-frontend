import likeIcon from "../../../images/movies/like-icon-empty.svg"
import likeIconLiked from "../../../images/movies/like-icon.svg"
import removeIcon from "../../../images/movies/remove-icon.svg"

export const MoviesItem = ({filmAva}) => {
  return (<div className="movies__item">
    <img className="movies__item-img" src={filmAva} alt="картинка фильма" />
    <div className="movies__item-container">
      <h4 className="text movies__name">Название</h4>
      <img className="link movies__button" src={likeIcon} alt="лайк" />
    </div>
    <p className="text movies__duration">1:42</p>
  </div>)
}