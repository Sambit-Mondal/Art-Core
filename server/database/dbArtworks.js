const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const connect = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log("Database connected successfully!");
}).catch(() => {
    console.log("Database cannot be connected!");
});



// Artwork Schema for storing Artworks
const artworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Artwork = mongoose.model("artworks", artworkSchema);

module.exports = Artwork;