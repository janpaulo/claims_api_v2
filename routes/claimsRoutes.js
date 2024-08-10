const express = require("express");
const { createClaim,getClaims } = require("../controllers/claimsController");
const router = express.Router();

router.post("/createClaim", createClaim);
router.get("/claims", getClaims);

module.exports = router;
