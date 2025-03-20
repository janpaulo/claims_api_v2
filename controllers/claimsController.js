
const { insertRecord, getAllRecord, updateRecord, checkRecordExists } = require("../utils/sqlFunctions");

const createClaim = async (req, res) => {
  const { series_no, member_pin, date_admited, status, hci_no, date_created, xml_data } = req.body;

  if (!series_no || !member_pin || !date_admited || !status || !hci_no || !date_created || !xml_data) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const claim = { series_no, member_pin, date_admited, status, hci_no, date_created, xml_data };

  try {
    const result = await insertRecord("claims", claim);
    res.status(201).json({ message: "Claim created successfully!", result });
  } catch (error) {
    console.error("Error inserting claim:", error);
    res.status(500).json({ error: "Failed to create claim. Please try again later." });
  }
};

const getClaims = async (req, res) => {
  try {
    const result = await getAllRecord("claims", "");
    res.status(200).json({ message: "Claims retrieved successfully!", result });
  } catch (error) {
    console.error("Error retrieving claims:", error);
    res.status(500).json({ error: "Failed to retrieve claims. Please try again later." });
  }
};

const updateClaim = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const claimExists = await checkRecordExists("claims", "id", id);
    if (!claimExists) {
      return res.status(404).json({ error: "Claim not found" });
    }

    await updateRecord("claims", updates, "id", id);
    res.status(200).json({ message: "Claim updated successfully!" });
  } catch (error) {
    console.error("Error updating claim:", error);
    res.status(500).json({ error: "Failed to update claim. Please try again later." });
  }
};

module.exports = { createClaim, getClaims, updateClaim };
