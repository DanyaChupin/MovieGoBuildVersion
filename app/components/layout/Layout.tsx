import { FC } from 'react'
import Navigation from './navigation/Navigation'
import Sidebar from './sidebar/Sidebar'
import { IChildren } from '@/shared/types/children.types'
import styles from './Layout.module.scss'

const Layout: FC<IChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.center}>{children}</div>
			<Sidebar />
		</div>
	)
}
export default Layout
