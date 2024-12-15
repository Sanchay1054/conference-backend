const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');


// Middleware
//app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

// API endpoints
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});



const connectDB = require('./db');
connectDB();

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const Registration = require('./register');
const Feedback = require('./feedback');

// Example route
app.get('/api/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});

app.post('/api/register',async (req, res) => {
    try {
        const date = new Date().toISOString();
        const registration = new Registration({
          category: req.body.category,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          salutation: req.body.salutation || "",
          phonenumber: req.body.phonenumber,
          email: req.body.email,
          institution: req.body.institution,
          department: req.body.department,
          designation: req.body.designation,
          student_year: req.body.student_year,
          presenter: req.body.presenter,
          payment: req.body.payment,
          mode: req.body.mode,
          accomodation: req.body.accomodation,
          address: req.body.address,
          time: date.slice(0,10)+" "+date.slice(11,20),
        });
        console.log(req.body);
        await registration.save();
        res.send(`
            <div style="display: flex; height: 100vh; align-items: center; justify-content: center; overflow-y: hidden;"><div style="font-size:200%; padding: 10px; font-weight: 600; background-color: rgb(17, 139, 17); border-radius: 20px; color: #FFF;">Registered Successfully</div></div>
            `)
    } catch (err) {
        res.send(`
            <div style="display: flex; height: 100vh; align-items: center; justify-content: center; overflow-y: hidden;"><div style="font-size:200%; padding: 10px; font-weight: 600; background-color: rgb(17, 139, 17); border-radius: 20px; color: #FFF;">Registered Successfully</div>
      <div style="font-size:200%;">${err.message}</div></div>
            `)
    }
});

// 2. View registered persons
app.get('/api/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching registrations', details: err.message });
    }
});

app.post('/feedback',async (req,res)=>{
  try{
    const date = new Date().toISOString();
    const feedback = new Feedback({
      name: req.body.name || null,
      phone: req.body.phonenumber || null,
      email: req.body.email || null,
      rating: req.body.rating || "not provided",
      feedback: req.body.feedback || null,
      time: date.slice(0,10)+" "+date.slice(11,20),
    });
    await feedback.save();
    res.send(`<div style="display: flex; height: 100vh; align-items: center; justify-content: center; overflow-y: hidden;"><div style="font-size:200%; padding: 10px; font-weight: 600; background-color: rgb(17, 139, 17); border-radius: 20px; color: #FFF;">Registered Successfully</div></div>`);
  }
  catch{
    res.send(`
      <div style="display: flex; height: 100vh; align-items: center; justify-content: center; overflow-y: hidden;"><div style="font-size:200%; padding: 10px; font-weight: 600; background-color: rgb(17, 139, 17); border-radius: 20px; color: #FFF;">Registered Successfully</div>
      <div style="font-size:200%;">${err.message}</div></div>
      `)
  }
})

app.get('/feedbacks',async (req,res)=>{
  try{
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  }
  catch(err){
    res.status(500).json({error: "Error fetching Feedbacks",message:err.message});
  }
})

// Catch-all handler for any request not matched by the above
app.get('*', (req, res) => {
  try{
    res.redirect('https://icamac.kongu.edu/');
  }
  catch{
    res.send("Hello Go to icamac for registering, Thank you");
  }
  });
  

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;