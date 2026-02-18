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
const openAi=require("openai");

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

const openai=new openAi({
    apiKey:process.env.OPEN_AI_KEY
})
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
        const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

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

app.get("/movies/:movieId",async(req,res)=>{
    try{

        const {movieId}=req.params;
        const response=await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`,
           { method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${process.env.TMDB_TOKEN}`

            }}
        );

        const data=await response.json();
        return res.status(200).json({success:true,data});
        
    }catch(err){
        console.error(err.message);
        return res.status(404).json({success:false,message:"video not found"});
    }
})

app.post("/recommend",async(req,res)=>{
    try{

        const {query}=req.body;

        const gptResults=await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages:[
                {
                    role:"system",
                    content:"You are a movie recommendation system. Return only 5 movie names separated by commas.Return only a comma-separated list of movie titles. No explanation, no numbering."
                },
                {
                    role:"user",
                    content:query
                }
            ]
        });



        // const movies=gptResults.choices[0].message.content; The actual output by openAI
        const movies=gptResults.choices[0].message.content.split(","); // returns array now



       const searchMovieTMDB = async (movie) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
          }
        }
      );

      const data = await res.json();
      return data.results; // return first match
    };


        // const tmdbResults=await Promise.all(
        //     movies.map((movie)=>searchMovieTMDB(movie.trim()))
        // );

        
      const tmdbResults = [];

for (const movie of movies) {
  const result = await searchMovieTMDB(movie.trim());
  tmdbResults.push(result);
}
        return res.status(200).json({success:true,message:"Movies recommended successfully",movies:tmdbResults});

    }catch(err){
        console.error(err);
        return res.status(400).json({success:false,message:err.message})
    }
})