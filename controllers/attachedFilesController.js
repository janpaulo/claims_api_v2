const {
  insertRecord,
  getAllRecord,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require("../utils/sqlFunctions");

// CREATE: Upload new document metadata
const createAttachedFile = async (req, res) => {
  const { name, json_data, url, original_filename, mime_type, size, accre_no } =
    req.body;

  if (
    !name ||
    !json_data ||
    !url ||
    !original_filename ||
    !mime_type ||
    !size ||
    !accre_no
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const fileData = {
    name,
    json_data: JSON.stringify(json_data),
    url,
    original_filename,
    mime_type,
    size,
    accre_no,
    uploaded_at: new Date(),
  };

  try {
    const result = await insertRecord("attached_files", fileData);
    res.status(201).json({ message: "File record created.", result });
  } catch (error) {
    console.error("Error inserting attached file:", error);
    res.status(500).json({ error: "Failed to save file record." });
  }
};

// READ: Get all files
const getAttachedFiles = async (req, res) => {
  try {
    const result = await getAllRecord("attached_files", "");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting attached files:", error);
    res.status(500).json({ error: "Failed to get attached files." });
  }
};

// READ: Get file by ID
const getAttachedFileById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getRecordById("attached_files", "id", id);
    if (!result) return res.status(404).json({ message: "File not found." });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting attached file:", error);
    res.status(500).json({ error: "Failed to get file." });
  }
};

// UPDATE: Update file metadata
const updateAttachedFile = async (req, res) => {
  const { id } = req.params;
  const { name, json_data, url, original_filename, mime_type, size, accre_no } =
    req.body;

  try {
    const updates = {
      name,
      json_data: JSON.stringify(json_data),
      url,
      original_filename,
      mime_type,
      size,
      accre_no,
    };

    const result = await updateRecord("attached_files", updates, "id", id);
    res.status(200).json({ message: "File record updated.", result });
  } catch (error) {
    console.error("Error updating attached file:", error);
    res.status(500).json({ error: "Failed to update file." });
  }
};

// DELETE
const deleteAttachedFile = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteRecord("attached_files", "id", id);
    res.status(200).json({ message: "File record deleted." });
  } catch (error) {
    console.error("Error deleting attached file:", error);
    res.status(500).json({ error: "Failed to delete file." });
  }
};

module.exports = {
  createAttachedFile,
  getAttachedFiles,
  getAttachedFileById,
  updateAttachedFile,
  deleteAttachedFile,
};
