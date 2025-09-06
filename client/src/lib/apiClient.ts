import axios from "axios"

export const apiClient = axios.create({
    baseURL : "https://fluffy-chainsaw-50w2.onrender.com/v1/api"
})