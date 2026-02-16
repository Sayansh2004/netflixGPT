import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
 

  const getMovieVideos = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/movies/${movieId}`,
        { credentials: "include" }
      );

      const json = await res.json();
      const videos = json?.data?.results;

      if (!videos || videos.length === 0) {
        console.warn("No videos found");
        return;
      }

      const filterData = videos.filter(
        video => video.type === "Trailer" && video.site === "YouTube"
      );

      const trailer = filterData.length ? filterData[0] : videos[0];
      
      dispatch(addTrailerVideo(trailer));
console.log(trailer)

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // if (!movieId || trailerVideo) return;
    getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
