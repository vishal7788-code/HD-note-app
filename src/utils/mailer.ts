import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config({})

const transporter = nodemailer.createTransport({
  service:"gmail",
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  auth: {
    user: process.env.GMAIL_USER as string,
    pass: process.env.GMAIL_APP_PASSWORD as string,
  },
});
// send otp to user
export const sendOtpEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const sendOtp = {
    from: process.env.GMAIL_USER as string,
    to: email,
    subject: "Your OTP for Signup",
    text: `Your One-Time Password (OTP) for accessing your HD Note Making App account is: ${otp}.
            
    Please use this OTP within 10 minutes. Do not share it with anyone.

    Thank you,

    HD Note App Team`,
  };
  try {
    await transporter.sendMail(sendOtp);

  } catch (error) {
      console.error("Error sending OTP email", error);
  }
};
