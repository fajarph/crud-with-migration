'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Country)
      models.Country.hasMany(User)

      User.belongsTo(models.Horoscope)
      models.Horoscope.hasMany(User)

      User.belongsTo(models.Hobby)
      models.Hobby.hasMany(User)
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    CountryId: DataTypes.INTEGER,
    HoroscopeId: DataTypes.INTEGER,
    HobbyId: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};