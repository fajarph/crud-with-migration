'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Teachers', 'HobbyId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Hobbies'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Teachers', 'HobbyId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Hobbies'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
