import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constant.js';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';


const AddJob = () => {
    const {user} = useOutletContext() // useContext gibi ama Outlet üzerinden alıyoruz.
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className="form-title">add job</h4>
                <div className="form-center">

                    {/* Form input rows */}
                    <FormRow 
                        type={'text'} 
                        name={'position'}/>
                    <FormRow 
                        type={'text'} 
                        name={'company'}/>
                    <FormRow 
                        type={'text'} 
                        name={'jobLocation'} 
                        labelText={'job location'} 
                        placeholder={user.location}/>

                    {/* Form select rows */}
                    <FormRowSelect 
                        labelText={'job status'} 
                        name={'jobStatus'} 
                        defaultValue={JOB_STATUS.PENDING}
                        list={Object.values(JOB_STATUS)}/>
                    <FormRowSelect 
                        labelText={'job type'} 
                        name={'jobType'} 
                        defaultValue={JOB_TYPE.FULL_TIME}
                        list={Object.values(JOB_TYPE)}/>
                    
                    <button
                        type='submit'
                        className='btn btn-block form-btn '
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'submitting...' : 'submit'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    )
}

export default AddJob