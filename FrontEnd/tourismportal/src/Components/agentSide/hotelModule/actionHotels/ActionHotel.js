import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ActionHotel() {

    const [hotels, setHotels] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedHotel, setEditedHotel] = useState({ place: {} });

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
        fetchHotelData();
    }, []);

    const fetchHotelData = async () => {

        try {
            const response = await axios.get('https://localhost:7036/api/Hotels');
            setHotels(response.data);
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const handleMenuClick = (event, hotel) => {
        setAnchorEl(event.currentTarget);
        setSelectedHotel(hotel);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedHotel(null);
    };

    const handleEdit = () => {
        setAnchorEl(null); // Close the menu
        setEditedHotel(selectedHotel);
        setOpenDialog(true);
    };

    const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file); // Update the selected image
        console.log(file); // Add this line to check the selected file in the console
    };

    const handleSave = () => {
        // Create a new object to hold the updated hotel

        if (
            !editedHotel.hotelName ||
            !editedHotel.hotelLocation ||
            !editedHotel.hotelSubLocation ||
            !editedHotel.hotelPincode ||
            !editedHotel.hotelContact ||
            !editedHotel.place.placeId ||
            !selectedImage
        ) {
            showSnackbar('Please fill all the required fields and upload an image.', 'error');
            return;
        }

        const updatedHotel = { ...editedHotel };

        // Update the properties with the form data
        updatedHotel.hotelName = editedHotel.hotelName;
        updatedHotel.hotelLocation = editedHotel.hotelLocation;
        updatedHotel.hotelSubLocation = editedHotel.hotelSubLocation;
        updatedHotel.hotelPincode = editedHotel.hotelPincode;
        updatedHotel.hotelContact = editedHotel.hotelContact;
        updatedHotel.place = { ...editedHotel.place, placeId: editedHotel.place.placeId };

        if (selectedImage) {
            updatedHotel.imageFile = selectedImage;
        }

        console.log(updatedHotel)

        axios
            .put(`https://localhost:7036/api/Hotels/${editedHotel.hotelId}`, updatedHotel, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                console.log('Hotel updated successfully:', response.data);
                setOpenDialog(false); // Close the dialog after successful update
                showSnackbar('Hotel updated successfully!', 'success');
            })
            .catch((error) => {
                console.error('Error updating hotel:', error);
                showSnackbar('Error updating hotel. Please try again.', 'error');
                // Handle error if needed
            });
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {
        if (!selectedHotel) {
            return;
        }

        // Send a DELETE request to the server to delete the selected hotel
        axios
            .delete(`https://localhost:7036/api/Hotels/${selectedHotel.hotelId}`)
            .then((response) => {
                console.log('Hotel deleted successfully:', response.data);
                showSnackbar('Hotel Deleted successfully!', 'success');
                // After successful deletion, fetch the updated data again
                fetchHotelData();
                handleMenuClose();
            })
            .catch((error) => {
                console.error('Error deleting hotel:', error);
                showSnackbar('Error deleting hotel', 'error');
                // Handle error if needed
                handleMenuClose();
            });
    };

    return (
        <Box>
            <Box sx={{ backgroundColor: '#F0F4F7', p: 3 }}>
                <Grid container spacing={2}>
                    {hotels.map((hotel) => (
                        <Grid item xs={12} md={6} key={hotel.hotelName}>
                            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        {hotel.hotelName}
                                    </Typography>
                                    <Typography>
                                        {hotel.hotelLocation}
                                    </Typography>
                                    <Typography>
                                        {hotel.hotelSubLocation}
                                    </Typography>
                                </Box>
                                <IconButton onClick={(e) => handleMenuClick(e, hotel)}>
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
                <DialogTitle>Edit Hotel</DialogTitle>
                <DialogContent>
                    {editedHotel && (
                        <Box>
                            <TextField
                                label="Hotel Name"
                                value={editedHotel.hotelName}
                                onChange={(e) => setEditedHotel({ ...editedHotel, hotelName: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Hotel Location"
                                value={editedHotel.hotelLocation}
                                onChange={(e) => setEditedHotel({ ...editedHotel, hotelLocation: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Hotel Sub Location"
                                value={editedHotel.hotelSubLocation}
                                onChange={(e) => setEditedHotel({ ...editedHotel, hotelSubLocation: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Hotel Pincode"
                                value={editedHotel.hotelPincode}
                                onChange={(e) => setEditedHotel({ ...editedHotel, hotelPincode: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Hotel Contact"
                                value={editedHotel.hotelContact}
                                onChange={(e) => setEditedHotel({ ...editedHotel, hotelContact: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Place Id"
                                value={editedHotel.place?.placeId ?? ""}
                                onChange={(e) =>
                                    setEditedHotel({
                                        ...editedHotel,
                                        place: {
                                            ...(editedHotel.place ?? {}), // Create a copy of place or an empty object if place is null
                                            placeId: e.target.value,
                                        },
                                    })
                                }
                                fullWidth
                                margin="normal"
                            />
                            {/* Image input */}
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
                <MuiAlert  elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}

export default ActionHotel;