const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config(); 
const dbConnect = require('./Config/database');


const UserRouter = require('./Routes/User');
const ProfileRoutes = require('./Routes/Profile');
const CoursesRoutes = require('./Routes/Course');


const cookieParser = require('cookie-parser');
const {cloudinaryConnect} = require('./Config/cloudinary');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 4000;


app.use(cors());

app.use(express.json()); 
app.use(cookieParser());

app.use(fileUpload({
	useTempFiles:true, 
	tempFileDir:'/tmp' , 
}));




app.use('/api/v1/auth/' , UserRouter);
app.use('/api/v1/Profile/' , ProfileRoutes);
app.use('/api/v1/Courses' , CoursesRoutes);




app.get('/', async (req, res) => {
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});




dbConnect();
cloudinaryConnect();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


