/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import style from '../../styles/Home.module.css'
import anex from '../../public/icon/anex.png'
import sender from '../../public/icon/sender.png'
import Image from 'next/image'
import { Icontact } from "../../interfaces/Icontact"
import { useEffect, useState } from "react"

export default function Number({ messages, io }: any) {
  const [message, setMessage] = useState('')
  const rt = useRouter()
  const contact: Icontact = messages.filter((item: Icontact) => item.id == rt.query.numb)[0] || {}
  const messagesObjects: any = []


  if (contact.msgs) {

    contact.msgs.map(async (item) => {
      let base64Src
      if (item.media?.data) {
        base64Src = `data:image/jpeg;base64,${item.media.data}`

      }

      let element = contact.isGroup ?
        <div className={item.isMe ? style.msgyou : style.msghe}>
          {base64Src ?
            <div className={style.mediaChat}>
              {
                item.isMe ? null : <span className={style.titleChat}>{item.name}: </span>

              }

              <img src={base64Src} alt="image" className={style[item?.media?.type || 'default']} />
              <p>
                {item.text}
              </p>
            </div> :
            <div className={style.textMessage}>
              <p>
                <span className={style.titleChat}>{item.name}: </span>
                {item.text}
              </p>

            </div>}

        </div> :
        <div className={item.isMe ? style.msgyou : style.msghe}>
          {base64Src ?
            <div className={style.mediaChat}>
              <img src={base64Src} alt="image" className={style[item?.media?.type || 'default']} />
              <p>
                {item.text}
              </p>
            </div> :
            <div className={style.textMessage}>
              <p>

                {item.text}
              </p>

            </div>}
        </div>

      messagesObjects.push(element)
    })

  }
  return (

    <div className={style.msgs}>
      <div className={style.titleContainer}>
        <img src={contact.picture || 'nan'} alt="perfil" />
        <h1>{contact.name || 'erro'}</h1>
        <button className={style.sender}>
          {'<-'}
        </button>
      </div>
      <div className={style.chating}>

        {messagesObjects}

      </div>
      <div className={style.txt}>
        <button className={style.anex}>
          <Image src={anex} width={30} height={30} alt=""></Image>
          <input type="file" name="file" id="file" />
        </button>
        <textarea name="txt" id="txtarea" value={message} onChange={(ev) => { setMessage(ev.target.value) }}></textarea>
        <button className={style.sender} onClick={() => {

          io.emit('sendText', {
            type: 'text',
            number: rt.query.numb,
            text: message
          })
          setMessage('')
        }}>
          <Image src={sender} width={30} height={30} alt=""></Image>
        </button>
      </div>
    </div>

  )
}
