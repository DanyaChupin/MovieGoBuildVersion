import { FC } from 'react'
import { IMovieList } from './movieList.interface'
import styles from './MovieList.module.scss'
import MovieItem from './MovieItem'
import Link from 'next/link'

const MovieList: FC<IMovieList> = ({ movies, title, link }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link className={styles.button} href={link}>
				See more
			</Link>
		</div>
	)
}

export default MovieList
