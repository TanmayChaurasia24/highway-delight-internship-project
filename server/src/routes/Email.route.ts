import express from "express";
import { sendOtpEmail } from "../controllers/Email.controller";

const router = express.Router();

router.post('/verifyemail', sendOtpEmail);

export default router;
