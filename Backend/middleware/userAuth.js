const jwt=require("jsonwebtoken");
const userModel=require("../models/user");

const userAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            throw new Error("Invalid token");
        }
        const decodedObject=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decodedObject._id).select("-password");
      if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();


    }catch(err){
        return res.status(401).json({success:false,message:"failed to validate user : "+err.message});
    }
}

module.exports = userAuth;