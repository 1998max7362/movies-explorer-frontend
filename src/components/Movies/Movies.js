import { SearchMovies } from './SearchForm/SearchMovies';
import { MoviesGrid } from './MoviesGrid/MoviesGrid';
import './Movies.css';
import { formatFilmDuration } from '../../utils/formatFilmDuration';

export const Movies = ({ saved, windowSize }) => {

  return (
    <section className='movies'>
      <SearchMovies />
      <MoviesGrid saved={saved} />
      <button className='link movies__more'>Еще</button>
    </section>
  );
};
