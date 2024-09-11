import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { uploadoncloud } from "../utils/cloudinary.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email }); // Check if user exists
  if (userExists) {
    res.status(400);
    throw new Apierror(400, "User already exists");
  }
  if (!req.file) {
    res.status(500);
    throw new Apierror(501, "image is required");
  }
  const imagefilepath = req.file.path;
  const imageresponse = await uploadoncloud(imagefilepath);

  const user = await User.create({
    // Create user
    name,
    email,
    password,
    image: imageresponse.url,
  });

  const createdUser = await User.findById(user._id).select("-password"); // Return user without password

  if (!createdUser) {
    res.status(400);
    throw new Apierror(400, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }); // Check if user exists
  if (!user) {
    res.status(400);
    throw new Apierror(400, "No user exit with this email");
  }

  const isMatch = await bcrypt.compare(password, user.password); // Check if password matches
  if (!isMatch) {
    res.status(400);
    throw new Apierror(400, "Invalid password");
  }

  const accessToken = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  const loggedInUser = await User.findById(user._id).select("-password"); // Return user without password

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // Return user without password

  if (!user) {
    res.status(400);
    throw new Apierror(400, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User found"));
});

export { register, login, logout, getUser };
