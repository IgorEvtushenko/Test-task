import React from 'react';
import './CreateCompany.scss'
import CreateForm from './CreateForm/CreateForm'
import { createCompany, getCompanies } from '../../../action/companies'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';

const CreateCompany = () => {

    const currentUser = useSelector(state => state.user.currentUser.id)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(getCompanies(currentUser))
        };
    });

    function getValues(obj, id){
        const newCompany = {
            name: obj[0].value,
            addres: obj[1].value,
            type: obj[2].value,
            service_of_activity: obj[3].value,
            description: obj[4].value,
            number_of_employees: obj[5].value,
            user_id: currentUser
        }
        createCompany(newCompany)
    }

    return (
        <div className='CreateCompanyFormWrapper'>
            <div className='link_wrapper'>
                <Link to="/" className='button_link'>Back</Link>
            </div>
            <h1>Add company</h1>
            <CreateForm
                getValues={getValues}
            />
        </div>
    );
}

export default CreateCompany;