const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

// Middleware untuk validasi input
// const validateRegister = [
//   body('username').notEmpty().withMessage('Username is required'),
//   body('email').isEmail().withMessage('Invalid email format'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
// ];

// Rute Registrasi
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.register
);

// Rute Login
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);

module.exports = router;
