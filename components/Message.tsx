/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import style from '../styles/Home.module.css'
export default function Message({
    number,
    text,
    img,
    memberImg,size,
contactName,chatName }: {
        chatName?:string,
        number: string,
        text: string,
        img?: string,
        memberImg?: string,
        size:number,
       contactName?:string
    }) {

    let filterText = text
    if (text.length > 50) {
        filterText = text.substring(0, 50) + '...'
    }
    return <Link href={`/chat/${number}`} className={style.message}>
        <div className={style.perfil}>
            <img src={img} alt="" />
            {memberImg?<img src={memberImg} alt="member" className={style.member}/>:null}
            {size>1?<span className={style.numberMsgs}>{size}</span>:null}
        </div>
        <div>
            <h4>{chatName||'unamed'}:</h4>
            <p>{contactName?<b>[{contactName}]: </b>:null}{filterText}</p>
        </div>
    </Link>
}