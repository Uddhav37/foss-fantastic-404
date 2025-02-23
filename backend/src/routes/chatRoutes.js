import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
  getChatUsers, 
  getChatMessages, 
  sendChatMessage, 
  updateMessageStatus 
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getChatUsers);
router.get("/:id", protectRoute, getChatMessages);
router.post("/send/:id", protectRoute, sendChatMessage);
router.put("/status/:messageId", protectRoute, updateMessageStatus); // New route for status updates

export default router;
