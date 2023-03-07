import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Get User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.json(otherDetails);
    } else {
      res.status(404).json({ error: "User Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;

  try {
    if (id === _id) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ user, token });
    } else {
      res.status(403).json({ error: "Access Denied!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  try {
    if (currentUserId === id || currentUserAdminStatus) {
      await UserModel.findByIdAndDelete(id);
      res.json({ message: "User Deleted Successfully!" });
    } else {
      res.status(403).json({ error: "Access Denied!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Follow a user
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  try {
    if (_id === id) {
      res.status(403).json("Action Forbidden");
    } else {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.follower.includes(_id)) {
        await followUser.updateOne({ $push: { follower: _id } });

        await followingUser.updateOne({
          $push: {
            following: id,
          },
        });
        res.json("User Followed");
      } else {
        res.status(403).json("User is already followed by you!");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unfollow User
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  try {
    if (_id === id) {
      res.status(403).json("Action Forbidden");
    } else {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.follower.includes(_id)) {
        await followUser.updateOne({ $pull: { follower: _id } });

        await followingUser.updateOne({
          $pull: {
            following: id,
          },
        });
        res.json("User Unfollowed");
      } else {
        res.status(403).json("User is not followed by you!");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
