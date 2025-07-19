const express = require('express');
const router = express.Router();
const { insertRecord, getAllRecord,getEsoasStats,checkRecordExists } = require("../utils/sqlFunctions");

// Create ESOA
const createESOA = async (req, res) => {
  const {
    professional_fee,
    hci_no,
    total_amount,
    sum_philhealth_amount,
    prof_philhealth_amount,
    xml_data
  } = req.body;

  if (!hci_no || !sum_philhealth_amount || !prof_philhealth_amount || !xml_data) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const esoaData = {
    professional_fee,
    hci_no,
    total_amount,
    sum_philhealth_amount,
    prof_philhealth_amount,
    xml_data
  };



  try {
    // Ensure insertRecord resolves or rejects appropriately
    const result = await insertRecord("esoa", esoaData);

    res.status(201).json({ message: "ESOA created successfully!", result });
  } catch (error) {
    console.error("Error creating ESOA:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create ESOA. Please try again later." });
  }
};



const getEsoaStats = async (req, res) => {
  try {
    const data = await getEsoasStats();
    res.status(200).json({
      message: "ESOA stats retrieved successfully!",
      data
    });
  } catch (error) {
    console.error("Error retrieving ESOA stats:", error);
    res.status(500).json({ error: "Failed to retrieve ESOA stats." });
  }
};
// Get ESOA
const getESOA = async (req, res) => {
  try {
    // Ensure getAllRecord resolves or rejects appropriately
    const result = await getAllRecord("esoa", "");

    res.status(200).json({ message: "ESOA records retrieved successfully!", result });
  } catch (error) {
    console.error("Error retrieving ESOA records:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to retrieve ESOA records. Please try again later." });
  }
};

const getEsoaPerHci = async (req, res) => {
  const { hci_no } = req.params;

  try {
    const esoa = await checkRecordExists("esoa", "hci_no", hci_no,true);
    // if (!esoa) {
    //   return res.status(404).json({ error: "Esoa not found" });
    // }

    
    res.status(200).json({
      message: "Esoa statistics retrieved successfully!",
      esoa:!esoa ? [] :esoa
    });
  } catch (error) {
    console.error("Error updating Esoa:", error);
    res.status(500).json({ error: "Failed to  Esoa. Please try again later." });
  }
};


module.exports = {
  createESOA,
  getESOA,
  getEsoaStats,
  getEsoaPerHci
};
