import Catalog from '@/components/ui/catalogMovies/Catalog'
import { MovieService } from '@/services/movie.service'
import { IMovie } from '@/shared/types/movie.types'
import { GetStaticProps, NextPage } from 'next'

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Trending moves"
			description="Trending movies in excellent quality: legal, safe, without ads"
		/>
	)
}
export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getMostPupularMovies()
		return { props: { movies } }
	} catch (error) {
		return {
			notFound: true,
		}
	}
}
export default TrendingPage
