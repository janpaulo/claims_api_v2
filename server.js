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


const esoaUnitRoutes = require("./routes/esoaUnitRoutes");
const esoaItemRoutes = require("./routes/esoaItemRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoutes, profileRoutes,claimsRoutes,esoaRoutes,hospitalsRoutes,rolesRoutes,permissionRoutes);
app.use("/attached-files", attachedFilesRoutes);
app.use("/claims-form3", claimsForm3Routes);
app.use("/claims-form4", claimsForm4Routes);
app.use("/claims-form5", claimsForm5Routes);
app.use("/esoa-units", esoaUnitRoutes);
app.use("/esoa-items", esoaItemRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
