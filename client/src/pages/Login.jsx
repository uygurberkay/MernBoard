import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';

const Login = () => {
    return (
        <Wrapper>
            <form action="" className='form'>
                <Logo/>
                <h4>Login</h4>
                <FormRow 
                    type={'email'} 
                    name={'email'} 
                    placeholder={'example@gmail.com'}/>
                <FormRow 
                    type={'password'} 
                    name={'password'} 
                    placeholder={'example123'}/>
                <button type='submit' className='btn btn-block'>Sumbit</button>
                <button type='button' className='btn btn-block'>Explore the app</button>
                <p>
                    Not a member yet?
                    <Link to={'/register'} className='member-btn'>
                        Register ?
                    </Link>
                </p>
            </form>
        </Wrapper>
    );
};
export default Login;