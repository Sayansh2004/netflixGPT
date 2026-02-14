const mongoose=require("mongoose");

const connectDb=async()=>{
    try{
 await mongoose.connect(process.env.MONGOURI);
 console.log("connected to database successfully");
    }catch(err){
        throw new Error("Failed to connect : "+err.message);
        process.exit(1);
    }
   
}

module.exports=connectDb;