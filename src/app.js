import express from "express";
import mongoose from "mongoose";
import session from "express-session";  
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mcqRoutes from "./routes/mcqRoutes.js";
import loginRoutes from "./routes/login.routes.js"
import resultRoutes from "./routes/resultRoutes.js"

dotenv.config();
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",   // MUST match frontend
  credentials: true,                 // Allow cookies/sessions
}));

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SECRET_KEY || "fallback-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, 
      httpOnly: true,
      sameSite: "None",
      maxAge: 5 * 60 * 1000
    }
  })
);

app.use((req, res, next) => {
    console.log("Session Data:", req.session);
    next();
});


app.use(express.json());

app.use("/api/mcqs", mcqRoutes);
app.use("/api/login", loginRoutes); 
app.use("/api/results", resultRoutes);

export { app };

