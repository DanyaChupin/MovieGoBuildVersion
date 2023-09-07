import { MovieService } from '@/services/movie.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { IMovie } from '@/shared/types/movie.types'
import cn from 'classnames'
import SubHeading from '@/components/ui/heading/SubHeading'
import styles from '../Admin.module.scss'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Link from 'next/link'
import { getMovieUrl } from '@/config/url.config'
import Image from 'next/image'
const PopularMovie: FC = () => {
	const { data: movie, isLoading } = useQuery(
		['popular movie in admin panel'],
		() => MovieService.getMostPupularMovies(),
		{
			select: (data): IMovie => data[0],
		}
	)
	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="The most popular movie" />
			{isLoading ? (
				<SkeletonLoader className="h-40" />
			) : (
				movie && (
					<>
						<h3> Opened {movie.countOpened} times</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<Image
								width={285}
								height={176}
								src={movie.bigPoster}
								alt={movie.title}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
