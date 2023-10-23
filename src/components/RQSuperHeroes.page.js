import { useSuperHereosData } from "../hooks/useSuperHereosData"
import { Link } from 'react-router-dom'

export const RQSuperHeroesPage = () => {
    const onSuccess = (data) => {
        console.log('perfoem side effects after data fetching', data)
    }

    const onError = (error) => {
        console.log('perfoem side effects after encountering error', error)
    }

    const { isLoading, data, isError, error } = useSuperHereosData(onSuccess, onError)

    if (isLoading) {
        return <h2>Loading ...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>RQ Super Hereos</h2>
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