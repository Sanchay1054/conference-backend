const mongoose = require('mongoose');

// Define the schema
const feedbackSchema = new mongoose.Schema({
    name: { type: String},
    phone: { type: String},
    email: { type: String},
    rating: {type: String},
    feedback: {type: String},
    time: {type: String},
});

// Export the model
module.exports = mongoose.model('Feedback', feedbackSchema);
