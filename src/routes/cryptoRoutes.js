const express = require("express");
const { encrypt, decrypt } = require("../services/crypto");
const router = express.Router();

router.post("/encrypt", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const encryptedData = encrypt(text);
  res.json({ encryptedData });
});

router.post("/decrypt", (req, res) => {
  const { encryptedData } = req.body;
  if (!encryptedData)
    return res.status(400).json({ error: "Encrypted data is required" });
  const decryptedData = decrypt(encryptedData);
  res.json({ decryptedData });
});

module.exports = router;
