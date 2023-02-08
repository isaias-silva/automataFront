import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import login from '../services/login'
import styles from '../styles/Home.module.css'

export default function Login({ io }: any) {
  
    const [mail, setMail] = useState('')
    const [pass, setPass] = useState('')
    const [response,setResponse]:any=useState()
    const route=useRouter()
    const checkLogin = async () => {
        
    try{
       const response= await login(mail,pass)
 
         setResponse(response)
    }catch(err:any){
        
        setResponse(err.response)
    }
        }
    useEffect(()=>{
        if(response?.data?.message){
         

        }
        if(response?.data?.token){
           
            Cookies.set('keyToken', response.data.token);
            route.reload()
           route.push('/')

        }
    },[response,route])
    useEffect(()=>{
        if(io){
            io.on('connect',()=>{
                route.push('/')
            })
        }
    })
    return (
        <>
            <h1>Login</h1>
            <div className={styles.login}>
                <input onChange={(ev) => { setMail(ev.target.value) }} type="mail" name="email" placeholder="email" />
                <input onChange={(ev) => { setPass(ev.target.value) }} type="password" name="senha" placeholder="senha" />
                <button type="submit" onClick={checkLogin}> entrar</button>
               
            </div>

        </>
    )
}