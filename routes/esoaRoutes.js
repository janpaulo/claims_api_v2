const express = require("express");
const { createESOA,getESOA } = require("../controllers/esoaController");
const router = express.Router();

router.post("/createEsoa", createESOA);
router.get("/esoas", getESOA);

module.exports = router;
