'use strict';

const bcrypt = require("bcryptjs");
const schema = process.env.SCHEMA || 'oasis_schema';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert({
      schema,
      tableName: 'Users'
    }, [
      {
        firstName: 'FakeFirstName',
        lastName: 'FakeLastName',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'NameThatIsFirst',
        lastName: 'NameThatIsLast',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({
      schema,
      tableName: 'Users'
    });
  }
};
