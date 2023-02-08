import Cookies from "js-cookie"

/* eslint-disable import/no-anonymous-default-export */
export default (key: string) => {
    if (typeof window !== 'undefined') {
       const token= Cookies.get(key)
       return token
    }
}