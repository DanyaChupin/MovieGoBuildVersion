import { useFavorites } from '@/components/screens/favorites/useFavorites'
import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import NotAuthFavorites from './NotAuthFavorites'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import MovieList from '../MovieList'
import { useRenderClient } from '@/hooks/useRenderClient'

const FavoriteMovies: FC = () => {
	const { user } = useAuth()
	const { isLoading, favoritesMovies } = useFavorites()

	const { isRenderClient } = useRenderClient()
	if (!user) return <NotAuthFavorites />

	if (isRenderClient)
		return isLoading ? (
			<div className="mt-11">
				<SkeletonLoader count={3} className="h-28 mb-4" />
			</div>
		) : (
			<MovieList
				movies={favoritesMovies?.slice(0, 3) || []}
				title="Favorites movie"
				link="/favorites"
			/>
		)
}

export default FavoriteMovies
