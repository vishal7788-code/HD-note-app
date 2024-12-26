import { Request, Response } from "express";
import { generateOtp } from "../utils/otp";
import { sendOtpEmail } from "../utils/mailer";

const otpStore: Map<string, { otp: string; expiresAt: Date }> = new Map();

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        message: "Email is required.",
        success: false,
      });
      return;
    }

    //To generate OTP
    const generatedOtp: string = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    // Store OTP in memory
    otpStore.set(email, { otp: generatedOtp, expiresAt });

    await sendOtpEmail(email, generatedOtp);

    res.status(200).json({
      message: "OTP sent to your email.",
      success: true,
    });
  } catch (error) {
    console.error("Error in sendOtp:", (error as Error).message);
    res.status(500).json({
      message: "Something went wrong while sending the OTP.",
      success: false,
    });
  }
};

export { otpStore };
