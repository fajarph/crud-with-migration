import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditTeacher from '../components/FormEditTeacher'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const EditTeacher = () => {
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
    }, [isError,user, navigate])
  return (
    <Layout>
        <FormEditTeacher />
    </Layout>
  )
}

export default EditTeacher