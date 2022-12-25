/* eslint-disable import/no-anonymous-default-export */
export default (key: string) => {
    if (typeof window !== 'undefined') {
       const token= window.localStorage.getItem(key)
       return token
    }
}