'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hobby.hasMany(models.Student)
      models.Student.belongsTo(Hobby)

      Hobby.hasMany(models.Teacher)
      models.Teacher.belongsTo(Hobby)
    }
  }
  Hobby.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hobby',
  });
  return Hobby;
};