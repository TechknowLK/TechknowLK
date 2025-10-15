/* eslint-env node */
/* global process */
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

console.log('SMTP_HOST:', process.env.SMTP_HOST);

app.get('/', (req, res) => res.json({ok: true, message: 'Email server is running'}));

app.post('/send-email', async (req, res) => {
    const {name, email, message, phone, service} = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({error: 'name, email and message are required'});
    }

    try {
        let transporter;
        // let usingTestAccount = false;

        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: (process.env.SMTP_SECURE === 'true'),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // const from = process.env.FROM_EMAIL || `${name} <${email}>`;
        const from = email;
        const to = process.env.TO_EMAIL || process.env.SMTP_USER || 'techknowlkinfo@example.com';

        const mailOptions = {
            from,
            to,
            subject: `📩 New Website Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\n${message}`,
            html: `
  <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f7f9fc; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      <div style="background: linear-gradient(135deg, #34A7D5, #0078D4); padding: 24px 32px; color: #fff;">
        <h2 style="margin: 0; font-size: 22px;">New Contact Form Submission 💬</h2>
        <p style="margin: 4px 0 0; opacity: 0.9;">Someone just contacted you via your website</p>
      </div>

      <div style="padding: 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #555;">Name:</td>
            <td style="padding: 8px 0; color: #333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #555;">Email:</td>
            <td style="padding: 8px 0; color: #333;">${email}</td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #555;">Phone:</td>
            <td style="padding: 8px 0; color: #333;">${phone}</td>
          </tr>` : ''}
          ${service ? `
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #555;">Service:</td>
            <td style="padding: 8px 0; color: #333;">${service}</td>
          </tr>` : ''}
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #f0f4f8; border-radius: 8px;">
          <p style="margin: 0; font-weight: 600; color: #444;">Message:</p>
          <p style="margin-top: 8px; color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
      </div>

      <div style="background: #f9fafc; padding: 16px 32px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 4px 0;">This email was automatically sent from your website contact form.</p>
        <p style="margin: 4px 0;">&copy; ${new Date().getFullYear()} Techknow Lanka</p>
      </div>
    </div>
  </div>
  `,
        };


        const info = await transporter.sendMail(mailOptions);

        const response = {success: true, messageId: info.messageId};

        // // If using Ethereal, include the preview URL in the response for development.
        // if (usingTestAccount) {
        //     response.previewUrl = nodemailer.getTestMessageUrl(info);
        // }

        return res.json(response);
    } catch (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({error: 'Failed to send email', details: err.message});
    }
});

app.listen(PORT, () => {
    console.log(`Email server listening on http://localhost:${PORT}`);
});
