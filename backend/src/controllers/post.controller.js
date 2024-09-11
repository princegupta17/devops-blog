import { ApiResponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { uploadoncloud } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new Apierror(400, "All fields are required");
  }
  const imagefilepath = req.file.path;
  if (!imagefilepath) {
    throw new Apierror(400, "Image is required");
  }

  const imageresponse = await uploadoncloud(imagefilepath);

  const post = new Post({
    user: req.user._id,
    title,
    content,
    image: imageresponse.url,
  });
  await post.save();
  if (!post) {
    throw new Apierror(400, "Something went wrong while creating post");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

const getallPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .populate("user", "name image")
    .populate("comments");
  if (!posts) {
    throw new Apierror(400, "No posts found");
  }
  return res.status(200).json(new ApiResponse(200, posts, "All posts"));
});

const getPostbyId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid post ID" });
  }

  const post = await Post.findById(id)
    .populate("user", "name image")
    .populate("comments");
  if (!post) {
    throw new Apierror(400, "No post found");
  }
  return res.status(200).json(new ApiResponse(200, post, "Post"));
});

const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid post ID" });
  }

  const deletedPost = await Post.findByIdAndDelete(id);
  await Comment.deleteMany({ post: id });
  if (!deletedPost) {
    throw new Apierror(400, "No post found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Post and all comments associated with this post are deleted"
      )
    );
});

export { createPost, getallPosts, getPostbyId, deletePost };
