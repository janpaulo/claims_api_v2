const express = require('express');
const router = express.Router();
const { insertRecord,
  getAllRecord
 } = require("../utils/sqlFunctions");

const createClaim = async (req, res) => {
  const {
    series_no,
    member_pin,
    date_admited,
    status,
    hci_no,
    date_created,
    xml_data
  } = req.body;

  if (!series_no || !member_pin || !date_admited || !status || !hci_no || !date_created || !xml_data) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const claim = {
    series_no,
    member_pin,
    date_admited,
    status,
    hci_no,
    date_created,
    xml_data
  };

  try {
    // Ensure insertRecord resolves or rejects appropriately
    const result = await insertRecord("claims", claim);

    res.status(201).json({ message: "Claim created successfully!", result });
  } catch (error) {
    console.error("Error inserting claim:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create claim. Please try again later." });
  }
};

const getClaims = async (req, res) => {

  try {
    // Ensure insertRecord resolves or rejects appropriately
    const result = await getAllRecord("claims", "");

    res.status(201).json({ message: "Claim created successfully!", result });
  } catch (error) {
    console.error("Error inserting claim:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create claim. Please try again later." });
  }
};

module.exports = {
  createClaim,
  getClaims
};
