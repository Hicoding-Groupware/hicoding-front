import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';


function ClassroomCalendar({classrooms,data}){

    return(
        <>
            <div className="calendarContainer">
                <FullCalendar
                    schedulerLicenseKey= 'CC-Attribution-NonCommercial-NoDerivatives'
                    plugins={[resourceTimeGridPlugin]}
                    initialView='resourceTimeGridDay'
                    height={"800px"}
                    locale={'ko'}
                    resourceAreaHeaderContent='강의실'
                    headerToolbar={{ start: 'prev,next',
                        center: 'title',
                        end :'today'

                    }}
                    resources={
                    classrooms &&
                        classrooms.map(classroom=>({
                            id: classroom.roomName,
                            title: classroom.roomName
                        }))
                    }
                    events={
                        data&&
                        data.map(course=>({
                            resourceId: course.roomCode,
                            title: course.cosName,
                            start: course.cosSdt,
                            end: course.cosEdt,
                            startTime:course.timeStatus === 'AFTERNOON' ? '14:00:00' : '09:00:00',
                            endTime:course.timeStatus === 'MORNING' ? '13:00:00' : '18:00:00'


                        }))
                    }


                />
            </div>
        </>
    );
}

export default ClassroomCalendar;