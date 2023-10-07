import filmAva from "../../../images/movies/pic__COLOR_pic.jpg"
import likeIcon from "../../../images/movies/like-icon-empty.svg"
import likeIconLiked from "../../../images/movies/like-icon.svg"
import removeIcon from "../../../images/movies/remove-icon.svg"
import { MoviesItem } from "./MoviesItem"

export const MoviesGrid = () => {
  return (<div className="movies__grid">
    <MoviesItem filmAva={filmAva}/>
    <MoviesItem filmAva={filmAva}/>
    <MoviesItem filmAva={filmAva}/>
    <MoviesItem filmAva={filmAva}/>
    <MoviesItem filmAva={filmAva}/>
    <MoviesItem filmAva={filmAva}/>
  </div>)
}