import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddTeacher = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [CountryId, setCountryId] = useState("")
    const [countries, setCountry] = useState([])
    const [HoroscopeId, setHoroscopeId] = useState("")
    const [horoscopes, setHoroscope] = useState([])
    const [HobbyId, setHobbyId] = useState("")
    const [hobbies, setHobby] = useState([])
    const [course, setCourse] = useState("")
    const [gender, setGender] = useState("Male")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getCountry()
        getHoroscope()
        getHobby()
    }, [])

    const saveTeacher = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/teachers', {
                name,
                email,
                age,
                CountryId,
                HoroscopeId,
                HobbyId,
                course,
                gender
            })
            navigate("/teachers")
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }

    const getCountry = async () => {
        const response = await axios.get("http://localhost:5000/countries")
        setCountry(response.data);
    }

    const getHoroscope = async () => {
        const response = await axios.get("http://localhost:5000/horoscopes")
        setHoroscope(response.data);
    }

    const getHobby = async () => {
        const response = await axios.get("http://localhost:5000/hobbies")
        setHobby(response.data);
    }

  return (
    <div>
        <h1 className='title'>Teacher</h1>
        <h2 className='subtitle'>Add New Teacher</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content"></div>
                <form onSubmit={saveTeacher}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className='field'>
                        <label className='label'>Name</label>
                        <div className='control'>
                            <input 
                                type="text" 
                                className='input' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control'>
                            <input 
                                type="text" 
                                className='input'
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Age</label>
                        <div className='control'>
                            <input 
                            type="text" 
                            className='input' 
                            value={age} 
                            onChange={(e) => setAge(e.target.value)}
                            placeholder='Age'
                        />
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Country</label>
                        <div className='control'>
                            <div className="select is-fullwidth">
                                <select 
                                value={CountryId} 
                                onChange={(e) => setCountryId(e.target.value)}
                                >
                                    {countries.map((country) => (
                                        <option value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Horoscope</label>
                        <div className='control'>
                            <div className="select is-fullwidth">
                                <select 
                                value={HoroscopeId} 
                                onChange={(e) => setHoroscopeId(e.target.value)}
                                >
                                    {horoscopes.map((horoscope) => (
                                        <option value={horoscope.id}>{horoscope.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Hobby</label>
                        <div className='control'>
                            <div className="select is-fullwidth">
                                <select 
                                value={HobbyId} 
                                onChange={(e) => setHobbyId(e.target.value)}
                                >
                                    {hobbies.map((hobby) => (
                                        <option value={hobby.id}>{hobby.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Course</label>
                        <div className='control'>
                            <div className="select is-fullwidth">
                                <select 
                                value={course} 
                                onChange={(e) => setCourse(e.target.value)}
                                >
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Geography">Geography</option>
                                    <option value="Indonesian">Indonesian</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Natural Sciences">Natural Sciences</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Gender</label>
                        <div className='control'>
                            <div className="select is-fullwidth">
                                <select 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <button type='submit' className='button is-success'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FormAddTeacher