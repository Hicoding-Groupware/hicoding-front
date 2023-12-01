import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import courseReducer from "./CourseModule";

const rootReducer = combineReducers({
    lectureReducer, courseReducer
});

export default rootReducer;