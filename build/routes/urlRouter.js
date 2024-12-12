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
const schemas_1 = require("../utils/schemas");
const shortid_1 = __importDefault(require("shortid"));
const URL_1 = __importDefault(require("../models/URL"));
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const urlRouter = express_1.default.Router();
// Parser for the request body which validates that the body contains the required attributes for the newUrl
// Zod validates that the url string is in the correct format for a url
const newUrlParser = (req, _res, next) => {
    try {
        schemas_1.newUrlSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
// Route for handing adding a new url to the database
urlRouter.post('/shorten', newUrlParser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieves the url to shorted from the parsed request body
    const urlToShorten = req.body.url;
    try {
        const shortUrl = shortid_1.default.generate();
        const url = new URL_1.default({
            url: urlToShorten,
            shortUrl
        });
        yield url.save();
        console.log('saved!', url);
        res.status(200).send({
            url: url.url,
            shortUrl: url.shortUrl,
            created: url.created
        });
    }
    catch (error) {
        next(error);
    }
}));
// Route for retrieving a list of the urls in the database
urlRouter.get('/urls', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const urlDocs = yield URL_1.default.find({});
    console.log('found');
    try {
        const urls = urlDocs.map(doc => {
            const url = schemas_1.urlSchema.parse({
                url: doc.url,
                shortUrl: doc.shortUrl,
                created: doc.created.toString()
            });
            return url;
        });
        res.status(200).send(urls);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}));
const errorHandler = (error, _req, res, next) => {
    // For responding with the zod issues if the request was not valid
    if (error instanceof zod_1.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else if (error instanceof mongoose_1.default.Error.ValidationError) {
        res.status(400).send({ error: error.message });
    }
    else {
        next(error);
    }
};
urlRouter.use(errorHandler);
exports.default = urlRouter;
