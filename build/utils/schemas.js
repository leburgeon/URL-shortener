"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSchema = exports.newUrlSchema = void 0;
const zod_1 = require("zod");
// zod schema for validating request body contains the required attributes to add a new url
// Validates that the url field is the correct format for a url
exports.newUrlSchema = zod_1.z.object({
    url: zod_1.z.string().url()
});
exports.urlSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    shortUrl: zod_1.z.string(),
    created: zod_1.z.number()
});
