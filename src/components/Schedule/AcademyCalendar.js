import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import {getRectCenter} from "@fullcalendar/core/internal";



function AcademyCalendar({data}){

    return(
        <>

            <div class="calendarContainer">
            <FullCalendar
                schedulerLicenseKey= 'CC-Attribution-NonCommercial-NoDerivatives'
                plugins={[resourceTimelinePlugin]}
                initialView='resourceTimelineYear'
                headerToolbar={{ start: 'prev,next',
                    center: 'title',
                    end: 'resourceTimelineMonth,resourceTimelineYear'}}
                height={"800px"}
                locale={'ko'}
                nowIndicator={true}
                resourceAreaHeaderContent='과정'
                resourceAreaWidth="20%"
                resources={
                data&&
                    data.map(course=>({
                            id: course.cosCode,
                            title: course.cosName,
                    }))
                }
                events={
                    data&&
                    data.map(course=>({
                        resourceId: course.cosCode,
                        title: course.cosName,
                        start: course.cosSdt,
                        end: course.cosEdt,
                        backgroundColor: course.timeStatus === 'MORNING' ? 'green' : course.timeStatus === 'AFTERNOON' ? '#ffa500' : '#3788d8',
                        borderColor: course.timeStatus === 'MORNING' ? 'green' : course.timeStatus === 'AFTERNOON' ? '#ffa500' : '#3788d8'
                    }))

                }

                eventBorderColor='#e2e2e4'




            />
            </div>
        </>
    );
}

export default AcademyCalendar;