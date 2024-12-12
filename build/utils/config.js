"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined as an environment variable');
}
if (!PORT) {
    throw new Error('MONGODB_URL is not defined as an environment variable');
}
exports.default = { PORT, MONGODB_URL };
