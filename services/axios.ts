import axios from "axios";
import receivedToken from "./receivedToken";
const api = axios.create({
    baseURL: 'http://localhost:8080/'
})

api.interceptors.request.use(async config => {
    // Declaramos um token manualmente para teste.
    config.headers = { 
        'Authorization': `Bearer ${receivedToken('keyToken')}`,
      }
      return config;
});

export default api