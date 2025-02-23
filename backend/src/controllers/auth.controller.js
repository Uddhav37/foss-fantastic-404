// import cloudinary from "../lib/cloudinary.js";
// import { generateToken } from "../lib/utils.js";
// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs"

// export const signup = async (req,res)=>{

//   const{fullName,email,password} = req.body
//   console.log(req.body);
//   try{
//     //hasing the password
//     if(!fullName || !email || !password){
//       return res.status(400).json({message:"all field are required"
//       })
//     }
//     if(password.length < 8){
//       return res.status(400).json({message:"password must be atleast 8 characters"});
//     }

//     const user = await User.findOne({email})

//     if(user) return res.status(400).json({message:"user already exists"});

//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password,salt);

//     const newUser = new User(
//       {
//         fullName,
//         email,
//         password:hashedPassword
//       }
//     )
//     if(newUser){
//       generateToken(newUser._id,res)
//       await newUser.save();
//       res.status(201).json({
//         _id:newUser._id,
//         fullName:newUser.fullName,
//         email:newUser.email,
//         profilePic: newUser.profilePic,

//       });

//     }else{
//       res.status(400).json({message:"invalid user data"});
//     }

//   }catch(error){
//     console.log("Error in signup controller",error.message);
//     res.status(400).json({message: "Internal Server Error"});
//   }

// }
// export const login = async (req,res)=>{
//   const {email,password} = req.body

//   try{
//     const user = await User.findOne({email})
//     if(!user){
//       return res.status(400).json({message:"invalid credential"})
//     }
//     const isPasswordCorrect=await bcrypt.compare(password,user.password);
//     if(!isPasswordCorrect){
//       return res.status(400).json({message:"invalid credential"})
//     }

//     generateToken(user._id,res)


//     res.status(200).json({

//       _id:user._id,
//       fullName:user.fullName,
//       email:user.email,
//       profilePic:user.profilePic
//     });

//   }catch(error){
//     console.log("error",error.message)
//     res.status(500).json({message:"Internal server error"
//     });
//   }

// }
// export const logout = (req,res)=>{
//   try{
//     res.cookie("jwt","",{maxAge:0})
//     res.status(200).json({message:"Logged out successfully"})
    
//   }catch(error){
//     console.log("error is",error.message)
//     res.status(500).json({message:"Internal Server Error"})
//   }

// };

// export const updateProfile= async (req,res)=>{
//   try{
//     const {profilePic}=req.body;
//     const userId= req.user._id;
//     if(!profilePic){
//       return res.status(400).json({message: "profile pic required"});

//     }
//     const uploadResponse=await cloudinary.uploader.upload(profilePic)
//     const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
//     res.status(200).json({message:updateUser})
//   }catch (error){

//   }
// };

// export const checkAuth=(req,res)=>{
//   try{
//      res.status(200).json(req.user);
//   }catch(error){
//     console.log("Error in checkAuth controller",error.message)
//     res.status(500).json({message:"Internal Server Error"})

//   }
// }

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import ChatUser from "../models/chatUser.model.js"; // Import ChatUser model
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;


  try {
    // Validations
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ fullName, email, password: hashedPassword });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      // Also create an entry in ChatUser
      const chatUserExists = await ChatUser.findOne({ username: fullName });
      if (!chatUserExists) {
        await ChatUser.create({
          username: fullName,
          password: hashedPassword, // Store the hashed password in ChatUser
          online: false, // Set default status to offline
        });
      }

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the entered password matches the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    // Check if the user exists in ChatUser DB
    let chatUser = await ChatUser.findOne({ username: user.fullName });

    if (!chatUser) {
      // If ChatUser doesn't exist, create a new entry with the same hashed password
      chatUser = await ChatUser.create({
        username: user.fullName,
        password: user.password, // Use the already hashed password from User collection
        online: true, // Mark as online
      });
    } else {
      // If user exists, update online status to true
      await ChatUser.findOneAndUpdate({ username: user.fullName }, { online: true });
    }


    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("User attempting to log out:", req.user);

    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });

    if (req.user && req.user.fullName) {
      // Fix: Use `username` instead of `fullName`
      const updatedChatUser = await ChatUser.findOneAndUpdate(
        { username: req.user.fullName }, // Use `username` instead
        { online: false }, // Set online status to false
        { new: true }
      );

      if (!updatedChatUser) {
        console.error("ChatUser not found or update failed");
        return res.status(404).json({ message: "ChatUser not found" });
      }

      console.log("ChatUser status updated successfully:", updatedChatUser);
    } else {
      console.error("req.user.fullName is not defined");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json({ message: updatedUser });
  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update the chatUser status to online
    await ChatUser.findOneAndUpdate({ username: req.user.fullName }, { online: true });

    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
