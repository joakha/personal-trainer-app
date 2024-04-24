import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Stack, Snackbar, Button } from "@mui/material";

const CustomerList = () => {

    const [loading, setLoading] = useState();
    const [customers, setCustomers] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");
    const [colDefs, setColDefs] = useState([
        { field: "firstname", filter: true, floatingFilter: true },
        { field: "lastname", filter: true, floatingFilter: true },
        { headerName: "Street Address", field: "streetaddress", filter: true, floatingFilter: true },
        { headerName: "Postal Code", field: "postcode", filter: true, floatingFilter: true },
        { field: "city", filter: true, floatingFilter: true },
        { field: "email", filter: true, floatingFilter: true },
        { field: "phone", filter: true, floatingFilter: true },
        {
            cellRenderer: params => <Button size="small" color="error"
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

            {loading ? <p>Loading customers...</p> :

                <>
                    <h1>Customers</h1>

                    <div className="ag-theme-material" style={{ width: 1620, height: 1000 }}>
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