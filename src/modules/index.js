import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import studentReducer from "./StudentModule";
import memberReducer from "./MemberModule";
import courseReducer from "./CourseModule";
import loginReducer from "./LoginModule";
import myCourseReducer from "./MyCourseModule";
import messageReducer from "./MessageModule";

const rootReducer = combineReducers({
    lectureReducer, courseReducer, myCourseReducer,
    loginReducer, memberReducer,
    studentReducer, messageReducer
});

export default rootReducer;