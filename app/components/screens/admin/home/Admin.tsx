import { FC } from 'react'
import Meta from '@/utils/meta/Meta'
import Heading from '@/components/ui/heading/Heading'
import AdminNavigation from '@/components/ui/adminNavigaton/AdminNavigation'
import Statisctics from './statistics/Statisctics'

const Admin: FC = () => {
	return (
		<Meta title="Admin panel">
			<AdminNavigation />
			<Heading title="Some statistics" />
			<Statisctics />
		</Meta>
	)
}

export default Admin
