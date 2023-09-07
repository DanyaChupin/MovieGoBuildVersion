import { FC } from 'react'
import styles from './AdminTable.module.scss'
import cn from 'classnames'
const TableHeader: FC<{ headerItems: string[] }> = ({ headerItems }) => {
	return (
		<div className={cn(styles.item, styles.itemHeader)}>
			{headerItems.map((value) => (
				<div key={value}>{value}</div>
			))}
			<div>Actions</div>
		</div>
	)
}

export default TableHeader
