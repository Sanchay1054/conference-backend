const express = require('express');
const connectDB = require('./db copy');

connectDB();

const app = express();

app.use(express.json());

// app.use(cors());

app.get("/",(req, res)=>{
    res.send("Heelo World!");
})

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
