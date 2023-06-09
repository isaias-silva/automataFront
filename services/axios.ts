import axios from "axios";
import receivedToken from "./receivedToken";
const api = axios.create({
   
    baseURL:'http://localhost:8081'
})

export default api