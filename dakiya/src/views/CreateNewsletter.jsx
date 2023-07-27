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

function CreateNewsletter() {
  const [formData, setFormData] = React.useState({
    newsletterTitle: {
      value: "",
      isError: false,
      errorMessage: "Minimum input size 5",
    },
    newsletterContent: {
      value: "",
      isError: false,
      errorMessage: "Minimum input size 10",
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

    // TODO : Add regex
    const regexTitle = /^.{5,}$/; // Minimum 5 characters for title
    const regexContent = /^.{10,}$/; // Minimum 10 characters for content

    if (!regexTitle.test(formData.newsletterTitle.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        newsletterTitle: {
          ...formData.newsletterTitle,
          isError: true,
        },
      }));
    }

    if (!regexContent.test(formData.newsletterContent.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        newsletterContent: {
          ...formData.newsletterContent,
          isError: true,
        },
      }));
    }

    return isValidationSuccess;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      //TODO : Save to JSON file or send to API
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
            Create New Newsletter
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
                  name="newsletterTitle"
                  value={formData.newsletterTitle.value}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="newsletterTitle"
                  label="Newsletter Title"
                  helperText={
                    formData.newsletterTitle.isError &&
                    formData.newsletterTitle.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="newsletterContent"
                  label="Newsletter Content"
                  name="newsletterContent"
                  value={formData.newsletterContent.value}
                  onChange={handleChange}
                  helperText={
                    formData.newsletterContent.isError &&
                    formData.newsletterContent.errorMessage
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
              Create Newsletter
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateNewsletter;

