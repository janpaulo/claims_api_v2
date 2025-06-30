const {
    insertRecord,
    getAllRecord,
    getRecordById,
    updateRecord,
    deleteRecord
  } = require("../utils/sqlFunctions");
  
  const table = "esoa_unit_lib";
  
  // CREATE
  const createUnit = async (req, res) => {
    const { unit_desc, inserted_by } = req.body;
    if (!unit_desc || !inserted_by) {
      return res.status(400).json({ error: "unit_desc and inserted_by are required" });
    }
  
    try {
      const data = {
        unit_desc,
        inserted_by,
        status: "inactive",
        date_inserted: new Date()
      };
      const result = await insertRecord(table, data);
      res.status(201).json({ message: "Unit created", result });
    } catch (err) {
      res.status(500).json({ error: "Failed to create unit" });
    }
  };
  
  // READ
  const getUnits = async (req, res) => {
    try {
      const result = await getAllRecord(table, "");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve units" });
    }
  };
  
  const getUnitById = async (req, res) => {
    try {
      const result = await getRecordById(table, "unit_id", req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve unit" });
    }
  };
  
  // UPDATE
  const updateUnit = async (req, res) => {
    const { id } = req.params;
    const { unit_desc, status, activate_requested_by, deactivate_requested_by } = req.body;
  
    const updates = { unit_desc, status };
  
    if (status === "active") {
      updates.date_activated = new Date();
      updates.activate_requested_by = activate_requested_by;
    } else if (status === "inactive") {
      updates.date_deactivated = new Date();
      updates.deactivate_requested_by = deactivate_requested_by;
    }
  
    try {
      const result = await updateRecord(table, updates, "unit_id", id);
      res.status(200).json({ message: "Unit updated", result });
    } catch (err) {
      res.status(500).json({ error: "Failed to update unit" });
    }
  };
  
  // DELETE
  const deleteUnit = async (req, res) => {
    try {
      await deleteRecord(table, "unit_id", req.params.id);
      res.status(200).json({ message: "Unit deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete unit" });
    }
  };
  
  module.exports = {
    createUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit
  };
  