'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'CountryId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Countries'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'CountryId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Countries'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
