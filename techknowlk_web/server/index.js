/* eslint-env node */
/* global process */
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(cors({
    origin: ['https://techknowlk.com', 'http://localhost:5173', 'http://127.0.0.1:5173']
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;

console.log('SMTP_HOST:', process.env.SMTP_HOST);

app.get('/api', (req, res) => res.json({ok: true, message: 'Email server is running'}));

app.post('/api/send-email', async (req, res) => {
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

app.post('/api/send-order-email', async (req, res) => {
    const { name, email, phone, address, note, productName, productBrand, quantity, total } = req.body;

    if (!name || !phone || !address || !productName) {
        return res.status(400).json({ error: 'name, phone, address and productName are required' });
    }

    try {
        // Save order to database
        const parsedTotal = total ? parseFloat(total.replace(/,/g, '')) : null;
        const parsedPrice = parsedTotal ? parsedTotal / Number(quantity) : 0;
        
        await prisma.order.create({
            data: {
                orderType: 'SINGLE',
                orderMethod: 'EMAIL',
                customerName: name,
                customerPhone: phone,
                customerEmail: email || null,
                customerAddress: address,
                customerNote: note || null,
                items: [
                    {
                        name: productName,
                        quantity: Number(quantity),
                        price: parsedPrice,
                        brand: productBrand || null
                    }
                ],
                total: parsedTotal,
                status: 'PENDING'
            }
        });

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: (process.env.SMTP_SECURE === 'true'),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const to = process.env.TO_EMAIL || process.env.SMTP_USER;
        const from = process.env.SMTP_USER;
        const orderDate = new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' });

        const mailOptions = {
            from,
            to,
            subject: `🛒 New Order: ${productName} — from ${name}`,
            text: `New Order Received\n\nProduct: ${productName}\nBrand: ${productBrand || '-'}\nQuantity: ${quantity}\nTotal: ${total ? 'LKR ' + total : 'N/A'}\n\nCustomer Details:\nName: ${name}\nEmail: ${email || '-'}\nPhone: ${phone}\nAddress: ${address}\nNote: ${note || '-'}\n\nOrder Date: ${orderDate}`,
            html: `
<div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;background:#f0f6fb;padding:40px 0;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(1,42,67,0.12);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#012A43,#154D71);padding:28px 32px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="background:rgba(51,161,224,0.2);border-radius:12px;padding:10px;display:inline-block;">
          <span style="font-size:24px;">🛒</span>
        </div>
        <div>
          <h2 style="margin:0;color:#fff;font-size:20px;font-weight:800;">New Order Received!</h2>
          <p style="margin:4px 0 0;color:#33A1E0;font-size:13px;">${orderDate}</p>
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div style="padding:24px 32px 0;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:800;color:#33A1E0;text-transform:uppercase;letter-spacing:2px;">Product Details</p>
      <div style="background:#f0f6fb;border-radius:12px;padding:20px;border-left:4px solid #33A1E0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:6px 0;font-weight:600;color:#4a6a7c;font-size:13px;width:120px;">Product</td>
            <td style="padding:6px 0;color:#012A43;font-weight:700;font-size:14px;">${productName}</td>
          </tr>
          ${productBrand ? `<tr><td style="padding:6px 0;font-weight:600;color:#4a6a7c;font-size:13px;">Brand</td><td style="padding:6px 0;color:#012A43;font-size:13px;">${productBrand}</td></tr>` : ''}
          <tr>
            <td style="padding:6px 0;font-weight:600;color:#4a6a7c;font-size:13px;">Quantity</td>
            <td style="padding:6px 0;color:#012A43;font-weight:700;font-size:13px;">${quantity} unit${quantity > 1 ? 's' : ''}</td>
          </tr>
          ${total ? `<tr><td style="padding:6px 0;font-weight:600;color:#4a6a7c;font-size:13px;">Total</td><td style="padding:6px 0;color:#33A1E0;font-weight:800;font-size:18px;">LKR ${total}</td></tr>` : ''}
        </table>
      </div>
    </div>

    <!-- Customer Info -->
    <div style="padding:20px 32px 0;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:800;color:#33A1E0;text-transform:uppercase;letter-spacing:2px;">Customer Details</p>
      <div style="background:#fff;border-radius:12px;padding:20px;border:1px solid #e2ecf4;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;width:120px;">👤 Name</td>
            <td style="padding:8px 0;color:#012A43;font-weight:600;font-size:13px;">${name}</td>
          </tr>
          ${email ? `<tr><td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;">📧 Email</td><td style="padding:8px 0;color:#012A43;font-size:13px;">${email}</td></tr>` : ''}
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;">📞 Phone</td>
            <td style="padding:8px 0;color:#012A43;font-size:13px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;vertical-align:top;">📍 Address</td>
            <td style="padding:8px 0;color:#012A43;font-size:13px;">${address.replace(/\n/g, '<br/>')}</td>
          </tr>
          ${note ? `<tr><td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;vertical-align:top;">📝 Note</td><td style="padding:8px 0;color:#012A43;font-size:13px;">${note}</td></tr>` : ''}
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:24px 32px;margin-top:24px;background:#f0f6fb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#7a9ab0;">This order was placed via <strong>TechKnowLK Website</strong></p>
      <p style="margin:6px 0 0;font-size:11px;color:#a0b8c8;">&copy; ${new Date().getFullYear()} Techknow Lanka</p>
    </div>
  </div>
</div>`,
        };

        const info = await transporter.sendMail(mailOptions);
        return res.json({ success: true, messageId: info.messageId });
    } catch (err) {
        console.error('Error sending order email:', err);
        return res.status(500).json({ error: 'Failed to send order email', details: err.message });
    }
});

app.post('/api/send-cart-order-email', async (req, res) => {
    const { name, email, phone, address, note, items, total } = req.body;

    if (!name || !phone || !address || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'name, phone, address and items are required' });
    }

    try {
        // Save order to database
        const parsedTotal = total ? parseFloat(total.replace(/,/g, '')) : null;
        
        await prisma.order.create({
            data: {
                orderType: 'CART',
                orderMethod: 'EMAIL',
                customerName: name,
                customerPhone: phone,
                customerEmail: email || null,
                customerAddress: address,
                customerNote: note || null,
                items: items.map(item => ({
                    name: item.name,
                    quantity: Number(item.quantity),
                    price: Number(item.price),
                    brand: item.brand || null
                })),
                total: parsedTotal,
                status: 'PENDING'
            }
        });

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: (process.env.SMTP_SECURE === 'true'),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const to = process.env.TO_EMAIL || process.env.SMTP_USER;
        const from = process.env.SMTP_USER;
        const orderDate = new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' });

        // Generate table rows for items
        const itemRows = items.map(item => {
            const itemSubtotal = item.price > 0 ? `LKR ${(item.price * item.quantity).toLocaleString()}` : 'N/A';
            const itemPrice = item.price > 0 ? `LKR ${item.price.toLocaleString()}` : 'N/A';
            return `
              <tr style="border-bottom:1px solid #e2ecf4;">
                <td style="padding:12px 0;color:#012A43;font-size:13px;font-weight:600;">${item.name}</td>
                <td style="padding:12px 0;color:#4a6a7c;font-size:13px;text-align:center;">${itemPrice}</td>
                <td style="padding:12px 0;color:#4a6a7c;font-size:13px;text-align:center;">${item.quantity}</td>
                <td style="padding:12px 0;color:#33A1E0;font-size:13px;font-weight:700;text-align:right;">${itemSubtotal}</td>
              </tr>
            `;
        }).join('');

        const mailOptions = {
            from,
            to,
            subject: `🛒 New Cart Order — from ${name}`,
            text: `New Cart Order Received\n\nCustomer Details:\nName: ${name}\nEmail: ${email || '-'}\nPhone: ${phone}\nAddress: ${address}\nNote: ${note || '-'}\n\nItems Ordered:\n${items.map(i => `- ${i.name} (Qty: ${i.quantity}) Subtotal: ${i.price > 0 ? 'LKR ' + (i.price * i.quantity).toLocaleString() : 'N/A'}`).join('\n')}\n\nGrand Total: LKR ${total || '-'}\n\nOrder Date: ${orderDate}`,
            html: `
<div style="font-family:'Segoe UI',Roboto,Arial,sans-serif;background:#f0f6fb;padding:40px 0;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(1,42,67,0.12);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#012A43,#154D71);padding:28px 32px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="background:rgba(51,161,224,0.2);border-radius:12px;padding:10px;display:inline-block;">
          <span style="font-size:24px;">🛒</span>
        </div>
        <div>
          <h2 style="margin:0;color:#fff;font-size:20px;font-weight:800;">New Cart Order Received!</h2>
          <p style="margin:4px 0 0;color:#33A1E0;font-size:13px;">${orderDate}</p>
        </div>
      </div>
    </div>

    <!-- Items Info -->
    <div style="padding:24px 32px 0;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:800;color:#33A1E0;text-transform:uppercase;letter-spacing:2px;">Ordered Items</p>
      <div style="background:#f0f6fb;border-radius:12px;padding:20px;border-left:4px solid #33A1E0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:2px solid #e2ecf4;text-align:left;">
              <th style="padding:8px 0;color:#4a6a7c;font-size:11px;font-weight:800;text-transform:uppercase;">Item</th>
              <th style="padding:8px 0;color:#4a6a7c;font-size:11px;font-weight:800;text-transform:uppercase;text-align:center;">Price</th>
              <th style="padding:8px 0;color:#4a6a7c;font-size:11px;font-weight:800;text-transform:uppercase;text-align:center;">Qty</th>
              <th style="padding:8px 0;color:#4a6a7c;font-size:11px;font-weight:800;text-transform:uppercase;text-align:right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
        
        <!-- Total -->
        <div style="margin-top:16px;padding-top:16px;border-top:2px dashed #d1e2ee;text-align:right;">
          <span style="font-size:13px;font-weight:600;color:#4a6a7c;margin-right:12px;">Grand Total:</span>
          <span style="font-size:20px;font-weight:800;color:#33A1E0;">LKR ${total}</span>
        </div>
      </div>
    </div>

    <!-- Customer Info -->
    <div style="padding:20px 32px 0;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:800;color:#33A1E0;text-transform:uppercase;letter-spacing:2px;">Customer Details</p>
      <div style="background:#fff;border-radius:12px;padding:20px;border:1px solid #e2ecf4;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;width:120px;">👤 Name</td>
            <td style="padding:8px 0;color:#012A43;font-weight:600;font-size:13px;">${name}</td>
          </tr>
          ${email ? `<tr><td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;">📧 Email</td><td style="padding:8px 0;color:#012A43;font-size:13px;">${email}</td></tr>` : ''}
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;">📞 Phone</td>
            <td style="padding:8px 0;color:#012A43;font-size:13px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;vertical-align:top;">📍 Address</td>
            <td style="padding:8px 0;color:#012A43;font-size:13px;">${address.replace(/\n/g, '<br/>')}</td>
          </tr>
          ${note ? `<tr><td style="padding:8px 0;font-weight:600;color:#4a6a7c;font-size:13px;vertical-align:top;">📝 Note</td><td style="padding:8px 0;color:#012A43;font-size:13px;">${note}</td></tr>` : ''}
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:24px 32px;margin-top:24px;background:#f0f6fb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#7a9ab0;">This order was placed via <strong>TechKnowLK Website</strong></p>
      <p style="margin:6px 0 0;font-size:11px;color:#a0b8c8;">&copy; ${new Date().getFullYear()} Techknow Lanka</p>
    </div>
  </div>
</div>`,
        };

        const info = await transporter.sendMail(mailOptions);
        return res.json({ success: true, messageId: info.messageId });
    } catch (err) {
        console.error('Error sending cart order email:', err);
        return res.status(500).json({ error: 'Failed to send cart order email', details: err.message });
    }
});

app.post('/api/save-order', async (req, res) => {
    const { orderType, orderMethod, customerName, customerPhone, customerEmail, customerAddress, customerNote, items, total } = req.body;

    if (!orderType || !orderMethod || !customerName || !customerPhone || !customerAddress || !items) {
        return res.status(400).json({ error: 'Missing required order fields' });
    }

    try {
        const parsedTotal = total ? parseFloat(total.toString().replace(/,/g, '')) : null;
        
        const order = await prisma.order.create({
            data: {
                orderType,
                orderMethod,
                customerName,
                customerPhone,
                customerEmail: customerEmail || null,
                customerAddress,
                customerNote: customerNote || null,
                items: items.map(item => ({
                    name: item.name,
                    quantity: Number(item.quantity),
                    price: Number(item.price || 0),
                    brand: item.brand || null
                })),
                total: parsedTotal,
                status: 'PENDING',
            }
        });
        return res.json({ success: true, orderId: order.id });
    } catch (err) {
        console.error('Error saving order to DB:', err);
        return res.status(500).json({ error: 'Failed to save order to database', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Email server listening on http://localhost:${PORT}`);
});
