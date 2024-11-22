import { saveUser, removeUser} from "../Reducers/userSlice";
import axios from "../../config/axios";


export const asynccurrentUser = () => async (dispatch, getState) => {
        try {
            const { data } = await axios.post("/student");
                dispatch(saveUser(data.student))
                console.log(data.student)
        } catch (error) {
            console.log(error.response.data);
        } 
    
};

export const asynccurrentEmploye = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/employe/current");
        dispatch(saveUser(data.employe));
        console.log(data.employe)
        } catch (error) {
        console.log(error.response.data);  
        }
    };

export const asyncsignup = (user) => async (dispatch, getState) => {
    try {
        await axios.post("/student/signup", user);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncupdateUser = (id,userdetails) => async (dispatch, getState) => {
    try {
        await axios.post(`/student/update/${id}`, userdetails);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncupdateEmploye = (id,userdetails) => async (dispatch, getState) => {
    try {
        await axios.post(`/employe/update/${id}`, userdetails);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncupdateAvatar = (id,newavatar) => async (dispatch, getState) => {
    try {
        await axios.post(`/student/avatar/${id}`, newavatar);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncupdateOrgLogo = (id,newavatar) => async (dispatch, getState) => {
    try {
        await axios.post(`/employe/avatar/${id}`, newavatar);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncupdatePassword = (id, password) => async (dispatch, getState) => {
    try {
        await axios.post(`/student/reset-password/${id}`, password);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncforgetPassword = (email) => async (dispatch, getState) => {
    try {
        await axios.post("/student/send-mail", email);
        // dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncforgetPasswordUnique = (password, id) => async (dispatch, getState) => {
    try {
        await axios.post(`/student/forget-link/${id}`, password);
        // dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncapplyInternship = (id) => async (dispatch, getState) => {
    try {
        await axios.post(`/student/apply/internship/${id}`);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncapplyJob = (id) => async (dispatch, getState) => {
    try {
        await axios.post(`/student/apply/job/${id}`);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncaddedu = (newresume) => async (dispatch, getState) => {
    try {
        await axios.post("/resume/add-edu", newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asynceditedu = (eduid, newresume) => async (dispatch, getState) => {
    try {
        await axios.post(`/resume/edit-edu/${eduid}`, newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncDeleteEducation = (eduid) => async (dispatch) => {
    try {
      await axios.post(`/resume/delete-edu/${eduid}`);
      // Dispatch an action to update Redux state after successful deletion
      dispatch(asynccurrentUser());
    } catch (error) {
      console.error('Error deleting education:', error);
      // Handle error if needed
    }
  };

  export const asyncaddjob = (newresume) => async (dispatch, getState) => {
    try {
        await axios.post("/resume/add-job", newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asynceditjob = (eduid, newresume) => async (dispatch, getState) => {
    try {
        await axios.post(`/resume/edit-job/${eduid}`, newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncdeletejob = (eduid) => async (dispatch) => {
    try {
      await axios.post(`/resume/delete-job/${eduid}`);
      // Dispatch an action to update Redux state after successful deletion
      dispatch(asynccurrentUser());
    } catch (error) {
      console.error('Error deleting education:', error);
      // Handle error if needed
    }
  };

  export const asyncaddintern = (newresume) => async (dispatch, getState) => {
    try {
        await axios.post("/resume/add-intern", newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asynceditintern = (internid, newresume) => async (dispatch, getState) => {
    try {
        await axios.post(`/resume/edit-intern/${internid}`, newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncdeleteintern = (internid) => async (dispatch) => {
    try {
      await axios.post(`/resume/delete-intern/${internid}`);
      // Dispatch an action to update Redux state after successful deletion
      dispatch(asynccurrentUser());
    } catch (error) {
      console.error('Error deleting interncation:', error);
      // Handle error if needed
    }
};

export const asyncaddresp = (newresume) => async (dispatch, getState) => {
    try {
        await axios.post("/resume/add-resp", newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asynceditresp = (respid, newresume) => async (dispatch, getState) => {
    try {
        await axios.post(`/resume/edit-resp/${respid}`, newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncdeleteresp = (respid) => async (dispatch) => {
    try {
      await axios.post(`/resume/delete-resp/${respid}`);
      // Dispatch an action to update Redux state after successful deletion
      dispatch(asynccurrentUser());
    } catch (error) {
      console.error('Error deleting interncation:', error);
      // Handle error if needed
    }
  };

  export const asyncaddcours = (newresume) => async (dispatch, getState) => {
    try {
        await axios.post("/resume/add-cours", newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asynceditcours = (coursid, newresume) => async (dispatch, getState) => {
    try {
        await axios.post(`/resume/edit-cours/${coursid}`, newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncdeletecours = (coursid) => async (dispatch) => {
    try {
      await axios.post(`/resume/delete-cours/${coursid}`);
      // Dispatch an action to update Redux state after successful deletion
      dispatch(asynccurrentUser());
    } catch (error) {
      console.error('Error deleting course', error);
      // Handle error if needed
    }
  };

  export const asyncaddproj = (newresume) => async (dispatch, getState) => {
    try {
        await axios.post("/resume/add-proj", newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asynceditproj = (projid, newresume) => async (dispatch, getState) => {
    try {
        await axios.post(`/resume/edit-proj/${projid}`, newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncdeleteproj = (projid) => async (dispatch) => {
    try {
      await axios.post(`/resume/delete-proj/${projid}`);
      // Dispatch an action to update Redux state after successful deletion
      dispatch(asynccurrentUser());
    } catch (error) {
      console.error('Error deleting interncation:', error);
      // Handle error if needed
    }
  };

  export const asyncaddskil = (newresume) => async (dispatch, getState) => {
    try {
        await axios.post("/resume/add-skil", newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asynceditskil = (skilid, newresume) => async (dispatch, getState) => {
    try {
        await axios.post(`/resume/edit-skil/${skilid}`, newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncdeleteskil = (skilid) => async (dispatch) => {
    try {
      await axios.post(`/resume/delete-skil/${skilid}`);
      // Dispatch an action to update Redux state after successful deletion
      dispatch(asynccurrentUser());
    } catch (error) {
      console.error('Error deleting interncation:', error);
      // Handle error if needed
    }
  };

  export const asyncaddacomp = (newresume) => async (dispatch, getState) => {
    try {
        await axios.post("/resume/add-acomp", newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asynceditacomp = (acompid, newresume) => async (dispatch, getState) => {
    try {
        await axios.post(`/resume/edit-acomp/${acompid}`, newresume);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncdeleteacomp = (acompid) => async (dispatch) => {
    try {
      await axios.post(`/resume/delete-acomp/${acompid}`);
      // Dispatch an action to update Redux state after successful deletion
      dispatch(asynccurrentUser());
    } catch (error) {
      console.error('Error deleting interncation:', error);
      // Handle error if needed
    }
  };


export const asyncsignin = (user) => async (dispatch, getState) => {
    try {
        await axios.post("/student/signin", user);
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log(error.response.data);
    }
};



export const asyncremoveUser = () => async (dispatch, getState) => {
    try {
        await axios.get("/student/signout");
        dispatch(removeUser());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncdeleteUser = (user,id) => async (dispatch, getState) => {
    try {
        if(
            user.role === "student"
        ){
            await axios.post(`/student/delete/${id}`);
            dispatch(removeUser());
        }
        else{
            await axios.post(`/employe/delete/${id}`);
            dispatch(removeUser());
        }
    } catch (error) {
        console.log(error.response.data);
    }
};




export const asyncsignupEmploye = (user) => async (dispatch, getState) => {
    try {
        await axios.post("/employe/signup", user);
        dispatch(asynccurrentEmploye());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncsigninEmploye = (user) => async (dispatch, getState) => {
    try {
        await axios.post("/employe/signin", user);
        dispatch(asynccurrentEmploye());
    } catch (error) {
        console.log(error.response.data);
        dispatch(setError(error.response.data));
    }
};

export const asyncupdatePasswordEmploye = (id, password) => async (dispatch, getState) => {
    try {
        await axios.post(`/employe/reset-password/${id}`, password);
        dispatch(asynccurrentEmploye());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncremoveEmploye = () => async (dispatch, getState) => {
    try {
        await axios.get("/employe/signout");
        dispatch(removeUser());
    } catch (error) {
        console.log(error.response.data);
    }
};


export const asyncinternpost = (newintern) => async (dispatch, getState) => {
    try {
        console.log(newintern)
        await axios.post("/employe/internship/create", newintern);
        dispatch(asynccurrentEmploye());
    } catch (error) {
        console.log(error.response.data);
    }
};

export const asyncjobpost = (newjob) => async (dispatch, getState) => {
    try {
        console.log(newjob)
        await axios.post("/employe/job/create", newjob);
        dispatch(asynccurrentEmploye());
    } catch (error) {
        console.log(error.response.data);
    }
};