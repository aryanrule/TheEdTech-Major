const mongoose = require('mongoose');
require('dotenv').config(); // Loads environment variables from a .env file

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log("Database connected successfully");
            })
            .catch((e) => {
                console.error("Error in connection:", e);
            });
    } catch (error) {
        console.error("Error in database connection:", error);
    }
};

module.exports = dbConnect;
