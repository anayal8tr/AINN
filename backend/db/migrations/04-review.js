'use strict';

const schema = process.env.SCHEMA || 'oasis_schema';

const options = {
  schema,
  tableName: 'Reviews'
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { schema, tableName: 'Users' }, key: 'id' },
        onDelete: 'CASCADE'
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { schema, tableName: 'Spots' }, key: 'id' },
        onDelete: 'CASCADE'
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable(options);
  }
};