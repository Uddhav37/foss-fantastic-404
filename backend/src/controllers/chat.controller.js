import ChatMessage from "../models/chatMessage.model.js";
import ChatUser from "../models/chatUser.model.js";

/**
 * Get all chat users except the logged-in user.
 */
export const getChatUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await ChatUser.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat users" });
  }
};

/**
 * Fetch all messages between two chat users.
 */
export const getChatMessages = async (req, res) => {
  try {
    const { id: chatPartnerId } = req.params;
    const senderId = req.user._id;

    const messages = await ChatMessage.find({
      $or: [
        { senderId, receiverId: chatPartnerId },
        { senderId: chatPartnerId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat messages" });
  }
};

/**
 * Send a chat message.
 */
export const sendChatMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const newMessage = new ChatMessage({ senderId, receiverId, text, status: "sent" });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending chat message" });
  }
};

/**
 * Update message status (delivered/read).
 */
export const updateMessageStatus = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { status } = req.body; // "delivered" or "read"

    const updatedMessage = await ChatMessage.findByIdAndUpdate(
      messageId,
      { status },
      { new: true }
    );

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: "Error updating message status" });
  }
};
