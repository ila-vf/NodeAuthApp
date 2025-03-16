require('dotenv').config();
// import modul mysql2
const mysql = require("mysql2");

// membuat koneksi db
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// koneksi ke database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log(`Connected to MySQL Database on port ${process.env.DB_PORT}`);
    }
});

// mengekspor objek db
module.exports = db;