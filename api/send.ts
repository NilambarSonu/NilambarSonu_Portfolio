import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// NOTE: Vercel handles environment variables automatically.
// Setup Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// This is the main serverless function handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // We only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  
  // Professional email template using table-based layout for better email client compatibility
  const htmlEmailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Message</title>
      <style>
          /* Reset styles for email client compatibility */
          body { margin: 0; padding: 0; background-color: #f6f3ef; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
          table { border-collapse: collapse; width: 100%; }

          /* Responsive styles */
          @media screen and (max-width: 600px) {
              .container { width: 100% !important; }
              .content-padding { padding: 20px !important; }
          }
      </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f6f3ef;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f3ef; padding: 40px 0;">
          <tr>
              <td align="center">

                  <table border="0" cellpadding="0" cellspacing="0" class="container" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">

                      <tr>
                          <td height="8" style="background-color: #8B5E3C;"></td>
                      </tr>

                      <tr>
                          <td class="content-padding" style="padding: 40px 40px 20px 40px; text-align: center;">
                              <h1 style="margin: 0; color: #333333; font-family: 'Georgia', serif; font-size: 24px; font-weight: normal;">New Portfolio Inquiry</h1>
                              <p style="margin: 10px 0 0 0; color: #888888; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">You have a new visitor</p>
                          </td>
                      </tr>

                      <tr>
                          <td style="padding: 0 40px;">
                              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 0;">
                          </td>
                      </tr>

                      <tr>
                          <td class="content-padding" style="padding: 30px 40px;">

                          <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: bold; color: #8B5E3C; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                          <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">
                              ${name}
                          </p>

                          <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: bold; color: #8B5E3C; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                          <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">
                              <a href="mailto:${email}" style="color: #8B5E3C; text-decoration: none;">${email}</a>
                          </p>

                          <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: bold; color: #8B5E3C; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                          <div style="background-color: #f9f9f9; border-left: 4px solid #8B5E3C; padding: 15px; border-radius: 4px;">
                              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #555555; white-space: pre-wrap;">
                                  ${message}
                              </p>
                          </div>

                      </td>
                      </tr>

                      <tr>
                          <td align="center" style="padding-bottom: 40px;">
                              <table border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td align="center" style="border-radius: 4px;" bgcolor="#8B5E3C">
                                          <a href="mailto:${email}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 4px; border: 1px solid #8B5E3C; display: inline-block; font-weight: bold;">Reply via Email</a>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>

                  </table>
                  <p style="margin-top: 20px; color: #999999; font-size: 12px;">Sent from your Portfolio Website</p>

              </td>
          </tr>
      </table>

  </body>
  </html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO!],
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      html: htmlEmailTemplate,
    });

    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: 'Message sent successfully!' });
  } catch (error) {
    console.error('EMAIL FAILED:', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
