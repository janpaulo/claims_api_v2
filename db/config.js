require('dotenv').config();

const config = {
  host: process.env.DB_HOST,     // was HOST, should be DB_HOST
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

module.exports = config;