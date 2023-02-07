import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AddUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("Male");
    const [CountryId, setCountryId] = useState("");
    const [HoroscopeId, setHoroscopeId] = useState("");
    const [HobbyId, setHobbyId] = useState("");
    const [countries, setCountry] = useState([]);
    const [horoscopes, setHoroscope] = useState([]);
    const [hobbies, setHobby] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getCountries();
        getHoroscopes();
        getHobbies();
      }, []);

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',{
                name,
                email,
                age,
                CountryId,
                HoroscopeId,
                HobbyId,
                gender
            });
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const getCountries = async () => {
        const response = await axios.get("http://localhost:5000/countries")
        setCountry(response.data);
    }

    const getHoroscopes = async () => {
        const response = await axios.get("http://localhost:5000/horoscopes")
        setHoroscope(response.data);
    }

    const getHobbies = async () => {
        const response = await axios.get("http://localhost:5000/hobbies")
        setHobby(response.data);
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"

                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input 
                                type="email" 
                                className="input" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Age</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Age"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
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
                    <div className="field">
                        <label className="label">Country</label>
                        <div className="control">
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
                    <div className="field">
                        <label className="label">Horoscope</label>
                        <div className="control">
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
                    <div className="field">
                        <label className="label">Hobby</label>
                        <div className="control">
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
                    <div className="field">
                        <button type="submit" className="button is-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default AddUser