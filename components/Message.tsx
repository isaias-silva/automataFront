/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from '../styles/Home.module.css'
export default function Message({
    onClick,
    number,
    isCall,
    text,
    img,
    memberImg,
    size,
    contactName,
    chatName,
    isGroup,
    visibleAside }: {
        onClick: Function,
        isCall: boolean,
        chatName?: string,
        number: string,
        text: string,
        img?: string,
        memberImg?: string,
        size: number,
        contactName?: string,
        isGroup: boolean,
        visibleAside: boolean
    }) {
    const [call, setCall] = useState(false)
    const [messagesNumb, setMessageNumb] = useState(0)

    let filterText = text

    if (filterText.length > 40) {
        filterText = filterText.substring(0, 40).concat('...')
    }
    useEffect(() => {

        setMessageNumb(size)
        setCall(isCall)

    }, [isCall, messagesNumb, size])

    return < Link href={`/chat/${number}`} className={visibleAside ? style.messageTiny : style.message} onClick={() => {
        onClick()
    }}>
        <div className={style.perfil}>

            {isGroup ? <>
                <img src={img} alt="" />
                {memberImg ? <img src={memberImg} alt="member" className={style.member} /> : null}
                {messagesNumb >= 1 ? <span className={style.numberMsgs}>{messagesNumb}</span> : null}

            </> :
                <>
                    <img src={img} alt="" />
                    {messagesNumb >= 1 ? <span className={style.numberMsgs}>{messagesNumb}</span> : null}
                </>
            }


        </div>
        {visibleAside ? null : <div>
            {isGroup ?
                <>
                    <h4>{chatName || 'unamed'}:</h4>
                    <p>{contactName ? <b>[{contactName}]: </b> : null}{filterText}</p>
                </> :
                <>
                    <h4>{chatName || 'unamed'}:</h4>
                    <p>{filterText}</p>

                </>}
            {call ? <span className={style.warkingSpan} onClick={() => { setCall(false) }}>  </span> : null}
        </div>}

    </Link >
}