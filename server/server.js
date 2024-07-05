const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const usersModel = require('./database/dbConfig');

const app = express();

// Convert data to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Register User
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check whether the user already exists
        const existingUser = await usersModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already registered! Try logging in instead!" });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save the new user with hashed password
        const newUser = new usersModel({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during registration" });
    }
});

// Login User
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found! Please register" });
        }

        // Compare the entered password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            res.status(200).json({ 
                message: "Login successful!",
                username: user.username
            });
        } else {
            res.status(401).json({ message: "Check your password and try again!" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while logging in" });
    }
});

// Port
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});