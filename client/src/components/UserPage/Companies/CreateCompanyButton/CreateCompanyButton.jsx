import React from 'react';
import { Link } from "react-router-dom";
import './CreateCompanyButton.scss'

const CreateCompanyButton = () => {
    return (
        <div className='CreateCompanyButtonWrapper'>
            <Link to="/create" className='button_link'>Add company</Link>
        </div>
    );
}

export default CreateCompanyButton;