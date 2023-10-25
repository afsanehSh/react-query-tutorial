import { useQuery, useMutation, QueryClient, useQueryClient } from "react-query";
import axios from 'axios'


const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
    return axios.post('http://localhost:4000/superheroes', hero)
}

export const useSuperHereosData = (onSuccess, onError) => {
    return useQuery(
        'super-heroes',
        fetchSuperHeroes,
        {
            onSuccess,
            onError,
            // select: (data) => {
            //     const superHeroNames = data.data.map((hero) => hero.name)
            //     return superHeroNames
            // }
        }
    )
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient()

    return useMutation(addSuperHero, {
        /**Optimistic Update Start */
        onMutate: async newHero => {
            await queryClient.cancelQueries('super-heroes')
            const previousHeroData = queryClient.getQueryData('super-heroes')
            queryClient.setQueryData('super-heroes', oldQueryData => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        { id: oldQueryData?.data?.length + 1, ...newHero }
                    ]
                }
            })
            return { previousHeroData }
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        }
        /**Optimistic Update End */
    })
}