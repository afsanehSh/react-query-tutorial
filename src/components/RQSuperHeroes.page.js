import { useQuery } from "react-query";
import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes1')
}

export const RQSuperHeroesPage = () => {
    const onSuccess = (data) => {
        console.log('perfoem side effects after data fetching', data)
    }

    const onError = (error) => {
        console.log('perfoem side effects after encountering error', error)
    }

    const { isLoading, data, isError, error, refetch } = useQuery(
        'super-heroes',
        fetchSuperHeroes,
        {
            enabled: false,
            onSuccess,
            onError,
            select: (data) => {
                const superHeroNames = data.data.map((hero) => hero.name)
                return superHeroNames
            }
        }
    )

    if (isLoading) {
        return <h2>Loading ...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>RQ Super Hereos</h2>
            <button onClick={refetch}>fetch data</button>
            {data.map((heroName) => {
                return <div key={heroName}>{heroName}</div>
            })
            }
        </>
    )
}