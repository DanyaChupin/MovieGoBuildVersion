import type { GetStaticProps, NextPage } from 'next'
import Home from '@/components/screens/home/Home'
import '@/assets/styles/globals.scss'
import { IHome } from '@/components/screens/home/home.interface'
import { MovieService } from '@/services/movie.service'
import { ISlide } from '@/components/ui/slider/slider.interface'
import { getActorUrl, getMovieUrl } from '@/config/url.config'
import { getGenresList } from '@/utils/movie/getGenresList'
import { ActorService } from '@/services/actor.service'
import { IGallaryItem } from '@/components/ui/gallery/gallery.interface'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovie }) => {
	return (
		<Home slides={slides} actors={actors} trendingMovie={trendingMovie} />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const { data: dataActors } = await ActorService.getAll()
		const dataTrendingMovie = await MovieService.getMostPupularMovies()

		const trendingMovie: IGallaryItem[] = dataTrendingMovie
			.slice(0, 7)
			.map((m) => ({
				link: getMovieUrl(m.slug),
				name: m.title,
				posterPath: m.poster,
			}))

		const actors: IGallaryItem[] = dataActors.slice(0, 7).map((a) => ({
			link: getActorUrl(a.slug),
			name: a.name,
			posterPath: a.photo,
			content: {
				title: a.name,
				subTitle: `+${a.countMovies} movies`,
			},
		}))

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenresList(m.genres),
			title: m.title,
		}))
		return {
			props: {
				actors,
				slides,
				trendingMovie,
			} as IHome,
		}
	} catch (error) {
		return {
			props: { slides: [], actors: [], trendingMovie: [] },
		}
	}
}
export default HomePage
