import { httpClient } from "../client/httpClient";

const login = (email, password) => {
    return httpClient.post("/login", { email, password });
};

export const authApi = {
    login,
};
