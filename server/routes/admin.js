const express = require("express");
const router = express.Router();

const {
  authenticateToken,
  authorizeAdmin,
  userModel,
} = require("../middlewares");

router.get("/admin", authenticateToken, authorizeAdmin, (req, res) => {
  res.send({ message: "Welcome to the admin-only route!", alert: true });
});

router.get(
  "/admin/user/count",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const count = await userModel.countDocuments();
      res.json({ count });
    } catch (error) {
      console.error("Error retrieving user count:", error);
      res.status(500).json({ error: "Failed to retrieve user count" });
    }
  }
);

// Add more admin-related routes as needed

module.exports = router;
