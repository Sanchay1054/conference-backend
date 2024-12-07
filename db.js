const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sanchay:13-Mar-05@cluster0.jfxekhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;