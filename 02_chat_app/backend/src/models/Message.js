import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: String,        // room id
    sender: String,        // userId
    receiver: String,      // userId
    text: String
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
