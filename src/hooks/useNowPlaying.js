import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";


const useNowPlayingMovies=()=>{
    const dispatch = useDispatch();  

  const getNowPlayingMovies = async () => {
    const data = await fetch("http://localhost:3000/movies", {
      credentials: "include"
    });

    const json = await data.json();
    dispatch(addNowPlayingMovies(json.data.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
}

export default useNowPlayingMovies;
