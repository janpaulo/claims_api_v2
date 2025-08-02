const express = require("express");
const {
  getLibMedicineUnit,
  getLibSkin,
  getTsekapLibAbdomen,
  getTsekapLibChest,
  getTsekapLibChiefComplaint,
  getTsekapLibGenitourinary,
  getTsekapLibHeart,
  getTsekapLibHeent,
  getTsekapLibIcd,
  getTsekapLibMedicine,
  getTsekapLibMedicineSalt,
  getTsekapLibMedsForm,
  getTsekapLibMedsGeneric,
  getTsekapLibMedsPackage,
  getTsekapLibMedsStrength,
  getTsekapLibNeuro,
} = require("../controllers/tsekapLibController");

const { requiresAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/lib_medicine_unit", requiresAuth, getLibMedicineUnit);
router.get("/lib_skin", requiresAuth, getLibSkin);
router.get("/tsekap_lib_abdomen", requiresAuth, getTsekapLibAbdomen);
router.get("/tsekap_lib_chest", requiresAuth, getTsekapLibChest);
router.get("/tsekap_lib_chief_complaint", requiresAuth, getTsekapLibChiefComplaint);
router.get("/tsekap_lib_genitourinary", requiresAuth, getTsekapLibGenitourinary);
router.get("/tsekap_lib_heart", requiresAuth, getTsekapLibHeart);
router.get("/tsekap_lib_heent", requiresAuth, getTsekapLibHeent);
router.get("/tsekap_lib_icd", requiresAuth, getTsekapLibIcd);
router.get("/tsekap_lib_medicine", requiresAuth, getTsekapLibMedicine);
router.get("/tsekap_lib_medicine_salt", requiresAuth, getTsekapLibMedicineSalt);
router.get("/tsekap_lib_meds_form", requiresAuth, getTsekapLibMedsForm);
router.get("/tsekap_lib_meds_generic", requiresAuth, getTsekapLibMedsGeneric);
router.get("/tsekap_lib_meds_package", requiresAuth, getTsekapLibMedsPackage);
router.get("/tsekap_lib_meds_strength", requiresAuth, getTsekapLibMedsStrength);
router.get("/tsekap_lib_neuro", requiresAuth, getTsekapLibNeuro);

module.exports = router;
