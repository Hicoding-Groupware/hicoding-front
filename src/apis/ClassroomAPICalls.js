import {authRequest} from "./Api";
import {getClassrooms} from "../modules/ClassroomModule";

export const callClassroomsAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/classrooms`);

        console.log(result);

        if(result.status === 200){
            dispatch(getClassrooms(result));
        }
    }
};