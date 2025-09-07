import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar: {
      type: String, // URL from Cloudinary
      default: "",  // keep empty until uploaded
    },
    address: {
      type: String,
      default: "",  // optional
    }
},{timestamps:true})

const User= mongoose.model("User",userSchema);
export default User;