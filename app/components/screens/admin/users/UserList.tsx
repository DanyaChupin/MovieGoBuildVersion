import AdminNavigation from '@/components/ui/adminNavigaton/AdminNavigation'
import AdminHeader from '@/components/ui/adminTable/adminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useUsers } from './useUsers'
import AdminTable from '@/components/ui/adminTable/AdminTable'

const UserList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } =
		useUsers()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			<AdminTable
				isLoading={isLoading}
				headerItems={['Email', 'Date register']}
				removeHandler={deleteAsync}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default UserList
