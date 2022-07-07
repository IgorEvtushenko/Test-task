import axios from 'axios'
import { getUserCompanies } from '../reducers/companiesReducer'

export function getCompanies(userId){
    return async dispatch => {
        try{
            const response = await axios.get(`http://localhost:5000/api/companies${userId ? '?user_id=' + userId : ''}`)
            dispatch(getUserCompanies(response.data))
        } catch (err){
            alert(err)
        }
    }
}

export const createCompany = async (company)=>{
    if(company){
        try{
            const response = await axios.post('http://localhost:5000/api/company', company)
            alert(response.data.message)
        } catch(err){
            if(err.response.status === 400 || err.response.status === 503) {
                alert(err.response.data.message)
            } else {
                alert(`
                    Ошибка!
                    Компания не создана!
                    Нет связи с сервером!
                `)
            }
        }
    }
}

export const updateCompany = async (company)=>{
    if(company){
        try{
            const response = await axios.put('http://localhost:5000/api/company', company)
            alert(response.data.message)
        } catch(err){
            if(err.response.status === 400 || err.response.status === 503) {
                alert(err.response.data.message)
            } else {
                alert(`
                    Ошибка!
                    Изменения не сохранены!
                    Нет связи с сервером!
                `)
            }
        }
    }
}

export const deleteCompany = async (user_id, id)=>{
    if(user_id && id){
        try{
            const response = await axios.delete(`http://localhost:5000/api/company/${user_id}/${id}`)
            alert(response.data.message)
        } catch(err){
            if(err.response.status === 400 || err.response.status === 503) {
                alert(err.response.data.message)
            } else {
                alert(`
                    Ошибка!
                    Компания не удалена!
                    Нет связи с сервером!
                `)
            }
        }
    }
}