// const mysql = require("mysql");
// const config = require("./config");

// const connectDB = async () => {
//   const pool = mysql.createPool(config);

//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.log({ error: err.message });
//     }

//     console.log("Connected to MySQL database");
//     connection.release();
//   });
// };

// module.exports = connectDB;
const mysql = require("mysql2");
const config = require("./config");

const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.log({ error: err.message });
      return; // Stop execution if there's an error
    }

    if (!connection) {
      console.log("Failed to get a connection from the pool.");
      return;
    }

    console.log("Connected to MySQL database");
    connection.release();
  });
};

module.exports = connectDB;
