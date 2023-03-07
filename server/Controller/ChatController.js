import ChatModel from "../Models/chatModel.js";
import MessageModel from "../Models/messageModel.js";

// Create Chat
export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const result = await newChat.save();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const userChat = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error });
  }
};
