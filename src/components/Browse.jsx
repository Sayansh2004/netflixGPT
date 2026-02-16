import useNowPlayingMovies from "../hooks/useNowPlaying";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
// import { options } from "../utils/constants";

export default function Browse() {
      useNowPlayingMovies();
  return (
    <div>
      <Header></Header>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}
