const {
    insertRecord,
    getRecordById,
    updateRecord,
    deleteRecord,
    getAllRecord,
  } = require("../utils/sqlFunctions");
  
  // Create Permission
  const createPermission = async (req, res) => {
    const { name, description } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Permission name is required." });
    }
  
    try {
      const result = await insertRecord("permissions", {
        name,
        description,
      });
      res.status(201).json({ message: "Permission created", result });
    } catch (err) {
      console.error("Error creating permission:", err);
      res.status(500).json({ error: "Failed to create permission." });
    }
  };
  
  // Get All Permissions
  const getPermissions = async (req, res) => {
    try {
        const permissions = await getAllRecord("permissions", "");
        res.status(200).json(permissions);
    } catch (err) {
      console.error("Error fetching permissions:", err);
      res.status(500).json({ error: "Failed to fetch permissions." });
    }
  };
  
  // Get Permission by ID
  const getPermissionById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await getRecordById("permissions", "id", id);
      if (!result) return res.status(404).json({ error: "Permission not found." });
      res.status(200).json(result);
    } catch (err) {
      console.error("Error fetching permission:", err);
      res.status(500).json({ error: "Failed to fetch permission." });
    }
  };
  
  // Update Permission
  const updatePermission = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Permission name is required." });
    }
  
    try {
      const result = await updateRecord("permissions", { name, description }, "id", id);
      res.status(200).json({ message: "Permission updated", result });
    } catch (err) {
      console.error("Error updating permission:", err);
      res.status(500).json({ error: "Failed to update permission." });
    }
  };
  
  // Delete Permission
  const deletePermission = async (req, res) => {
    const { id } = req.params;
  
    try {
      await deleteRecord("permissions", "id", id);
      res.status(200).json({ message: "Permission deleted" });
    } catch (err) {
      console.error("Error deleting permission:", err);
      res.status(500).json({ error: "Failed to delete permission." });
    }
  };
  
  module.exports = {
    createPermission,
    getPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
  };
  