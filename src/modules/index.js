import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import studentReducer from "./StudentModule";
import memberReducer from "./MemberModule";
import courseReducer from "./CourseModule";
import loginReducer from "./LoginModule";
import myCourseReducer from "./MyCourseModule";
import noticeReducer, {boardReducer, commentReducer} from "./NoticeModule";

const rootReducer = combineReducers({
    lectureReducer, courseReducer, myCourseReducer,
    loginReducer, memberReducer, boardReducer,
    commentReducer, studentReducer
});

export default rootReducer;