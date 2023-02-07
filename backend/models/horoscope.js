'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horoscope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Horoscope.hasMany(models.User)
      models.User.belongsTo(Horoscope)
    }
  }
  Horoscope.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Horoscope',
  });
  return Horoscope;
};