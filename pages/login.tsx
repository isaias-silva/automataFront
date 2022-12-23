import { AxiosError } from 'axios'
import { useState } from 'react'
import axios from '../services/axios'
import login from '../services/login'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [mail, getMail] = useState('')
    const [pass, getPass] = useState('')
    const [response,getResponse]:any=useState()
    const checkLogin = async () => {
    try{
       const response= await login(mail,pass)
         getResponse(response.data)     
    }catch(err:any){
        getResponse(err.response.data)
    }
        }

    return (
        <>
            <h1>Login</h1>
            <div className={styles.login}>
                <input onChange={(ev) => { getMail(ev.target.value) }} type="mail" name="email" placeholder="email" />
                <input onChange={(ev) => { getPass(ev.target.value) }} type="password" name="senha" placeholder="senha" />
                <button type="submit" onClick={checkLogin}> entrar</button>
                <h4>{response?.message||'resposta'}</h4>
            </div>

        </>
    )
}