import express from 'express'
import { signin, signout, signup } from '../Controllers/user.controller'
import { sendOtp } from '../utils/send-otp';


const router = express.Router();

router.route("/signup/send-otp").post(sendOtp);
router.route("/signin/send-otp").post(sendOtp);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/signout").post(signout);

export default router;