import { FC } from 'react'
import { IMovie } from '@/shared/types/movie.types'
import styles from './Content.module.scss'
import ContentList from './ContentList/ContentList'
import { getActorUrl, getGenreUrl } from '@/config/url.config'
import MaterialIcon from '@/components/ui/MaterialIcon'
import FavoriteButton from '../favoriteButton/FavoriteButton'

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parameters.year}, </span>
				<span>{movie.parameters.country}, </span>
				<span>{movie.parameters.duration} min.</span>
			</div>
			<ContentList
				name="Genres"
				links={movie.genres.slice(0, 3).map((g) => ({
					_id: g._id,
					link: getGenreUrl(g.slug),
					title: g.name,
				}))}
			/>
			<ContentList
				name="Actors"
				links={movie.actors.slice(0, 3).map((a) => ({
					_id: a._id,
					link: getActorUrl(a.slug),
					title: a.name,
				}))}
			/>
			<div className={styles.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{movie.rating.toFixed(1)}</span>
			</div>
			<FavoriteButton movieId={movie._id}/>
			</div>
	)
}

export default Content
