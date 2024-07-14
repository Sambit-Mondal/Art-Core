const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendPaymentSuccessEmail({ paymentId, orderId, address, title, quantity }) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'Payment Successful',
            text: `Payment ID: ${paymentId}\n\nOrder ID: ${orderId}\n\nAddress: ${address}\n\nTitle: ${title}\n\nQuantity: ${quantity}`
        };

        try {
            console.log('Sending email with options:', mailOptions);
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

module.exports = EmailService;