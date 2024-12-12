import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined as an environment variable');
}
if (!PORT) {
    throw new Error('MONGODB_URL is not defined as an environment variable');
}
export default { PORT, MONGODB_URL };
