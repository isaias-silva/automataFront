import Cookies from "js-cookie";

import { use, useEffect, useState } from "react";
import userinfo from "../services/userInfo";
import style from "../styles/Home.module.css";
import Popup from "./popup";
export default function Menu({ io }: any) {
  const [active, setActive] = useState(false);
  const [popUp, setPopup] = useState("none");
  const [user, setUser] = useState<{ name: string, adm: boolean, email: string, profile: string }>();

  useEffect(() => {
    userinfo()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setActive(false);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }

        return null;
      });
  }, []);
  const logout = () => {
    io.emit("logout");
    Cookies.remove("id");
    Cookies.remove("keyToken");
  };

  const openPopUp = (value: "none" | "message" | "disparo" | "flux") => {
    setPopup(value);
  };
  const conteudo =
    active == false ? (
      <div>
        <button
          onClick={() => {
            setActive(true);
          }}
          className={style.menubtn}
        >
          &#8962;
        </button>
      </div>
    ) : (
      <div className={style.menubarr}>
        <button
          onClick={() => {
            setActive(false);
          }}
        >
          x
        </button>
        <h4>{user?.name || "nome"}</h4>
        <h4>{user?.email || "email"}</h4>
        <h4>{user?.adm?'Admin':'user'}</h4>
        <h4></h4>
        <div className={style.barrComands}>
          <h4>comandos</h4>
          <button
            onClick={() => {
              openPopUp("message");
            }}
          >
            mensagem para numero
          </button>
          <button
            onClick={() => {
              openPopUp("disparo");
            }}
          >
            disparo
          </button>
          <button
            onClick={() => {
              openPopUp("flux");
            }}
          >
            ir para fluxo
          </button>
          <a
            onClick={() => {
              logout();
            }}
            href={"./login"}
          >
            {" "}
            sair
          </a>
        </div>
      </div>
    );

  return (
    <>
      {conteudo}

      {popUp != "none" ? (
        <div className={style.tela}>
          <button
            className={style.closebtn}
            onClick={() => {
              setPopup("none");
            }}
          >
            x
          </button>
          <Popup
            closeFunction={() => {
              setPopup("none");
              setActive(false);
            }}
            type={popUp}
            io={io}
          />
        </div>
      ) : null}
    </>
  );
}
