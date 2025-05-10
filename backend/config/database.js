require('dotenv').config();

const schema = process.env.SCHEMA || 'oasis_schema';

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'ainnbnb_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: "postgres",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
    define: {
      schema
    },
    migrationStorageTableSchema: schema,
    seederStorageTableSchema: schema
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
