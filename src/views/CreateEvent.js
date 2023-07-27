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

const theme = createTheme();

function CreateEvent() {
  const [formData, setFormData] = React.useState({
    eventName: {
      value: "",
      isError: false,
      errorMessage: "Minimum input size 5",
    },
    eventDetails: {
      value: "",
      isError: false,
      errorMessage: "Minimum input size 10",
    },
    eventFullDescription: {
      value: "",
      isError: false,
      errorMessage: "Minimum input size 25",
    },
    eventImage: {
      value: "",
      isError: false,
      errorMessage: "Upload valid image",
    },
    eventYear: {
      value: "",
      isError: false,
      errorMessage: "Enter year in valid format",
    },
    eventMonth: {
      value: "",
      isError: false,
      errorMessage: "Enter month in a valid format",
    },
    eventDay: {
      value: "",
      isError: false,
      errorMessage: "Enter day in a valid format",
    },
    eventTags: {
      value: [],
      isError: false,
      errorMessage: "",
    },
  });

  const navigate = useNavigate();

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
  function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    if (validate()) { // If the form data is valid
        // TODO: Send the form data to a server
        console.log(formData);
    }
  }

  function validate(event) {
    var isValidationSuccess = true;

    // TODO : Add regex
    var regexEventName = "";
    var regexEventDetails = "";
    var regexEventFullDescription = "";
    var regexEventYear = "";
    var regexEventMonth = "";
    var regexEventDay = "";

    if (!regexEventName.test(formData.eventName.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: {
          ...formData.eventName,
          isError: true,
        },
      }));
    }

    if (!regexEventDetails.test(formData.eventDetails.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        brief: {
          ...formData.eventDetails,
          isError: true,
        },
      }));
    }

    //TODO : Perform validation for other fields

    return isValidationSuccess;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create New Event
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="eventName"
                  value={formData.eventName.value}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="eventName"
                  label="Event Title"
                  helperText={
                    formData.eventName.isError &&
                    formData.eventName.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="eventDetails"
                  label="Event Details"
                  name="eventDetails"
                  value={formData.eventDetails.value}
                  onChange={handleChange}
                  helperText={
                    formData.eventDetails.isError &&
                    formData.eventDetails.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="eventImage"
                  label="ImageURL"
                  name="eventImage"
                  value={formData.eventImage.value}
                  onChange={handleChange}
                  helperText={
                    formData.eventImage.isError &&
                    formData.eventImage.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  style={{ width: "100%" }}
                  name="eventFullDescription"
                  value={formData.eventFullDescription.value}
                  onChange={handleChange}
                  placeholder="Detailed Description"
                  id="eventFullDescription"
                  minRows={10}
                  helperText={
                    formData.eventFullDescription.isError &&
                    formData.eventFullDescription.errorMessage
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Event
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateEvent;
