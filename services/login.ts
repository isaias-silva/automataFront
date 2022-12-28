import api from "./axios";

export default async function login (mail:string,pass:string) {
 const response=await api.post('http://localhost:8080/user/login',{email:mail,senha:pass})
   

   return response
}