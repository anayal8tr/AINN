'use strict';
console.log(1);
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");
console.log(2);
const schema = process.env.SCHEMA || 'oasis_schema';
console.log(3);
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert({
      schema,
      tableName: 'Spots'
    }, [
      {
        ownerId: 1,
        address: '123 First St',
        city: 'San Diego',
        state: 'California',
        country: 'USA',
        lat: 12.34,
        lng: -12.34,
        name: 'Airbnb Name',
        description: 'Airbnb Name Description',
        price: 123.45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '1234 Second St',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        lat: 12.44,
        lng: -12.44,
        name: 'Airbnb Second Name',
        description: 'Airbnb Second Name Description',
        price: 123.55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '12345 Third St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 12.54,
        lng: -12.54,
        name: 'Airbnb Third Name',
        description: 'Airbnb Third Name Description',
        price: 123.65,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({
      schema,
      tableName: 'Spots'
    });
  }
};

