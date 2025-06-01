const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error("DB connection error:", err.message);
  else console.log("Connected to SQLite database.");
});

// Create the users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phonenumber TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    status TEXT,
    orderno TEXT,
    productname TEXT,
    quantity INTEGER,
    variant TEXT,
    ordervalue REAL
  )
`);


module.exports = db;
