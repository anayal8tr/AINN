'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};

