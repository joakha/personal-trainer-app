import { useState } from "react"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const AddCustomer = ({addCustomer}) => {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleTextFieldChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        addCustomer(customer);
        setOpen(false);
        setCustomer(
            {
                firstname: "",
                lastname: "",
                streetaddress: "",
                postcode: "",
                city: "",
                email: "",
                phone: ""
            }
        );
    }

    const handleCancel = () => {
        setOpen(false);
        setCustomer(
            {
                firstname: "",
                lastname: "",
                streetaddress: "",
                postcode: "",
                city: "",
                email: "",
                phone: ""
            }
        );
    }

    return (

        <>

            <Button variant="contained" style={{ marginTop: "5px", marginBottom: "50px", backgroundColor: "rgb(0, 204, 153)" }} onClick={handleOpen}>Add a Customer</Button>

            <Dialog open={open}>
                <DialogTitle>Add a new Customer</DialogTitle>

                <DialogContent>
                    <TextField
                        label="First Name"
                        name="firstname"
                        value={customer.firstname}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>

                    <TextField
                        label="Last Name"
                        name="lastname"
                        value={customer.lastname}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>

                    <TextField
                        label="Street Address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>

                    <TextField
                        label="Postal Code"
                        value={customer.postcode}
                        name="postcode"
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>

                    <TextField
                        label="City"
                        name="city"
                        value={customer.city}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>

                    <TextField
                        label="Email"
                        name="email"
                        value={customer.email}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>

                    <TextField
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </>

    )

}

export default AddCustomer