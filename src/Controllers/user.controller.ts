import { User } from "../Models/user.model";
import { Request, Response } from "express";
import { generateOtp } from "../utils/otp";
import { sendOtpEmail } from "../utils/mailer";

const otpStore: Map<string, { otp: string; expiresAt: Date }> = new Map();

export const signup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // to check that all fileds are provided
    const { name, email, dateOfBirth, otp } = req.body;
    if (!name || !email || !dateOfBirth) {
       res.status(400).json({
        message: "Please provide all the required fields",
        success: false,
      });
      return;
    }
    // to check if user already exists
    const user = await User.findOne({ email });
// code to check OTP validation and expiry
    if (otp) {
      const storedOtp = otpStore.get(email);

      if (!storedOtp) {
         res.status(400).json({
          message: "Please provide a valid OTP",
          success: false,
        });
        return;
      }
    
      if (storedOtp.otp !== otp) {
         res.status(400).json({
          message: "Invalid or expired OTP",
          success: false,
        });
        return;
      }
      if (storedOtp.expiresAt < new Date()) {
        otpStore.delete(email); // Delete expired OTP
         res.status(400).json({
          message: "OTP has expired. Please request a new one.",
          success: false,
        });
        return;

    }
      if (user) {
         res.status(400).json({
          message: "Email already exists",
          success: false,
        });
        return;
      }

      await User.create({
        name,
        email,
        dateOfBirth,
      });
      otpStore.delete(email);
       res.status(201).json({
        message: "User created successfully",
        success: true,
      });
      return;
    } 
        // to generate OTP and send it to user
         
        const generatedOtp : string = generateOtp();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        otpStore.set(email, {otp:generatedOtp, expiresAt})
        await sendOtpEmail(email, generatedOtp);
         res.status(200).json({
            message: "OTP sent to your email",
            success: true,
        });
        return;

    
  } catch (error) {
    console.error("Signup error", (error as Error).message);
     res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
    return;
  }
};
