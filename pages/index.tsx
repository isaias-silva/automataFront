import { redirect } from 'next/dist/server/api-utils'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Message from '../components/Message'
import styles from '../styles/Home.module.css'

export default function Home({ io }: any) {
  const route = useRouter()
  useEffect(() => {
    if (io) {
      io.on("connect_error", (err: Error) => {
        if (err.message == 'jwt expired' || err.message == 'jwt malformed') {

          route.push('/login')
        }
      })
    }

  })
  return (
    <>
      <h1>Automata universe</h1>
      <p>Bem-vindo à Automata, a plataforma de chatbot de última geração que permite que você crie chatbots personalizados para atender às necessidades do seu negócio.</p>
      <p>Com a Automata, você pode facilmente criar chatbots poderosos que podem ajudar seus clientes a encontrar as informações que precisam, fazer reservas, agendar reuniões, processar pagamentos e muito mais - tudo sem a necessidade de interação humana.</p>
 


    </>
  )
}
