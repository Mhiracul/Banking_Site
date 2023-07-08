const express = require("express");
const router = express.Router();
const FooterContent = require("../models/footerContent");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

// Get footer content
router.get(
  "/admin/footer",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const footerContent = await FooterContent.findOne();
      res.json(footerContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to get footer content" });
    }
  }
);

// Update footer content
router.put(
  "/admin/footer",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { content } = req.body;
      const footerContent = await FooterContent.findOneAndUpdate(
        {},
        { content },
        { new: true, upsert: true }
      );
      res.json(footerContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to update footer content" });
    }
  }
);

module.exports = router;
