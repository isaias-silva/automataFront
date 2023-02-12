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


export default function Layout({ children, response, qr, messages, io }: any) {




  return <div className={style.content}>
    <Aside response={response}
      qr={qr}
      messages={messages}
      io={io} />
    <section className={style.section}>
      {children}
    </section>
  </div>
}
