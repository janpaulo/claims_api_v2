const express = require("express");
const { createClaim, getClaims, updateClaim,getClaimsStats,getEsoaStats } = require("../controllers/claimsController");
const { requiresAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

// Secure routes with authentication
router.post("/createClaim", requiresAuth, createClaim);
router.get("/claims", requiresAuth, getClaims);
router.get("/claims/all", requiresAuth, getClaimsStats);
router.put("/claims/:id", requiresAuth, updateClaim); // Update claim by ID

module.exports = router;
