import axios from "axios";

export const api = axios.create({
  baseURL: "/temp",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_JSESSION}`,
  },
});
