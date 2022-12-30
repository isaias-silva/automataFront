import { redirect } from 'next/dist/server/api-utils'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Message from '../components/Message'
import styles from '../styles/Home.module.css'

export default function Home({ io }: any) {
  const route=useRouter()
  useEffect(()=>{
    if(io){
      io.on("connect_error", (err:Error) => {
        if(err.message=='jwt expired' || err.message=='jwt malformed'){
          
          route.push('/login')
        }
      })
    }
   
  })
  return (
  <>
  <h1>Automata universe</h1>
  <p>automata universe, converse e automatize... tudo é automatizavel...</p>

  </>
  )
}
