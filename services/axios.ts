import axios from "axios";
import receivedToken from "./receivedToken";
const token = receivedToken('keyToken')
const api = axios.create({
    headers: {
        Authorization: "Bearer "+token,
    },
    baseURL:'https://api.zappchat.com.br'
})

export default api