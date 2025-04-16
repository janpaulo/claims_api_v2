const express = require("express");
const { createESOA,getESOA,getEsoaStats } = require("../controllers/esoaController");
const { requiresAuth } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/createEsoa", requiresAuth, createESOA);
router.get("/esoas", requiresAuth, getESOA);
router.get("/esoas/all", requiresAuth, getEsoaStats);

module.exports = router;
