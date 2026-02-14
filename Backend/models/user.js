const mongoose=require("mongoose");
const validator=require("validator");


const userSchema=new mongoose.Schema({
    name:{
        type:String,require:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error("please enter a valid email address");
            }
        }
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("User",userSchema);