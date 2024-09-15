import User from "../models/User.model";
import { Express, Request, Response} from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

export const signup = async(req: Request, res: Response) => {
    const detail = req.body;
    console.log(detail);

    try {
        const isexists = await User.findOne({email:detail.email});
        if(isexists) {
            res.json({
                message: "user already exists",
            }).status(500);
        }
        
        const hashedpass = await bcrypt.hash(detail.password,10);
        console.log(hashedpass);

        const newuser = {
            firstname: detail.firstname,
            lastname: detail.lastname,
            email: detail.email,
            password: hashedpass
        }

        console.log(newuser);

        const saveduser = await User.create(newuser);

        if(!process.env.TOKEN_SECRET) {
            return res.json({message:"internal server error"}).status(500);
        }

        const token = jwt.sign({id:saveduser._id},process.env.TOKEN_SECRET);
       
        return res.status(201).json({
            message: "user created sucessfully",
            saveduser: saveduser,
            token: token
        });
    } catch (error:any) {
        console.log("error in creating user", error.message);
        return res.status(500).json({
            message: "error while doing signup",
            error: error.message
        })
    }
}



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
        })
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
    
}






