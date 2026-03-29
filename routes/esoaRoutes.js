const express = require("express");
const { createESOA,getESOA,getEsoaStats,getEsoaPerHci ,getEsoAttachRefId} = require("../controllers/esoaController");
const { requiresAuth } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/esoas", requiresAuth, createESOA);
router.get("/esoas/:hci_no", requiresAuth, getEsoaPerHci);
router.get("/esoas/ref/:ref_id", requiresAuth, getEsoAttachRefId);
router.get("/esoas", requiresAuth, getESOA);
router.get("/esoas/all", requiresAuth, getEsoaStats);

module.exports = router;
