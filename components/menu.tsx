import { useState } from "react"
import style from '../styles/Home.module.css'
export default function Menu() {
    const [active, setActive] = useState(false)
    const conteudo = active == false ?
        <div>
            <button className={style.menubtn}>menu</button>
        </div>
        : <div>
            <button>x</button>
            <h4>nome</h4>
            <h4>mail</h4>
        </div>

    return <>
        {conteudo}
    </>
}