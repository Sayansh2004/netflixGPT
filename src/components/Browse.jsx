import useNowPlayingMovies from "../hooks/useNowPlaying";
import Header from "./Header";
// import { options } from "../utils/constants";

export default function Browse() {
      useNowPlayingMovies();
  return (
    <div>
      <Header></Header>
    </div>
  )
}
