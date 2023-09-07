import { FC } from 'react'
import { usePopularGenres } from './usePopularGenres'
import Menu from '../Menu'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const GenresMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()

	return isLoading ? (
		<div className="mx-11 mb-6">
			<SkeletonLoader count={5} className="h-6 mt-6" />
		</div>
	) : (
		<Menu
			menu={{
				title: 'Popular genres',
				items: data || [],
			}}
		/>
	)
}

export default GenresMenu
