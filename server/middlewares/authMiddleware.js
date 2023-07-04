const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = decoded; // Set the decoded user information
    next();
  });
};

// Middleware to authorize admin
// Middleware to authorize admin
const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user);
    const getRole = user.role;

    console.log("User ID:", req.user); // Log the user ID for verification
    console.log("User role:", getRole); // Log the user role

    if (getRole !== "admin") {
      console.log("Access denied for non-admin user");
      return res.status(403).json({ error: "Access denied" });
    }

    console.log("Access granted for admin user");
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { authenticateToken, authorizeAdmin };
