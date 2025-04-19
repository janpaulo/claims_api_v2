const express = require("express");
const router = express.Router();
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  getAllRolesWithPermissions,
  createRoleWithPermissions
} = require("../controllers/roleController");

router.get("/roles", getRoles);
router.get("/roles/permissions", getAllRolesWithPermissions);
router.get("/roles/:id", getRoleById);
router.post("/roles", createRoleWithPermissions);
router.post("/roles/permissions", createRoleWithPermissions);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

module.exports = router;
