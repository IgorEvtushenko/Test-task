import axios from 'axios'
import { loginUser, logout } from '../reducers/userReducer'

export const registration = async (inputs)=>{
    if(inputs){
        try{
            const response = await axios.post('http://localhost:5000/api/user', inputs)
            alert(response.data.message)
        } catch(err){
            if(err.response.status === 400 || err.response.status === 503) {
                alert(err.response.data.message)
            } else {
                alert(`
                    Error!
                    User not added!
                    No connection to the server!
                `)
            }
        }
    }
}

export const login = (user)=>{
    return async dispatch => {
        if(user){
            try{
                const response = await axios.post('http://localhost:5000/api/login', user)
                dispatch(loginUser(response.data.user))
                localStorage.setItem('token', response.data.token)
            } catch(err){
                alert(err.response.data.message)
            }
        }
    }
}

export const auth = ()=>{
    return async dispatch => {
        const token = localStorage.getItem('token')
        if(token){
            try{
                const response = await axios.get(
                    'http://localhost:5000/api/auth',
                    {headers: {Authorization: `Bearer ${token}`}}
                )
                dispatch(loginUser(response.data.user))
                localStorage.setItem('token', response.data.token)
            } catch(err){
                localStorage.removeItem('token')
            }
        }
    }
}

export const editUserData = (user)=>{
    return async dispatch => {
        if(user){
            try{
                const response = await axios.put('http://localhost:5000/api/user', user)
                alert(response.data.message)
            } catch(err){
                alert(err)
            }
        }
    }
}

export const deleteUserProfile = (user)=>{
    return async dispatch => {
        if(user){
            try{
                const response = await axios.delete(`http://localhost:5000/api/user/${user.id}`)
                alert(response.data.message)
                dispatch(logout())
            } catch(err){
                alert(err)
            }
        }
    }
}