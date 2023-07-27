import { httpClient } from "../client/httpClient";

const submitFeedback = (name, email, subject, message) => {
  return httpClient.post("/feedback", { name, email, subject, message });
};

export const feedbackApi = {
  submitFeedback,
};