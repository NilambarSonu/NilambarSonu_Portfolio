import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express, { type Request, type Response } from 'express';
import nodemailer from 'nodemailer';

// FIX: Load dotenv here to ensure variables are set
import dotenv from 'dotenv';
dotenv.config();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function registerRoutes(app: Express): Promise<Server> {

  const apiRouter = express.Router();

  apiRouter.post('/send', async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // --- NEW AESTHETIC HTML TEMPLATE (v2) ---
    // Added bright neon borders and more neon text
    const htmlEmailTemplate = `
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #0a0a0a; color: #c4c4c4;">
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="padding: 20px 0; text-align: center;">
      <h1 style="color: #00ff9d; font-family: 'Orbitron', Arial, sans-serif; margin: 0; font-size: 26px;">
        New Contact Form Message
      </h1>
      <p style="color: #c4c4c4; margin: 5px 0 0; font-size: 16px;">from your portfolio</p>
    </div>

    <!-- Content Body -->
    <!-- This is the main card. Added a 2px neon border -->
    <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 2px solid #00ff9d;">
      
      <h2 style="color: #00ff9d; font-size: 20px; margin-top: 0; border-bottom: 1px solid #444; padding-bottom: 10px;">
        Sender Details
      </h2>
      
      <p style="font-size: 16px; line-height: 1.6;">
        <strong style="color: #00ff9d; min-width: 80px; display: inline-block;">Name:</strong>
        <span style="color: #ffffff;">${name}</span>
      </p>
      
      <p style="font-size: 16px; line-height: 1.6;">
        <strong style="color: #00ff9d; min-width: 80px; display: inline-block;">Email:</strong>
        <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a>
      </p>
      
      <hr style="border: 0; border-top: 1px solid #444; margin: 25px 0;">

      <h2 style="color: #00ff9d; font-size: 20px; margin-top: 0;">
        Message
      </h2>
      
      <!-- This is the message box. Added a 1px neon border -->
      <div style="background-color: #0a0a0a; padding: 20px; border-radius: 5px; font-size: 16px; line-height: 1.7; color: #e0e0e0; border: 1px solid #00ff9d;">
        ${message.replace(/\n/g, '<br>')}
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 20px; font-size: 12px; color: #777;">
      <p>This email was sent from the contact form on your portfolio website.</p>
    </div>

  </div>
</body>
    `;
    // --- END OF TEMPLATE (v2) ---

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Send *from* your email
      replyTo: email, // Set 'reply-to' to the user's email
      to: process.env.EMAIL_TO,
      subject: `Portfolio Message from ${name}`,
      html: htmlEmailTemplate,
    };
    res.status(200).json({ success: 'Message sent successfully!' });
    transporter.sendMail(mailOptions)
      .then(() => {
        console.log('Background email send successful.');
      })
      .catch((error) => {
        console.error('BACKGROUND EMAIL FAILED:', error);
      });

  }); // end apiRouter.post

  app.use('/api', apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}