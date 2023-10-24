import { useQuery } from 'react-query'
import axios from 'axios'


const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const fetchSuperFriends = () => {
    return axios.get('http://localhost:4000/friends')
}

export const RQParallelQueriesPage = () => {
    const {data: superheroes } = useQuery('super-hereos', fetchSuperHeroes)
    const {data: friends } = useQuery('friends', fetchSuperFriends)
    
    return <div>ParallelQueriesPage</div>
}