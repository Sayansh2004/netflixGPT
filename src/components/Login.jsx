import { useState } from "react"
import Header from "./Header"

export default function Login() {
  const[isSignIn,setIsSignIn]=useState();
  const[formData,setFormData]=useState({
    username:"",
       email:"",
       password:""
  });





  const handleInputChange=(e)=>{
    const {name,value}=e.target;
   
    
    setFormData((prev)={
      ...prev,[name]:value
    })
    
  }

  const toggleClick=()=>{
          setIsSignIn(!isSignIn);
  }
  return (
    <div>
        <Header></Header>
        <div className="relative">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4371a395-0e42-46ae-be36-5755eebc638b/web/IN-en-20260209-TRIFECTA-perspective_3a6d8659-ddfe-4547-9584-dce64c02c230_medium.jpg" alt="bg-image" />
      <div className="absolute inset-0 flex items-center justify-center">
  <form className="bg-black/80 text-white p-10 rounded-lg w-80 min-h-[420px] flex flex-col">
    
    <h1 className="font-bold text-2xl mb-6">{isSignIn?"Sign In":"Sign Up"}</h1>

    {!isSignIn &&
        <input
      type="text"
      name="username"
      placeholder="username"
      value={formData.email}
      onChange={handleInputChange}
      className="w-full p-3 mb-4 bg-gray-700 rounded outline-none"
    />
    }

    <input
      type="text"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleInputChange}
      className="w-full p-3 mb-4 bg-gray-700 rounded outline-none"
    />

    <input
      type="text"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleInputChange}
      className="w-full p-3 mb-6 bg-gray-700 rounded outline-none"
    />

    <button className="bg-red-700 py-3 rounded font-semibold hover:bg-red-600">
    {isSignIn?"Sign In":"Sign Up"}
    </button>

    <p className="text-white p-4 cursor-pointer" onClick={toggleClick}>
      {isSignIn?"New To Netflix ? Sign Up Now":"Already Registered?Sign In Now"}
    </p>

  </form>
</div>


        </div>
    </div>
  )
}
