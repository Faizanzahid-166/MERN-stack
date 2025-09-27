import mongoose from "mongoose";

const repoProjectSchema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  codelink: String,
  projectlink: String,
  category: String,
}, { timestamps: true });

export default mongoose.model("RepoProject", repoProjectSchema);
