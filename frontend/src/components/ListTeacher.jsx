import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListTeacher = () => {
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        getTeachers()
    }, [])

    const getTeachers = async () => {
        const response = await axios.get('http://localhost:5000/teachers')
        setTeachers(response.data);
    }

    const deleteTeacher = async (id) => {
        await axios.delete(`http://localhost:5000/teachers/${id}`)
        getTeachers()
    }

  return (
    <div>
        <h1 className='title'>Teachers</h1>
        <h2 className='subtitle'>List of Teachers</h2>
        <Link to="/teachers/add" className='button is-primary mb-2'>
            Add New
        </Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Country</th>
                    <th>Horoscope</th>
                    <th>Hobby</th>
                    <th>Course</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {teachers.map((teacher, index) => (
                    <tr key={teacher.id}>
                        <td>{index + 1}</td>
                        <td>{teacher.name}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.age}</td>
                        <td>{teacher.Country.name}</td>
                        <td>{teacher.Horoscope.name}</td>
                        <td>{teacher.Hobby.name}</td>
                        <td>{teacher.course}</td>
                        <td>{teacher.gender}</td>
                        <td>
                            <Link to={`/teachers/edit/${teacher.id}`} className="button is-small is-info">
                                Edit
                            </Link>
                            <button onClick={()=> deleteTeacher(teacher.id)} className="button is-small is-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ListTeacher