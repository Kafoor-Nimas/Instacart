import { Router } from "express";
import { handleChat } from "../controllers/chat.controller.js";
import auth from "../middleware/auth.js";

const router: Router = Router();

// Endpoint: POST /api/chat/message
router.post("/message", auth, handleChat);

export default router;
