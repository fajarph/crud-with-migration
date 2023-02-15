import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListStudent = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        const response = await axios.get('http://localhost:5000/students')
        setStudents(response.data);
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/students/${id}`)
        getStudents()
    }

  return (
    <div>
        <h1 className='title'>Students</h1>
        <h2 className='subtitle'>List of Students</h2>
        <Link to="/students/add" className='button is-primary mb-2'>
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
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>{student.Country.name}</td>
                        <td>{student.Horoscope.name}</td>
                        <td>{student.Hobby.name}</td>
                        <td>{student.gender}</td>
                        <td>
                            <Link to={`/students/edit/${student.id}`} className="button is-small is-info">
                                Edit
                            </Link>
                            <button onClick={()=> deleteStudent(student.id)} className="button is-small is-danger">
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

export default ListStudent