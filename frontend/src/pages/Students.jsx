import React, {useEffect} from 'react'
import Layout from './Layout'
import ListStudent from '../components/ListStudent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const Students = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError} = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(getMe())   
    }, [dispatch])

    useEffect(() => {
        if(isError){
            navigate("/")
        }  
    }, [isError, navigate])
  return (
    <Layout>
        <ListStudent />
    </Layout>
  )
}

export default Students