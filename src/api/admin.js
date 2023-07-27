import { httpClient } from "../client/httpClient";

const loginAdmin = (email, password) => {
    return httpClient.post("/admin/login", { email, password });
};

const getDashboardData = () => {
    return httpClient.get("/admin/dashdata");
};

const createEvent = (eventData) => {
    return httpClient.post("/events", eventData);
};
const createNewsletter = (newsletterData) => {
    return httpClient.post("/create-newsletter", newsletterData);
};
const sendNewsletter = (newsletterId) => {
  return httpClient.post(`/send-newsletter/${newsletterId}`);
};
const getNewsletters = () => {
    return httpClient.get("/retrieve-newsletters");
};

export const adminApi = {
    loginAdmin,
    getDashboardData,
    createEvent,
    createNewsletter,
    sendNewsletter,
    getNewsletters
};

