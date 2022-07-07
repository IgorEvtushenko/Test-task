import React from 'react';
import './EditForm.scss'
import { setCurrentCompany } from '../../../../reducers/companiesReducer'
import { updateCompany } from '../../../../action/companies';
import { deleteCompany } from '../../../../action/companies';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

const EditForm = () => {
    const dispatch = useDispatch()
    const currentCompany = useSelector(state => state.companies.currentCompany)
    const [state, setstate] = useState(currentCompany);
    const [changed, setChanged] = useState(false);
    const [redact, setRedact] = useState(false);

    function changeInputs(key, event){
        let newState = {...state}
        newState[key] = event.target.value
        setstate(newState)
        if(event.target.value.length < 1){
            event.target.parentElement.classList.add('invalid_value')
        } else{
            event.target.parentElement.classList.remove('invalid_value')
        }
        setChanged(true)
    }

    function checkValues(){
        let flag = true
        for (let key in state) {
            if(state[key].length < 1){
                flag = false
            } else{
                flag = flag ? flag = true : flag = false
            }
        }
        return flag
    }

    function sendState (){
        if(checkValues() && changed){
            updateCompany(state)
        }
    }

    function deleteCurrentCompany(){
        let entered_password = prompt("Enter company name to confirm!", '')
        if(entered_password === state.name){
            deleteCompany(state.user_id, state.id)
            dispatch(setCurrentCompany(null))
        }
    }

    return <>
        {currentCompany ?
        <>
            <form className="companies_form">
                <fieldset className='form_fields'>
                    <label>Company name:
                        <input type="text"
                            disabled={!redact}
                            placeholder='Enter company name'
                            value={state.name}
                            onChange={(e)=>{changeInputs('name', e)
                            }}/>
                    </label>
                    <label>Company address:
                        <input type="text"
                            disabled={!redact}
                            placeholder='Enter сompany address'
                            value={state.addres}
                            onChange={(e)=>{changeInputs('addres', e)
                            }}/>
                    </label>
                    <label>Company type:
                        <input type="text"
                            disabled={!redact}
                            placeholder='Enter сompany type'
                            value={state.type}
                            onChange={(e)=>{changeInputs('type', e)}}/>
                    </label>
                    <label>Service of activity:
                        <input type="text"
                            disabled={!redact}
                            placeholder='Enter service of activity'
                            value={state.service_of_activity}
                            onChange={(e)=>{changeInputs('service_of_activity', e)}}/>
                    </label>
                    <label>Company description:
                        <input type="text"
                            disabled={!redact}
                            placeholder='Enter company description'
                            value={state.description}
                            onChange={(e)=>{changeInputs('description', e)}}/>
                    </label>
                    <label>Number of employees:
                        <input type="text"
                            disabled={!redact}
                            placeholder='Enter number of employees'
                            value={state.number_of_employees}
                            onChange={(e)=>{changeInputs('number_of_employees', e)}}/>
                    </label>
                </fieldset>
                <fieldset className='link_wrapper'>
                    {!redact?
                    <span
                    className='button_link'
                    onClick={()=>{setRedact(true)}}
                    >
                        Edit company
                    </span>
                    :
                    <span
                    className='button_link'
                    onClick={()=>{sendState()}}
                    >
                        Save changes
                    </span>
                    }
                </fieldset>
            </form>
            <div className='delete_button_wrapper'>
                <span
                className='button_link delete_button_link'
                onClick={deleteCurrentCompany}
                >
                    Delete company
                </span>
            </div>
        </> : 
        <p className='empty_message'>Empty</p>
        }
    </>;
}

export default EditForm;