const nodemailer = require('nodemailer');
const config = require('../config/env');

const sendEmail = async options => {
    // 1) Create a transporter
    // For dev: use mailtrap or similar if needed. For now using placeholder or simple log if no creds.
    // We can use a service like SendGrid, Mailgun in prod.

    // Minimal setup for example
    const transporter = nodemailer.createTransport({
        service: config.email.service || 'gmail',
        auth: {
            user: config.email.user,
            pass: config.email.pass,
        },
    });

    // 2) Define the email options
    const mailOptions = {
        from: `E-Commerce App <${config.email.from}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html
    };

    // 3) Actually send the email
    if (config.env === 'development' && !config.email.user) {
        console.log('Skipping email send in dev (no creds provided). Email content:', mailOptions);
        return;
    }

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
