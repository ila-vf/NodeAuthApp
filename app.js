// import modul cors
const cors = require("cors");

// import route authRoutes
const authRoutes = require('./routes/authRoutes');

// memuat environment variable
require('./config/dotenv');

// import modul express
const express = require("express");

// instance Express
const app = express();

//jalankan server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MIDDLEWARE
app.use(cors()); //mengaktifkan CORS
app.use(express.json()); //parsing req.body dalam format JSON
//parsing data URL-encoded
app.use(express.urlencoded({ extended:true }));

//Routes
app.use("/auth", authRoutes);