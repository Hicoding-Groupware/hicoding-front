import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import memberReducer from "./MemberModule";

const rootReducer = combineReducers({
    lectureReducer, memberReducer
});

export default rootReducer;