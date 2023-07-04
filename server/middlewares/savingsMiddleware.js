const express = require("express");
const Savings = require("../models/savings");
const Transaction = require("../models/transaction");
const userModel = require("../models/user");
const SavingsTemplate = require("../models/savingsTemplate");
const Settings = require("../models/settings");
const nodemailer = require("nodemailer");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const getInterestRate = async () => {
  try {
    const settings = await Settings.findOne();
    if (settings) {
      return settings.interestRate;
    } else {
      // Default interest rate if no settings document exists
      return 5;
    }
  } catch (error) {
    console.error("Error retrieving interest rate:", error);
    // Default interest rate in case of an error
    return 5;
  }
};

const router = express.Router();

router.post("/savings", authenticateToken, async (req, res) => {
  try {
    const { amount, duration, reason } = req.body;
    const userId = req.user._id; // Assuming you have authentication middleware to extract the user ID

    // Convert amount to a number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res
        .status(400)
        .json({ error: "Invalid amount. Amount must be a number." });
    }

    // Calculate release date based on duration
    const releaseDate = new Date();
    if (duration === "30days") {
      releaseDate.setDate(releaseDate.getDate() + 30);
    } else if (duration === "3months") {
      releaseDate.setMonth(releaseDate.getMonth() + 3);
    } else if (duration === "6months") {
      releaseDate.setMonth(releaseDate.getMonth() + 6);
    } else if (duration === "1year") {
      releaseDate.setFullYear(releaseDate.getFullYear() + 1);
    }

    // Calculate daily addition based on the current interest rate
    const interestRate = await getInterestRate(); // Function to retrieve the current interest rate
    const durationInDays = getDurationInDays(duration);
    const dailyAddition =
      (parsedAmount * (interestRate / 100)) / durationInDays;

    // Create a new Savings entry
    const savings = new Savings({
      amount: parsedAmount, // Use the parsed amount
      duration,
      reason,
      releaseDate,
      dailyAddition,
    });

    const savedSavings = await savings.save();
    console.log("Savings saved successfully");

    const transaction = new Transaction({
      type: "savings",
      date: savedSavings.date,
      amount: savedSavings.amount,
      status: savedSavings.status,
      user: savedSavings.user,
    });

    const savedTransaction = await transaction.save();
    savedSavings.transaction = savedTransaction._id;
    await savedSavings.save();

    // Deduct the savings amount from the user's account balance
    const user = await userModel.findById(userId);
    user.accountBalance -= parsedAmount; // Deduct the parsed amount from the account balance
    user.earnings += dailyAddition;
    user.accountBalance += dailyAddition;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mokeke250@gmail.com",
        pass: "lxvycnellvurscyl",
      },
    });
    const savingsUser = await userModel.findById(userId);
    const formattedDate = savedSavings.date;

    const template = await SavingsTemplate.findOne({});
    const savingsContent = template?.savingsContent || "";

    const mailOptions = {
      from: '"Finflow 👻" <mokeke250@gmail.com>',
      to: savingsUser.email,
      subject: "Savings Confirmation",
      html: savingsContent
        .replace("{userName}", savingsUser.userName)
        .replace("{amount}", amount)
        .replace("{duration}", duration)
        .replace("{reason}", reason)
        .replace("{date}", formattedDate)
        .replace("{userName}", savingsUser.userName)
        .replace("{transactionId}", savedSavings._id)
        .replace("{balance}", savingsUser.accountBalance),
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Savings created successfully.", interestRate });
  } catch (error) {
    console.error("An error occurred while creating savings:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating savings." });
  }
});
const getDurationInDays = (duration) => {
  if (duration === "30days") {
    return 30;
  } else if (duration === "3months") {
    return 90;
  } else if (duration === "6months") {
    return 180;
  } else if (duration === "1year") {
    return 365;
  }
  return 0;
};

// Assuming you have a route to fetch the total earnings for a user
router.get("/total-earnings", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have authentication middleware to extract the user ID

    const user = await userModel.findById(userId);
    const totalEarnings = user.earnings;

    res.json({ totalEarnings });
  } catch (error) {
    console.error(
      "An error occurred while fetching the total earnings:",
      error
    );
    res.status(500).json({ error: "Failed to fetch total earnings" });
  }
});

// Assuming you're using Express.js
router.get("/interest-rate", authenticateToken, (req, res) => {
  try {
    const interestRate = getInterestRate(); // Replace with your logic to fetch the interest rate from the database or any other data source
    res.json({ interestRate });
  } catch (error) {
    console.error("An error occurred while fetching the interest rate:", error);
    res.status(500).json({ error: "Failed to fetch interest rate" });
  }
});

// Get all savings entries
router.get("/savings", async (req, res) => {
  try {
    const savings = await Savings.find().maxTimeMS(30000);
    res.json(savings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching savings." });
  }
});

//ADMIN ROUTES ************** ADMIN ROUTES ******** ADMIN ROUTES

router.get(
  "/admin/get-email-savings",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const template = await SavingsTemplate.findOne({});
      res.json({ savingsContent: template?.savingsContent });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving the email template",
      });
    }
  }
);

router.put(
  "/admin/update-email-savings",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { updatedSavingsContent } = req.body;

      const template = await SavingsTemplate.findOne({});
      if (template) {
        template.savingsContent = updatedSavingsContent;

        await template.save();
      } else {
        await SavingsTemplate.create({
          savingsContent: updatedSavingsContent,
        });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while updating the savings email template",
      });
    }
  }
);

router.put(
  "/admin/interest-rate",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { interestRate } = req.body;

      // Check if a settings document exists
      let settings = await Settings.findOne();

      // If no settings document exists, create a new one
      if (!settings) {
        settings = new Settings();
      }

      // Update the interest rate in the settings document
      settings.interestRate = interestRate;
      await settings.save();

      res.status(200).json({ message: "Interest rate updated successfully." });
    } catch (error) {
      console.error("Error updating interest rate:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the interest rate." });
    }
  }
);

// Get all savings transactions
/*router.get(
  "/admin/savings-transactions",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const transactions = await Transaction.find({ type: "savings" }).populate(
        "user",
        "userName"
      );
      res.json(transactions);
    } catch (error) {
      console.error(
        "An error occurred while fetching savings transactions:",
        error
      );
      res.status(500).json({ error: "Failed to fetch savings transactions" });
    }
  }
); */

router.get(
  "/admin/savings-transactions",
  authenticateToken,
  authorizeAdmin,

  async (req, res) => {
    try {
      const savings = await Savings.find().populate({
        path: "user",
        select: "userName",
      });
      res.status(200).json({ savings });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch savings" });
    }
  }
);

router.patch(
  "/admin/savings/:id",
  authenticateToken,
  authorizeAdmin,

  async (req, res) => {
    const savingsId = req.params.id;
    const { status } = req.body;

    try {
      const savings = await Savings.findById(savingsId);
      if (!savings) {
        return res.status(404).json({ error: "Savings not found" });
      }

      savings.status = status;
      const updatedSavings = await savings.save();
      res.status(200).json({ savings: updatedSavings });
    } catch (error) {
      res.status(500).json({ error: "Failed to update withdrawal status" });
    }
  }
);

module.exports = router;
