import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { IGetBreed } from '../../interfaces/breed'
import { httpRequest } from '../../providers/customAxios/customAxios'
import styles from './List.module.scss'
import Catalog from '../../components/catalog/catalog'
import BreedSelect from '../../components/breedSelect/breedSelect'

import load from '../../assets/images/loading.gif'
// import load from 'src/assets/images/loading.gif'

export default function List() {
  const nav = useNavigate()
  const { token, verifyToken } = useAuth()

  const [breed, setBreed] = useState<IGetBreed>(null)
  const [showLoad, setShowLoad] = useState<boolean>(false)

  useEffect(() => {
    verifyToken().then(async isValid => {
      if (!isValid) {
        nav('/')
        return
      }
      await getBreed()
    })
  }, [token])

  async function getBreed(breed?: string) {
    if(!token) return
    let url = 'https://dogbreed-api.q9.com.br/list'
    if (breed) url += '?breed=' + breed

    const { data: breedResponse } = await httpRequest.get<IGetBreed>(url, { headers: { 'Authorization': token, 'Access-Control-Allow-Origin': '*' } })

    setBreed(breedResponse)
  }

  async function breedChange(newBreed: { value: string, label: string }) {
    setShowLoad(true)
    await getBreed(newBreed.value)
    setShowLoad(false)
  }

  return (
    <div className={styles.background}>
      {
        breed && !showLoad ?
          <Catalog breed={breed} />
          : <img src={load} className={styles.load}></img>
      }

      <BreedSelect breedChange={breedChange} />
    </div>
  )
}