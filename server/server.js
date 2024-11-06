const express = require('express');
const app = express();
require('dotenv').config(); 
const dbConnect = require('./Config/database');
// const router = require('./Routes/routes');

const PORT = process.env.PORT || 4000;

app.use(express.json()); 

// app.use('/api/v1', router); 

app.get('/', async (req, res) => {
    res.send("Everything is working great");
});

dbConnect();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
