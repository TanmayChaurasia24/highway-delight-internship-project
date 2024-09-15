import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOtpEmail = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  console.log(email,otp);
  
  try {
    await transporter.sendMail({
      from: '"Your App Name" <your-email@example.com>',
      to: email,
      subject: 'Your OTP Code for Verification',
      text: `Your OTP code is ${otp}. Please use this code to verify your email address.`,
      html: `
        <p>Hello,</p>
        <p>Your OTP code is <strong>${otp}</strong>. Please use this code to verify your email address.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Thank you!</p>
      `,
    });
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Failed to send OTP email' });
  }
};
