import React from 'react';
import './UserPage.scss'
import Companies from './Companies/Companies';

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getCompanies } from '../../action/companies';
import { Link } from "react-router-dom";

const UserPage = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(getCompanies(currentUser.id))
        };
    });

    return (
        <>
            <div className='userPage'>
                <ul>
                    <li>
                        <span>User:</span>
                        <span>
                            {currentUser.nick_name}
                        </span>
                    </li>
                    <li>
                        <span>Position:</span>
                        <span>{currentUser.position}</span>
                    </li>
                </ul>
                <Link to="/edit_user" className='button_link'>Edit profile</Link>
            </div>
            <hr />
            <Companies />
        </>
    );
}

export default UserPage;