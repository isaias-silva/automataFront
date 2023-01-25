/* eslint-disable @next/next/no-img-element */
import style from '../styles/Home.module.css'
import genericImage from '../public/icon/img.png'
import Message from './Message'
import { Icontact } from '../interfaces/Icontact'
import Menu from './menu'
export default function Aside({ response, qr, messages,io }: { response: string, qr: string, messages: Icontact[],io:any }) {
        const treatRes = (res: string) => {
                switch (res) {
                        case 'connected':
                                return style.float
                        case 'loading':
                                return style.rotate
                        default:
                                return ''
                }
        }

        const msgComponents = messages.map((item, i, arr) => {
                if (item.msgs) {
                        const format = item.msgs[item.msgs.length > 0 ? item.msgs.length - 1 : 0]
                        let isCall=false;
                        item.msgs.forEach((value)=>{
                                value.type==='warking'
                                return isCall=true
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
        return <aside className={style.aside}>
                {response == 'connected' ? <Menu io={io} /> : null}
                <div className={style.image}>
                        <img src={qr} alt={"qr"} className={treatRes(response)} />

                </div>
                <p>{response}</p>
                <div className={style.messagesList}>

                        {msgComponents}
                </div>

        </aside>

}