'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.belongsTo(models.Country)
      models.Country.hasMany(Teacher)

      Teacher.belongsTo(models.Horoscope)
      models.Horoscope.hasMany(Teacher)

      Teacher.belongsTo(models.Hobby)
      models.Hobby.hasMany(Teacher)
    }
  }
  Teacher.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    CountryId: DataTypes.INTEGER,
    HoroscopeId: DataTypes.INTEGER,
    HobbyId: DataTypes.INTEGER,
    course: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher',
  });

  return Teacher;
};