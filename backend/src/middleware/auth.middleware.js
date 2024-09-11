import { asyncHandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const auth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    res.status(401);
    throw new Apierror(401, "No token, authorization denied");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // Verify token
    const user = await User.findById(decoded?.userId).select("-password"); // Get user
    if (!user) {
      res.status(404);
      throw new Apierror(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Apierror(401, "Token is not valid");
  }
});

export { auth };
