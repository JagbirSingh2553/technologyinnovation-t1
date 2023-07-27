// References
// https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function EventCard({
  eventId,
  eventName,
  eventDetails,
  eventImage,
  eventDate,
}) {
  const maxWidth = 350;
  const cardHeight = 145;
  const maxHeight = 150;

  return (
    <Card sx={{ maxWidth: maxWidth, boxShadow: "0px 0px 20px grey" }}>
      <CardMedia
        sx={{ height: cardHeight, maxHeight: maxHeight }}
        image={
          eventImage ||
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        }
        title="event image"
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography gutterBottom variant="h5" component="div">
              {eventName || "Sample Event"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography gutterBottom variant="body1" component="div">
              {eventDate || ""}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary">
          {eventDetails ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Button size="small" href={`/events/${eventId}`}>
              Open Event
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button size="small">Save For Later</Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
