import Header from "./Header";
// import { options } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nowPlayingMovies } from "../utils/moviesSlice";

export default function Browse() {

  const dispatch=useDispatch();  

  const getNowPlayingMovies=async()=>{
    const data=await fetch("http://localhost:3000/movies",{
      credentials:"include"
    }
    );

    const json=await data.json();
    dispatch(nowPlayingMovies(json.data.results));
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
  return (
    <div>
      <Header></Header>
    </div>
  )
}
