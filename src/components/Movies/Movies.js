import { SearchMovies } from "./SearchForm/SearchMovies"
import { MoviesGrid } from "./MoviesGrid/MoviesGrid"
import "./Movies.css"

export const Movies = () => {
    return <section className="movies">
        <SearchMovies />
        <MoviesGrid />
        <button class="link movies__more">Еще</button>
    </section>
}
