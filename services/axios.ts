import axios from "axios";
import receivedToken from "./receivedToken";
const api = axios.create({
    url:'http://localhost:8080/'
})

export default api