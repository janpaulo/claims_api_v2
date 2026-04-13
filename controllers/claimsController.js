const {
  insertRecord,
  getAllRecord,
  updateRecord,
  checkRecordExists,
  getClaimStats,
  getTodaysClaimsCount,
  getClaimsByHciPaginated,
} = require("../utils/sqlFunctions");

const createClaim = async (req, res) => {
  const {
    series_no,
    member_pin,
    date_admited,
    status,
    hci_no,
    xml_data,
    hci_code,
  } = req.body;

  if (
    !series_no ||
    !member_pin ||
    !date_admited ||
    !status ||
    !hci_no ||
    !xml_data ||
    !hci_code
  ) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const claim = {
    series_no,
    member_pin,
    date_admited,
    status,
    hci_no,
    xml_data,
    hci_code,
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
    console.error("Error retrieving claim stats:", error);
    res.status(500).json({ error: "Failed to retrieve claim stats." });
  }
};
const getClaimsNumber = async (req, res) => {
  try {
    const { hci_code } = req.params;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const count = await getTodaysClaimsCount(hci_code);
    const reference = `${hci_code}-${mm}-${dd}-${yyyy}-${count + 1}`;

    res.status(200).json({ reference });
  } catch (error) {
    console.error("Error generating claim reference:", error);
    res.status(500).json({ error: "Failed to generate claim reference." });
  }
};

const getClaimPerHci = async (req, res) => {
  const { hci_no } = req.params;
  const page = Number.parseInt(req.query.page, 10) || 1;
  const limit =
    String(req.query.limit || "").trim().toLowerCase() === "all"
      ? "all"
      : Number.parseInt(req.query.limit, 10) || 10;

  try {
    const paged = await getClaimsByHciPaginated(hci_no, page, limit);
    res.status(200).json({
      message: "Claim statistics retrieved successfully!",
      claims: paged.claims,
      pagination: {
        total: paged.total,
        page: paged.page,
        limit: paged.limit,
        totalPages: paged.totalPages,
      },
    });
  } catch (error) {
    console.error("Error updating claim:", error);
    res
      .status(500)
      .json({ error: "Failed to  claim. Please try again later." });
  }
};

const toISODate = (value) => {
  if (!value) return "";
  const raw = String(value).trim();
  if (!raw) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  const dashMatch = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dashMatch) {
    const [, mm, dd, yyyy] = dashMatch;
    return `${yyyy}-${mm}-${dd}`;
  }

  const slashMatch = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (slashMatch) {
    const [, mm, dd, yyyy] = slashMatch;
    return `${yyyy}-${mm}-${dd}`;
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
};

const getClaimMembers = async (req, res) => {
  const { hci_no } = req.params;
  const q = String(req.query.q || "")
    .trim()
    .toLowerCase();

  try {
    const claims = await checkRecordExists("claims", "hci_no", hci_no, true);
    const sorted = (claims || []).sort(
      (a, b) => new Date(b.date_created) - new Date(a.date_created),
    );

    const seen = new Set();
    const members = [];

    for (const claimRow of sorted) {
      let parsed = null;
      try {
        parsed = JSON.parse(claimRow.xml_data || "{}");
      } catch (_error) {
        parsed = null;
      }
      if (!parsed) continue;

      const claimData =
        parsed?.eTRANSMITTAL?.CLAIM?.[0] ||
        parsed?.CLAIM?.[0] ||
        parsed?.claim ||
        parsed;
      const cf1 = claimData?.CF1 || {};

      const memberPIN =
        cf1?.pMemberPIN || cf1?.pPatientPIN || claimRow.member_pin || "";
      const lastName = cf1?.pMemberLastName || "";
      const firstName = cf1?.pMemberFirstName || "";
      const middleName = cf1?.pMemberMiddleName || "";
      const memberBirthDate = toISODate(cf1?.pMemberBirthDate);
      const suffix = cf1?.pMemberSuffix || "";
      const sex = cf1?.pMemberSex || "M";

      const searchHaystack = [
        memberPIN,
        lastName,
        firstName,
        middleName,
        claimRow.series_no,
      ]
        .join(" ")
        .toLowerCase();

      if (q && !searchHaystack.includes(q)) continue;

      const dedupeKey = `${memberPIN}|${lastName}|${firstName}|${memberBirthDate}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      const displayLabel = [memberPIN, lastName, firstName, middleName]
        .filter(Boolean)
        .join(" - ");

      members.push({
        key: dedupeKey,
        displayLabel,
        lastClaimDate: claimRow.date_created,
        seriesNo: claimRow.series_no,
        prefill: {
          hospitalCode: claimRow.hci_code || "",
          isForOPDHemodialysisClaim: "N",
          memberPIN,
          memberBasicInformation: {
            lastname: lastName,
            firstname: firstName,
            middlename: middleName,
            maidenname: "",
            suffix,
            nameExtension: suffix,
            sex,
            dateOfBirth: memberBirthDate,
          },
          patientIs: cf1?.pPatientIs || "M",
          admissionDate: toISODate(claimData?.CF2?.pAdmissionDate),
          patientPIN: cf1?.pPatientPIN || memberPIN,
          patientBasicInformation: {
            lastname: cf1?.pPatientLastName || lastName,
            firstname: cf1?.pPatientFirstName || firstName,
            middlename: cf1?.pPatientMiddleName || middleName,
            maidenname: "",
            suffix: cf1?.pPatientSuffix || suffix,
            sex: cf1?.pPatientSex || sex,
            dateOfBirth: toISODate(cf1?.pPatientBirthDate || memberBirthDate),
          },
          membershipType: cf1?.pMemberShipType || "S",
          isFinal: "1",
        },
      });

      if (members.length >= 30) break;
    }

    res.status(200).json({
      message: "Member search results retrieved successfully!",
      result: members,
    });
  } catch (error) {
    console.error("Error searching claim members:", error);
    res.status(500).json({
      error: "Failed to search members from claims history.",
    });
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
  getClaimMembers,
};
