const express = require("express");
const router = express.Router();
const {
  createAttachedFile,
  getAttachedFiles,
  getAttachedFileById,
  updateAttachedFile,
  deleteAttachedFile
} = require("../controllers/attachedFilesController");

router.post("/", createAttachedFile);
router.get("/", getAttachedFiles);
router.get("/:id", getAttachedFileById);
router.put("/:id", updateAttachedFile);
router.delete("/:id", deleteAttachedFile);

module.exports = router;
