import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Button, Menu, MenuItem, CssBaseline, Typography, Toolbar, AppBar } from '@mui/material';

function App() {

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

            <MenuItem onClick={handleClose}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                Customers
              </Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Link to="/TrainingsList" style={{ textDecoration: 'none' }}>
                Trainings
              </Link>
            </MenuItem>

          </Menu>

          <Typography sx={{ marginLeft: 6, marginTop: 3 }} variant="h4">
            Personal Trainer App
          </Typography>

        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  )
}

export default App
