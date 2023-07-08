const express = require("express");
const router = express.Router();
const HeaderContent = require("../models/headerContent");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Get header content
router.get(
  "/admin/header",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const headerContent = await HeaderContent.findOne();
      res.json(headerContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to get header content" });
    }
  }
);

// Update header content
router.put(
  "/admin/header",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { content } = req.body;
      const headerContent = await HeaderContent.findOneAndUpdate(
        {},
        { content },
        { new: true, upsert: true }
      );
      res.json(headerContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to update header content" });
    }
  }
);

module.exports = router;
