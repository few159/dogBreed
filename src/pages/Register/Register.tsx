import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userLogo from '../../assets/images/user.png'
import { useAuth } from '../../hooks/auth'

import styles from './Register.module.scss'

export default function Register() {
  const nav = useNavigate()
  const { login, verifyToken } = useAuth()
  const [keepLogin, setKeepLogin] = useState<boolean>(false)
  const [mail, setMail] = useState<string>('')

  useEffect(() => {
    verifyToken().then(isValid => {
      if (isValid) {
        nav('/list')
      }
    })

    
  }, [])

  return (
    <div className={styles.background}>
      <div className={styles.card}>

        <img src={userLogo} alt="Logo de usuário" />

        <div>
          <label>Email</label>
          <input type="email"
            onChange={(e) => { setMail(e.target.value) }}
            value={mail} />
        </div>

        <input type="button"
          value="Cadastro / Login"
          onClick={async (e) => {
              if(await login(mail, e, keepLogin)){
                toast.success('Logado!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });

                nav('/list')
              }
          }}
        />

        <div className={styles.checkDiv}>
          <input type="checkbox"
            name='keep'
            checked={keepLogin}
            onChange={e => setKeepLogin(e.target.checked)} />
          <label htmlFor="keep">Guardar login</label>
        </div>

      </div>
    </div>
  )
}