import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { newslettersApi } from '../api/newsletters'; 
import Paper from '@mui/material/Paper'; 
import { styled } from '@mui/system'; 

const theme = createTheme();
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

function NewsLetter() {
  const [formData, setFormData] = React.useState({
    eventEmail: {
      value: "",
      isError: false,
      errorMessage: "Invalid Email !!",
    },
  });

  const navigate = useNavigate();
  const [newsletters, setNewsletters] = React.useState([]);

  // Check if there is a username in local storage when the page loads
  React.useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      // No username found, redirect to login page or any other desired action
      navigate("/login");
    }
  newslettersApi.getNewsletters()
    .then(response => {
      setNewsletters(response.data.newsletters); // Use response.data.newsletters
    })
    .catch(error => {
      console.error('Error fetching newsletters:', error);
    });
  }, []);
  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: {
        ...formData[event.target.name],
        value: event.target.value,
        isError: false,
      },
    }));
  }

  function validate(event) {
    var isValidationSuccess = true;

    // TODO : Add regex
    var regexEventEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEventEmail.test(formData.eventEmail.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventEmail: {
          ...formData.eventEmail,
          isError: true,
        },
      }));
    }

    //TODO : Perform validation for other fields

    return isValidationSuccess;
  }
async function handleSubmit(event) {
  event.preventDefault();
  if (validate()) {
  try {
    // Store the form data in the /store API first
    const storeResponse = await fetch("https://dakiya.onrender.com:3001/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.eventEmail.value,
      }),
    });

    if (storeResponse.ok) {
      // Form data is stored successfully, now send the email
      const emailResponse = await fetch("https://dakiya.onrender.com:3001/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.eventEmail.value,
          message: "Thank you for subscribing to our newsletter!",
        }),
      });

      if (emailResponse.ok) {
        // Handle success (e.g., show a success message)
        window.alert("Email sent successfully!");
        setFormData((prevFormData) => ({
          ...prevFormData,
          eventEmail: {
            ...formData.eventEmail,
            value: "", // Clear the text field after sending the email
          },
        }));
      } else {
        // Handle error (e.g., show an error message)
        window.alert("Failed to send email.");
      }
    } else {
      // Handle error in storing data (e.g., show an error message)
      window.alert("Failed to store data.");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    window.alert("Error sending email.");
  }
 }
}
    return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {/* Section to display the newsletters */}
         <Box
          sx={{
            maxHeight: '200px',
            overflowY: 'scroll',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          {newsletters.map((newsletter, index) => (
            <StyledPaper key={index}>
              <Typography variant="h6" component="h2">{newsletter.title}</Typography>
              <Typography>{newsletter.content}</Typography>
            </StyledPaper>
          ))}
        </Box>

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            <b>Great to meet you!</b>
          </Typography>
          <Typography component="label" textAlign={"center"}>
            We'd love to send some awesomely useful content right to your inbox. Just share your email address with
            us, and we'll be in touch soon!
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="eventEmail"
                  value={formData.eventEmail.value}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="eventEmail"
                  helperText={formData.eventEmail.isError && formData.eventEmail.errorMessage}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default NewsLetter;
