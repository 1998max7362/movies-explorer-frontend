import { SearchMovies } from "./SearchForm/SearchMovies"
import { MoviesGrid } from "./MoviesGrid/MoviesGrid"
import "./Movies.css"

export const Movies = () => {
    return <section className="movies">
        <SearchMovies />
        <MoviesGrid />
    </section>
}
