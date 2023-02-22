import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [role, setRole] = useState("")
    const [msg, setMsg] = useState("")
    const [errMsgs, setErrMsgs] = useState([])
    const navigate = useNavigate()

    const saveUser = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role
            })
            navigate("/users")
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg)
                setErrMsgs(error.response.data.message)
            }
        }
    }

    const filterErrMsgs = (fieldName) => {
        if (errMsgs.length === 0) {
            return
        }
        
        const item = errMsgs.filter((err) => err.path[0] === fieldName)[0]

        if (item) {
            return item.message
        }
    }

  return (
    <div>
        <h1 className='title'>User</h1>
        <h2 className='subtitle'>Add New User</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content"></div>
                <form onSubmit={saveUser}>
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
                    {
                        filterErrMsgs('name') && <p className='has-text-danger'>{filterErrMsgs('name')}</p>
                    }
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control'>
                            <input 
                                type="email" 
                                className='input'
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                        </div>
                    </div>
                    {
                        filterErrMsgs('email') && <p className='has-text-danger'>{filterErrMsgs('email')}</p>
                    }
                    <div className='field'>
                        <label className='label'>Password</label>
                        <div className='control'>
                            <input 
                                type="password" 
                                className='input' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='******'
                            />
                        </div>
                    </div>
                    {
                        filterErrMsgs('password') && <p className='has-text-danger'>{filterErrMsgs('password')}</p>
                    }
                    <div className='field'>
                        <label className='label'>Confirm Password</label>
                        <div className='control'>
                            <input 
                                type="password" 
                                className='input' 
                                value={confPassword} 
                                onChange={(e) => setConfPassword(e.target.value)}
                                placeholder='******'
                            />
                        </div>
                    </div>
                    {
                        filterErrMsgs('confPassword') && <p className='has-text-danger'>{filterErrMsgs('confPassword')}</p>
                    }
                    <div className='field'>
                        <label className='label'>Role</label>
                        <div className='control'>
                            <div className="select is-fullwidth">
                                <select 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="" disabled selected hidden>Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {
                        filterErrMsgs('role') && <p className='has-text-danger'>{filterErrMsgs('role')}</p>
                    }
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

export default FormAddUser