const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

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
            text: `Payment ID: ${paymentId}\nOrder ID: ${orderId}\nAddress: ${address}\nTitle: ${title}\nQuantity: ${quantity}`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

module.exports = EmailService;