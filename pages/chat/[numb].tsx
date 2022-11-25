/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import style from '../../styles/Home.module.css'
import anex from '../../public/icon/anex.png'
import sender from '../../public/icon/sender.png'
import Image from 'next/image'
export default function Number() {
    const rt=useRouter()
    return (
  
      <div className={style.msgs}>
        <div className={style.titleContainer}>
          <img src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg" alt="ing" />
      <h1>{rt.query.numb}</h1>
        <button className={style.sender}>
          {'<-'}
        </button>
        </div>
    <div className={style.chating}>
      <div className={style.msghe}>
        <p>
          olá trouxa.
        </p>
      </div>
      <div className={style.msgyou}>
      <p>
          olá trouxa.
        </p>
      
      </div>
      <div className={style.msghe}>
        <p>
          olá trouxa.
        </p>
      </div>
      <div className={style.msgyou}>
      <p>
          olá trouxa.
        </p>
      
      </div>
      <div className={style.msghe}>
        <p>
          olá trouxa.
        </p>
      </div>
      <div className={style.msgyou}>
      <p>
          olá trouxa.
        </p>
      
      </div>
      <div className={style.msghe}>
        <p>
          olá trouxa.
        </p>
      </div>
      <div className={style.msgyou}>
      <p>
          olá trouxa.
        </p>
      
      </div>
      
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
  