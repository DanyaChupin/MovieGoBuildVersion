import AdminNavigation from '@/components/ui/adminNavigaton/AdminNavigation'
import AdminHeader from '@/components/ui/adminTable/adminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import AdminTable from '@/components/ui/adminTable/AdminTable'
import { useGenres } from './useGenres'

const GenresList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		genres,
		deleteAsync,
		createAsync,
	} = useGenres()
	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				headerItems={['Name', 'Slug']}
				removeHandler={deleteAsync}
				tableItems={genres || []}
			/>
		</Meta>
	)
}

export default GenresList
