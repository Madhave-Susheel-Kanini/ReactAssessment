import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function AdminSignUp() {

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(true);
  const [regname, setRegName] = useState(''); // Define the state variable regname
  const [regpassword, setRegPassword] = useState(''); // Define the state variable regpassword
  const [regemail, setRegEmail] = useState(''); // Define the state variable regemail
  const [regphone, setRegPhone] = useState(''); // Define the state variable regphone

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    if (!regname) {
      showSnackbar('Please enter your username.', 'warning');
      return false;
    }

    if (!regpassword) {
      showSnackbar('Please enter your password.', 'warning');
      return false;
    }

    // Password validation criteria
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(regpassword)) {
      showSnackbar(
        'Password must contain at least 1 uppercase letter, 1 special character, and 1 number.',
        'warning'
      );
      return false;
    }

    if (!regemail) {
      showSnackbar('Please enter your email.', 'warning');
      return false;
    } else if (!isValidEmail(regemail)) {
      showSnackbar('Please enter a valid email.', 'warning');
      return false;
    }

    if (!regphone) {
      showSnackbar('Please enter your phone number.', 'warning');
      return false;
    }

    return true;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidForm = validate();

    if (isValidForm) {
      try {
        // Call the createUser function and pass the user data from the state
        const userData = {
          name: regname,
          password: regpassword,
          email: regemail,
          phone: regphone,
        };
        await createUser(userData);
        showSnackbar('Admin credentials creater Successfully! You are now redirected ', 'success');

        setTimeout(() => {
          navigate('/admin');
        }, 3000);
        // Handle success scenario, e.g., show a success message or navigate to a success page
      } catch (error) {
        // Handle the error scenario, e.g., show an error message or do nothing
        showSnackbar('Error Creating User', 'error');
      }
    }
  };


  const createUser = async (userData) => {
    try {
      const response = await axios.post('https://localhost:7029/api/Admins', userData);
      const response2 = await axios.post('https://localhost:7036/api/Admins', userData);
      console.log('User created successfully in server 1:', response.data);
      console.log('User created successfully in server 1:', response2.data);
      showSnackbar('User created successfully!', 'success');
      setShowSignIn(true);
      return response.data; // You can return the response data if needed
    } catch (error) {
      console.error('Error creating user:', error);
      showSnackbar('Error Creating User', 'error');
      throw error;
    }
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);


  const getCookieExpirationDate = () => {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 30); // Set expiration to 10 minutes from now
    return expirationDate.toUTCString();
  };

  return (
    <Container>
      <Box>
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

              }}
            >
              <Typography component="h1" variant="h5">
                Admin Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name" // Update the name attribute to "email"
                  autoComplete="name"
                  value={regname}
                  onChange={(e) => setRegName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password" // Update the name attribute to "password"
                  label="Password"
                  type="password"
                  id="password"
                  value={regpassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email" // Update the name attribute to "email"
                  autoComplete="email"
                  value={regemail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone" // Update the name attribute to "email"
                  autoComplete="phone"
                  value={regphone}
                  onChange={(e) => setRegPhone(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/admin" variant="body2">
                      {"Have an account already? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
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