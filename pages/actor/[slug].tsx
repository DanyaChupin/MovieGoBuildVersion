import Catalog from '@/components/ui/catalogMovies/Catalog'
import { MovieService } from '@/services/movie.service'
import { IActor, IMovie } from '@/shared/types/movie.types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error404 from '../404'
import { ActorService } from '@/services/actor.service'

interface IActorPage {
	movies: IMovie[]
	actor: IActor | undefined
}
const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
	return actor ? (
		<Catalog movies={movies || []} title={actor.name} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAll()
		const paths = actors.map((a) => ({
			params: { slug: a.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		}
	}
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await ActorService.getBySlug(
			String(params?.slug)
		)
		const { data: movies } = await MovieService.getByActor(actor._id)

		return { props: { movies, actor } }
	} catch (error) {
		return {
			notFound: true,
		}
	}
}
export default ActorPage
