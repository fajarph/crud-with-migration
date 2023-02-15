import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { LoginStudent, LoginTeacher, reset } from "../features/authSlice"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {student, teacher, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(student || isSuccess){
            navigate("/dashboard")
        }
        if(teacher || isSuccess){
            navigate("/dashboard")
        }
        dispatch(reset())
    },[student, teacher, isSuccess, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginStudent({email, password}))
        dispatch(LoginTeacher({email, password}))
    }



    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidht">
            <div className="hero-body">
                <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4">
                        <form onSubmit={Auth} className='box'>
                            {isError && <p className='has-text-centered'>{message}</p>}
                            <h1 className='title is-2'>Sign In</h1>
                            <div className='field'>
                                <label className='label'>Email</label>
                                <div className='control'>
                                    <input 
                                        type="text" 
                                        className='input' 
                                        value={email} 
                                        onChange={(e)=>setEmail(e.target.value)} 
                                        placeholder='Email'
                                    />
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Password</label>
                                <div className='control'>
                                    <input 
                                    type="password" 
                                    className='input' 
                                    value={password} 
                                    onChange={(e)=>setpassword(e.target.value)} 
                                    placeholder='******'/>
                                </div>
                            </div>
                            <div className='field mt-5'>
                                <div className='control'>
                                    <button 
                                        type="submit" 
                                        className='button is-success is-fullwidth'
                                    >
                                        {isLoading ? 'Loading...' : "Login"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Login