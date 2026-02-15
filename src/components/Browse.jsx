import Header from "./Header";
import { options } from "../utils/constants";
import { useEffect } from "react";

export default function Browse() {

  

  const getNowPlayingMovies=async()=>{
    const data=await fetch("http://localhost:3000/movies",{
      credentials:"include"
    }
    );

    const json=await data.json();
    console.log(json);
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
