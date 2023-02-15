const { Teacher, Country, Horoscope, Hobby } = require("../models")

const getTeachers = async(req, res) => {
    try {
        const response = await Teacher.findAll({
            attributes: ["id", "name", "email", "age", "CountryId", "HoroscopeId", "HobbyId", "course", "gender"],
            include: [
                {
                    model: Country,
                    attributes: ['id', 'name']
                },
                {
                    model: Horoscope,
                    attributes: ['id', 'name']
                },
                {
                    model: Hobby,
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getTeacherById = async(req, res) => {
    try {
        const response = await Teacher.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createTeacher = async(req, res) => {
    try {
        await Teacher.create(req.body);
        res.status(201).json({msg: "Teacher Created"});
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const updateTeacher = async(req, res) => {
    try {
        await Teacher.update(req.body, {
            where:{
                id: req.params.id
            },
            include: [
                {
                    model: Country,
                    attributes: ['id', 'name']
                },
                {
                    model: Horoscope,
                    attributes: ['id', 'name']
                },
                {
                    model: Hobby,
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json({msg: "Teacher Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

const deleteTeacher = async(req, res) => {
    try {
        await Teacher.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Teacher Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getTeachers,
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}