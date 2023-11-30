import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import studentReducer from "./StudentModule";

const rootReducer = combineReducers({
    lectureReducer, studentReducer
});

export default rootReducer;