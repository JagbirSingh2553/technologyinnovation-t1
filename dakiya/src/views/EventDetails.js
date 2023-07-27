import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
const eventsList = require("../data/Events.json");

export default function EventDetails() {
  const maxWidth = 800;
  const imageHeight = 250;
  let { eventId } = useParams();
  const currentEvent =
    eventsList.filter((event) => event.eventId == eventId).at(0) || {};

  return (
    <Card
      sx={{
        maxWidth: maxWidth,
        boxShadow: "0px 0px 20px grey",
        margin: "auto",
        width: "80%",
        marginTop: "3em",
      }}
    >
      <CardMedia
        sx={{ height: imageHeight, objectFit: "cover" }}
        image={
          currentEvent.eventImage ||
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        }
        title="event image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currentEvent.eventName || "Sample Event"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentEvent.eventDetailsLong ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/events`}>
          Go Back
        </Button>
        <Button size="small">Save For Later</Button>
      </CardActions>
    </Card>
  );
}
