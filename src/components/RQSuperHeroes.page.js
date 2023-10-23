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
            onError
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
            {data?.data.map(hero => {
                return <div key={hero.name}>{hero.name}</div>
            })
            }
        </>
    )
}