import express from "express";
import { uploadLimit } from "../middleware/uploadlimit.middleware.js";
import {upload, showFile} from "../controllers/file.controller.js";   
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/notes/upload", uploadLimit, upload)
router.get("/notes/:courseCode", showFile);

export default router;