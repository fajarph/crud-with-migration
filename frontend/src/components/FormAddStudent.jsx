import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddStudent = () => {
    const [title, setTitle] = useState("")
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [CountryId, setCountryId] = useState("")
    const [countries, setCountry] = useState([])
    const [HoroscopeId, setHoroscopeId] = useState("")
    const [horoscopes, setHoroscope] = useState([])
    const [HobbyId, setHobbyId] = useState("")
    const [hobbies, setHobby] = useState([])
    const [gender, setGender] = useState("Male")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getCountry()
        getHoroscope()
        getHobby()
    }, [])

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }

    const saveStudent = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        formData.append("title", title)
        formData.append("email", email)
        formData.append("age", age)
        formData.append("CountryId", CountryId)
        formData.append("HoroscopeId", HoroscopeId)
        formData.append("HobbyId", HobbyId)
        formData.append("gender", gender)
        try {
            await axios.post('http://localhost:5000/students', formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })
            navigate("/students")
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
        <h1 className='title'>Student</h1>
        <h2 className='subtitle'>Add New Student</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content"></div>
                <form onSubmit={saveStudent}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className='field'>
                        <label className='label'>Name</label>
                        <div className='control'>
                            <input 
                                type="text" 
                                className='input' 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
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
                        <label className='label '>Image</label>
                        <div className='control'>
                            <div className='file'>
                                <label className="file-label">
                                    <input 
                                        type="file" 
                                        className='file-input' 
                                        onChange={loadImage}
                                    />
                                    <span className='file-cta'>
                                        <span className='file-label'> Choose a file... </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {preview ? (
                        <figure className='image is-128x128'>
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ): ( 
                        ""
                    )}

                    <div className='field mt-5'>
                        <div className='control'>
                            <button type='submit' className='button is-success mt-3'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FormAddStudent