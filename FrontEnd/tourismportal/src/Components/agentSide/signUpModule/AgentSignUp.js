import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import React from "react";
import { useTheme } from '@mui/material/styles';
import axios from "axios";

export default function AgentSignUp() {

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

  const [formData, setFormData] = React.useState({
    travelAgentEmail: "",
    travelAgentPassword: "",
    travelAgentName: "",
    travelAgentLocation: "",
    travelAgentPhone: "",
    travelAgentGst: "",
    travelAgentPan: "",
    travelAgentStatus: "requested"
  });

  const initialFormData = {
    travelAgentEmail: "",
    travelAgentPassword: "",
    travelAgentName: "",
    travelAgentLocation: "",
    travelAgentPhone: "",
    travelAgentGst: "",
    travelAgentPan: "",
    travelAgentStatus: "requested",
  };

  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // The form data entered by the user is in the `formData` state
    if (!formData.travelAgentEmail || !formData.travelAgentPassword || !formData.travelAgentName) {
      showSnackbar('Please fill in all required fields.', 'warning');
      return;
    }
    try {
      await axios.post("https://localhost:7036/api/Agents", formData);
      showSnackbar('Agent created successfully', 'success');
      setFormData(initialFormData);
      setActiveStep(0); // Reset step to the first step after successful submission
    } catch (error) {
      console.error("Error creating agent:", error);
      showSnackbar('Error creating agent', 'error');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the formData state with the new value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 8 }}>
        <Grid container>
          <CssBaseline />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center", height: '350px' }}>
              <Typography component="h1" variant="h5">
                Agent Sign Up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <MobileStepper
                  variant="progress"
                  steps={3}
                  position="static"
                  activeStep={activeStep}
                  sx={{ maxWidth: 400, flexGrow: 1 }}
                  nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
                      Next
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      Back
                    </Button>
                  }
                />

                {activeStep === 0 && (
                  <div>
                    <TextField
                      label="Agent Email"
                      name="travelAgentEmail"
                      fullWidth
                      margin="normal"
                      placeholder="Enter Agent Email"
                      value={formData.travelAgentEmail} // Add value prop
                      onChange={handleChange} // Add onChange prop
                    />
                    <TextField
                      label="Agent Password"
                      name="travelAgentPassword"
                      fullWidth
                      margin="normal"
                      type="password"
                      placeholder="Enter Agent Password"
                      value={formData.travelAgentPassword} // Add value prop
                      onChange={handleChange} // Add onChange prop
                    />
                  </div>
                )}
                {activeStep === 1 && (
                  <div>
                    <TextField
                      label="Agent Name"
                      name="travelAgentName"
                      fullWidth
                      margin="normal"
                      placeholder="Enter Agent Name"
                      value={formData.travelAgentName} // Add value prop
                      onChange={handleChange} // Add onChange prop
                    />
                    <TextField
                      label="Agent Location"
                      name="travelAgentLocation"
                      fullWidth
                      margin="normal"
                      placeholder="Enter Agent Location"
                      value={formData.travelAgentLocation} // Add value prop
                      onChange={handleChange} // Add onChange prop
                    />
                    <TextField
                      label="Agent Contact"
                      name="travelAgentPhone"
                      fullWidth
                      margin="normal"
                      placeholder="Enter Agent Contact"
                      value={formData.travelAgentPhone} // Add value prop
                      onChange={handleChange} // Add onChange prop
                    />
                  </div>
                )}
                {activeStep === 2 && (
                  <div>
                    <TextField
                      label="GSTIN"
                      name="travelAgentGst"
                      fullWidth
                      margin="normal"
                      placeholder="Enter GSTIN"
                      value={formData.travelAgentGst} // Add value prop
                      onChange={handleChange} // Add onChange prop
                    />
                    <TextField
                      label="Agent PAN"
                      name="travelAgentPan"
                      fullWidth
                      margin="normal"
                      placeholder="Enter Agent PAN"
                      value={formData.travelAgentPan} // Add value prop
                      onChange={handleChange} // Add onChange prop
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Sign Up
                    </Button>
                  </div>
                )}
                <Grid container>
                  <Grid item xs />
                  <Grid item>
                    <Link href="/agent" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: "url(https://source.unsplash.com/random)", backgroundRepeat: "no-repeat", backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]), backgroundSize: "cover", backgroundPosition: "center" }} />
        </Grid>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
