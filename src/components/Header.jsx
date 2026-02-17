import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {toggleSearchView} from "../utils/gptSlice";

export default function Header() {
  const navigate=useNavigate();
  
  const user = useSelector((store) => store.user);

  const dispatch=useDispatch();
  const handleSignOut=async()=>{
    try{
    const res=await fetch("http://localhost:3000/logout",{
        method:"POST",
        credentials:"include"
      })
if (res.ok) {
  dispatch(removeUser());
  navigate("/login");
}
navigate("/login");
    }catch(err){
      console.error("Error : "+err.message);
    }
    
  }

  const handleGptSearchClick=()=>{
       dispatch(toggleSearchView());
  }

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      
     
      <img
        className="w-44"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
        alt="Netflix Logo"
      />

     
      {user && (
        <div className="flex items-center gap-2">
         
          <img 
            className="w-10 h-10 rounded"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="User Icon"
          />
          <p className="text-white font-bold">Hello, {user.name}</p>
          
          <button className="py-2 px-4 m-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>GPT search</button>
          <button className="text-white font-bold cursor-pointer ml-2" onClick={handleSignOut}>
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
}