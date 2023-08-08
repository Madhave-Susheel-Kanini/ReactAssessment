import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
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

export default function UserSignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();
    const [showSignIn, setShowSignIn] = useState(true);
    const [regname, setRegName] = useState(''); // Define the state variable regname
    const [regpassword, setRegPassword] = useState(''); // Define the state variable regpassword
    const [regemail, setRegEmail] = useState(''); // Define the state variable regemail
    const [regphone, setRegPhone] = useState(''); // Define the state variable regphone

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate the user data before submitting it
        try {
            // Call the createUser function and pass the user data from the state
            const userData = {
                name: regname,
                password: regpassword,
                email: regemail,
                phone: regphone,
            };
            await createUser(userData);
            // Handle success scenario, e.g., show a success message or navigate to a success page
            displaySnackbar('User created successfully', 'success');
        } catch (error) {
            // Handle the error scenario, e.g., show an error message or do nothing
            displaySnackbar('Error creating user', 'error');
        }
    };


    const createUser = async (userData) => {
        try {
            const response = await axios.post('https://localhost:7029/api/Users', userData);
            console.log('User created successfully:', response.data);
            setShowSignIn(true);
            return response.data; // You can return the response data if needed
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    const handleSignUpClick = () => {
        setShowSignIn(false);
    };

    const handleSignInClick = () => {
        setShowSignIn(true);
    };


    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const proceedLoginUsingAPI = (e) => {

        e.preventDefault();
        if (validate()) {
            const inputObj = { email: email, password: password };

            fetch('https://localhost:7029/api/Tokens/User', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputObj),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.text();
                    } else {
                        throw new Error('Invalid Credentials');
                    }
                })
                .then((resp) => {

                    displaySnackbar('Token Generated', 'success');
                    console.log(resp);

                    // Store the token in a cookie
                    document.cookie = `token=${resp}; expires=${getCookieExpirationDate()}; path=/`;
                    localStorage.setItem('token', resp);
                    localStorage.setItem('email', email);
                    localStorage.setItem('role', 'user');
                    const decodedToken = JSON.parse(atob(resp.split('.')[1]));
                    localStorage.setItem('userName', decodedToken.Password);
                    console.log(decodedToken.Id);
                    localStorage.setItem("UserId", decodedToken.Id)

                    // navigate('/home');
                })
                .catch((err) => {
                    displaySnackbar('Login Failed due to: ' + err.message, 'error');
                });
        }
    };

    const getCookieExpirationDate = () => {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 30); // Set expiration to 10 minutes from now
        return expirationDate.toUTCString();
    };

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            displaySnackbar('Please Enter Username', 'warning');
        }
        if (password === '' || password === null) {
            result = false;
            displaySnackbar('Please Enter Password', 'warning');
        }
        return result;
    };

    const displaySnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    return (
        <>
            {showSignIn && (
                <Container>
                    <style>
                        {`
                        .css-1oqqzyl-MuiContainer-root {
                        padding-left: 0;
                        padding-right: 0;
                        }
                    `}
                    </style>
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
                                        User Sign In
                                    </Typography>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={proceedLoginUsingAPI}
                                        sx={{ mt: 1 }}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email" // Update the name attribute to "email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password" // Update the name attribute to "password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
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
                                                <Link href="#" variant="body2" onClick={handleSignUpClick}>
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            )}

            {!showSignIn && (
                <Container>
                    <style>
                        {`
                        .css-1oqqzyl-MuiContainer-root {
                        padding-left: 0;
                        padding-right: 0;
                        }
                    `}
                    </style>
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
                                        User Sign Up
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
                                                <Link href="#" variant="body2" onClick={handleSignInClick}>
                                                    {"Have an account already? Sign In"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            )}

        </>
    );
}