import { FC } from 'react'
import { useUpdateCountOpened } from './useUpdateCountOpened'
import { IMoviePage } from '../../../../pages/movie/[slug]'
import Meta from '@/utils/meta/Meta'
import Banner from '@/components/ui/banner/Banner'
import SubHeading from '@/components/ui/heading/SubHeading'
import Gallery from '@/components/ui/gallery/Gallery'
import Content from './Content/Content'

import dynamic from 'next/dynamic'
import { useRenderClient } from '@/hooks/useRenderClient'

const DynamicVideoPlayer = dynamic(() => import('@/ui/videoPlayer/VideoPlayer'))
const DynamicRateMovie = dynamic(() => import('./rateMovie/RateMovie'))



const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug)
	const { isRenderClient } = useRenderClient()
	return (
		<Meta title={movie?.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			{isRenderClient && (
				<>
					<DynamicVideoPlayer
						slug={movie.slug}
						videoSource={movie.videoUrl}
					/>
					<div className="mt-12">
						<SubHeading title="Similar" />
						<Gallery items={similarMovies} />
					</div>
					<DynamicRateMovie id={movie._id} slug={movie.slug} />
				</>
			)}

		</Meta>
	)
}

export default SingleMovie
