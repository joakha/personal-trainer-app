import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Stack } from '@mui/material';
import _ from 'lodash';

const TrainingsChart = () => {

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const colors = [
        '#FF0000',
        '#008000',
        '#0000FF',
        '#800000',
        '#808000',
        '#000080',
        '#000000',
        '#800080',
        '#808080',
        '#FF00FF'
    ];

    const displayChartData = async () => {
        try {
            const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings");
            const trainingsData = await response.json();
            formatTrainingsData(trainingsData._embedded.trainings);
        }
        catch (error) {
            console.error(error);
        }
    }

    const formatTrainingsData = (trainingsdata) => {

        const chartActivities = [];
        const trainingsGroupedByName = _.groupBy(trainingsdata, (training) => training.activity);

        //tässä käsitellään groupBy -funktion tulos oikeaan muotoon forEach -silmukkaa varten
        const groupedTrainingsArrays = Object.values(trainingsGroupedByName);

        groupedTrainingsArrays.forEach((arrayObjects) => {

            const activityDurationSum = _.sumBy(arrayObjects, 'duration');
            chartActivities.push(

                {
                    activity: arrayObjects[0].activity,
                    duration: activityDurationSum
                }
            )
        })

        setChartData(chartActivities);
        setLoading(false);
    }

    useEffect(() => {

        displayChartData();

    }, [])

    return (
        <Stack justifyContent="center" alignItems="center">
            <h1>Chart</h1>
            {
                loading ? <p>Loading chart...</p> :
                    <>
                        <h2 style={{ color: "gray" }}>Total duration of each training type represented in minutes</h2>

                        <BarChart width={1500} height={500} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5, }}>

                            <XAxis dataKey="activity" />
                            <YAxis label={{ value: 'total duration in minutes', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />

                            <Bar dataKey="duration" label={{ position: 'top' }}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 10]} />
                                ))}
                            </Bar>

                        </BarChart>
                    </>
            }
        </Stack>
    )
}

export default TrainingsChart