import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
    const {data} = useAllJobsContext()
    const {jobs, totalJobs, numOfPages} = data;
    console.log(data)

    if(jobs.length === 0){
        return (
            <Wrapper>
                <h2>No Jobs to display...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            {/* To show number of jobs */}
            <h5>{totalJobs} job{jobs.length > 1 && 's'}</h5> 
            {/* Display job contents */}
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job}/>
                })}
            </div>
            {/* To show page button */}
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer