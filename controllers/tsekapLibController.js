
const {
  getAllRecord,
} = require("../utils/sqlFunctions");


const createGetAllHandler = (table) => async (req, res) => {
  try {
    const result = await getAllRecord(table, "");
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error retrieving data from ${table}:`, error);
    res.status(500).json({ error: `Failed to retrieve data from ${table}` });
  }
};

module.exports = {
  getLibMedicineUnit: createGetAllHandler("lib_medicine_unit"),
  getLibSkin: createGetAllHandler("lib_skin"),
  getTsekapLibAbdomen: createGetAllHandler("tsekap_lib_abdomen"),
  getTsekapLibChest: createGetAllHandler("tsekap_lib_chest"),
  getTsekapLibChiefComplaint: createGetAllHandler("tsekap_lib_chief_complaint"),
  getTsekapLibGenitourinary: createGetAllHandler("tsekap_lib_genitourinary"),
  getTsekapLibHeart: createGetAllHandler("tsekap_lib_heart"),
  getTsekapLibHeent: createGetAllHandler("tsekap_lib_heent"),
  getTsekapLibIcd: createGetAllHandler("tsekap_lib_icd"),
  getTsekapLibMedicine: createGetAllHandler("tsekap_lib_medicine"),
  getTsekapLibMedicineSalt: createGetAllHandler("tsekap_lib_medicine_salt"),
  getTsekapLibMedsForm: createGetAllHandler("tsekap_lib_meds_form"),
  getTsekapLibMedsGeneric: createGetAllHandler("tsekap_lib_meds_generic"),
  getTsekapLibMedsPackage: createGetAllHandler("tsekap_lib_meds_package"),
  getTsekapLibMedsStrength: createGetAllHandler("tsekap_lib_meds_strength"),
  getTsekapLibNeuro: createGetAllHandler("tsekap_lib_neuro"),
};
