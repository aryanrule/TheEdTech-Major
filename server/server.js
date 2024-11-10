const express = require('express');
const app = express();
require('dotenv').config(); 
const dbConnect = require('./Config/database');
const UserRouter = require('./Routes/User');
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 4000;

app.use(express.json()); 
app.use(cookieParser());

app.use('/api/v1/' , UserRouter);

app.get('/', async (req, res) => {
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
dbConnect();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
