const express = require("express");
// impor fungsi registerUser dari file authController.js
const { registerUser, loginUser } = require('../controllers/authController');
// membuat router Express
const router = express.Router();

// menentukan route POST di endpoint /register
// yang akan memanggil fungsi registerUser
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;