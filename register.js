const mongoose = require('mongoose');

// Define the schema
const registrationSchema = new mongoose.Schema({
    category: { type: String, default: ""},
    firstname: { type: String,},
    lastname: { type: String,},
    salutation: { type: String,},
    phonenumber: { type: String,},
    email: { type: String,},
    institution: { type: String,},
    department: { type: String,},
    designation: { type: String, default: "I am a Student" },
    student_year: { type: String, default: "I am a Student/Faculty/Research Scholar" },
    presenter: { type: String,},
    payment: { type: String, default: "Not Paid"},
    mode: { type: String,},
    accommodation: { type: String, default: "Not Required"},
    address: { type: String, },
    time: {type: String},
});

// Export the model
module.exports = mongoose.model('Registration', registrationSchema);
