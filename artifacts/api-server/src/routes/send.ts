import { Router } from "express";
import { Resend } from "resend";

const router = Router();

router.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!process.env.RESEND_API_KEY) {
    req.log.warn("RESEND_API_KEY not configured");
    return res.status(503).json({ error: "Email service not configured." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

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
      <div style="text-align: center; padding: 40px 20px; background-color: #f5f5f5; border-bottom: 3px solid #8b4513;">
        <h1 style="color: #000000; font-size: 28px; margin: 0; font-weight: normal; font-family: 'Georgia', serif;">
          New Contact Message
        </h1>
        <p style="color: #654321; margin: 10px 0 0; font-size: 16px; font-style: italic;">
          From your portfolio website
        </p>
      </div>
      <div style="padding: 30px 20px; background-color: #ffffff; border: 1px solid #d2b48c;">
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
      <div style="text-align: center; padding: 30px 20px; background-color: #f5f5f5; border-top: 1px solid #d2b48c;">
        <p style="color: #654321; margin: 0; font-size: 14px; font-style: italic;">
          This message was sent from the contact form on your portfolio website
        </p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const { data, error: resendError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO ?? "nilambarbehera234@gmail.com"],
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      html: htmlEmailTemplate,
    });

    if (resendError) {
      req.log.error({ resendError }, "Resend error");
      return res.status(500).json({ error: resendError.message || "Failed to send email." });
    }

    req.log.info({ id: data?.id }, "Email sent");
    return res.status(200).json({ success: "Message sent successfully!" });
  } catch (err) {
    req.log.error(err, "Email exception");
    return res.status(500).json({ error: "Unexpected error sending email." });
  }
});

export default router;
