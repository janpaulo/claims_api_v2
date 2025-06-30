const express = require("express");
const router = express.Router();
const {
  createClaimForm3,
  getClaimForm3s,
  getClaimForm3ById,
  updateClaimForm3,
  deleteClaimForm3
} = require("../controllers/claimsForm3Controller");

router.post("/", createClaimForm3);
router.get("/", getClaimForm3s);
router.get("/:id", getClaimForm3ById);
router.put("/:id", updateClaimForm3);
router.delete("/:id", deleteClaimForm3);

module.exports = router;
