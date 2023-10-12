import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { 
    Logo, 
    FormRow, 
    SubmitBtn
} from '../components'
import customFetch from './../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) // Turns into an object
    try {
        await customFetch.post('/auth/register', data)
        toast.success('Registration successfull')
        return redirect('/login');
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const Register = () => {
    return (
        <Wrapper>
            <Form method='post'  className="form"> {/* Default method will be 'GET' */}
                <Logo />
                <h4>Register</h4>
                <FormRow 
                    type={'text'} 
                    name={'name'} 
                    placeholder={'Name'} />
                <FormRow 
                    type={'text'} 
                    name={'lastName'} 
                    placeholder={'Surname'} 
                    labelText={'last name'} />
                <FormRow 
                    type={'text'} 
                    name={'location'} 
                    placeholder={'City'} />
                <FormRow 
                    type={'email'} 
                    name={'email'} 
                    placeholder={'example@gmail.com'} />
                <FormRow 
                    type={'password'} 
                    name={'password'} 
                    placeholder={'Password'} />

                    <SubmitBtn />
                    <p>
                        Already a member?
                        <Link to={'/login'} className="member-btn">
                            Login here
                        </Link>
                    </p>
            </Form>
        </Wrapper>
    )
}

export default Register