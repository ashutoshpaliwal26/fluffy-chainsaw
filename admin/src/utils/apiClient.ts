import axios, { AxiosError, isAxiosError } from "axios";

export interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

const apiClient = axios.create({
    baseURL: "http://localhost:8000/v1/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const handelError = (err : Error | AxiosError) => {
    if(axios.isAxiosError(err)){
        if(err.response){
            return err.response
        }
    } 
    return err.message
}

export default apiClient;
