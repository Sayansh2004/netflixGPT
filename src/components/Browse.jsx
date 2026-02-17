import useNowPlayingMovies from "../hooks/useNowPlaying";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
// import { options } from "../utils/constants";

export default function Browse() {
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
      useNowPlayingMovies();
  return (
    <div>
      <Header></Header>
      {showGptSearch?(<GptSearch/>):
      (<>
      <MainContainer/>
      <SecondaryContainer/>
      </>
    )}
      
    </div>
  )
}
