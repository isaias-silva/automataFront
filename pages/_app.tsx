/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { useEffect, useState } from 'react'
import socket, { Socket } from 'socket.io-client'
import { useSocket } from '../hooks/useSocket'
import Cookie from 'js-cookie'
//images
import load from '../public/images/load.png'
import astronauta from '../public/images/astronaut.png'
import jwterro from '../public/icon/jwt.png'
import { Icontact } from '../interfaces/Icontact'
import { useRouter } from 'next/router'
import receivedToken from '../services/receivedToken'

export default function App({ Component, pageProps }: AppProps) {

  const [qr, setQr] = useState(load.src)
  const [response, setResponse] = useState('starting...')
  const [messages, setMessages]: Icontact[] | any = useState([])
  const route = useRouter()
  const [token, setToken]: any = useState(receivedToken('keyToken'))
  const io = useSocket('http://localhost:8080', token)



  useEffect(() => {

    if (io) {

      io.on('connect', () => {
        setQr(load.src)
        setResponse('loading')
        const id = Cookie.get('id')
        if (id) {
          return io.emit('start', id)

        } else {
          return io.emit('start')
        }


      })

      io.on("connect_error", (err: Error) => {
        setResponse(err.message)
        setQr(jwterro.src)

      })

      io.on("conn", (data: { status: 'qrcode' | 'authenticated' | 'connected' | 'loading' | 'phone closed session', qr?: string, id?: string }) => {
        if (data.status == 'qrcode' && data.qr) {
          setQr(data.qr)
        }
        if (data.status == 'authenticated' || data.status == 'connected') {
          setQr(astronauta.src)


        }
        if (data.id) {
          Cookie.set('id', data.id);

        }
        if (data.status == 'loading') {
          setQr(load.src)
        }
        if (data.status == 'phone closed session') {
          setQr('https://cdn-icons-png.flaticon.com/512/1128/1128911.png')
          Cookie.remove('id')
        }
        setResponse(data.status)

      });


      io.on('msg', (msgs: Icontact[]) => {

        setMessages(msgs)

      })
    }
  }, [io])





  return <Layout response={response} qr={qr} messages={messages} io={io}>
    <Component {...pageProps}
      messages={messages} io={io} />
  </Layout>
}
