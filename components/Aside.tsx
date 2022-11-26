/* eslint-disable @next/next/no-img-element */
import style from '../styles/Home.module.css'
import genericImage from '../public/icon/img.png'
import Message from './Message'
import { Icontact } from '../interfaces/Icontact'
export default function Aside({ response, qr, messages }: { response: string, qr: string, messages: Icontact[] }) {
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
                        return <Message
                                isGroup={item.isGroup}
                                chatName={item.name}
                                contactName={format?.name || format?.number ||'user'}
                                key={i}
                                text={format?.text ? format.text : `[${format?.type||'tipo indefinido'}]`}
                                number={item.id || 'contact'}
                                img={item.picture || genericImage.src}
                                memberImg={item.groupMemberPicture || genericImage.src}
                                size={item.msgs.length}
                        />
                }
        })
        return <aside className={style.aside}>
                <div className={style.image}>
                        <img src={qr} alt={"qr"} className={treatRes(response)} />

                </div>
                <p>{response}</p>
                <div className={style.messagesList}>

                        {msgComponents}
                </div>

        </aside>

}