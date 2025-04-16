const express = require('express');
const router = express.Router();
const { insertRecord, getAllRecord, getRecordById, updateRecord, deleteRecord } = require("../utils/sqlFunctions");

// Create Hospital Account
const createHospital = async (req, res) => { 
  const { hospital_name, accreditation_num, cypher_key, created_by, is_active = "active" } = req.body;

  if (!hospital_name || !accreditation_num || !cypher_key || !created_by) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const hospitalData = {
    hospital_name,
    accreditation_num,
    cypher_key,
    is_active,
    created_by,
    date_ceated: new Date(),
  };

  try {
    const result = await insertRecord("hospital_accounts", hospitalData);
    res.status(201).json({ message: "Hospital account created successfully!", result });
  } catch (error) {
    console.error("Error creating hospital account:", error);
    res.status(500).json({ error: "Failed to create hospital account. Please try again later." });
  }
};


// Get All Hospital Accounts
const getHospitals = async (req, res) => {
  try {
    const result = await getAllRecord("hospital_accounts", "");
    res.status(200).json({ message: "Hospital records retrieved successfully!", result });
  } catch (error) {
    console.error("Error retrieving hospital records:", error);
    res.status(500).json({ error: "Failed to retrieve hospital records. Please try again later." });
  }
};

// Get Hospital Account by ID
const getHospitalById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getRecordById("hospital_accounts", "hos_id", id);
    if (!result) {
      return res.status(404).json({ message: "Hospital account not found" });
    }
    res.status(200).json({ message: "Hospital record retrieved successfully!", result });
  } catch (error) {
    console.error("Error retrieving hospital record:", error);
    res.status(500).json({ error: "Failed to retrieve hospital record. Please try again later." });
  }
};

const getHospitalByAccreNo = async (req, res) => {
  const { accreditationNum } = req.params; // Use a clearer variable name

  try {
    const result = await getRecordById("hospital_accounts", "accreditation_num", accreditationNum);
    if (!result) {
      return res.status(404).json({ message: "Hospital account not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving hospital record:", error);
    res.status(500).json({ error: "Failed to retrieve hospital record. Please try again later." });
  }
};
// Update Hospital Account
const updateHospital = async (req, res) => {
  const { id } = req.params;
  const { hospital_name, accreditation_num, cypher_key, is_active, created_by } = req.body;

  // Check if all required fields are provided
  if (!hospital_name || !accreditation_num || !cypher_key) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Prepare the object of fields to update
    const updates = {
      hospital_name,
      accreditation_num,
      cypher_key,
      is_active,  // Optional field
      created_by, // Optional field, usually for who created the record
    };

    // Call updateRecord with the table name, update object, column name ('hos_id'), and ID
    const result = await updateRecord("hospital_accounts", updates, "hos_id", id);

    // Respond with success message
    res.status(200).json({ message: "Hospital account updated successfully!", result });
  } catch (error) {
    console.error("Error updating hospital account:", error);
    res.status(500).json({ error: "Failed to update hospital account. Please try again later." });
  }
};

// Delete Hospital Account
const deleteHospital = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteRecord("hospital_accounts", "hos_id", id);
    res.status(200).json({ message: "Hospital account deleted successfully!" });
  } catch (error) {
    console.error("Error deleting hospital account:", error);
    res.status(500).json({ error: "Failed to delete hospital account. Please try again later." });
  }
};

// Define Routes
// router.post('/', createHospital);
// router.get('/', getHospitals);
// router.get('/:id', getHospitalById);
// router.put('/:id', updateHospital);
// router.delete('/:id', deleteHospital);

// module.exports = router;

module.exports = {
    createHospital,
    getHospitals,
    getHospitalById,
    updateHospital,
    deleteHospital,
    getHospitalByAccreNo
  };
  