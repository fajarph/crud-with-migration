'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.Country)
      models.Country.hasMany(Student)

      Student.belongsTo(models.Horoscope)
      models.Horoscope.hasMany(Student)

      Student.belongsTo(models.Hobby)
      models.Hobby.hasMany(Student)
    }
  }
  Student.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    CountryId: DataTypes.INTEGER,
    HoroscopeId: DataTypes.INTEGER,
    HobbyId: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  
  return Student;
};