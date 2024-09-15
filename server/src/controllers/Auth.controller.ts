import User from "../models/User.model";
import { Express, Request, Response} from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { sendOtpEmail } from "./Email.controller";

export const signup = async (req: Request, res: Response) => {
    const detail = req.body;
    console.log(detail);

    try {
        // Check if user already exists
        const isExists = await User.findOne({ email: detail.email });
        if (isExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Send OTP email
        await sendOtpEmail({ email: detail.email, otp: 122331 });

        // Hash the password
        const hashedPass = await bcrypt.hash(detail.password, 10);
        console.log(hashedPass);

        // Create new user
        const newUser = {
            firstname: detail.firstname,
            lastname: detail.lastname,
            email: detail.email,
            password: hashedPass,
        };

        console.log(newUser);

        const savedUser = await User.create(newUser);

        // Check for token secret
        if (!process.env.TOKEN_SECRET) {
            return res.status(500).json({ message: "Internal server error" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET);

        // Respond with success
        return res.status(201).json({
            message: "User created successfully",
            savedUser: savedUser,
            token: token,
            status: 200,
        });
    } catch (error: any) {
        console.error("Error in creating user", error.message);
        return res.status(500).json({
            message: "Error while signing up",
            error: error.message,
        });
    }
};




export const login = async(req: Request, res: Response) => {
    const detail = req.body;
    console.log(detail);

    try {
        const isexists = await User.findOne({email:detail.email});
        if(!isexists) {
            return res.status(500).json({
                message: "user does not exists",
                success: false
            })
        }

        const checkpass = await bcrypt.compare(detail.password,isexists.password)

        if(!checkpass) {
            return res.status(500).json({
                message: "password is incorrect",
                success: false
            });
        }

        const token = jwt.sign({_id:isexists._id},process.env.TOKEN_SECRET!,{
            expiresIn: "24h"
        })
        
        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 24*60*60
        });

        res.status(201).json({
            message: "login success",
            success: true,
            user: isexists
        })
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
    
}






