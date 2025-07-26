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
const checkRecordExists = (tableName, column, value, multiple = false) => {
  return new Promise((resolve, reject) => {
    let query;
    let params = [value];
    if (tableName === "users") {
      query = `
        SELECT 
          u.*, r.*,
          h.*
        FROM users u
        LEFT JOIN hospital_accounts h ON u.hci_no = h.accreditation_num
        LEFT JOIN roles r ON u.role_id = r.id
        WHERE u.${column} = ?
      `;
    } else {
      query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    }
    pool.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (multiple) {
          resolve(results); // Return all rows
        } else {
          resolve(results.length ? results[0] : null); // Return one or null
        }
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

const getTodaysClaimsCount = (hci_no) => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const query = `
      SELECT COUNT(*) AS count 
      FROM claims 
      WHERE DATE(date_created) = ? AND hci_no = ?
    `;

    pool.query(query, [dateStr, hci_no], (err, results) => {
      if (err) reject(err);
      else resolve(results[0].count);
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
          per_hci: groupResult,
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

const getRolesWithPermissions = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        r.id as role_id,
        r.name as role_name,
        r.description as role_description,
        r.is_active,
        p.id as permission_id,
        p.name as permission_name,
        p.description as permission_description
      FROM roles r
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      LEFT JOIN permissions p ON rp.permission_id = p.id
    `;

    pool.query(query, (err, results) => {
      if (err) return reject(err);

      const roles = {};

      results.forEach((row) => {
        if (!roles[row.role_id]) {
          roles[row.role_id] = {
            id: row.role_id,
            name: row.role_name,
            description: row.role_description,
            is_active: row.is_active,
            permissions: [],
          };
        }

        if (row.permission_id) {
          roles[row.role_id].permissions.push({
            id: row.permission_id,
            name: row.permission_name,
            description: row.permission_description,
            module_name: row.module_name,
          });
        }
      });

      resolve(Object.values(roles));
    });
  });
};

const assignPermissionsToRole = (roleId, permissionIds) => {
  return new Promise((resolve, reject) => {
    if (!roleId || !Array.isArray(permissionIds)) {
      return reject(new Error("Role ID and permission IDs are required."));
    }

    // Clear existing permissions first
    pool.query(
      "DELETE FROM role_permissions WHERE role_id = ?",
      [roleId],
      (err) => {
        if (err) return reject(err);

        if (!permissionIds.length) return resolve("Cleared");

        const values = permissionIds.map((pid) => [roleId, pid]);
        const insertQuery =
          "INSERT INTO role_permissions (role_id, permission_id) VALUES ?";
        pool.query(insertQuery, [values], (err2, result) => {
          if (err2) return reject(err2);
          resolve(result);
        });
      }
    );
  });
};

const assignManyToMany = (
  tableName,
  column1,
  column2,
  primaryId,
  relatedIds
) => {
  return new Promise((resolve, reject) => {
    if (
      !tableName ||
      !column1 ||
      !column2 ||
      !primaryId ||
      !Array.isArray(relatedIds)
    ) {
      return reject(
        new Error(
          "All parameters are required and relatedIds must be an array."
        )
      );
    }

    const values = relatedIds.map((rid) => [primaryId, rid]);
    const query = `INSERT INTO \`${tableName}\` (\`${column1}\`, \`${column2}\`) VALUES ?`;

    pool.query(query, [values], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
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
  getEsoasStats,
  getRolesWithPermissions,
  assignManyToMany,
  assignPermissionsToRole,
  getTodaysClaimsCount,
};
