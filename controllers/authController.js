const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password)" + " VALUES (?,?,?)";
    db.query(sql, [name, email, hashedPassword], (err, results) => {
        if (err) return res.status(500).json(
            { message: "Error registering user", error: err }
        );
        res.status(201).json(
            { message: "User registered successfully" }
        );
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? ";
        db.query(sql, [email], async (err, results) => {
            if (err) return res.status(500).json(
                { message: "Error logging in", error: err}
            );
            if (results.length === 0) {
                return res.status(401).json({ message: " Invalid email or password" });
            }
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json(
                    { message: "Invalid email or password"}
                );
            }
            const token = jwt.sign({ id: user.id, email : user.email },
                process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.json({ token });
        });
};
module.exports = { registerUser, loginUser };