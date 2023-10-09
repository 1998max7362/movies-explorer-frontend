import filmAva from "../../../images/movies/pic__COLOR_pic.jpg"
import { MoviesItem } from "./MoviesItem"


export const MoviesGrid = ({ saved }) => {

  return (<div className="movies__grid">
    <MoviesItem filmAva={filmAva}  />
    <MoviesItem filmAva={filmAva} enableRemove />
    <MoviesItem filmAva={filmAva} liked />
    <MoviesItem filmAva={filmAva}  />
    <MoviesItem filmAva={filmAva} enableRemove />
    <MoviesItem filmAva={filmAva} liked />
  </div>)
}