import mongoose from "mongoose";
import config from "./config.js";
const connectToDb = async () => {
    await mongoose.connect(config.MONGODB_URL);
};
export { connectToDb };
