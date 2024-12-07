const { Handler } = require('@netlify/functions');
const mongoose = require('mongoose');
const Registration = require('.././../register');
const connectDB = require('../../db');

const handler = async (event, context) => {
  try {
    await connectDB();
    const registrations = await Registration.find();
    return {
      statusCode: 200,
      body: JSON.stringify(registrations),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching registrations', details: err.message }),
    };
  }
};

module.exports.handler = handler;
