import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Stack } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const TrainingsList = () => {

    const [loading, setLoading] = useState([true]);
    const [trainings, setTrainings] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: "date", filter: true, floatingFilter: true, valueFormatter: params => new Date(params.value).toLocaleDateString("fi-FI") },
        { field: "duration", filter: true, floatingFilter: true, valueGetter: params => params.data.duration + " minutes" },
        { field: "activity", filter: true, floatingFilter: true },
        { headerName: "Customer Firstname", field: "customer.firstname", filter: true, floatingFilter: true },
        { headerName: "Customer Lastname", field: "customer.lastname", filter: true, floatingFilter: true },
    ]
    );

    const getTrainings = async () => {

        try {
            const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings");
            const trainingsData = await response.json();
            setTrainings(trainingsData);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {

        getTrainings();

    }, [])

    return (

        <Stack justifyContent="center" alignItems="center">

            {loading ? <p>Loading trainings...</p> :

                <>
                    <h1>Trainings</h1>

                    <div className="ag-theme-material" style={{ width: 1620, height: 1000 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <AgGridReact rowData={trainings} columnDefs={colDefs} pagination={true} paginationPageSize={20} />
                        </LocalizationProvider>
                    </div>
                </>

            }

        </Stack>

    )

}

export default TrainingsList