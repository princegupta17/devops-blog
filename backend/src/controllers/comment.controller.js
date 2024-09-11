import { ApiResponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

const createComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id } = req.params;

  if (!content) {
    throw new Apierror(400, "Content is required");
  }

  const comment = new Comment({
    user: req.user._id,
    post: id,
    content,
  });

  await comment.save();
  if (!comment) {
    throw new Apierror(400, "Something went wrong while creating comment");
  }

  await Post.findByIdAndUpdate(id, { $push: { comments: comment._id } });

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});

const getComments = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const comments = await Comment.find({ post: id }).populate(
    "user",
    "name image"
  );
  if (!comments) {
    throw new Apierror(400, "No comments found");
  }
  return res.status(200).json(new ApiResponse(200, comments, "All comments"));
});

export { createComment, getComments };
