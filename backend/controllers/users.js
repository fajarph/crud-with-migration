const { User, Country, Horoscope, Hobby } = require('../models')
const argon2 = require('argon2')

const getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ["uuid", "name", "email", "role"]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes:["uuid", "name", "email", "role"],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createUser = async(req, res) => {
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password Tidak Cocok"})
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(201).json({msg: "Register Berhasil"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password)
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password Tidak Cocok"})
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        })
        res.status(200).json({msg: "User Updated"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        })
        res.status(200).json({msg: "User Deleted"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const getCountries = async(req, res) => {
    try {
        const response = await Country.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const getHoroscopes = async(req, res) => {
    try {
        const response = await Horoscope.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const getHobbies = async(req, res) => {
    try {
        const response = await Hobby.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCountries,
    getHoroscopes,
    getHobbies
}