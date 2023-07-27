import { httpClient } from "../client/httpClient";

const register = (name, email, password) => {
    return httpClient.post("/registration", { name, email, password });
};

export const authApi = {
    register,
};
