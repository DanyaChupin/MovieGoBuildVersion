import { useAuth } from '@/hooks/useAuth'
import { UserService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useFavorites = () => {
	const { user } = useAuth()

	const {
		isLoading,
		data: favoritesMovies,
		refetch,
	} = useQuery(['favorite movies'], () => UserService.getFavorites(), {
		select: ({ data }) => data,
		enabled: !!user,
	})
	return {
		isLoading,
		favoritesMovies,
		refetch,
	}
}
