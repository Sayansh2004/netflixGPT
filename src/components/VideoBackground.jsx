import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import Shimmer from "../shimmer/Shimmer";

export default function VideoBackground({ movieId }) {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector(
    (store) => store.movies?.trailerVideo
  );

 

  if (!trailerVideo) return <Shimmer/>;

  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}
