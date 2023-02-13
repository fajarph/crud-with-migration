'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Students', 'HoroscopeId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Horoscopes'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Students', 'HoroscopeId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Horoscopes'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
