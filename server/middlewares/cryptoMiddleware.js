const express = require("express");
const CryptoWallet = require("../models/crypto");
//const Transaction = require("../models/transaction");
//const userModel = require("../models/user");
//const WithdrawTemplate = require("../models/withdrawalTemplate");
//const nodemailer = require("nodemailer");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/cryptos", async (req, res) => {
  try {
    const cryptos = await CryptoWallet.find({ active: true });
    res.json(cryptos);
  } catch (error) {
    console.error("Error fetching wallet addresses:", error);
    res.status(500).json({ error: "Failed to fetch wallet addresses" });
  }
});

//ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES

router.post(
  "/admin/cryptos",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const cryptos = req.body;
      const savedCryptos = await CryptoWallet.create(cryptos);
      res.json(savedCryptos);
    } catch (error) {
      console.error("Error saving wallet addresses:", error);
      res.status(500).json({ error: "Failed to save wallet addresses" });
    }
  }
);

// Get all wallet addresses

router.get(
  "/admin/cryptos",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const cryptos = await CryptoWallet.find();
      res.json(cryptos);
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
      res.status(500).json({ error: "Failed to fetch cryptocurrencies" });
    }
  }
);

// PUT /admin/cryptos/:id - Update the status of a specific cryptocurrency
router.put(
  "/admin/cryptos/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const cryptoId = req.params.id;
    const { active, address, bankName, bankNumber } = req.body;

    try {
      const updatedCrypto = await CryptoWallet.findByIdAndUpdate(
        cryptoId,
        { active, address, bankName, bankNumber },
        { new: true }
      );

      if (!updatedCrypto) {
        return res.status(404).json({ error: "Cryptocurrency not found" });
      }

      res.json(updatedCrypto);
    } catch (error) {
      console.error("Error updating cryptocurrency:", error);
      res.status(500).json({ error: "Failed to update cryptocurrency" });
    }
  }
);

module.exports = router;
