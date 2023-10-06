const fs = require('fs');
require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    port: process.env.DEV_PORT,
    dialect: process.env.DEV_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
}
