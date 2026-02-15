import {  useState } from "react"
import Header from "./Header"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name too short")
    .max(50, "Name too long"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "Must contain one uppercase letter")
    .matches(/[a-z]/, "Must contain one lowercase letter")
    .matches(/[0-9]/, "Must contain one number")
    .matches(/[@$!%*?&]/, "Must contain one special character")
    .required("Password is required"),
});
  const formik=useFormik({
       initialValues:{
        name:"",
        email:"",
        password:""
       },
        validationSchema:validationSchema,
      //  validate:(values)=>{
      //    const errors={};

      //    if(!values.email){
      //     errors.email="Email is required";
      //    }

      //    if(!values.name && !isSignIn){
      //     errors.name="Name is required";
      //    }

      //    if(!values.password){
      //     errors.password="Password is required";
      //    }
      //    return errors
      //  },
       onSubmit:async(values,{resetForm})=>{
        try{
          const url=isSignIn?"http://localhost:3000/login":"http://localhost:3000/signup";

        const res=await fetch(url,
          {
            method:"POST",
            headers:{
             "Content-Type":"application/json"
            },
            body:JSON.stringify(values),
            credentials:"include"
          }
        )
        
       
        if(res.ok){
           const data=await res.json();
          dispatch(addUser(data.user));
          resetForm();
           navigate("/browse");
          
       
        }
        
        if(!isSignIn){
          setIsSignIn(true);
        }
        }catch(err){
          console.error("Error : "+err.message);
        }
        
       }
  })
  const[isSignIn,setIsSignIn]=useState(true);

 

  const toggleClick=()=>{
          setIsSignIn(!isSignIn);
  }



  return (
    <div>
        <Header></Header>
        <div className="relative">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4371a395-0e42-46ae-be36-5755eebc638b/web/IN-en-20260209-TRIFECTA-perspective_3a6d8659-ddfe-4547-9584-dce64c02c230_medium.jpg" alt="bg-image" />
      <div className="absolute inset-0 flex items-center justify-center">
  <form className="bg-black/80 text-white p-10 rounded-lg w-80 min-h-[420px] flex flex-col" onSubmit={formik.handleSubmit}>
    
    <h1 className="font-bold text-2xl mb-6">{isSignIn?"Sign In":"Sign Up"}</h1>

    {!isSignIn &&
        <input
      type="text"
      name="name"
      placeholder="username"
      value={formik.values.name}
      onChange={formik.handleChange}
      className="w-full p-3 mb-4 bg-gray-700 rounded outline-none"
      onBlur={formik.handleBlur}
    />
    }

    
      {formik.touched.name&& formik.errors.name && (
        <p className="text-red-500 text-sm mb-3">{formik.errors.name}</p>
      )}
    

    <input
      type="text"
      name="email"
      placeholder="Email"
    onBlur={formik.handleBlur}
      value={formik.values.email}
onChange={formik.handleChange}
      className="w-full p-3 mb-4 bg-gray-700 rounded outline-none"
    />
    {formik.touched.email && formik.errors.email&&(
      <p className="text-red-500 mb-3 text-sm">{formik.errors.email}</p>
    )}
    <input
    name="password"
      type="password"
      value={formik.values.password}
      placeholder="Password"
      onBlur={formik.handleBlur}
      className="w-full p-3 mb-6 bg-gray-700 rounded outline-none"
      onChange={formik.handleChange}
    />


    <button className="bg-red-700 py-3 rounded font-semibold hover:bg-red-600" type="submit" >
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
