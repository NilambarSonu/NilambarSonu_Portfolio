import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import statsRouter from "./api/stats.js";

const app = express();
const PORT = 5000;
// Middleware
app.use(cors());
app.use(express.json());


const resend = new Resend(process.env.RESEND_API_KEY);

// API route for sending emails
app.post('/api/send', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Email template white, brown, and black colors
  const htmlEmailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Georgia', serif; background-color: #ffffff; color: #000000;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">

      <!-- Header -->
      <div style="text-align: center; padding: 40px 20px; background-color: #f5f5f5; border-bottom: 3px solid #8b4513;">
        <h1 style="color: #000000; font-size: 28px; margin: 0; font-weight: normal; font-family: 'Georgia', serif;">
          New Contact Message
        </h1>
        <p style="color: #654321; margin: 10px 0 0; font-size: 16px; font-style: italic;">
          From your portfolio website
        </p>
      </div>

      <!-- Main Content -->
      <div style="padding: 30px 20px; background-color: #ffffff; border: 1px solid #d2b48c;">

        <!-- Sender Details -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #000000; font-size: 20px; margin: 0 0 20px; padding-bottom: 10px; border-bottom: 2px solid #8b4513; font-weight: normal;">
            Visitor Information
          </h2>

          <div style="background-color: #fafafa; padding: 20px; border: 1px solid #d2b48c;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Name:</strong><br>
              <span style="color: #000000; font-size: 16px; font-weight: bold;">${name}</span>
            </div>

            <div>
              <strong style="color: #8b4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Email:</strong><br>
              <a href="mailto:${email}" style="color: #654321; font-size: 16px; text-decoration: none; border-bottom: 1px solid #654321;">${email}</a>
            </div>
          </div>
        </div>

        <!-- Message Content -->
        <div>
          <h2 style="color: #000000; font-size: 20px; margin: 0 0 20px; padding-bottom: 10px; border-bottom: 2px solid #8b4513; font-weight: normal;">
            Message
          </h2>

          <div style="background-color: #f9f9f9; padding: 25px; border: 1px solid #d2b48c; border-left: 4px solid #8b4513;">
            <div style="color: #000000; font-size: 16px; line-height: 1.6; white-space: pre-wrap; font-family: 'Georgia', serif;">
              ${message}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 30px 20px; background-color: #f5f5f5; border-top: 1px solid #d2b48c;">
        <p style="color: #654321; margin: 0; font-size: 14px; font-style: italic;">
          This message was sent from the contact form on your portfolio website
        </p>
        <div style="width: 60px; height: 2px; background-color: #8b4513; margin: 15px auto;"></div>
        <p style="color: #000000; margin: 10px 0 0; font-size: 12px;">
          Reply directly to this email to respond to ${name}
        </p>
      </div>
    </div>
  </body>
  </html>
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

// API Routes
app.use("/api/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`Development server running on http://localhost:${PORT}`);
});
