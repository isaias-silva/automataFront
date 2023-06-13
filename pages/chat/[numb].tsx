/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import style from '../../styles/Home.module.css'
import anex from '../../public/icon/anex.png'
import sender from '../../public/icon/sender.png';
import back from '../../public/icon/return.png';
import Image from 'next/image'
import { Icontact } from "../../interfaces/Icontact"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"


import Link from "next/link"

export default function Number({ messages, io }: any) {
  const [message, setMessage] = useState<string>('')
  const [anexo, setAnex] = useState<File | null>(null)
  const [contact, setContact] = useState<Icontact | null>(null);
  const rt = useRouter()
  const targetRef = useRef<HTMLParagraphElement>(null);

  const messagesObjects: any = []

  const upload = (ev: any) => {
    setAnex(ev.target.files[0])
  }

  const goToContactRoute = useCallback(() => {
    const contactExist: Icontact = messages.filter((item: Icontact) => item.id == rt.query.numb)[0] || null
    return contactExist

  }, [messages, rt.query.numb])

  const sendMessage = async () => {

    if (anexo) {

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
      io.emit('sendMedia', buff, {
        type: type,
        text: message,
        phone: rt.query.numb,
        mimetype: anexo.type,

      })
      setAnex(null)
      setMessage('')
    } else {
      if (message == '') {
        return
      }
      io.emit('sendText', {
        type: 'text',
        phone: rt.query.numb,
        text: message
      })
      setMessage('')
    }

  }
  useEffect(() => {

    setContact(goToContactRoute())
    handleClick()
    const size = contact?.msgs?.filter(msg => msg.read == false)?.length
    if (size && size > 0) {
      io.emit('messageConfig', { id: contact?.id, read: true })


    }

  }, [contact, goToContactRoute, io, messages, rt])


  function handleClick() {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }


  //ALERTA EMARANHADO DE CODIGO COMPLETAMENTE INSANO ABAIXO
  if (contact?.msgs) {

    contact?.msgs.map(async (item) => {
      let base64Src
      if (item.media?.data) {

        base64Src = `data:${item.media.mimetype};base64,${item.media.data}`

      }
      const texts = item?.text?.split('\n')
      const textformat = texts?.map((paragraph, key) => {
        return <p key={key}>{paragraph}</p>
      })
      let element =
        item.type === 'warking' ?
          <div className={style.warkingUser}>
            <p> {item.text}</p>
          </div>
          :


          contact?.isGroup ?
            <div className={item.isMe ? style.msgyou : style.msghe}>
              {item.quoted ?
                <div className={style.quoted}><p>{item.msgQuoted?.text || '[' + item.msgQuoted?.type + ']'}</p></div> : null}
              {base64Src ?
                <div className={style.mediaChat}>
                  {
                    item.isMe ? null : <span className={style.titleChat}>{item.name}: </span>

                  }
                  {item.media?.type == 'image' || item.media?.type == 'sticker' ?
                    <img src={base64Src} alt="image" className={style[item?.media?.type || 'default']} /> :
                    item.media?.type == 'audio' ? <audio controls><source src={base64Src} /></audio> :
                      item.media?.type == 'video' ? <video controls> <source src={base64Src} /></video> :
                        item.media?.type == 'document' && item.media.mimetype == "application/pdf" ? <iframe src={base64Src}></iframe> :
                          <span className={style.warking}>arquivo não suportado, <a href={base64Src} target="_blank" rel="noreferrer">{'clique aqui '}</a>
                            para baixar.</span>
                  }
                  <p>
                    {item.text}
                  </p>
                </div> :
                <div className={style.textMessage}>
                  <div>
                    <span className={style.titleChat}>{item.name}: </span>
                    {textformat}
                  </div>

                </div>}

            </div> :
            <div className={item.isMe ? style.msgyou : style.msghe}>
              {


                item.quoted ?

                  <div className={style.quoted}><p>{item.msgQuoted?.text || item.msgQuoted?.type}</p></div> : null}
              {base64Src ?
                <div className={style.mediaChat}>
                  {item.media?.type == 'image' || item.media?.type == 'sticker' ?
                    <img src={base64Src} alt="image" className={style[item?.media?.type || 'default']} /> :
                    item.media?.type == 'audio' ? <audio controls><source src={base64Src} /></audio> :
                      item.media?.type == 'video' ? <video controls> <source src={base64Src} /></video> :
                        item.media?.type == 'document' && item.media.mimetype == "application/pdf" ? <iframe src={base64Src} ></iframe> :
                          <span className={style.warking}>arquivo não suportado, <a href={base64Src} target="_blank" rel="noreferrer">{'clique aqui '}</a>
                            para baixar.</span>
                  }
                  <div>
                    {textformat}
                  </div>
                </div> :

                <div className={style.textMessage}>
                  <div>
                    {textformat}
                  </div>


                </div>}
            </div>

      messagesObjects.push(element)
    })

  }
  return (

    <div className={style.msgs}>
      <div className={style.titleContainer}>
        <img src={contact?.picture || 'nan'} alt="perfil" />
        <h1>{contact?.name || 'erro'}</h1>
        <Link href={'/'} className={style.linkReturn}>
          <Image src={back} width={30} height={30} alt=""></Image>
        </Link>
      </div>
      <div className={style.chating}>

        {messagesObjects}
        <div ref={targetRef} id='foot'></div>
      </div>
      <div className={style.txt}>
        {anexo ?
          <div className={style.anexInfo}>
            <p>{anexo?.name || 'arquivo'}</p>
            <button onClick={() => { setAnex(null) }}>
              x
            </button>
          </div>
          : null}
        <button className={style.anex}>
          <Image src={anex} width={30} height={30} alt=""></Image>
          <input type="file" name="file" id="file" onChange={upload} />
        </button>
        <textarea name="txt" id="txtarea" value={message} onChange={(ev) => { setMessage(ev.target.value) }}></textarea>
        <button className={style.sender} onClick={sendMessage}>
          <Image src={sender} width={30} height={30} alt=""></Image>
        </button>
      </div>
    </div>

  )
}


