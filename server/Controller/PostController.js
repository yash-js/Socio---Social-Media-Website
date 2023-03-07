import mongoose from "mongoose";
import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";

// Create Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Post
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json("Post Not Found");
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.json("Post Updated");
    } else {
      res.status(403).json("Access Denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.json("Post Deleted Successfully!");
    } else {
      res.status(403).json("Access Denied");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like and Dislike

export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post && post.likes && !post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.json("Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.json("Disliked");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Timeline Post
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
