import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import fi from 'date-fns/locale/fi'
import { apiURL } from '../constants/constants'

const TrainingsCalendar = () => {

    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState();
    const locales = {
        'fi': fi,
    }
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

    const displayEvents = async () => {
        try {
            const response = await fetch(apiURL + "gettrainings");
            const trainingsData = await response.json();
            getEvents(trainingsData);
        }
        catch (error) {
            console.error(error);
        }
    }

    const getEvents = (trainings) => {

        const calendarEvents = [];

        trainings.forEach((training) => {

            const trainingStartDate = new Date(training.date);
            trainingStartDate.setMinutes(trainingStartDate.getMinutes() + training.duration);
            const trainingEndDateIsoString = trainingStartDate.toISOString();

            if (training.customer !== null) {
                calendarEvents.push(
                    {
                        title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                        start: new Date(training.date),
                        end: new Date(trainingEndDateIsoString)
                    }
                )
            }

        })

        setEvents(calendarEvents);
        setLoading(false);
    }

    useEffect(() => {

        displayEvents();

    }, [])

    return (
        <Stack justifyContent="center" alignItems="center">
            <h1>Calendar</h1>
            {
                loading ? <p>Loading Calendar...</p> :
                    <>
                        <Calendar localizer={localizer} events={events} style={{ marginTop: 25, height: 900, width: 1500 }} />
                    </>
            }
        </Stack >
    )
}

export default TrainingsCalendar