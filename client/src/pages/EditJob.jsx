import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constant.js';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

/* To use on get data */
export const loader = async ({params}) => {
    try {
        const {data} = await customFetch.get(`/jobs/${params.id}`)
        return data
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return redirect('/dashboard/all-jobs')
    }
};

/* To use on set data */
export const action = async ({request, params}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData) // Turn into Object
    try {
        await customFetch.patch(`/jobs/${params.id}`,data)
        toast.success('Job edited successfully')
        return redirect('/dashboard/all-jobs')
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
    }
};

const EditJob = () => {
    const {job} = useLoaderData()
    return (
        <Wrapper>
            <Form method='post'>
                <h4 className="form-title">edit job</h4>
                <div className="form-center">

                    {/* Form input rows */}
                    <FormRow 
                        type={'text'}
                        name={'position'}
                        defaultValue={job.position} />
                    <FormRow 
                        type={'text'}
                        name={'company'}
                        defaultValue={job.company} />
                    <FormRow 
                        type={'text'}
                        name={'jobLocation'}
                        defaultValue={job.jobLocation} />

                    {/* Form select rows */}
                    <FormRowSelect 
                        name={'jobStatus'}
                        labelText={'job status'}
                        defaultValue={job.jobStatus}
                        list={Object.values(JOB_STATUS)} />
                    <FormRowSelect 
                        name={'jobType'}
                        labelText={'job type'}
                        defaultValue={job.jobType}
                        list={Object.values(JOB_TYPE)} />

                        <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    )
}

export default EditJob