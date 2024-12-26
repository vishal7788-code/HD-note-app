import { User } from "../Models/user.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { otpStore } from "../utils/send-otp";

// Signup Functionality
export const signup = async (req: Request, res: Response): Promise<void> => {
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

      const newUser = await User.create({
        name,
        email,
        dateOfBirth,
      });

      // to create JWT token

      const tokenData = {
        userId: newUser.id,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1d",
      });
      otpStore.delete(email);
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          message: `Signup successfull.`,
          user: {
            name,
            email,
          },
          token,
          success: true,
        });
      return;
    }
  } catch (error) {
    console.error("Signup error", (error as Error).message);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
    return;
  }
};
// Login Functionality
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    if (!email) {
      res.status(400).json({
        message: "Please provide all the required fields",
        success: false,
      });
      return;
    }
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Email not found.",
        success: false,
      });
      return;
    }

    const storedOtp = otpStore.get(email);
    if (otp) {
      if (!storedOtp) {
        res.status(400).json({
          message: "OTP not found.",
        });
        return;
      }

      if (storedOtp.otp !== otp) {
        res.status(400).json({
          message: "Invalid OTP.",
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
      // to create JWT token
      const tokenData = {
        userId: user.id,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1d",
      });
      otpStore.delete(email);
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          message: `Welcome back ${user.name}.`,
          user: {
            name: user.name,
            email: user.email,
          },
          token,
          success: true,
        });

      return;
    }
  } catch (error) {
    console.error("Signin error", (error as Error).message);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
    return;
  }
};

// Logout functionality
export const signout = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {}
};
