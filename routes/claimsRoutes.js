const express = require("express");
const { createClaim, getClaims, updateClaim,getClaimsStats,getClaimPerHci,getClaimsNumber } = require("../controllers/claimsController");
const { requiresAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

// Secure routes with authentication
router.post("/createClaim", requiresAuth, createClaim);
router.get("/claims", requiresAuth, getClaims);
router.get("/claims-number/:hci_no", requiresAuth, getClaimsNumber);
router.get("/claims/all", requiresAuth, getClaimsStats);
router.get("/claims/:hci_no", requiresAuth, getClaimPerHci);
router.put("/claims/:id", requiresAuth, updateClaim); // Update claim by ID

module.exports = router;
