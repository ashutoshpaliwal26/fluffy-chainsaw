import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8000/v1/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

