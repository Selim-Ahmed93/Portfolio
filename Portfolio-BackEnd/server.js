import "dotenv/config";

import express from "express";
import Contact from "./models/contact.js";
import { connectDB } from "./config/db.js";
import transporter from "./config/mail.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "https://portfolio-puce-eight-63.vercel.app"
}));
app.use(express.json());

const port = process.env.PORT || 5000;

// Home route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Contact API
app.post("/api/contact", async (req, res) => {
  try {
    // Check request body
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        message: "Request body is required",
      });
    }

    const { name, email, message, subject } = req.body;

    // Required fields validation
    if (!name || !email || !message || !subject) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // String validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      typeof subject !== "string"
    ) {
      return res.status(400).json({
        message: "All fields must be text",
      });
    }

    // Empty field validation
    if (!name.trim() || !email.trim() || !message.trim() || !subject.trim()) {
      return res.status(400).json({
        message: "Fields cannot be empty or whitespace",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Save contact information
    const contact = new Contact({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await contact.save();

    console.log("Contact information saved successfully");

    // Send email notification
    let emailSent = false;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email.trim(),
        subject: `New Contact Form Submission: ${subject.trim()}`,
        text: `
Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${subject.trim()}

Message:
${message.trim()}
                `,
      });

      emailSent = true;

      console.log("Email notification sent successfully");
    } catch (emailError) {
      console.error("Email notification failed:", emailError.message);
    }

    // Success response
    return res.status(201).json({
      message: "Contact information submitted successfully",
      emailSent,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return res.status(500).json({
      message: "Something went wrong while submitting your message",
    });
  }
});

// Start server
async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();

