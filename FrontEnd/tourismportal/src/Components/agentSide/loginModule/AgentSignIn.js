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
import { Container, Dialog, DialogContent, DialogTitle } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import emailjs from 'emailjs-com';

export default function AgentSignIn() {
  const [travelAgentEmail, setEmail] = useState('');
  const [travelAgentPassword, setPassword] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [resetEmail, setResetEmail] = useState('');

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;

    if (!name || !email || !message) {
      alert('Please fill in all the fields before sending the message');
      return;
    }

    try {
      const emailParams = {
        service_id: 'otp_gen',
        template_id: 'template_prwx0u4',
        user_id: 'Wp4bNYUOJ_Tk2pd9m',
        template_params: {
          to_email: { resetEmail },
          from_name: name,
          from_email: email,
          message: message,
        },
      };

      await emailjs.send(
        emailParams.service_id,
        emailParams.template_id,
        emailParams.template_params,
        emailParams.user_id
      );

      setIsEmailSent(true);
    } catch (error) {
      console.error('Error sending email', error);
      alert('Error sending email. Please try again later.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      const inputObj = { travelAgentEmail: travelAgentEmail, travelAgentPassword: travelAgentPassword };

      fetch('https://localhost:7036/api/Token/Agent', {
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

          console.log(resp);

          // Store the token in a cookie
          document.cookie = `token=${resp}; expires=${getCookieExpirationDate()}; path=/`;
          localStorage.setItem('token', resp);
          localStorage.setItem('travelAgentEmail', travelAgentEmail);
          localStorage.setItem('role', 'agent');
          const decodedToken = JSON.parse(atob(resp.split('.')[1]));
          console.log(decodedToken.travelAgentId);
          localStorage.setItem("AgentId", decodedToken.travelAgentId)
          console.log(decodedToken.travelAgentStatus);
          showSnackbar('Agent credentials matched!', 'success');
          localStorage.setItem("AgentStatus", decodedToken.travelAgentStatus)

          setTimeout(() => {
            navigate('/');
          }, 3000);
        })
        .catch((err) => {
          showSnackbar('Invalid Credentials', 'error');
          console.log('Login Failed due to: ' + err.message, 'error');
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
    if (!travelAgentEmail) {
      showSnackbar('Please enter your email.', 'warning');
      result = false;
    } else if (!isValidEmail(travelAgentEmail)) {
      showSnackbar('Please enter a valid email.', 'warning');
      result = false;
    }

    if (!travelAgentPassword) {
      showSnackbar('Please enter your password.', 'warning');
      result = false;
    }

    return result;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
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
                Agent Sign In
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
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
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
                    <Link href="#" variant="body2" onClick={() => setOpenDialog(true)}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/agent-signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <Typography>Enter your registered email to reset your password.</Typography>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            type="email"
            autoComplete="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault(); // Prevent the default form submission behavior
              // Add logic to send password reset email or show success message using resetEmail
              setResetEmail('');
              sendEmail(e); // Pass the event object to the sendEmail function
              setOpenDialog(false);
            }}
            color="primary"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}