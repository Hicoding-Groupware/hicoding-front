import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";

const rootReducer = combineReducers({
    lectureReducer
});

export default rootReducer;