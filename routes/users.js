const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/users - Add new user
router.post("/users", (req, res) => {
  const { name, email, phonenumber,street,city,state,zip,orderno,productname,quantity,varient,price, ordervalue } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const sql = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, phonenumber,street,city,state,zip,orderno,productname,quantity,varient,price, ordervalue], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ message: "User added", userId: this.lastID });
  });
});

// GET /api/users - Get all users
router.get("/users", (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
