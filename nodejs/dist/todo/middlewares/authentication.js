"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const passport_http_1 = require("passport-http");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../../todo/config.env') });
console.log(__dirname);
passport_1.default.use(new passport_http_1.BasicStrategy((username, password, done) => {
    const validUsername = process.env.BASIC_AUTH_USERNAME;
    const validPassword = process.env.BASIC_AUTH_PASSWORD;
    //const validUsername = "adm";
    //const validPassword = "psw";
    if (username !== validUsername || password !== validPassword) {
        return done(null, false);
    }
    // If credentials are valid, return user object
    return done(null, { username });
}));
exports.default = passport_1.default;
