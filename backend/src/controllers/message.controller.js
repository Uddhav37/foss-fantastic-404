import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";



export const getUsersForSidebar=async (req,res)=>{

  try{
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

    res.status(200).json(filterUsers);
  }catch(error){
    console.log("error is",error.message)
    res.status(500).json({message:"Internal Server Error"});
  }
  
}

export const getMessages= async (req,res) => {

  try{
    const {id:userToChatId } = req.params;
    const senderId = req.user._id;

    const messages= await Message.find({
      $or:[
        {
        senderId:myId,receiverId:userToChatId},
      {senderId:userToChatId,receiverId:myId}]
    })

    res.status(200).json({messages:"all thing done"})
  }catch(error){

    console.log("error is ",error.message)
    res.status(500).json({message:"Internal Server Error"})
  }
}

export const sendMessage= async (req,res) =>{
  try{

    const {text,image} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user_id;

    let imageUrl;
    if(image){

      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;

    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    //todo : realtime functionality goes her => socket.io

    res.status(201).json(newMessage);
  }catch(error){
    console.log("error is ", error.message);
    res.status(500).json({message:"internal server error"});
  }
  
}