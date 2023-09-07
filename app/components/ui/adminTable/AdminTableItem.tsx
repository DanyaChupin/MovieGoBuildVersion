import { FC } from 'react'
import { IAdminTableItem } from './AdminTable.interface'
import styles from './AdminTable.module.scss'
import AdminActions from './adminActions/AdminActions'

const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				editUrl={tableItem.editUrl}
				removeHandler={() => removeHandler(tableItem._id)}
			/>
		</div>
	)
}

export default AdminTableItem
