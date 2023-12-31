import {combineReducers} from "redux";
import lectureReducer from "./LectureModule";
import studentReducer from "./StudentModule";
import courseReducer from "./CourseModule";
import loginReducer from "./LoginModule";
import myCourseReducer from "./MyCourseModule";
import messageReducer from "./MessageModule";
import attendanceReducer from "./AttendanceModule";
import {memberReducer, memberRoleReducer} from "./MemberModule";
import {boardReducer, commentReducer} from "./NoticeModule";
import classroomReducer from "./ClassroomModule";

const rootReducer = combineReducers({
    lectureReducer, courseReducer, myCourseReducer, classroomReducer,
    loginReducer, memberReducer, memberRoleReducer,
    boardReducer, commentReducer, studentReducer,
    attendanceReducer, messageReducer



});

export default rootReducer;