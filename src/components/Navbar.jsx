import { Link } from "react-router-dom";
import { useState } from 'react';
import { Button, Menu, MenuItem, CssBaseline, Typography, Toolbar, AppBar } from '@mui/material';

const Navbar = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <CssBaseline />
            <AppBar sx={{ height: 100, backgroundColor: "rgb(0, 204, 153)" }} position="static">
                <Toolbar>

                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{ backgroundColor: "black", color: "white", marginTop: 3, fontSize: 20, '&:hover': { backgroundColor: "#404040" } }}
                    >
                        Menu
                    </Button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                            <MenuItem onClick={handleClose}>Customers</MenuItem>
                        </Link>

                        <Link to="/Trainings" style={{ textDecoration: 'none', color: "black" }}>
                            <MenuItem onClick={handleClose}>Trainings</MenuItem>
                        </Link>

                        <Link to="/Calendar" style={{ textDecoration: 'none', color: "black" }}>
                            <MenuItem onClick={handleClose}>Calendar</MenuItem>
                        </Link>

                    </Menu>

                    <Typography sx={{ marginLeft: 6, marginTop: 3 }} variant="h4">
                        Personal Trainer App
                    </Typography>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar