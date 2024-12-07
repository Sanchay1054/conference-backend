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

// const connectDB = async () => {
//     if (mongoose.connection.readyState >= 1) {
//       return; // Already connected
//     }
//     try {
//       const uri = "mongodb+srv://sanchay:13-Mar-05@cluster0.jfxekhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//       await mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log('MongoDB connected');
//     } catch (err) {
//       console.error('MongoDB connection error:', err.message);
//       throw err;
//     }
//   };
  
//   module.exports = connectDB;
  