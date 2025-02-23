import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next) =>{
  const token = req.cookies.jwt
  try{
    if(!token){
      return res.status(401).json({message:"unauthorized no token provided"});
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({message:"unauthorized no token provided"});
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
      return res.status(401).json({message:"unauthorized no token provided"});
    }

    req.user = user;

    next();

  }catch(error){
    console.log("error in the protected router middleware",error.message)
  }
}

