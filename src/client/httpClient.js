import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://dakiya.onrender.com/api",
});
