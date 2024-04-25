import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Stack, Snackbar, Button } from "@mui/material";
import AddCustomer from "./AddCustomer.jsx";
import EditCustomer from "./EditCustomer.jsx";

const CustomerList = () => {

    const [loading, setLoading] = useState();
    const [customers, setCustomers] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");
    const [colDefs, setColDefs] = useState([
        { headerName: "First Name", field: "firstname", filter: true, floatingFilter: true },
        { headerName: "Last Name", field: "lastname", filter: true, floatingFilter: true },
        { headerName: "Street Address", field: "streetaddress", filter: true, floatingFilter: true },
        { headerName: "Postal Code", field: "postcode", filter: true, floatingFilter: true },
        { field: "city", filter: true, floatingFilter: true },
        { field: "email", filter: true, floatingFilter: true },
        { field: "phone", filter: true, floatingFilter: true },
        {
            width: "100", cellRenderer: params => <EditCustomer editCustomer={editCustomer} params={params} />
        },
        {
            width: "125", cellRenderer: params => <Button size="small" sx={{padding: "6px", marginBottom: "5px"}} variant="contained" color="error"
                onClick={() => deleteCustomer(params)}>Delete</Button>
        }
    ]
    );

    const getCustomers = async () => {

        try {
            setLoading(true);
            const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers");
            const customersData = await response.json();
            setCustomers(customersData._embedded.customers);
            setLoading(false);
        }

        catch (error) {
            console.error(error);
        }
    }

    const addCustomer = async (customer) => {

        try {
            const response = await fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers",
                { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(customer) });

            if (response.ok) {
                setMsgSnackbar("Added new customer");
                setOpenSnackbar(true);
                getCustomers();
            }

            else {
                setMsgSnackbar("Failed to add customer");
                setOpenSnackbar(true);
            }

        }

        catch (error) {
            console.error(error);
        }

    }

    const editCustomer = async (url, customer) => {

        try {
            const response = await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(customer) });

            if (response.ok) {
                setMsgSnackbar("Customer edited successfully");
                setOpenSnackbar(true);
                getCustomers();
            }

            else {
                setMsgSnackbar("Error editing customer");
                setOpenSnackbar(true);
            }

        }

        catch (error) {
            console.error(error);
        }

    }

    const deleteCustomer = async (params) => {

        if (confirm("Are you sure you want to delete this customer?")) {

            try {
                const response = await fetch(params.data._links.self.href, { method: "DELETE" });

                if (response.ok) {
                    setMsgSnackbar("Customer deleted successfully");
                    setOpenSnackbar(true);
                    getCustomers();
                }

                else {
                    setMsgSnackbar("Unable to delete customer!")
                    setOpenSnackbar(true);
                }
            }

            catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {

        getCustomers();

    }, [])

    return (

        <Stack justifyContent="center" alignItems="center">

            <h1>Customers</h1>

            {
                loading ? <p>Loading customers...</p> :
                    <>
                        <AddCustomer addCustomer={addCustomer} />

                        <div className="ag-theme-material" style={{ width: 1645, height: 1000 }}>
                            <AgGridReact rowData={customers} columnDefs={colDefs} pagination={true} paginationPageSize={20} />
                        </div>
                        <Snackbar open={openSnackbar} message={msgSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                        </Snackbar>
                    </>
            }

        </Stack>

    )

}

export default CustomerList