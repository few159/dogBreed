import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { IGetBreed } from '../../interfaces/breed'
import { httpRequest } from '../../providers/customAxios/customAxios'
import Select, { ActionMeta, MultiValue, OnChangeValue } from "react-select"
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import styles from './List.module.scss'
import Pagination from '../../components/pagination/pagination'
import Catalog from '../../components/catalog/catalog'
import BreedSelect from '../../components/breedSelect/breedSelect'

export default function List() {
  const nav = useNavigate()
  const { token, verifyToken } = useAuth()

  const [breed, setBreed] = useState<IGetBreed>(null)

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
    console.log({ breedResponse })

    setBreed(breedResponse)
  }

  async function breedChange(newBreed: { value: string, label: string }) {
    await getBreed(newBreed.value)
  }

  return (
    <div className={styles.background}>
      {
        breed ?
          <Catalog breed={breed} />
          : <h1>Wait...</h1>
      }

      <BreedSelect breedChange={breedChange} />
    </div>
  )
}