/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import style from '../../styles/Home.module.css'
import anex from '../../public/icon/anex.png'
import sender from '../../public/icon/sender.png'
import Image, { StaticImageData } from 'next/image'
import { Icontact } from "../../interfaces/Icontact"
import { useEffect, useState } from "react"

export default function Number({ messages, io }: any) {
  const [message, setMessage] = useState('')
  const [anexo, setAnex]: any = useState()
  const rt = useRouter()
  const contact: Icontact = messages.filter((item: Icontact) => item.id == rt.query.numb)[0] || {}
  const messagesObjects: any = []
  const upload = (ev: any) => {
    setAnex(ev.target.files[0])
  }

  if (contact.msgs) {

    contact.msgs.map(async (item) => {
      let base64Src
      if (item.media?.data) {
        base64Src = item.media.type == 'image' || item.media?.type == 'sticker' ?
          `data:image/jpeg;base64,${item.media.data}` : item.media?.type == 'audio' ?
            `data:audio/mp4;base64,${item.media.data}` : item.media.type == 'video' ?
              `data:video/mp4;base64,${item.media.data}`
              : item.type == 'doc' ? `data:application/;base64,${item.media.data}` : null

      }

      let element = contact.isGroup ?
        <div className={item.isMe ? style.msgyou : style.msghe}>
          {base64Src ?
            <div className={style.mediaChat}>
              {
                item.isMe ? null : <span className={style.titleChat}>{item.name}: </span>

              }
              {item.media?.type == 'image' || item.media?.type == 'sticker' ?
                <img src={base64Src} alt="image" className={style[item?.media?.type || 'default']} /> :
                item.media?.type == 'audio' ? <audio controls><source src={base64Src} /></audio> :
                  item.media?.type == 'video' ? <video controls> <source src={base64Src} /></video> : null
              }
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
              {item.media?.type == 'image' || item.media?.type == 'sticker' ?
                <img src={base64Src} alt="image" className={style[item?.media?.type || 'default']} /> :
                item.media?.type == 'audio' ? <audio controls><source src={base64Src} /></audio> :
                  item.media?.type == 'video' ? <video controls> <source src={base64Src} /></video> : null
              }
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
          <input type="file" name="file" id="file" onChange={upload} />
        </button>
        <textarea name="txt" id="txtarea" value={message} onChange={(ev) => { setMessage(ev.target.value) }}></textarea>
        <button className={style.sender} onClick={async () => {
          if (anexo) {
            alert('anex')

            const buff = await anexo.arrayBuffer()
            const types = anexo.type.split('/')
            console.log(types)
            const type = types[0] == 'image' ? 'picture' :
              types[0] == 'audio' ? 'audio' :
                types[0] == 'video' ? 'video' : 'document'
            console.log(types)

            if (!type) {
              alert('anexo não compativel')
              return
            }
            io.emit('upload', buff, {
              type: type,
              text: message,
              number: rt.query.numb,
              mimetype: anexo.type
            })
            setAnex(null)

          } else {
            alert('text')
            io.emit('sendText', {
              type: 'text',
              number: rt.query.numb,
              text: message
            })
            setMessage('')
          }
        }}>
          <Image src={sender} width={30} height={30} alt=""></Image>
        </button>
      </div>
    </div>

  )
}
