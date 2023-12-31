import { MoviesItem } from './MoviesItem';

export const MoviesGrid = ({moviesToShow, updateLastSearch, removeMovie}) => {
  return (
    <div className='movies__grid'>
        {moviesToShow.map((movie, idx) => (
          <MoviesItem
            movie={movie}
            key={movie.id}
            removeMovie={removeMovie}
            updateLastSearch={updateLastSearch}
          />
        ))}
    </div>
  );
};
