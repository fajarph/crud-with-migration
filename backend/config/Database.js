const { Sequelize } = require("sequelize")

const db = new Sequelize('test_data_siswa','postgres','27fajar03',{
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = db;