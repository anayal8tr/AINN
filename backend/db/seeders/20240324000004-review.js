'use strict';

const schema = process.env.SCHEMA || 'oasis_schema';

console.log("Seeding Reviews...");

const { Review } = require('../models');
const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert({
      schema,
      tableName: 'Reviews'
    }, [
      {
        spotId: 1,
        userId: 2,
        review: 'This was an awesome spot!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 3,
        review: 'This was a great spot!',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 1,
        review: 'This was a fantastic spot!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({
      schema,
      tableName: 'Reviews'
    });
  }
};