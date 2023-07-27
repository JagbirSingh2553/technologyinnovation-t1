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
    eventDate: { // Combine year, month, and day into a single field
      value: "",
      isError: false,
      errorMessage: "Enter a valid date in YYYY-MM-DD format",
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

  function validate() {
    let isValidationSuccess = true;

    // TODO: Add regex
    const regexEventName = /^.{5,}$/; // Minimum 5 characters for event name
    const regexEventDetails = /^.{10,}$/; // Minimum 10 characters for event details
    const regexEventFullDescription = /^.{25,}$/; // Minimum 25 characters for full description
    const regexDate = /^\d{4}-\d{2}-\d{2}$/; // Valid date in YYYY-MM-DD format

    if (!regexEventName.test(formData.eventName.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventName: {
          ...formData.eventName,
          isError: true,
        },
      }));
    }

    if (!regexEventDetails.test(formData.eventDetails.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventDetails: {
          ...formData.eventDetails,
          isError: true,
        },
      }));
    }

    if (!regexEventFullDescription.test(formData.eventFullDescription.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventFullDescription: {
          ...formData.eventFullDescription,
          isError: true,
        },
      }));
    }

    if (!regexDate.test(formData.eventDate.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventDate: {
          ...formData.eventDate,
          isError: true,
        },
      }));
    }

    return isValidationSuccess;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      //TODO : Include tags
      //TODO : Save to JSON file
    }
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="eventDate"
                  label="Event Date (YYYY-MM-DD)"
                  name="eventDate"
                  value={formData.eventDate.value}
                  onChange={handleChange}
                  helperText={
                    formData.eventDate.isError && formData.eventDate.errorMessage
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
