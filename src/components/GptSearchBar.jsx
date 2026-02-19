import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

export default function GptSearchBar() {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();

  const handleChange=(e)=>{
   
    setQuery(e.target.value);
  }

  const handleSearch=async(e)=>{
     e.preventDefault();

     
      const res=await fetch("http://localhost:3000/recommend",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({query})
      })

      const data=await res.json();
      dispatch(addGptMovieResult(data));
      
    
  }
  return (
    <div className="pt-[5%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12">
            <input type="text" name="" id="" placeholder='What would you like to watch today?' className='p-4 m-4 col-span-9' onChange={handleChange} value={query}/>
            <button className='px-4 py-2 bg-red-700 text-white rounded-lg col-span-3 m-4' onClick={handleSearch}>Search</button>
        </form>
    </div>
  )
}
