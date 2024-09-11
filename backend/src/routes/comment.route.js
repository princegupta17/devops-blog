import { Router } from "express";
import {
  createComment,
  getComments,
} from "../controllers/comment.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:id", auth, createComment);
router.get("/:id", getComments);

export default router;
