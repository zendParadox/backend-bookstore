require("dotenv").config();
const { authenticateToken } = require("./middlewares/authMiddleware");
const cryptoRoutes = require("./routes/cryptoRoutes");

const express = require("express");
const app = express();

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database");

app.use(express.json());
app.use("/api/books", bookRoutes);

app.use("/api/auth", authRoutes);
// Contoh proteksi endpoint menggunakan middleware
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you have access!` });
});

app.use("/api", cryptoRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected!");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.log("Error connecting to database:", err));
