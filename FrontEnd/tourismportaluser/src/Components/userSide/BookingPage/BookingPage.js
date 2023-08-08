import React, { useEffect, useState } from "react";
import ReactBingMap, { Pushpin, Polyline } from "@3acaga/react-bing-maps";
import { Box } from "@mui/system";
import bgimage from '../HomePage/assets/images/bgimgp.png';
import { Button, Grid, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { Dialog, DialogContent } from "@mui/material";

const key = "Ag0GqkzU5oJB_zfxYlTUdazhHjgjqw8uvUKpvxlRqbfHHDo2LR9dekSy-kVQd_Fq";

const BookingPage = () => {

    const currentDate = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);

    const [userId, setUserId] = useState(0);
    const [billingName, setBillingName] = useState("");
    const [billingPhone, setBillingPhone] = useState("");

    const { booking_id } = useParams();

    const [formData, setFormData] = useState({
        startingPoint: '',
        endingPoint: '',
        hotel: '',
        headCount: '',
        daysCount: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        billingMail: '',
        billingAddress: '',
        userMail: '',
        userDetail: {
            id: userId
        }
    });

    const getUsersById = async (userId) => {
        try {
          const response = await axios.get(`https://localhost:7029/api/Users/${userId}`);
          // Handle the response data
          console.log(response.data.phone); // or do something with the data
          console.log(response.data.name)
          setBillingName(response.data.phone)
          setBillingPhone(response.data.name)
          return response.data;
        } catch (error) {
          // Handle any errors that occurred during the request
          console.error('Error fetching users:', error);
          throw error;
        }
      }; 

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const [placeNames, setPlaceNames] = useState([]);
    const [totalRupeePerKm, setTotalRupeePerKm] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState({
        latitude: 0,
        longitude: 0,
        maxDistance: 0,
        tourCost: 0
    });

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [startDefault, setStartDefault] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [endDefault, setEndDefault] = useState({
        latitude: 50,
        longitude: 50,
    });

    const labelStyle = {
        fontSize: "11px", // Adjust the font size as needed
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userid = localStorage.getItem("user_id")
                setUserId(userid)
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    }, []);

    const [start, setStart] = useState(startDefault);
    const [end, setEnd] = useState(endDefault);

    const fetchPlaceNames = async () => {
        try {
            const response = await fetch('https://localhost:7036/api/Places');
            const data = await response.json();
            setPlaceNames(data);

            if (selectedPlace) {
                setEndDefault({
                    latitude: parseFloat(selectedPlace.latitude),
                    longitude: parseFloat(selectedPlace.longitude),
                });
            }

        } catch (error) {
            console.error("Error fetching place names:", error);
        }
    };

    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',
            color: 'black',
        },
        hospitalName: {
            fontSize: '15px'
        },
        logo: {
            width: '50px',
            height: 'auto',
            marginBottom: '10px',
        },
        section: {
            margin: 10,
            padding: 10,
        },
        viewer: {
            width: '100%',
            height: '100vh',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        invoiceNumber: {
            fontSize: 14,
        },
        address: {
            fontSize: 10,
        },
        generalInfoHeading: {
            fontSize: 13,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        infoLabel: {
            fontSize: 10,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        infoValue: {
            fontSize: 11,
            marginBottom: 5,
        },
        table: {
            marginTop: 1,
            border: '1px solid #000',
            borderRadius: '5px',
        },
        tableHeader: {
            backgroundColor: '#f1f1f1',
            flexDirection: 'row',
            fontWeight: 'bold',
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCell: {
            flex: 1,
            padding: '8px 10px',
            fontSize: 12,
            borderRight: '1px solid #000',
            borderBottom: '1px solid #000',
        },
        alternateCell: {
            backgroundColor: '#f1f1f1',
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
        },
        billingInfo: {
            flex: 1,
            padding: '10px',
            borderRight: '1px solid #ccc',
        },
        tourInfo: {
            flex: 1,
            padding: '10px',
        },
    });


    const [totalCostforDist, settotalCostforDist] = useState();
    const [distanceTot, setdistanceTot] = useState();

    const handleSelectChange = (event) => {
        // Find the selected option by value
        const selectedOption = placeNames.find(
            (place) => place.placeName === event.target.value
        );

        // Check if selectedOption is not undefined before updating the state
        if (selectedOption) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                endingPoint: selectedOption.placeName,
            }));
            console.log(selectedOption.maxDistance)
            setMapKey((prevKey) => prevKey + 1)
            console.log(userId)
            // Update the selectedPlace state with the selected option's properties
            setSelectedPlace({
                latitude: parseFloat(selectedOption.latitude),
                longitude: parseFloat(selectedOption.longitude),
                maxDistance: parseInt(selectedOption.maxDistance),
                tourCost: parseInt(selectedOption.tourCost)
            });

            // Update the start and end coordinates
            setStart({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
            });

            setEnd({
                latitude: parseFloat(selectedOption.latitude),
                longitude: parseFloat(selectedOption.longitude),
            });

            if (currentLocation) {
                const distance = calculateDistance(
                    currentLocation.latitude,
                    currentLocation.longitude,
                    selectedOption.latitude,
                    selectedOption.longitude
                );

                if (distance > parseInt(selectedOption.maxDistance)) {
                    const totalRupeeForMaxDistance = parseInt(selectedOption.tourCost) / parseInt(selectedOption.maxDistance);
                    setTotalRupeePerKm(totalRupeeForMaxDistance);
                    console.log(totalRupeeForMaxDistance);
                    const totalCostForDistance = totalRupeeForMaxDistance * distance;
                    console.log(distance);
                    console.log(totalCostForDistance);
                    settotalCostforDist(totalCostForDistance)
                    setdistanceTot(distance)
                    console.log(start)
                    console.log(end)
                } else {
                    setTotalRupeePerKm(0);
                }
            }
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const [isSubmitting, setIsSubmitting] = useState(false); // Make sure to initialize isSubmitting state

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if the form is already being submitted
        if (isSubmitting) {
            return;
        }

        // Set isSubmitting to true to prevent multiple form submissions
        setIsSubmitting(true);
        const bookingData = {
            startingPoint: formData.startingPoint,
            endingPoint: formData.endingPoint,
            hotel: formData.hotel,
            headCount: parseInt(formData.headCount),
            daysCount: parseInt(formData.daysCount),
            startDate: formData.startDate,
            endDate: formData.endDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            billingMail: formData.billingMail,
            billingAddress: formData.billingAddress,
            userMail: formData.userMail,
            userDetail: {
                id: 1, // Replace with the actual user ID if available
            },
        };
        try {
            console.log(bookingData)
            // Make the API call to submit the booking data
            await axios.post('https://localhost:7029/api/Bookings', bookingData);
            console.log('Booking successfully created.');
            // Do something after successful booking creation, e.g., show a success message or redirect to another page.
            setIsSubmitting(false); // Set isSubmitting back to false after successful submission

            // Trigger the PDF generation after the form is submitted successfully
            handleViewInvoice(event);
        } catch (error) {
            console.error('Error while creating booking:', error);
            // Handle errors, e.g., show an error message to the user.
            setIsSubmitting(false); // Set isSubmitting back to false if there is an error
        }
    };

    useEffect(() => {
        fetchPlaceNames();
        getUsersById(userId);

    }, []);

    const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);

    const handleViewInvoice = (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        console.log("hi")
        setIsPdfDialogOpen(true); // Set the state to true to open the PDF dialog
        console.log(isPdfDialogOpen)
    };

    // Function to handle the dialog close event
    const handlePdfDialogClose = () => {
        setIsPdfDialogOpen(false);
    };

    const [mapKey, setMapKey] = useState(1);
    const isXsScreen = theme ? useMediaQuery(theme.breakpoints.down('xs')) : false;

    return (
        <Box sx={{ height: '100vh', backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
            {/* <Button type="submit" variant="contained" color="primary" onClick={(event) => handleViewInvoice(event)}>
                Generate Billing
            </Button> */}

            {isPdfDialogOpen !== null && (
                <Dialog open={isPdfDialogOpen} onClose={handlePdfDialogClose} maxWidth="md" fullWidth>
                    <DialogContent>
                        <PDFViewer style={styles.viewer}>
                            <Document>
                                <Page size="A4" style={styles.page}>
                                    <View style={styles.section}>
                                        {/* Header */}
                                        <View style={styles.header}>
                                            <View>
                                                {/* <Image style={styles.logo} src={logo} /> */}
                                                <Text style={styles.hospitalName}>salt-tourism.</Text>
                                                <Text style={styles.address}>13/11, Eltorado Plaza, Kolar Gold Fields, London</Text>
                                                <Text style={styles.address}>Email: mail@salttourism.com</Text>
                                                <Text style={styles.address}>Website: www.salttourism.com</Text>
                                                <Text style={styles.address}>Fax: +102-182-210</Text>
                                                <Text style={styles.address}>Phone: +102-182-210</Text>
                                            </View>
                                            <Text style={styles.invoiceNumber}>Invoice #SNG00</Text>
                                            <hr />
                                        </View>

                                        <View style={styles.container}>
                                            <div style={styles.billingInfo}>
                                                <Text style={styles.generalInfoHeading}>BILLING INFORMATION:</Text>
                                                <View>
                                                    <Text style={styles.infoLabel}>Starting Point: {formData.startingPoint}</Text>
                                                    <Text style={styles.infoLabel}>Ending Point: {formData.endingPoint}</Text>
                                                    <Text style={styles.infoLabel}>Head Count: {formData.headCount}</Text>
                                                    <Text style={styles.infoLabel}>Days Count: {formData.daysCount}</Text>
                                                    <Text style={styles.infoLabel}>Start Date: {formData.startDate}</Text>
                                                    <Text style={styles.infoLabel}>End Date: {formData.endDate}</Text>
                                                    <Text style={styles.infoLabel}>Total Distance: {distanceTot}</Text>
                                                </View>
                                            </div>
                                            <div style={styles.tourInfo}>
                                                <Text style={styles.generalInfoHeading}>PACKAGE INFORMATION:</Text>
                                                <View>
                                                    {/* Display tour information here */}
                                                    <Text style={styles.infoLabel}>Billing Name: {billingName}</Text>
                                                    <Text style={styles.infoLabel}>Billing Address: {formData.billingAddress}</Text>
                                                    <Text style={styles.infoLabel}>Phone Number: {billingPhone}</Text>
                                                    <Text style={styles.infoLabel}>Billing Email: {formData.billingMail}</Text>
                                                    <Text style={styles.infoLabel}>Date: {formattedDate}</Text>
                                                </View>
                                            </div>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.generalInfoHeading}>Invoice Details</Text>
                                            <View style={styles.table}>
                                                <View style={styles.tableHeader}>
                                                    <Text style={styles.tableCell}>Serial Number</Text>
                                                    <Text style={styles.tableCell}>Package</Text>
                                                    <Text style={styles.tableCell}>Price</Text>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <Text style={styles.tableCell}>1</Text>
                                                    <Text style={styles.tableCell}>{formData.endingPoint}</Text>
                                                    <Text style={styles.tableCell}>Rs. {totalCostforDist}</Text>
                                                </View>
                                                <View style={styles.tableRow}>
                                                    <Text style={[styles.tableCell, styles.alternateCell]}></Text>
                                                    <Text style={[styles.tableCell, styles.alternateCell]}>Total</Text>
                                                    <Text style={[styles.tableCell, styles.alternateCell]}>Rs. </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Page>
                            </Document>
                        </PDFViewer>
                    </DialogContent>
                </Dialog>
            )}

            <Box sx={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '3%', height: '70%' }}>
                <Grid container sx={{ height: '112%' }} spacing={0}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ padding: '2%', backgroundColor: 'white', height: '100%' }}>
                            <form onSubmit={handleSubmit}>
                                <Typography sx={{ fontSize: '30px', fontWeight: '600', textAlign: 'center', marginTop: '10px' }}>
                                    Book your trip now
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <MobileStepper
                                    variant="progress"
                                    // steps={3}
                                    position="static"
                                    activeStep={activeStep}
                                    sx={{ maxWidth: 400, flexGrow: 1 }}
                                    nextButton={
                                        <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
                                            Next
                                            {theme.direction === 'rtl' ? (
                                                <KeyboardArrowLeft />
                                            ) : (
                                                <KeyboardArrowRight />
                                            )}
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                            {theme.direction === 'rtl' ? (
                                                <KeyboardArrowRight />
                                            ) : (
                                                <KeyboardArrowLeft />
                                            )}
                                            Back
                                        </Button>
                                    }
                                />
                                </Box>

                                {activeStep === 0 && (
                                    <div>
                                        <Typography sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'left', marginTop: '10px' }}>
                                            Package Info
                                        </Typography>
                                        <TextField
                                            label="Starting Point"
                                            name="startingPoint"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.startingPoint}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />

                                        <Select
                                            name="endingPoint"
                                            fullWidth
                                            margin="normal"
                                            labelStyle={labelStyle}
                                            value={formData.endingPoint}
                                            onChange={handleSelectChange}

                                        >
                                            {placeNames.map((place) => (
                                                <MenuItem key={place.id} value={place.placeName}>
                                                    {place.placeName}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        <TextField
                                            label="Hotel"
                                            name="hotel"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.hotel}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />
                                        <TextField
                                            label="Head Count"
                                            name="headCount"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.headCount}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />

                                        <TextField
                                            label="Days Count"
                                            name="daysCount"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.daysCount}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />
                                    </div>
                                )}
                                {activeStep === 1 && (
                                    <div>
                                        <Typography sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'left', marginTop: '10px' }}>
                                            Travel Info
                                        </Typography>
                                        <TextField
                                            label="Start Date"
                                            name="startDate"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.startDate}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />

                                        <TextField
                                            label="End Date"
                                            name="endDate"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.endDate}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />

                                        <TextField
                                            label="Start Time"
                                            name="startTime"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.startTime}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />

                                        <TextField
                                            label="End Time"
                                            name="endTime"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.endTime}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />
                                    </div>
                                )}
                                {activeStep === 2 && (
                                    <div>
                                        <Typography sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'left', marginTop: '10px' }}>
                                            Billing Info
                                        </Typography>
                                        <TextField
                                            label="Billing Mail"
                                            name="billingMail"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.billingMail}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />

                                        <TextField
                                            label="Billing Address"
                                            name="billingAddress"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.billingAddress}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />

                                        <TextField
                                            label="User Mail"
                                            name="userMail"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{ style: labelStyle }}
                                            value={formData.userMail}
                                            onChange={handleFormChange}
                                            inputProps={{
                                                style: { fontSize: 16 } // Adjust the font size here
                                            }}
                                        />
                                        <Button type="submit" variant="contained" color="primary">
                                            Place Booking
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: isXsScreen ? 'none' : 'block' }}>
                        <Box sx={{ height: '102.6%', paddingBottom: '15px' }}>
                            <ReactBingMap apiKey={key} key={mapKey} style={{ height: "110%", width: "100%" }}>
                                <Pushpin location={start} />
                                <Polyline path={[start, end]} />
                                <Pushpin location={end} />
                            </ReactBingMap>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default BookingPage;