import { SearchMovies } from './SearchForm/SearchMovies';
import { MoviesGrid } from './MoviesGrid/MoviesGrid';
import './Movies.css';

export const Movies = ({ saved, windowSize }) => {

  

  return (
    <section className='movies'>
      <SearchMovies />
      <MoviesGrid saved={saved} />
    </section>
  );
};
