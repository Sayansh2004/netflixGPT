import React, { useEffect } from 'react';

export default function VideoBackground({ movieId }) {

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
        video => video.type === "Trailer"
      );

      const trailer = filterData.length ? filterData[0] : videos[0];

      console.log(trailer);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!movieId) return;
    getMovieVideos();
  }, [movieId]);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/7OUlF8n55Yk"
        title="YouTube video player"
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  );
}
