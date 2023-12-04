import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import memberReducer from "./MemberModule";
import loginReducer from "./LoginModule";

const rootReducer = combineReducers({
    lectureReducer, memberReducer, loginReducer
});

export default rootReducer;