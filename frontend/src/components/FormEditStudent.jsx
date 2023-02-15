import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const FormEditStudent = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [CountryId, setCountryId] = useState("")
    const [countries, setCountry] = useState([])
    const [HoroscopeId, setHoroscopeId] = useState("")
    const [horoscopes, setHoroscope] = useState([])
    const [HobbyId, setHobbyId] = useState("")
    const [hobbies, setHobby] = useState([])
    const [gender, setGender] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        getStudentById()
        getCountry()
        getHoroscope()
        getHobby()
    }, [])

    const EditStudent = async(e) => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:5000/students/${id}`, {
                name,
                email,
                age,
                CountryId,
                HoroscopeId,
                HobbyId,
                gender
            })
            navigate("/students")
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }

    const getStudentById = async () => {
        const response = await axios.get(`http://localhost:5000/students/${id}`)
        setName(response.data.name)
        setEmail(response.data.email)
        setAge(response.data.age)
        setCountryId(response.data.CountryId)
        setHoroscopeId(response.data.HoroscopeId)
        setHobbyId(response.data.HobbyId)
        setGender(response.data.gender)
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
        <h1 className='title'>Student</h1>
        <h2 className='subtitle'>Add New Student</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content"></div>
                <form onSubmit={EditStudent}>
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
                        <label className='label'>Gender</label>
                        <div className='control'>
                            <div className="select is-fullwidth">
                                <select 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
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

export default FormEditStudent