const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectDB = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err.message);
      process.exit(1);
    } else {
      console.log("Connected to MySQL database.");
      connection.release();
    }
  });
};

module.exports = connectDB;