import { useState } from "react"
import { Link } from 'react-router-dom'
import { useSuperHereosData, addSuperHero, useAddSuperHeroData } from "../hooks/useSuperHereosData"

export const RQSuperHeroesPage = () => {
    const [name, setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')

    const onSuccess = (data) => {
        console.log('perfoem side effects after data fetching', data)
    }

    const onError = (error) => {
        console.log('perfoem side effects after encountering error', error)
    }

    const { isLoading, data, isError, error, refetch } = useSuperHereosData(onSuccess, onError)

    const { mutate: addHero } = useAddSuperHeroData()

    const handleAddHeroClick = () => {
        const hero = { name, alterEgo }
        addHero(hero)
    }

    if (isLoading) {
        return <h2>Loading ...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>RQ Super Hereos</h2>
            <div>
                <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type='text'
                    value={alterEgo}
                    onChange={e => setAlterEgo(e.target.value)}
                />
                <button onClick={handleAddHeroClick}>Add Hero</button>
            </div>
            {data?.data.map(hero => {
                return (
                    <div key={hero.id}>
                        <Link to={`/rq-super-heroes/${hero.id}`}>
                            {hero.id} {hero.name}
                        </Link>
                    </div>
                )
            })}
            {/* {data.map((heroName) => {
                return <div key={heroName}>{heroName}</div>
            })} */}
        </>
    )
}