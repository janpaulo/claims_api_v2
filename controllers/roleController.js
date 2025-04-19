const {
    insertRecord,
    getAllRecord,
    getRecordById,
    updateRecord,
    deleteRecord,
    getRolesWithPermissions,
    assignPermissionsToRole,
  } = require("../utils/sqlFunctions");
  

  
  // Create Role
  const createRole = async (req, res) => {
    const { name, description, is_active = "active", created_by } = req.body;
  
    if (!name || !description || !created_by) {
      return res.status(400).json({ error: "All fields are required!" });
    }
  
    const roleData = {
      name,
      description,
      is_active,
      created_by,
      date_created: new Date(),
    };
  
    try {
      const result = await insertRecord("roles", roleData);
      res.status(201).json({ message: "Role created successfully!", result });
    } catch (error) {
      console.error("Error creating role:", error);
      res.status(500).json({ error: "Failed to create role. Please try again later." });
    }
  };
  
  // Get All Roles
  const getRoles = async (req, res) => {
    try {
      const result = await getAllRecord("roles", "");
      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving roles:", error);
      res.status(500).json({ error: "Failed to retrieve roles." });
    }
  };
  
  // Get Role by ID
  const getRoleById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await getRecordById("roles", "id", id);
      if (!result) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving role:", error);
      res.status(500).json({ error: "Failed to retrieve role." });
    }
  };
  
  // Update Role
  const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, description, is_active } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required." });
    }
  
    const updates = {
      name,
      description,
      is_active,
    };
  
    try {
      const result = await updateRecord("roles", updates, "id", id);
      res.status(200).json({ message: "Role updated successfully", result });
    } catch (error) {
      console.error("Error updating role:", error);
      res.status(500).json({ error: "Failed to update role." });
    }
  };
  
  // Delete Role
  const deleteRole = async (req, res) => {
    const { id } = req.params;
  
    try {
      await deleteRecord("roles", "id", id);
      res.status(200).json({ message: "Role deleted successfully!" });
    } catch (error) {
      console.error("Error deleting role:", error);
      res.status(500).json({ error: "Failed to delete role." });
    }
  };
  const getAllRolesWithPermissions = async (req, res) => {
    try {
      const roles = await getRolesWithPermissions();
      res.status(200).json(roles);
    } catch (error) {
      console.error("Error fetching roles with permissions:", error);
      res.status(500).json({ error: "Failed to retrieve roles." });
    }
    
  };



  
  const createRoleWithPermissions = async (req, res) => {
    const { name, description, is_active = "active", created_by, permissionIds } = req.body;
  
    if (!name || !description || !created_by || !Array.isArray(permissionIds)) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    const roleData = {
      name,
      description,
      is_active,
      created_by,
      date_created: new Date(),
    };
  
    try {
      const roleResult = await insertRecord("roles", roleData);
      const roleId = roleResult.insertId;
  
      await assignPermissionsToRole(roleId, permissionIds);
  
      res.status(201).json({ message: "Role and permissions saved.", roleId });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Something went wrong." });
    }
  };

  const updateRoleWithPermissions = async (req, res) => {
    const { id } = req.params;
    const { name, description, is_active, permissionIds } = req.body;
  
    if (!name || !description || !Array.isArray(permissionIds)) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    try {
      await updateRecord("roles", { name, description, is_active }, "id", id);
  
      // Remove old permissions
      await deleteRecord("role_permissions", "role_id", id);
  
      // Add new ones
      await assignPermissionsToRole(id, permissionIds);
  
      res.status(200).json({ message: "Role updated successfully." });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Failed to update role." });
    }
  };

  
  
  
  module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole,
    getAllRolesWithPermissions,
    assignPermissionsToRole,
    createRoleWithPermissions,
    updateRoleWithPermissions,
  };
  