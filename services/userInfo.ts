import api from "./axios"
import receivedToken from "./receivedToken"

export default async function userinfo() {
    const response = await api.get('/user/me')


    return response
}