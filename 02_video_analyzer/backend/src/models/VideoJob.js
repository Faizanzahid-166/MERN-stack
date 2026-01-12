import mongoose from "mongoose";

const videoJobSchema = new mongoose.Schema(
  {
    originalVideo: {
      type: String,
      required: true,
    },
    finalVideo: {
      type: String,
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },
    voiceType: {
      type: String,
      default: "male",
    },
    musicType: {
      type: String,
      default: "tech",
    },
  },
  { timestamps: true }
);

export default mongoose.model("VideoJob", videoJobSchema);
