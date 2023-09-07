import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import { useRateMovie } from './useRateMovie'
import styles from './RatingMovie.module.scss'
import AuthButton from '@/components/ui/videoPlayer/AuthPlaceholder/AuthButton'
import StarRatingComponent from 'react-star-rating-component'

interface IRateMovie {
	id: string
	slug: string
}
const RateMovie: FC<IRateMovie> = ({ id, slug }) => {
	const { user } = useAuth()
	const { handleClick, isSended, rating } = useRateMovie(id)
	return (
		<div className={styles.wrapper}>
			<h3>How do you like the movie</h3>
			<p>Ratings improve recommendations</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>
							Thanks for rating!
						</div>
					) : (
						<StarRatingComponent
							name="star-rating"
							value={rating}
							onStarClick={handleClick}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateMovie
