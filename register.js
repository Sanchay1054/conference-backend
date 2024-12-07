const mongoose = require('mongoose');

// Define the schema
const registrationSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, default: null },
    student_year: { type: String, default: null },
    role: { type: String, required: true },
    payment_screenshot: { type: String, default: "Not Paid"},
    mode: { type: String, required: true },
    accommodation: { type: String, default: "Not Required"},
    notice_accepted: { type: Boolean, required: true },
});

// Export the model
module.exports = mongoose.model('Registration', registrationSchema);
