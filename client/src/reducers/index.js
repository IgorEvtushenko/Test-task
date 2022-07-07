import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import companiesReducer from './companiesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    companies: companiesReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))