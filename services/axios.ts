import axios from "axios";
import receivedToken from "./receivedToken";
const token = receivedToken('keyToken')
const api = axios.create({
    headers: {
        Authorization: "Bearer "+token,
    },
    baseURL:'http://localhost:8081'
})

export default api