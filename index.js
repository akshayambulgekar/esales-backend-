// index.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/email");
const userRoutes = require("./routes/users");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api", emailRoutes);
app.use("/api", userRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
