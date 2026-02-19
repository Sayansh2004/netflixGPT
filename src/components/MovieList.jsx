import MovieCard from "./MovieCard";

export default function MovieList({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-6 py-4">
        <h1 className="text-xl md:text-3xl font-bold py-4 text-white">
          {title}
        </h1>
        
        {/* Added horizontal scroll and gap between cards */}
        <div className="flex overflow-x-auto gap-4 pb-4 [&::-webkit-scrollbar]:hidden shadow-inner">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
    </div>
  );
}