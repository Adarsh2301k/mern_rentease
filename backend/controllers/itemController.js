import item from "../models/itemModel.js";
import User from "../models/userModel.js";

export const addItem=async(req,res)=>{
    const {name,price,category,description}=req.body;
    if(!name || !price ||!category){
        return res.status(400).json({message:"Please fill all fields"})
    }
    try{
        
    }
}