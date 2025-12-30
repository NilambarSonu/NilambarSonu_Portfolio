import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// API route for sending emails
app.post('/api/send', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Your beautiful HTML template
  const htmlEmailTemplate = `
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #0a0a0a; color: #c4c4c4;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">

      <div style="padding: 20px 0; text-align: center;">
        <h1 style="color: #00ff9d; font-family: 'Orbitron', Arial, sans-serif; margin: 0; font-size: 26px;">
          New Contact Form Message
        </h1>
        <p style="color: #c4c4c4; margin: 5px 0 0; font-size: 16px;">from your portfolio</p>
      </div>

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

        <div style="background-color: #0a0a0a; padding: 20px; border-radius: 5px; font-size: 16px; line-height: 1.7; color: #e0e0e0; border: 1px solid #00ff9d;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>

      <div style="text-align: center; padding: 20px; font-size: 12px; color: #777;">
        <p>This email was sent from the contact form on your portfolio website.</p>
      </div>

    </div>
  </body>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO],
      reply_to: email,
      subject: `Portfolio Message from ${name}`,
      html: htmlEmailTemplate,
    });

    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: 'Message sent successfully!' });
  } catch (error) {
    console.error('EMAIL FAILED:', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Development server running on http://localhost:${PORT}`);
});
