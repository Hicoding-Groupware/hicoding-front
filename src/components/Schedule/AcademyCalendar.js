import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'


function AcademyCalendar({data}){

    return(
        <>
            <div class="calendarContainer">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                height={"70vh"}
                firstDay={1}
                locale={'ko'}
                dayMaxEvents={2}
                events={
                data&&
                    data.map(course=>({
                            title: course.cosName,
                            start: course.cosSdt,
                            end:course.cosEdt
                    }))
                }
            />
            </div>
        </>
    );
}

export default AcademyCalendar;