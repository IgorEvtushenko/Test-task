import React from 'react';
import { useState } from 'react';
import { registration } from '../../../action/user';
import { validateForm } from '../../../utils/validateForm'
import { init_state } from './init_state'
import { Link } from "react-router-dom";

const FormField = () => {
    const [inputsState, setInputs] = useState(init_state);

    const changeInputs = (index, event)=>{
        let newInputs = [...inputsState]
        newInputs[index].value = event.target.value
        setInputs(newInputs)
    }

    const takeInputsValue = (inputs, e)=>{
        const [flag, newInputs] = validateForm(inputs)
        setInputs(newInputs)
        
        if(flag){
            const result = {
                email: inputsState[0].value,
                password: inputsState[1].value,
                phone_number: inputsState[2].value,
                last_name: inputsState[3].value,
                first_name: inputsState[4].value,
                nick_name: inputsState[5].value,
                description: inputsState[6].value,
                position: inputsState[7].value,
            }
            return result
        }
        e.preventDefault()
        return null
    }

    return (
        <>
            {inputsState.map((elem, index)=>{
                return <label className={`form_item ${elem.isValid?null:'invalid_value'}`}
                    key={index}>
                    {elem.name}
                    <input
                        type="text"
                        placeholder={elem.placeholder}
                        value={inputsState[index].value}
                        onChange={(event)=>{changeInputs(index, event)}}
                    />
                </label>
            })}
            <fieldset className='botton_wrapper'>
                <Link to="/login" className='button_link'
                onClick={(e)=>{registration(takeInputsValue(inputsState, e))}}
                >
                    Signup
                </Link>
            </fieldset>
        </>
    );
}

export default FormField;