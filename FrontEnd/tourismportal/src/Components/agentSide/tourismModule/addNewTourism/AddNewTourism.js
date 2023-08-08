import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddNewTourism = () => {

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

    const [userId, setUserId] = useState(0);

    const initialFormData = {
        placeName: '',
        placeDescription: '',
        latitude: '',
        longitude: '',
        dayCost: 0,
        tourCost: 0,
        maxDistance: 0,
        totalDays: 0,
        route: '',
        spots: '',
        imageFile: null, // Initialize imageFile with null
        agent: {
            travelAgentId: userId,
        },
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedImage, setSelectedImage] = useState(null); // Initialize selectedImage with null
    const fileInputRef = useRef(null);

    useEffect(() => {
        fileInputRef.current = document.createElement('input');
        fileInputRef.current.type = 'file';
        fileInputRef.current.style.display = 'none';
        fileInputRef.current.addEventListener('change', handleImageChange);
        const userid = localStorage.getItem("AgentId")
        setUserId(userid)
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'agent.travelAgentId') {
            setFormData((prevData) => ({
                ...prevData,
                agent: {
                    ...prevData.agent,
                    travelAgentId: value, // Correct the property name here
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        console.log(file); // Add this line to check the selected file in the console
    };

    const handleSubmit = (e) => {

        if (
            !formData.placeName ||
            !formData.placeDescription ||
            !formData.latitude ||
            !formData.longitude ||
            !formData.dayCost ||
            !formData.route ||
            !formData.maxDistance
        ) {
            showSnackbar('Please fill all the required fields and upload an image.', 'error');
            return;
        }

        e.preventDefault();

        console.log(formData);

        const data = new FormData();
        data.append('placeName', formData.placeName);
        data.append('placeDescription', formData.placeDescription);
        data.append('latitude', formData.latitude);
        data.append('longitude', formData.longitude);
        data.append('dayCost', formData.dayCost);
        data.append('tourCost', formData.tourCost);
        data.append('route', formData.route);
        data.append('maxDistance', formData.maxDistance);
        data.append('totalDays', formData.totalDays);
        data.append('spots', formData.spots);
        data.append('agent.travelAgentId', userId);
        if (selectedImage) {
            data.append('imageFile', selectedImage); // Use 'imageFile' as the key
        }

        // Perform form submission using Axios POST request
        axios
            .post('https://localhost:7036/api/Places', data, {
                headers: { 'Content-Type': 'multipart/form-data' }, // Set the correct content type
            })
            .then((response) => {
                console.log('Form data submitted successfully:', response.data);
                // Clear the form data and selectedImage
                setFormData(initialFormData);
                showSnackbar('Form data submitted successfully!', 'success');
                setSelectedImage(null);
            })
            .catch((error) => {
                console.error('Error submitting form data:', error);
                showSnackbar('Error submitting form data', 'success');
                // Handle error if needed
            });
    };

    return (
        <Box>
            <Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ backgroundColor: '#F0F4F7', p: 3 }}>
                        <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px' }}>
                            <Box>
                                <Typography>Primary Details</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Tourism Name"
                                        name="placeName"
                                        value={formData.placeName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Tourism Description"
                                        name="placeDescription"
                                        value={formData.placeDescription}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Total Days"
                                        name="totalDays"
                                        value={formData.totalDays}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    {/* TextField for the file input */}
                                    <TextField
                                        label="Tourism Image"
                                        name="placeImage"
                                        type="file"
                                        onChange={handleImageChange}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    {/* Button to trigger the file input */}
                                    <Button
                                        onClick={() => fileInputRef.current.click()}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Upload Image
                                    </Button>
                                    {/* Display the selected image name */}
                                    {formData.placeImage && <span>{formData.placeImage.name}</span>}
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%' }}>
                            <Box>
                                <Typography>Pricing Details</Typography>
                            </Box>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Day Cost"
                                        name="dayCost" // Correct the name attribute here
                                        value={formData.dayCost}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Tour Cost"
                                        name="tourCost" // Correct the name attribute here
                                        value={formData.tourCost}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Max Distance"
                                        name="maxDistance" // Correct the name attribute here
                                        value={formData.maxDistance}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%' }}>
                            <Box>
                                <Typography>Location Details</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Latitude"
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Longitude"
                                        name="longitude"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ padding: '3%', backgroundColor: 'white', borderRadius: '10px', marginTop: '2%' }}>
                            <Box>
                                <Typography>Route/Spot Details</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Route"
                                        name="route"
                                        value={formData.route}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Spots"
                                        name="spots"
                                        value={formData.spots}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="travelAgentId"
                                        name="agent.travelAgentId"
                                        disabled
                                        value={userId}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ marginTop: '2%' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>
        </Box>
    );
};

export default AddNewTourism;
