import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Register New User
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const newUser = new UserModel(req.body);

  const { username } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (userExists)
    return res.status(400).json({ message: "Username already registered" });

  try {
    const user = await newUser.save();
    const token = await jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) return res.status(400).json("Invalid Credentials");
      const token = await jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ user, token });
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
