import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import studentReducer from "./StudentModule";
import memberReducer from "./MemberModule";
import courseReducer from "./CourseModule";
import loginReducer from "./LoginModule";
import myCourseReducer from "./MyCourseModule";
import noticeReducer, {boardReducer, commentReducer} from "./NoticeModule";
import messageReducer from "./MessageModule";
import attendanceReducer from "./AttendanceModule";
import classroomReducer from "./ClassroomModule";

const rootReducer = combineReducers({
    lectureReducer, courseReducer, myCourseReducer, classroomReducer,
    loginReducer, memberReducer, boardReducer,
    commentReducer, studentReducer, attendanceReducer,
    messageReducer
});

export default rootReducer;