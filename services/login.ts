import api from "./axios";

export default async function login (mail:string,pass:string) {
 const response=await api.post('/auth/login',{email:mail,password:pass})
   

   return response
}