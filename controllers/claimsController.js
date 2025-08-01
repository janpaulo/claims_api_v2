const {
  insertRecord,
  getAllRecord,
  updateRecord,
  checkRecordExists,
  getClaimStats,
  getTodaysClaimsCount,
} = require("../utils/sqlFunctions");

const createClaim = async (req, res) => {
  const {
    series_no,
    member_pin,
    date_admited,
    status,
    hci_no,
    date_created,
    xml_data,
  } = req.body;

  if (
    !series_no ||
    !member_pin ||
    !date_admited ||
    !status ||
    !hci_no ||
    !date_created ||
    !xml_data
  ) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const claim = {
    series_no,
    member_pin,
    date_admited,
    status,
    hci_no,
    date_created,
    xml_data,
  };

  try {
    const result = await insertRecord("claims", claim);
    res.status(201).json({ message: "Claim created successfully!", result });
  } catch (error) {
    console.error("Error inserting claim:", error);
    res
      .status(500)
      .json({ error: "Failed to create claim. Please try again later." });
  }
};

const getClaims = async (req, res) => {
  try {
    const result = await getAllRecord("claims", "");
    res.status(200).json({ message: "Claims retrieved successfully!", result });
  } catch (error) {
    console.error("Error retrieving claims:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve claims. Please try again later." });
  }
};
const getClaimsStats = async (req, res) => {
  try {
    const data = await getClaimStats();
    res.status(200).json({
      message: "Claim statistics retrieved successfully!",
      data,
    });
  } catch (error) {
    console.error("Error retrieving claim stats:", error); // <== KEEP THIS
    res.status(500).json({ error: "Failed to retrieve claim stats." });
  }
};
const getClaimsNumber = async (req, res) => {
  try {
    const { hci_no } = req.params;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const count = await getTodaysClaimsCount(hci_no);
    const reference = `${hci_no}-${mm}-${dd}-${yyyy}-${count + 1}`;

    res.status(200).json({ reference });
  } catch (error) {
    console.error("Error generating claim reference:", error);
    res.status(500).json({ error: "Failed to generate claim reference." });
  }
};

const getClaimPerHci = async (req, res) => {
  const { hci_no } = req.params;

  try {
    const claims = await checkRecordExists("claims", "hci_no", hci_no, true);
    // if (!claims) {
    //   return res.status(404).json({ error: "Claim not found" });
    // }
    res.status(200).json({
      message: "Claim statistics retrieved successfully!",
      claims: !claims ? [] : claims,
    });
  } catch (error) {
    console.error("Error updating claim:", error);
    res
      .status(500)
      .json({ error: "Failed to  claim. Please try again later." });
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
    res
      .status(500)
      .json({ error: "Failed to update claim. Please try again later." });
  }
};

module.exports = {
  createClaim,
  getClaims,
  updateClaim,
  getClaimsStats,
  getClaimPerHci,
  getClaimsNumber,
};
