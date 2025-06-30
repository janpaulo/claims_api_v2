const {
    insertRecord,
    getAllRecord,
    getRecordById,
    updateRecord,
    deleteRecord
  } = require("../utils/sqlFunctions");
  
  const table = "esoa_item_lib";
  
  // CREATE
  const createItem = async (req, res) => {
    const { cat_id, item_desc, ref_id, inserted_by } = req.body;
    if (!cat_id || !item_desc || !inserted_by) {
      return res.status(400).json({ error: "cat_id, item_desc, and inserted_by are required" });
    }
  
    try {
      const data = {
        cat_id,
        item_desc,
        ref_id,
        inserted_by,
        status: "inactive",
        date_inserted: new Date()
      };
      const result = await insertRecord(table, data);
      res.status(201).json({ message: "Item created", result });
    } catch (err) {
      res.status(500).json({ error: "Failed to create item" });
    }
  };
  
  // READ
  const getItems = async (req, res) => {
    try {
      const result = await getAllRecord(table, "");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve items" });
    }
  };
  
  const getItemById = async (req, res) => {
    try {
      const result = await getRecordById(table, "item_id", req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve item" });
    }
  };
  
  // UPDATE
  const updateItem = async (req, res) => {
    const { id } = req.params;
    const {
      cat_id,
      item_desc,
      ref_id,
      status,
      activate_requested_by,
      deactivate_requested_by
    } = req.body;
  
    const updates = {
      cat_id,
      item_desc,
      ref_id,
      status
    };
  
    if (status === "active") {
      updates.date_activated = new Date();
      updates.activate_requested_by = activate_requested_by;
    } else if (status === "inactive") {
      updates.date_deactivated = new Date();
      updates.deactivate_requested_by = deactivate_requested_by;
    }
  
    try {
      const result = await updateRecord(table, updates, "item_id", id);
      res.status(200).json({ message: "Item updated", result });
    } catch (err) {
      res.status(500).json({ error: "Failed to update item" });
    }
  };
  
  // DELETE
  const deleteItem = async (req, res) => {
    try {
      await deleteRecord(table, "item_id", req.params.id);
      res.status(200).json({ message: "Item deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  };
  
  module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
  };
  