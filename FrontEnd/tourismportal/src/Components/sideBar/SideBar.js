import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from './logo.png'
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import { AddCircle, Hotel, Restaurant, Settings } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LocalAirportOutlinedIcon from '@mui/icons-material/LocalAirportOutlined';
import ModeOfTravelOutlinedIcon from '@mui/icons-material/ModeOfTravelOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';


function SideBar() {

    const [role, setRole] = useState("")
    const navigate = useNavigate();
    const [shouldReload, setShouldReload] = useState(false);

    useEffect(() => {
        console.log("hi");
        const rolehere = localStorage.getItem("role");
        setRole(rolehere)
        const token = localStorage.getItem('token');
        const url = window.location.href;
        console.log(url);
        const pathname = new URL(url).pathname;
        console.log(pathname)
        console.log(role)
        const approval = localStorage.getItem('AgentStatus');

        if (approval === "Declined") {
            navigate('/not-approved');
        }
           
        if (pathname === "/admin") {
          if (!token) {
            navigate('/admin');
          }
        }
        else if (pathname === "/admin-signup") {
            if (!token) {
              navigate('/admin-signup');
            }
        }
        else if (pathname === "/agent-signup") {
            if (!token) {
              navigate('/agent-signup');
            }
        }
        else if (pathname === "/agent") {
            if (!token) {
              navigate('/agent');
            }
        }
        else {
            if (!token) {
              navigate('/agent');
            }
        }
      }, [navigate]);

    return (
        <Sidebar className="sidebar" style={{ width: '280px' }}>
            <Box sx={{ margin: '5%', display: 'flex', justifyContent: 'center' }}>
                <img src={logo} style={{ width: '80%' }} />
            </Box>
            <Box sx={{ marginLeft: '5%', maxHeight: '80vh', overflowY: 'auto' }}>
                <Box sx={{}}>
                    <Typography sx={{ color: '#9da5b1' }}>GENERAL</Typography>
                </Box>


                {role === "admin" ?
                    (<>
                        <Menu
                            menuItemStyles={{
                                button: ({ level, active, disabled }) => {
                                    if (level === 0) {
                                        return {
                                            color: disabled ? "#9da5b1" : "#9da5b1",
                                            backgroundColor: active ? "#335B8C" : "#323a49",
                                            fontSize: '18px',
                                            "&:hover": {
                                                backgroundColor: "hsl(218.18deg 15.49% 27.84% / 96%) !important",
                                                color: "white !important",
                                                borderRadius: "8px !important"
                                            },
                                        };
                                    } else if (level === 1 || level === 2) {
                                        return {
                                            color: disabled ? "#9da5b1" : "#9da5b1",
                                            backgroundColor: active ? "#335B8C" : "#323a49",
                                            "&:hover": {
                                                backgroundColor: "hsl(218.18deg 15.49% 27.84% / 96%) !important",
                                                color: "white !important",
                                                borderRadius: "0 !important"
                                            },
                                        };
                                    }
                                },
                            }}
                        >
                            <Box sx={{}}>
                                <Typography sx={{ color: '#9da5b1' }}>Agent Actions</Typography>
                            </Box>
                            <MenuItem>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LogoutOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                    <Link to="/action-agent" className="menu-link">
                                        Approve Agents
                                    </Link>
                                </Box>
                            </MenuItem>
                            <SubMenu label="Manage Portfolio" icon={<ModeOfTravelOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />}>
                                <MenuItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Hotel fontSize="small" style={{ marginRight: '8px' }} />
                                        <Link to="/action-gallery" className="menu-link">
                                            Add New Portfolio
                                        </Link>
                                    </Box>
                                </MenuItem>
                                <MenuItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Hotel fontSize="small" style={{ marginRight: '8px' }} />
                                        <Link to="/gallery" className="menu-link">
                                            View Portfolio
                                        </Link>
                                    </Box>
                                </MenuItem>
                                <MenuItem>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LogoutOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                    <Link to="/feedback-view" className="menu-link">
                                        FeedBacks
                                    </Link>
                                </Box>
                            </MenuItem>
                            </SubMenu>
                            <Box sx={{}}>
                                <Typography sx={{ color: '#9da5b1' }}>SETTINGS</Typography>
                            </Box>
                            <MenuItem>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LogoutOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                    <Link to="/logout-admin" className="menu-link">
                                        Logout
                                    </Link>
                                </Box>
                            </MenuItem>
                        </Menu>
                    </>
                    ) : (
                        <>
                            <Menu
                                menuItemStyles={{
                                    button: ({ level, active, disabled }) => {
                                        if (level === 0) {
                                            return {
                                                color: disabled ? "#9da5b1" : "#9da5b1",
                                                backgroundColor: active ? "#335B8C" : "#323a49",
                                                fontSize: '18px',
                                                "&:hover": {
                                                    backgroundColor: "hsl(218.18deg 15.49% 27.84% / 96%) !important",
                                                    color: "white !important",
                                                    borderRadius: "8px !important"
                                                },
                                            };
                                        } else if (level === 1 || level === 2) {
                                            return {
                                                color: disabled ? "#9da5b1" : "#9da5b1",
                                                backgroundColor: active ? "#335B8C" : "#323a49",
                                                "&:hover": {
                                                    backgroundColor: "hsl(218.18deg 15.49% 27.84% / 96%) !important",
                                                    color: "white !important",
                                                    borderRadius: "0 !important"
                                                },
                                            };
                                        }
                                    },
                                }}
                            >

                                <SubMenu label="Manage Tourism" icon={<LocalAirportOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />}>
                                    <MenuItem>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AddCircle fontSize="small" style={{ marginRight: '8px' }} />
                                            <Link to="/add-tourism" className="menu-link">
                                                Add New Tourism
                                            </Link>
                                        </Box>
                                    </MenuItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MenuItem>
                                            <EditOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                            <Link to="/action-tourism" className="menu-link">
                                                Tourism/Action
                                            </Link>
                                        </MenuItem>
                                    </Box>
                                </SubMenu>
                                <SubMenu label="Manage Hotels" icon={<ModeOfTravelOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />}>
                                    <MenuItem>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Hotel fontSize="small" style={{ marginRight: '8px' }} />
                                            <Link to="/add-hotel" className="menu-link">
                                                Add New Hotels
                                            </Link>
                                        </Box>
                                    </MenuItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MenuItem>
                                            <EditOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                            <Link to="/action-hotel" className="menu-link">
                                                Hotels/Action
                                            </Link>
                                        </MenuItem>
                                    </Box>
                                </SubMenu>
                                <SubMenu label="Manage Restaurants" icon={<FastfoodOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />}>
                                    <MenuItem>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Restaurant fontSize="small" style={{ marginRight: '8px' }} />
                                            <Link to="/add-restaurant" className="menu-link">
                                                Add New Restaurant
                                            </Link>
                                        </Box>
                                    </MenuItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MenuItem>
                                            <EditOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                            <Link to="/action-restaurant" className="menu-link">
                                                Restaurants/Action
                                            </Link>
                                        </MenuItem>
                                    </Box>
                                </SubMenu>

                            </Menu>
                            <Box sx={{ marginTop: '12%' }}>
                                <Typography sx={{ color: '#9da5b1' }}>SETTINGS</Typography>
                            </Box>
                            <Menu
                                menuItemStyles={{
                                    button: ({ level, active, disabled }) => {
                                        if (level === 0) {
                                            return {
                                                color: disabled ? "#9da5b1" : "#9da5b1",
                                                backgroundColor: active ? "#335B8C" : "#323a49",
                                                "&:hover": {
                                                    backgroundColor: "hsl(218.18deg 15.49% 27.84% / 96%) !important",
                                                    color: "white !important",
                                                    borderRadius: "8px !important",
                                                },
                                            };
                                        } else if (level === 1 || level === 2) {
                                            return {
                                                color: disabled ? "#9da5b1" : "#9da5b1",
                                                backgroundColor: active ? "#335B8C" : "#323a49",
                                                "&:hover": {
                                                    backgroundColor: "hsl(218.18deg 15.49% 27.84% / 96%) !important",
                                                    color: "white !important",
                                                    borderRadius: "0 !important",
                                                },
                                            };
                                        }
                                    },
                                }}
                            >
                                <MenuItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Person2OutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                        View Profile
                                    </Box>
                                </MenuItem>
                                <SubMenu label="Security" icon={<Settings fontSize="small" style={{ marginRight: '8px' }} />}>
                                    <SubMenu label="Password Manager" icon={<ManageAccountsOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />}>
                                        <MenuItem>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Settings fontSize="small" style={{ marginRight: '8px' }} /> Change Password
                                            </Box>
                                        </MenuItem>
                                    </SubMenu>
                                </SubMenu>
                            </Menu>
                            <Box sx={{ marginTop: '12%' }}>
                                <Typography sx={{ color: 'grey' }}>PROFILE ACTIONS</Typography>
                            </Box>
                            <Menu
                                menuItemStyles={{
                                    button: ({ level, active, disabled }) => {
                                        if (level === 0) {
                                            return {
                                                color: disabled ? "#9da5b1" : "#9da5b1",
                                                backgroundColor: active ? "#335B8C" : "#323a49",
                                                "&:hover": {
                                                    backgroundColor: "hsl(218.18deg 15.49% 27.84% / 96%) !important",
                                                    color: "white !important",
                                                    borderRadius: "8px !important",
                                                },
                                            };
                                        } else if (level === 1 || level === 2) {
                                            return {
                                                color: disabled ? "#9da5b1" : "#9da5b1",
                                                backgroundColor: active ? "#335B8C" : "#323a49",
                                                "&:hover": {
                                                    backgroundColor: "hsl(218.18deg 15.49% 27.84% / 96%) !important",
                                                    color: "white !important",
                                                    borderRadius: "0 !important",
                                                },
                                            };
                                        }
                                    },
                                }}
                            >
                                <MenuItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LogoutOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                                        <Link to="/logout-agent" className="menu-link">
                                            Logout
                                        </Link>
                                    </Box>
                                </MenuItem>
                            </Menu>
                        </>
                    )}



            </Box>
        </Sidebar >
    )
}

export default SideBar