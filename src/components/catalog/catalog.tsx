import { useEffect, useState } from 'react'
import { IGetBreed } from '../../interfaces/breed'
import Pagination from '../pagination/pagination'
import styles from './Catalog.module.scss'

interface props {
    breed: IGetBreed

}
export default function Catalog({ breed }: props) {
    const [focusedImg, setFocusedImg] = useState<string>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [imagesLimitation, setImagesLimitation] = useState(10)

    function pageSelection(currentPage: number, limit: number) {
        const imagesUrls = breed.list.slice((currentPage - 1) * limit, currentPage * limit);

        return (
            imagesUrls.map(img => {
                return (
                    <div key={img} className={styles.image} onClick={() => { setFocusedImg(img) }}>
                        <img src={img} alt={`Imagem de ${breed.breed}`} />
                    </div>
                )
            })
        )
    }

    useEffect(() => {
      return () => {
        setCurrentPage(1)
      }
    }, [breed])
    

    return (
        <>
            <div className={styles.catalog}>
                <h1>{breed.breed}</h1>
                <div className={styles.images}>
                    {pageSelection(currentPage, imagesLimitation)}
                </div>

                <Pagination currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    breedArrayLength={breed.list.length} />
            </div>

            {
                focusedImg ?
                    <div className={styles.overlay} onClick={() => setFocusedImg(null)}>
                        <div>
                            <img src={focusedImg} />
                        </div>
                    </div>
                    : null
            }
        </>
    )
}