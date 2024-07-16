require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const usersModel = require('./database/dbConfig');
const Artwork = require('./database/dbArtworks');
const Payment = require('./database/dbPayment');
const Razorpay = require('razorpay');
const EmailService = require('./services/EmailService');


const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS
    }
});


// Signup endpoint
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await usersModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already registered! Try logging in instead!" });
        }

        if (email === process.env.ADMIN_EMAIL) {
            return res.status(400).json({ message: "Cannot register with this email!" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new usersModel({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "An error occurred during registration" });
    }
});


// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found! Please register" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            const isAdmin = email === process.env.ADMIN_EMAIL;
            const token = jwt.sign({ email, isAdmin }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

            res.status(200).json({
                message: "Login successful!",
                username: user.username,
                email: user.email,
                isAdmin,
                token // Send the token to the client
            });
        } else {
            res.status(401).json({ message: "Check your password and try again!" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred while logging in" });
    }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Protected route example
app.get("/protected", authenticateToken, (req, res) => {
    res.status(200).json({ message: "This is a protected route", user: req.user });
});

app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10m' });
        const resetLink = `http://localhost:3000/login?token=${token}`;

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `Hi!\n\n` +
                `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process: ${resetLink} \n\n` +
                `The link expires in 10 minutes. \n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error("Error during forgot password:", error);
        res.status(500).json({ message: 'An error occurred while sending reset email' });
    }
});

app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await usersModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Invalid token or user not found' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error("Error during reset password:", error);
        res.status(500).json({ message: 'An error occurred while resetting password' });
    }
});



// New endpoint to handle contact form submission
app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_ADMIN,
        subject: `${subject}`,
        text: `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});


// Endpoint to add a new artwork
app.post('/api/artworks', async (req, res) => {
    const { title, description, price, image, type } = req.body;

    try {
        const newArtwork = new Artwork({
            title,
            description,
            price,
            image,
            type,
        });

        await newArtwork.save();
        res.status(201).json({ message: 'Artwork added successfully!' });
    } catch (error) {
        console.error('Error adding artwork:', error);
        res.status(500).json({ message: 'An error occurred while adding the artwork' });
    }
});



// Endpoint to get all artworks
app.get('/api/artworks', async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.status(200).json(artworks);
    } catch (error) {
        console.error('Error fetching artworks:', error);
        res.status(500).json({ message: 'An error occurred while fetching artworks' });
    }
});



// Initialize Razorpay instance
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});



// Route to create an order
app.post('/api/create-order', async (req, res) => {
    const { amount } = req.body;
    try {
        const order = await instance.orders.create({
            amount: amount * 100,
            currency: 'INR',
            payment_capture: 1, // auto-capture
        });
        console.log('Order created:', order); // Log the created order
        res.status(201).json({ orderId: order.id });
    } catch (error) {
        console.error('Error creating order:', error); // Log any errors
        res.status(500).send('Error creating order');
    }
});



// Route to handle payment success
app.post('/api/payment-success', async (req, res) => {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, address, title, quantity } = req.body;
    try {
        // Store payment details in the database
        await Payment.create({
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            address,
            title,
            quantity,
        });

        // Send email to admin
        const emailService = new EmailService();
        await emailService.sendPaymentSuccessEmail({
            paymentId: razorpayPaymentId,
            orderId: razorpayOrderId,
            address,
            title,
            quantity,
        });

        res.status(200).send('Payment successful');
    } catch (error) {
        console.error('Error handling payment success:', error); // Log any errors
        res.status(500).send('Error handling payment success');
    }
});



// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});