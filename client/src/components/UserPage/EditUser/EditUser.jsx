import React from 'react';
import './EditUser.scss'

import { login } from '../../../action/user';
import { editUserData, deleteUserProfile } from '../../../action/user';
import { validateUserForm } from '../../../utils/validateForm';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';


const EditUser = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const [inputsState, setstate] = useState(currentUser);
    const [flag, setFlag] = useState(false);

    function inputsOnchange(event){
        const newState = {...inputsState}
        const stateKey = event.target.dataset.name
        newState[stateKey] = event.target.value
        setstate(newState)
        let isFormValid = validateUserForm(stateKey, event.target)
        setFlag(isFormValid)
    }

    function changeUserProfile(){
        if(flag){
            dispatch(editUserData(inputsState))
        }
    }

    function deleteUser(){
        let entered_password = prompt("Enter password to confirm!", '')
        if(entered_password === currentUser.password){
            dispatch(deleteUserProfile(currentUser))
        }
    }

    return (
        <div className='edit_user'>
            <div className='link_wrapper'>
                <Link to="/" className='button_link'
                    onClick={()=>{
                        dispatch(login({email: currentUser.email, password: currentUser.password}))
                    }}
                >
                    Back
                </Link>
            </div>
            <h2 className="page_name">Edit user profile</h2>
            <div className='form_wrapper'>
                <form className="edit_form">
                    <label className='form_item'>
                        <span>Last name:</span>
                        <input type="text"
                            data-name="last_name"
                            value={inputsState.last_name}
                            onChange={(e)=>{inputsOnchange(e)}}
                        />
                    </label>
                    <label className='form_item'>
                        <span>Name:</span>
                        <input type="text"
                            data-name="first_name"
                            value={inputsState.first_name}
                            onChange={(e)=>{inputsOnchange(e)}}
                        />
                    </label>
                    <label className='form_item'>
                        <span>nick name:</span>
                        <input type="text"
                            data-name="nick_name"
                            value={inputsState.nick_name}
                            onChange={(e)=>{inputsOnchange(e)}}
                        />
                    </label>
                    <label className='form_item'>
                        <span>email:</span>
                        <input type="text"
                            data-name="email"
                            value={inputsState.email}
                            onChange={(e)=>{inputsOnchange(e)}}
                        />
                    </label>
                    <label className='form_item'>
                        <span>Password:</span>
                        <input type="text"
                            data-name="password"
                            value={inputsState.password}
                            onChange={(e)=>{inputsOnchange(e)}}
                        />
                    </label>
                    <label className='form_item'>
                        <span>Phone number:</span>
                        <input type="text"
                            data-name="phone_number"
                            value={inputsState.phone_number}
                            onChange={(e)=>{inputsOnchange(e)}}
                        />
                    </label>
                    <label className='form_item'>
                        <span>Position:</span>
                        <input type="text"
                            data-name="position"
                            value={inputsState.position}
                            onChange={(e)=>{inputsOnchange(e)}}
                        />
                    </label>
                    <label className='form_item'>
                        <span>Description:</span>
                        <input type="text"
                            data-name="description"
                            value={inputsState.description}
                            onChange={(e)=>{inputsOnchange(e)}}
                        />
                    </label>
                    <fieldset className='botton_wrapper'>
                        <span className='button_link'
                            onClick={changeUserProfile}
                        >
                            Save changes
                        </span>
                    </fieldset>
                </form>
            </div>
            <div className='link_wrapper'>
                <span className='button_link'
                    onClick={deleteUser}
                >
                    Delete profile
                </span>
            </div>
        </div>
    );
}

export default EditUser;
