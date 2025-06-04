"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
exports.router = router;
// router.get('/', (req: Request, res: Response) => {
//   res.send('User route root');
// });
router.get('/', userController_1.getUsers);
router.post('/', userController_1.addUser);
