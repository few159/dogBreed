import styles from './Pagination.module.scss'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { Dispatch, SetStateAction } from 'react'

interface props {
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>
    breedArrayLength: number
}
export default function Pagination({currentPage, setCurrentPage, breedArrayLength} : props) {
    return (
        <div className={styles.pagination}>
            {currentPage > 1 ? <span onClick={() => setCurrentPage(currentPage - 1)}><IoChevronBackOutline /></span> : null}
            <span>{currentPage}</span>
            {currentPage < (Math.ceil(breedArrayLength / 10)) ? <span onClick={() => setCurrentPage(currentPage + 1)}><IoChevronForwardOutline /></span> : null}
        </div>
    )
}