const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//cookie-parser-what is this and why we need this
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// Database connection
require("./config/database").connect();

//cloudinary connection


require("./config/cloudinary").cloudinaryConnect();





//routes
const Upload=require("./routes/FileUpload");
app.use('/api/v1/upload',Upload);
const userRoutes=require("./routes/user");

app.use("/api/v1",userRoutes);


// Activate server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});