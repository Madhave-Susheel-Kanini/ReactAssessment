import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ActionTourism() {

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

    const [destinations, setDestinations] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedDestination, setEditedDestination] = useState(null);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        fetchData();
        const userid = localStorage.getItem("AgentId")
        setUserId(userid)
    }, []);

    const fetchData = async () => {
        try {
            const [response, userid] = await Promise.all([
                axios.get('https://localhost:7036/api/Places'),
                localStorage.getItem('AgentId')
            ]);
    
            const { data: places } = response;
            const placewithid = places.filter(destination => destination.agent.travelAgentId === parseInt(userid));
            console.log(`Total hotels with place.placeId === ${userid}: ${placewithid.length}`);
            setDestinations(placewithid);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);

    const handleMenuClick = (event, destination) => {
        setAnchorEl(event.currentTarget);
        setSelectedDestination(destination);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedDestination(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        setEditedDestination(selectedDestination);
        setOpenDialog(true);
    };

    const [selectedImage, setSelectedImage] = useState(null); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        console.log(file);
    };

    const handleSave = () => {
        
        if (
            !editedDestination.placeName ||
            !editedDestination.placeDescription ||
            !editedDestination.totalDays ||
            !editedDestination.dayCost ||
            !editedDestination.tourCost ||
            !editedDestination.maxDistance ||
            !editedDestination.route
        ) {
            showSnackbar('Please fill all the required fields and upload an image.', 'error');
            return;
        }
        // Create a new object to hold the updated destination
        const updatedDestination = { ...editedDestination };

        // Update the properties with the form data
        updatedDestination.placeName = editedDestination.placeName;
        updatedDestination.placeDescription = editedDestination.placeDescription;
        updatedDestination.totalDays = editedDestination.totalDays;
        updatedDestination.dayCost = editedDestination.dayCost;
        updatedDestination.tourCost = editedDestination.tourCost;
        updatedDestination.maxDistance = editedDestination.maxDistance;
        updatedDestination.latitude = editedDestination.latitude;
        updatedDestination.longitude = editedDestination.longitude;
        updatedDestination.route = editedDestination.route;
        updatedDestination.spots = editedDestination.spots;
        updatedDestination.agent.travelAgentId = editedDestination.agent.travelAgentId;

        if (selectedImage) {
            updatedDestination.imageFile = selectedImage;
        }

        axios
            .put(`https://localhost:7036/api/Places/${editedDestination.placeId}`, updatedDestination, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                console.log('Destination updated successfully:', response.data);
                showSnackbar('Form data Updated successfully!', 'success');
                setOpenDialog(false);
            })
            .catch((error) => {
                console.error('Error updating destination:', error);
                showSnackbar('Error updating destination', 'error');
            });
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {
        if (!selectedDestination) {
            return;
        }
    
        // Send a DELETE request to the server to delete the selected destination
        axios
            .delete(`https://localhost:7036/api/Places/${selectedDestination.placeId}`)
            .then((response) => {
                console.log('Destination deleted successfully:', response.data);
                showSnackbar('Form data Deleted successfully!', 'success');
                fetchData();
                handleMenuClose();
            })
            .catch((error) => {
                console.error('Error deleting destination:', error);
                showSnackbar('Form data Deletion Unsuccessful!', 'error');
                handleMenuClose();
            });
    };

    return (
        <Box>
            <Box sx={{ backgroundColor: '#F0F4F7', p: 3 }}>
                <Grid container spacing={2}>
                    {destinations.map((destination) => (
                        <Grid item xs={12} md={6} key={destination.placeName}>
                            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        {destination.placeName}
                                    </Typography>
                                    <Typography>
                                        {destination.placeDescription}
                                    </Typography>
                                </Box>
                                <IconButton onClick={(e) => handleMenuClick(e, destination)}>
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
                <DialogTitle>Edit Destination</DialogTitle>
                <DialogContent>
                    {editedDestination && (
                        <Box>
                            <TextField
                                label="Tourism Name"
                                value={editedDestination.placeName}
                                onChange={(e) => setEditedDestination({ ...editedDestination, placeName: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Tourism Description"
                                value={editedDestination.placeDescription}
                                onChange={(e) => setEditedDestination({ ...editedDestination, placeDescription: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Total Days"
                                value={editedDestination.totalDays}
                                onChange={(e) => setEditedDestination({ ...editedDestination, totalDays: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Day Cost"
                                value={editedDestination.dayCost}
                                onChange={(e) => setEditedDestination({ ...editedDestination, dayCost: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Tour Cost"
                                value={editedDestination.tourCost}
                                onChange={(e) => setEditedDestination({ ...editedDestination, tourCost: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Max Distance"
                                value={editedDestination.maxDistance}
                                onChange={(e) => setEditedDestination({ ...editedDestination, maxDistance: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Latitude"
                                value={editedDestination.latitude}
                                onChange={(e) => setEditedDestination({ ...editedDestination, latitude: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Longitude"
                                value={editedDestination.longitude}
                                onChange={(e) => setEditedDestination({ ...editedDestination, longitude: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Route"
                                value={editedDestination.route}
                                onChange={(e) => setEditedDestination({ ...editedDestination, route: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Spots"
                                value={editedDestination.spots}
                                onChange={(e) => setEditedDestination({ ...editedDestination, spots: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Travel Agent ID"
                                disabled
                                value={editedDestination.agent?.travelAgentId ?? 0}
                                onChange={(e) => setEditedDestination({ ...editedDestination, agent: { ...editedDestination.agent, travelAgentId: e.target.value } })}
                                fullWidth
                                margin="normal"
                            />
                            {/* Image input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setEditedDestination({ ...editedDestination, imageFile: e.target.files[0] })}
                                style={{ display: 'none' }}
                                id="image-input"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="image-input"
                            />
                            <label htmlFor="image-input">
                                <Button variant="contained" component="span">
                                    Upload Image
                                </Button>
                            </label>
                            {selectedImage && <span>{selectedImage.name}</span>}
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

export default ActionTourism;
