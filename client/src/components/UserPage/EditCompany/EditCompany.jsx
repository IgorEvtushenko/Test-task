import React from 'react';
import './EditCompany.scss'
import EditForm from './EditForm/EditForm'
import { getCompanies } from '../../../action/companies'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';

const EditCompany = () => {
    const currentUser = useSelector(state => state.user.currentUser.id)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(getCompanies(currentUser))
        };
    });

    return (
        <div className='EditCompanyFormWrapper'>
            <div className='link_wrapper'>
                <Link to="/" className='button_link'>Back</Link>
            </div>
            <h1>View company</h1>
            <EditForm />
        </div>
    );
}

export default EditCompany;