const express = require("express");
const router = express.Router();
const {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");

router.post("/permissions", createPermission);
router.get("/permissions", getPermissions);
router.get("/permissions/:id", getPermissionById);
router.put("/permissions/:id", updatePermission);
router.delete("/permissions/:id", deletePermission);

module.exports = router;
