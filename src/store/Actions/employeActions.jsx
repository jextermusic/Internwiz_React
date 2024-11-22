import { saveEmploye, removeEmploye, setError} from "../Reducers/employeSlice";
import axios from "../../config/axios";


export const asynccurrentEmploye = () => async (dispatch, getState) => {
    try {
        try {
            const { data } = await axios.post("/employe/current");
            dispatch(saveEmploye(data.employe));
        } catch (error) {
            console.log(error.response.data);
            
        }
    } catch (error) {}
};

export const asyncreadEmploye = () => async (dispatch, getState) => {
        try {
            const { data } = await axios.post("/employe/readall");
            dispatch(saveEmploye(data.employe));
            console.log(data.employe)
        } catch (error) {
            console.log(error.response.data);
            
    } 
};