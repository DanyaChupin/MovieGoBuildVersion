import { FC } from 'react'
import { ITableItem } from './AdminTable.interface'
import TableHeader from './TableHeader'
import SkeletonLoader from '../SkeletonLoader'
import AdminTableItem from './AdminTableItem'
import styles from './AdminTable.module.scss'

interface IAdminTable {
	tableItems: ITableItem[]
	headerItems: string[]
	isLoading: boolean
	removeHandler: (id: string) => void
}

const AdminTable: FC<IAdminTable> = ({
	tableItems,
	headerItems,
	isLoading,
	removeHandler,
}) => {
	return (
		<div>
			<TableHeader headerItems={headerItems} />

			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						key={tableItem._id}
						tableItem={tableItem}
						removeHandler={removeHandler}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</div>
	)
}

export default AdminTable
