const GET_COMPANIES = 'GET_COMPANIES'
const SET_CURRENT = 'SET_CURRENT_DIR'

const defaultState = {
    companies: [],
    currentCompany: null
}

export default function companiesReducer(state = defaultState, action){
    switch(action.type){
        case GET_COMPANIES: return {...state, companies: action.payload}
        case SET_CURRENT: return {...state, currentCompany: action.payload}
        default: return state
    }
}

export const getUserCompanies = (companies) => ({type: GET_COMPANIES, payload: companies})
export const setCurrentCompany = (id) => ({type: SET_CURRENT, payload: id})