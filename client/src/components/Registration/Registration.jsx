import FormFields from './FormFields/FormFields';
import '../../utils/forms.scss'

const Registration = () => {
    return (
        <div className="registration">
            <h2 className="page_name">Signup</h2>
            <form className="registration_form">
                <fieldset className='form_wrapper'>
                    <legend className='legend'>Enter your details</legend>
                    <FormFields/>
                </fieldset>
            </form>
        </div>
    );
}

export default Registration;
