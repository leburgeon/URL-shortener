import mongoose from "mongoose"
import config from "./config"

const connectToDb = async () => {
  await mongoose.connect(config.MONGODB_URL)
}

export {connectToDb}