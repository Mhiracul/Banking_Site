const express = require("express");
const DynamicValues = require("../models/loanValues");
//const Transaction = require("../models/transaction");
//const userModel = require("../models/user");
//const SavingsTemplate = require("../models/savingsTemplate");
//const Settings = require("../models/settings");
//const nodemailer = require("nodemailer");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/admin/dynamic-values",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      // Assuming the request body contains the updated dynamic values
      const updatedDynamicValues = req.body;

      // Find the dynamic values document in the database (assuming there's only one document)
      const dynamicValues = await DynamicValues.findOne();

      if (dynamicValues) {
        // Update the dynamic values in the database
        dynamicValues.reasons = updatedDynamicValues.reasons;

        await dynamicValues.save();

        res.json({ message: "Dynamic values updated successfully" });
      } else {
        // Create a new document if it doesn't exist
        await DynamicValues.create(updatedDynamicValues);
        res.json({ message: "Dynamic values created successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

// ...

router.get("/dynamic-values", authenticateToken, async (req, res) => {
  try {
    // Find the dynamic values document in the database (assuming there's only one document)
    const dynamicValues = await DynamicValues.findOne();

    if (dynamicValues) {
      res.json(dynamicValues);
    } else {
      res.status(404).json({ error: "Dynamic values not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
