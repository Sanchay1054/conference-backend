const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

// Middleware
app.use(express.json());


const connectDB = require('./db');
connectDB();

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const Registration = require('./register');

// Example route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});

app.post('/register',async (req, res) => {
    try {
        const registration = new Registration({
            category: req.body.category,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            college: req.body.college,
            department: req.body.department,
            designation: req.body.designation || null,
            student_year: req.body.student_year || null,
            role: req.body.role,
            payment_screenshot: req.file ? req.file.path : '',
            mode: req.body.mode,
            accommodation: req.body.accommodation,
            notice_accepted: req.body.notice_accepted === 'true',
        });
        console.log(req.body);
        await registration.save();
        res.send(`
            <p style="font-size:200%;">Registered Successfully</p>
            `)
    } catch (err) {
        res.send(`
            <p style="font-size:200%;">Error</p><br>
            <p style="font-size:200%;">${err.message}</p>
            `)
    }
});

// 2. View registered persons
app.get('/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching registrations', details: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;