"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urlRouter_1 = __importDefault(require("./routes/urlRouter"));
const redirectUrl_1 = __importDefault(require("./routes/redirectUrl"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('dist'));
app.use('/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api', urlRouter_1.default);
app.use(redirectUrl_1.default);
exports.default = app;
