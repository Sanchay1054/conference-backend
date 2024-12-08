const express = require('express');
const connectDB = require('./db copy');

connectDB();

const app = express();

//app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

// API endpoints
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Catch-all handler for any request not matched by the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



// app.use(cors());


const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
