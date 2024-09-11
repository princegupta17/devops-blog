import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import {
  createPost,
  getallPosts,
  getPostbyId,
  deletePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/create", auth, upload.single("image"), createPost);
router.get("/all", getallPosts);
router.get("/:id", getPostbyId);
router.delete("/:id", auth, deletePost);

export default router;
