import {request} from "./Api";
import {getCourses} from "../modules/CourseModule";
// import {toast} from "react-toastify";


// export const callCourseListAPI = ({ currentPage = 1}) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await request('GET', `/hc-app/v1/mylecture/inProgress=${currentPage}`);
//         console.log('callCourseListAPI result : ', result);
//
//         if(result.status === 200) {
//             dispatch(getCourses(result));
//         }
//     }
// };


export const callCourseListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await request.get(`/hc-app/v1/mylecture/inprogress?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callOrderAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}