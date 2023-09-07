import { FC } from 'react'
import PopularMovies from './PopularMovies'
import dynamic from 'next/dynamic'

const DynamicFavoriteMovies = dynamic(
	() => import('./favoritesMovies/FavoriteMovies')
)

const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovies />
			<DynamicFavoriteMovies />
		</div>
	)
}

export default MoviesContainer
