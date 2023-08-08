import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, ButtonGroup } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ActionAgent() {

    const [agents, setagents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedagent, setEditedagent] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    useEffect(() => {
        fetchagentData();
    }, []);

    const fetchagentData = async () => {
        try {
            const response = await axios.get('https://localhost:7036/api/Agents');
            setagents(response.data);
            console.log(agents)
        } catch (error) {
            console.error('Error fetching agent data:', error);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedagent, setSelectedagent] = useState(null);

    const handleMenuClick = (event, agent) => {
        setAnchorEl(event.currentTarget);
        setSelectedagent(agent);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedagent(null);
    };

    const handleEdit = () => {
        setAnchorEl(null); // Close the menu
        setEditedagent(selectedagent);
        setOpenDialog(true);
    };

    const handleSave = () => {
        // Create a new object to hold the updated agent data
        const updatedAgent = {
            travelAgentId: editedagent.travelAgentId,
            travelAgentName: editedagent.travelAgentName,
            travelAgentPassword: editedagent.travelAgentPassword,
            travelAgentEmail: editedagent.travelAgentEmail,
            travelAgentPhone: editedagent.travelAgentPhone,
            travelAgentLocation: editedagent.travelAgentLocation,
            travelAgentGst: editedagent.travelAgentGst,
            travelAgentPan: editedagent.travelAgentPan,
            travelAgentStatus: editedagent.travelAgentStatus,
        };

        axios
            .put(`https://localhost:7036/api/Agents/${editedagent.travelAgentId}`, updatedAgent, {
                headers: { 'Content-Type': 'application/json' }, // Set the correct Content-Type header
            })
            .then((response) => {
                console.log('Agent updated successfully:', response.data);
                setOpenDialog(false); // Close the dialog after successful update
                fetchagentData(); // Fetch updated data after saving
                showSnackbar('Agent updated successfully!', 'success');
            })
            .catch((error) => {
                console.error('Error updating agent:', error);
                showSnackbar('Agent updation unsuccessful', 'error');
                // Handle error if needed
            });
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {
        if (!selectedagent) {
            return;
        }

        // Send a DELETE request to the server to delete the selected agent
        axios
            .delete(`https://localhost:7036/api/agents/${selectedagent.travelAgentId}`)
            .then((response) => {
                console.log('agent deleted successfully:', response.data);
                showSnackbar('Agent Deleted successfully!', 'success');
                // After successful deletion, fetch the updated data again
                fetchagentData();
                handleMenuClose();
            })
            .catch((error) => {
                console.error('Error deleting agent:', error);
                showSnackbar('Error deleting agent', 'error');
                // Handle error if needed
                handleMenuClose();
            });
    };

    const handleStatusChange = (newStatus) => {
        setEditedagent({ ...editedagent, travelAgentStatus: newStatus });
    };

    return (
        <Box>
            <Box sx={{ backgroundColor: '#F0F4F7', p: 3 }}>
                <Grid container spacing={2}>
                    {agents.map((agent) => (
                        <Grid item xs={12} md={6} key={agent.traveltravelAgentName}>
                            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        {agent.traveltravelAgentName}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        {agent.travelAgentPan}
                                    </Typography>
                                    <Typography>
                                        {agent.travelAgentEmail}
                                    </Typography>
                                    <Typography>
                                        {agent.travelAgentGst}
                                    </Typography>
                                    <Typography>
                                        Status : {agent.travelAgentStatus}
                                    </Typography>
                                </Box>
                                <IconButton onClick={(e) => handleMenuClick(e, agent)}>
                                    <MoreVertIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            <Dialog open={openDialog} onClose={handleCancel}>
                <DialogTitle>Edit agent</DialogTitle>
                <DialogContent>
                    {editedagent && (
                        <Box>
                            <TextField
                                label="Agent Name"
                                value={editedagent.travelAgentName}
                                onChange={(e) => setEditedagent({ ...editedagent, travelAgentName: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                            <TextField
                                label="Agent Location"
                                value={editedagent.travelAgentLocation}
                                onChange={(e) => setEditedagent({ ...editedagent, travelAgentLocation: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                            <TextField
                                label="Agent Sub Location"
                                value={editedagent.travelAgentEmail}
                                onChange={(e) => setEditedagent({ ...editedagent, travelAgentEmail: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                            <TextField
                                label="Agent Pincode"
                                value={editedagent.travelAgentPhone}
                                onChange={(e) => setEditedagent({ ...editedagent, travelAgentPhone: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                            <TextField
                                label="Agent GST Number"
                                value={editedagent.travelAgentGst}
                                onChange={(e) => setEditedagent({ ...editedagent, travelAgentGst: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                            <TextField
                                label="Agent PAN Number"
                                value={editedagent.travelAgentPan}
                                onChange={(e) => setEditedagent({ ...editedagent, travelAgentPan: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                            <ButtonGroup fullWidth>
                                <Button
                                    variant={status === 'Approved' ? 'contained' : 'outlined'}
                                    color="primary"
                                    onClick={() => handleStatusChange('Approved')}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant={status === 'Declined' ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => handleStatusChange('Declined')}
                                >
                                    Decline
                                </Button>
                            </ButtonGroup>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}

export default ActionAgent;