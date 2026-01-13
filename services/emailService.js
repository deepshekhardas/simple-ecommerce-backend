const nodemailer = require('nodemailer');
const config = require('../config/env');

const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        service: config.email.service, // e.g., 'gmail'
        auth: {
            user: config.email.user,
            pass: config.email.pass,
        },
    });

    // 2) Define the email options
    const mailOptions = {
        from: `Simple Ecommerce <${config.email.from}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

const sendOrderEmail = async (options) => {
    const { email, order } = options;

    const itemsHtml = order.items.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">$${item.price.toFixed(2)}</td>
        </tr>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Order Confirmed!</h1>
            <p>Hi ${options.name},</p>
            <p>Thank you for your order. Here are the details:</p>
            
            <p><strong>Order ID:</strong> ${order._id}</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #f3f4f6;">
                        <th style="padding: 10px; text-align: left;">Item</th>
                        <th style="padding: 10px; text-align: left;">Qty</th>
                        <th style="padding: 10px; text-align: left;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            
            <div style="margin-top: 20px; text-align: right;">
                <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">If you have any questions, please reply to this email.</p>
        </div>
    `;

    await sendEmail({
        email,
        subject: `Order Confirmation #${order._id}`,
        message: `Thank you for your order! Your Order ID is ${order._id}. Total: $${order.total}`,
        html
    });
};

module.exports = {
    sendEmail,
    sendOrderEmail
};
