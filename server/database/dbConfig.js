const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost:27017/ArtCore');



// Check whether the database is connected or not

connect.then(() => {
    console.log("Database connected successfully!");
})
.catch(() => {
    console.log("Database cannot be connected!");
})



// Create a Schema

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


// Collecting data

const usersModel = new mongoose.model("users", Loginschema);

module.exports = usersModel;