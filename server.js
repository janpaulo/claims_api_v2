const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db/db");
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const claimsRoutes = require("./routes/claimsRoutes");
const esoaRoutes = require("./routes/esoaRoutes");
const hospitalsRoutes = require("./routes/hospitalsRoutes");
const rolesRoutes = require("./routes/rolesRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const attachedFilesRoutes = require("./routes/attachedFilesRoutes");


const claimsForm3Routes = require("./routes/claimsForm3Routes");
const claimsForm4Routes = require("./routes/claimsForm4Routes");
const claimsForm5Routes = require("./routes/claimsForm5Routes");
const fileBrowserRoutes = require("./routes/fileBrowserRoutes");
const {
  ensureHospitalServiceFeaturesColumn,
  ensureHospitalProfileColumns,
} = require("./utils/sqlFunctions");


const esoaUnitRoutes = require("./routes/esoaUnitRoutes");
const esoaItemRoutes = require("./routes/esoaItemRoutes");
const tsekapLibRoutes = require("./routes/tsekapLibRoutes");


const app = express();

const corsOptions = {
  origin: '*',  
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoutes, profileRoutes,claimsRoutes,esoaRoutes,hospitalsRoutes,rolesRoutes,permissionRoutes);
app.use("/attached-files", attachedFilesRoutes);
app.use("/claims-form3", claimsForm3Routes);
app.use("/claims-form4", claimsForm4Routes);
app.use("/claims-form5", claimsForm5Routes);
app.use("/esoa-units", esoaUnitRoutes);
app.use("/esoa-items", esoaItemRoutes);
app.use("/file-browser", fileBrowserRoutes);
app.use("/api/tsekap", tsekapLibRoutes);


connectDB();
ensureHospitalServiceFeaturesColumn()
  .then(() => console.log("hospital_accounts.service_features is ready."))
  .catch((error) =>
    console.error("Failed to ensure hospital service_features column:", error.message),
  );
ensureHospitalProfileColumns()
  .then(() => console.log("hospital_accounts profile columns are ready."))
  .catch((error) =>
    console.error("Failed to ensure hospital profile columns:", error.message),
  );

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


