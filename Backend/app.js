const dns=require("dns");
dns.setServers(['8.8.8.8','8.8.4.4']);
const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const validator=require("validator");
const connectDb=require("./config/db.js");
const User=require("./models/user.js");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const cors=require("cors");
const userAuth = require("./middleware/userAuth.js");

const app=express();

const PORT=3000;

const startServer=async()=>{
    await connectDb();
    app.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`);
})
}

startServer();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.post("/signup",async(req,res)=>{
    try{
       const {name,email,password}=req.body;
       if(!name || !email || !password){
        throw new Error("Invalid data recieved");
       }

       if(!validator.isEmail(email)){
        throw new Error("Invalid email");
       }
       if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password");
       }
       
       const hashedPassword=await bcrypt.hash(password,10);
       const newUser=await new User({
        name,
        email,
        password:hashedPassword
       })
       await newUser.save();
       return res.status(200).json({success:true,message:"user sign up successful"});

       
    }catch(err){
        return res.status(401).json({success:false,message:"Failed to sign up : "+err.message});
    }
})

app.post("/login",async(req,res)=>{
    try{

        const{email,password}=req.body;
        if(!email || !password){
            throw new Error("Invalid credentials");
        }

        const user=await User.findOne({email});
        if(!user){
            throw new Error("Please sign up");
        }

        const isMatchedPassword=await bcrypt.compare(password,user.password);

        if(!isMatchedPassword){
            throw new Error("Invalid password");

        }
        const token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000
        })

        const userObj = user.toObject();
        delete userObj.password;

return res.status(200).json({
  success: true,
  message: "User logged in successfully",
  user: userObj
});

    }catch(err){
        return res.status(401).json({success:false,message:"Failed to login : "+err.message});
    }
})

app.post("/logout",(req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({success:true,message:"logged out successfully"});
})

app.get("/profile",userAuth,(req,res)=>{
    res.json({success:true,user:req.user})
})

app.get("/movies",async(req,res)=>{
    try{
        const response=await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
            {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${process.env.TMDB_TOKEN}`,
                      "Content-Type":"application/json"
                }
            }

        );

        const moviesData=await response.json();
        return res.status(200).json({success:true,data:moviesData});


    }catch(err){
        console.error(err.message);
        return res.status(400).json({success:false,message:"failed to fetch movies : "+err.message})
    }
})