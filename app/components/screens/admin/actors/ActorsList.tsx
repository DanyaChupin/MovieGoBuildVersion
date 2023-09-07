import AdminNavigation from '@/components/ui/adminNavigaton/AdminNavigation'
import AdminHeader from '@/components/ui/adminTable/adminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useActors } from './useActors'
import AdminTable from '@/components/ui/adminTable/AdminTable'

const ActorsList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useActors()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				headerItems={['Name', 'Count movies']}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default ActorsList
