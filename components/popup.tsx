import style from '../styles/Home.module.css'

export default function Popup({type}:any){
    if(type!='none'){
    return <div className={style.popup}>
        <div>
        <h1>{type}</h1>
        <input type="number" placeholder='numero'/>
        <textarea placeholder='mensagem'>

        </textarea>
        </div>
        
    </div>

    }else{
        return <></>
    }
}