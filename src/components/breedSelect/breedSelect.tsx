import { useState } from "react"
import Select from "react-select"
import styles from './BreedSelect.module.scss'

interface props {
    breedChange: (value: { value: string, label: string }) => Promise<void>
}
export default function BreedSelect({ breedChange }: props) {
    const [breedOptions, setBreedOptions] = useState<Array<{ value: string, label: string }>>([
        {
            label: 'Chihuahua',
            value: 'chihuahua'
        },
        {
            label: 'Husky',
            value: 'husky'
        },
        {
            label: 'Pug',
            value: 'pug'
        },
        {
            label: 'Labrador',
            value: 'labrador'
        },
    ])
    const [breedSelected, setBreedSelected] = useState<{ value: string, label: string }>({
        label: 'Chihuahua',
        value: 'chihuahua'
    })


    async function onSelectChange(newBreed: { value: string, label: string }) {
        setBreedSelected(newBreed)
        await breedChange(newBreed)
    }
    
    return (
        <div className={styles.select}>
            <Select
                options={breedOptions}
                onChange={(e) => e != null ? onSelectChange(e) : null}
                placeholder={'Escolha a raça'}
                value={breedSelected}
                menuPlacement={'auto'}
            />
        </div>
    )
}