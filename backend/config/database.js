const config = require("./index");
require('dotenv').config();

const schema = process.env.SCHEMA || 'oasis_schema';

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    migrationStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    define: { 
      schema: schema
    },
    migrationStorageTableSchema: schema,
    seederStorageTableSchema: schema 
  }
};
