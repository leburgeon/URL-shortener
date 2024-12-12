"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cache_1 = __importDefault(require("../cache"));
const URL_1 = __importDefault(require("../models/URL"));
const redirectRouter = express_1.default.Router();
redirectRouter.get('/:shortUrl', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortUrl } = req.params;
    try {
        // Attempts to retrieve the url from the cache and redirect to it
        const fromCache = cache_1.default.get(shortUrl);
        if (fromCache && typeof fromCache === 'string') {
            console.log('Cache money hit!');
            res.redirect(fromCache);
        }
        else {
            // If no url is found in the cache, a call is made to the database
            const url = yield URL_1.default.findOne({ shortUrl });
            if (url) {
                // The url is put into the cache and redirected to it
                cache_1.default.set(url.shortUrl, url.url);
                console.log('cache money set!');
                res.redirect(url.url);
            }
            else {
                // If no url found in database either, error message sent
                res.status(400).send({ error: 'Short url not found' });
            }
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = redirectRouter;
