import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from "@fullcalendar/react";


function MainManagerCalender ({courses}){

    return(
        <>
            <div className="calendarContainerMM">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView={'dayGridMonth'}
                    height={"331px"}
                    events={
                        courses &&
                        courses.data.map(course => ({
                            resourceId: course.cosCode,
                            cosCodetitle: course.cosName,
                            start: course.cosSdt,
                            end: course.cosEdt,
                            display: 'background',
                            backgroundColor : 'Lavender'
                        }))
                    }
                />
            </div>
        </>
    );
}

export default MainManagerCalender;