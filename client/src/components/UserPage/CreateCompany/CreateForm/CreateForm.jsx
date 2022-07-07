import React from 'react';
import './CreateForm.scss'
import { useState } from 'react';
import { initial_company } from './initial_company'
import { useSelector } from 'react-redux'

const CreateForm = ({getValues}) => {
    const currentCompany = useSelector(state => state.companies.currentCompany)
    const [state, setstate] = useState(initial_company);

    function changeInputs(index, event){
        let newState = [...state]
        newState[index].value = event.target.value
        setstate(newState)
    }

    function checkValues(){
        let newState = [...state]
        let flag = true
        newState.map((elem, i)=>{
            if(elem.value.length > 0){
                elem.completed = true
                return elem
            }
            flag = false
            elem.completed = false
            return elem
        })
        setstate(newState)
        return flag
    }

    function sendState (e){
        if(checkValues()){
                getValues(state, currentCompany)
                let newState = [...state]
                newState.map((elem)=>{
                return elem.value = ''
            })
            setstate(newState)
        } else{
            e.preventDefault()
        }
    }

    return <>
        <form className="companies_form">
            <fieldset className='form_fields'>
                {state.map((elem, index)=>{
                    return <label
                    key={index}
                    className={elem.completed?null:'invalid_value'}
                    >
                        {elem.label}
                        <input type="text"
                            placeholder={elem.placeholder}
                            value={elem.value}
                            onChange={(event)=>{changeInputs(index, event)}}
                        />
                    </label>
                })}
            </fieldset>
            <fieldset className='link_wrapper'>
                <span
                    className='button_link'
                    onClick={(e)=>{sendState(e)}}
                >
                    Create a company
                </span>
            </fieldset>
        </form>
    </>;
}

export default CreateForm;