const express = require("express");
const router = express.Router();
const {
  createClaimForm4,
  getClaimForm4s,
  getClaimForm4ById,
  updateClaimForm4,
  deleteClaimForm4,
  getClaimForm4AttachRefId
} = require("../controllers/claimsForm4Controller");

const { requiresAuth } = require("../middlewares/authMiddleware");
router.post("/", createClaimForm4);
router.get("/", getClaimForm4s);
router.get("/:ref_id", requiresAuth, getClaimForm4AttachRefId);
router.get("/:id", getClaimForm4ById);
router.put("/:id", updateClaimForm4);
router.delete("/:id", deleteClaimForm4);

module.exports = router;
