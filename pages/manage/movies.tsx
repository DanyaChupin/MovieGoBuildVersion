import MoviesList from '@/components/screens/admin/movies/MoviesList'
import { NextPageAuth } from '@/shared/types/auth.types'

const MovieListPage: NextPageAuth = () => {
	return <MoviesList />
}

MovieListPage.isOnlyAdmin = true

export default MovieListPage
