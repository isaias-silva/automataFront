import axios from "axios";
import receivedToken from "./receivedToken";
const token = receivedToken('keyToken')
const api = axios.create({
    headers: {
        Authorization: "Bearer "+token,
    },
    baseURL:'http://localhost:8080'
})

export default api