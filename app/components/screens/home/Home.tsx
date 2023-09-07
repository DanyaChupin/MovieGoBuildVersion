import { FC } from 'react'
import { IHome } from './home.interface'
import Meta from '@/utils/meta/Meta'
import Heading from '@/components/ui/heading/Heading'
import Slider from '@/components/ui/slider/Slider'
import SubHeading from '@/components/ui/heading/SubHeading'
import Gallery from '@/components/ui/gallery/Gallery'

const Home: FC<IHome> = ({ slides, actors, trendingMovie }) => {
	return (
		<Meta
			title="MovieGo"
			description="Watch Movie online and TV shows or stream right to your browser."
		>
			<Heading
				title="Watch movies online"
				className="text-gray-300 mb-8 text-xl"
			/>
			{slides.length && <Slider slides={slides} />}
			{trendingMovie.length && (
				<div className="my-10">
					<SubHeading title="Trending now" />
					<Gallery items={trendingMovie} />
				</div>
			)}
			{actors.length && (
				<div className="my-10">
					<SubHeading title="Best actors" />
					<Gallery items={actors} />
				</div>
			)}
		</Meta>
	)
}

export default Home
