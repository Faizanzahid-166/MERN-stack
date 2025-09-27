import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  img: { type: String },
  codelink: { type: String },
  projectlink: { type: String },
  category: { type: String },
}, { timestamps: true });

export const Project = mongoose.model("Project", projectSchema);
