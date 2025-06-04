"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = require("./routes/userRoute");
const app = (0, express_1.default)();
// Validation middleware for /user path
function validateUser(req, res, next) {
    if (req.method === 'POST') {
        const user = req.body;
        if (!user.name || !user.email) {
            res.status(400).json({ error: 'Name and email are required.' });
            return;
        }
        if (typeof user.age !== 'number') {
            res.status(400).json({ error: 'age must be number' });
            return;
        }
    }
    next();
}
app.use(express_1.default.json());
app.use('/user', validateUser, userRoute_1.router);
app.listen(3008, () => {
    console.log('Server is running on port 3008');
});
exports.default = app;
