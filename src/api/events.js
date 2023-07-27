import { httpClient } from "../client/httpClient";

const getEvents = () => {
  return httpClient.get("/events");
};

export const eventsApi = {
  getEvents,
};
