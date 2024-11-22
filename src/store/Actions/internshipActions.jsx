import { saveInternship, saveSingleInternship, removeInternship} from "../Reducers/internshipSlice";
import axios from "../../config/axios";

export const asyncfetchInternships = () => async (dispatch, getState) => {
    
    try {
        const { data } = await axios.post("/employe/internship/view");
            dispatch(saveInternship(data.internship))
            console.log(data.internship)
    } catch (error) {
        console.log(error.response.data);
    } 

};

export const asyncfetchSingleInternship = (id) => async (dispatch, getState) => {
    
    try {
        const { data } = await axios.post(`/employe/internship/read/${id}`);
            dispatch(saveSingleInternship(data.internship))
            console.log(data.internship)
    } catch (error) {
        console.log(error.response.data);
    } 

};

export const asyncgetInternships = () => async (dispatch, getState) => {
    
    try {
        const { data } = await axios.post("/employe/internship/read");
            dispatch(saveInternship(data.internships))
            console.log(data.internships)
    } catch (error) {
        console.log(error.response.data);
    } 

};

export const asynccloseInternship = (id) => async (dispatch, getState) => {
    
    try {
        await axios.post(`/employe/internship/close/${id}`);
            dispatch(asyncgetInternships());
            console.log(data.internships);
    } catch (error) {
        
    } 

};

export const asyncopenInternship = (id) => async (dispatch, getState) => {
    
    try {
        await axios.post(`/employe/internship/open/${id}`);
            dispatch(asyncgetInternships());
            console.log(data.internships);
    } catch (error) {
        
    } 

};

export const asyncdeleteInternship = (id) => async (dispatch, getState) => {
    
    try {
        await axios.post(`/employe/internship/delete/${id}`);
            dispatch(asyncgetInternships());
            console.log(data.internships);
    } catch (error) {
        
    } 

};