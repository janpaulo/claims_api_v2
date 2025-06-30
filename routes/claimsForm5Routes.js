const express = require("express");
const router = express.Router();
const {
  createClaimForm5,
  getClaimForm5s,
  getClaimForm5ById,
  updateClaimForm5,
  deleteClaimForm5
} = require("../controllers/claimsForm5Controller");

router.post("/", createClaimForm5);
router.get("/", getClaimForm5s);
router.get("/:id", getClaimForm5ById);
router.put("/:id", updateClaimForm5);
router.delete("/:id", deleteClaimForm5);

module.exports = router;
