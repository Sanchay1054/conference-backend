const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');


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
const Submission = require('./submission');

// Example route
app.get('/api/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});

const sendEmail = async (recipient, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'icamaac25@kongu.ac.in',
      pass: 'Maac25@iac',//ajlfbxrqijhmbieu
    },
  });

  const mailOptions = {
    from: 'icamaac25@kongu.ac.in',
    to: recipient,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};

app.post('/api/register',async (req, res) => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium',
      });
      let salutation = "";
      if (Array.isArray(req.body.salutation)){
        salutation = req.body.salutation.join(" ");
      }
      else{
        salutation = req.body.salutation;
      }
        const registration = new Registration({
          category: req.body.category,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          salutation: salutation || "",
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
          time: formatter.format(now),
        });
        console.log(req.body);
        await registration.save();
        /*const emailSubject = `Registration Confirmation for ICAMAC2025`;
        const emailContent = `
          <div style="background-color: #EEE; padding: 10px; font-family:Arial, Helvetica, sans-serif; border-radius: 20px; font-size: 110%;">
            <b style="font-size: 150%; margin-bottom: 20px;">Hello ${req.body.salutation} ${req.body.firstname} ${req.body.lastname}</b><br><br>
            Greetings from ICAMAC2025,<br><br>
            <div style="max-width: 1200px;">You have registered for <a href='https://icamac.kongu.edu' style="color: #000; font-weight: 600; text-decoration: none;">ICAMAC2025</a> successfully.This prestigious event serves as a global platform for researchers, academics, and industry professionals to share their innovative ideas and breakthroughs in the fields of applied mathematics, automation, and computing. ICAMAC aims to foster collaboration, spark insightful discussions, and advance knowledge across these dynamic disciplines. Join us for a series of inspiring keynote speeches, technical sessions, and networking opportunities that will connect you with thought leaders and experts from around the world.</div><br>
            <div>For abstract submission, visit:</div><br> <a href='https://icamac.kongu.edu/submission.html' style="color: #FFF; font-weight: 600; text-decoration: none; padding: 10px; background-color: #00F; border-radius: 10px; margin: 20px; width: fit-content;">Submission</a><br><br>
            <div>For any enquiries, ask your query at:</div><br> <a href='https://icamac.kongu.edu/contactus.html' style="color: #FFF; font-weight: 600; text-decoration: none; padding: 10px; background-color: #00F; border-radius: 10px; margin: 20px; width: fit-content;">Enquire</a><br><br>
            Join us at ICAMAC 2025 as we shape the future of these vital fields.<br>
            Thank You!
            </div>
        `;

        await sendEmail(req.body.email, emailSubject, emailContent);*/

    // Respond to client
    res.status(200).json({ message: 'Data saved and email sent successfully' });
        // res.send(`
        //     <div style="display: flex; height: 100vh; align-items: center; justify-content: center; overflow-y: hidden;"><div style="font-size:200%; padding: 10px; font-weight: 600; background-color: rgb(17, 139, 17); border-radius: 20px; color: #FFF;">Registered Successfully</div></div>
        //     `)
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message});
      //   res.send(`
      //       <div style="display: flex; height: 100vh; align-items: center; justify-content: center; overflow-y: hidden;"><div style="font-size:200%; padding: 10px; font-weight: 600; background-color: rgb(17, 139, 17); border-radius: 20px; color: #FFF;">Error</div><br>
      // <div style="font-size:200%;">${err.message}</div></div>
      //       `)
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
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });
    const feedback = new Feedback({
      name: req.body.name || null,
      phone: req.body.phonenumber || null,
      email: req.body.email || null,
      rating: req.body.rating || "not provided",
      feedback: req.body.feedback || null,
      time: formatter.format(now),
    });
    await feedback.save();
    res.status(200).json({ message: 'success' });
    // res.send(`<div style="display: flex; height: 100vh; align-items: center; justify-content: center; overflow-y: hidden;"><div style="font-size:200%; padding: 10px; font-weight: 600; background-color: rgb(17, 139, 17); border-radius: 20px; color: #FFF;">Registered Successfully</div></div>`);
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({ message: err.message });
    // res.send(`
    //   <div style="display: flex; height: 100vh; align-items: center; justify-content: center; overflow-y: hidden;"><div style="font-size:200%; padding: 10px; font-weight: 600; background-color: rgb(17, 139, 17); border-radius: 20px; color: #FFF;">Error</div><br>
    //   <div style="font-size:200%;">${err.message}</div></div>
    //   `)
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

app.post('/submission',async (req,res)=>{
  try{
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });
    const submission = new Submission({
      title: req.body.title,
      abstract: req.body.abstract,
      keywords: req.body.keywords,
      name: req.body.name,
      institution: req.body.institution,
      department: req.body.department,
      mail: req.body.mail,
      description: req.body.description || "not given",
      time: formatter.format(now),
    });
    console.log(req.body.mail,req.body.mail[0]);
    await submission.save();
    /*const emailSubject = `Abstract Submission Confirmation for ICAMAC2025`;
    const emailContent = `
      <div style="background-color: #EEE; padding: 10px; font-family:Arial, Helvetica, sans-serif; border-radius: 20px; font-size: 110%;">
        <b style="font-size: 150%; margin-bottom: 20px;">Hello ${req.body.name[0]}</b><br><br>
        Greetings from ICAMAC2025,<br><br>
        <div style="max-width: 1200px;">You have submitted the abstract for <a href='https://icamac.kongu.edu' style="color: #000; font-weight: 600; text-decoration: none;">ICAMAC2025</a> titled <b>"${req.body.title}"</b> successfully.This prestigious event serves as a global platform for researchers, academics, and industry professionals to share their innovative ideas and breakthroughs in the fields of applied mathematics, automation, and computing. ICAMAC aims to foster collaboration, spark insightful discussions, and advance knowledge across these dynamic disciplines. Join us for a series of inspiring keynote speeches, technical sessions, and networking opportunities that will connect you with thought leaders and experts from around the world.</div><br>
        <div>For registration, visit (Please ignore if already registered):</div><br> <a href='https://icamac.kongu.edu/register.html' style="color: #FFF; font-weight: 600; text-decoration: none; padding: 10px; background-color: #00F; border-radius: 10px; margin: 20px; width: fit-content;">Registration</a><br><br>
        <div>For any enquiries, ask your query at:</div><br> <a href='https://icamac.kongu.edu/contactus.html' style="color: #FFF; font-weight: 600; text-decoration: none; padding: 10px; background-color: #00F; border-radius: 10px; margin: 20px; width: fit-content;">Enquire</a><br><br>
        Join us at ICAMAC 2025 as we shape the future of these vital fields.<br>
        Thank You!
        </div>
    `;

    await sendEmail(req.body.mail[0], emailSubject, emailContent);*/
    res.json({"message":"successfull"})
  }
  catch(err)
  {
    res.status(500).json({"message":err.message})
  }
})

app.get('/submissiondetails',async (req,res)=>{
  try{
    const submissiondetails = await Submission.find();
    res.status(200).json(submissiondetails);
  }
  catch(err)
  {
    res.status(500).json({error: "Error fetching Submission Details",message:err.message});
  }
})

app.post('/updatepayment',async (req,res)=>{
  try{
    const registrations = await Registration.find({phonenumber:req.body.phonenumber, email:req.body.email});
    console.log(registrations);
    if(registrations.length===0)
    {
      res.json({"message": `The Participant / Listener with email id '${req.body.email}' and phone number '${req.body.phonenumber}' is not found! Please register`});
    }
    await Registration.updateMany({phonenumber:req.body.phonenumber, email:req.body.email},{$set:{payment: req.body.payment}});
    res.json({"message":"Updated Successfully"});
  }
  catch(err){
    console.log(err.message);
    res.json({"message":err.message})
  }
})

app.post('/sendmail',async(req,res)=>{
  try{
    /*const emailSubject = `Test mail from ICAMAC2025`;
    const emailContent = `
      <div>Hello, This is a text mail from ICAMAC2025</div>
    `;

    await sendEmail(req.body.mail, emailSubject, emailContent);*/
    res.json({"message":"successfull"})
  }
  catch(err){
    res.json({"error":err.message})
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