/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import style from '../../styles/Home.module.css'
import anex from '../../public/icon/anex.png'
import sender from '../../public/icon/sender.png'
import Image from 'next/image'
import { Icontact } from "../../interfaces/Icontact"

export default function Number({ messages }: any) {

  const rt = useRouter()
  const contact: Icontact = messages.filter((item: Icontact) => item.id == rt.query.numb)[0] || {}
  const messagesObjects: any = []
  if (contact.msgs) {
    contact.msgs.map((item) => {
      let element = contact.isGroup ? <div className={style.msghe}>

        <p> <strong>{item.name}: </strong>{item.text}</p>
      </div> : <div className={style.msghe}>

        <p>{item.text}</p>
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

        </button>
        <textarea name="txt" id="txtarea"></textarea>
        <button className={style.sender}>
          <Image src={sender} width={30} height={30} alt=""></Image>
        </button>
      </div>
    </div>

  )
}
