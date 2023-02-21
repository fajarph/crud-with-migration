const { Teacher, Country, Horoscope, Hobby } = require("../models")
const path = require("path")
const fs = require("fs")
const { Op } = require("sequelize")

const getTeachers = async(req, res) => {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search_query || ""
    const offset = limit * page
    const totalRows = await Teacher.count({
        where:{
            [Op.or]: [{name:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
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
    })
    const totalPage = Math.ceil(totalRows / limit)
    const result = await Teacher.findAll({
        where:{
            [Op.or]: [{name:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
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
        ],
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
        
    })
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    })
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
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"})
    const name = req.body.title
    const email = req.body.email
    const age = req.body.age
    const CountryId = req.body.CountryId
    const HoroscopeId = req.body.HoroscopeId
    const HobbyId = req.body.HobbyId
    const course = req.body.course
    const gender = req.body.gender
    const file = req.files.file
    const fileSize = file.data.lenght
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/teachers/${fileName}`
    
    const allowedType = ['.png','.jpg','jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Ivalid Image"})
    if(fileSize > 5000000) return res.status(422).json({msg: "Image harus lebih kecil dari 5mb"})

    file.mv(`./public/teachers/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message})
        try {
            console.log(url);
            await Teacher.create({
                name: name, 
                email: email, 
                age: age, 
                CountryId: CountryId,
                HoroscopeId: HoroscopeId,
                HobbyId: HobbyId,
                course: course,
                gender: gender,
                image: fileName, 
                url: url
            })
            res.status(201).json({msg: "Teacher Created Succesfully"})
        } catch (error) {
            console.log(error.message);
        }
    })
}

const updateTeacher = async(req, res) => {
    const teacher = await Teacher.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!teacher) return res.status(404).json({msg: "No Data Found"})
    let fileName = ""
    if(req.files === null){
        fileName = Teacher.image
    }else{
        const file = req.files.file
        const fileSize = file.data.lenght
        const ext = path.extname(file.name)
        fileName = file.md5 + ext
        const allowedType = ['.png','.jpg','jpeg']

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Ivalid Image"})
        if(fileSize > 5000000) return res.status(422).json({msg: "Image harus lebih kecil dari 5mb"})

        const filepath = `./public/teachers/${teacher.image}`
        fs.unlinkSync(filepath)

        file.mv(`./public/teachers/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message})
        })
    }
    const name = req.body.title
    const email = req.body.email
    const age = req.body.age
    const CountryId = req.body.CountryId
    const HoroscopeId = req.body.HoroscopeId
    const HobbyId = req.body.HobbyId
    const course = req.body.course
    const gender = req.body.gender
    const url = `${req.protocol}://${req.get("host")}/teachers/${fileName}`
    try {
        await Teacher.update({
            name: name, 
            email: email, 
            age: age, 
            CountryId: CountryId,
            HoroscopeId: HoroscopeId,
            HobbyId: HobbyId,
            course: course,
            gender: gender,
            image: fileName, 
            url: url
        },{
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
        })
        res.status(200).json({msg: "Teachers Updated Succesfully"})
    } catch (error) {
        console.log(error.message);
    }
}

const deleteTeacher = async(req, res) => {
    const teacher = await Teacher.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!teacher) return res.status(404).json({msg: "No Data Found"})
    try {
        const filepath = `./public/teachers/${teacher.image}`
        fs.unlinkSync(filepath)
        await Teacher.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Teacher Deleted Succesfully"})
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