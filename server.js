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
const hopitalsRoutes = require("./routes/hospitalsRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoutes, profileRoutes,claimsRoutes,esoaRoutes,hopitalsRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
