/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import style from '../styles/Home.module.css'
export default function Message({
    number,
   isCall,
    text,
    img,
    memberImg,
    size,
contactName,
chatName,
isGroup}: {
    isCall:boolean,
        chatName?:string,
        number: string,
        text: string,
        img?: string,
        memberImg?: string,
        size:number,
       contactName?:string
       isGroup:boolean
    }) {

    let filterText = text
    if (text.length > 50) {
        filterText = text.substring(0, 50) + '...'
    }
    return <Link href={`/chat/${number}`} className={style.message}>
        <div className={style.perfil}>
         {isGroup?<>
         
              <img src={img} alt="" />
              {memberImg?<img src={memberImg} alt="member" className={style.member}/>:null}
              {size>1?<span className={style.numberMsgs}>{size}</span>:null}
           
         
         </>:
         <>
              <img src={img} alt="" />
              {size>1?<span className={style.numberMsgs}>{size}</span>:null}
          
         </>
         } 

          
        </div>
        <div>
            {isGroup?
            <>
            <h4>{chatName||'unamed'}:</h4>
            <p>{contactName?<b>[{contactName}]: </b>:null}{filterText}</p>
            </>:
            <>
            <h4>{chatName||'unamed'}:</h4>
            <p>{text}</p>
            
            </>}
            {isCall?<span className={style.warkingSpan}>  </span>:null}
        </div>
    </Link>
}