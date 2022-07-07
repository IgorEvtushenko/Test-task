import '../../utils/forms.scss'
import { useState } from 'react';
import { login } from '../../action/user';
import { validateForm } from '../../utils/validateForm'
import { useDispatch } from 'react-redux';

const init_state = [
    {name: 'email', value: '', isValid: true},
    {name: 'Password', value: '', isValid: true}
]

const Autorization = () => {
    const [inputsState, setInputs] = useState(init_state);
    const dispatch = useDispatch()

    const changeInputs = (index, event)=>{
        let newInputs = [...inputsState]
        newInputs[index].value = event.target.value
        setInputs(newInputs)
    }

    const takeInputsValue = (inputs)=>{
        const [flag, newInputs] = validateForm(inputs)
        setInputs(newInputs)
        
        if(flag){
            const result = {
                email: inputsState[0].value,
                password: inputsState[1].value
            }
            return result
        }
        return null
    }

    return (
        <div className="autorization">
            <h2 className="page_name">Login</h2>
            <form className="autorization_form">
                <fieldset className='form_wrapper'>
                    <legend className='legend'>Fill out the login form</legend>
                    <label
                        className={`form_item ${inputsState[0].isValid?null:'invalid_value'}`}
                    >
                        email
                        <input
                            type="text"
                            placeholder='Your email'
                            value={inputsState[0].value}
                            onChange={(event)=>{changeInputs(0, event)}}
                        />
                    </label>
                    <label
                        className={`form_item ${inputsState[1].isValid?null:'invalid_value'}`}
                    >
                        Password
                        <input
                            type="text"
                            placeholder='Your password'
                            value={inputsState[1].value}
                            onChange={(event)=>{changeInputs(1, event)}}
                        />
                    </label>
                    <fieldset className='botton_wrapper'>
                        <button
                            onClick={(e)=>{
                                e.preventDefault()
                                dispatch(login(takeInputsValue(inputsState)))
                            }}
                        >
                            Login
                        </button>
                    </fieldset>
                </fieldset>
            </form>
        </div>
    );
}

export default Autorization;
