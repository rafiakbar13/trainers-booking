import axios from "axios";

const BASE_URL = process.env.VITE_API_URL;

export const customFetch = axios.create({
  baseURL: BASE_URL,
});
