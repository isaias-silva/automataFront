import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { useEffect, useState } from 'react'
import socket from 'socket.io-client'
import { useSocket } from '../hooks/useSocket'

//images
import load from '../public/images/load.png'
import astronauta from '../public/images/astronaut.png'
import jwterro from '../public/icon/jwt.png'
import { Icontact } from '../interfaces/Icontact'

export default function App({ Component, pageProps }: AppProps) {

  const [qr, setQr] = useState(load.src)
  const [response, setResponse] = useState('starting...')
  const [messages, setMessages]: Icontact[] | any = useState([])
  const io = useSocket('http://localhost:8080', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzE4NTEwMzZmZTUyZjEzZGJkYTZmZCIsIm5vbWUiOiJaYWNrIiwiY2xhc3NlIjoiYWRtIiwiZW1haWwiOiJpc2FpYXNnYXJyYWVsdXRhQGdtYWlsLmNvbSIsInZlcmlmeU1haWwiOnRydWUsImlhdCI6MTY2OTQ3OTE2MCwiZXhwIjoxNjY5NzM4MzYwfQ.z4YkzC7NUXbI0Gcix8EOZx-K6lt4NRMpISuFe_1zF1I')

  useEffect(() => {

    if (io) {

      io.on('connect', () => {
        setQr(load.src)
        setResponse('loading')

        
        return io.emit('start')


      })

      io.on("connect_error", (err) => {
        setResponse(err.message)
        setQr(jwterro.src)
      })

      io.on("conn", data => {
        if (data.status == 'qrcode') {
          setQr(data.qr)
        }
        if (data.status == 'authenticated' || data.status=='connected') {
          setQr(astronauta.src)
          
        }
        if(data.status=='loading'){
          setQr(load.src)
        }
        setResponse(data.status)

      });

      io.on('msg', (msgs: Icontact[]) => {

        setMessages(msgs)

      })
    }
  },[io])





  return <Layout response={response} qr={qr} messages={messages}>
    <Component {...pageProps}
      messages={messages} />
  </Layout>
}