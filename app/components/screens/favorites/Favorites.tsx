import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import FavoritesItem from './FavoritesItem'
import { useAuth } from '@/hooks/useAuth'
import Error404 from '../../../../pages/404'

const Favorites: FC = () => {
	const { user } = useAuth()
	if (!user) return <Error404 />
	const { isLoading, favoritesMovies } = useFavorites()
	return (
		<Meta title="Favorites">
			<Heading title="Favorites" />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoritesMovies?.map((movie) => (
						<FavoritesItem movie={movie} key={movie._id} />
					))
				)}
			</section>
		</Meta>
	)
}

export default Favorites
