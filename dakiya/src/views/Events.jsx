import "./Events.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EventCard from "../components/EventCard";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import {eventsApi} from "../api/events"


function Events() {
  const [eventsList, setEventsList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    eventsApi
      .getEvents()
      .then((res) => {

      
        setEventsList(() => res?.data?.events || []);
      })
      .catch((err) => {
        console.log("Unable to fetch events : ", err);
      });
  }, []);

  const handleClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }

    
  };

  const filteredEvents = eventsList.filter((event) => {
    return event.tags.some((tag) => selectedTags.includes(tag));
  });
  return (
    <div>
      <div className="container">
        <Stack direction="row" spacing={1}>
          <Chip
            label="Apple"
            onClick={() => handleClick("apple")}
            variant={selectedTags.includes("apple") ? "filled" : "outlined"}
          />
          <Chip
            label="Google"
            onClick={() => handleClick("google")}
            variant={selectedTags.includes("google") ? "filled" : "outlined"}
          />
          <Chip
            label="Microsoft"
            onClick={() => handleClick("microsoft")}
            variant={selectedTags.includes("microsoft") ? "filled" : "outlined"}
          />
          <Chip
            label="CES"
            onClick={() => handleClick("ces")}
            variant={selectedTags.includes("ces") ? "filled" : "outlined"}
          />
        </Stack>
      </div>

      {selectedTags.length > 0 && (
        <div className="container">
          <Typography variant="h4" component="div">
            {"Filtered events"}
          </Typography>
        </div>
      )}

      <div className="container">
        {filteredEvents.map((event) => (
          <EventCard
            eventId={event.eventId}
            eventName={event.eventName}
            eventDetails={event.eventDetails}
            eventImage={event.eventImage}
            eventDate={event.date}
          />
        ))}
      </div>

      <div className="container">
        <Typography gutterBottom variant="h4" component="div">
          {"Upcoming events"}
        </Typography>
      </div>
      <div className="container" paddingTop="25px">
        {eventsList
          .filter((event) => {
            return new Date(event.date) > new Date();
          })
          .map((event) => {
            return (
              <EventCard
                eventId={event.eventId}
                eventName={event.eventName}
                eventDetails={event.eventDetails}
                eventImage={event.eventImage}
                eventDate={event.date}
              />
            );
          })}
      </div>

      <div className="container">
        <Typography gutterBottom variant="h4" component="div">
          {"Explore events"}
        </Typography>
      </div>
      <div className="container" marginTop="2px">
        {eventsList.map((event) => {
          return (
            <EventCard
              eventId={event.eventId}
              eventName={event.eventName}
              eventDetails={event.eventDetails}
              eventImage={event.eventImage}
              eventDate={event.date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Events;
