'use strict';

const schema = process.env.SCHEMA || 'oasis_schema';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert({
      schema,
      tableName: 'SpotImages'
    }, [
      {
        spotId: 1,
        url: 'https://example.com/image1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://example.com/image2.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://example.com/image3.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({
      schema,
      tableName: 'SpotImages'
    });
  }
};