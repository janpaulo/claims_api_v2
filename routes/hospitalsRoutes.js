const express = require("express");
const {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
  getHospitalByAccreNo,
} = require("../controllers/hositalController");
const router = express.Router();
const { requiresAuth } = require("../middlewares/authMiddleware");

router.post("/hospitals",requiresAuth , createHospital);
router.get("/hospitals/:id",requiresAuth , getHospitalById);
router.get("/accreditation/:accreditationNum",requiresAuth , getHospitalByAccreNo);
router.get("/hospitals",requiresAuth , getHospitals);
router.put("/hospitals/:id",requiresAuth , updateHospital);
router.delete("/hospitals/:id",requiresAuth , deleteHospital);

module.exports = router;
