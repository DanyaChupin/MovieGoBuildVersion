import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { MovieService } from '@/services/movie.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import MovieList from './MovieList'

const PopularMovies: FC = () => {
	const { isLoading, data: popularMovies } = useQuery(
		['Popular movies in sidebar'],
		() => MovieService.getMostPupularMovies(),
		{
			select: (data) => data.slice(0, 3),
		}
	)

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/trending"
			movies={popularMovies || []}
			title="Popular Movies"
		/>
	)
}

export default PopularMovies
