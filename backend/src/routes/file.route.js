import express from "express";
import { uploadLimit } from "../middleware/uploadlimit.middleware.js";
import {upload, getTagFiles, showFileById} from "../controllers/file.controller.js";   
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/notes/upload", uploadLimit, upload)
router.get("/notes/tags/:courseCode", getTagFiles);
router.get("/notes/show/:id", showFileById);

export default router;