const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);

// Create a new table
const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Check if a record exists in a table
const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const getAllRecord = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : []);
      }
    });
  });
};

const getClaimStats = () => {
  return new Promise((resolve, reject) => {
    const totalQuery = `
      SELECT
        COUNT(*) AS total_claims,
        SUM(status = 'pending') AS total_pending,
        SUM(status = 'claimed') AS total_claimed
      FROM claims
    `;

    const groupQuery = `
      SELECT
        ha.hospital_name,
        ha.is_active,
        c.hci_no,
        COUNT(*) AS total_claims,
        SUM(c.status = 'pending') AS total_pending,
        SUM(c.status = 'claimed') AS total_claimed
      FROM claims c
      LEFT JOIN hospital_accounts ha ON c.hci_no = ha.accreditation_num
      WHERE ha.is_active = 'active'  -- Filter for active hospitals
      GROUP BY c.hci_no
    `;

    pool.query(totalQuery, (err, totalResult) => {
      if (err) return reject(err);

      pool.query(groupQuery, (err, groupResult) => {
        if (err) return reject(err);

        resolve({
          total: totalResult[0],
          per_hci: groupResult
        });
      });
    });
  });
};
const getEsoasStats = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        ha.hospital_name,
        e.hci_no,
        COUNT(*) AS total_esoa,
        SUM(e.status = 'with-cheque') AS total_with_cheque,
        SUM(e.status = 'without-cheque') AS total_without_cheque,
        SUM(e.total_amount) AS sum_total_amount,
        SUM(e.professional_fee) AS sum_professional_fee
      FROM esoa e
      LEFT JOIN hospital_accounts ha ON e.hci_no = ha.accreditation_num
      GROUP BY e.hci_no
    `;

    pool.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching ESOA stats:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


// Retrieve a single record by column value
const getRecordById = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

// Insert a new record into a table
const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Update a record in a table
const updateRecord = (tableName, updates, column, value) => {
  return new Promise((resolve, reject) => {
    const columnValues = Object.keys(updates)
      .map((column) => `${column} = ?`)
      .join(", ");
    const query = `UPDATE ${tableName} SET ${columnValues} WHERE ${column} = ?`;

    pool.query(query, [...Object.values(updates), value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Delete a record from a table
const deleteRecord = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  createTable,
  checkRecordExists,
  getAllRecord,
  getRecordById,
  insertRecord,
  updateRecord,
  deleteRecord,
  getClaimStats,
  getEsoasStats
};
