const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const connect = mongoose.connect(process.env.MONGO_URL);

connect.then(() => {
    console.log("Database connected successfully!");

    // Check and create admin user if not exists
    usersModel.findOne({ email: process.env.ADMIN_EMAIL }).then(admin => {
        if (!admin) {
            const newAdmin = new usersModel({
                username: 'Admin',
                email: process.env.ADMIN_EMAIL,
                password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
            });
            newAdmin.save().then(() => console.log("Admin user created"));
        }
    });
}).catch(() => {
    console.log("Database cannot be connected!");
});


// Login Schema for users
const Loginschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});




const usersModel = new mongoose.model("users", Loginschema);

module.exports = usersModel;