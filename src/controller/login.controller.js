import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function generateOtp() {
return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

async function sendOtp(email, otp) {
                    const mailOptions = {
        from: process.env.EMAIL, 
        to: email,                
        subject: '[The Turing Test 2025] Your One-Time Password (OTP) for login', 
        text: `Hello,

Your One-Time Password (OTP) for completing login for The Turing Test 2025 is:

 OTP: ${otp}

This code will expire in 3 minutes. Please do not share it with anyone for security reasons.

All the Best for your exam,
MLCOE Team`
    };

                    try {
                        await transporter.sendMail(mailOptions);
                        console.log(`OTP sent to email: ${email}`);
                        return true; 
                    } catch (error) {
                        console.error('Error sending OTP email:', error);
                        return false;
                    }
}

const loginStudent = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        throw new ApiError(400, "Name and email are required");
    }

    if (!email.endsWith('@akgec.ac.in')) {
        throw new ApiError(400, "Must Enter College Email Id Only");
    }


    // Generate OTP
    const otp = generateOtp();
    const otpExpiry = Date.now() + 3 * 60 * 1000; // 3 minutes

    // Store OTP in session
    req.session.otp = otp;
    req.session.otpExpiry = otpExpiry;
    req.session.userData = {
        name , email, otpExpiry
    };

    const otpSent = await sendOtp(email, otp);
    if (!otpSent) {
        throw new ApiError(500, "Failed to send OTP. Please try again.");
    }

    res.status(200).json(new ApiResponse(200, { email }, "OTP sent successfully. Please verify your email."));
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;

    // Validate request
    if (!otp) {
        throw new ApiError(400, "OTP is required");
    }

    // Check if OTP is correct
    if (req.session.otp != otp) {
        throw new ApiError(401, "Invalid OTP");
    }

    // Check if OTP has expired
    if (Date.now() > req.session.otpExpiry) {
        throw new ApiError(401, "OTP has expired");
    }

    // OTP is valid, proceed with login
    req.session.userData.verified = true;
    res.status(200).json(new ApiResponse(200, "OTP verified successfully. You are now logged in."));
});

export { loginStudent, verifyOtp };