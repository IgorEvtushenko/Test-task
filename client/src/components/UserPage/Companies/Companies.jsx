import React from 'react';
import './Companies.scss'
import CreateCompanyButton from './CreateCompanyButton/CreateCompanyButton'
import { setCurrentCompany } from '../../../reducers/companiesReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Company = () => {
    const usersCompanies = useSelector(state => state.companies.companies)
    const dispatch = useDispatch()

    function getCurrentCompany(current){
        dispatch(setCurrentCompany(current))
    }
    
    return <div className='companies_wrapper'>
        {usersCompanies[0] ? 
        <div className='companies_list'>
            <CreateCompanyButton/>
            <h1>List of companies</h1>
            {usersCompanies.map((elem)=>{
                return <div key={elem.id} className='company'>
                    <h2>{elem.name}</h2>
                    <p>
                        <span>Address:</span><span>{elem.addres}</span>
                    </p>
                    <p>
                        <span>Company type:</span><span>{elem.type}</span>
                    </p>
                    <div className='button_wrapper'>
                        <Link to="/edit_company" className='button_link'
                            onClick={()=>{getCurrentCompany(elem)}}
                        >
                            View company
                        </Link>
                    </div>
                </div>
            })}
        </div>
        :
        <div className='companies_list'>
            
            <h1>You don't have companies. Click add company.</h1>
        </div>
        }
        <CreateCompanyButton/>
    </div>;
}

export default Company;