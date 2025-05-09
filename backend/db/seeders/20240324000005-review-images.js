'use strict';

const schema = process.env.SCHEMA || 'oasis_schema';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert({
      schema,
      tableName: 'ReviewImages'
    }, [
      {
        reviewId: 1,
        url: 'https://example.com/review1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 2,
        url: 'https://example.com/review2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 3,
        url: 'https://example.com/review3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({
      schema,
      tableName: 'ReviewImages'
    });
  }
};