/* eslint-disable @next/next/no-img-element */
import style from '../styles/Home.module.css'
import genericImage from '../public/icon/img.png'
import Message from './Message'
import { Icontact } from '../interfaces/Icontact'
import Menu from './menu'
import { useEffect, useState } from 'react'
export default function Aside({ response, qr, messages, io }: { response: string, qr: string, messages: Icontact[], io: any }) {
        const [visible, setVisible] = useState(true)
     
        const treatRes = (res: string) => {
                switch (res) {
                        case 'connected':
                                return style.float
                        case 'loading':
                                return style.rotate
                        case 'phone closed session':
                                return style.float
                        default:
                                return ''
                }
        }

        const msgComponents = messages.map((item, i, arr) => {
                if (item.msgs) {
                        const format = item.msgs[item.msgs.length > 0 ? item.msgs.length - 1 : 0]
                        let isCall = false;
                        item.msgs.forEach((value) => {
                                if (value.type === 'warking') {
                                        return isCall = true

                                }
                        })
                        return <Message
                                isCall={isCall}
                                isGroup={item.isGroup}
                                chatName={item.name}
                                contactName={format?.name || format?.number || 'user'}
                                key={i}
                                text={format?.text ? format.text : `[${format?.type || 'tipo indefinido'}]`}
                                number={item.id || 'contact'}
                                img={item.picture || genericImage.src}
                                memberImg={format?.picture || genericImage.src}
                                size={item.msgs.length}
                        />
                }
        })
        return <aside className={visible?style.aside:style.asideInvisible} >

                {response == 'connected' ? <Menu io={io} /> : null}
                <button className={style.openBarButton} onClick={() => {
                        const response = visible ? false : true
                        setVisible(response)
                }}>&#11013;</button>
                <div className={style.image}>
                        <img src={qr} alt={"qr"} className={treatRes(response)} />

                </div>
                <p>{response} {response == 'phone closed session' ? ', please reload' : null}</p>

                <div className={style.messagesList}>

                        {msgComponents}
                </div>

        </aside>

}