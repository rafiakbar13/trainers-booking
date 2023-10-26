import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const customFetch = axios.create({
    baseURL: BASE_URL,
});