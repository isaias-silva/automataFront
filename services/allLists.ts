import api from "./axios"
import receivedToken from "./receivedToken"

export default async function allList() {
    const token = receivedToken('keyToken')
    const response = await api.get('http://localhost:8080/contactlist/lists', {
        method:'GET',
        headers: {
            
            Authorization: "bearer "+token,
            

        }
    })


    return response
}