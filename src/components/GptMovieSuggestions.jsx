import { useSelector } from "react-redux";
import MovieList from "./MovieList";

export default function GptMovieSuggestions() {
  const gpt = useSelector((store) => store.gpt.gptMovies);

  if (!gpt || gpt.length === 0) return null;

  return (
    <div className="p-4 m-4 bg-black bg-opacity-80 text-white rounded-lg">
      {gpt.map((movieArray, index) => (
        <MovieList
          key={index}
          title={`Suggestion ${index + 1}`}
          movies={movieArray}
        />
      ))}
    </div>
  );
}
