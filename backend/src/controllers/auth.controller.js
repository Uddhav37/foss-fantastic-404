import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req,res)=>{

  const{fullName,email,password} = req.body
  try{
    //hasing the password
    if(!fullName || !email || !password){
      return res.status(400).json({message:"all field are required"
      })
    }
    if(password.length < 8){
      return res.status(400).json({message:"password must be atleast 8 characters"});
    }

    const user = await User.findOne({email})

    if(user) return res.status(400).json({message:"user already exists"});

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User(
      {
        fullName,
        email,
        password:hashedPassword
      }
    )
    if(newUser){
      generateToken(newUser._id,res)
      await newUser.save();
      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic: newUser.profilePic,

      });

    }else{
      res.status(400).json({message:"invalid user data"});
    }

  }catch(error){
    console.log("Error in signup controller",error.message);
    res.status(400).json({message: "Internal Server Error"});
  }

}
export const login = async (req,res)=>{
  const {email,password} = req.body

  try{
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"invalid credential"})
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message:"invalid credential"})
    }

    generateToken(user._id,res)


    res.status(200).json({

      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic:user.profilePic
    });

  }catch(error){
    console.log("error",error.message)
    res.status(500).json({message:"Internal server error"
    });
  }

}
export const logout = (req,res)=>{
  try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
    
  }catch(error){
    console.log("error is",error.message)
    res.status(500).json({message:"Internal Server Error"})
  }

};

export const updateProfile= async (req,res)=>{
  
}