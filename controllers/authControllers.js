const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");
const profileSchema = require("../schemas/profileSchema");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
  };

  const profile = {
    profileId: uuidv4(),
    userId: user.userId,
    email: user.email,
  };

  try {
    await createTable(userSchema);
    await createTable(profileSchema);

    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      await insertRecord("users", user);
      await insertRecord("profiles", profile);

      res.status(201).json({ message: "user created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email or Password fields cannot be empty!" });
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (!existingUser || !existingUser.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (passwordMatch) {
      return res.status(200).json({
        userId: existingUser.userId,
        email: existingUser.email,
        hci_no: existingUser.hci_no,
        role_id: existingUser.role_id,
        access_token: generateAccessToken(existingUser.userId),
        hospital: {
          hos_id: existingUser.hos_id,
          hospital_name: existingUser.hospital_name,
          accreditation_num: existingUser.accreditation_num,
          cypher_key: existingUser.cypher_key,
          is_active: existingUser.is_active,
          created_by: existingUser.created_by,
          username_code: existingUser.username_code,
          hopital_code: existingUser.hopital_code,
          software_cert: existingUser.software_cert,
        },
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
