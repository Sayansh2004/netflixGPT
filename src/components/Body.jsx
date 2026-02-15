import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addUser } from "../utils/userSlice";
import Shimmer from "../shimmer/Shimmer";


export default function Body() {
    const[authChecked,setAuthChecked]=useState(false);
     const dispatch=useDispatch();
    
      useEffect(()=>{
        const fetchUser=async()=>{
          try{
             const response=await fetch("http://localhost:3000/profile",{
          credentials:"include"
        })
    
        const data=await response.json();
        if(data.success){
          dispatch(addUser(data.user));
        }
          }
          catch(err){
            console.error("Error fetching user profile : "+err.message);
          }finally{
            setAuthChecked(true);
          }
       
        };
        fetchUser();
      },[])
    const appRouter=createBrowserRouter([
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/browse",
            element:
            <ProtectedRoute>
                  <Browse/>
            </ProtectedRoute>
          
        }
    ])
    if(!authChecked){
        return <Shimmer/>;
    }
  return (
    <div>
       <RouterProvider router={appRouter}></RouterProvider>
        </div>
  )
}
