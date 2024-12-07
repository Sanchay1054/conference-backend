const { Handler } = require('@netlify/functions');
const mongoose = require('mongoose');
const Registration = require('../register');
const connectDB = require('../db');

const handler = async (event, context) => {
  try {
    const reqBody = JSON.parse(event.body);

    await connectDB();

    const registration = new Registration({
      category: reqBody.category,
      name: reqBody.name,
      phone: reqBody.phone,
      email: reqBody.email,
      college: reqBody.college,
      department: reqBody.department,
      designation: reqBody.designation || null,
      student_year: reqBody.student_year || null,
      role: reqBody.role,
      payment_screenshot: reqBody.payment_screenshot || '',
      mode: reqBody.mode,
      accommodation: reqBody.accommodation,
      notice_accepted: reqBody.notice_accepted === 'true',
    });

    await registration.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Registered successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error', details: err.message }),
    };
  }
};

module.exports.handler = handler;

