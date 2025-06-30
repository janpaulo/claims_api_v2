const {
    insertRecord,
    getAllRecord,
    getRecordById,
    updateRecord,
    deleteRecord
  } = require("../utils/sqlFunctions");
  
  const table = "claims_form4";
  
  // Create
  const createClaimForm4 = async (req, res) => {
    const { series_no, member_pin, date_admited, status, xml_data, hci_no } = req.body;
    if (!series_no || !member_pin || !date_admited || !status || !hci_no) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    try {
      const result = await insertRecord(table, {
        series_no,
        member_pin,
        date_admited,
        status,
        xml_data: xml_data || null,
        hci_no,
        date_created: new Date()
      });
      res.status(201).json({ message: "Claim saved", result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save claim" });
    }
  };
  
  // Get All
  const getClaimForm4s = async (req, res) => {
    try {
      const result = await getAllRecord(table, "");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch records" });
    }
  };
  
  // Get by ID
  const getClaimForm4ById = async (req, res) => {
    try {
      const result = await getRecordById(table, "id", req.params.id);
      if (!result) return res.status(404).json({ message: "Not found" });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch record" });
    }
  };
  
  // Update
  const updateClaimForm4 = async (req, res) => {
    const { id } = req.params;
    const { series_no, member_pin, date_admited, status, xml_data, hci_no } = req.body;
    try {
      const updates = {
        series_no,
        member_pin,
        date_admited,
        status,
        xml_data,
        hci_no
      };
      const result = await updateRecord(table, updates, "id", id);
      res.status(200).json({ message: "Updated", result });
    } catch (err) {
      res.status(500).json({ error: "Failed to update" });
    }
  };
  
  // Delete
  const deleteClaimForm4 = async (req, res) => {
    try {
      await deleteRecord(table, "id", req.params.id);
      res.status(200).json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete" });
    }
  };
  
  module.exports = {
    createClaimForm4,
    getClaimForm4s,
    getClaimForm4ById,
    updateClaimForm4,
    deleteClaimForm4
  };
  