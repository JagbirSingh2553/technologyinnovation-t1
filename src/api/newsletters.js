import { httpClient } from "../client/httpClient";

const getNewsletters = () => {
    return httpClient.get("/retrieve-newsletters");
};

export const newslettersApi = {
    getNewsletters
};

