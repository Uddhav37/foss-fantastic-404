import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "ChatUser", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "ChatUser", required: true },
    text: { type: String },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" }, // Message status tracking
  },
  { timestamps: true }
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
export default ChatMessage;
