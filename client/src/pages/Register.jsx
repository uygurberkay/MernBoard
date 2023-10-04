import { Link } from "react-router-dom"
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";

const Register = () => {
    return (
        <Wrapper>
            <form action="" className="form">
                <Logo />
                <h4>Register</h4>
                <FormRow 
                    type={'text'} 
                    name={'name'} 
                    placeholder={'Berkay'} />
                <FormRow 
                    type={'text'} 
                    name={'LastName'} 
                    placeholder={'Uygur'} 
                    labelText={'last name'} />
                <FormRow 
                    type={'text'} 
                    name={'location'} 
                    placeholder={'İzmir'} />
                <FormRow 
                    type={'email'} 
                    name={'email'} 
                    placeholder={'example@gmail.com'} />
                <FormRow 
                    type={'password'} 
                    name={'password'} 
                    placeholder={'Example123'} />

                    <button type="submit" className="btn btn-block">
                        Submit
                    </button>
                    <p>
                        Already a member?
                        <Link to={'/login'} className="member-btn">
                            Login here
                        </Link>
                    </p>
            </form>
        </Wrapper>
    )
}

export default Register