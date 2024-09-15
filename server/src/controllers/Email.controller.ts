import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOtpEmail = async (data: { email: string; otp: number; }) => {

  console.log(`Sending OTP to ${data.email} with OTP ${data.otp}`);
  
  try {
    const info = await transporter.sendMail({
      from: process.env.
      MAIL_HOST,
      to: data.email,
      subject: 'Your OTP Code for Verification',
      text: `Your OTP code is ${data.otp}. Please use this code to verify your email address.`,
      html: `
        <p>Hello,</p>
        <p>Your OTP code is <strong>${data.otp}</strong>. Please use this code to verify your email address.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Thank you!</p>
      `,
    });

    console.log('Email sent:', info.response);
    
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};
