import { Router } from "express";
import {
  register,
  login,
  logout,
  getUser,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/userProfile", auth, getUser);

export default router;
