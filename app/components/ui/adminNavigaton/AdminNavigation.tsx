import { FC } from 'react'
import styles from './AdminNavigation.module.scss'
import { navItems } from './AdminNavigation.data'
import AdminNavItem from './AdminNavItem'
const AdminNavigation: FC = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{navItems.map((item) => (
					<AdminNavItem key={item.link} item={item} />
				))}
			</ul>
		</nav>
	)
}

export default AdminNavigation
