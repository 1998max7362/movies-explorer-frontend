import { SearchMovies } from "./SearchForm/SearchMovies"
import { MoviesGrid } from "./MoviesGrid/MoviesGrid"
import "./Movies.css"

export const Movies = ({saved}) => {
    return <section className="movies">
        <SearchMovies />
        <MoviesGrid />
        <button className="link movies__more">Еще</button>
    </section>
}
