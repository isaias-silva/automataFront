import api from "./axios"
import receivedToken from "./receivedToken"

export default async function userinfo() {
    const token = receivedToken('keyToken')
    const response = await api.get('http://localhost:8080/user/me', {
        method:'GET',
        headers: {
            
            Authorization: "bearer "+token,
            

        }
    })


    return response
}