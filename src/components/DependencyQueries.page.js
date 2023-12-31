import { useQuery } from 'react-query'
import axios from 'axios'


const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByEmail = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {
    const { data: user } = useQuery(['user', email], () =>
        fetchUserByEmail(email)
    )
    const channelId = user?.data.channelId

    const { data: courses } = useQuery(['courses', channelId], () =>
        fetchCoursesByEmail(channelId),
        {
            enabled: !!channelId
        }
    )
    console.log(courses)

    return <div>Dependency Queries Page</div>
}