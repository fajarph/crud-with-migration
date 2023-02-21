import React, {useEffect} from 'react'
import Layout from './Layout'
import FormAddTeacher from '../components/FormAddTeacher'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const AddTeacher = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError, user} = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(getMe())   
    }, [dispatch])

    useEffect(() => {
        if(isError){
            navigate("/")
        }
        if(user && user.role === "student"){
            navigate("/dashboard")
        }
    }, [isError, user, navigate])
  return (
    <Layout>
        <FormAddTeacher />
    </Layout>
  )
}

export default AddTeacher