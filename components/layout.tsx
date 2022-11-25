import { useEffect, useState } from 'react'
import socket from 'socket.io-client'
import style from '../styles/Home.module.css'
import Aside from './Aside'
import { useSocket } from '../hooks/useSocket'

//images
import load from '../public/images/load.png'
import astronauta from '../public/images/astronaut.png'
import jwterro from '../public/icon/jwt.png'
import { Icontact } from '../interfaces/Icontact'


export default function Layout({ children }: any) {
  const [qr, setQr] = useState(load.src)
  const [response, setResponse] = useState('starting...')
  const [messages, setMessages]: Icontact[] | any = useState([])
  const io = useSocket('http://localhost:8080','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzE4NTEwMzZmZTUyZjEzZGJkYTZmZCIsIm5vbWUiOiJaYWNrIiwiY2xhc3NlIjoiYWRtIiwiZW1haWwiOiJpc2FpYXNnYXJyYWVsdXRhQGdtYWlsLmNvbSIsInZlcmlmeU1haWwiOnRydWUsImlhdCI6MTY2OTIxNzM5NywiZXhwIjoxNjY5NDc2NTk3fQ.lVEP_fHox5XK3JbsdlxOUnq9gWUbT4MHS2w5B8OWYxk')

  useEffect(() => {

    if (io) {

      io.on('connect', () => {
        setQr(load.src)
        setResponse('loading')
        const id = localStorage.getItem('id')
        if (id) {
          io.emit('start', id)

        } else {
          io.emit('start')

        }
      })

      io.on("connect_error", (err) => {
        setResponse(err.message)
        setQr(jwterro.src)
      })

      io.on("conn", data => {
        if (data.status == 'qrcode') {
          setQr(data.qr)
        }
        if (data.status == 'authenticated') {
          setQr(astronauta.src)
          localStorage.setItem('id', data.id)
        }
        setResponse(data.status)

      });

      io.on('msg', (msgs: Icontact[]) => {

        setMessages(msgs)
        localStorage.setItem('msg',JSON.stringify(messages))
      })
    }
  })




  return <>
    <Aside response={response}
      qr={qr}
      messages={messages} />
    <section className={style.section}>
      {children}
    </section>
  </>
}
