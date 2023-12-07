import {NavLink} from "react-router-dom";

function MyCourseSidebar() {


    const activeStyle = {
        fontWeight: "bold"
    };

    return (
        <div className="my-course-side-bar-box">
            <div className="my-course-bar in-progress">
                <NavLink to="/mylecture/inprogress" style={({isActive}) => (isActive ? activeStyle : {})}
                >
                    진행중인 강의</NavLink>
            </div>
            <div className="my-course-bar scheduled">
                <NavLink to="/mylecture/scheduledcourse" style={({isActive}) => (isActive ? activeStyle : {})}
                >
                    예정 강의</NavLink>
            </div>
            <div className="my-course-bar last">
                <NavLink to="/mylecture/lastcourse" style={({isActive}) => (isActive ? activeStyle : {})}
                >
                    지난 강의</NavLink>
            </div>
        </div>
    );
}
export default MyCourseSidebar;