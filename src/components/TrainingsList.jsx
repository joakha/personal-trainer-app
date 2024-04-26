import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Stack, Button, Snackbar } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AddTraining from './AddTraining.jsx'

const TrainingsList = () => {

    const [loading, setLoading] = useState();
    const [trainings, setTrainings] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");
    const [colDefs, setColDefs] = useState([
        { field: "date", filter: true, floatingFilter: true, valueFormatter: params => new Date(params.value).toLocaleDateString("fi-FI") },
        { field: "duration", filter: true, floatingFilter: true, valueGetter: params => params.data.duration + " minutes" },
        { field: "activity", filter: true, floatingFilter: true },
        { headerName: "Customer Firstname", field: "customer.firstname", filter: true, floatingFilter: true },
        { headerName: "Customer Lastname", field: "customer.lastname", filter: true, floatingFilter: true },
        {
            cellRenderer: params => <Button size="small" variant="contained" color="error"
                onClick={() => deleteTraining(params)}>Delete</Button>
        }
    ]
    );

    const getTrainings = async () => {

        try {
            setLoading(true);
            const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings");
            const trainingsData = await response.json();
            setTrainings(trainingsData);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    const addTraining = async (training) => {

        try {
            const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings",
                { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(training) });

            if (response.ok) {
                setMsgSnackbar("Added new training");
                setOpenSnackbar(true);
                getTrainings();
            }

            else {
                setMsgSnackbar("Failed to add training");
                setOpenSnackbar(true);
            }

        }

        catch (error) {
            console.error(error);
        }

    }

    const deleteTraining = async (params) => {

        if (confirm("Are you sure you want to delete this training?")) {

            try {
                const response = await fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${params.data.id}`, { method: "DELETE" });

                if (response.ok) {
                    setMsgSnackbar("Training deleted successfully");
                    setOpenSnackbar(true);
                    getTrainings();
                }

                else {
                    setMsgSnackbar("Unable to delete training!")
                    setOpenSnackbar(true);
                }
            }

            catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {

        getTrainings();

    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack justifyContent="center" alignItems="center">

                <h1>Trainings</h1>

                {
                    loading ? <p>Loading trainings...</p> :
                        <>
                            <AddTraining addTraining={addTraining} />

                            <div className="ag-theme-material" style={{ width: 1620, height: 1000 }}>

                                <AgGridReact rowData={trainings} columnDefs={colDefs} pagination={true} paginationPageSize={20} />

                            </div>
                            <Snackbar open={openSnackbar} message={msgSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                            </Snackbar>
                        </>
                }

            </Stack>
        </LocalizationProvider>
    )

}

export default TrainingsList