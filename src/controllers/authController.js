const User = require("../models/User");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna ke database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error); // Tambahkan logging
    res.status(400).json({
      message: "Error registering user",
      error: error.message || "Unknown error",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari pengguna berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Filter data user sebelum mengembalikan
    const { id, email } = user;

    // Berikan response dengan token dan data user
    res.json({
      message: "Login successful",
      token,
      user: {
        id,
        username,
        email,
        password
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
