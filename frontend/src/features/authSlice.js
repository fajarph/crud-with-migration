import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    student: null,
    teacher: null,
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ""
}

export const LoginStudent = createAsyncThunk("student/LoginStudent", async(student, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: student.email,
            password: student.password
        }) 
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkApi.rejectWithValue(message)
        }
    }
})   

export const LoginTeacher = createAsyncThunk("teacher/LoginTeacher", async(teacher, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: teacher.email,
            password: teacher.password
        }) 
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkApi.rejectWithValue(message)
        }
    }
})  

export const getMe = createAsyncThunk("/getMe", async(_, thunkApi) => {
    try {
        const response = await axios.get('http://localhost:5000/me') 
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkApi.rejectWithValue(message)
        }
    }
})   

export const LogOut = createAsyncThunk("/LogOut", async() => {
    await axios.delete('http://localhost:5000/logout') 
})   

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) => {
        builder.addCase(LoginStudent.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(LoginStudent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSucces = true
            state.student = action.payload
        })
        builder.addCase(LoginStudent.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(LoginTeacher.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(LoginTeacher.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSucces = true
            state.teacher = action.payload
        })
        builder.addCase(LoginTeacher.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        //Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSucces = true
            state.student = action.payload
            state.teacher = action.payload
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
