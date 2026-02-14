import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";


export default function Header() {
  
  const user = useSelector((store) => store.user);

  const dispatch=useDispatch();
  const handleSignOut=async()=>{
    try{
    await fetch("http://localhost:3000/logout",{
        method:POST,
        credentials:"include"
      })
dispatch(removeUser());
    }catch(err){
      console.error("Error : "+err.message);
    }
    
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
          
        
          <button className="text-white font-bold cursor-pointer ml-2" onClick={handleSignOut}>
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
}