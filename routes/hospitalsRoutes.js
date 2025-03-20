const express = require("express");
const {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
} = require("../controllers/hositalController");
const router = express.Router();
const { requiresAuth } = require("../middlewares/authMiddleware");

router.post("/hospitals",requiresAuth , createHospital);
router.get("/hospitals/:id",requiresAuth , getHospitalById);
router.get("/hospitals",requiresAuth , getHospitals);
router.put("/hospitals",requiresAuth , updateHospital);
router.delete("/hospitals/:id",requiresAuth , deleteHospital);

module.exports = router;
