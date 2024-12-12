import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  created: {
    type: String,
    default: Date.now
  }
})

export default mongoose.model('url', urlSchema)