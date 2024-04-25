import { useState } from "react"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const EditCustomer = ({editCustomer, params}) => {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: params.data.firstname,
        lastname: params.data.lastname,
        streetaddress: params.data.streetaddress,
        postcode: params.data.postcode,
        city: params.data.city,
        email: params.data.email,
        phone: params.data.phone
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleTextFieldChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        editCustomer(params.data._links.self.href, customer);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
        setCustomer(
            {
                firstname: params.data.firstname,
                lastname: params.data.lastname,
                streetaddress: params.data.streetaddress,
                postcode: params.data.postcode,
                city: params.data.city,
                email: params.data.email,
                phone: params.data.phone
            }
        );
    }

    return (

        <>

            <Button variant="contained" style={{ marginTop: "5px", marginBottom: "50px"}} onClick={handleOpen}>Edit</Button>

            <Dialog open={open}>
                <DialogTitle>Edit Customer Information</DialogTitle>

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

export default EditCustomer