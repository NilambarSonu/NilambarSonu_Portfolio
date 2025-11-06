import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// This is the main serverless function handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // We only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- 1. RANDOM THEME PICKER ---
  // We define our list of neon themes here
  const themes = [
    { color: '#00ff9d' }, // Neon Green (your original)
    { color: '#00c6ff' }, // Neon Blue
    { color: '#ff00f7' }, // Neon Pink
    { color: '#fffb00' }, // Neon Yellow
    { color: '#ff7f00' }, // Neon Orange
    { color: '#00ffff' }, // Cyan
  ];
  
  // Pick a random theme from the array
  const theme = themes[Math.floor(Math.random() * themes.length)];
  // --- END OF THEME PICKER ---


  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  
  // --- 2. NEW MOBILE-FRIENDLY HTML TEMPLATE ---
  // All instances of '#00ff9d' are replaced with `${theme.color}`
  // The layout is now two separate cards, not nested.
  const htmlEmailTemplate = `
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #0a0a0a; color: #c4c4c4;">
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="padding: 20px 0; text-align: center;">
      <h1 style="color: ${theme.color}; font-family: 'Orbitron', Arial, sans-serif; margin: 0; font-size: 26px;">
        New Contact Form Message
      </h1>
      <p style="color: #c4c4c4; margin: 5px 0 0; font-size: 16px;">from your portfolio</p>
    </div>

    <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 2px solid ${theme.color};">
      
      <h2 style="color: ${theme.color}; font-size: 20px; margin-top: 0; border-bottom: 1px solid #444; padding-bottom: 10px;">
        Sender Details
      </h2>
      
      <p style="font-size: 16px; line-height: 1.6; word-break: break-all;">
        <strong style="color: ${theme.color}; min-width: 80px; display: inline-block;">Name:</strong>
        <span style="color: #ffffff;">${name}</span>
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; word-break: break-all;">
        <strong style="color: ${theme.color}; min-width: 80px; display: inline-block;">Email:</strong>
        <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a>
      </p>
    </div>

    <div style="height: 20px; font-size: 20px; line-height: 20px;">&nbsp;</div>

    <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 2px solid ${theme.color};">
      <h2 style="color: ${theme.color}; font-size: 20px; margin-top: 0; border-bottom: 1px solid #444; padding-bottom: 10px;">
        Message
      </h2>
      
      <p style="font-size: 16px; line-height: 1.7; color: #e0e0e0; margin: 0; word-break: break-word;">
        ${message.replace(/\n/g, '<br>')}
      </p>
    </div>

    <div style="text-align: center; padding: 20px; font-size: 12px; color: #777;">
      <p>This email was sent from the contact form on your portfolio website.</p>
    </div>

  </div>
</body>
  `;
  // --- END OF NEW TEMPLATE ---

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_TO,
    subject: `Portfolio Message from ${name}`,
    html: htmlEmailTemplate,
  };

  try {
    // Await the email send
    await transporter.sendMail(mailOptions);
    // Send a success response
    return res.status(200).json({ success: 'Message sent successfully!' });
  } catch (error) {
    console.error('EMAIL FAILED:', error);
    // Send an error response
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}