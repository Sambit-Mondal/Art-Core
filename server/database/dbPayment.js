const mongoose = require('mongoose');

require('dotenv').config;

const connect = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


connect.then(() => {
    console.log('Database connected successfully!');
}).catch((err) => {
    console.log('Database cannot be connected!', err);
});


// Payment Schema
const paymentsSchema = new mongoose.Schema({
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String,
    address: String,
    title: String,
    quantity: Number,
});

const Payment = new mongoose.model("payments", paymentsSchema);

module.exports = Payment;