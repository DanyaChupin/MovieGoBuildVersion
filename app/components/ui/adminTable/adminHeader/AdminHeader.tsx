import { ChangeEvent, FC } from 'react'
import styles from './AdminHeader.module.scss'
import SearchField from '../../search-field/SearchField'
import AdminCreateButton from './AdminCreateButton'

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const AdminHeader: FC<IAdminHeader> = ({
	onClick,
	searchTerm,
	handleSearch,
}) => {
	return (
		<div className={styles.header}>
			<SearchField handleSearch={handleSearch} searchTerm={searchTerm} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	)
}

export default AdminHeader
