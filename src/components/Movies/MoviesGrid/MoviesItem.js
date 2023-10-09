

export const MoviesItem = ({ filmAva, liked, enableRemove }) => {
  return (<div className="movies__item">
    <img className="movies__item-img" src={filmAva} alt="картинка фильма" />
    <div className="movies__item-container">
      <h4 className="text movies__name">Название</h4>
      <button className={`link movies__button ${liked ? 'movies__button_liked' : 'movies__button_not-liked'} ${enableRemove&&'movies__button_remove'}`}></button>
    </div>
    <p className="text movies__duration">1:42</p>
  </div>)
}