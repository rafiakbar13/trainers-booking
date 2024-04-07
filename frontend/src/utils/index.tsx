import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL as string;

export const customFetch = axios.create({
  baseURL: BASE_URL,
});
