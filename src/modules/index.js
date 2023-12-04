import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import memberReducer from "./MemberModule";
import courseReducer from "./CourseModule";
import loginReducer from "./LoginModule";
import myCourseReducer from "./MyCourseModule";

const rootReducer = combineReducers({
    lectureReducer, courseReducer, myCourseReducer,
    loginReducer, memberReducer
});

export default rootReducer;