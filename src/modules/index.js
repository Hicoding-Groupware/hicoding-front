import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import courseReducer from "./CourseModule";
import loginReducer from "./LoginModule";


const rootReducer = combineReducers({
    lectureReducer, courseReducer,
    loginReducer
});

export default rootReducer;