import { use, useEffect, useState } from 'react'
import allflux from '../services/allflux'
import style from '../styles/Home.module.css'

export default function Popup({ type, io }: any) {
    const [number, setNumber]: any = useState()
    const [numbers, setNumbers] = useState('')
    const [message, setMessage]: any = useState()
    const [fluxs, setFluxs] = useState()
    const [fluxid,setFluxId]:any=useState()
    useEffect(() => {
        allflux()
            .then((res) => {
                const elements = res.data.map((value: { _id: string, title: string }) => {

                    return <> <option value={value._id}>{value.title}</option></>
                })
                setFluxs(elements)
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }

                return null
            })

    }, []);

    const ioSend = (opt: 'message' | 'disparo' | 'flux') => {

        if (opt == 'message') {

            if (!number || !message) {
                alert("preencha todos os valores")
                return
            }
            io.emit('sendText', {
                type: 'text',
                number: `${number}@s.whatsapp.net`,
                text: message
            })

        }
        if (opt == 'disparo') {
            if (!numbers || !message) {
                alert("preencha todos os valores")
                return

            }
            const numbs = numbers.split(',').map((n) => n + '@s.whatsapp.net')
            io.emit('disparo', {
                numbers: numbs,
                message
            })
        }
        if (opt == 'flux') {
            if ( !fluxid) {
                alert("preencha todos os valores")
              
                return
            }
            const jid = number+ '@s.whatsapp.net'
            io.emit('flux', {
                listid:'aaa',
                fluxid
            })
        }
     
    }



    let component = <></>

    switch (type) {
        case 'message':
            component = <div>

                <h3>{type}</h3>
                <input type="number" placeholder='numero' onChange={(ev) => { setNumber(ev.target.value) }} />
                <textarea placeholder='mensagem' value={message ? message : ''} onChange={(ev) => { setMessage(ev.target.value) }} >

                </textarea>
                <button onClick={() => { ioSend('message') }}>enviar</button>

            </div>
            break
        case 'disparo':
            component = <div>
                <h3>{type}</h3>
                <p>disparo de mensagem para v??rios numeros</p>
                <input onChange={(ev) => { setNumbers(ev.target.value) }} type="text" placeholder='numeros separe por virgula' />
                <textarea placeholder='mensagem' value={message ? message : ''} onChange={(ev) => { setMessage(ev.target.value) }}>

                </textarea>
                <button onClick={() => { ioSend('disparo') }}>enviar</button>

            </div>
            break
        case 'flux':
            component = <div>
                <h3>{type}</h3>
                <p>disparo de fluxo para numero</p>
                <select onChange={(ev) => {setFluxId(ev.target.value) }} value={fluxid}>
                    {fluxs}
                </select>
             
            
                <button onClick={() => { ioSend('flux') }}>enviar</button>

            </div>
            break
        default:
            break
    }

    if (type != 'none') {
        return <div className={style.popup}>
            {component}

        </div>

    } else {
        return <></>
    }
}