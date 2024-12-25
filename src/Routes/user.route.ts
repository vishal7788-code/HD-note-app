import express from 'express'
import { signup } from '../Controllers/user.controller'


const router = express.Router();

router.route("/signup").post(signup);

export default router;