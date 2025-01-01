const mongoose = require('mongoose');

// Define the schema
const submissionSchema = new mongoose.Schema({
    name: [String],
    institution: [String],
    mail: [String],
    department: [String],
    title: {type: String},
    abstract: {type: String},
    keywords: {type: String},
    description: {type: String},
    time: {type: String},
});

// Export the model
module.exports = mongoose.model('Submission', submissionSchema);
