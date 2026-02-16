import MovieList from './MovieList';
import { useSelector } from 'react-redux';

export default function SecondaryContainer() {
  const movies=useSelector((store)=>store.movies)
  return (
    <div>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}></MovieList>
      {/* 
      
      MovieList-popular
      
      MovieList-Now playing
      MovieList-trending
      
      */}
    </div>
  )
}
