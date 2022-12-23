import styles from '../styles/Home.module.css'

export default function Home({ io }: any) {
    return (
    <>
    <h1>Login</h1>
        <form className={styles.login} action="http://localhost:8080/user/login" method="post">
            <input type="mail" name="email" placeholder="email"/>
            <input type="password" name="senha" placeholder="senha"/>
            <button type="submit"> entrar</button>
        </form>
  
    </>
    )
  }