import { saveJob, saveSingleJob } from "../Reducers/jobSlice";
import axios from "../../config/axios";

export const asyncfetchJobs = () => async (dispatch, getState) => {
    
    try {
        const { data } = await axios.post("/employe/job/view");
            dispatch(saveJob(data.job))
            console.log(data.job)
    } catch (error) {
        console.log(error.response.data);
    } 

};

export const asyncfetchSingleJob = (id) => async (dispatch, getState) => {
    
    try {
        const { data } = await axios.post(`/employe/job/read/${id}`);
            dispatch(saveSingleJob(data.job))
            console.log(data.job)
    } catch (error) {
        console.log(error.response.data);
    } 

};