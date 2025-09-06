import { apiClient } from "./apiClient";

export const handelAuthentication = async ()  : Promise<boolean> => {
    try {
        const token = localStorage.getItem("user_token");
        if (!token) {
            return false;
        }
        const res = await apiClient.get("/auth/check-usr", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (res.status === 200) {
            return true;
        }
    } catch (err) {
        console.log(`Internal Server Error while Authenticate. : ${(err as Error).message}`)
        return false;
    }
    return false;
}