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
  
  // Aesthetic email template with background icons and warm color scheme
  const htmlEmailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Message</title>
      <style>
          body { margin: 0; padding: 0; background-color: #F2F0E9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }

          /* This hides the background icons on very small screens to keep text readable */
          @media screen and (max-width: 600px) {
              .mobile-hide { display: none !important; }
              .container { width: 95% !important; }
              .content-padding { padding: 20px !important; }
          }

          /* Icon Styling - Makes them look like faded watermarks */
          .bg-icon {
              font-size: 30px;
              opacity: 0.4; /* Transparency */
              filter: grayscale(30%); /* Muted colors */
          }
      </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F2F0E9;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F2F0E9; table-layout: fixed;">
          <tr>
              <td align="center" style="padding: 40px 10px;">

                  <table border="0" cellpadding="0" cellspacing="0" width="600" class="mobile-hide" style="margin-bottom: -20px; z-index: 0;">
                      <tr>
                          <td align="left" style="padding-left: 20px; padding-bottom: 10px;">
                              <span class="bg-icon">☕</span> </td>
                          <td align="right" style="padding-right: 20px; padding-bottom: 10px;">
                              <span class="bg-icon">📚</span> </td>
                      </tr>
                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" class="container" width="600" style="background-color: #ffffff; border-radius: 2px; box-shadow: 0 5px 20px rgba(92, 64, 51, 0.15); position: relative; z-index: 1; border-top: 5px solid #5C4033;">

                      <tr>
                          <td class="content-padding" style="padding: 40px 40px 10px 40px; text-align: center;">
                              <div style="font-size: 24px; margin-bottom: 10px;">🌲</div>
                              <h1 style="margin: 0; color: #5C4033; font-family: 'Georgia', serif; font-size: 26px; letter-spacing: 0.5px;">Portfolio Inquiry</h1>
                              <p style="margin: 5px 0 0 0; color: #999; font-size: 13px; font-style: italic;">A new message from your website</p>
                          </td>
                      </tr>

                      <tr>
                          <td align="center" style="padding: 20px 40px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                      <td height="1" style="background-color: #E0D8D0;"></td>
                                  </tr>
                              </table>
                          </td>
                      </tr>

                      <tr>
                          <td class="content-padding" style="padding: 0 40px 30px 40px;">

                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <td width="30%" valign="top" style="padding-bottom: 15px; color: #8B7355; font-size: 12px; font-weight: bold; text-transform: uppercase;">Name:</td>
                                  <td width="70%" valign="top" style="padding-bottom: 15px; color: #333333; font-size: 16px; font-family: 'Georgia', serif;">
                                      ${name}
                                  </td>
                              </tr>
                              <tr>
                                  <td width="30%" valign="top" style="padding-bottom: 15px; color: #8B7355; font-size: 12px; font-weight: bold; text-transform: uppercase;">Email:</td>
                                  <td width="70%" valign="top" style="padding-bottom: 15px; color: #333333; font-size: 16px;">
                                      <a href="mailto:${email}" style="color: #5C4033; text-decoration: none;">${email}</a>
                                  </td>
                              </tr>
                          </table>

                          <p style="color: #8B7355; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-top: 10px;">Message:</p>
                          <div style="background-color: #FAF9F6; border: 1px dashed #C8B7A6; padding: 20px; border-radius: 4px;">
                              <p style="margin: 0; font-family: 'Georgia', serif; font-size: 16px; line-height: 1.6; color: #444; white-space: pre-wrap;">
                                  ${message}
                              </p>
                          </div>

                      </td>
                      </tr>

                      <tr>
                          <td align="center" style="padding-bottom: 40px;">
                              <a href="mailto:${email}" style="background-color: #5C4033; color: #ffffff; text-decoration: none; padding: 12px 35px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; border-radius: 2px;">Reply Now</a>
                      </td>
                      </tr>

                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" width="600" class="mobile-hide" style="margin-top: -20px; z-index: 0;">
                      <tr>
                          <td align="left" style="padding-left: 20px; padding-top: 10px;">
                              <span class="bg-icon">💍</span> </td>
                          <td align="right" style="padding-right: 20px; padding-top: 10px;">
                              <span class="bg-icon">🎄</span> </td>
                      </tr>
                  </table>

                  <p style="margin-top: 30px; color: #A8A8A8; font-size: 11px;">Sent from your Portfolio</p>

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
