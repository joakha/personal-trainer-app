import { useState } from "react"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

const AddTraining = ({ addTraining }) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [training, setTraining] = useState({
        date: null,
        duration: "",
        activity: "",
        customer: ""
    })

    const handleOpen = async () => {
        setOpen(true);

        try {
            setLoading(true);
            const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers");
            const customersData = await response.json();
            setCustomers(customersData._embedded.customers);
            setLoading(false)
        }

        catch (error) {
            console.error(error);
        }
    }

    const handleDate = (value) => {
        setTraining({ ...training, date: value });
    }

    const handleFieldChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleSelect = (event) => {
        setTraining({ ...training, customer: event.target.value });
    }

    const handleSave = () => {
        addTraining(training);
        setOpen(false);
        setTraining(
            {
                date: null,
                duration: "",
                activity: "",
                customer: ""
            }
        );
    }

    const handleCancel = () => {
        setOpen(false);
        setTraining(
            {
                date: null,
                duration: "",
                activity: "",
                customer: ""
            }
        );
    }

    return (

        <>
            <Button variant="contained" style={{ marginTop: "5px", marginBottom: "20px", backgroundColor: "rgb(0, 204, 153)" }} onClick={handleOpen}>Add a Training</Button>
            {
                loading ? <p>Loading training form...</p> :

                    <Dialog open={open}>
                        <DialogTitle>Add a new Training</DialogTitle>
                        <DialogContent>
                            <DateTimePicker
                                value={training.date}
                                onChange={handleDate}
                                format="DD/MM/YYYY HH:mm"
                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                ampm={false}
                                label="Date and Time"
                                sx={{ marginTop: 1 }}
                            />

                            <TextField
                                label="Duration in minutes"
                                name="duration"
                                value={training.duration}
                                margin="dense"
                                onChange={handleFieldChange}
                                variant="standard"
                                fullWidth>
                            </TextField>

                            <TextField
                                label="Activity"
                                name="activity"
                                value={training.activity}
                                margin="dense"
                                onChange={handleFieldChange}
                                variant="standard"
                                fullWidth>
                            </TextField>

                            <Select
                                value={training.customer}
                                sx={{marginTop: 3}}
                                onChange={handleSelect}
                                displayEmpty
                            >

                                <MenuItem value="" disabled>Select a customer</MenuItem>
                                {customers.map((customer, index) => {

                                    return <MenuItem key={index} value={customer._links.self.href}>{`${customer.firstname} ${customer.lastname}`}</MenuItem>

                                })}

                            </Select>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleSave}>Save</Button>
                        </DialogActions>
                    </Dialog>
            }
        </>

    )

}

export default AddTraining