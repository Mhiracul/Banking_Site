const express = require("express");
const VirtualCard = require("../models/virtualCard");
//const Transaction = require("../models/transaction");
//const userModel = require("../models/user");
//const WithdrawTemplate = require("../models/withdrawalTemplate");
//const nodemailer = require("nodemailer");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/virtual-cards", authenticateToken, async (req, res) => {
  try {
    const { cardType, name } = req.body;

    const card = new VirtualCard({
      cardType,
      name,
    });

    await card.save();
    res.status(201).json(card);
  } catch (error) {
    console.error("Error saving virtual card:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the virtual card." });
  }
});
// Backend API route
router.get(
  "/admin/virtual-cards",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const cards = await VirtualCard.find();
      res.json(cards);
    } catch (error) {
      console.error("Error retrieving virtual cards:", error);
      res.status(500).json({ error: "Failed to retrieve virtual cards" });
    }
  }
);

const cardData = {
  name: "Virtual Card",
  description: "This is a virtual card for demonstration purposes",
  imageUrl:
    "https://img.freepik.com/premium-psd/credit-card-mockup-design-3d-rendering_308376-76.jpg?size=626&ext=jpg&ga=GA1.1.642060606.1680809827&semt=ais",
  number: "1234 5678 9012 3456",
  expMonth: "12",
  expYear: "2024",
};

router.get("/card", (req, res) => {
  res.json(cardData);
});
module.exports = router;
