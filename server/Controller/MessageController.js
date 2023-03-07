import MessageModel from "../Models/messageModel.js";

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new MessageModel({ chatId, senderId, text });

  try {
    const result = await message.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
