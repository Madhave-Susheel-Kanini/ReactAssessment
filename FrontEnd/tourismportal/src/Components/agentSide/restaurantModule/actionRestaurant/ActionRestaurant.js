import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ActionRestaurant() {

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

    const [restaurants, setRestaurants] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedRestaurant, setEditedRestaurant] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7036/api/Restaurant');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const handleMenuClick = (event, restaurant) => {
        setAnchorEl(event.currentTarget);
        setSelectedRestaurant(restaurant);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRestaurant(null);
    };

    const handleEdit = () => {
        setAnchorEl(null); // Close the menu
        setEditedRestaurant(selectedRestaurant);
        setOpenDialog(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file); // Update the selected image
        console.log(file); // Add this line to check the selected file in the console
    };

    const handleSave = () => {

        if (
            !editedRestaurant.restaurantName ||
            !editedRestaurant.restaurantLocation ||
            !editedRestaurant.restaurantSubLocation ||
            !editedRestaurant.restaurantPincode ||
            !editedRestaurant.restaurantContact ||
            !editedRestaurant.place.placeId 
        ) {
            showSnackbar('Please fill all the required fields and upload an image.', 'error');
            return;
        }
        // Create a new object to hold the updated restaurant
        const updatedRestaurant = { ...editedRestaurant };

        // Update the properties with the form data
        updatedRestaurant.restaurantName = editedRestaurant.restaurantName;
        updatedRestaurant.restaurantLocation = editedRestaurant.restaurantLocation;
        updatedRestaurant.restaurantSubLocation = editedRestaurant.restaurantSubLocation;
        updatedRestaurant.restaurantPincode = editedRestaurant.restaurantPincode;
        updatedRestaurant.restaurantContact = editedRestaurant.restaurantContact;
        updatedRestaurant.place.placeId = editedRestaurant.place.placeId;

        if (selectedImage) {
            updatedRestaurant.imageFile = selectedImage;
        }

        axios
            .put(`https://localhost:7036/api/Restaurant/${editedRestaurant.restaurantId}`, updatedRestaurant, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                console.log('Restaurant updated successfully:', response.data);
                setOpenDialog(false); // Close the dialog after successful update
                showSnackbar('Form data Updated successfully!', 'success');
                fetchData(); // Fetch updated data after successful update
            })
            .catch((error) => {
                console.error('Error updating restaurant:', error);
                showSnackbar('Error submitting form data. Please try again.', 'error');
                // Handle error if needed
            });
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {
        if (!selectedRestaurant) {
            return;
        }
    
        // Send a DELETE request to the server to delete the selected restaurant
        axios
            .delete(`https://localhost:7036/api/Restaurant/${selectedRestaurant.restaurantId}`)
            .then((response) => {
                console.log('Restaurant deleted successfully:', response.data);
                showSnackbar('Form data Deleted successfully!', 'success');
                // After successful deletion, fetch the updated data again
                fetchData();
                handleMenuClose();
            })
            .catch((error) => {
                console.error('Error deleting restaurant:', error);
                showSnackbar('Error Deleting form data. Please try again.', 'error');
                // Handle error if needed
                handleMenuClose();
            });
    };

    return (
        <Box>
            <Box sx={{ backgroundColor: '#F0F4F7', p: 3 }}>
                <Grid container spacing={2}>
                    {restaurants.map((restaurant) => (
                        <Grid item xs={12} md={6} key={restaurant.restaurantId}>
                            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        {restaurant.restaurantName}
                                    </Typography>
                                    <Typography>
                                        {restaurant.restaurantLocation} {restaurant.restaurantSubLocation}
                                    </Typography>
                                </Box>
                                <IconButton onClick={(e) => handleMenuClick(e, restaurant)}>
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
                <DialogTitle>Edit Restaurant</DialogTitle>
                <DialogContent>
                    {editedRestaurant && (
                        <Box>
                            <TextField
                                label="Restaurant Name"
                                value={editedRestaurant.restaurantName}
                                onChange={(e) => setEditedRestaurant({ ...editedRestaurant, restaurantName: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Restaurant Location"
                                value={editedRestaurant.restaurantLocation}
                                onChange={(e) => setEditedRestaurant({ ...editedRestaurant, restaurantLocation: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Restaurant SubLocation"
                                value={editedRestaurant.restaurantSubLocation}
                                onChange={(e) => setEditedRestaurant({ ...editedRestaurant, restaurantSubLocation: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Restaurant Pincode"
                                value={editedRestaurant.restaurantPincode}
                                onChange={(e) => setEditedRestaurant({ ...editedRestaurant, restaurantPincode: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Restaurant Contact"
                                value={editedRestaurant.restaurantContact}
                                onChange={(e) => setEditedRestaurant({ ...editedRestaurant, restaurantContact: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Place ID"
                                value={editedRestaurant.place.placeId}
                                onChange={(e) => setEditedRestaurant({ ...editedRestaurant, place: { ...editedRestaurant.place, placeId: e.target.value } })}
                                fullWidth
                                margin="normal"
                            />
                            {/* Image input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="restaurantImage-input"
                            />
                            <label htmlFor="restaurantImage-input">
                                <Button variant="contained" component="span" name="restaurantImage">
                                    Upload Restaurant Image
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

export default ActionRestaurant;
