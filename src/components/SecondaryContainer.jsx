import MovieList from './MovieList';
import { useSelector } from 'react-redux';

export default function SecondaryContainer() {
  const movies=useSelector((store)=>store.movies)
  return (
  <div className="bg-black -mt-40 relative z-20">
    <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
    <MovieList title="Trending" movies={movies.nowPlayingMovies} />
    <MovieList title="Popular" movies={movies.nowPlayingMovies} />
  </div>
);

}
